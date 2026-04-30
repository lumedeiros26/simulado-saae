const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static('public'));

const bancoQuestoes = [
    // --- PORTUGUÊS ---
    { id: 1, disciplina: "Português", enunciado: "Assinale a alternativa em que a palavra está grafada corretamente:", alternativas: { A: "Excessão", B: "Exceção", C: "Eçessão", D: "Exsessão" }, gabarito: "B", explicacao: "A grafia correta é 'Exceção', com 'x' e 'ç'. Vem do latim 'exceptio'." },
    { id: 2, disciplina: "Português", enunciado: "Qual o plural de 'Cidadão'?", alternativas: { A: "Cidadões", B: "Cidadães", C: "Cidadãos", D: "Cidadonistas" }, gabarito: "C", explicacao: "Palavras como cidadão, cristão e cortês fazem o plural em 'ãos'." },
    { id: 3, disciplina: "Português", enunciado: "Sinônimo de 'Incipiente':", alternativas: { A: "Sábio", B: "Ignorante", C: "Iniciante", D: "Experiente" }, gabarito: "C", explicacao: "Incipiente com 'C' significa que algo está no início. (Insipiente com 'S' seria ignorante)." },
    { id: 4, disciplina: "Português", enunciado: "Assinale a frase com erro de concordância:", alternativas: { A: "Faz dois anos que não o vejo.", B: "Houve muitos acidentes.", C: "Devem haver soluções.", D: "Faz calor agora." }, gabarito: "C", explicacao: "O verbo 'haver' (sentido de existir) é impessoal. O correto seria 'Deve haver soluções'." },
    { id: 5, disciplina: "Português", enunciado: "A palavra 'SAAE' é um:", alternativas: { A: "Dígrafo", B: "Hiato", C: "Ditongo", D: "Tritongo" }, gabarito: "B", explicacao: "No SAAE (sa-a-e), as vogais se separam em sílabas diferentes, o que caracteriza um hiato." },
    { id: 6, disciplina: "Português", enunciado: "Qual o antônimo de 'Efemêro'?", alternativas: { A: "Passageiro", B: "Duradouro", C: "Rápido", D: "Curto" }, gabarito: "B", explicacao: "Efemêro é algo que dura pouco; duradouro é o oposto." },
    { id: 7, disciplina: "Português", enunciado: "Indique a alternativa onde o uso da crase é PROIBIDO:", alternativas: { A: "Fui à escola.", B: "Caminhamos à pé.", C: "Entreguei à diretora.", D: "Às vezes saio." }, gabarito: "B", explicacao: "Não se usa crase antes de palavras masculinas (pé é masculino)." },
    { id: 8, disciplina: "Português", enunciado: "Qual a função do 'que' em: 'Desejo que sejas feliz'?", alternativas: { A: "Pronome", B: "Conjunção integrante", C: "Adjetivo", D: "Advérbio" }, gabarito: "B", explicacao: "O 'que' liga a oração principal à subordinada completando o sentido do verbo desejar." },
    { id: 9, disciplina: "Português", enunciado: "O coletivo de 'Lobos' é:", alternativas: { A: "Enxame", B: "Alcateia", C: "Cardume", D: "Rebanho" }, gabarito: "B", explicacao: "Alcateia é o substantivo coletivo para lobos." },
    { id: 10, disciplina: "Português", enunciado: "Significado de 'Ratificar':", alternativas: { A: "Mudar", B: "Corrigir", C: "Confirmar", D: "Apagar" }, gabarito: "C", explicacao: "Ratificar significa confirmar. (Retificar significa corrigir)." },

    // --- RLM / MATEMÁTICA ---
    { id: 11, disciplina: "Matemática", enunciado: "Qual a raiz quadrada de 144?", alternativas: { A: "10", B: "11", C: "12", D: "14" }, gabarito: "C", explicacao: "12 vezes 12 é igual a 144." },
    { id: 12, disciplina: "Matemática", enunciado: "20% de 150 é:", alternativas: { A: "20", B: "25", C: "30", D: "35" }, gabarito: "C", explicacao: "0,20 * 150 = 30." },
    { id: 13, disciplina: "RLM", enunciado: "Próximo número da sequência: 2, 4, 8, 16...", alternativas: { A: "24", B: "30", C: "32", D: "64" }, gabarito: "C", explicacao: "A lógica é o dobro do número anterior. 16 * 2 = 32." },
    { id: 14, disciplina: "Matemática", enunciado: "Se um reservatório gasta 5L em 2h, quanto gasta em 6h?", alternativas: { A: "10L", B: "15L", C: "20L", D: "25L" }, gabarito: "B", explicacao: "Proporção simples: se o tempo triplicou, o gasto triplica. 5 * 3 = 15." },
    { id: 15, disciplina: "RLM", enunciado: "Se todo A é B, e C é A, então:", alternativas: { A: "C é B", B: "B é C", C: "C não é B", D: "A não é B" }, gabarito: "A", explicacao: "Lógica dedutiva (Silogismo). Se C está dentro de A, e A está dentro de B, C está dentro de B." },
    { id: 16, disciplina: "Matemática", enunciado: "Quanto é 3/4 de 100?", alternativas: { A: "25", B: "50", C: "75", D: "80" }, gabarito: "C", explicacao: "100 dividido por 4 é 25. 25 vezes 3 é 75." },
    { id: 17, disciplina: "Matemática", enunciado: "Resultado de (5 + 5) * 2 / 2:", alternativas: { A: "5", B: "10", C: "15", D: "20" }, gabarito: "B", explicacao: "Parênteses primeiro: 10 * 2 = 20. 20 / 2 = 10." },
    { id: 18, disciplina: "RLM", enunciado: "A negação de 'Todos são felizes' é:", alternativas: { A: "Ninguém é feliz", B: "Algum não é feliz", C: "Todos são tristes", D: "Muitos são felizes" }, gabarito: "B", explicacao: "Para negar 'todos', basta que ao menos UM não seja." },
    { id: 19, disciplina: "Matemática", enunciado: "Um ângulo reto possui quantos graus?", alternativas: { A: "45°", B: "90°", C: "180°", D: "360°" }, gabarito: "B", explicacao: "Ângulo reto é o ângulo de 90 graus (formato de L)." },
    { id: 20, disciplina: "Matemática", enunciado: "1kg de cloro trata 1000L. Quantos kg para 5000L?", alternativas: { A: "1", B: "2", C: "5", D: "10" }, gabarito: "C", explicacao: "Se 1 trata 1000, 5 tratam 5000." },

    // --- INFORMÁTICA ---
    { id: 21, disciplina: "Informática", enunciado: "Atalho para fechar uma janela no Windows:", alternativas: { A: "Alt+F4", B: "Ctrl+C", C: "Ctrl+V", D: "Win+L" }, gabarito: "A", explicacao: "Alt+F4 encerra o programa ou janela ativa." },
    { id: 22, disciplina: "Informática", enunciado: "O que é o Google Chrome?", alternativas: { A: "Hardware", B: "Sistema Operacional", C: "Navegador", D: "Site de busca" }, gabarito: "C", explicacao: "O Chrome é um software de navegação na web." },
    { id: 23, disciplina: "Informática", enunciado: "Memória RAM serve para:", alternativas: { A: "Armazenar fotos", B: "Velocidade temporária", C: "Desligar o PC", D: "Limpar vírus" }, gabarito: "B", explicacao: "RAM é memória de acesso rápido para o que está rodando agora." },
    { id: 24, disciplina: "Informática", enunciado: "Atalho para Negrito no Word (Brasil):", alternativas: { A: "Ctrl+B", B: "Ctrl+N", C: "Ctrl+I", D: "Ctrl+S" }, gabarito: "B", explicacao: "No Word em português, Ctrl+N ativa o negrito." },
    { id: 25, disciplina: "Informática", enunciado: "O 'Cérebro' do computador é o:", alternativas: { A: "Monitor", B: "HD", C: "Processador (CPU)", D: "Teclado" }, gabarito: "C", explicacao: "A CPU processa todas as instruções do sistema." },
    { id: 26, disciplina: "Informática", enunciado: "WWW significa:", alternativas: { A: "World Wide Web", B: "Wide World Web", C: "World Web Wide", D: "Rede Mundial" }, gabarito: "A", explicacao: "World Wide Web ou 'Rede de Alcance Mundial'." },
    { id: 27, disciplina: "Informática", enunciado: "O Windows é um:", alternativas: { A: "Software aplicativo", B: "Sistema Operacional", C: "Hardware", D: "Antivírus" }, gabarito: "B", explicacao: "O Windows gerencia todo o hardware e software do PC." },
    { id: 28, disciplina: "Informática", enunciado: "Um Pendrive é um dispositivo de:", alternativas: { A: "Entrada apenas", B: "Saída apenas", C: "Armazenamento", D: "Processamento" }, gabarito: "C", explicacao: "Usado para salvar e transportar arquivos." },
    { id: 29, disciplina: "Informática", enunciado: "Extensão padrão de arquivos de texto simples:", alternativas: { A: ".jpg", B: ".mp3", C: ".txt", D: ".exe" }, gabarito: "C", explicacao: ".txt é o formato do Bloco de Notas." },
    { id: 30, disciplina: "Informática", enunciado: "Atalho para imprimir:", alternativas: { A: "Ctrl+I", B: "Ctrl+P", C: "Ctrl+S", D: "Ctrl+A" }, gabarito: "B", explicacao: "Ctrl+P (Print) é o comando de impressão." },

    // --- LEGISLAÇÃO / SAAE ---
    { id: 31, disciplina: "Legislação", enunciado: "O SAAE Passos é uma:", alternativas: { A: "Empresa Privada", B: "Autarquia", C: "ONG", D: "Fundação" }, gabarito: "B", explicacao: "Autarquias possuem autonomia e são criadas por lei específica." },
    { id: 32, disciplina: "SAAE", enunciado: "Sigla para Estação de Tratamento de Água:", alternativas: { A: "ETE", B: "ETA", C: "SAE", D: "EPS" }, gabarito: "B", explicacao: "ETA = Estação de Tratamento de Água." },
    { id: 33, disciplina: "Legislação", enunciado: "A investidura no cargo ocorre com a:", alternativas: { A: "Nomeação", B: "Posse", C: "Prova", D: "Aposentadoria" }, gabarito: "B", explicacao: "É na posse que o servidor aceita as atribuições do cargo." },
    { id: 34, disciplina: "SAAE", enunciado: "O cloro na água serve para:", alternativas: { A: "Tirar o barro", B: "Desinfecção", C: "Fazer espuma", D: "Mudar o gosto" }, gabarito: "B", explicacao: "O cloro elimina microrganismos causadores de doenças." },
    { id: 35, disciplina: "Legislação", enunciado: "Estágio probatório dura quantos anos?", alternativas: { A: "1 ano", B: "2 anos", C: "3 anos", D: "5 anos" }, gabarito: "C", explicacao: "Segundo a Constituição, a estabilidade ocorre após 3 anos." },
    { id: 36, disciplina: "SAAE", enunciado: "ETE significa:", alternativas: { A: "Estação de Tratamento de Esgoto", B: "Empresa de Transporte", C: "Estação de Tudo", D: "Energia Total" }, gabarito: "A", explicacao: "ETE é onde o esgoto é tratado antes de voltar ao rio." },
    { id: 37, disciplina: "Legislação", enunciado: "O servidor estável só perde o cargo por:", alternativas: { A: "Vontade do chefe", B: "Sentença judicial", C: "Fim do mandato", D: "Férias" }, gabarito: "B", explicacao: "A estabilidade protege o servidor contra demissões arbitrárias." },
    { id: 38, disciplina: "SAAE", enunciado: "O Flúor na água ajuda a prevenir:", alternativas: { A: "Dengue", B: "Cáries", C: "Gripe", D: "Calvície" }, gabarito: "B", explicacao: "A fluoretação é uma medida de saúde pública para evitar cáries." },
    { id: 39, disciplina: "Legislação", enunciado: "O Prefeito de Passos pode extinguir o SAAE sem lei?", alternativas: { A: "Sim", B: "Não", C: "Só em janeiro", D: "Só se faltar água" }, gabarito: "B", explicacao: "Autarquias só podem ser criadas ou extintas por LEI." },
    { id: 40, disciplina: "SAAE", enunciado: "A tubulação que leva água da rua para a casa é:", alternativas: { A: "Adutora", B: "Ramal", C: "Esgoto", D: "Cisterna" }, gabarito: "B", explicacao: "O ramal predial liga a rede pública ao hidrômetro." },
    { id: 41, disciplina: "SAAE", enunciado: "Hidrômetro serve para:", alternativas: { A: "Medir pressão", B: "Medir consumo", C: "Esquentar água", D: "Filtrar água" }, gabarito: "B", explicacao: "O hidrômetro registra o volume de água utilizado." },
    { id: 42, disciplina: "SAAE", enunciado: "A cor padrão do SAAE Passos é:", alternativas: { A: "Vermelho", B: "Azul/Branco", C: "Amarelo", D: "Verde" }, gabarito: "B", explicacao: "Identidade visual padrão de saneamento em Passos." },
    { id: 43, disciplina: "Legislação", enunciado: "São poderes da União:", alternativas: { A: "Legislativo e Judiciário apenas", B: "Legislativo, Executivo e Judiciário", C: "Prefeito e Vereadores", D: "Polícia e Exército" }, gabarito: "B", explicacao: "Tripartição dos poderes conforme a Constituição." },
    { id: 44, disciplina: "SAAE", enunciado: "Onde fica a captação principal de Passos?", alternativas: { A: "Rio Grande", B: "Ribeirão Bocaina", C: "Rio Sapucaí", D: "Poço artesiano" }, gabarito: "B", explicacao: "O Ribeirão Bocaina é a principal fonte de abastecimento da cidade." },
    { id: 45, disciplina: "SAAE", enunciado: "A água captada no rio é chamada de:", alternativas: { A: "Água potável", B: "Água bruta", C: "Água destilada", D: "Água mineral" }, gabarito: "B", explicacao: "Água bruta é a água antes de passar pelo tratamento." },
    { id: 46, disciplina: "Legislação", enunciado: "Vacância do cargo ocorre por:", alternativas: { A: "Promoção", B: "Exoneração", C: "Aposentadoria", D: "Todas acima" }, gabarito: "D", explicacao: "Vacância é quando o cargo fica 'vago' por qualquer desses motivos." },
    { id: 47, disciplina: "SAAE", enunciado: "A decantação serve para:", alternativas: { A: "Sujeira afundar", B: "Água ferver", C: "Adicionar açúcar", D: "Lavar o filtro" }, gabarito: "A", explicacao: "Pela gravidade, os flocos de sujeira descem ao fundo do tanque." },
    { id: 48, disciplina: "Informática", enunciado: "Qual destes é um hardware?", alternativas: { A: "Windows", B: "Mouse", C: "Excel", D: "Vírus" }, gabarito: "B", explicacao: "Hardware é a parte física que você pode tocar." },
    { id: 49, disciplina: "Português", enunciado: "Significado de 'Beneplácito':", alternativas: { A: "Ódio", B: "Consentimento", C: "Rapidez", D: "Confusão" }, gabarito: "B", explicacao: "Dar o beneplácito é dar a aprovação ou consentimento." },
    { id: 50, disciplina: "SAAE", enunciado: "Saneamento básico é direito de:", alternativas: { A: "Apenas ricos", B: "Todos os cidadãos", C: "Quem paga IPTU", D: "Empresas apenas" }, gabarito: "B", explicacao: "É um serviço essencial e um direito fundamental de todos." }
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
            correta, 
            mensagem: "Sensacional! Você acertou.",
            explicacao: questao.explicacao, // Só envia se acertar
            proxima: true
        });
    } else {
        res.json({ 
            correta, 
            mensagem: "Resposta incorreta. Tente novamente!",
            explicacao: null, // Esconde a explicação no erro
            proxima: false
        });
    }
});

app.listen(3000, () => console.log("🔥 Servidor rodando!"));
