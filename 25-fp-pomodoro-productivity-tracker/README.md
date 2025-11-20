# 🍅 FP Pomodoro Productivity Tracker

**Timer Pomodoro com gestão de tarefas, estatísticas de foco e relatórios de produtividade**

Sprint Lab #25 | Fernando Pimenta

---

## 📝 Descrição

O FP Pomodoro Productivity Tracker é uma solução completa para aumentar sua produtividade usando a técnica Pomodoro. Combine timer configurável, gestão de tarefas, histórico de sessões, estatísticas detalhadas, metas diárias e visualizações com gráficos Chart.js.

A Técnica Pomodoro é um método de gerenciamento de tempo que usa intervalos de foco (geralmente 25 minutos) separados por pequenas pausas. Este projeto implementa a técnica completa com rastreamento automático e análises avançadas.

---

## ✨ Funcionalidades Principais

### ⏱️ Timer Pomodoro Configurável
- **Foco**: 25 minutos (ajustável 15-60 min)
- **Pausa Curta**: 5 minutos (ajustável 3-10 min)
- **Pausa Longa**: 15 minutos (ajustável 10-30 min)
- **Ciclos até pausa longa**: 4 pomodoros (ajustável 2-6)
- **Som de alerta**: Toggle on/off + controle de volume
- **Notificação visual**: Flash na tela quando terminar
- **Auto-start**: Opção de iniciar próxima fase automaticamente

### 📋 Gestão de Tarefas Integrada
**CRUD Completo:**
- Nome da Tarefa (obrigatório)
- Categoria (6 opções)
- Prioridade (4 níveis)
- Pomodoros Estimados
- Pomodoros Concluídos (incrementa automaticamente)
- Status (A Fazer, Em Andamento, Concluída, Pausada)
- Notas

**Durante Pomodoro:**
- Selecionar tarefa ativa antes de iniciar
- Contador automático de pomodoros por tarefa
- Histórico de todas as sessões da tarefa

### 📊 Dashboard de Produtividade
**4 Cards de Estatísticas:**
- 🍅 Pomodoros Hoje
- 📅 Pomodoros Esta Semana
- ⏱️ Horas Focadas Hoje
- 📈 Taxa de Conclusão (%)

**4 Gráficos Chart.js:**
1. **Linha**: Pomodoros por dia (últimos 7 dias)
2. **Pizza**: Distribuição por categoria de tarefa
3. **Barras**: Produtividade por hora do dia
4. **Heatmap Semanal**: 7 dias × 24 horas (intensidade de foco)

### 📜 Histórico de Sessões
Cada sessão registra:
- Data/hora início e fim
- Tarefa vinculada
- Tipo (Foco, Pausa Curta, Pausa Longa)
- Duração real vs configurada
- Interrupções (pausas manuais)
- Status: Concluída / Interrompida

**Filtros:**
- Por data (range)
- Por tarefa
- Por tipo de sessão

### 📈 Estatísticas Detalhadas
**Análise de Foco:**
- Média de pomodoros/dia
- Melhor dia da semana
- Horário mais produtivo
- Maior sequência de pomodoros
- Taxa de interrupção

**Por Tarefa:**
- Estimativa vs Real (pomodoros)
- Tempo total investido
- Eficiência (concluídas vs iniciadas)

### 🎯 Metas e Objetivos
**Definir metas:**
- Pomodoros/dia (ex: 8)
- Pomodoros/semana (ex: 40)
- Horas focadas/dia (ex: 4h)

**Indicadores:**
- Barra de progresso visual
- Notificação ao atingir meta
- Histórico de metas cumpridas

### ⚙️ Configurações Personalizáveis
- Duração de cada fase (foco, pausas)
- Ciclos até pausa longa
- Som de alerta (on/off + volume)
- Notificações visuais
- Auto-iniciar próxima fase
- Modo escuro/claro

### 📤 Export/Import
- **Exportar JSON**: Tarefas + histórico + configurações
- **Importar JSON**: Mesclar dados
- **Exportar CSV**: Histórico de sessões
- **Relatório Semanal HTML**: Resumo formatado

---

## 🍅 A Técnica Pomodoro

**Como Funciona:**
1. Escolha uma tarefa
2. Foque por 25 minutos (1 pomodoro)
3. Faça pausa de 5 minutos
4. Repita 4 vezes
5. Faça pausa longa de 15 minutos

**Benefícios:**
- Melhora foco e concentração
- Reduz procrastinação
- Gerencia distrações
- Melhora planejamento de tempo
- Aumenta motivação

---

## 🚀 Como Usar

### Primeiro Uso
1. Abra `index.html` no navegador
2. Vá em **Configurações** para personalizar durações (opcional)
3. Defina suas **Metas Diárias** (opcional)

### Criando uma Tarefa
1. Vá para aba **Tarefas**
2. Clique em **"+ Nova Tarefa"**
3. Preencha:
   - Nome (obrigatório)
   - Categoria
   - Prioridade
   - Pomodoros estimados
4. Clique em **"Salvar"**

### Iniciando um Pomodoro
1. Na aba **Timer**, selecione uma tarefa ativa
2. Clique em **"▶ Iniciar"**
3. O timer começa a contagem regressiva (padrão: 25:00)
4. Foque na tarefa até o alarme tocar
5. O contador de pomodoros da tarefa incrementa automaticamente
6. Faça a pausa (5 min)
7. Repita!

### Durante o Timer
**Controles:**
- **▶ Iniciar**: Começa a contagem
- **⏸ Pausar**: Para temporariamente
- **⏹ Parar**: Cancela a sessão
- **⏭️ Pular**: Vai para próxima fase

**Indicadores:**
- Barra de progresso circular
- Tempo restante (MM:SS)
- Fase atual (FOCO / PAUSA CURTA / PAUSA LONGA)
- Tarefa selecionada
- Pomodoro X/Y antes da pausa longa

### Visualizando Estatísticas
1. Vá para aba **Estatísticas**
2. Veja o dashboard com cards e gráficos
3. Analise:
   - Quando você é mais produtivo
   - Quais categorias consomem mais tempo
   - Tendências ao longo da semana

### Histórico
1. Aba **Histórico** mostra todas as sessões
2. Filtre por data ou tarefa
3. Veja quanto tempo investiu em cada projeto

---

## 🎨 Design

### Paleta de Cores (Ecossistema FP)
- **Primary**: `#283593` (Índigo)
- **Secondary**: `#3949ab` (Índigo Claro)
- **Accent**: `#ffa70a` (Laranja)

### Estados do Timer
- **Foco**: `#4caf50` (Verde)
- **Pausa Curta**: `#2196f3` (Azul)
- **Pausa Longa**: `#9c27b0` (Roxo)

### Prioridades
- **Baixa**: `#4caf50` (Verde)
- **Média**: `#ff9800` (Laranja)
- **Alta**: `#f44336` (Vermelho)
- **Urgente**: `#9c27b0` (Roxo)

---

## 💻 Tecnologias

- **HTML5**: Estrutura e áudio
- **CSS3**: Design moderno com animações
- **JavaScript (ES6+)**: Lógica completa
- **Chart.js 4.4.0**: Gráficos interativos (CDN)
- **localStorage**: Persistência offline

### Recursos JavaScript Utilizados
- setInterval/clearInterval (timer)
- Audio API (som de alerta)
- Date/Time manipulation
- Chart.js API (gráficos)
- LocalStorage API
- Array Methods avançados

---

## 📱 Responsividade

- **Desktop**: Timer + tarefas lado a lado
- **Tablet**: Layout adaptado
- **Mobile**: Timer fullscreen, tabs para navegação

---

## ✅ Validações

- Nome da tarefa é obrigatório
- Pomodoros estimados >= 1
- Durações de timer >= 1 minuto
- Não permite múltiplos timers ativos simultaneamente
- Tarefa deve estar selecionada para iniciar timer

---

## 📦 Estrutura de Arquivos

```
25-fp-pomodoro-productivity-tracker/
├── index.html          # Estrutura da aplicação
├── styles.css          # Estilos e responsividade
├── app.js              # Lógica completa (timer + tarefas + gráficos)
└── README.md           # Este arquivo
```

---

## 🔒 Privacidade

- **100% Offline**: Funciona sem internet (exceto Chart.js CDN)
- **Dados Locais**: localStorage do navegador
- **Sem Rastreamento**: Nenhum dado enviado para servidores
- **Backup Manual**: Export JSON para controle total

---

## 🎯 Dicas de Produtividade

1. **Evite interrupções**: Silencie notificações durante foco
2. **Estime realista**: Tarefas complexas = mais pomodoros
3. **Respeite as pausas**: Não pule, seu cérebro precisa descansar
4. **Revise diariamente**: Use estatísticas para melhorar
5. **Ajuste conforme necessário**: Personalize durações para seu ritmo

---

## 🚧 Possíveis Melhorias Futuras

- [ ] Notificações do browser (Web Notifications API)
- [ ] Modo Zen fullscreen
- [ ] Sons personalizados de alerta
- [ ] Atalhos de teclado (Espaço = play/pause, R = reset)
- [ ] Sincronização entre dispositivos
- [ ] Integração com Google Calendar
- [ ] Pomodoros em equipe (multiplayer)
- [ ] Gamificação (níveis, conquistas)

---

## 📄 Licença

Este projeto faz parte do **Sprint Lab** e é de uso livre para fins educacionais e comerciais.

---

## 👨‍💻 Autor

**Fernando Pimenta**
Sprint Lab #25
2025

---

**Feito com ❤️ e muitos 🍅 Pomodoros**
