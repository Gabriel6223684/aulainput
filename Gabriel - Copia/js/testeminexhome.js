// Dados de exemplo (pode alimentar via API/JSON real depois)
const games = [
    { id: 1, title: "Racing Vinho", genre: "corrida", platform: "console", short: "Velocidade e drift em pistas radicais." },
    { id: 2, title: "Assalto Vermelho", genre: "ação", platform: "pc", short: "FPS tático com narrativa intensa." },
    { id: 3, title: "Cidade Estratégica", genre: "estratégia", platform: "pc", short: "Construa, gerencie e conquiste territórios." },
    { id: 4, title: "Pixel Quest", genre: "indie", platform: "mobile", short: "Aventura indie com pixel art e puzzles." },
    { id: 5, title: "Noite de Corrida", genre: "corrida", platform: "pc", short: "Corridas noturnas e personalização." },
    { id: 6, title: "Comando Ágil", genre: "ação", platform: "console", short: "Ação rápida com jogabilidade fluída." },
    { id: 7, title: "Táticas do Vinho", genre: "estratégia", platform: "pc", short: "Combates por turnos com unidades únicas." },
    { id: 8, title: "Indie Lounge", genre: "indie", platform: "mobile", short: "Pequenos jogos experimentais para relaxar." }
];

const grid = document.getElementById('gamesGrid');
const searchInput = document.getElementById('search');
const yearSpan = document.getElementById('ano');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalGenre = document.getElementById('modalGenre');
const modalPlatform = document.getElementById('modalPlatform');
const modalPoster = document.getElementById('modalPoster');
const closeModalBtn = document.getElementById('closeModal');

yearSpan.textContent = new Date().getFullYear();

// Renderiza cards
function render(list) {
    grid.innerHTML = '';
    if (list.length === 0) {
        grid.innerHTML = '<div style="color:var(--muted);padding:20px">Nenhum jogo encontrado.</div>';
        return;
    }
    list.forEach(g => {
        const card = document.createElement('article');
        card.className = 'card';
        card.setAttribute('data-id', g.id);
        card.innerHTML = `
          <div class="thumb" aria-hidden="true">${g.title.split(' ')[0]}</div>
          <h4>${g.title}</h4>
          <div class="meta"><span>${g.genre}</span><span>${g.platform}</span></div>
          <p style="color:var(--muted);font-size:13px">${g.short}</p>
          <div class="card-actions">
            <button class="btn open" data-id="${g.id}">Detalhes</button>
            <button class="btn" onclick="alert('Funcionalidade de download/instalação não implementada')">Instalar</button>
          </div>
        `;
        grid.appendChild(card);
    });
    // ativar listeners de detalhes
    document.querySelectorAll('.open').forEach(b => {
        b.addEventListener('click', (e) => {
            const id = Number(e.currentTarget.dataset.id);
            openModal(id);
        });
    });
}

// Filtro por busca + chips
let activeCategory = 'todos';
let activePlatform = 'todos';

function filterAndRender() {
    const q = searchInput.value.trim().toLowerCase();
    let out = games.filter(g => {
        const matchesQ = q === '' || (g.title + ' ' + g.short + ' ' + g.genre).toLowerCase().includes(q);
        const matchesCat = activeCategory === 'todos' || g.genre === activeCategory;
        const matchesPlat = activePlatform === 'todos' || g.platform === activePlatform;
        return matchesQ && matchesCat && matchesPlat;
    });
    render(out);
}

// chips interactions
document.querySelectorAll('.sidebar .chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
        const cat = chip.dataset.cat;
        const plat = chip.dataset.platform;
        // se possui data-cat => é categoria; se possui data-platform => plataforma
        if (cat !== undefined) {
            document.querySelectorAll('.chip[data-cat]').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeCategory = chip.dataset.cat || 'todos';
        }
        if (plat !== undefined) {
            document.querySelectorAll('.chip[data-platform]').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activePlatform = chip.dataset.platform || 'todos';
        }
        filterAndRender();
    });
});

// pesquisa ao digitar
searchInput.addEventListener('input', filterAndRender);

// modal
function openModal(id) {
    const g = games.find(x => x.id === id);
    if (!g) return;
    modalTitle.textContent = g.title;
    modalDesc.textContent = g.short + " — descrição expandida com mais detalhes do jogo, requisitos e trailer (exemplo).";
    modalGenre.textContent = g.genre;
    modalPlatform.textContent = g.platform;
    modalPoster.textContent = g.title.split(' ')[0];
    modalBackdrop.style.display = 'flex';
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    modalBackdrop.style.display = 'none';
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}
closeModalBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
});

// botões extras
document.getElementById('exploreBtn').addEventListener('click', () => {
    // Por exemplo, limpar filtros e foco na grid
    searchInput.value = '';
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.chip[data-cat]')[0].classList.add('active');
    document.querySelectorAll('.chip[data-platform]')[0].classList.add('active');
    activeCategory = 'todos';
    activePlatform = 'todos';
    filterAndRender();
    window.scrollTo({ top: 300, behavior: 'smooth' });
});

// inicializa
render(games);