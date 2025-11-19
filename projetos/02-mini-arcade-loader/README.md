# 🕹️ Mini Arcade Loader

Um launcher moderno de jogos HTML5 para navegador. Gerencie sua biblioteca de jogos web, organize em categorias e jogue diretamente no navegador através de um player integrado com iframe.

## 📋 Descrição do Projeto

O **Mini Arcade Loader** é uma aplicação web que funciona como um launcher de jogos HTML5, alinhado ao Ecossistema FP. Permite catalogar jogos web, organizá-los por categorias e jogá-los diretamente em um player integrado, sem sair da página.

Ideal para criar sua própria coleção de jogos clássicos arcade, mini games HTML5 ou qualquer jogo que rode no navegador.

## 🗂️ Estrutura de Arquivos

```
02-mini-arcade-loader/
├── index.html              # Estrutura HTML do launcher
├── styles.css              # Estilos e layout responsivo
├── app.js                  # Lógica e funcionalidades
├── arcade-sample.json      # Dados de exemplo (3 jogos fictícios)
└── README.md               # Esta documentação
```

## 📊 Formato dos Dados

Os jogos são armazenados em formato JSON com a seguinte estrutura:

```json
{
  "id": "moon-patrol",
  "nome": "Moon Patrol",
  "descricao": "Clássico arcade de 1982. Dirija seu veículo lunar...",
  "url": "https://exemplo.com/moon-patrol/index.html",
  "thumbnail": "https://exemplo.com/moon-patrol/capa.png",
  "categoria": "Arcade"
}
```

### Campos:
- **id** (string): Identificador único do jogo
- **nome** (string): Nome do jogo
- **descricao** (string): Descrição do jogo
- **url** (string): URL do arquivo HTML do jogo (será carregado em iframe)
- **thumbnail** (string): URL da imagem de capa
- **categoria** (string): Categoria do jogo (Arcade, Puzzle, Ação, etc.)

## ✨ Funcionalidades

### 📚 Biblioteca de Jogos
- **Listagem em cards** com thumbnail, nome e categoria
- **Seleção visual** do jogo ativo
- **Layout responsivo** em grid

### 🎮 Player Integrado
- **Iframe player** para jogar sem sair da página
- **Detalhes do jogo** (nome, descrição, categoria)
- **Botão para fechar** e voltar à seleção

### ✏️ Gerenciamento (CRUD)
- **Adicionar** novos jogos
- **Editar** jogos existentes
- **Excluir** jogos com confirmação
- **Modal intuitivo** para formulários

### 💾 Persistência
- **localStorage**: Todas as alterações são salvas automaticamente
- **Carregamento inicial**: Dados de `arcade-sample.json` se localStorage vazio
- **Sincronização**: Edições sempre refletem no localStorage

### 📥📤 Importar / Exportar
- **Exportar**: Baixa um arquivo JSON com toda a configuração
- **Importar**: Carrega configuração de arquivo JSON
  - Opção de substituir ou mesclar

### 🎨 Interface
- **Tema escuro** moderno
- **Design responsivo** (desktop, tablet, mobile)
- **Animações suaves**
- **Modal elegante** para formulários

## 🚀 Como Rodar Localmente

### Opção 1: Python HTTP Server (Recomendado)

```bash
cd projetos/02-mini-arcade-loader
python3 -m http.server 8000
```

Depois acesse: `http://localhost:8000`

### Opção 2: Node.js http-server

```bash
npx http-server projetos/02-mini-arcade-loader -p 8000
```

Depois acesse: `http://localhost:8000`

### Opção 3: VS Code Live Server

1. Instale a extensão "Live Server" no VS Code
2. Abra o arquivo `index.html`
3. Clique com o botão direito e selecione "Open with Live Server"

## 📖 Como Usar

### 1️⃣ Visualizar Biblioteca

Ao abrir o launcher, você verá os jogos de exemplo em cards. Cada card mostra:
- Thumbnail do jogo
- Nome
- Categoria
- Botões de Editar e Excluir

### 2️⃣ Jogar um Jogo

1. Clique em qualquer card de jogo
2. O jogo será carregado no player (iframe) à direita (ou abaixo em mobile)
3. Os detalhes do jogo aparecem logo abaixo do player
4. Para fechar, clique no botão "✕ Fechar"

### 3️⃣ Adicionar um Jogo

1. Clique no botão "➕ Adicionar Jogo"
2. Preencha o formulário:
   - **Nome do Jogo**: Título do jogo
   - **Descrição**: Texto descritivo
   - **URL do Jogo**: Link para o arquivo HTML do jogo
   - **URL da Thumbnail**: Link para a imagem de capa
   - **Categoria**: Ex: Arcade, Puzzle, Ação
3. Clique em "💾 Salvar Jogo"

### 4️⃣ Editar um Jogo

1. Clique no botão "✏️ Editar" no card do jogo
2. O modal abrirá com os dados preenchidos
3. Faça as alterações desejadas
4. Clique em "💾 Salvar Jogo"

### 5️⃣ Excluir um Jogo

1. Clique no botão "🗑️ Excluir" no card do jogo
2. Confirme a exclusão
3. O jogo será removido permanentemente

### 6️⃣ Exportar Configuração

1. Clique no botão "📥 Exportar Config"
2. Um arquivo JSON será baixado automaticamente
3. Nome: `arcade-config-YYYYMMDD-HHMM.json`
4. Guarde como backup

### 7️⃣ Importar Configuração

1. Clique no botão "📤 Importar Config"
2. Selecione um arquivo JSON válido
3. Escolha uma opção:
   - **OK**: Substitui toda a configuração atual
   - **Cancelar**: Mescla com a configuração atual
4. Os jogos serão carregados automaticamente

## 🎯 Como Configurar Jogos Reais

### Jogos Próprios

Se você tem jogos HTML5 próprios hospedados:

1. Faça upload dos arquivos do jogo para um servidor web
2. Obtenha a URL do arquivo `index.html` do jogo
3. Adicione o jogo no launcher usando essa URL

### Jogos de Sites Externos

**⚠️ IMPORTANTE**: Muitos sites bloqueiam o carregamento em iframe por questões de segurança (X-Frame-Options, CSP).

Para contornar isso:
- Use jogos hospedados em sua própria infraestrutura
- Procure por jogos open source que permitam embedding
- Alguns sites como itch.io oferecem widgets de embed

### Exemplo de Jogo HTML5 Simples

Você pode criar um jogo HTML5 simples em uma pasta separada:

```html
<!-- meu-jogo/index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Meu Jogo</title>
    <style>
        body { margin: 0; background: #000; color: #fff; }
        canvas { display: block; margin: 0 auto; }
    </style>
</head>
<body>
    <canvas id="game" width="800" height="600"></canvas>
    <script src="game.js"></script>
</body>
</html>
```

Depois adicione no launcher apontando para a URL correta.

### Editando o arcade-sample.json

Para alterar os jogos de exemplo padrão, edite o arquivo `arcade-sample.json`:

```json
[
  {
    "id": "seu-jogo",
    "nome": "Seu Jogo Incrível",
    "descricao": "Descrição do seu jogo",
    "url": "https://seusite.com/jogos/seu-jogo/index.html",
    "thumbnail": "https://seusite.com/jogos/seu-jogo/capa.png",
    "categoria": "Ação"
  }
]
```

**Nota**: Após a primeira execução, os dados são salvos no localStorage. Para recarregar do JSON, limpe o localStorage do navegador ou importe o arquivo.

## ⚠️ Limitações Conhecidas

### 1. Restrições de Iframe

**Problema**: Alguns sites bloqueiam o carregamento em iframes através de headers HTTP:
- `X-Frame-Options: DENY` ou `SAMEORIGIN`
- `Content-Security-Policy: frame-ancestors 'none'`

**Sintoma**: O iframe fica em branco ou mostra erro "Refused to display in a frame"

**Solução**:
- Use apenas jogos próprios ou que permitam embedding
- Hospede os jogos no mesmo domínio do launcher
- Procure por jogos open source com licença permissiva

### 2. CORS (Cross-Origin)

**Problema**: Alguns recursos dos jogos podem não carregar se houver restrições CORS.

**Solução**: Execute o launcher e os jogos em um servidor HTTP, não abrindo os arquivos diretamente no navegador.

### 3. Armazenamento Local

**Limite**: localStorage tem limite de ~5-10MB dependendo do navegador.

**Impacto**: Como armazenamos apenas URLs (não os jogos em si), dificilmente atingirá o limite.

**Recomendação**: Exporte backups regulares da configuração.

### 4. Dados por Navegador

Os dados são específicos do navegador e domínio:
- Limpar cache = perder dados
- Dados não sincronizam entre dispositivos
- **Solução**: Use a função de exportar para backups

### 5. Compatibilidade

Requer navegador moderno com suporte a:
- ES6+ JavaScript
- localStorage
- fetch API
- iframe

## 🔮 Ideias para Evolução Futura

### Funcionalidades
- [ ] Sistema de favoritos
- [ ] Histórico de jogos jogados
- [ ] Tempo de jogo rastreado
- [ ] Notas/avaliações pessoais
- [ ] Tags personalizadas
- [ ] Busca e filtros avançados
- [ ] Modo fullscreen para o player
- [ ] Controles de teclado (navegação com setas)
- [ ] Temas personalizáveis (claro/escuro)
- [ ] PWA (instalação no dispositivo)

### Integrações
- [ ] Upload de jogos direto pelo launcher
- [ ] Integração com itch.io API
- [ ] Gerador de QR code para compartilhar jogos
- [ ] Sincronização em nuvem (Google Drive, Dropbox)

### Técnicas
- [ ] IndexedDB para maior capacidade
- [ ] Service Worker para funcionar offline
- [ ] Cache de thumbnails
- [ ] Lazy loading de imagens
- [ ] Virtual scroll para grandes bibliotecas

## 🧪 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e iframe
- **CSS3**: Grid, Flexbox, variáveis CSS, animações
- **JavaScript (ES6+)**: Async/await, modules pattern, fetch API
- **localStorage**: Persistência de dados
- **JSON**: Formato de dados

## 🛡️ Segurança

- **Proteção contra XSS**: Todos os inputs são sanitizados
- **Validação de dados**: Verificação de formato ao importar
- **Armazenamento local**: Nenhum dado é enviado para servidores

## 📱 Responsividade

O launcher é totalmente responsivo:
- 💻 **Desktop**: Layout em duas colunas (biblioteca + player)
- 📱 **Tablet/Mobile**: Layout em coluna única com scroll

## 🤝 Contribuindo

Este projeto faz parte do **Sprint Lab - Ecossistema FP**. Sugestões e melhorias são bem-vindas!

## 📄 Licença

Projeto pessoal do Ecossistema FP.

---

**Desenvolvido com 💙 para o Ecossistema FP**
