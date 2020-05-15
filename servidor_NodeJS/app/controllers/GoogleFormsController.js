var request = require('superagent');

module.exports.enviar_googleforms = (req, res,formulario)=>{
  const promise = new Promise( (resolve, reject) => { 
    var link_formulario_google = "";
    link_formulario_google= 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSd_tPCj_OLR-FYChlnjWT_i-hdJbikcFPQA5hsQOOy--Liepw/formResponse';

    var fields = {
      descricao: 'entry.1769750886',
      problema: 'entry.1595835435',
      equipamento: 'entry.376642412',
      area: 'entry.1294135333',
      cpf: 'entry.957005033',
      anexo:'entry.1927827804'
    }
    
    request
      .post(link_formulario_google)
      .type('form')
      .send({ 
        [fields.descricao]: formulario.descricao,
        [fields.problema]: formulario.problema,
        [fields.equipamento]: formulario.equipamento,
        [fields.area]: formulario.area,
        [fields.cpf]: formulario.cpf,
        [fields.anexo]:formulario.anexo
       
      })
      .end(function(erro, resposta){
        if (erro || !resposta.ok) {
          //console.error(erro);
          //res.send("Erro ao enviar chamado");
          resolve(1);
        } else {
          //res.send("Chamado enviado para o GoogleForms");
          resolve(0);
        }
        })
  });
  return promise;
   
}

