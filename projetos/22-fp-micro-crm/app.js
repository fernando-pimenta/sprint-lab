// ========================================
// FP Micro CRM - Application Logic
// Sprint Lab #22
// ========================================

// ========================================
// Application State
// ========================================
let clients = [];
let currentClientId = null;
let currentView = 'kanban';
let filters = {
    search: '',
    status: '',
    source: '',
    action: ''
};

// ========================================
// LocalStorage Functions
// ========================================
function saveToLocalStorage() {
    localStorage.setItem('fpMicroCRM_clients', JSON.stringify(clients));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('fpMicroCRM_clients');
    if (data) {
        clients = JSON.parse(data);
    }
}

// ========================================
// Client CRUD Functions
// ========================================
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function createClient(clientData) {
    const newClient = {
        id: generateId(),
        ...clientData,
        projects: [],
        interactions: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    clients.push(newClient);
    saveToLocalStorage();
    return newClient;
}

function updateClient(id, clientData) {
    const index = clients.findIndex(c => c.id === id);
    if (index !== -1) {
        clients[index] = {
            ...clients[index],
            ...clientData,
            updatedAt: new Date().toISOString()
        };
        saveToLocalStorage();
        return clients[index];
    }
    return null;
}

function deleteClient(id) {
    const index = clients.findIndex(c => c.id === id);
    if (index !== -1) {
        clients.splice(index, 1);
        saveToLocalStorage();
        return true;
    }
    return false;
}

function getClientById(id) {
    return clients.find(c => c.id === id);
}

// ========================================
// Project Management Functions
// ========================================
function addProject(clientId, projectData) {
    const client = getClientById(clientId);
    if (client) {
        const newProject = {
            id: generateId(),
            ...projectData,
            createdAt: new Date().toISOString()
        };
        client.projects = client.projects || [];
        client.projects.push(newProject);
        saveToLocalStorage();
        return newProject;
    }
    return null;
}

function updateProject(clientId, projectId, projectData) {
    const client = getClientById(clientId);
    if (client && client.projects) {
        const index = client.projects.findIndex(p => p.id === projectId);
        if (index !== -1) {
            client.projects[index] = {
                ...client.projects[index],
                ...projectData
            };
            saveToLocalStorage();
            return client.projects[index];
        }
    }
    return null;
}

function deleteProject(clientId, projectId) {
    const client = getClientById(clientId);
    if (client && client.projects) {
        const index = client.projects.findIndex(p => p.id === projectId);
        if (index !== -1) {
            client.projects.splice(index, 1);
            saveToLocalStorage();
            return true;
        }
    }
    return false;
}

// ========================================
// Interaction History Functions
// ========================================
function addInteraction(clientId, interactionData) {
    const client = getClientById(clientId);
    if (client) {
        const newInteraction = {
            id: generateId(),
            ...interactionData,
            timestamp: new Date().toISOString()
        };
        client.interactions = client.interactions || [];
        client.interactions.push(newInteraction);
        saveToLocalStorage();
        return newInteraction;
    }
    return null;
}

// ========================================
// Dashboard Statistics
// ========================================
function calculateStats() {
    const stats = {
        totalLeads: 0,
        activeClients: 0,
        totalNegotiation: 0,
        totalLeadsEver: 0,
        totalConverted: 0
    };

    clients.forEach(client => {
        if (client.status === 'Lead') stats.totalLeads++;
        if (client.status === 'Cliente Ativo') stats.activeClients++;
        if (client.status === 'Negociação') {
            stats.totalNegotiation += parseFloat(client.value || 0);
        }
        if (client.status === 'Lead' || client.status === 'Negociação') {
            stats.totalLeadsEver++;
        }
        if (client.status === 'Cliente Ativo' || client.status === 'Concluído') {
            stats.totalConverted++;
        }
    });

    stats.conversionRate = stats.totalLeadsEver > 0
        ? ((stats.totalConverted / (stats.totalLeadsEver + stats.totalConverted)) * 100).toFixed(1)
        : 0;

    return stats;
}

function updateDashboard() {
    const stats = calculateStats();

    document.getElementById('totalLeads').textContent = stats.totalLeads;
    document.getElementById('activeClients').textContent = stats.activeClients;
    document.getElementById('totalNegotiation').textContent = `R$ ${stats.totalNegotiation.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById('conversionRate').textContent = `${stats.conversionRate}%`;
}

// ========================================
// Kanban Board Rendering
// ========================================
function renderKanban() {
    const statuses = ['Lead', 'Negociação', 'Cliente Ativo', 'Concluído', 'Perdido'];

    statuses.forEach(status => {
        const columnId = status.replace(' ', '');
        const columnBody = document.getElementById(`column${columnId}`);
        const countElement = document.getElementById(`count${columnId}`);

        if (!columnBody) return;

        columnBody.innerHTML = '';

        const filteredClients = getFilteredClients().filter(c => c.status === status);

        if (countElement) {
            countElement.textContent = filteredClients.length;
        }

        filteredClients.forEach(client => {
            const card = createKanbanCard(client);
            columnBody.appendChild(card);
        });
    });
}

function createKanbanCard(client) {
    const card = document.createElement('div');
    card.className = 'kanban-card';
    card.draggable = true;
    card.dataset.clientId = client.id;

    let tagsHTML = '';
    if (client.tags) {
        const tagArray = client.tags.split(',').map(t => t.trim()).filter(t => t);
        tagsHTML = tagArray.map(tag => `<span class="tag">${tag}</span>`).join('');
    }

    let nextActionHTML = '';
    if (client.nextAction) {
        nextActionHTML = `<div class="next-action">📌 ${client.nextAction}</div>`;
    }

    card.innerHTML = `
        <h4>${client.name}</h4>
        ${client.company ? `<div class="company">${client.company}</div>` : ''}
        ${client.value ? `<div class="value">R$ ${parseFloat(client.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>` : ''}
        ${nextActionHTML}
        ${tagsHTML ? `<div class="tags">${tagsHTML}</div>` : ''}
    `;

    // Event listeners
    card.addEventListener('click', () => openDetailPanel(client.id));
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);

    return card;
}

// ========================================
// Drag and Drop
// ========================================
let draggedElement = null;

function handleDragStart(e) {
    draggedElement = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (draggedElement) {
        const clientId = draggedElement.dataset.clientId;
        const newStatus = e.currentTarget.dataset.status;

        if (clientId && newStatus) {
            updateClient(clientId, { status: newStatus });
            renderKanban();
            updateDashboard();
        }
    }

    return false;
}

function setupDragAndDrop() {
    const columns = document.querySelectorAll('.column-body');
    columns.forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('drop', handleDrop);
    });
}

// ========================================
// List View Rendering
// ========================================
function renderList() {
    const listContainer = document.getElementById('clientList');
    listContainer.innerHTML = '';

    const filteredClients = getFilteredClients();

    if (filteredClients.length === 0) {
        listContainer.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Nenhum cliente encontrado.</p>';
        return;
    }

    filteredClients.forEach(client => {
        const item = document.createElement('div');
        item.className = 'client-list-item';

        const statusClass = client.status.replace(' ', '.');

        item.innerHTML = `
            <div>
                <strong>${client.name}</strong>
                ${client.company ? `<br><small>${client.company}</small>` : ''}
            </div>
            <div>${client.email}</div>
            <div><span class="status-badge ${statusClass}">${client.status}</span></div>
            <div>${client.value ? `R$ ${parseFloat(client.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '-'}</div>
            <div>${client.nextAction || '-'}</div>
            <div>
                <button class="btn btn-small btn-primary" onclick="openDetailPanel('${client.id}')">Ver Detalhes</button>
            </div>
        `;

        listContainer.appendChild(item);
    });
}

// ========================================
// Calendar View Rendering
// ========================================
function renderCalendar() {
    const calendarContainer = document.getElementById('calendarView');
    calendarContainer.innerHTML = '<h3>Próximas Ações</h3>';

    const clientsWithActions = clients
        .filter(c => c.nextActionDate)
        .sort((a, b) => new Date(a.nextActionDate) - new Date(b.nextActionDate));

    if (clientsWithActions.length === 0) {
        calendarContainer.innerHTML += '<p style="text-align: center; padding: 2rem; color: #666;">Nenhuma ação agendada.</p>';
        return;
    }

    clientsWithActions.forEach(client => {
        const item = document.createElement('div');
        item.className = 'calendar-item';
        item.style.cursor = 'pointer';

        const date = new Date(client.nextActionDate);
        const formattedDate = date.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        item.innerHTML = `
            <div class="date">📅 ${formattedDate}</div>
            <strong>${client.name}</strong>
            ${client.company ? ` - ${client.company}` : ''}
            <div>${client.nextAction || 'Sem descrição'}</div>
        `;

        item.addEventListener('click', () => openDetailPanel(client.id));

        calendarContainer.appendChild(item);
    });
}

// ========================================
// Filters and Search
// ========================================
function getFilteredClients() {
    return clients.filter(client => {
        // Search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            const matchesSearch =
                client.name.toLowerCase().includes(searchLower) ||
                (client.company && client.company.toLowerCase().includes(searchLower)) ||
                (client.email && client.email.toLowerCase().includes(searchLower)) ||
                (client.notes && client.notes.toLowerCase().includes(searchLower));

            if (!matchesSearch) return false;
        }

        // Status filter
        if (filters.status && client.status !== filters.status) {
            return false;
        }

        // Source filter
        if (filters.source && client.source !== filters.source) {
            return false;
        }

        // Action date filter
        if (filters.action) {
            if (!client.nextActionDate && filters.action === 'none') {
                return true;
            }
            if (!client.nextActionDate) {
                return false;
            }

            const actionDate = new Date(client.nextActionDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            const weekFromNow = new Date(today);
            weekFromNow.setDate(weekFromNow.getDate() + 7);

            const monthFromNow = new Date(today);
            monthFromNow.setMonth(monthFromNow.getMonth() + 1);

            switch (filters.action) {
                case 'today':
                    if (actionDate < today || actionDate >= tomorrow) return false;
                    break;
                case 'week':
                    if (actionDate < today || actionDate >= weekFromNow) return false;
                    break;
                case 'month':
                    if (actionDate < today || actionDate >= monthFromNow) return false;
                    break;
            }
        }

        return true;
    });
}

function applyFilters() {
    if (currentView === 'kanban') {
        renderKanban();
    } else if (currentView === 'list') {
        renderList();
    } else if (currentView === 'calendar') {
        renderCalendar();
    }
    updateDashboard();
}

// ========================================
// Alerts and Notifications
// ========================================
function checkAlerts() {
    const alerts = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const weekFromNow = new Date(today);
    weekFromNow.setDate(weekFromNow.getDate() + 7);

    clients.forEach(client => {
        if (client.nextActionDate) {
            const actionDate = new Date(client.nextActionDate);
            actionDate.setHours(0, 0, 0, 0);

            if (actionDate < today) {
                alerts.push({
                    type: 'overdue',
                    client: client,
                    message: `⚠️ Ação vencida: ${client.name} - ${client.nextAction}`
                });
            } else if (actionDate.getTime() === today.getTime()) {
                alerts.push({
                    type: 'today',
                    client: client,
                    message: `🔔 Hoje: ${client.name} - ${client.nextAction}`
                });
            } else if (actionDate < weekFromNow) {
                alerts.push({
                    type: 'week',
                    client: client,
                    message: `📅 Esta semana: ${client.name} - ${client.nextAction}`
                });
            }
        }
    });

    return alerts;
}

function updateAlerts() {
    const alerts = checkAlerts();
    const badge = document.getElementById('notificationBadge');
    const alertsList = document.getElementById('alertsList');

    badge.textContent = alerts.length;

    if (alerts.length === 0) {
        alertsList.innerHTML = '<p style="color: #666;">Nenhum alerta no momento.</p>';
    } else {
        alertsList.innerHTML = '';
        alerts.forEach(alert => {
            const alertItem = document.createElement('div');
            alertItem.className = `alert-item ${alert.type}`;
            alertItem.innerHTML = `
                <span>${alert.message}</span>
                <button class="btn btn-small btn-primary" onclick="openDetailPanel('${alert.client.id}')">Ver</button>
            `;
            alertsList.appendChild(alertItem);
        });
    }
}

// ========================================
// Detail Panel
// ========================================
function openDetailPanel(clientId) {
    currentClientId = clientId;
    const client = getClientById(clientId);

    if (!client) return;

    const panel = document.getElementById('detailPanel');
    document.getElementById('detailClientName').textContent = client.name;

    // Render info tab
    renderClientInfo(client);

    // Render projects tab
    renderProjects(client);

    // Render history tab
    renderHistory(client);

    panel.classList.add('active');
}

function closeDetailPanel() {
    document.getElementById('detailPanel').classList.remove('active');
    currentClientId = null;
}

function renderClientInfo(client) {
    const infoContainer = document.getElementById('detailInfo');

    const tags = client.tags ? client.tags.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('') : 'Nenhuma';

    infoContainer.innerHTML = `
        <div class="info-row"><strong>Empresa:</strong><span>${client.company || '-'}</span></div>
        <div class="info-row"><strong>Email:</strong><span>${client.email}</span></div>
        <div class="info-row"><strong>Telefone:</strong><span>${client.phone || '-'}</span></div>
        <div class="info-row"><strong>Site:</strong><span>${client.website ? `<a href="${client.website}" target="_blank">${client.website}</a>` : '-'}</span></div>
        <div class="info-row"><strong>Fonte:</strong><span>${client.source}</span></div>
        <div class="info-row"><strong>Status:</strong><span>${client.status}</span></div>
        <div class="info-row"><strong>Valor Potencial:</strong><span>${client.value ? `R$ ${parseFloat(client.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '-'}</span></div>
        <div class="info-row"><strong>Próxima Ação:</strong><span>${client.nextAction || '-'}</span></div>
        <div class="info-row"><strong>Data:</strong><span>${client.nextActionDate ? new Date(client.nextActionDate).toLocaleDateString('pt-BR') : '-'}</span></div>
        <div class="info-row"><strong>Tags:</strong><span>${tags}</span></div>
        <div class="info-row"><strong>Notas:</strong><span>${client.notes || '-'}</span></div>
        <div style="margin-top: 1rem;">
            <button class="btn btn-primary" onclick="editClient('${client.id}')">✏️ Editar Cliente</button>
        </div>
    `;
}

function renderProjects(client) {
    const projectsContainer = document.getElementById('projectsList');

    if (!client.projects || client.projects.length === 0) {
        projectsContainer.innerHTML = '<p style="color: #666; margin-top: 1rem;">Nenhum projeto vinculado.</p>';
        return;
    }

    projectsContainer.innerHTML = '';

    client.projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';

        projectItem.innerHTML = `
            <h4>${project.name}</h4>
            <div><strong>Tipo:</strong> ${project.type}</div>
            <div><strong>Status:</strong> ${project.status}</div>
            <div><strong>Valor:</strong> ${project.value ? `R$ ${parseFloat(project.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '-'}</div>
            ${project.startDate ? `<div><strong>Início:</strong> ${new Date(project.startDate).toLocaleDateString('pt-BR')}</div>` : ''}
            ${project.endDate ? `<div><strong>Conclusão:</strong> ${new Date(project.endDate).toLocaleDateString('pt-BR')}</div>` : ''}
            ${project.description ? `<div style="margin-top: 0.5rem;">${project.description}</div>` : ''}
        `;

        projectsContainer.appendChild(projectItem);
    });
}

function renderHistory(client) {
    const historyContainer = document.getElementById('interactionsList');

    if (!client.interactions || client.interactions.length === 0) {
        historyContainer.innerHTML = '<p style="color: #666; margin-top: 1rem;">Nenhuma interação registrada.</p>';
        return;
    }

    historyContainer.innerHTML = '';

    // Sort by timestamp descending (most recent first)
    const sortedInteractions = [...client.interactions].sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
    );

    sortedInteractions.forEach(interaction => {
        const interactionItem = document.createElement('div');
        interactionItem.className = 'interaction-item';

        const date = new Date(interaction.timestamp);
        const formattedDate = date.toLocaleString('pt-BR');

        interactionItem.innerHTML = `
            <div class="timestamp">${formattedDate}</div>
            <h4>${interaction.type}</h4>
            <div>${interaction.summary}</div>
            ${interaction.nextSteps ? `<div style="margin-top: 0.5rem;"><strong>Próximos passos:</strong> ${interaction.nextSteps}</div>` : ''}
        `;

        historyContainer.appendChild(interactionItem);
    });
}

// ========================================
// Modal Functions
// ========================================
function openClientModal(clientId = null) {
    const modal = document.getElementById('clientModal');
    const form = document.getElementById('clientForm');
    const modalTitle = document.getElementById('modalTitle');
    const deleteBtn = document.getElementById('deleteBtn');

    form.reset();

    if (clientId) {
        const client = getClientById(clientId);
        if (client) {
            modalTitle.textContent = 'Editar Cliente';
            deleteBtn.style.display = 'inline-block';

            document.getElementById('clientId').value = client.id;
            document.getElementById('clientName').value = client.name;
            document.getElementById('clientCompany').value = client.company || '';
            document.getElementById('clientEmail').value = client.email;
            document.getElementById('clientPhone').value = client.phone || '';
            document.getElementById('clientWebsite').value = client.website || '';
            document.getElementById('clientSource').value = client.source;
            document.getElementById('clientStatus').value = client.status;
            document.getElementById('clientValue').value = client.value || '';
            document.getElementById('clientNextAction').value = client.nextAction || '';
            document.getElementById('clientNextActionDate').value = client.nextActionDate || '';
            document.getElementById('clientTags').value = client.tags || '';
            document.getElementById('clientNotes').value = client.notes || '';
        }
    } else {
        modalTitle.textContent = 'Novo Cliente';
        deleteBtn.style.display = 'none';
    }

    modal.classList.add('active');
}

function closeClientModal() {
    document.getElementById('clientModal').classList.remove('active');
}

function editClient(clientId) {
    closeDetailPanel();
    openClientModal(clientId);
}

// ========================================
// Project Modal Functions
// ========================================
function openProjectModal() {
    const modal = document.getElementById('projectModal');
    const form = document.getElementById('projectForm');

    form.reset();
    document.getElementById('projectClientId').value = currentClientId;

    modal.classList.add('active');
}

function closeProjectModal() {
    document.getElementById('projectModal').classList.remove('active');
}

// ========================================
// Interaction Modal Functions
// ========================================
function openInteractionModal() {
    const modal = document.getElementById('interactionModal');
    const form = document.getElementById('interactionForm');

    form.reset();
    document.getElementById('interactionClientId').value = currentClientId;

    modal.classList.add('active');
}

function closeInteractionModal() {
    document.getElementById('interactionModal').classList.remove('active');
}

// ========================================
// Export/Import Functions
// ========================================
function exportJSON() {
    const data = {
        clients: clients,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fp-micro-crm-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function exportCSV() {
    const headers = ['Nome', 'Empresa', 'Email', 'Telefone', 'Status', 'Fonte', 'Valor Potencial', 'Próxima Ação', 'Data Próxima Ação'];

    const rows = clients.map(client => [
        client.name,
        client.company || '',
        client.email,
        client.phone || '',
        client.status,
        client.source,
        client.value || '',
        client.nextAction || '',
        client.nextActionDate || ''
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
        csv += row.map(field => `"${field}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fp-micro-crm-export-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

function importJSON(file) {
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);

            if (data.clients && Array.isArray(data.clients)) {
                // Merge with existing clients
                data.clients.forEach(importedClient => {
                    const existingIndex = clients.findIndex(c => c.id === importedClient.id);
                    if (existingIndex === -1) {
                        clients.push(importedClient);
                    }
                });

                saveToLocalStorage();
                refreshView();
                alert('Dados importados com sucesso!');
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
    if (tabName === 'kanban') {
        renderKanban();
    } else if (tabName === 'list') {
        renderList();
    } else if (tabName === 'calendar') {
        renderCalendar();
    }
}

function refreshView() {
    if (currentView === 'kanban') {
        renderKanban();
    } else if (currentView === 'list') {
        renderList();
    } else if (currentView === 'calendar') {
        renderCalendar();
    }
    updateDashboard();
    updateAlerts();
}

// ========================================
// Event Listeners
// ========================================
function setupEventListeners() {
    // New Client Button
    document.getElementById('newClientBtn').addEventListener('click', () => openClientModal());

    // Close Modals
    document.getElementById('closeModal').addEventListener('click', closeClientModal);
    document.getElementById('cancelBtn').addEventListener('click', closeClientModal);
    document.getElementById('closeProjectModal').addEventListener('click', closeProjectModal);
    document.getElementById('cancelProjectBtn').addEventListener('click', closeProjectModal);
    document.getElementById('closeInteractionModal').addEventListener('click', closeInteractionModal);
    document.getElementById('cancelInteractionBtn').addEventListener('click', closeInteractionModal);
    document.getElementById('closeExportModal').addEventListener('click', () => {
        document.getElementById('exportModal').classList.remove('active');
    });

    // Close Detail Panel
    document.getElementById('closeDetailPanel').addEventListener('click', closeDetailPanel);

    // Client Form Submit
    document.getElementById('clientForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const clientId = document.getElementById('clientId').value;

        const clientData = {
            name: document.getElementById('clientName').value,
            company: document.getElementById('clientCompany').value,
            email: document.getElementById('clientEmail').value,
            phone: document.getElementById('clientPhone').value,
            website: document.getElementById('clientWebsite').value,
            source: document.getElementById('clientSource').value,
            status: document.getElementById('clientStatus').value,
            value: document.getElementById('clientValue').value,
            nextAction: document.getElementById('clientNextAction').value,
            nextActionDate: document.getElementById('clientNextActionDate').value,
            tags: document.getElementById('clientTags').value,
            notes: document.getElementById('clientNotes').value
        };

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(clientData.email)) {
            alert('Por favor, insira um email válido.');
            return;
        }

        // Validate value
        if (clientData.value && parseFloat(clientData.value) < 0) {
            alert('O valor potencial não pode ser negativo.');
            return;
        }

        // Validate next action date
        if (clientData.nextActionDate) {
            const actionDate = new Date(clientData.nextActionDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (actionDate < today) {
                alert('A data da próxima ação não pode ser anterior a hoje.');
                return;
            }
        }

        if (clientId) {
            updateClient(clientId, clientData);
        } else {
            createClient(clientData);
        }

        closeClientModal();
        refreshView();
    });

    // Delete Client Button
    document.getElementById('deleteBtn').addEventListener('click', function() {
        const clientId = document.getElementById('clientId').value;

        if (confirm('Tem certeza que deseja excluir este cliente?')) {
            deleteClient(clientId);
            closeClientModal();
            refreshView();
        }
    });

    // Project Form Submit
    document.getElementById('projectForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const clientId = document.getElementById('projectClientId').value;

        const projectData = {
            name: document.getElementById('projectName').value,
            type: document.getElementById('projectType').value,
            value: document.getElementById('projectValue').value,
            status: document.getElementById('projectStatus').value,
            startDate: document.getElementById('projectStartDate').value,
            endDate: document.getElementById('projectEndDate').value,
            description: document.getElementById('projectDescription').value
        };

        addProject(clientId, projectData);
        closeProjectModal();

        // Refresh detail panel
        const client = getClientById(clientId);
        if (client) {
            renderProjects(client);
        }
    });

    // Interaction Form Submit
    document.getElementById('interactionForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const clientId = document.getElementById('interactionClientId').value;

        const interactionData = {
            type: document.getElementById('interactionType').value,
            summary: document.getElementById('interactionSummary').value,
            nextSteps: document.getElementById('interactionNextSteps').value
        };

        addInteraction(clientId, interactionData);
        closeInteractionModal();

        // Refresh detail panel
        const client = getClientById(clientId);
        if (client) {
            renderHistory(client);
        }
    });

    // Add Project Button
    document.getElementById('addProjectBtn').addEventListener('click', openProjectModal);

    // Add Interaction Button
    document.getElementById('addInteractionBtn').addEventListener('click', openInteractionModal);

    // Detail Panel Tabs
    document.querySelectorAll('.detail-tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.detailTab;

            document.querySelectorAll('.detail-tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            document.querySelectorAll('.detail-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`detail${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).classList.add('active');
        });
    });

    // Main Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });

    // Notification Button
    document.getElementById('notificationBtn').addEventListener('click', function() {
        const panel = document.getElementById('alertPanel');
        if (panel.style.display === 'none' || !panel.style.display) {
            panel.style.display = 'block';
        } else {
            panel.style.display = 'none';
        }
    });

    // Search Input
    document.getElementById('searchInput').addEventListener('input', function(e) {
        filters.search = e.target.value;
        applyFilters();
    });

    // Filter Selects
    document.getElementById('filterStatus').addEventListener('change', function(e) {
        filters.status = e.target.value;
        applyFilters();
    });

    document.getElementById('filterSource').addEventListener('change', function(e) {
        filters.source = e.target.value;
        applyFilters();
    });

    document.getElementById('filterAction').addEventListener('change', function(e) {
        filters.action = e.target.value;
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
    setupDragAndDrop();
    renderKanban();
    updateDashboard();
    updateAlerts();
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
