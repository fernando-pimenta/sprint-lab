// ==================== CONSTANTES E CONFIGURAÇÕES ====================
const STORAGE_KEY = 'fp_tools_catalog';

// Estado da aplicação
let tools = [];
let currentToolId = null;
let isEditMode = false;

// ==================== ELEMENTOS DO DOM ====================
const elements = {
    // Header
    exportBtn: document.getElementById('exportBtn'),
    importBtn: document.getElementById('importBtn'),
    importFile: document.getElementById('importFile'),

    // Filtros
    searchInput: document.getElementById('searchInput'),
    filterType: document.getElementById('filterType'),
    filterCategory: document.getElementById('filterCategory'),
    clearFiltersBtn: document.getElementById('clearFiltersBtn'),
    addToolBtn: document.getElementById('addToolBtn'),

    // Estatísticas
    totalTools: document.getElementById('totalTools'),
    totalDesktop: document.getElementById('totalDesktop'),
    totalWeb: document.getElementById('totalWeb'),
    totalPlugins: document.getElementById('totalPlugins'),

    // Ferramentas
    resultsCount: document.getElementById('resultsCount'),
    toolsTableBody: document.getElementById('toolsTableBody'),
    emptyState: document.getElementById('emptyState'),

    // Modal de Ferramenta
    toolModal: document.getElementById('toolModal'),
    modalTitle: document.getElementById('modalTitle'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    toolForm: document.getElementById('toolForm'),
    toolName: document.getElementById('toolName'),
    toolType: document.getElementById('toolType'),
    toolCategory: document.getElementById('toolCategory'),
    toolUrl: document.getElementById('toolUrl'),
    toolNotes: document.getElementById('toolNotes'),
    cancelBtn: document.getElementById('cancelBtn'),

    // Modal de Exclusão
    deleteModal: document.getElementById('deleteModal'),
    confirmDeleteBtn: document.getElementById('confirmDeleteBtn'),
    cancelDeleteBtn: document.getElementById('cancelDeleteBtn'),

    // Toast
    toast: document.getElementById('toast')
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    loadTools();
    renderTools();
    updateStats();
    attachEventListeners();
});

// ==================== EVENT LISTENERS ====================
function attachEventListeners() {
    // Header
    elements.exportBtn.addEventListener('click', exportTools);
    elements.importBtn.addEventListener('click', () => elements.importFile.click());
    elements.importFile.addEventListener('change', importTools);

    // Filtros
    elements.searchInput.addEventListener('input', renderTools);
    elements.filterType.addEventListener('change', renderTools);
    elements.filterCategory.addEventListener('change', renderTools);
    elements.clearFiltersBtn.addEventListener('click', clearFilters);
    elements.addToolBtn.addEventListener('click', openAddModal);

    // Modal de Ferramenta
    elements.closeModalBtn.addEventListener('click', closeToolModal);
    elements.cancelBtn.addEventListener('click', closeToolModal);
    elements.toolForm.addEventListener('submit', saveTool);

    // Modal de Exclusão
    elements.cancelDeleteBtn.addEventListener('click', closeDeleteModal);

    // Fechar modal ao clicar fora
    elements.toolModal.addEventListener('click', (e) => {
        if (e.target === elements.toolModal) {
            closeToolModal();
        }
    });

    elements.deleteModal.addEventListener('click', (e) => {
        if (e.target === elements.deleteModal) {
            closeDeleteModal();
        }
    });
}

// ==================== FUNÇÕES DE ARMAZENAMENTO ====================
function loadTools() {
    const stored = localStorage.getItem(STORAGE_KEY);
    tools = stored ? JSON.parse(stored) : [];
}

function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tools));
}

// ==================== FUNÇÕES DE FERRAMENTA ====================
function openAddModal() {
    isEditMode = false;
    currentToolId = null;
    elements.modalTitle.textContent = '➕ Adicionar Ferramenta';
    elements.toolForm.reset();
    elements.toolModal.classList.add('show');
    elements.toolName.focus();
}

function openEditModal(id) {
    const tool = getToolById(id);
    if (!tool) return;

    isEditMode = true;
    currentToolId = id;
    elements.modalTitle.textContent = '✏️ Editar Ferramenta';

    elements.toolName.value = tool.name;
    elements.toolType.value = tool.type;
    elements.toolCategory.value = tool.category;
    elements.toolUrl.value = tool.url || '';
    elements.toolNotes.value = tool.notes || '';

    elements.toolModal.classList.add('show');
    elements.toolName.focus();
}

function closeToolModal() {
    elements.toolModal.classList.remove('show');
    elements.toolForm.reset();
    currentToolId = null;
    isEditMode = false;
}

function saveTool(e) {
    e.preventDefault();

    // Validação
    if (!elements.toolName.value.trim()) {
        showToast('⚠️ Nome da ferramenta é obrigatório', 'error');
        elements.toolName.focus();
        return;
    }

    if (!elements.toolType.value) {
        showToast('⚠️ Selecione um tipo', 'error');
        elements.toolType.focus();
        return;
    }

    if (!elements.toolCategory.value) {
        showToast('⚠️ Selecione uma categoria', 'error');
        elements.toolCategory.focus();
        return;
    }

    // Criar objeto da ferramenta
    const tool = {
        id: currentToolId || generateId(),
        name: elements.toolName.value.trim(),
        type: elements.toolType.value,
        category: elements.toolCategory.value,
        url: elements.toolUrl.value.trim(),
        notes: elements.toolNotes.value.trim(),
        createdAt: currentToolId ? getToolById(currentToolId).createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Salvar ou atualizar
    if (isEditMode) {
        const index = tools.findIndex(t => t.id === currentToolId);
        tools[index] = tool;
        showToast('✅ Ferramenta atualizada com sucesso!');
    } else {
        tools.unshift(tool);
        showToast('✅ Ferramenta adicionada com sucesso!');
    }

    saveToStorage();
    renderTools();
    updateStats();
    closeToolModal();
}

function getToolById(id) {
    return tools.find(t => t.id === id);
}

// ==================== FUNÇÕES DE EXCLUSÃO ====================
let toolToDelete = null;

function deleteTool(id) {
    toolToDelete = id;
    elements.deleteModal.classList.add('show');

    elements.confirmDeleteBtn.onclick = () => {
        tools = tools.filter(t => t.id !== toolToDelete);
        saveToStorage();
        renderTools();
        updateStats();
        closeDeleteModal();
        showToast('🗑️ Ferramenta excluída com sucesso!');
    };
}

function closeDeleteModal() {
    elements.deleteModal.classList.remove('show');
    toolToDelete = null;
}

// ==================== RENDERIZAÇÃO ====================
function renderTools() {
    const filteredTools = getFilteredTools();

    // Atualizar contador
    elements.resultsCount.textContent = `${filteredTools.length} ferramenta${filteredTools.length !== 1 ? 's' : ''}`;

    // Verificar estado vazio
    if (filteredTools.length === 0) {
        elements.toolsTableBody.innerHTML = '';
        elements.emptyState.style.display = 'block';
        return;
    }

    elements.emptyState.style.display = 'none';

    // Renderizar tabela
    elements.toolsTableBody.innerHTML = filteredTools.map(tool => `
        <tr>
            <td class="tool-name">${escapeHtml(tool.name)}</td>
            <td>
                <span class="tool-type ${tool.type.toLowerCase()}">${escapeHtml(tool.type)}</span>
            </td>
            <td>
                <span class="tool-category">${escapeHtml(tool.category)}</span>
            </td>
            <td>
                ${tool.url ? `<a href="${escapeHtml(tool.url)}" target="_blank" rel="noopener noreferrer" class="tool-url">🔗 Abrir</a>` : '<span style="color: var(--text-muted);">-</span>'}
            </td>
            <td>
                <span class="tool-notes" title="${escapeHtml(tool.notes || '')}">
                    ${escapeHtml(tool.notes || '-')}
                </span>
            </td>
            <td>
                <div class="tool-actions">
                    <button class="action-btn edit" onclick="openEditModal('${tool.id}')" title="Editar">
                        ✏️
                    </button>
                    <button class="action-btn delete" onclick="deleteTool('${tool.id}')" title="Excluir">
                        🗑️
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function getFilteredTools() {
    let filtered = [...tools];

    // Filtro de busca
    const searchTerm = elements.searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(tool =>
            tool.name.toLowerCase().includes(searchTerm)
        );
    }

    // Filtro por tipo
    const typeFilter = elements.filterType.value;
    if (typeFilter) {
        filtered = filtered.filter(tool => tool.type === typeFilter);
    }

    // Filtro por categoria
    const categoryFilter = elements.filterCategory.value;
    if (categoryFilter) {
        filtered = filtered.filter(tool => tool.category === categoryFilter);
    }

    return filtered;
}

function clearFilters() {
    elements.searchInput.value = '';
    elements.filterType.value = '';
    elements.filterCategory.value = '';
    renderTools();
    showToast('🔄 Filtros limpos');
}

// ==================== ESTATÍSTICAS ====================
function updateStats() {
    // Total
    elements.totalTools.textContent = tools.length;

    // Desktop
    const desktopCount = tools.filter(t => t.type === 'Desktop').length;
    elements.totalDesktop.textContent = desktopCount;

    // Web
    const webCount = tools.filter(t => t.type === 'Web').length;
    elements.totalWeb.textContent = webCount;

    // Plugins e Extensões
    const pluginsCount = tools.filter(t =>
        t.type === 'Plugin' || t.type === 'Extensão'
    ).length;
    elements.totalPlugins.textContent = pluginsCount;
}

// ==================== EXPORTAR/IMPORTAR ====================
function exportTools() {
    if (tools.length === 0) {
        showToast('⚠️ Nenhuma ferramenta para exportar', 'error');
        return;
    }

    const dataStr = JSON.stringify(tools, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `ferramentas-fp-${formatDateForFilename()}.json`;
    link.click();

    URL.revokeObjectURL(url);
    showToast('📤 Ferramentas exportadas com sucesso!');
}

function importTools(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
        try {
            const imported = JSON.parse(event.target.result);

            // Validar estrutura
            if (!Array.isArray(imported)) {
                throw new Error('Formato inválido');
            }

            // Validar campos obrigatórios
            const isValid = imported.every(tool =>
                tool.name && tool.type && tool.category
            );

            if (!isValid) {
                throw new Error('Dados incompletos');
            }

            // Mesclar com ferramentas existentes (evitar duplicatas por ID)
            const existingIds = new Set(tools.map(t => t.id));
            const newTools = imported.filter(t => !existingIds.has(t.id));

            if (newTools.length === 0) {
                showToast('ℹ️ Todas as ferramentas já existem', 'error');
                return;
            }

            tools = [...newTools, ...tools];
            saveToStorage();
            renderTools();
            updateStats();
            showToast(`📥 ${newTools.length} ferramenta(s) importada(s) com sucesso!`);
        } catch (err) {
            console.error('Erro ao importar:', err);
            showToast('❌ Erro ao importar arquivo JSON', 'error');
        }
    };

    reader.onerror = () => {
        showToast('❌ Erro ao ler arquivo', 'error');
    };

    reader.readAsText(file);

    // Limpar input para permitir reimportar o mesmo arquivo
    e.target.value = '';
}

// ==================== FUNÇÕES AUXILIARES ====================
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDateForFilename() {
    const date = new Date();
    return date.toISOString().split('T')[0];
}

function showToast(message, type = 'success') {
    elements.toast.textContent = message;
    elements.toast.className = `toast ${type}`;
    elements.toast.classList.add('show');

    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

// ==================== EXPOR FUNÇÕES GLOBAIS ====================
// Necessário para os event handlers inline no HTML
window.openEditModal = openEditModal;
window.deleteTool = deleteTool;
