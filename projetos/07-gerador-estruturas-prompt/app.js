// ==================== CONSTANTES E CONFIGURAÇÕES ====================
const STORAGE_KEY = 'fp_prompt_templates';

// Estado da aplicação
let templates = [];
let currentTemplateId = null;
let isEditMode = false;

// ==================== ELEMENTOS DO DOM ====================
const elements = {
    // Header
    exportBtn: document.getElementById('exportBtn'),
    importBtn: document.getElementById('importBtn'),
    importFile: document.getElementById('importFile'),

    // Sidebar
    newTemplateBtn: document.getElementById('newTemplateBtn'),
    templatesList: document.getElementById('templatesList'),

    // Editor
    editorTitle: document.getElementById('editorTitle'),
    saveBtn: document.getElementById('saveBtn'),
    cancelBtn: document.getElementById('cancelBtn'),
    templateForm: document.getElementById('templateForm'),
    agentName: document.getElementById('agentName'),
    objective: document.getElementById('objective'),
    tone: document.getElementById('tone'),
    context: document.getElementById('context'),
    placeholders: document.getElementById('placeholders'),
    instructions: document.getElementById('instructions'),

    // Preview
    copyBtn: document.getElementById('copyBtn'),
    promptPreview: document.getElementById('promptPreview'),

    // Modal
    deleteModal: document.getElementById('deleteModal'),
    confirmDeleteBtn: document.getElementById('confirmDeleteBtn'),
    cancelDeleteBtn: document.getElementById('cancelDeleteBtn'),

    // Toast
    toast: document.getElementById('toast')
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    loadTemplates();
    renderTemplatesList();
    attachEventListeners();
    updatePreview(); // Preview inicial vazio
});

// ==================== EVENT LISTENERS ====================
function attachEventListeners() {
    // Header
    elements.exportBtn.addEventListener('click', exportTemplates);
    elements.importBtn.addEventListener('click', () => elements.importFile.click());
    elements.importFile.addEventListener('change', importTemplates);

    // Sidebar
    elements.newTemplateBtn.addEventListener('click', newTemplate);

    // Editor
    elements.saveBtn.addEventListener('click', saveTemplate);
    elements.cancelBtn.addEventListener('click', cancelEdit);

    // Atualizar preview em tempo real
    const formInputs = [
        elements.agentName,
        elements.objective,
        elements.tone,
        elements.context,
        elements.placeholders,
        elements.instructions
    ];
    formInputs.forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    // Preview
    elements.copyBtn.addEventListener('click', copyPromptToClipboard);

    // Modal
    elements.cancelDeleteBtn.addEventListener('click', closeDeleteModal);
}

// ==================== FUNÇÕES DE ARMAZENAMENTO ====================
function loadTemplates() {
    const stored = localStorage.getItem(STORAGE_KEY);
    templates = stored ? JSON.parse(stored) : [];
}

function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
}

// ==================== FUNÇÕES DE TEMPLATE ====================
function newTemplate() {
    isEditMode = false;
    currentTemplateId = null;
    elements.editorTitle.textContent = '✏️ Novo Template';
    elements.saveBtn.textContent = '💾 Salvar Template';
    elements.cancelBtn.style.display = 'none';
    elements.templateForm.reset();
    updatePreview();
    clearActiveTemplate();
}

function saveTemplate(e) {
    e.preventDefault();

    // Validação
    if (!elements.agentName.value.trim()) {
        showToast('⚠️ Nome do agente é obrigatório', 'error');
        elements.agentName.focus();
        return;
    }

    if (!elements.objective.value.trim()) {
        showToast('⚠️ Objetivo do agente é obrigatório', 'error');
        elements.objective.focus();
        return;
    }

    if (!elements.tone.value) {
        showToast('⚠️ Selecione um tom de voz', 'error');
        elements.tone.focus();
        return;
    }

    // Criar objeto do template
    const template = {
        id: currentTemplateId || generateId(),
        agentName: elements.agentName.value.trim(),
        objective: elements.objective.value.trim(),
        tone: elements.tone.value,
        context: elements.context.value.trim(),
        placeholders: elements.placeholders.value.trim(),
        instructions: elements.instructions.value.trim(),
        createdAt: currentTemplateId ? getTemplateById(currentTemplateId).createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Salvar ou atualizar
    if (isEditMode) {
        const index = templates.findIndex(t => t.id === currentTemplateId);
        templates[index] = template;
        showToast('✅ Template atualizado com sucesso!');
    } else {
        templates.unshift(template);
        showToast('✅ Template criado com sucesso!');
    }

    saveToStorage();
    renderTemplatesList();
    loadTemplateToEditor(template.id);
}

function loadTemplateToEditor(id) {
    const template = getTemplateById(id);
    if (!template) return;

    isEditMode = true;
    currentTemplateId = id;

    elements.editorTitle.textContent = '✏️ Editar Template';
    elements.saveBtn.textContent = '💾 Atualizar Template';
    elements.cancelBtn.style.display = 'inline-flex';

    elements.agentName.value = template.agentName;
    elements.objective.value = template.objective;
    elements.tone.value = template.tone;
    elements.context.value = template.context || '';
    elements.placeholders.value = template.placeholders || '';
    elements.instructions.value = template.instructions || '';

    updatePreview();
    setActiveTemplate(id);
}

function cancelEdit() {
    if (currentTemplateId) {
        loadTemplateToEditor(currentTemplateId);
    } else {
        newTemplate();
    }
}

function getTemplateById(id) {
    return templates.find(t => t.id === id);
}

// ==================== FUNÇÕES DE EXCLUSÃO ====================
let templateToDelete = null;

function deleteTemplate(id) {
    templateToDelete = id;
    elements.deleteModal.classList.add('show');

    // Adicionar listener apenas uma vez
    elements.confirmDeleteBtn.onclick = () => {
        templates = templates.filter(t => t.id !== templateToDelete);
        saveToStorage();
        renderTemplatesList();
        closeDeleteModal();
        showToast('🗑️ Template excluído com sucesso!');

        // Se era o template ativo, limpar editor
        if (currentTemplateId === templateToDelete) {
            newTemplate();
        }
    };
}

function closeDeleteModal() {
    elements.deleteModal.classList.remove('show');
    templateToDelete = null;
}

// ==================== RENDERIZAÇÃO ====================
function renderTemplatesList() {
    if (templates.length === 0) {
        elements.templatesList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <div class="empty-state-text">Nenhum template ainda.<br>Crie seu primeiro!</div>
            </div>
        `;
        return;
    }

    elements.templatesList.innerHTML = templates.map(template => `
        <div class="template-item ${currentTemplateId === template.id ? 'active' : ''}" data-id="${template.id}">
            <div class="template-item-header">
                <div>
                    <div class="template-item-name">${escapeHtml(template.agentName)}</div>
                    <div class="template-item-tone">🎭 ${escapeHtml(template.tone)}</div>
                </div>
                <button class="template-item-delete" data-id="${template.id}" title="Excluir template">
                    🗑️
                </button>
            </div>
            <div class="template-item-date">
                Atualizado: ${formatDate(template.updatedAt)}
            </div>
        </div>
    `).join('');

    // Event listeners para os itens
    document.querySelectorAll('.template-item').forEach(item => {
        const id = item.dataset.id;
        item.addEventListener('click', (e) => {
            // Não carregar se clicou no botão de excluir
            if (e.target.closest('.template-item-delete')) return;
            loadTemplateToEditor(id);
        });
    });

    // Event listeners para os botões de excluir
    document.querySelectorAll('.template-item-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTemplate(btn.dataset.id);
        });
    });
}

function setActiveTemplate(id) {
    document.querySelectorAll('.template-item').forEach(item => {
        item.classList.toggle('active', item.dataset.id === id);
    });
}

function clearActiveTemplate() {
    document.querySelectorAll('.template-item').forEach(item => {
        item.classList.remove('active');
    });
}

// ==================== PREVIEW DO PROMPT ====================
function updatePreview() {
    const prompt = generatePrompt();
    elements.promptPreview.value = prompt;
}

function generatePrompt() {
    const agentName = elements.agentName.value.trim();
    const objective = elements.objective.value.trim();
    const tone = elements.tone.value;
    const context = elements.context.value.trim();
    const placeholders = elements.placeholders.value.trim();
    const instructions = elements.instructions.value.trim();

    // Se não tem dados básicos, retorna mensagem
    if (!agentName && !objective && !tone) {
        return 'Preencha os campos acima para ver o preview do prompt...';
    }

    // Construir o prompt
    let prompt = '';

    // Nome do agente
    if (agentName) {
        prompt += `# ${agentName}\n\n`;
    }

    // Objetivo
    if (objective) {
        prompt += `## Objetivo\n\n${objective}\n\n`;
    }

    // Tom de voz
    if (tone) {
        prompt += `## Tom de Voz\n\n${tone}\n\n`;
    }

    // Contexto fixo
    if (context) {
        prompt += `## Contexto\n\n${context}\n\n`;
    }

    // Campos dinâmicos / Placeholders
    if (placeholders) {
        prompt += `## Entrada Dinâmica\n\n`;
        const lines = placeholders.split('\n').filter(line => line.trim());
        lines.forEach(line => {
            prompt += `${line}\n`;
        });
        prompt += `\n`;
    }

    // Instruções finais
    if (instructions) {
        prompt += `## Instruções\n\n${instructions}\n\n`;
    }

    // Adicionar linha de separação final
    if (prompt) {
        prompt += `---\n\nPrompt gerado em: ${new Date().toLocaleString('pt-BR')}`;
    }

    return prompt;
}

// ==================== COPIAR PARA CLIPBOARD ====================
function copyPromptToClipboard() {
    const prompt = elements.promptPreview.value;

    if (!prompt || prompt === 'Preencha os campos acima para ver o preview do prompt...') {
        showToast('⚠️ Nenhum prompt para copiar', 'error');
        return;
    }

    // Copiar usando Clipboard API
    navigator.clipboard.writeText(prompt)
        .then(() => {
            showToast('📋 Prompt copiado para a área de transferência!');
        })
        .catch(err => {
            console.error('Erro ao copiar:', err);
            // Fallback: usar método antigo
            fallbackCopyToClipboard(prompt);
        });
}

function fallbackCopyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        showToast('📋 Prompt copiado para a área de transferência!');
    } catch (err) {
        showToast('❌ Erro ao copiar prompt', 'error');
    }

    document.body.removeChild(textarea);
}

// ==================== EXPORTAR/IMPORTAR ====================
function exportTemplates() {
    if (templates.length === 0) {
        showToast('⚠️ Nenhum template para exportar', 'error');
        return;
    }

    const dataStr = JSON.stringify(templates, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `prompt-templates-${formatDateForFilename()}.json`;
    link.click();

    URL.revokeObjectURL(url);
    showToast('📤 Templates exportados com sucesso!');
}

function importTemplates(e) {
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

            // Mesclar com templates existentes (evitar duplicatas por ID)
            const existingIds = new Set(templates.map(t => t.id));
            const newTemplates = imported.filter(t => !existingIds.has(t.id));

            if (newTemplates.length === 0) {
                showToast('ℹ️ Todos os templates já existem', 'error');
                return;
            }

            templates = [...newTemplates, ...templates];
            saveToStorage();
            renderTemplatesList();
            showToast(`📥 ${newTemplates.length} template(s) importado(s) com sucesso!`);
        } catch (err) {
            console.error('Erro ao importar:', err);
            showToast('❌ Erro ao importar arquivo JSON', 'error');
        }
    };

    reader.onerror = () => {
        showToast('❌ Erro ao ler arquivo', 'error');
    };

    reader.readAsText(file);

    // Limpar input para permitir reimportar o mesmo arquivo
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

// ==================== PREVENIR PERDA DE DADOS ====================
window.addEventListener('beforeunload', (e) => {
    // Verificar se há alterações não salvas
    const hasUnsavedChanges = (
        elements.agentName.value.trim() ||
        elements.objective.value.trim() ||
        elements.tone.value
    ) && !isEditMode;

    if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
    }
});
