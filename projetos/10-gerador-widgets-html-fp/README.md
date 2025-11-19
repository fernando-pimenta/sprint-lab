# 🧩 Gerador de Widgets HTML – Ecossistema FP

Gere rapidamente blocos HTML prontos (widgets) para usar em sites do Ecossistema FP! Preview ao vivo, código HTML limpo e CSS base incluído.

## 📋 Descrição do Projeto

O **Gerador de Widgets HTML** é uma ferramenta visual para criar componentes HTML prontos para uso imediato em sites, blogs e landing pages. Escolha o tipo de widget, personalize os campos e copie o código gerado!

Perfeito para o Blog do FP, Brechó Tech, landing pages e qualquer projeto que precise de componentes visuais rápidos e padronizados.

Parte do **Ecossistema FP**, este projeto oferece uma solução prática para acelerar o desenvolvimento de páginas web com componentes consistentes e bem estruturados.

## 🗂️ Estrutura de Arquivos

```
10-gerador-widgets-html-fp/
├── index.html      # Interface da aplicação
├── styles.css      # Estilos com tema laranja/amber
├── app.js          # Gerador de templates (engine)
└── README.md       # Esta documentação
```

## 🧩 Tipos de Widgets

### 1️⃣ Card Simples

Card básico com título, texto e botão de ação.

**Campos:**
- Título
- Texto descritivo
- Texto do botão
- URL do botão

**Uso Ideal:**
- Cards de blog posts
- Destaques de produtos
- Chamadas para artigos
- Apresentação de serviços

**Exemplo Visual:**
```
┌─────────────────────────┐
│  Título do Card         │
│                         │
│  Texto do card vai      │
│  aqui. Descreva o       │
│  conteúdo...            │
│                         │
│  [ Saiba Mais ]         │
└─────────────────────────┘
```

**HTML Gerado:**
```html
<div class="fp-card">
    <h3>Título do Card</h3>
    <p>Texto do card vai aqui...</p>
    <a href="#" class="fp-btn">Saiba Mais</a>
</div>
```

---

### 2️⃣ Box de Destaque

Box colorido para destacar informações importantes, com ícone opcional.

**Campos:**
- Ícone (emoji ou vazio)
- Título
- Texto

**Uso Ideal:**
- Avisos importantes
- Dicas e truques
- Destaques especiais
- Informações de contexto

**Exemplo Visual:**
```
┌─────────────────────────────────┐
│ 💡 Destaque Importante          │
│                                 │
│ Mensagem de destaque. Use para  │
│ chamar atenção para informações │
│ importantes.                    │
└─────────────────────────────────┘
```

**HTML Gerado:**
```html
<div class="fp-highlight">
    <div class="fp-highlight-header">
        <span class="fp-highlight-icon">💡</span>
        <h3>Destaque Importante</h3>
    </div>
    <p>Mensagem de destaque...</p>
</div>
```

---

### 3️⃣ Grid 3 Colunas

Grade com 3 colunas de items (responsiva: 3 colunas → 2 → 1).

**Campos:**
- Lista de itens (dinâmica)
- Cada item tem: Título e Descrição
- Adicionar/remover itens

**Uso Ideal:**
- Features de produto
- Serviços oferecidos
- Portfólio de projetos
- Lista de benefícios

**Exemplo Visual:**
```
┌──────────┬──────────┬──────────┐
│  Item 1  │  Item 2  │  Item 3  │
│          │          │          │
│ Descrição│ Descrição│ Descrição│
└──────────┴──────────┴──────────┘
```

**HTML Gerado:**
```html
<div class="fp-grid">
    <div class="fp-grid-item">
        <h4>Item 1</h4>
        <p>Descrição do item 1</p>
    </div>
    <div class="fp-grid-item">
        <h4>Item 2</h4>
        <p>Descrição do item 2</p>
    </div>
    <div class="fp-grid-item">
        <h4>Item 3</h4>
        <p>Descrição do item 3</p>
    </div>
</div>
```

---

### 4️⃣ CTA (Chamada para Ação)

Banner chamativo com gradiente para conversão.

**Campos:**
- Título principal
- Subtítulo
- Texto do botão
- URL do botão

**Uso Ideal:**
- Conversão de visitantes
- Newsletter signup
- Lançamento de produtos
- Promoções especiais

**Exemplo Visual:**
```
┌───────────────────────────────────┐
│                                   │
│        Comece Agora!              │
│                                   │
│   Não perca essa oportunidade     │
│                                   │
│      [ Começar Grátis ]           │
│                                   │
└───────────────────────────────────┘
```

**HTML Gerado:**
```html
<div class="fp-cta">
    <h2>Comece Agora!</h2>
    <p>Não perca essa oportunidade</p>
    <a href="#" class="fp-btn">Começar Grátis</a>
</div>
```

## ✨ Funcionalidades

### 🎨 Interface Visual
- **Seleção de tipo**: Escolha entre 4 tipos de widgets
- **Formulário dinâmico**: Campos mudam conforme o tipo
- **Preview ao vivo**: Veja o widget conforme edita
- **Split layout**: Editor à esquerda, preview à direita

### 📝 Geração de Código
- **HTML limpo**: Código bem formatado e semântico
- **CSS base**: Estilos prontos incluídos
- **Classes prefixadas**: `fp-*` para evitar conflitos
- **Responsivo**: CSS com media queries

### 📋 Copiar e Colar
- **Copiar HTML**: Um clique para copiar o código
- **Copiar CSS**: Copie os estilos também
- **Pronto para usar**: Cole direto no seu site

### 🔧 Personalização
- **Textos personalizados**: Todos os textos são editáveis
- **URLs configuráveis**: Links para onde quiser
- **Ícones flexíveis**: Use emojis no Box de Destaque
- **Grid dinâmico**: Adicione/remova items

## 🚀 Como Rodar Localmente

### Opção 1: Python HTTP Server

```bash
cd projetos/10-gerador-widgets-html-fp
python3 -m http.server 8000
```

Acesse: `http://localhost:8000`

### Opção 2: VS Code Live Server

1. Instale a extensão "Live Server"
2. Abra `index.html`
3. Clique com botão direito → "Open with Live Server"

### Opção 3: Node.js

```bash
npx http-server projetos/10-gerador-widgets-html-fp -p 8000
```

### Opção 4: Abrir Diretamente

Simplesmente abra `index.html` no navegador (funciona perfeitamente).

## 📖 Como Usar

### 1️⃣ Selecionar Tipo de Widget

1. Escolha o tipo no dropdown:
   - Card Simples
   - Box de Destaque
   - Grid 3 Colunas
   - CTA (Chamada para Ação)

### 2️⃣ Preencher os Campos

**Para Card Simples:**
1. Título: "Meu Produto Incrível"
2. Texto: "Descrição detalhada do produto..."
3. Texto do Botão: "Comprar Agora"
4. URL: "https://exemplo.com/produto"

**Para Box de Destaque:**
1. Ícone: "💡" (emoji opcional)
2. Título: "Dica Importante!"
3. Texto: "Não esqueça de fazer backup..."

**Para Grid 3 Colunas:**
1. Clique em "➕ Adicionar Item" para novos items
2. Preencha título e descrição de cada item
3. Clique em "✕" para remover items
4. Mínimo: 1 item

**Para CTA:**
1. Título: "Comece Sua Jornada"
2. Subtítulo: "Junte-se a milhares de usuários"
3. Texto do Botão: "Criar Conta Grátis"
4. URL: "https://exemplo.com/signup"

### 3️⃣ Ver Preview ao Vivo

- O preview atualiza automaticamente conforme você digita
- Veja exatamente como ficará no site

### 4️⃣ Copiar o Código

**HTML:**
1. Clique em "📋 Copiar HTML"
2. Cole no seu site/blog

**CSS:**
1. Clique em "📋 Copiar CSS"
2. Cole no seu arquivo CSS ou tag `<style>`

### 5️⃣ Usar no Seu Site

**Método 1: Direto no HTML**
```html
<!-- Cole no seu HTML -->
<div class="fp-card">
    <h3>Título do Card</h3>
    <p>Texto...</p>
    <a href="#" class="fp-btn">Botão</a>
</div>
```

**Método 2: Com CSS Separado**
```html
<!-- No <head> do seu HTML -->
<link rel="stylesheet" href="widgets.css">

<!-- No <body> -->
<div class="fp-card">
    ...
</div>
```

**Método 3: Inline no WordPress/CMS**
```html
<!-- Cole no editor visual/HTML -->
<style>
/* Cole o CSS aqui */
.fp-card { ... }
</style>

<div class="fp-card">
    ...
</div>
```

## 💡 Exemplos Práticos

### Blog Post Card

```html
<div class="fp-card">
    <h3>10 Dicas para Produtividade</h3>
    <p>Descubra técnicas comprovadas para aumentar sua produtividade no trabalho e na vida pessoal.</p>
    <a href="/blog/produtividade" class="fp-btn">Ler Artigo</a>
</div>
```

### Aviso Importante

```html
<div class="fp-highlight">
    <div class="fp-highlight-header">
        <span class="fp-highlight-icon">⚠️</span>
        <h3>Manutenção Programada</h3>
    </div>
    <p>O site estará em manutenção no dia 25/01 das 2h às 6h. Pedimos desculpas pelo inconveniente.</p>
</div>
```

### Features do Produto

```html
<div class="fp-grid">
    <div class="fp-grid-item">
        <h4>Rápido e Eficiente</h4>
        <p>Performance otimizada para máxima velocidade</p>
    </div>
    <div class="fp-grid-item">
        <h4>Seguro</h4>
        <p>Criptografia de ponta a ponta para seus dados</p>
    </div>
    <div class="fp-grid-item">
        <h4>Fácil de Usar</h4>
        <p>Interface intuitiva e amigável</p>
    </div>
</div>
```

### Landing Page CTA

```html
<div class="fp-cta">
    <h2>Transforme Seu Negócio Hoje</h2>
    <p>Junte-se a mais de 10.000 empresas que já estão crescendo</p>
    <a href="/trial" class="fp-btn">Começar Teste Grátis</a>
</div>
```

## 🎨 Personalização do CSS

### Cores

Ajuste as cores principais no CSS:

```css
/* Alterar cor dos botões */
.fp-btn {
    background-color: #seu-cor; /* Mude aqui */
}

/* Alterar cor do destaque */
.fp-highlight {
    background: linear-gradient(135deg, #cor1 0%, #cor2 100%);
    border-left: 4px solid #cor-borda;
}

/* Alterar cor do CTA */
.fp-cta {
    background: linear-gradient(135deg, #cor1 0%, #cor2 100%);
}
```

### Tamanhos

```css
/* Aumentar padding dos cards */
.fp-card {
    padding: 2rem; /* Era 1.5rem */
}

/* Aumentar fonte do CTA */
.fp-cta h2 {
    font-size: 2.5rem; /* Era 2rem */
}
```

### Bordas

```css
/* Arredondar mais os cards */
.fp-card {
    border-radius: 16px; /* Era 8px */
}

/* Remover bordas */
.fp-card {
    border: none;
}
```

## 🔧 Classes CSS Disponíveis

### Card Simples
- `.fp-card` - Container do card
- `.fp-btn` - Botão de ação

### Box de Destaque
- `.fp-highlight` - Container do destaque
- `.fp-highlight-header` - Cabeçalho com ícone
- `.fp-highlight-icon` - Ícone (emoji)

### Grid 3 Colunas
- `.fp-grid` - Container do grid
- `.fp-grid-item` - Item individual

### CTA
- `.fp-cta` - Container do CTA
- `.fp-btn` - Botão de ação

## 💾 Não Há Persistência

**Nota Importante:** Este projeto **não salva** os widgets em localStorage. É uma ferramenta de geração sob demanda:

1. Configure o widget
2. Copie o código HTML/CSS
3. Use no seu site
4. Para reutilizar, configure novamente

**Por quê?**
- Foco em geração rápida
- Não há necessidade de salvar templates
- Você copia e cola diretamente no site

**Dica:** Se quiser salvar templates, copie o HTML gerado para um arquivo `.txt` ou organize em um repositório Git!

## 🎯 Casos de Uso

### Para Blogs
- Cards para últimos posts
- Destaques de artigos populares
- CTAs para newsletter
- Avisos e atualizações

### Para E-commerce
- Cards de produtos
- Destaques de promoções
- Grid de categorias
- CTAs de conversão

### Para Landing Pages
- Features do produto
- Benefícios em grid
- CTA principal
- Social proof cards

### Para Portfólios
- Grid de projetos
- Cards de habilidades
- CTA para contato
- Destaques de conquistas

## 📐 Estrutura das Classes

### Prefixo `fp-`

Todas as classes usam o prefixo `fp-` (Fernando Pimenta / Ecossistema FP) para evitar conflitos com outros CSS:

```css
/* Sem prefixo - pode conflitar */
.card { ... }
.button { ... }

/* Com prefixo - seguro */
.fp-card { ... }
.fp-btn { ... }
```

### BEM-like Naming

```css
/* Bloco */
.fp-card

/* Elemento */
.fp-highlight-icon
.fp-highlight-header

/* Item do Grid */
.fp-grid
.fp-grid-item
```

## 🔮 Ideias para Evolução Futura

### Novos Widgets
- [ ] Accordion/FAQ
- [ ] Testimonial card
- [ ] Pricing table
- [ ] Hero section
- [ ] Gallery grid
- [ ] Timeline
- [ ] Stats counter
- [ ] Contact form

### Funcionalidades
- [ ] Salvar templates favoritos
- [ ] Temas de cores predefinidos
- [ ] Dark mode toggle
- [ ] Export como arquivo HTML completo
- [ ] Import de widgets salvos
- [ ] Biblioteca de ícones integrada
- [ ] Preview em diferentes tamanhos de tela
- [ ] Editor de CSS inline

### Técnicas
- [ ] Drag and drop para reordenar itens
- [ ] Undo/redo
- [ ] Histórico de widgets gerados
- [ ] Copiar como componente React/Vue
- [ ] Gerador de variações A/B
- [ ] Analytics de uso de widgets

## 🧪 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Grid, Flexbox, variáveis CSS, gradientes
- **JavaScript (ES6+)**: Template engine simples, manipulação do DOM
- **Clipboard API**: Copiar código

## 📱 Responsividade

### Desktop
- Layout split (400px sidebar + 1fr main)
- Grid de 3 colunas
- Preview amplo

### Tablet (< 1200px)
- Sidebar 350px
- Grid de 2 colunas

### Mobile (< 1024px)
- Layout em coluna única
- Sidebar em cima
- Grid de 1 coluna

## 🎨 Tema Visual

- **Cores primárias**: Laranja/Amber (#f59e0b) e Laranja claro (#fb923c)
- **Background**: Gradiente escuro com toque laranja
- **Inspiração**: Construção, criação, ferramentas

## 🤝 Integração com Outros Projetos FP

### Blog do FP
```html
<!-- Use cards para posts -->
<div class="fp-card">...</div>

<!-- Use destaque para avisos -->
<div class="fp-highlight">...</div>
```

### Brechó Tech
```html
<!-- Grid de produtos -->
<div class="fp-grid">
    <div class="fp-grid-item">
        <h4>Notebook Dell</h4>
        <p>i5, 8GB RAM, SSD 256GB</p>
    </div>
    ...
</div>
```

### Landing Pages
```html
<!-- CTA de conversão -->
<div class="fp-cta">
    <h2>Compre Agora!</h2>
    <p>Frete grátis para todo Brasil</p>
    <a href="/checkout" class="fp-btn">Finalizar Compra</a>
</div>
```

## 📚 Recursos Adicionais

### Emojis Úteis para Box de Destaque
- 💡 Dica
- ⚠️ Aviso
- ✅ Sucesso
- 🎉 Celebração
- 🔥 Destaque quente
- 💪 Motivacional
- 📢 Anúncio
- ⚡ Urgente

### Cores Sugeridas
- **Primary**: `#f59e0b` (Laranja)
- **Success**: `#10b981` (Verde)
- **Info**: `#3b82f6` (Azul)
- **Warning**: `#fbbf24` (Amarelo)
- **Danger**: `#ef4444` (Vermelho)

### Fontes Recomendadas
```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

body {
    font-family: 'Inter', sans-serif;
}
```

## 📄 Licença

Projeto pessoal do Ecossistema FP - Uso livre.

---

**Desenvolvido com 🧡 para o Ecossistema FP**

*Crie widgets HTML rapidamente e acelere seu desenvolvimento web!*
