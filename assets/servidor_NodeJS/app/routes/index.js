module.exports = (aplicacao)=>{

    aplicacao.get('/',(req,res)=>{
        res.send('<h1>Pagina Inicial</h1>');
    })

    aplicacao.get('/a',(req,res)=>{
        res.send();
    })

}