module.exports.visualizar_listar_equipamentos = (aplicacao, req, res)=>{

    var conexao = aplicacao.config.db;
    var equipamento_listar = new aplicacao.app.model.EquipamentoDAO(conexao);

    equipamento_listar.buscar_equipamentos_bd((req,result)=>{
        //console.log(result);
        //res.send(result);
        let equipamentos = result;
        res.render("painel admin/pesquisar_equipamento",{equipamentos}) ;
    })
 
}