var mysql = require('mysql');


var connection = mysql.createConnection({
        host:"localhost",
        user:"hoot",
        password:"Suporte99",
        database: 'manutencao_tecnica'
    });

module.exports = connection;