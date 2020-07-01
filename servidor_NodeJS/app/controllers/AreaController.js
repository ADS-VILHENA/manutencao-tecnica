const EquipamentoDAO = require("../model/EquipamentoDAO");

module.exports.visualizar_listar_area = (aplicacao, req, res) => {

    var conexao = aplicacao.config.db;
    var Area_listar = new aplicacao.app.model.AreaDAO(conexao);

    Area_listar.buscar_Area_bd((req, result) => {
        let area = result;
        res.render("painel admin/pesquisar_area", { area });
    })
}
module.exports.visualizar_cadastrar_area = (aplicacao, req, res) => {
    res.render("painel admin/cadastrar_area");
}
module.exports.salvar_area = function (aplicacao, req, res) {
    var conexao = aplicacao.config.db;
    var equipamento_model = new aplicacao.app.model.AreaDAO(conexao);
    var area = req.body;

    equipamento_model.salvar_area(area, (requisicao, result) => {
        let id_inserido = result.insertId;
        let erros = {};
        let problemas = {};

        let id_area = { id_equipamento: id_inserido }
        console.log(result);
        if (result.affectedRows == 1) {
            let equipamentos_da_area = {};
            let dados_equipamento_busca_por_termo = {};
            let dados_area = { nome_area: req.body.nome, descricao_area: req.body.descricao, id_area: result.insertId };
            res.render("painel admin/atualizar_area", { erros, dados_area, problemas,equipamentos_da_area,dados_equipamento_busca_por_termo});
        } else {
            console.log("log --> algo deu errado e não conseguiu inserir o equipamento")
        }


    });
}
module.exports.visualizar_listar_areas = (aplicacao, req, res, termo) => {

    var conexao = aplicacao.config.db;
    var area_listar = new aplicacao.app.model.AreaDAO(conexao);

    area_listar.buscar_areas_bd(termo, (req, result) => {
        console.log(result);

        let areas = result;
        res.render("painel admin/pesquisar_area", { areas });
    })
}
module.exports.deletar_area_by_id = (aplicacao, req, res, id_area) => {

    var conexao = aplicacao.config.db;
    var area_model = new aplicacao.app.model.AreaDAO(conexao);
    area_model.deletar_area_bd_by_id(id_area, (req, result) => {
        console.log(result);

        if (result.affectedRows == 1) {
            res.redirect('/painel_admin/pesquisar_areas');
        } else {
            console.log("Não deletou, algo deu errado");
        }

    })

}
module.exports.atualizar_area_by_id = function (aplicacao, req, res, id_area, termo_busca_equipamento) {
    var conexao = aplicacao.config.db;
    var area_model = new aplicacao.app.model.AreaDAO(conexao);

    area_model.buscar_area_bd_by_id(id_area, (req, result) => {
        let dados_bd = result[0];
        let dados_area = {
            id_area:dados_bd.id_area,
            nome_area: dados_bd.nome,
            descricao_area: dados_bd.descricao
        }
        //console.log(result[0])
       console.log(dados_area);

        if (result.length == 0) {
            console.log("Not found 404  --> log ao buscar dados do equipamento por id");
        } else {
            //agora vou buscar os equipamentos da area
            area_model.buscar_area_by_area_id(id_area, (req, result) => {
                //console.log(result);
                let equipamentos_da_area = result;
                var equipamentoDAO = new aplicacao.app.model.EquipamentoDAO(conexao);
                equipamentoDAO.buscar_equipamentos_bd(termo_busca_equipamento, (req, result_equipamentos) => {
                    let dados_equipamento_busca_por_termo = result_equipamentos;
                    let erros = {};
                    //console.log(dados_equipamento);
                    res.render("painel admin/atualizar_area", { erros, id_area, equipamentos_da_area, dados_area,dados_equipamento_busca_por_termo});
                })

            })

        }
    })


}
module.exports.adicionar_equipamento_na_area = function(aplicacao,req, res,id_equipamento,id_area){
  var conexao = aplicacao.config.db;
  var areaDAO = new aplicacao.app.model.AreaDAO(conexao);
  
  areaDAO.adicionar_equipamento(id_equipamento,id_area,(req,result)=>{
   //console.log("o id do equipamento é "+id_equipamento);
   //console.log("o id do area é "+id_area);

    if(result.affectedRows == 1){
      res.redirect('/painel_admin/atualizar_area_by_id/'+id_area);
    }else{
      console.log('log --> Deu erro, não adicionou problema')
    }
  })

}
module.exports.deletar_area_equipamento = function(aplicacao,req, res,id_area_equipamento,id_area){
    var conexao = aplicacao.config.db;
    var areaDAO = new aplicacao.app.model.AreaDAO(conexao);
    
    areaDAO.deletar_area_equipamento(id_area_equipamento,(req,result)=>{
     //console.log("o id do equipamento é "+id_equipamento);
     //console.log("o id do area é "+id_area);
  
      if(result.affectedRows == 1){
        res.redirect('/painel_admin/atualizar_area_by_id/'+id_area);
      }else{
        console.log('log --> Deu erro, não adicionou problema')
      }
    })
  }