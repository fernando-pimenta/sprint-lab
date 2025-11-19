// ==================== PLACEHOLDER MODULE ====================

function initModule() {
    console.log('Placeholder module initialized');
    setupDemoButton();
}

function setupDemoButton() {
    const demoButton = document.getElementById('demoButton');
    const demoOutput = document.getElementById('demoOutput');

    if (!demoButton || !demoOutput) {
        console.error('Demo elements not found');
        return;
    }

    demoButton.addEventListener('click', () => {
        // Limpar output anterior
        demoOutput.innerHTML = '';

        // Criar mensagem de demonstração
        const message = document.createElement('div');
        message.className = 'demo-message';
        message.textContent = '✅ Módulo funcionando perfeitamente! Este é um exemplo de interação.';

        // Exibir mensagem
        demoOutput.appendChild(message);

        // Remover mensagem após 3 segundos
        setTimeout(() => {
            message.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                demoOutput.innerHTML = '';
            }, 500);
        }, 3000);
    });
}

// Expor função de inicialização globalmente
window.initModule = initModule;
