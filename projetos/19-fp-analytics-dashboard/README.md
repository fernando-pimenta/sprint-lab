# 📊 FP Analytics Dashboard

**Dashboard offline de métricas dos 3 sites do Ecossistema FP com widgets configuráveis**

![Sprint Lab #19](https://img.shields.io/badge/Sprint%20Lab-19-283593)
![Versão](https://img.shields.io/badge/versão-1.0.0-ffa70a)
![Status](https://img.shields.io/badge/status-stable-4caf50)

## 📖 Descrição

FP Analytics Dashboard é um painel completo e offline para rastrear, analisar e visualizar métricas de performance dos 3 sites do Ecossistema FP: **Blog do FP**, **Brechó Tech** e **CetusNet**. Com entrada manual de dados mensais, gráficos interativos (Chart.js), widgets configuráveis e comparação de períodos, facilita a tomada de decisão baseada em dados.

## ✨ Funcionalidades Principais

### 🎯 Entrada Manual de Dados (CRUD)
- Criar, editar e excluir registros mensais de métricas
- Cada registro representa 1 mês de dados de 1 site
- Validação contra duplicação (mesmo mês + mesmo site)
- Confirmação antes de excluir
- Persistência com localStorage

### 📝 14 Campos por Registro Mensal

#### Métricas de Tráfego
- **Tráfego Orgânico** - Sessões/visitas do Google
- **Pageviews** - Total de visualizações de página
- **Usuários Únicos** - Total de visitantes únicos
- **Taxa de Rejeição (%)** - Bounce rate (0-100%)
- **Tempo Médio na Página (min)** - Engajamento
- **Posição Média Google** - Posicionamento keywords (1-100)

#### Métricas de Conversão
- **Cliques em Afiliados** - Total de cliques em links de afiliados
- **Conversões de Afiliados** - Total de vendas/conversões
- **Receita Estimada (R$)** - Faturamento com afiliados
- **Novos Inscritos Newsletter** - Crescimento da lista

#### Métricas de Conteúdo
- **Posts Publicados** - Quantidade de artigos/posts no mês
- **Backlinks Novos** - Links externos recebidos
- **Notas** - Observações, eventos, mudanças

### 📊 Dashboard Visual (10 Widgets Configuráveis)

#### 1. 📈 Resumo Geral (Mês Atual)
- Total de tráfego (3 sites somados)
- Total de conversões
- Receita total
- Taxa média de rejeição
- **Comparação com mês anterior** (% crescimento/queda em cada métrica)

#### 2. 📈 Gráfico de Linha: Tráfego ao Longo do Tempo
- Eixo X: Meses (período selecionado)
- Eixo Y: Sessões
- 3 linhas coloridas (uma por site)
- Legenda com cores do Ecossistema FP
- Alimentado por Chart.js

#### 3. 💰 Gráfico de Barras: Receita por Site
- Barras horizontais comparando os 3 sites
- Soma da receita no período selecionado
- Cores distintas por site
- Alimentado por Chart.js

#### 4. 📊 Gráfico Pizza: Distribuição de Tráfego
- % de tráfego de cada site no total
- Período selecionado
- Visualização doughnut (rosca)
- Alimentado por Chart.js

#### 5. 🎯 Taxa de Conversão
- Fórmula: (Conversões / Cliques em Afiliados) × 100
- % por site
- **Indicadores visuais:**
  - 🟢 Verde (≥5%) = Boa
  - 🟡 Amarelo (2-5%) = Média
  - 🔴 Vermelho (<2%) = Baixa

#### 6. 📝 ROI de Conteúdo
- Posts publicados vs Receita gerada
- **Receita por post (R$/post)**
- Identifica site mais eficiente
- Comparação entre os 3 sites

#### 7. 🎯 Metas do Mês
- Definir meta de tráfego/receita/conversões mensal
- **Barra de progresso visual (%)**
- "Faltam X visitas para a meta"
- Configurável por métrica

#### 8. 📊 Tendências e Insights
- **Melhor mês** (maior tráfego)
- **Melhor mês** (maior receita)
- **Crescimento médio mensal (%)**
- **Site com melhor desempenho**

#### 9. 📋 Tabela Comparativa Mensal
- Últimos N meses em tabela
- Colunas: Mês, Site, Tráfego, Conversões, Receita, Taxa Rejeição
- **Clique em linha para editar registro**
- Ordenável por coluna (clique no cabeçalho)

#### 10. 🔥 Heatmap de Performance
- Grade **3 sites × últimos 6 meses**
- Cores indicam performance (verde = bom, vermelho = ruim)
- **Métrica selecionável:** Receita, Tráfego ou Conversões
- 6 níveis de cores (gradiente)

### 🔍 Filtros e Período

#### Filtro por Site
- Todos os Sites (padrão)
- Blog do FP
- Brechó Tech
- CetusNet

#### Período
- Últimos 3 meses
- Últimos 6 meses (padrão)
- Últimos 12 meses
- Ano inteiro
- Customizado (a implementar)

#### Métrica Principal
Heatmap permite alternar entre:
- Receita
- Tráfego
- Conversões

### 📊 Comparação Mês a Mês
- Selecionar 2 períodos para comparar
- Mostrar estatísticas lado a lado
- **Diferenças absolutas e percentuais:**
  - Tráfego: +15%, +1.200 visitas
  - Receita: +22%, +R$ 180
  - Conversões: -5%, -3 vendas
- 🟢 Verde para crescimento, 🔴 Vermelho para queda

### ⚙️ Configuração de Widgets
- **Mostrar/Ocultar Widgets** individualmente
- Checkbox para cada widget
- Configurações salvas no localStorage
- Aplicadas automaticamente ao recarregar

### 📦 Export/Import

#### Exportar
- **JSON** - Backup completo de todos os registros
- **CSV** - Para análise externa (Excel, Google Sheets)

#### Importar
- **JSON** - Opções:
  - **Mesclar** - Adiciona novos registros sem duplicar
  - **Substituir** - Substitui todos os dados (com confirmação)

## 🎨 Design

### Paleta Ecossistema FP
- **Primary**: #283593 (Índigo)
- **Secondary**: #3949ab
- **Accent**: #ffa70a (Laranja)
- **Background**: #f5f5f5
- **Card**: #ffffff

### Cores dos Sites
- **Blog do FP**: #283593 (Índigo)
- **Brechó Tech**: #5e35b1 (Violeta)
- **CetusNet**: #055f96 (Azul Corporativo)

### Cores de Indicadores
- **Positivo/Crescimento**: #4caf50 (Verde)
- **Negativo/Queda**: #f44336 (Vermelho)
- **Neutro/Estável**: #ff9800 (Amarelo)

### Layout Responsivo
- **Desktop** (>1200px): 3 colunas
- **Tablet** (768-1200px): 2 colunas
- **Mobile** (<768px): 1 coluna (widgets empilhados)

## 📊 Gráficos (Chart.js)

### Biblioteca Utilizada
**Chart.js v4.4.0** (via CDN)

### Tipos de Gráficos
1. **Line Chart** - Tráfego ao longo do tempo (multi-linha)
2. **Bar Chart** - Receita por site (barras horizontais)
3. **Doughnut Chart** - Distribuição de tráfego (pizza/rosca)

### Características
- Responsivos (se ajustam ao container)
- Interativos (hover para detalhes)
- Legendas configuradas
- Cores customizadas do Ecossistema FP

## 🚀 Como Usar

### Instalação
1. Faça o download dos arquivos (`index.html`, `styles.css`, `app.js`)
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Pronto! Funciona 100% offline

### Adicionar Dados Mensais
1. Clique em **➕ Adicionar Dados**
2. Preencha **Mês/Ano** e **Site** (obrigatórios)
3. Preencha as métricas disponíveis (todas opcionais, exceto Mês e Site)
4. Clique em **Salvar Dados**
5. Os gráficos e widgets atualizam automaticamente

### Editar um Registro
1. Na **Tabela Comparativa**, clique em qualquer linha
2. OU navegue até o registro em outro widget que exiba dados individuais
3. Faça as alterações necessárias
4. Clique em **Salvar Dados**

### Excluir um Registro
1. Abra o registro para edição
2. Clique em **Excluir**
3. Confirme a exclusão

### Filtrar Dados
1. Use o dropdown **Período** para selecionar intervalo de tempo
2. Use o dropdown **Site** para ver dados de um site específico ou todos
3. Os gráficos e widgets atualizam automaticamente

### Comparar Meses
1. Clique em **📊 Comparar Períodos**
2. Selecione **Período 1** (ex: 2025-01)
3. Selecione **Período 2** (ex: 2025-02)
4. Clique em **Comparar**
5. Veja estatísticas lado a lado e diferenças percentuais

### Configurar Widgets
1. Clique em **⚙️ Widgets**
2. Marque/desmarque os widgets que deseja exibir
3. As alterações são salvas automaticamente
4. Os widgets ocultam/aparecem instantaneamente

### Configurar Metas
1. No widget **Metas**, clique no ícone ⚙️
2. Defina suas metas mensais:
   - Meta de Tráfego (ex: 10.000 visitas)
   - Meta de Receita (ex: R$ 1.000)
   - Meta de Conversões (ex: 50 vendas)
3. Clique em **Salvar Metas**
4. O widget mostrará progresso em barras coloridas

### Exportar Dados
1. Clique em **📥 Exportar**
2. Escolha o formato:
   - **JSON** - Backup completo para reimportar depois
   - **CSV** - Para abrir no Excel/Google Sheets
3. O arquivo será baixado automaticamente

### Importar Dados
1. Clique em **📥 Exportar** (mesmo botão contém import)
2. Clique em **Importar JSON**
3. Selecione o arquivo `.json`
4. Escolha:
   - **OK** = Mesclar com dados existentes
   - **Cancelar** = Substituir todos os dados
5. Confirme

## 📈 Métricas Rastreadas (14 Campos)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| Mês/Ano | Date (MM/YYYY) | Período do registro **(obrigatório)** |
| Site | Select | Blog do FP, Brechó Tech ou CetusNet **(obrigatório)** |
| Tráfego Orgânico | Número | Sessões/visitas do Google |
| Pageviews | Número | Total de visualizações de página |
| Usuários Únicos | Número | Total de visitantes únicos |
| Taxa de Rejeição | % (0-100) | Bounce rate |
| Tempo Médio na Página | Minutos | Tempo de engajamento |
| Posição Média Google | Número (1-100) | Posicionamento médio keywords |
| Cliques em Afiliados | Número | Total de cliques em links de afiliados |
| Conversões de Afiliados | Número | Total de vendas/conversões |
| Receita Estimada | R$ | Faturamento com afiliados |
| Novos Inscritos Newsletter | Número | Crescimento da lista |
| Posts Publicados | Número | Quantidade de artigos/posts |
| Backlinks Novos | Número | Links externos recebidos |
| Notas | Texto | Observações, eventos, mudanças |

## 🎯 Casos de Uso

- **Análise de Performance**: Compare performance dos 3 sites ao longo do tempo
- **Tomada de Decisão**: Identifique qual site precisa de mais atenção
- **Acompanhamento de Metas**: Defina e monitore metas mensais de crescimento
- **ROI de Conteúdo**: Descubra qual site gera mais receita por post publicado
- **Otimização de Conversão**: Monitore taxas de conversão e identifique melhorias
- **Planejamento Editorial**: Veja correlação entre posts publicados e receita

## 🔒 Privacidade

Todos os dados são armazenados localmente no navegador usando `localStorage`. **Nenhuma informação é enviada para servidores externos**.

## 📱 Compatibilidade

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

## 🐛 Solução de Problemas

**Os gráficos não estão renderizando:**
- Verifique se há conexão com a internet (Chart.js carrega via CDN)
- Certifique-se de que há dados suficientes para o período selecionado
- Limpe o cache do navegador e recarregue

**Os dados não estão sendo salvos:**
- Verifique se o navegador permite localStorage
- Certifique-se de que não está em modo privado/anônimo

**"Já existe um registro para este mês e site!":**
- Cada combinação de Mês + Site é única
- Se deseja atualizar, clique na linha da tabela para editar o registro existente

**Importação JSON falhou:**
- Verifique se o arquivo está no formato JSON válido
- Certifique-se de que foi exportado do mesmo sistema

## 🎓 Aprendizados do Projeto

Este projeto demonstra:
- Integração com biblioteca de gráficos (Chart.js)
- Manipulação avançada de dados com JavaScript
- Cálculos estatísticos (médias, percentuais, crescimento)
- Visualização de dados com múltiplos widgets
- Design de dashboard responsivo
- Gerenciamento de estado complexo
- Configuração persistente com localStorage
- Export/Import de dados (JSON, CSV)

## 🚀 Melhorias Futuras

- [ ] Modo escuro
- [ ] Alertas automáticos (ex: queda de receita >20%)
- [ ] Previsão simples baseada em tendências
- [ ] Exportar gráficos como PNG
- [ ] Período customizado com date range picker
- [ ] Ordenação avançada na tabela
- [ ] Modo de arrastar widgets (drag & drop)
- [ ] Integração com Google Analytics API (automação)
- [ ] PWA (Progressive Web App)
- [ ] Sincronização com Google Sheets

## 👨‍💻 Autor

**Fernando Pimenta**
Sprint Lab #19

---

## 📄 Licença

Este projeto faz parte do Sprint Lab e está disponível para uso pessoal e educacional.

---

## 🙏 Agradecimentos

Obrigado por usar o FP Analytics Dashboard! Para feedback, sugestões ou reportar bugs, abra uma issue no repositório.

**Boas análises! 📊✨**
