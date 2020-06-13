module.exports.visualizar_listar_tipo_area = (aplicacao, req, res)=>{

    var conexao = aplicacao.config.db;
    var tipodeArea_listar = new aplicacao.app.model.TipoAreaDAO(conexao);
  
    tipodeArea_listar.buscar_tipoArea_bd((req,result)=>{
        let tipodearea = result;
        res.render("painel admin/pesquisar_tipo_area",{tipodearea}) ;
    }) 
  
  }
  
  module.exports.visualizar_cadastrar_tipoarea = (aplicacao, req, res)=>{
  let erros = {};
  res.render("painel admin/cadastrar_tipo_area",{erros});
  }
  module.exports.visualizar_atualizar_tipoarea = (aplicacao, req, res, id_tipo_area)=>{
  let erros = {};
  let id;
  res.render("painel admin/atualizar_tipo_area",{erros});
  }
  
  module.exports.atualizar_tipoarea = (aplicacao, req, res)=>{
  
  let tipoarea = {
    nome_tipo_area:req.body.nome_tipo_area,
    descricao_tipo_area:req.body.descricao_tipo_area,
    id_tipo_area:req.body.id_tipo_area
  }
  
  var conexao = aplicacao.config.db;
  var tipoareaDAO = new aplicacao.app.model.TipoAreaDAO(conexao);
  
  tipoareaDAO.atualizar_tipoarea(tipoarea, (requisicao, result) => {
     // console.log(result);
  
  //parametros para renderizar atualizar equipamento
   
    let erros = {};
    let dados_tipoarea = {nome_tipo_area:req.body.nome_tipo_area,descricao_tipo_area:req.body.descricao_tipo_area};
    let id_tipo_area = {id_tipo_area:req.body.id_tipo_area};
   
   res.render("painel admin/atualizar_tipo_area",{erros,id_tipo_area,dados_tipoarea});
  });
  
  }
  
  
  module.exports.salvar_tipoarea = function(aplicacao,req,res){
  var conexao = aplicacao.config.db;
  var tipoarea_model = new aplicacao.app.model.TipoAreaDAO(conexao);
  var tipoarea = req.body;
  
  tipoarea_model.salvar_tipoarea(tipoarea,(requisicao, result) => {
    let id_inserido =  result.insertId;
    let erros = {};
    let dados_tipoarea = {nome_tipo_area:req.body.nome_tipo_area,descricao_tipo_area:req.body.descricao_tipo_area};
    let id_tipo_area = {id_tipo_area:id_inserido}
    
    res.render("painel admin/atualizar_tipo_area",{erros,id_tipo_area,dados_tipoarea});
      
  });

  }