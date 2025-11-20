# ✅ FP Workflow Checklist Manager

**Gerenciador de checklists para processos recorrentes com templates, progresso visual e análise de produtividade**

Sprint Lab #23 | Fernando Pimenta

---

## 📝 Descrição

O FP Workflow Checklist Manager é uma solução completa para gerenciar workflows e checklists de processos recorrentes. Ideal para freelancers, produtores de conteúdo e profissionais técnicos que precisam seguir procedimentos padronizados com eficiência.

Com templates pré-configurados, execução com timer automático, progresso visual em tempo real e histórico completo, você nunca mais vai esquecer uma etapa importante dos seus processos!

---

## ✨ Funcionalidades Principais

### 📋 Gestão de Templates
- **CRUD completo**: Criar, editar, excluir e duplicar templates
- **Confirmação de exclusão**: Previne exclusões acidentais
- **Templates ilimitados**: Crie quantos workflows precisar

### 🎯 Campos do Template
- **Nome do Workflow** (obrigatório)
- **Categoria** (Publicação, Produção, Técnico, Administrativo, Cliente, Outro)
- **Descrição** detalhada
- **Lista de Etapas** com:
  - Texto da etapa (obrigatório)
  - Nota/Dica opcional
  - Marcação de obrigatória
  - Tempo estimado em minutos
- **Cálculos automáticos**:
  - Total de etapas
  - Tempo total estimado

### 🚀 5 Templates Pré-configurados

**1. Publicar Artigo no Blog FP** (Publicação, 10 etapas, 230 min)
- Escrever rascunho (120 min)
- Revisar ortografia e gramática (20 min)
- Otimizar SEO (15 min)
- Adicionar imagens e alt text (25 min)
- Inserir links internos (10 min)
- Adicionar links de afiliados (15 min)
- Verificar responsividade mobile (5 min)
- Agendar publicação (5 min)
- Compartilhar nas redes sociais (10 min)
- Atualizar planilha editorial (5 min)

**2. Review de Produto - Brechó Tech** (Produção, 8 etapas, 380 min)
- Testar/usar produto por 2-3 dias (180 min)
- Tirar fotos/screenshots (30 min)
- Listar prós e contras (20 min)
- Pesquisar preços (15 min)
- Escrever review completo (90 min)
- Adicionar links de afiliados (10 min)
- Criar thumbnail (20 min)
- Publicar e compartilhar (15 min)

**3. Lançamento de Plugin** (Técnico, 8 etapas, 350 min)
- Testar em 3 temas diferentes (60 min)
- Corrigir bugs críticos (120 min)
- Atualizar README.md (30 min)
- Criar screenshots (20 min)
- Gerar arquivo .zip (5 min)
- Submeter ao WordPress.org (15 min)
- Publicar artigo no Blog FP (90 min)
- Divulgar nas redes (10 min)

**4. Setup de Cliente - CetusNet** (Cliente, 7 etapas, 255 min)
- Reunião de briefing (60 min)
- Análise técnica do ambiente (45 min)
- Criar proposta comercial (90 min)
- Enviar proposta e aguardar (5 min)
- Ajustar proposta se necessário (30 min)
- Fechar contrato (15 min)
- Agendar início do projeto (10 min)

**5. Backup Mensal do Ecossistema** (Administrativo, 7 etapas, 105 min)
- Backup WordPress Blog FP (20 min)
- Backup WordPress Brechó Tech (20 min)
- Backup WordPress CetusNet (20 min)
- Exportar analytics (15 min)
- Backup do OneDrive (10 min)
- Verificar integridade dos backups (15 min)
- Atualizar planilha de controle (5 min)

### ⚙️ Execução de Workflows (Instâncias)
- **Iniciar execução** a partir de qualquer template
- **Status global**: Em Andamento, Pausado, Concluído, Cancelado
- **Progresso visual**: Barra de progresso com % e X/Y etapas
- **Marcar etapas**: Checkbox para conclusão
- **Notas por etapa**: Adicionar observações durante execução
- **Timer automático**: Calcula tempo decorrido em tempo real
- **Tempo real vs estimado**: Comparação visual
- **Pausar/Retomar**: Controle total do fluxo
- **Concluir/Cancelar**: Finalizar execução

### 📊 Dashboard de Produtividade
**4 Cards de Estatísticas:**
- 🔄 Workflows Ativos no momento
- ✅ Total Concluído este mês
- ⏱️ Tempo Médio por workflow
- 📊 Taxa de Conclusão (%)

### 🔍 Filtros e Busca
- **Busca textual**: Nome, etapas, notas
- **Por Categoria**: 6 categorias disponíveis
- **Por Status**: Ativo, Pausado, Concluído, Cancelado

### 📤 Export/Import
- **Exportar JSON**: Templates + Execuções (backup completo)
- **Importar JSON**: Mesclar templates
- **Exportar CSV**: Histórico de execuções (para análise em Excel)

### 📱 3 Visualizações
**Templates** - Grid de cards com todos os templates
**Ativas** - Lista de workflows em andamento com progresso
**Histórico** - Execuções concluídas e canceladas

---

## 🚀 Como Usar

### Criando um Novo Template
1. Clique em **"+ Novo Template"**
2. Preencha o nome (obrigatório)
3. Escolha a categoria
4. Adicione uma descrição
5. Clique em **"+ Adicionar Etapa"** para cada passo
6. Para cada etapa:
   - Digite o texto da etapa
   - Adicione nota/dica (opcional)
   - Marque se é obrigatória
   - Defina tempo estimado em minutos
7. Observe o resumo: Total de Etapas e Tempo Total
8. Clique em **"Salvar Template"**

### Executando um Workflow
1. Na aba **"Templates"**, clique em **"▶️ Usar"** no template desejado
2. O painel de execução abre à direita
3. Veja o progresso em tempo real: **0% (0/X)**
4. Marque cada etapa conforme conclui (checkbox)
5. Adicione notas/observações em cada etapa se necessário
6. Acompanhe:
   - Tempo Decorrido (atualiza a cada segundo)
   - Tempo Estimado
   - Status atual
7. Use os botões:
   - **⏸️ Pausar**: Para pausar temporariamente
   - **✅ Concluir**: Marcar como concluído
   - **❌ Cancelar**: Cancelar a execução

### Pausando e Retomando
1. Clique em **"⏸️ Pausar"** durante a execução
2. O tempo pausado não é contado no tempo decorrido
3. Clique em **"▶️ Retomar"** para continuar
4. Na aba **"Ativas"**, clique em **"▶️ Continuar"** para voltar ao painel

### Editando Templates
1. Na aba **"Templates"**, clique em **"✏️ Editar"**
2. Modifique os campos desejados
3. Use **"✕ Remover"** para excluir etapas
4. Use **"+ Adicionar Etapa"** para novas etapas
5. Clique em **"Salvar Template"**

### Duplicando Templates
1. Clique em **"📋 Duplicar"** no template
2. Um novo template será criado com "(Cópia)" no nome
3. Edite conforme necessário

### Visualizando Histórico
1. Vá para a aba **"Histórico"**
2. Veja todos os workflows concluídos e cancelados
3. Informações mostradas:
   - Nome do workflow
   - Categoria
   - Data/hora de conclusão
   - Duração real
   - Etapas concluídas vs total
   - Tempo estimado
   - Status final

### Backup e Restauração
1. Clique em **"📥 Export/Import"**
2. **Para backup:**
   - Clique em **"Exportar JSON"** (templates + execuções)
   - Guarde o arquivo em local seguro
3. **Para restaurar:**
   - Clique em **"Importar JSON"**
   - Selecione o arquivo de backup
   - Templates serão mesclados com os existentes

---

## 🎨 Design

### Paleta de Cores (Ecossistema FP)
- **Primary**: `#283593` (Índigo)
- **Secondary**: `#3949ab` (Índigo Claro)
- **Accent**: `#ffa70a` (Laranja)
- **Background**: `#f5f5f5` (Cinza Claro)

### Cores de Progresso
- **Complete**: `#4caf50` (Verde)
- **Incomplete**: `#e0e0e0` (Cinza)
- **Mandatory**: `#f44336` (Vermelho)

### Cores de Status
- **Em Andamento**: `#2196f3` (Azul)
- **Pausado**: `#ff9800` (Laranja)
- **Concluído**: `#4caf50` (Verde)
- **Cancelado**: `#757575` (Cinza)

---

## 💻 Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Design moderno com Grid e Flexbox
- **JavaScript (ES6+)**: Lógica da aplicação
- **localStorage**: Persistência de dados offline

### Recursos JavaScript Utilizados
- Arrow Functions
- Template Literals
- Destructuring
- Array Methods (map, filter, reduce, sort, find)
- Spread Operator
- setInterval (timer automático)
- FileReader API (import/export)
- Date API (timestamps e cálculos)
- Local Storage API

---

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- **Desktop**: Experiência completa com painel lateral
- **Tablet**: Layout adaptado (painel lateral 600px)
- **Mobile**: Interface otimizada (painel full-width)

---

## ✅ Validações

- Nome do workflow é obrigatório
- Pelo menos 1 etapa necessária
- Texto da etapa é obrigatório
- Tempo estimado deve ser >= 0
- Confirmação antes de excluir template
- Confirmação antes de cancelar execução

---

## 📦 Estrutura de Arquivos

```
23-fp-workflow-checklist-manager/
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
- Dados não sincronizam entre dispositivos

---

## 🎯 Casos de Uso

### Criador de Conteúdo
- Template para publicação de artigos
- Checklist para reviews de produtos
- Workflow para posts em redes sociais
- Acompanhe tempo real vs estimado

### Freelancer Técnico
- Processo de lançamento de produtos
- Setup de novos clientes
- Rotinas de manutenção e backup
- Análise de produtividade

### Gestor de Projetos
- Workflows padronizados por tipo de projeto
- Onboarding de clientes
- Checklists de entrega
- Histórico de execuções para análise

---

## 🚧 Possíveis Melhorias Futuras

- [ ] Subtarefas dentro de etapas
- [ ] Anexar arquivos às etapas
- [ ] Notificações desktop quando workflow é pausado muito tempo
- [ ] Gráficos de produtividade (Chart.js)
- [ ] Templates compartilháveis (QR Code/Link)
- [ ] Modo escuro
- [ ] Integração com Google Calendar para agendamento
- [ ] Tags nos templates para melhor organização
- [ ] Histórico de versões de templates
- [ ] Export em PDF (relatório de execução)

---

## 📄 Licença

Este projeto faz parte do **Sprint Lab** e é de uso livre para fins educacionais e comerciais.

---

## 👨‍💻 Autor

**Fernando Pimenta**
Sprint Lab #23
2025

---

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas! Este é um projeto de aprendizado e demonstração de habilidades front-end.

---

**Feito com ❤️ usando apenas HTML, CSS e JavaScript puro**
