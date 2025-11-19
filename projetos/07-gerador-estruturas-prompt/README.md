# 🤖 Gerador de Estruturas de Prompt – Agentes IA

Ferramenta offline para criar, gerenciar e reutilizar templates de prompts estruturados para agentes de IA. Padronize suas interações com LLMs e mantenha uma biblioteca de prompts eficazes!

## 📋 Descrição do Projeto

O **Gerador de Estruturas de Prompt** é uma aplicação web que funciona completamente offline, permitindo criar templates de prompts profissionais e bem estruturados para uso com ChatGPT, Claude, Gemini e outros modelos de linguagem.

Cada template é composto por campos pré-definidos que, quando combinados, geram um prompt completo e formatado, pronto para ser copiado e utilizado. Perfeito para quem trabalha com IA regularmente e deseja manter consistência e qualidade nas instruções.

Parte do **Ecossistema FP**, este projeto oferece uma solução prática para organizar e reutilizar prompts sem depender de ferramentas online.

## 🗂️ Estrutura de Arquivos

```
07-gerador-estruturas-prompt/
├── index.html      # Interface da aplicação
├── styles.css      # Estilos e tema roxo/escuro
├── app.js          # Lógica e funcionalidades
└── README.md       # Esta documentação
```

## 📊 Formato dos Dados

Cada template possui a seguinte estrutura:

```json
{
  "id": "unique-id-123",
  "agentName": "Assistente de Código JavaScript",
  "objective": "Você é um assistente especializado em revisar e melhorar código JavaScript moderno.",
  "tone": "Profissional e técnico",
  "context": "Foco em ES6+, boas práticas, performance e segurança.",
  "placeholders": "[CODIGO_PARA_REVISAR]\n[ASPECTOS_ESPECIFICOS]",
  "instructions": "Forneça sugestões práticas e explique o raciocínio por trás de cada recomendação.",
  "createdAt": "2025-01-19T10:30:00.000Z",
  "updatedAt": "2025-01-19T14:45:00.000Z"
}
```

### Campos do Template:

- **id** (string): Identificador único gerado automaticamente
- **agentName** (string): Nome descritivo do agente (obrigatório)
- **objective** (string): Objetivo principal e papel do agente (obrigatório)
- **tone** (string): Tom de voz do agente (obrigatório)
- **context** (string): Contexto adicional, regras, restrições (opcional)
- **placeholders** (string): Campos dinâmicos como [ENTRADA_DO_USUARIO] (opcional)
- **instructions** (string): Instruções finais sobre como responder (opcional)
- **createdAt** (string): Data de criação
- **updatedAt** (string): Data da última atualização

## 🎯 Exemplo de Prompt Gerado

### Template: "Assistente de Código JavaScript"

**Entrada no formulário:**
- **Nome:** Assistente de Código JavaScript
- **Objetivo:** Você é um assistente especializado em revisar e melhorar código JavaScript moderno.
- **Tom:** Profissional e técnico
- **Contexto:** Foco em ES6+, boas práticas, performance e segurança.
- **Placeholders:**
  ```
  [CODIGO_PARA_REVISAR]
  [ASPECTOS_ESPECIFICOS]
  ```
- **Instruções:** Forneça sugestões práticas e explique o raciocínio por trás de cada recomendação.

**Prompt Final Gerado:**

```markdown
# Assistente de Código JavaScript

## Objetivo

Você é um assistente especializado em revisar e melhorar código JavaScript moderno.

## Tom de Voz

Profissional e técnico

## Contexto

Foco em ES6+, boas práticas, performance e segurança.

## Entrada Dinâmica

[CODIGO_PARA_REVISAR]
[ASPECTOS_ESPECIFICOS]

## Instruções

Forneça sugestões práticas e explique o raciocínio por trás de cada recomendação.

---

Prompt gerado em: 19/01/2025, 14:45:00
```

**Como usar:**
1. Copie o prompt gerado
2. Substitua `[CODIGO_PARA_REVISAR]` pelo seu código
3. Substitua `[ASPECTOS_ESPECIFICOS]` (ex: "performance", "segurança")
4. Cole no ChatGPT, Claude ou outro LLM

## ✨ Funcionalidades

### 📝 Gerenciamento de Templates
- **Criar** novos templates de prompt
- **Editar** templates existentes
- **Excluir** templates obsoletos
- **Visualizar** lista organizada na sidebar
- **Ordenação** por data de atualização (mais recentes primeiro)

### 🎨 Campos Estruturados
- **Nome do Agente**: Identificação clara do agente
- **Objetivo**: Papel e especialização
- **Tom de Voz**: 8 opções pré-definidas (Profissional, Amigável, Formal, etc.)
- **Contexto Fixo**: Regras e informações permanentes
- **Placeholders**: Campos dinâmicos para substituição
- **Instruções Finais**: Diretrizes sobre como responder

### 👁️ Preview em Tempo Real
- **Atualização instantânea**: Veja o prompt sendo construído
- **Formatação automática**: Markdown estruturado
- **Timestamp**: Data/hora de geração incluída

### 📋 Copiar para Clipboard
- **Um clique**: Botão dedicado para copiar
- **Fallback**: Suporte para navegadores antigos
- **Feedback visual**: Toast de confirmação

### 💾 Persistência e Backup
- **localStorage**: Salvamento automático no navegador
- **Export JSON**: Baixe todos os templates
- **Import JSON**: Restaure ou compartilhe templates
- **Sem duplicatas**: Sistema inteligente de mesclagem

### 🎭 Tema Visual Moderno
- **Roxo/Pink**: Cores associadas a IA e criatividade
- **Modo escuro**: Interface elegante e confortável
- **Responsivo**: Funciona em desktop, tablet e mobile

## 🚀 Como Rodar Localmente

### Opção 1: Python HTTP Server

```bash
cd projetos/07-gerador-estruturas-prompt
python3 -m http.server 8000
```

Acesse: `http://localhost:8000`

### Opção 2: VS Code Live Server

1. Instale a extensão "Live Server"
2. Abra `index.html`
3. Clique com botão direito → "Open with Live Server"

### Opção 3: Node.js

```bash
npx http-server projetos/07-gerador-estruturas-prompt -p 8000
```

### Opção 4: Abrir Diretamente

Simplesmente abra `index.html` no navegador (funciona perfeitamente).

## 📖 Como Usar

### 1️⃣ Criar um Novo Template

1. Clique em **"➕ Novo"** na sidebar
2. Preencha os campos obrigatórios:
   - **Nome do Agente**: "Revisor de Artigos Técnicos"
   - **Objetivo**: "Você é um editor especializado em revisar artigos técnicos sobre programação."
   - **Tom de Voz**: "Educacional e didático"
3. Preencha campos opcionais conforme necessário
4. Observe o **Preview** sendo atualizado em tempo real
5. Clique em **"💾 Salvar Template"**

### 2️⃣ Usar um Template Existente

1. Na sidebar, clique no template desejado
2. O template será carregado no editor
3. O **Preview** mostrará o prompt completo
4. Clique em **"📋 Copiar Prompt"**
5. Cole no ChatGPT, Claude, ou outro LLM
6. Substitua os placeholders (ex: `[ENTRADA_DO_USUARIO]`) pelos valores reais

### 3️⃣ Editar um Template

1. Clique no template na sidebar
2. Faça as alterações desejadas nos campos
3. O preview será atualizado automaticamente
4. Clique em **"💾 Atualizar Template"**
5. Para descartar alterações, clique em **"❌ Cancelar"**

### 4️⃣ Excluir um Template

1. Na lista de templates, clique no botão **"🗑️"** do template
2. Confirme a exclusão no modal
3. O template será removido permanentemente

### 5️⃣ Exportar Templates (Backup)

1. Clique em **"📤 Exportar JSON"** no header
2. Um arquivo `.json` será baixado automaticamente
3. Nome do arquivo: `prompt-templates-YYYY-MM-DD.json`
4. Guarde este arquivo como backup

### 6️⃣ Importar Templates

1. Clique em **"📥 Importar JSON"** no header
2. Selecione um arquivo JSON válido de templates
3. Novos templates serão adicionados à sua biblioteca
4. Templates duplicados (mesmo ID) serão ignorados

## 💡 Exemplos de Templates Úteis

### Template 1: Revisor de Código

```
Nome: Revisor de Código Python
Objetivo: Especialista em revisar código Python com foco em PEP8, eficiência e legibilidade.
Tom: Profissional e técnico
Contexto: Considere Python 3.9+, type hints, e boas práticas da comunidade.
Placeholders:
[CODIGO]
[FOCO_PRINCIPAL]
Instruções: Liste problemas por ordem de prioridade e sugira soluções específicas.
```

### Template 2: Gerador de Documentação

```
Nome: Gerador de Documentação
Objetivo: Criar documentação clara e completa para funções e APIs.
Tom: Educacional e didático
Contexto: Seguir padrão JSDoc/Docstring. Incluir exemplos práticos.
Placeholders:
[CODIGO_FUNCAO]
[LINGUAGEM]
Instruções: Gere documentação com descrição, parâmetros, retorno e exemplos.
```

### Template 3: Assistente de Debugging

```
Nome: Assistente de Debugging
Objetivo: Ajudar a identificar e resolver bugs em código.
Tom: Empático e suportivo
Contexto: Analisar logs, stack traces e código relacionado.
Placeholders:
[ERRO_MENSAGEM]
[CODIGO_RELACIONADO]
[COMPORTAMENTO_ESPERADO]
Instruções: Explique a causa provável, possíveis soluções e como prevenir no futuro.
```

### Template 4: Otimizador de Performance

```
Nome: Otimizador de Performance
Objetivo: Analisar e sugerir melhorias de performance em código e queries.
Tom: Direto e objetivo
Contexto: Considerar Big O, caching, indexação e boas práticas.
Placeholders:
[CODIGO_OU_QUERY]
[METRICAS_ATUAIS]
Instruções: Identifique gargalos e proponha otimizações mensuráveis.
```

### Template 5: Criador de Conteúdo Técnico

```
Nome: Criador de Conteúdo Técnico
Objetivo: Escrever artigos, tutoriais e posts técnicos acessíveis.
Tom: Amigável e acessível
Contexto: Público-alvo: desenvolvedores iniciantes a intermediários.
Placeholders:
[TOPICO]
[FORMATO] (Tutorial, Artigo, Thread)
Instruções: Use exemplos práticos, explique conceitos gradualmente, inclua código comentado.
```

### Template 6: Gerador de Testes Unitários

```
Nome: Gerador de Testes Unitários
Objetivo: Criar testes unitários abrangentes e bem estruturados.
Tom: Profissional e técnico
Contexto: Seguir padrões AAA (Arrange, Act, Assert). Cobertura de edge cases.
Placeholders:
[CODIGO_FUNCAO]
[FRAMEWORK] (Jest, pytest, etc)
Instruções: Gere casos de teste para fluxo normal, edge cases e cenários de erro.
```

## 🎯 Dicas de Uso

### Estruture Prompts Eficazes

**Nome do Agente:**
- Seja específico: "Revisor de SQL" > "Assistente"
- Indique a especialização: "Expert em React Hooks"

**Objetivo:**
- Use "Você é..." para definir o papel
- Seja claro sobre a especialização
- Exemplo: "Você é um arquiteto de software especializado em microsserviços"

**Tom de Voz:**
- Escolha o tom apropriado para o contexto
- Profissional para código, Amigável para tutoriais
- Considere a experiência do público-alvo

**Placeholders:**
- Use nomes descritivos: `[CODIGO_ATUAL]`, `[TECNOLOGIA]`
- Um placeholder por linha para melhor organização
- Documente o que cada placeholder espera

**Contexto e Instruções:**
- Seja específico sobre restrições e regras
- Mencione padrões a seguir (PEP8, ESLint, etc.)
- Defina o formato de saída esperado

### Organize sua Biblioteca

**Categorize por Função:**
- Revisão de código
- Geração de conteúdo
- Debugging
- Otimização
- Documentação
- Testes

**Use Nomes Descritivos:**
- ✅ "Revisor Python com Foco em Async"
- ❌ "Assistente 1"

**Mantenha Atualizado:**
- Revise templates periodicamente
- Atualize conforme aprende o que funciona melhor
- Remova templates obsoletos

### Maximize Eficiência

**Crie Variações:**
- Mesmo agente, diferentes níveis de detalhe
- Exemplo: "Revisor Rápido" vs "Revisor Detalhado"

**Combine Placeholders:**
- Use múltiplos placeholders para flexibilidade
- Exemplo: `[LINGUAGEM]`, `[VERSAO]`, `[FRAMEWORK]`

**Teste e Itere:**
- Use o prompt gerado em um LLM
- Ajuste baseado nos resultados
- Salve a versão melhorada

## 💾 Backup e Exportação

### Por que Fazer Backup?

Os templates ficam no **localStorage** do navegador, o que significa:
- ✅ Acesso instantâneo e offline
- ⚠️ Limitado ao navegador e domínio
- ⚠️ Pode ser apagado ao limpar cache
- ⚠️ Não sincroniza entre dispositivos

**Solução**: Exporte regularmente!

### Estratégia de Backup Recomendada

**Para Uso Pessoal:**
1. **Frequência**: Exporte semanalmente ou após criar templates importantes
2. **Local**: Salve em pasta específica (ex: `~/documentos/prompts-ia/`)
3. **Versionamento**: Use Git para versionar os JSONs
4. **Cloud**: Sincronize com Google Drive, Dropbox, etc.

**Para Equipes:**
1. **Repositório compartilhado**: Crie um repo Git com templates
2. **Padronização**: Defina convenções de nomenclatura
3. **Documentação**: Mantenha README explicando cada template
4. **Revisão**: Peer review de novos templates

### Como Restaurar

1. Abra a aplicação
2. Clique em **"📥 Importar JSON"**
3. Selecione o arquivo de backup
4. Templates serão adicionados à biblioteca

## 🔒 Privacidade e Segurança

- **100% offline**: Nenhum dado enviado para servidores
- **Local apenas**: Tudo fica no seu navegador
- **Sem rastreamento**: Zero coleta de dados
- **Você controla**: Exporte e use onde quiser

## ⚠️ Limitações Conhecidas

### 1. Armazenamento Local
- Dados ficam no navegador específico
- Limpar cache = perder dados
- Não sincroniza entre dispositivos

**Solução**: Exporte regularmente em JSON!

### 2. Limite de Armazenamento
- localStorage: ~5-10MB (depende do navegador)
- Improvável atingir com templates de texto

### 3. Sem Versionamento
- Não há histórico de alterações em templates
- Não é possível desfazer edições antigas

**Solução**: Use Git para versionar os arquivos JSON exportados.

### 4. Substituição Manual de Placeholders
- Placeholders não são substituídos automaticamente
- Você precisa copiar e editar manualmente

## 🔮 Ideias para Evolução Futura

### Funcionalidades
- [ ] Substituição interativa de placeholders
- [ ] Categorias/tags para templates
- [ ] Busca e filtros avançados
- [ ] Templates compartilháveis via URL
- [ ] Biblioteca pública de templates
- [ ] Duplicar template existente
- [ ] Histórico de uso (templates mais usados)
- [ ] Validação de placeholders (garantir uso correto)
- [ ] Export individual de template
- [ ] Syntax highlighting no preview

### Técnicas
- [ ] IndexedDB para maior capacidade
- [ ] PWA para instalação como app
- [ ] Sincronização via GitHub Gist
- [ ] Modo escuro/claro toggle
- [ ] Atalhos de teclado
- [ ] Import de templates de URLs
- [ ] Integração com APIs de LLMs (opcional)

## 🧪 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Grid, Flexbox, variáveis CSS, gradientes
- **JavaScript (ES6+)**: Manipulação do DOM, localStorage
- **Clipboard API**: Copiar texto para área de transferência
- **FileReader API**: Importar arquivos JSON
- **Blob API**: Exportar dados como arquivo

## 📱 Responsividade

O aplicativo funciona perfeitamente em:
- 💻 **Desktop**: Layout em duas colunas (lista + editor/preview)
- 📱 **Tablet**: Layout adaptado (1024px breakpoint)
- 📱 **Smartphone**: Layout em coluna única, sidebar acima

## 🎨 Tema Visual

- **Cores primárias**: Roxo (#8b5cf6) e Pink (#ec4899)
- **Background**: Gradiente azul escuro profundo
- **Tema escuro**: Elegante e confortável para uso prolongado
- **Inspiração**: IA, criatividade, inovação

## 🤝 Casos de Uso

### Desenvolvedores
- Templates para revisão de código
- Prompts para geração de testes
- Assistentes de debugging
- Otimização de performance

### Criadores de Conteúdo
- Templates para artigos técnicos
- Roteiros de vídeos
- Threads para Twitter/LinkedIn
- Ideias de conteúdo

### Product Managers
- Prompts para user stories
- Análise de requisitos
- Documentação de features
- Roadmap planning

### Estudantes
- Assistentes de estudo
- Explicadores de conceitos
- Geradores de exercícios
- Revisores de trabalhos

### Empresas
- Padronização de interações com IA
- Biblioteca corporativa de prompts
- Onboarding de novos membros
- Best practices compartilhadas

## 🎓 Melhores Práticas

### Escreva Prompts Específicos
- ❌ "Ajude com código"
- ✅ "Revise este código Python focando em eficiência de algoritmos e memory leaks"

### Use Contexto Rico
- Mencione versões de tecnologias
- Especifique restrições e limitações
- Defina o nível de detalhe esperado

### Teste e Itere
- Use o prompt com diferentes LLMs
- Ajuste baseado nos resultados
- Documente o que funciona melhor

### Mantenha Simples
- Não sobrecarregue com informações
- Foque no essencial
- Divida prompts complexos em múltiplos templates

## 📚 Recursos Adicionais

### Aprenda sobre Prompt Engineering:
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [OpenAI Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic Prompt Library](https://docs.anthropic.com/claude/prompt-library)

### Comunidades:
- r/PromptEngineering (Reddit)
- PromptBase (marketplace de prompts)
- Learn Prompting (curso gratuito)

## 📄 Licença

Projeto pessoal do Ecossistema FP - Uso livre.

---

**Desenvolvido com 💜 para o Ecossistema FP**

*Potencialize suas interações com IA através de prompts bem estruturados!*
