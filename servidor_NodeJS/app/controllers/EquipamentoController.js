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

module.exports.visualizar_cadastrar_equipamentos = (aplicacao, req, res)=>{
  let erros = {};
  res.render("painel admin/cadastrar_equipamento",{erros});
}
module.exports.visualizar_atualizar_equipamentos = (aplicacao, req, res,id_equipamento)=>{
  let erros = {};
  let id;
  res.render("painel admin/atualizar_equipamento",{erros});
}

module.exports.atualizar_equipamento = (aplicacao, req, res)=>{
  
  let equipamento = {
    nome_equipamento:req.body.nome_equipamento,
    descricao_equipamento:req.body.descricao_equipamento,
    id_equipamento:req.body.id_equipamento
  }
  
  var conexao = aplicacao.config.db;
  var equipamentoDAO = new aplicacao.app.model.EquipamentoDAO(conexao);
  
  equipamentoDAO.atualizar_equipamento(equipamento, (requisicao, result) => {
     // console.log(result);

  //parametros para renderizar atualizar equipamento
   
    let erros = {};
    let dados_equipamento = {nome_equipamento:req.body.nome_equipamento,descricao_equipamento:req.body.descricao_equipamento};
    let id_equipamento = {id_equipamento:req.body.id_equipamento};
   
   res.render("painel admin/atualizar_equipamento",{erros,id_equipamento,dados_equipamento});
});

}


module.exports.salvar_equipamento = function(aplicacao,req,res){
  var conexao = aplicacao.config.db;
  var equipamento_model = new aplicacao.app.model.EquipamentoDAO(conexao);
  var equipamento = req.body;
  
  equipamento_model.salvar_equipamento(equipamento, (requisicao, result) => {
    let id_inserido =  result.insertId;
    let erros = {};
    let dados_equipamento = {nome_equipamento:req.body.nome_equipamento,descricao_equipamento:req.body.descricao_equipamento};
    let id_equipamento = {id_equipamento:id_inserido}
    
    res.render("painel admin/atualizar_equipamento",{erros,id_equipamento,dados_equipamento});
      
  });
}

