// ==========================================
// MINI ARCADE LOADER - APP.JS
// Launcher de jogos HTML5
// ==========================================

// Constantes
const STORAGE_KEY = 'fp_mini_arcade';
const SAMPLE_JSON_PATH = 'arcade-sample.json';

let games = [];
let editingGameId = null;
let selectedGameId = null;

// ==========================================
// ELEMENTOS DO DOM
// ==========================================
const elements = {
    // Modal e formulário
    modal: document.getElementById('gameFormModal'),
    gameForm: document.getElementById('gameForm'),
    formTitle: document.getElementById('formTitle'),
    gameId: document.getElementById('gameId'),
    gameName: document.getElementById('gameName'),
    gameDescription: document.getElementById('gameDescription'),
    gameUrl: document.getElementById('gameUrl'),
    gameThumbnail: document.getElementById('gameThumbnail'),
    gameCategory: document.getElementById('gameCategory'),

    // Botões
    addGameBtn: document.getElementById('addGameBtn'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    cancelBtn: document.getElementById('cancelBtn'),
    exportBtn: document.getElementById('exportBtn'),
    importBtn: document.getElementById('importBtn'),
    importFile: document.getElementById('importFile'),
    closePlayerBtn: document.getElementById('closePlayerBtn'),

    // Listagem e player
    gamesList: document.getElementById('gamesList'),
    emptyState: document.getElementById('emptyState'),
    playerContainer: document.getElementById('playerContainer'),
    gameDetails: document.getElementById('gameDetails'),
    detailsName: document.getElementById('detailsName'),
    detailsDescription: document.getElementById('detailsDescription'),
    detailsCategory: document.getElementById('detailsCategory')
};

// ==========================================
// INICIALIZAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
    await initializeApp();
    setupEventListeners();
});

/**
 * Inicializa o aplicativo carregando os dados
 */
async function initializeApp() {
    // Tenta carregar do localStorage primeiro
    const stored = loadFromStorage();

    if (stored && stored.length > 0) {
        games = stored;
    } else {
        // Se não houver dados no localStorage, carrega do JSON de exemplo
        await loadSampleData();
    }

    renderGames();
}

/**
 * Carrega dados de exemplo do JSON
 */
async function loadSampleData() {
    try {
        const response = await fetch(SAMPLE_JSON_PATH);
        if (response.ok) {
            games = await response.json();
            saveToStorage(); // Salva no localStorage para futuras edições
        }
    } catch (error) {
        console.error('Erro ao carregar dados de exemplo:', error);
        games = [];
    }
}

// ==========================================
// CONFIGURAÇÃO DE EVENT LISTENERS
// ==========================================
function setupEventListeners() {
    // Modal
    elements.addGameBtn.addEventListener('click', openAddModal);
    elements.closeModalBtn.addEventListener('click', closeModal);
    elements.cancelBtn.addEventListener('click', closeModal);

    // Fechar modal ao clicar fora dele
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) {
            closeModal();
        }
    });

    // Formulário
    elements.gameForm.addEventListener('submit', handleFormSubmit);

    // Importar/Exportar
    elements.exportBtn.addEventListener('click', exportGames);
    elements.importBtn.addEventListener('click', () => elements.importFile.click());
    elements.importFile.addEventListener('change', importGames);

    // Player
    elements.closePlayerBtn.addEventListener('click', closePlayer);
}

// ==========================================
// GERENCIAMENTO DE DADOS (localStorage)
// ==========================================

/**
 * Carrega os jogos do localStorage
 */
function loadFromStorage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error('Erro ao carregar do localStorage:', error);
        return null;
    }
}

/**
 * Salva os jogos no localStorage
 */
function saveToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
        alert('Erro ao salvar dados. Verifique se há espaço disponível no navegador.');
    }
}

// ==========================================
// MODAL
// ==========================================

/**
 * Abre o modal para adicionar jogo
 */
function openAddModal() {
    editingGameId = null;
    elements.gameForm.reset();
    elements.formTitle.textContent = 'Adicionar Novo Jogo';
    elements.modal.classList.add('active');
}

/**
 * Abre o modal para editar jogo
 */
function openEditModal(id) {
    const game = getGameById(id);
    if (!game) return;

    editingGameId = id;

    // Preenche o formulário
    elements.gameId.value = game.id;
    elements.gameName.value = game.nome;
    elements.gameDescription.value = game.descricao;
    elements.gameUrl.value = game.url;
    elements.gameThumbnail.value = game.thumbnail;
    elements.gameCategory.value = game.categoria;

    elements.formTitle.textContent = 'Editar Jogo';
    elements.modal.classList.add('active');
}

/**
 * Fecha o modal
 */
function closeModal() {
    elements.modal.classList.remove('active');
    elements.gameForm.reset();
    editingGameId = null;
}

// ==========================================
// MANIPULAÇÃO DE FORMULÁRIO
// ==========================================

/**
 * Lida com o envio do formulário (adicionar ou editar)
 */
function handleFormSubmit(e) {
    e.preventDefault();

    // Captura os valores do formulário
    const gameData = {
        id: editingGameId || generateId(),
        nome: elements.gameName.value.trim(),
        descricao: elements.gameDescription.value.trim(),
        url: elements.gameUrl.value.trim(),
        thumbnail: elements.gameThumbnail.value.trim(),
        categoria: elements.gameCategory.value.trim()
    };

    // Adiciona ou atualiza o jogo
    if (editingGameId) {
        updateGame(gameData);
    } else {
        addGame(gameData);
    }

    // Fecha o modal e renderiza
    closeModal();
    renderGames();
}

/**
 * Adiciona um novo jogo ao array
 */
function addGame(gameData) {
    games.push(gameData);
    saveToStorage();
}

/**
 * Atualiza um jogo existente
 */
function updateGame(gameData) {
    const index = games.findIndex(g => g.id === gameData.id);
    if (index !== -1) {
        games[index] = gameData;
        saveToStorage();

        // Se o jogo sendo editado está aberto no player, atualiza o player
        if (selectedGameId === gameData.id) {
            loadGameInPlayer(gameData.id);
        }
    }
}

/**
 * Remove um jogo
 */
function deleteGame(id) {
    if (confirm('Tem certeza que deseja excluir este jogo?')) {
        games = games.filter(g => g.id !== id);
        saveToStorage();

        // Se o jogo excluído estava aberto no player, fecha o player
        if (selectedGameId === id) {
            closePlayer();
        }

        renderGames();
    }
}

// ==========================================
// RENDERIZAÇÃO
// ==========================================

/**
 * Renderiza a lista de jogos
 */
function renderGames() {
    // Se não houver jogos, mostra o estado vazio
    if (games.length === 0) {
        elements.gamesList.style.display = 'none';
        elements.emptyState.style.display = 'block';
        return;
    }

    elements.gamesList.style.display = 'grid';
    elements.emptyState.style.display = 'none';

    // Renderiza os cards de jogos
    elements.gamesList.innerHTML = games.map(game => createGameCard(game)).join('');
}

/**
 * Cria o HTML de um card de jogo
 */
function createGameCard(game) {
    const isSelected = selectedGameId === game.id ? 'selected' : '';

    return `
        <div class="game-card ${isSelected}" data-game-id="${game.id}">
            <img src="${escapeHtml(game.thumbnail)}"
                 alt="${escapeHtml(game.nome)}"
                 class="game-thumbnail"
                 onclick="loadGameInPlayer('${game.id}')"
                 onerror="this.src='https://via.placeholder.com/300x150/475569/cbd5e1?text=Sem+Imagem'">
            <div class="game-info">
                <h3 class="game-name" onclick="loadGameInPlayer('${game.id}')">${escapeHtml(game.nome)}</h3>
                <span class="game-category">${escapeHtml(game.categoria)}</span>
                <div class="game-actions">
                    <button class="btn btn-edit" onclick="event.stopPropagation(); openEditModal('${game.id}')">
                        ✏️ Editar
                    </button>
                    <button class="btn btn-danger" onclick="event.stopPropagation(); deleteGame('${game.id}')">
                        🗑️ Excluir
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// PLAYER
// ==========================================

/**
 * Carrega um jogo no player (iframe)
 */
function loadGameInPlayer(id) {
    const game = getGameById(id);
    if (!game) return;

    selectedGameId = id;

    // Cria o iframe
    const iframe = `
        <iframe src="${escapeHtml(game.url)}"
                class="game-iframe"
                title="${escapeHtml(game.nome)}"
                allowfullscreen>
        </iframe>
    `;

    elements.playerContainer.innerHTML = iframe;

    // Atualiza os detalhes do jogo
    elements.detailsName.textContent = game.nome;
    elements.detailsDescription.textContent = game.descricao;
    elements.detailsCategory.textContent = game.categoria;
    elements.gameDetails.style.display = 'block';

    // Atualiza a seleção visual nos cards
    renderGames();

    // Scroll suave para o player em mobile
    if (window.innerWidth <= 1024) {
        elements.playerContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Fecha o player
 */
function closePlayer() {
    selectedGameId = null;

    // Restaura o placeholder
    elements.playerContainer.innerHTML = `
        <div class="player-placeholder">
            <div class="placeholder-content">
                <span class="placeholder-icon">🕹️</span>
                <h3>Selecione um jogo para jogar</h3>
                <p>Clique em qualquer card da biblioteca para iniciar</p>
            </div>
        </div>
    `;

    elements.gameDetails.style.display = 'none';

    // Remove a seleção visual dos cards
    renderGames();
}

// ==========================================
// IMPORTAR / EXPORTAR
// ==========================================

/**
 * Exporta todos os jogos para um arquivo JSON
 */
function exportGames() {
    if (games.length === 0) {
        alert('Não há jogos para exportar!');
        return;
    }

    const dataStr = JSON.stringify(games, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `arcade-config-${formatDateForFilename()}.json`;
    link.click();

    URL.revokeObjectURL(url);

    alert(`✅ Configuração exportada com sucesso!\n${games.length} jogo(s) foram exportados.`);
}

/**
 * Importa jogos de um arquivo JSON
 */
function importGames(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
        try {
            const importedGames = JSON.parse(event.target.result);

            if (!Array.isArray(importedGames)) {
                throw new Error('Formato inválido');
            }

            // Validação básica
            const validGames = importedGames.filter(game =>
                game.nome && game.url && game.thumbnail
            );

            if (validGames.length === 0) {
                throw new Error('Nenhum jogo válido encontrado');
            }

            // Pergunta ao usuário como proceder
            const action = confirm(
                `Foram encontrados ${validGames.length} jogo(s) no arquivo.\n\n` +
                'OK = Substituir configuração atual\n' +
                'Cancelar = Mesclar com a configuração atual'
            );

            if (action) {
                // Substitui
                games = validGames;
                selectedGameId = null;
                closePlayer();
            } else {
                // Mescla (adiciona sem duplicar IDs)
                validGames.forEach(game => {
                    // Gera novo ID se já existir
                    if (games.find(g => g.id === game.id)) {
                        game.id = generateId();
                    }
                    games.push(game);
                });
            }

            saveToStorage();
            renderGames();

            alert(`✅ Importação concluída!\n${validGames.length} jogo(s) importado(s).`);

        } catch (error) {
            console.error('Erro ao importar:', error);
            alert('❌ Erro ao importar arquivo. Verifique se o formato está correto.');
        }
    };

    reader.readAsText(file);

    // Reseta o input para permitir importar o mesmo arquivo novamente
    e.target.value = '';
}

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

/**
 * Gera um ID único
 */
function generateId() {
    return 'game_' + Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * Busca um jogo por ID
 */
function getGameById(id) {
    return games.find(g => g.id === id);
}

/**
 * Escapa HTML para prevenir XSS
 */
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Formata a data para nome de arquivo
 */
function formatDateForFilename() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}${month}${day}-${hours}${minutes}`;
}

// ==========================================
// FUNÇÕES GLOBAIS (chamadas pelo HTML)
// ==========================================
window.openEditModal = openEditModal;
window.deleteGame = deleteGame;
window.loadGameInPlayer = loadGameInPlayer;
