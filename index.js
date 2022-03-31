const express = require('express');
const app = express();

const repository = require('./model/alunoModel');
app.use(express.json());

app.get('/pessoas', repository.getPessoas)
app.get('/pessoas/:id', repository.getPessoaById)
app.post('/pessoas', repository.createPessoa)
app.put('/pessoas/:id', repository.updatePessoa)
app.delete('/pessoas/:id', repository.deletePessoa)

app.listen(process.env.PORT);