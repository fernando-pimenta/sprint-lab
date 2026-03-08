// ===== DADOS E ESTADO GLOBAL =====
let state = {
    templates: [],
    clients: [],
    clauses: [],
    documents: [],
    currentDocument: null,
    currentTemplate: null
};

// ===== TEMPLATES PRÉ-DEFINIDOS =====
const DEFAULT_TEMPLATES = [
    {
        id: 'prestacao-servicos',
        name: 'Contrato de Prestação de Serviços (Freelance)',
        description: 'Contrato profissional para serviços freelance com cláusulas completas',
        fields: [
            { id: 'nome_contratante', label: 'Nome do Contratante', type: 'text', required: true },
            { id: 'cpf_cnpj_contratante', label: 'CPF/CNPJ do Contratante', type: 'text', required: true, mask: 'cpf_cnpj' },
            { id: 'endereco_contratante', label: 'Endereço do Contratante', type: 'textarea', required: true },
            { id: 'nome_contratado', label: 'Nome do Contratado', type: 'text', required: true },
            { id: 'cpf_cnpj_contratado', label: 'CPF/CNPJ do Contratado', type: 'text', required: true, mask: 'cpf_cnpj' },
            { id: 'endereco_contratado', label: 'Endereço do Contratado', type: 'textarea', required: true },
            { id: 'servico', label: 'Descrição do Serviço', type: 'textarea', required: true },
            { id: 'valor', label: 'Valor (R$)', type: 'number', required: true },
            { id: 'prazo', label: 'Prazo de Execução', type: 'text', required: true },
            { id: 'forma_pagamento', label: 'Forma de Pagamento', type: 'textarea', required: true },
            { id: 'data_inicio', label: 'Data de Início', type: 'date', required: true },
            { id: 'cidade', label: 'Cidade', type: 'text', required: true },
            { id: 'estado', label: 'Estado', type: 'text', required: true }
        ],
        template: `
<h1>CONTRATO DE PRESTAÇÃO DE SERVIÇOS</h1>

<p>Pelo presente instrumento particular, de um lado:</p>

<p><strong>CONTRATANTE:</strong> {{nome_contratante}}, inscrito no CPF/CNPJ sob o nº {{cpf_cnpj_contratante}}, com endereço em {{endereco_contratante}};</p>

<p>E de outro lado:</p>

<p><strong>CONTRATADO:</strong> {{nome_contratado}}, inscrito no CPF/CNPJ sob o nº {{cpf_cnpj_contratado}}, com endereço em {{endereco_contratado}};</p>

<p>Têm entre si justo e contratado o presente Contrato de Prestação de Serviços, que se regerá pelas seguintes cláusulas e condições:</p>

<h2>CLÁUSULA PRIMEIRA - DO OBJETO</h2>
<p>O presente contrato tem por objeto a prestação dos seguintes serviços: {{servico}}</p>

<h2>CLÁUSULA SEGUNDA - DO VALOR E FORMA DE PAGAMENTO</h2>
<p>Pelo serviço descrito na Cláusula Primeira, o CONTRATANTE pagará ao CONTRATADO o valor total de R$ {{valor}} ({{valor_por_extenso}}), de acordo com a seguinte forma de pagamento: {{forma_pagamento}}</p>

<h2>CLÁUSULA TERCEIRA - DO PRAZO</h2>
<p>O prazo para execução dos serviços será de {{prazo}}, com início em {{data_inicio}}.</p>

<h2>CLÁUSULA QUARTA - DAS OBRIGAÇÕES DO CONTRATADO</h2>
<p>São obrigações do CONTRATADO:</p>
<p>a) Executar os serviços com qualidade e dentro do prazo estabelecido;</p>
<p>b) Manter sigilo sobre informações confidenciais do CONTRATANTE;</p>
<p>c) Comunicar imediatamente qualquer imprevisto que possa afetar o cumprimento do contrato.</p>

<h2>CLÁUSULA QUINTA - DAS OBRIGAÇÕES DO CONTRATANTE</h2>
<p>São obrigações do CONTRATANTE:</p>
<p>a) Efetuar o pagamento na forma e prazo estabelecidos;</p>
<p>b) Fornecer todas as informações necessárias para a execução dos serviços;</p>
<p>c) Prestar esclarecimentos que se fizerem necessários.</p>

<h2>CLÁUSULA SEXTA - DA RESCISÃO</h2>
<p>O presente contrato poderá ser rescindido por qualquer das partes, mediante comunicação prévia com antecedência mínima de 30 (trinta) dias.</p>

<h2>CLÁUSULA SÉTIMA - DO FORO</h2>
<p>As partes elegem o foro da Comarca de {{cidade}}/{{estado}} para dirimir quaisquer questões oriundas do presente contrato.</p>

<p>E por estarem assim justos e contratados, firmam o presente instrumento em duas vias de igual teor e forma.</p>

<p style="text-align: center; margin-top: 3rem;">{{cidade}}/{{estado}}, {{data_hoje}}</p>

<div class="signature-section">
    <div class="signature-box">
        <div class="signature-line">{{nome_contratante}}</div>
        <p>CONTRATANTE</p>
    </div>
    <div class="signature-box">
        <div class="signature-line">{{nome_contratado}}</div>
        <p>CONTRATADO</p>
    </div>
</div>
`
    },
    {
        id: 'proposta-comercial',
        name: 'Proposta Comercial',
        description: 'Proposta comercial profissional para apresentação de projetos e orçamentos',
        fields: [
            { id: 'nome_cliente', label: 'Nome do Cliente', type: 'text', required: true },
            { id: 'nome_projeto', label: 'Nome do Projeto', type: 'text', required: true },
            { id: 'escopo', label: 'Escopo do Projeto', type: 'textarea', required: true },
            { id: 'investimento', label: 'Investimento (R$)', type: 'number', required: true },
            { id: 'cronograma', label: 'Cronograma', type: 'textarea', required: true },
            { id: 'condicoes', label: 'Condições de Pagamento', type: 'textarea', required: true },
            { id: 'validade', label: 'Validade da Proposta (dias)', type: 'number', required: true },
            { id: 'empresa', label: 'Nome da Empresa', type: 'text', required: true }
        ],
        template: `
<h1>PROPOSTA COMERCIAL</h1>

<p style="text-align: right;"><strong>Data:</strong> {{data_hoje}}</p>

<p><strong>Prezado(a) {{nome_cliente}},</strong></p>

<p>Apresentamos a presente proposta comercial para o projeto <strong>{{nome_projeto}}</strong>, conforme detalhamento a seguir:</p>

<h2>1. ESCOPO DO PROJETO</h2>
<p>{{escopo}}</p>

<h2>2. CRONOGRAMA</h2>
<p>{{cronograma}}</p>

<h2>3. INVESTIMENTO</h2>
<p>O investimento total para o desenvolvimento do projeto é de <strong>R$ {{investimento}}</strong> ({{valor_por_extenso}}).</p>

<h2>4. CONDIÇÕES DE PAGAMENTO</h2>
<p>{{condicoes}}</p>

<h2>5. VALIDADE DA PROPOSTA</h2>
<p>Esta proposta tem validade de {{validade}} dias a partir da data de emissão.</p>

<h2>6. CONSIDERAÇÕES FINAIS</h2>
<p>Estamos à disposição para esclarecer quaisquer dúvidas e discutir ajustes que se fizerem necessários.</p>

<p>Aguardamos retorno e contamos com a oportunidade de realizar este projeto.</p>

<p style="margin-top: 3rem;"><strong>Atenciosamente,</strong></p>

<div class="signature-section">
    <div class="signature-box">
        <div class="signature-line">{{empresa}}</div>
        <p>{{data_hoje}}</p>
    </div>
</div>
`
    },
    {
        id: 'nda',
        name: 'NDA (Non-Disclosure Agreement)',
        description: 'Acordo de confidencialidade para proteção de informações sensíveis',
        fields: [
            { id: 'parte1', label: 'Parte 1 (Nome)', type: 'text', required: true },
            { id: 'cpf_cnpj_parte1', label: 'CPF/CNPJ Parte 1', type: 'text', required: true, mask: 'cpf_cnpj' },
            { id: 'parte2', label: 'Parte 2 (Nome)', type: 'text', required: true },
            { id: 'cpf_cnpj_parte2', label: 'CPF/CNPJ Parte 2', type: 'text', required: true, mask: 'cpf_cnpj' },
            { id: 'informacoes_confidenciais', label: 'Descrição das Informações Confidenciais', type: 'textarea', required: true },
            { id: 'prazo_confidencialidade', label: 'Prazo de Confidencialidade', type: 'text', required: true },
            { id: 'penalidade', label: 'Penalidade por Descumprimento', type: 'textarea', required: true },
            { id: 'cidade', label: 'Cidade', type: 'text', required: true },
            { id: 'estado', label: 'Estado', type: 'text', required: true }
        ],
        template: `
<h1>ACORDO DE CONFIDENCIALIDADE<br/>(NON-DISCLOSURE AGREEMENT)</h1>

<p>Pelo presente instrumento, as partes abaixo qualificadas:</p>

<p><strong>PARTE 1:</strong> {{parte1}}, CPF/CNPJ nº {{cpf_cnpj_parte1}};</p>

<p><strong>PARTE 2:</strong> {{parte2}}, CPF/CNPJ nº {{cpf_cnpj_parte2}};</p>

<p>Doravante denominadas simplesmente "PARTES", têm entre si justo e acordado o presente Acordo de Confidencialidade, mediante as seguintes cláusulas e condições:</p>

<h2>CLÁUSULA PRIMEIRA - DO OBJETO</h2>
<p>O presente acordo tem por objeto estabelecer as condições de confidencialidade que regerão o relacionamento entre as PARTES, no que diz respeito ao acesso e uso de informações confidenciais.</p>

<h2>CLÁUSULA SEGUNDA - DAS INFORMAÇÕES CONFIDENCIAIS</h2>
<p>Consideram-se informações confidenciais para os fins deste acordo: {{informacoes_confidenciais}}</p>

<h2>CLÁUSULA TERCEIRA - DAS OBRIGAÇÕES</h2>
<p>As PARTES se obrigam a:</p>
<p>a) Manter em sigilo todas as informações confidenciais recebidas;</p>
<p>b) Não divulgar, copiar, reproduzir ou utilizar as informações para fins diversos dos objetivos deste acordo;</p>
<p>c) Limitar o acesso às informações apenas aos colaboradores que necessitem conhecê-las;</p>
<p>d) Adotar medidas de segurança adequadas para proteção das informações.</p>

<h2>CLÁUSULA QUARTA - DO PRAZO</h2>
<p>O presente acordo vigorará pelo prazo de {{prazo_confidencialidade}}, permanecendo válido mesmo após o término da relação entre as PARTES.</p>

<h2>CLÁUSULA QUINTA - DAS PENALIDADES</h2>
<p>O descumprimento das obrigações previstas neste acordo sujeitará a parte infratora ao pagamento de: {{penalidade}}</p>

<h2>CLÁUSULA SEXTA - DO FORO</h2>
<p>As partes elegem o foro da Comarca de {{cidade}}/{{estado}} para dirimir quaisquer questões oriundas do presente acordo.</p>

<p>E por estarem assim justos e acordados, as partes assinam o presente instrumento em duas vias de igual teor.</p>

<p style="text-align: center; margin-top: 3rem;">{{cidade}}/{{estado}}, {{data_hoje}}</p>

<div class="signature-section">
    <div class="signature-box">
        <div class="signature-line">{{parte1}}</div>
        <p>PARTE 1</p>
    </div>
    <div class="signature-box">
        <div class="signature-line">{{parte2}}</div>
        <p>PARTE 2</p>
    </div>
</div>
`
    },
    {
        id: 'termos-servico',
        name: 'Termos de Serviço (Website/App)',
        description: 'Termos de serviço para websites e aplicativos',
        fields: [
            { id: 'nome_servico', label: 'Nome do Serviço/App', type: 'text', required: true },
            { id: 'empresa', label: 'Nome da Empresa', type: 'text', required: true },
            { id: 'uso_aceitavel', label: 'Uso Aceitável', type: 'textarea', required: true },
            { id: 'limitacoes', label: 'Limitações de Responsabilidade', type: 'textarea', required: true },
            { id: 'lei_aplicavel', label: 'Lei Aplicável', type: 'text', required: true },
            { id: 'cidade', label: 'Cidade', type: 'text', required: true },
            { id: 'estado', label: 'Estado', type: 'text', required: true }
        ],
        template: `
<h1>TERMOS DE SERVIÇO<br/>{{nome_servico}}</h1>

<p><strong>Última atualização:</strong> {{data_hoje}}</p>

<h2>1. ACEITAÇÃO DOS TERMOS</h2>
<p>Ao acessar e utilizar o serviço {{nome_servico}}, operado por {{empresa}}, você concorda com estes Termos de Serviço. Caso não concorde, não utilize o serviço.</p>

<h2>2. DESCRIÇÃO DO SERVIÇO</h2>
<p>O {{nome_servico}} é um serviço que oferece [descrição a ser complementada conforme necessário].</p>

<h2>3. USO ACEITÁVEL</h2>
<p>Você concorda em utilizar o serviço apenas para fins lícitos e de acordo com as seguintes condições:</p>
<p>{{uso_aceitavel}}</p>

<h2>4. PROPRIEDADE INTELECTUAL</h2>
<p>Todo o conteúdo presente no serviço, incluindo textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais e compilações de dados, é de propriedade de {{empresa}} ou de seus fornecedores de conteúdo e é protegido pelas leis de direitos autorais brasileiras e internacionais.</p>

<h2>5. LIMITAÇÕES DE RESPONSABILIDADE</h2>
<p>{{limitacoes}}</p>

<h2>6. MODIFICAÇÕES DOS TERMOS</h2>
<p>{{empresa}} reserva-se o direito de modificar estes termos a qualquer momento. As modificações entrarão em vigor imediatamente após sua publicação no serviço.</p>

<h2>7. PRIVACIDADE</h2>
<p>O uso do serviço está também sujeito à nossa Política de Privacidade, que descreve como coletamos, utilizamos e protegemos suas informações pessoais.</p>

<h2>8. RESCISÃO</h2>
<p>Podemos encerrar ou suspender seu acesso ao serviço imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar os Termos de Serviço.</p>

<h2>9. LEI APLICÁVEL</h2>
<p>Estes Termos serão regidos e interpretados de acordo com as leis de {{lei_aplicavel}}, sem considerar conflitos de disposições legais.</p>

<h2>10. FORO</h2>
<p>As partes elegem o foro da Comarca de {{cidade}}/{{estado}} para dirimir quaisquer questões oriundas destes termos.</p>

<h2>11. CONTATO</h2>
<p>Se você tiver dúvidas sobre estes Termos de Serviço, entre em contato conosco.</p>

<p style="margin-top: 3rem;"><strong>{{empresa}}</strong><br/>{{data_hoje}}</p>
`
    },
    {
        id: 'manutencao-tecnica',
        name: 'Contrato de Manutenção Técnica',
        description: 'Contrato para serviços recorrentes de manutenção e suporte técnico',
        fields: [
            { id: 'nome_cliente', label: 'Nome do Cliente', type: 'text', required: true },
            { id: 'cpf_cnpj_cliente', label: 'CPF/CNPJ do Cliente', type: 'text', required: true, mask: 'cpf_cnpj' },
            { id: 'nome_prestador', label: 'Nome do Prestador', type: 'text', required: true },
            { id: 'cpf_cnpj_prestador', label: 'CPF/CNPJ do Prestador', type: 'text', required: true, mask: 'cpf_cnpj' },
            { id: 'servicos_incluidos', label: 'Serviços Incluídos', type: 'textarea', required: true },
            { id: 'periodicidade', label: 'Periodicidade', type: 'text', required: true },
            { id: 'valor_mensal', label: 'Valor Mensal (R$)', type: 'number', required: true },
            { id: 'sla', label: 'SLA (Tempo de Resposta)', type: 'text', required: true },
            { id: 'vigencia', label: 'Vigência do Contrato', type: 'text', required: true },
            { id: 'cidade', label: 'Cidade', type: 'text', required: true },
            { id: 'estado', label: 'Estado', type: 'text', required: true }
        ],
        template: `
<h1>CONTRATO DE MANUTENÇÃO TÉCNICA</h1>

<p>Pelo presente instrumento particular, de um lado:</p>

<p><strong>CONTRATANTE:</strong> {{nome_cliente}}, inscrito no CPF/CNPJ sob o nº {{cpf_cnpj_cliente}};</p>

<p>E de outro lado:</p>

<p><strong>CONTRATADA:</strong> {{nome_prestador}}, inscrito no CPF/CNPJ sob o nº {{cpf_cnpj_prestador}};</p>

<p>Têm entre si justo e contratado o presente Contrato de Manutenção Técnica, que se regerá pelas seguintes cláusulas:</p>

<h2>CLÁUSULA PRIMEIRA - DO OBJETO</h2>
<p>O presente contrato tem por objeto a prestação de serviços de manutenção técnica, compreendendo:</p>
<p>{{servicos_incluidos}}</p>

<h2>CLÁUSULA SEGUNDA - DA PERIODICIDADE</h2>
<p>Os serviços de manutenção serão realizados com a seguinte periodicidade: {{periodicidade}}</p>

<h2>CLÁUSULA TERCEIRA - DO VALOR</h2>
<p>Pelos serviços objeto deste contrato, a CONTRATANTE pagará à CONTRATADA o valor mensal de R$ {{valor_mensal}} ({{valor_por_extenso}}).</p>

<h2>CLÁUSULA QUARTA - DO SLA (SERVICE LEVEL AGREEMENT)</h2>
<p>A CONTRATADA compromete-se a atender chamados e solicitações dentro do seguinte prazo: {{sla}}</p>

<h2>CLÁUSULA QUINTA - DA VIGÊNCIA</h2>
<p>O presente contrato terá vigência de {{vigencia}}, podendo ser renovado mediante acordo entre as partes.</p>

<h2>CLÁUSULA SEXTA - DAS OBRIGAÇÕES DA CONTRATADA</h2>
<p>a) Executar os serviços de manutenção com qualidade e dentro dos prazos estabelecidos;</p>
<p>b) Manter equipe técnica qualificada;</p>
<p>c) Disponibilizar canal de atendimento para abertura de chamados;</p>
<p>d) Manter sigilo sobre informações do CONTRATANTE.</p>

<h2>CLÁUSULA SÉTIMA - DAS OBRIGAÇÕES DO CONTRATANTE</h2>
<p>a) Efetuar o pagamento mensal na data estabelecida;</p>
<p>b) Fornecer acesso às instalações e sistemas quando necessário;</p>
<p>c) Designar responsável para interface com a CONTRATADA.</p>

<h2>CLÁUSULA OITAVA - DA RESCISÃO</h2>
<p>O contrato poderá ser rescindido por qualquer das partes mediante aviso prévio de 30 (trinta) dias.</p>

<h2>CLÁUSULA NONA - DO FORO</h2>
<p>As partes elegem o foro da Comarca de {{cidade}}/{{estado}} para dirimir quaisquer questões oriundas do presente contrato.</p>

<p>E por estarem assim justos e contratados, firmam o presente instrumento em duas vias de igual teor.</p>

<p style="text-align: center; margin-top: 3rem;">{{cidade}}/{{estado}}, {{data_hoje}}</p>

<div class="signature-section">
    <div class="signature-box">
        <div class="signature-line">{{nome_cliente}}</div>
        <p>CONTRATANTE</p>
    </div>
    <div class="signature-box">
        <div class="signature-line">{{nome_prestador}}</div>
        <p>CONTRATADA</p>
    </div>
</div>
`
    },
    {
        id: 'termo-aceite',
        name: 'Termo de Aceite de Projeto',
        description: 'Documento formal de aceite e aprovação de entregas de projeto',
        fields: [
            { id: 'nome_cliente', label: 'Nome do Cliente', type: 'text', required: true },
            { id: 'nome_projeto', label: 'Nome do Projeto', type: 'text', required: true },
            { id: 'entregas', label: 'Descrição das Entregas', type: 'textarea', required: true },
            { id: 'data_entrega', label: 'Data da Entrega', type: 'date', required: true },
            { id: 'observacoes', label: 'Observações', type: 'textarea', required: false },
            { id: 'empresa', label: 'Nome da Empresa', type: 'text', required: true }
        ],
        template: `
<h1>TERMO DE ACEITE DE PROJETO</h1>

<p><strong>Projeto:</strong> {{nome_projeto}}</p>
<p><strong>Cliente:</strong> {{nome_cliente}}</p>
<p><strong>Data de Entrega:</strong> {{data_entrega}}</p>

<h2>1. ENTREGAS REALIZADAS</h2>
<p>Foram entregues os seguintes itens/funcionalidades conforme escopo acordado:</p>
<p>{{entregas}}</p>

<h2>2. DECLARAÇÃO DE ACEITE</h2>
<p>Eu, <strong>{{nome_cliente}}</strong>, declaro que:</p>
<p>a) Recebi todas as entregas listadas acima;</p>
<p>b) As entregas estão em conformidade com o escopo acordado;</p>
<p>c) Aprovo formalmente o projeto conforme entregue;</p>
<p>d) Autorizo o faturamento/pagamento conforme contratado.</p>

<h2>3. OBSERVAÇÕES</h2>
<p>{{observacoes}}</p>

<h2>4. SUPORTE PÓS-ENTREGA</h2>
<p>Eventuais ajustes ou correções identificados após este aceite serão tratados conforme condições estabelecidas no contrato principal ou mediante novo orçamento.</p>

<p style="margin-top: 3rem;"><strong>Empresa Desenvolvedora:</strong> {{empresa}}</p>

<p style="text-align: center; margin-top: 3rem;">{{data_hoje}}</p>

<div class="signature-section">
    <div class="signature-box">
        <div class="signature-line">{{nome_cliente}}</div>
        <p>CLIENTE<br/>(Aprovação e Aceite)</p>
    </div>
    <div class="signature-box">
        <div class="signature-line">{{empresa}}</div>
        <p>EMPRESA</p>
    </div>
</div>
`
    }
];

// ===== CLÁUSULAS PRÉ-DEFINIDAS =====
const DEFAULT_CLAUSES = [
    {
        id: 'pag-vista',
        category: 'pagamento',
        name: 'Pagamento à Vista',
        text: 'O pagamento será realizado integralmente, em uma única parcela, mediante transferência bancária ou PIX, no prazo de até 5 (cinco) dias úteis após a entrega/conclusão dos serviços.'
    },
    {
        id: 'pag-parcelado',
        category: 'pagamento',
        name: 'Pagamento Parcelado',
        text: 'O pagamento será dividido em [X] parcelas mensais e iguais de R$ [valor], com vencimento todo dia [dia] de cada mês, sendo a primeira parcela devida em [data].'
    },
    {
        id: 'pag-recorrente',
        category: 'pagamento',
        name: 'Pagamento Recorrente Mensal',
        text: 'O pagamento será realizado mensalmente, no valor de R$ [valor], com vencimento todo dia [dia] de cada mês, mediante débito automático ou boleto bancário.'
    },
    {
        id: 'resc-justa-causa',
        category: 'rescisao',
        name: 'Rescisão com Justa Causa',
        text: 'O presente contrato poderá ser rescindido imediatamente, sem ônus, nas seguintes hipóteses: a) descumprimento de cláusulas contratuais; b) falência ou insolvência de qualquer das partes; c) prática de atos ilícitos.'
    },
    {
        id: 'resc-multa',
        category: 'rescisao',
        name: 'Rescisão com Multa',
        text: 'Em caso de rescisão antecipada sem justa causa, a parte que der causa ao rompimento pagará à outra multa equivalente a [percentual]% do valor total do contrato.'
    },
    {
        id: 'conf-total',
        category: 'confidencialidade',
        name: 'Confidencialidade Total',
        text: 'As partes comprometem-se a manter em sigilo absoluto todas as informações técnicas, comerciais, estratégicas e operacionais trocadas durante a vigência deste acordo, sob pena de indenização por danos causados.'
    },
    {
        id: 'prop-transferencia',
        category: 'propriedade',
        name: 'Transferência Total de Propriedade Intelectual',
        text: 'Todos os direitos de propriedade intelectual sobre os trabalhos desenvolvidos serão transferidos integralmente ao CONTRATANTE após o pagamento total do valor acordado.'
    },
    {
        id: 'prop-licenciamento',
        category: 'propriedade',
        name: 'Licenciamento de Uso',
        text: 'O CONTRATANTE receberá licença não-exclusiva e intransferível para uso dos materiais desenvolvidos, permanecendo os direitos de propriedade intelectual com o CONTRATADO.'
    },
    {
        id: 'resp-cliente',
        category: 'responsabilidades',
        name: 'Responsabilidades do Cliente',
        text: 'O CONTRATANTE é responsável por: fornecer informações precisas e atualizadas; disponibilizar recursos necessários; aprovar entregas nos prazos estabelecidos; efetuar pagamentos pontualmente.'
    },
    {
        id: 'resp-prestador',
        category: 'responsabilidades',
        name: 'Responsabilidades do Prestador',
        text: 'O CONTRATADO é responsável por: executar os serviços com qualidade profissional; cumprir prazos acordados; manter comunicação clara e frequente; garantir confidencialidade das informações.'
    },
    {
        id: 'foro-sp',
        category: 'foro',
        name: 'Foro de São Paulo/SP',
        text: 'As partes elegem o foro da Comarca de São Paulo/SP para dirimir quaisquer questões oriundas do presente contrato, renunciando expressamente a qualquer outro, por mais privilegiado que seja.'
    },
    {
        id: 'foro-rj',
        category: 'foro',
        name: 'Foro do Rio de Janeiro/RJ',
        text: 'As partes elegem o foro da Comarca do Rio de Janeiro/RJ para dirimir quaisquer questões oriundas do presente contrato, renunciando expressamente a qualquer outro, por mais privilegiado que seja.'
    }
];

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initializeTabs();
    initializeEventListeners();
    renderTemplates();
    renderClients();
    renderClauses();
    renderDocuments();
});

// ===== GERENCIAMENTO DE DADOS (localStorage) =====
function loadData() {
    state.templates = DEFAULT_TEMPLATES;
    state.clients = JSON.parse(localStorage.getItem('fp_legal_clients') || '[]');
    state.clauses = JSON.parse(localStorage.getItem('fp_legal_clauses') || '[]');

    // Adicionar cláusulas padrão se não existirem
    if (state.clauses.length === 0) {
        state.clauses = DEFAULT_CLAUSES;
        saveData('clauses');
    }

    state.documents = JSON.parse(localStorage.getItem('fp_legal_documents') || '[]');
}

function saveData(type) {
    if (type === 'clients') {
        localStorage.setItem('fp_legal_clients', JSON.stringify(state.clients));
    } else if (type === 'clauses') {
        localStorage.setItem('fp_legal_clauses', JSON.stringify(state.clauses));
    } else if (type === 'documents') {
        localStorage.setItem('fp_legal_documents', JSON.stringify(state.documents));
    }
}

// ===== NAVEGAÇÃO POR TABS =====
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            switchTab(targetTab);
        });
    });
}

function switchTab(tabName) {
    // Remover active de todos
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Adicionar active ao selecionado
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

// ===== EVENT LISTENERS =====
function initializeEventListeners() {
    // Criar Documento
    document.getElementById('templateSelect').addEventListener('change', handleTemplateSelect);
    document.getElementById('clientSelect').addEventListener('change', handleClientSelect);
    document.getElementById('watermarkToggle').addEventListener('change', toggleWatermark);
    document.getElementById('btnSaveDraft').addEventListener('click', () => saveDocument('draft'));
    document.getElementById('btnFinalize').addEventListener('click', () => saveDocument('finalized'));
    document.getElementById('btnExportHTML').addEventListener('click', exportHTML);
    document.getElementById('btnPrint').addEventListener('click', printDocument);
    document.getElementById('btnFullscreen').addEventListener('click', toggleFullscreen);

    // Biblioteca
    document.getElementById('btnExportAll').addEventListener('click', exportAllDocuments);
    document.getElementById('btnImportDocs').addEventListener('click', () => document.getElementById('importFileInput').click());
    document.getElementById('importFileInput').addEventListener('change', importDocuments);

    // Filtros
    document.getElementById('searchDocs').addEventListener('input', filterDocuments);
    document.getElementById('filterTemplate').addEventListener('change', filterDocuments);
    document.getElementById('filterStatus').addEventListener('change', filterDocuments);
    document.getElementById('filterClient').addEventListener('change', filterDocuments);
    document.getElementById('filterDateFrom').addEventListener('change', filterDocuments);
    document.getElementById('filterDateTo').addEventListener('change', filterDocuments);

    // Clientes
    document.getElementById('btnNewClient').addEventListener('click', () => openClientModal());
    document.getElementById('clientForm').addEventListener('submit', handleClientSubmit);

    // Cláusulas
    document.getElementById('btnNewClause').addEventListener('click', () => openClauseModal());
    document.getElementById('clauseForm').addEventListener('submit', handleClauseSubmit);
    document.getElementById('clauseCategorySelect').addEventListener('change', handleClauseCategorySelect);

    // Modais
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });

    // Fechar modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModals();
        }
    });
}

// ===== RENDERIZAÇÃO DE TEMPLATES =====
function renderTemplates() {
    const grid = document.getElementById('templatesGrid');
    const select = document.getElementById('templateSelect');
    const filterSelect = document.getElementById('filterTemplate');

    grid.innerHTML = '';
    select.innerHTML = '<option value="">-- Escolha um template --</option>';
    filterSelect.innerHTML = '<option value="">Todos os Templates</option>';

    state.templates.forEach(template => {
        // Card no grid
        const card = document.createElement('div');
        card.className = 'template-card';
        card.innerHTML = `
            <h3>${template.name}</h3>
            <p>${template.description}</p>
            <div class="template-fields">
                <strong>Campos:</strong> ${template.fields.length} campos
            </div>
            <button class="btn btn-primary" onclick="selectTemplate('${template.id}')">
                Usar Template
            </button>
        `;
        grid.appendChild(card);

        // Option no select
        const option = document.createElement('option');
        option.value = template.id;
        option.textContent = template.name;
        select.appendChild(option);

        // Option no filtro
        const filterOption = document.createElement('option');
        filterOption.value = template.id;
        filterOption.textContent = template.name;
        filterSelect.appendChild(filterOption);
    });
}

// ===== SELEÇÃO E PREENCHIMENTO DE TEMPLATE =====
function selectTemplate(templateId) {
    switchTab('create');
    document.getElementById('templateSelect').value = templateId;
    handleTemplateSelect();
}

function handleTemplateSelect() {
    const templateId = document.getElementById('templateSelect').value;

    if (!templateId) {
        document.getElementById('documentForm').innerHTML = '';
        document.getElementById('clientSelectContainer').style.display = 'none';
        document.getElementById('clausesSection').style.display = 'none';
        updatePreview();
        return;
    }

    state.currentTemplate = state.templates.find(t => t.id === templateId);

    // Mostrar seletor de cliente
    document.getElementById('clientSelectContainer').style.display = 'block';
    document.getElementById('clausesSection').style.display = 'block';

    // Renderizar formulário
    renderDocumentForm();
    updatePreview();
}

function renderDocumentForm() {
    const form = document.getElementById('documentForm');
    form.innerHTML = '';

    state.currentTemplate.fields.forEach(field => {
        const group = document.createElement('div');
        group.className = 'form-group';

        const label = document.createElement('label');
        label.textContent = field.label + (field.required ? ' *' : '');
        label.setAttribute('for', field.id);
        group.appendChild(label);

        let input;
        if (field.type === 'textarea') {
            input = document.createElement('textarea');
            input.rows = 4;
        } else {
            input = document.createElement('input');
            input.type = field.type;
        }

        input.id = field.id;
        input.name = field.id;
        input.required = field.required;

        // Adicionar máscaras
        if (field.mask === 'cpf_cnpj') {
            input.addEventListener('input', applyCpfCnpjMask);
        }

        // Atualizar preview ao digitar
        input.addEventListener('input', updatePreview);

        group.appendChild(input);
        form.appendChild(group);
    });
}

// ===== SELEÇÃO DE CLIENTE PARA AUTO-PREENCHIMENTO =====
function handleClientSelect() {
    const clientId = document.getElementById('clientSelect').value;

    if (!clientId) return;

    const client = state.clients.find(c => c.id === clientId);

    if (!client) return;

    // Auto-preencher campos
    const mappings = {
        'nome_contratante': client.name,
        'cpf_cnpj_contratante': client.doc,
        'endereco_contratante': client.address,
        'nome_cliente': client.name,
        'cpf_cnpj_cliente': client.doc
    };

    Object.keys(mappings).forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && mappings[fieldId]) {
            field.value = mappings[fieldId];
        }
    });

    updatePreview();
}

// ===== PREVIEW EM TEMPO REAL =====
function updatePreview() {
    const previewContent = document.getElementById('previewContent');

    if (!state.currentTemplate) {
        previewContent.innerHTML = '<p class="preview-placeholder">Selecione um template e preencha os campos para visualizar o documento.</p>';
        return;
    }

    let html = state.currentTemplate.template;

    // Coletar valores do formulário
    const formData = {};
    state.currentTemplate.fields.forEach(field => {
        const input = document.getElementById(field.id);
        formData[field.id] = input ? input.value : '';
    });

    // Adicionar data de hoje
    formData['data_hoje'] = formatDate(new Date());

    // Converter valor para extenso
    if (formData['valor'] || formData['investimento']) {
        const valor = parseFloat(formData['valor'] || formData['investimento'] || 0);
        formData['valor_por_extenso'] = numeroParaExtenso(valor);
    }

    // Substituir variáveis
    Object.keys(formData).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, formData[key] || `[${key}]`);
    });

    previewContent.innerHTML = html;
}

// ===== WATERMARK =====
function toggleWatermark() {
    const watermark = document.getElementById('watermark');
    const isChecked = document.getElementById('watermarkToggle').checked;
    watermark.classList.toggle('active', isChecked);
}

// ===== SALVAMENTO DE DOCUMENTOS =====
function saveDocument(status) {
    if (!state.currentTemplate) {
        alert('Selecione um template primeiro!');
        return;
    }

    // Validar campos obrigatórios
    const form = document.getElementById('documentForm');
    if (!form.checkValidity()) {
        alert('Preencha todos os campos obrigatórios!');
        form.reportValidity();
        return;
    }

    // Coletar dados
    const formData = {};
    state.currentTemplate.fields.forEach(field => {
        const input = document.getElementById(field.id);
        formData[field.id] = input ? input.value : '';
    });

    const document = {
        id: state.currentDocument ? state.currentDocument.id : Date.now().toString(),
        name: prompt('Nome do documento:', formData[state.currentTemplate.fields[0].id] || 'Novo Documento'),
        templateId: state.currentTemplate.id,
        templateName: state.currentTemplate.name,
        status: status,
        data: formData,
        createdAt: state.currentDocument ? state.currentDocument.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    if (!document.name) return;

    // Salvar ou atualizar
    const index = state.documents.findIndex(d => d.id === document.id);
    if (index >= 0) {
        state.documents[index] = document;
    } else {
        state.documents.push(document);
    }

    saveData('documents');
    renderDocuments();

    alert(`Documento ${status === 'draft' ? 'salvo como rascunho' : 'finalizado'} com sucesso!`);

    state.currentDocument = null;
}

// ===== EXPORTAÇÃO =====
function exportHTML() {
    const previewContent = document.getElementById('previewContent').innerHTML;

    if (!previewContent || previewContent.includes('preview-placeholder')) {
        alert('Preencha o documento primeiro!');
        return;
    }

    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documento Legal</title>
    <style>
        body {
            font-family: 'Times New Roman', Times, serif;
            max-width: 800px;
            margin: 2rem auto;
            padding: 2rem;
            line-height: 1.8;
            color: #000;
        }
        h1 {
            text-align: center;
            font-size: 1.5rem;
            margin-bottom: 2rem;
            text-transform: uppercase;
        }
        h2 {
            font-size: 1.2rem;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
        }
        p {
            margin-bottom: 1rem;
            text-align: justify;
        }
        .signature-section {
            margin-top: 3rem;
            display: flex;
            justify-content: space-around;
            text-align: center;
        }
        .signature-box {
            flex: 1;
            margin: 0 1rem;
        }
        .signature-line {
            border-top: 1px solid #000;
            margin-bottom: 0.5rem;
            padding-top: 0.5rem;
        }
    </style>
</head>
<body>
${previewContent}
</body>
</html>
`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documento-legal.html';
    a.click();
    URL.revokeObjectURL(url);
}

function printDocument() {
    window.print();
}

function toggleFullscreen() {
    const previewPanel = document.querySelector('.preview-panel');
    previewPanel.classList.toggle('fullscreen-mode');
}

// ===== CLIENTES =====
function renderClients() {
    const list = document.getElementById('clientsList');
    const select = document.getElementById('clientSelect');
    const filterSelect = document.getElementById('filterClient');

    list.innerHTML = '';
    select.innerHTML = '<option value="">-- Auto-preencher com cliente --</option>';
    filterSelect.innerHTML = '<option value="">Todos os Clientes</option>';

    if (state.clients.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">Nenhum cliente cadastrado.</p>';
        return;
    }

    state.clients.forEach(client => {
        // Card
        const card = document.createElement('div');
        card.className = 'client-card';
        card.innerHTML = `
            <h3>${client.name}</h3>
            <p><strong>CPF/CNPJ:</strong> ${client.doc}</p>
            <p><strong>Endereço:</strong> ${client.address || 'N/A'}</p>
            <p><strong>Email:</strong> ${client.email || 'N/A'}</p>
            <p><strong>Telefone:</strong> ${client.phone || 'N/A'}</p>
            ${client.notes ? `<p><strong>Notas:</strong> ${client.notes}</p>` : ''}
            <div class="client-actions">
                <button class="btn btn-secondary" onclick="editClient('${client.id}')">✏️ Editar</button>
                <button class="btn btn-secondary" onclick="deleteClient('${client.id}')">🗑️ Excluir</button>
            </div>
        `;
        list.appendChild(card);

        // Options
        const option = document.createElement('option');
        option.value = client.id;
        option.textContent = client.name;
        select.appendChild(option);

        const filterOption = document.createElement('option');
        filterOption.value = client.id;
        filterOption.textContent = client.name;
        filterSelect.appendChild(filterOption);
    });
}

function openClientModal(clientId = null) {
    const modal = document.getElementById('clientModal');
    const form = document.getElementById('clientForm');
    const title = document.getElementById('clientModalTitle');

    form.reset();

    if (clientId) {
        const client = state.clients.find(c => c.id === clientId);
        if (client) {
            title.textContent = 'Editar Cliente';
            document.getElementById('clientId').value = client.id;
            document.getElementById('clientName').value = client.name;
            document.getElementById('clientDoc').value = client.doc;
            document.getElementById('clientAddress').value = client.address || '';
            document.getElementById('clientEmail').value = client.email || '';
            document.getElementById('clientPhone').value = client.phone || '';
            document.getElementById('clientNotes').value = client.notes || '';
        }
    } else {
        title.textContent = 'Novo Cliente';
    }

    modal.classList.add('active');
}

function handleClientSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('clientId').value || Date.now().toString();
    const client = {
        id,
        name: document.getElementById('clientName').value,
        doc: document.getElementById('clientDoc').value,
        address: document.getElementById('clientAddress').value,
        email: document.getElementById('clientEmail').value,
        phone: document.getElementById('clientPhone').value,
        notes: document.getElementById('clientNotes').value
    };

    // Validar CPF/CNPJ
    if (!validateCpfCnpj(client.doc)) {
        alert('CPF/CNPJ inválido!');
        return;
    }

    const index = state.clients.findIndex(c => c.id === id);
    if (index >= 0) {
        state.clients[index] = client;
    } else {
        state.clients.push(client);
    }

    saveData('clients');
    renderClients();
    closeModals();
}

function editClient(id) {
    openClientModal(id);
}

function deleteClient(id) {
    if (!confirm('Deseja realmente excluir este cliente?')) return;

    state.clients = state.clients.filter(c => c.id !== id);
    saveData('clients');
    renderClients();
}

// ===== CLÁUSULAS =====
function renderClauses() {
    const container = document.getElementById('clausesCategories');
    const select = document.getElementById('clauseCategorySelect');

    container.innerHTML = '';
    select.innerHTML = '<option value="">-- Escolha uma categoria --</option>';

    const categories = {
        'pagamento': 'Pagamento',
        'rescisao': 'Rescisão',
        'confidencialidade': 'Confidencialidade',
        'propriedade': 'Propriedade Intelectual',
        'responsabilidades': 'Responsabilidades',
        'foro': 'Foro e Legislação'
    };

    Object.keys(categories).forEach(catKey => {
        const clauses = state.clauses.filter(c => c.category === catKey);

        if (clauses.length === 0) return;

        const section = document.createElement('div');
        section.className = 'clause-category';
        section.innerHTML = `<h3>${categories[catKey]}</h3>`;

        clauses.forEach(clause => {
            const item = document.createElement('div');
            item.className = 'clause-item';
            item.innerHTML = `
                <h4>${clause.name}</h4>
                <p>${clause.text}</p>
                <div class="clause-item-actions">
                    <button class="btn btn-secondary" onclick="editClause('${clause.id}')">✏️ Editar</button>
                    <button class="btn btn-secondary" onclick="deleteClause('${clause.id}')">🗑️ Excluir</button>
                </div>
            `;
            section.appendChild(item);
        });

        container.appendChild(section);

        // Option no select
        const option = document.createElement('option');
        option.value = catKey;
        option.textContent = categories[catKey];
        select.appendChild(option);
    });
}

function handleClauseCategorySelect() {
    const category = document.getElementById('clauseCategorySelect').value;
    const list = document.getElementById('clausesList');

    list.innerHTML = '';

    if (!category) return;

    const clauses = state.clauses.filter(c => c.category === category);

    clauses.forEach(clause => {
        const item = document.createElement('div');
        item.className = 'clause-item';
        item.innerHTML = `
            <h4>${clause.name}</h4>
            <p>${clause.text}</p>
            <button class="btn btn-primary" onclick="insertClause('${clause.id}')">
                + Inserir no Documento
            </button>
        `;
        list.appendChild(item);
    });
}

function insertClause(clauseId) {
    const clause = state.clauses.find(c => c.id === clauseId);
    if (!clause) return;

    // Inserir no final do preview (antes das assinaturas)
    const previewContent = document.getElementById('previewContent');
    const signatureSection = previewContent.querySelector('.signature-section');

    const clauseHtml = `
        <h2>${clause.name}</h2>
        <p>${clause.text}</p>
    `;

    if (signatureSection) {
        signatureSection.insertAdjacentHTML('beforebegin', clauseHtml);
    } else {
        previewContent.insertAdjacentHTML('beforeend', clauseHtml);
    }
}

function openClauseModal(clauseId = null) {
    const modal = document.getElementById('clauseModal');
    const form = document.getElementById('clauseForm');
    const title = document.getElementById('clauseModalTitle');

    form.reset();

    if (clauseId) {
        const clause = state.clauses.find(c => c.id === clauseId);
        if (clause) {
            title.textContent = 'Editar Cláusula';
            document.getElementById('clauseId').value = clause.id;
            document.getElementById('clauseName').value = clause.name;
            document.getElementById('clauseCategory').value = clause.category;
            document.getElementById('clauseText').value = clause.text;
        }
    } else {
        title.textContent = 'Nova Cláusula';
    }

    modal.classList.add('active');
}

function handleClauseSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('clauseId').value || Date.now().toString();
    const clause = {
        id,
        name: document.getElementById('clauseName').value,
        category: document.getElementById('clauseCategory').value,
        text: document.getElementById('clauseText').value
    };

    const index = state.clauses.findIndex(c => c.id === id);
    if (index >= 0) {
        state.clauses[index] = clause;
    } else {
        state.clauses.push(clause);
    }

    saveData('clauses');
    renderClauses();
    closeModals();
}

function editClause(id) {
    openClauseModal(id);
}

function deleteClause(id) {
    if (!confirm('Deseja realmente excluir esta cláusula?')) return;

    state.clauses = state.clauses.filter(c => c.id !== id);
    saveData('clauses');
    renderClauses();
}

// ===== BIBLIOTECA DE DOCUMENTOS =====
function renderDocuments() {
    const list = document.getElementById('documentsList');

    let documents = [...state.documents];

    // Aplicar filtros
    const search = document.getElementById('searchDocs').value.toLowerCase();
    const filterTemplate = document.getElementById('filterTemplate').value;
    const filterStatus = document.getElementById('filterStatus').value;
    const filterClient = document.getElementById('filterClient').value;
    const filterDateFrom = document.getElementById('filterDateFrom').value;
    const filterDateTo = document.getElementById('filterDateTo').value;

    if (search) {
        documents = documents.filter(doc =>
            doc.name.toLowerCase().includes(search) ||
            doc.templateName.toLowerCase().includes(search)
        );
    }

    if (filterTemplate) {
        documents = documents.filter(doc => doc.templateId === filterTemplate);
    }

    if (filterStatus) {
        documents = documents.filter(doc => doc.status === filterStatus);
    }

    if (filterDateFrom) {
        documents = documents.filter(doc => new Date(doc.createdAt) >= new Date(filterDateFrom));
    }

    if (filterDateTo) {
        documents = documents.filter(doc => new Date(doc.createdAt) <= new Date(filterDateTo));
    }

    list.innerHTML = '';

    if (documents.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">Nenhum documento encontrado.</p>';
        return;
    }

    documents.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    documents.forEach(doc => {
        const item = document.createElement('div');
        item.className = 'document-item';

        const statusLabels = {
            draft: 'Rascunho',
            finalized: 'Finalizado',
            sent: 'Enviado',
            signed: 'Assinado'
        };

        item.innerHTML = `
            <div class="document-info">
                <h3>${doc.name}</h3>
                <div class="document-meta">
                    <span><strong>Template:</strong> ${doc.templateName}</span>
                    <span><strong>Criado:</strong> ${formatDate(new Date(doc.createdAt))}</span>
                    <span><strong>Atualizado:</strong> ${formatDate(new Date(doc.updatedAt))}</span>
                    <span class="status-badge ${doc.status}">${statusLabels[doc.status]}</span>
                </div>
            </div>
            <div class="document-actions">
                <button class="btn btn-secondary" onclick="viewDocument('${doc.id}')">👁️ Ver</button>
                <button class="btn btn-secondary" onclick="editDocument('${doc.id}')">✏️ Editar</button>
                <button class="btn btn-secondary" onclick="duplicateDocument('${doc.id}')">📋 Duplicar</button>
                <button class="btn btn-secondary" onclick="changeDocumentStatus('${doc.id}')">🔄 Status</button>
                <button class="btn btn-secondary" onclick="deleteDocument('${doc.id}')">🗑️ Excluir</button>
            </div>
        `;

        list.appendChild(item);
    });
}

function filterDocuments() {
    renderDocuments();
}

function viewDocument(id) {
    const doc = state.documents.find(d => d.id === id);
    if (!doc) return;

    const template = state.templates.find(t => t.id === doc.templateId);
    if (!template) return;

    // Gerar HTML do documento
    let html = template.template;
    const formData = { ...doc.data, data_hoje: formatDate(new Date()) };

    if (formData['valor'] || formData['investimento']) {
        const valor = parseFloat(formData['valor'] || formData['investimento'] || 0);
        formData['valor_por_extenso'] = numeroParaExtenso(valor);
    }

    Object.keys(formData).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, formData[key] || `[${key}]`);
    });

    // Mostrar modal
    document.getElementById('viewDocTitle').textContent = doc.name;
    document.getElementById('viewDocTemplate').textContent = doc.templateName;
    document.getElementById('viewDocDate').textContent = formatDate(new Date(doc.createdAt));

    const statusLabels = {
        draft: 'Rascunho',
        finalized: 'Finalizado',
        sent: 'Enviado',
        signed: 'Assinado'
    };
    document.getElementById('viewDocStatus').innerHTML = `<span class="status-badge ${doc.status}">${statusLabels[doc.status]}</span>`;
    document.getElementById('viewDocContent').innerHTML = html;

    // Event listeners para botões do modal
    document.getElementById('btnEditDoc').onclick = () => {
        closeModals();
        editDocument(id);
    };
    document.getElementById('btnDuplicateDoc').onclick = () => {
        closeModals();
        duplicateDocument(id);
    };
    document.getElementById('btnPrintDoc').onclick = () => {
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${doc.name}</title>
                <style>
                    body { font-family: 'Times New Roman', serif; padding: 2rem; line-height: 1.8; }
                    h1 { text-align: center; }
                    p { text-align: justify; }
                </style>
            </head>
            <body>${html}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    document.getElementById('viewDocModal').classList.add('active');
}

function editDocument(id) {
    const doc = state.documents.find(d => d.id === id);
    if (!doc) return;

    state.currentDocument = doc;

    switchTab('create');
    document.getElementById('templateSelect').value = doc.templateId;
    handleTemplateSelect();

    // Preencher campos
    setTimeout(() => {
        Object.keys(doc.data).forEach(key => {
            const field = document.getElementById(key);
            if (field) {
                field.value = doc.data[key];
            }
        });
        updatePreview();
    }, 100);
}

function duplicateDocument(id) {
    const doc = state.documents.find(d => d.id === id);
    if (!doc) return;

    const newDoc = {
        ...doc,
        id: Date.now().toString(),
        name: doc.name + ' (Cópia)',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'draft'
    };

    state.documents.push(newDoc);
    saveData('documents');
    renderDocuments();

    alert('Documento duplicado com sucesso!');
}

function changeDocumentStatus(id) {
    const doc = state.documents.find(d => d.id === id);
    if (!doc) return;

    const newStatus = prompt('Novo status (draft, finalized, sent, signed):', doc.status);

    if (!newStatus || !['draft', 'finalized', 'sent', 'signed'].includes(newStatus)) {
        alert('Status inválido!');
        return;
    }

    doc.status = newStatus;
    doc.updatedAt = new Date().toISOString();

    saveData('documents');
    renderDocuments();
}

function deleteDocument(id) {
    if (!confirm('Deseja realmente excluir este documento?')) return;

    state.documents = state.documents.filter(d => d.id !== id);
    saveData('documents');
    renderDocuments();
}

// ===== EXPORT/IMPORT =====
function exportAllDocuments() {
    const data = {
        documents: state.documents,
        clients: state.clients,
        clauses: state.clauses,
        exportDate: new Date().toISOString()
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fp-legal-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importDocuments(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);

            if (confirm('Deseja importar os dados? Isso irá substituir os dados atuais.')) {
                if (data.documents) state.documents = data.documents;
                if (data.clients) state.clients = data.clients;
                if (data.clauses) state.clauses = data.clauses;

                saveData('documents');
                saveData('clients');
                saveData('clauses');

                renderDocuments();
                renderClients();
                renderClauses();

                alert('Dados importados com sucesso!');
            }
        } catch (error) {
            alert('Erro ao importar arquivo: ' + error.message);
        }
    };
    reader.readAsText(file);
}

// ===== MODAIS =====
function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// ===== UTILITÁRIOS =====
function formatDate(date) {
    return date.toLocaleDateString('pt-BR');
}

function applyCpfCnpjMask(e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length <= 11) {
        // CPF
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
        // CNPJ
        value = value.replace(/^(\d{2})(\d)/, '$1.$2');
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }

    e.target.value = value;
}

function validateCpfCnpj(value) {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length === 11) {
        // Validação básica de CPF
        return /^\d{11}$/.test(numbers);
    } else if (numbers.length === 14) {
        // Validação básica de CNPJ
        return /^\d{14}$/.test(numbers);
    }

    return false;
}

function numeroParaExtenso(valor) {
    // Implementação simplificada
    if (!valor || valor === 0) return 'zero reais';

    const partes = valor.toFixed(2).split('.');
    const reais = parseInt(partes[0]);
    const centavos = parseInt(partes[1]);

    const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
    const dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
    const especiais = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
    const centenas = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

    function converter(num) {
        if (num === 0) return '';
        if (num < 10) return unidades[num];
        if (num < 20) return especiais[num - 10];
        if (num < 100) {
            const dez = Math.floor(num / 10);
            const un = num % 10;
            return dezenas[dez] + (un ? ' e ' + unidades[un] : '');
        }
        if (num < 1000) {
            const cent = Math.floor(num / 100);
            const resto = num % 100;
            if (num === 100) return 'cem';
            return centenas[cent] + (resto ? ' e ' + converter(resto) : '');
        }
        if (num < 1000000) {
            const mil = Math.floor(num / 1000);
            const resto = num % 1000;
            const milExtenso = mil === 1 ? 'mil' : converter(mil) + ' mil';
            return milExtenso + (resto ? ' e ' + converter(resto) : '');
        }

        return num.toString();
    }

    let extenso = converter(reais) + ' ' + (reais === 1 ? 'real' : 'reais');

    if (centavos > 0) {
        extenso += ' e ' + converter(centavos) + ' ' + (centavos === 1 ? 'centavo' : 'centavos');
    }

    return extenso;
}
