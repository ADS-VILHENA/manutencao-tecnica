
module.exports = (aplicacao)=>{

    aplicacao.get('/',(req,res)=>{
        res.send('<h1>Pagina Inicial</h1>');
    })

    aplicacao.get('/acao/send_mail',(req,res)=>{
        const mailOptions = {
            from: 'supqr.ifro@gmail.com', // sender address
            to: 'supqr.ifro@gmail.com', // list of receivers
            subject: 'SupQr - Teste de email', // Subject line
            html: 'Este é um e-mail do JULIANO DE MELLO teste, favor desconsiderar'// plain text body
          };
    aplicacao.app.controllers.EmailController.enviar_email(req, res, mailOptions);
    
    })

}