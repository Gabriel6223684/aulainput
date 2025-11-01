async function carregarJogos() {
    const res = await fetch("api/listar.php");
    const jogos = await res.json();
    render(jogos);
}

// cadastrar jogo (exemplo)
async function salvarJogo(dados) {
    const res = await fetch("api/cadastrar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });
    const r = await res.json();
    if (r.status === "ok") {
        alert("Jogo cadastrado!");
        carregarJogos();
    } else {
        alert("Erro: " + r.msg);
    }
}

// excluir jogo
async function excluirJogo(id) {
    if (!confirm("Deseja excluir este jogo?")) return;
    const res = await fetch("api/excluir.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    });
    const r = await res.json();
    if (r.status === "ok") carregarJogos();
    else alert("Erro: " + r.msg);
}

// sobrescreve o render para incluir o botão excluir
function render(list) {
    grid.innerHTML = '';
    if (list.length === 0) {
        grid.innerHTML = '<div style="color:var(--muted);padding:20px">Nenhum jogo encontrado.</div>';
        return;
    }
    list.forEach(g => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
      <div class="thumb">${g.titulo.split(' ')[0]}</div>
      <h4>${g.titulo}</h4>
      <div class="meta"><span>${g.genero}</span><span>${g.plataforma}</span></div>
      <p style="color:var(--muted);font-size:13px">${g.descricao || ''}</p>
      <div class="card-actions">
        <button class="btn open" onclick="openModal(${g.id})">Detalhes</button>
        <button class="btn" onclick="excluirJogo(${g.id})">Excluir</button>
      </div>
    `;
        grid.appendChild(card);
    });
}

carregarJogos();