module.exports = (aplicacao)=>{
//rota para pesquisar equipamentos no painel admin
aplicacao.get('/painel_admin/listar_equipamentos', (req, res) => {
       // res.send("Listar equipamentos");
        aplicacao.app.controllers.EquipamentoController.visualizar_listar_equipamentos(aplicacao, req, res);
    //aplicacao.app.controllers.ChamadoController.visualizar_home(aplicacao, req, res, { erro: 0 },erros_submit);
})
}