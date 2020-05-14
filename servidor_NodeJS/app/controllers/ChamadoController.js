
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

module.exports.buscar_info_QRCodeEquipamento = (app, req, resposta,codigo)=>{
    var conexao = app.config.db;
    var noticia_model = new app.app.model.ChamadoDAO(conexao);

    //informar o id qrcode
    let id_qrcode = codigo;

    noticia_model.buscar_info_QRCodeEquipamento(id_qrcode,(req,res)=>{
        if(res.length==0){
            this.visualizar_home(app,req,resposta,{erro:1})
            }else{
        this.visualizar_formulario(app,req,resposta,res,erro);
            }
    })
}

module.exports.buscar_info_QRCodeArea = (aplicacao,req,resposta,codigo)=>{
    var conexao = aplicacao.config.db;
    var noticia_model = new aplicacao.app.model.ChamadoDAO(conexao);
    let id_qrcode = codigo;
    noticia_model.buscar_info_QRCodeArea(id_qrcode,(req,res)=>{
       let erro = 0;
       
       //vai verificar se o retorno do banco é vazio, se for vazio volta o home
       if(res.length==0){
       this.visualizar_home(aplicacao,req,resposta,{erro:1})
       }else{
        //se o retorno do banco não for vazio vai chamar o formulario
        this.visualizar_formulario(aplicacao,req,resposta,res,erro);
       }
        
    })

}

module.exports.buscar_problemas_por_id_equipamento = (aplicacao,req,res,id_equipamento)=>{
    var conexao = aplicacao.config.db;
    var noticia_model = new aplicacao.app.model.ChamadoDAO(conexao);

    noticia_model.problemas_por_id_equipamento(id_equipamento,(req,resultado)=>{
        res.send(resultado);
    });
}

module.exports.visualizar_home = (app, req, res,erro)=>{
res.render("abertura de chamado/tela_inicial",{erro:erro});
}
module.exports.visualizar_QRCode = (app, req, res)=>{
    res.render("abertura de chamado/lerQRCode");
    }

module.exports.visualizar_formulario = (app, req, res,dados_area_equipamento,erro)=>{
   //console.log(dados_area_equipamento)
   //res.send(dados_area_equipamento)
   //1 houve erro, 0 não houve erro.
   let result_erro = erro;
   res.render("abertura de chamado/formulario_abertura",{dados:dados_area_equipamento,erro:[]})
}
module.exports.visualizar_formulario_equipamento = (app, req, res)=>{
    
}
