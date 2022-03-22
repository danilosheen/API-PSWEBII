const con = require('./conexao');

const obterProfessores = async (req, res) => {
    const resultado = await con.query('select * from professor2');
    return resultado;
}

module.exports = {obterProfessores}