module.exports.visualizar_listar_equipamentos = (aplicacao, req, res,termo)=>{

    var conexao = aplicacao.config.db;
    var equipamento_listar = new aplicacao.app.model.EquipamentoDAO(conexao);

    equipamento_listar.buscar_equipamentos_bd(termo,(req,result)=>{
        //console.log(result);
        //res.send(result);
        let equipamentos = result;
        res.render("painel admin/pesquisar_equipamento",{equipamentos}) ;
    })
}
module.exports.visualizar_cadastrar_equipamentos = (aplicacao, req, res)=>{
  let erros = {};
  problemas = {};
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
    
    //let erros = {};
    let dados_equipamento = {nome_equipamento:req.body.nome_equipamento,descricao_equipamento:req.body.descricao_equipamento, id_equipamento:req.body.id_equipamento};
   // let id_equipamento = {id_equipamento:req.body.id_equipamento};
     
    let id_equipamento = req.body.id_equipamento;
    equipamentoDAO.buscar_problemas(id_equipamento,(req,result_problemas)=>{
      let problemas = result_problemas;
      let erros = {};
    console.log(problemas);
    res.render("painel admin/atualizar_equipamento",{erros,id_equipamento,dados_equipamento, problemas});
    })
   
});

}
module.exports.salvar_equipamento = function(aplicacao,req,res){
  var conexao = aplicacao.config.db;
  var equipamento_model = new aplicacao.app.model.EquipamentoDAO(conexao);
  var equipamento = req.body;
  
  equipamento_model.salvar_equipamento(equipamento, (requisicao, result) => {
    let id_inserido =  result.insertId;
    let erros = {};
    let problemas = {};
    
    let id_equipamento = {id_equipamento:id_inserido}
    console.log(result);
    if(result.affectedRows == 1){
      let dados_equipamento = {nome_equipamento:req.body.nome_equipamento,descricao_equipamento:req.body.descricao_equipamento,id_equipamento:result.insertId};
      res.render("painel admin/atualizar_equipamento",{erros,id_equipamento,dados_equipamento,problemas});
    }else{
      console.log("log --> algo deu errado e não conseguiu inserir o equipamento")
    }
    
      
  });
}
module.exports.deletar_problema_by_id = (aplicacao,req,res,id_problema,id_equipamento)=>{
 
  var conexao = aplicacao.config.db;
  var equipamento_model = new aplicacao.app.model.EquipamentoDAO(conexao);
  
  equipamento_model.deletar_problema_bd_by_id(id_problema,(req,result)=>{
   if(result.affectedRows == 1){
    res.redirect('/painel_admin/atualizar_equipamento_by_id/'+id_equipamento);
   }else{
    console.log("Não deletou, algo deu errado");
   }
  })

}
module.exports.deletar_equipamento_by_id = (aplicacao,req,res,id_equipamento)=>{
 
  var conexao = aplicacao.config.db;
  var equipamento_model = new aplicacao.app.model.EquipamentoDAO(conexao);
  //console.log("log --> o id do equipamento é"+ id_equipamento);
  equipamento_model.deletar_equipamento_bd_by_id(id_equipamento,(req,result)=>{
   console.log(result);
   
   if(result.affectedRows == 1){
    res.redirect('/painel_admin/pesquisar_equipamentos');
   }else{
    console.log("Não deletou, algo deu errado");
   }
   
  })
  
}
module.exports.adicionar_equipamento_by_id = (aplicacao,req,res,id_equipamento,nome_problema)=>{
 
  var conexao = aplicacao.config.db;
  var equipamento_model = new aplicacao.app.model.EquipamentoDAO(conexao);
  
  equipamento_model.adicionar_problema(id_equipamento,nome_problema,(req,result)=>{
    if(result.affectedRows == 1){
      res.redirect('/painel_admin/atualizar_equipamento_by_id/'+id_equipamento);
    }else{
      console.log('log --> Deu erro, não adicionou problema')
    }
  })

}
module.exports.atualizar_equipamento_by_id = function (aplicacao, req,res, id_equipamento){
  var conexao = aplicacao.config.db;
  var equipamento_model = new aplicacao.app.model.EquipamentoDAO(conexao);
  
  equipamento_model.buscar_equipamento_bd_by_id(id_equipamento,(req, result)=>{
    let dados_equipamento = result[0];
    console.log(dados_equipamento);
    

    if(result.length == 0){
      console.log("Not found 404  --> log ao buscar dados do equipamento por id");
    }else{
      //agora vou buscar os problemas dos equipamentos
      equipamento_model.buscar_problemas(id_equipamento,(req,result_problemas)=>{
        let problemas = result_problemas;
        let erros = {};
      console.log(dados_equipamento);
      res.render("painel admin/atualizar_equipamento",{erros,id_equipamento,dados_equipamento, problemas});
      })
      
    }
  })
  
  
}

