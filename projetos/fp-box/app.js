// ==================== CONFIGURAÇÃO DOS MÓDULOS ====================
const FPBoxModules = [
    { id: 'home', name: '🏠 Home', path: 'modules/home/' },
    { id: 'placeholder', name: '📦 Módulo Exemplo', path: 'modules/placeholder/' }
];

// ==================== ELEMENTOS DO DOM ====================
const elements = {
    menuList: document.getElementById('menuList'),
    contentArea: document.getElementById('contentArea'),
    pageTitle: document.getElementById('pageTitle'),
    sidebar: document.getElementById('sidebar'),
    mobileToggle: document.getElementById('mobileToggle'),
    modalAbout: document.getElementById('modalAbout'),
    btnAbout: document.getElementById('btnAbout'),
    modalClose: document.getElementById('modalClose')
};

// ==================== ESTADO DA APLICAÇÃO ====================
let currentModule = null;

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    renderMenu();
    setupEventListeners();
    loadModule('home'); // Carrega módulo inicial
}

// ==================== RENDERIZAÇÃO DO MENU ====================
function renderMenu() {
    elements.menuList.innerHTML = '';

    FPBoxModules.forEach(module => {
        const li = document.createElement('li');
        li.className = 'menu-item';

        const link = document.createElement('a');
        link.className = 'menu-link';
        link.textContent = module.name;
        link.dataset.moduleId = module.id;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadModule(module.id);

            // Fechar sidebar no mobile após clicar
            if (window.innerWidth <= 768) {
                elements.sidebar.classList.remove('open');
            }
        });

        li.appendChild(link);
        elements.menuList.appendChild(li);
    });
}

// ==================== CARREGAMENTO DE MÓDULOS ====================
async function loadModule(moduleName) {
    try {
        // Encontrar configuração do módulo
        const moduleConfig = FPBoxModules.find(m => m.id === moduleName);

        if (!moduleConfig) {
            console.error(`Módulo '${moduleName}' não encontrado`);
            showError('Módulo não encontrado');
            return;
        }

        // Mostrar loading
        elements.contentArea.innerHTML = '<div class="loading">Carregando módulo...</div>';

        // Carregar HTML do módulo
        const htmlPath = `${moduleConfig.path}${moduleName}.html`;
        const htmlResponse = await fetch(htmlPath);

        if (!htmlResponse.ok) {
            throw new Error(`Erro ao carregar HTML: ${htmlResponse.status}`);
        }

        const htmlContent = await htmlResponse.text();

        // Injetar HTML no content area
        elements.contentArea.innerHTML = htmlContent;

        // Carregar e executar JavaScript do módulo
        const jsPath = `${moduleConfig.path}${moduleName}.js`;
        await loadModuleScript(jsPath);

        // Atualizar estado
        currentModule = moduleName;
        setActiveMenuItem(moduleName);
        updatePageTitle(moduleConfig.name);

        // Executar função de inicialização do módulo (se existir)
        if (typeof window.initModule === 'function') {
            window.initModule();
        }

    } catch (error) {
        console.error('Erro ao carregar módulo:', error);
        showError(`Erro ao carregar o módulo: ${error.message}`);
    }
}

// ==================== CARREGAMENTO DINÂMICO DE SCRIPTS ====================
function loadModuleScript(scriptPath) {
    return new Promise((resolve, reject) => {
        // Remover script anterior se existir
        const oldScript = document.querySelector(`script[data-module-script]`);
        if (oldScript) {
            oldScript.remove();
        }

        // Criar novo script
        const script = document.createElement('script');
        script.src = scriptPath;
        script.dataset.moduleScript = 'true';

        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Falha ao carregar script: ${scriptPath}`));

        document.body.appendChild(script);
    });
}

// ==================== ATUALIZAR MENU ATIVO ====================
function setActiveMenuItem(moduleName) {
    // Remover classe active de todos os itens
    document.querySelectorAll('.menu-link').forEach(link => {
        link.classList.remove('active');
    });

    // Adicionar classe active ao item correspondente
    const activeLink = document.querySelector(`.menu-link[data-module-id="${moduleName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// ==================== ATUALIZAR TÍTULO DA PÁGINA ====================
function updatePageTitle(title) {
    // Remover emoji do título se existir
    const cleanTitle = title.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
    elements.pageTitle.textContent = cleanTitle;
}

// ==================== EXIBIR ERRO ====================
function showError(message) {
    elements.contentArea.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #ef4444;">
            <h2 style="font-size: 2rem; margin-bottom: 1rem;">⚠️ Erro</h2>
            <p style="font-size: 1.1rem;">${message}</p>
            <button onclick="loadModule('home')" style="margin-top: 2rem; padding: 0.75rem 1.5rem; background: linear-gradient(135deg, #f59e0b 0%, #fb923c 100%); border: none; border-radius: 8px; color: #1a1a0f; font-weight: 600; cursor: pointer;">
                Voltar ao Início
            </button>
        </div>
    `;
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    // Mobile toggle
    elements.mobileToggle?.addEventListener('click', () => {
        elements.sidebar.classList.toggle('open');
    });

    // Fechar sidebar ao clicar fora (mobile)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!elements.sidebar.contains(e.target) && !elements.mobileToggle.contains(e.target)) {
                elements.sidebar.classList.remove('open');
            }
        }
    });

    // Modal About
    elements.btnAbout?.addEventListener('click', () => {
        elements.modalAbout.classList.add('show');
    });

    elements.modalClose?.addEventListener('click', () => {
        elements.modalAbout.classList.remove('show');
    });

    // Fechar modal ao clicar fora
    elements.modalAbout?.addEventListener('click', (e) => {
        if (e.target === elements.modalAbout) {
            elements.modalAbout.classList.remove('show');
        }
    });

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.modalAbout.classList.contains('show')) {
            elements.modalAbout.classList.remove('show');
        }
    });
}

// ==================== EXPOR FUNÇÕES GLOBAIS ====================
window.loadModule = loadModule;
window.FPBoxModules = FPBoxModules;
