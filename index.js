const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const app = express();
app.use(cors());
app.use(express.json());

const link_do_banco = process.env.MONGO_URI;
mongoose.connect(link_do_banco)
    .then(function () {
        console.log("Conexão com o banco de dados estabelecida com sucesso!");
    })
    .catch(function (erro) {
        console.log("Erro ao conectar com o banco de dados:", erro);
    });

const usuariosSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cargo: { type: String, required: true }
});

const Usuario = mongoose.model('Usuario', usuariosSchema);

app.get('/usuarios', async function (requisicao, response) {
    Usuario.find()
        .then(function (usuarios) {
            return response.json(usuarios);
        })
        .catch(function (erro) {
            return response.status(500).json({ erro: "Erro ao buscar usuários" });
        });
});

app.post('/usuarios', async function (requisicao, response) {
    const dadosRecebidos = requisicao.body;
    Usuario.create({

        nome: dadosRecebidos.nome,
        cargo: dadosRecebidos.cargo
    })

        .then(function (novoUsuario) {
            return response.status(201).json(novoUsuario);
        })
        .catch(function (erro) {
            return response.status(500).json({ erro: "Erro ao criar usuário" });
        });
});


const PORTA = 3000;
app.listen(PORTA, function () {
    console.log(`🚀 Backend (Ajustado) rodando em http://localhost:${PORTA}`);
});
