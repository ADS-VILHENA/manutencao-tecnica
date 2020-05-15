var nodemailer = require('nodemailer');

/*
  Este JSON deve estar presente no corpo do POST
  const mailOptions = {
            from: 'supqr.ifro@gmail.com', // sender address
            to: 'supqr.ifro@gmail.com', // list of receivers
            subject: 'SupQr - Teste de email', // Subject line
            html: 'Este é um e-mail do JULIANO DE MELLO teste, favor desconsiderar'// plain text body
          };
*/
module.exports.enviar_email = (req,res, mailOptions)=>{
  const promise = new Promise( (resolve, reject) => { 
  var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'supqr.ifro@gmail.com',
               pass: 'Suporte99'
           }
       });
      
      transporter.sendMail(mailOptions, function (err, info) {
        if(err){
          console.log(err)
          //res.send("Erro ao enviar email");
          resolve (1);
          
        }
        else{
          console.log('Email sent:' +info.response);
          //res.send('Email sent:' +info.response);
          resolve(0);
          
        }
        
      });
   
    });
    return promise;
}
