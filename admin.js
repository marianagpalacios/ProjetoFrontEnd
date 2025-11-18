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

    function salvarUsuarios(usuarios) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
    }

     function renderizarLista(usuariosToRender = carregarUsuarios()) {
        listaUsuariosUL.innerHTML = ''; // Limpa a lista atual

        if (usuariosToRender.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'Nenhum usuário cadastrado.';
            listaUsuariosUL.appendChild(li);
            return;
        }

        usuariosToRender.forEach((usuario, index) => {
            const li = document.createElement('li');
            li.classList.add('usuario-item');
            li.dataset.id = usuario.id; 

            const dataFormatada = new Date(usuario.dataCadastro).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            li.innerHTML = `
                <div class="usuario-info">
                    <strong>Nome:</strong> ${usuario.nome} <br>
                    <strong>E-mail:</strong> ${usuario.email} <br>
                    <small>Cadastrado em: ${dataFormatada}</small>
                </div>
                <button class="btn-excluir" data-id="${usuario.id}">Excluir</button>
            `;

            listaUsuariosUL.appendChild(li);
        });
    }

    function adicionarUsuario(event) {
        event.preventDefault();

        const nome = nomeUsuarioInput.value.trim();
        const email = emailUsuarioInput.value.trim();

        if (!nome || !email) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const novoUsuario = {
            id: Date.now(), 
            nome: nome,
            email: email,
            dataCadastro: new Date().toISOString()
        };

        const usuarios = carregarUsuarios();
        usuarios.push(novoUsuario);
        salvarUsuarios(usuarios);

        // Limpa os campos e renderiza a lista
        formCadastro.reset();
        renderizarLista();
        alert('Usuário cadastrado com sucesso!');
    }

    function excluirUsuario(id) {
        let usuarios = carregarUsuarios();
        const idNumber = Number(id);
        
        usuarios = usuarios.filter(usuario => usuario.id !== idNumber);
        
        salvarUsuarios(usuarios);
        renderizarLista();
    }

    function excluirTodosUsuarios() {
        if (confirm('Tem certeza que deseja excluir TODOS os usuários cadastrados? Esta ação é irreversível.')) {
            localStorage.removeItem(STORAGE_KEY);
            renderizarLista();
            alert('Todos os usuários foram excluídos.');
        }
    }
});