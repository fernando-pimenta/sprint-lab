# 📄 FP Legal Document Generator

**Gerador profissional de contratos e documentos legais** com templates editáveis, preview em tempo real, biblioteca de cláusulas reutilizáveis e sistema completo de gerenciamento de documentos.

---

## 🎯 Funcionalidades Principais

### ✅ 6 Templates Profissionais Inclusos

1. **Contrato de Prestação de Serviços (Freelance)**
   - Contrato completo para serviços freelance
   - Campos: Partes, Serviço, Valor, Prazo, Pagamento, Rescisão

2. **Proposta Comercial**
   - Proposta profissional para apresentação de projetos
   - Campos: Cliente, Projeto, Escopo, Investimento, Cronograma, Condições

3. **NDA (Non-Disclosure Agreement)**
   - Acordo de confidencialidade robusto
   - Campos: Partes, Informações Confidenciais, Prazo, Penalidades

4. **Termos de Serviço (Website/App)**
   - Termos completos para websites e aplicativos
   - Campos: Serviço, Empresa, Uso Aceitável, Responsabilidades, Lei Aplicável

5. **Contrato de Manutenção Técnica**
   - Contrato para serviços recorrentes de suporte
   - Campos: Partes, Serviços, Periodicidade, Valor Mensal, SLA, Vigência

6. **Termo de Aceite de Projeto**
   - Documento de aceite e aprovação de entregas
   - Campos: Cliente, Projeto, Entregas, Data, Observações

### ✨ Editor com Preview em Tempo Real

- **Split-screen** com formulário (40%) e preview (60%)
- Atualização instantânea ao digitar
- Sistema de variáveis `{{nome}}` substituídas automaticamente
- Modo apresentação fullscreen
- Watermark "RASCUNHO" removível

### 📚 Biblioteca de Cláusulas Pré-Definidas

**12 cláusulas profissionais incluídas:**

- **Pagamento:** À vista, Parcelado, Recorrente
- **Rescisão:** Com/sem justa causa, Multa rescisória
- **Confidencialidade:** NDA completo
- **Propriedade Intelectual:** Transferência, Licenciamento
- **Responsabilidades:** Cliente e Prestador
- **Foro e Legislação:** São Paulo, Rio de Janeiro

**Funcionalidades:**
- Inserir cláusula no documento com 1 clique
- Criar, editar e excluir cláusulas personalizadas
- Organização por categorias

### 👥 CRUD de Clientes

- Cadastro completo: Nome, CPF/CNPJ, Endereço, Email, Telefone, Notas
- Auto-preenchimento de campos ao selecionar cliente
- Histórico de documentos por cliente
- Validação automática de CPF/CNPJ

### 📋 Biblioteca de Documentos Gerados

**Armazenamento Completo:**
- Nome, Template usado, Data de criação
- Status: Rascunho, Finalizado, Enviado, Assinado
- Versões e histórico de atualizações

**Ações Disponíveis:**
- Visualizar, Editar, Duplicar, Excluir
- Alterar status
- Imprimir/Exportar

### 🔍 Filtros e Busca Avançada

- Busca textual (nome, conteúdo)
- Filtro por Template
- Filtro por Status
- Filtro por Cliente
- Filtro por Data (range)

### 💾 Export e Backup

- **Export HTML:** Download do documento formatado
- **Imprimir:** Versão formatada para impressão/PDF
- **Export JSON:** Backup completo (documentos + clientes + cláusulas)
- **Import JSON:** Restaurar backup

---

## 🚀 Como Usar

### 1️⃣ Criar Novo Documento

1. Acesse a aba **"Criar Documento"**
2. Selecione um **template** no dropdown
3. (Opcional) Selecione um **cliente** para auto-preencher campos
4. Preencha os campos do formulário
5. Visualize o preview em tempo real à direita
6. Adicione cláusulas da biblioteca se necessário
7. Salve como **Rascunho** ou **Finalize** o documento

### 2️⃣ Gerenciar Clientes

1. Acesse a aba **"Clientes"**
2. Clique em **"+ Novo Cliente"**
3. Preencha os dados (Nome, CPF/CNPJ, etc.)
4. Salve
5. Use o cliente ao criar documentos para auto-preencher campos

### 3️⃣ Personalizar Cláusulas

1. Acesse a aba **"Cláusulas"**
2. Clique em **"+ Nova Cláusula"**
3. Defina: Nome, Categoria, Texto
4. Salve
5. Use a cláusula ao criar documentos

### 4️⃣ Gerenciar Documentos Salvos

1. Acesse a aba **"Biblioteca"**
2. Use os filtros para encontrar documentos
3. Ações disponíveis:
   - **👁️ Ver:** Visualizar documento completo
   - **✏️ Editar:** Modificar conteúdo
   - **📋 Duplicar:** Criar cópia
   - **🔄 Status:** Alterar status (Rascunho → Finalizado → Enviado → Assinado)
   - **🗑️ Excluir:** Remover documento

### 5️⃣ Exportar e Imprimir

**Export HTML:**
- Gera arquivo `.html` standalone formatado
- Pode ser aberto em qualquer navegador
- Pronto para conversão em PDF

**Imprimir:**
- Usa CSS otimizado para impressão
- Remove elementos de interface
- Margens e formatação adequadas

**Backup JSON:**
- Exporta todos os dados (documentos, clientes, cláusulas)
- Pode ser importado para restaurar dados

---

## 📝 Variáveis Disponíveis

As variáveis são automaticamente substituídas no template:

| Variável | Descrição |
|----------|-----------|
| `{{nome_contratante}}` | Nome do contratante |
| `{{cpf_cnpj_contratante}}` | CPF/CNPJ do contratante |
| `{{endereco_contratante}}` | Endereço do contratante |
| `{{nome_contratado}}` | Nome do contratado |
| `{{cpf_cnpj_contratado}}` | CPF/CNPJ do contratado |
| `{{endereco_contratado}}` | Endereço do contratado |
| `{{servico}}` | Descrição do serviço |
| `{{valor}}` | Valor numérico (R$) |
| `{{valor_por_extenso}}` | Valor convertido automaticamente |
| `{{prazo}}` | Prazo de execução |
| `{{data_inicio}}` | Data de início |
| `{{data_fim}}` | Data de término |
| `{{data_hoje}}` | Data atual (gerada automaticamente) |
| `{{forma_pagamento}}` | Condições de pagamento |
| `{{cidade}}` | Cidade |
| `{{estado}}` | Estado |

**Nota:** Cada template pode ter variáveis específicas.

---

## ✅ Validações Implementadas

- ✓ **Campos obrigatórios** marcados com `*`
- ✓ **CPF/CNPJ** com máscara automática e validação
- ✓ **Valores numéricos** apenas números positivos
- ✓ **Datas** formato válido brasileiro
- ✓ **Formulários** validação HTML5 nativa

---

## 🎨 Design

**Paleta de Cores (Ecossistema FP):**
- Primary: `#283593` (Azul Índigo)
- Secondary: `#3949ab` (Azul Médio)
- Accent: `#ffa70a` (Laranja)
- Background: `#f5f5f5` (Cinza Claro)

**Status de Documentos:**
- Rascunho: Azul (`#2196f3`)
- Finalizado: Verde (`#4caf50`)
- Enviado: Laranja (`#ff9800`)
- Assinado: Roxo (`#9c27b0`)

**Tipografia:**
- Interface: Arial, sans-serif
- Documentos: Times New Roman, serif (padrão legal)

---

## 🛠️ Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Design responsivo e moderno
- **JavaScript (ES6+)** - Lógica da aplicação
- **localStorage** - Persistência de dados offline

**Nenhuma dependência externa!** 100% standalone.

---

## ⚠️ AVISO LEGAL IMPORTANTE

**Este gerador é uma ferramenta auxiliar para criação de documentos.**

- ❌ **NÃO substitui** aconselhamento jurídico profissional
- ❌ **NÃO garante** validade legal dos documentos gerados
- ❌ **NÃO deve ser usado** sem revisão de um advogado

**SEMPRE consulte um advogado qualificado antes de:**
- Assinar qualquer documento legal
- Usar documentos gerados em transações comerciais
- Fazer acordos que envolvam valores significativos
- Tomar decisões legais importantes

**O desenvolvedor não se responsabiliza** por:
- Uso inadequado dos documentos gerados
- Prejuízos decorrentes de documentos mal elaborados
- Incompatibilidade com legislação local
- Erros ou omissões nos templates

**Use por sua conta e risco.**

---

## 💡 Funcionalidades Extras

### ⛶ Modo Apresentação
- Clique no ícone `⛶` no preview
- Preview em tela cheia
- Ideal para apresentar documentos ao cliente

### 💧 Watermark
- Ative o checkbox "Watermark RASCUNHO"
- Marca d'água diagonal transparente
- Removível antes de finalizar

### 🔢 Valor por Extenso
- Conversão automática de R$ 1.500,00
- Resultado: "mil e quinhentos reais"
- Inserido automaticamente no documento

### 📱 Responsivo
- Funciona em desktop, tablet e mobile
- Layout adaptativo
- Experiência otimizada em todas as telas

---

## 📂 Estrutura de Arquivos

```
26-fp-legal-document-generator/
├── index.html          # Estrutura da aplicação
├── styles.css          # Estilos e design
├── app.js              # Lógica e funcionalidades
└── README.md           # Documentação
```

---

## 🎓 Casos de Uso

**Freelancers:**
- Contratos de prestação de serviços
- Propostas comerciais
- Termos de aceite

**Agências/Empresas:**
- NDAs para clientes
- Contratos de manutenção
- Termos de serviço para produtos

**Desenvolvedores:**
- Termos de serviço para apps
- Contratos com clientes
- Propostas de projetos

---

## 📊 Capacidade

- ✅ Templates ilimitados (personalizáveis)
- ✅ Clientes ilimitados
- ✅ Cláusulas ilimitadas
- ✅ Documentos ilimitados
- ✅ Armazenamento local (localStorage)

**Nota:** O limite é a capacidade do localStorage do navegador (~5-10MB).

---

## 🔒 Privacidade e Segurança

- ✅ **100% Offline** - Dados armazenados localmente
- ✅ **Sem servidor** - Nenhum dado enviado para internet
- ✅ **Privacidade total** - Documentos ficam apenas no seu navegador
- ⚠️ **Backup importante** - Use Export JSON para backups regulares

---

## 📞 Suporte

Para dúvidas, sugestões ou problemas:
- Abra uma issue no repositório
- Entre em contato com Fernando Pimenta

---

## 👨‍💻 Autor

**Fernando Pimenta**
Sprint Lab #26
© 2025

---

## 📜 Licença

Este projeto é open-source e está disponível para uso pessoal e comercial.

**Lembre-se:** Sempre consulte um advogado antes de usar documentos legais! 👨‍⚖️

---

**Desenvolvido com 💙 como parte do Sprint Lab**
