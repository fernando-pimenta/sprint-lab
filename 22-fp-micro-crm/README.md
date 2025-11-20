# 👥 FP Micro CRM

**CRM simplificado para freelancers com pipeline Kanban, projetos vinculados e histórico de interações**

Sprint Lab #22 | Fernando Pimenta

---

## 📝 Descrição

O FP Micro CRM é uma solução offline completa para freelancers e pequenas empresas gerenciarem seus clientes de forma eficiente. Com interface intuitiva estilo Kanban, permite acompanhar o pipeline de vendas, gerenciar projetos vinculados, registrar interações e receber alertas sobre próximas ações.

Todos os dados são armazenados localmente no navegador (localStorage), garantindo privacidade total e funcionamento offline.

---

## ✨ Funcionalidades Principais

### 🎯 Gestão de Clientes
- **CRUD completo**: Criar, listar, editar e excluir clientes
- **Confirmação de exclusão**: Previne exclusões acidentais
- **Arquivamento**: Arquivar clientes inativos sem perder histórico

### 📊 Dashboard de Pipeline
- **Cards de estatísticas**:
  - Total de Leads
  - Clientes Ativos
  - Valor Total em Negociação
  - Taxa de Conversão (%)

- **Kanban Visual**: Arraste e solte clientes entre as colunas para mudar o status
  - Lead
  - Negociação
  - Cliente Ativo
  - Concluído
  - Perdido

### 📁 Projetos Vinculados
Cada cliente pode ter múltiplos projetos associados:
- Nome do Projeto
- Tipo (Site, Rede, Consultoria, Manutenção, Outro)
- Valor (R$)
- Status (Orçamento, Em Andamento, Concluído, Cancelado)
- Datas de Início e Conclusão
- Descrição detalhada

### 📝 Histórico de Interações
Registre cada contato com o cliente:
- Data/Hora automática
- Tipo (Email, Ligação, Reunião, WhatsApp, Proposta Enviada)
- Resumo da interação
- Próximos passos
- Linha do tempo em ordem cronológica reversa

### 🔔 Alertas e Lembretes
- ⚠️ Ações vencidas (data passou)
- 🔔 Ações para hoje
- 📅 Ações para esta semana
- Badge visual no header com contador

### 🔍 Filtros e Busca
- Busca textual (nome, empresa, email, notas)
- Filtro por Status
- Filtro por Fonte (Indicação, LinkedIn, Google, etc.)
- Filtro por Próxima Ação (hoje, esta semana, este mês, sem data)

### 📤 Export/Import
- **Exportar JSON**: Backup completo (clientes + projetos + histórico)
- **Importar JSON**: Mesclar com dados existentes
- **Exportar CSV**: Lista de clientes com campos principais

---

## 🎨 Campos Disponíveis

### Cliente
- **Nome** * (obrigatório)
- **Empresa**
- **Email** * (obrigatório, validado)
- **Telefone**
- **Site** (URL)
- **Fonte/Origem** (Indicação, LinkedIn, Google, Instagram, Contato Direto, Outro)
- **Status** (Lead, Negociação, Cliente Ativo, Concluído, Perdido, Arquivado)
- **Valor Potencial** (R$, não pode ser negativo)
- **Próxima Ação** (ex: "Enviar proposta", "Ligar dia 25")
- **Data Próxima Ação** (não pode ser anterior a hoje)
- **Tags** (múltiplas, separadas por vírgula)
- **Notas** (textarea livre)

### Projeto
- **Nome do Projeto** *
- **Tipo** (Site, Rede, Consultoria, Manutenção, Outro)
- **Valor** (R$)
- **Status** (Orçamento, Em Andamento, Concluído, Cancelado)
- **Data Início**
- **Data Conclusão**
- **Descrição**

### Interação
- **Data/Hora** (automático)
- **Tipo** (Email, Ligação, Reunião, WhatsApp, Proposta Enviada)
- **Resumo** *
- **Próximos Passos**

---

## 🚀 Como Usar

### Iniciando
1. Abra o arquivo `index.html` no navegador
2. Clique em **"+ Novo Cliente"** para adicionar seu primeiro cliente
3. Preencha os campos obrigatórios (nome e email)
4. Clique em **"Salvar Cliente"**

### Gerenciando o Pipeline
1. Use a visualização **Kanban** para ver o pipeline completo
2. **Arraste e solte** cards entre as colunas para mudar o status
3. Clique em um card para ver detalhes completos

### Adicionando Projetos
1. Abra os detalhes de um cliente
2. Vá na aba **"Projetos"**
3. Clique em **"+ Novo Projeto"**
4. Preencha os dados e salve

### Registrando Interações
1. Abra os detalhes de um cliente
2. Vá na aba **"Histórico"**
3. Clique em **"+ Nova Interação"**
4. Registre o resumo do contato e próximos passos

### Filtrando e Buscando
1. Use a barra de busca para encontrar clientes rapidamente
2. Combine filtros de status, fonte e próximas ações
3. Troque entre as visualizações: **Kanban**, **Lista** ou **Calendário**

### Backup dos Dados
1. Clique em **"📥 Export/Import"**
2. Escolha **"Exportar JSON"** para fazer backup completo
3. Guarde o arquivo em local seguro
4. Para restaurar, use **"Importar JSON"**

---

## 🎨 Design

### Paleta de Cores (Ecossistema FP)
- **Primary**: `#283593` (Índigo)
- **Secondary**: `#3949ab` (Índigo Claro)
- **Accent**: `#ffa70a` (Laranja)
- **Background**: `#f5f5f5` (Cinza Claro)

### Status do Pipeline
- **Lead**: `#2196f3` (Azul)
- **Negociação**: `#ff9800` (Laranja)
- **Ativo**: `#4caf50` (Verde)
- **Concluído**: `#9e9e9e` (Cinza)
- **Perdido**: `#f44336` (Vermelho)

---

## 💻 Tecnologias

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design moderno com Flexbox e Grid
- **JavaScript (ES6+)**: Lógica da aplicação
- **localStorage**: Persistência de dados offline

### Recursos JavaScript Utilizados
- Arrow Functions
- Template Literals
- Destructuring
- Array Methods (map, filter, reduce, sort)
- Drag and Drop API
- FileReader API (import/export)
- Date API
- Local Storage API

---

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- **Desktop**: Experiência completa com drag & drop
- **Tablet**: Layout adaptado com menu colapsável
- **Mobile**: Interface otimizada para toque

---

## ✅ Validações

- Nome e email são obrigatórios
- Email deve ser válido (regex)
- Valor potencial deve ser >= 0
- Data da próxima ação não pode ser anterior a hoje
- Confirmação antes de excluir cliente

---

## 📦 Estrutura de Arquivos

```
22-fp-micro-crm/
├── index.html          # Estrutura da aplicação
├── styles.css          # Estilos e responsividade
├── app.js              # Lógica e funcionalidades
└── README.md           # Este arquivo
```

---

## 🔒 Privacidade e Segurança

- **100% Offline**: Funciona sem internet
- **Dados Locais**: Armazenados apenas no seu navegador
- **Sem Servidor**: Nenhum dado é enviado para servidores externos
- **Backup Manual**: Você controla quando e onde fazer backup

### ⚠️ Avisos Importantes
- Os dados ficam salvos no localStorage do navegador
- Limpar o cache do navegador **apaga todos os dados**
- Faça backups regulares usando Export JSON
- Não compartilhe arquivos de backup sem criptografá-los

---

## 🎯 Casos de Uso

### Freelancer Individual
- Acompanhe leads de redes sociais
- Gerencie propostas em negociação
- Registre reuniões e ligações
- Não perca prazos com alertas automáticos

### CetusNet (Consultoria TI)
- Organize clientes por status
- Vincule múltiplos projetos por cliente
- Mantenha histórico de suporte
- Visualize valor total do pipeline

### Agência Digital
- Pipeline de vendas visual
- Gestão de projetos por cliente
- Acompanhamento de interações
- Relatórios via export CSV

---

## 🚧 Possíveis Melhorias Futuras

- [ ] Gráficos de conversão por período
- [ ] Notificações desktop (Web Notifications API)
- [ ] Sincronização com Google Calendar
- [ ] Modo escuro
- [ ] Categorização avançada com cores customizáveis
- [ ] Relatórios mensais automatizados
- [ ] Integração com email (enviar propostas)
- [ ] Multi-usuário com sincronização em nuvem

---

## 📄 Licença

Este projeto faz parte do **Sprint Lab** e é de uso livre para fins educacionais e comerciais.

---

## 👨‍💻 Autor

**Fernando Pimenta**
Sprint Lab #22
2025

---

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas! Este é um projeto de aprendizado e demonstração de habilidades front-end.

---

**Feito com ❤️ usando apenas HTML, CSS e JavaScript puro**
