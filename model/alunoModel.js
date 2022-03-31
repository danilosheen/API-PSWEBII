const req = require('express/lib/request');
const res = require('express/lib/response');
const con = require('./conexao');

const Login = (request, response) => {
    if (req.body.user === process.env.USUARIO && req.body.pass === process.env.SENHA) {
        const id = 1;
        var token = jwt.sign({ id }, process.env.APP_KEY, { expiresIn: 300 });
        res.set("x-access-token", token);
        res.json({ auth: true, token: token });
    } else {
        res.status(500).json({ mensagem: 'Login Inválido' });
    }
}

const getAlunos = (request, response) => {
    pool.query('SELECT * FROM pessoas ORDER BY id DESC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getAlunoById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM pessoas WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createAluno = (request, response) => {
    const { id, nome, curso } = request.body

    pool.query('INSERT INTO pessoas (id, nome, curso) VALUES ($1, $2, $3)', [id, nome, curso], (error, result) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Pessoa criada com sucesso.`)
    })
}

const updateAluno = (request, response) => {
    const iden = parseInt(request.params.iden)
    const { id, nome, curso } = request.body

    pool.query(
        'UPDATE pessoas SET id = $1, nome = $2, curso = $3 WHERE id = $4',
        [id, nome, curso, iden],
        (error, result) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Pessoa ${iden} atualizada com sucesso.`)
        }
    )
}

const deleteAluno = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM pessoas WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Pessoa removida com sucesso com o identificador: ${id}`)
    })
}

module.exports = {
    Login,
    getAlunos,
    getAlunoById,
    createAluno,
    updateAluno,
    deleteAluno,

}