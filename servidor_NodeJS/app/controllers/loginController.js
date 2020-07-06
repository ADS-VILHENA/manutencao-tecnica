
module.exports.visualizar_login = (aplicacao, req, res,erro_validacao,erro_autenticacao)=>{
     console.log(erro_validacao);
     console.log(erro_autenticacao);
     res.render("painel admin/login",{erro_validacao,erro_autenticacao}) ;
}

module.exports.autenticar = (aplicacao,req,res)=>{
    let config = require('../../config.json');
    let usuario = req.body.usuario;
    let senha = req.body.senha;

    if(usuario==config.LOGIN.usuario&&senha==config.LOGIN.senha){
       req.session.autorizado = true;
    }else{
        req.session.autorizado = false;
    }

    if(req.session.autorizado == true){
        res.redirect('/painel_admin/listar_chamados');
    }else{
        let erro_validacao = {};
        let erro_autenticacao = {erro:"Usuário ou senha incorretos!"};
        this.visualizar_login(aplicacao,req,res,erro_validacao,erro_autenticacao);
    }
}

