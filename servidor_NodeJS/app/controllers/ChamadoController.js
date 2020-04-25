

module.exports.salvar_chamado=(app,req,res)=>{
    
    //armazenar os dados do chamado no JSON abaixo
    let chamado = {
        path_anexo : "juliano", //informar aqui os dados para salvar
        descricao : "juliano",
        problema: "juliano",
        equipamento: "juliano",
        area: "juliano",
        cpf_usuario: "02476801259"
    }

    //salvando as informações na base de dados
    var conexao = app.config.db;
    var noticia_model = new app.app.model.ChamadoDAO(conexao);

    noticia_model.salvar_chamado(chamado,(req,res)=>{
        console.log("salvo com sucesso!");
    })


}