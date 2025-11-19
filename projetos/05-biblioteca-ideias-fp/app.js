// ==========================================
// BIBLIOTECA DE IDEIAS - APP.JS
// Sistema de gerenciamento de ideias e rascunhos para blog
// ==========================================

// Constantes
const STORAGE_KEY = 'fp_ideas_library';
let ideas = [];
let editingIdeaId = null;

// ==========================================
// ELEMENTOS DO DOM
// ==========================================
const elements = {
    // Modal e formulário
    modal: document.getElementById('ideaFormModal'),
    ideaForm: document.getElementById('ideaForm'),
    formTitle: document.getElementById('formTitle'),
    ideaId: document.getElementById('ideaId'),
    ideaTitle: document.getElementById('ideaTitle'),
    ideaType: document.getElementById('ideaType'),
    ideaStatus: document.getElementById('ideaStatus'),
    ideaTag: document.getElementById('ideaTag'),
    ideaContent: document.getElementById('ideaContent'),

    // Botões
    addIdeaBtn: document.getElementById('addIdeaBtn'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    cancelBtn: document.getElementById('cancelBtn'),
    saveBtn: document.getElementById('saveBtn'),
    exportBtn: document.getElementById('exportBtn'),
    importBtn: document.getElementById('importBtn'),
    importFile: document.getElementById('importFile'),

    // Filtros
    filterType: document.getElementById('filterType'),
    filterStatus: document.getElementById('filterStatus'),
    filterTag: document.getElementById('filterTag'),
    searchInput: document.getElementById('searchInput'),

    // Listagem
    ideasList: document.getElementById('ideasList'),
    emptyState: document.getElementById('emptyState'),

    // Estatísticas
    totalIdeas: document.getElementById('totalIdeas'),
    draftIdeas: document.getElementById('draftIdeas'),
    developmentIdeas: document.getElementById('developmentIdeas'),
    publishedIdeas: document.getElementById('publishedIdeas')
};

// ==========================================
// INICIALIZAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadIdeasFromStorage();
    renderIdeas();
    updateStats();
    setupEventListeners();
});

// ==========================================
// CONFIGURAÇÃO DE EVENT LISTENERS
// ==========================================
function setupEventListeners() {
    // Modal
    elements.addIdeaBtn.addEventListener('click', openAddModal);
    elements.closeModalBtn.addEventListener('click', closeModal);
    elements.cancelBtn.addEventListener('click', closeModal);

    // Fechar modal ao clicar fora
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) {
            closeModal();
        }
    });

    // Formulário
    elements.ideaForm.addEventListener('submit', handleFormSubmit);

    // Filtros e busca
    elements.filterType.addEventListener('change', applyFilters);
    elements.filterStatus.addEventListener('change', applyFilters);
    elements.filterTag.addEventListener('change', applyFilters);
    elements.searchInput.addEventListener('input', applyFilters);

    // Importar/Exportar
    elements.exportBtn.addEventListener('click', exportIdeas);
    elements.importBtn.addEventListener('click', () => elements.importFile.click());
    elements.importFile.addEventListener('change', importIdeas);
}

// ==========================================
// GERENCIAMENTO DE DADOS (localStorage)
// ==========================================

/**
 * Carrega as ideias do localStorage
 */
function loadIdeasFromStorage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            ideas = JSON.parse(stored);
        }
    } catch (error) {
        console.error('Erro ao carregar ideias do localStorage:', error);
        ideas = [];
    }
}

/**
 * Salva as ideias no localStorage
 */
function saveIdeasToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
    } catch (error) {
        console.error('Erro ao salvar ideias no localStorage:', error);
        alert('Erro ao salvar dados. Verifique se há espaço disponível no navegador.');
    }
}

// ==========================================
// MODAL
// ==========================================

/**
 * Abre o modal para adicionar ideia
 */
function openAddModal() {
    editingIdeaId = null;
    elements.ideaForm.reset();
    elements.formTitle.textContent = 'Nova Ideia';
    elements.saveBtn.textContent = '💾 Salvar Ideia';
    elements.modal.classList.add('active');
}

/**
 * Abre o modal para editar ideia
 */
function openEditModal(id) {
    const idea = getIdeaById(id);
    if (!idea) return;

    editingIdeaId = id;

    // Preenche o formulário
    elements.ideaId.value = idea.id;
    elements.ideaTitle.value = idea.title;
    elements.ideaType.value = idea.type;
    elements.ideaStatus.value = idea.status;
    elements.ideaTag.value = idea.tag;
    elements.ideaContent.value = idea.content || '';

    elements.formTitle.textContent = 'Editar Ideia';
    elements.saveBtn.textContent = '💾 Atualizar Ideia';
    elements.modal.classList.add('active');
}

/**
 * Fecha o modal
 */
function closeModal() {
    elements.modal.classList.remove('active');
    elements.ideaForm.reset();
    editingIdeaId = null;
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
    const ideaData = {
        id: editingIdeaId || generateId(),
        title: elements.ideaTitle.value.trim(),
        type: elements.ideaType.value,
        status: elements.ideaStatus.value,
        tag: elements.ideaTag.value,
        content: elements.ideaContent.value.trim(),
        createdAt: editingIdeaId ? getIdeaById(editingIdeaId).createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Adiciona ou atualiza a ideia
    if (editingIdeaId) {
        updateIdea(ideaData);
    } else {
        addIdea(ideaData);
    }

    // Fecha o modal e atualiza a interface
    closeModal();
    renderIdeas();
    updateStats();
}

/**
 * Adiciona uma nova ideia ao array
 */
function addIdea(ideaData) {
    ideas.push(ideaData);
    saveIdeasToStorage();
}

/**
 * Atualiza uma ideia existente
 */
function updateIdea(ideaData) {
    const index = ideas.findIndex(i => i.id === ideaData.id);
    if (index !== -1) {
        ideas[index] = ideaData;
        saveIdeasToStorage();
    }
}

/**
 * Remove uma ideia
 */
function deleteIdea(id) {
    if (confirm('Tem certeza que deseja excluir esta ideia?')) {
        ideas = ideas.filter(i => i.id !== id);
        saveIdeasToStorage();
        renderIdeas();
        updateStats();
    }
}

// ==========================================
// RENDERIZAÇÃO
// ==========================================

/**
 * Renderiza a lista de ideias com filtros aplicados
 */
function renderIdeas() {
    const filteredIdeas = getFilteredIdeas();

    // Se não houver ideias, mostra o estado vazio
    if (filteredIdeas.length === 0) {
        elements.ideasList.style.display = 'none';
        elements.emptyState.style.display = 'block';
        return;
    }

    elements.ideasList.style.display = 'grid';
    elements.emptyState.style.display = 'none';

    // Ordena ideias por data de atualização (mais recentes primeiro)
    const sortedIdeas = filteredIdeas.sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    // Renderiza os cards de ideias
    elements.ideasList.innerHTML = sortedIdeas.map(idea => createIdeaCard(idea)).join('');
}

/**
 * Cria o HTML de um card de ideia
 */
function createIdeaCard(idea) {
    // Define a classe de status para colorir a borda
    const statusClass = idea.status.toLowerCase().replace(/ /g, '-');

    // Cria preview do conteúdo (primeiros 200 caracteres)
    const preview = idea.content
        ? (idea.content.substring(0, 200) + (idea.content.length > 200 ? '...' : ''))
        : 'Sem rascunho ainda...';

    // Formata a data
    const date = new Date(idea.updatedAt);
    const formattedDate = formatDate(date);

    // Define a classe do badge de status
    const statusBadgeClass = idea.status.toLowerCase().replace(/ /g, '-');

    return `
        <div class="idea-card status-${statusClass}">
            <div class="idea-header">
                <h3 class="idea-title">${escapeHtml(idea.title)}</h3>
                <div class="idea-meta">
                    <span class="idea-badge badge-type">${escapeHtml(idea.type)}</span>
                    <span class="idea-badge badge-tag">${escapeHtml(idea.tag)}</span>
                    <span class="idea-badge badge-status ${statusBadgeClass}">${escapeHtml(idea.status)}</span>
                </div>
            </div>
            <div class="idea-content">
                <div class="idea-preview">${escapeHtml(preview)}</div>
            </div>
            <div class="idea-footer">
                <div class="idea-date">Atualizado: ${formattedDate}</div>
                <div class="idea-actions">
                    <button class="btn btn-edit" onclick="openEditModal('${idea.id}')">✏️ Editar</button>
                    <button class="btn btn-danger" onclick="deleteIdea('${idea.id}')">🗑️ Excluir</button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Atualiza as estatísticas
 */
function updateStats() {
    const total = ideas.length;
    const draft = ideas.filter(i => i.status === 'Rascunho').length;
    const development = ideas.filter(i => i.status === 'Em desenvolvimento').length;
    const published = ideas.filter(i => i.status === 'Publicado').length;

    elements.totalIdeas.textContent = total;
    elements.draftIdeas.textContent = draft;
    elements.developmentIdeas.textContent = development;
    elements.publishedIdeas.textContent = published;
}

// ==========================================
// FILTROS E BUSCA
// ==========================================

/**
 * Aplica todos os filtros e retorna as ideias filtradas
 */
function getFilteredIdeas() {
    let filtered = [...ideas];

    // Filtro por tipo
    const typeFilter = elements.filterType.value;
    if (typeFilter) {
        filtered = filtered.filter(i => i.type === typeFilter);
    }

    // Filtro por status
    const statusFilter = elements.filterStatus.value;
    if (statusFilter) {
        filtered = filtered.filter(i => i.status === statusFilter);
    }

    // Filtro por tag
    const tagFilter = elements.filterTag.value;
    if (tagFilter) {
        filtered = filtered.filter(i => i.tag === tagFilter);
    }

    // Busca por título
    const searchTerm = elements.searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        filtered = filtered.filter(i =>
            i.title.toLowerCase().includes(searchTerm) ||
            (i.content && i.content.toLowerCase().includes(searchTerm))
        );
    }

    return filtered;
}

/**
 * Reaplica os filtros e renderiza
 */
function applyFilters() {
    renderIdeas();
}

// ==========================================
// IMPORTAR / EXPORTAR
// ==========================================

/**
 * Exporta todas as ideias para um arquivo JSON
 */
function exportIdeas() {
    if (ideas.length === 0) {
        alert('Não há ideias para exportar!');
        return;
    }

    const dataStr = JSON.stringify(ideas, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ideias-blog-fp-${formatDateForFilename()}.json`;
    link.click();

    URL.revokeObjectURL(url);

    alert(`✅ Biblioteca exportada com sucesso!\n${ideas.length} ideia(s) foram exportadas.`);
}

/**
 * Importa ideias de um arquivo JSON
 */
function importIdeas(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
        try {
            const importedIdeas = JSON.parse(event.target.result);

            if (!Array.isArray(importedIdeas)) {
                throw new Error('Formato inválido');
            }

            // Validação básica
            const validIdeas = importedIdeas.filter(idea =>
                idea.title && idea.type && idea.status && idea.tag
            );

            if (validIdeas.length === 0) {
                throw new Error('Nenhuma ideia válida encontrada');
            }

            // Pergunta ao usuário como proceder
            const action = confirm(
                `Foram encontradas ${validIdeas.length} ideia(s) no arquivo.\n\n` +
                'OK = Substituir biblioteca atual\n' +
                'Cancelar = Mesclar com a biblioteca atual'
            );

            if (action) {
                // Substitui
                ideas = validIdeas;
            } else {
                // Mescla (adiciona sem duplicar IDs)
                validIdeas.forEach(idea => {
                    // Gera novo ID se já existir
                    if (ideas.find(i => i.id === idea.id)) {
                        idea.id = generateId();
                    }
                    ideas.push(idea);
                });
            }

            saveIdeasToStorage();
            renderIdeas();
            updateStats();

            alert(`✅ Importação concluída!\n${validIdeas.length} ideia(s) importada(s).`);

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
 * Busca uma ideia por ID
 */
function getIdeaById(id) {
    return ideas.find(i => i.id === id);
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
 * Formata data para exibição
 */
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} às ${hours}:${minutes}`;
}

/**
 * Formata data para nome de arquivo
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
window.deleteIdea = deleteIdea;
