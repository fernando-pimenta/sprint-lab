# 📧 FP Email Template Builder

**Construtor Visual de Templates de Email Marketing com Preview em Tempo Real**

Uma ferramenta completa e offline para criar, gerenciar e exportar templates de email marketing profissionais. Editor HTML/CSS com preview ao vivo, biblioteca de blocos reutilizáveis, variáveis dinâmicas e validação de compatibilidade.

---

## 🎯 Funcionalidades Principais

### ✅ CRUD Completo
- **Criar** templates personalizados do zero
- **Listar** todos os templates com filtros por categoria e status
- **Editar** templates existentes (dados e código HTML)
- **Excluir** templates com confirmação de segurança
- **Duplicar** templates existentes rapidamente
- **Buscar** templates por nome ou assunto

### 🎨 Editor Visual com Preview
- **Painel Dividido**: Editor de código (40%) + Preview em tempo real (60%)
- **Preview Responsivo**: Alternar entre visualização Desktop e Mobile
- **Atualização Automática**: Preview atualiza conforme você digita
- **Syntax Highlighting**: Editor de código com background escuro
- **Auto-Save**: Salvamento automático a cada 30 segundos

### 🧩 Biblioteca de Blocos Pré-formatados
Insira blocos HTML prontos com um clique:
- **Header** - Cabeçalho com logo
- **Hero Section** - Seção principal com título, descrição e CTA
- **Texto Simples** - Parágrafo de conteúdo
- **Produto** - Card de produto com imagem, descrição, preço e botão
- **CTA Button** - Botão de call-to-action customizável
- **Footer** - Rodapé com redes sociais e link de descadastro
- **Divider** - Linha separadora
- **Espaçador** - Espaço vertical

### 🔄 Variáveis Dinâmicas
Insira variáveis que serão substituídas no preview:
- `{{nome}}` → "João Silva"
- `{{email}}` → "joao@exemplo.com"
- `{{produto}}` → "Plano Premium"
- `{{preco}}` → "R$ 99,90"
- `{{link}}` → "#"
- `{{data}}` → Data atual

### 📚 Templates Prontos
5 templates profissionais pré-configurados:
1. **Newsletter Simples** - Template clean para newsletters semanais
2. **Email Promocional (Black Friday)** - Para promoções e ofertas
3. **Boas-vindas** - Welcome series para novos assinantes
4. **Lançamento de Produto** - Anunciar novos produtos
5. **Email Transacional** - Confirmações e notificações

### 📤 Export/Import
- **Exportar HTML**: Baixa arquivo `.html` do template atual
- **Copiar HTML**: Copia código para área de transferência
- **Exportar JSON**: Salva todos os templates em arquivo JSON
- **Importar JSON**: Carrega templates de arquivo JSON

### 🔍 Teste de Compatibilidade
Validação automática que verifica:
- ✅ Uso de estrutura `<table>` (recomendado para emails)
- ✅ Estilos inline (funcionam em todos os clientes)
- ⚠️ CSS externo ou em `<style>` (pode não funcionar)
- ✅ Variáveis formatadas corretamente
- ⚠️ Largura ideal do email (600px)

---

## 🚀 Como Usar

### 1️⃣ Criar Novo Template
1. Clique em **"➕ Novo Template"**
2. Preencha os dados:
   - Nome do Template (obrigatório)
   - Assunto do Email (60 caracteres recomendado)
   - Categoria (Newsletter, Promocional, etc.)
   - Plataforma (Mailpoet, GetResponse, Genérico)
   - Status (Rascunho, Ativo, Arquivado)
   - Notas (opcional)
3. Clique em **"Criar Template"**
4. Você será direcionado ao editor

### 2️⃣ Usar Template Pronto
1. Clique em **"📚 Biblioteca de Templates"**
2. Escolha um template
3. Clique em **"📝 Usar como Base"**
4. Nomeie o template
5. Edite no editor visual

### 3️⃣ Editar Template
1. Clique em **"✏️ Editar"** no card do template
2. Digite ou cole o código HTML/CSS no editor
3. Use a **aba "Blocos"** para inserir blocos prontos
4. Clique nas **variáveis dinâmicas** para inseri-las no código
5. Veja o preview atualizar em tempo real
6. Alterne entre visualização Desktop e Mobile
7. Clique em **"💾 Salvar"** ou use **Ctrl+S**

### 4️⃣ Inserir Blocos
1. No editor, clique na aba **"Blocos"**
2. Clique no bloco desejado (Header, Hero, Produto, etc.)
3. O bloco será inserido na posição do cursor
4. Volte para a aba **"Código"** e personalize

### 5️⃣ Exportar Template
- **HTML**: Clique em **"📥 Exportar HTML"** para baixar arquivo `.html`
- **Copiar**: Clique em **"📋 Copiar HTML"** para copiar código
- **JSON**: Na lista, clique em **"📤 Exportar Tudo (JSON)"** para backup

### 6️⃣ Testar Compatibilidade
1. No editor, clique em **"🔍 Testar Compatibilidade"**
2. Veja os resultados:
   - ✅ **Verde**: Tudo certo
   - ⚠️ **Amarelo**: Atenção necessária
   - ❌ **Vermelho**: Problema crítico
3. Ajuste o código conforme as recomendações

---

## 📋 Campos do Template

| Campo | Tipo | Descrição |
|-------|------|-----------|
| **Nome do Template** | Texto (obrigatório) | Identificação do template |
| **Assunto do Email** | Texto (60 chars) | Linha de assunto do email |
| **Categoria** | Dropdown | Newsletter, Promocional, Boas-vindas, Nurture, Transacional, Outro |
| **Plataforma** | Dropdown | Mailpoet, GetResponse, Genérico |
| **Status** | Dropdown | Rascunho, Ativo, Arquivado |
| **Notas** | Textarea | Anotações sobre o template |
| **HTML/CSS** | Editor de código | Código do email |
| **Data de Criação** | Automático | Timestamp de criação |
| **Última Modificação** | Automático | Timestamp de última edição |

---

## 🎨 Variáveis Dinâmicas Disponíveis

Use estas variáveis no código HTML para personalização:

```html
Olá, {{nome}}!

Seu email: {{email}}
Produto: {{produto}}
Preço: {{preco}}
Link: <a href="{{link}}">Clique aqui</a>
Data: {{data}}
```

**No preview, as variáveis serão substituídas por valores de exemplo.**

---

## ✨ Dicas de Compatibilidade

### ✅ Boas Práticas
- **Use `<table>`** para layout (não use divs ou flexbox)
- **Estilos inline** (`style="..."`) funcionam em todos os clientes
- **Largura de 600px** é ideal para emails
- **Use `border-collapse: collapse`** nas tabelas
- **Fontes seguras**: Arial, Helvetica, Georgia, Times New Roman
- **Imagens**: Sempre defina `width` e `alt`

### ❌ Evite
- CSS externo (`<link rel="stylesheet">`)
- Tag `<style>` no `<head>` (pode não funcionar)
- JavaScript (não funciona em clientes de email)
- Vídeos embutidos (use links)
- Fontes customizadas via web fonts (podem não carregar)

### 📱 Responsividade
Para emails responsivos, use media queries com cautela:

```html
<style>
@media only screen and (max-width: 600px) {
    .mobile-full-width {
        width: 100% !important;
    }
}
</style>
```

---

## 🔧 Tecnologias

- **HTML5** - Estrutura da aplicação
- **CSS3** - Estilização e layout responsivo
- **JavaScript (ES6+)** - Lógica e interatividade
- **localStorage** - Persistência de dados offline

---

## 🎨 Paleta de Cores (Ecossistema FP)

```css
--primary: #283593    /* Azul principal */
--secondary: #3949ab  /* Azul secundário */
--accent: #ffa70a     /* Laranja destaque */
--text: #1a1a1a       /* Texto */
--bg: #f5f5f5         /* Fundo */
--editor-bg: #1e1e1e  /* Fundo do editor */
--editor-text: #d4d4d4 /* Texto do editor */
```

---

## ⌨️ Atalhos de Teclado

- **Ctrl + S** - Salvar template atual

---

## 💾 Armazenamento

Todos os templates são salvos localmente no **localStorage** do navegador. Os dados persistem entre sessões, mas:

- ⚠️ Limpar dados do navegador apagará os templates
- ✅ Use **"Exportar Tudo (JSON)"** para backup periódico
- ✅ Importe o JSON em outro navegador/dispositivo

---

## 📱 Responsividade

O aplicativo é totalmente responsivo:

- **Desktop (>1024px)**: Editor e preview lado a lado
- **Tablet (768px-1024px)**: Editor acima, preview abaixo
- **Mobile (<768px)**: Tabs para alternar entre editor e preview

---

## 🧪 Testando Templates

### Teste Manual
1. Exporte o HTML
2. Envie um email de teste para você mesmo
3. Abra em diferentes clientes:
   - Gmail (Desktop e Mobile)
   - Outlook (Desktop)
   - Apple Mail (iOS)
   - Samsung Email (Android)

### Ferramentas Online
- [Litmus](https://litmus.com/) - Teste em 90+ clientes
- [Email on Acid](https://www.emailonacid.com/) - Teste e validação
- [Mail Tester](https://www.mail-tester.com/) - Spam score

---

## 🤝 Integrações

### Mailpoet (WordPress)
1. Exporte o HTML do template
2. No Mailpoet, vá em **Templates → Import**
3. Cole o código HTML
4. Substitua variáveis Mailpoet: `[subscriber:firstname]`, etc.

### GetResponse
1. Exporte o HTML
2. Em **Email Marketing → Create Newsletter**
3. Escolha **HTML editor**
4. Cole o código e substitua variáveis GetResponse

---

## 📖 Estrutura de Arquivos

```
16-fp-email-template-builder/
├── index.html      # Estrutura principal da aplicação
├── styles.css      # Estilos e layout responsivo
├── app.js          # Lógica e funcionalidades
└── README.md       # Documentação completa
```

---

## 🐛 Solução de Problemas

### Preview não atualiza
- Recarregue a página
- Verifique se há erros de HTML mal formatado

### Templates não aparecem
- Verifique o localStorage do navegador
- Importe um backup JSON se tiver

### Exportar não funciona
- Verifique se o navegador permite downloads
- Tente copiar o HTML manualmente

---

## 🚀 Melhorias Futuras

Possíveis adições:
- [ ] Mais blocos (Depoimento, FAQ, Cronômetro)
- [ ] Temas pré-definidos (Dark, Light, Colorful)
- [ ] Histórico de versões (undo/redo)
- [ ] Colaboração (compartilhar via URL)
- [ ] Integração direta com APIs de email marketing
- [ ] Gerador de QR Code
- [ ] Galeria de imagens integrada

---

## 👨‍💻 Autor

**Fernando Pimenta**
Sprint Lab #16 | Novembro 2025

---

## 📄 Licença

Este projeto faz parte do Sprint Lab e é de uso livre para fins educacionais e pessoais.

---

## 🔗 Links Úteis

- [Can I email?](https://www.caniemail.com/) - Compatibilidade de CSS em clientes de email
- [HTML Email Check](https://htmlemailcheck.com/) - Validador de HTML de email
- [Really Good Emails](https://reallygoodemails.com/) - Inspiração de templates

---

**Desenvolvido com ❤️ por Fernando Pimenta | Sprint Lab #16**
