function EquipamentoDAO(conexao) {
    this._conexao = conexao;
}


EquipamentoDAO.prototype.buscar_equipamentos_bd = function(callback){
   this._conexao.query('SELECT * FROM equipamento;',callback); 
}

EquipamentoDAO.prototype.salvar_equipamento = function(equipamento,callback){
    this._conexao.query('INSERT INTO equipamento SET ?', equipamento, callback);
 }
 EquipamentoDAO.prototype.atualizar_equipamento = function(equipamento,callback){
   let query = "UPDATE equipamento SET nome_equipamento = '"+equipamento.nome_equipamento+"', descricao_equipamento = '"+equipamento.descricao_equipamento+"' WHERE id_equipamento ="+equipamento.id_equipamento+";";
   this._conexao.query(query, callback);
 }

module.exports = () => {
    return EquipamentoDAO;
}