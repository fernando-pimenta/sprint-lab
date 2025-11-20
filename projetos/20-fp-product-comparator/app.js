// FP Product Comparator - App Logic
// Sprint Lab #20 - Fernando Pimenta

// Data & State
let products = [];
let selectedProducts = [];
let comparisonTemplates = [];
let filters = {
    category: '',
    rating: '',
    maxPrice: '',
    recommendation: '',
    search: ''
};
let sortBy = 'name';

const categoryLabels = {
    hospedagem: 'Hospedagem',
    email: 'Email Marketing',
    crm: 'CRM',
    notebook: 'Notebook',
    mouse: 'Mouse',
    teclado: 'Teclado',
    software: 'Software',
    saas: 'SaaS',
    outro: 'Outro'
};

const frequencyLabels = {
    unico: 'Único',
    mensal: 'Mensal',
    anual: 'Anual',
    vitalicio: 'Vitalício'
};

const recommendationLabels = {
    highly: 'Altamente Recomendado',
    recommended: 'Recomendado',
    conditional: 'Condicional',
    not: 'Não Recomendado'
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initializeEventListeners();
    renderProductList();
    updateSelectedCount();
});

function loadData() {
    const savedProducts = localStorage.getItem('fpProductComparatorProducts');
    const savedTemplates = localStorage.getItem('fpProductComparatorTemplates');

    if (savedProducts) {
        products = JSON.parse(savedProducts);
    }

    if (savedTemplates) {
        comparisonTemplates = JSON.parse(savedTemplates);
    }
}

function saveData() {
    localStorage.setItem('fpProductComparatorProducts', JSON.stringify(products));
    localStorage.setItem('fpProductComparatorTemplates', JSON.stringify(comparisonTemplates));
}

// Event Listeners
function initializeEventListeners() {
    // Product Modal
    document.getElementById('btnAddProduct').addEventListener('click', openAddProductModal);
    document.getElementById('btnCloseProduct').addEventListener('click', closeProductModal);
    document.getElementById('btnCancelProduct').addEventListener('click', closeProductModal);
    document.getElementById('productForm').addEventListener('submit', handleProductSubmit);
    document.getElementById('btnDeleteProduct').addEventListener('click', deleteProduct);
    document.getElementById('btnDuplicateProduct').addEventListener('click', duplicateProduct);

    // View Toggle
    document.getElementById('btnCompare').addEventListener('click', showComparisonView);
    document.getElementById('btnViewList').addEventListener('click', showListView);
    document.getElementById('btnBackToList').addEventListener('click', showListView);

    // Filters
    document.getElementById('btnShowFilters').addEventListener('click', () => {
        document.getElementById('filtersPanel').style.display = 'block';
        document.getElementById('btnShowFilters').style.display = 'none';
    });
    document.getElementById('btnToggleFilters').addEventListener('click', () => {
        document.getElementById('filtersPanel').style.display = 'none';
        document.getElementById('btnShowFilters').style.display = 'block';
    });
    document.getElementById('filterCategory').addEventListener('change', applyFilters);
    document.getElementById('filterRating').addEventListener('change', applyFilters);
    document.getElementById('filterMaxPrice').addEventListener('input', applyFilters);
    document.getElementById('filterRecommendation').addEventListener('change', applyFilters);
    document.getElementById('filterSearch').addEventListener('input', applyFilters);
    document.getElementById('btnClearFilters').addEventListener('click', clearFilters);
    document.getElementById('sortBy').addEventListener('change', (e) => {
        sortBy = e.target.value;
        renderProductList();
    });

    // Templates
    document.getElementById('btnTemplates').addEventListener('click', openTemplatesModal);
    document.getElementById('btnCloseTemplates').addEventListener('click', () => {
        document.getElementById('templatesModal').classList.remove('active');
    });

    // Export
    document.getElementById('btnExport').addEventListener('click', openExportModal);
    document.getElementById('btnCloseExport').addEventListener('click', () => {
        document.getElementById('exportModal').classList.remove('active');
    });
    document.getElementById('btnExportAllJSON').addEventListener('click', exportAllJSON);
    document.getElementById('btnExportAllCSV').addEventListener('click', exportAllCSV);
    document.getElementById('btnImport').addEventListener('click', () => {
        document.getElementById('importFile').click();
    });
    document.getElementById('importFile').addEventListener('change', importJSON);

    // Export Comparison
    document.getElementById('btnExportComparison').addEventListener('click', openExportComparisonModal);
    document.getElementById('btnCloseExportComp').addEventListener('click', () => {
        document.getElementById('exportComparisonModal').classList.remove('active');
    });
    document.getElementById('btnExportHTML').addEventListener('click', exportComparisonHTML);
    document.getElementById('btnExportMarkdown').addEventListener('click', exportComparisonMarkdown);
    document.getElementById('btnExportCompJSON').addEventListener('click', exportComparisonJSON);
    document.getElementById('btnSaveTemplate').addEventListener('click', saveAsTemplate);
    document.getElementById('btnPrintMode').addEventListener('click', () => window.print());

    // Quick Compare Sidebar
    document.getElementById('btnCloseSidebar').addEventListener('click', closeQuickSidebar);
    document.getElementById('btnQuickCompare').addEventListener('click', showComparisonView);
    document.getElementById('btnClearQuick').addEventListener('click', clearQuickCompare);

    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
}

// Product CRUD
function openAddProductModal() {
    document.getElementById('productModal').classList.add('active');
    document.getElementById('productModalTitle').textContent = 'Adicionar Produto';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('btnDeleteProduct').style.display = 'none';
    document.getElementById('btnDuplicateProduct').style.display = 'none';
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('productModal').classList.add('active');
    document.getElementById('productModalTitle').textContent = 'Editar Produto';
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productRating').value = product.rating;
    document.getElementById('productPrice').value = product.price || '';
    document.getElementById('productFrequency').value = product.frequency;
    document.getElementById('productUrl').value = product.url || '';
    document.getElementById('productImage').value = product.image || '';
    document.getElementById('productDescription').value = product.description || '';
    document.getElementById('productPros').value = product.pros || '';
    document.getElementById('productCons').value = product.cons || '';
    document.getElementById('productFeatures').value = product.features || '';
    document.getElementById('productTarget').value = product.target || '';
    document.getElementById('productRecommendation').value = product.recommendation;
    document.getElementById('productAffiliate').value = product.affiliate || '';
    document.getElementById('productNotes').value = product.notes || '';

    document.getElementById('btnDeleteProduct').style.display = 'inline-block';
    document.getElementById('btnDuplicateProduct').style.display = 'inline-block';
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

function handleProductSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('productId').value;
    const productData = {
        id: id || generateId(),
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        rating: parseInt(document.getElementById('productRating').value),
        price: parseFloat(document.getElementById('productPrice').value) || 0,
        frequency: document.getElementById('productFrequency').value,
        url: document.getElementById('productUrl').value,
        image: document.getElementById('productImage').value,
        description: document.getElementById('productDescription').value,
        pros: document.getElementById('productPros').value,
        cons: document.getElementById('productCons').value,
        features: document.getElementById('productFeatures').value,
        target: document.getElementById('productTarget').value,
        recommendation: document.getElementById('productRecommendation').value,
        affiliate: document.getElementById('productAffiliate').value,
        notes: document.getElementById('productNotes').value
    };

    if (id) {
        const index = products.findIndex(p => p.id === id);
        products[index] = productData;
    } else {
        products.push(productData);
    }

    saveData();
    closeProductModal();
    renderProductList();
}

function deleteProduct() {
    const id = document.getElementById('productId').value;
    if (!id) return;

    if (confirm('Tem certeza que deseja excluir este produto?')) {
        products = products.filter(p => p.id !== id);
        selectedProducts = selectedProducts.filter(sid => sid !== id);
        saveData();
        closeProductModal();
        renderProductList();
        updateSelectedCount();
    }
}

function duplicateProduct() {
    const id = document.getElementById('productId').value;
    if (!id) return;

    const product = products.find(p => p.id === id);
    if (!product) return;

    const newProduct = {
        ...product,
        id: generateId(),
        name: `${product.name} (Cópia)`
    };

    products.push(newProduct);
    saveData();
    closeProductModal();
    renderProductList();
}

// Product Selection
function toggleProductSelection(id, checked) {
    if (checked) {
        if (selectedProducts.length < 4 && !selectedProducts.includes(id)) {
            selectedProducts.push(id);
            openQuickSidebar();
        } else if (selectedProducts.length >= 4) {
            alert('Você pode comparar no máximo 4 produtos!');
            document.querySelector(`input[data-product-id="${id}"]`).checked = false;
            return;
        }
    } else {
        selectedProducts = selectedProducts.filter(sid => sid !== id);
        if (selectedProducts.length === 0) {
            closeQuickSidebar();
        }
    }

    updateSelectedCount();
    updateQuickSidebar();
    renderProductList(); // Re-render to update selected state
}

function updateSelectedCount() {
    document.getElementById('selectedCount').textContent = selectedProducts.length;
    const btnCompare = document.getElementById('btnCompare');
    const btnQuickCompare = document.getElementById('btnQuickCompare');

    if (selectedProducts.length >= 2) {
        btnCompare.disabled = false;
        btnQuickCompare.disabled = false;
    } else {
        btnCompare.disabled = true;
        btnQuickCompare.disabled = true;
    }
}

// Quick Compare Sidebar
function openQuickSidebar() {
    document.getElementById('quickCompareSidebar').classList.add('active');
}

function closeQuickSidebar() {
    document.getElementById('quickCompareSidebar').classList.remove('active');
}

function updateQuickSidebar() {
    const list = document.getElementById('quickCompareList');
    list.innerHTML = '';

    if (selectedProducts.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Nenhum produto selecionado</p>';
        return;
    }

    selectedProducts.forEach(id => {
        const product = products.find(p => p.id === id);
        if (!product) return;

        const item = document.createElement('div');
        item.className = 'quick-item';
        item.innerHTML = `
            <div class="quick-item-name">${product.name}</div>
            <button class="btn-icon" onclick="removeFromQuick('${id}')">×</button>
        `;
        list.appendChild(item);
    });
}

function removeFromQuick(id) {
    selectedProducts = selectedProducts.filter(sid => sid !== id);
    const checkbox = document.querySelector(`input[data-product-id="${id}"]`);
    if (checkbox) checkbox.checked = false;

    updateSelectedCount();
    updateQuickSidebar();
    renderProductList();

    if (selectedProducts.length === 0) {
        closeQuickSidebar();
    }
}

function clearQuickCompare() {
    selectedProducts = [];
    document.querySelectorAll('.product-checkbox input').forEach(cb => cb.checked = false);
    updateSelectedCount();
    updateQuickSidebar();
    closeQuickSidebar();
    renderProductList();
}

// Product List Rendering
function renderProductList() {
    const grid = document.getElementById('productGrid');
    const emptyState = document.getElementById('emptyState');

    const filteredProducts = getFilteredProducts();
    const sortedProducts = sortProducts(filteredProducts);

    if (sortedProducts.length === 0) {
        grid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    grid.innerHTML = '';

    sortedProducts.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    if (selectedProducts.includes(product.id)) {
        card.classList.add('selected');
    }

    const featureCount = product.features ? product.features.split('\n').filter(f => f.trim()).length : 0;
    const monthlyPrice = convertToMonthly(product.price, product.frequency);

    card.innerHTML = `
        <div class="product-checkbox">
            <input type="checkbox"
                   data-product-id="${product.id}"
                   ${selectedProducts.includes(product.id) ? 'checked' : ''}
                   onchange="toggleProductSelection('${product.id}', this.checked)">
        </div>

        ${product.image ? `<img src="${product.image}" class="product-image" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\'%3E%3Crect fill=\\'%23f5f5f5\\' width=\\'100\\' height=\\'100\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' text-anchor=\\'middle\\' dy=\\'.3em\\' fill=\\'%23999\\'%3EImagem%3C/text%3E%3C/svg%3E'">` : ''}

        <div class="product-category">${categoryLabels[product.category]}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-rating">${'⭐'.repeat(product.rating)} (${product.rating}.0)</div>
        <div class="product-price">
            ${product.price > 0 ? `R$ ${product.price.toFixed(2)}/${frequencyLabels[product.frequency]}` : 'Preço sob consulta'}
        </div>

        <div class="product-actions">
            <button class="btn btn-secondary" onclick="viewProductDetails('${product.id}')">Ver Detalhes</button>
            <button class="btn btn-primary" onclick="editProduct('${product.id}')">Editar</button>
        </div>
    `;

    return card;
}

function viewProductDetails(id) {
    editProduct(id);
}

// Filters
function applyFilters() {
    filters.category = document.getElementById('filterCategory').value;
    filters.rating = document.getElementById('filterRating').value;
    filters.maxPrice = document.getElementById('filterMaxPrice').value;
    filters.recommendation = document.getElementById('filterRecommendation').value;
    filters.search = document.getElementById('filterSearch').value.toLowerCase();

    renderProductList();
}

function clearFilters() {
    document.getElementById('filterCategory').value = '';
    document.getElementById('filterRating').value = '';
    document.getElementById('filterMaxPrice').value = '';
    document.getElementById('filterRecommendation').value = '';
    document.getElementById('filterSearch').value = '';

    filters = {
        category: '',
        rating: '',
        maxPrice: '',
        recommendation: '',
        search: ''
    };

    renderProductList();
}

function getFilteredProducts() {
    return products.filter(product => {
        if (filters.category && product.category !== filters.category) return false;
        if (filters.rating && product.rating < parseInt(filters.rating)) return false;
        if (filters.maxPrice) {
            const monthlyPrice = convertToMonthly(product.price, product.frequency);
            if (monthlyPrice > parseFloat(filters.maxPrice)) return false;
        }
        if (filters.recommendation && product.recommendation !== filters.recommendation) return false;
        if (filters.search) {
            const searchStr = `${product.name} ${product.description} ${product.features}`.toLowerCase();
            if (!searchStr.includes(filters.search)) return false;
        }

        return true;
    });
}

function sortProducts(productsList) {
    const sorted = [...productsList];

    switch(sortBy) {
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-asc':
            sorted.sort((a, b) => convertToMonthly(a.price, a.frequency) - convertToMonthly(b.price, b.frequency));
            break;
        case 'price-desc':
            sorted.sort((a, b) => convertToMonthly(b.price, b.frequency) - convertToMonthly(a.price, a.frequency));
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
    }

    return sorted;
}

// View Switching
function showListView() {
    document.getElementById('productListView').classList.add('active');
    document.getElementById('comparisonView').classList.remove('active');
    document.getElementById('btnViewList').classList.add('active');
}

function showComparisonView() {
    if (selectedProducts.length < 2) {
        alert('Selecione pelo menos 2 produtos para comparar!');
        return;
    }

    document.getElementById('productListView').classList.remove('active');
    document.getElementById('comparisonView').classList.add('active');
    document.getElementById('btnViewList').classList.remove('active');

    renderComparison();
    closeQuickSidebar();
}

// Comparison Rendering
function renderComparison() {
    const selectedData = selectedProducts.map(id => products.find(p => p.id === id)).filter(Boolean);

    renderAnalysisCard(selectedData);
    renderComparisonTable(selectedData);
}

function renderAnalysisCard(productsData) {
    const card = document.getElementById('analysisCard');

    const analysis = analyzeProducts(productsData);

    card.innerHTML = `
        <div class="analysis-title">🏆 Análise Automática da Comparação</div>
        <div class="analysis-grid">
            <div class="analysis-item">
                <div class="analysis-icon">💰</div>
                <div class="analysis-label">Mais Barato</div>
                <div class="analysis-value">${analysis.cheapest.name}</div>
            </div>
            <div class="analysis-item">
                <div class="analysis-icon">⭐</div>
                <div class="analysis-label">Melhor Avaliado</div>
                <div class="analysis-value">${analysis.bestRated.name}</div>
            </div>
            <div class="analysis-item">
                <div class="analysis-icon">🚀</div>
                <div class="analysis-label">Mais Completo</div>
                <div class="analysis-value">${analysis.mostComplete.name}</div>
            </div>
            <div class="analysis-item">
                <div class="analysis-icon">🏆</div>
                <div class="analysis-label">Melhor Custo-Benefício</div>
                <div class="analysis-value">${analysis.bestValue.name}</div>
            </div>
        </div>
    `;
}

function analyzeProducts(productsData) {
    const cheapest = productsData.reduce((min, p) => {
        const price = convertToMonthly(p.price, p.frequency);
        const minPrice = convertToMonthly(min.price, min.frequency);
        return price < minPrice ? p : min;
    });

    const bestRated = productsData.reduce((max, p) => p.rating > max.rating ? p : max);

    const mostComplete = productsData.reduce((max, p) => {
        const features = (p.features || '').split('\n').filter(f => f.trim()).length;
        const maxFeatures = (max.features || '').split('\n').filter(f => f.trim()).length;
        return features > maxFeatures ? p : max;
    });

    const bestValue = productsData.reduce((best, p) => {
        const score = calculateValueScore(p);
        const bestScore = calculateValueScore(best);
        return score > bestScore ? p : best;
    });

    return { cheapest, bestRated, mostComplete, bestValue };
}

function calculateValueScore(product) {
    const features = (product.features || '').split('\n').filter(f => f.trim()).length;
    const price = convertToMonthly(product.price, product.frequency) || 1;
    return (product.rating * features) / price;
}

function renderComparisonTable(productsData) {
    const table = document.getElementById('comparisonTable');
    table.innerHTML = '';

    const grid = document.createElement('div');
    grid.className = 'comparison-table';
    grid.style.gridTemplateColumns = `200px repeat(${productsData.length}, 1fr)`;

    // Headers
    grid.appendChild(createCell('', true, true));
    productsData.forEach(product => {
        const cell = createCell('', true);
        cell.innerHTML = `
            ${product.image ? `<img src="${product.image}" class="product-logo" alt="${product.name}" onerror="this.style.display='none'">` : ''}
            <div class="product-title">${product.name}</div>
        `;
        grid.appendChild(cell);
    });

    // Rows
    const rows = [
        { label: 'Categoria', getValue: p => categoryLabels[p.category] },
        { label: 'Preço', getValue: p => p.price > 0 ? `R$ ${p.price.toFixed(2)}` : 'Sob consulta', highlight: 'best-price' },
        { label: 'Frequência', getValue: p => frequencyLabels[p.frequency] },
        { label: 'Preço Mensal', getValue: p => p.price > 0 ? `R$ ${convertToMonthly(p.price, p.frequency).toFixed(2)}/mês` : '-', highlight: 'best-price' },
        { label: 'Rating', getValue: p => '⭐'.repeat(p.rating), highlight: 'best-rating' },
        { label: 'Recomendação', getValue: p => `<span class="recommendation-badge rec-${p.recommendation}">${recommendationLabels[p.recommendation]}</span>` },
        { label: 'Público-Alvo', getValue: p => p.target || '-' },
        { label: 'Descrição', getValue: p => p.description || '-' },
        { label: 'Prós', getValue: p => formatList(p.pros) },
        { label: 'Contras', getValue: p => formatList(p.cons) },
        { label: 'Features', getValue: p => {
            const count = (p.features || '').split('\n').filter(f => f.trim()).length;
            return `${formatList(p.features)}<span class="feature-count">${count} features</span>`;
        }, highlight: 'most-complete' },
        { label: 'Site Oficial', getValue: p => p.url ? `<a href="${p.url}" target="_blank">Visitar</a>` : '-' },
        { label: 'Link Afiliado', getValue: p => p.affiliate ? `<a href="${p.affiliate}" target="_blank">Link Afiliado</a>` : '-' }
    ];

    rows.forEach(row => {
        grid.appendChild(createCell(row.label, false, true));

        const values = productsData.map(p => row.getValue(p));

        // Apply highlights
        let highlightIndexes = [];
        if (row.highlight === 'best-price') {
            const prices = productsData.map(p => convertToMonthly(p.price, p.frequency));
            const minPrice = Math.min(...prices);
            highlightIndexes = prices.map((p, i) => p === minPrice ? i : -1).filter(i => i >= 0);
        } else if (row.highlight === 'best-rating') {
            const ratings = productsData.map(p => p.rating);
            const maxRating = Math.max(...ratings);
            highlightIndexes = ratings.map((r, i) => r === maxRating ? i : -1).filter(i => i >= 0);
        } else if (row.highlight === 'most-complete') {
            const featureCounts = productsData.map(p => (p.features || '').split('\n').filter(f => f.trim()).length);
            const maxCount = Math.max(...featureCounts);
            highlightIndexes = featureCounts.map((c, i) => c === maxCount ? i : -1).filter(i => i >= 0);
        }

        values.forEach((value, index) => {
            const cell = createCell(value);
            if (highlightIndexes.includes(index)) {
                cell.classList.add(row.highlight);
            }
            grid.appendChild(cell);
        });
    });

    table.appendChild(grid);
}

function createCell(content, isHeader = false, isRowHeader = false) {
    const cell = document.createElement('div');
    cell.className = 'comparison-cell';
    if (isHeader) cell.classList.add('header');
    if (isRowHeader) cell.classList.add('row-header');
    cell.innerHTML = content;
    return cell;
}

function formatList(text) {
    if (!text) return '-';
    const items = text.split('\n').filter(item => item.trim());
    if (items.length === 0) return '-';
    return `<ul class="comparison-list">${items.map(item => `<li>${item.trim()}</li>`).join('')}</ul>`;
}

function convertToMonthly(price, frequency) {
    if (price === 0) return 0;
    switch(frequency) {
        case 'mensal': return price;
        case 'anual': return price / 12;
        case 'unico': return price / 12; // Assume 1 year lifespan
        case 'vitalicio': return price / 60; // Assume 5 years
        default: return price;
    }
}

// Templates
function openTemplatesModal() {
    const modal = document.getElementById('templatesModal');
    const list = document.getElementById('templatesList');

    list.innerHTML = '';

    if (comparisonTemplates.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Nenhum template salvo</p>';
    } else {
        comparisonTemplates.forEach(template => {
            const item = document.createElement('div');
            item.className = 'template-item';

            item.innerHTML = `
                <div>
                    <div class="template-name">${template.name}</div>
                    <div class="template-count">${template.productIds.length} produtos</div>
                </div>
                <div class="template-actions">
                    <button class="btn btn-primary" onclick="loadTemplate('${template.id}')">Carregar</button>
                    <button class="btn btn-danger" onclick="deleteTemplate('${template.id}')">Excluir</button>
                </div>
            `;

            list.appendChild(item);
        });
    }

    modal.classList.add('active');
}

function saveAsTemplate() {
    const name = prompt('Nome do template:');
    if (!name) return;

    const template = {
        id: generateId(),
        name: name,
        productIds: [...selectedProducts]
    };

    comparisonTemplates.push(template);
    saveData();
    alert('Template salvo com sucesso!');
}

function loadTemplate(id) {
    const template = comparisonTemplates.find(t => t.id === id);
    if (!template) return;

    selectedProducts = [...template.productIds];
    document.querySelectorAll('.product-checkbox input').forEach(cb => {
        cb.checked = selectedProducts.includes(cb.dataset.productId);
    });

    updateSelectedCount();
    updateQuickSidebar();
    renderProductList();

    document.getElementById('templatesModal').classList.remove('active');
    showComparisonView();
}

function deleteTemplate(id) {
    if (confirm('Tem certeza que deseja excluir este template?')) {
        comparisonTemplates = comparisonTemplates.filter(t => t.id !== id);
        saveData();
        openTemplatesModal();
    }
}

// Export
function openExportModal() {
    document.getElementById('exportModal').classList.add('active');
}

function openExportComparisonModal() {
    document.getElementById('exportComparisonModal').classList.add('active');
}

function exportAllJSON() {
    const dataStr = JSON.stringify(products, null, 2);
    downloadFile(dataStr, `fp-products-${formatDate()}.json`, 'application/json');
}

function exportAllCSV() {
    const headers = ['Nome', 'Categoria', 'Rating', 'Preço', 'Frequência', 'Recomendação', 'Público-Alvo'];
    const rows = products.map(p => [
        p.name,
        categoryLabels[p.category],
        p.rating,
        p.price,
        frequencyLabels[p.frequency],
        recommendationLabels[p.recommendation],
        p.target || ''
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.map(escapeCSV).join(','))].join('\n');
    downloadFile(csv, `fp-products-${formatDate()}.csv`, 'text/csv');
}

function exportComparisonJSON() {
    const selectedData = selectedProducts.map(id => products.find(p => p.id === id)).filter(Boolean);
    const dataStr = JSON.stringify(selectedData, null, 2);
    downloadFile(dataStr, `fp-comparison-${formatDate()}.json`, 'application/json');
}

function exportComparisonHTML() {
    const selectedData = selectedProducts.map(id => products.find(p => p.id === id)).filter(Boolean);

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comparação de Produtos - FP Product Comparator</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
        h1 { color: #283593; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 12px; text-align: left; border: 1px solid #ddd; }
        th { background: #283593; color: white; }
        .best-price { background: #e8f5e9; font-weight: bold; }
        .best-rating { background: #fffde7; }
    </style>
</head>
<body>
    <div class="container">
        <h1>⚖️ Comparação de Produtos</h1>
        <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
        ${createHTMLTable(selectedData)}
    </div>
</body>
</html>`;

    downloadFile(html, `fp-comparison-${formatDate()}.html`, 'text/html');
}

function createHTMLTable(productsData) {
    let html = '<table>';

    // Header
    html += '<tr><th>Campo</th>';
    productsData.forEach(p => {
        html += `<th>${p.name}</th>`;
    });
    html += '</tr>';

    // Rows
    const rows = [
        ['Categoria', p => categoryLabels[p.category]],
        ['Preço', p => `R$ ${p.price.toFixed(2)} ${frequencyLabels[p.frequency]}`],
        ['Rating', p => '⭐'.repeat(p.rating)],
        ['Recomendação', p => recommendationLabels[p.recommendation]],
        ['Público-Alvo', p => p.target || '-']
    ];

    rows.forEach(([label, getValue]) => {
        html += `<tr><td><strong>${label}</strong></td>`;
        productsData.forEach(p => {
            html += `<td>${getValue(p)}</td>`;
        });
        html += '</tr>';
    });

    html += '</table>';
    return html;
}

function exportComparisonMarkdown() {
    const selectedData = selectedProducts.map(id => products.find(p => p.id === id)).filter(Boolean);

    let md = '# Comparação de Produtos\n\n';
    md += `**Data:** ${new Date().toLocaleDateString('pt-BR')}\n\n`;

    md += '| Campo | ' + selectedData.map(p => p.name).join(' | ') + ' |\n';
    md += '|' + '---|'.repeat(selectedData.length + 1) + '\n';

    const rows = [
        ['Categoria', p => categoryLabels[p.category]],
        ['Preço', p => `R$ ${p.price.toFixed(2)} ${frequencyLabels[p.frequency]}`],
        ['Rating', p => '⭐'.repeat(p.rating)],
        ['Recomendação', p => recommendationLabels[p.recommendation]]
    ];

    rows.forEach(([label, getValue]) => {
        md += `| **${label}** | `;
        md += selectedData.map(getValue).join(' | ');
        md += ' |\n';
    });

    downloadFile(md, `fp-comparison-${formatDate()}.md`, 'text/markdown');
}

function importJSON(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const imported = JSON.parse(e.target.result);

            if (confirm('Deseja mesclar com produtos existentes ou substituir tudo?\n\nOK = Mesclar | Cancelar = Substituir')) {
                products = products.concat(imported);
            } else {
                products = imported;
            }

            saveData();
            renderProductList();
            document.getElementById('exportModal').classList.remove('active');
            alert('Produtos importados com sucesso!');
        } catch (error) {
            alert('Erro ao importar JSON. Verifique o formato do arquivo.');
        }
    };

    reader.readAsText(file);
    e.target.value = '';
}

// Utility Functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate() {
    return new Date().toISOString().split('T')[0];
}

function escapeCSV(str) {
    if (typeof str !== 'string') return str;
    return `"${str.replace(/"/g, '""')}"`;
}

function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type: type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}
