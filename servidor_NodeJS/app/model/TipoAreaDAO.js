function TipoAreaDAO(conexao) {
    this._conexao = conexao;
}


TipoAreaDAO.prototype.buscar_tipoArea_bd = function(callback){
   this._conexao.query('SELECT * FROM tipo_area;',callback); 
}

TipoAreaDAO.prototype.deletar_tipoarea= function(callback){
    this._conexao.query('delete FROM tipo_area where id_tipo_area = ?;',callback); 
 }

TipoAreaDAO.prototype.salvar_tipoarea = function(tipoarea,callback){
    this._conexao.query('INSERT INTO tipo_area SET ?', tipoarea, callback);
 }

 TipoAreaDAO.prototype.atualizar_tipoarea = function(tipoarea,callback){
   let query = "UPDATE tipo_area SET nome_tipo_area = '"+tipoarea.nome_tipo_area+"', descricao_tipo_area = '"+tipoarea.descricao_tipo_area+"' WHERE id_tipo_area ="+tipoarea.id_tipo_area+";";
   this._conexao.query(query, callback);
 }

module.exports = () => {
    return TipoAreaDAO;
}