module.exports.visualizar_login = (aplicacao, req, res)=>{

    var conexao = aplicacao.config.db;
    var index = new aplicacao.app.model.loginDAO(conexao);

 
     res.render("painel admin/login") ;
}