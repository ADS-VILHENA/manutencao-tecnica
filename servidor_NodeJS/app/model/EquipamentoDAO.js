function EquipamentoDAO(conexao) {
    this._conexao = conexao;
}


EquipamentoDAO.prototype.buscar_equipamentos_bd = function(callback){
   this._conexao.query('SELECT * FROM equipamento;',callback); 
}

module.exports = () => {
    return EquipamentoDAO;
}