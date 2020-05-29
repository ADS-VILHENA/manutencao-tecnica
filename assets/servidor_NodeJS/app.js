//importar as configurações do servidor

var app = require('./config/server');

//parametrizar nossa porta de escuta
app.listen(2020,()=>{
    console.log('Servidor online na porta 2020!');
})