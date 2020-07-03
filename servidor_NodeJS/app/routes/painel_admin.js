module.exports = (aplicacao)=>{
//rota para pesquisar equipamentos no painel admin
aplicacao.get('/painel_admin/pesquisar_equipamentos', (req, res) => {
        let termo = req.query.termo;
        if(termo == undefined){
           termo = "";
        }
       // res.send("Listar equipamentos");
        aplicacao.app.controllers.EquipamentoController.visualizar_listar_equipamentos(aplicacao, req, res,termo);
    //aplicacao.app.controllers.ChamadoController.visualizar_home(aplicacao, req, res, { erro: 0 },erros_submit);



})

aplicacao.get('/painel_admin/cadastrar_equipamentos', (req, res) => {
    
     aplicacao.app.controllers.EquipamentoController.visualizar_cadastrar_equipamentos(aplicacao, req, res);
 
})

aplicacao.post('/painel_admin/acao/salvar_equipamento', (req, res) => {
   
    aplicacao.app.controllers.EquipamentoController.salvar_equipamento(aplicacao, req, res);
})

aplicacao.post('/painel_admin/acao/atualizar_equipamento',(req,res)=>{
    aplicacao.app.controllers.EquipamentoController.atualizar_equipamento(aplicacao, req, res);
})
aplicacao.get('/painel_admin/atualizar_equipamento_by_id/:id',(req,res)=>{
    let id = req.params.id;
    console.log(id);
    aplicacao.app.controllers.EquipamentoController.atualizar_equipamento_by_id(aplicacao, req, res, id);
})

//rotas para problemas de equipamento
aplicacao.get('/painel_admin/deletar_equipamento_by_id',(req,res)=>{
    let id_equipamento = req.query.id_equipamento;
    aplicacao.app.controllers.EquipamentoController.deletar_equipamento_by_id(aplicacao, req, res,id_equipamento);
})
aplicacao.get('/painel_admin/deletar_problema_by_id',(req,res)=>{
    let id_problema = req.query.id_problema;
    let id_equipamento = req.query.id_equipamento;
    
   aplicacao.app.controllers.EquipamentoController.deletar_problema_by_id(aplicacao, req, res, id_problema, id_equipamento);
})
aplicacao.get('/painel_admin/adcionar_problema_by_id',(req,res)=>{

    let id_equipamento = req.query.id_equipamento;
    let nome_problema = req.query.nome_problema;
    
   aplicacao.app.controllers.EquipamentoController.adicionar_equipamento_by_id(aplicacao,req,res,id_equipamento,nome_problema);
})
aplicacao.get('/painel_admin/adcionar_equipamento_by_id',(req,res)=>{

    let id_equipamento = req.query.id_equipamento;
    let id_area = req.query.id_area;
    
    
   aplicacao.app.controllers.AreaController.adicionar_equipamento_na_area(aplicacao,req,res,id_equipamento,id_area);
})
//---------------------------------------------------

//rotas para area
/*
aplicacao.get('/painel_admin/pesquisar_areas', (req, res) => {
   aplicacao.app.controllers.AreaController.visualizar_listar_area(aplicacao, req, res);
})
*/
//visualizar cadastrar area
aplicacao.get('/painel_admin/cadastrar_area',(req,res)=>{
aplicacao.app.controllers.AreaController.visualizar_cadastrar_area(aplicacao,req,res);
})
//salvar no bd e chamar a tela de atualizar area
aplicacao.post('/painel_admin/acao/salvar_area', (req, res) => {
    aplicacao.app.controllers.AreaController.salvar_area(aplicacao, req, res);
})
//pesquisar areas
aplicacao.get('/painel_admin/pesquisar_areas', (req, res) => {
    let termo = req.query.termo;
    if(termo == undefined){
       termo = "";
    }
    aplicacao.app.controllers.AreaController.visualizar_listar_areas(aplicacao, req, res,termo);
})
//rotas para problemas de equipamento
aplicacao.get('/painel_admin/deletar_area_by_id',(req,res)=>{
    let id_area = req.query.id_area;
    aplicacao.app.controllers.AreaController.deletar_area_by_id(aplicacao, req, res,id_area);
})
aplicacao.get('/painel_admin/atualizar_area_by_id/:id',(req,res)=>{
    let id = req.params.id;
    let termo_busca_equipamento = req.query.termo_busca_equipamento;
    //console.log(termo_busca_equipamento);
    if(termo_busca_equipamento==undefined){
        termo_busca_equipamento="dfasdfasdfasdfasgaefgsthtufyusrtywetWERQweQWD";
    }
    //console.log(id);
    aplicacao.app.controllers.AreaController.atualizar_area_by_id(aplicacao, req, res, id,termo_busca_equipamento);
})
aplicacao.get('/painel_admin/adicionar_equipamento_na_area',(req,res)=>{
    let id_equipamento = req.params.id_equipamento;
    let id_area = req.query.id_area;
    //console.log(termo_busca_equipamento);
   
    //console.log(id);
    aplicacao.app.controllers.AreaController.adicionar_equipamento_na_area(aplicacao, req, res,id_equipamento,id_area);
})
aplicacao.get('/painel_admin/deletar_area_equipamento/:id',(req,res)=>{
    let id_area_equipamento = req.query.id_area_equipamento;
    let id_area = req.params.id;
    //console.log(termo_busca_equipamento);
   
    //console.log(id);
    aplicacao.app.controllers.AreaController.deletar_area_equipamento(aplicacao, req, res,id_area_equipamento,id_area);
})


//---------------------------------------------------
// rotas tipo_area
//rota para listar tipos de area painel admin
aplicacao.get('/painel_admin/pesquisar_tipo_areas', (req, res) => {
    aplicacao.app.controllers.TipoAreaController.visualizar_listar_tipo_area(aplicacao, req, res);
})
aplicacao.get('/painel_admin/cadastrar_tipoarea', (req, res) => {
    
    aplicacao.app.controllers.TipoAreaController.visualizar_cadastrar_tipoarea(aplicacao, req, res);

})

aplicacao.delete('/painel_admin/deletar_tipoareas', (req, res) => {
  
    aplicacao.app.controllers.TipoAreaController.deletar_tipoarea(aplicacao, req, res);
 })

aplicacao.post('/painel_admin/acao/salvar_tipoarea', (req, res) => {
  
   aplicacao.app.controllers.TipoAreaController.salvar_tipoarea(aplicacao, req, res);
})

aplicacao.post('/painel_admin/acao/atualizar_tipoarea',(req,res)=>{
   aplicacao.app.controllers.TipoAreaController.atualizar_tipoarea(aplicacao, req, res);
})
/**-----------------------------------Rota Index------------------------------------------- */
aplicacao.get('/painel_admin/index', (req, res) => {
    aplicacao.app.controllers.Index_ADMController.visualizar_index(aplicacao, req, res);
 })

 /*login*/
 aplicacao.get('/painel_admin/', (req, res) => {
    aplicacao.app.controllers.loginController.visualizar_login(aplicacao, req, res);
 })

//---------------------------------------------------
// rotas chamado
//rota para listar tipos de area painel admin
aplicacao.get('/painel_admin/listar_chamados', (req, res) => {
    let page = req.query.page;
    if(page==undefined){page=0}
    page=parseInt(page);
    aplicacao.app.controllers.ChamadoController.visualizar_listar_chamados(aplicacao, req, res,page);
 })
}