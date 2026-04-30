const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const bancoQuestoes = [
    // --- PORTUGUÊS & REDAÇÃO OFICIAL ---
    { id: 1, disciplina: "Redação Oficial", enunciado: "Segundo o Manual da Presidência, o fecho adequado para autoridades de mesma hierarquia é:", alternativas: { A: "Respeitosamente", B: "Cordialmente", C: "Atenciosamente", D: "Com estima" }, gabarito: "C", explicacao: "Usa-se 'Atenciosamente' para autoridades de mesma hierarquia ou inferior." },
    { id: 2, disciplina: "Português", enunciado: "Assinale a alternativa com a grafia CORRETA:", alternativas: { A: "Analizar", B: "Paralizar", C: "Catequizar", D: "Pesquisar" }, gabarito: "D", explicacao: "'Pesquisar' mantém o 's' do radical. Catequizar é com 'z'." },
    { id: 3, disciplina: "Português", enunciado: "O plural de 'Cidadão' e 'Escrivão' é:", alternativas: { A: "Cidadões e Escrivões", B: "Cidadãos e Escrivães", C: "Cidadãos e Escrivões", D: "Cidadões e Escrivães" }, gabarito: "B", explicacao: "Cidadãos (único plural) e Escrivães (plural mais comum)." },
    { id: 4, disciplina: "Redação Oficial", enunciado: "O pronome de tratamento para Reitores de Universidades é:", alternativas: { A: "Vossa Excelência", B: "Vossa Magnificência", C: "Vossa Senhoria", D: "Vossa Santidade" }, gabarito: "B", explicacao: "Magnificência é exclusivo para Reitores." },
    { id: 5, disciplina: "Português", enunciado: "Usa-se a crase obrigatoriamente em:", alternativas: { A: "Vendeu a prazo.", B: "Caminhou a pé.", C: "Chegou à uma hora.", D: "Fui à escola." }, gabarito: "D", explicacao: "Quem vai, vai 'a'. Escola é feminino 'a'. A+A = À." },

    // --- DIREITO ADM & LEGISLAÇÃO ---
    { id: 6, disciplina: "Direito Adm", enunciado: "O SAAE é uma Autarquia, o que significa que possui:", alternativas: { A: "Subordinação total ao Prefeito", B: "Autonomia administrativa e financeira", C: "Fins lucrativos", D: "Natureza privada" }, gabarito: "B", explicacao: "Autarquias são entes descentralizados com autonomia própria." },
    { id: 7, disciplina: "Direito Adm", enunciado: "Qual princípio proíbe a promoção pessoal em obras públicas?", alternativas: { A: "Legalidade", B: "Impessoalidade", C: "Eficiência", D: "Publicidade" }, gabarito: "B", explicacao: "A obra é do Estado, não do gestor." },
    { id: 8, disciplina: "Legislação", enunciado: "A investidura em cargo público ocorre com a:", alternativas: { A: "Nomeação", B: "Posse", C: "Exercício", D: "Prova" }, gabarito: "B", explicacao: "A posse completa a investidura do servidor." },
    { id: 9, disciplina: "Direito Adm", enunciado: "Atributo do ato adm que permite execução imediata:", alternativas: { A: "Tipicidade", B: "Imperatividade", C: "Autoexecutoriedade", D: "Legitimidade" }, gabarito: "C", explicacao: "Permite agir sem prévia autorização judicial." },
    { id: 10, disciplina: "Legislação", enunciado: "Estágio probatório dura:", alternativas: { A: "2 anos", B: "3 anos", C: "5 anos", D: "1 ano" }, gabarito: "B", explicacao: "Conforme a CF/88, são 3 anos de efetivo exercício." },

    // --- ARQUIVOLOGIA & ATENDIMENTO ---
    { id: 11, disciplina: "Arquivologia", enunciado: "Arquivos de uso frequente são chamados de:", alternativas: { A: "Correntes", B: "Intermediários", C: "Permanentes", D: "Mortos" }, gabarito: "A", explicacao: "Arquivos correntes são os de consulta diária." },
    { id: 12, disciplina: "Atendimento", enunciado: "A postura correta diante de um cidadão irritado é:", alternativas: { A: "Ser ríspido", B: "Manter a calma e empatia", C: "Ignorar", D: "Chamar a polícia de imediato" }, gabarito: "B", explicacao: "Urbanidade é dever do servidor." },
    { id: 13, disciplina: "Arquivologia", enunciado: "Método que organiza por assunto:", alternativas: { A: "Alfabético", B: "Numérico", C: "Ideográfico", D: "Geográfico" }, gabarito: "C", explicacao: "Ideográfico foca na ideia/tema." },
    { id: 14, disciplina: "Arquivologia", enunciado: "Documentos de valor histórico ficam no arquivo:", alternativas: { A: "Corrente", B: "Intermediário", C: "Permanente", D: "Setorial" }, gabarito: "C", explicacao: "O arquivo permanente nunca é descartado." },
    { id: 15, disciplina: "Atendimento", enunciado: "O atendimento preferencial é garantido para:", alternativas: { A: "Apenas idosos", B: "Idosos, gestantes e pessoas com deficiência", C: "Quem chegar primeiro", D: "Amigos do servidor" }, gabarito: "B", explicacao: "Lei Federal garante a prioridade nestes casos." },

    // --- INFORMÁTICA & MATEMÁTICA ---
    { id: 16, disciplina: "Informática", enunciado: "Atalho para fechar programa no Windows:", alternativas: { A: "Alt + F4", B: "Ctrl + Z", C: "Win + L", D: "Ctrl + P" }, gabarito: "A", explicacao: "Alt+F4 fecha a janela ativa." },
    { id: 17, disciplina: "Matemática", enunciado: "30% de 200 é:", alternativas: { A: "30", B: "50", C: "60", D: "100" }, gabarito: "C", explicacao: "0,3 * 200 = 60." },
    { id: 18, disciplina: "Informática", enunciado: "Protocolo para envio de e-mails:", alternativas: { A: "HTTP", B: "SMTP", C: "FTP", D: "POP3" }, gabarito: "B", explicacao: "SMTP envia; POP3 e IMAP recebem." },
    { id: 19, disciplina: "Matemática", enunciado: "Média de 10, 20 e 30:", alternativas: { A: "10", B: "20", C: "30", D: "60" }, gabarito: "B", explicacao: "(10+20+30)/3 = 20." },
    { id: 20, disciplina: "SAAE", enunciado: "Em Passos, a autarquia responsável pelo saneamento é:", alternativas: { A: "COPASA", B: "SAAE", C: "CEMIG", D: "Prefeitura" }, gabarito: "B", explicacao: "O SAAE é a autarquia local de Passos." }
    // Adicione mais questões seguindo este padrão até 50.
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
            mensagem: "Sensacional! Você acertou.",
            explicacao: questao.explicacao, 
            proxima: true
        });
    } else {
        res.json({ 
            correta: false, 
            mensagem: "Resposta incorreta. Analise as opções e tente novamente!",
            explicacao: null, 
            proxima: false
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Simulado rodando na porta ${PORT}`));
