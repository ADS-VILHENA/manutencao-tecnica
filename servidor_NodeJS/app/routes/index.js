var request = require('superagent');

module.exports = (aplicacao)=>{

    aplicacao.get('/',(req,res)=>{
        res.send('<h1>Pagina Inicial</h1>');
    })

    aplicacao.get('/acao/send_mail',(req,res)=>{
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

    aplicacao.get('/acao/enviar_googleforms',(req,res)=>{
    //informar os dados do formulário que vai ser enviado
      var formulario = {
          descricao : "Queimou a televisão após a chuva de ontem",
          problema : "Televisão não liga",
          equipamento: "Televisao",
          area : "SALA A",
          cpf: "02476801259"
      }
    
      //chamar o método para enviar as informações
      aplicacao.app.controllers.GoogleFormsController.enviar_googleforms(req, res, formulario);

    })

    aplicacao.get('/acao/salvar_chamado',(req,res)=>{
     aplicacao.app.controllers.ChamadoController.salvar_chamado(aplicacao,req,res);
    })
}

    