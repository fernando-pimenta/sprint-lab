# 🛠️ Catálogo de Ferramentas & Softwares FP

Organize e gerencie todas as ferramentas, softwares, plugins e serviços utilizados no Ecossistema FP. Mantenha um inventário completo com acesso rápido aos links e informações importantes!

## 📋 Descrição do Projeto

O **Catálogo de Ferramentas FP** é uma aplicação web offline que funciona como um inventário centralizado de todas as ferramentas digitais utilizadas no seu trabalho, projetos e fluxos de produção.

Desde aplicativos desktop até extensões de navegador, plugins, CLIs e serviços web – organize tudo em um só lugar com categorização inteligente, filtros poderosos e acesso rápido aos links oficiais.

Parte do **Ecossistema FP**, este projeto oferece uma solução prática para nunca mais esquecer quais ferramentas você usa ou onde encontrá-las.

## 🗂️ Estrutura de Arquivos

```
08-catalogo-ferramentas-fp/
├── index.html      # Interface da aplicação
├── styles.css      # Estilos com tema azul/ciano
├── app.js          # Lógica e funcionalidades
└── README.md       # Esta documentação
```

## 📊 Formato dos Dados

Cada ferramenta possui a seguinte estrutura:

```json
{
  "id": "unique-id-123",
  "name": "Visual Studio Code",
  "type": "Desktop",
  "category": "Dev",
  "url": "https://code.visualstudio.com",
  "notes": "Editor de código principal. Extensões: Prettier, ESLint, GitLens.",
  "createdAt": "2025-01-19T10:30:00.000Z",
  "updatedAt": "2025-01-19T14:45:00.000Z"
}
```

### Campos da Ferramenta:

- **id** (string): Identificador único gerado automaticamente
- **name** (string): Nome da ferramenta (obrigatório)
- **type** (string): Tipo da ferramenta (obrigatório)
  - Desktop, Web, Plugin, Extensão, CLI, Mobile, Outro
- **category** (string): Categoria funcional (obrigatório)
  - Edição, Produtividade, IA, Dev, Marketing, Design, Vídeo, Áudio, Backup, Segurança, Comunicação, Outro
- **url** (string): URL oficial da ferramenta (opcional)
- **notes** (string): Uso principal, licença, observações (opcional)
- **createdAt** (string): Data de criação
- **updatedAt** (string): Data da última atualização

## ✨ Funcionalidades

### 📝 Gerenciamento Completo
- **Criar** novas ferramentas no catálogo
- **Editar** informações de ferramentas existentes
- **Excluir** ferramentas obsoletas
- **Visualizar** lista organizada em tabela

### 🔍 Filtros e Busca Poderosos
- **Busca por nome**: Encontre ferramentas rapidamente
- **Filtro por tipo**: Desktop, Web, Plugin, etc.
- **Filtro por categoria**: Dev, Design, IA, etc.
- **Combinação de filtros**: Use múltiplos filtros simultaneamente
- **Limpar filtros**: Botão para resetar todos os filtros

### 📊 Estatísticas em Tempo Real
- **Total de ferramentas** cadastradas
- **Total de apps Desktop**
- **Total de serviços Web**
- **Total de Plugins/Extensões**

### 🔗 Acesso Rápido
- **Links clicáveis**: Abra URLs em nova aba diretamente da tabela
- **Organização visual**: Badges coloridos por tipo
- **Tooltips**: Veja notas completas ao passar o mouse

### 💾 Persistência e Backup
- **localStorage**: Salvamento automático no navegador
- **Export JSON**: Baixe todas as ferramentas
- **Import JSON**: Restaure ou compartilhe catálogos
- **Mesclagem inteligente**: Evita duplicatas ao importar

### 🎨 Interface Moderna
- **Tema azul/ciano**: Cores que representam tecnologia
- **Modo escuro**: Interface elegante e confortável
- **Responsivo**: Desktop, tablet e mobile
- **Tabela organizada**: Visualização clara e profissional

## 🚀 Como Rodar Localmente

### Opção 1: Python HTTP Server

```bash
cd projetos/08-catalogo-ferramentas-fp
python3 -m http.server 8000
```

Acesse: `http://localhost:8000`

### Opção 2: VS Code Live Server

1. Instale a extensão "Live Server"
2. Abra `index.html`
3. Clique com botão direito → "Open with Live Server"

### Opção 3: Node.js

```bash
npx http-server projetos/08-catalogo-ferramentas-fp -p 8000
```

### Opção 4: Abrir Diretamente

Simplesmente abra `index.html` no navegador (funciona perfeitamente).

## 📖 Como Usar

### 1️⃣ Adicionar uma Ferramenta

1. Clique em **"➕ Adicionar Ferramenta"**
2. Preencha os campos obrigatórios:
   - **Nome**: "Visual Studio Code"
   - **Tipo**: "Desktop"
   - **Categoria**: "Dev"
3. Preencha campos opcionais:
   - **URL**: "https://code.visualstudio.com"
   - **Notas**: "Editor principal. Extensões: Prettier, ESLint."
4. Clique em **"💾 Salvar"**

### 2️⃣ Buscar e Filtrar

**Busca por Nome:**
1. Digite no campo "Buscar por nome"
2. Resultados filtrados em tempo real

**Filtrar por Tipo:**
1. Selecione um tipo no dropdown (Desktop, Web, etc.)
2. Tabela atualiza automaticamente

**Filtrar por Categoria:**
1. Selecione uma categoria (Dev, Design, etc.)
2. Combine com outros filtros

**Limpar Filtros:**
- Clique em **"Limpar filtros"** para resetar tudo

### 3️⃣ Editar uma Ferramenta

1. Na tabela, clique no botão **"✏️"** da ferramenta
2. Modal abre com dados preenchidos
3. Faça as alterações desejadas
4. Clique em **"💾 Salvar"**

### 4️⃣ Acessar URL da Ferramenta

1. Na coluna "URL", clique em **"🔗 Abrir"**
2. Site oficial abre em nova aba

### 5️⃣ Excluir uma Ferramenta

1. Clique no botão **"🗑️"** da ferramenta
2. Confirme a exclusão no modal
3. Ferramenta removida permanentemente

### 6️⃣ Exportar Catálogo (Backup)

1. Clique em **"📤 Exportar"** no header
2. Arquivo JSON será baixado automaticamente
3. Nome: `ferramentas-fp-YYYY-MM-DD.json`

### 7️⃣ Importar Catálogo

1. Clique em **"📥 Importar"** no header
2. Selecione um arquivo JSON válido
3. Novas ferramentas serão adicionadas
4. Duplicatas (mesmo ID) são ignoradas

## 💡 Exemplos de Catálogo

### Ferramentas de Desenvolvimento

```
Nome: Visual Studio Code
Tipo: Desktop
Categoria: Dev
URL: https://code.visualstudio.com
Notas: Editor principal. Extensões: Prettier, ESLint, GitLens, Live Server.

---

Nome: GitHub
Tipo: Web
Categoria: Dev
URL: https://github.com
Notas: Repositórios de código. Projetos: sprint-lab, portfolio.

---

Nome: Postman
Tipo: Desktop
Categoria: Dev
URL: https://www.postman.com
Notas: Testes de API REST. Workspaces: FP APIs, Clientes.

---

Nome: Fig
Tipo: CLI
Categoria: Produtividade
URL: https://fig.io
Notas: Autocompletar para terminal. Integra com zsh.
```

### Ferramentas de Design

```
Nome: Figma
Tipo: Web
Categoria: Design
URL: https://figma.com
Notas: Design de interfaces. Projetos: Sprint Lab UI, Landing Pages.

---

Nome: Photopea
Tipo: Web
Categoria: Edição
URL: https://www.photopea.com
Notas: Editor de imagens online, alternativa ao Photoshop.

---

Nome: ColorZilla
Tipo: Extensão
Categoria: Design
URL: https://www.colorzilla.com
Notas: Eyedropper de cores no navegador. Essencial para dev.
```

### Ferramentas de IA

```
Nome: ChatGPT
Tipo: Web
Categoria: IA
URL: https://chat.openai.com
Notas: Assistente principal. Plano: Plus. Uso: código, conteúdo, brainstorming.

---

Nome: Claude
Tipo: Web
Categoria: IA
URL: https://claude.ai
Notas: Alternativa ao GPT. Melhor para análise de documentos longos.

---

Nome: Cursor
Tipo: Desktop
Categoria: Dev
URL: https://cursor.sh
Notas: VS Code com IA integrada. Uso para pair programming com AI.
```

### Ferramentas de Produtividade

```
Nome: Notion
Tipo: Web
Categoria: Produtividade
URL: https://notion.so
Notas: Workspace principal. Databases: Projetos, Ideias, Tasks.

---

Nome: Todoist
Tipo: Mobile
Categoria: Produtividade
URL: https://todoist.com
Notas: Gerenciamento de tarefas. Integra com Google Calendar.

---

Nome: Grammarly
Tipo: Extensão
Categoria: Edição
URL: https://www.grammarly.com
Notas: Corretor de inglês. Plano: Premium. Uso em emails e docs.
```

### Ferramentas de Marketing

```
Nome: Buffer
Tipo: Web
Categoria: Marketing
URL: https://buffer.com
Notas: Agendamento de posts sociais. Conectado: Twitter, LinkedIn.

---

Nome: Canva
Tipo: Web
Categoria: Design
URL: https://canva.com
Notas: Design rápido para social media. Templates: posts, banners.

---

Nome: Google Analytics
Tipo: Web
Categoria: Marketing
URL: https://analytics.google.com
Notas: Análise de tráfego. Sites: blog, portfolio.
```

## 🎯 Casos de Uso

### Desenvolvedores
- Catalogar IDEs, editores, ferramentas CLI
- Manter lista de extensões essenciais
- Organizar serviços de deploy e hospedagem
- Rastrear ferramentas de teste e debugging

### Designers
- Gerenciar ferramentas de design (Figma, Sketch, etc.)
- Catalogar plugins e extensões
- Organizar bancos de imagens e fontes
- Manter links para recursos de design

### Criadores de Conteúdo
- Listar ferramentas de edição (vídeo, áudio, imagem)
- Organizar plataformas de publicação
- Catalogar ferramentas de SEO e analytics
- Rastrear softwares de agendamento

### Freelancers/Agências
- Inventário de ferramentas da equipe
- Padronização de stack tecnológico
- Documentação de licenças e custos
- Onboarding de novos membros

## 📊 Organização Sugerida

### Por Tipo
- **Desktop**: Apps instalados localmente
- **Web**: Serviços online e SaaS
- **Plugin**: Plugins para softwares específicos
- **Extensão**: Extensões de navegador
- **CLI**: Ferramentas de linha de comando
- **Mobile**: Apps para smartphone/tablet

### Por Categoria
- **Dev**: Desenvolvimento de software
- **Design**: Design gráfico e UI/UX
- **IA**: Ferramentas de inteligência artificial
- **Edição**: Edição de imagens, vídeo, áudio
- **Produtividade**: Organização e gestão
- **Marketing**: Marketing digital e redes sociais
- **Backup**: Backup e sincronização
- **Segurança**: VPNs, gerenciadores de senha
- **Comunicação**: Email, chat, videoconferência

## 💾 Backup e Exportação

### Por que Fazer Backup?

Os dados ficam no **localStorage** do navegador:
- ✅ Acesso instantâneo e offline
- ⚠️ Limitado ao navegador e domínio
- ⚠️ Pode ser apagado ao limpar cache
- ⚠️ Não sincroniza entre dispositivos

**Solução**: Exporte regularmente!

### Estratégia de Backup Recomendada

**Backup Regular:**
1. **Frequência**: Exporte mensalmente ou ao adicionar ferramentas críticas
2. **Local**: Salve em pasta específica (ex: `~/documentos/ferramentas-fp/`)
3. **Versionamento**: Use Git para versionar os JSONs
4. **Cloud**: Sincronize com Google Drive, Dropbox, etc.

**Backup por Equipe:**
1. **Repositório compartilhado**: Crie um repo Git com o catálogo
2. **Padronização**: Defina convenções de nomenclatura
3. **Atualização**: Mantenha sincronizado entre membros
4. **Documentação**: README explicando ferramentas padrão

### Como Restaurar

1. Abra a aplicação
2. Clique em **"📥 Importar"**
3. Selecione o arquivo JSON de backup
4. Ferramentas serão adicionadas ao catálogo

## 🔒 Privacidade e Segurança

- **100% offline**: Nenhum dado enviado para servidores
- **Local apenas**: Tudo fica no seu navegador
- **Sem rastreamento**: Zero coleta de dados
- **Você controla**: Exporte e use onde quiser

## ⚠️ Limitações Conhecidas

### 1. Armazenamento Local
- Dados ficam no navegador específico
- Limpar cache = perder dados
- Não sincroniza entre dispositivos

**Solução**: Exporte regularmente em JSON!

### 2. Limite de Armazenamento
- localStorage: ~5-10MB (depende do navegador)
- Improvável atingir com dados de texto

### 3. Sem Categorização Hierárquica
- Categorias são fixas, sem subcategorias
- Não há tags personalizadas

**Solução**: Use o campo "Notas" para tags adicionais.

### 4. Sem Sincronização em Nuvem
- Não há sync automático entre dispositivos
- Cada navegador tem seu próprio catálogo

**Solução**: Exporte/importe JSON entre dispositivos.

## 🔮 Ideias para Evolução Futura

### Funcionalidades
- [ ] Tags personalizadas (múltiplas por ferramenta)
- [ ] Categorias hierárquicas/subcategorias
- [ ] Campo de custo/licença (Gratuito, Pago, Freemium)
- [ ] Avaliação com estrelas
- [ ] Notas favoritas/destaque
- [ ] Agrupamento por projeto/workflow
- [ ] Histórico de versões das ferramentas
- [ ] Campo de data de última atualização da ferramenta
- [ ] Links múltiplos (docs, GitHub, etc.)
- [ ] Export em CSV/Markdown
- [ ] Import de listas externas (Awesome Lists)

### Técnicas
- [ ] IndexedDB para maior capacidade
- [ ] PWA para instalação como app
- [ ] Sincronização via GitHub Gist
- [ ] Modo claro/escuro toggle
- [ ] Atalhos de teclado
- [ ] Ordenação customizável da tabela
- [ ] View em cards (alternativa à tabela)
- [ ] Estatísticas avançadas (mais usado, etc.)

## 🧪 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Grid, Flexbox, variáveis CSS, gradientes
- **JavaScript (ES6+)**: Manipulação do DOM, localStorage
- **FileReader API**: Importar arquivos JSON
- **Blob API**: Exportar dados como arquivo

## 📱 Responsividade

O aplicativo funciona perfeitamente em:
- 💻 **Desktop**: Tabela completa com todas as colunas
- 📱 **Tablet**: Layout adaptado
- 📱 **Smartphone**: Colunas menos importantes ocultas automaticamente

## 🎨 Tema Visual

- **Cores primárias**: Azul/Ciano (#06b6d4) e Azul (#3b82f6)
- **Background**: Gradiente azul escuro
- **Badges coloridos**: Cada tipo tem sua cor específica
- **Tema escuro**: Ideal para uso prolongado

## 🤝 Dicas de Uso

### Mantenha Atualizado
- Adicione ferramentas assim que começar a usar
- Atualize URLs quando mudarem
- Remova ferramentas que não usa mais

### Use o Campo Notas
- Anote versão específica que usa
- Documente integrações importantes
- Registre atalhos ou dicas
- Mencione alternativas conhecidas

### Organize por Workflow
- Agrupe ferramentas por projeto nas notas
- Exemplo: "Projeto X: usa com Figma + VS Code"

### Compartilhe com a Equipe
- Exporte catálogo padrão da empresa
- Facilite onboarding de novos membros
- Mantenha stack consistente

## 📚 Recursos Adicionais

### Listas de Ferramentas Úteis:
- [Awesome Lists](https://github.com/topics/awesome)
- [Product Hunt](https://www.producthunt.com/)
- [AlternativeTo](https://alternativeto.net/)
- [Stack Share](https://stackshare.io/)

### Comunidades:
- r/productivity (Reddit)
- r/webdev (Reddit)
- Indie Hackers (ferramentas de makers)

## 📄 Licença

Projeto pessoal do Ecossistema FP - Uso livre.

---

**Desenvolvido com 💙 para o Ecossistema FP**

*Nunca mais perca o controle das suas ferramentas digitais!*
