const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();

const uri = "mongodb+srv://luizademedeiros:passos50@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.use(express.json());
app.use(express.static('public'));

app.get('/gerar-simulado', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('simulado-saae'); 
        const collection = database.collection('questoes');
        
        // Sorteia 50 questões aleatórias sem repetir
        const simulado = await collection.aggregate([{ $sample: { size: 50 } }]).toArray();
        
        res.json(simulado);
    } catch (err) {
        res.status(500).json({ erro: "Erro no Banco de Dados" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
