// ==================== VARIÁVEIS GLOBAIS ====================
const STORAGE_KEY = 'fp_content_planner';
let contents = [];
let editingId = null;

// ==================== ELEMENTOS DO DOM ====================
const elements = {
    // Botões principais
    btnNewContent: document.getElementById('btnNewContent'),
    btnExport: document.getElementById('btnExport'),
    btnImport: document.getElementById('btnImport'),
    fileInput: document.getElementById('fileInput'),
    btnClearFilters: document.getElementById('btnClearFilters'),

    // Filtros
    filterPlatform: document.getElementById('filterPlatform'),
    filterType: document.getElementById('filterType'),
    filterStatus: document.getElementById('filterStatus'),
    searchInput: document.getElementById('searchInput'),

    // Lista de conteúdos
    contentList: document.getElementById('contentList'),
    emptyState: document.getElementById('emptyState'),
    countBadge: document.getElementById('countBadge'),

    // Modal e formulário
    modalForm: document.getElementById('modalForm'),
    modalTitle: document.getElementById('modalTitle'),
    closeModal: document.getElementById('closeModal'),
    btnCancel: document.getElementById('btnCancel'),
    contentForm: document.getElementById('contentForm'),

    // Campos do formulário
    contentId: document.getElementById('contentId'),
    inputTitle: document.getElementById('inputTitle'),
    inputType: document.getElementById('inputType'),
    inputStatus: document.getElementById('inputStatus'),
    inputPlatform: document.getElementById('inputPlatform'),
    inputDate: document.getElementById('inputDate'),
    inputLink: document.getElementById('inputLink'),
    inputHashtags: document.getElementById('inputHashtags'),
    inputDescription: document.getElementById('inputDescription')
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    loadContent();
    setupEventListeners();
    renderList();
}

// ==================== CARREGAR CONTEÚDO DO LOCALSTORAGE ====================
function loadContent() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            contents = JSON.parse(stored);
        }
    } catch (error) {
        console.error('Erro ao carregar conteúdo:', error);
        contents = [];
    }
}

// ==================== SALVAR CONTEÚDO NO LOCALSTORAGE ====================
function saveContent() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(contents));
    } catch (error) {
        console.error('Erro ao salvar conteúdo:', error);
        alert('Erro ao salvar os dados. Verifique o espaço disponível.');
    }
}

// ==================== CONFIGURAR EVENT LISTENERS ====================
function setupEventListeners() {
    // Botões principais
    elements.btnNewContent.addEventListener('click', openModalForNew);
    elements.btnExport.addEventListener('click', exportJSON);
    elements.btnImport.addEventListener('click', () => elements.fileInput.click());
    elements.fileInput.addEventListener('change', importJSON);
    elements.btnClearFilters.addEventListener('click', clearFilters);

    // Filtros e busca
    elements.filterPlatform.addEventListener('change', applyFilters);
    elements.filterType.addEventListener('change', applyFilters);
    elements.filterStatus.addEventListener('change', applyFilters);
    elements.searchInput.addEventListener('input', applyFilters);

    // Modal
    elements.closeModal.addEventListener('click', closeModal);
    elements.btnCancel.addEventListener('click', closeModal);
    elements.modalForm.addEventListener('click', (e) => {
        if (e.target === elements.modalForm) closeModal();
    });

    // Formulário
    elements.contentForm.addEventListener('submit', handleFormSubmit);

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.modalForm.classList.contains('show')) {
            closeModal();
        }
    });
}

// ==================== RENDERIZAR LISTA DE CONTEÚDOS ====================
function renderList() {
    // Aplicar filtros para obter lista filtrada
    const filteredContents = getFilteredContents();

    // Atualizar contador
    updateCounter(filteredContents.length);

    // Limpar lista
    elements.contentList.innerHTML = '';

    // Verificar se há conteúdos
    if (filteredContents.length === 0) {
        elements.emptyState.style.display = 'block';
        return;
    }

    elements.emptyState.style.display = 'none';

    // Renderizar cada item
    filteredContents.forEach(content => {
        const item = createContentItem(content);
        elements.contentList.appendChild(item);
    });
}

// ==================== CRIAR ELEMENTO DE CONTEÚDO ====================
function createContentItem(content) {
    const item = document.createElement('div');
    item.className = 'content-item';

    // Status CSS class
    const statusClass = content.status.toLowerCase()
        .replace(/\s+/g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    // Formatação da data
    const dateFormatted = content.date
        ? new Date(content.date + 'T00:00:00').toLocaleDateString('pt-BR')
        : 'Não definida';

    item.innerHTML = `
        <div class="content-item-header">
            <div>
                <h3 class="content-item-title">${escapeHtml(content.title)}</h3>
            </div>
            <div class="content-item-actions">
                <button class="btn btn-edit" onclick="editContent('${content.id}')">✏️ Editar</button>
                <button class="btn btn-delete" onclick="deleteContent('${content.id}')">🗑️ Excluir</button>
            </div>
        </div>

        <div class="content-item-info">
            <div class="info-item">
                <span class="info-label">Plataforma:</span>
                <span class="info-value">${escapeHtml(content.platform)}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Tipo:</span>
                <span class="info-value">${escapeHtml(content.type)}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Status:</span>
                <span class="status-badge status-${statusClass}">${escapeHtml(content.status)}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Data:</span>
                <span class="info-value">${dateFormatted}</span>
            </div>
        </div>

        ${content.hashtags ? `<div class="content-item-hashtags">${escapeHtml(content.hashtags)}</div>` : ''}

        ${content.link ? `<div class="content-item-link">🔗 <a href="${escapeHtml(content.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(content.link)}</a></div>` : ''}

        ${content.description ? `<div class="content-item-description">${escapeHtml(content.description)}</div>` : ''}
    `;

    return item;
}

// ==================== OBTER CONTEÚDOS FILTRADOS ====================
function getFilteredContents() {
    let filtered = [...contents];

    // Filtro por plataforma
    const platformFilter = elements.filterPlatform.value;
    if (platformFilter) {
        filtered = filtered.filter(c => c.platform === platformFilter);
    }

    // Filtro por tipo
    const typeFilter = elements.filterType.value;
    if (typeFilter) {
        filtered = filtered.filter(c => c.type === typeFilter);
    }

    // Filtro por status
    const statusFilter = elements.filterStatus.value;
    if (statusFilter) {
        filtered = filtered.filter(c => c.status === statusFilter);
    }

    // Busca por título
    const searchQuery = elements.searchInput.value.toLowerCase().trim();
    if (searchQuery) {
        filtered = filtered.filter(c =>
            c.title.toLowerCase().includes(searchQuery)
        );
    }

    return filtered;
}

// ==================== APLICAR FILTROS ====================
function applyFilters() {
    renderList();
}

// ==================== LIMPAR FILTROS ====================
function clearFilters() {
    elements.filterPlatform.value = '';
    elements.filterType.value = '';
    elements.filterStatus.value = '';
    elements.searchInput.value = '';
    applyFilters();
}

// ==================== ATUALIZAR CONTADOR ====================
function updateCounter(count) {
    const total = contents.length;
    if (count === total) {
        elements.countBadge.textContent = `${total} conteúdo${total !== 1 ? 's' : ''}`;
    } else {
        elements.countBadge.textContent = `${count} de ${total} conteúdo${total !== 1 ? 's' : ''}`;
    }
}

// ==================== ABRIR MODAL PARA NOVO CONTEÚDO ====================
function openModalForNew() {
    editingId = null;
    elements.modalTitle.textContent = '➕ Novo Conteúdo';
    elements.contentForm.reset();
    elements.contentId.value = '';
    elements.modalForm.classList.add('show');
    elements.inputTitle.focus();
}

// ==================== FECHAR MODAL ====================
function closeModal() {
    elements.modalForm.classList.remove('show');
    elements.contentForm.reset();
    editingId = null;
}

// ==================== MANIPULAR SUBMIT DO FORMULÁRIO ====================
function handleFormSubmit(e) {
    e.preventDefault();

    // Coletar dados do formulário
    const contentData = {
        id: editingId || generateId(),
        title: elements.inputTitle.value.trim(),
        type: elements.inputType.value,
        status: elements.inputStatus.value,
        platform: elements.inputPlatform.value,
        date: elements.inputDate.value || '',
        link: elements.inputLink.value.trim(),
        hashtags: elements.inputHashtags.value.trim(),
        description: elements.inputDescription.value.trim(),
        createdAt: editingId ? getContentById(editingId).createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    if (editingId) {
        // Editar existente
        const index = contents.findIndex(c => c.id === editingId);
        if (index !== -1) {
            contents[index] = contentData;
        }
    } else {
        // Adicionar novo
        contents.push(contentData);
    }

    // Salvar e atualizar
    saveContent();
    renderList();
    closeModal();

    // Feedback
    showToast(editingId ? 'Conteúdo atualizado com sucesso!' : 'Conteúdo adicionado com sucesso!');
}

// ==================== EDITAR CONTEÚDO ====================
function editContent(id) {
    const content = getContentById(id);
    if (!content) {
        alert('Conteúdo não encontrado!');
        return;
    }

    editingId = id;
    elements.modalTitle.textContent = '✏️ Editar Conteúdo';

    // Preencher formulário
    elements.contentId.value = content.id;
    elements.inputTitle.value = content.title;
    elements.inputType.value = content.type;
    elements.inputStatus.value = content.status;
    elements.inputPlatform.value = content.platform;
    elements.inputDate.value = content.date;
    elements.inputLink.value = content.link;
    elements.inputHashtags.value = content.hashtags;
    elements.inputDescription.value = content.description;

    // Abrir modal
    elements.modalForm.classList.add('show');
    elements.inputTitle.focus();
}

// ==================== EXCLUIR CONTEÚDO ====================
function deleteContent(id) {
    const content = getContentById(id);
    if (!content) {
        alert('Conteúdo não encontrado!');
        return;
    }

    const confirmDelete = confirm(`Tem certeza que deseja excluir o conteúdo:\n\n"${content.title}"?\n\nEsta ação não pode ser desfeita.`);

    if (confirmDelete) {
        contents = contents.filter(c => c.id !== id);
        saveContent();
        renderList();
        showToast('Conteúdo excluído com sucesso!');
    }
}

// ==================== EXPORTAR JSON ====================
function exportJSON() {
    if (contents.length === 0) {
        alert('Não há conteúdos para exportar!');
        return;
    }

    try {
        const dataStr = JSON.stringify(contents, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `fp-content-planner-${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showToast('Planejamento exportado com sucesso!');
    } catch (error) {
        console.error('Erro ao exportar:', error);
        alert('Erro ao exportar o planejamento.');
    }
}

// ==================== IMPORTAR JSON ====================
function importJSON(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(event) {
        try {
            const importedData = JSON.parse(event.target.result);

            if (!Array.isArray(importedData)) {
                throw new Error('Formato de arquivo inválido');
            }

            // Validar estrutura básica
            const isValid = importedData.every(item =>
                item.id && item.title && item.type && item.status && item.platform
            );

            if (!isValid) {
                throw new Error('Arquivo contém dados inválidos');
            }

            // Perguntar ao usuário se quer mesclar ou substituir
            const shouldMerge = confirm(
                `Foram encontrados ${importedData.length} conteúdo(s) no arquivo.\n\n` +
                `Você possui ${contents.length} conteúdo(s) atualmente.\n\n` +
                `Clique em OK para MESCLAR (adicionar novos mantendo existentes)\n` +
                `Clique em Cancelar para SUBSTITUIR tudo`
            );

            if (shouldMerge) {
                // Mesclar - adicionar apenas IDs que não existem
                const existingIds = new Set(contents.map(c => c.id));
                const newContents = importedData.filter(c => !existingIds.has(c.id));
                contents = [...contents, ...newContents];
                showToast(`${newContents.length} novo(s) conteúdo(s) importado(s)!`);
            } else {
                // Substituir tudo
                contents = importedData;
                showToast(`${contents.length} conteúdo(s) importado(s)!`);
            }

            saveContent();
            renderList();
            clearFilters();

        } catch (error) {
            console.error('Erro ao importar:', error);
            alert('Erro ao importar arquivo. Verifique se é um JSON válido exportado pelo FP Content Planner.');
        }
    };

    reader.onerror = function() {
        alert('Erro ao ler o arquivo.');
    };

    reader.readAsText(file);

    // Limpar input para permitir reimportação do mesmo arquivo
    e.target.value = '';
}

// ==================== FUNÇÕES AUXILIARES ====================

function getContentById(id) {
    return contents.find(c => c.id === id);
}

function generateId() {
    return 'content_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message) {
    // Toast simples usando alert
    // Em uma versão futura, pode-se implementar um sistema de toast mais sofisticado
    console.log('✅', message);

    // Feedback visual alternativo
    const originalTitle = document.title;
    document.title = `✅ ${message}`;
    setTimeout(() => {
        document.title = originalTitle;
    }, 2000);
}

// ==================== EXPOR FUNÇÕES GLOBALMENTE ====================
// Necessário para os event handlers inline no HTML
window.editContent = editContent;
window.deleteContent = deleteContent;
