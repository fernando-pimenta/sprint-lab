// ==========================================
// GAME CATALOG OFFLINE - APP.JS
// Sistema de gerenciamento de catálogo de jogos offline
// ==========================================

// Constantes
const STORAGE_KEY = 'fp_game_catalog';
let games = [];
let editingGameId = null;

// ==========================================
// ELEMENTOS DO DOM
// ==========================================
const elements = {
    // Formulário
    gameForm: document.getElementById('gameForm'),
    formTitle: document.getElementById('formTitle'),
    gameId: document.getElementById('gameId'),
    gameTitle: document.getElementById('gameTitle'),
    gamePlatform: document.getElementById('gamePlatform'),
    gameType: document.getElementById('gameType'),
    gameBarcode: document.getElementById('gameBarcode'),
    gameOrigin: document.getElementById('gameOrigin'),
    gameCover: document.getElementById('gameCover'),
    saveBtn: document.getElementById('saveBtn'),
    cancelBtn: document.getElementById('cancelBtn'),

    // Filtros
    filterPlatform: document.getElementById('filterPlatform'),
    filterType: document.getElementById('filterType'),
    searchInput: document.getElementById('searchInput'),

    // Botões de ação
    exportBtn: document.getElementById('exportBtn'),
    importBtn: document.getElementById('importBtn'),
    importFile: document.getElementById('importFile'),

    // Listagem
    gamesList: document.getElementById('gamesList'),
    emptyState: document.getElementById('emptyState'),

    // Estatísticas
    totalGames: document.getElementById('totalGames'),
    physicalGames: document.getElementById('physicalGames'),
    digitalGames: document.getElementById('digitalGames')
};

// ==========================================
// INICIALIZAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadGamesFromStorage();
    renderGames();
    updateStats();
    setupEventListeners();
});

// ==========================================
// CONFIGURAÇÃO DE EVENT LISTENERS
// ==========================================
function setupEventListeners() {
    // Formulário
    elements.gameForm.addEventListener('submit', handleFormSubmit);
    elements.cancelBtn.addEventListener('click', cancelEdit);

    // Filtros e busca
    elements.filterPlatform.addEventListener('change', applyFilters);
    elements.filterType.addEventListener('change', applyFilters);
    elements.searchInput.addEventListener('input', applyFilters);

    // Importar/Exportar
    elements.exportBtn.addEventListener('click', exportGames);
    elements.importBtn.addEventListener('click', () => elements.importFile.click());
    elements.importFile.addEventListener('change', importGames);
}

// ==========================================
// GERENCIAMENTO DE DADOS (localStorage)
// ==========================================

/**
 * Carrega os jogos do localStorage
 */
function loadGamesFromStorage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            games = JSON.parse(stored);
        }
    } catch (error) {
        console.error('Erro ao carregar jogos do localStorage:', error);
        games = [];
    }
}

/**
 * Salva os jogos no localStorage
 */
function saveGamesToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
    } catch (error) {
        console.error('Erro ao salvar jogos no localStorage:', error);
        alert('Erro ao salvar dados. Verifique se há espaço disponível no navegador.');
    }
}

// ==========================================
// MANIPULAÇÃO DE FORMULÁRIO
// ==========================================

/**
 * Lida com o envio do formulário (adicionar ou editar)
 */
async function handleFormSubmit(e) {
    e.preventDefault();

    // Captura os valores do formulário
    const gameData = {
        id: editingGameId || generateId(),
        title: elements.gameTitle.value.trim(),
        platform: elements.gamePlatform.value,
        type: elements.gameType.value,
        barcode: elements.gameBarcode.value.trim(),
        origin: elements.gameOrigin.value.trim(),
        cover: null,
        createdAt: editingGameId ? getGameById(editingGameId).createdAt : new Date().toISOString()
    };

    // Processa a imagem de capa se houver
    if (elements.gameCover.files && elements.gameCover.files[0]) {
        try {
            gameData.cover = await fileToBase64(elements.gameCover.files[0]);
        } catch (error) {
            console.error('Erro ao processar imagem:', error);
            alert('Erro ao processar a imagem. Tente novamente.');
            return;
        }
    } else if (editingGameId) {
        // Mantém a capa anterior se estiver editando e não selecionou nova imagem
        const existingGame = getGameById(editingGameId);
        if (existingGame) {
            gameData.cover = existingGame.cover;
        }
    }

    // Adiciona ou atualiza o jogo
    if (editingGameId) {
        updateGame(gameData);
    } else {
        addGame(gameData);
    }

    // Reseta o formulário e a interface
    resetForm();
    renderGames();
    updateStats();
}

/**
 * Adiciona um novo jogo ao array
 */
function addGame(gameData) {
    games.push(gameData);
    saveGamesToStorage();
}

/**
 * Atualiza um jogo existente
 */
function updateGame(gameData) {
    const index = games.findIndex(g => g.id === gameData.id);
    if (index !== -1) {
        games[index] = gameData;
        saveGamesToStorage();
    }
}

/**
 * Remove um jogo
 */
function deleteGame(id) {
    if (confirm('Tem certeza que deseja excluir este jogo?')) {
        games = games.filter(g => g.id !== id);
        saveGamesToStorage();
        renderGames();
        updateStats();
    }
}

/**
 * Prepara o formulário para edição
 */
function editGame(id) {
    const game = getGameById(id);
    if (!game) return;

    editingGameId = id;

    // Preenche o formulário
    elements.gameId.value = game.id;
    elements.gameTitle.value = game.title;
    elements.gamePlatform.value = game.platform;
    elements.gameType.value = game.type;
    elements.gameBarcode.value = game.barcode || '';
    elements.gameOrigin.value = game.origin || '';

    // Atualiza a interface
    elements.formTitle.textContent = 'Editar Jogo';
    elements.saveBtn.textContent = '💾 Atualizar Jogo';
    elements.cancelBtn.style.display = 'inline-flex';

    // Scroll para o formulário
    elements.gameForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Cancela a edição e reseta o formulário
 */
function cancelEdit() {
    resetForm();
}

/**
 * Reseta o formulário para o estado inicial
 */
function resetForm() {
    editingGameId = null;
    elements.gameForm.reset();
    elements.gameId.value = '';
    elements.formTitle.textContent = 'Adicionar Novo Jogo';
    elements.saveBtn.textContent = '💾 Salvar Jogo';
    elements.cancelBtn.style.display = 'none';
}

// ==========================================
// RENDERIZAÇÃO
// ==========================================

/**
 * Renderiza a lista de jogos com filtros aplicados
 */
function renderGames() {
    const filteredGames = getFilteredGames();

    // Se não houver jogos, mostra o estado vazio
    if (filteredGames.length === 0) {
        elements.gamesList.style.display = 'none';
        elements.emptyState.style.display = 'block';
        return;
    }

    elements.gamesList.style.display = 'grid';
    elements.emptyState.style.display = 'none';

    // Renderiza os cards de jogos
    elements.gamesList.innerHTML = filteredGames.map(game => createGameCard(game)).join('');
}

/**
 * Cria o HTML de um card de jogo
 */
function createGameCard(game) {
    const coverHtml = game.cover
        ? `<img src="${game.cover}" alt="${game.title}" class="game-cover">`
        : `<div class="game-cover placeholder">🎮</div>`;

    const typeClass = game.type === 'Físico' ? 'physical' : 'digital';

    return `
        <div class="game-card">
            ${coverHtml}
            <div class="game-info">
                <h3 class="game-title">${escapeHtml(game.title)}</h3>
                <div class="game-details">
                    <div class="game-detail">
                        <strong>🎯 Plataforma:</strong> ${escapeHtml(game.platform)}
                    </div>
                    <div class="game-detail">
                        <span class="game-badge ${typeClass}">${escapeHtml(game.type)}</span>
                    </div>
                    ${game.barcode ? `<div class="game-detail"><strong>📦 Código:</strong> ${escapeHtml(game.barcode)}</div>` : ''}
                    ${game.origin ? `<div class="game-detail"><strong>🏪 Origem:</strong> ${escapeHtml(game.origin)}</div>` : ''}
                </div>
                <div class="game-actions">
                    <button class="btn btn-edit" onclick="editGame('${game.id}')">✏️ Editar</button>
                    <button class="btn btn-danger" onclick="deleteGame('${game.id}')">🗑️ Excluir</button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Atualiza as estatísticas
 */
function updateStats() {
    const total = games.length;
    const physical = games.filter(g => g.type === 'Físico').length;
    const digital = games.filter(g => g.type === 'Digital').length;

    elements.totalGames.textContent = total;
    elements.physicalGames.textContent = physical;
    elements.digitalGames.textContent = digital;
}

// ==========================================
// FILTROS E BUSCA
// ==========================================

/**
 * Aplica todos os filtros e retorna os jogos filtrados
 */
function getFilteredGames() {
    let filtered = [...games];

    // Filtro por plataforma
    const platformFilter = elements.filterPlatform.value;
    if (platformFilter) {
        filtered = filtered.filter(g => g.platform === platformFilter);
    }

    // Filtro por tipo
    const typeFilter = elements.filterType.value;
    if (typeFilter) {
        filtered = filtered.filter(g => g.type === typeFilter);
    }

    // Busca por título
    const searchTerm = elements.searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        filtered = filtered.filter(g =>
            g.title.toLowerCase().includes(searchTerm)
        );
    }

    return filtered;
}

/**
 * Reaplica os filtros e renderiza
 */
function applyFilters() {
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
    link.download = `game-catalog-backup-${formatDateForFilename()}.json`;
    link.click();

    URL.revokeObjectURL(url);

    alert(`✅ Biblioteca exportada com sucesso!\n${games.length} jogo(s) foram exportados.`);
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
                game.title && game.platform && game.type
            );

            if (validGames.length === 0) {
                throw new Error('Nenhum jogo válido encontrado');
            }

            // Pergunta ao usuário como proceder
            const action = confirm(
                `Foram encontrados ${validGames.length} jogo(s) no arquivo.\n\n` +
                'OK = Substituir biblioteca atual\n' +
                'Cancelar = Mesclar com a biblioteca atual'
            );

            if (action) {
                // Substitui
                games = validGames;
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

            saveGamesToStorage();
            renderGames();
            updateStats();

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
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * Busca um jogo por ID
 */
function getGameById(id) {
    return games.find(g => g.id === id);
}

/**
 * Converte um arquivo para base64
 */
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);

        reader.readAsDataURL(file);
    });
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
// As funções editGame e deleteGame precisam ser globais
// para serem chamadas pelos event handlers inline no HTML
window.editGame = editGame;
window.deleteGame = deleteGame;
