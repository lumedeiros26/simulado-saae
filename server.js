const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const bancoQuestoes = [
    // --- PORTUGUÊS (Interpretação, Crase e Sintaxe) ---
    { id: 1, disciplina: "Português", enunciado: "De acordo com as normas de regência e crase, assinale a alternativa correta:", alternativas: { A: "O Agente Administrativo comunicou à todos a decisão.", B: "O servidor dirigiu-se à repartição para trabalhar.", C: "O documento foi entregue à ele ontem.", D: "As informações foram enviadas à uma funcionária externa." }, gabarito: "B", explicacao: "Quem se dirige, se dirige 'a'. 'Repartição' é feminino. A+A = À. Não se usa crase antes de pronomes masculinos ou indefinidos (A, C, D)." },
    { id: 2, disciplina: "Português", enunciado: "Assinale a alternativa em que há erro de concordância verbal:", alternativas: { A: "Fazem dez meses que o concurso foi anunciado.", B: "Houve muitas dúvidas durante a prova.", C: "Devem existir soluções melhores para o problema.", D: "Trata-se de questões complexas." }, gabarito: "A", explicacao: "O verbo 'fazer' indicando tempo decorrido é impessoal e deve ficar no singular: 'Faz dez meses'." },

    // --- RACIOCÍNIO LÓGICO (Conjuntos e Lógica) ---
    { id: 3, disciplina: "Raciocínio Lógico", enunciado: "Em um conjunto de 50 servidores do SAAE, 30 trabalham no setor de Água e 25 no setor de Esgoto. Sabendo que 10 trabalham em ambos, quantos servidores trabalham APENAS no setor de Água?", alternativas: { A: "20", B: "15", C: "10", D: "5" }, gabarito: "A", explicacao: "Pelo Diagrama de Venn: (Total Água 30) - (Interseção 10) = 20 trabalham apenas na Água." },
    { id: 4, disciplina: "Raciocínio Lógico", enunciado: "Considerando a sequência lógica: Círculo, Quadrado, Triângulo, Círculo, Quadrado... Qual será o 10º elemento?", alternativas: { A: "Círculo", B: "Quadrado", C: "Triângulo", D: "Pentágono" }, gabarito: "A", explicacao: "A sequência se repete a cada 3 elementos. 10 dividido por 3 sobra 1. O primeiro elemento da sequência é o Círculo." },

    // --- INFORMÁTICA (IA, Backup e Windows 10) ---
    { id: 5, disciplina: "Informática", enunciado: "Sobre o uso de Inteligência Artificial (IA) em ferramentas de produtividade, assinale a opção correta:", alternativas: { A: "O Copilot do Microsoft 365 só funciona para traduzir textos.", B: "IAs generativas podem auxiliar na automação de tarefas repetitivas e análise de dados.", C: "Assistentes virtuais não podem ser integrados ao Outlook.", D: "O Windows 10 não permite nenhum tipo de automação por voz." }, gabarito: "B", explicacao: "As IAs modernas em suítes de produtividade visam justamente automatizar tarefas e analisar grandes volumes de dados." },
    { id: 6, disciplina: "Informática", enunciado: "Qual tipo de backup copia apenas os arquivos que foram alterados desde o último backup COMPLETO?", alternativas: { A: "Incremental", B: "Diferencial", C: "Espelhado", D: "Sintético" }, gabarito: "B", explicacao: "O backup Diferencial armazena as alterações em relação ao último Backup Cheio (Full)." },

    // --- LEGISLAÇÃO (Passos, Licitações e LAI) ---
    { id: 7, disciplina: "Legislação Municipal", enunciado: "De acordo com o Estatuto dos Servidores de Passos, a forma de provimento que consiste no retorno do servidor estável ao cargo anterior após reprovação em estágio probatório de outro cargo é:", alternativas: { A: "Reversão", B: "Reintegração", C: "Recondução", D: "Aproveitamento" }, gabarito: "C", explicacao: "A Recondução é o retorno ao cargo anterior por inabilitação em estágio probatório de outro cargo." },
    { id: 8, disciplina: "Licitações (Lei 14.133)", enunciado: "Segundo a Nova Lei de Licitações (14.133/21), a modalidade de licitação obrigatória para a aquisição de bens e serviços comuns é o:", alternativas: { A: "Pregão", B: "Concurso", C: "Leilão", D: "Diálogo Competitivo" }, gabarito: "A", explicacao: "O Pregão é a modalidade para bens e serviços cujos padrões de desempenho podem ser definidos objetivamente." },
    { id: 9, disciplina: "Legislação", enunciado: "A Lei de Acesso à Informação (Lei 12.527/11) estabelece que a informação sob custódia do Estado deve ser, em regra:", alternativas: { A: "Sigilosa por 25 anos.", B: "Restrita aos servidores públicos.", C: "Pública, sendo o sigilo a exceção.", D: "Divulgada apenas sob ordem judicial." }, gabarito: "C", explicacao: "A LAI fundamenta-se no princípio da publicidade máxima: o acesso é a regra e o sigilo a exceção." },

    // --- ESPECÍFICOS (Almoxarifado e Redação Oficial) ---
    { id: 10, disciplina: "Conhecimentos Específicos", enunciado: "Na gestão de estoques (Almoxarifado), o método PEPS consiste em:", alternativas: { A: "O último a entrar é o primeiro a sair.", B: "O primeiro a entrar é o primeiro a sair.", C: "O produto mais caro sai primeiro.", D: "O produto menor sai primeiro." }, gabarito: "B", explicacao: "PEPS (Primeiro que Entra, Primeiro que Sai) evita o vencimento ou obsolescência de itens estocados." },
    { id: 11, disciplina: "Redação Oficial", enunciado: "O documento utilizado para comunicações entre unidades administrativas de um mesmo órgão público, seguindo o padrão ofício, é o:", alternativas: { A: "Alvará", B: "Memorando", C: "Edital", D: "Ata" }, gabarito: "B", explicacao: "Embora o Manual da Presidência tenha unificado o formato, o termo memorando ainda é usado para comunicação interna oficial." },
    
    // --- CONHECIMENTOS GERAIS (Passos e SAAE) ---
    { id: 12, disciplina: "Conhecimentos Gerais", enunciado: "O SAAE de Passos é uma autarquia municipal. Qual a principal vantagem jurídica de uma autarquia?", alternativas: { A: "Não precisa de licitação.", B: "Possui patrimônio e receita próprios com autonomia administrativa.", C: "Os funcionários não precisam de concurso.", D: "Pode ter fins lucrativos como uma empresa privada." }, gabarito: "B", explicacao: "Autarquias são entes da administração indireta com autonomia para gerir seus próprios recursos e decisões." },

    // ... (Continue adicionando até 50 questões seguindo estes temas do edital)
];

let indiceAtual = 0;

app.get('/questao', (req, res) => {
    if (indiceAtual >= bancoQuestoes.length) return res.json({ fim: true });
    const { gabarito, explicacao, ...pergunta } = bancoQuestoes[indiceAtual];
    res.json(pergunta);
});

app.post('/responder', (req, res) => {
    const { resposta } = req.body;
    const questao = bancoQuestoes[indiceAtual];
    const correta = (resposta === questao.gabarito);
    
    if (correta) {
        indiceAtual++;
        res.json({ 
            correta: true, 
            mensagem: "Excelente! Você dominou o edital nesta questão.",
            explicacao: questao.explicacao, 
            proxima: true
        });
    } else {
        res.json({ 
            correta: false, 
            mensagem: "Ops! Essa pegadinha do edital te pegou. Tente novamente!",
            explicacao: null, 
            proxima: false
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Simulado V3 (Edital Completo) rodando na porta ${PORT}`));
