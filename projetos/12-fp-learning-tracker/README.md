# 📚 FP Learning Tracker – Rastreador de Aprendizado

Ferramenta offline para acompanhar sua evolução técnica contínua. Registre habilidades, monitore seu progresso e nunca perca de vista suas metas de aprendizado.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Características](#características)
- [Como Usar](#como-usar)
- [Funcionalidades](#funcionalidades)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Campos Disponíveis](#campos-disponíveis)
- [Filtros e Busca](#filtros-e-busca)
- [Exportação e Importação](#exportação-e-importação)
- [Tecnologias](#tecnologias)
- [Roadmap Futuro](#roadmap-futuro)

---

## 🎯 Sobre o Projeto

O **FP Learning Tracker** é uma ferramenta de rastreamento de aprendizado criada para profissionais que desejam acompanhar sistematicamente sua evolução em diferentes tecnologias e habilidades.

Com ele você pode:
- Registrar todas as tecnologias e habilidades que está aprendendo
- Acompanhar seu nível de proficiência (1 a 5)
- Definir metas e objetivos claros
- Monitorar quando foi a última vez que atualizou cada habilidade
- Filtrar e buscar habilidades rapidamente
- Fazer backup completo em JSON

---

## ✨ Características

- 📝 **CRUD Completo** – Criar, visualizar, editar e excluir habilidades
- ⭐ **Níveis Visuais** – Sistema de 1 a 5 estrelas para representar proficiência
- 🎯 **Status Coloridos** – Aprendendo, Aprofundando, Dominado, Em pausa
- 🗂️ **Categorias** – Dev, Marketing, Conteúdo, IA, Infra, Geral
- 🔍 **Filtros Avançados** – Por categoria, status, nível mínimo e busca
- 🕒 **Atualização Automática** – Timestamp atualizado automaticamente
- 📤 **Backup JSON** – Exportar e importar seus dados
- 💾 **100% Offline** – Funciona sem internet, dados salvos localmente
- 📱 **Responsivo** – Funciona em desktop, tablet e mobile

---

## 🚀 Como Usar

### 1. Adicionar Nova Habilidade

1. Clique no botão **"➕ Nova Habilidade"**
2. Preencha os campos obrigatórios:
   - **Nome da habilidade** (ex: WordPress, Python, SEO)
   - **Categoria** (Dev, Marketing, Conteúdo, IA, Infra, Geral)
   - **Status** (Aprendendo, Aprofundando, Dominado, Em pausa)
   - **Nível** (1 a 5 usando o slider)
3. Opcionalmente, adicione:
   - **Objetivo/Meta** (o que você quer alcançar)
   - **Notas** (recursos, próximos passos, observações)
4. Clique em **"💾 Salvar"**
5. A data de última atualização será registrada automaticamente

### 2. Visualizar Habilidades

Todas as habilidades são exibidas em cards mostrando:
- Nome da habilidade
- Categoria
- Status (com cor diferenciada)
- Nível em estrelas (★★★☆☆)
- Objetivo/meta
- Notas
- Data e hora da última atualização

### 3. Editar Habilidade

1. Localize a habilidade na lista
2. Clique no botão **"✏️ Editar"**
3. Modifique os campos desejados
4. Clique em **"💾 Salvar"**
5. A data de última atualização será atualizada automaticamente

### 4. Excluir Habilidade

1. Localize a habilidade na lista
2. Clique no botão **"🗑️ Excluir"**
3. Confirme a exclusão

---

## 🧩 Funcionalidades

### Cadastro de Habilidades

Formulário completo com validação:
- **Nome da Habilidade** (obrigatório)
- **Categoria** (obrigatório)
- **Status** (obrigatório)
- **Nível** (1-5, obrigatório, via slider)
- **Objetivo/Meta** (opcional)
- **Notas** (opcional)

### Níveis de Proficiência

- **1 ⭐** – Iniciante
- **2 ⭐⭐** – Básico
- **3 ⭐⭐⭐** – Intermediário
- **4 ⭐⭐⭐⭐** – Avançado
- **5 ⭐⭐⭐⭐⭐** – Expert

### Status Disponíveis

1. **Aprendendo** 🔵 – Começando a aprender
2. **Aprofundando** 🟧 – Estudando e praticando ativamente
3. **Dominado** 🟢 – Alta proficiência alcançada
4. **Em pausa** ⚪ – Temporariamente pausado

### Categorias

- **Dev** – Desenvolvimento, programação, tecnologias
- **Marketing** – Marketing digital, SEO, ads
- **Conteúdo** – Criação de conteúdo, escrita, vídeo
- **IA** – Inteligência artificial, LLMs, automação
- **Infra** – Infraestrutura, redes, servidores
- **Geral** – Outros assuntos

---

## 📁 Estrutura de Arquivos

```
projetos/12-fp-learning-tracker/
├── index.html      # Estrutura HTML principal
├── styles.css      # Estilos responsivos (paleta azul escuro)
├── app.js          # Lógica JavaScript completa
└── README.md       # Documentação do projeto
```

---

## 💻 Como Rodar Localmente

### Opção 1: Abrir Diretamente no Navegador

```bash
# Navegue até a pasta do projeto
cd projetos/12-fp-learning-tracker/

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
cd projetos/12-fp-learning-tracker/
python3 -m http.server 8000
# Acesse: http://localhost:8000
```

#### Com Node.js (http-server):
```bash
cd projetos/12-fp-learning-tracker/
npx http-server -p 8000
# Acesse: http://localhost:8000
```

#### Com PHP:
```bash
cd projetos/12-fp-learning-tracker/
php -S localhost:8000
# Acesse: http://localhost:8000
```

---

## 🔍 Filtros e Busca

### Filtros Disponíveis

Todos os filtros podem ser **combinados** para busca precisa:

1. **Filtro por Categoria**
   - Dev
   - Marketing
   - Conteúdo
   - IA
   - Infra
   - Geral

2. **Filtro por Status**
   - Aprendendo
   - Aprofundando
   - Dominado
   - Em pausa

3. **Filtro por Nível Mínimo**
   - ⭐ (1) ou superior
   - ⭐⭐ (2) ou superior
   - ⭐⭐⭐ (3) ou superior
   - ⭐⭐⭐⭐ (4) ou superior
   - ⭐⭐⭐⭐⭐ (5)

4. **Busca por Nome**
   - Busca em tempo real
   - Encontra qualquer palavra no nome da habilidade

### Limpar Filtros

Clique no botão **"🔄 Limpar Filtros"** para resetar todos os filtros e visualizar todas as habilidades.

---

## 📤 Exportação e Importação

### Exportar Aprendizado

1. Clique no botão **"📤 Exportar Aprendizado"**
2. Um arquivo JSON será baixado automaticamente
3. Nome do arquivo: `fp-learning-tracker-[timestamp].json`
4. O arquivo contém **todas** as suas habilidades

**Para que serve:**
- Fazer backup dos seus dados
- Transferir para outro computador
- Compartilhar com equipe/mentor
- Manter versões anteriores

### Importar Aprendizado

1. Clique no botão **"📥 Importar Aprendizado"**
2. Selecione um arquivo JSON exportado anteriormente
3. Escolha:
   - **OK** – Substitui todos os dados atuais pelo arquivo
   - **Cancelar** – Mantém dados atuais e cancela importação

**Importante:**
- Apenas arquivos JSON exportados pelo FP Learning Tracker são aceitos
- A importação **substitui completamente** todos os dados
- Faça backup antes de importar se tiver dados importantes

---

## 🛠️ Tecnologias

- **HTML5** – Estrutura semântica
- **CSS3** – Estilos modernos (Grid, Flexbox, Variables)
- **JavaScript ES6+** – Lógica e interatividade
- **localStorage** – Persistência de dados local
- **File API** – Importação/Exportação de JSON
- **Nenhum Framework** – Vanilla JS puro

---

## 📁 Estrutura de Dados

Os dados são armazenados em **localStorage** com a chave `fp_learning_tracker`.

Estrutura de cada habilidade:

```json
{
  "id": "skill_1234567890_abc123",
  "name": "WordPress",
  "category": "Dev",
  "status": "Aprofundando",
  "level": 3,
  "goal": "Dominar desenvolvimento de temas personalizados",
  "notes": "Focando em Gutenberg e blocos customizados",
  "createdAt": "2025-11-19T10:30:00.000Z",
  "updatedAt": "2025-11-19T14:20:00.000Z"
}
```

---

## 🎨 Paleta de Cores

O FP Learning Tracker usa tons de azul escuro como cor principal:

```css
--primary-color: #2563eb;     /* Azul principal */
--primary-dark: #1e40af;
--primary-light: #3b82f6;

--success-color: #10b981;     /* Verde - Dominado */
--warning-color: #f59e0b;     /* Laranja - Aprofundando */
--info-color: #0ea5e9;        /* Azul claro - Aprendendo */
```

---

## 🔮 Roadmap Futuro

### Curto Prazo
- [ ] Gráfico de evolução ao longo do tempo
- [ ] Metas mensais e acompanhamento
- [ ] Tags personalizadas para organização
- [ ] Ordenação customizável
- [ ] Estatísticas e dashboard

### Médio Prazo
- [ ] Sistema de gamificação (pontos, conquistas)
- [ ] Histórico de alterações de nível
- [ ] Notificações de revisão (habilidades não atualizadas)
- [ ] Cronograma de estudos
- [ ] Anexar recursos de estudo

### Longo Prazo
- [ ] PWA (Progressive Web App)
- [ ] Sincronização em nuvem
- [ ] Compartilhamento de progresso
- [ ] Sugestões de aprendizado com IA
- [ ] Integração com plataformas de cursos
- [ ] Comunidade de aprendizado

---

## 📝 Casos de Uso

### Para Desenvolvedores
- Rastrear evolução em múltiplas linguagens
- Acompanhar frameworks e bibliotecas
- Definir metas de certificação

### Para Profissionais de Marketing
- Gerenciar conhecimentos em ferramentas de ads
- Acompanhar SEO e analytics
- Monitorar tendências aprendidas

### Para Criadores de Conteúdo
- Rastrear evolução em edição de vídeo
- Acompanhar ferramentas de design
- Monitorar habilidades de escrita

### Para Multiprofissionais
- Centralizar todo o aprendizado técnico
- Identificar gaps de conhecimento
- Planejar evolução de carreira

---

## 🎯 Como Rastrear Evolução

### Fluxo Recomendado

1. **Cadastro Inicial**
   - Registre todas as tecnologias que você conhece
   - Seja honesto ao avaliar seu nível atual
   - Defina metas claras para cada uma

2. **Revisão Semanal**
   - Revise habilidades que está praticando
   - Atualize níveis quando sentir evolução
   - Adicione notas sobre o que aprendeu

3. **Revisão Mensal**
   - Analise quais habilidades não foram atualizadas
   - Avalie se deve pausar algumas
   - Defina prioridades para o próximo mês

4. **Revisão Trimestral**
   - Compare evolução com metas definidas
   - Celebre conquistas (níveis dominados)
   - Redefina objetivos de longo prazo

---

## 🐛 Solução de Problemas

### Dados não estão sendo salvos
- Verifique se o navegador permite localStorage
- Teste em uma aba anônima para verificar extensões
- Verifique o espaço disponível

### Filtros não funcionam
- Clique em "Limpar Filtros" e tente novamente
- Recarregue a página
- Verifique o console do navegador (F12) para erros

### Importação falha
- Certifique-se que o arquivo é JSON válido
- Verifique se foi exportado pelo FP Learning Tracker
- Tente abrir o arquivo em um editor de texto

### Slider de nível não funciona
- Certifique-se que JavaScript está habilitado
- Recarregue a página
- Teste em outro navegador

---

## 💡 Dicas de Uso

### Definindo Metas Eficazes

✅ **Bom:**
- "Dominar WordPress avançado até dezembro"
- "Conseguir criar APIs REST em Python"
- "Implementar SEO técnico em projetos reais"

❌ **Evite:**
- "Aprender WordPress"
- "Saber Python"
- "Entender SEO"

### Atualizando Níveis

- **Nível 1**: Conhece conceitos básicos
- **Nível 2**: Consegue seguir tutoriais
- **Nível 3**: Cria projetos simples sozinho
- **Nível 4**: Resolve problemas complexos
- **Nível 5**: Ensina outros e domina profundamente

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

**FP Learning Tracker** – Rastreie sua evolução, domine novas habilidades! 🚀
