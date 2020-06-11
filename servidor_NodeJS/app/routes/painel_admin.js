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

}