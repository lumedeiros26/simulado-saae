const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const path = require('path');

// 1. USE O LINK REAL QUE VOCÊ PEGOU NO BOTAO CONNECT
const uri = "mongodb+srv://lumedeiros:db_passos50@cluster0.puegaij.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

app.use(express.json());
app.use(express.static('public'));

// 2. ROTA DE TESTE (Para saber se o banco está respondendo)
app.get('/status-banco', async (req, res) => {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        res.send("O Banco de Dados está CONECTADO! ✅");
    } catch (err) {
        res.status(500).send("Erro na conexão: " + err.message);
    }
});

// 3. ROTA DO SIMULADO
app.get('/gerar-simulado', async (req, res) => {
    try {
        await client.connect();
        // CERTIFIQUE-SE QUE O NOME ABAIXO É EXATAMENTE O DO ATLAS
        const database = client.db('simulado-saae'); 
        const collection = database.collection('questoes');
        
        const simulado = await collection.aggregate([{ $sample: { size: 50 } }]).toArray();
        
        if (simulado.length === 0) {
            return res.json([{ disciplina: "Erro", enunciado: "Banco de dados vazio! Adicione questões no Atlas.", alternativas: {A:"",B:"",C:"",D:""}, gabarito: "A" }]);
        }
        
        res.json(simulado);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
