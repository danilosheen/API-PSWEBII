const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');

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
        var token = jwt.sign({id}, 'chaveapp123', {expiresIn: 300});
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

    jwt.verify(token, 'chaveapp123', function (error, decoded) {
        if (error) {
            return res.status(500).json({mensagem: 'Token inválido'});
        }
        next();
    });
}

app.get('/professores', (req, res) => {
    res.json(dados);
});

app.get('/professores/:id', (req, res) => {
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

app.post('/professores', verifyJWT, (req, res, next) => {
    dados.push(req.body);
    res.json({
        mensagem: 'Informação gravada com sucesso',
        erro: false
    });
});

app.put('/professores', (req, res) => {
    dados.forEach( (objeto, indice) => {
        if (objeto.id == req.body.id) {
            dados[indice] = req.body;
        } 
    });
    res.json({
        mensagem: 'Informação atualizada com sucesso',
        erro: false
    });
});

app.delete('/professores', (req, res) => {
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

app.listen(process.env.PORT || 3000);