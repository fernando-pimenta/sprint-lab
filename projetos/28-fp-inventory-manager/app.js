// ===== ESTADO GLOBAL =====
let state = {
    categories: [],
    locations: [],
    items: [],
    currentItem: null
};

// ===== CATEGORIAS PADRÃO =====
const DEFAULT_CATEGORIES = [
    {
        id: '1',
        name: 'Ferramentas',
        icon: '🔧',
        color: '#2196f3',
        fields: [
            { id: 'brand', label: 'Marca', type: 'text' },
            { id: 'model', label: 'Modelo', type: 'text' },
            { id: 'voltage', label: 'Voltagem', type: 'select', options: ['110V', '220V', 'Bivolt', 'N/A'] },
            { id: 'purchase_date', label: 'Data de Compra', type: 'date' },
            { id: 'purchase_value', label: 'Valor de Compra (R$)', type: 'number' }
        ]
    },
    {
        id: '2',
        name: 'Componentes Eletrônicos',
        icon: '⚡',
        color: '#ff9800',
        fields: [
            { id: 'part_number', label: 'Part Number', type: 'text' },
            { id: 'specifications', label: 'Especificações', type: 'textarea' },
            { id: 'datasheet', label: 'Link Datasheet', type: 'url' }
        ]
    },
    {
        id: '3',
        name: 'Peças de Computador',
        icon: '💻',
        color: '#4caf50',
        fields: [
            { id: 'brand', label: 'Marca', type: 'text' },
            { id: 'model', label: 'Modelo', type: 'text' },
            { id: 'capacity', label: 'Capacidade', type: 'text' },
            { id: 'interface', label: 'Interface', type: 'text' },
            { id: 'condition', label: 'Condição', type: 'select', options: ['Novo', 'Usado', 'Recondicionado'] }
        ]
    },
    {
        id: '4',
        name: 'Equipamentos',
        icon: '📟',
        color: '#9c27b0',
        fields: [
            { id: 'brand', label: 'Marca', type: 'text' },
            { id: 'model', label: 'Modelo', type: 'text' },
            { id: 'serial', label: 'Número de Série', type: 'text' },
            { id: 'warranty', label: 'Garantia até', type: 'date' },
            { id: 'manual', label: 'Link do Manual', type: 'url' }
        ]
    }
];

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initializeUI();
    initializeEventListeners();
});

// ===== CARREGAR DADOS =====
function loadData() {
    state.categories = JSON.parse(localStorage.getItem('fp_inventory_categories') || '[]');
    state.locations = JSON.parse(localStorage.getItem('fp_inventory_locations') || '[]');
    state.items = JSON.parse(localStorage.getItem('fp_inventory_items') || '[]');

    // Adicionar categorias padrão se não existirem
    if (state.categories.length === 0) {
        state.categories = DEFAULT_CATEGORIES;
        saveData('categories');
    }
}

function saveData(type) {
    if (type === 'categories') {
        localStorage.setItem('fp_inventory_categories', JSON.stringify(state.categories));
    } else if (type === 'locations') {
        localStorage.setItem('fp_inventory_locations', JSON.stringify(state.locations));
    } else if (type === 'items') {
        localStorage.setItem('fp_inventory_items', JSON.stringify(state.items));
    }
}

// ===== INICIALIZAR UI =====
function initializeUI() {
    renderCategories();
    renderLocations();
    renderItems();
    renderDashboard();
    populateSelectors();
}

function populateSelectors() {
    // Categoria nos filtros
    const filterCategory = document.getElementById('filterCategory');
    const itemCategory = document.getElementById('itemCategory');

    filterCategory.innerHTML = '<option value="">Todas as Categorias</option>';
    itemCategory.innerHTML = '';

    state.categories.forEach(cat => {
        const option1 = document.createElement('option');
        option1.value = cat.id;
        option1.textContent = `${cat.icon} ${cat.name}`;
        filterCategory.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = cat.id;
        option2.textContent = `${cat.icon} ${cat.name}`;
        itemCategory.appendChild(option2);
    });

    // Localização nos filtros
    const filterLocation = document.getElementById('filterLocation');
    const itemLocation = document.getElementById('itemLocation');

    filterLocation.innerHTML = '<option value="">Todas as Localizações</option>';
    itemLocation.innerHTML = '<option value="">Sem localização</option>';

    state.locations.forEach(loc => {
        const option1 = document.createElement('option');
        option1.value = loc.id;
        option1.textContent = loc.name;
        filterLocation.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = loc.id;
        option2.textContent = loc.name;
        itemLocation.appendChild(option2);
    });
}

// ===== EVENT LISTENERS =====
function initializeEventListeners() {
    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Items
    document.getElementById('btnNewItem').addEventListener('click', () => openItemModal());
    document.getElementById('itemForm').addEventListener('submit', handleItemSubmit);
    document.getElementById('itemCategory').addEventListener('change', handleCategorySelect);
    document.getElementById('itemPhoto').addEventListener('change', handlePhotoUpload);

    // Categories
    document.getElementById('btnNewCategory').addEventListener('click', () => openCategoryModal());
    document.getElementById('categoryForm').addEventListener('submit', handleCategorySubmit);
    document.getElementById('btnAddField').addEventListener('click', addCustomField);

    // Locations
    document.getElementById('btnNewLocation').addEventListener('click', () => openLocationModal());
    document.getElementById('locationForm').addEventListener('submit', handleLocationSubmit);

    // Filters
    document.getElementById('searchItems').addEventListener('input', renderItems);
    document.getElementById('filterCategory').addEventListener('change', renderItems);
    document.getElementById('filterLocation').addEventListener('change', renderItems);
    document.getElementById('filterStatus').addEventListener('change', renderItems);
    document.getElementById('sortItems').addEventListener('change', renderItems);

    // Export/Import
    document.getElementById('btnExportJSON').addEventListener('click', exportJSON);
    document.getElementById('btnExportCSV').addEventListener('click', exportCSV);
    document.getElementById('btnImportJSON').addEventListener('click', () => document.getElementById('importFileInput').click());
    document.getElementById('importFileInput').addEventListener('change', importJSON);

    // Modals
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModals();
        }
    });
}

// ===== TABS =====
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

// ===== CATEGORIAS =====
function renderCategories() {
    const list = document.getElementById('categoriesList');

    if (state.categories.length === 0) {
        list.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📂</div><p>Nenhuma categoria cadastrada.</p></div>';
        return;
    }

    list.innerHTML = state.categories.map(cat => {
        const itemCount = state.items.filter(item => item.categoryId === cat.id).length;

        return `
            <div class="category-card" style="border-left: 4px solid ${cat.color}">
                <div class="category-header">
                    <div class="category-icon">${cat.icon}</div>
                    <div class="category-name">${cat.name}</div>
                </div>
                <div class="category-info">
                    ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}
                </div>
                <div class="category-fields">
                    <strong>Campos Personalizados:</strong>
                    ${cat.fields && cat.fields.length > 0 ? `
                        <ul>
                            ${cat.fields.map(f => `<li>• ${f.label} (${f.type})</li>`).join('')}
                        </ul>
                    ` : '<p style="color: #999; font-size: 0.9rem;">Nenhum campo personalizado</p>'}
                </div>
                <div class="category-actions">
                    <button class="btn btn-secondary" onclick="editCategory('${cat.id}')">✏️ Editar</button>
                    <button class="btn btn-secondary" onclick="deleteCategory('${cat.id}')">🗑️ Excluir</button>
                </div>
            </div>
        `;
    }).join('');
}

function openCategoryModal(categoryId = null) {
    const modal = document.getElementById('categoryModal');
    const form = document.getElementById('categoryForm');
    const title = document.getElementById('categoryModalTitle');

    form.reset();
    document.getElementById('customFieldsList').innerHTML = '';

    if (categoryId) {
        const category = state.categories.find(c => c.id === categoryId);
        if (category) {
            title.textContent = 'Editar Categoria';
            document.getElementById('categoryId').value = category.id;
            document.getElementById('categoryName').value = category.name;
            document.getElementById('categoryIcon').value = category.icon;
            document.getElementById('categoryColor').value = category.color;

            if (category.fields) {
                category.fields.forEach(field => {
                    addCustomField(field);
                });
            }
        }
    } else {
        title.textContent = 'Nova Categoria';
    }

    modal.classList.add('active');
}

function handleCategorySubmit(e) {
    e.preventDefault();

    const id = document.getElementById('categoryId').value || Date.now().toString();
    const category = {
        id,
        name: document.getElementById('categoryName').value,
        icon: document.getElementById('categoryIcon').value || '📦',
        color: document.getElementById('categoryColor').value,
        fields: []
    };

    // Coletar campos personalizados
    const fieldItems = document.querySelectorAll('.custom-field-item');
    fieldItems.forEach(item => {
        const field = {
            id: item.querySelector('[name="fieldId"]').value,
            label: item.querySelector('[name="fieldLabel"]').value,
            type: item.querySelector('[name="fieldType"]').value,
            options: []
        };

        if (field.type === 'select') {
            const optionsInput = item.querySelector('[name="fieldOptions"]');
            if (optionsInput && optionsInput.value) {
                field.options = optionsInput.value.split(',').map(o => o.trim());
            }
        }

        if (field.label) {
            category.fields.push(field);
        }
    });

    const index = state.categories.findIndex(c => c.id === id);
    if (index >= 0) {
        state.categories[index] = category;
    } else {
        state.categories.push(category);
    }

    saveData('categories');
    renderCategories();
    populateSelectors();
    closeModals();

    alert('Categoria salva com sucesso!');
}

function addCustomField(existingField = null) {
    const container = document.getElementById('customFieldsList');
    const fieldId = existingField?.id || `field_${Date.now()}`;

    const item = document.createElement('div');
    item.className = 'custom-field-item';
    item.innerHTML = `
        <div class="custom-field-header">
            <strong>Campo Personalizado</strong>
            <button type="button" class="btn-secondary btn-small" onclick="this.parentElement.parentElement.remove()">🗑️ Remover</button>
        </div>
        <div class="custom-field-inputs">
            <input type="hidden" name="fieldId" value="${fieldId}">
            <input type="text" name="fieldLabel" placeholder="Nome do campo" value="${existingField?.label || ''}" required>
            <select name="fieldType" onchange="handleFieldTypeChange(this)">
                <option value="text" ${existingField?.type === 'text' ? 'selected' : ''}>Texto</option>
                <option value="textarea" ${existingField?.type === 'textarea' ? 'selected' : ''}>Texto Longo</option>
                <option value="number" ${existingField?.type === 'number' ? 'selected' : ''}>Número</option>
                <option value="date" ${existingField?.type === 'date' ? 'selected' : ''}>Data</option>
                <option value="select" ${existingField?.type === 'select' ? 'selected' : ''}>Lista Suspensa</option>
                <option value="url" ${existingField?.type === 'url' ? 'selected' : ''}>URL</option>
            </select>
            ${existingField?.type === 'select' ? `
                <input type="text" name="fieldOptions" placeholder="Opções separadas por vírgula" value="${existingField.options.join(', ')}">
            ` : ''}
        </div>
    `;

    container.appendChild(item);
}

function handleFieldTypeChange(select) {
    const fieldItem = select.closest('.custom-field-item');
    const inputs = fieldItem.querySelector('.custom-field-inputs');

    // Remover campo de opções se existir
    const existingOptions = inputs.querySelector('[name="fieldOptions"]');
    if (existingOptions) {
        existingOptions.remove();
    }

    // Adicionar campo de opções se for select
    if (select.value === 'select') {
        const optionsInput = document.createElement('input');
        optionsInput.type = 'text';
        optionsInput.name = 'fieldOptions';
        optionsInput.placeholder = 'Opções separadas por vírgula';
        inputs.appendChild(optionsInput);
    }
}

function editCategory(id) {
    openCategoryModal(id);
}

function deleteCategory(id) {
    const itemCount = state.items.filter(item => item.categoryId === id).length;

    if (itemCount > 0) {
        if (!confirm(`Esta categoria possui ${itemCount} item(ns). Deseja realmente excluir? Os itens também serão removidos.`)) {
            return;
        }
        state.items = state.items.filter(item => item.categoryId !== id);
        saveData('items');
    } else {
        if (!confirm('Deseja realmente excluir esta categoria?')) return;
    }

    state.categories = state.categories.filter(c => c.id !== id);
    saveData('categories');
    renderCategories();
    renderItems();
    populateSelectors();
}

// ===== LOCALIZAÇÕES =====
function renderLocations() {
    const list = document.getElementById('locationsList');

    if (state.locations.length === 0) {
        list.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📍</div><p>Nenhuma localização cadastrada.</p></div>';
        return;
    }

    list.innerHTML = state.locations.map(loc => {
        const itemCount = state.items.filter(item => item.locationId === loc.id).length;

        return `
            <div class="location-card">
                <h3>${loc.name}</h3>
                <p>${loc.description || 'Sem descrição'}</p>
                <div class="location-count">${itemCount} ${itemCount === 1 ? 'item' : 'itens'}</div>
                <div class="location-actions">
                    <button class="btn btn-secondary" onclick="editLocation('${loc.id}')">✏️ Editar</button>
                    <button class="btn btn-secondary" onclick="deleteLocation('${loc.id}')">🗑️ Excluir</button>
                </div>
            </div>
        `;
    }).join('');
}

function openLocationModal(locationId = null) {
    const modal = document.getElementById('locationModal');
    const form = document.getElementById('locationForm');
    const title = document.getElementById('locationModalTitle');

    form.reset();

    if (locationId) {
        const location = state.locations.find(l => l.id === locationId);
        if (location) {
            title.textContent = 'Editar Localização';
            document.getElementById('locationId').value = location.id;
            document.getElementById('locationName').value = location.name;
            document.getElementById('locationDescription').value = location.description || '';
        }
    } else {
        title.textContent = 'Nova Localização';
    }

    modal.classList.add('active');
}

function handleLocationSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('locationId').value || Date.now().toString();
    const location = {
        id,
        name: document.getElementById('locationName').value,
        description: document.getElementById('locationDescription').value
    };

    const index = state.locations.findIndex(l => l.id === id);
    if (index >= 0) {
        state.locations[index] = location;
    } else {
        state.locations.push(location);
    }

    saveData('locations');
    renderLocations();
    populateSelectors();
    closeModals();

    alert('Localização salva com sucesso!');
}

function editLocation(id) {
    openLocationModal(id);
}

function deleteLocation(id) {
    if (!confirm('Deseja realmente excluir esta localização?')) return;

    state.locations = state.locations.filter(l => l.id !== id);
    saveData('locations');
    renderLocations();
    populateSelectors();
}

// ===== ITENS =====
function renderItems() {
    const grid = document.getElementById('inventoryGrid');

    // Aplicar filtros
    let items = [...state.items];

    const search = document.getElementById('searchItems').value.toLowerCase();
    const filterCat = document.getElementById('filterCategory').value;
    const filterLoc = document.getElementById('filterLocation').value;
    const filterStat = document.getElementById('filterStatus').value;
    const sort = document.getElementById('sortItems').value;

    if (search) {
        items = items.filter(item =>
            item.name.toLowerCase().includes(search) ||
            (item.tags && item.tags.some(t => t.toLowerCase().includes(search)))
        );
    }

    if (filterCat) {
        items = items.filter(item => item.categoryId === filterCat);
    }

    if (filterLoc) {
        items = items.filter(item => item.locationId === filterLoc);
    }

    if (filterStat) {
        items = items.filter(item => item.status === filterStat);
    }

    // Ordenar
    if (sort === 'name-asc') items.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'name-desc') items.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === 'date-desc') items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (sort === 'date-asc') items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    else if (sort === 'quantity-desc') items.sort((a, b) => b.quantity - a.quantity);
    else if (sort === 'quantity-asc') items.sort((a, b) => a.quantity - b.quantity);

    if (items.length === 0) {
        grid.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📦</div><p>Nenhum item encontrado.</p></div>';
        return;
    }

    grid.innerHTML = items.map(item => {
        const category = state.categories.find(c => c.id === item.categoryId);
        const location = state.locations.find(l => l.id === item.locationId);

        return `
            <div class="item-card" onclick="viewItem('${item.id}')">
                <div class="item-photo">
                    ${item.photo ? `<img src="${item.photo}" alt="${item.name}">` : '<span>📦</span>'}
                </div>
                <div class="item-info">
                    <div class="item-header">
                        <div class="item-name">${item.name}</div>
                        <div class="item-quantity">${item.quantity}</div>
                    </div>
                    <div class="item-category" style="background: ${category?.color || '#999'}; color: white;">
                        ${category?.icon || '📦'} ${category?.name || 'Sem categoria'}
                    </div>
                    <div class="item-location">
                        📍 ${location?.name || 'Sem localização'}
                    </div>
                    <div class="item-status ${item.status}">${getStatusLabel(item.status)}</div>
                    ${item.tags && item.tags.length > 0 ? `
                        <div class="item-tags">
                            ${item.tags.slice(0, 3).map(tag => `<span class="item-tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');

    renderDashboard();
}

function openItemModal(itemId = null) {
    const modal = document.getElementById('itemModal');
    const form = document.getElementById('itemForm');
    const title = document.getElementById('itemModalTitle');

    form.reset();
    document.getElementById('itemPhotoPreview').innerHTML = '';
    document.getElementById('customFieldsContainer').innerHTML = '';

    if (itemId) {
        const item = state.items.find(i => i.id === itemId);
        if (item) {
            title.textContent = 'Editar Item';
            document.getElementById('itemId').value = item.id;
            document.getElementById('itemCategory').value = item.categoryId;
            handleCategorySelect(); // Carregar campos personalizados
            document.getElementById('itemName').value = item.name;
            document.getElementById('itemQuantity').value = item.quantity;
            document.getElementById('itemLocation').value = item.locationId || '';
            document.getElementById('itemStatus').value = item.status;
            document.getElementById('itemNotes').value = item.notes || '';
            document.getElementById('itemTags').value = item.tags ? item.tags.join(', ') : '';

            if (item.photo) {
                document.getElementById('itemPhotoPreview').innerHTML = `<img src="${item.photo}" alt="Preview">`;
            }

            // Preencher campos personalizados
            if (item.customFields) {
                setTimeout(() => {
                    Object.keys(item.customFields).forEach(fieldId => {
                        const input = document.querySelector(`[name="custom_${fieldId}"]`);
                        if (input) {
                            input.value = item.customFields[fieldId];
                        }
                    });
                }, 100);
            }
        }
    } else {
        title.textContent = 'Novo Item';
        state.currentItem = null;
    }

    modal.classList.add('active');
}

function handleCategorySelect() {
    const categoryId = document.getElementById('itemCategory').value;
    const container = document.getElementById('customFieldsContainer');

    container.innerHTML = '';

    if (!categoryId) return;

    const category = state.categories.find(c => c.id === categoryId);
    if (!category || !category.fields || category.fields.length === 0) return;

    container.innerHTML = '<h4 style="color: var(--primary); margin: 1rem 0;">Campos Personalizados</h4>';

    category.fields.forEach(field => {
        const group = document.createElement('div');
        group.className = 'form-group';

        const label = document.createElement('label');
        label.textContent = field.label;
        group.appendChild(label);

        let input;

        if (field.type === 'textarea') {
            input = document.createElement('textarea');
            input.rows = 3;
        } else if (field.type === 'select') {
            input = document.createElement('select');
            field.options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt;
                option.textContent = opt;
                input.appendChild(option);
            });
        } else {
            input = document.createElement('input');
            input.type = field.type;
        }

        input.name = `custom_${field.id}`;
        group.appendChild(input);
        container.appendChild(group);
    });
}

function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
        alert('Foto muito grande! Máximo 5MB.');
        e.target.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        document.getElementById('itemPhotoPreview').innerHTML = `<img src="${event.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
}

function handleItemSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('itemId').value || Date.now().toString();
    const categoryId = document.getElementById('itemCategory').value;

    const item = {
        id,
        categoryId,
        name: document.getElementById('itemName').value,
        quantity: parseInt(document.getElementById('itemQuantity').value),
        locationId: document.getElementById('itemLocation').value,
        status: document.getElementById('itemStatus').value,
        notes: document.getElementById('itemNotes').value,
        tags: [],
        customFields: {},
        createdAt: state.items.find(i => i.id === id)?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Tags
    const tagsInput = document.getElementById('itemTags').value;
    if (tagsInput) {
        item.tags = tagsInput.split(',').map(t => t.trim()).filter(t => t);
    }

    // Foto
    const photoPreview = document.getElementById('itemPhotoPreview').querySelector('img');
    if (photoPreview) {
        item.photo = photoPreview.src;
    } else {
        const existingItem = state.items.find(i => i.id === id);
        if (existingItem && existingItem.photo) {
            item.photo = existingItem.photo;
        }
    }

    // Campos personalizados
    const customInputs = document.querySelectorAll('#customFieldsContainer input, #customFieldsContainer textarea, #customFieldsContainer select');
    customInputs.forEach(input => {
        if (input.name.startsWith('custom_')) {
            const fieldId = input.name.replace('custom_', '');
            item.customFields[fieldId] = input.value;
        }
    });

    const index = state.items.findIndex(i => i.id === id);
    if (index >= 0) {
        state.items[index] = item;
    } else {
        state.items.push(item);
    }

    saveData('items');
    renderItems();
    closeModals();

    alert('Item salvo com sucesso!');
}

function viewItem(id) {
    const item = state.items.find(i => i.id === id);
    if (!item) return;

    state.currentItem = item;

    const category = state.categories.find(c => c.id === item.categoryId);
    const location = state.locations.find(l => l.id === item.locationId);

    document.getElementById('viewItemTitle').textContent = item.name;

    let html = '';

    if (item.photo) {
        html += `<div class="view-item-photo"><img src="${item.photo}" alt="${item.name}"></div>`;
    }

    html += '<div class="view-item-info">';
    html += `<div class="view-item-field"><strong>Categoria:</strong> ${category?.icon || '📦'} ${category?.name || 'N/A'}</div>`;
    html += `<div class="view-item-field"><strong>Quantidade:</strong> ${item.quantity}</div>`;
    html += `<div class="view-item-field"><strong>Localização:</strong> ${location?.name || 'N/A'}</div>`;
    html += `<div class="view-item-field"><strong>Status:</strong> <span class="item-status ${item.status}">${getStatusLabel(item.status)}</span></div>`;

    // Campos personalizados
    if (item.customFields && category && category.fields) {
        category.fields.forEach(field => {
            const value = item.customFields[field.id];
            if (value) {
                html += `<div class="view-item-field"><strong>${field.label}:</strong> ${value}</div>`;
            }
        });
    }

    if (item.notes) {
        html += `<div class="view-item-field" style="grid-column: 1 / -1;"><strong>Observações:</strong><br>${item.notes}</div>`;
    }

    if (item.tags && item.tags.length > 0) {
        html += `<div class="view-item-field" style="grid-column: 1 / -1;"><strong>Tags:</strong><br>${item.tags.join(', ')}</div>`;
    }

    html += '</div>';

    document.getElementById('viewItemContent').innerHTML = html;

    // Event listeners para botões
    document.getElementById('btnEditItem').onclick = () => {
        closeModals();
        openItemModal(id);
    };

    document.getElementById('btnDuplicateItem').onclick = () => {
        const newItem = { ...item, id: Date.now().toString(), name: item.name + ' (Cópia)' };
        state.items.push(newItem);
        saveData('items');
        renderItems();
        closeModals();
        alert('Item duplicado!');
    };

    document.getElementById('btnDeleteItem').onclick = () => {
        if (!confirm('Deseja realmente excluir este item?')) return;
        state.items = state.items.filter(i => i.id !== id);
        saveData('items');
        renderItems();
        closeModals();
    };

    document.getElementById('viewItemModal').classList.add('active');
}

function getStatusLabel(status) {
    const labels = {
        'available': 'Disponível',
        'in-use': 'Em Uso',
        'maintenance': 'Em Manutenção',
        'reserved': 'Reservado',
        'broken': 'Quebrado'
    };
    return labels[status] || status;
}

// ===== DASHBOARD =====
function renderDashboard() {
    document.getElementById('statTotalItems').textContent = state.items.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('statCategories').textContent = state.categories.length;
    document.getElementById('statLocations').textContent = state.locations.length;

    // Valor total (soma dos campos purchase_value ou valor de compra)
    let totalValue = 0;
    state.items.forEach(item => {
        if (item.customFields && item.customFields.purchase_value) {
            totalValue += parseFloat(item.customFields.purchase_value) * item.quantity;
        }
    });
    document.getElementById('statTotalValue').textContent = `R$ ${totalValue.toFixed(2)}`;

    // Gráficos
    renderChart('chartByCategory', 'categoryId', 'Categoria', (id) => {
        const cat = state.categories.find(c => c.id === id);
        return cat ? `${cat.icon} ${cat.name}` : 'N/A';
    });

    renderChart('chartByLocation', 'locationId', 'Localização', (id) => {
        const loc = state.locations.find(l => l.id === id);
        return loc ? loc.name : 'Sem localização';
    });

    renderChart('chartByStatus', 'status', 'Status', (status) => getStatusLabel(status));
}

function renderChart(containerId, field, label, formatter) {
    const container = document.getElementById(containerId);
    const data = {};

    state.items.forEach(item => {
        const key = item[field] || 'none';
        data[key] = (data[key] || 0) + item.quantity;
    });

    if (Object.keys(data).length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">Sem dados</p>';
        return;
    }

    const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);

    container.innerHTML = sorted.map(([key, value]) => `
        <div class="chart-item">
            <div class="chart-label">${formatter(key)}</div>
            <div class="chart-value">${value}</div>
        </div>
    `).join('');
}

// ===== EXPORT/IMPORT =====
function exportJSON() {
    const data = {
        categories: state.categories,
        locations: state.locations,
        items: state.items,
        exportDate: new Date().toISOString()
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fp-inventory-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function exportCSV() {
    const headers = ['Nome', 'Categoria', 'Quantidade', 'Localização', 'Status', 'Tags'];
    const rows = state.items.map(item => {
        const category = state.categories.find(c => c.id === item.categoryId);
        const location = state.locations.find(l => l.id === item.locationId);

        return [
            item.name,
            category?.name || 'N/A',
            item.quantity,
            location?.name || 'N/A',
            getStatusLabel(item.status),
            item.tags ? item.tags.join('; ') : ''
        ];
    });

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fp-inventory-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

function importJSON(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);

            if (confirm('Deseja importar os dados? Isso irá SUBSTITUIR todos os dados atuais.')) {
                if (data.categories) state.categories = data.categories;
                if (data.locations) state.locations = data.locations;
                if (data.items) state.items = data.items;

                saveData('categories');
                saveData('locations');
                saveData('items');

                initializeUI();

                alert('Dados importados com sucesso!');
            }
        } catch (error) {
            alert('Erro ao importar arquivo: ' + error.message);
        }
    };
    reader.readAsText(file);
}

// ===== MODAIS =====
function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}
