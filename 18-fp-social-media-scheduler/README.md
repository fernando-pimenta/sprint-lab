# 📅 FP Social Media Scheduler

**Calendário visual para planejamento de posts em múltiplas plataformas sociais**

![Sprint Lab #18](https://img.shields.io/badge/Sprint%20Lab-18-283593)
![Versão](https://img.shields.io/badge/versão-1.0.0-ffa70a)
![Status](https://img.shields.io/badge/status-stable-4caf50)

## 📖 Descrição

FP Social Media Scheduler é uma ferramenta completa e offline para planejar, organizar e gerenciar posts em múltiplas plataformas de redes sociais. Com visualização em calendário, estatísticas detalhadas, templates personalizáveis e recursos de produtividade, facilita o trabalho de criadores de conteúdo, social media managers e equipes de marketing.

## ✨ Funcionalidades Principais

### 🎯 CRUD Completo
- Criar, listar, editar e excluir posts
- Confirmação antes de excluir
- Duplicar posts para outras plataformas/datas
- Persistência de dados com localStorage

### 📝 Campos do Post
- **Título/Descrição** (obrigatório)
- **Plataformas** - Multi-select: Instagram, LinkedIn, Twitter/X, TikTok, YouTube, Facebook, Threads
- **Data de Publicação** (obrigatório)
- **Horário** (obrigatório)
- **Tipo de Conteúdo** - Imagem, Vídeo, Carrossel, Reels/Stories, Thread, Artigo, Link
- **Texto do Post** - Com contador de caracteres por plataforma
- **Hashtags** - Separadas por espaço ou vírgula
- **Mídia** - URL da imagem/vídeo
- **Link Externo** - Para bio, swipe up, etc
- **Status** - Planejado, Agendado, Publicado, Cancelado
- **Prioridade** - Baixa, Média, Alta, Urgente
- **Categoria/Tema** - Educacional, Promocional, Storytelling, Engajamento, Institucional, Outro
- **Notas Internas** - Observações e aprovações

### 📊 Visualizações

#### 1. Calendário Mensal (Padrão)
- Grade de calendário com 7 colunas × 5-6 linhas
- Posts aparecem como cards mini no dia correspondente
- Badge colorido por plataforma
- Navegação: ◀ Mês Anterior | Hoje | Próximo Mês ▶
- Clicar no card abre edição
- Clicar em dia vazio cria post para aquele dia

#### 2. Lista Semanal
- Visualização vertical por semana
- Posts agrupados por dia
- Mais detalhes visíveis que no calendário
- Ordenados por horário

#### 3. Timeline
- Lista cronológica de todos os posts
- Filtros ativos aplicados
- Ordenação por data/hora
- Detalhes completos visíveis

#### 4. Por Plataforma
- Tabs separadas por plataforma
- Ver apenas posts de Instagram, LinkedIn, etc.
- Útil para revisar consistência de uma plataforma

### 📈 Dashboard de Estatísticas
- Total de Posts Planejados
- Posts por Plataforma (com contadores)
- Posts por Status (Planejado, Agendado, Publicado)
- Posts de Alta Prioridade
- Atualização automática ao navegar entre meses

### 🔍 Filtros Avançados
- Por Plataforma (multi-select)
- Por Status
- Por Prioridade
- Por Categoria
- Busca textual (título, texto, hashtags)
- Botão Limpar Filtros

### 🚀 Recursos de Produtividade

#### Templates de Post
- Salvar posts frequentes como templates
- 5 templates pré-configurados:
  - Post de Segunda Motivacional
  - Dica Rápida
  - Promoção Padrão
  - Bastidores
  - Artigo LinkedIn
- Criar novos templates personalizados
- Usar template preenche campos automaticamente

#### Sugestão de Horários
Horários recomendados por plataforma:
- **Instagram**: 10h, 14h, 19h
- **LinkedIn**: 8h, 12h, 17h
- **Twitter**: 9h, 12h, 18h
- **TikTok**: 11h, 15h, 20h
- **YouTube**: 14h, 18h, 20h
- **Facebook**: 13h, 15h, 19h
- **Threads**: 10h, 14h, 19h

#### Contador de Caracteres
Limites por plataforma:
- **Twitter**: 280 caracteres
- **Instagram**: 2.200 caracteres
- **LinkedIn**: 3.000 caracteres
- **Threads**: 500 caracteres
- **TikTok**: 2.200 caracteres
- **YouTube**: 5.000 caracteres
- **Facebook**: 63.206 caracteres

Indicador visual:
- 🟢 Verde: OK
- 🟡 Amarelo: Perto do limite (90%)
- 🔴 Vermelho: Excedeu o limite

#### Gerador de Hashtags
- Input de tema/keyword
- Sugestão de hashtags populares (lista pré-definida)
- Categorias: marketing, educacional, motivacional, tecnologia, empreendedorismo, design, fotografia
- Copiar hashtags para o campo com um clique

### 📦 Export/Import

#### Exportar
- **JSON**: Backup completo de todos os posts
- **CSV**: Para análise externa (Excel, Google Sheets)
- **ICS**: Arquivo de calendário para importar no Google Calendar/Outlook

#### Importar
- **Mesclar**: Adiciona posts importados aos existentes
- **Substituir**: Substitui todos os posts (com confirmação)

## 🎨 Design

### Paleta de Cores (Ecossistema FP)
- **Primary**: #283593
- **Secondary**: #3949ab
- **Accent**: #ffa70a
- **Text**: #1a1a1a
- **Background**: #ffffff
- **Light Gray**: #f5f5f5

### Cores por Plataforma
- **Instagram**: Gradiente (rosa/laranja/roxo)
- **LinkedIn**: #0077b5
- **Twitter**: #1da1f2
- **TikTok**: #000000
- **YouTube**: #ff0000
- **Facebook**: #1877f2
- **Threads**: #000000

### Cores por Status
- **Planejado**: #2196f3 (azul)
- **Agendado**: #ff9800 (laranja)
- **Publicado**: #4caf50 (verde)
- **Cancelado**: #757575 (cinza)

### Cores por Prioridade
- **Baixa**: #4caf50 (verde)
- **Média**: #ff9800 (laranja)
- **Alta**: #f44336 (vermelho)
- **Urgente**: #9c27b0 (roxo)

## 🖥️ Responsividade

- **Desktop** (>1024px): Calendário completo 7 colunas
- **Tablet** (768-1024px): Calendário 7 colunas menor
- **Mobile** (<768px): Preferência por listas/timeline

## 🚀 Como Usar

### Instalação
1. Faça o download dos arquivos (`index.html`, `styles.css`, `app.js`)
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Pronto! Funciona 100% offline

### Criar um Novo Post
1. Clique em **➕ Novo Post**
2. Preencha os campos obrigatórios (Título, Plataformas, Data, Horário)
3. Preencha os campos opcionais conforme necessário
4. Use **Horário Recomendado** para sugestões
5. Use **Gerar Hashtags** para ideias de tags
6. Clique em **Salvar Post**

### Editar um Post
1. Clique no card do post no calendário ou em qualquer visualização
2. Faça as alterações necessárias
3. Clique em **Salvar Post**

### Duplicar um Post
1. Abra o post que deseja duplicar
2. Clique em **Duplicar**
3. Uma cópia será criada automaticamente

### Excluir um Post
1. Abra o post que deseja excluir
2. Clique em **Excluir**
3. Confirme a exclusão

### Usar Templates
1. Clique em **📋 Templates**
2. Escolha um template existente
3. O formulário será preenchido automaticamente
4. Ajuste conforme necessário e salve

### Criar um Template
1. Preencha o formulário com os dados do template
2. Clique em **Salvar como Template**
3. Digite um nome para o template
4. Confirme

### Aplicar Filtros
1. Clique em **🔍 Filtros**
2. Selecione as opções desejadas
3. Os posts serão filtrados automaticamente
4. Use **Limpar Filtros** para resetar

### Exportar Posts
1. Clique em **📥 Exportar**
2. Escolha o formato (JSON, CSV ou ICS)
3. O arquivo será baixado automaticamente

### Importar Posts
1. Clique em **📤 Importar**
2. Clique em **Selecionar Arquivo JSON**
3. Escolha se deseja **Mesclar** ou **Substituir Tudo**
4. Confirme

## 🌐 Plataformas Suportadas

| Plataforma | Ícone | Limite de Caracteres | Horários Recomendados |
|-----------|-------|---------------------|----------------------|
| Instagram | 📷 | 2.200 | 10h, 14h, 19h |
| LinkedIn | 💼 | 3.000 | 8h, 12h, 17h |
| Twitter/X | 🐦 | 280 | 9h, 12h, 18h |
| TikTok | 🎵 | 2.200 | 11h, 15h, 20h |
| YouTube | 📺 | 5.000 | 14h, 18h, 20h |
| Facebook | 👍 | 63.206 | 13h, 15h, 19h |
| Threads | 🧵 | 500 | 10h, 14h, 19h |

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design moderno e responsivo
- **JavaScript (ES6+)**: Lógica de aplicação
- **localStorage**: Persistência de dados offline
- **Nenhuma dependência externa**: 100% vanilla JS

## 🎯 Casos de Uso

- **Criadores de Conteúdo**: Organize posts pessoais em múltiplas plataformas
- **Social Media Managers**: Planeje campanhas e calendários editoriais
- **Equipes de Marketing**: Colabore no planejamento de conteúdo
- **Freelancers**: Gerencie posts de múltiplos clientes
- **Pequenas Empresas**: Mantenha presença consistente nas redes sociais

## 📋 Validações

- Título é obrigatório
- Pelo menos uma plataforma deve ser selecionada
- Data e horário são obrigatórios
- Aviso visual quando exceder limite de caracteres da plataforma

## 🔒 Privacidade

Todos os dados são armazenados localmente no navegador usando `localStorage`. Nenhuma informação é enviada para servidores externos.

## 📱 Compatibilidade

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

## 🐛 Solução de Problemas

**Os posts não estão sendo salvos:**
- Verifique se o navegador permite localStorage
- Certifique-se de que não está navegando em modo privado

**O calendário não está renderizando:**
- Atualize a página (F5)
- Limpe o cache do navegador

**Erro ao importar JSON:**
- Verifique se o arquivo está no formato JSON válido
- Certifique-se de que o arquivo foi exportado do mesmo sistema

## 🎓 Aprendizados do Projeto

Este projeto demonstra:
- Manipulação avançada do DOM
- Gerenciamento de estado com JavaScript puro
- Persistência de dados com localStorage
- Design responsivo com CSS Grid e Flexbox
- Exportação/importação de dados em múltiplos formatos
- Validação de formulários
- Interface de usuário intuitiva e produtiva

## 🚀 Melhorias Futuras

- [ ] Arrastar e soltar posts entre dias (drag & drop)
- [ ] Modo escuro
- [ ] Copiar semana completa para outra data
- [ ] Notificações de posts próximos
- [ ] Integração com APIs das plataformas
- [ ] Análise de desempenho de posts
- [ ] Sugestões de conteúdo por IA

## 👨‍💻 Autor

**Fernando Pimenta**
Sprint Lab #18

---

## 📄 Licença

Este projeto faz parte do Sprint Lab e está disponível para uso pessoal e educacional.

---

## 🙏 Agradecimentos

Obrigado por usar o FP Social Media Scheduler! Para feedback, sugestões ou reportar bugs, abra uma issue no repositório.

**Bons planejamentos! 📅✨**
