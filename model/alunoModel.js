const con = require('./conexao');

const obterAlunos = async (req, res) => {
    const resultado = await con.query('select * from Alunos');
    return resultado;
}

module.exports = {obterAlunos}