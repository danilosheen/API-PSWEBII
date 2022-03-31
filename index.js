const express = require('express');
const app = express();
require('dotenv').config()

const repository = require('./model/alunoModel');
app.use(express.json());

app.post('/login', repository.login)
app.get('/alunos', repository.getAlunos)
app.get('/alunos/:id', repository.getAlunoById)
app.post('/alunos', repository.verifyJWT, repository.createAluno)
app.put('/alunos/:id', repository.verifyJWT, repository.updateAluno)
app.delete('/alunos/:id', repository.verifyJWT, repository.deleteAluno)

app.listen(process.env.PORT);