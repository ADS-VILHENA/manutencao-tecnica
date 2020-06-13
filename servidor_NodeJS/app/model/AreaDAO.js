function AreaDAO(conexao) {
    this._conexao = conexao;
}

AreaDAO.prototype.buscar_Area_bd = function(callback){
   this._conexao.query('SELECT * FROM area;',callback); 
}

AreaDAO.prototype.atualizar_area = function(area,callback){
    let query = "UPDATE area SET nome = '"+area.nome+"', descricao = '"+area.descricao+"' WHERE id_area ="+area.id_area+";";
    this._conexao.query(query, callback);
  }

module.exports = () => {
    return AreaDAO;
}