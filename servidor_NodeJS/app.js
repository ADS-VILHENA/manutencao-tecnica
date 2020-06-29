//importar as configurações do servidor
const https = require("https"),
fs = require("fs");

//importando os certificados
const options = {
    key: fs.readFileSync("config/certificados/key.pem"),
    cert: fs.readFileSync("config/certificados/cert.pem")
  };
var app = require('./config/server');
/*
//executando com http
app.listen(2525,()=>{
    console.log('Servidor online na porta 2525!');
})
*/

//executando com https
https.createServer(options, app).listen(443,()=>{
    console.log("Servidor online em : https://localhost:443/")
});
