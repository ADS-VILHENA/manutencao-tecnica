function EquipamentoDAO(conexao) {
    this._conexao = conexao;
}


EquipamentoDAO.prototype.buscar_equipamentos_bd = function(termo,callback){
   this._conexao.query("SELECT * FROM equipamento where nome_equipamento like '%"+termo+"%';",callback); 
}

EquipamentoDAO.prototype.buscar_equipamento_bd_by_id = function(id,callback){
    this._conexao.query('SELECT * FROM equipamento where id_equipamento ='+id+';',callback); 
 }
 
 EquipamentoDAO.prototype.deletar_problema_bd_by_id = function(id,callback){
    this._conexao.query('DELETE FROM equipamento_problema where id_equipamento_problema ='+id+';',callback); 
 }

 EquipamentoDAO.prototype.deletar_equipamento_bd_by_id = function(id,callback){
    this._conexao.query('DELETE FROM equipamento where id_equipamento ='+id+';',callback); 
 }

 EquipamentoDAO.prototype.adicionar_problema = function(id_equipamento,nome_problema,callback){
    this._conexao.query('insert into equipamento_problema(id_equipamento, nome_problema) values ('+id_equipamento+',"'+nome_problema+'");',callback); 
 }
 

EquipamentoDAO.prototype.salvar_equipamento = function(equipamento,callback){
    this._conexao.query('INSERT INTO equipamento SET ?', equipamento, callback);
 }
 EquipamentoDAO.prototype.atualizar_equipamento = function(equipamento,callback){
   let query = "UPDATE equipamento SET nome_equipamento = '"+equipamento.nome_equipamento+"', descricao_equipamento = '"+equipamento.descricao_equipamento+"' WHERE id_equipamento ="+equipamento.id_equipamento+";";
   this._conexao.query(query, callback);
 }
 EquipamentoDAO.prototype.buscar_problemas = function(id,callback){
    let query = "select * from equipamento_problema where id_equipamento ="+id;
    this._conexao.query(query, callback);
  }

module.exports = () => {
    return EquipamentoDAO;
}
