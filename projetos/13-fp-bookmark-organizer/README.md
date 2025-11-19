# 🔖 FP Bookmark Organizer – Organizador de Links

Organizador inteligente de bookmarks para criadores, técnicos e afiliados. Gerencie seus links úteis com tags, categorias e rastreamento de acessos.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Características](#características)
- [Como Usar](#como-usar)
- [Funcionalidades](#funcionalidades)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Campos Disponíveis](#campos-disponíveis)
- [Filtros e Busca](#filtros-e-busca)
- [Sistema de Último Acesso](#sistema-de-último-acesso)
- [Exportação e Importação](#exportação-e-importação)
- [Tecnologias](#tecnologias)
- [Roadmap Futuro](#roadmap-futuro)

---

## 🎯 Sobre o Projeto

O **FP Bookmark Organizer** é uma ferramenta offline para organizar e gerenciar links importantes. Ideal para profissionais que acumulam muitos bookmarks e precisam de uma forma eficiente de categorizá-los, priorizá-los e encontrá-los rapidamente.

Com ele você pode:
- Organizar links por categorias e tags
- Definir níveis de prioridade
- Rastrear quando foi o último acesso a cada link
- Filtrar e buscar rapidamente
- Fazer backup completo em JSON
- Trabalhar 100% offline

---

## ✨ Características

- 📝 **CRUD Completo** – Criar, visualizar, editar e excluir bookmarks
- 🗂️ **Categorias Organizadas** – Ferramentas, IA, WordPress, Marketing, Estudos, Docs, Recursos, Inspiração
- 🏷️ **Sistema de Tags** – Tags como chips visuais para melhor organização
- 🎯 **Níveis de Prioridade** – Alta (vermelho), Média (amarelo), Baixa (verde)
- 🔍 **Filtros Avançados** – Por categoria, prioridade, título e tags
- 🕒 **Rastreamento de Acesso** – Data de criação e último acesso registrados automaticamente
- 📤 **Backup JSON** – Exportar e importar seus links
- 💾 **100% Offline** – Funciona sem internet, dados salvos localmente
- 📱 **Responsivo** – Funciona em desktop, tablet e mobile

---

## 🚀 Como Usar

### 1. Adicionar Novo Link

1. Clique no botão **"➕ Novo Link"**
2. Preencha os campos obrigatórios:
   - **Título** (ex: ChatGPT, Documentação React)
   - **URL** (endereço completo do site)
   - **Categoria** (escolha uma das 8 categorias)
   - **Prioridade** (Alta, Média ou Baixa)
3. Opcionalmente, adicione:
   - **Tags** (separadas por vírgula: python, ai, tutorial)
   - **Descrição** (anotações sobre o link)
4. Clique em **"💾 Salvar"**
5. As datas serão registradas automaticamente

### 2. Visualizar Links

Todos os links são exibidos em cards mostrando:
- Título (clicável - abre em nova aba)
- URL completa
- Categoria
- Prioridade (com cor diferenciada)
- Tags (se houver)
- Descrição (se houver)
- Data de criação
- Data do último acesso

### 3. Acessar um Link

1. Clique no **título do link**
2. O link será aberto em uma **nova aba**
3. A data/hora do **último acesso** será atualizada automaticamente
4. Você pode verificar quando acessou cada link pela última vez

### 4. Editar Link

1. Localize o link na lista
2. Clique no botão **"✏️ Editar"**
3. Modifique os campos desejados
4. Clique em **"💾 Salvar"**

### 5. Excluir Link

1. Localize o link na lista
2. Clique no botão **"🗑️ Excluir"**
3. Confirme a exclusão

---

## 🧩 Funcionalidades

### Cadastro de Links

Formulário completo com validação:
- **Título** (obrigatório) – Nome descritivo do link
- **URL** (obrigatório) – Endereço completo
- **Categoria** (obrigatório) – Uma das 8 categorias
- **Prioridade** (obrigatório) – Alta, Média ou Baixa
- **Tags** (opcional) – Palavras-chave separadas por vírgula
- **Descrição** (opcional) – Anotações sobre o link

### Categorias Disponíveis

1. **Ferramentas** – Aplicativos e serviços úteis
2. **IA** – Inteligência artificial, LLMs, automação
3. **WordPress** – Temas, plugins, tutoriais
4. **Marketing** – SEO, ads, analytics
5. **Estudos** – Cursos, tutoriais, aprendizado
6. **Docs** – Documentações técnicas
7. **Recursos** – Assets, templates, bibliotecas
8. **Inspiração** – Referências, portfolios, exemplos

### Prioridades com Cores

- **Alta** 🔴 – Links essenciais, acesso frequente
- **Média** 🟡 – Links importantes, acesso regular
- **Baixa** 🟢 – Links úteis, acesso eventual

---

## 💻 Como Rodar Localmente

### Opção 1: Abrir Diretamente no Navegador

```bash
# Navegue até a pasta do projeto
cd projetos/13-fp-bookmark-organizer/

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
cd projetos/13-fp-bookmark-organizer/
python3 -m http.server 8000
# Acesse: http://localhost:8000
```

#### Com Node.js (http-server):
```bash
cd projetos/13-fp-bookmark-organizer/
npx http-server -p 8000
# Acesse: http://localhost:8000
```

#### Com PHP:
```bash
cd projetos/13-fp-bookmark-organizer/
php -S localhost:8000
# Acesse: http://localhost:8000
```

---

## 🔍 Filtros e Busca

### Filtros Disponíveis

Todos os filtros podem ser **combinados** para busca precisa:

1. **Filtro por Categoria**
   - Ferramentas, IA, WordPress, Marketing, Estudos, Docs, Recursos, Inspiração

2. **Filtro por Prioridade**
   - Alta, Média, Baixa

3. **Buscar por Título**
   - Busca em tempo real
   - Encontra qualquer palavra no título

4. **Buscar por Tag**
   - Busca em tempo real
   - Encontra tags específicas

### Limpar Filtros

Clique no botão **"🔄 Limpar Filtros"** para resetar todos os filtros e visualizar todos os links.

---

## 🕒 Sistema de Último Acesso

### Como Funciona

1. **Ao clicar no título do link**:
   - O link abre em uma nova aba
   - A data e hora atual são registradas automaticamente
   - Os dados são salvos no localStorage

2. **Visualização**:
   - Cada card mostra a data do último acesso
   - Se nunca foi acessado, exibe "Nunca acessado"
   - Formato: DD/MM/AAAA HH:MM

3. **Utilidade**:
   - Identificar links que você não usa há muito tempo
   - Priorizar links mais acessados
   - Fazer limpeza de bookmarks antigos

---

## 📤 Exportação e Importação

### Exportar Links

1. Clique no botão **"📤 Exportar Links"**
2. Um arquivo JSON será baixado automaticamente
3. Nome do arquivo: `fp-bookmarks-[timestamp].json`
4. O arquivo contém **todos** os seus links

**Para que serve:**
- Fazer backup dos seus dados
- Transferir para outro computador
- Compartilhar com equipe
- Manter versões anteriores

### Importar Links

1. Clique no botão **"📥 Importar Links"**
2. Selecione um arquivo JSON exportado anteriormente
3. Escolha entre:
   - **OK (Mesclar)** – Adiciona novos links mantendo os existentes
   - **Cancelar (Substituir)** – Apaga tudo e importa apenas o arquivo

**Comportamento:**
- **Mesclar**: Links com IDs duplicados não são importados
- **Substituir**: Todos os dados atuais são perdidos
- Validação automática da estrutura do arquivo

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

Os dados são armazenados em **localStorage** com a chave `fp_bookmarks`.

Estrutura de cada bookmark:

```json
{
  "id": "bookmark_1234567890_abc123",
  "title": "ChatGPT",
  "url": "https://chat.openai.com",
  "category": "IA",
  "priority": "Alta",
  "tags": "ai, chatbot, openai",
  "description": "Interface do ChatGPT para conversas com IA",
  "createdAt": "2025-11-19T10:30:00.000Z",
  "lastAccess": "2025-11-19T14:20:00.000Z"
}
```

---

## 🎨 Paleta de Cores

O FP Bookmark Organizer usa tons neutros com azul escuro:

```css
--primary-color: #1e40af;     /* Azul escuro */
--primary-dark: #1e3a8a;
--primary-light: #3b82f6;

--priority-alta: #ef4444;     /* Vermelho - Alta */
--priority-media: #f59e0b;    /* Amarelo - Média */
--priority-baixa: #10b981;    /* Verde - Baixa */
```

---

## 🔮 Roadmap Futuro

### Curto Prazo
- [ ] Tags inteligentes (sugestões baseadas em uso)
- [ ] Ordenação customizável (por data, título, prioridade)
- [ ] Estatísticas de uso (links mais acessados)
- [ ] Modo escuro/claro
- [ ] Ícones de favicons dos sites

### Médio Prazo
- [ ] Ranking de links mais úteis
- [ ] Pastas/subpastas para melhor organização
- [ ] Notas e comentários em cada link
- [ ] Sistema de favoritos
- [ ] Verificação de links quebrados

### Longo Prazo
- [ ] PWA (Progressive Web App)
- [ ] Sincronização em nuvem
- [ ] Compartilhamento de coleções
- [ ] Extensão de navegador
- [ ] Import de bookmarks do Chrome/Firefox
- [ ] Sugestões de links relacionados com IA

---

## 📝 Casos de Uso

### Para Desenvolvedores
- Organizar documentações técnicas
- Salvar tutoriais e referências
- Gerenciar ferramentas de desenvolvimento
- Categorizar recursos por projeto

### Para Profissionais de Marketing
- Guardar ferramentas de SEO e analytics
- Organizar inspirações de campanhas
- Gerenciar links de cursos e webinars
- Categorizar recursos por cliente

### Para Criadores de Conteúdo
- Salvar referências visuais
- Organizar ferramentas de edição
- Gerenciar recursos de stock
- Categorizar inspirações

### Para Afiliados
- Gerenciar links de produtos
- Organizar programas de afiliados
- Salvar landing pages de referência
- Categorizar por nicho

---

## 💡 Dicas de Uso

### Organizando com Tags

✅ **Bom:**
- Use tags consistentes: sempre em minúsculas
- Seja específico: "python-flask" em vez de só "python"
- Use sinônimos: "js, javascript" para facilitar busca

❌ **Evite:**
- Tags muito genéricas: "útil", "bom"
- Muitas tags por link (máximo 5-6)
- Tags duplicadas com categorias

### Definindo Prioridades

**Alta**: Links que você acessa diariamente ou semanalmente
**Média**: Links úteis que você acessa mensalmente
**Baixa**: Links de referência, acesso ocasional

### Descrições Eficazes

Inclua:
- Por que o link é útil
- Quando usar
- Credenciais de acesso (se aplicável)
- Alternativas similares

---

## 🐛 Solução de Problemas

### Dados não estão sendo salvos
- Verifique se o navegador permite localStorage
- Teste em uma aba anônima
- Verifique o espaço disponível (localStorage tem limite de ~5-10MB)

### Último acesso não atualiza
- Certifique-se de clicar no **título** do link (não na URL)
- Verifique se JavaScript está habilitado
- Recarregue a página após acessar

### Filtros não funcionam
- Clique em "Limpar Filtros" e tente novamente
- Verifique se há dados cadastrados
- Recarregue a página

### Importação falha
- Certifique-se que o arquivo é JSON válido
- Verifique se foi exportado pelo FP Bookmark Organizer
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

**FP Bookmark Organizer** – Organize seus links, encontre o que precisa! 🚀
