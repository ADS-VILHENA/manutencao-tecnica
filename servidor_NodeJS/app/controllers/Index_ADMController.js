module.exports.visualizar_index = (aplicacao, req, res)=>{

    var conexao = aplicacao.config.db;
    var index = new aplicacao.app.model.IndexDAO(conexao);

    index.visualizar_index((req,result)=>{
        //console.log(result);
        //res.send(result);
        
        res.render("painel admin/index") ;
    })
}