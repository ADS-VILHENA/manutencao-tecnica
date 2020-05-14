var request = require('superagent');

module.exports = (aplicacao) => {


    //rota para visualizar a página inicial
    aplicacao.get('/', (req, res) => {
        aplicacao.app.controllers.ChamadoController.visualizar_home(aplicacao, req, res, { erro: 0 });
    })

    aplicacao.post('/exibir/formulario/', (req, res) => {
        //receber o codigo pelo body
        let codigo = req.body.codigo;
        console.log(codigo);
        //separar o identificador
        let identificador = codigo.substring(0, 1).toUpperCase();
        let id = codigo.substring(1, codigo.length);

        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        //A  -> identificador
        //2525--> id
        if (isNumber(id) == true) {
            if (identificador == "A") {
                //vai realizar as buscas de área e redenrizar o formulário com informações
                console.log("vai construir area")
                aplicacao.app.controllers.ChamadoController.buscar_info_QRCodeArea(aplicacao, req, res, id);
            } else if (identificador == "E") {
                //vai realizar as buscas de área e redenrizar o formulário com informações
                aplicacao.app.controllers.ChamadoController.buscar_info_QRCodeEquipamento(aplicacao, req, res, id);
                console.log("O código é um equipamento")
            } else {
                aplicacao.app.controllers.ChamadoController.visualizar_home(aplicacao, req, res, { erro: 1 });
            }
        } else {
            aplicacao.app.controllers.ChamadoController.visualizar_home(aplicacao, req, res, { erro: 1 });
        }
        //console.log(id);



    })

    aplicacao.get('/buscar/problemas/:id_equipamento', (req, res) => {
        let id_equipamento = req.params.id_equipamento;
        console.log(id_equipamento);
        aplicacao.app.controllers.ChamadoController.buscar_problemas_por_id_equipamento(aplicacao, req, res, id_equipamento);
    })
    //rota para visualizar o QRCode.
    aplicacao.get('/lerQRCode', (req, res) => {
        aplicacao.app.controllers.ChamadoController.visualizar_QRCode(aplicacao, req, res);
    })
    //rota para visualizaro o formulário
    aplicacao.get('/equipamento/:id', (req, res) => {
        console.log(req.params.id);
    })

    //rota para enviar email
    aplicacao.get('/acao/send_mail', (req, res) => {
        //informar as opções para enviar email
        const mailOptions = {
            from: 'supqr.ifro@gmail.com', // sender address
            to: 'supqr.ifro@gmail.com', // list of receivers
            subject: 'SupQr - Teste de email', // Subject line
            html: 'Este é um e-mail do JULIANO DE MELLO teste, favor desconsiderar'// plain text body
        };
        //chamar o método para enviar e-mails      
        aplicacao.app.controllers.EmailController.enviar_email(req, res, mailOptions);

    })


    //rota para enviar dados para o googleForms
    aplicacao.get('/acao/enviar_googleforms', (req, res) => {
        //informar os dados do formulário que vai ser enviado
        var formulario = {
            descricao: "Queimou a televisão após a chuva de ontem",
            problema: "Televisão não liga",
            equipamento: "Televisao",
            area: "SALA A",
            cpf: "02476801259"
        }


        aplicacao.app.controllers.GoogleFormsController.enviar_googleforms(req, res, formulario);

    })


    //rota para salvar as informações do chamado
    aplicacao.get('/acao/salvar_chamado', (req, res) => {
        aplicacao.app.controllers.ChamadoController.salvar_chamado(aplicacao, req, res);
    })

    //rota para buscar informações do equipamento a partir do QrCode lido
    aplicacao.get('/acao/buscar_info_QRCodeEquipamento', (req, res) => {
        aplicacao.app.controllers.ChamadoController.buscar_info_QRCodeEquipamento(aplicacao, req, res);
    })

    aplicacao.get('/acao/buscar_info_QRCodeArea', (req, res) => {
        let codigo_area = "2";
        aplicacao.app.controllers.ChamadoController.buscar_info_QRCodeArea(aplicacao, req, res, codigo_area);
    })

    aplicacao.post('/abrir_chamado', function (req, res, next) {
        //fazer upload do arquivo
        aplicacao.app.controllers.ChamadoController.enviar_chamado(aplicacao,req, res);
        //salvar no banco de dados

        //enviar para email ou google_forms
        
    });

    aplicacao.get('/download/:name',function(req,res){
      let name = req.params.name;
      
      aplicacao.app.controllers.ChamadoController.download_arquivo(aplicacao,req,res,name);
      
        })

    //rota para salvar documentos na pasta
}

