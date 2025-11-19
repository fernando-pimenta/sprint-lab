// ==================== VARIÁVEIS GLOBAIS ====================
const STORAGE_KEY = 'fp_snippet_keeper';
let snippets = [];
let editingId = null;

// ==================== ELEMENTOS DO DOM ====================
const elements = {
    // Botões principais
    btnNewSnippet: document.getElementById('btnNewSnippet'),
    btnExport: document.getElementById('btnExport'),
    btnImport: document.getElementById('btnImport'),
    fileInput: document.getElementById('fileInput'),
    btnClearFilters: document.getElementById('btnClearFilters'),

    // Filtros
    filterLanguage: document.getElementById('filterLanguage'),
    filterCategory: document.getElementById('filterCategory'),
    searchTitle: document.getElementById('searchTitle'),
    searchCode: document.getElementById('searchCode'),

    // Lista de snippets
    snippetsList: document.getElementById('snippetsList'),
    emptyState: document.getElementById('emptyState'),
    countBadge: document.getElementById('countBadge'),

    // Modal Form (Novo/Editar)
    modalForm: document.getElementById('modalForm'),
    modalTitle: document.getElementById('modalTitle'),
    closeModalForm: document.getElementById('closeModalForm'),
    btnCancelForm: document.getElementById('btnCancelForm'),
    snippetForm: document.getElementById('snippetForm'),

    // Campos do formulário
    snippetId: document.getElementById('snippetId'),
    inputTitle: document.getElementById('inputTitle'),
    inputLanguage: document.getElementById('inputLanguage'),
    inputCategory: document.getElementById('inputCategory'),
    inputCode: document.getElementById('inputCode'),
    inputNotes: document.getElementById('inputNotes'),

    // Modal View (Visualizar)
    modalView: document.getElementById('modalView'),
    closeModalView: document.getElementById('closeModalView'),
    viewTitle: document.getElementById('viewTitle'),
    viewLanguage: document.getElementById('viewLanguage'),
    viewCategory: document.getElementById('viewCategory'),
    viewCode: document.getElementById('viewCode'),
    viewNotes: document.getElementById('viewNotes'),
    viewNotesSection: document.getElementById('viewNotesSection'),
    viewDates: document.getElementById('viewDates'),
    btnCopyCode: document.getElementById('btnCopyCode')
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    loadSnippets();
    setupEventListeners();
    renderSnippets();
}

// ==================== CARREGAR SNIPPETS DO LOCALSTORAGE ====================
function loadSnippets() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            snippets = JSON.parse(stored);
        }
    } catch (error) {
        console.error('Erro ao carregar snippets:', error);
        snippets = [];
    }
}

// ==================== SALVAR SNIPPETS NO LOCALSTORAGE ====================
function saveSnippets() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
    } catch (error) {
        console.error('Erro ao salvar snippets:', error);
        alert('Erro ao salvar os dados. Verifique o espaço disponível.');
    }
}

// ==================== CONFIGURAR EVENT LISTENERS ====================
function setupEventListeners() {
    // Botões principais
    elements.btnNewSnippet.addEventListener('click', newSnippet);
    elements.btnExport.addEventListener('click', exportJSON);
    elements.btnImport.addEventListener('click', () => elements.fileInput.click());
    elements.fileInput.addEventListener('change', importJSON);
    elements.btnClearFilters.addEventListener('click', clearFilters);

    // Filtros e busca
    elements.filterLanguage.addEventListener('change', applyFilters);
    elements.filterCategory.addEventListener('change', applyFilters);
    elements.searchTitle.addEventListener('input', applyFilters);
    elements.searchCode.addEventListener('input', applyFilters);

    // Modal Form
    elements.closeModalForm.addEventListener('click', closeFormModal);
    elements.btnCancelForm.addEventListener('click', closeFormModal);
    elements.modalForm.addEventListener('click', (e) => {
        if (e.target === elements.modalForm) closeFormModal();
    });

    // Modal View
    elements.closeModalView.addEventListener('click', closeViewModal);
    elements.modalView.addEventListener('click', (e) => {
        if (e.target === elements.modalView) closeViewModal();
    });
    elements.btnCopyCode.addEventListener('click', copySnippet);

    // Formulário
    elements.snippetForm.addEventListener('submit', handleFormSubmit);

    // Fechar modals com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (elements.modalForm.classList.contains('show')) closeFormModal();
            if (elements.modalView.classList.contains('show')) closeViewModal();
        }
    });
}

// ==================== RENDERIZAR SNIPPETS ====================
function renderSnippets() {
    // Aplicar filtros para obter lista filtrada
    const filteredSnippets = getFilteredSnippets();

    // Atualizar contador
    updateCounter(filteredSnippets.length);

    // Limpar lista
    elements.snippetsList.innerHTML = '';

    // Verificar se há snippets
    if (filteredSnippets.length === 0) {
        elements.emptyState.style.display = 'block';
        return;
    }

    elements.emptyState.style.display = 'none';

    // Renderizar cada item
    filteredSnippets.forEach(snippet => {
        const item = createSnippetItem(snippet);
        elements.snippetsList.appendChild(item);
    });
}

// ==================== CRIAR ELEMENTO DE SNIPPET ====================
function createSnippetItem(snippet) {
    const item = document.createElement('div');
    item.className = 'snippet-item';

    // Classe CSS para tag de linguagem
    const langClass = 'lang-' + snippet.language.toLowerCase().replace(/\s+/g, '-');

    // Formatação da data
    const createdDate = new Date(snippet.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const editedDate = snippet.editedAt
        ? new Date(snippet.editedAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        : 'Nunca editado';

    item.innerHTML = `
        <div class="snippet-item-header">
            <div>
                <h3 class="snippet-item-title">${escapeHtml(snippet.title)}</h3>
            </div>
            <div class="snippet-item-actions">
                <button class="btn btn-view" onclick="viewSnippet('${snippet.id}')">👁️ Ver</button>
                <button class="btn btn-edit" onclick="editSnippet('${snippet.id}')">✏️ Editar</button>
                <button class="btn btn-delete" onclick="deleteSnippet('${snippet.id}')">🗑️ Excluir</button>
            </div>
        </div>

        <div class="snippet-item-info">
            <span class="lang-tag ${langClass}">${escapeHtml(snippet.language)}</span>
            <span class="snippet-item-category">📁 ${escapeHtml(snippet.category)}</span>
        </div>

        <div class="snippet-item-dates">
            📅 Criado: ${createdDate} | ✏️ Editado: ${editedDate}
        </div>
    `;

    return item;
}

// ==================== OBTER SNIPPETS FILTRADOS ====================
function getFilteredSnippets() {
    let filtered = [...snippets];

    // Filtro por linguagem
    const languageFilter = elements.filterLanguage.value;
    if (languageFilter) {
        filtered = filtered.filter(s => s.language === languageFilter);
    }

    // Filtro por categoria
    const categoryFilter = elements.filterCategory.value;
    if (categoryFilter) {
        filtered = filtered.filter(s => s.category === categoryFilter);
    }

    // Busca por título
    const titleQuery = elements.searchTitle.value.toLowerCase().trim();
    if (titleQuery) {
        filtered = filtered.filter(s =>
            s.title.toLowerCase().includes(titleQuery)
        );
    }

    // Busca no código
    const codeQuery = elements.searchCode.value.toLowerCase().trim();
    if (codeQuery) {
        filtered = filtered.filter(s =>
            s.code.toLowerCase().includes(codeQuery)
        );
    }

    return filtered;
}

// ==================== APLICAR FILTROS ====================
function applyFilters() {
    renderSnippets();
}

// ==================== LIMPAR FILTROS ====================
function clearFilters() {
    elements.filterLanguage.value = '';
    elements.filterCategory.value = '';
    elements.searchTitle.value = '';
    elements.searchCode.value = '';
    applyFilters();
}

// ==================== ATUALIZAR CONTADOR ====================
function updateCounter(count) {
    const total = snippets.length;
    if (count === total) {
        elements.countBadge.textContent = `${total} snippet${total !== 1 ? 's' : ''}`;
    } else {
        elements.countBadge.textContent = `${count} de ${total} snippet${total !== 1 ? 's' : ''}`;
    }
}

// ==================== NOVO SNIPPET ====================
function newSnippet() {
    editingId = null;
    elements.modalTitle.textContent = '➕ Novo Snippet';
    elements.snippetForm.reset();
    elements.snippetId.value = '';
    elements.modalForm.classList.add('show');
    elements.inputTitle.focus();
}

// ==================== FECHAR MODAL FORM ====================
function closeFormModal() {
    elements.modalForm.classList.remove('show');
    elements.snippetForm.reset();
    editingId = null;
}

// ==================== FECHAR MODAL VIEW ====================
function closeViewModal() {
    elements.modalView.classList.remove('show');
}

// ==================== MANIPULAR SUBMIT DO FORMULÁRIO ====================
function handleFormSubmit(e) {
    e.preventDefault();

    // Obter timestamps
    const now = new Date().toISOString();

    // Coletar dados do formulário
    const snippetData = {
        id: editingId || generateId(),
        title: elements.inputTitle.value.trim(),
        language: elements.inputLanguage.value,
        category: elements.inputCategory.value,
        code: elements.inputCode.value.trim(),
        notes: elements.inputNotes.value.trim(),
        createdAt: editingId ? getSnippetById(editingId).createdAt : now,
        editedAt: editingId ? now : null
    };

    if (editingId) {
        // Editar existente
        const index = snippets.findIndex(s => s.id === editingId);
        if (index !== -1) {
            snippets[index] = snippetData;
        }
    } else {
        // Adicionar novo
        snippets.push(snippetData);
    }

    // Salvar e atualizar
    saveSnippets();
    renderSnippets();
    closeFormModal();

    // Feedback
    showToast(editingId ? 'Snippet atualizado com sucesso!' : 'Snippet adicionado com sucesso!');
}

// ==================== VISUALIZAR SNIPPET ====================
function viewSnippet(id) {
    const snippet = getSnippetById(id);
    if (!snippet) {
        alert('Snippet não encontrado!');
        return;
    }

    // Classe CSS para tag de linguagem
    const langClass = 'lang-' + snippet.language.toLowerCase().replace(/\s+/g, '-');

    // Preencher modal de visualização
    elements.viewTitle.textContent = snippet.title;
    elements.viewLanguage.textContent = snippet.language;
    elements.viewLanguage.className = `lang-tag ${langClass}`;
    elements.viewCategory.textContent = snippet.category;
    elements.viewCode.textContent = snippet.code;

    // Notas (mostrar apenas se houver)
    if (snippet.notes) {
        elements.viewNotes.textContent = snippet.notes;
        elements.viewNotesSection.style.display = 'block';
    } else {
        elements.viewNotesSection.style.display = 'none';
    }

    // Datas
    const createdDate = new Date(snippet.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const editedDate = snippet.editedAt
        ? new Date(snippet.editedAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        : 'Nunca editado';

    elements.viewDates.textContent = `📅 Criado: ${createdDate} | ✏️ Última edição: ${editedDate}`;

    // Abrir modal
    elements.modalView.classList.add('show');
}

// ==================== COPIAR SNIPPET ====================
function copySnippet() {
    const code = elements.viewCode.textContent;

    // Tentar copiar para clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code)
            .then(() => {
                showToast('Código copiado para o clipboard!');
                // Feedback visual no botão
                const originalText = elements.btnCopyCode.textContent;
                elements.btnCopyCode.textContent = '✅ Copiado!';
                setTimeout(() => {
                    elements.btnCopyCode.textContent = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Erro ao copiar:', err);
                fallbackCopySnippet(code);
            });
    } else {
        // Fallback para navegadores antigos
        fallbackCopySnippet(code);
    }
}

// Fallback para copiar código (navegadores antigos)
function fallbackCopySnippet(code) {
    const textarea = document.createElement('textarea');
    textarea.value = code;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        showToast('Código copiado para o clipboard!');
        const originalText = elements.btnCopyCode.textContent;
        elements.btnCopyCode.textContent = '✅ Copiado!';
        setTimeout(() => {
            elements.btnCopyCode.textContent = originalText;
        }, 2000);
    } catch (err) {
        console.error('Erro ao copiar:', err);
        alert('Não foi possível copiar o código automaticamente. Use Ctrl+C manualmente.');
    }

    document.body.removeChild(textarea);
}

// ==================== EDITAR SNIPPET ====================
function editSnippet(id) {
    const snippet = getSnippetById(id);
    if (!snippet) {
        alert('Snippet não encontrado!');
        return;
    }

    editingId = id;
    elements.modalTitle.textContent = '✏️ Editar Snippet';

    // Preencher formulário
    elements.snippetId.value = snippet.id;
    elements.inputTitle.value = snippet.title;
    elements.inputLanguage.value = snippet.language;
    elements.inputCategory.value = snippet.category;
    elements.inputCode.value = snippet.code;
    elements.inputNotes.value = snippet.notes;

    // Abrir modal
    elements.modalForm.classList.add('show');
    elements.inputTitle.focus();
}

// ==================== EXCLUIR SNIPPET ====================
function deleteSnippet(id) {
    const snippet = getSnippetById(id);
    if (!snippet) {
        alert('Snippet não encontrado!');
        return;
    }

    const confirmDelete = confirm(`Tem certeza que deseja excluir o snippet:\n\n"${snippet.title}"?\n\nEsta ação não pode ser desfeita.`);

    if (confirmDelete) {
        snippets = snippets.filter(s => s.id !== id);
        saveSnippets();
        renderSnippets();
        showToast('Snippet excluído com sucesso!');
    }
}

// ==================== EXPORTAR JSON ====================
function exportJSON() {
    if (snippets.length === 0) {
        alert('Não há snippets para exportar!');
        return;
    }

    try {
        const dataStr = JSON.stringify(snippets, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `fp-snippets-${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showToast('Biblioteca exportada com sucesso!');
    } catch (error) {
        console.error('Erro ao exportar:', error);
        alert('Erro ao exportar a biblioteca.');
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
                item.id && item.title && item.language && item.category && item.code
            );

            if (!isValid) {
                throw new Error('Arquivo contém dados inválidos');
            }

            // Perguntar ao usuário se quer substituir
            const shouldReplace = confirm(
                `Foram encontrados ${importedData.length} snippet(s) no arquivo.\n\n` +
                `Você possui ${snippets.length} snippet(s) atualmente.\n\n` +
                `Clique em OK para SUBSTITUIR tudo\n` +
                `Clique em Cancelar para manter seus dados atuais`
            );

            if (shouldReplace) {
                // Substituir tudo
                snippets = importedData;
                saveSnippets();
                renderSnippets();
                clearFilters();
                showToast(`${snippets.length} snippet(s) importado(s)!`);
            }

        } catch (error) {
            console.error('Erro ao importar:', error);
            alert('Erro ao importar arquivo. Verifique se é um JSON válido exportado pelo FP Snippet Keeper.');
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

function getSnippetById(id) {
    return snippets.find(s => s.id === id);
}

function generateId() {
    return 'snippet_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
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
window.viewSnippet = viewSnippet;
window.editSnippet = editSnippet;
window.deleteSnippet = deleteSnippet;
