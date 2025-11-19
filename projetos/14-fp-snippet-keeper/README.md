# 📝 FP Snippet Keeper – Biblioteca de Snippets

Biblioteca pessoal offline para organizar e gerenciar snippets de código úteis. Nunca mais perca aquele código importante!

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Características](#características)
- [Como Usar](#como-usar)
- [Funcionalidades](#funcionalidades)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Linguagens Suportadas](#linguagens-suportadas)
- [Categorias](#categorias)
- [Filtros e Busca](#filtros-e-busca)
- [Visualização e Cópia](#visualização-e-cópia)
- [Exportação e Importação](#exportação-e-importação)
- [Exemplos de Snippets](#exemplos-de-snippets)
- [Tecnologias](#tecnologias)
- [Roadmap Futuro](#roadmap-futuro)

---

## 🎯 Sobre o Projeto

O **FP Snippet Keeper** é uma biblioteca pessoal para guardar e organizar snippets de código que você usa frequentemente. Ideal para desenvolvedores, administradores de sistemas, profissionais de marketing e qualquer um que trabalha com código ou templates.

Com ele você pode:
- Salvar snippets de qualquer linguagem
- Organizar por categoria e linguagem
- Buscar rapidamente por título ou dentro do código
- Copiar código com um clique
- Fazer backup completo em JSON
- Trabalhar 100% offline

---

## ✨ Características

- 📝 **CRUD Completo** – Criar, visualizar, editar e excluir snippets
- 🎨 **9 Linguagens** – Tags coloridas para cada linguagem
- 🗂️ **8 Categorias** – Organize por tipo de uso
- 🔍 **Busca Avançada** – Por título ou dentro do código
- 👁️ **Visualização Limpa** – Modal com código formatado
- 📋 **Copiar Código** – Um clique para copiar ao clipboard
- 🕒 **Histórico** – Data de criação e última edição
- 📤 **Backup JSON** – Exportar e importar biblioteca completa
- 💾 **100% Offline** – Funciona sem internet
- 📱 **Responsivo** – Funciona em desktop, tablet e mobile

---

## 🚀 Como Usar

### 1. Adicionar Novo Snippet

1. Clique no botão **"➕ Novo Snippet"**
2. Preencha os campos obrigatórios:
   - **Título** (ex: "Função de validação de email")
   - **Linguagem** (escolha uma das 9 opções)
   - **Categoria** (escolha uma das 8 opções)
   - **Código** (cole ou digite seu código)
3. Opcionalmente, adicione:
   - **Notas** (descrição, quando usar, observações)
4. Clique em **"💾 Salvar"**
5. Datas serão registradas automaticamente

### 2. Visualizar Snippet

1. Localize o snippet na lista
2. Clique no botão **"👁️ Ver"**
3. Um modal abrirá mostrando:
   - Título completo
   - Linguagem e categoria
   - Código formatado com fonte monospace
   - Botão para copiar código
   - Notas (se houver)
   - Datas de criação e edição

### 3. Copiar Código

1. Na visualização do snippet
2. Clique no botão **"📋 Copiar Código"**
3. O código será copiado para o clipboard
4. Feedback visual "✅ Copiado!" aparecerá
5. Cole onde precisar (Ctrl+V ou Cmd+V)

### 4. Editar Snippet

1. Localize o snippet na lista
2. Clique no botão **"✏️ Editar"**
3. Modifique os campos desejados
4. Clique em **"💾 Salvar"**
5. A data de edição será atualizada automaticamente

### 5. Excluir Snippet

1. Localize o snippet na lista
2. Clique no botão **"🗑️ Excluir"**
3. Confirme a exclusão

---

## 🧩 Funcionalidades

### Cadastro de Snippets

Formulário completo com validação:
- **Título** (obrigatório) – Nome descritivo do snippet
- **Linguagem** (obrigatório) – Uma das 9 linguagens
- **Categoria** (obrigatório) – Uma das 8 categorias
- **Código** (obrigatório) – Seu código/snippet
- **Notas** (opcional) – Anotações complementares

### Dados Automáticos

- **Data de Criação** – Registrada ao salvar
- **Data de Última Edição** – Atualizada ao editar

---

## 💻 Como Rodar Localmente

### Opção 1: Abrir Diretamente no Navegador

```bash
# Navegue até a pasta do projeto
cd projetos/14-fp-snippet-keeper/

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
cd projetos/14-fp-snippet-keeper/
python3 -m http.server 8000
# Acesse: http://localhost:8000
```

#### Com Node.js (http-server):
```bash
cd projetos/14-fp-snippet-keeper/
npx http-server -p 8000
# Acesse: http://localhost:8000
```

#### Com PHP:
```bash
cd projetos/14-fp-snippet-keeper/
php -S localhost:8000
# Acesse: http://localhost:8000
```

---

## 🎨 Linguagens Suportadas

Cada linguagem tem uma tag colorida para fácil identificação:

1. **HTML** 🔴 – Vermelho
2. **CSS** 🔵 – Azul
3. **JavaScript** 🟡 – Amarelo
4. **PHP** 🟣 – Roxo
5. **SQL** 🔵 – Azul escuro
6. **Bash** 🟢 – Verde
7. **Prompt IA** 🟪 – Violeta
8. **Texto** ⚫ – Cinza
9. **Outro** ⚫ – Cinza escuro

---

## 🗂️ Categorias

1. **WordPress** – Snippets para WordPress (shortcodes, funções, hooks)
2. **PAP** – Snippets para o Blog PAP
3. **Dev** – Desenvolvimento geral (funções, classes, helpers)
4. **Sistema** – Scripts de sistema, comandos, configs
5. **Marketing** – Templates, scripts de ads, tracking
6. **Templates** – HTML templates, emails, layouts
7. **Utilitários** – Funções utilitárias, helpers gerais
8. **Outros** – Outros tipos de snippets

---

## 🔍 Filtros e Busca

### Filtros Disponíveis

Todos os filtros podem ser **combinados**:

1. **Filtro por Linguagem**
   - Mostra apenas snippets da linguagem selecionada

2. **Filtro por Categoria**
   - Mostra apenas snippets da categoria selecionada

3. **Buscar por Título**
   - Busca em tempo real no título do snippet
   - Encontra qualquer palavra no título

4. **Buscar no Código**
   - Busca em tempo real dentro do código
   - Útil para encontrar snippets que usam função específica
   - Ex: buscar "SELECT" para achar queries SQL

### Limpar Filtros

Clique no botão **"🔄 Limpar Filtros"** para resetar todos os filtros.

---

## 👁️ Visualização e Cópia

### Modal de Visualização

Ao clicar em "👁️ Ver", um modal mostrará:
- Título do snippet
- Tag de linguagem colorida
- Categoria
- Código formatado em `<pre><code>` com fonte monospace
- Botão "📋 Copiar Código"
- Notas complementares (se houver)
- Data de criação
- Data de última edição

### Copiar Código

**Como funciona:**
1. Clique no botão "📋 Copiar Código"
2. O código é copiado para o clipboard
3. Feedback visual "✅ Copiado!" aparece
4. Use Ctrl+V (ou Cmd+V) para colar

**Compatibilidade:**
- Navegadores modernos: usa Clipboard API
- Navegadores antigos: fallback com execCommand
- Funciona em todos os navegadores principais

---

## 📤 Exportação e Importação

### Exportar Biblioteca

1. Clique no botão **"📤 Exportar Biblioteca"**
2. Um arquivo JSON será baixado automaticamente
3. Nome do arquivo: `fp-snippets-[timestamp].json`
4. O arquivo contém **todos** os seus snippets

**Para que serve:**
- Fazer backup dos seus snippets
- Transferir para outro computador
- Compartilhar com equipe
- Manter versões anteriores

### Importar Biblioteca

1. Clique no botão **"📥 Importar Biblioteca"**
2. Selecione um arquivo JSON exportado anteriormente
3. Escolha:
   - **OK** – SUBSTITUI todos os dados atuais
   - **Cancelar** – Mantém dados atuais e cancela importação

**Importante:**
- A importação **substitui completamente** todos os dados
- Faça backup antes de importar se tiver snippets importantes
- Apenas arquivos JSON válidos são aceitos

---

## 📝 Exemplos de Snippets

### Exemplo 1: WordPress Shortcode

**Título:** Shortcode de botão personalizado
**Linguagem:** PHP
**Categoria:** WordPress
**Código:**
```php
function custom_button_shortcode($atts) {
    $atts = shortcode_atts([
        'text' => 'Clique aqui',
        'url' => '#',
        'color' => 'blue'
    ], $atts);

    return '<a href="' . esc_url($atts['url']) . '" class="btn btn-' . esc_attr($atts['color']) . '">' . esc_html($atts['text']) . '</a>';
}
add_shortcode('custom_button', 'custom_button_shortcode');
```
**Notas:** Uso: [custom_button text="Saiba mais" url="/sobre" color="red"]

### Exemplo 2: Validação JavaScript

**Título:** Função de validação de email
**Linguagem:** JavaScript
**Categoria:** Dev
**Código:**
```javascript
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Uso:
if (validateEmail('usuario@exemplo.com')) {
    console.log('Email válido');
}
```
**Notas:** Validação simples de email usando regex. Para validação mais robusta, considere usar biblioteca como validator.js

### Exemplo 3: SQL Query

**Título:** Query para buscar usuários ativos
**Linguagem:** SQL
**Categoria:** Dev
**Código:**
```sql
SELECT u.id, u.name, u.email, u.created_at
FROM users u
WHERE u.status = 'active'
  AND u.email_verified = 1
ORDER BY u.created_at DESC
LIMIT 50;
```
**Notas:** Retorna os 50 usuários mais recentes que estão ativos e com email verificado.

### Exemplo 4: Prompt para IA

**Título:** Prompt para criar conteúdo de blog
**Linguagem:** Prompt IA
**Categoria:** Marketing
**Código:**
```
Você é um especialista em marketing de conteúdo.

Crie um artigo de blog sobre [TÓPICO] com as seguintes características:
- Tom: profissional mas acessível
- Público-alvo: [DEFINIR PÚBLICO]
- Tamanho: 800-1000 palavras
- Incluir: introdução, 3-5 subtópicos, conclusão
- SEO: incluir palavra-chave "[KEYWORD]" naturalmente

Estrutura desejada:
1. Título chamativo
2. Introdução que prenda a atenção
3. Desenvolvimento com exemplos práticos
4. Call-to-action no final
```
**Notas:** Substitua [TÓPICO], [PÚBLICO] e [KEYWORD] conforme necessário.

---

## 🛠️ Tecnologias

- **HTML5** – Estrutura semântica
- **CSS3** – Estilos modernos (Grid, Flexbox, Variables)
- **JavaScript ES6+** – Lógica e interatividade
- **localStorage** – Persistência de dados local
- **Clipboard API** – Copiar código para clipboard
- **File API** – Importação/Exportação de JSON
- **Nenhum Framework** – Vanilla JS puro

---

## 📁 Estrutura de Dados

Os dados são armazenados em **localStorage** com a chave `fp_snippet_keeper`.

Estrutura de cada snippet:

```json
{
  "id": "snippet_1234567890_abc123",
  "title": "Função de validação de email",
  "language": "JavaScript",
  "category": "Dev",
  "code": "function validateEmail(email) {\n  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n  return regex.test(email);\n}",
  "notes": "Validação simples de email usando regex",
  "createdAt": "2025-11-19T10:30:00.000Z",
  "editedAt": "2025-11-19T14:20:00.000Z"
}
```

---

## 🎨 Paleta de Cores

O FP Snippet Keeper usa azul escuro + cinza neutro + laranja:

```css
--primary-color: #1e40af;     /* Azul escuro */
--primary-dark: #1e3a8a;
--primary-light: #3b82f6;
--accent-color: #f59e0b;      /* Laranja */

--bg-primary: #0a0f1e;        /* Fundo escuro */
--bg-code: #0f172a;           /* Fundo de código */
```

---

## 🔮 Roadmap Futuro

### Curto Prazo
- [ ] Sintaxe highlighting (Prism.js ou Highlight.js)
- [ ] Sistema de favoritos/estrelas
- [ ] Ordenação customizável (data, título, linguagem)
- [ ] Contador de visualizações por snippet
- [ ] Tags personalizadas adicionais

### Médio Prazo
- [ ] Categorias personalizadas (criar suas próprias)
- [ ] Pastas/subpastas para melhor organização
- [ ] Versionamento de snippets (histórico de edições)
- [ ] Busca por múltiplas linguagens
- [ ] Exportação em formato Markdown

### Longo Prazo
- [ ] PWA (Progressive Web App)
- [ ] Sincronização em nuvem
- [ ] Compartilhamento de snippets por link
- [ ] Integração com GitHub Gists
- [ ] Extensão de navegador
- [ ] API REST para integração com PAP (salvar shortcodes automaticamente)
- [ ] Editor de código com syntax highlighting integrado
- [ ] Modo colaborativo (equipes)

---

## 💡 Dicas de Uso

### Organizando Snippets

**Boas Práticas:**
- Use títulos descritivos e específicos
- Inclua versão da linguagem nas notas quando relevante
- Documente parâmetros e uso nas notas
- Mantenha snippets pequenos e focados

**Exemplos de Títulos:**
- ✅ "Função JavaScript para formatar CPF"
- ✅ "Query SQL para relatório mensal"
- ✅ "Shortcode WordPress de galeria responsiva"
- ❌ "Função útil"
- ❌ "Code 1"
- ❌ "Teste"

### Usando Notas

Inclua nas notas:
- **Quando usar** o snippet
- **Parâmetros** que podem ser modificados
- **Dependências** (bibliotecas, plugins necessários)
- **Versão** da linguagem/framework
- **Créditos** (se copiou de algum lugar)
- **Exemplos** de uso

### Buscando Eficientemente

**Por código:**
- Busque por nome de função: "validateEmail"
- Busque por comando SQL: "SELECT", "JOIN"
- Busque por classe CSS: ".container", "#header"
- Busque por comentário: "TODO", "FIXME"

**Por título:**
- Use palavras-chave específicas
- Combine com filtros de linguagem/categoria

---

## 🐛 Solução de Problemas

### Dados não estão sendo salvos
- Verifique se o navegador permite localStorage
- Teste em uma aba anônima
- Verifique o espaço disponível (localStorage tem limite de ~5-10MB)

### Copiar código não funciona
- Certifique-se que está em HTTPS ou localhost
- Alguns navegadores bloqueiam clipboard em HTTP
- Use o fallback manual se necessário

### Importação falha
- Certifique-se que o arquivo é JSON válido
- Verifique se foi exportado pelo FP Snippet Keeper
- Tente abrir o arquivo em um editor para validar

### Código aparece mal formatado
- Certifique-se de usar quebras de linha ao salvar
- Use Tab para indentar
- Copie e cole código já formatado

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

**FP Snippet Keeper** – Nunca mais perca aquele código importante! 🚀
