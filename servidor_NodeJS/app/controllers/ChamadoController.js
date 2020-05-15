
module.exports.salvar_chamado = (app, req, res, chamado) => {

    //armazenar os dados do chamado no JSON abaixo


    //salvando as informações na base de dados
    const promise = new Promise((resolve, reject) => {

        var conexao = app.config.db;
        var noticia_model = new app.app.model.ChamadoDAO(conexao);

        noticia_model.salvar_chamado(chamado, (req, res) => {
            console.log(res);
            resolve(0);
        })

    });
    return promise;
}
module.exports.enviar_arquivo = function (app, req, res, uploadpath) {
    //fazer upload do arquivo
    console.log(req.files);

    const promise = new Promise((resolve, reject) => {

        if (req.files == null) {
            console.log("Não há arquivos para fazer upload!");
            resolve(1);
        } else {
            if (req.files.upfile) {
                var file = req.files.upfile;

                let type = file.mimetype;



                let resultado_envio_arquivo;
                let resultado = 0;

                file.mv(uploadpath, function (err) {
                    if (err) {
                        resultado = 1;
                        console.log("Erro ao enviar os documentos!");
                        resolve(1);
                    }
                    else {
                        resultado = 0;
                        console.log("Update realizado com sucesso!");
                        resolve(0);
                    }

                });
            }
            else {
                console.log("Erro ao enviar arquivos!")
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
        let erro = 0;

        //vai verificar se o retorno do banco é vazio, se for vazio volta o home
        if (res.length == 0) {
            this.visualizar_home(aplicacao, req, resposta, { erro: 1 })
        } else {
            //se o retorno do banco não for vazio vai chamar o formulario
            console.log(res);
            let erros_submit = [];
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

module.exports.visualizar_formulario = (app, req, res, dados_area_equipamento, erro) => {
    //console.log(dados_area_equipamento)
    //res.send(dados_area_equipamento)
    //1 houve erro, 0 não houve erro.
    let result_erro = erro;
    res.render("abertura de chamado/formulario_abertura", { dados: dados_area_equipamento, erro: [] })
}

module.exports.enviar_chamado = (app, req, res) => {
    //definindo o nome do arquivo
    const { v4: uuidv4 } = require('uuid');
    var path = require("path")
    let name = uuidv4();
    //definindo o path do arquivo
    var uploadpath = path.join(__dirname, '../..') + '/anexos/' + name;

    let enviar_arquivo = this.enviar_arquivo(app, req, res, uploadpath);
    let chamado = {
        path_anexo: name,
        descricao: req.body.descricao,
        problema: req.body.problema,
        equipamento: req.body.equipamento,
        area: req.body.area,
        cpf_usuario: req.body.cpf_usuario
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
            (resultado) => { erros.upload = resultado })
        .then(() => {

            return this.salvar_chamado(app, req, res, chamado);
        }

        )
        .then((resultado) => {
            erros.banco = resultado;
            //enviar para o google forms
            var formulario = {
                anexo: 'http://localhost:2020/download/' + name,
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
                html: "<html><head></head><body><p>Descricao:<p></br><p>{{ " + req.body.descricao + " }}<p><p>Problema:<p></br><p>" + req.body.problema + "<p><p>Equipamento:<p></br><p>" + req.body.equipamento + "<p><p>Area:<p></br><p>" + req.body.area + "<p><p>CPF:<p></br><p>" + req.body.cpf_usuario + "<p><p>Anexo:<p></br><p>http://localhost:2020/download/" + name + "<p></body></html>"
            };
            return app.app.controllers.EmailController.enviar_email(req, res, mailOptions);
        })
        .then((resultado) => {
            erros.email = resultado;
            console.log(erros);

            //preparando as variáveis para chamar o formulário
            let erro = [];
            let dados_area_equipamento = [
                {
                    nome_equipamento: '',
                    id_equipamento: '',
                    nome: ''
                }
            ];


            this.visualizar_home(app, req, res, erro, erros);
            //res.end();
        })
        ;
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