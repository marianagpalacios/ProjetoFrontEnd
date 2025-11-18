document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('formCadastro');
    const nomeUsuarioInput = document.getElementById('nomeUsuario');
    const emailUsuarioInput = document.getElementById('emailUsuario');
    const listaUsuariosUL = document.getElementById('listaUsuarios');
    const btnLimparCampos = document.getElementById('btnLimparCampos');
    const btnLimparLista = document.getElementById('btnLimparLista');
    const inputPesquisa = document.getElementById('inputPesquisa');

    const STORAGE_KEY = 'saqa_usuarios';

    function carregarUsuarios() {
        const usuariosJson = localStorage.getItem(STORAGE_KEY);
        return usuariosJson ? JSON.parse(usuariosJson) : [];
    }
});