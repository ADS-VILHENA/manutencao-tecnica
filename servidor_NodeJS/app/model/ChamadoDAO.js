function ChamadoDAO(conexao) {
    this._conexao = conexao;
}

ChamadoDAO.prototype.salvar_chamado = function (chamado, callback) {
    this._conexao.query('INSERT INTO chamado SET ?', chamado, callback);
}

ChamadoDAO.prototype.buscar_info_QRCodeEquipamento = function (id_qrcode,callback) {

    this._conexao.query('SELECT A.nome, E.nome_equipamento, E.id_equipamento FROM area AS A INNER JOIN area_equipamento AS AE ON A.id_area = AE.id_area INNER JOIN equipamento AS E ON AE.id_equipamento = E.id_equipamento WHERE id_area_equipamento ='+id_qrcode, callback);

}

ChamadoDAO.prototype.buscar_info_QRCodeArea = function (id_qrcode,callback) {

    this._conexao.query('SELECT E.nome_equipamento,E.id_equipamento, A.nome FROM equipamento AS E INNER JOIN area_equipamento as AE ON E.id_equipamento = AE.id_equipamento INNER JOIN area as A ON AE.id_area = A.id_area  WHERE A.id_area = '+id_qrcode, callback);
}

ChamadoDAO.prototype.problemas_por_id_equipamento = function (id_equipamento,callback) {
    this._conexao.query('SELECT nome_problema FROM equipamento_problema WHERE id_equipamento = '+id_equipamento, callback);
}

module.exports = () => {
    return ChamadoDAO;
}