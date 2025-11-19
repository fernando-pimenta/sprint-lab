# 💻 Catálogo Pessoal Tech

Um aplicativo web offline para gerenciar e organizar equipamentos, peças e acessórios de tecnologia. Perfeito para manter controle do seu inventário tech pessoal ou profissional.

## 📋 Descrição do Projeto

O **Catálogo Pessoal Tech** é um aplicativo web que funciona completamente offline, permitindo catalogar e organizar todos os seus equipamentos de tecnologia, peças, periféricos e acessórios. Ideal para profissionais de TI, entusiastas de tecnologia ou qualquer pessoa que precise manter controle sobre seus equipamentos.

Parte do **Ecossistema FP**, este projeto oferece uma solução simples e eficiente para gerenciar seu inventário tech sem necessidade de backend ou servidores.

## 🗂️ Estrutura de Arquivos

```
03-catalogo-pessoal-tech/
├── index.html      # Estrutura HTML do aplicativo
├── styles.css      # Estilos e layout responsivo
├── app.js          # Lógica e funcionalidades
└── README.md       # Esta documentação
```

## 📊 Formato dos Dados

Cada item do catálogo possui a seguinte estrutura:

```json
{
  "id": "unique-id-123",
  "name": "Dell XPS 15",
  "category": "Notebook",
  "status": "Em uso",
  "location": "Escritório",
  "notes": "i7-11800H, 16GB RAM, 512GB SSD, RTX 3050",
  "image": "data:image/jpeg;base64,...",
  "createdAt": "2025-01-19T10:30:00.000Z"
}
```

### Campos:
- **id** (string): Identificador único gerado automaticamente
- **name** (string): Nome do equipamento ou peça
- **category** (string): Desktop, Notebook, Periférico, Rede, Acessório, Outro
- **status** (string): Em uso, Reserva, Defeituoso, Vendido/Doado
- **location** (string, opcional): Local onde está armazenado
- **notes** (string, opcional): Observações, especificações, condições
- **image** (string, opcional): Imagem em base64
- **createdAt** (string): Data de criação do registro

## ✨ Funcionalidades

### 📝 Gerenciamento Completo (CRUD)
- **Adicionar** novos equipamentos e peças
- **Editar** itens existentes
- **Excluir** itens com confirmação
- **Visualizar** todos os itens em cards organizados

### 🔍 Filtros e Busca
- **Filtro por categoria**: Veja apenas desktops, notebooks, periféricos, etc.
- **Filtro por status**: Filtre por itens em uso, reserva, defeituosos, etc.
- **Busca por nome**: Encontre rapidamente qualquer equipamento
- **Busca em observações**: A busca também procura nas notas
- **Combinação de filtros**: Use múltiplos filtros simultaneamente

### 📊 Estatísticas em Tempo Real
- Total de itens cadastrados
- Itens em uso
- Itens em reserva
- Itens defeituosos

### 📸 Suporte a Imagens
- Upload de fotos dos equipamentos
- Conversão automática para base64
- Armazenamento local das imagens
- Placeholder visual quando não há imagem

### 💾 Persistência e Backup
- **localStorage**: Salvamento automático de todas as alterações
- **Exportar**: Baixe um backup completo em JSON
- **Importar**: Restaure ou mescle dados de um arquivo JSON
- **Privacidade**: Todos os dados ficam apenas no seu navegador

### 🎨 Interface
- Design limpo e moderno
- Tema com cores cyan/azul claro
- Cards visuais para cada item
- Badges coloridos por status
- Totalmente responsivo (desktop, tablet, mobile)
- Modal elegante para formulários

## 🚀 Como Rodar Localmente

### Opção 1: Python HTTP Server (Recomendado)

```bash
cd projetos/03-catalogo-pessoal-tech
python3 -m http.server 8000
```

Depois acesse: `http://localhost:8000`

### Opção 2: Node.js http-server

```bash
npx http-server projetos/03-catalogo-pessoal-tech -p 8000
```

Depois acesse: `http://localhost:8000`

### Opção 3: VS Code Live Server

1. Instale a extensão "Live Server" no VS Code
2. Abra o arquivo `index.html`
3. Clique com o botão direito e selecione "Open with Live Server"

## 📖 Como Usar

### 1️⃣ Adicionar um Item

1. Clique no botão "➕ Adicionar Item"
2. Preencha o formulário:
   - **Nome**: Nome do equipamento (obrigatório)
   - **Categoria**: Selecione a categoria apropriada (obrigatório)
   - **Status**: Defina o status atual (obrigatório)
   - **Local**: Onde está armazenado (opcional)
   - **Imagem**: Foto do equipamento (opcional)
   - **Observações**: Especificações, notas, condições (opcional)
3. Clique em "💾 Salvar Item"

### 2️⃣ Visualizar Catálogo

- Todos os itens aparecem em cards organizados
- Cada card mostra:
  - Imagem (ou ícone padrão 💻)
  - Nome do equipamento
  - Badges de categoria e status
  - Local (se informado)
  - Observações (se informadas)
  - Botões de editar e excluir

### 3️⃣ Filtrar Itens

Use os filtros no topo da página:
- **Categoria**: Filtre por tipo de equipamento
- **Status**: Filtre por situação atual
- **Buscar**: Digite para buscar por nome ou observações

Os filtros podem ser combinados!

### 4️⃣ Editar um Item

1. Clique no botão "✏️ Editar" no card do item
2. O modal abrirá com os dados preenchidos
3. Faça as alterações desejadas
4. Clique em "💾 Atualizar Item"

### 5️⃣ Excluir um Item

1. Clique no botão "🗑️ Excluir" no card do item
2. Confirme a exclusão
3. O item será removido permanentemente

### 6️⃣ Fazer Backup (Exportar)

1. Clique no botão "📥 Exportar"
2. Um arquivo JSON será baixado automaticamente
3. Nome do arquivo: `tech-catalog-backup-YYYYMMDD-HHMM.json`
4. **Importante**: Guarde este arquivo em local seguro!

### 7️⃣ Restaurar Backup (Importar)

1. Clique no botão "📤 Importar"
2. Selecione um arquivo JSON de backup
3. Escolha uma opção:
   - **OK**: Substitui todo o catálogo atual pelos dados importados
   - **Cancelar**: Mescla os dados importados com o catálogo atual
4. Os itens serão carregados automaticamente

## 💡 Casos de Uso

### Para Profissionais de TI
- Controle de equipamentos da empresa
- Rastreamento de peças de reposição
- Inventário de periféricos
- Gestão de equipamentos em diferentes locais

### Para Entusiastas
- Organização da coleção pessoal
- Controle de upgrades e peças
- Registro de especificações técnicas
- Planejamento de futuras aquisições

### Para Home Office
- Inventário de equipamentos de trabalho
- Controle de garantias e condições
- Organização de cabos e acessórios
- Gestão de equipamentos de backup

## ⚠️ Limitações Conhecidas

### 1. Armazenamento Local

**Limite**: O localStorage tem capacidade de ~5-10MB por domínio.

**Impacto**:
- Imagens grandes podem esgotar o espaço rapidamente
- Recomenda-se usar fotos pequenas (< 200KB cada)
- Com imagens otimizadas, é possível armazenar centenas de itens

**Recomendação**: Comprima as imagens antes de fazer upload ou use thumbnails.

### 2. Dados por Navegador

Os dados são específicos do navegador e domínio:
- Limpar o cache = perder dados
- Dados não sincronizam entre dispositivos
- Cada navegador tem seu próprio armazenamento

**Solução**: Use a função de exportar para criar backups regulares!

### 3. Sem Sincronização em Nuvem

Não há sincronização automática:
- Para usar em múltiplos dispositivos, exporte e importe manualmente
- Não há histórico de versões
- Não há compartilhamento com outros usuários

### 4. Compatibilidade

Requer navegador moderno com suporte a:
- ES6+ JavaScript
- localStorage
- FileReader API
- CSS Grid e Flexbox

## 🔒 Segurança e Privacidade

### Proteções Implementadas
- **Anti-XSS**: Todos os inputs são sanitizados antes de exibição
- **Validação**: Verificação de dados ao importar
- **Armazenamento local**: Nenhum dado é enviado para servidores externos

### Privacidade Total
- 100% offline após carregamento inicial
- Nenhuma comunicação com servidores
- Seus dados ficam apenas no seu navegador
- Você tem controle total sobre seus dados

## 💾 Backup e Recuperação

### Estratégia Recomendada de Backup

1. **Backup Regular**: Exporte seu catálogo semanalmente ou mensalmente
2. **Múltiplas Cópias**: Guarde o JSON em:
   - Computador local
   - Cloud storage (Google Drive, Dropbox, OneDrive)
   - Email (envie para você mesmo)
3. **Versionamento**: Mantenha backups de diferentes datas
4. **Teste**: Periodicamente teste a importação do backup

### Recuperação de Dados

Se perder seus dados:
1. Localize o arquivo de backup JSON mais recente
2. Abra o aplicativo
3. Clique em "📤 Importar"
4. Selecione o arquivo de backup
5. Escolha "OK" para restaurar completamente

## 🔮 Ideias para Evolução Futura

### Funcionalidades
- [ ] Código de barras/QR code para identificação
- [ ] Data de aquisição e valor
- [ ] Controle de garantias com alertas
- [ ] Histórico de manutenções
- [ ] Múltiplas imagens por item
- [ ] Exportação em CSV/Excel
- [ ] Impressão de etiquetas
- [ ] Gráficos e relatórios
- [ ] Modo dark/light

### Técnicas
- [ ] IndexedDB para maior capacidade
- [ ] Compressão de imagens automática
- [ ] PWA (instalação no dispositivo)
- [ ] Sincronização opcional via cloud
- [ ] Importação de dados de planilhas
- [ ] OCR para extrair specs de fotos

## 🧪 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Grid, Flexbox, variáveis CSS, animações
- **JavaScript (ES6+)**: Async/await, FileReader API, localStorage
- **localStorage**: Persistência de dados
- **FileReader API**: Upload e conversão de imagens

## 📱 Responsividade

O aplicativo funciona perfeitamente em:
- 💻 **Desktop**: Layout otimizado com cards em grid
- 📱 **Tablet**: Adaptação do grid para telas médias
- 📱 **Smartphone**: Layout em coluna única

## 🤝 Contribuindo

Este projeto faz parte do **Sprint Lab - Ecossistema FP**. Sugestões e melhorias são bem-vindas!

## 📄 Licença

Projeto pessoal do Ecossistema FP.

---

**Desenvolvido com 💙 para o Ecossistema FP**
