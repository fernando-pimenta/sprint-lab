// ==================== CONSTANTES E CONFIGURAÇÕES ====================
const STORAGE_KEY = 'fp_assets_manager';
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB (limite razoável)
const RECOMMENDED_IMAGE_SIZE = 500 * 1024; // 500KB (recomendado)

// Estado da aplicação
let assets = [];
let currentImageBase64 = null;
let currentAssetId = null;

// ==================== ELEMENTOS DO DOM ====================
const elements = {
    // Header
    exportBtn: document.getElementById('exportBtn'),
    importBtn: document.getElementById('importBtn'),
    importFile: document.getElementById('importFile'),

    // Formulário
    assetForm: document.getElementById('assetForm'),
    assetName: document.getElementById('assetName'),
    assetType: document.getElementById('assetType'),
    assetTags: document.getElementById('assetTags'),
    assetImage: document.getElementById('assetImage'),
    uploadArea: document.getElementById('uploadArea'),
    uploadPlaceholder: document.getElementById('uploadPlaceholder'),
    imagePreview: document.getElementById('imagePreview'),
    previewImg: document.getElementById('previewImg'),
    removeImageBtn: document.getElementById('removeImageBtn'),

    // Filtros
    searchName: document.getElementById('searchName'),
    filterType: document.getElementById('filterType'),
    searchTag: document.getElementById('searchTag'),
    clearFiltersBtn: document.getElementById('clearFiltersBtn'),

    // Assets
    assetsCount: document.getElementById('assetsCount'),
    assetsGrid: document.getElementById('assetsGrid'),
    emptyState: document.getElementById('emptyState'),

    // Modal de Visualização
    assetModal: document.getElementById('assetModal'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    modalAssetName: document.getElementById('modalAssetName'),
    modalAssetImage: document.getElementById('modalAssetImage'),
    modalAssetType: document.getElementById('modalAssetType'),
    modalAssetTags: document.getElementById('modalAssetTags'),
    modalAssetCreated: document.getElementById('modalAssetCreated'),
    deleteAssetBtn: document.getElementById('deleteAssetBtn'),

    // Modal de Exclusão
    deleteModal: document.getElementById('deleteModal'),
    confirmDeleteBtn: document.getElementById('confirmDeleteBtn'),
    cancelDeleteBtn: document.getElementById('cancelDeleteBtn'),

    // Toast
    toast: document.getElementById('toast')
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    loadAssets();
    renderAssets();
    attachEventListeners();
});

// ==================== EVENT LISTENERS ====================
function attachEventListeners() {
    // Header
    elements.exportBtn.addEventListener('click', exportAssets);
    elements.importBtn.addEventListener('click', () => elements.importFile.click());
    elements.importFile.addEventListener('change', importAssets);

    // Formulário
    elements.assetForm.addEventListener('submit', saveAsset);

    // Upload de Imagem
    elements.assetImage.addEventListener('change', handleImageSelect);
    elements.uploadArea.addEventListener('click', () => elements.assetImage.click());
    elements.removeImageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeImage();
    });

    // Drag and Drop
    elements.uploadArea.addEventListener('dragover', handleDragOver);
    elements.uploadArea.addEventListener('dragleave', handleDragLeave);
    elements.uploadArea.addEventListener('drop', handleDrop);

    // Filtros
    elements.searchName.addEventListener('input', renderAssets);
    elements.filterType.addEventListener('change', renderAssets);
    elements.searchTag.addEventListener('input', renderAssets);
    elements.clearFiltersBtn.addEventListener('click', clearFilters);

    // Modal de Visualização
    elements.closeModalBtn.addEventListener('click', closeAssetModal);
    elements.deleteAssetBtn.addEventListener('click', () => {
        closeAssetModal();
        deleteAsset(currentAssetId);
    });

    // Modal de Exclusão
    elements.cancelDeleteBtn.addEventListener('click', closeDeleteModal);

    // Fechar modal ao clicar fora
    elements.assetModal.addEventListener('click', (e) => {
        if (e.target === elements.assetModal) {
            closeAssetModal();
        }
    });

    elements.deleteModal.addEventListener('click', (e) => {
        if (e.target === elements.deleteModal) {
            closeDeleteModal();
        }
    });
}

// ==================== FUNÇÕES DE ARMAZENAMENTO ====================
function loadAssets() {
    const stored = localStorage.getItem(STORAGE_KEY);
    assets = stored ? JSON.parse(stored) : [];
}

function saveToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            showToast('❌ Limite de armazenamento atingido! Remova alguns assets ou use imagens menores.', 'error');
        } else {
            showToast('❌ Erro ao salvar dados.', 'error');
        }
        throw e;
    }
}

function getStorageSize() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return 0;
    return new Blob([stored]).size;
}

// ==================== UPLOAD DE IMAGEM ====================
function handleImageSelect(e) {
    const file = e.target.files[0];
    if (file) {
        processImage(file);
    }
}

function handleDragOver(e) {
    e.preventDefault();
    elements.uploadPlaceholder.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    elements.uploadPlaceholder.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    elements.uploadPlaceholder.classList.remove('dragover');

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        elements.assetImage.files = e.dataTransfer.files;
        processImage(file);
    } else {
        showToast('⚠️ Por favor, envie um arquivo de imagem válido.', 'error');
    }
}

function processImage(file) {
    // Validar tipo
    if (!file.type.startsWith('image/')) {
        showToast('⚠️ Por favor, envie um arquivo de imagem válido.', 'error');
        return;
    }

    // Validar tamanho
    if (file.size > MAX_IMAGE_SIZE) {
        showToast(`❌ Imagem muito grande! Máximo: ${MAX_IMAGE_SIZE / 1024 / 1024}MB`, 'error');
        elements.assetImage.value = '';
        return;
    }

    // Avisar se maior que o recomendado
    if (file.size > RECOMMENDED_IMAGE_SIZE) {
        showToast(`⚠️ Imagem grande (${(file.size / 1024).toFixed(0)}KB). Recomendamos imagens menores para melhor performance.`, 'warning');
    }

    // Converter para Base64
    const reader = new FileReader();
    reader.onload = (e) => {
        currentImageBase64 = e.target.result;
        showImagePreview(currentImageBase64);
    };
    reader.onerror = () => {
        showToast('❌ Erro ao ler imagem.', 'error');
    };
    reader.readAsDataURL(file);
}

function showImagePreview(base64) {
    elements.previewImg.src = base64;
    elements.uploadPlaceholder.style.display = 'none';
    elements.imagePreview.style.display = 'block';
}

function removeImage() {
    currentImageBase64 = null;
    elements.assetImage.value = '';
    elements.uploadPlaceholder.style.display = 'block';
    elements.imagePreview.style.display = 'none';
    elements.previewImg.src = '';
}

// ==================== FUNÇÕES DE ASSET ====================
function saveAsset(e) {
    e.preventDefault();

    // Validação
    if (!elements.assetName.value.trim()) {
        showToast('⚠️ Nome do asset é obrigatório', 'error');
        elements.assetName.focus();
        return;
    }

    if (!elements.assetType.value) {
        showToast('⚠️ Selecione um tipo', 'error');
        elements.assetType.focus();
        return;
    }

    if (!currentImageBase64) {
        showToast('⚠️ Adicione uma imagem', 'error');
        return;
    }

    // Processar tags
    const tagsRaw = elements.assetTags.value.trim();
    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(t => t) : [];

    // Criar objeto do asset
    const asset = {
        id: generateId(),
        name: elements.assetName.value.trim(),
        type: elements.assetType.value,
        tags: tags,
        image: currentImageBase64,
        createdAt: new Date().toISOString()
    };

    // Adicionar à lista
    assets.unshift(asset);

    try {
        saveToStorage();
        renderAssets();
        resetForm();
        showToast('✅ Asset adicionado com sucesso!');

        // Mostrar tamanho de armazenamento
        const storageSize = getStorageSize();
        console.log(`Tamanho do armazenamento: ${(storageSize / 1024 / 1024).toFixed(2)}MB`);
    } catch (e) {
        // Remover asset se falhou ao salvar
        assets.shift();
    }
}

function resetForm() {
    elements.assetForm.reset();
    removeImage();
}

function getAssetById(id) {
    return assets.find(a => a.id === id);
}

// ==================== VISUALIZAÇÃO DE ASSET ====================
function openAssetModal(id) {
    const asset = getAssetById(id);
    if (!asset) return;

    currentAssetId = id;

    elements.modalAssetName.textContent = asset.name;
    elements.modalAssetImage.src = asset.image;
    elements.modalAssetType.textContent = asset.type;

    // Tags
    if (asset.tags && asset.tags.length > 0) {
        elements.modalAssetTags.innerHTML = asset.tags
            .map(tag => `<span class="asset-tag">${escapeHtml(tag)}</span>`)
            .join('');
    } else {
        elements.modalAssetTags.innerHTML = '<span style="color: var(--text-muted);">Sem tags</span>';
    }

    // Data de criação
    elements.modalAssetCreated.textContent = formatDate(asset.createdAt);

    elements.assetModal.classList.add('show');
}

function closeAssetModal() {
    elements.assetModal.classList.remove('show');
    currentAssetId = null;
}

// ==================== FUNÇÕES DE EXCLUSÃO ====================
let assetToDelete = null;

function deleteAsset(id) {
    assetToDelete = id;
    elements.deleteModal.classList.add('show');

    elements.confirmDeleteBtn.onclick = () => {
        assets = assets.filter(a => a.id !== assetToDelete);
        saveToStorage();
        renderAssets();
        closeDeleteModal();
        showToast('🗑️ Asset excluído com sucesso!');
    };
}

function closeDeleteModal() {
    elements.deleteModal.classList.remove('show');
    assetToDelete = null;
}

// ==================== RENDERIZAÇÃO ====================
function renderAssets() {
    const filteredAssets = getFilteredAssets();

    // Atualizar contador
    elements.assetsCount.textContent = `${filteredAssets.length} asset${filteredAssets.length !== 1 ? 's' : ''}`;

    // Verificar estado vazio
    if (filteredAssets.length === 0) {
        elements.assetsGrid.innerHTML = '';
        elements.emptyState.style.display = 'block';
        return;
    }

    elements.emptyState.style.display = 'none';

    // Renderizar grid
    elements.assetsGrid.innerHTML = filteredAssets.map(asset => `
        <div class="asset-card" onclick="openAssetModal('${asset.id}')">
            <div class="asset-thumbnail">
                <img src="${asset.image}" alt="${escapeHtml(asset.name)}">
            </div>
            <div class="asset-card-name" title="${escapeHtml(asset.name)}">
                ${escapeHtml(asset.name)}
            </div>
            <div>
                <span class="asset-card-type">${escapeHtml(asset.type)}</span>
            </div>
            ${asset.tags && asset.tags.length > 0 ? `
                <div class="asset-card-tags">
                    ${asset.tags.slice(0, 3).map(tag => `<span class="asset-tag">${escapeHtml(tag)}</span>`).join('')}
                    ${asset.tags.length > 3 ? `<span class="asset-tag">+${asset.tags.length - 3}</span>` : ''}
                </div>
            ` : ''}
        </div>
    `).join('');
}

function getFilteredAssets() {
    let filtered = [...assets];

    // Filtro de busca por nome
    const searchTerm = elements.searchName.value.trim().toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(asset =>
            asset.name.toLowerCase().includes(searchTerm)
        );
    }

    // Filtro por tipo
    const typeFilter = elements.filterType.value;
    if (typeFilter) {
        filtered = filtered.filter(asset => asset.type === typeFilter);
    }

    // Busca por tag
    const tagSearch = elements.searchTag.value.trim().toLowerCase();
    if (tagSearch) {
        filtered = filtered.filter(asset =>
            asset.tags && asset.tags.some(tag => tag.toLowerCase().includes(tagSearch))
        );
    }

    return filtered;
}

function clearFilters() {
    elements.searchName.value = '';
    elements.filterType.value = '';
    elements.searchTag.value = '';
    renderAssets();
    showToast('🔄 Filtros limpos');
}

// ==================== EXPORTAR/IMPORTAR ====================
function exportAssets() {
    if (assets.length === 0) {
        showToast('⚠️ Nenhum asset para exportar', 'error');
        return;
    }

    const dataStr = JSON.stringify(assets, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `assets-fp-${formatDateForFilename()}.json`;
    link.click();

    URL.revokeObjectURL(url);

    const fileSize = (blob.size / 1024 / 1024).toFixed(2);
    showToast(`📤 ${assets.length} asset(s) exportado(s)! Tamanho: ${fileSize}MB`);
}

function importAssets(e) {
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
            const isValid = imported.every(asset =>
                asset.name && asset.type && asset.image
            );

            if (!isValid) {
                throw new Error('Dados incompletos');
            }

            // Mesclar com assets existentes (evitar duplicatas por ID)
            const existingIds = new Set(assets.map(a => a.id));
            const newAssets = imported.filter(a => !existingIds.has(a.id));

            if (newAssets.length === 0) {
                showToast('ℹ️ Todos os assets já existem', 'error');
                return;
            }

            assets = [...newAssets, ...assets];

            try {
                saveToStorage();
                renderAssets();
                showToast(`📥 ${newAssets.length} asset(s) importado(s) com sucesso!`);
            } catch (e) {
                // Reverter se falhou
                assets = assets.slice(newAssets.length);
                throw e;
            }
        } catch (err) {
            console.error('Erro ao importar:', err);
            showToast('❌ Erro ao importar arquivo JSON', 'error');
        }
    };

    reader.onerror = () => {
        showToast('❌ Erro ao ler arquivo', 'error');
    };

    reader.readAsText(file);

    // Limpar input
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

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
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
window.openAssetModal = openAssetModal;
