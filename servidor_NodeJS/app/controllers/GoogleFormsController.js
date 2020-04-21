var request = require('superagent');

module.exports.enviar_googleforms = (req, res,formulario)=>{

    var link_formulario_google = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSd_tPCj_OLR-FYChlnjWT_i-hdJbikcFPQA5hsQOOy--Liepw/formResponse';

    var fields = {
      descricao: 'entry.1769750886',
      problema: 'entry.1595835435',
      equipamento: 'entry.376642412',
      area: 'entry.1294135333',
      cpf: 'entry.957005033',
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
       
      })
      .end(function(erro, resposta){
        if (erro || !resposta.ok) {
          console.error(erro);
          res.send("Erro ao enviar chamado")
        } else {
          res.send("Chamado enviado para o GoogleForms");
        }
        })
}

