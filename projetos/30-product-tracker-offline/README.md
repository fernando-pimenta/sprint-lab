# 🛒 Product Tracker Offline

**Rastreador pessoal de produtos e preços com histórico manual**

## 📖 Descrição

Product Tracker Offline é um aplicativo 100% offline desenvolvido em HTML, CSS e JavaScript puro para monitoramento manual de produtos que você deseja acompanhar. Ideal para rastrear preços em marketplaces como Shopee, Amazon, Mercado Livre e outros, mantendo um histórico de alterações e alertas visuais quando o preço está no seu alvo.

**Importante:** Este app NÃO coleta dados automaticamente. Todas as atualizações de preço são manuais, permitindo total controle sobre as informações rastreadas.

## ✨ Funcionalidades

### 📝 Cadastro Completo de Produtos
- **Campos obrigatórios**:
  - Nome do produto
  - Categoria (Eletrônicos, Informática, Casa & Escritório, Outros)
  - Link do produto
  - Preço atual
  - Preço desejado (target)
- **Campos opcionais**:
  - Upload de imagem/capa (Base64, até 5MB)
  - Observações pessoais

### 📊 Histórico de Preços Automático
- Registro automático sempre que você edita o preço de um produto
- Cada entrada do histórico contém:
  - Preço anterior
  - Preço novo
  - Data/hora da alteração
  - Diferença (valor e percentual)
- Visualização completa em modal dedicado
- Timeline organizada do mais recente ao mais antigo

### 🎯 Status Visual Inteligente
O sistema calcula automaticamente o status de cada produto:

- **👍 Bom Preço** (verde): Preço atual ≤ preço desejado
- **🔥 Próximo** (amarelo): Preço até 10% acima do desejado
- **❌ Caro** (vermelho): Preço mais de 10% acima do desejado

### 🔍 Filtros Avançados
- **Busca por nome**: Pesquisa em tempo real
- **Filtro por categoria**: Eletrônicos, Informática, Casa & Escritório, Outros
- **Filtro por status**: Bom preço, Próximo, Caro
- Combinação de múltiplos filtros simultaneamente

### 🗂️ CRUD Completo
- ➕ **Adicionar**: Novos produtos ao rastreador
- ✏️ **Editar**: Atualizar informações (preço, observações, etc.)
- 🗑️ **Remover**: Excluir produtos
- 📋 **Listar**: Visualização em cards organizados com todas as informações

### 💾 Armazenamento Local
- Todos os dados salvos no **LocalStorage** do navegador
- 100% offline, sem necessidade de servidor
- Dados persistem entre sessões
- Histórico preservado automaticamente

### 📤 Exportar / Importar
- **Exportar**: Gera arquivo JSON completo com produtos + históricos
- **Importar**: Carrega catálogo de arquivo JSON
- **Opções de importação**:
  - Substituir: Apaga tudo e carrega o arquivo
  - Mesclar: Adiciona novos produtos sem duplicar (por ID)
- Validação automática de formato e integridade

### 📈 Dashboard de Estatísticas
Cards em tempo real mostrando:
- Total de produtos cadastrados
- Quantidade com "Bom Preço" (verde)
- Quantidade "Próximo" do alvo (amarelo)
- Quantidade "Caro" (vermelho)

### 🎨 Interface
- Design minimalista Sprint-Lab
- Tema claro com paleta suave
- Cards informativos e limpos
- Layout responsivo (desktop + mobile)
- Modais para edição e histórico
- Feedback visual claro

## 🚀 Como Usar

### 1. Adicionar Produto

1. Clique no botão **"➕ Adicionar Produto"**
2. Preencha os campos obrigatórios:
   - Nome do produto
   - Categoria
   - Link (URL completa)
   - Preço atual
   - Preço desejado
3. Opcionalmente:
   - Faça upload de uma imagem (até 5MB)
   - Adicione observações pessoais
4. Clique em **"Salvar Produto"**

### 2. Atualizar Preço

1. Localize o produto na lista
2. Clique em **"✏️ Editar"**
3. Altere o campo **"Preço Atual"**
4. Clique em **"Salvar Produto"**
5. O sistema registra automaticamente no histórico:
   - Preço anterior
   - Preço novo
   - Data/hora da mudança

### 3. Ver Histórico de Preços

1. No card do produto, clique em **"📊 Histórico"**
2. Visualize todas as alterações de preço
3. Cada entrada mostra:
   - Data/hora
   - Preço anterior → Preço novo
   - Diferença (↓ queda ou ↑ alta)
   - Percentual de variação

### 4. Filtrar Produtos

**Busca por nome:**
- Digite no campo "Buscar por nome do produto..."
- Resultados aparecem em tempo real

**Por categoria:**
- Selecione a categoria desejada no dropdown
- Eletrônicos, Informática, Casa & Escritório, Outros

**Por status:**
- Escolha: Bom Preço / Próximo / Caro
- Veja apenas produtos naquela faixa

**Combinar filtros:**
- Use busca + categoria + status simultaneamente

### 5. Exportar Coleção

1. Clique em **"📤 Exportar JSON"**
2. Um arquivo será baixado: `product-tracker-AAAA-MM-DD.json`
3. Mantenha este arquivo como backup
4. Contém todos os produtos + históricos completos

### 6. Importar Coleção

1. Clique em **"📥 Importar JSON"**
2. Selecione o arquivo `.json` exportado anteriormente
3. Escolha:
   - **OK**: Substitui toda a coleção atual
   - **Cancelar**: Mescla com a coleção existente (não duplica)
4. Dados serão carregados e validados

## 📁 Estrutura de Arquivos

```
30-product-tracker-offline/
├── index.html    # Estrutura HTML (formulário, cards, modais)
├── styles.css    # Estilos Sprint-Lab (tema claro, responsivo)
├── app.js        # Lógica completa (CRUD, histórico, filtros, storage)
└── README.md     # Documentação completa
```

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Grid, Flexbox, animações, responsividade
- **JavaScript ES6+**: Classes, arrow functions, destructuring
- **LocalStorage API**: Persistência de dados local
- **FileReader API**: Upload e leitura de imagens em Base64
- **Blob API**: Exportação de arquivos JSON

## 💡 Dicas de Uso

### Organização
- Use categorias para separar tipos de produtos
- Preencha observações com detalhes importantes (cor, tamanho, modelo)
- Adicione imagens para identificação visual rápida

### Monitoramento Eficiente
- Defina preços desejados realistas (baseados em pesquisas)
- Atualize preços semanalmente ou quando receber alertas de loja
- Use o histórico para identificar tendências de preço

### Backup Regular
- Exporte sua coleção mensalmente
- Mantenha cópias em cloud (Drive, Dropbox, etc.)
- Nunca dependa apenas do LocalStorage

### Filtros Inteligentes
- Use filtro "Bom Preço" para ver oportunidades
- Filtre por categoria quando pesquisar tipo específico
- Combine busca + status para encontrar produtos rapidamente

### Importação Segura
- Ao importar, escolha "Mesclar" para não perder dados
- Escolha "Substituir" apenas se tiver certeza
- Sempre mantenha um backup antes de importar

## 🖼️ Screenshots

*(Placeholders - adicione capturas de tela conforme necessário)*

### Dashboard e Estatísticas
![Dashboard](screenshots/dashboard.png)

### Card de Produto
![Card](screenshots/card.png)

### Formulário de Edição
![Formulário](screenshots/form.png)

### Histórico de Preços
![Histórico](screenshots/history.png)

## 📝 Formato do JSON

Exemplo de estrutura de dados exportada:

```json
[
  {
    "id": "1234567890",
    "name": "Notebook Gamer X",
    "category": "Informática",
    "link": "https://shopee.com.br/produto-exemplo",
    "currentPrice": 2999.90,
    "targetPrice": 2500.00,
    "notes": "Modelo 2024, RTX 4060",
    "image": "data:image/png;base64,...",
    "priceHistory": [
      {
        "date": "2025-11-20T10:30:00.000Z",
        "oldPrice": 3200.00,
        "newPrice": 2999.90
      }
    ],
    "createdAt": "2025-11-15T08:00:00.000Z",
    "updatedAt": "2025-11-20T10:30:00.000Z"
  }
]
```

## 🐛 Troubleshooting

### Produtos não aparecem após importar
- Verifique se o arquivo JSON está no formato correto
- Certifique-se de que escolheu a opção correta (substituir/mesclar)
- Tente limpar o cache e recarregar a página

### Imagem não carrega
- Tamanho máximo: 5MB
- Formatos suportados: JPG, PNG, GIF, WebP
- Tente redimensionar a imagem antes do upload

### Histórico vazio
- O histórico só é criado quando você EDITA o preço
- Produtos recém-adicionados não têm histórico inicial
- Faça uma alteração de preço para gerar o primeiro registro

### Dados perdidos
- Limpar cache/cookies do navegador apaga o LocalStorage
- SEMPRE mantenha backups exportados
- Não use modo anônimo/privado do navegador

### Filtros não funcionam
- Verifique se digitou corretamente no campo de busca
- Limpe os filtros clicando em "Todas" e "Todos"
- Recarregue a página se o problema persistir

## 🎯 Casos de Uso

### 1. Black Friday
- Cadastre produtos desejados semanas antes
- Monitore preços semanalmente
- No dia da Black Friday, use filtro "Bom Preço" para ver oportunidades reais

### 2. Wishlist de Aniversário
- Adicione itens que você deseja ganhar
- Envie o link do produto para amigos/família
- Acompanhe se o preço caiu antes da data

### 3. Pesquisa de Preços
- Compare preços entre lojas (cadastre o mesmo produto de várias fontes)
- Use observações para anotar detalhes de cada loja
- Histórico ajuda a ver qual loja tem melhor padrão de preço

### 4. Investimentos Futuros
- Produtos de alto valor que planeja comprar no futuro
- Monitore tendências de preço ao longo dos meses
- Compre quando atingir seu preço-alvo

## 🔒 Privacidade

- **100% offline**: Nenhum dado é enviado para servidores externos
- **Sem cookies de terceiros**: Usa apenas LocalStorage do navegador
- **Sem rastreamento**: Não há analytics ou scripts externos
- **Seus dados são seus**: Você controla exportação/importação

## 🚀 Próximas Melhorias Possíveis

- [ ] Gráfico de evolução de preços (Chart.js)
- [ ] Notificações quando produto atingir preço-alvo
- [ ] Comparação lado a lado de produtos
- [ ] Tags personalizadas por produto
- [ ] Campo de "menor preço já visto"
- [ ] Modo escuro
- [ ] PWA (Progressive Web App)
- [ ] Sincronização via arquivo na nuvem

## 📄 Licença

Projeto desenvolvido como parte do **Ecossistema FP - Sprint Lab**

---

**Sprint Lab #30 - Product Tracker Offline**
Desenvolvido com 💙 usando HTML + CSS + JavaScript puro
