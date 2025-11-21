// Estado Global
let products = [];
let editingId = null;
let currentFilters = {
    search: '',
    category: '',
    status: ''
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    renderProducts();
    updateStats();
});

// ============== LOCALSTORAGE ==============

function saveProducts() {
    localStorage.setItem('productTracker', JSON.stringify(products));
}

function loadProducts() {
    const stored = localStorage.getItem('productTracker');
    if (stored) {
        products = JSON.parse(stored);
    }
}

// ============== MODAL PRODUTO ==============

function openAddProductModal() {
    editingId = null;
    document.getElementById('modalTitle').textContent = 'Adicionar Produto';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('imageBase64').value = '';

    const imagePreview = document.getElementById('imagePreview');
    const imagePlaceholder = document.getElementById('imagePlaceholder');
    imagePreview.classList.remove('active');
    imagePlaceholder.style.display = 'block';

    document.getElementById('productModal').style.display = 'block';
}

function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
}

function openEditProductModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    editingId = id;
    document.getElementById('modalTitle').textContent = 'Editar Produto';
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productLink').value = product.link;
    document.getElementById('currentPrice').value = product.currentPrice;
    document.getElementById('targetPrice').value = product.targetPrice;
    document.getElementById('productNotes').value = product.notes || '';
    document.getElementById('imageBase64').value = product.image || '';

    const imagePreview = document.getElementById('imagePreview');
    const imagePlaceholder = document.getElementById('imagePlaceholder');

    if (product.image) {
        imagePreview.src = product.image;
        imagePreview.classList.add('active');
        imagePlaceholder.style.display = 'none';
    } else {
        imagePreview.classList.remove('active');
        imagePlaceholder.style.display = 'block';
    }

    document.getElementById('productModal').style.display = 'block';
}

// ============== MODAL HISTÓRICO ==============

function openHistoryModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('historyProductName').textContent = product.name;
    document.getElementById('historyProductCategory').textContent = product.category;

    const container = document.getElementById('historyContainer');

    if (!product.priceHistory || product.priceHistory.length === 0) {
        container.innerHTML = '<p class="empty-message">Nenhuma alteração de preço registrada ainda.</p>';
    } else {
        let html = '';
        product.priceHistory.forEach(entry => {
            const diff = entry.newPrice - entry.oldPrice;
            const diffPercent = ((diff / entry.oldPrice) * 100).toFixed(1);
            const diffClass = diff < 0 ? 'down' : 'up';
            const diffSymbol = diff < 0 ? '↓' : '↑';

            html += `
                <div class="history-item">
                    <div class="history-date">${formatDate(entry.date)}</div>
                    <div class="history-change">
                        <span class="history-old-price">R$ ${entry.oldPrice.toFixed(2)}</span>
                        <span class="history-arrow">→</span>
                        <span class="history-new-price">R$ ${entry.newPrice.toFixed(2)}</span>
                        <span class="history-diff ${diffClass}">
                            ${diffSymbol} R$ ${Math.abs(diff).toFixed(2)} (${Math.abs(diffPercent)}%)
                        </span>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    document.getElementById('historyModal').style.display = 'block';
}

function closeHistoryModal() {
    document.getElementById('historyModal').style.display = 'none';
}

// ============== UPLOAD DE IMAGEM ==============

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validar tamanho (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Imagem muito grande! Máximo: 5MB');
        event.target.value = '';
        return;
    }

    // Validar tipo
    if (!file.type.startsWith('image/')) {
        alert('Arquivo inválido! Selecione uma imagem.');
        event.target.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const base64 = e.target.result;
        document.getElementById('imageBase64').value = base64;

        const imagePreview = document.getElementById('imagePreview');
        const imagePlaceholder = document.getElementById('imagePlaceholder');
        imagePreview.src = base64;
        imagePreview.classList.add('active');
        imagePlaceholder.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

// ============== CRUD ==============

function saveProduct(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const link = document.getElementById('productLink').value;
    const currentPrice = parseFloat(document.getElementById('currentPrice').value);
    const targetPrice = parseFloat(document.getElementById('targetPrice').value);
    const notes = document.getElementById('productNotes').value;
    const image = document.getElementById('imageBase64').value;

    if (editingId) {
        // Editar produto existente
        const index = products.findIndex(p => p.id === editingId);
        const oldProduct = products[index];

        // Registrar no histórico se o preço mudou
        if (oldProduct.currentPrice !== currentPrice) {
            if (!oldProduct.priceHistory) {
                oldProduct.priceHistory = [];
            }
            oldProduct.priceHistory.unshift({
                date: new Date().toISOString(),
                oldPrice: oldProduct.currentPrice,
                newPrice: currentPrice
            });
        }

        products[index] = {
            ...oldProduct,
            name,
            category,
            link,
            currentPrice,
            targetPrice,
            notes,
            image,
            updatedAt: new Date().toISOString()
        };

        alert('Produto atualizado com sucesso!');
    } else {
        // Adicionar novo produto
        const product = {
            id: Date.now().toString(),
            name,
            category,
            link,
            currentPrice,
            targetPrice,
            notes,
            image,
            priceHistory: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        products.push(product);
        alert('Produto adicionado com sucesso!');
    }

    saveProducts();
    renderProducts();
    updateStats();
    closeProductModal();
}

function deleteProduct(id) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    products = products.filter(p => p.id !== id);
    saveProducts();
    renderProducts();
    updateStats();

    alert('Produto excluído com sucesso!');
}

// ============== CÁLCULO DE STATUS ==============

function calculatePriceStatus(currentPrice, targetPrice) {
    if (currentPrice <= targetPrice) {
        return 'good'; // 👍 Bom preço
    }

    const diff = currentPrice - targetPrice;
    const percentAbove = (diff / targetPrice) * 100;

    if (percentAbove <= 10) {
        return 'near'; // 🔥 Próximo
    }

    return 'expensive'; // ❌ Caro
}

function getStatusEmoji(status) {
    const emojis = {
        good: '👍',
        near: '🔥',
        expensive: '❌'
    };
    return emojis[status] || '';
}

function getStatusText(status) {
    const texts = {
        good: 'Bom Preço',
        near: 'Próximo ao alvo',
        expensive: 'Acima do alvo'
    };
    return texts[status] || '';
}

// ============== RENDERIZAÇÃO ==============

function renderProducts() {
    const container = document.getElementById('productsContainer');

    // Aplicar filtros
    let filtered = [...products];

    if (currentFilters.search) {
        const search = currentFilters.search.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(search)
        );
    }

    if (currentFilters.category) {
        filtered = filtered.filter(p => p.category === currentFilters.category);
    }

    if (currentFilters.status) {
        filtered = filtered.filter(p => {
            const status = calculatePriceStatus(p.currentPrice, p.targetPrice);
            return status === currentFilters.status;
        });
    }

    if (filtered.length === 0) {
        container.innerHTML = '<p class="empty-message">Nenhum produto encontrado com os filtros aplicados.</p>';
        return;
    }

    let html = '';
    filtered.forEach(product => {
        const status = calculatePriceStatus(product.currentPrice, product.targetPrice);
        const statusEmoji = getStatusEmoji(status);
        const statusText = getStatusText(status);
        const diff = product.currentPrice - product.targetPrice;
        const diffPercent = ((diff / product.targetPrice) * 100).toFixed(1);

        const imageUrl = product.image || 'https://via.placeholder.com/320x200?text=Sem+Imagem';

        html += `
            <div class="product-card">
                <div class="product-status-badge" title="${statusText}">${statusEmoji}</div>
                <img src="${imageUrl}" alt="${product.name}" class="product-image">
                <div class="product-body">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-name">${product.name}</h3>
                    <a href="${product.link}" target="_blank" class="product-link" title="${product.link}">
                        🔗 Ver produto
                    </a>

                    <div class="product-prices">
                        <div class="price-row">
                            <span class="price-label">Preço Atual:</span>
                            <span class="price-value current">R$ ${product.currentPrice.toFixed(2)}</span>
                        </div>
                        <div class="price-row">
                            <span class="price-label">Preço Desejado:</span>
                            <span class="price-value target">R$ ${product.targetPrice.toFixed(2)}</span>
                        </div>
                        <div class="price-diff ${status}">
                            ${diff > 0 ? '+' : ''}R$ ${diff.toFixed(2)} (${diffPercent > 0 ? '+' : ''}${diffPercent}%)
                        </div>
                    </div>

                    ${product.notes ? `<p class="product-notes">"${product.notes}"</p>` : ''}

                    <p class="product-date">
                        Adicionado em: ${formatDate(product.createdAt)}
                    </p>

                    <div class="product-actions">
                        <button onclick="openHistoryModal('${product.id}')" class="btn btn-info btn-small" title="Ver histórico">
                            📊 Histórico
                        </button>
                        <button onclick="openEditProductModal('${product.id}')" class="btn btn-warning btn-small">
                            ✏️ Editar
                        </button>
                        <button onclick="deleteProduct('${product.id}')" class="btn btn-danger btn-small">
                            🗑️ Excluir
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ============== ESTATÍSTICAS ==============

function updateStats() {
    const total = products.length;
    let goodCount = 0;
    let nearCount = 0;
    let expensiveCount = 0;

    products.forEach(p => {
        const status = calculatePriceStatus(p.currentPrice, p.targetPrice);
        if (status === 'good') goodCount++;
        else if (status === 'near') nearCount++;
        else if (status === 'expensive') expensiveCount++;
    });

    document.getElementById('totalProducts').textContent = total;
    document.getElementById('goodPrice').textContent = goodCount;
    document.getElementById('nearPrice').textContent = nearCount;
    document.getElementById('expensivePrice').textContent = expensiveCount;
}

// ============== FILTROS ==============

function applyFilters() {
    currentFilters.search = document.getElementById('searchInput').value;
    currentFilters.category = document.getElementById('filterCategory').value;
    currentFilters.status = document.getElementById('filterStatus').value;
    renderProducts();
}

// ============== EXPORTAR/IMPORTAR ==============

function exportProducts() {
    if (products.length === 0) {
        alert('Nenhum produto para exportar');
        return;
    }

    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `product-tracker-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    URL.revokeObjectURL(url);
    alert('Produtos exportados com sucesso!');
}

function importProducts(event) {
    const file = event.target.files[0];
    if (!file) return;

    showLoading();

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const imported = JSON.parse(e.target.result);

            if (!Array.isArray(imported)) {
                throw new Error('Formato inválido');
            }

            // Validar estrutura básica
            const isValid = imported.every(p =>
                p.id && p.name && p.category && p.link &&
                typeof p.currentPrice === 'number' &&
                typeof p.targetPrice === 'number'
            );

            if (!isValid) {
                throw new Error('Dados inválidos no arquivo');
            }

            const confirm = window.confirm(
                `Deseja importar ${imported.length} produtos?\n\n` +
                `OK = Substituir tudo\n` +
                `Cancelar = Mesclar (adicionar novos)`
            );

            if (confirm) {
                products = imported;
            } else {
                // Mesclar, evitando duplicados por ID
                imported.forEach(newProduct => {
                    if (!products.find(p => p.id === newProduct.id)) {
                        products.push(newProduct);
                    }
                });
            }

            saveProducts();
            renderProducts();
            updateStats();
            alert('Produtos importados com sucesso!');
        } catch (error) {
            alert('Erro ao importar: ' + error.message);
        } finally {
            hideLoading();
        }
    };

    reader.readAsText(file);
    event.target.value = '';
}

// ============== UTILIDADES ==============

function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showLoading() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const productModal = document.getElementById('productModal');
    const historyModal = document.getElementById('historyModal');

    if (event.target === productModal) {
        closeProductModal();
    }
    if (event.target === historyModal) {
        closeHistoryModal();
    }
}
