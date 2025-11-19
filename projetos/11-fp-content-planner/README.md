# 📅 FP Content Planner – Planejador Editorial

Mini aplicativo web offline para planejar e organizar conteúdos digitais. Perfeito para criadores de conteúdo que precisam gerenciar múltiplas plataformas e acompanhar o status de produção.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Características](#características)
- [Como Usar](#como-usar)
- [Funcionalidades](#funcionalidades)
- [Campos Disponíveis](#campos-disponíveis)
- [Filtros e Busca](#filtros-e-busca)
- [Exportação e Importação](#exportação-e-importação)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Tecnologias](#tecnologias)
- [Roadmap Futuro](#roadmap-futuro)

---

## 🎯 Sobre o Projeto

O **FP Content Planner** é uma ferramenta offline para planejamento editorial criada especialmente para criadores de conteúdo que trabalham com múltiplas plataformas (YouTube, Instagram, TikTok, Blog, etc.).

Com ele você pode:
- Organizar todos os seus conteúdos em um único lugar
- Acompanhar o status de produção de cada peça
- Filtrar e buscar conteúdos rapidamente
- Fazer backup completo em JSON
- Trabalhar 100% offline, sem necessidade de internet

---

## ✨ Características

- 📝 **CRUD Completo** – Criar, visualizar, editar e excluir conteúdos
- 🔍 **Filtros Avançados** – Por plataforma, tipo, status e busca por título
- 🎨 **Interface Moderna** – Design responsivo e intuitivo
- 💾 **100% Offline** – Funciona sem internet, dados salvos localmente
- 📤 **Exportar/Importar** – Backup completo em JSON
- 🎯 **Múltiplos Status** – Acompanhe cada etapa de produção
- 📱 **Responsivo** – Funciona em desktop, tablet e mobile
- ⚡ **Performance** – Rápido e leve, sem dependências externas

---

## 🚀 Como Usar

### 1. Adicionar Novo Conteúdo

1. Clique no botão **"➕ Novo Conteúdo"**
2. Preencha os campos obrigatórios:
   - Título
   - Tipo (Post, Reels, Shorts, Blog, Live, Vídeo Longo)
   - Status (Rascunho, Em Produção, Gravado, Editado, Aguardando Publicação, Publicado)
   - Plataforma (YouTube, Instagram, TikTok, Blog, Facebook, Shopee Live, Outras)
3. Opcionalmente, adicione:
   - Data de publicação
   - Link do conteúdo
   - Hashtags
   - Descrição/roteiro
4. Clique em **"💾 Salvar"**

### 2. Visualizar Conteúdos

Todos os conteúdos são exibidos em cards na lista principal, mostrando:
- Título
- Plataforma
- Tipo
- Status (com cor diferenciada)
- Data de publicação
- Link (se cadastrado)
- Hashtags
- Descrição

### 3. Editar Conteúdo

1. Localize o conteúdo na lista
2. Clique no botão **"✏️ Editar"**
3. Modifique os campos desejados
4. Clique em **"💾 Salvar"**

### 4. Excluir Conteúdo

1. Localize o conteúdo na lista
2. Clique no botão **"🗑️ Excluir"**
3. Confirme a exclusão na janela de confirmação

---

## 🧩 Funcionalidades

### Cadastro de Conteúdos

Formulário completo com validação de campos obrigatórios:
- **Título** (obrigatório) – Nome do conteúdo
- **Tipo** (obrigatório) – Formato do conteúdo
- **Status** (obrigatório) – Etapa de produção atual
- **Plataforma** (obrigatório) – Onde será publicado
- **Data de Publicação** (opcional) – Quando será publicado
- **Link** (opcional) – URL do conteúdo publicado
- **Hashtags** (opcional) – Tags para organização
- **Descrição/Roteiro** (opcional) – Detalhes e planejamento

### Status Disponíveis

1. **Rascunho** 🟦 – Ideia inicial, ainda não começou
2. **Em Produção** 🟧 – Conteúdo sendo criado
3. **Gravado** 🟦 – Gravação finalizada (para vídeos/lives)
4. **Editado** 🟪 – Edição concluída
5. **Aguardando Publicação** 🟥 – Pronto para publicar
6. **Publicado** 🟩 – Conteúdo no ar

---

## 🔍 Filtros e Busca

### Filtros Disponíveis

Todos os filtros podem ser **combinados** para busca precisa:

1. **Filtro por Plataforma**
   - YouTube
   - Instagram
   - TikTok
   - Blog
   - Facebook
   - Shopee Live
   - Outras

2. **Filtro por Tipo**
   - Post
   - Reels
   - Shorts
   - Blog
   - Live
   - Vídeo Longo

3. **Filtro por Status**
   - Rascunho
   - Em Produção
   - Gravado
   - Editado
   - Aguardando Publicação
   - Publicado

4. **Busca por Título**
   - Busca em tempo real
   - Encontra qualquer palavra no título

### Limpar Filtros

Clique no botão **"🔄 Limpar Filtros"** para resetar todos os filtros e visualizar todos os conteúdos.

---

## 📤 Exportação e Importação

### Exportar Planejamento

1. Clique no botão **"📤 Exportar Planejamento"**
2. Um arquivo JSON será baixado automaticamente
3. Nome do arquivo: `fp-content-planner-[timestamp].json`
4. O arquivo contém **todos** os seus conteúdos

**Para que serve:**
- Fazer backup dos seus dados
- Transferir para outro computador
- Compartilhar com equipe
- Manter versões anteriores

### Importar Planejamento

1. Clique no botão **"📥 Importar Planejamento"**
2. Selecione um arquivo JSON exportado anteriormente
3. Escolha entre:
   - **OK (Mesclar)** – Adiciona novos conteúdos mantendo os existentes
   - **Cancelar (Substituir)** – Apaga tudo e importa apenas o arquivo

**Importante:**
- Apenas arquivos JSON exportados pelo FP Content Planner são aceitos
- Ao mesclar, conteúdos com IDs duplicados não são importados
- Ao substituir, todos os dados atuais são perdidos

---

## 💻 Como Rodar Localmente

### Opção 1: Abrir Diretamente no Navegador

```bash
# Navegue até a pasta do projeto
cd projetos/11-fp-content-planner/

# Abra o arquivo index.html no navegador
# Linux
xdg-open index.html

# macOS
open index.html

# Windows
start index.html
```

### Opção 2: Servidor Local (Recomendado)

#### Com Python 3:
```bash
cd projetos/11-fp-content-planner/
python3 -m http.server 8000
# Acesse: http://localhost:8000
```

#### Com Node.js (http-server):
```bash
cd projetos/11-fp-content-planner/
npx http-server -p 8000
# Acesse: http://localhost:8000
```

#### Com PHP:
```bash
cd projetos/11-fp-content-planner/
php -S localhost:8000
# Acesse: http://localhost:8000
```

---

## 🛠️ Tecnologias

- **HTML5** – Estrutura semântica
- **CSS3** – Estilos modernos (Grid, Flexbox, Variables)
- **JavaScript ES6+** – Lógica e interatividade
- **localStorage** – Persistência de dados local
- **File API** – Importação/Exportação de JSON
- **Nenhum Framework** – Vanilla JS puro

---

## 📁 Estrutura de Dados

Os dados são armazenados em **localStorage** com a chave `fp_content_planner`.

Estrutura de cada conteúdo:

```json
{
  "id": "content_1234567890_abc123",
  "title": "Como criar conteúdo no YouTube",
  "type": "Vídeo Longo",
  "status": "Em Produção",
  "platform": "YouTube",
  "date": "2025-12-01",
  "link": "https://youtube.com/watch?v=exemplo",
  "hashtags": "#youtube #conteúdo #tutorial",
  "description": "Roteiro: Introdução sobre criação de conteúdo...",
  "createdAt": "2025-11-19T10:30:00.000Z",
  "updatedAt": "2025-11-19T14:20:00.000Z"
}
```

---

## 🎨 Paleta de Cores

O FP Content Planner usa tons de roxo/violeta como cor principal:

```css
--primary-color: #7c3aed;     /* Roxo principal */
--primary-dark: #6d28d9;
--primary-light: #8b5cf6;

--success-color: #10b981;     /* Verde - Publicado */
--warning-color: #f59e0b;     /* Laranja - Em Produção */
--danger-color: #ef4444;      /* Vermelho - Excluir */
--info-color: #3b82f6;        /* Azul - Editar */
```

---

## 🔮 Roadmap Futuro

### Curto Prazo
- [ ] Sistema de tags personalizadas
- [ ] Ordenação customizável (por data, título, status)
- [ ] Visualização em calendário
- [ ] Modo escuro/claro
- [ ] Estatísticas e dashboard

### Médio Prazo
- [ ] Visualização em Kanban
- [ ] Duplicar conteúdo
- [ ] Templates de conteúdo
- [ ] Notificações de prazo
- [ ] Anexar arquivos

### Longo Prazo
- [ ] PWA (Progressive Web App)
- [ ] Sincronização em nuvem
- [ ] Integração com APIs de redes sociais
- [ ] Sugestões de conteúdo com IA
- [ ] Analytics e relatórios
- [ ] Planejamento em equipe

---

## 📝 Casos de Uso

### Para YouTubers
- Planejar vídeos semanais
- Acompanhar status de edição
- Organizar links de vídeos publicados

### Para Instagrammers
- Planejar posts e reels
- Gerenciar hashtags por post
- Controlar calendário de publicações

### Para Blogueiros
- Organizar pautas e rascunhos
- Acompanhar status de artigos
- Manter links de posts publicados

### Para Criadores Multi-plataforma
- Centralizar todo o planejamento
- Filtrar por plataforma específica
- Acompanhar produção cross-platform

---

## 🐛 Solução de Problemas

### Dados não estão sendo salvos
- Verifique se o navegador permite localStorage
- Teste em uma aba anônima para verificar extensões
- Verifique o espaço disponível (localStorage tem limite de ~5-10MB)

### Filtros não funcionam
- Clique em "Limpar Filtros" e tente novamente
- Recarregue a página
- Verifique o console do navegador (F12) para erros

### Importação falha
- Certifique-se que o arquivo é JSON válido
- Verifique se foi exportado pelo FP Content Planner
- Tente abrir o arquivo em um editor de texto para validar

---

## 📄 Licença

Este projeto faz parte do **Sprint Lab – Ecossistema FP**.

---

## 👨‍💻 Autor

Desenvolvido como parte do projeto Sprint Lab.

---

## 🔗 Links Relacionados

- [Sprint Lab](../../README.md) – Repositório principal
- [Outros Projetos](../) – Mais mini-apps do Sprint Lab

---

**FP Content Planner** – Organize seu conteúdo, domine suas plataformas! 🚀
