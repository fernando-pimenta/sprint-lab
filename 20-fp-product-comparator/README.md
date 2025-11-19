# ⚖️ FP Product Comparator

**Comparador lado a lado de até 4 produtos/ferramentas com análise automática**

![Sprint Lab #20](https://img.shields.io/badge/Sprint%20Lab-20-283593)
![Versão](https://img.shields.io/badge/versão-1.0.0-ffa70a)
![Status](https://img.shields.io/badge/status-stable-4caf50)

## 📖 Descrição

FP Product Comparator é uma ferramenta completa e offline para comparar até 4 produtos ou ferramentas lado a lado. Com análise automática, destaque visual de melhores opções, múltiplos formatos de export e templates de comparação salvos, facilita a tomada de decisão em compras e avaliações técnicas.

## ✨ Funcionalidades Principais

### 🎯 CRUD Completo
- Criar, editar, excluir e duplicar produtos
- 15 campos configuráveis por produto
- Confirmação antes de excluir
- Persistência com localStorage

### 📝 15 Campos por Produto

1. **Nome do Produto/Ferramenta** (obrigatório)
2. **Categoria** - Hospedagem, Email Marketing, CRM, Notebook, Mouse, Teclado, Software, SaaS, Outro
3. **Preço (R$)** - Número decimal
4. **Frequência de Pagamento** - Único, Mensal, Anual, Vitalício
5. **URL do Produto** - Link oficial
6. **Imagem/Logo** - URL da imagem
7. **Rating (Nota)** - 1-5 estrelas
8. **Prós** - Lista de pontos positivos (um por linha)
9. **Contras** - Lista de pontos negativos (um por linha)
10. **Descrição Curta** - 1-2 parágrafos
11. **Features/Características** - Lista de features (uma por linha)
12. **Público-Alvo** - Para quem é indicado
13. **Link de Afiliado** - URL opcional para afiliados
14. **Recomendação** - Altamente Recomendado, Recomendado, Condicional, Não Recomendado
15. **Notas Adicionais** - Textarea livre

### ⚖️ Modo Comparação (2-4 Produtos)

#### Seleção de Produtos
- Checkbox em cada card de produto
- Mínimo: 2 produtos
- Máximo: 4 produtos
- Contador visual de produtos selecionados
- Botão "Comparar" habilitado automaticamente

#### Tabela de Comparação Lado a Lado
- **Layout Grid Responsivo**
- 1 coluna por produto selecionado
- Todas as características em linhas organizadas
- Imagens/logos dos produtos
- Links clicáveis para sites oficiais e afiliados

#### Destaques Automáticos
- ✅ **Melhor Preço**: Fundo verde no menor valor
- ⭐ **Melhor Rating**: Fundo amarelo para maior nota
- 🚀 **Mais Features**: Badge indicando produto mais completo

### 📊 Análise Automática

Card de Resumo exibe automaticamente:

1. 💰 **Mais Barato** - Produto com menor preço mensal
2. ⭐ **Melhor Avaliado** - Maior rating (1-5 estrelas)
3. 🚀 **Mais Completo** - Maior número de features listadas
4. 🏆 **Melhor Custo-Benefício** - Fórmula: `(Rating × Features) / Preço Mensal`

### 🔍 Filtros Avançados

- **Por Categoria** - Filtra tipo de produto
- **Rating Mínimo** - 1-5 estrelas
- **Preço Máximo** - Limite de valor (convertido para mensal)
- **Por Recomendação** - Nível de recomendação
- **Busca Textual** - Nome, descrição, features
- **Botão Limpar Filtros**

### 📁 Templates de Comparação

**Salvar Comparações Favoritas:**
- Salva combinação de produtos comparados com nome
- Exemplo: "Hospedagens 2025", "Mouses Gamer", "Email Marketing Tools"
- Recarregar comparação salva com 1 clique
- Gerenciar templates (criar, carregar, excluir)

### 🚀 Modo Rápido (Quick Compare)

**Barra Lateral Flutuante:**
- Adiciona produtos rapidamente ao clicar "+"
- Visualização em tempo real dos selecionados
- Remove produtos com "×"
- Botão "Comparar" quando tiver 2+ produtos
- Fecha automaticamente ao limpar seleção

### 📥 Export em Múltiplos Formatos

#### Exportar Todos os Produtos
- **JSON** - Backup completo para reimportar
- **CSV** - Para análise no Excel/Google Sheets

#### Exportar Comparação Atual
- **HTML** - Página standalone completa e funcional
- **Markdown** - Tabela formatada para posts/documentação
- **JSON** - Apenas produtos selecionados

#### Importar
- **JSON** - Opções de mesclar ou substituir

### 🎨 Ordenação
- Por Nome (A-Z)
- Por Preço (menor primeiro)
- Por Preço (maior primeiro)
- Por Rating (maior primeiro)

### 🖨️ Modo Impressão
- Botão "Modo Impressão" formata para captura de tela
- Remove menus e botões
- Foca apenas na comparação

## 🎨 Design

### Paleta Ecossistema FP
- **Primary**: #283593 (Índigo)
- **Secondary**: #3949ab
- **Accent**: #ffa70a (Laranja)
- **Background**: #f5f5f5

### Destaques
- **Melhor Preço**: #4caf50 (Verde)
- **Melhor Rating**: #ffd700 (Dourado)
- **Highlight**: #fff3cd (Amarelo claro)

### Recomendação
- **Altamente Recomendado**: Verde
- **Recomendado**: Azul
- **Condicional**: Laranja
- **Não Recomendado**: Vermelho

### Layout Responsivo
- **Desktop**: Tabela até 4 colunas lado a lado
- **Tablet**: Tabela até 3 colunas, scroll horizontal se necessário
- **Mobile**: Cards empilhados verticalmente

## 🚀 Como Usar

### Instalação
1. Faça o download dos arquivos (`index.html`, `styles.css`, `app.js`)
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Pronto! Funciona 100% offline

### Adicionar Produtos
1. Clique em **➕ Adicionar Produto**
2. Preencha **Nome** e **Categoria** (obrigatórios)
3. Preencha os demais campos conforme necessário
4. Clique em **Salvar Produto**

### Comparar Produtos

#### Método 1: Seleção Direta
1. Na lista de produtos, marque os checkboxes dos produtos desejados (2-4)
2. Clique em **⚖️ Comparar**
3. Visualize a tabela de comparação com análise automática

#### Método 2: Quick Compare
1. Clique nos checkboxes dos produtos
2. A barra lateral abre automaticamente
3. Visualize os selecionados em tempo real
4. Clique em **Comparar** quando pronto

### Filtrar Produtos
1. Clique em **🔍 Mostrar Filtros**
2. Selecione os filtros desejados
3. Os produtos são filtrados automaticamente
4. Use **Limpar Filtros** para resetar

### Salvar Template de Comparação
1. Selecione e compare os produtos desejados
2. Na tela de comparação, clique em **💾 Salvar como Template**
3. Digite um nome (ex: "Hospedagens 2025")
4. O template é salvo no localStorage

### Carregar Template
1. Clique em **📁 Templates**
2. Selecione o template desejado
3. Clique em **Carregar**
4. A comparação é aberta automaticamente

### Exportar Comparação
1. Na tela de comparação, clique em **📥 Exportar Comparação**
2. Escolha o formato:
   - **HTML** - Página completa para compartilhar
   - **Markdown** - Tabela para posts/docs
   - **JSON** - Dados estruturados
3. O arquivo é baixado automaticamente

### Exportar Todos os Produtos
1. Clique em **📥 Exportar** (no menu principal)
2. Escolha **JSON** ou **CSV**
3. Faça download do backup

### Importar Produtos
1. Clique em **📥 Exportar** > **Importar JSON**
2. Selecione o arquivo `.json`
3. Escolha **OK** para mesclar ou **Cancelar** para substituir
4. Produtos são importados instantaneamente

## 📊 Como Funciona a Análise Automática

### Mais Barato
Converte todos os preços para **valor mensal** e identifica o menor:
- Mensal: valor direto
- Anual: valor ÷ 12
- Único: valor ÷ 12 (assume 1 ano de uso)
- Vitalício: valor ÷ 60 (assume 5 anos de uso)

### Melhor Avaliado
Compara o **rating** (1-5 estrelas) e identifica o maior valor.

### Mais Completo
Conta o número de **features** listadas (uma por linha) e identifica o produto com mais características.

### Melhor Custo-Benefício
Fórmula: `(Rating × Quantidade de Features) / Preço Mensal`

Produtos com alto rating, muitas features e preço baixo recebem maior pontuação.

## 🎯 Casos de Uso

- **Comparação de Hospedagens** - Avalie Hostinger, UOL Host, etc
- **Email Marketing Tools** - Compare GetResponse, Mailchimp, MailPoet
- **Hardware (Notebooks, Mouses, Teclados)** - Especificações técnicas lado a lado
- **Software/SaaS** - Funcionalidades, preços e planos
- **Produtos de Afiliados** - Monte comparações para blog posts
- **Decisões de Compra Pessoais** - Organize opções antes de comprar

## 🔒 Privacidade

Todos os dados são armazenados localmente no navegador usando `localStorage`. **Nenhuma informação é enviada para servidores externos**.

## 📱 Compatibilidade

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

## 🐛 Solução de Problemas

**Não consigo comparar:**
- Certifique-se de ter selecionado entre 2 e 4 produtos
- Verifique se os checkboxes estão marcados

**Produtos não salvam:**
- Verifique se o navegador permite localStorage
- Não use modo privado/anônimo

**Imagens não aparecem:**
- Verifique se as URLs das imagens estão corretas
- As imagens precisam estar hospedadas online

**Importação falhou:**
- Certifique-se de que o arquivo é um JSON válido
- Verifique se foi exportado do mesmo sistema

## 🎓 Aprendizados do Projeto

Este projeto demonstra:
- Comparação visual de dados estruturados
- Sistema de seleção múltipla (2-4 itens)
- Análise automática e cálculos comparativos
- Export em múltiplos formatos (HTML, Markdown, JSON, CSV)
- Templates persistentes
- Grid responsivo avançado
- Filtros combinados
- Interface de comparação intuitiva

## 🚀 Melhorias Futuras

- [ ] Arrastar e soltar para reordenar produtos na comparação
- [ ] Gráficos de comparação visual (barras, radar)
- [ ] Modo escuro
- [ ] Compartilhamento direto de comparações (URL curta)
- [ ] Integração com APIs de preços (atualização automática)
- [ ] Histórico de comparações
- [ ] Calculadora de custo total (1, 2, 3 anos)
- [ ] Impressão otimizada (PDF)
- [ ] PWA (Progressive Web App)

## 👨‍💻 Autor

**Fernando Pimenta**
Sprint Lab #20

---

## 📄 Licença

Este projeto faz parte do Sprint Lab e está disponível para uso pessoal e educacional.

---

## 🙏 Agradecimentos

Obrigado por usar o FP Product Comparator! Para feedback, sugestões ou reportar bugs, abra uma issue no repositório.

**Boas comparações! ⚖️✨**
