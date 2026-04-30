const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const bancoQuestoes = [
    // --- LEGISLAÇÃO MUNICIPAL (Passos) & CONSTITUCIONAL ---
    { id: 1, disciplina: "Lei Orgânica de Passos", enunciado: "De acordo com a Lei Orgânica do Município de Passos, a soberania popular é exercida pelo sufrágio universal e pelo voto direto e secreto, e, nos termos da lei, mediante:", alternativas: { A: "Apenas o Plebiscito.", B: "Plebiscito, Referendo e Iniciativa Popular.", C: "Apenas indicação do Prefeito.", D: "Votação em assembleia de bairro." }, gabarito: "B", explicacao: "A soberania popular em âmbito municipal segue o modelo constitucional de participação direta via plebiscito, referendo e iniciativa popular." },
    { id: 2, disciplina: "Estatuto dos Servidores", enunciado: "Conforme o Estatuto dos Servidores de Passos, o servidor habilitado em concurso público e empossado em cargo de provimento efetivo adquirirá estabilidade após:", alternativas: { A: "2 anos de efetivo exercício.", B: "3 anos de efetivo exercício.", C: "5 anos de efetivo exercício.", D: "1 ano de efetivo exercício." }, gabarito: "B", explicacao: "Seguindo a Constituição Federal, o prazo para aquisição de estabilidade no serviço público é de 3 anos de efetivo exercício." },
    { id: 3, disciplina: "Direito Constitucional", enunciado: "Segundo o Art. 5º da Constituição Federal, a casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador, SALVO:", alternativas: { A: "Em qualquer horário para busca e apreensão.", B: "Durante a noite para prisão administrativa.", C: "Durante o dia por determinação judicial.", D: "Somente em caso de incêndio." }, gabarito: "C", explicacao: "A entrada forçada pode ocorrer em caso de flagrante delito, desastre, para prestar socorro, ou, durante o dia, por determinação judicial." },

    // --- MATEMÁTICA & RACIOCÍNIO LÓGICO ---
    { id: 4, disciplina: "Linguagem de Conjuntos", enunciado: "Dados os conjuntos A = {1, 2, 3, 4} e B = {3, 4, 5, 6}, a operação de Intersecção (A ∩ B) resulta em:", alternativas: { A: "{1, 2, 5, 6}", B: "{3, 4}", C: "{1, 2, 3, 4, 5, 6}", D: "{1, 2}" }, gabarito: "B", explicacao: "A intersecção representa os elementos que pertencem a ambos os conjuntos simultaneamente (3 e 4)." },
    { id: 5, disciplina: "Matemática", enunciado: "O Mínimo Múltiplo Comum (MMC) entre os números 12 e 18 é:", alternativas: { A: "6", B: "36", C: "72", D: "48" }, gabarito: "B", explicacao: "Os múltiplos de 12 (12, 24, 36...) e 18 (18, 36...). O menor comum é 36." },
    { id: 6, disciplina: "Raciocínio Lógico", enunciado: "Em uma sequência de figuras: △, □, ◯, △, □, ◯... Qual será a figura que ocupará a 25ª posição?", alternativas: { A: "△ (Triângulo)", B: "□ (Quadrado)", C: "◯ (Círculo)", D: "X (Cruz)" }, gabarito: "A", explicacao: "A sequência tem padrão de 3 figuras. 25 dividido por 3 sobra 1. O primeiro elemento é o Triângulo." },

    // --- INFORMÁTICA (Incluindo IA e Backup) ---
    { id: 7, disciplina: "Informática", enunciado: "Sobre o Windows 10, qual recurso é utilizado para alternar rapidamente entre janelas abertas utilizando apenas o teclado?", alternativas: { A: "Ctrl + S", B: "Alt + Tab", C: "Win + L", D: "Ctrl + P" }, gabarito: "B", explicacao: "O atalho Alt + Tab permite navegar entre as janelas e aplicativos em execução." },
    { id: 8, disciplina: "Informática (IA)", enunciado: "O edital cita o uso de Inteligência Artificial para produtividade. No contexto do Microsoft 365, como a IA pode auxiliar um Agente Administrativo?", alternativas: { A: "Substituindo completamente a necessidade de redigir ofícios.", B: "Automatizando a criação de fórmulas complexas no Excel e sugerindo resumos de textos.", C: "Garantindo que o computador nunca precise de backup.", D: "Excluindo vírus automaticamente sem necessidade de antivírus." }, gabarito: "B", explicacao: "Ferramentas como o Copilot auxiliam na análise de dados e geração de conteúdo, aumentando a produtividade." },

    // --- CONHECIMENTOS ESPECÍFICOS (Almoxarifado e Licitação) ---
    { id: 9, disciplina: "Licitações (Lei 14.133)", enunciado: "Conforme a nova Lei de Licitações, a modalidade que se destina à escolha de trabalho técnico, científico ou artístico, cujo critério de julgamento será o de melhor técnica ou conteúdo artístico, é o:", alternativas: { A: "Leilão", B: "Concurso", C: "Diálogo Competitivo", D: "Pregão" }, gabarito: "B", explicacao: "O Concurso é a modalidade para escolha de trabalho técnico ou artístico mediante prêmio ou remuneração." },
    { id: 10, disciplina: "Almoxarifado", enunciado: "A gestão de estoques que prioriza a saída dos itens que estão há mais tempo no armazém para evitar perdas é conhecida como:", alternativas: { A: "UEPS (Último que entra, primeiro que sai)", B: "PEPS (Primeiro que entra, primeiro que sai)", C: "Custo Médio", D: "Just-in-Time" }, gabarito: "B", explicacao: "O método PEPS garante a rotatividade do estoque, priorizando os lotes mais antigos." },

    // --- CONHECIMENTOS GERAIS (Passos e SAAE) ---
    { id: 11, disciplina: "Conhecimentos Gerais", enunciado: "O Serviço Autônomo de Água e Esgoto (SAAE) de Passos é classificado juridicamente como:", alternativas: { A: "Sociedade de Economia Mista.", B: "Empresa Pública.", C: "Autarquia Municipal.", D: "Órgão da administração direta." }, gabarito: "C", explicacao: "O SAAE é uma autarquia, dotada de autonomia administrativa e financeira, vinculada ao município de Passos." }
    
    // ... Complete até 50 questões seguindo o equilíbrio do edital enviado.
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
            mensagem: "Sensacional! Você acertou uma questão chave do edital.",
            explicacao: questao.explicacao, 
            proxima: true
        });
    } else {
        res.json({ 
            correta: false, 
            mensagem: "Resposta incorreta. Analise o conteúdo do edital e tente novamente!",
            explicacao: null, 
            proxima: false
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Simulado V3 (SAAE Passos) rodando na porta ${PORT}`));
