module.exports = (aplicacao)=>{
//rota para pesquisar equipamentos no painel admin
aplicacao.get('/painel_admin/listar_equipamentos', (req, res) => {
       // res.send("Listar equipamentos");
        aplicacao.app.controllers.EquipamentoController.visualizar_listar_equipamentos(aplicacao, req, res);
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
//rota para listar tipos de area painel admin
aplicacao.get('/painel_admin/pesquisar_tipo_areas', (req, res) => {
    aplicacao.app.controllers.TipoAreaController.visualizar_listar_tipo_area(aplicacao, req, res);
})

//rota para listar area painel admin
aplicacao.get('/painel_admin/pesquisar_areas', (req, res) => {
   aplicacao.app.controllers.AreaController.visualizar_listar_area(aplicacao, req, res);
})

// rotas tipo_area
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
}