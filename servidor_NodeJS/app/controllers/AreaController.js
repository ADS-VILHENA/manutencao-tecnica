module.exports.visualizar_listar_area = (aplicacao, req, res)=>{

    var conexao = aplicacao.config.db;
    var Area_listar = new aplicacao.app.model.AreaDAO(conexao);

    Area_listar.buscar_Area_bd((req,result)=>{
        let area = result;
        res.render("painel admin/pesquisar_area",{area}) ;
    }) 

}