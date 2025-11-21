# 📀 CD Catalog Offline

**Catalogador de CDs com busca automática via MusicBrainz + Cover Art Archive**

## 📖 Descrição

CD Catalog Offline é um mini-aplicativo 100% offline (após carregamento inicial) desenvolvido em HTML, CSS e JavaScript puro. Permite catalogar sua coleção de CDs físicos ou digitais com busca automática de metadados, capas, tracklists e informações completas dos álbuns.

## ✨ Funcionalidades

### 🔍 Busca Automática
- **Busca por Artista**: Retorna lista de álbuns do artista
- **Busca por Álbum**: Busca direta pelo nome do álbum
- **Integração com MusicBrainz API**: Metadados completos e confiáveis
- **Cover Art Archive**: Capas oficiais em alta resolução
- **Resultados detalhados**: Capa, álbum, artista, ano e tipo

### 📝 Auto-preenchimento Inteligente
Ao selecionar um álbum da busca, o sistema preenche automaticamente:
- ✅ Capa do álbum
- ✅ Nome do álbum
- ✅ Artista
- ✅ Ano de lançamento
- ✅ Tracklist completa (faixas + duração)
- ✅ Gravadora (quando disponível)
- ✅ Tipo (Album, Single, Compilation, EP, Live)

### 🎯 Campos Personalizados
Complete manualmente informações específicas da sua coleção:
- **Condição do CD**: Novo / Usado / Lacrado
- **Condição da Caixa**: Perfeita / Boa / Regular / Danificada / Sem caixa
- **Edição**: Standard / Remaster / Deluxe / Limited
- **Valor Pago**: Registro do investimento
- **Observações Pessoais**: Notas e comentários livres

### 🗂️ CRUD Completo
- ➕ **Adicionar**: Novos CDs ao catálogo
- ✏️ **Editar**: Atualizar informações existentes
- 🗑️ **Remover**: Excluir CDs do catálogo
- 📋 **Listar**: Visualização em cards organizados

### 💾 Armazenamento Local
- Todos os dados salvos no **LocalStorage** do navegador
- 100% offline após o primeiro acesso
- Sem necessidade de servidor ou banco de dados
- Dados persistem entre sessões

### 📤 Exportar / Importar
- **Exportar**: Gera arquivo JSON com todo o catálogo
- **Importar**: Carrega catálogo de arquivo JSON
- **Opções de importação**:
  - Substituir catálogo atual
  - Mesclar com catálogo existente (evita duplicados)
- **Backup seguro**: Mantenha cópias de segurança dos seus dados

### 📊 Estatísticas
- Contador total de CDs na coleção
- Informações detalhadas em cada card

### 🎨 Interface
- Design minimalista e limpo
- Tema claro com paleta suave
- Cards organizados e informativos
- Responsivo (desktop + mobile)
- Placeholders para capas não encontradas

## 🚀 Como Usar

### 1. Buscar CD

1. Digite o nome do **artista** ou **álbum** no campo de busca
2. Clique em **"Buscar por Artista"** ou **"Buscar por Álbum"**
3. Aguarde os resultados aparecerem

### 2. Selecionar e Adicionar

1. Nos resultados, clique em **"Selecionar"** no CD desejado
2. O formulário será preenchido automaticamente
3. Complete os campos personalizados:
   - Condição do CD (obrigatório)
   - Condição da caixa
   - Edição
   - Valor pago
   - Observações
4. Clique em **"Salvar CD"**

### 3. Editar CD

1. No catálogo, clique em **"Editar"** no card do CD
2. Modifique as informações desejadas
3. Clique em **"Salvar CD"**

### 4. Excluir CD

1. No catálogo, clique em **"Excluir"** no card do CD
2. Confirme a exclusão

### 5. Exportar Catálogo

1. Clique em **"Exportar JSON"**
2. Um arquivo `.json` será baixado com todo o catálogo
3. Nome do arquivo: `cd-catalog-AAAA-MM-DD.json`

### 6. Importar Catálogo

1. Clique em **"Importar JSON"**
2. Selecione o arquivo `.json` exportado anteriormente
3. Escolha:
   - **OK**: Substitui o catálogo atual
   - **Cancelar**: Mescla com o catálogo existente

## 📁 Estrutura de Arquivos

```
29-cd-catalog-offline/
├── index.html      # Estrutura HTML da aplicação
├── styles.css      # Estilos com tema Sprint-Lab
├── app.js          # Lógica JavaScript (APIs + CRUD + LocalStorage)
└── README.md       # Documentação completa
```

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização moderna e responsiva
- **JavaScript ES6+**: Lógica da aplicação
- **LocalStorage API**: Armazenamento local
- **Fetch API**: Requisições às APIs externas

### APIs Externas

- **[MusicBrainz API](https://musicbrainz.org/doc/MusicBrainz_API)**: Metadados musicais
- **[Cover Art Archive](https://coverartarchive.org/)**: Capas de álbuns

## 💡 Dicas de Uso

### Backup Regular
- Exporte seu catálogo periodicamente
- Mantenha cópias em locais seguros (cloud, pen drive, etc.)

### Busca Eficiente
- Use nomes completos para melhores resultados
- Busque por artista para ver toda a discografia
- Busque por álbum para resultados específicos

### Organização
- Preencha todos os campos para melhor controle
- Use as observações para notas importantes
- Registre valores pagos para controle financeiro

### Importação
- Ao importar, escolha "Mesclar" para não perder dados
- Escolha "Substituir" apenas se tiver certeza

## 🖼️ Screenshots

*(Placeholders - adicione capturas de tela conforme necessário)*

### Tela de Busca
![Busca de CDs](screenshots/busca.png)

### Formulário de CD
![Formulário](screenshots/formulario.png)

### Catálogo
![Catálogo](screenshots/catalogo.png)

## 📝 Notas Importantes

- **Conexão necessária**: Para busca e preenchimento automático
- **Offline após carregar**: Catálogo funciona 100% offline
- **Limite do LocalStorage**: Aproximadamente 5-10MB (suficiente para milhares de CDs)
- **Compatibilidade**: Navegadores modernos (Chrome, Firefox, Safari, Edge)

## 🐛 Troubleshooting

### Busca não retorna resultados
- Verifique sua conexão com a internet
- Tente buscar com nomes diferentes
- Aguarde alguns segundos entre buscas

### Capa não aparece
- Nem todos os álbuns têm capas no Cover Art Archive
- Um placeholder será exibido automaticamente

### Dados perdidos
- Limpar cache/cookies do navegador apaga o LocalStorage
- Sempre mantenha backups exportados

## 🎯 Próximas Melhorias Possíveis

- [ ] Filtros e ordenação no catálogo
- [ ] Pesquisa dentro do catálogo
- [ ] Estatísticas avançadas (valor total, gêneros, etc.)
- [ ] Modo escuro
- [ ] Impressão de catálogo
- [ ] Integração com outras APIs musicais

## 📄 Licença

Projeto desenvolvido como parte do **Ecossistema FP - Sprint Lab**

---

**Sprint Lab #29 - CD Catalog Offline**
Desenvolvido com ❤️ usando HTML + CSS + JavaScript puro
