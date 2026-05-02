const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();

const uri = "mongodb+srv://lumedeiros:<db_passos50>@cluster0.puegaij.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

app.use(express.json());
app.use(express.static('public'));

app.get('/gerar-simulado', async (req, res) => {
    try {
        console.log("Tentando conectar ao MongoDB...");
        await client.connect();
        const database = client.db('simulado-saae');
        const collection = database.collection('questoes');
        
        const simulado = await collection.aggregate([{ $sample: { size: 50 } }]).toArray();
        console.log("Questões encontradas:", simulado.length);
        
        res.json(simulado);
    } catch (err) {
        console.error("ERRO DE CONEXÃO:", err.message);
        res.status(500).json({ erro: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
