// ==================== VARIÁVEIS GLOBAIS ====================
const STORAGE_KEY = 'fp_affiliate_link_manager';
let links = [];
let editingId = null;
let currentSort = { field: null, order: 'asc' };

// ==================== ELEMENTOS DO DOM ====================
const elements = {
    // Estatísticas
    statTotalLinks: document.getElementById('statTotalLinks'),
    statActiveLinks: document.getElementById('statActiveLinks'),
    statTotalClicks: document.getElementById('statTotalClicks'),
    statTotalConversions: document.getElementById('statTotalConversions'),
    statTotalRevenue: document.getElementById('statTotalRevenue'),

    // Filtros
    filterProgram: document.getElementById('filterProgram'),
    filterStatus: document.getElementById('filterStatus'),
    searchQuery: document.getElementById('searchQuery'),
    btnClearFilters: document.getElementById('btnClearFilters'),

    // Ações
    btnAddLink: document.getElementById('btnAddLink'),
    btnExport: document.getElementById('btnExport'),
    btnImport: document.getElementById('btnImport'),
    fileInput: document.getElementById('fileInput'),

    // Tabela e Cards
    linksTableWrapper: document.getElementById('linksTableWrapper'),
    linksTableBody: document.getElementById('linksTableBody'),
    linksCards: document.getElementById('linksCards'),
    emptyState: document.getElementById('emptyState'),

    // Modal
    modalForm: document.getElementById('modalForm'),
    modalTitle: document.getElementById('modalTitle'),
    closeModalForm: document.getElementById('closeModalForm'),
    btnCancelForm: document.getElementById('btnCancelForm'),
    linkForm: document.getElementById('linkForm'),

    // Campos do formulário
    linkId: document.getElementById('linkId'),
    inputProgram: document.getElementById('inputProgram'),
    inputStatus: document.getElementById('inputStatus'),
    inputProductName: document.getElementById('inputProductName'),
    inputOriginalUrl: document.getElementById('inputOriginalUrl'),
    inputShortUrl: document.getElementById('inputShortUrl'),
    inputUsedIn: document.getElementById('inputUsedIn'),
    inputClicks: document.getElementById('inputClicks'),
    inputConversions: document.getElementById('inputConversions'),
    inputCommission: document.getElementById('inputCommission'),
    inputNotes: document.getElementById('inputNotes')
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    loadLinks();
    setupEventListeners();
    renderLinks();
    updateStatistics();
}

// ==================== CARREGAR LINKS DO LOCALSTORAGE ====================
function loadLinks() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            links = JSON.parse(stored);
        }
    } catch (error) {
        console.error('Erro ao carregar links:', error);
        links = [];
    }
}

// ==================== SALVAR LINKS NO LOCALSTORAGE ====================
function saveLinks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    } catch (error) {
        console.error('Erro ao salvar links:', error);
        alert('Erro ao salvar os dados. Verifique o espaço disponível.');
    }
}

// ==================== CONFIGURAR EVENT LISTENERS ====================
function setupEventListeners() {
    // Filtros
    elements.filterProgram.addEventListener('change', applyFilters);
    elements.filterStatus.addEventListener('change', applyFilters);
    elements.searchQuery.addEventListener('input', applyFilters);
    elements.btnClearFilters.addEventListener('click', clearFilters);

    // Ações principais
    elements.btnAddLink.addEventListener('click', addNewLink);
    elements.btnExport.addEventListener('click', exportJSON);
    elements.btnImport.addEventListener('click', () => elements.fileInput.click());
    elements.fileInput.addEventListener('change', importJSON);

    // Modal
    elements.closeModalForm.addEventListener('click', closeModal);
    elements.btnCancelForm.addEventListener('click', closeModal);
    elements.modalForm.addEventListener('click', (e) => {
        if (e.target === elements.modalForm) closeModal();
    });

    // Formulário
    elements.linkForm.addEventListener('submit', handleFormSubmit);

    // Ordenação por colunas
    const headers = document.querySelectorAll('.links-table th[data-sort]');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const field = header.dataset.sort;
            sortBy(field);
        });
    });

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.modalForm.classList.contains('show')) {
            closeModal();
        }
    });
}

// ==================== RENDERIZAR LINKS ====================
function renderLinks() {
    const filteredLinks = getFilteredLinks();

    // Limpar tabela e cards
    elements.linksTableBody.innerHTML = '';
    elements.linksCards.innerHTML = '';

    // Verificar se há links
    if (filteredLinks.length === 0) {
        elements.emptyState.classList.add('show');
        return;
    }

    elements.emptyState.classList.remove('show');

    // Renderizar cada link
    filteredLinks.forEach(link => {
        renderTableRow(link);
        renderCard(link);
    });
}

// ==================== RENDERIZAR LINHA DA TABELA ====================
function renderTableRow(link) {
    const tr = document.createElement('tr');

    const statusClass = `status-${link.status.toLowerCase()}`;
    const createdDate = new Date(link.createdAt).toLocaleDateString('pt-BR');
    const commission = parseFloat(link.commission || 0).toFixed(2);

    tr.innerHTML = `
        <td>${escapeHtml(link.program)}</td>
        <td><strong>${escapeHtml(link.productName)}</strong></td>
        <td><span class="status-badge ${statusClass}">${escapeHtml(link.status)}</span></td>
        <td>${link.clicks || 0}</td>
        <td>${link.conversions || 0}</td>
        <td>R$ ${commission}</td>
        <td>${createdDate}</td>
        <td>
            <button class="btn btn-small btn-copy" onclick="copyUrl('${link.id}')">📋 Copiar</button>
            <button class="btn btn-small btn-edit" onclick="editLink('${link.id}')">✏️</button>
            <button class="btn btn-small btn-delete" onclick="deleteLink('${link.id}')">🗑️</button>
        </td>
    `;

    elements.linksTableBody.appendChild(tr);
}

// ==================== RENDERIZAR CARD MOBILE ====================
function renderCard(link) {
    const card = document.createElement('div');
    card.className = 'link-card';

    const statusClass = `status-${link.status.toLowerCase()}`;
    const createdDate = new Date(link.createdAt).toLocaleDateString('pt-BR');
    const commission = parseFloat(link.commission || 0).toFixed(2);

    card.innerHTML = `
        <div class="link-card-header">
            <div>
                <div class="link-card-title">${escapeHtml(link.productName)}</div>
                <span class="status-badge ${statusClass}">${escapeHtml(link.status)}</span>
            </div>
        </div>

        <div class="link-card-info">
            <div class="link-card-info-row">
                <span class="link-card-info-label">Programa:</span>
                <span class="link-card-info-value">${escapeHtml(link.program)}</span>
            </div>
            <div class="link-card-info-row">
                <span class="link-card-info-label">Cliques:</span>
                <span class="link-card-info-value">${link.clicks || 0}</span>
            </div>
            <div class="link-card-info-row">
                <span class="link-card-info-label">Conversões:</span>
                <span class="link-card-info-value">${link.conversions || 0}</span>
            </div>
            <div class="link-card-info-row">
                <span class="link-card-info-label">Comissão:</span>
                <span class="link-card-info-value">R$ ${commission}</span>
            </div>
            <div class="link-card-info-row">
                <span class="link-card-info-label">Data Criação:</span>
                <span class="link-card-info-value">${createdDate}</span>
            </div>
        </div>

        <div class="link-card-actions">
            <button class="btn btn-small btn-copy" onclick="copyUrl('${link.id}')">📋 Copiar URL</button>
            <button class="btn btn-small btn-edit" onclick="editLink('${link.id}')">✏️ Editar</button>
            <button class="btn btn-small btn-delete" onclick="deleteLink('${link.id}')">🗑️ Excluir</button>
        </div>
    `;

    elements.linksCards.appendChild(card);
}

// ==================== OBTER LINKS FILTRADOS ====================
function getFilteredLinks() {
    let filtered = [...links];

    // Filtro por programa
    const programFilter = elements.filterProgram.value;
    if (programFilter) {
        filtered = filtered.filter(link => link.program === programFilter);
    }

    // Filtro por status
    const statusFilter = elements.filterStatus.value;
    if (statusFilter) {
        filtered = filtered.filter(link => link.status === statusFilter);
    }

    // Busca textual
    const query = elements.searchQuery.value.toLowerCase().trim();
    if (query) {
        filtered = filtered.filter(link =>
            link.productName.toLowerCase().includes(query) ||
            link.originalUrl.toLowerCase().includes(query) ||
            (link.shortUrl && link.shortUrl.toLowerCase().includes(query)) ||
            (link.usedIn && link.usedIn.toLowerCase().includes(query)) ||
            (link.notes && link.notes.toLowerCase().includes(query))
        );
    }

    // Aplicar ordenação
    if (currentSort.field) {
        filtered.sort((a, b) => {
            let aVal = a[currentSort.field];
            let bVal = b[currentSort.field];

            // Tratar valores numéricos
            if (currentSort.field === 'clicks' || currentSort.field === 'conversions' || currentSort.field === 'commission') {
                aVal = parseFloat(aVal || 0);
                bVal = parseFloat(bVal || 0);
            }

            // Tratar datas
            if (currentSort.field === 'createdAt') {
                aVal = new Date(aVal);
                bVal = new Date(bVal);
            }

            // Comparação
            if (aVal < bVal) return currentSort.order === 'asc' ? -1 : 1;
            if (aVal > bVal) return currentSort.order === 'asc' ? 1 : -1;
            return 0;
        });
    }

    return filtered;
}

// ==================== APLICAR FILTROS ====================
function applyFilters() {
    renderLinks();
    updateStatistics();
}

// ==================== LIMPAR FILTROS ====================
function clearFilters() {
    elements.filterProgram.value = '';
    elements.filterStatus.value = '';
    elements.searchQuery.value = '';
    applyFilters();
}

// ==================== ORDENAR POR COLUNA ====================
function sortBy(field) {
    // Alternar ordem se clicar na mesma coluna
    if (currentSort.field === field) {
        currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.field = field;
        currentSort.order = 'asc';
    }

    // Atualizar indicadores visuais
    const headers = document.querySelectorAll('.links-table th[data-sort]');
    headers.forEach(header => {
        header.classList.remove('sort-asc', 'sort-desc');
        if (header.dataset.sort === field) {
            header.classList.add(`sort-${currentSort.order}`);
        }
    });

    renderLinks();
}

// ==================== ATUALIZAR ESTATÍSTICAS ====================
function updateStatistics() {
    const filteredLinks = getFilteredLinks();

    // Total de links
    elements.statTotalLinks.textContent = filteredLinks.length;

    // Links ativos
    const activeLinks = filteredLinks.filter(link => link.status === 'Ativo').length;
    elements.statActiveLinks.textContent = activeLinks;

    // Total de cliques
    const totalClicks = filteredLinks.reduce((sum, link) => sum + (parseInt(link.clicks) || 0), 0);
    elements.statTotalClicks.textContent = totalClicks.toLocaleString('pt-BR');

    // Total de conversões
    const totalConversions = filteredLinks.reduce((sum, link) => sum + (parseInt(link.conversions) || 0), 0);
    elements.statTotalConversions.textContent = totalConversions.toLocaleString('pt-BR');

    // Receita total
    const totalRevenue = filteredLinks.reduce((sum, link) => sum + (parseFloat(link.commission) || 0), 0);
    elements.statTotalRevenue.textContent = `R$ ${totalRevenue.toFixed(2).replace('.', ',')}`;
}

// ==================== ADICIONAR NOVO LINK ====================
function addNewLink() {
    editingId = null;
    elements.modalTitle.textContent = '➕ Adicionar Link de Afiliado';
    elements.linkForm.reset();
    elements.linkId.value = '';
    elements.modalForm.classList.add('show');
    elements.inputProgram.focus();
}

// ==================== FECHAR MODAL ====================
function closeModal() {
    elements.modalForm.classList.remove('show');
    elements.linkForm.reset();
    editingId = null;
}

// ==================== MANIPULAR SUBMIT DO FORMULÁRIO ====================
function handleFormSubmit(e) {
    e.preventDefault();

    // Validar URL
    const urlPattern = /^https?:\/\/.+/i;
    if (!urlPattern.test(elements.inputOriginalUrl.value)) {
        alert('Por favor, insira uma URL válida que comece com http:// ou https://');
        return;
    }

    // Coletar dados
    const linkData = {
        id: editingId || generateId(),
        program: elements.inputProgram.value,
        status: elements.inputStatus.value,
        productName: elements.inputProductName.value.trim(),
        originalUrl: elements.inputOriginalUrl.value.trim(),
        shortUrl: elements.inputShortUrl.value.trim(),
        usedIn: elements.inputUsedIn.value.trim(),
        clicks: parseInt(elements.inputClicks.value) || 0,
        conversions: parseInt(elements.inputConversions.value) || 0,
        commission: parseFloat(elements.inputCommission.value) || 0,
        notes: elements.inputNotes.value.trim(),
        createdAt: editingId ? getLinkById(editingId).createdAt : new Date().toISOString()
    };

    if (editingId) {
        // Editar existente
        const index = links.findIndex(link => link.id === editingId);
        if (index !== -1) {
            links[index] = linkData;
        }
    } else {
        // Adicionar novo
        links.push(linkData);
    }

    // Salvar e atualizar
    saveLinks();
    renderLinks();
    updateStatistics();
    closeModal();

    showToast(editingId ? 'Link atualizado com sucesso!' : 'Link adicionado com sucesso!');
}

// ==================== EDITAR LINK ====================
function editLink(id) {
    const link = getLinkById(id);
    if (!link) {
        alert('Link não encontrado!');
        return;
    }

    editingId = id;
    elements.modalTitle.textContent = '✏️ Editar Link de Afiliado';

    // Preencher formulário
    elements.linkId.value = link.id;
    elements.inputProgram.value = link.program;
    elements.inputStatus.value = link.status;
    elements.inputProductName.value = link.productName;
    elements.inputOriginalUrl.value = link.originalUrl;
    elements.inputShortUrl.value = link.shortUrl || '';
    elements.inputUsedIn.value = link.usedIn || '';
    elements.inputClicks.value = link.clicks || 0;
    elements.inputConversions.value = link.conversions || 0;
    elements.inputCommission.value = link.commission || 0;
    elements.inputNotes.value = link.notes || '';

    // Abrir modal
    elements.modalForm.classList.add('show');
    elements.inputProgram.focus();
}

// ==================== EXCLUIR LINK ====================
function deleteLink(id) {
    const link = getLinkById(id);
    if (!link) {
        alert('Link não encontrado!');
        return;
    }

    const confirmDelete = confirm(
        `Tem certeza que deseja excluir o link:\n\n` +
        `"${link.productName}" (${link.program})?\n\n` +
        `Esta ação não pode ser desfeita.`
    );

    if (confirmDelete) {
        links = links.filter(l => l.id !== id);
        saveLinks();
        renderLinks();
        updateStatistics();
        showToast('Link excluído com sucesso!');
    }
}

// ==================== COPIAR URL ====================
function copyUrl(id) {
    const link = getLinkById(id);
    if (!link) {
        alert('Link não encontrado!');
        return;
    }

    // Preferir URL encurtada se disponível
    const urlToCopy = link.shortUrl || link.originalUrl;

    // Tentar copiar para clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(urlToCopy)
            .then(() => {
                showToast('URL copiada para o clipboard!');
            })
            .catch(err => {
                console.error('Erro ao copiar:', err);
                fallbackCopy(urlToCopy);
            });
    } else {
        fallbackCopy(urlToCopy);
    }
}

// Fallback para copiar (navegadores antigos)
function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        showToast('URL copiada para o clipboard!');
    } catch (err) {
        console.error('Erro ao copiar:', err);
        alert('Não foi possível copiar automaticamente. URL: ' + text);
    }

    document.body.removeChild(textarea);
}

// ==================== EXPORTAR JSON ====================
function exportJSON() {
    if (links.length === 0) {
        alert('Não há links para exportar!');
        return;
    }

    try {
        const dataStr = JSON.stringify(links, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `fp-affiliate-links-${Date.now()}.json`;
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
                item.id && item.program && item.productName && item.originalUrl && item.status
            );

            if (!isValid) {
                throw new Error('Arquivo contém dados inválidos');
            }

            // Confirmar importação
            const shouldImport = confirm(
                `Foram encontrados ${importedData.length} link(s) no arquivo.\n\n` +
                `Você possui ${links.length} link(s) atualmente.\n\n` +
                `Clique em OK para MESCLAR os dados\n` +
                `Clique em Cancelar para manter seus dados atuais`
            );

            if (shouldImport) {
                // Mesclar dados (evitar duplicatas por ID)
                importedData.forEach(importedLink => {
                    const existingIndex = links.findIndex(link => link.id === importedLink.id);
                    if (existingIndex !== -1) {
                        // Sobrescrever existente
                        links[existingIndex] = importedLink;
                    } else {
                        // Adicionar novo
                        links.push(importedLink);
                    }
                });

                saveLinks();
                renderLinks();
                updateStatistics();
                clearFilters();
                showToast(`${importedData.length} link(s) importado(s)!`);
            }

        } catch (error) {
            console.error('Erro ao importar:', error);
            alert('Erro ao importar arquivo. Verifique se é um JSON válido exportado pelo FP Affiliate Link Manager.');
        }
    };

    reader.onerror = function() {
        alert('Erro ao ler o arquivo.');
    };

    reader.readAsText(file);

    // Limpar input
    e.target.value = '';
}

// ==================== FUNÇÕES AUXILIARES ====================

function getLinkById(id) {
    return links.find(link => link.id === id);
}

function generateId() {
    return 'link_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message) {
    // Toast simples usando console e título
    console.log('✅', message);

    // Feedback visual no título
    const originalTitle = document.title;
    document.title = `✅ ${message}`;
    setTimeout(() => {
        document.title = originalTitle;
    }, 2000);
}

// ==================== EXPOR FUNÇÕES GLOBALMENTE ====================
// Necessário para os event handlers inline no HTML
window.copyUrl = copyUrl;
window.editLink = editLink;
window.deleteLink = deleteLink;
