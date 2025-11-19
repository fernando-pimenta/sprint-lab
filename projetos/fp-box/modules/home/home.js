// ==================== HOME MODULE ====================

function initModule() {
    console.log('Home module initialized');
    renderModulesList();
}

function renderModulesList() {
    const modulesListContainer = document.getElementById('modulesList');

    if (!modulesListContainer) {
        console.error('modulesList container not found');
        return;
    }

    // Limpar conteúdo anterior
    modulesListContainer.innerHTML = '';

    // Obter módulos da configuração global
    const modules = window.FPBoxModules || [];

    if (modules.length === 0) {
        modulesListContainer.innerHTML = '<p style="color: #94a3b8;">Nenhum módulo encontrado.</p>';
        return;
    }

    // Renderizar cada módulo
    modules.forEach(module => {
        const moduleCard = document.createElement('div');
        moduleCard.className = 'module-card';
        moduleCard.onclick = () => {
            if (typeof window.loadModule === 'function') {
                window.loadModule(module.id);
            }
        };

        const moduleName = document.createElement('div');
        moduleName.className = 'module-card-name';
        moduleName.textContent = module.name;

        const moduleStatus = document.createElement('div');
        moduleStatus.className = 'module-card-status';
        moduleStatus.textContent = module.id === 'home' ? 'Módulo atual' : 'Clique para acessar';

        moduleCard.appendChild(moduleName);
        moduleCard.appendChild(moduleStatus);
        modulesListContainer.appendChild(moduleCard);
    });
}

// Expor função de inicialização globalmente
window.initModule = initModule;
