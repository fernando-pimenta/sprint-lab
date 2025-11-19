# 🏪 Gerador de Cards de Produto - Brechó Tech

Uma ferramenta visual gratuita para criar cards de produto personalizados, perfeita para afiliados, brechós tech e lojas online. Crie, personalize e exporte cards bonitos em poucos cliques!

## 📋 Descrição do Projeto

O **Gerador de Cards de Produto** é uma aplicação web que permite criar cards visuais atraentes para produtos, com preview em tempo real e exportação de código HTML/CSS. Ideal para quem trabalha com marketing de afiliados, brechós de tecnologia ou precisa criar apresentações visuais de produtos.

Parte do **Ecossistema FP**, este projeto oferece uma solução prática e gratuita para gerar cards profissionais sem necessidade de conhecimento em programação.

## 🗂️ Estrutura de Arquivos

```
04-gerador-cards-brecho/
├── index.html      # Interface do gerador
├── styles.css      # Estilos e layout
├── app.js          # Lógica e funcionalidades
└── README.md       # Esta documentação
```

## ✨ Funcionalidades

### 🎨 Editor Visual Completo
- **Preview em tempo real**: Veja as mudanças instantaneamente
- **Interface split**: Formulário à esquerda, preview à direita
- **Personalização total**: Controle sobre todos os elementos do card

### 📝 Campos Configuráveis

#### Informações do Produto
- **Nome do Produto**: Título principal do card
- **Descrição Curta**: Texto descritivo
- **Preço**: Valor do produto formatado
- **Etiqueta/Selo**: Badges visuais (OFERTA, USADO, NOVO, DESTAQUE, PROMOÇÃO)

#### Botão de Ação
- **Texto do Botão**: Customizável (ex: "Ver Oferta", "Comprar Agora")
- **URL do Botão**: Link de destino

#### Cores e Estilo
- **Cor de Fundo do Card**: Personalize o fundo
- **Cor do Texto**: Controle da legibilidade
- **Cor do Botão**: CTA destacado
- **Cor do Texto do Botão**: Contraste do botão

### 🔧 Ferramentas de Exportação
- **Copiar HTML**: Código completo do card pronto para usar
- **Copiar CSS**: Estilos base necessários
- **Exportar Configuração**: Salve em JSON para reutilizar
- **Importar Configuração**: Restaure configurações salvas

### 🎯 Vantagens
- 100% gratuito
- Não requer cadastro ou login
- Funciona offline após carregar
- Código limpo e otimizado
- Responsivo e acessível

## 🚀 Como Rodar Localmente

### Opção 1: Python HTTP Server

```bash
cd projetos/04-gerador-cards-brecho
python3 -m http.server 8000
```

Acesse: `http://localhost:8000`

### Opção 2: VS Code Live Server

1. Instale a extensão "Live Server"
2. Abra `index.html`
3. Clique com botão direito → "Open with Live Server"

### Opção 3: Node.js

```bash
npx http-server projetos/04-gerador-cards-brecho -p 8000
```

### Opção 4: Abrir Diretamente

Simplesmente abra o arquivo `index.html` no seu navegador.

## 📖 Como Usar

### 1️⃣ Criar um Card

1. **Abra a ferramenta** no navegador
2. **Preencha os campos** no painel esquerdo:
   - Nome: "iPhone 13 Pro Max 256GB"
   - Descrição: "Seminovo em excelente estado..."
   - Preço: "R$ 4.999,00"
   - Selo: "OFERTA"
   - Texto do botão: "Ver Oferta"
   - URL: "https://seusite.com/produto"
3. **Personalize as cores** usando os seletores
4. **Veja o resultado** no painel direito em tempo real

### 2️⃣ Copiar o Código

#### Copiar HTML
1. Clique em "📋 Copiar HTML"
2. O código HTML completo é copiado para a área de transferência
3. Cole no seu site ou página

#### Copiar CSS
1. Clique em "🎨 Copiar CSS"
2. O CSS base é copiado
3. Cole na sua folha de estilos

**Nota**: O HTML gerado já inclui estilos inline para facilitar, mas você pode usar o CSS separado para maior controle.

### 3️⃣ Salvar Configuração

1. Após criar um card, clique em "📥 Exportar Config"
2. Um arquivo JSON será baixado: `card-config-YYYYMMDD-HHMM.json`
3. Guarde este arquivo para reutilizar o design futuramente

### 4️⃣ Reutilizar Configuração

1. Clique em "📤 Importar Config"
2. Selecione um arquivo JSON de configuração
3. Todos os campos serão preenchidos automaticamente
4. Faça ajustes se necessário

## 📊 Exemplo de Card Gerado

### Preview Visual
```
┌─────────────────────────────────┐
│                    [🔥 OFERTA]  │
│                                 │
│  iPhone 13 Pro Max 256GB        │
│                                 │
│  Seminovo em excelente estado.  │
│  Completo na caixa com todos    │
│  os acessórios originais.       │
│                                 │
│  R$ 4.999,00                    │
│                                 │
│  ┌───────────────────────────┐  │
│  │     Ver Oferta            │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

### Código HTML Gerado
```html
<div class="product-card" style="background-color: #ffffff;">
    <div class="product-badge">🔥 OFERTA</div>
    <div class="product-content">
        <h3 class="product-name" style="color: #1f2937;">iPhone 13 Pro Max 256GB</h3>
        <p class="product-description" style="color: #1f2937;">Seminovo em excelente estado. Completo na caixa com todos os acessórios originais.</p>
        <div class="product-price" style="color: #1f2937;">R$ 4.999,00</div>
        <a href="#" class="product-button" style="background-color: #f59e0b; color: #ffffff;">Ver Oferta</a>
    </div>
</div>
```

## 🎨 Opções de Etiquetas/Selos

A ferramenta oferece 5 tipos de badges pré-definidos:

- 🔥 **OFERTA** - Para promoções especiais
- ♻️ **USADO** - Para produtos seminovos
- ✨ **NOVO** - Para produtos novos
- ⭐ **DESTAQUE** - Para produtos em destaque
- 💰 **PROMOÇÃO** - Para campanhas promocionais

Você também pode optar por não usar nenhum selo.

## 💡 Casos de Uso

### Para Afiliados
- Criar cards de produtos para promover
- Personalizar cores da marca
- Gerar vários cards com configurações diferentes
- Usar em landing pages e blogs

### Para Brechós Tech
- Mostrar produtos usados de forma profissional
- Destacar ofertas especiais
- Criar catálogos visuais
- Manter consistência visual

### Para Lojas Online
- Criar previews de produtos
- Testar diferentes designs
- Gerar material para redes sociais
- Criar banners promocionais

### Para Criadores de Conteúdo
- Criar cards para reviews de produtos
- Material visual para vídeos
- Posts em redes sociais
- Newsletters

## 🔧 Personalização Avançada

### Modificando o CSS Gerado

O CSS copiado pode ser facilmente customizado:

```css
/* Exemplo: Adicionar bordas */
.product-card {
    border: 2px solid #e5e7eb;
}

/* Exemplo: Mudar hover do botão */
.product-button:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Exemplo: Responsividade */
@media (max-width: 768px) {
    .product-card {
        max-width: 100%;
    }
}
```

### Modificando o HTML

Você pode adicionar mais elementos ao card:

```html
<!-- Adicionar imagem do produto -->
<div class="product-card">
    <img src="produto.jpg" alt="Produto" class="product-image">
    <!-- resto do conteúdo -->
</div>

<!-- Adicionar mais informações -->
<div class="product-specs">
    <span>✓ Garantia</span>
    <span>✓ Frete Grátis</span>
</div>
```

## 📁 Formato da Configuração JSON

```json
{
  "productName": "iPhone 13 Pro Max 256GB",
  "productDescription": "Seminovo em excelente estado...",
  "productPrice": "R$ 4.999,00",
  "productBadge": "OFERTA",
  "buttonText": "Ver Oferta",
  "buttonUrl": "#",
  "cardBgColor": "#ffffff",
  "textColor": "#1f2937",
  "buttonBgColor": "#f59e0b",
  "buttonTextColor": "#ffffff"
}
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Grid, Flexbox, variáveis CSS
- **JavaScript (ES6+)**: Manipulação do DOM, Clipboard API
- **Não requer bibliotecas externas**: 100% vanilla

## 🔒 Privacidade

- **100% client-side**: Todo o processamento é feito no navegador
- **Sem backend**: Não enviamos dados para servidores
- **Sem rastreamento**: Não coletamos informações do usuário
- **Código aberto**: Todo o código está disponível para auditoria

## ⚡ Performance

- **Leve**: Menos de 50KB total
- **Rápido**: Preview em tempo real sem lag
- **Offline-friendly**: Funciona sem internet após carregar
- **Sem dependências**: Carregamento instantâneo

## 🎯 Dicas de Uso

### Para Melhores Resultados

1. **Cores Contrastantes**: Use cores que se destaquem
2. **Textos Claros**: Seja objetivo nas descrições
3. **CTAs Efetivos**: Use verbos de ação no botão
4. **Preços Atrativos**: Destaque descontos e ofertas
5. **Badges Estratégicos**: Use selos para criar urgência

### Combinações de Cores Sugeridas

**Moderna e Profissional**
- Fundo: `#ffffff`
- Texto: `#1f2937`
- Botão: `#3b82f6`

**Vibrante e Chamativa**
- Fundo: `#fef3c7`
- Texto: `#78350f`
- Botão: `#f59e0b`

**Elegante e Sóbria**
- Fundo: `#f9fafb`
- Texto: `#374151`
- Botão: `#6366f1`

## 🔮 Roadmap Futuro

- [ ] Mais templates de cards
- [ ] Upload de imagem do produto
- [ ] Captura de screenshot (html2canvas)
- [ ] Mais opções de badges customizáveis
- [ ] Gradientes e efeitos avançados
- [ ] Biblioteca de cards salvos
- [ ] Modo dark
- [ ] Compartilhamento direto

## 🤝 Contribuindo

Este projeto faz parte do **Sprint Lab - Ecossistema FP**. Sugestões e melhorias são bem-vindas!

## 📄 Licença

Projeto pessoal do Ecossistema FP - Uso livre.

---

**Desenvolvido com 💙 para o Ecossistema FP**
