module.exports.visualizar_index = (aplicacao, req, res)=>{

    var conexao = aplicacao.config.db;
    var index = new aplicacao.app.model.Index_ADMDAO(conexao);

    
        
        res.render("painel admin/index") ;
    
}