function Index_ADMDAO(conexao) {
    this._conexao = conexao;
}

module.exports = () => {
    return Index_ADMDAO;
}