function IndexDAO(conexao) {
    this._conexao = conexao;
}

module.exports = () => {
    return IndexDAO;
}