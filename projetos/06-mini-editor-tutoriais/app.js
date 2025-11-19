// ==========================================
// MINI EDITOR DE TUTORIAIS - APP.JS
// Editor de tutoriais passo a passo com exportação em Markdown
// ==========================================

// Constantes
const STORAGE_KEY = 'fp_howto_editor';
let tutorials = [];
let editingTutorialId = null;
let currentTutorialId = null;

// ==========================================
// ELEMENTOS DO DOM
// ==========================================
const elements = {
    // Sidebar
    tutorialsList: document.getElementById('tutorialsList'),
    emptyState: document.getElementById('emptyState'),
    newTutorialBtn: document.getElementById('newTutorialBtn'),

    // Editor
    editorPlaceholder: document.getElementById('editorPlaceholder'),
    editorForm: document.getElementById('editorForm'),
    editorTitle: document.getElementById('editorTitle'),
    tutorialForm: document.getElementById('tutorialForm'),
    closeEditorBtn: document.getElementById('closeEditorBtn'),

    // Campos do formulário
    tutorialId: document.getElementById('tutorialId'),
    tutorialTitle: document.getElementById('tutorialTitle'),
    tutorialCategory: document.getElementById('tutorialCategory'),
    tutorialLevel: document.getElementById('tutorialLevel'),
    tutorialNotes: document.getElementById('tutorialNotes'),

    // Passos
    stepsContainer: document.getElementById('stepsContainer'),
    addStepBtn: document.getElementById('addStepBtn'),

    // Botões
    saveTutorialBtn: document.getElementById('saveTutorialBtn'),
    cancelBtn: document.getElementById('cancelBtn')
};

// ==========================================
// INICIALIZAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadTutorialsFromStorage();
    renderTutorialsList();
    setupEventListeners();
});

// ==========================================
// CONFIGURAÇÃO DE EVENT LISTENERS
// ==========================================
function setupEventListeners() {
    // Botões principais
    elements.newTutorialBtn.addEventListener('click', openNewTutorial);
    elements.closeEditorBtn.addEventListener('click', closeEditor);
    elements.cancelBtn.addEventListener('click', closeEditor);

    // Formulário
    elements.tutorialForm.addEventListener('submit', handleFormSubmit);

    // Gerenciamento de passos
    elements.addStepBtn.addEventListener('click', addStep);
}

// ==========================================
// GERENCIAMENTO DE DADOS (localStorage)
// ==========================================

/**
 * Carrega os tutoriais do localStorage
 */
function loadTutorialsFromStorage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            tutorials = JSON.parse(stored);
        }
    } catch (error) {
        console.error('Erro ao carregar tutoriais do localStorage:', error);
        tutorials = [];
    }
}

/**
 * Salva os tutoriais no localStorage
 */
function saveTutorialsToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tutorials));
    } catch (error) {
        console.error('Erro ao salvar tutoriais no localStorage:', error);
        alert('Erro ao salvar dados. Verifique se há espaço disponível no navegador.');
    }
}

// ==========================================
// INTERFACE - EDITOR
// ==========================================

/**
 * Abre o editor para novo tutorial
 */
function openNewTutorial() {
    editingTutorialId = null;
    currentTutorialId = null;

    // Reseta o formulário
    elements.tutorialForm.reset();
    elements.tutorialId.value = '';

    // Limpa passos e adiciona um inicial
    elements.stepsContainer.innerHTML = '';
    addStep();

    // Atualiza interface
    elements.editorTitle.textContent = 'Novo Tutorial';
    elements.saveTutorialBtn.textContent = '💾 Salvar Tutorial';

    // Mostra o editor
    showEditor();

    // Remove seleção da lista
    document.querySelectorAll('.tutorial-item').forEach(item => {
        item.classList.remove('active');
    });
}

/**
 * Abre o editor para editar tutorial
 */
function openEditTutorial(id) {
    const tutorial = getTutorialById(id);
    if (!tutorial) return;

    editingTutorialId = id;
    currentTutorialId = id;

    // Preenche o formulário
    elements.tutorialId.value = tutorial.id;
    elements.tutorialTitle.value = tutorial.title;
    elements.tutorialCategory.value = tutorial.category;
    elements.tutorialLevel.value = tutorial.level;
    elements.tutorialNotes.value = tutorial.notes || '';

    // Preenche os passos
    elements.stepsContainer.innerHTML = '';
    tutorial.steps.forEach((step, index) => {
        addStep(step);
    });

    // Se não houver passos, adiciona um
    if (tutorial.steps.length === 0) {
        addStep();
    }

    // Atualiza interface
    elements.editorTitle.textContent = 'Editar Tutorial';
    elements.saveTutorialBtn.textContent = '💾 Atualizar Tutorial';

    // Mostra o editor
    showEditor();

    // Marca como ativo na lista
    updateActiveItem(id);
}

/**
 * Mostra o painel do editor
 */
function showEditor() {
    elements.editorPlaceholder.style.display = 'none';
    elements.editorForm.style.display = 'block';
}

/**
 * Fecha o editor
 */
function closeEditor() {
    elements.editorPlaceholder.style.display = 'flex';
    elements.editorForm.style.display = 'none';
    currentTutorialId = null;
    editingTutorialId = null;

    // Remove seleção da lista
    document.querySelectorAll('.tutorial-item').forEach(item => {
        item.classList.remove('active');
    });
}

// ==========================================
// GERENCIAMENTO DE PASSOS
// ==========================================

/**
 * Adiciona um novo passo ao tutorial
 */
function addStep(content = '') {
    const stepNumber = elements.stepsContainer.children.length + 1;

    const stepItem = document.createElement('div');
    stepItem.className = 'step-item';
    stepItem.innerHTML = `
        <div class="step-number">${stepNumber}</div>
        <div class="step-input">
            <textarea placeholder="Descreva este passo..." rows="3">${escapeHtml(content)}</textarea>
        </div>
        <button type="button" class="step-remove" onclick="removeStep(this)">✕</button>
    `;

    elements.stepsContainer.appendChild(stepItem);
}

/**
 * Remove um passo do tutorial
 */
function removeStep(button) {
    const stepItem = button.closest('.step-item');
    stepItem.remove();

    // Renumera os passos
    renumberSteps();
}

/**
 * Renumera os passos após adicionar ou remover
 */
function renumberSteps() {
    const steps = elements.stepsContainer.querySelectorAll('.step-item');
    steps.forEach((step, index) => {
        const numberElement = step.querySelector('.step-number');
        numberElement.textContent = index + 1;
    });
}

/**
 * Coleta os passos do formulário
 */
function collectSteps() {
    const steps = [];
    const stepInputs = elements.stepsContainer.querySelectorAll('.step-input textarea');

    stepInputs.forEach(input => {
        const value = input.value.trim();
        if (value) {
            steps.push(value);
        }
    });

    return steps;
}

// ==========================================
// MANIPULAÇÃO DE FORMULÁRIO
// ==========================================

/**
 * Lida com o envio do formulário
 */
function handleFormSubmit(e) {
    e.preventDefault();

    // Coleta os passos
    const steps = collectSteps();

    if (steps.length === 0) {
        alert('Adicione pelo menos um passo ao tutorial!');
        return;
    }

    // Captura os valores do formulário
    const tutorialData = {
        id: editingTutorialId || generateId(),
        title: elements.tutorialTitle.value.trim(),
        category: elements.tutorialCategory.value,
        level: elements.tutorialLevel.value,
        steps: steps,
        notes: elements.tutorialNotes.value.trim(),
        createdAt: editingTutorialId ? getTutorialById(editingTutorialId).createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Adiciona ou atualiza o tutorial
    if (editingTutorialId) {
        updateTutorial(tutorialData);
    } else {
        addTutorial(tutorialData);
    }

    // Atualiza a interface
    renderTutorialsList();
    closeEditor();
}

/**
 * Adiciona um novo tutorial
 */
function addTutorial(tutorialData) {
    tutorials.push(tutorialData);
    saveTutorialsToStorage();
}

/**
 * Atualiza um tutorial existente
 */
function updateTutorial(tutorialData) {
    const index = tutorials.findIndex(t => t.id === tutorialData.id);
    if (index !== -1) {
        tutorials[index] = tutorialData;
        saveTutorialsToStorage();
    }
}

/**
 * Remove um tutorial
 */
function deleteTutorial(id) {
    if (confirm('Tem certeza que deseja excluir este tutorial?')) {
        tutorials = tutorials.filter(t => t.id !== id);
        saveTutorialsToStorage();
        renderTutorialsList();

        // Se estava editando este tutorial, fecha o editor
        if (currentTutorialId === id) {
            closeEditor();
        }
    }
}

// ==========================================
// RENDERIZAÇÃO
// ==========================================

/**
 * Renderiza a lista de tutoriais na sidebar
 */
function renderTutorialsList() {
    // Se não houver tutoriais, mostra estado vazio
    if (tutorials.length === 0) {
        elements.tutorialsList.style.display = 'none';
        elements.emptyState.style.display = 'block';
        return;
    }

    elements.tutorialsList.style.display = 'flex';
    elements.emptyState.style.display = 'none';

    // Ordena tutoriais por data de atualização (mais recentes primeiro)
    const sortedTutorials = [...tutorials].sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    // Renderiza os itens
    elements.tutorialsList.innerHTML = sortedTutorials.map(tutorial =>
        createTutorialItem(tutorial)
    ).join('');
}

/**
 * Cria o HTML de um item na lista
 */
function createTutorialItem(tutorial) {
    const isActive = currentTutorialId === tutorial.id ? 'active' : '';
    const levelClass = tutorial.level.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return `
        <div class="tutorial-item ${isActive}" onclick="openEditTutorial('${tutorial.id}')">
            <div class="tutorial-item-title">${escapeHtml(tutorial.title)}</div>
            <div class="tutorial-item-meta">
                <span class="tutorial-badge badge-category">${escapeHtml(tutorial.category)}</span>
                <span class="tutorial-badge badge-level ${levelClass}">${escapeHtml(tutorial.level)}</span>
                <span class="tutorial-badge badge-category">${tutorial.steps.length} passos</span>
            </div>
            <div class="tutorial-actions">
                <button class="btn btn-primary btn-icon" onclick="event.stopPropagation(); exportToMarkdown('${tutorial.id}')">
                    📄 Markdown
                </button>
                <button class="btn btn-danger btn-icon" onclick="event.stopPropagation(); deleteTutorial('${tutorial.id}')">
                    🗑️ Excluir
                </button>
            </div>
        </div>
    `;
}

/**
 * Atualiza o item ativo na lista
 */
function updateActiveItem(id) {
    document.querySelectorAll('.tutorial-item').forEach(item => {
        item.classList.remove('active');
    });

    const activeItem = Array.from(document.querySelectorAll('.tutorial-item'))
        .find(item => item.onclick.toString().includes(id));

    if (activeItem) {
        activeItem.classList.add('active');
    }
}

// ==========================================
// EXPORTAÇÃO MARKDOWN
// ==========================================

/**
 * Exporta um tutorial para Markdown
 */
function exportToMarkdown(id) {
    const tutorial = getTutorialById(id);
    if (!tutorial) return;

    const markdown = generateMarkdown(tutorial);

    // Cria o blob e faz download
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sanitizeFilename(tutorial.title)}.md`;
    link.click();

    URL.revokeObjectURL(url);

    alert('✅ Tutorial exportado em Markdown com sucesso!');
}

/**
 * Gera o conteúdo Markdown do tutorial
 */
function generateMarkdown(tutorial) {
    let markdown = '';

    // Título
    markdown += `# ${tutorial.title}\n\n`;

    // Metadados
    markdown += `**Categoria:** ${tutorial.category}  \n`;
    markdown += `**Nível:** ${tutorial.level}  \n`;
    markdown += `**Passos:** ${tutorial.steps.length}  \n\n`;

    // Linha separadora
    markdown += `---\n\n`;

    // Passos
    markdown += `## Passos\n\n`;
    tutorial.steps.forEach((step, index) => {
        markdown += `### ${index + 1}. Passo ${index + 1}\n\n`;
        markdown += `${step}\n\n`;
    });

    // Notas finais (se houver)
    if (tutorial.notes && tutorial.notes.trim()) {
        markdown += `---\n\n`;
        markdown += `## Notas Finais\n\n`;
        markdown += `${tutorial.notes}\n\n`;
    }

    // Rodapé
    markdown += `---\n\n`;
    markdown += `*Tutorial criado em: ${formatDate(new Date(tutorial.createdAt))}*  \n`;
    markdown += `*Última atualização: ${formatDate(new Date(tutorial.updatedAt))}*  \n`;

    return markdown;
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
 * Busca um tutorial por ID
 */
function getTutorialById(id) {
    return tutorials.find(t => t.id === id);
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
 * Formata data para exibição
 */
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

/**
 * Sanitiza nome de arquivo
 */
function sanitizeFilename(filename) {
    return filename
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// ==========================================
// FUNÇÕES GLOBAIS (chamadas pelo HTML)
// ==========================================
window.openEditTutorial = openEditTutorial;
window.deleteTutorial = deleteTutorial;
window.exportToMarkdown = exportToMarkdown;
window.removeStep = removeStep;
