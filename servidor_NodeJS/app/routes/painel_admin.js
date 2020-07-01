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
    
   aplicacao.app.controllers.EquipamentoController.adicionar_equipamento_by_id(aplicacao, req, res, id_equipamento,nome_problema);
})

//---------------------------------------------------

//rotas para area
aplicacao.get('/painel_admin/pesquisar_areas', (req, res) => {
   aplicacao.app.controllers.AreaController.visualizar_listar_area(aplicacao, req, res);
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
}