// FP Email Template Builder - App Logic

class EmailTemplateBuilder {
    constructor() {
        this.templates = [];
        this.currentTemplate = null;
        this.editingId = null;
        this.autoSaveInterval = null;
        this.previewMode = 'desktop';

        this.init();
    }

    init() {
        this.loadTemplates();
        this.renderTemplates();
        this.setupEventListeners();
        this.loadPredefinedTemplates();
    }

    // ==================== STORAGE ====================

    loadTemplates() {
        const stored = localStorage.getItem('fpEmailTemplates');
        this.templates = stored ? JSON.parse(stored) : [];
    }

    saveToStorage() {
        localStorage.setItem('fpEmailTemplates', JSON.stringify(this.templates));
    }

    // ==================== CRUD OPERATIONS ====================

    createTemplate(data) {
        const template = {
            id: Date.now().toString(),
            name: data.name,
            subject: data.subject || '',
            category: data.category || 'Newsletter',
            platform: data.platform || 'Genérico',
            status: data.status || 'Rascunho',
            notes: data.notes || '',
            html: data.html || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.templates.unshift(template);
        this.saveToStorage();
        return template;
    }

    updateTemplate(id, data) {
        const index = this.templates.findIndex(t => t.id === id);
        if (index !== -1) {
            this.templates[index] = {
                ...this.templates[index],
                ...data,
                updatedAt: new Date().toISOString()
            };
            this.saveToStorage();
            return this.templates[index];
        }
        return null;
    }

    deleteTemplate(id) {
        if (confirm('Tem certeza que deseja excluir este template?')) {
            this.templates = this.templates.filter(t => t.id !== id);
            this.saveToStorage();
            this.renderTemplates();
        }
    }

    duplicateTemplate(id) {
        const template = this.templates.find(t => t.id === id);
        if (template) {
            const duplicate = {
                ...template,
                id: Date.now().toString(),
                name: `${template.name} (Cópia)`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            this.templates.unshift(duplicate);
            this.saveToStorage();
            this.renderTemplates();
        }
    }

    getTemplate(id) {
        return this.templates.find(t => t.id === id);
    }

    // ==================== UI RENDERING ====================

    renderTemplates() {
        const listView = document.getElementById('templatesList');
        const emptyState = document.getElementById('emptyState');

        const filtered = this.getFilteredTemplates();

        if (filtered.length === 0) {
            listView.style.display = 'none';
            emptyState.style.display = 'block';
        } else {
            listView.style.display = 'grid';
            emptyState.style.display = 'none';

            listView.innerHTML = filtered.map(template => `
                <div class="template-card">
                    <div class="template-card-header">
                        <div>
                            <div class="template-card-title">${this.escapeHtml(template.name)}</div>
                            ${template.subject ? `<div class="template-card-subject">${this.escapeHtml(template.subject)}</div>` : ''}
                        </div>
                    </div>
                    <div class="template-card-meta">
                        <span class="badge badge-category">${template.category}</span>
                        <span class="badge badge-status status-${template.status.toLowerCase().replace('ç', 'c')}">${template.status}</span>
                        <span class="badge badge-platform">${template.platform}</span>
                    </div>
                    <div class="template-card-dates">
                        Criado: ${this.formatDate(template.createdAt)}<br>
                        Atualizado: ${this.formatDate(template.updatedAt)}
                    </div>
                    <div class="template-card-actions">
                        <button class="btn btn-primary" onclick="app.openEditor('${template.id}')">
                            ✏️ Editar
                        </button>
                        <button class="btn btn-secondary" onclick="app.showEditModal('${template.id}')">
                            ⚙️ Config
                        </button>
                        <button class="btn" onclick="app.duplicateTemplate('${template.id}')">
                            📋 Duplicar
                        </button>
                        <button class="btn btn-danger" onclick="app.deleteTemplate('${template.id}')">
                            🗑️ Excluir
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    getFilteredTemplates() {
        const category = document.getElementById('filterCategory')?.value || '';
        const status = document.getElementById('filterStatus')?.value || '';
        const search = document.getElementById('searchTemplates')?.value.toLowerCase() || '';

        return this.templates.filter(template => {
            const matchCategory = !category || template.category === category;
            const matchStatus = !status || template.status === status;
            const matchSearch = !search ||
                template.name.toLowerCase().includes(search) ||
                (template.subject && template.subject.toLowerCase().includes(search));

            return matchCategory && matchStatus && matchSearch;
        });
    }

    filterTemplates() {
        this.renderTemplates();
    }

    // ==================== MODAL MANAGEMENT ====================

    showCreateModal() {
        document.getElementById('modalTitle').textContent = 'Novo Template';
        document.getElementById('submitBtnText').textContent = 'Criar Template';
        document.getElementById('templateForm').reset();
        document.getElementById('subjectCounter').textContent = '0';
        this.editingId = null;
        this.openModal('templateModal');
    }

    showEditModal(id) {
        const template = this.getTemplate(id);
        if (!template) return;

        document.getElementById('modalTitle').textContent = 'Editar Template';
        document.getElementById('submitBtnText').textContent = 'Salvar Alterações';
        document.getElementById('templateName').value = template.name;
        document.getElementById('templateSubject').value = template.subject;
        document.getElementById('templateCategory').value = template.category;
        document.getElementById('templatePlatform').value = template.platform;
        document.getElementById('templateStatus').value = template.status;
        document.getElementById('templateNotes').value = template.notes;
        document.getElementById('subjectCounter').textContent = template.subject.length;

        this.editingId = id;
        this.openModal('templateModal');
    }

    openModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }

    closeModal() {
        document.getElementById('templateModal').classList.remove('active');
        this.editingId = null;
    }

    closeLibraryModal() {
        document.getElementById('libraryModal').classList.remove('active');
    }

    closeCompatibilityModal() {
        document.getElementById('compatibilityModal').classList.remove('active');
    }

    // ==================== EDITOR ====================

    openEditor(id) {
        const template = this.getTemplate(id);
        if (!template) return;

        this.currentTemplate = template;
        document.getElementById('editorTemplateName').value = template.name;
        document.getElementById('codeEditor').value = template.html;

        document.getElementById('listView').classList.remove('active');
        document.getElementById('editorView').classList.add('active');

        this.updatePreview();
        this.startAutoSave();
    }

    closeEditor() {
        if (this.currentTemplate) {
            // Save before closing
            this.saveCurrentTemplate();
        }

        this.stopAutoSave();
        this.currentTemplate = null;

        document.getElementById('editorView').classList.remove('active');
        document.getElementById('listView').classList.add('active');

        this.renderTemplates();
    }

    saveCurrentTemplate() {
        if (!this.currentTemplate) return;

        const html = document.getElementById('codeEditor').value;
        this.updateTemplate(this.currentTemplate.id, { html });

        document.getElementById('autoSaveIndicator').textContent = '✓ Salvo';
        setTimeout(() => {
            document.getElementById('autoSaveIndicator').textContent = '';
        }, 2000);
    }

    saveTemplate() {
        this.saveCurrentTemplate();
        alert('Template salvo com sucesso!');
    }

    // ==================== AUTO-SAVE ====================

    startAutoSave() {
        this.stopAutoSave();
        this.autoSaveInterval = setInterval(() => {
            if (this.currentTemplate) {
                this.saveCurrentTemplate();
            }
        }, 30000); // 30 seconds
    }

    stopAutoSave() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
            this.autoSaveInterval = null;
        }
    }

    // ==================== PREVIEW ====================

    updatePreview() {
        const html = document.getElementById('codeEditor').value;
        const processedHtml = this.replaceVariables(html);

        const frame = document.getElementById('previewFrame');
        const doc = frame.contentDocument || frame.contentWindow.document;

        doc.open();
        doc.write(processedHtml);
        doc.close();
    }

    replaceVariables(html) {
        const variables = {
            '{{nome}}': 'João Silva',
            '{{email}}': 'joao@exemplo.com',
            '{{produto}}': 'Plano Premium',
            '{{preco}}': 'R$ 99,90',
            '{{link}}': '#',
            '{{data}}': new Date().toLocaleDateString('pt-BR')
        };

        let result = html;
        for (const [key, value] of Object.entries(variables)) {
            result = result.replaceAll(key, value);
        }
        return result;
    }

    togglePreviewMode(mode) {
        this.previewMode = mode;
        const frame = document.getElementById('previewFrame');
        const buttons = document.querySelectorAll('.preview-btn');

        buttons.forEach(btn => {
            if (btn.dataset.view === mode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        if (mode === 'mobile') {
            frame.classList.add('mobile-view');
        } else {
            frame.classList.remove('mobile-view');
        }
    }

    // ==================== BLOCKS LIBRARY ====================

    getBlock(type) {
        const blocks = {
            header: `<table width="100%" bgcolor="#283593" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-family: Arial, sans-serif;">Seu Logo</h1>
    </td>
  </tr>
</table>`,

            hero: `<table width="100%" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 40px; text-align: center; background: #f5f5f5;">
      <h2 style="color: #283593; font-size: 32px; margin: 0 0 15px 0; font-family: Arial, sans-serif;">Título Principal</h2>
      <p style="color: #1a1a1a; font-size: 18px; margin: 0 0 25px 0; font-family: Arial, sans-serif;">Descrição do conteúdo</p>
      <a href="#" style="display: inline-block; padding: 15px 30px; background: #ffa70a; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-family: Arial, sans-serif;">Call to Action</a>
    </td>
  </tr>
</table>`,

            text: `<table width="100%" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 20px;">
      <p style="color: #1a1a1a; font-size: 16px; line-height: 1.6; margin: 0; font-family: Arial, sans-serif;">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </td>
  </tr>
</table>`,

            product: `<table width="100%" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 20px; text-align: center;">
      <img src="https://via.placeholder.com/300x200" width="300" style="display: block; margin: 0 auto; border-radius: 8px;">
      <h3 style="color: #283593; font-family: Arial, sans-serif; margin: 15px 0;">{{produto}}</h3>
      <p style="color: #1a1a1a; font-family: Arial, sans-serif; margin: 10px 0;">Descrição do produto aqui</p>
      <p style="color: #ffa70a; font-size: 24px; font-weight: bold; font-family: Arial, sans-serif; margin: 15px 0;">{{preco}}</p>
      <a href="{{link}}" style="display: inline-block; padding: 12px 25px; background: #3949ab; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-family: Arial, sans-serif;">Comprar Agora</a>
    </td>
  </tr>
</table>`,

            cta: `<table width="100%" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 30px; text-align: center;">
      <a href="#" style="display: inline-block; padding: 15px 40px; background: #ffa70a; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 18px; font-weight: bold; font-family: Arial, sans-serif;">Clique Aqui</a>
    </td>
  </tr>
</table>`,

            footer: `<table width="100%" bgcolor="#283593" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 30px; text-align: center; color: #ffffff; font-family: Arial, sans-serif;">
      <p style="margin: 0 0 10px 0;">© 2025 Seu Nome | <a href="#" style="color: #ffa70a; text-decoration: none;">Descadastrar</a></p>
      <p style="margin: 0;">Redes Sociais: <a href="#" style="color: #ffffff; text-decoration: none;">Instagram</a> | <a href="#" style="color: #ffffff; text-decoration: none;">LinkedIn</a></p>
    </td>
  </tr>
</table>`,

            divider: `<table width="100%" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 20px;">
      <hr style="border: none; border-top: 2px solid #e0e0e0; margin: 0;">
    </td>
  </tr>
</table>`,

            spacer: `<table width="100%" style="border-collapse: collapse;">
  <tr>
    <td style="padding: 30px;">
      <!-- Espaçador -->
    </td>
  </tr>
</table>`
        };

        return blocks[type] || '';
    }

    insertBlock(type) {
        const block = this.getBlock(type);
        const editor = document.getElementById('codeEditor');
        const cursorPos = editor.selectionStart;
        const textBefore = editor.value.substring(0, cursorPos);
        const textAfter = editor.value.substring(cursorPos);

        editor.value = textBefore + '\n\n' + block + '\n\n' + textAfter;

        // Update preview
        this.updatePreview();

        // Switch to editor tab
        this.switchTab('editor');
    }

    insertVariable(variable) {
        const editor = document.getElementById('codeEditor');
        const cursorPos = editor.selectionStart;
        const textBefore = editor.value.substring(0, cursorPos);
        const textAfter = editor.value.substring(cursorPos);

        editor.value = textBefore + variable + textAfter;
        editor.focus();
        editor.selectionStart = editor.selectionEnd = cursorPos + variable.length;

        this.updatePreview();
    }

    switchTab(tabName) {
        const tabs = document.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        contents.forEach(content => {
            if (content.id === tabName + 'Tab') {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    // ==================== PREDEFINED TEMPLATES ====================

    loadPredefinedTemplates() {
        this.predefinedTemplates = [
            {
                name: 'Newsletter Simples',
                description: 'Template clean para newsletters semanais',
                category: 'Newsletter',
                html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background: #f5f5f5; font-family: Arial, sans-serif;">
    <table width="100%" style="background: #f5f5f5; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" style="background: #ffffff; border-radius: 8px; overflow: hidden;">
                    ${this.getBlock('header')}
                    ${this.getBlock('hero')}
                    ${this.getBlock('text')}
                    ${this.getBlock('cta')}
                    ${this.getBlock('footer')}
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
            },
            {
                name: 'Email Promocional (Black Friday)',
                description: 'Template para promoções e ofertas especiais',
                category: 'Promocional',
                html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background: #000000; font-family: Arial, sans-serif;">
    <table width="100%" style="background: #000000; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" style="background: #ffffff; border-radius: 8px; overflow: hidden;">
                    <table width="100%" bgcolor="#000000" style="border-collapse: collapse;">
                        <tr>
                            <td style="padding: 30px; text-align: center;">
                                <h1 style="color: #ffa70a; margin: 0; font-size: 48px;">BLACK FRIDAY</h1>
                                <p style="color: #ffffff; font-size: 24px; margin: 10px 0;">Até 70% OFF</p>
                            </td>
                        </tr>
                    </table>
                    ${this.getBlock('product')}
                    ${this.getBlock('cta')}
                    ${this.getBlock('footer')}
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
            },
            {
                name: 'Boas-vindas (Welcome Series)',
                description: 'Template de boas-vindas para novos assinantes',
                category: 'Boas-vindas',
                html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background: #f5f5f5; font-family: Arial, sans-serif;">
    <table width="100%" style="background: #f5f5f5; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" style="background: #ffffff; border-radius: 8px; overflow: hidden;">
                    ${this.getBlock('header')}
                    <table width="100%" style="border-collapse: collapse;">
                        <tr>
                            <td style="padding: 40px; text-align: center;">
                                <h2 style="color: #283593; font-size: 32px; margin: 0 0 15px 0;">Bem-vindo, {{nome}}! 🎉</h2>
                                <p style="color: #1a1a1a; font-size: 18px; margin: 0 0 25px 0;">Estamos felizes em ter você conosco!</p>
                            </td>
                        </tr>
                    </table>
                    ${this.getBlock('text')}
                    ${this.getBlock('cta')}
                    ${this.getBlock('footer')}
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
            },
            {
                name: 'Lançamento de Produto',
                description: 'Template para anunciar novos produtos',
                category: 'Nurture',
                html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background: #f5f5f5; font-family: Arial, sans-serif;">
    <table width="100%" style="background: #f5f5f5; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" style="background: #ffffff; border-radius: 8px; overflow: hidden;">
                    ${this.getBlock('header')}
                    <table width="100%" style="border-collapse: collapse;">
                        <tr>
                            <td style="padding: 40px; text-align: center; background: linear-gradient(135deg, #283593 0%, #3949ab 100%);">
                                <h2 style="color: #ffffff; font-size: 32px; margin: 0 0 15px 0;">🚀 Novidade!</h2>
                                <p style="color: #ffffff; font-size: 18px; margin: 0;">Acabamos de lançar algo incrível para você</p>
                            </td>
                        </tr>
                    </table>
                    ${this.getBlock('product')}
                    ${this.getBlock('cta')}
                    ${this.getBlock('footer')}
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
            },
            {
                name: 'Email Transacional',
                description: 'Template para confirmações e notificações',
                category: 'Transacional',
                html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background: #f5f5f5; font-family: Arial, sans-serif;">
    <table width="100%" style="background: #f5f5f5; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" style="background: #ffffff; border-radius: 8px; overflow: hidden;">
                    ${this.getBlock('header')}
                    <table width="100%" style="border-collapse: collapse;">
                        <tr>
                            <td style="padding: 40px;">
                                <h2 style="color: #283593; margin: 0 0 20px 0;">Olá, {{nome}}</h2>
                                <p style="color: #1a1a1a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                    Confirmamos o recebimento da sua solicitação.
                                </p>
                                <table style="width: 100%; background: #f5f5f5; border-radius: 8px; padding: 20px; margin: 20px 0;">
                                    <tr>
                                        <td>
                                            <strong>Email:</strong> {{email}}<br>
                                            <strong>Data:</strong> {{data}}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    ${this.getBlock('footer')}
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
            }
        ];
    }

    showTemplatesLibrary() {
        const grid = document.getElementById('libraryGrid');

        grid.innerHTML = this.predefinedTemplates.map((template, index) => `
            <div class="library-item">
                <div class="library-item-title">${template.name}</div>
                <div class="library-item-description">${template.description}</div>
                <div class="library-item-preview">
                    <code>${this.escapeHtml(template.html.substring(0, 200))}...</code>
                </div>
                <button class="btn btn-accent" onclick="app.useTemplate(${index})">
                    📝 Usar como Base
                </button>
            </div>
        `).join('');

        this.openModal('libraryModal');
    }

    useTemplate(index) {
        const template = this.predefinedTemplates[index];
        const name = prompt('Nome do template:', template.name);

        if (name) {
            const newTemplate = this.createTemplate({
                name: name,
                subject: '',
                category: template.category,
                platform: 'Genérico',
                status: 'Rascunho',
                notes: `Baseado em: ${template.name}`,
                html: template.html
            });

            this.closeLibraryModal();
            this.renderTemplates();
            this.openEditor(newTemplate.id);
        }
    }

    // ==================== EXPORT/IMPORT ====================

    exportHTML() {
        if (!this.currentTemplate) return;

        const html = document.getElementById('codeEditor').value;
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.currentTemplate.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`;
        a.click();
        URL.revokeObjectURL(url);
    }

    copyHTML() {
        const html = document.getElementById('codeEditor').value;
        navigator.clipboard.writeText(html).then(() => {
            alert('HTML copiado para a área de transferência!');
        });
    }

    exportAllJSON() {
        const data = JSON.stringify(this.templates, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fp-email-templates-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    importJSON() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const imported = JSON.parse(event.target.result);
                        if (Array.isArray(imported)) {
                            if (confirm(`Importar ${imported.length} templates? Isso irá adicionar aos templates existentes.`)) {
                                imported.forEach(template => {
                                    template.id = Date.now().toString() + Math.random();
                                });
                                this.templates = [...imported, ...this.templates];
                                this.saveToStorage();
                                this.renderTemplates();
                                alert('Templates importados com sucesso!');
                            }
                        }
                    } catch (error) {
                        alert('Erro ao importar arquivo. Certifique-se de que é um JSON válido.');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    // ==================== COMPATIBILITY TEST ====================

    testCompatibility() {
        const html = document.getElementById('codeEditor').value;
        const results = [];

        // Check for table structure
        if (html.includes('<table')) {
            results.push({
                type: 'success',
                icon: '✅',
                title: 'Estrutura de Tabelas',
                message: 'Ótimo! Seu email usa tabelas, que são compatíveis com a maioria dos clientes de email.'
            });
        } else {
            results.push({
                type: 'error',
                icon: '❌',
                title: 'Estrutura de Tabelas',
                message: 'Emails devem usar tabelas para melhor compatibilidade. Divs e Flexbox não funcionam bem em clientes de email.'
            });
        }

        // Check for inline styles
        const inlineStyleCount = (html.match(/style="/g) || []).length;
        if (inlineStyleCount > 0) {
            results.push({
                type: 'success',
                icon: '✅',
                title: 'Estilos Inline',
                message: `Encontrado ${inlineStyleCount} uso(s) de estilos inline. Isso é ótimo para compatibilidade!`
            });
        }

        // Check for external CSS
        if (html.includes('<link') || html.includes('<style>')) {
            results.push({
                type: 'warning',
                icon: '⚠️',
                title: 'CSS Externo ou em <style>',
                message: 'CSS externo ou em tags <style> pode não funcionar em todos os clientes. Prefira estilos inline.'
            });
        }

        // Check for unclosed variables
        const unclosedVars = html.match(/\{\{[^}]*$/g);
        if (unclosedVars) {
            results.push({
                type: 'error',
                icon: '❌',
                title: 'Variáveis Não Fechadas',
                message: 'Encontradas variáveis que não foram fechadas corretamente. Verifique {{variavel}}.'
            });
        } else if (html.includes('{{')) {
            results.push({
                type: 'success',
                icon: '✅',
                title: 'Variáveis Dinâmicas',
                message: 'Todas as variáveis estão formatadas corretamente.'
            });
        }

        // Check width
        if (!html.includes('width="600"') && !html.includes('width="100%"')) {
            results.push({
                type: 'warning',
                icon: '⚠️',
                title: 'Largura do Email',
                message: 'Recomendamos usar width="600" para a tabela principal do email.'
            });
        }

        const resultsHTML = results.map(result => `
            <div class="compatibility-item ${result.type}">
                <div class="compatibility-icon">${result.icon}</div>
                <div class="compatibility-text">
                    <strong>${result.title}</strong>
                    <p>${result.message}</p>
                </div>
            </div>
        `).join('');

        document.getElementById('compatibilityResults').innerHTML = resultsHTML;
        this.openModal('compatibilityModal');
    }

    // ==================== EVENT LISTENERS ====================

    setupEventListeners() {
        // Form submission
        document.getElementById('templateForm').addEventListener('submit', (e) => {
            e.preventDefault();

            const data = {
                name: document.getElementById('templateName').value,
                subject: document.getElementById('templateSubject').value,
                category: document.getElementById('templateCategory').value,
                platform: document.getElementById('templatePlatform').value,
                status: document.getElementById('templateStatus').value,
                notes: document.getElementById('templateNotes').value
            };

            if (this.editingId) {
                this.updateTemplate(this.editingId, data);
            } else {
                this.createTemplate(data);
            }

            this.closeModal();
            this.renderTemplates();
        });

        // Subject character counter
        document.getElementById('templateSubject').addEventListener('input', (e) => {
            document.getElementById('subjectCounter').textContent = e.target.value.length;
        });

        // Code editor live preview
        document.getElementById('codeEditor').addEventListener('input', () => {
            this.updatePreview();
        });

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+S to save
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                if (this.currentTemplate) {
                    this.saveTemplate();
                }
            }
        });
    }

    // ==================== UTILITY FUNCTIONS ====================

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Initialize app
const app = new EmailTemplateBuilder();
