//importar o framework express
var express = require('express');
//importando o consign
var consign = require('consign');
//importar o body parser
var bodyParser = require('body-parser');
//importar o express validator
var express_validator = require('express-validator');
//importar o upload
var upload = require('express-fileupload');

//iniciar o express 
var app = express();

//setar as variáveis  view engine e views do express.
app.set('view engine','ejs');
app.set('views','./app/views');

//configurar o middleware express.static
app.use(upload());
app.use(express.static('./app/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//configurando o middleware express-validator



//configurando o consign (carregar os meus arquivos essenciais dentro da variável app)
consign()
.include('app/routes')
.then ('app/model')
.then('app/controllers')
.then('config/db.js')
.into(app);

//exportando o objeto app
module.exports = app;