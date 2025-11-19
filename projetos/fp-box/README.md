# 📦 FP BOX – v0.1 (Skeleton Modular System)

Sistema modular offline-first construído como base para aplicações de produtividade e organização do Ecossistema FP.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Características](#características)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Arquitetura Modular](#arquitetura-modular)
- [Como Usar](#como-usar)
- [Como Adicionar Novos Módulos](#como-adicionar-novos-módulos)
- [Módulos Incluídos](#módulos-incluídos)
- [Roadmap Futuro](#roadmap-futuro)
- [Tecnologias](#tecnologias)

---

## 🎯 Sobre o Projeto

O **FP BOX** é um framework modular (skeleton system) que serve como fundação para construir aplicações de produtividade. A ideia central é ter uma **arquitetura plugin-style** onde diferentes funcionalidades podem ser adicionadas como módulos independentes, sem afetar o núcleo do sistema.

Esta versão 0.1 é o **esqueleto base** – um sistema mínimo funcional que demonstra a arquitetura e serve como ponto de partida para expansões futuras.

### Por que FP BOX?

- **Modularidade**: Adicione ou remova funcionalidades sem quebrar o sistema
- **Simplicidade**: HTML/CSS/JavaScript vanilla, sem frameworks pesados
- **Offline-First**: Funciona 100% offline, sem dependências externas
- **Extensibilidade**: Arquitetura preparada para crescer com novos módulos
- **Performance**: Carregamento sob demanda (lazy loading) de módulos

---

## ✨ Características

- 🧩 **Arquitetura Modular** – Sistema plugin-style extensível
- 🚀 **SPA (Single Page Application)** – Navegação sem reload de página
- 📦 **Carregamento Dinâmico** – Módulos carregados via `fetch()` sob demanda
- 💾 **100% Offline** – Nenhuma dependência externa, funciona localmente
- 📱 **Responsivo** – Interface adaptável para desktop, tablet e mobile
- 🎨 **Design Moderno** – Interface limpa com paleta de cores do Ecossistema FP
- ⚡ **Performance** – Leve e rápido, apenas o necessário é carregado
- 🔌 **Plug & Play** – Adicione novos módulos facilmente

---

## 📁 Estrutura do Projeto

```
projetos/fp-box/
├── index.html           # Estrutura HTML principal
├── styles.css           # Estilos globais do framework
├── app.js               # Core: sistema de módulos e navegação
├── modules/             # Diretório de módulos
│   ├── home/
│   │   ├── home.html    # Template do módulo Home
│   │   └── home.js      # Lógica do módulo Home
│   └── placeholder/
│       ├── placeholder.html  # Template do módulo de exemplo
│       └── placeholder.js    # Lógica do módulo de exemplo
├── assets/              # Recursos estáticos (imagens, etc.)
└── README.md            # Documentação do projeto
```

---

## 🏗️ Arquitetura Modular

### Como Funciona

O FP BOX usa uma arquitetura baseada em módulos independentes. Cada módulo:

1. **Possui sua própria pasta** dentro de `modules/`
2. **Contém dois arquivos**:
   - `modulename.html` – Template HTML do módulo (pode incluir CSS inline)
   - `modulename.js` – Lógica JavaScript do módulo
3. **É registrado no array `FPBoxModules`** em `app.js`
4. **Exporta uma função `initModule()`** que é chamada após o carregamento

### Fluxo de Carregamento

```
Usuário clica no menu
    ↓
loadModule('modulename') é chamado
    ↓
Fetch do arquivo modulename.html
    ↓
HTML injetado na área de conteúdo
    ↓
Script modulename.js é carregado dinamicamente
    ↓
Função initModule() é executada
    ↓
Módulo está pronto para uso
```

### Funções Principais

#### `loadModule(moduleName)`

Carrega dinamicamente um módulo específico:
- Busca o HTML via `fetch()`
- Injeta o conteúdo na área principal
- Carrega o JavaScript do módulo
- Executa `initModule()` se disponível

#### `setActiveMenuItem(moduleName)`

Atualiza o estado visual do menu lateral, destacando o módulo ativo.

---

## 🚀 Como Usar

### 1. Abrir o Projeto

Basta abrir o arquivo `index.html` em qualquer navegador moderno:

```bash
# Navegue até a pasta do projeto
cd projetos/fp-box/

# Abra no navegador (exemplo no Linux)
xdg-open index.html

# Ou use um servidor local simples (Python 3)
python3 -m http.server 8000
# Acesse: http://localhost:8000
```

### 2. Navegar pelos Módulos

- Use o **menu lateral** para alternar entre módulos
- No **mobile**, clique no ícone ☰ para abrir/fechar o menu
- Clique em **"ℹ️ Sobre"** para ver informações sobre o FP BOX

### 3. Testar o Sistema

- Navegue entre **Home** e **Módulo Exemplo**
- Note que não há reload de página
- No módulo de exemplo, clique em "🚀 Executar Exemplo" para ver a interação

---

## ➕ Como Adicionar Novos Módulos

### Passo 1: Criar a Estrutura do Módulo

```bash
# Crie a pasta do módulo
mkdir modules/meu-modulo

# Crie os arquivos necessários
touch modules/meu-modulo/meu-modulo.html
touch modules/meu-modulo/meu-modulo.js
```

### Passo 2: Criar o Template HTML

**`modules/meu-modulo/meu-modulo.html`**

```html
<div class="meu-modulo">
    <h1>Meu Novo Módulo</h1>
    <p>Conteúdo do módulo...</p>
    <button id="meuBotao">Ação</button>
</div>

<style>
.meu-modulo {
    /* Estilos específicos do módulo */
    max-width: 800px;
    margin: 0 auto;
}
</style>
```

### Passo 3: Criar a Lógica JavaScript

**`modules/meu-modulo/meu-modulo.js`**

```javascript
function initModule() {
    console.log('Meu módulo inicializado');

    // Configurar event listeners e lógica
    const botao = document.getElementById('meuBotao');
    botao?.addEventListener('click', () => {
        alert('Botão clicado!');
    });
}

// Expor função globalmente
window.initModule = initModule;
```

### Passo 4: Registrar o Módulo

**Edite `app.js`** e adicione seu módulo ao array `FPBoxModules`:

```javascript
const FPBoxModules = [
    { id: 'home', name: '🏠 Home', path: 'modules/home/' },
    { id: 'placeholder', name: '📦 Módulo Exemplo', path: 'modules/placeholder/' },
    { id: 'meu-modulo', name: '✨ Meu Novo Módulo', path: 'modules/meu-modulo/' } // ← Adicione aqui
];
```

### Pronto! 🎉

Agora seu módulo aparecerá no menu lateral e poderá ser acessado.

---

## 🧩 Módulos Incluídos

### 1. Home
- **Descrição**: Tela inicial de boas-vindas
- **Funcionalidades**:
  - Explicação do conceito FP BOX
  - Lista todos os módulos instalados
  - Informações sobre características e roadmap
- **Arquivos**: `modules/home/home.html`, `modules/home/home.js`

### 2. Módulo Exemplo (Placeholder)
- **Descrição**: Módulo de demonstração e teste
- **Funcionalidades**:
  - Explica a estrutura de um módulo
  - Demonstra como a arquitetura funciona
  - Botão de exemplo interativo
- **Arquivos**: `modules/placeholder/placeholder.html`, `modules/placeholder/placeholder.js`

---

## 🔮 Roadmap Futuro

### Curto Prazo (v0.2)
- [ ] Integração com os 10 mini-projetos do Sprint Lab
- [ ] Sistema de configurações (preferências do usuário)
- [ ] Modo escuro/claro (theme switcher)
- [ ] Sistema de notificações toast

### Médio Prazo (v0.3)
- [ ] Gerenciador de tarefas integrado
- [ ] Calendário e timeline
- [ ] Sistema de notas e anotações
- [ ] Exportação/importação de dados (JSON)

### Longo Prazo (v1.0)
- [ ] PWA (Progressive Web App) com instalação
- [ ] Sincronização com Blog FP
- [ ] Sistema de plugins externos
- [ ] API de integração com outros projetos
- [ ] LocalStorage avançado para persistência
- [ ] Sistema de backup automático

---

## 🛠️ Tecnologias

- **HTML5** – Estrutura semântica
- **CSS3** – Estilos modernos (Grid, Flexbox, Variables)
- **JavaScript ES6+** – Lógica modular com fetch(), async/await
- **Fetch API** – Carregamento dinâmico de módulos
- **Nenhum Framework** – Vanilla JS puro para máxima compatibilidade

---

## 📝 Convenções de Código

### Nomenclatura
- **Arquivos**: kebab-case (`meu-modulo.html`)
- **IDs no array**: camelCase (`meuModulo`)
- **Classes CSS**: kebab-case (`.info-card`)
- **Funções JS**: camelCase (`loadModule()`)

### Estrutura de Módulos
- Sempre exporte `initModule()` em cada módulo
- Use CSS inline no HTML do módulo para isolamento
- Prefira event delegation quando aplicável
- Limpe listeners ao descarregar módulo (se necessário)

---

## 🎨 Paleta de Cores

```css
--primary-color: #f59e0b;     /* Laranja/Amber */
--primary-dark: #d97706;
--primary-light: #fbbf24;
--accent-color: #fb923c;

--bg-primary: #0f172a;        /* Fundo escuro */
--bg-secondary: #1e293b;
--bg-tertiary: #334155;

--text-primary: #f1f5f9;      /* Texto claro */
--text-secondary: #cbd5e1;
--text-muted: #94a3b8;
```

---

## 📄 Licença

Este projeto faz parte do **Sprint Lab – Ecossistema FP**.

---

## 👨‍💻 Autor

Desenvolvido como parte do projeto Sprint Lab.

---

## 🔗 Links Relacionados

- [Sprint Lab](../README.md) – Repositório principal
- [10 Mini-Projetos](../) – Projetos individuais do Sprint Lab
- Blog FP (em desenvolvimento)

---

**FP BOX v0.1** – Sistema Modular Extensível 🚀
