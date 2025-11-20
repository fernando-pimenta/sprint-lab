// ========================================
// FP Workflow Checklist Manager
// Sprint Lab #23
// ========================================

// ========================================
// Application State
// ========================================
let templates = [];
let executions = [];
let currentTemplateId = null;
let currentExecutionId = null;
let currentView = 'templates';
let filters = {
    search: '',
    category: '',
    status: ''
};
let executionTimer = null;

// ========================================
// LocalStorage Functions
// ========================================
function saveToLocalStorage() {
    localStorage.setItem('fpWorkflow_templates', JSON.stringify(templates));
    localStorage.setItem('fpWorkflow_executions', JSON.stringify(executions));
}

function loadFromLocalStorage() {
    const templatesData = localStorage.getItem('fpWorkflow_templates');
    const executionsData = localStorage.setItem('fpWorkflow_executions');

    if (templatesData) {
        templates = JSON.parse(templatesData);
    } else {
        // Load default templates if none exist
        templates = getDefaultTemplates();
        saveToLocalStorage();
    }

    if (executionsData) {
        executions = JSON.parse(executionsData);
    }
}

// ========================================
// Default Templates
// ========================================
function getDefaultTemplates() {
    return [
        {
            id: generateId(),
            name: 'Publicar Artigo no Blog FP',
            category: 'Publicação',
            description: 'Processo completo para publicar um artigo otimizado no Blog do Fernando Pimenta',
            steps: [
                { text: 'Escrever rascunho', note: '', mandatory: true, estimatedTime: 120 },
                { text: 'Revisar ortografia e gramática', note: '', mandatory: true, estimatedTime: 20 },
                { text: 'Otimizar SEO (título, meta, H2s)', note: '', mandatory: true, estimatedTime: 15 },
                { text: 'Adicionar imagens e otimizar alt text', note: '', mandatory: true, estimatedTime: 25 },
                { text: 'Inserir links internos (3-5)', note: '', mandatory: true, estimatedTime: 10 },
                { text: 'Adicionar links de afiliados', note: '', mandatory: false, estimatedTime: 15 },
                { text: 'Verificar responsividade mobile', note: '', mandatory: true, estimatedTime: 5 },
                { text: 'Agendar publicação', note: '', mandatory: true, estimatedTime: 5 },
                { text: 'Compartilhar nas redes sociais', note: '', mandatory: false, estimatedTime: 10 },
                { text: 'Atualizar planilha editorial', note: '', mandatory: true, estimatedTime: 5 }
            ],
            createdAt: new Date().toISOString()
        },
        {
            id: generateId(),
            name: 'Review de Produto (Brechó Tech)',
            category: 'Produção',
            description: 'Workflow para criar reviews completos de produtos tech para o Brechó Tech',
            steps: [
                { text: 'Testar/usar produto por 2-3 dias', note: '', mandatory: true, estimatedTime: 180 },
                { text: 'Tirar fotos/screenshots', note: '', mandatory: true, estimatedTime: 30 },
                { text: 'Listar prós e contras', note: '', mandatory: true, estimatedTime: 20 },
                { text: 'Pesquisar preços (Amazon, ML, Shopee)', note: '', mandatory: true, estimatedTime: 15 },
                { text: 'Escrever review completo', note: '', mandatory: true, estimatedTime: 90 },
                { text: 'Adicionar links de afiliados', note: '', mandatory: true, estimatedTime: 10 },
                { text: 'Criar thumbnail', note: '', mandatory: false, estimatedTime: 20 },
                { text: 'Publicar e compartilhar', note: '', mandatory: true, estimatedTime: 15 }
            ],
            createdAt: new Date().toISOString()
        },
        {
            id: generateId(),
            name: 'Lançamento de Plugin',
            category: 'Técnico',
            description: 'Checklist para lançar um plugin WordPress no repositório oficial',
            steps: [
                { text: 'Testar em 3 temas diferentes', note: '', mandatory: true, estimatedTime: 60 },
                { text: 'Corrigir bugs críticos', note: '', mandatory: true, estimatedTime: 120 },
                { text: 'Atualizar README.md', note: '', mandatory: true, estimatedTime: 30 },
                { text: 'Criar screenshots', note: '', mandatory: true, estimatedTime: 20 },
                { text: 'Gerar arquivo .zip', note: '', mandatory: true, estimatedTime: 5 },
                { text: 'Submeter ao WordPress.org', note: '', mandatory: true, estimatedTime: 15 },
                { text: 'Publicar artigo no Blog FP', note: '', mandatory: false, estimatedTime: 90 },
                { text: 'Divulgar nas redes', note: '', mandatory: false, estimatedTime: 10 }
            ],
            createdAt: new Date().toISOString()
        },
        {
            id: generateId(),
            name: 'Setup de Cliente (CetusNet)',
            category: 'Cliente',
            description: 'Processo de onboarding de novos clientes da CetusNet',
            steps: [
                { text: 'Reunião de briefing', note: '', mandatory: true, estimatedTime: 60 },
                { text: 'Análise técnica do ambiente', note: '', mandatory: true, estimatedTime: 45 },
                { text: 'Criar proposta comercial', note: '', mandatory: true, estimatedTime: 90 },
                { text: 'Enviar proposta e aguardar', note: '', mandatory: true, estimatedTime: 5 },
                { text: 'Ajustar proposta se necessário', note: '', mandatory: false, estimatedTime: 30 },
                { text: 'Fechar contrato', note: '', mandatory: true, estimatedTime: 15 },
                { text: 'Agendar início do projeto', note: '', mandatory: true, estimatedTime: 10 }
            ],
            createdAt: new Date().toISOString()
        },
        {
            id: generateId(),
            name: 'Backup Mensal do Ecossistema',
            category: 'Administrativo',
            description: 'Rotina mensal de backup de todos os sites e dados do Ecossistema FP',
            steps: [
                { text: 'Backup WordPress Blog FP', note: '', mandatory: true, estimatedTime: 20 },
                { text: 'Backup WordPress Brechó Tech', note: '', mandatory: true, estimatedTime: 20 },
                { text: 'Backup WordPress CetusNet', note: '', mandatory: true, estimatedTime: 20 },
                { text: 'Exportar analytics', note: '', mandatory: true, estimatedTime: 15 },
                { text: 'Backup do OneDrive', note: '', mandatory: true, estimatedTime: 10 },
                { text: 'Verificar integridade dos backups', note: '', mandatory: true, estimatedTime: 15 },
                { text: 'Atualizar planilha de controle', note: '', mandatory: true, estimatedTime: 5 }
            ],
            createdAt: new Date().toISOString()
        }
    ];
}

// ========================================
// Utility Functions
// ========================================
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
        return `${hours}h ${mins}min`;
    }
    return `${mins}min`;
}

function formatDuration(milliseconds) {
    const totalMinutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}min`;
}

// ========================================
// Template CRUD Functions
// ========================================
function createTemplate(templateData) {
    const newTemplate = {
        id: generateId(),
        ...templateData,
        createdAt: new Date().toISOString()
    };
    templates.push(newTemplate);
    saveToLocalStorage();
    return newTemplate;
}

function updateTemplate(id, templateData) {
    const index = templates.findIndex(t => t.id === id);
    if (index !== -1) {
        templates[index] = {
            ...templates[index],
            ...templateData,
            updatedAt: new Date().toISOString()
        };
        saveToLocalStorage();
        return templates[index];
    }
    return null;
}

function deleteTemplate(id) {
    const index = templates.findIndex(t => t.id === id);
    if (index !== -1) {
        templates.splice(index, 1);
        saveToLocalStorage();
        return true;
    }
    return false;
}

function duplicateTemplate(id) {
    const template = templates.find(t => t.id === id);
    if (template) {
        const duplicated = {
            ...JSON.parse(JSON.stringify(template)),
            id: generateId(),
            name: template.name + ' (Cópia)',
            createdAt: new Date().toISOString()
        };
        templates.push(duplicated);
        saveToLocalStorage();
        return duplicated;
    }
    return null;
}

function getTemplateById(id) {
    return templates.find(t => t.id === id);
}

function getTotalSteps(template) {
    return template.steps.length;
}

function getTotalEstimatedTime(template) {
    return template.steps.reduce((total, step) => total + (step.estimatedTime || 0), 0);
}

// ========================================
// Execution Functions
// ========================================
function startExecution(templateId) {
    const template = getTemplateById(templateId);
    if (!template) return null;

    const execution = {
        id: generateId(),
        templateId: templateId,
        templateName: template.name,
        category: template.category,
        status: 'active',
        startTime: new Date().toISOString(),
        pausedTime: 0,
        completedSteps: [],
        stepNotes: {},
        progress: 0
    };

    executions.push(execution);
    saveToLocalStorage();
    return execution;
}

function pauseExecution(executionId) {
    const execution = executions.find(e => e.id === executionId);
    if (execution && execution.status === 'active') {
        execution.status = 'paused';
        execution.pausedAt = new Date().toISOString();
        saveToLocalStorage();
        return true;
    }
    return false;
}

function resumeExecution(executionId) {
    const execution = executions.find(e => e.id === executionId);
    if (execution && execution.status === 'paused') {
        execution.status = 'active';

        // Calculate paused duration
        if (execution.pausedAt) {
            const pausedDuration = new Date() - new Date(execution.pausedAt);
            execution.pausedTime = (execution.pausedTime || 0) + pausedDuration;
        }

        delete execution.pausedAt;
        saveToLocalStorage();
        return true;
    }
    return false;
}

function completeExecution(executionId) {
    const execution = executions.find(e => e.id === executionId);
    if (execution) {
        execution.status = 'completed';
        execution.endTime = new Date().toISOString();

        // Calculate total duration
        const start = new Date(execution.startTime);
        const end = new Date(execution.endTime);
        execution.totalDuration = end - start - (execution.pausedTime || 0);

        saveToLocalStorage();
        return true;
    }
    return false;
}

function cancelExecution(executionId) {
    const execution = executions.find(e => e.id === executionId);
    if (execution) {
        execution.status = 'cancelled';
        execution.endTime = new Date().toISOString();
        saveToLocalStorage();
        return true;
    }
    return false;
}

function toggleStepCompletion(executionId, stepIndex) {
    const execution = executions.find(e => e.id === executionId);
    if (!execution) return false;

    const index = execution.completedSteps.indexOf(stepIndex);
    if (index > -1) {
        execution.completedSteps.splice(index, 1);
    } else {
        execution.completedSteps.push(stepIndex);
    }

    // Calculate progress
    const template = getTemplateById(execution.templateId);
    if (template) {
        execution.progress = Math.round((execution.completedSteps.length / template.steps.length) * 100);
    }

    saveToLocalStorage();
    return true;
}

function updateStepNote(executionId, stepIndex, note) {
    const execution = executions.find(e => e.id === executionId);
    if (execution) {
        execution.stepNotes[stepIndex] = note;
        saveToLocalStorage();
        return true;
    }
    return false;
}

function getExecutionDuration(execution) {
    if (!execution) return 0;

    const start = new Date(execution.startTime);
    const end = execution.endTime ? new Date(execution.endTime) : new Date();
    const pausedTime = execution.pausedTime || 0;

    return end - start - pausedTime;
}

function getActiveExecutions() {
    return executions.filter(e => e.status === 'active' || e.status === 'paused');
}

function getCompletedExecutions() {
    return executions.filter(e => e.status === 'completed' || e.status === 'cancelled');
}

// ========================================
// Dashboard Statistics
// ========================================
function calculateStats() {
    const active = executions.filter(e => e.status === 'active').length;

    // Completed this month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const completedThisMonth = executions.filter(e =>
        e.status === 'completed' && new Date(e.endTime) >= startOfMonth
    ).length;

    // Average time for top 3 workflows
    const completedExecutions = executions.filter(e => e.status === 'completed');
    const avgTime = completedExecutions.length > 0
        ? completedExecutions.reduce((sum, e) => sum + (e.totalDuration || 0), 0) / completedExecutions.length
        : 0;

    // Completion rate
    const totalStarted = executions.length;
    const totalCompleted = executions.filter(e => e.status === 'completed').length;
    const completionRate = totalStarted > 0 ? (totalCompleted / totalStarted) * 100 : 0;

    return {
        active,
        completedThisMonth,
        avgTime: formatDuration(avgTime),
        completionRate: completionRate.toFixed(1)
    };
}

function updateDashboard() {
    const stats = calculateStats();

    document.getElementById('activeWorkflows').textContent = stats.active;
    document.getElementById('completedThisMonth').textContent = stats.completedThisMonth;
    document.getElementById('avgTime').textContent = stats.avgTime;
    document.getElementById('completionRate').textContent = stats.completionRate + '%';

    // Update active badge
    document.getElementById('activeBadge').textContent = stats.active;
}

// ========================================
// Rendering Functions
// ========================================
function renderTemplates() {
    const container = document.getElementById('templatesGrid');
    container.innerHTML = '';

    const filteredTemplates = getFilteredTemplates();

    if (filteredTemplates.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #666;">Nenhum template encontrado.</p>';
        return;
    }

    filteredTemplates.forEach(template => {
        const card = createTemplateCard(template);
        container.appendChild(card);
    });
}

function createTemplateCard(template) {
    const card = document.createElement('div');
    card.className = 'template-card';

    const totalSteps = getTotalSteps(template);
    const totalTime = getTotalEstimatedTime(template);

    card.innerHTML = `
        <h3>${template.name}</h3>
        <span class="category">${template.category}</span>
        ${template.description ? `<p class="description">${template.description}</p>` : ''}
        <div class="meta">
            <span>📋 ${totalSteps} etapas</span>
            <span>⏱️ ${formatTime(totalTime)}</span>
        </div>
        <div class="actions">
            <button class="btn btn-primary btn-small" onclick="startWorkflow('${template.id}')">▶️ Usar</button>
            <button class="btn btn-secondary btn-small" onclick="editTemplate('${template.id}')">✏️ Editar</button>
            <button class="btn btn-secondary btn-small" onclick="duplicateWorkflow('${template.id}')">📋 Duplicar</button>
            <button class="btn btn-danger btn-small" onclick="deleteWorkflow('${template.id}')">🗑️ Excluir</button>
        </div>
    `;

    return card;
}

function renderActiveWorkflows() {
    const container = document.getElementById('activeWorkflowsList');
    container.innerHTML = '';

    const activeWorkflows = getActiveExecutions();

    if (activeWorkflows.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Nenhum workflow ativo no momento.</p>';
        return;
    }

    activeWorkflows.forEach(execution => {
        const card = createActiveWorkflowCard(execution);
        container.appendChild(card);
    });
}

function createActiveWorkflowCard(execution) {
    const card = document.createElement('div');
    card.className = `workflow-card ${execution.status}`;

    const template = getTemplateById(execution.templateId);
    if (!template) return card;

    const totalSteps = template.steps.length;
    const completedSteps = execution.completedSteps.length;
    const progress = execution.progress || 0;

    const duration = getExecutionDuration(execution);
    const estimatedTime = getTotalEstimatedTime(template);

    card.innerHTML = `
        <h3>${execution.templateName}</h3>
        <div class="progress-section">
            <div class="progress-info">
                <span>${progress}%</span>
                <span>${completedSteps}/${totalSteps}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
        </div>
        <div class="time-info">
            <div>
                <strong>Tempo decorrido:</strong> ${formatDuration(duration)}
            </div>
            <div>
                <strong>Estimado:</strong> ${formatTime(estimatedTime)}
            </div>
            <div>
                <strong>Status:</strong> <span class="status-badge ${execution.status}">${getStatusLabel(execution.status)}</span>
            </div>
        </div>
        <div class="actions">
            <button class="btn btn-primary btn-small" onclick="continueWorkflow('${execution.id}')">▶️ Continuar</button>
            ${execution.status === 'active' ? `<button class="btn btn-secondary btn-small" onclick="pauseWorkflow('${execution.id}')">⏸️ Pausar</button>` : ''}
            ${execution.status === 'paused' ? `<button class="btn btn-success btn-small" onclick="resumeWorkflow('${execution.id}')">▶️ Retomar</button>` : ''}
            <button class="btn btn-danger btn-small" onclick="cancelWorkflow('${execution.id}')">❌ Cancelar</button>
        </div>
    `;

    return card;
}

function renderHistory() {
    const container = document.getElementById('historyList');
    container.innerHTML = '';

    const history = getCompletedExecutions().sort((a, b) =>
        new Date(b.endTime) - new Date(a.endTime)
    );

    if (history.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Nenhum histórico disponível.</p>';
        return;
    }

    history.forEach(execution => {
        const item = createHistoryItem(execution);
        container.appendChild(item);
    });
}

function createHistoryItem(execution) {
    const item = document.createElement('div');
    item.className = `history-item ${execution.status}`;

    const template = getTemplateById(execution.templateId);
    const endDate = new Date(execution.endTime).toLocaleString('pt-BR');
    const duration = execution.totalDuration ? formatDuration(execution.totalDuration) : '-';

    const estimatedTime = template ? getTotalEstimatedTime(template) : 0;
    const completedSteps = execution.completedSteps.length;
    const totalSteps = template ? template.steps.length : 0;

    item.innerHTML = `
        <h4>${execution.templateName}</h4>
        <span class="category">${execution.category}</span>
        <div class="meta">
            <span>📅 ${endDate}</span>
            <span>⏱️ ${duration}</span>
            <span>📋 ${completedSteps}/${totalSteps} etapas</span>
            <span>⏳ Estimado: ${formatTime(estimatedTime)}</span>
            <span class="status-badge ${execution.status}">${getStatusLabel(execution.status)}</span>
        </div>
    `;

    return item;
}

function getStatusLabel(status) {
    const labels = {
        'active': 'Em Andamento',
        'paused': 'Pausado',
        'completed': 'Concluído',
        'cancelled': 'Cancelado'
    };
    return labels[status] || status;
}

// ========================================
// Filters
// ========================================
function getFilteredTemplates() {
    return templates.filter(template => {
        // Search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            const matchesSearch =
                template.name.toLowerCase().includes(searchLower) ||
                (template.description && template.description.toLowerCase().includes(searchLower)) ||
                template.steps.some(step => step.text.toLowerCase().includes(searchLower));

            if (!matchesSearch) return false;
        }

        // Category filter
        if (filters.category && template.category !== filters.category) {
            return false;
        }

        return true;
    });
}

function applyFilters() {
    if (currentView === 'templates') {
        renderTemplates();
    }
}

// ========================================
// Template Modal Management
// ========================================
function openTemplateModal(templateId = null) {
    const modal = document.getElementById('templateModal');
    const form = document.getElementById('templateForm');
    const modalTitle = document.getElementById('templateModalTitle');
    const deleteBtn = document.getElementById('deleteTemplateBtn');

    form.reset();
    document.getElementById('stepsContainer').innerHTML = '';

    if (templateId) {
        const template = getTemplateById(templateId);
        if (template) {
            modalTitle.textContent = 'Editar Template';
            deleteBtn.style.display = 'inline-block';

            document.getElementById('templateId').value = template.id;
            document.getElementById('templateName').value = template.name;
            document.getElementById('templateCategory').value = template.category;
            document.getElementById('templateDescription').value = template.description || '';

            // Load steps
            template.steps.forEach((step, index) => {
                addStepToForm(step, index);
            });
        }
    } else {
        modalTitle.textContent = 'Novo Template';
        deleteBtn.style.display = 'none';
        addStepToForm(); // Add one empty step
    }

    updateTemplateSummary();
    modal.classList.add('active');
}

function closeTemplateModal() {
    document.getElementById('templateModal').classList.remove('active');
}

function addStepToForm(stepData = null, index = null) {
    const container = document.getElementById('stepsContainer');
    const stepIndex = index !== null ? index : container.children.length;

    const stepDiv = document.createElement('div');
    stepDiv.className = 'step-item';
    stepDiv.dataset.index = stepIndex;

    stepDiv.innerHTML = `
        <div class="step-header">
            <strong>Etapa ${stepIndex + 1}</strong>
            <button type="button" class="step-remove" onclick="removeStep(this)">✕ Remover</button>
        </div>
        <div class="step-fields">
            <input type="text"
                   class="step-text"
                   placeholder="Texto da etapa *"
                   value="${stepData ? stepData.text : ''}"
                   required
                   oninput="updateTemplateSummary()">
            <textarea class="step-note"
                      placeholder="Nota/Dica (opcional)"
                      rows="2">${stepData ? stepData.note || '' : ''}</textarea>
            <div class="step-row">
                <div class="step-checkbox">
                    <input type="checkbox"
                           class="step-mandatory"
                           id="mandatory-${stepIndex}"
                           ${stepData && stepData.mandatory ? 'checked' : ''}>
                    <label for="mandatory-${stepIndex}">Obrigatória</label>
                </div>
                <input type="number"
                       class="step-time"
                       placeholder="Tempo (min)"
                       min="0"
                       value="${stepData ? stepData.estimatedTime || '' : ''}"
                       oninput="updateTemplateSummary()">
            </div>
        </div>
    `;

    container.appendChild(stepDiv);
}

function removeStep(button) {
    button.closest('.step-item').remove();
    renumberSteps();
    updateTemplateSummary();
}

function renumberSteps() {
    const steps = document.querySelectorAll('#stepsContainer .step-item');
    steps.forEach((step, index) => {
        step.dataset.index = index;
        step.querySelector('.step-header strong').textContent = `Etapa ${index + 1}`;
    });
}

function updateTemplateSummary() {
    const steps = document.querySelectorAll('#stepsContainer .step-item');
    let totalTime = 0;

    steps.forEach(step => {
        const timeInput = step.querySelector('.step-time');
        const time = parseInt(timeInput.value) || 0;
        totalTime += time;
    });

    document.getElementById('totalSteps').textContent = steps.length;
    document.getElementById('totalTime').textContent = formatTime(totalTime);
}

function getStepsFromForm() {
    const steps = [];
    const stepItems = document.querySelectorAll('#stepsContainer .step-item');

    stepItems.forEach(item => {
        const text = item.querySelector('.step-text').value;
        const note = item.querySelector('.step-note').value;
        const mandatory = item.querySelector('.step-mandatory').checked;
        const estimatedTime = parseInt(item.querySelector('.step-time').value) || 0;

        steps.push({
            text,
            note,
            mandatory,
            estimatedTime
        });
    });

    return steps;
}

// ========================================
// Execution Panel Management
// ========================================
function openExecutionPanel(executionId) {
    currentExecutionId = executionId;
    const execution = executions.find(e => e.id === executionId);
    const template = getTemplateById(execution.templateId);

    if (!execution || !template) return;

    const panel = document.getElementById('executionPanel');
    document.getElementById('executionWorkflowName').textContent = execution.templateName;

    renderExecutionPanel(execution, template);

    panel.classList.add('active');

    // Start timer if active
    if (execution.status === 'active') {
        startExecutionTimer(executionId);
    }
}

function closeExecutionPanel() {
    document.getElementById('executionPanel').classList.remove('active');
    stopExecutionTimer();
    currentExecutionId = null;
}

function renderExecutionPanel(execution, template) {
    // Progress
    const progress = execution.progress || 0;
    const completedSteps = execution.completedSteps.length;
    const totalSteps = template.steps.length;

    document.getElementById('executionProgress').textContent = `${progress}%`;
    document.getElementById('executionSteps').textContent = `${completedSteps}/${totalSteps}`;
    document.getElementById('executionProgressFill').style.width = `${progress}%`;

    // Time info
    const duration = getExecutionDuration(execution);
    const estimatedTime = getTotalEstimatedTime(template);

    document.getElementById('executionElapsed').textContent = formatDuration(duration);
    document.getElementById('executionEstimated').textContent = formatTime(estimatedTime);

    // Status
    const statusBadge = document.getElementById('executionStatus');
    statusBadge.textContent = getStatusLabel(execution.status);
    statusBadge.className = `status-badge ${execution.status}`;

    // Render steps
    renderExecutionSteps(execution, template);

    // Update buttons
    updateExecutionButtons(execution);
}

function renderExecutionSteps(execution, template) {
    const container = document.getElementById('executionStepsList');
    container.innerHTML = '';

    template.steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        const isCompleted = execution.completedSteps.includes(index);
        const isMandatory = step.mandatory;

        stepDiv.className = `checklist-step ${isCompleted ? 'completed' : ''} ${isMandatory ? 'mandatory' : ''}`;

        const note = execution.stepNotes[index] || '';

        stepDiv.innerHTML = `
            <div class="step-main">
                <input type="checkbox"
                       class="step-checkbox-large"
                       ${isCompleted ? 'checked' : ''}
                       onchange="handleStepToggle('${execution.id}', ${index})">
                <div class="step-content">
                    <h4>${step.text} ${isMandatory ? '<span style="color: var(--mandatory);">*</span>' : ''}</h4>
                    ${step.note ? `<p class="step-note">💡 ${step.note}</p>` : ''}
                    ${step.estimatedTime ? `<p class="step-time">⏱️ ${formatTime(step.estimatedTime)}</p>` : ''}
                    <div class="step-notes-input">
                        <textarea placeholder="Adicionar nota/observação..."
                                  rows="2"
                                  onblur="handleStepNote('${execution.id}', ${index}, this.value)">${note}</textarea>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(stepDiv);
    });
}

function updateExecutionButtons(execution) {
    const pauseBtn = document.getElementById('pauseExecutionBtn');
    const completeBtn = document.getElementById('completeExecutionBtn');
    const cancelBtn = document.getElementById('cancelExecutionBtn');

    if (execution.status === 'active') {
        pauseBtn.textContent = '⏸️ Pausar';
        pauseBtn.onclick = () => handlePauseExecution(execution.id);
        pauseBtn.disabled = false;
    } else if (execution.status === 'paused') {
        pauseBtn.textContent = '▶️ Retomar';
        pauseBtn.onclick = () => handleResumeExecution(execution.id);
        pauseBtn.disabled = false;
    }

    completeBtn.onclick = () => handleCompleteExecution(execution.id);
    cancelBtn.onclick = () => handleCancelExecution(execution.id);
}

function startExecutionTimer(executionId) {
    stopExecutionTimer();

    executionTimer = setInterval(() => {
        const execution = executions.find(e => e.id === executionId);
        if (execution && execution.status === 'active') {
            const duration = getExecutionDuration(execution);
            document.getElementById('executionElapsed').textContent = formatDuration(duration);
        } else {
            stopExecutionTimer();
        }
    }, 1000);
}

function stopExecutionTimer() {
    if (executionTimer) {
        clearInterval(executionTimer);
        executionTimer = null;
    }
}

// ========================================
// Export/Import Functions
// ========================================
function exportJSON() {
    const data = {
        templates: templates,
        executions: executions,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fp-workflow-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function exportCSV() {
    const headers = ['Workflow', 'Categoria', 'Status', 'Data Início', 'Data Fim', 'Duração', 'Etapas Concluídas', 'Total Etapas', 'Progresso %'];

    const rows = executions.map(execution => {
        const template = getTemplateById(execution.templateId);
        const duration = execution.totalDuration ? formatDuration(execution.totalDuration) : '-';
        const totalSteps = template ? template.steps.length : 0;

        return [
            execution.templateName,
            execution.category,
            getStatusLabel(execution.status),
            new Date(execution.startTime).toLocaleString('pt-BR'),
            execution.endTime ? new Date(execution.endTime).toLocaleString('pt-BR') : '-',
            duration,
            execution.completedSteps.length,
            totalSteps,
            execution.progress || 0
        ];
    });

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
        csv += row.map(field => `"${field}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fp-workflow-history-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

function importJSON(file) {
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);

            if (data.templates && Array.isArray(data.templates)) {
                // Merge templates
                data.templates.forEach(importedTemplate => {
                    const existingIndex = templates.findIndex(t => t.id === importedTemplate.id);
                    if (existingIndex === -1) {
                        templates.push(importedTemplate);
                    }
                });

                saveToLocalStorage();
                refreshView();
                alert('Templates importados com sucesso!');
            } else {
                alert('Formato de arquivo inválido.');
            }
        } catch (error) {
            alert('Erro ao importar arquivo: ' + error.message);
        }
    };

    reader.readAsText(file);
}

// ========================================
// View Management
// ========================================
function switchTab(tabName) {
    currentView = tabName;

    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    // Render appropriate view
    if (tabName === 'templates') {
        renderTemplates();
    } else if (tabName === 'active') {
        renderActiveWorkflows();
    } else if (tabName === 'history') {
        renderHistory();
    }
}

function refreshView() {
    if (currentView === 'templates') {
        renderTemplates();
    } else if (currentView === 'active') {
        renderActiveWorkflows();
    } else if (currentView === 'history') {
        renderHistory();
    }
    updateDashboard();
}

// ========================================
// Event Handlers (Global functions for onclick)
// ========================================
window.startWorkflow = function(templateId) {
    const execution = startExecution(templateId);
    if (execution) {
        openExecutionPanel(execution.id);
        refreshView();
    }
};

window.continueWorkflow = function(executionId) {
    openExecutionPanel(executionId);
};

window.pauseWorkflow = function(executionId) {
    pauseExecution(executionId);
    refreshView();
};

window.resumeWorkflow = function(executionId) {
    resumeExecution(executionId);
    refreshView();
};

window.cancelWorkflow = function(executionId) {
    if (confirm('Tem certeza que deseja cancelar este workflow?')) {
        cancelExecution(executionId);
        closeExecutionPanel();
        refreshView();
    }
};

window.editTemplate = function(templateId) {
    openTemplateModal(templateId);
};

window.duplicateWorkflow = function(templateId) {
    duplicateTemplate(templateId);
    renderTemplates();
};

window.deleteWorkflow = function(templateId) {
    if (confirm('Tem certeza que deseja excluir este template?')) {
        deleteTemplate(templateId);
        renderTemplates();
    }
};

window.handleStepToggle = function(executionId, stepIndex) {
    toggleStepCompletion(executionId, stepIndex);
    const execution = executions.find(e => e.id === executionId);
    const template = getTemplateById(execution.templateId);
    if (execution && template) {
        renderExecutionPanel(execution, template);
    }
    refreshView();
};

window.handleStepNote = function(executionId, stepIndex, note) {
    updateStepNote(executionId, stepIndex, note);
};

window.handlePauseExecution = function(executionId) {
    pauseExecution(executionId);
    stopExecutionTimer();
    const execution = executions.find(e => e.id === executionId);
    const template = getTemplateById(execution.templateId);
    if (execution && template) {
        renderExecutionPanel(execution, template);
    }
    refreshView();
};

window.handleResumeExecution = function(executionId) {
    resumeExecution(executionId);
    const execution = executions.find(e => e.id === executionId);
    const template = getTemplateById(execution.templateId);
    if (execution && template) {
        renderExecutionPanel(execution, template);
        startExecutionTimer(executionId);
    }
    refreshView();
};

window.handleCompleteExecution = function(executionId) {
    if (confirm('Marcar este workflow como concluído?')) {
        completeExecution(executionId);
        closeExecutionPanel();
        refreshView();
    }
};

window.handleCancelExecution = function(executionId) {
    if (confirm('Tem certeza que deseja cancelar este workflow?')) {
        cancelExecution(executionId);
        closeExecutionPanel();
        refreshView();
    }
};

// ========================================
// Event Listeners
// ========================================
function setupEventListeners() {
    // New Template Button
    document.getElementById('newTemplateBtn').addEventListener('click', () => openTemplateModal());

    // Close Modals
    document.getElementById('closeTemplateModal').addEventListener('click', closeTemplateModal);
    document.getElementById('cancelTemplateBtn').addEventListener('click', closeTemplateModal);
    document.getElementById('closeExportModal').addEventListener('click', () => {
        document.getElementById('exportModal').classList.remove('active');
    });

    // Close Execution Panel
    document.getElementById('closeExecutionPanel').addEventListener('click', closeExecutionPanel);

    // Template Form Submit
    document.getElementById('templateForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const templateId = document.getElementById('templateId').value;
        const steps = getStepsFromForm();

        if (steps.length === 0) {
            alert('Adicione pelo menos uma etapa ao template.');
            return;
        }

        const templateData = {
            name: document.getElementById('templateName').value,
            category: document.getElementById('templateCategory').value,
            description: document.getElementById('templateDescription').value,
            steps: steps
        };

        if (templateId) {
            updateTemplate(templateId, templateData);
        } else {
            createTemplate(templateData);
        }

        closeTemplateModal();
        renderTemplates();
    });

    // Delete Template Button
    document.getElementById('deleteTemplateBtn').addEventListener('click', function() {
        const templateId = document.getElementById('templateId').value;

        if (confirm('Tem certeza que deseja excluir este template?')) {
            deleteTemplate(templateId);
            closeTemplateModal();
            renderTemplates();
        }
    });

    // Add Step Button
    document.getElementById('addStepBtn').addEventListener('click', function() {
        addStepToForm();
        updateTemplateSummary();
    });

    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });

    // Search Input
    document.getElementById('searchInput').addEventListener('input', function(e) {
        filters.search = e.target.value;
        applyFilters();
    });

    // Filter Selects
    document.getElementById('filterCategory').addEventListener('change', function(e) {
        filters.category = e.target.value;
        applyFilters();
    });

    document.getElementById('filterStatus').addEventListener('change', function(e) {
        filters.status = e.target.value;
        applyFilters();
    });

    // Export/Import Buttons
    document.getElementById('exportBtn').addEventListener('click', function() {
        document.getElementById('exportModal').classList.add('active');
    });

    document.getElementById('exportJsonBtn').addEventListener('click', function() {
        exportJSON();
    });

    document.getElementById('exportCsvBtn').addEventListener('click', function() {
        exportCSV();
    });

    document.getElementById('importJsonBtn').addEventListener('click', function() {
        document.getElementById('importFile').click();
    });

    document.getElementById('importFile').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            importJSON(file);
            document.getElementById('exportModal').classList.remove('active');
        }
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
}

// ========================================
// Initialization
// ========================================
function init() {
    loadFromLocalStorage();
    setupEventListeners();
    renderTemplates();
    updateDashboard();
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
