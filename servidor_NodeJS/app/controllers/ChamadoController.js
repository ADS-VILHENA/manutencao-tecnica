

module.exports.send_to_google_planilhas = (app, req, res, chamado) => {

    console.log(chamado);

    const promise = new Promise((resolve, reject) => {
        const { GoogleSpreadsheet } = require('google-spreadsheet');

        async function accessSpreadsheet(chamadoge) {
            // spreadsheet key is the long id in the sheets URL
            const doc = new GoogleSpreadsheet('18nnEYqZigMsBaunFAU6od_j4yMyYzzO1_DKeV4kE_AI');
            const creds = require('../../config/Google Planilhas - SupQR-95575613a5f8.json');
            // use service account creds
            await doc.useServiceAccountAuth({
                client_email: creds.client_email,
                private_key: creds.private_key,
            });
            // OR load directly from json file if not in secure environment
            await doc.useServiceAccountAuth(require('../../config/Google Planilhas - SupQR-95575613a5f8.json'));
            // OR use API key -- only for read-only access to public sheets
            //doc.useApiKey('YOUR-API-KEY');

            await doc.loadInfo(); // loads document properties and worksheets
            //console.log(doc.title);
            //await doc.updateProperties({ title: 'renamed doc' });

            const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
            //console.log(sheet.title);
            //console.log(sheet.rowCount);

            // adding / removing sheets
            //const newSheet = await doc.addSheet({ title: 'hot new sheet!' });



            //adicionando uma linha no googlesheets
            const nova_linha = await sheet.addRow(chamadoge, (req, res) => {
                resolve(0);
            });


        }
        accessSpreadsheet(chamado);

    });
    return promise;
}

module.exports.salvar_chamado = (app, req, res, chamado) => {

    //armazenar os dados do chamado no JSON abaixo


    //salvando as informações na base de dados
    const promise = new Promise((resolve, reject) => {

        var conexao = app.config.db;
        var equipamento_model = new app.app.model.ChamadoDAO(conexao);
        

       
           
            equipamento_model.salvar_chamado(chamado, (req, res) => {
               // console.log(res);
                resolve(0);
            
        })
       
    });
    return promise;
}
module.exports.enviar_arquivo = function (app, req, res, uploadpath) {
    //fazer upload do arquivo
    //console.log(req.files);

    const promise = new Promise((resolve, reject) => {

        if (req.files == null) {
           // console.log("Não há arquivos para fazer upload!");
            resolve(1);
        } else {
            if (req.files.upfile) {
               var file = req.files.upfile;
               let tipo = file.name.toString().split(".");
             //  console.log(tipo);
             //  uploadpath = uploadpath+"."+tipo[1];
                // var type = req.files.upfile.name.split(".");
                //uploadpath = uploadpath+"."+type[1];
                let type = file.type;
                
            
                let resultado_envio_arquivo;
                let resultado = 0;

                file.mv(uploadpath, function (err) {
                    if (err) {
                        resultado = 1;
                       // console.log("Erro ao enviar os documentos!");
                        resolve(1);
                    }
                    else {
                        resultado = 0;
                        //console.log("Update realizado com sucesso!");
                        resolve(0);
                    }

                });
            }
            else {
               // console.log("Erro ao enviar arquivos!")
                resultado = 0;
                resolve(1);
            };
        }


        // reject(new Error(1));

    });
    return promise;
}

module.exports.buscar_info_QRCodeEquipamento = (app, req, resposta, codigo) => {
    var conexao = app.config.db;
    var noticia_model = new app.app.model.ChamadoDAO(conexao);

    //informar o id qrcode
    let id_qrcode = codigo;

    noticia_model.buscar_info_QRCodeEquipamento(id_qrcode, (req, res) => {
        let erros_submit = [];

        if (res.length == 0) {
            this.visualizar_home(app, req, resposta, { erro: 1 }, erros_submit)
        } else {
            let erros_submit = [];
            this.visualizar_formulario(app, req, resposta, res, { erro: 0 }, erros_submit);
        }
    })
}

module.exports.buscar_info_QRCodeArea = (aplicacao, req, resposta, codigo) => {
    var conexao = aplicacao.config.db;
    var noticia_model = new aplicacao.app.model.ChamadoDAO(conexao);
    let id_qrcode = codigo;
    noticia_model.buscar_info_QRCodeArea(id_qrcode, (req, res) => {
        let erro = { erro: 0 };

        //vai verificar se o retorno do banco é vazio, se for vazio volta o home
        if (res.length < 1) {
            
            noticia_model.buscar_area_by_id(id_qrcode, (req, result_area) => {
            //console.log(result_area);
            let resposta_banco = result_area;
            if(resposta_banco==undefined || resposta_banco.length < 1){
            erros_submit={}
            this.visualizar_home(aplicacao, req, resposta, { erro: 1 }, erros_submit)
            }else{
            //console.log(resposta);
            let erros_submit = [];
            this.visualizar_formulario(aplicacao, req, resposta, result_area,{ erro: 0 }, erros_submit)
            }
            })
            
        } else {
            //se o retorno do banco não for vazio vai chamar o formulario
           // console.log(res);
            let erros_submit = {};
            this.visualizar_formulario(aplicacao, req, resposta, res, erro, erros_submit);
        }

    })

}

module.exports.salvar_chamado_bd = (app, req, res, chamado) => {
    var conexao = aplicacao.config.db;
    var noticia_model = new app.app.model.ChamadoDAO(conexao);

    noticia_model.salvar_chamado(chamado, (req, res) => {
        //retorno para salvar chamado
    })

}

module.exports.buscar_problemas_por_id_equipamento = (aplicacao, req, res, id_equipamento) => {
    var conexao = aplicacao.config.db;
    var noticia_model = new aplicacao.app.model.ChamadoDAO(conexao);

    noticia_model.problemas_por_id_equipamento(id_equipamento, (req, resultado) => {
        res.send(resultado);
    });
}

module.exports.visualizar_home = (app, req, res, erro, erros_submit) => {
    res.render("abertura de chamado/tela_inicial", { erro: erro, erros_submit });
}
module.exports.visualizar_QRCode = (app, req, res) => {
    res.render("abertura de chamado/lerQRCode");
}

module.exports.visualizar_formulario = (app, req, res, dados_area_equipamento, erro, erros_submit) => {
    //console.log(dados_area_equipamento)
    //res.send(dados_area_equipamento)
    //1 houve erro, 0 não houve erro.
   // console.log(erros_submit);
    let result_erro = erro;
    res.render("abertura de chamado/formulario_abertura", { dados: dados_area_equipamento, erro: [], erros_submit })
}

module.exports.enviar_chamado = (app, req, res) => {
    //definindo o nome do arquivo
    const { v4: uuidv4 } = require('uuid');
    var path = require("path")
    let name = uuidv4();
    //definindo o path do arquivo
    
    let tipo;
    if(req.files!=null){
        let file = req.files.upfile;
        tipo = file.name.toString().split(".");
        name = name+"."+tipo[1];
       // console.log("Tem anexo!!!!!!!!!!")
    }else{
        name = "";
    }
   
    var uploadpath = path.join(__dirname, '../..') + '/anexos/' + name;

    let enviar_arquivo = this.enviar_arquivo(app, req, res, uploadpath);
    //console.log(name);
    let nome_equipamento = req.body.equipamento.split('~');
    //console.log(nome_equipamento);
    let chamado = {
        path_anexo: name,
        descricao: req.body.descricao,
        problema: req.body.problema,
        equipamento: nome_equipamento[1],
        area: req.body.area,
        cpf_usuario: req.body.cpf_usuario
    }
    var hoje = new Date();
    let chamado_mail = {
        data: hoje.getDate() + " - " + hoje.getMonth() + " - " + hoje.getFullYear(),
        descricao: req.body.descricao,
        problema: req.body.problema,
        equipamento: nome_equipamento[1],
        area: req.body.area,
        cpf: req.body.cpf_usuario,
        anexo: ""
    }
    if(name!=""){
       chamado_mail.anexo = "https://manutencao.adsvilhena.ninja/download/" +name;
    }


    let erros = [{
        upload: "",
        email: "",
        googleForms: "",
        banco: ""
    }]

    enviar_arquivo
        .then(
            //imprimi o resultado do upload do arquivo 1 = ERRO; 0 = SUCESSO; 
            (resultado) => {
                erros.upload = 0;

            })
        .then(() => {

            return this.salvar_chamado(app, req, res, chamado);
        }

        )
        .then((resultado) => {
            erros.banco = resultado;
            //enviar para o google forms
            var formulario = {
                anexo: 'http://localhost:2525/download/' + name,
                descricao: req.body.descricao,
                problema: req.body.problema,
                equipamento: req.body.equipamento,
                area: req.body.area,
                cpf: req.body.cpf_usuario
            }


            return app.app.controllers.GoogleFormsController.enviar_googleforms(req, res, formulario);

        })
        .then((resultado) => {
            erros.googleForms = resultado;
           
            
            
            const mailOptions = {
                from: 'supqr.ifro@gmail.com', // sender address
                to: 'supqr.ifro@gmail.com', // list of receivers
                subject: 'Abertura de Chamado - ' + req.body.area, // Subject line
                html: "<html><head></head><body><p>Descricao:<p></br><p>{{ " + chamado_mail.descricao + " }}<p><p>Problema:<p></br><p>" + chamado_mail.problema + "<p><p>Equipamento:<p></br><p>" + chamado_mail.equipamento + "<p><p>Area:<p></br><p>" + chamado_mail.area + "<p><p>CPF:<p></br><p>" + chamado_mail.cpf + "<p><p>Anexo:<p></br><p>" + chamado_mail.anexo + "<p></body></html>"
            };
            //console.log(chamado_mail);
            
            return app.app.controllers.EmailController.enviar_email(req, res, mailOptions);
        })

        .then((resultado) => {
            erros.email = resultado;
            //console.log(erros);
            //res.end();
        }).then(() => {

            var now = new Date();
            
            let chamado_ge = {
                data: now.getDate() + " - " + now.getMonth() + " - " + now.getFullYear(),
                descricao: req.body.descricao,
                problema: req.body.problema,
                equipamento: nome_equipamento[1],
                area: req.body.area,
                cpf: req.body.cpf_usuario,
                anexo: ""
            }
            if(name!=""){
               chamado_ge.anexo = "https://manutencao.adsvilhena.ninja/download/" +name;
            }
            
          //  console.log(chamado_ge);
        
            app.app.controllers.ChamadoController.send_to_google_planilhas(app, req, res, chamado_ge);

        }, () => {
            console.log("Não enviou")
        }).then(() => {
            let erro = {};
            this.visualizar_home(app, req, res, erro, erros);
        });
    //implementar o envio do arquivo e salvar os dados.

}

module.exports.download_arquivo = (app, req, res, name) => {
    var path = require("path")
    var mime = require("mime")
    var fs = require("fs")
    //res.sendFile(path.join(__dirname,'../..')+'/anexos/'+name);

    var file = path.join(__dirname, '../..') + '/anexos/' + name;

    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
}

module.exports.visualizar_listar_chamados = (app, req, res, page)=>{
    var conexao = app.config.db;
    var equipamento_model = new app.app.model.ChamadoDAO(conexao);

    equipamento_model.listar_chamados(page, (req, result) => {
        let chamados = result;
        equipamento_model.quantidade_chamados((req,result_qtde)=>{
        let qtde_chamados = result_qtde[0];
        //console.log(Math.trunc(1));
        let qtde_paginas = {qtde_paginas : Math.trunc(qtde_chamados.qtde_chamados/10)+1,
                            pagina:page};
       // console.log(qtde_paginas);
        res.render('painel admin/relatorio_chamados.ejs',{chamados,qtde_paginas});
        })
    })
}