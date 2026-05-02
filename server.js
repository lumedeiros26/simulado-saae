const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();

// Link do seu MongoDB Atlas (você cria um gratuito lá)
const uri = "SUA_URL_DO_MONGODB_AQUI"; 
const client = new MongoClient(uri);

app.use(express.json());
app.use(express.static('public'));

async function getQuestoesAleatorias() {
    const database = client.db('simulado_saae');
    const questoes = database.collection('questoes');
    
    // O comando 'sample' do MongoDB sorteia 50 questões aleatórias
    return await questoes.aggregate([{ $sample: { size: 50 } }]).toArray();
}

app.get('/gerar-simulado', async (req, res) => {
    try {
        const simulado = await getQuestoesAleatorias();
        res.json(simulado);
    } catch (err) {
        res.status(500).send("Erro ao acessar o banco de dados");
    }
});

// Porta do servidor
app.listen(3000, () => console.log("Servidor Profissional SAAE Iniciado"));
