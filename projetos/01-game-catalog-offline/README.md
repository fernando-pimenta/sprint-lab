# 🎮 Game Catalog Offline

Um aplicativo web offline para gerenciar seu catálogo pessoal de jogos. Totalmente funcional no navegador, sem necessidade de backend ou servidor, usando apenas HTML, CSS e JavaScript puro.

## 📋 Descrição do Projeto

O **Game Catalog Offline** é um mini app alinhado ao Ecossistema FP que permite catalogar, organizar e gerenciar sua coleção de jogos de diferentes plataformas. Todos os dados são armazenados localmente no navegador usando localStorage, garantindo privacidade e funcionamento offline completo.

## 🗂️ Estrutura de Arquivos

```
01-game-catalog-offline/
├── index.html      # Estrutura HTML do aplicativo
├── styles.css      # Estilos e layout responsivo
├── app.js          # Lógica e funcionalidades
└── README.md       # Esta documentação
```

## ✨ Funcionalidades

### 📝 Cadastro de Jogos
- **Título do jogo** (obrigatório)
- **Plataforma** (obrigatório): Xbox Físico, Xbox Digital, Steam, GOG, Epic, Amazon Luna, Legacy Games, Outro
- **Tipo** (obrigatório): Físico ou Digital
- **Código de barras** (opcional)
- **Origem/Loja** (opcional): Ex: Shopee, Steam Store, Amazon, etc.
- **Imagem de capa** (opcional): Upload de thumbnail convertido em base64

### 🔍 Filtros e Busca
- Filtro por **plataforma**
- Filtro por **tipo** (Físico/Digital/Todos)
- **Busca por nome** do jogo
- Combinação de múltiplos filtros simultaneamente

### ✏️ Edição e Exclusão
- Editar qualquer jogo cadastrado
- Excluir jogos com confirmação
- Todas as alterações são salvas automaticamente no localStorage

### 📊 Estatísticas
- Total de jogos cadastrados
- Total de jogos físicos
- Total de jogos digitais

### 💾 Importar / Exportar
- **Exportar**: Baixa um arquivo JSON com toda a biblioteca
- **Importar**: Permite carregar um arquivo JSON para:
  - Substituir a biblioteca atual, ou
  - Mesclar com a biblioteca existente

## 🚀 Como Rodar Localmente

### Opção 1: Servidor HTTP Simples (Recomendado)

#### Usando Python 3:
```bash
cd projetos/01-game-catalog-offline
python3 -m http.server 8000
```

Depois acesse: `http://localhost:8000`

#### Usando Node.js (http-server):
```bash
npx http-server projetos/01-game-catalog-offline -p 8000
```

Depois acesse: `http://localhost:8000`

### Opção 2: VS Code Live Server

1. Instale a extensão "Live Server" no VS Code
2. Abra o arquivo `index.html`
3. Clique com o botão direito e selecione "Open with Live Server"

### Opção 3: Abrir Diretamente no Navegador

**Atenção:** Algumas funcionalidades podem não funcionar corretamente devido a restrições de segurança do navegador ao abrir arquivos localmente.

Abra o arquivo `index.html` diretamente no seu navegador preferido.

## 📖 Como Usar

### 1️⃣ Cadastrar um Jogo

1. Preencha o formulário "Adicionar Novo Jogo"
2. Campos obrigatórios: Título, Plataforma e Tipo
3. Opcionalmente, adicione código de barras, origem/loja e uma imagem de capa
4. Clique em "💾 Salvar Jogo"

### 2️⃣ Visualizar Jogos

- Todos os jogos aparecem em cards na seção "Minha Biblioteca"
- Cada card mostra:
  - Capa do jogo (ou ícone padrão 🎮)
  - Título
  - Plataforma
  - Tipo (Físico/Digital)
  - Informações adicionais (se cadastradas)

### 3️⃣ Editar um Jogo

1. Clique no botão "✏️ Editar" no card do jogo
2. O formulário será preenchido com os dados atuais
3. Faça as alterações desejadas
4. Clique em "💾 Atualizar Jogo"
5. Para cancelar, clique em "❌ Cancelar"

### 4️⃣ Excluir um Jogo

1. Clique no botão "🗑️ Excluir" no card do jogo
2. Confirme a exclusão na janela de confirmação
3. O jogo será removido permanentemente

### 5️⃣ Filtrar Jogos

Use os filtros na barra de ferramentas:
- **Plataforma**: Selecione uma plataforma específica
- **Tipo**: Escolha entre Físico, Digital ou Todos
- **Buscar**: Digite o nome do jogo para busca em tempo real

Os filtros podem ser combinados!

### 6️⃣ Exportar Biblioteca

1. Clique no botão "📥 Exportar"
2. Um arquivo JSON será baixado automaticamente
3. Nome do arquivo: `game-catalog-backup-YYYYMMDD-HHMM.json`
4. Guarde este arquivo como backup

### 7️⃣ Importar Biblioteca

1. Clique no botão "📤 Importar"
2. Selecione um arquivo JSON válido
3. Escolha uma opção:
   - **OK**: Substitui toda a biblioteca atual
   - **Cancelar**: Mescla com a biblioteca atual
4. Os jogos serão importados automaticamente

## 🛡️ Segurança

- **Proteção contra XSS**: Todos os inputs são sanitizados antes de serem exibidos
- **Armazenamento local**: Nenhum dado é enviado para servidores externos
- **Privacidade total**: Seus dados ficam apenas no seu navegador

## ⚠️ Limitações Conhecidas

1. **Limite de armazenamento**: O localStorage tem limite de ~5-10MB dependendo do navegador
   - Imagens grandes podem esgotar o espaço rapidamente
   - Recomendação: use imagens pequenas (< 200KB)

2. **Dados por navegador**: Os dados são específicos do navegador e domínio
   - Se limpar o cache do navegador, os dados serão perdidos
   - Dados não são sincronizados entre dispositivos
   - **Solução**: Use a função de exportar para criar backups regulares

3. **Sem sincronização**: Não há sincronização em nuvem
   - Para usar em múltiplos dispositivos, exporte e importe manualmente

4. **Compatibilidade**: Requer navegador moderno com suporte a:
   - ES6+ JavaScript
   - localStorage
   - FileReader API

## 🔮 Ideias para Evolução Futura

### Funcionalidades
- [ ] Integração com APIs de jogos (IGDB, RAWG) para buscar capas automaticamente
- [ ] Sistema de tags personalizadas
- [ ] Avaliação por estrelas
- [ ] Campo de observações/notas
- [ ] Status de conclusão (Jogando, Zerado, Platinado, etc.)
- [ ] Filtro por data de aquisição
- [ ] Ordenação personalizável (alfabética, data, plataforma, etc.)
- [ ] Modo dark/light
- [ ] PWA (Progressive Web App) para instalação no dispositivo
- [ ] Gráficos e estatísticas avançadas

### Técnicas
- [ ] Compressão de imagens automática
- [ ] IndexedDB para maior capacidade de armazenamento
- [ ] Sincronização opcional via Google Drive ou Dropbox
- [ ] Exportação em diferentes formatos (CSV, Excel)
- [ ] Temas personalizáveis

## 🧪 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Layout responsivo com Grid e Flexbox
- **JavaScript (ES6+)**: Lógica da aplicação
- **localStorage**: Persistência de dados
- **FileReader API**: Upload e conversão de imagens

## 📱 Responsividade

O aplicativo é totalmente responsivo e funciona em:
- 💻 Desktops
- 📱 Tablets
- 📱 Smartphones

## 🤝 Contribuindo

Este projeto faz parte do **Sprint Lab - Ecossistema FP**. Sugestões e melhorias são bem-vindas!

## 📄 Licença

Projeto pessoal do Ecossistema FP.

---

**Desenvolvido com 💙 para o Ecossistema FP**
