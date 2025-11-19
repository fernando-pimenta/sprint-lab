// ==========================================
// CATÁLOGO PESSOAL TECH - APP.JS
// Sistema de gerenciamento de equipamentos e peças de tecnologia
// ==========================================

// Constantes
const STORAGE_KEY = 'fp_tech_catalog';
let items = [];
let editingItemId = null;

// ==========================================
// ELEMENTOS DO DOM
// ==========================================
const elements = {
    // Modal e formulário
    modal: document.getElementById('itemFormModal'),
    itemForm: document.getElementById('itemForm'),
    formTitle: document.getElementById('formTitle'),
    itemId: document.getElementById('itemId'),
    itemName: document.getElementById('itemName'),
    itemCategory: document.getElementById('itemCategory'),
    itemStatus: document.getElementById('itemStatus'),
    itemLocation: document.getElementById('itemLocation'),
    itemImage: document.getElementById('itemImage'),
    itemNotes: document.getElementById('itemNotes'),

    // Botões
    addItemBtn: document.getElementById('addItemBtn'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    cancelBtn: document.getElementById('cancelBtn'),
    saveBtn: document.getElementById('saveBtn'),
    exportBtn: document.getElementById('exportBtn'),
    importBtn: document.getElementById('importBtn'),
    importFile: document.getElementById('importFile'),

    // Filtros
    filterCategory: document.getElementById('filterCategory'),
    filterStatus: document.getElementById('filterStatus'),
    searchInput: document.getElementById('searchInput'),

    // Listagem
    itemsList: document.getElementById('itemsList'),
    emptyState: document.getElementById('emptyState'),

    // Estatísticas
    totalItems: document.getElementById('totalItems'),
    inUseItems: document.getElementById('inUseItems'),
    reserveItems: document.getElementById('reserveItems'),
    defectiveItems: document.getElementById('defectiveItems')
};

// ==========================================
// INICIALIZAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadItemsFromStorage();
    renderItems();
    updateStats();
    setupEventListeners();
});

// ==========================================
// CONFIGURAÇÃO DE EVENT LISTENERS
// ==========================================
function setupEventListeners() {
    // Modal
    elements.addItemBtn.addEventListener('click', openAddModal);
    elements.closeModalBtn.addEventListener('click', closeModal);
    elements.cancelBtn.addEventListener('click', closeModal);

    // Fechar modal ao clicar fora
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) {
            closeModal();
        }
    });

    // Formulário
    elements.itemForm.addEventListener('submit', handleFormSubmit);

    // Filtros e busca
    elements.filterCategory.addEventListener('change', applyFilters);
    elements.filterStatus.addEventListener('change', applyFilters);
    elements.searchInput.addEventListener('input', applyFilters);

    // Importar/Exportar
    elements.exportBtn.addEventListener('click', exportItems);
    elements.importBtn.addEventListener('click', () => elements.importFile.click());
    elements.importFile.addEventListener('change', importItems);
}

// ==========================================
// GERENCIAMENTO DE DADOS (localStorage)
// ==========================================

/**
 * Carrega os itens do localStorage
 */
function loadItemsFromStorage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            items = JSON.parse(stored);
        }
    } catch (error) {
        console.error('Erro ao carregar itens do localStorage:', error);
        items = [];
    }
}

/**
 * Salva os itens no localStorage
 */
function saveItemsToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        console.error('Erro ao salvar itens no localStorage:', error);
        alert('Erro ao salvar dados. Verifique se há espaço disponível no navegador.');
    }
}

// ==========================================
// MODAL
// ==========================================

/**
 * Abre o modal para adicionar item
 */
function openAddModal() {
    editingItemId = null;
    elements.itemForm.reset();
    elements.formTitle.textContent = 'Adicionar Novo Item';
    elements.saveBtn.textContent = '💾 Salvar Item';
    elements.modal.classList.add('active');
}

/**
 * Abre o modal para editar item
 */
function openEditModal(id) {
    const item = getItemById(id);
    if (!item) return;

    editingItemId = id;

    // Preenche o formulário
    elements.itemId.value = item.id;
    elements.itemName.value = item.name;
    elements.itemCategory.value = item.category;
    elements.itemStatus.value = item.status;
    elements.itemLocation.value = item.location || '';
    elements.itemNotes.value = item.notes || '';

    elements.formTitle.textContent = 'Editar Item';
    elements.saveBtn.textContent = '💾 Atualizar Item';
    elements.modal.classList.add('active');
}

/**
 * Fecha o modal
 */
function closeModal() {
    elements.modal.classList.remove('active');
    elements.itemForm.reset();
    editingItemId = null;
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
    const itemData = {
        id: editingItemId || generateId(),
        name: elements.itemName.value.trim(),
        category: elements.itemCategory.value,
        status: elements.itemStatus.value,
        location: elements.itemLocation.value.trim(),
        notes: elements.itemNotes.value.trim(),
        image: null,
        createdAt: editingItemId ? getItemById(editingItemId).createdAt : new Date().toISOString()
    };

    // Processa a imagem se houver
    if (elements.itemImage.files && elements.itemImage.files[0]) {
        try {
            itemData.image = await fileToBase64(elements.itemImage.files[0]);
        } catch (error) {
            console.error('Erro ao processar imagem:', error);
            alert('Erro ao processar a imagem. Tente novamente.');
            return;
        }
    } else if (editingItemId) {
        // Mantém a imagem anterior se estiver editando e não selecionou nova imagem
        const existingItem = getItemById(editingItemId);
        if (existingItem) {
            itemData.image = existingItem.image;
        }
    }

    // Adiciona ou atualiza o item
    if (editingItemId) {
        updateItem(itemData);
    } else {
        addItem(itemData);
    }

    // Fecha o modal e atualiza a interface
    closeModal();
    renderItems();
    updateStats();
}

/**
 * Adiciona um novo item ao array
 */
function addItem(itemData) {
    items.push(itemData);
    saveItemsToStorage();
}

/**
 * Atualiza um item existente
 */
function updateItem(itemData) {
    const index = items.findIndex(i => i.id === itemData.id);
    if (index !== -1) {
        items[index] = itemData;
        saveItemsToStorage();
    }
}

/**
 * Remove um item
 */
function deleteItem(id) {
    if (confirm('Tem certeza que deseja excluir este item?')) {
        items = items.filter(i => i.id !== id);
        saveItemsToStorage();
        renderItems();
        updateStats();
    }
}

// ==========================================
// RENDERIZAÇÃO
// ==========================================

/**
 * Renderiza a lista de itens com filtros aplicados
 */
function renderItems() {
    const filteredItems = getFilteredItems();

    // Se não houver itens, mostra o estado vazio
    if (filteredItems.length === 0) {
        elements.itemsList.style.display = 'none';
        elements.emptyState.style.display = 'block';
        return;
    }

    elements.itemsList.style.display = 'grid';
    elements.emptyState.style.display = 'none';

    // Renderiza os cards de itens
    elements.itemsList.innerHTML = filteredItems.map(item => createItemCard(item)).join('');
}

/**
 * Cria o HTML de um card de item
 */
function createItemCard(item) {
    const imageHtml = item.image
        ? `<img src="${item.image}" alt="${escapeHtml(item.name)}" class="item-image">`
        : `<div class="item-image placeholder">💻</div>`;

    // Define a classe do badge de status
    const statusClass = item.status.toLowerCase().replace(/\//g, '-').replace(/ /g, '-');

    return `
        <div class="item-card">
            ${imageHtml}
            <div class="item-info">
                <h3 class="item-name">${escapeHtml(item.name)}</h3>
                <div class="item-badges">
                    <span class="item-badge badge-category">${escapeHtml(item.category)}</span>
                    <span class="item-badge badge-status ${statusClass}">${escapeHtml(item.status)}</span>
                </div>
                <div class="item-details">
                    ${item.location ? `
                        <div class="item-detail">
                            <strong>📍 Local:</strong>
                            <span>${escapeHtml(item.location)}</span>
                        </div>
                    ` : ''}
                    ${item.notes ? `
                        <div class="item-notes">
                            ${escapeHtml(item.notes)}
                        </div>
                    ` : ''}
                </div>
                <div class="item-actions">
                    <button class="btn btn-edit" onclick="openEditModal('${item.id}')">✏️ Editar</button>
                    <button class="btn btn-danger" onclick="deleteItem('${item.id}')">🗑️ Excluir</button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Atualiza as estatísticas
 */
function updateStats() {
    const total = items.length;
    const inUse = items.filter(i => i.status === 'Em uso').length;
    const reserve = items.filter(i => i.status === 'Reserva').length;
    const defective = items.filter(i => i.status === 'Defeituoso').length;

    elements.totalItems.textContent = total;
    elements.inUseItems.textContent = inUse;
    elements.reserveItems.textContent = reserve;
    elements.defectiveItems.textContent = defective;
}

// ==========================================
// FILTROS E BUSCA
// ==========================================

/**
 * Aplica todos os filtros e retorna os itens filtrados
 */
function getFilteredItems() {
    let filtered = [...items];

    // Filtro por categoria
    const categoryFilter = elements.filterCategory.value;
    if (categoryFilter) {
        filtered = filtered.filter(i => i.category === categoryFilter);
    }

    // Filtro por status
    const statusFilter = elements.filterStatus.value;
    if (statusFilter) {
        filtered = filtered.filter(i => i.status === statusFilter);
    }

    // Busca por nome
    const searchTerm = elements.searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        filtered = filtered.filter(i =>
            i.name.toLowerCase().includes(searchTerm) ||
            (i.notes && i.notes.toLowerCase().includes(searchTerm))
        );
    }

    return filtered;
}

/**
 * Reaplica os filtros e renderiza
 */
function applyFilters() {
    renderItems();
}

// ==========================================
// IMPORTAR / EXPORTAR
// ==========================================

/**
 * Exporta todos os itens para um arquivo JSON
 */
function exportItems() {
    if (items.length === 0) {
        alert('Não há itens para exportar!');
        return;
    }

    const dataStr = JSON.stringify(items, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tech-catalog-backup-${formatDateForFilename()}.json`;
    link.click();

    URL.revokeObjectURL(url);

    alert(`✅ Catálogo exportado com sucesso!\n${items.length} item(ns) foram exportados.`);
}

/**
 * Importa itens de um arquivo JSON
 */
function importItems(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
        try {
            const importedItems = JSON.parse(event.target.result);

            if (!Array.isArray(importedItems)) {
                throw new Error('Formato inválido');
            }

            // Validação básica
            const validItems = importedItems.filter(item =>
                item.name && item.category && item.status
            );

            if (validItems.length === 0) {
                throw new Error('Nenhum item válido encontrado');
            }

            // Pergunta ao usuário como proceder
            const action = confirm(
                `Foram encontrados ${validItems.length} item(ns) no arquivo.\n\n` +
                'OK = Substituir catálogo atual\n' +
                'Cancelar = Mesclar com o catálogo atual'
            );

            if (action) {
                // Substitui
                items = validItems;
            } else {
                // Mescla (adiciona sem duplicar IDs)
                validItems.forEach(item => {
                    // Gera novo ID se já existir
                    if (items.find(i => i.id === item.id)) {
                        item.id = generateId();
                    }
                    items.push(item);
                });
            }

            saveItemsToStorage();
            renderItems();
            updateStats();

            alert(`✅ Importação concluída!\n${validItems.length} item(ns) importado(s).`);

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
 * Busca um item por ID
 */
function getItemById(id) {
    return items.find(i => i.id === id);
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
window.openEditModal = openEditModal;
window.deleteItem = deleteItem;
