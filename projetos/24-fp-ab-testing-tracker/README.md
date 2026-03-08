# 🧪 FP A/B Testing Tracker

**Rastreador de testes A/B com análise comparativa, cálculo automático de taxas, insights e biblioteca de variações**

Sprint Lab #24 | Fernando Pimenta

---

## 📝 Descrição

O FP A/B Testing Tracker é uma solução completa e profissional para gerenciar, analisar e otimizar testes A/B. Perfeito para profissionais de marketing, produto, UX e growth que precisam tomar decisões baseadas em dados.

Com suporte para até 3 variantes simultâneas, cálculos automáticos de taxas de conversão, análise visual com gráficos Chart.js, geração automática de insights e biblioteca de variações vencedoras, você terá tudo que precisa para otimizar suas conversões!

---

## ✨ Funcionalidades Principais

### 🎯 Gestão de Testes A/B
- **CRUD completo**: Criar, editar, excluir e duplicar testes
- **Confirmação de exclusão**: Previne exclusões acidentais
- **Até 3 variantes**: A (controle), B (teste), C (opcional)

### 📊 Campos do Teste
- **Nome do Teste** (obrigatório)
- **Item Testado** (Título, CTA, Layout, Imagem, Cor, Preço, Copy, Email Subject, Thumbnail, Outro)
- **Página/Local** (URL ou descrição)
- **Métrica Principal** (Cliques, Conversões, CTR %, Tempo na Página, Taxa de Abertura, Taxa de Rejeição, Receita)
- **Data Início e Data Fim**
- **Duração** (calculada automaticamente em dias)
- **Status** (Planejado, Em Execução, Concluído, Pausado, Cancelado)
- **Hipótese** (o que você espera que aconteça)
- **Conclusões** (resultado final)
- **Vencedor** (A, B, C, Empate, Inconclusivo)
- **Confidence Level** (90%, 95%, 99%, Baixo)

### 📈 Resultados por Variante
**Para cada variante (A, B, C):**
- Visualizações/Impressões
- Cliques/Conversões
- Taxa de Conversão % (calculada automaticamente)
- Receita (R$)
- Tempo Médio (minutos)

### 🧮 Cálculos Automáticos
- **Taxa de Conversão**: `(Conversões / Visualizações) × 100`
- **Diferença %**: `((Variante B - Variante A) / Variante A) × 100`
- **Duração**: Dias entre data início e data fim
- **Identificação de Vencedor**: Destaque visual (verde) para a variante com maior taxa

### 📊 Análise Comparativa Visual
**Tabela de Comparação Completa:**
```
┌─────────────┬──────────┬──────────┬──────────┐
│  Métrica    │Variante A│Variante B│Variante C│
├─────────────┼──────────┼──────────┼──────────┤
│ Visualiz.   │   1.000  │   1.050  │    980   │
│ Conversões  │     80   │    105✓  │     75   │
│ Taxa Conv.  │   8,0%   │  10,0%✓  │   7,7%   │
│ Receita     │ R$2.400  │ R$3.150✓ │ R$2.250  │
├─────────────┼──────────┼──────────┼──────────┤
│ Dif. vs A   │    -     │  +25%    │  -6,25%  │
└─────────────┴──────────┴──────────┴──────────┘
```

**Gráfico de Barras (Chart.js):**
- Comparação visual de taxas de conversão
- Cor verde para vencedor
- Cor azul para demais variantes
- Interativo e responsivo

### 📈 Dashboard de Produtividade
**4 Cards de Estatísticas:**
- 📊 **Total de Testes** realizados
- ▶️ **Testes em Execução** no momento
- 🎯 **Taxa de Sucesso**: % de testes com vencedor claro vs total concluídos
- 📈 **Lift Médio**: Melhoria % média dos testes bem-sucedidos

### 💡 Insights Automáticos
O sistema analisa todos os testes concluídos e gera insights como:
- *"Títulos otimizados convertem +15% em média"*
- *"CTAs em laranja superam azul em +22%"*
- *"Emails curtos têm +18% taxa de abertura"*

Insights são gerados automaticamente baseados em:
- Agrupamento por tipo de item testado
- Cálculo de melhoria média
- Mínimo de 2 testes por categoria

### 📚 Biblioteca de Variações
Salve automaticamente as variações vencedoras para reutilizar:
- **Títulos** que funcionaram
- **CTAs** efetivas
- **Layouts** testados
- **Outros** elementos

Cada item salvo mostra:
- Nome do teste original
- Descrição da variação
- % de melhoria vs controle

### 🔍 Filtros Avançados
- **Por Item Testado** (10 categorias)
- **Por Status** (5 opções)
- **Por Vencedor** (A, B, C, Empate, Inconclusivo)
- **Busca textual** (nome, hipótese, conclusões)

### 📤 Export/Import
- **Exportar JSON**: Todos os testes + biblioteca (backup completo)
- **Importar JSON**: Mesclar dados com existentes
- **Exportar CSV**: Lista de testes com resultados (para análise em Excel)

### 📱 4 Visualizações
1. **Todos** - Grid com todos os testes
2. **Em Execução** - Testes ativos no momento
3. **Concluídos** - Histórico de testes finalizados
4. **Biblioteca** - Variações vencedoras salvas

---

## 🚀 Como Usar

### Criando um Novo Teste
1. Clique em **"+ Novo Teste"**
2. Preencha as informações básicas:
   - Nome do teste (obrigatório)
   - Item testado
   - Página/Local
   - Métrica principal
   - Status
   - Datas (opcional)
   - Hipótese
3. Defina as variantes:
   - **Variante A** (controle) - obrigatória
   - **Variante B** (teste) - obrigatória
   - **Variante C** - opcional
4. Deixe os resultados zerados se o teste ainda não começou
5. Clique em **"Salvar Teste"**

### Durante a Execução do Teste
1. Edite o teste periodicamente
2. Atualize os números:
   - Visualizações
   - Conversões
   - Receita (se aplicável)
   - Tempo médio (se aplicável)
3. As **Taxas de Conversão** são calculadas automaticamente
4. Observe a **Diferença %** entre variantes
5. Mude o status para **"Em Execução"**

### Finalizando um Teste
1. Quando atingir significância estatística (mínimo 100 visualizações por variante, 7-14 dias)
2. Analise os resultados:
   - Clique em **"📊 Ver Detalhes"**
   - Veja a tabela comparativa
   - Analise o gráfico de barras
3. Defina o **Vencedor** (A, B, C, Empate ou Inconclusivo)
4. Escolha o **Confidence Level** (90%, 95%, 99%)
5. Escreva as **Conclusões** e aprendizados
6. Mude o status para **"Concluído"**
7. A variação vencedora será **automaticamente adicionada à Biblioteca**!

### Interpretando Resultados
**Taxa de Conversão:**
- 0-5%: Baixa
- 5-10%: Média
- 10-20%: Boa
- >20%: Excelente

**Diferença % (Lift):**
- <5%: Não significativo (considere empate)
- 5-10%: Pequena melhoria
- 10-20%: Boa melhoria
- >20%: Grande melhoria

**Confidence Level:**
- 90%: Baixa confiança (pode ser coincidência)
- 95%: Boa confiança (padrão da indústria)
- 99%: Alta confiança (resultado muito confiável)

### Usando a Biblioteca
1. Vá para a aba **"📚 Biblioteca"**
2. Navegue pelas categorias:
   - Títulos
   - CTAs
   - Layouts
   - Outros
3. Veja as variações que funcionaram
4. Reutilize em novos testes ou campanhas

---

## 🎨 Design

### Paleta de Cores (Ecossistema FP)
- **Primary**: `#283593` (Índigo)
- **Secondary**: `#3949ab` (Índigo Claro)
- **Accent**: `#ffa70a` (Laranja)
- **Background**: `#f5f5f5` (Cinza Claro)

### Cores de Resultados
- **Winner**: `#4caf50` (Verde)
- **Loser**: `#f44336` (Vermelho)
- **Neutral**: `#ff9800` (Laranja)

### Cores de Status
- **Planejado**: `#2196f3` (Azul)
- **Em Execução**: `#ff9800` (Laranja)
- **Concluído**: `#4caf50` (Verde)
- **Pausado**: `#757575` (Cinza)
- **Cancelado**: `#616161` (Cinza Escuro)

---

## 💻 Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Design moderno com Grid e Flexbox
- **JavaScript (ES6+)**: Lógica da aplicação
- **Chart.js 4.4.0**: Gráficos interativos (CDN)
- **localStorage**: Persistência de dados offline

### Recursos JavaScript Utilizados
- Arrow Functions
- Template Literals
- Destructuring
- Array Methods (map, filter, reduce, sort, find)
- Spread Operator
- JSON manipulation
- FileReader API (import/export)
- Chart.js API (canvas rendering)
- Local Storage API

---

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- **Desktop**: Experiência completa com grid de 3+ colunas
- **Tablet**: Layout adaptado (2 colunas)
- **Mobile**: Interface otimizada (1 coluna, cards empilhados)

---

## ✅ Validações

- Nome do teste é obrigatório
- Variantes A e B são obrigatórias
- Visualizações e conversões devem ser >= 0
- Data fim não pode ser anterior à data início
- Taxa de conversão é calculada automaticamente (readonly)
- Duração é calculada automaticamente (readonly)
- Confirmação antes de excluir teste

---

## 📦 Estrutura de Arquivos

```
24-fp-ab-testing-tracker/
├── index.html          # Estrutura da aplicação
├── styles.css          # Estilos e responsividade
├── app.js              # Lógica e funcionalidades
└── README.md           # Este arquivo
```

---

## 🔒 Privacidade e Segurança

- **100% Offline**: Funciona sem internet (exceto Chart.js CDN)
- **Dados Locais**: Armazenados apenas no seu navegador
- **Sem Servidor**: Nenhum dado é enviado para servidores externos
- **Backup Manual**: Você controla quando e onde fazer backup

### ⚠️ Avisos Importantes
- Os dados ficam salvos no localStorage do navegador
- Limpar o cache do navegador **apaga todos os dados**
- Faça backups regulares usando Export JSON
- Chart.js é carregado via CDN (requer internet na primeira carga)

---

## 🎯 Casos de Uso

### Profissional de Marketing Digital
- Testar títulos de anúncios
- Otimizar CTAs de landing pages
- Testar subject lines de email
- Comparar thumbnails de vídeos

### Product Manager
- Testar novas features
- Otimizar fluxos de onboarding
- Testar layouts de checkout
- Avaliar mudanças de preço

### Designer UX/UI
- Testar cores de botões
- Comparar layouts de página
- Avaliar hierarquia visual
- Otimizar formulários

### Growth Hacker
- Maximizar conversões
- Reduzir taxa de rejeição
- Aumentar tempo na página
- Otimizar funil de vendas

---

## 📊 Exemplo de Uso Completo

**Teste:** *Título com Número vs Sem Número*

**Configuração:**
- Item: Título
- Página: Blog FP - Artigo WordPress
- Métrica: Cliques
- Variante A: "Melhores Práticas de SEO"
- Variante B: "7 Melhores Práticas de SEO"

**Resultados (após 14 dias):**
- Variante A: 1.000 visualizações, 80 cliques (8% CTR)
- Variante B: 1.050 visualizações, 105 cliques (10% CTR)

**Análise:**
- Diferença: +25% de melhoria
- Vencedor: Variante B
- Insight: "Títulos com números convertem +25%"

**Ação:**
- Variante B salva na Biblioteca de Títulos
- Aplicar números em futuros títulos de blog

---

## 🚧 Possíveis Melhorias Futuras

- [ ] Calculadora de significância estatística avançada (teste qui-quadrado)
- [ ] Calculadora de tamanho de amostra necessário
- [ ] Timeline visual de testes ao longo do tempo
- [ ] Detecção automática de sobreposição de testes
- [ ] Tags customizáveis para testes
- [ ] Múltiplas métricas por teste
- [ ] Segmentação de resultados (por dispositivo, localização, etc.)
- [ ] Integração com Google Analytics
- [ ] Notificações quando teste atinge significância
- [ ] Export de relatório em PDF

---

## 📄 Licença

Este projeto faz parte do **Sprint Lab** e é de uso livre para fins educacionais e comerciais.

---

## 👨‍💻 Autor

**Fernando Pimenta**
Sprint Lab #24
2025

---

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas! Este é um projeto de aprendizado e demonstração de habilidades front-end avançadas.

---

**Feito com ❤️ usando HTML, CSS, JavaScript e Chart.js**
