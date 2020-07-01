function loginDAO(conexao) {
    this._conexao = conexao;
}

module.exports = () => {
    return loginDAO;
}