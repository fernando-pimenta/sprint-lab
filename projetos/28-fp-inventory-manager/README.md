# 📦 FP Inventory Manager

**Sistema completo de inventário** com categorias e campos personalizáveis, upload de fotos, localizações, filtros avançados e dashboard com estatísticas.

---

## 🎯 Funcionalidades Principais

### ✅ Categorias Personalizáveis

**4 Categorias Padrão Incluídas:**
1. 🔧 **Ferramentas** - Marca, Modelo, Voltagem, Data/Valor de Compra
2. ⚡ **Componentes Eletrônicos** - Part Number, Especificações, Link Datasheet
3. 💻 **Peças de Computador** - Marca, Modelo, Capacidade, Interface, Condição
4. 📟 **Equipamentos** - Marca, Modelo, Nº Série, Garantia, Link Manual

**Crie suas próprias categorias:**
- Nome personalizado
- Ícone (emoji)
- Cor de destaque
- Campos customizáveis (veja abaixo)

### ✅ Campos Customizáveis por Categoria

**6 Tipos de Campos:**
- **Texto** - Para nomes, marcas, modelos
- **Texto Longo** - Para descrições, especificações
- **Número** - Para valores, medidas
- **Data** - Para datas de compra, garantia
- **Lista Suspensa** - Para opções pré-definidas (ex: 110V, 220V, Bivolt)
- **URL** - Para links de datasheets, manuais

**Como funciona:**
1. Crie/edite uma categoria
2. Adicione quantos campos quiser
3. Configure tipo e opções
4. Ao cadastrar um item, os campos aparecem automaticamente

### ✅ CRUD Completo de Itens

**Campos do Item:**
- Nome *
- Categoria *
- Quantidade *
- Localização
- Status (5 opções)
- Foto (até 5MB)
- Campos personalizados da categoria
- Observações
- Tags (separadas por vírgula)

**Ações:**
- ✏️ Editar
- 📋 Duplicar
- 👁️ Visualizar detalhes
- 🗑️ Excluir

### ✅ Sistema de Localizações

**Organize seus itens:**
- Crie localizações (Caixa 1, Gaveta A, Prateleira Superior, etc.)
- Vincule itens às localizações
- Veja quantos itens há em cada localização
- Filtre por localização

### ✅ 5 Status Disponíveis

- ✅ **Disponível** (verde) - Item pronto para uso
- 🔵 **Em Uso** (azul) - Item sendo utilizado
- 🟠 **Em Manutenção** (laranja) - Item em reparo
- 🟣 **Reservado** (roxo) - Item reservado
- 🔴 **Quebrado** (vermelho) - Item danificado

### ✅ Upload de Fotos

- Aceita imagens (JPG, PNG, etc.)
- Limite: 5MB por foto
- Preview antes de salvar
- Conversão para Base64 (armazenado no localStorage)
- Exibição em cards e visualização completa

### ✅ Sistema de Tags

- Tags personalizadas por item
- Separadas por vírgula
- Busca por tags
- Exibição nos cards (até 3 tags visíveis)

### ✅ Filtros Avançados

**5 Filtros Combinados:**
1. 🔍 **Busca Textual** - Nome ou tags
2. 📂 **Categoria** - Todas ou específica
3. 📍 **Localização** - Todas ou específica
4. 🏷️ **Status** - Todos ou específico
5. 🔄 **Ordenação** - Nome (A-Z/Z-A), Data (recente/antigo), Quantidade (maior/menor)

### ✅ Dashboard com Estatísticas

**4 Cards Informativos:**
- 📦 **Total de Itens** - Soma de todas as quantidades
- 📂 **Categorias** - Total de categorias cadastradas
- 📍 **Localizações** - Total de localizações
- 💰 **Valor Total** - Soma dos valores de compra (se cadastrados)

**3 Gráficos:**
1. Itens por Categoria
2. Itens por Localização
3. Itens por Status

### ✅ Export/Import

**Export JSON:**
- Backup completo (categorias + localizações + itens)
- Inclui fotos em Base64
- Data do export

**Export CSV:**
- Tabela simples para Excel/Sheets
- Colunas: Nome, Categoria, Quantidade, Localização, Status, Tags

**Import JSON:**
- Restaurar backup completo
- **ATENÇÃO:** Substitui todos os dados atuais

---

## 🚀 Como Usar

### 1️⃣ Primeira Vez

1. Abra o `index.html` no navegador
2. 4 categorias padrão já estarão disponíveis
3. Crie localizações (ex: Caixa 1, Gaveta A, Oficina)
4. Comece a cadastrar itens!

### 2️⃣ Criar Categoria Personalizada

1. Vá em **"Categorias"**
2. Clique **"+ Nova Categoria"**
3. Preencha:
   - Nome (ex: Materiais de Solda)
   - Ícone (ex: 🔥)
   - Cor (escolha uma cor)
4. Adicione campos personalizados:
   - Clique **"+ Adicionar Campo"**
   - Nome do campo (ex: Temperatura Máxima)
   - Tipo (ex: Número)
   - Se for "Lista Suspensa", adicione opções separadas por vírgula
5. Salve

### 3️⃣ Cadastrar Item

1. Vá em **"Inventário"**
2. Clique **"+ Novo Item"**
3. Selecione a **categoria** (os campos personalizados aparecem automaticamente)
4. Preencha:
   - Nome do item
   - Quantidade
   - Localização (opcional)
   - Status
5. Adicione **foto** (opcional, até 5MB)
6. Preencha os **campos personalizados** da categoria
7. Adicione **observações** e **tags** (opcional)
8. Salve

### 4️⃣ Visualizar/Editar Item

1. Clique no **card do item**
2. Modal com todos os detalhes
3. Opções:
   - ✏️ Editar
   - 📋 Duplicar
   - 🗑️ Excluir

### 5️⃣ Filtrar e Buscar

1. Use a **barra de busca** para encontrar por nome ou tags
2. Filtre por:
   - Categoria
   - Localização
   - Status
3. Ordene por:
   - Nome (A-Z ou Z-A)
   - Data (mais recente ou mais antigo)
   - Quantidade (maior ou menor)

### 6️⃣ Ver Estatísticas

1. Vá em **"Dashboard"**
2. Veja:
   - Total de itens
   - Valor total do inventário
   - Distribuição por categoria
   - Distribuição por localização
   - Distribuição por status

### 7️⃣ Fazer Backup

1. Clique **"📥 Export JSON"** no footer
2. Arquivo baixado: `fp-inventory-backup-[timestamp].json`
3. Guarde em local seguro!

### 8️⃣ Restaurar Backup

1. Clique **"📤 Import JSON"** no footer
2. Selecione o arquivo `.json`
3. **ATENÇÃO:** Todos os dados atuais serão substituídos
4. Confirme

---

## 📊 Exemplos de Uso

### Oficina/Marcenaria
**Categorias:**
- 🔨 Ferramentas Manuais
- ⚡ Ferramentas Elétricas
- 🪵 Materiais (madeira, parafusos, etc.)

**Localizações:**
- Bancada Principal
- Caixa de Ferramentas
- Prateleira Superior
- Gaveta 1, 2, 3...

### Eletrônica/Hobbista
**Categorias:**
- 🔌 Resistores
- 💡 LEDs
- 🎛️ Microcontroladores
- 🔋 Fontes de Alimentação

**Campos Personalizados:**
- Valor (Ohms, V, mA)
- Tolerância
- Part Number
- Link Datasheet

### Peças de Computador
**Categorias:**
- 💾 HDs/SSDs
- 🧠 Memórias RAM
- 🖥️ Placas Mãe
- 🎮 Placas de Vídeo

**Campos:**
- Capacidade
- Interface (SATA, NVMe, DDR4, etc.)
- Frequência
- TDP
- Condição (Novo/Usado)

---

## 🛠️ Campos Personalizados - Exemplos

### Ferramentas Elétricas
- **Marca** (Texto) - DeWalt, Makita, Bosch
- **Modelo** (Texto) - DWE4120
- **Voltagem** (Lista) - 110V, 220V, Bivolt
- **Potência (W)** (Número) - 1200
- **Data de Compra** (Data) - 15/01/2024
- **Valor de Compra** (Número) - 450.00
- **Link Manual** (URL) - https://...

### Componentes Eletrônicos
- **Part Number** (Texto) - ATmega328P-PU
- **Fabricante** (Texto) - Atmel/Microchip
- **Especificações** (Texto Longo) - 8-bit, 32KB Flash...
- **Datasheet** (URL) - https://...
- **Tensão de Operação** (Texto) - 1.8V - 5.5V
- **Encapsulamento** (Lista) - DIP-28, TQFP-32, QFN-32

### Materiais de Construção
- **Tipo** (Lista) - Parafuso, Porca, Arruela, Prego
- **Tamanho** (Texto) - M6, 1/4", 10mm
- **Material** (Lista) - Aço, Inox, Latão, Plástico
- **Unidade** (Lista) - Peça, Caixa, Kg

---

## 💾 Armazenamento

**Dados salvos no localStorage:**
- `fp_inventory_categories` - Categorias
- `fp_inventory_locations` - Localizações
- `fp_inventory_items` - Itens (com fotos em Base64)

**Limite:** ~5-10MB (varia por navegador)

**Privacidade:** Todos os dados ficam no navegador, nada é enviado para servidores.

---

## ⚠️ Avisos Importantes

1. **Backup Regular:**
   - Exporte JSON regularmente
   - Guarde em nuvem ou pendrive
   - Dados ficam apenas no navegador

2. **Fotos:**
   - Limite de 5MB por foto
   - Evite muitas fotos se tiver muitos itens (pode atingir limite do localStorage)
   - Use fotos comprimidas quando possível

3. **Excluir Categoria:**
   - Se excluir categoria com itens, os itens também serão excluídos
   - Confirmação necessária

4. **Import:**
   - Importar JSON **substitui** todos os dados
   - Faça backup antes de importar

---

## 🎨 Design

**Paleta de Cores:**
- Primary: `#283593` (Azul Índigo)
- Secondary: `#3949ab` (Azul Médio)
- Accent: `#ffa70a` (Laranja)

**Status:**
- Disponível: Verde `#4caf50`
- Em Uso: Azul `#2196f3`
- Em Manutenção: Laranja `#ff9800`
- Reservado: Roxo `#9c27b0`
- Quebrado: Vermelho `#f44336`

**Layout:**
- Grid responsivo
- Cards com fotos
- Filtros em barra lateral
- Dashboard com estatísticas

---

## 🛠️ Tecnologias

- **HTML5** - Estrutura
- **CSS3** - Design responsivo
- **JavaScript (ES6+)** - Lógica
- **localStorage** - Persistência offline
- **FileReader API** - Upload de imagens

**Nenhuma dependência externa!** 100% standalone.

---

## 📱 Responsivo

- **Desktop:** Grid de cards 3-4 colunas
- **Tablet:** Grid 2 colunas
- **Mobile:** Cards empilhados

---

## 👨‍💻 Autor

**Fernando Pimenta**
Sprint Lab #28
© 2025

---

## 📜 Licença

Este projeto é open-source e está disponível para uso pessoal e comercial.

---

**Desenvolvido com 💙 como parte do Sprint Lab**

📦 **Organize tudo, encontre rápido!**
