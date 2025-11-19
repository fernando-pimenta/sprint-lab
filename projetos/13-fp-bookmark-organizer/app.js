// ==================== VARIÁVEIS GLOBAIS ====================
const STORAGE_KEY = 'fp_bookmarks';
let bookmarks = [];
let editingId = null;

// ==================== ELEMENTOS DO DOM ====================
const elements = {
    // Botões principais
    btnNewBookmark: document.getElementById('btnNewBookmark'),
    btnExport: document.getElementById('btnExport'),
    btnImport: document.getElementById('btnImport'),
    fileInput: document.getElementById('fileInput'),
    btnClearFilters: document.getElementById('btnClearFilters'),

    // Filtros
    filterCategory: document.getElementById('filterCategory'),
    filterPriority: document.getElementById('filterPriority'),
    searchTitle: document.getElementById('searchTitle'),
    searchTag: document.getElementById('searchTag'),

    // Lista de bookmarks
    bookmarksList: document.getElementById('bookmarksList'),
    emptyState: document.getElementById('emptyState'),
    countBadge: document.getElementById('countBadge'),

    // Modal e formulário
    modalForm: document.getElementById('modalForm'),
    modalTitle: document.getElementById('modalTitle'),
    closeModal: document.getElementById('closeModal'),
    btnCancel: document.getElementById('btnCancel'),
    bookmarkForm: document.getElementById('bookmarkForm'),

    // Campos do formulário
    bookmarkId: document.getElementById('bookmarkId'),
    inputTitle: document.getElementById('inputTitle'),
    inputUrl: document.getElementById('inputUrl'),
    inputCategory: document.getElementById('inputCategory'),
    inputPriority: document.getElementById('inputPriority'),
    inputTags: document.getElementById('inputTags'),
    inputDescription: document.getElementById('inputDescription')
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    loadBookmarks();
    setupEventListeners();
    renderBookmarks();
}

// ==================== CARREGAR BOOKMARKS DO LOCALSTORAGE ====================
function loadBookmarks() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            bookmarks = JSON.parse(stored);
        }
    } catch (error) {
        console.error('Erro ao carregar bookmarks:', error);
        bookmarks = [];
    }
}

// ==================== SALVAR BOOKMARKS NO LOCALSTORAGE ====================
function saveBookmarks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (error) {
        console.error('Erro ao salvar bookmarks:', error);
        alert('Erro ao salvar os dados. Verifique o espaço disponível.');
    }
}

// ==================== CONFIGURAR EVENT LISTENERS ====================
function setupEventListeners() {
    // Botões principais
    elements.btnNewBookmark.addEventListener('click', openModalForNew);
    elements.btnExport.addEventListener('click', exportJSON);
    elements.btnImport.addEventListener('click', () => elements.fileInput.click());
    elements.fileInput.addEventListener('change', importJSON);
    elements.btnClearFilters.addEventListener('click', clearFilters);

    // Filtros e busca
    elements.filterCategory.addEventListener('change', applyFilters);
    elements.filterPriority.addEventListener('change', applyFilters);
    elements.searchTitle.addEventListener('input', applyFilters);
    elements.searchTag.addEventListener('input', applyFilters);

    // Modal
    elements.closeModal.addEventListener('click', closeModal);
    elements.btnCancel.addEventListener('click', closeModal);
    elements.modalForm.addEventListener('click', (e) => {
        if (e.target === elements.modalForm) closeModal();
    });

    // Formulário
    elements.bookmarkForm.addEventListener('submit', handleFormSubmit);

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.modalForm.classList.contains('show')) {
            closeModal();
        }
    });
}

// ==================== RENDERIZAR BOOKMARKS ====================
function renderBookmarks() {
    // Aplicar filtros para obter lista filtrada
    const filteredBookmarks = getFilteredBookmarks();

    // Atualizar contador
    updateCounter(filteredBookmarks.length);

    // Limpar lista
    elements.bookmarksList.innerHTML = '';

    // Verificar se há bookmarks
    if (filteredBookmarks.length === 0) {
        elements.emptyState.style.display = 'block';
        return;
    }

    elements.emptyState.style.display = 'none';

    // Renderizar cada item
    filteredBookmarks.forEach(bookmark => {
        const item = createBookmarkItem(bookmark);
        elements.bookmarksList.appendChild(item);
    });
}

// ==================== CRIAR ELEMENTO DE BOOKMARK ====================
function createBookmarkItem(bookmark) {
    const item = document.createElement('div');
    item.className = 'bookmark-item';

    // Prioridade CSS class
    const priorityClass = bookmark.priority.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    // Processar tags
    const tagsArray = bookmark.tags
        ? bookmark.tags.split(',').map(t => t.trim()).filter(t => t)
        : [];

    // Formatação das datas
    const createdDate = new Date(bookmark.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const lastAccessDate = bookmark.lastAccess
        ? new Date(bookmark.lastAccess).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        : 'Nunca acessado';

    item.innerHTML = `
        <div class="bookmark-item-header">
            <div class="bookmark-item-title-link">
                <a href="${escapeHtml(bookmark.url)}"
                   class="bookmark-item-title"
                   target="_blank"
                   rel="noopener noreferrer"
                   onclick="updateLastAccess('${bookmark.id}')">
                    ${escapeHtml(bookmark.title)}
                </a>
                <div class="bookmark-item-url">${escapeHtml(bookmark.url)}</div>
            </div>
            <div class="bookmark-item-actions">
                <button class="btn btn-edit" onclick="editBookmark('${bookmark.id}')">✏️ Editar</button>
                <button class="btn btn-delete" onclick="deleteBookmark('${bookmark.id}')">🗑️ Excluir</button>
            </div>
        </div>

        <div class="bookmark-item-info">
            <div class="info-item">
                <span class="info-label">Categoria:</span>
                <span class="info-value">${escapeHtml(bookmark.category)}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Prioridade:</span>
                <span class="priority-badge priority-${priorityClass}">${escapeHtml(bookmark.priority)}</span>
            </div>
        </div>

        ${tagsArray.length > 0 ? `
            <div class="bookmark-item-tags">
                ${tagsArray.map(tag => `<span class="tag-chip">#${escapeHtml(tag)}</span>`).join('')}
            </div>
        ` : ''}

        ${bookmark.description ? `<div class="bookmark-item-description">${escapeHtml(bookmark.description)}</div>` : ''}

        <div class="bookmark-item-dates">
            <span>📅 Criado: ${createdDate}</span>
            <span>🕒 Último acesso: ${lastAccessDate}</span>
        </div>
    `;

    return item;
}

// ==================== OBTER BOOKMARKS FILTRADOS ====================
function getFilteredBookmarks() {
    let filtered = [...bookmarks];

    // Filtro por categoria
    const categoryFilter = elements.filterCategory.value;
    if (categoryFilter) {
        filtered = filtered.filter(b => b.category === categoryFilter);
    }

    // Filtro por prioridade
    const priorityFilter = elements.filterPriority.value;
    if (priorityFilter) {
        filtered = filtered.filter(b => b.priority === priorityFilter);
    }

    // Busca por título
    const titleQuery = elements.searchTitle.value.toLowerCase().trim();
    if (titleQuery) {
        filtered = filtered.filter(b =>
            b.title.toLowerCase().includes(titleQuery)
        );
    }

    // Busca por tag
    const tagQuery = elements.searchTag.value.toLowerCase().trim();
    if (tagQuery) {
        filtered = filtered.filter(b => {
            if (!b.tags) return false;
            const tags = b.tags.toLowerCase();
            return tags.includes(tagQuery);
        });
    }

    return filtered;
}

// ==================== APLICAR FILTROS ====================
function applyFilters() {
    renderBookmarks();
}

// ==================== LIMPAR FILTROS ====================
function clearFilters() {
    elements.filterCategory.value = '';
    elements.filterPriority.value = '';
    elements.searchTitle.value = '';
    elements.searchTag.value = '';
    applyFilters();
}

// ==================== ATUALIZAR CONTADOR ====================
function updateCounter(count) {
    const total = bookmarks.length;
    if (count === total) {
        elements.countBadge.textContent = `${total} link${total !== 1 ? 's' : ''}`;
    } else {
        elements.countBadge.textContent = `${count} de ${total} link${total !== 1 ? 's' : ''}`;
    }
}

// ==================== ABRIR MODAL PARA NOVO BOOKMARK ====================
function openModalForNew() {
    editingId = null;
    elements.modalTitle.textContent = '➕ Novo Link';
    elements.bookmarkForm.reset();
    elements.bookmarkId.value = '';
    elements.modalForm.classList.add('show');
    elements.inputTitle.focus();
}

// ==================== FECHAR MODAL ====================
function closeModal() {
    elements.modalForm.classList.remove('show');
    elements.bookmarkForm.reset();
    editingId = null;
}

// ==================== MANIPULAR SUBMIT DO FORMULÁRIO ====================
function handleFormSubmit(e) {
    e.preventDefault();

    // Obter timestamp atual
    const now = new Date().toISOString();

    // Coletar dados do formulário
    const bookmarkData = {
        id: editingId || generateId(),
        title: elements.inputTitle.value.trim(),
        url: elements.inputUrl.value.trim(),
        category: elements.inputCategory.value,
        priority: elements.inputPriority.value,
        tags: elements.inputTags.value.trim(),
        description: elements.inputDescription.value.trim(),
        createdAt: editingId ? getBookmarkById(editingId).createdAt : now,
        lastAccess: editingId ? getBookmarkById(editingId).lastAccess : null
    };

    if (editingId) {
        // Editar existente
        const index = bookmarks.findIndex(b => b.id === editingId);
        if (index !== -1) {
            bookmarks[index] = bookmarkData;
        }
    } else {
        // Adicionar novo
        bookmarks.push(bookmarkData);
    }

    // Salvar e atualizar
    saveBookmarks();
    renderBookmarks();
    closeModal();

    // Feedback
    showToast(editingId ? 'Link atualizado com sucesso!' : 'Link adicionado com sucesso!');
}

// ==================== EDITAR BOOKMARK ====================
function editBookmark(id) {
    const bookmark = getBookmarkById(id);
    if (!bookmark) {
        alert('Link não encontrado!');
        return;
    }

    editingId = id;
    elements.modalTitle.textContent = '✏️ Editar Link';

    // Preencher formulário
    elements.bookmarkId.value = bookmark.id;
    elements.inputTitle.value = bookmark.title;
    elements.inputUrl.value = bookmark.url;
    elements.inputCategory.value = bookmark.category;
    elements.inputPriority.value = bookmark.priority;
    elements.inputTags.value = bookmark.tags;
    elements.inputDescription.value = bookmark.description;

    // Abrir modal
    elements.modalForm.classList.add('show');
    elements.inputTitle.focus();
}

// ==================== EXCLUIR BOOKMARK ====================
function deleteBookmark(id) {
    const bookmark = getBookmarkById(id);
    if (!bookmark) {
        alert('Link não encontrado!');
        return;
    }

    const confirmDelete = confirm(`Tem certeza que deseja excluir o link:\n\n"${bookmark.title}"?\n\nEsta ação não pode ser desfeita.`);

    if (confirmDelete) {
        bookmarks = bookmarks.filter(b => b.id !== id);
        saveBookmarks();
        renderBookmarks();
        showToast('Link excluído com sucesso!');
    }
}

// ==================== ATUALIZAR ÚLTIMO ACESSO ====================
function updateLastAccess(id) {
    const bookmark = getBookmarkById(id);
    if (bookmark) {
        bookmark.lastAccess = new Date().toISOString();
        saveBookmarks();
        // Não renderiza novamente para não interromper a navegação
        // O usuário verá a atualização quando voltar
    }
}

// ==================== EXPORTAR JSON ====================
function exportJSON() {
    if (bookmarks.length === 0) {
        alert('Não há links para exportar!');
        return;
    }

    try {
        const dataStr = JSON.stringify(bookmarks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `fp-bookmarks-${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showToast('Links exportados com sucesso!');
    } catch (error) {
        console.error('Erro ao exportar:', error);
        alert('Erro ao exportar os links.');
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
                item.id && item.title && item.url && item.category && item.priority
            );

            if (!isValid) {
                throw new Error('Arquivo contém dados inválidos');
            }

            // Perguntar ao usuário se quer mesclar ou substituir
            const shouldMerge = confirm(
                `Foram encontrados ${importedData.length} link(s) no arquivo.\n\n` +
                `Você possui ${bookmarks.length} link(s) atualmente.\n\n` +
                `Clique em OK para MESCLAR (adicionar novos mantendo existentes)\n` +
                `Clique em Cancelar para SUBSTITUIR tudo`
            );

            if (shouldMerge) {
                // Mesclar - adicionar apenas IDs que não existem
                const existingIds = new Set(bookmarks.map(b => b.id));
                const newBookmarks = importedData.filter(b => !existingIds.has(b.id));
                bookmarks = [...bookmarks, ...newBookmarks];
                showToast(`${newBookmarks.length} novo(s) link(s) importado(s)!`);
            } else {
                // Substituir tudo
                bookmarks = importedData;
                showToast(`${bookmarks.length} link(s) importado(s)!`);
            }

            saveBookmarks();
            renderBookmarks();
            clearFilters();

        } catch (error) {
            console.error('Erro ao importar:', error);
            alert('Erro ao importar arquivo. Verifique se é um JSON válido exportado pelo FP Bookmark Organizer.');
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

function getBookmarkById(id) {
    return bookmarks.find(b => b.id === id);
}

function generateId() {
    return 'bookmark_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message) {
    // Toast simples usando console e título
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
window.editBookmark = editBookmark;
window.deleteBookmark = deleteBookmark;
window.updateLastAccess = updateLastAccess;
