# 🔗 FP Affiliate Link Manager

**Gerenciador completo de links de afiliados com tracking detalhado**

Organize e monitore todos os seus links de afiliados em um único lugar! Gerencie múltiplos programas, acompanhe cliques, conversões, comissões e tenha controle total sobre suas campanhas de marketing de afiliados.

---

## 🎯 Sobre o Projeto

O **FP Affiliate Link Manager** é uma aplicação web offline desenvolvida para afiliados digitais, criadores de conteúdo e profissionais de marketing que trabalham com múltiplos programas de afiliados. Com uma interface intuitiva e recursos avançados de tracking, você pode gerenciar centenas de links de forma organizada e profissional.

---

## ✨ Funcionalidades

### 📊 Dashboard de Estatísticas
- **Total de Links:** Visualize quantos links você gerencia
- **Links Ativos:** Quantidade de links atualmente em uso
- **Total de Cliques:** Soma de todos os cliques estimados
- **Total de Conversões:** Acompanhe suas conversões
- **Receita Total:** Valor total de comissões geradas (R$)

### 🔗 Gestão Completa de Links
- **CRUD Completo:** Criar, visualizar, editar e excluir links
- **11 Campos por Link:**
  - Programa de Afiliados (Hostinger, GetResponse, Amazon Brasil, Mercado Livre, Shopee, UOL Host, Outro)
  - Nome do Produto/Campanha
  - URL Original (obrigatório)
  - URL Encurtada (opcional)
  - Usado Em (onde o link foi divulgado)
  - Data de Criação (automático)
  - Cliques Estimados
  - Conversões
  - Comissão Gerada (R$)
  - Status (Ativo, Pausado, Expirado, Teste)
  - Notas complementares

### 🎨 Status Visuais
- **Ativo** → Badge verde
- **Pausado** → Badge amarelo
- **Expirado** → Badge vermelho
- **Teste** → Badge azul

### 🔍 Filtros Avançados
- Filtrar por **Programa de Afiliados**
- Filtrar por **Status**
- **Busca textual** em produto, URLs e notas
- Botão **Limpar Filtros** para resetar

### 📈 Ordenação Inteligente
- Clique nos **cabeçalhos da tabela** para ordenar
- Alternar entre **ordem crescente** (⬆️) e **decrescente** (⬇️)
- Ordenar por: Programa, Produto, Status, Cliques, Conversões, Comissão, Data

### 📋 Copiar URL Rapidamente
- Botão **"📋 Copiar"** ao lado de cada link
- Copia **URL encurtada** (se disponível) ou **URL original**
- Feedback visual instantâneo
- Compatível com navegadores antigos (fallback)

### 💾 Export/Import JSON
- **Exportar:** Baixe todos os seus links em formato JSON
- **Importar:** Carregue links de backup (mescla com dados existentes)
- Evita duplicatas por ID
- Formato de arquivo validado

### 📱 Design Responsivo
- **Desktop:** Tabela completa com todas as colunas
- **Tablet:** Tabela adaptada
- **Mobile:** Cards empilhados (< 768px)

---

## 🚀 Como Usar

### 1️⃣ Adicionar um Novo Link

1. Clique no botão **"➕ Adicionar Link"**
2. Preencha os campos obrigatórios:
   - Programa
   - Nome do Produto/Campanha
   - URL Original
   - Status
3. (Opcional) Preencha dados adicionais: URL encurtada, usado em, cliques, conversões, comissão, notas
4. Clique em **"💾 Salvar"**

### 2️⃣ Editar um Link

1. Clique no botão **"✏️ Editar"** na linha do link
2. Modifique os campos desejados
3. Clique em **"💾 Salvar"**

### 3️⃣ Excluir um Link

1. Clique no botão **"🗑️ Excluir"**
2. Confirme a exclusão no diálogo
3. ⚠️ **Atenção:** Esta ação não pode ser desfeita!

### 4️⃣ Copiar URL

1. Clique no botão **"📋 Copiar"** ao lado do link desejado
2. A URL será copiada para o clipboard
3. Cole onde precisar (Ctrl+V ou Cmd+V)

### 5️⃣ Filtrar Links

**Filtrar por Programa:**
- Selecione um programa no dropdown "Programa"
- Apenas links daquele programa serão exibidos

**Filtrar por Status:**
- Selecione um status no dropdown "Status"
- Apenas links com aquele status serão exibidos

**Busca Textual:**
- Digite no campo "Buscar"
- Busca em: nome do produto, URLs e notas

**Combinar Filtros:**
- Todos os filtros funcionam em conjunto
- Use **"🔄 Limpar Filtros"** para resetar

### 6️⃣ Ordenar por Coluna

1. Clique no **cabeçalho da coluna** desejada
2. Primeira clique → ordem crescente (⬆️)
3. Segundo clique → ordem decrescente (⬇️)
4. Colunas ordenáveis: Programa, Produto, Status, Cliques, Conversões, Comissão, Data

### 7️⃣ Exportar Dados

1. Clique em **"📥 Exportar JSON"**
2. Arquivo `fp-affiliate-links-[timestamp].json` será baixado
3. Guarde como backup ou para migração

### 8️⃣ Importar Dados

1. Clique em **"📤 Importar JSON"**
2. Selecione um arquivo JSON válido (exportado anteriormente)
3. Confirme a importação
4. Links serão **mesclados** (duplicatas por ID são sobrescritas)

---

## 📋 Exemplos de Uso

### Exemplo 1: Afiliado de Hospedagem

**Programa:** Hostinger
**Produto:** Plano Business Pro - 24 meses
**URL Original:** `https://hostinger.com.br?ref=FPIMENTA123`
**URL Encurtada:** `https://bit.ly/host-pro24`
**Usado Em:** Blog FP (Post sobre hospedagem), YouTube (vídeo tutorial)
**Cliques:** 350
**Conversões:** 12
**Comissão:** R$ 840,00
**Status:** Ativo
**Notas:** "Taxa de conversão: 3.4% | Comissão: R$ 70/venda | Campanha de outubro/2024"

---

### Exemplo 2: Produto Amazon

**Programa:** Amazon Brasil
**Produto:** Microfone HyperX QuadCast
**URL Original:** `https://amazon.com.br/dp/B07NZZZ9GG?tag=fptech-20`
**URL Encurtada:** `https://amzn.to/3xyz123`
**Usado Em:** Instagram Bio, Stories semanais
**Cliques:** 150
**Conversões:** 8
**Comissão:** R$ 240,00
**Status:** Ativo
**Notas:** "Produto evergreen | Comissão média: R$ 30 | Link na bio permanente"

---

### Exemplo 3: E-mail Marketing

**Programa:** GetResponse
**Produto:** Plano Max - Anual
**URL Original:** `https://getresponse.com?a=fpimenta`
**URL Encurtada:** `https://bit.ly/gr-max`
**Usado Em:** Newsletter mensal (link no rodapé)
**Cliques:** 45
**Conversões:** 2
**Comissão:** R$ 180,00
**Status:** Pausado
**Notas:** "Pausado temporariamente - Testando nova estratégia de divulgação"

---

### Exemplo 4: Marketplace

**Programa:** Shopee
**Produto:** Fones Bluetooth JBL
**URL Original:** `https://shopee.com.br/produto-xyz?af_siteid=abc123`
**URL Encurtada:** —
**Cliques:** 0
**Conversões:** 0
**Comissão:** R$ 0,00
**Status:** Teste
**Notas:** "Link novo - Testar em Stories esta semana"

---

## 🛠️ Tecnologias

- **HTML5** → Estrutura semântica
- **CSS3** → Design responsivo com Grid e Flexbox
- **JavaScript (ES6+)** → Lógica e interatividade
- **localStorage** → Persistência de dados local
- **Clipboard API** → Copiar URLs com fallback

---

## 🎨 Paleta de Cores

- **Índigo Profundo** (#283593) → Cor primária
- **Índigo Médio** (#3949ab) → Cor secundária
- **Laranja** (#ffa70a) → CTAs e destaques
- **Verde** (#4caf50) → Status "Ativo"
- **Amarelo** (#ff9800) → Status "Pausado"
- **Vermelho** (#f44336) → Status "Expirado"
- **Azul** (#2196f3) → Status "Teste"

---

## 💡 Dicas de Uso

### 📌 Organize por Programa
Crie uma nomenclatura consistente para seus links. Ex:
- "Hostinger - Plano X"
- "Hostinger - Plano Y"
- "Amazon - Produto ABC"

### 📌 Use URLs Encurtadas
Sempre que possível, preencha a URL encurtada (bit.ly, cutt.ly). O botão "Copiar" priorizará a URL encurtada.

### 📌 Atualize Cliques e Conversões
Acesse regularmente os dashboards dos programas e atualize os dados de cliques e conversões para manter as estatísticas precisas.

### 📌 Campo "Usado Em"
Documente onde cada link foi divulgado:
- "Blog FP - Post sobre X"
- "YouTube - Vídeo #123"
- "Instagram Bio"
- "Newsletter de maio/2024"

### 📌 Faça Backups Regulares
Exporte seus dados mensalmente como backup de segurança.

### 📌 Use o Status "Teste"
Novos links devem começar com status "Teste" até confirmar que estão funcionando corretamente.

---

## 🔒 Privacidade

- ✅ **100% Offline:** Funciona sem internet após carregar
- ✅ **Dados Locais:** Tudo salvo no navegador (localStorage)
- ✅ **Sem Servidor:** Nenhum dado é enviado para servidores externos
- ✅ **Privado:** Apenas você tem acesso aos seus links

⚠️ **Importante:**
- Dados salvos no localStorage são específicos do navegador
- Se limpar cache/dados do navegador, os links serão perdidos
- **Faça backups regulares usando a função Exportar**

---

## 🐛 Troubleshooting

### ❓ Links não estão aparecendo
- Verifique se há filtros ativos
- Clique em "🔄 Limpar Filtros"
- Atualize a página (F5)

### ❓ Não consigo copiar URL
- Verifique se está usando HTTPS (necessário para Clipboard API)
- Em servidores locais HTTP, o fallback será usado automaticamente

### ❓ Dados sumiram
- Verifique se não limpou o cache do navegador
- Restaure de um backup JSON exportado anteriormente

### ❓ Import não está funcionando
- Certifique-se de que o arquivo é um JSON válido
- Verifique se foi exportado pelo FP Affiliate Link Manager

---

## 🚀 Roadmap Futuro

Possíveis melhorias para versões futuras:

- [ ] **Taxa de Conversão Automática** (conversões ÷ cliques × 100%)
- [ ] **Gráficos de Performance** (Chart.js)
- [ ] **Tags Personalizadas** (além de programa/status)
- [ ] **Busca Avançada** (múltiplos campos simultâneos)
- [ ] **Dark Mode** (modo escuro)
- [ ] **PWA** (instalar como app)
- [ ] **Integração com Encurtadores** (bit.ly API, cutt.ly API)
- [ ] **Relatórios Mensais** (download PDF/CSV)
- [ ] **Comparação de Performance** (este mês vs. mês anterior)
- [ ] **Alertas** (links expirados, baixa performance)
- [ ] **Exportar para CSV/Excel**
- [ ] **Multi-usuário** (com autenticação)

---

## 👨‍💻 Autor

**Fernando Pimenta**
Ecossistema FP | Sprint Lab #15

---

## 📄 Licença

Projeto pessoal do Ecossistema FP.

---

## 🤝 Contribuindo

Este é um projeto pessoal, mas sugestões são bem-vindas! Entre em contato através do Ecossistema FP.

---

**Desenvolvido com 💙 no Sprint Lab**
