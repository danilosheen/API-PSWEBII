const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const {obterProfessores, obterAlunos} = require('./model/professorModel');

app.use(express.json());

var dados = [
    {
        id: 1,
        nome: 'Harley Macêdo',
        area: 'Programação Web'
    },
    {
        id: 2,
        nome: 'Robson Feitosa',
        area: 'Estrutura de Dados'
    },
    {
        id: 3,
        nome: 'Yuri Lacerda',
        area: 'Banco de Dados'
    }
]

app.post('/login', (req, res) => {
    if (req.body.user === 'harleymacedo' && req.body.pass === '123456') {
        const id = 1;
        var token = jwt.sign({id}, process.env.APP_KEY, {expiresIn: 300});
        res.set("x-access-token", token);
        res.json({auth: true, token: token});
    } else {
        res.status(500).json({mensagem: 'Login inválido'});
    }

    
});

function verifyJWT (req, res, next) {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({auth: false, mensagem: 'Sem token de verificação'});
    }

    jwt.verify(token, process.env.APP_KEY, function (error, decoded) {
        if (error) {
            return res.status(500).json({mensagem: 'Token inválido'});
        }
        next();
    });
}

app.get('/alunos', (req, res) => {
    res.json(dados);
});

app.get('/bd/alunos', async (req, res) => {
    try{
        const resultado = await obterAlunos(req, res);
        const dados = await resultado.rows;
        res.json(dados);
    } catch(erro) {
        res.json({'mensagem': 'Erro na obteção dos dados'})
    }

});

app.get('/alunos/:id', (req, res) => {
    let achado = null;
    dados.forEach( (objeto) => {
        if (objeto.id == req.params.id) {
            achado = objeto;
        } 
    });
    if (achado) {
        res.json(achado);
    } else {
        res.json({
            mensagem: 'Valor não encontrado',
            erro: true
        });
    }
});

app.post('/alunos', verifyJWT, (req, res, next) => {
    dados.push(req.body);
    res.json({
        mensagem: 'Informação gravada com sucesso',
        erro: false
    });
});

app.put('/alunos', (req, res) => {
    dados.forEach( (objeto, indice) => {
        if (objeto.id == req.body.id) {
            dados[indice] = req.body;
        } 
    });
    res.json({
        mensagem: 'Informação atualizada',
        erro: false
    });
});

app.delete('/alunos', (req, res) => {
    dados.forEach( (objeto, indice) => {
        if (objeto.id == req.body.id) {
            dados.splice(indice);
        }
    });
    res.json({
        mensagem: 'Informação excluída com sucesso',
        erro: false
    });
});

app.listen(process.env.PORT);