// FP Keyword Research Organizer - App Logic

class KeywordOrganizer {
    constructor() {
        this.keywords = [];
        this.editingId = null;
        this.currentTab = 'all';
        this.sortField = null;
        this.sortDirection = 'asc';

        this.init();
    }

    init() {
        this.loadKeywords();
        this.updateDashboard();
        this.renderKeywords();
        this.renderOpportunities();
        this.setupEventListeners();
    }

    // ==================== STORAGE ====================

    loadKeywords() {
        const stored = localStorage.getItem('fpKeywords');
        this.keywords = stored ? JSON.parse(stored) : [];
    }

    saveToStorage() {
        localStorage.setItem('fpKeywords', JSON.stringify(this.keywords));
    }

    // ==================== CRUD OPERATIONS ====================

    createKeyword(data) {
        const keyword = {
            id: Date.now().toString(),
            keyword: data.keyword,
            volume: parseInt(data.volume) || 0,
            difficulty: data.difficulty,
            intent: data.intent,
            targetUrl: data.targetUrl || '',
            site: data.site,
            currentPosition: parseInt(data.currentPosition) || null,
            targetPosition: parseInt(data.targetPosition) || null,
            status: data.status,
            lastCheck: data.lastCheck || '',
            competitors: data.competitors || '',
            notes: data.notes || '',
            createdAt: new Date().toISOString(),
            history: []
        };

        // Add to history if position is set
        if (keyword.currentPosition) {
            keyword.history.push({
                date: new Date().toISOString(),
                position: keyword.currentPosition
            });
        }

        this.keywords.unshift(keyword);
        this.saveToStorage();
        return keyword;
    }

    updateKeyword(id, data) {
        const index = this.keywords.findIndex(k => k.id === id);
        if (index !== -1) {
            const oldPosition = this.keywords[index].currentPosition;
            const newPosition = parseInt(data.currentPosition) || null;

            // Update keyword
            this.keywords[index] = {
                ...this.keywords[index],
                keyword: data.keyword,
                volume: parseInt(data.volume) || 0,
                difficulty: data.difficulty,
                intent: data.intent,
                targetUrl: data.targetUrl || '',
                site: data.site,
                currentPosition: newPosition,
                targetPosition: parseInt(data.targetPosition) || null,
                status: data.status,
                lastCheck: data.lastCheck || '',
                competitors: data.competitors || '',
                notes: data.notes || ''
            };

            // Add to history if position changed
            if (newPosition && newPosition !== oldPosition) {
                this.keywords[index].history.push({
                    date: new Date().toISOString(),
                    position: newPosition
                });

                // Keep only last 10 entries
                if (this.keywords[index].history.length > 10) {
                    this.keywords[index].history = this.keywords[index].history.slice(-10);
                }
            }

            this.saveToStorage();
            return this.keywords[index];
        }
        return null;
    }

    deleteKeyword(id) {
        if (confirm('Tem certeza que deseja excluir esta keyword?')) {
            this.keywords = this.keywords.filter(k => k.id !== id);
            this.saveToStorage();
            this.updateDashboard();
            this.renderKeywords();
            this.renderOpportunities();
        }
    }

    duplicateKeyword(id) {
        const keyword = this.keywords.find(k => k.id === id);
        if (keyword) {
            const duplicate = {
                ...keyword,
                id: Date.now().toString(),
                keyword: `${keyword.keyword} (cópia)`,
                createdAt: new Date().toISOString(),
                history: []
            };
            this.keywords.unshift(duplicate);
            this.saveToStorage();
            this.updateDashboard();
            this.renderKeywords();
        }
    }

    getKeyword(id) {
        return this.keywords.find(k => k.id === id);
    }

    // ==================== DASHBOARD STATISTICS ====================

    updateDashboard() {
        const total = this.keywords.length;
        const topTen = this.keywords.filter(k => k.currentPosition && k.currentPosition <= 10).length;
        const progress = this.keywords.filter(k => k.status === 'Em Progresso').length;
        const toWork = this.keywords.filter(k => k.status === 'A Trabalhar').length;
        const volume = this.keywords.reduce((sum, k) => sum + (k.volume || 0), 0);

        // Average difficulty
        const difficultyMap = { 'Baixa': 1, 'Média': 2, 'Alta': 3, 'Muito Alta': 4 };
        const avgDiff = this.keywords.length > 0
            ? this.keywords.reduce((sum, k) => sum + (difficultyMap[k.difficulty] || 0), 0) / this.keywords.length
            : 0;
        const avgDiffText = avgDiff === 0 ? '-' :
            avgDiff <= 1.5 ? 'Baixa' :
            avgDiff <= 2.5 ? 'Média' :
            avgDiff <= 3.5 ? 'Alta' : 'Muito Alta';

        document.getElementById('statTotal').textContent = total;
        document.getElementById('statTopTen').textContent = topTen;
        document.getElementById('statProgress').textContent = progress;
        document.getElementById('statToWork').textContent = toWork;
        document.getElementById('statVolume').textContent = volume.toLocaleString('pt-BR');
        document.getElementById('statAvgDifficulty').textContent = avgDiffText;
    }

    // ==================== FILTERS ====================

    getFilteredKeywords() {
        const site = document.getElementById('filterSite')?.value || '';
        const difficulty = document.getElementById('filterDifficulty')?.value || '';
        const intent = document.getElementById('filterIntent')?.value || '';
        const status = document.getElementById('filterStatus')?.value || '';
        const position = document.getElementById('filterPosition')?.value || '';
        const search = document.getElementById('filterSearch')?.value.toLowerCase() || '';

        return this.keywords.filter(keyword => {
            const matchSite = !site || keyword.site === site;
            const matchDifficulty = !difficulty || keyword.difficulty === difficulty;
            const matchIntent = !intent || keyword.intent === intent;
            const matchStatus = !status || keyword.status === status;

            let matchPosition = true;
            if (position === '1-10') matchPosition = keyword.currentPosition && keyword.currentPosition <= 10;
            else if (position === '11-30') matchPosition = keyword.currentPosition && keyword.currentPosition >= 11 && keyword.currentPosition <= 30;
            else if (position === '31-50') matchPosition = keyword.currentPosition && keyword.currentPosition >= 31 && keyword.currentPosition <= 50;
            else if (position === '51+') matchPosition = keyword.currentPosition && keyword.currentPosition >= 51;
            else if (position === 'none') matchPosition = !keyword.currentPosition;

            const matchSearch = !search ||
                keyword.keyword.toLowerCase().includes(search) ||
                (keyword.targetUrl && keyword.targetUrl.toLowerCase().includes(search)) ||
                (keyword.notes && keyword.notes.toLowerCase().includes(search));

            return matchSite && matchDifficulty && matchIntent && matchStatus && matchPosition && matchSearch;
        });
    }

    applyFilters() {
        this.renderKeywords();
    }

    clearFilters() {
        document.getElementById('filterSite').value = '';
        document.getElementById('filterDifficulty').value = '';
        document.getElementById('filterIntent').value = '';
        document.getElementById('filterStatus').value = '';
        document.getElementById('filterPosition').value = '';
        document.getElementById('filterSearch').value = '';
        this.applyFilters();
    }

    // ==================== SORTING ====================

    sortBy(field) {
        if (this.sortField === field) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortField = field;
            this.sortDirection = 'asc';
        }
        this.renderKeywords();
    }

    getSortedKeywords(keywords) {
        if (!this.sortField) return keywords;

        return [...keywords].sort((a, b) => {
            let valA = a[this.sortField];
            let valB = b[this.sortField];

            // Handle null/undefined
            if (valA == null) valA = this.sortDirection === 'asc' ? Infinity : -Infinity;
            if (valB == null) valB = this.sortDirection === 'asc' ? Infinity : -Infinity;

            // String comparison
            if (typeof valA === 'string') {
                return this.sortDirection === 'asc'
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA);
            }

            // Numeric comparison
            return this.sortDirection === 'asc' ? valA - valB : valB - valA;
        });
    }

    // ==================== RENDERING ====================

    renderKeywords() {
        const filtered = this.getFilteredKeywords();
        const sorted = this.getSortedKeywords(filtered);

        const tableBody = document.getElementById('keywordsTableBody');
        const mobileCards = document.getElementById('keywordsMobileCards');
        const emptyState = document.getElementById('emptyState');

        if (sorted.length === 0) {
            tableBody.innerHTML = '';
            mobileCards.innerHTML = '';
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';

            // Desktop table
            tableBody.innerHTML = sorted.map(k => `
                <tr>
                    <td class="keyword-cell">${this.escapeHtml(k.keyword)}</td>
                    <td>${k.volume.toLocaleString('pt-BR')}</td>
                    <td>${this.getDifficultyBadge(k.difficulty)}</td>
                    <td>${this.getIntentBadge(k.intent)}</td>
                    <td>${this.getPositionDisplay(k)}</td>
                    <td>${this.getStatusBadge(k.status)}</td>
                    <td>${k.site}</td>
                    <td class="actions-cell">
                        <button class="btn btn-small btn-secondary" onclick="app.showEditModal('${k.id}')">✏️</button>
                        <button class="btn btn-small btn-secondary" onclick="app.showTrafficCalculator('${k.id}')">📈</button>
                        <button class="btn btn-small btn-secondary" onclick="app.showHistory('${k.id}')">📊</button>
                        <button class="btn btn-small" onclick="app.duplicateKeyword('${k.id}')">📋</button>
                        <button class="btn btn-small btn-danger" onclick="app.deleteKeyword('${k.id}')">🗑️</button>
                    </td>
                </tr>
            `).join('');

            // Mobile cards
            mobileCards.innerHTML = sorted.map(k => `
                <div class="mobile-card">
                    <div class="mobile-card-header">
                        <div class="mobile-card-keyword">${this.escapeHtml(k.keyword)}</div>
                        <div style="margin-top: 8px;">
                            ${this.getDifficultyBadge(k.difficulty)}
                            ${this.getStatusBadge(k.status)}
                        </div>
                    </div>
                    <div class="mobile-card-row">
                        <span class="mobile-card-label">Volume:</span>
                        <span>${k.volume.toLocaleString('pt-BR')}/mês</span>
                    </div>
                    <div class="mobile-card-row">
                        <span class="mobile-card-label">Intenção:</span>
                        <span>${k.intent}</span>
                    </div>
                    <div class="mobile-card-row">
                        <span class="mobile-card-label">Posição:</span>
                        <span>${k.currentPosition || 'Não ranqueando'}</span>
                    </div>
                    <div class="mobile-card-row">
                        <span class="mobile-card-label">Site:</span>
                        <span>${k.site}</span>
                    </div>
                    <div class="mobile-card-actions">
                        <button class="btn btn-small btn-secondary" onclick="app.showEditModal('${k.id}')">✏️ Editar</button>
                        <button class="btn btn-small btn-secondary" onclick="app.showTrafficCalculator('${k.id}')">📈</button>
                        <button class="btn btn-small btn-danger" onclick="app.deleteKeyword('${k.id}')">🗑️</button>
                    </div>
                </div>
            `).join('');
        }
    }

    // ==================== OPPORTUNITIES ANALYSIS ====================

    analyzeOpportunities() {
        const opportunities = [];

        this.keywords.forEach(keyword => {
            const reasons = [];

            // High volume + Low difficulty
            if (keyword.volume >= 1000 && keyword.difficulty === 'Baixa') {
                reasons.push('Alto volume (1000+) + Dificuldade baixa');
            }

            // Commercial/Transactional intent + To Work status
            if (['Comercial', 'Transacional'].includes(keyword.intent) && keyword.status === 'A Trabalhar') {
                reasons.push('Intenção comercial/transacional + A trabalhar');
            }

            // Position 11-30 (easy to climb)
            if (keyword.currentPosition && keyword.currentPosition >= 11 && keyword.currentPosition <= 30) {
                reasons.push(`Posição ${keyword.currentPosition} (página 2-3, fácil de subir)`);
            }

            // Medium volume + Low difficulty + Commercial
            if (keyword.volume >= 500 && keyword.difficulty === 'Baixa' && ['Comercial', 'Transacional'].includes(keyword.intent)) {
                reasons.push('Volume médio + Baixa dificuldade + Intenção comercial');
            }

            if (reasons.length > 0) {
                opportunities.push({
                    keyword: keyword,
                    reasons: reasons,
                    score: reasons.length
                });
            }
        });

        // Sort by score (most reasons = best opportunity)
        return opportunities.sort((a, b) => b.score - a.score).slice(0, 10);
    }

    renderOpportunities() {
        const opportunities = this.analyzeOpportunities();
        const container = document.getElementById('opportunitiesList');

        if (opportunities.length === 0) {
            container.innerHTML = '<p class="empty-opportunities">Nenhuma oportunidade identificada ainda. Adicione keywords para análise.</p>';
        } else {
            container.innerHTML = opportunities.map(opp => `
                <div class="opportunity-item">
                    <div class="opportunity-keyword">${this.escapeHtml(opp.keyword.keyword)}</div>
                    <div class="opportunity-reason">${opp.reasons.join(' • ')}</div>
                    <div class="opportunity-stats">
                        <span>📊 Volume: ${opp.keyword.volume.toLocaleString('pt-BR')}</span>
                        <span>${this.getDifficultyBadge(opp.keyword.difficulty)}</span>
                        <span>${this.getIntentBadge(opp.keyword.intent)}</span>
                        ${opp.keyword.currentPosition ? `<span>📍 Posição: ${opp.keyword.currentPosition}</span>` : ''}
                    </div>
                </div>
            `).join('');
        }
    }

    // ==================== CLUSTER GROUPING ====================

    generateClusters() {
        const clusters = {};

        this.keywords.forEach(keyword => {
            const words = keyword.keyword.toLowerCase().split(' ');
            let clusterId = null;

            // Try to find existing cluster
            for (const [id, cluster] of Object.entries(clusters)) {
                const clusterWords = id.split(' ');
                const commonWords = words.filter(w => clusterWords.includes(w));

                // If 60%+ words match, add to this cluster
                if (commonWords.length / Math.max(words.length, clusterWords.length) >= 0.4) {
                    clusterId = id;
                    break;
                }
            }

            // Create new cluster if none found
            if (!clusterId) {
                clusterId = words.slice(0, 3).join(' ');
            }

            if (!clusters[clusterId]) {
                clusters[clusterId] = {
                    name: clusterId,
                    keywords: [],
                    totalVolume: 0
                };
            }

            clusters[clusterId].keywords.push(keyword);
            clusters[clusterId].totalVolume += keyword.volume || 0;
        });

        // Convert to array and sort by total volume
        return Object.values(clusters).sort((a, b) => b.totalVolume - a.totalVolume);
    }

    renderClusters() {
        const clusters = this.generateClusters();
        const container = document.getElementById('clustersContainer');

        if (clusters.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Nenhuma keyword para agrupar</p></div>';
        } else {
            container.innerHTML = clusters.map(cluster => `
                <div class="cluster-card">
                    <div class="cluster-header">
                        <div class="cluster-name">📁 ${this.escapeHtml(cluster.name)}</div>
                        <div class="cluster-stats">
                            <span>${cluster.keywords.length} keywords</span>
                            <span>📊 ${cluster.totalVolume.toLocaleString('pt-BR')} vol/mês</span>
                        </div>
                    </div>
                    <div class="cluster-keywords">
                        ${cluster.keywords.map(k => `
                            <div class="cluster-keyword-item">
                                <div>
                                    <strong>${this.escapeHtml(k.keyword)}</strong>
                                    <span style="margin-left: 10px; color: #666;">Vol: ${k.volume.toLocaleString('pt-BR')}</span>
                                </div>
                                <div>
                                    ${this.getDifficultyBadge(k.difficulty)}
                                    ${this.getStatusBadge(k.status)}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        }
    }

    // ==================== TRAFFIC CALCULATOR ====================

    showTrafficCalculator(id) {
        const keyword = this.getKeyword(id);
        if (!keyword) return;

        const ctrByPosition = {
            1: 0.30, 2: 0.15, 3: 0.10, 4: 0.07, 5: 0.05,
            6: 0.04, 7: 0.03, 8: 0.025, 9: 0.02, 10: 0.015,
            11: 0.01, 12: 0.008, 13: 0.007, 14: 0.006, 15: 0.005,
            20: 0.003, 30: 0.001
        };

        const current = keyword.currentPosition || 100;
        const target = keyword.targetPosition || 1;
        const volume = keyword.volume || 0;

        const currentCTR = ctrByPosition[current] || 0.0005;
        const targetCTR = ctrByPosition[target] || (target <= 3 ? 0.10 : target <= 10 ? 0.015 : 0.001);

        const currentTraffic = Math.round(volume * currentCTR);
        const targetTraffic = Math.round(volume * targetCTR);
        const gain = targetTraffic - currentTraffic;

        const content = `
            <div class="traffic-info">
                <h3 style="margin-bottom: 15px; color: var(--primary);">${this.escapeHtml(keyword.keyword)}</h3>
                <div class="traffic-row">
                    <span>Volume de Busca Mensal:</span>
                    <span><strong>${volume.toLocaleString('pt-BR')}</strong></span>
                </div>
                <div class="traffic-row">
                    <span>Posição Atual:</span>
                    <span><strong>${current === 100 ? 'Não ranqueando' : current}</strong></span>
                </div>
                <div class="traffic-row">
                    <span>CTR Estimado (atual):</span>
                    <span><strong>${(currentCTR * 100).toFixed(2)}%</strong></span>
                </div>
                <div class="traffic-row">
                    <span>Tráfego Atual Estimado:</span>
                    <span><strong>${currentTraffic.toLocaleString('pt-BR')} visitas/mês</strong></span>
                </div>
                <hr style="margin: 20px 0; border: 1px solid var(--border);">
                <div class="traffic-row">
                    <span>Posição Desejada:</span>
                    <span><strong>${target}</strong></span>
                </div>
                <div class="traffic-row">
                    <span>CTR Estimado (meta):</span>
                    <span><strong>${(targetCTR * 100).toFixed(2)}%</strong></span>
                </div>
                <div class="traffic-row">
                    <span>Tráfego Potencial:</span>
                    <span><strong>${targetTraffic.toLocaleString('pt-BR')} visitas/mês</strong></span>
                </div>
                <div class="traffic-row" style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <span>Ganho Potencial:</span>
                    <span style="color: var(--ranking); font-size: 1.3rem;">+${gain.toLocaleString('pt-BR')} visitas/mês</span>
                </div>
            </div>
            <p style="font-size: 0.85rem; color: #666; margin-top: 15px;">
                * CTR baseado em médias de mercado. Resultados reais podem variar.
            </p>
        `;

        document.getElementById('trafficCalculatorContent').innerHTML = content;
        this.openModal('trafficModal');
    }

    closeTrafficModal() {
        document.getElementById('trafficModal').classList.remove('active');
    }

    // ==================== POSITION HISTORY ====================

    showHistory(id) {
        const keyword = this.getKeyword(id);
        if (!keyword) return;

        let content = `<h3 style="margin-bottom: 15px; color: var(--primary);">${this.escapeHtml(keyword.keyword)}</h3>`;

        if (!keyword.history || keyword.history.length === 0) {
            content += '<p class="empty-history">Nenhum histórico de posições registrado ainda.</p>';
        } else {
            content += '<div class="history-timeline">';
            keyword.history.slice().reverse().forEach(entry => {
                const date = new Date(entry.date).toLocaleDateString('pt-BR');
                content += `
                    <div class="history-item">
                        <div class="history-date">${date}</div>
                        <div class="history-position">Posição: <strong>${entry.position}</strong></div>
                    </div>
                `;
            });
            content += '</div>';
        }

        document.getElementById('historyContent').innerHTML = content;
        this.openModal('historyModal');
    }

    closeHistoryModal() {
        document.getElementById('historyModal').classList.remove('active');
    }

    // ==================== MODAL MANAGEMENT ====================

    showCreateModal() {
        document.getElementById('modalTitle').textContent = 'Nova Keyword';
        document.getElementById('submitBtnText').textContent = 'Adicionar Keyword';
        document.getElementById('keywordForm').reset();
        this.editingId = null;
        this.openModal('keywordModal');
    }

    showEditModal(id) {
        const keyword = this.getKeyword(id);
        if (!keyword) return;

        document.getElementById('modalTitle').textContent = 'Editar Keyword';
        document.getElementById('submitBtnText').textContent = 'Salvar Alterações';

        document.getElementById('keyword').value = keyword.keyword;
        document.getElementById('volume').value = keyword.volume || '';
        document.getElementById('difficulty').value = keyword.difficulty;
        document.getElementById('intent').value = keyword.intent;
        document.getElementById('targetUrl').value = keyword.targetUrl || '';
        document.getElementById('site').value = keyword.site;
        document.getElementById('currentPosition').value = keyword.currentPosition || '';
        document.getElementById('targetPosition').value = keyword.targetPosition || '';
        document.getElementById('status').value = keyword.status;
        document.getElementById('lastCheck').value = keyword.lastCheck || '';
        document.getElementById('competitors').value = keyword.competitors || '';
        document.getElementById('notes').value = keyword.notes || '';

        this.editingId = id;
        this.openModal('keywordModal');
    }

    openModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }

    closeModal() {
        document.getElementById('keywordModal').classList.remove('active');
        this.editingId = null;
    }

    // ==================== TAB SWITCHING ====================

    switchTab(tab) {
        this.currentTab = tab;

        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            if (btn.dataset.tab === tab) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        if (tab === 'all') {
            document.getElementById('tabAll').classList.add('active');
        } else if (tab === 'clusters') {
            document.getElementById('tabClusters').classList.add('active');
            this.renderClusters();
        } else if (tab === 'opportunities') {
            document.getElementById('tabOpportunities').classList.add('active');
            this.renderOpportunitiesOnly();
        }
    }

    renderOpportunitiesOnly() {
        const opportunities = this.analyzeOpportunities();
        const container = document.getElementById('opportunitiesOnlyContainer');

        if (opportunities.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Nenhuma oportunidade identificada ainda</p></div>';
        } else {
            container.innerHTML = `
                <div class="table-container">
                    <table class="keywords-table">
                        <thead>
                            <tr>
                                <th>Keyword</th>
                                <th>Volume</th>
                                <th>Dificuldade</th>
                                <th>Intenção</th>
                                <th>Posição</th>
                                <th>Razões</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${opportunities.map(opp => `
                                <tr>
                                    <td class="keyword-cell">${this.escapeHtml(opp.keyword.keyword)}</td>
                                    <td>${opp.keyword.volume.toLocaleString('pt-BR')}</td>
                                    <td>${this.getDifficultyBadge(opp.keyword.difficulty)}</td>
                                    <td>${this.getIntentBadge(opp.keyword.intent)}</td>
                                    <td>${opp.keyword.currentPosition || '-'}</td>
                                    <td style="font-size: 0.85rem;">${opp.reasons.join(' • ')}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }
    }

    // ==================== EXPORT/IMPORT ====================

    exportJSON() {
        const data = JSON.stringify(this.keywords, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fp-keywords-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    exportCSV() {
        const headers = ['Keyword', 'Volume', 'Dificuldade', 'Intenção', 'URL Alvo', 'Site', 'Posição Atual', 'Posição Desejada', 'Status', 'Última Verificação', 'Notas'];
        const rows = this.keywords.map(k => [
            k.keyword,
            k.volume,
            k.difficulty,
            k.intent,
            k.targetUrl,
            k.site,
            k.currentPosition || '',
            k.targetPosition || '',
            k.status,
            k.lastCheck,
            k.notes.replace(/\n/g, ' ')
        ]);

        const csv = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fp-keywords-${Date.now()}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    importJSON() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const imported = JSON.parse(event.target.result);
                        if (Array.isArray(imported)) {
                            if (confirm(`Importar ${imported.length} keywords? Isso irá mesclar com as keywords existentes.`)) {
                                imported.forEach(kw => {
                                    kw.id = Date.now().toString() + Math.random();
                                });
                                this.keywords = [...imported, ...this.keywords];
                                this.saveToStorage();
                                this.updateDashboard();
                                this.renderKeywords();
                                this.renderOpportunities();
                                alert('Keywords importadas com sucesso!');
                            }
                        }
                    } catch (error) {
                        alert('Erro ao importar arquivo. Certifique-se de que é um JSON válido.');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    // ==================== EVENT LISTENERS ====================

    setupEventListeners() {
        document.getElementById('keywordForm').addEventListener('submit', (e) => {
            e.preventDefault();

            const data = {
                keyword: document.getElementById('keyword').value,
                volume: document.getElementById('volume').value,
                difficulty: document.getElementById('difficulty').value,
                intent: document.getElementById('intent').value,
                targetUrl: document.getElementById('targetUrl').value,
                site: document.getElementById('site').value,
                currentPosition: document.getElementById('currentPosition').value,
                targetPosition: document.getElementById('targetPosition').value,
                status: document.getElementById('status').value,
                lastCheck: document.getElementById('lastCheck').value,
                competitors: document.getElementById('competitors').value,
                notes: document.getElementById('notes').value
            };

            if (this.editingId) {
                this.updateKeyword(this.editingId, data);
            } else {
                this.createKeyword(data);
            }

            this.closeModal();
            this.updateDashboard();
            this.renderKeywords();
            this.renderOpportunities();
        });
    }

    // ==================== UTILITY FUNCTIONS ====================

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    getDifficultyBadge(difficulty) {
        const map = {
            'Baixa': 'badge-easy',
            'Média': 'badge-medium',
            'Alta': 'badge-hard',
            'Muito Alta': 'badge-very-hard'
        };
        return `<span class="badge ${map[difficulty]}">${difficulty}</span>`;
    }

    getStatusBadge(status) {
        const map = {
            'A Trabalhar': 'badge-to-work',
            'Em Progresso': 'badge-progress',
            'Ranqueando': 'badge-ranking',
            'Pausado': 'badge-paused',
            'Descartado': 'badge-discarded'
        };
        return `<span class="badge ${map[status]}">${status}</span>`;
    }

    getIntentBadge(intent) {
        return `<span class="badge badge-intent">${intent}</span>`;
    }

    getPositionDisplay(keyword) {
        if (!keyword.currentPosition) {
            return '<span style="color: #999;">Não ranqueando</span>';
        }

        const current = keyword.currentPosition;
        const target = keyword.targetPosition;

        if (target && current > target) {
            const diff = current - target;
            return `<strong>${current}</strong> <span style="font-size: 0.85rem; color: #f44336;">↑${diff}</span>`;
        }

        return `<strong>${current}</strong>`;
    }
}

// Initialize app
const app = new KeywordOrganizer();
