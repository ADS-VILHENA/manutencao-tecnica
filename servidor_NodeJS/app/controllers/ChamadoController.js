
module.exports.salvar_chamado=(app,req,res,chamado)=>{
    
    //armazenar os dados do chamado no JSON abaixo
   

    //salvando as informações na base de dados
    const promise = new Promise( (resolve, reject) => { 

        var conexao = app.config.db;
        var noticia_model = new app.app.model.ChamadoDAO(conexao);
    
        noticia_model.salvar_chamado(chamado,(req,res)=>{
           resolve(0);
        })
       
    });
        return promise;
    }
module.exports.enviar_arquivo = function(app, req, res,uploadpath){
    //fazer upload do arquivo
    
    const promise = new Promise( (resolve, reject) => { 
        
           
    if (req.files.upfile) {
        var file = req.files.upfile;
        
        let type = file.mimetype;
   
       
       
        let resultado_envio_arquivo;
        let resultado = 0;
   
        file.mv(uploadpath, function (err) {
            if (err) {
                resultado = 1;
                
                resolve (1);
            }
            else{
                resultado = 0;
                 resolve (0);
            }
   
        });
    }
    else {
       resultado = 0;
       return 1;
    };
     
    resolve (1);
    
   
      
         reject(new Error(1));
        
    });
return promise;
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
        this.visualizar_formulario(app,req,resposta,res,{erro:0});
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

module.exports.salvar_chamado_bd = (app, req, res, chamado)=>{
    var conexao = aplicacao.config.db;
    var noticia_model = new app.app.model.ChamadoDAO(conexao);
    
    noticia_model.salvar_chamado(chamado, (req, res)=>{
        //retorno para salvar chamado
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

module.exports.enviar_chamado = (app, req, res)=>{
    //definindo o nome do arquivo
    const { v4: uuidv4 } = require('uuid');   
    var path = require("path")
    let name = uuidv4();
    //definindo o path do arquivo
    var uploadpath = path.join(__dirname,'../..') + '/anexos/' + name;
    
    let enviar_arquivo = this.enviar_arquivo(app,req,res,uploadpath);
    let chamado = {
        path_anexo : name,
        descricao : req.body.descricao,
        problema : req.body.problema,
        equipamento : req.body.equipamento,
        area : req.body.area,
        cpf_usuario : req.body.cpf_usuario
    }

    enviar_arquivo
    .then(
       //imprimi o resultado do upload do arquivo 1 = ERRO; 0 = SUCESSO; 
       (resultado)=>{ console.log(resultado)})
    .then(()=>{
       
         return this.salvar_chamado(app,req,res,chamado);
    }
        
    )
    .then((resultado)=>{
        //imprimi o resultado do save chamado 1 = ERRO; 0 = SUCESSO; 
       res.send("UPLOAD REALIZADO COM SUCESSO, CHAMADO SALVO NO BANCO DE DADOS");
       res.end();
    })
    ;
 //implementar o envio do arquivo e salvar os dados.

}