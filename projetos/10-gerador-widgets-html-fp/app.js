// ==================== ELEMENTOS DO DOM ====================
const elements = {
    widgetType: document.getElementById('widgetType'),
    widgetForm: document.getElementById('widgetForm'),
    widgetPreview: document.getElementById('widgetPreview'),
    htmlCode: document.getElementById('htmlCode'),
    cssCode: document.getElementById('cssCode'),
    copyHtmlBtn: document.getElementById('copyHtmlBtn'),
    copyCssBtn: document.getElementById('copyCssBtn'),
    toast: document.getElementById('toast')
};

// ==================== CONFIGURAÇÃO DOS WIDGETS ====================
const widgetConfigs = {
    card: {
        name: 'Card Simples',
        fields: [
            { id: 'title', label: 'Título', type: 'text', placeholder: 'Ex: Meu Card Especial' },
            { id: 'text', label: 'Texto', type: 'textarea', placeholder: 'Descrição do card...' },
            { id: 'buttonLabel', label: 'Texto do Botão', type: 'text', placeholder: 'Ex: Saiba Mais' },
            { id: 'buttonUrl', label: 'URL do Botão', type: 'text', placeholder: 'https://exemplo.com' }
        ]
    },
    highlight: {
        name: 'Box de Destaque',
        fields: [
            { id: 'icon', label: 'Ícone (emoji ou vazio)', type: 'text', placeholder: 'Ex: 🎉, 💡, ⚡' },
            { id: 'title', label: 'Título', type: 'text', placeholder: 'Ex: Destaque Importante!' },
            { id: 'text', label: 'Texto', type: 'textarea', placeholder: 'Mensagem do destaque...' }
        ]
    },
    grid: {
        name: 'Grid 3 Colunas',
        fields: 'dynamic' // Grid items será dinâmico
    },
    cta: {
        name: 'CTA (Chamada para Ação)',
        fields: [
            { id: 'title', label: 'Título Principal', type: 'text', placeholder: 'Ex: Comece Agora!' },
            { id: 'subtitle', label: 'Subtítulo', type: 'text', placeholder: 'Ex: Não perca essa oportunidade' },
            { id: 'buttonLabel', label: 'Texto do Botão', type: 'text', placeholder: 'Ex: Começar Grátis' },
            { id: 'buttonUrl', label: 'URL do Botão', type: 'text', placeholder: 'https://exemplo.com' }
        ]
    }
};

// ==================== ESTADO DA APLICAÇÃO ====================
let currentWidgetType = 'card';
let gridItems = [
    { title: 'Item 1', description: 'Descrição do item 1' },
    { title: 'Item 2', description: 'Descrição do item 2' },
    { title: 'Item 3', description: 'Descrição do item 3' }
];

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    attachEventListeners();
    renderForm();
    updateWidget();
});

// ==================== EVENT LISTENERS ====================
function attachEventListeners() {
    elements.widgetType.addEventListener('change', handleWidgetTypeChange);
    elements.copyHtmlBtn.addEventListener('click', () => copyToClipboard(elements.htmlCode.value, 'HTML'));
    elements.copyCssBtn.addEventListener('click', () => copyToClipboard(elements.cssCode.value, 'CSS'));
}

function handleWidgetTypeChange() {
    currentWidgetType = elements.widgetType.value;

    // Reset grid items ao mudar para grid
    if (currentWidgetType === 'grid') {
        gridItems = [
            { title: 'Item 1', description: 'Descrição do item 1' },
            { title: 'Item 2', description: 'Descrição do item 2' },
            { title: 'Item 3', description: 'Descrição do item 3' }
        ];
    }

    renderForm();
    updateWidget();
}

// ==================== RENDERIZAÇÃO DO FORMULÁRIO ====================
function renderForm() {
    const config = widgetConfigs[currentWidgetType];

    if (currentWidgetType === 'grid') {
        renderGridForm();
        return;
    }

    let formHtml = '';

    config.fields.forEach(field => {
        formHtml += `
            <div class="form-group">
                <label for="${field.id}">${field.label}</label>
                ${field.type === 'textarea'
                    ? `<textarea id="${field.id}" placeholder="${field.placeholder}"></textarea>`
                    : `<input type="${field.type}" id="${field.id}" placeholder="${field.placeholder}">`
                }
            </div>
        `;
    });

    elements.widgetForm.innerHTML = formHtml;

    // Adicionar listeners aos campos
    config.fields.forEach(field => {
        const element = document.getElementById(field.id);
        element.addEventListener('input', updateWidget);
    });
}

function renderGridForm() {
    let formHtml = `
        <div class="form-group">
            <label>Itens do Grid</label>
            <div class="grid-items-container" id="gridItemsContainer">
    `;

    gridItems.forEach((item, index) => {
        formHtml += `
            <div class="grid-item" data-index="${index}">
                <div class="grid-item-header">
                    <span class="grid-item-label">Item ${index + 1}</span>
                    <button type="button" class="remove-item-btn" onclick="removeGridItem(${index})">✕</button>
                </div>
                <div class="form-group">
                    <input type="text" class="grid-item-title" data-index="${index}" value="${escapeHtml(item.title)}" placeholder="Título do item">
                </div>
                <div class="form-group">
                    <textarea class="grid-item-description" data-index="${index}" placeholder="Descrição do item">${escapeHtml(item.description)}</textarea>
                </div>
            </div>
        `;
    });

    formHtml += `
            </div>
            <button type="button" class="add-item-btn" onclick="addGridItem()">➕ Adicionar Item</button>
        </div>
    `;

    elements.widgetForm.innerHTML = formHtml;

    // Adicionar listeners
    document.querySelectorAll('.grid-item-title, .grid-item-description').forEach(el => {
        el.addEventListener('input', handleGridItemChange);
    });
}

function handleGridItemChange(e) {
    const index = parseInt(e.target.dataset.index);
    const isTitle = e.target.classList.contains('grid-item-title');

    if (isTitle) {
        gridItems[index].title = e.target.value;
    } else {
        gridItems[index].description = e.target.value;
    }

    updateWidget();
}

function addGridItem() {
    gridItems.push({
        title: `Item ${gridItems.length + 1}`,
        description: `Descrição do item ${gridItems.length + 1}`
    });
    renderGridForm();
    updateWidget();
}

function removeGridItem(index) {
    if (gridItems.length > 1) {
        gridItems.splice(index, 1);
        renderGridForm();
        updateWidget();
    } else {
        showToast('⚠️ Mantenha pelo menos 1 item no grid', 'error');
    }
}

// ==================== GERAÇÃO DOS WIDGETS ====================
function updateWidget() {
    const data = getFormData();

    // Gerar HTML
    const html = generateHTML(currentWidgetType, data);
    elements.htmlCode.value = html;

    // Gerar preview
    elements.widgetPreview.innerHTML = html;

    // Gerar CSS
    const css = generateCSS(currentWidgetType);
    elements.cssCode.value = css;
}

function getFormData() {
    const data = {};

    if (currentWidgetType === 'grid') {
        data.items = gridItems;
        return data;
    }

    const config = widgetConfigs[currentWidgetType];
    config.fields.forEach(field => {
        const element = document.getElementById(field.id);
        data[field.id] = element ? element.value : '';
    });

    return data;
}

// ==================== GERADORES DE HTML ====================
function generateHTML(type, data) {
    switch(type) {
        case 'card':
            return generateCardHTML(data);
        case 'highlight':
            return generateHighlightHTML(data);
        case 'grid':
            return generateGridHTML(data);
        case 'cta':
            return generateCTAHTML(data);
        default:
            return '';
    }
}

function generateCardHTML(data) {
    return `<!-- Card Simples -->
<div class="fp-card">
    <h3>${escapeHtml(data.title || 'Título do Card')}</h3>
    <p>${escapeHtml(data.text || 'Texto do card vai aqui. Descreva o conteúdo de forma clara e objetiva.')}</p>
    <a href="${escapeHtml(data.buttonUrl || '#')}" class="fp-btn">${escapeHtml(data.buttonLabel || 'Saiba Mais')}</a>
</div>`;
}

function generateHighlightHTML(data) {
    const iconHtml = data.icon ? `<span class="fp-highlight-icon">${escapeHtml(data.icon)}</span>` : '';

    return `<!-- Box de Destaque -->
<div class="fp-highlight">
    <div class="fp-highlight-header">
        ${iconHtml}
        <h3>${escapeHtml(data.title || 'Destaque Importante')}</h3>
    </div>
    <p>${escapeHtml(data.text || 'Mensagem de destaque. Use para chamar atenção para informações importantes.')}</p>
</div>`;
}

function generateGridHTML(data) {
    const itemsHTML = data.items.map(item => `
        <div class="fp-grid-item">
            <h4>${escapeHtml(item.title)}</h4>
            <p>${escapeHtml(item.description)}</p>
        </div>
    `).join('');

    return `<!-- Grid 3 Colunas -->
<div class="fp-grid">
    ${itemsHTML}
</div>`;
}

function generateCTAHTML(data) {
    return `<!-- CTA (Chamada para Ação) -->
<div class="fp-cta">
    <h2>${escapeHtml(data.title || 'Comece Agora!')}</h2>
    <p>${escapeHtml(data.subtitle || 'Não perca essa oportunidade incrível')}</p>
    <a href="${escapeHtml(data.buttonUrl || '#')}" class="fp-btn">${escapeHtml(data.buttonLabel || 'Começar Grátis')}</a>
</div>`;
}

// ==================== GERADORES DE CSS ====================
function generateCSS(type) {
    switch(type) {
        case 'card':
            return `/* Card Simples */
.fp-card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.fp-card h3 {
    margin-bottom: 0.75rem;
    color: #1f2937;
    font-size: 1.25rem;
}

.fp-card p {
    margin-bottom: 1rem;
    color: #6b7280;
    line-height: 1.6;
}

.fp-card .fp-btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #f59e0b;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    transition: background-color 0.3s;
}

.fp-card .fp-btn:hover {
    background-color: #d97706;
}`;

        case 'highlight':
            return `/* Box de Destaque */
.fp-highlight {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    border-left: 4px solid #f59e0b;
    border-radius: 8px;
    padding: 1.5rem;
}

.fp-highlight-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
}

.fp-highlight-icon {
    font-size: 2rem;
}

.fp-highlight h3 {
    color: #92400e;
    font-size: 1.25rem;
    margin: 0;
}

.fp-highlight p {
    color: #78350f;
    line-height: 1.6;
    margin: 0;
}`;

        case 'grid':
            return `/* Grid 3 Colunas */
.fp-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}

.fp-grid-item {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.fp-grid-item h4 {
    color: #1f2937;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
}

.fp-grid-item p {
    color: #6b7280;
    line-height: 1.6;
    margin: 0;
}

/* Responsivo */
@media (max-width: 1024px) {
    .fp-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .fp-grid {
        grid-template-columns: 1fr;
    }
}`;

        case 'cta':
            return `/* CTA (Chamada para Ação) */
.fp-cta {
    background: linear-gradient(135deg, #f59e0b 0%, #fb923c 100%);
    border-radius: 12px;
    padding: 2.5rem;
    text-align: center;
    box-shadow: 0 10px 25px rgba(245, 158, 11, 0.3);
}

.fp-cta h2 {
    color: white;
    font-size: 2rem;
    margin-bottom: 1rem;
}

.fp-cta p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
}

.fp-cta .fp-btn {
    display: inline-block;
    padding: 1rem 2rem;
    background-color: white;
    color: #f59e0b;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: background-color 0.3s;
}

.fp-cta .fp-btn:hover {
    background-color: #fef3c7;
}`;

        default:
            return '';
    }
}

// ==================== COPIAR PARA CLIPBOARD ====================
function copyToClipboard(text, type) {
    if (!text || text.trim() === '') {
        showToast('⚠️ Nada para copiar', 'error');
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => {
            showToast(`✅ ${type} copiado para a área de transferência!`);
        })
        .catch(err => {
            console.error('Erro ao copiar:', err);
            fallbackCopyToClipboard(text, type);
        });
}

function fallbackCopyToClipboard(text, type) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        showToast(`✅ ${type} copiado para a área de transferência!`);
    } catch (err) {
        showToast('❌ Erro ao copiar', 'error');
    }

    document.body.removeChild(textarea);
}

// ==================== FUNÇÕES AUXILIARES ====================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
window.addGridItem = addGridItem;
window.removeGridItem = removeGridItem;
