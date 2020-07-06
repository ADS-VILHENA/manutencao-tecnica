function AreaDAO(conexao) {
    this._conexao = conexao;
}

AreaDAO.prototype.buscar_Area_bd = function(callback){
   this._conexao.query('SELECT * FROM area;',callback); 
}

AreaDAO.prototype.atualizar_area = function(area,callback){
    let query = "UPDATE area SET nome = '"+area.nome+"', descricao = '"+area.descricao+"' WHERE id_area ="+area.id_area+";";
    console.log(query);
    this._conexao.query(query, callback);
  }

  AreaDAO.prototype.salvar_area = function(area,callback){
    this._conexao.query('INSERT INTO area SET ?', area, callback);
 }

 AreaDAO.prototype.buscar_areas_bd = function(termo,callback){
    this._conexao.query("SELECT * FROM area where nome like '%"+termo+"%';",callback); 
 }
 AreaDAO.prototype.deletar_area_bd_by_id = function(id,callback){
    let query = 'DELETE FROM area where id_area ='+id+';';
    console.log(query);
    this._conexao.query(query,callback); 
 }
 AreaDAO.prototype.buscar_area_bd_by_id = function(id,callback){
    this._conexao.query('SELECT * FROM area where id_area ='+id+';',callback); 
 }

 
 AreaDAO.prototype.buscar_area_by_area_id = function(id,callback){
     let query = 'SELECT e.nome_equipamento, ae.id_area_equipamento FROM equipamento AS e INNER JOIN area_equipamento AS ae on ae.id_equipamento  = e.id_equipamento INNER JOIN area AS a on a.id_area = ae.id_area where ae.id_area ='+id; 
     //console.log(query);
    this._conexao.query(query,callback); 
 }
 
 AreaDAO.prototype.adicionar_equipamento = function(id_equipamento,id_area,callback){
    let query = 'INSERT INTO area_equipamento (id_area,id_equipamento) VALUES ('+id_area+','+id_equipamento+');'; 
    //console.log(query);
   this._conexao.query(query,callback); 
}

AreaDAO.prototype.deletar_area_equipamento = function(id_area_equipamento,callback){
    let query = 'DELETE FROM area_equipamento where id_area_equipamento ='+id_area_equipamento; 
    //console.log(query);
   this._conexao.query(query,callback); 
}
module.exports = () => {
    return AreaDAO;
}