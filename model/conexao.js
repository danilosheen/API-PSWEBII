const {pool} = require('pg');
const con = new pool({
    connectionString: process.env.CON_STR 
});

module.exports = con;