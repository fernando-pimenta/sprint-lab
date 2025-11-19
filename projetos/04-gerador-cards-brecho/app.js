// ==========================================
// GERADOR DE CARDS DE PRODUTO - APP.JS
// Ferramenta para criar cards de produto visuais
// ==========================================

// Elementos do DOM
const elements = {
    // Campos de input
    productName: document.getElementById('productName'),
    productDescription: document.getElementById('productDescription'),
    productPrice: document.getElementById('productPrice'),
    productBadge: document.getElementById('productBadge'),
    buttonText: document.getElementById('buttonText'),
    buttonUrl: document.getElementById('buttonUrl'),

    // Cores
    cardBgColor: document.getElementById('cardBgColor'),
    cardBgColorText: document.getElementById('cardBgColorText'),
    textColor: document.getElementById('textColor'),
    textColorText: document.getElementById('textColorText'),
    buttonBgColor: document.getElementById('buttonBgColor'),
    buttonBgColorText: document.getElementById('buttonBgColorText'),
    buttonTextColor: document.getElementById('buttonTextColor'),
    buttonTextColorText: document.getElementById('buttonTextColorText'),

    // Botões de ação
    copyHtmlBtn: document.getElementById('copyHtmlBtn'),
    copyCssBtn: document.getElementById('copyCssBtn'),
    exportConfigBtn: document.getElementById('exportConfigBtn'),
    importConfigBtn: document.getElementById('importConfigBtn'),
    importFile: document.getElementById('importFile'),

    // Card preview
    productCard: document.getElementById('productCard'),
    cardBadge: document.querySelector('.product-badge'),
    cardName: document.querySelector('.product-name'),
    cardDescription: document.querySelector('.product-description'),
    cardPrice: document.querySelector('.product-price'),
    cardButton: document.querySelector('.product-button')
};

// ==========================================
// INICIALIZAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeDefaults();
    setupEventListeners();
    updatePreview();
});

/**
 * Define valores padrão iniciais
 */
function initializeDefaults() {
    elements.productName.value = 'iPhone 13 Pro Max 256GB';
    elements.productDescription.value = 'Seminovo em excelente estado. Completo na caixa com todos os acessórios originais.';
    elements.productPrice.value = 'R$ 4.999,00';
    elements.productBadge.value = 'OFERTA';
    elements.buttonText.value = 'Ver Oferta';
    elements.buttonUrl.value = '#';
}

// ==========================================
// EVENT LISTENERS
// ==========================================

/**
 * Configura todos os event listeners
 */
function setupEventListeners() {
    // Inputs de texto - atualizam preview em tempo real
    elements.productName.addEventListener('input', updatePreview);
    elements.productDescription.addEventListener('input', updatePreview);
    elements.productPrice.addEventListener('input', updatePreview);
    elements.productBadge.addEventListener('change', updatePreview);
    elements.buttonText.addEventListener('input', updatePreview);
    elements.buttonUrl.addEventListener('input', updatePreview);

    // Cores - sincroniza color picker com input de texto
    setupColorSync(elements.cardBgColor, elements.cardBgColorText);
    setupColorSync(elements.textColor, elements.textColorText);
    setupColorSync(elements.buttonBgColor, elements.buttonBgColorText);
    setupColorSync(elements.buttonTextColor, elements.buttonTextColorText);

    // Botões de ação
    elements.copyHtmlBtn.addEventListener('click', copyHtml);
    elements.copyCssBtn.addEventListener('click', copyCss);
    elements.exportConfigBtn.addEventListener('click', exportConfig);
    elements.importConfigBtn.addEventListener('click', () => elements.importFile.click());
    elements.importFile.addEventListener('change', importConfig);
}

/**
 * Sincroniza color picker com input de texto
 */
function setupColorSync(colorInput, textInput) {
    // Quando o color picker muda
    colorInput.addEventListener('input', (e) => {
        textInput.value = e.target.value;
        updatePreview();
    });

    // Quando o input de texto muda
    textInput.addEventListener('input', (e) => {
        const value = e.target.value;
        // Valida se é uma cor hexadecimal válida
        if (/^#[0-9A-F]{6}$/i.test(value)) {
            colorInput.value = value;
            updatePreview();
        }
    });

    // Atualiza ao perder foco
    textInput.addEventListener('blur', (e) => {
        const value = e.target.value;
        if (/^#[0-9A-F]{6}$/i.test(value)) {
            colorInput.value = value;
            updatePreview();
        } else {
            // Se inválido, restaura o valor do color picker
            textInput.value = colorInput.value;
        }
    });
}

// ==========================================
// ATUALIZAÇÃO DO PREVIEW
// ==========================================

/**
 * Atualiza o preview do card em tempo real
 */
function updatePreview() {
    // Atualiza conteúdo do card
    elements.cardName.textContent = elements.productName.value || 'Nome do Produto';
    elements.cardDescription.textContent = elements.productDescription.value || 'Descrição do produto aparecerá aqui...';
    elements.cardPrice.textContent = elements.productPrice.value || 'R$ 0,00';
    elements.cardButton.textContent = elements.buttonText.value || 'Ver Oferta';
    elements.cardButton.href = elements.buttonUrl.value || '#';

    // Atualiza badge
    const badgeValue = elements.productBadge.value;
    if (badgeValue) {
        elements.cardBadge.textContent = badgeValue;
        elements.cardBadge.classList.add('active');
    } else {
        elements.cardBadge.classList.remove('active');
    }

    // Atualiza cores
    const cardBgColor = elements.cardBgColorText.value;
    const textColor = elements.textColorText.value;
    const buttonBgColor = elements.buttonBgColorText.value;
    const buttonTextColor = elements.buttonTextColorText.value;

    elements.productCard.style.backgroundColor = cardBgColor;
    elements.cardName.style.color = textColor;
    elements.cardDescription.style.color = textColor;
    elements.cardPrice.style.color = textColor;
    elements.cardButton.style.backgroundColor = buttonBgColor;
    elements.cardButton.style.color = buttonTextColor;
}

// ==========================================
// GERAÇÃO DE CÓDIGO
// ==========================================

/**
 * Gera o HTML do card
 */
function generateHtml() {
    const name = elements.productName.value || 'Nome do Produto';
    const description = elements.productDescription.value || 'Descrição do produto';
    const price = elements.productPrice.value || 'R$ 0,00';
    const badge = elements.productBadge.value;
    const buttonText = elements.buttonText.value || 'Ver Oferta';
    const buttonUrl = elements.buttonUrl.value || '#';
    const cardBgColor = elements.cardBgColorText.value;
    const textColor = elements.textColorText.value;
    const buttonBgColor = elements.buttonBgColorText.value;
    const buttonTextColor = elements.buttonTextColorText.value;

    // Gera o badge HTML se existir
    const badgeHtml = badge
        ? `    <div class="product-badge">${escapeHtml(badge)}</div>\n`
        : '';

    return `<div class="product-card" style="background-color: ${cardBgColor};">
${badgeHtml}    <div class="product-content">
        <h3 class="product-name" style="color: ${textColor};">${escapeHtml(name)}</h3>
        <p class="product-description" style="color: ${textColor};">${escapeHtml(description)}</p>
        <div class="product-price" style="color: ${textColor};">${escapeHtml(price)}</div>
        <a href="${escapeHtml(buttonUrl)}" class="product-button" style="background-color: ${buttonBgColor}; color: ${buttonTextColor};">${escapeHtml(buttonText)}</a>
    </div>
</div>`;
}

/**
 * Gera o CSS base para o card
 */
function generateCss() {
    return `.product-card {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 350px;
    width: 100%;
    overflow: hidden;
    position: relative;
    transition: transform 0.3s;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.product-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background-color: #ef4444;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    z-index: 10;
}

.product-content {
    padding: 2rem;
}

.product-name {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    line-height: 1.3;
}

.product-description {
    font-size: 0.95rem;
    color: #6b7280;
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.product-price {
    font-size: 2rem;
    font-weight: bold;
    color: #10b981;
    margin-bottom: 1.5rem;
}

.product-button {
    display: block;
    width: 100%;
    padding: 1rem;
    background-color: #f59e0b;
    color: white;
    text-align: center;
    text-decoration: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    transition: all 0.2s;
}

.product-button:hover {
    opacity: 0.9;
    transform: scale(1.02);
}`;
}

// ==========================================
// AÇÕES DE CÓPIA
// ==========================================

/**
 * Copia o HTML do card para a área de transferência
 */
async function copyHtml() {
    const html = generateHtml();

    try {
        await navigator.clipboard.writeText(html);
        showNotification('✅ HTML copiado com sucesso!');
    } catch (error) {
        console.error('Erro ao copiar HTML:', error);
        // Fallback para método antigo
        fallbackCopyText(html);
    }
}

/**
 * Copia o CSS base para a área de transferência
 */
async function copyCss() {
    const css = generateCss();

    try {
        await navigator.clipboard.writeText(css);
        showNotification('✅ CSS copiado com sucesso!');
    } catch (error) {
        console.error('Erro ao copiar CSS:', error);
        fallbackCopyText(css);
    }
}

/**
 * Método fallback para copiar texto (navegadores antigos)
 */
function fallbackCopyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        showNotification('✅ Copiado com sucesso!');
    } catch (error) {
        showNotification('❌ Erro ao copiar. Tente novamente.');
    }

    document.body.removeChild(textarea);
}

// ==========================================
// EXPORTAR / IMPORTAR
// ==========================================

/**
 * Exporta a configuração atual em JSON
 */
function exportConfig() {
    const config = {
        productName: elements.productName.value,
        productDescription: elements.productDescription.value,
        productPrice: elements.productPrice.value,
        productBadge: elements.productBadge.value,
        buttonText: elements.buttonText.value,
        buttonUrl: elements.buttonUrl.value,
        cardBgColor: elements.cardBgColorText.value,
        textColor: elements.textColorText.value,
        buttonBgColor: elements.buttonBgColorText.value,
        buttonTextColor: elements.buttonTextColorText.value
    };

    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `card-config-${formatDateForFilename()}.json`;
    link.click();

    URL.revokeObjectURL(url);

    showNotification('✅ Configuração exportada com sucesso!');
}

/**
 * Importa configuração de um arquivo JSON
 */
function importConfig(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
        try {
            const config = JSON.parse(event.target.result);

            // Aplica a configuração importada
            elements.productName.value = config.productName || '';
            elements.productDescription.value = config.productDescription || '';
            elements.productPrice.value = config.productPrice || '';
            elements.productBadge.value = config.productBadge || '';
            elements.buttonText.value = config.buttonText || '';
            elements.buttonUrl.value = config.buttonUrl || '';

            // Aplica cores
            if (config.cardBgColor) {
                elements.cardBgColor.value = config.cardBgColor;
                elements.cardBgColorText.value = config.cardBgColor;
            }
            if (config.textColor) {
                elements.textColor.value = config.textColor;
                elements.textColorText.value = config.textColor;
            }
            if (config.buttonBgColor) {
                elements.buttonBgColor.value = config.buttonBgColor;
                elements.buttonBgColorText.value = config.buttonBgColor;
            }
            if (config.buttonTextColor) {
                elements.buttonTextColor.value = config.buttonTextColor;
                elements.buttonTextColorText.value = config.buttonTextColor;
            }

            // Atualiza o preview
            updatePreview();

            showNotification('✅ Configuração importada com sucesso!');

        } catch (error) {
            console.error('Erro ao importar:', error);
            showNotification('❌ Erro ao importar arquivo. Verifique o formato.');
        }
    };

    reader.readAsText(file);

    // Reseta o input
    e.target.value = '';
}

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

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
 * Formata data para nome de arquivo
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

/**
 * Mostra notificação temporária
 */
function showNotification(message) {
    // Verifica se já existe uma notificação
    let notification = document.querySelector('.notification');

    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        document.body.appendChild(notification);
    }

    notification.textContent = message;

    // Ajusta cor de fundo baseado no tipo de mensagem
    if (message.includes('❌')) {
        notification.style.backgroundColor = '#ef4444';
    } else {
        notification.style.backgroundColor = '#10b981';
    }

    // Remove após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Adiciona animações CSS para notificação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
