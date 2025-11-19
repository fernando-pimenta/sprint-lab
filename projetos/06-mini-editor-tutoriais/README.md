# 📝 Mini Editor de Tutoriais / How-To

Um editor offline para criar e gerenciar tutoriais passo a passo com exportação em Markdown. Organize procedimentos técnicos, guias de instalação, how-tos e documentações de forma simples e eficiente!

## 📋 Descrição do Projeto

O **Mini Editor de Tutoriais** é uma aplicação web que funciona completamente offline, permitindo criar tutoriais estruturados em passos sequenciais. Cada tutorial pode ser categorizado, nivelado e exportado individualmente em formato Markdown (.md), pronto para ser usado em documentações, wikis, blogs ou repositórios.

Parte do **Ecossistema FP**, este projeto oferece uma solução prática para documentar processos técnicos sem depender de ferramentas online.

## 🗂️ Estrutura de Arquivos

```
06-mini-editor-tutoriais/
├── index.html      # Interface do editor
├── styles.css      # Estilos e layout
├── app.js          # Lógica e funcionalidades
└── README.md       # Esta documentação
```

## 📊 Formato dos Dados

Cada tutorial possui a seguinte estrutura:

```json
{
  "id": "unique-id-123",
  "title": "Como instalar o Node.js no Ubuntu",
  "category": "Desenvolvimento",
  "level": "Básico",
  "steps": [
    "Abra o terminal e atualize os repositórios com: sudo apt update",
    "Instale o Node.js com: sudo apt install nodejs",
    "Verifique a instalação com: node --version"
  ],
  "notes": "Recomenda-se também instalar o npm separadamente.",
  "createdAt": "2025-01-19T10:30:00.000Z",
  "updatedAt": "2025-01-19T14:45:00.000Z"
}
```

### Campos:
- **id** (string): Identificador único
- **title** (string): Título do tutorial
- **category** (string): Desenvolvimento, Design, DevOps, Banco de Dados, Segurança, Ferramentas, Outro
- **level** (string): Básico, Intermediário, Avançado
- **steps** (array): Lista de passos em ordem sequencial
- **notes** (string): Observações, dicas ou avisos finais (opcional)
- **createdAt** (string): Data de criação
- **updatedAt** (string): Data da última atualização

## 📄 Formato do Markdown Gerado

Quando você exporta um tutorial, ele é convertido em Markdown com a seguinte estrutura:

```markdown
# Como instalar o Node.js no Ubuntu

**Categoria:** Desenvolvimento
**Nível:** Básico
**Passos:** 3

---

## Passos

### 1. Passo 1

Abra o terminal e atualize os repositórios com: sudo apt update

### 2. Passo 2

Instale o Node.js com: sudo apt install nodejs

### 3. Passo 3

Verifique a instalação com: node --version

---

## Notas Finais

Recomenda-se também instalar o npm separadamente.

---

*Tutorial criado em: 19/01/2025*
*Última atualização: 19/01/2025*
```

Este formato é compatível com:
- GitHub/GitLab wikis
- Documentações técnicas
- Blogs que suportam Markdown
- Geradores de sites estáticos (Jekyll, Hugo, etc.)
- Editores Markdown (Obsidian, Typora, etc.)

## ✨ Funcionalidades

### 📝 Gerenciamento de Tutoriais
- **Criar** novos tutoriais rapidamente
- **Editar** tutoriais existentes
- **Excluir** tutoriais obsoletos
- **Visualizar** lista organizada na sidebar

### 🔢 Gerenciamento Dinâmico de Passos
- **Adicionar** quantos passos forem necessários
- **Remover** passos individuais
- **Renumeração automática** ao adicionar/remover
- **Indicadores visuais** com círculos numerados
- **Textarea expansível** para cada passo

### 📤 Exportação em Markdown
- **Exportar individual**: Cada tutorial vira um arquivo .md
- **Formato estruturado**: Com metadados, passos numerados e notas
- **Nome sanitizado**: Arquivo usa título do tutorial convertido para slug
- **Download automático**: Arquivo pronto para usar

### 🎨 Organização Visual
- **Níveis coloridos**: Badges azul (Básico), laranja (Intermediário), vermelho (Avançado)
- **Lista lateral**: Todos os tutoriais organizados por atualização
- **Preview inline**: Veja categoria, nível e número de passos
- **Estado ativo**: Tutorial sendo editado destacado na lista

### 💾 Persistência Automática
- **localStorage**: Salvamento automático no navegador
- **Sem perda de dados**: Dados permanecem entre sessões
- **Chave específica**: `fp_howto_editor`

### ⏰ Ordenação Inteligente
- Tutoriais mais recentemente atualizados aparecem primeiro
- Data de atualização visível em cada card

## 🚀 Como Rodar Localmente

### Opção 1: Python HTTP Server

```bash
cd projetos/06-mini-editor-tutoriais
python3 -m http.server 8000
```

Acesse: `http://localhost:8000`

### Opção 2: VS Code Live Server

1. Instale a extensão "Live Server"
2. Abra `index.html`
3. Clique com botão direito → "Open with Live Server"

### Opção 3: Node.js

```bash
npx http-server projetos/06-mini-editor-tutoriais -p 8000
```

### Opção 4: Abrir Diretamente

Simplesmente abra `index.html` no navegador (funciona perfeitamente).

## 📖 Como Usar

### 1️⃣ Criar um Tutorial

1. Clique em **"➕ Novo"** na sidebar
2. Preencha o formulário:
   - **Título**: "Como instalar o Docker no Ubuntu"
   - **Categoria**: "DevOps"
   - **Nível**: "Intermediário"
3. Um passo inicial é criado automaticamente
4. Preencha o primeiro passo
5. Clique em **"➕ Adicionar Passo"** para adicionar mais
6. Preencha as **Notas Finais** (opcional)
7. Clique em **"💾 Salvar Tutorial"**

### 2️⃣ Gerenciar Passos

**Adicionar Passo:**
- Clique em "➕ Adicionar Passo" abaixo da lista de passos
- Um novo campo numerado aparecerá
- Digite a descrição do passo

**Remover Passo:**
- Clique no botão "✕" ao lado do passo que deseja remover
- Os passos seguintes serão automaticamente renumerados

**Reordenar:**
- Atualmente, para reordenar, edite o conteúdo dos passos
- (Futura melhoria: drag-and-drop)

### 3️⃣ Editar um Tutorial

1. Clique em qualquer tutorial na sidebar
2. O editor abrirá com os dados preenchidos
3. Faça as alterações desejadas
4. Clique em **"💾 Atualizar Tutorial"**

### 4️⃣ Exportar Tutorial para Markdown

1. Na lista de tutoriais, localize o tutorial desejado
2. Clique em **"📄 Markdown"**
3. Um arquivo `.md` será baixado automaticamente
4. Nome do arquivo: título do tutorial em slug (ex: `como-instalar-docker.md`)

**Dica**: Você pode exportar quantos tutoriais quiser, cada um vira um arquivo separado!

### 5️⃣ Excluir um Tutorial

1. Clique em **"🗑️ Excluir"** no tutorial desejado
2. Confirme a exclusão
3. O tutorial será removido permanentemente

## 💡 Exemplos de Uso

### Tutorial de Instalação

```
Título: "Como instalar PostgreSQL no Ubuntu"
Categoria: Banco de Dados
Nível: Básico

Passos:
1. Atualize os repositórios: sudo apt update
2. Instale o PostgreSQL: sudo apt install postgresql postgresql-contrib
3. Verifique o serviço: sudo systemctl status postgresql
4. Acesse o console: sudo -u postgres psql
5. Crie um novo usuário: CREATE USER meuusuario WITH PASSWORD 'senha123';

Notas Finais:
Lembre-se de configurar o pg_hba.conf para aceitar conexões remotas.
Documentação oficial: https://www.postgresql.org/docs/
```

### Tutorial de Configuração

```
Título: "Configurar SSH no servidor Linux"
Categoria: Segurança
Nível: Intermediário

Passos:
1. Instale o OpenSSH Server: sudo apt install openssh-server
2. Edite o arquivo de configuração: sudo nano /etc/ssh/sshd_config
3. Altere a porta padrão: Port 2222
4. Desabilite login root: PermitRootLogin no
5. Reinicie o serviço: sudo systemctl restart ssh
6. Teste a conexão: ssh usuario@servidor -p 2222

Notas Finais:
Sempre use chaves SSH ao invés de senhas para maior segurança.
Configure fail2ban para proteção contra força bruta.
```

### Tutorial de Desenvolvimento

```
Título: "Criar projeto React com Vite"
Categoria: Desenvolvimento
Nível: Básico

Passos:
1. Certifique-se que Node.js está instalado: node --version
2. Crie o projeto: npm create vite@latest meu-app -- --template react
3. Entre na pasta: cd meu-app
4. Instale as dependências: npm install
5. Inicie o servidor de desenvolvimento: npm run dev
6. Acesse no navegador: http://localhost:5173

Notas Finais:
Vite é muito mais rápido que Create React App.
Use npm run build para gerar a versão de produção.
```

## 🎯 Dicas de Produtividade

### Organize por Categoria
Use categorias para agrupar tutoriais relacionados:
- **Desenvolvimento**: Instalações de linguagens, frameworks, ferramentas
- **DevOps**: Configuração de servidores, CI/CD, containers
- **Banco de Dados**: Instalação e configuração de DBs
- **Segurança**: Hardening, SSL/TLS, firewalls
- **Ferramentas**: Editores, IDEs, produtividade

### Use Níveis Estrategicamente
- **Básico**: Tutoriais para iniciantes, instalações simples
- **Intermediário**: Configurações avançadas, integrações
- **Avançado**: Otimizações, arquiteturas complexas

### Seja Específico nos Passos
- Cada passo deve ser uma ação única e clara
- Inclua comandos exatos (ex: `sudo apt install nodejs`)
- Mencione resultados esperados quando relevante

### Aproveite as Notas Finais
Use para:
- Links para documentação oficial
- Avisos importantes
- Solução de problemas comuns
- Próximos passos recomendados

### Exporte Regularmente
- Crie uma biblioteca de tutoriais em Markdown
- Organize em pastas no seu repositório
- Compartilhe no GitHub/GitLab
- Crie uma wiki pessoal

## 💾 Backup e Exportação

### Backup Manual

Como os tutoriais ficam no localStorage, você tem duas opções de backup:

**Opção 1: Exportar cada tutorial individualmente**
1. Use o botão "📄 Markdown" em cada tutorial
2. Salve os arquivos .md em uma pasta backup
3. Você terá arquivos prontos para usar

**Opção 2: Backup do localStorage (avançado)**
1. Abra o DevTools (F12)
2. Vá em Application → Local Storage
3. Copie o valor da chave `fp_howto_editor`
4. Salve em um arquivo JSON

**Importante**: Limpar cache do navegador apaga os dados!

### Restauração

Para restaurar tutoriais:
1. Importe os arquivos Markdown manualmente
2. Ou restaure o valor do localStorage via DevTools

**Dica**: Mantenha uma pasta com todos os .md exportados em um repositório Git!

## ⚠️ Limitações Conhecidas

### 1. Armazenamento Local
- Dados ficam no navegador e domínio específicos
- Limpar cache = perder dados
- Não sincroniza entre dispositivos

**Solução**: Exporte regularmente os tutoriais em Markdown!

### 2. Sem Versionamento
- Não há histórico de alterações
- Não é possível desfazer edições

**Solução**: Mantenha os .md exportados em um repositório Git para versionamento.

### 3. Reordenação Manual
- Não há drag-and-drop para reordenar passos
- É necessário editar o conteúdo manualmente

### 4. localStorage Limite
- ~5-10MB dependendo do navegador
- Muitos tutoriais podem atingir o limite

**Dica**: Exporte e arquive tutoriais antigos.

## 🔒 Privacidade

- **100% offline**: Nenhum dado é enviado para servidores
- **Local apenas**: Tudo fica no seu navegador
- **Sem rastreamento**: Zero coleta de dados
- **Você controla**: Exporte e guarde onde quiser

## 💾 Estratégia de Backup Recomendada

### Para Usuários Individuais
1. **Frequência**: Exporte após criar/atualizar tutoriais importantes
2. **Local**: Salve em uma pasta específica (ex: `~/documentos/tutoriais/`)
3. **Versionamento**: Use Git para versionar os arquivos .md
4. **Cloud**: Sincronize a pasta com Google Drive, Dropbox, etc.

### Para Equipes
1. **Repositório compartilhado**: Crie um repo Git com todos os tutoriais
2. **Estrutura de pastas**: Organize por categoria
   ```
   tutoriais/
   ├── desenvolvimento/
   ├── devops/
   ├── banco-de-dados/
   └── seguranca/
   ```
3. **Wiki**: Use os .md em uma wiki do GitHub/GitLab
4. **Documentação**: Integre com geradores de docs (MkDocs, Docusaurus)

## 🔮 Ideias para Evolução Futura

### Funcionalidades
- [ ] Drag-and-drop para reordenar passos
- [ ] Duplicar tutorial existente
- [ ] Templates pré-configurados
- [ ] Import de Markdown existente
- [ ] Anexar imagens aos passos
- [ ] Checklist interativo nos passos
- [ ] Tags múltiplas por tutorial
- [ ] Busca/filtro por categoria e nível
- [ ] Exportar todos os tutoriais de uma vez (ZIP)
- [ ] Preview do Markdown antes de exportar

### Técnicas
- [ ] IndexedDB para maior capacidade
- [ ] PWA para instalação como app
- [ ] Sincronização opcional via GitHub Gist
- [ ] Modo escuro
- [ ] Editor Markdown com preview
- [ ] Syntax highlighting para código
- [ ] Atalhos de teclado

## 🧪 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Grid, Flexbox, variáveis CSS, responsividade
- **JavaScript (ES6+)**: Manipulação do DOM, localStorage
- **localStorage**: Persistência de dados
- **Markdown**: Formato de exportação universal

## 📱 Responsividade

O aplicativo funciona perfeitamente em:
- 💻 **Desktop**: Layout em duas colunas (lista + editor)
- 📱 **Tablet**: Layout adaptado (1024px breakpoint)
- 📱 **Smartphone**: Layout em coluna única (768px breakpoint)

## 🎨 Tema Visual

- **Cor primária**: Verde (#10b981) - produtividade e crescimento
- **Níveis**:
  - 🔵 Azul (#3b82f6) - Básico
  - 🟠 Laranja (#f59e0b) - Intermediário
  - 🔴 Vermelho (#ef4444) - Avançado
- **Design clean**: Foco no conteúdo, sem distrações

## 🤝 Contribuindo

Este projeto faz parte do **Sprint Lab - Ecossistema FP**. Sugestões e melhorias são bem-vindas!

## 📄 Licença

Projeto pessoal do Ecossistema FP - Uso livre.

---

**Desenvolvido com 💚 para o Ecossistema FP**
