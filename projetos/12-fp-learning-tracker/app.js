// ==================== VARIÁVEIS GLOBAIS ====================
const STORAGE_KEY = 'fp_learning_tracker';
let skills = [];
let editingId = null;

// ==================== ELEMENTOS DO DOM ====================
const elements = {
    // Botões principais
    btnNewSkill: document.getElementById('btnNewSkill'),
    btnExport: document.getElementById('btnExport'),
    btnImport: document.getElementById('btnImport'),
    fileInput: document.getElementById('fileInput'),
    btnClearFilters: document.getElementById('btnClearFilters'),

    // Filtros
    filterCategory: document.getElementById('filterCategory'),
    filterStatus: document.getElementById('filterStatus'),
    filterLevel: document.getElementById('filterLevel'),
    searchInput: document.getElementById('searchInput'),

    // Lista de habilidades
    skillsList: document.getElementById('skillsList'),
    emptyState: document.getElementById('emptyState'),
    countBadge: document.getElementById('countBadge'),

    // Modal e formulário
    modalForm: document.getElementById('modalForm'),
    modalTitle: document.getElementById('modalTitle'),
    closeModal: document.getElementById('closeModal'),
    btnCancel: document.getElementById('btnCancel'),
    skillForm: document.getElementById('skillForm'),

    // Campos do formulário
    skillId: document.getElementById('skillId'),
    inputName: document.getElementById('inputName'),
    inputCategory: document.getElementById('inputCategory'),
    inputStatus: document.getElementById('inputStatus'),
    inputLevel: document.getElementById('inputLevel'),
    levelValue: document.getElementById('levelValue'),
    inputGoal: document.getElementById('inputGoal'),
    inputNotes: document.getElementById('inputNotes')
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    loadData();
    setupEventListeners();
    renderData();
}

// ==================== CARREGAR DADOS DO LOCALSTORAGE ====================
function loadData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            skills = JSON.parse(stored);
        }
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        skills = [];
    }
}

// ==================== SALVAR DADOS NO LOCALSTORAGE ====================
function saveData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
        alert('Erro ao salvar os dados. Verifique o espaço disponível.');
    }
}

// ==================== CONFIGURAR EVENT LISTENERS ====================
function setupEventListeners() {
    // Botões principais
    elements.btnNewSkill.addEventListener('click', openModalForNew);
    elements.btnExport.addEventListener('click', exportJSON);
    elements.btnImport.addEventListener('click', () => elements.fileInput.click());
    elements.fileInput.addEventListener('change', importJSON);
    elements.btnClearFilters.addEventListener('click', clearFilters);

    // Filtros e busca
    elements.filterCategory.addEventListener('change', applyFilters);
    elements.filterStatus.addEventListener('change', applyFilters);
    elements.filterLevel.addEventListener('change', applyFilters);
    elements.searchInput.addEventListener('input', applyFilters);

    // Modal
    elements.closeModal.addEventListener('click', closeModal);
    elements.btnCancel.addEventListener('click', closeModal);
    elements.modalForm.addEventListener('click', (e) => {
        if (e.target === elements.modalForm) closeModal();
    });

    // Formulário
    elements.skillForm.addEventListener('submit', handleFormSubmit);

    // Atualizar valor do nível em tempo real
    elements.inputLevel.addEventListener('input', (e) => {
        elements.levelValue.textContent = e.target.value;
    });

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.modalForm.classList.contains('show')) {
            closeModal();
        }
    });
}

// ==================== RENDERIZAR DADOS ====================
function renderData() {
    // Aplicar filtros para obter lista filtrada
    const filteredSkills = getFilteredSkills();

    // Atualizar contador
    updateCounter(filteredSkills.length);

    // Limpar lista
    elements.skillsList.innerHTML = '';

    // Verificar se há habilidades
    if (filteredSkills.length === 0) {
        elements.emptyState.style.display = 'block';
        return;
    }

    elements.emptyState.style.display = 'none';

    // Renderizar cada item
    filteredSkills.forEach(skill => {
        const item = createSkillItem(skill);
        elements.skillsList.appendChild(item);
    });
}

// ==================== CRIAR ELEMENTO DE HABILIDADE ====================
function createSkillItem(skill) {
    const item = document.createElement('div');
    item.className = 'skill-item';

    // Status CSS class
    const statusClass = skill.status.toLowerCase()
        .replace(/\s+/g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    // Gerar estrelas para o nível
    const stars = '★'.repeat(skill.level) + '☆'.repeat(5 - skill.level);

    // Formatação da data
    const dateFormatted = new Date(skill.updatedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    item.innerHTML = `
        <div class="skill-item-header">
            <div>
                <h3 class="skill-item-title">${escapeHtml(skill.name)}</h3>
            </div>
            <div class="skill-item-actions">
                <button class="btn btn-edit" onclick="editSkill('${skill.id}')">✏️ Editar</button>
                <button class="btn btn-delete" onclick="deleteSkill('${skill.id}')">🗑️ Excluir</button>
            </div>
        </div>

        <div class="skill-item-info">
            <div class="info-item">
                <span class="info-label">Categoria:</span>
                <span class="info-value">${escapeHtml(skill.category)}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Status:</span>
                <span class="status-badge status-${statusClass}">${escapeHtml(skill.status)}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Nível:</span>
                <span class="level-stars">${stars}</span>
            </div>
        </div>

        ${skill.goal ? `<div class="skill-item-goal">🎯 Objetivo: ${escapeHtml(skill.goal)}</div>` : ''}

        ${skill.notes ? `<div class="skill-item-notes">📝 ${escapeHtml(skill.notes)}</div>` : ''}

        <div class="skill-item-updated">🕒 Última atualização: ${dateFormatted}</div>
    `;

    return item;
}

// ==================== OBTER HABILIDADES FILTRADAS ====================
function getFilteredSkills() {
    let filtered = [...skills];

    // Filtro por categoria
    const categoryFilter = elements.filterCategory.value;
    if (categoryFilter) {
        filtered = filtered.filter(s => s.category === categoryFilter);
    }

    // Filtro por status
    const statusFilter = elements.filterStatus.value;
    if (statusFilter) {
        filtered = filtered.filter(s => s.status === statusFilter);
    }

    // Filtro por nível mínimo
    const levelFilter = elements.filterLevel.value;
    if (levelFilter) {
        const minLevel = parseInt(levelFilter);
        filtered = filtered.filter(s => s.level >= minLevel);
    }

    // Busca por nome
    const searchQuery = elements.searchInput.value.toLowerCase().trim();
    if (searchQuery) {
        filtered = filtered.filter(s =>
            s.name.toLowerCase().includes(searchQuery)
        );
    }

    return filtered;
}

// ==================== APLICAR FILTROS ====================
function applyFilters() {
    renderData();
}

// ==================== LIMPAR FILTROS ====================
function clearFilters() {
    elements.filterCategory.value = '';
    elements.filterStatus.value = '';
    elements.filterLevel.value = '';
    elements.searchInput.value = '';
    applyFilters();
}

// ==================== ATUALIZAR CONTADOR ====================
function updateCounter(count) {
    const total = skills.length;
    if (count === total) {
        elements.countBadge.textContent = `${total} habilidade${total !== 1 ? 's' : ''}`;
    } else {
        elements.countBadge.textContent = `${count} de ${total} habilidade${total !== 1 ? 's' : ''}`;
    }
}

// ==================== ABRIR MODAL PARA NOVA HABILIDADE ====================
function openModalForNew() {
    editingId = null;
    elements.modalTitle.textContent = '➕ Nova Habilidade';
    elements.skillForm.reset();
    elements.skillId.value = '';
    elements.levelValue.textContent = '3';
    elements.modalForm.classList.add('show');
    elements.inputName.focus();
}

// ==================== FECHAR MODAL ====================
function closeModal() {
    elements.modalForm.classList.remove('show');
    elements.skillForm.reset();
    editingId = null;
}

// ==================== MANIPULAR SUBMIT DO FORMULÁRIO ====================
function handleFormSubmit(e) {
    e.preventDefault();

    // Obter timestamp atual
    const now = new Date().toISOString();

    // Coletar dados do formulário
    const skillData = {
        id: editingId || generateId(),
        name: elements.inputName.value.trim(),
        category: elements.inputCategory.value,
        status: elements.inputStatus.value,
        level: parseInt(elements.inputLevel.value),
        goal: elements.inputGoal.value.trim(),
        notes: elements.inputNotes.value.trim(),
        createdAt: editingId ? getSkillById(editingId).createdAt : now,
        updatedAt: now
    };

    if (editingId) {
        // Editar existente
        const index = skills.findIndex(s => s.id === editingId);
        if (index !== -1) {
            skills[index] = skillData;
        }
    } else {
        // Adicionar novo
        skills.push(skillData);
    }

    // Salvar e atualizar
    saveData();
    renderData();
    closeModal();

    // Feedback
    showToast(editingId ? 'Habilidade atualizada com sucesso!' : 'Habilidade adicionada com sucesso!');
}

// ==================== EDITAR HABILIDADE ====================
function editSkill(id) {
    const skill = getSkillById(id);
    if (!skill) {
        alert('Habilidade não encontrada!');
        return;
    }

    editingId = id;
    elements.modalTitle.textContent = '✏️ Editar Habilidade';

    // Preencher formulário
    elements.skillId.value = skill.id;
    elements.inputName.value = skill.name;
    elements.inputCategory.value = skill.category;
    elements.inputStatus.value = skill.status;
    elements.inputLevel.value = skill.level;
    elements.levelValue.textContent = skill.level;
    elements.inputGoal.value = skill.goal;
    elements.inputNotes.value = skill.notes;

    // Abrir modal
    elements.modalForm.classList.add('show');
    elements.inputName.focus();
}

// ==================== EXCLUIR HABILIDADE ====================
function deleteSkill(id) {
    const skill = getSkillById(id);
    if (!skill) {
        alert('Habilidade não encontrada!');
        return;
    }

    const confirmDelete = confirm(`Tem certeza que deseja excluir a habilidade:\n\n"${skill.name}"?\n\nEsta ação não pode ser desfeita.`);

    if (confirmDelete) {
        skills = skills.filter(s => s.id !== id);
        saveData();
        renderData();
        showToast('Habilidade excluída com sucesso!');
    }
}

// ==================== EXPORTAR JSON ====================
function exportJSON() {
    if (skills.length === 0) {
        alert('Não há habilidades para exportar!');
        return;
    }

    try {
        const dataStr = JSON.stringify(skills, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `fp-learning-tracker-${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showToast('Aprendizado exportado com sucesso!');
    } catch (error) {
        console.error('Erro ao exportar:', error);
        alert('Erro ao exportar o aprendizado.');
    }
}

// ==================== IMPORTAR JSON ====================
function importJSON(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(event) {
        try {
            const importedData = JSON.parse(event.target.result);

            if (!Array.isArray(importedData)) {
                throw new Error('Formato de arquivo inválido');
            }

            // Validar estrutura básica
            const isValid = importedData.every(item =>
                item.id && item.name && item.category && item.status &&
                typeof item.level === 'number'
            );

            if (!isValid) {
                throw new Error('Arquivo contém dados inválidos');
            }

            // Perguntar ao usuário se quer substituir
            const shouldReplace = confirm(
                `Foram encontradas ${importedData.length} habilidade(s) no arquivo.\n\n` +
                `Você possui ${skills.length} habilidade(s) atualmente.\n\n` +
                `Clique em OK para SUBSTITUIR todos os seus dados\n` +
                `Clique em Cancelar para manter seus dados atuais`
            );

            if (shouldReplace) {
                // Substituir tudo
                skills = importedData;
                saveData();
                renderData();
                clearFilters();
                showToast(`${skills.length} habilidade(s) importada(s)!`);
            }

        } catch (error) {
            console.error('Erro ao importar:', error);
            alert('Erro ao importar arquivo. Verifique se é um JSON válido exportado pelo FP Learning Tracker.');
        }
    };

    reader.onerror = function() {
        alert('Erro ao ler o arquivo.');
    };

    reader.readAsText(file);

    // Limpar input para permitir reimportação do mesmo arquivo
    e.target.value = '';
}

// ==================== ATUALIZAR TIMESTAMP ====================
// Esta função é chamada automaticamente no handleFormSubmit
// ao criar ou editar uma habilidade
function updateTimestamp(skillId) {
    const skill = getSkillById(skillId);
    if (skill) {
        skill.updatedAt = new Date().toISOString();
        saveData();
    }
}

// ==================== FUNÇÕES AUXILIARES ====================

function getSkillById(id) {
    return skills.find(s => s.id === id);
}

function generateId() {
    return 'skill_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message) {
    // Toast simples usando console e título
    console.log('✅', message);

    // Feedback visual alternativo
    const originalTitle = document.title;
    document.title = `✅ ${message}`;
    setTimeout(() => {
        document.title = originalTitle;
    }, 2000);
}

// ==================== EXPOR FUNÇÕES GLOBALMENTE ====================
// Necessário para os event handlers inline no HTML
window.editSkill = editSkill;
window.deleteSkill = deleteSkill;
