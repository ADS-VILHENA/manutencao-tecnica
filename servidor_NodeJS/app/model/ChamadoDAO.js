function ChamadoDAO (conexao){
    this._conexao = conexao;
}

ChamadoDAO.prototype.salvar_chamado = function (chamado,callback){
 this._conexao.query('INSERT INTO chamado SET ?',chamado,callback);
}

module.exports = ()=>{
    return ChamadoDAO;
}