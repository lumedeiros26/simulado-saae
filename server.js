const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

const bancoQuestoes = [
    // --- PORTUGUÊS (1-10) ---
    { id: 1, disciplina: "Português", enunciado: "Assinale a alternativa em que a crase foi empregada corretamente:", alternativas: { A: "Entreguei o relatório à ele.", B: "O SAAE presta serviços à toda cidade.", C: "Referia-se à lei municipal de Passos.", D: "Faremos o reparo à partir de amanhã." }, gabarito: "C", explicacao: "Usa-se crase antes de substantivos femininos determinados. 'Ele' é masculino, 'toda' é pronome indefinido e 'partir' é verbo." },
    { id: 2, disciplina: "Português", enunciado: "O plural correto de 'cidadão' e 'caráter' é:", alternativas: { A: "Cidadões e carateres", B: "Cidadãos e caracteres", C: "Cidadãos e carateres", D: "Cidadões e caracteres" }, gabarito: "B", explicacao: "Cidadão faz plural em 'ãos'. Caráter muda para 'caracteres' (com o acento deslocado)." },
    { id: 3, disciplina: "Português", enunciado: "Qual frase apresenta erro de pontuação?", alternativas: { A: "Luiza, você já terminou o simulado?", B: "Passos, 30 de abril de 2026.", C: "O servidor, comprou os materiais ontem.", D: "Eles chegaram, viram o problema e resolveram." }, gabarito: "C", explicacao: "Não se separa o sujeito ('O servidor') do verbo ('comprou') com vírgula." },
    { id: 4, disciplina: "Português", enunciado: "Sinônimo da palavra 'Preterir':", alternativas: { A: "Escolher", B: "Desprezar/Ignorar", C: "Antecipar", D: "Ajudar" }, gabarito: "B", explicacao: "Preterir significa deixar de lado ou não dar preferência." },
    { id: 5, disciplina: "Português", enunciado: "Na frase 'Vende-se esta casa', a partícula 'se' é:", alternativas: { A: "Índice de indeterminação do sujeito", B: "Partícula apassivadora", C: "Pronome reflexivo", D: "Conjunção" }, gabarito: "B", explicacao: "A frase equivale a 'Esta casa é vendida'. O 'se' apassiva o sujeito." },
    { id: 6, disciplina: "Português", enunciado: "Antônimo de 'Efêmero':", alternativas: { A: "Passageiro", B: "Duradouro", C: "Curto", D: "Rápido" }, gabarito: "B", explicacao: "Efêmero é o que dura pouco; duradouro é o contrário." },
    { id: 7, disciplina: "Português", enunciado: "Assinale a grafia correta:", alternativas: { A: "Excessão", B: "Exceção", C: "Eceção", D: "Exsessão" }, gabarito: "B", explicacao: "A grafia correta é Exceção." },
    { id: 8, disciplina: "Português", enunciado: "Qual o coletivo de 'Mapas'?", alternativas: { A: "Pinacoteca", B: "Mapoteca", C: "Atlas", D: "Cancioneiro" }, gabarito: "C", explicacao: "Atlas é o coletivo de mapas geográficos." },
    { id: 9, disciplina: "Português", enunciado: "Indique a alternativa sem erro de concordância:", alternativas: { A: "Fazem dois anos que trabalho aqui.", B: "Haviam muitas pessoas no SAAE.", C: "Devem haver soluções para o caso.", D: "Faz dois anos que trabalho aqui." }, gabarito: "D", explicacao: "Verbo fazer indicando tempo é impessoal (singular)." },
    { id: 10, disciplina: "Português", enunciado: "Figura de linguagem que consiste no exagero:", alternativas: { A: "Metáfora", B: "Hipérbole", C: "Eufemismo", D: "Ironia" }, gabarito: "B", explicacao: "Hipérbole é a figura do exagero intencional." },

    // --- RACIOCÍNIO LÓGICO (11-20) ---
    { id: 11, disciplina: "Raciocínio Lógico", enunciado: "Se A = {0, 1, 2, 3} e B = {2, 3, 4, 5}, qual o conjunto Intersecção (A ∩ B)?", alternativas: { A: "{0, 1, 4, 5}", B: "{2, 3}", C: "{0, 1, 2, 3, 4, 5}", D: "{2}" }, gabarito: "B", explicacao: "Intersecção são os elementos que aparecem nos dois conjuntos." },
    { id: 12, disciplina: "Matemática", enunciado: "O MMC de 10 e 15 é:", alternativas: { A: "5", B: "30", C: "60", D: "150" }, gabarito: "B", explicacao: "Múltiplos de 10: 10, 20, 30... Múltiplos de 15: 15, 30... O menor é 30." },
    { id: 13, disciplina: "Matemática", enunciado: "Quanto é 25% de 80?", alternativas: { A: "15", B: "20", C: "25", D: "30" }, gabarito: "B", explicacao: "25% é o mesmo que dividir por 4. 80 / 4 = 20." },
    { id: 14, disciplina: "Raciocínio Lógico", enunciado: "Qual a negação da frase 'Todo político é honesto'?", alternativas: { A: "Nenhum político é honesto", B: "Pelo menos um político não é honesto", C: "Algum político é honesto", D: "Todos os políticos são desonestos" }, gabarito: "B", explicacao: "A negação de 'Todo' é 'Pelo menos um... não'." },
    { id: 15, disciplina: "Matemática", enunciado: "Se 3 Agentes Administrativos digitam 15 ofícios, quantos ofícios 5 agentes digitarão no mesmo tempo?", alternativas: { A: "20", B: "25", C: "30", D: "35" }, gabarito: "B", explicacao: "Cada um digita 5. 5 agentes x 5 ofícios = 25." },
    { id: 16, disciplina: "Raciocínio Lógico", enunciado: "Na sequência 2, 4, 8, 16... qual o próximo número?", alternativas: { A: "20", B: "24", C: "32", D: "64" }, gabarito: "C", explicacao: "A lógica é o dobro do número anterior." },
    { id: 17, disciplina: "Matemática", enunciado: "O resultado de 2 + 3 * 4 é:", alternativas: { A: "20", B: "14", C: "24", D: "9" }, gabarito: "B", explicacao: "Primeiro multiplica-se: 3 * 4 = 12. Depois soma-se: 2 + 12 = 14." },
    { id: 18, disciplina: "Raciocínio Lógico", enunciado: "Qual o 10º termo da sequência A, B, C, A, B, C...?", alternativas: { A: "A", B: "B", C: "C", D: "D" }, gabarito: "A", explicacao: "O padrão se repete a cada 3. 10 dividido por 3 sobra 1 (posição A)." },
    { id: 19, disciplina: "Matemática", enunciado: "Um produto custa R$ 100 e tem desconto de 10%. Qual o valor final?", alternativas: { A: "R$ 80", B: "R$ 90", C: "R$ 110", D: "R$ 95" }, gabarito: "B", explicacao: "10% de 100 é 10. 100 - 10 = 90." },
    { id: 20, disciplina: "Raciocínio Lógico", enunciado: "Se hoje é quinta-feira, que dia será daqui a 8 dias?", alternativas: { A: "Quinta-feira", B: "Sexta-feira", C: "Sábado", D: "Quarta-feira" }, gabarito: "B", explicacao: "7 dias volta para quinta. O 8º dia é sexta." },

    // --- INFORMÁTICA (21-30) ---
    { id: 21, disciplina: "Informática", enunciado: "No Windows 10, o atalho para bloquear a tela é:", alternativas: { A: "Ctrl + L", B: "Win + L", C: "Alt + L", D: "Shift + L" }, gabarito: "B", explicacao: "Tecla Windows + L (Lock) bloqueia a sessão." },
    { id: 22, disciplina: "Informática", enunciado: "Qual ferramenta do Microsoft 365 é focada em comunicação e reuniões em equipe?", alternativas: { A: "Excel", B: "Teams", C: "Word", D: "PowerPoint" }, gabarito: "B", explicacao: "Teams é a plataforma de colaboração e chats." },
    { id: 23, disciplina: "Informática (IA)", enunciado: "Assistentes virtuais como o Copilot usam IA para:", alternativas: { A: "Limpar o hardware do PC", B: "Automatizar tarefas e gerar textos/resumos", C: "Consertar cabos de rede", D: "Impedir o uso da internet" }, gabarito: "B", explicacao: "O uso de IA em produtividade foca em automação e geração de conteúdo." },
    { id: 24, disciplina: "Informática", enunciado: "O backup que copia todos os arquivos selecionados é o:", alternativas: { A: "Incremental", B: "Diferencial", C: "Completo (Full)", D: "Diário" }, gabarito: "C", explicacao: "O backup Completo faz a cópia integral dos dados." },
    { id: 25, disciplina: "Informática", enunciado: "Qual periférico é considerado de Entrada E Saída ao mesmo tempo?", alternativas: { A: "Teclado", B: "Monitor comum", C: "Monitor Touchscreen", D: "Mouse" }, gabarito: "C", explicacao: "Touchscreen você toca (entrada) e vê a imagem (saída)." },
    { id: 26, disciplina: "Informática", enunciado: "O protocolo seguro para navegar na web é o:", alternativas: { A: "HTTP", B: "HTTPS", C: "FTP", D: "SMTP" }, gabarito: "B", explicacao: "O 'S' no HTTPS indica segurança (criptografia)." },
    { id: 27, disciplina: "Informática", enunciado: "No Excel, qual fórmula soma as células de A1 até A5?", alternativas: { A: "=SOMA(A1;A5)", B: "=SOMA(A1:A5)", C: "=ADICIONAR(A1:A5)", D: "=TOTAL(A1:A5)" }, gabarito: "B", explicacao: "Os dois pontos (:) indicam intervalo (até)." },
    { id: 28, disciplina: "Informática", enunciado: "Extensão padrão de arquivos do Word (versões atuais):", alternativas: { A: ".txt", B: ".docx", C: ".xlsx", D: ".pptx" }, gabarito: "B", explicacao: ".docx é o padrão do Microsoft Word." },
    { id: 29, disciplina: "Informática", enunciado: "O 'cérebro' do computador é a:", alternativas: { A: "Memória RAM", B: "Placa Mãe", C: "CPU (Processador)", D: "HD" }, gabarito: "C", explicacao: "CPU (Unidade Central de Processamento) processa os dados." },
    { id: 30, disciplina: "Informática", enunciado: "Qual comando desfaz a última ação no Windows?", alternativas: { A: "Ctrl + X", B: "Ctrl + C", C: "Ctrl + Z", D: "Ctrl + V" }, gabarito: "C", explicacao: "Ctrl + Z é o atalho universal para desfazer." },

    // --- LEGISLAÇÃO (31-40) ---
    { id: 31, disciplina: "Legislação Municipal", enunciado: "Conforme a Lei Orgânica de Passos, o SAAE é uma:", alternativas: { A: "Empresa Privada", B: "Autarquia Municipal", C: "Secretaria Direta", D: "Fundação" }, gabarito: "B", explicacao: "SAAE é uma autarquia com autonomia administrativa." },
    { id: 32, disciplina: "Estatuto do Servidor", enunciado: "Em Passos, o prazo para o servidor tomar posse após a nomeação é de:", alternativas: { A: "15 dias", B: "30 dias", C: "10 dias", D: "45 dias" }, gabarito: "B", explicacao: "O prazo padrão costuma ser de 30 dias (confira sempre o estatuto local atualizado)." },
    { id: 33, disciplina: "Constitucional", enunciado: "O princípio que obriga a administração a ser transparente é o da:", alternativas: { A: "Legalidade", B: "Publicidade", C: "Eficiência", D: "Moralidade" }, gabarito: "B", explicacao: "Publicidade garante o acesso à informação oficial." },
    { id: 34, disciplina: "Licitações (14.133)", enunciado: "A modalidade para venda de bens móveis inservíveis é o:", alternativas: { A: "Pregão", B: "Leilão", C: "Concurso", D: "Diálogo Competitivo" }, gabarito: "B", explicacao: "Leilão é para venda de bens ou alienações." },
    { id: 35, disciplina: "Legislação", enunciado: "O Estatuto da Pessoa com Deficiência garante:", alternativas: { A: "Atendimento prioritário", B: "Isenção total de impostos para todos", C: "Aposentadoria com 1 ano de trabalho", D: "Trabalho apenas em casa" }, gabarito: "A", explicacao: "A prioridade no atendimento é um direito fundamental da LBI." },
    { id: 36, disciplina: "Legislação", enunciado: "A Lei de Acesso à Informação (LAI) diz que o sigilo é:", alternativas: { A: "A regra", B: "A exceção", C: "Proibido sempre", D: "Apenas para o Prefeito" }, gabarito: "B", explicacao: "Publicidade é a regra, sigilo é a exceção." },
    { id: 37, disciplina: "Constitucional", enunciado: "São símbolos da República Federativa do Brasil, EXCETO:", alternativas: { A: "A Bandeira", B: "O Hino", C: "O Brasão", D: "A Foto do Presidente" }, gabarito: "D", explicacao: "Os símbolos são: Bandeira, Hino, Armas (Brasão) e Selo Nacional." },
    { id: 38, disciplina: "Legislação Municipal", enunciado: "O poder legislativo de Passos é exercido pela:", alternativas: { A: "Prefeitura", B: "Câmara Municipal", C: "Fórum", D: "SAAE" }, gabarito: "B", explicacao: "Vereadores na Câmara Municipal exercem o Legislativo." },
    { id: 39, disciplina: "Licitações (14.133)", enunciado: "Qual modalidade é voltada para contratar inovação tecnológica?", alternativas: { A: "Pregão", B: "Diálogo Competitivo", C: "Leilão", D: "Concurso" }, gabarito: "B", explicacao: "Inovação trazida pela nova lei para casos complexos." },
    { id: 40, disciplina: "Estatuto do Servidor", enunciado: "A demissão de servidor estável só ocorre após:", alternativas: { A: "Decisão verbal do chefe", B: "Processo administrativo com ampla defesa", C: "Faltar um dia sem avisar", D: "Troca de Prefeito" }, gabarito: "B", explicacao: "A estabilidade exige o devido processo legal (PAD)." },

    // --- CONHECIMENTOS ESPECÍFICOS (41-50) ---
    { id: 41, disciplina: "Arquivologia", enunciado: "Documentos de consulta diária pertencem ao arquivo:", alternativas: { A: "Permanente", B: "Intermediário", C: "Corrente", D: "Morto" }, gabarito: "C", explicacao: "Corrente = uso frequente." },
    { id: 42, disciplina: "Redação Oficial", enunciado: "Qual o fecho para autoridades superiores?", alternativas: { A: "Atenciosamente", B: "Respeitosamente", C: "Cordialmente", D: "Abraços" }, gabarito: "B", explicacao: "Respeitosamente para superiores; Atenciosamente para iguais/inferiores." },
    { id: 43, disciplina: "Almoxarifado", enunciado: "O inventário realizado uma vez por ano é o:", alternativas: { A: "Rotativo", B: "Periódico/Anual", C: "Permanente", D: "Cego" }, gabarito: "B", explicacao: "Inventário anual é feito no final do exercício." },
    { id: 44, disciplina: "Atendimento", enunciado: "O servidor deve atender o cidadão com:", alternativas: { A: "Impaciência", B: "Urbanidade e Presteza", C: "Dando preferência aos amigos", D: "Dificultando o acesso" }, gabarito: "B", explicacao: "São deveres éticos do servidor público." },
    { id: 45, disciplina: "Administração", enunciado: "A descentralização administrativa ocorre quando:", alternativas: { A: "O chefe faz tudo sozinho", B: "As tarefas são distribuídas para outros entes/pessoas", C: "A prefeitura fecha", D: "O SAAE deixa de existir" }, gabarito: "B", explicacao: "Descentralizar é distribuir competências." },
    { id: 46, disciplina: "Redação Oficial", enunciado: "Qual pronome de tratamento para o Prefeito?", alternativas: { A: "Vossa Senhoria", B: "Vossa Excelência", C: "Vossa Magnificência", D: "Vossa Alteza" }, gabarito: "B", explicacao: "Chefes de poder usam Vossa Excelência." },
    { id: 47, disciplina: "Arquivologia", enunciado: "A tabela que define quanto tempo o documento fica no arquivo é:", alternativas: { A: "Tabela de Preços", B: "Tabela de Temporalidade", C: "Tabela de Salários", D: "Tabela Periódica" }, gabarito: "B", explicacao: "TTD define os prazos de guarda." },
    { id: 48, disciplina: "Almoxarifado", enunciado: "O que significa a sigla PEPS?", alternativas: { A: "Pode Entrar Pessoal Sempre", B: "Primeiro que Entra, Primeiro que Sai", C: "Preço Elevado Por Segurança", D: "Pedido Especial Para Servidor" }, gabarito: "B", explicacao: "Método de controle de estoque." },
    { id: 49, disciplina: "Atendimento", enunciado: "A empatia no atendimento significa:", alternativas: { A: "Concordar com tudo mesmo estando errado", B: "Colocar-se no lugar do cidadão para entender sua dor", C: "Ignorar o problema", D: "Ser engraçado" }, gabarito: "B", explicacao: "Empatia é a base do atendimento humanizado." },
    { id: 50, disciplina: "SAAE Passos", enunciado: "No atendimento ao público do SAAE, o Agente Administrativo deve priorizar:", alternativas: { A: "A rapidez acima da qualidade", B: "A legalidade e a eficiência no serviço prestado", C: "O preenchimento manual de tudo", D: "O uso de gírias" }, gabarito: "B", explicacao: "Eficiência e Legalidade são pilares do LIMPE na administração pública." }
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
        res.json({ correta: true, mensagem: "Excelente! Você acertou.", explicacao: questao.explicacao, proxima: true });
    } else {
        res.json({ correta: false, mensagem: "Resposta incorreta. Tente novamente!", explicacao: null, proxima: false });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Simulado 50 Questões Online na porta ${PORT}`));
