// FP Analytics Dashboard - App Logic
// Sprint Lab #19 - Fernando Pimenta

// ===========================
// DATA & STATE
// ===========================

let records = [];
let goals = {
    traffic: 10000,
    revenue: 1000,
    conversions: 50
};
let widgetConfig = {
    summary: true,
    'traffic-chart': true,
    'revenue-chart': true,
    'distribution-chart': true,
    conversion: true,
    roi: true,
    goals: true,
    trends: true,
    table: true,
    heatmap: true
};

let currentPeriod = 6; // months
let currentSite = 'all';
let charts = {};

const siteLabels = {
    blog: 'Blog do FP',
    brecho: 'Brechó Tech',
    cetus: 'CetusNet'
};

const siteColors = {
    blog: '#283593',
    brecho: '#5e35b1',
    cetus: '#055f96'
};

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initializeEventListeners();
    initializeWidgetConfig();
    applyWidgetConfig();
    renderDashboard();
});

function loadData() {
    const savedRecords = localStorage.getItem('fpAnalyticsRecords');
    const savedGoals = localStorage.getItem('fpAnalyticsGoals');
    const savedWidgetConfig = localStorage.getItem('fpAnalyticsWidgetConfig');

    if (savedRecords) {
        records = JSON.parse(savedRecords);
    }

    if (savedGoals) {
        goals = JSON.parse(savedGoals);
    }

    if (savedWidgetConfig) {
        widgetConfig = JSON.parse(savedWidgetConfig);
    }
}

function saveData() {
    localStorage.setItem('fpAnalyticsRecords', JSON.stringify(records));
    localStorage.setItem('fpAnalyticsGoals', JSON.stringify(goals));
    localStorage.setItem('fpAnalyticsWidgetConfig', JSON.stringify(widgetConfig));
}

// ===========================
// EVENT LISTENERS
// ===========================

function initializeEventListeners() {
    // Modals
    document.getElementById('btnAddData').addEventListener('click', openAddDataModal);
    document.getElementById('btnCloseData').addEventListener('click', closeDataModal);
    document.getElementById('btnCancelData').addEventListener('click', closeDataModal);
    document.getElementById('dataForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('btnDeleteRecord').addEventListener('click', deleteRecord);

    // Filters
    document.getElementById('filterPeriod').addEventListener('change', (e) => {
        currentPeriod = e.target.value;
        renderDashboard();
    });

    document.getElementById('filterSite').addEventListener('change', (e) => {
        currentSite = e.target.value;
        renderDashboard();
    });

    // Widgets config
    document.getElementById('btnConfigWidgets').addEventListener('click', openWidgetsModal);
    document.getElementById('btnCloseWidgets').addEventListener('click', () => {
        document.getElementById('widgetsModal').classList.remove('active');
    });

    // Compare
    document.getElementById('btnCompare').addEventListener('click', openCompareModal);
    document.getElementById('btnCloseCompare').addEventListener('click', () => {
        document.getElementById('compareModal').classList.remove('active');
    });
    document.getElementById('btnRunCompare').addEventListener('click', runComparison);

    // Export/Import
    document.getElementById('btnExport').addEventListener('click', openExportModal);
    document.getElementById('btnCloseExport').addEventListener('click', () => {
        document.getElementById('exportModal').classList.remove('active');
    });
    document.getElementById('btnExportJSON').addEventListener('click', exportJSON);
    document.getElementById('btnExportCSV').addEventListener('click', exportCSV);
    document.getElementById('btnImportJSON').addEventListener('click', () => {
        document.getElementById('importFile').click();
    });
    document.getElementById('importFile').addEventListener('change', importJSON);

    // Goals
    document.getElementById('btnSetGoals').addEventListener('click', openGoalsModal);
    document.getElementById('btnCloseGoals').addEventListener('click', () => {
        document.getElementById('goalsModal').classList.remove('active');
    });
    document.getElementById('btnSaveGoals').addEventListener('click', saveGoals);

    // Heatmap metric
    document.getElementById('heatmapMetric').addEventListener('change', () => {
        renderHeatmap();
    });

    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
}

// ===========================
// DATA MODAL (CRUD)
// ===========================

function openAddDataModal() {
    document.getElementById('dataModal').classList.add('active');
    document.getElementById('dataModalTitle').textContent = 'Adicionar Dados Mensais';
    document.getElementById('dataForm').reset();
    document.getElementById('recordId').value = '';
    document.getElementById('btnDeleteRecord').style.display = 'none';
}

function editRecord(id) {
    const record = records.find(r => r.id === id);
    if (!record) return;

    document.getElementById('dataModal').classList.add('active');
    document.getElementById('dataModalTitle').textContent = 'Editar Dados Mensais';
    document.getElementById('recordId').value = record.id;
    document.getElementById('recordMonth').value = record.month;
    document.getElementById('recordSite').value = record.site;
    document.getElementById('recordTraffic').value = record.traffic || 0;
    document.getElementById('recordPageviews').value = record.pageviews || 0;
    document.getElementById('recordUsers').value = record.users || 0;
    document.getElementById('recordBounce').value = record.bounce || 0;
    document.getElementById('recordAvgTime').value = record.avgTime || 0;
    document.getElementById('recordPosition').value = record.position || 0;
    document.getElementById('recordClicks').value = record.clicks || 0;
    document.getElementById('recordConversions').value = record.conversions || 0;
    document.getElementById('recordRevenue').value = record.revenue || 0;
    document.getElementById('recordNewsletter').value = record.newsletter || 0;
    document.getElementById('recordPosts').value = record.posts || 0;
    document.getElementById('recordBacklinks').value = record.backlinks || 0;
    document.getElementById('recordNotes').value = record.notes || '';

    document.getElementById('btnDeleteRecord').style.display = 'inline-block';
}

function closeDataModal() {
    document.getElementById('dataModal').classList.remove('active');
}

function handleFormSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('recordId').value;
    const month = document.getElementById('recordMonth').value;
    const site = document.getElementById('recordSite').value;

    // Check for duplicates (same month + site)
    const duplicate = records.find(r =>
        r.month === month && r.site === site && r.id !== id
    );

    if (duplicate) {
        alert('Já existe um registro para este mês e site!');
        return;
    }

    const recordData = {
        id: id || generateId(),
        month: month,
        site: site,
        traffic: parseFloat(document.getElementById('recordTraffic').value) || 0,
        pageviews: parseFloat(document.getElementById('recordPageviews').value) || 0,
        users: parseFloat(document.getElementById('recordUsers').value) || 0,
        bounce: parseFloat(document.getElementById('recordBounce').value) || 0,
        avgTime: parseFloat(document.getElementById('recordAvgTime').value) || 0,
        position: parseFloat(document.getElementById('recordPosition').value) || 0,
        clicks: parseFloat(document.getElementById('recordClicks').value) || 0,
        conversions: parseFloat(document.getElementById('recordConversions').value) || 0,
        revenue: parseFloat(document.getElementById('recordRevenue').value) || 0,
        newsletter: parseFloat(document.getElementById('recordNewsletter').value) || 0,
        posts: parseFloat(document.getElementById('recordPosts').value) || 0,
        backlinks: parseFloat(document.getElementById('recordBacklinks').value) || 0,
        notes: document.getElementById('recordNotes').value
    };

    if (id) {
        const index = records.findIndex(r => r.id === id);
        records[index] = recordData;
    } else {
        records.push(recordData);
    }

    saveData();
    closeDataModal();
    renderDashboard();
}

function deleteRecord() {
    const id = document.getElementById('recordId').value;
    if (!id) return;

    if (confirm('Tem certeza que deseja excluir este registro?')) {
        records = records.filter(r => r.id !== id);
        saveData();
        closeDataModal();
        renderDashboard();
    }
}

// ===========================
// DASHBOARD RENDERING
// ===========================

function renderDashboard() {
    const filteredData = getFilteredData();

    renderSummary(filteredData);
    renderTrafficChart(filteredData);
    renderRevenueChart(filteredData);
    renderDistributionChart(filteredData);
    renderConversionWidget(filteredData);
    renderROIWidget(filteredData);
    renderGoalsWidget(filteredData);
    renderTrendsWidget(filteredData);
    renderCompareTable(filteredData);
    renderHeatmap();
}

function getFilteredData() {
    let filtered = [...records];

    // Filter by site
    if (currentSite !== 'all') {
        filtered = filtered.filter(r => r.site === currentSite);
    }

    // Filter by period
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    if (currentPeriod !== 'year' && currentPeriod !== 'custom') {
        const months = parseInt(currentPeriod);
        const cutoffDate = new Date();
        cutoffDate.setMonth(cutoffDate.getMonth() - months);
        const cutoff = `${cutoffDate.getFullYear()}-${String(cutoffDate.getMonth() + 1).padStart(2, '0')}`;

        filtered = filtered.filter(r => r.month >= cutoff);
    } else if (currentPeriod === 'year') {
        const year = now.getFullYear();
        filtered = filtered.filter(r => r.month.startsWith(year.toString()));
    }

    // Sort by month
    filtered.sort((a, b) => a.month.localeCompare(b.month));

    return filtered;
}

// ===========================
// WIDGET: SUMMARY
// ===========================

function renderSummary(data) {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    const prevMonthStr = `${prevMonth.getFullYear()}-${String(prevMonth.getMonth() + 1).padStart(2, '0')}`;

    const currentData = records.filter(r => r.month === currentMonth);
    const prevData = records.filter(r => r.month === prevMonthStr);

    const currentTraffic = currentData.reduce((sum, r) => sum + r.traffic, 0);
    const prevTraffic = prevData.reduce((sum, r) => sum + r.traffic, 0);

    const currentConversions = currentData.reduce((sum, r) => sum + r.conversions, 0);
    const prevConversions = prevData.reduce((sum, r) => sum + r.conversions, 0);

    const currentRevenue = currentData.reduce((sum, r) => sum + r.revenue, 0);
    const prevRevenue = prevData.reduce((sum, r) => sum + r.revenue, 0);

    const currentBounce = currentData.length > 0
        ? currentData.reduce((sum, r) => sum + r.bounce, 0) / currentData.length
        : 0;
    const prevBounce = prevData.length > 0
        ? prevData.reduce((sum, r) => sum + r.bounce, 0) / prevData.length
        : 0;

    document.getElementById('summaryMonth').textContent = formatMonthYear(currentMonth);
    document.getElementById('summaryTraffic').textContent = formatNumber(currentTraffic);
    document.getElementById('summaryConversions').textContent = formatNumber(currentConversions);
    document.getElementById('summaryRevenue').textContent = `R$ ${formatNumber(currentRevenue)}`;
    document.getElementById('summaryBounce').textContent = `${currentBounce.toFixed(1)}%`;

    updateSummaryChange('summaryTrafficChange', currentTraffic, prevTraffic);
    updateSummaryChange('summaryConversionsChange', currentConversions, prevConversions);
    updateSummaryChange('summaryRevenueChange', currentRevenue, prevRevenue);
    updateSummaryChange('summaryBounceChange', currentBounce, prevBounce, true); // reverse for bounce
}

function updateSummaryChange(elementId, current, previous, reverse = false) {
    const element = document.getElementById(elementId);

    if (previous === 0) {
        element.textContent = '-';
        element.className = 'summary-change neutral';
        return;
    }

    const change = ((current - previous) / previous) * 100;
    const sign = change > 0 ? '+' : '';

    element.textContent = `${sign}${change.toFixed(1)}% vs mês anterior`;

    if (reverse) {
        element.className = change < 0 ? 'summary-change positive' : 'summary-change negative';
    } else {
        element.className = change > 0 ? 'summary-change positive' : 'summary-change negative';
    }
}

// ===========================
// WIDGET: TRAFFIC CHART
// ===========================

function renderTrafficChart(data) {
    const ctx = document.getElementById('trafficChart');
    if (!ctx) return;

    // Destroy existing chart
    if (charts.traffic) {
        charts.traffic.destroy();
    }

    // Group by month and site
    const monthlyData = {};

    data.forEach(record => {
        if (!monthlyData[record.month]) {
            monthlyData[record.month] = { blog: 0, brecho: 0, cetus: 0 };
        }
        monthlyData[record.month][record.site] = record.traffic;
    });

    const labels = Object.keys(monthlyData).sort().map(m => formatMonthYear(m));
    const months = Object.keys(monthlyData).sort();

    const datasets = [
        {
            label: 'Blog do FP',
            data: months.map(m => monthlyData[m].blog),
            borderColor: siteColors.blog,
            backgroundColor: siteColors.blog + '20',
            tension: 0.4
        },
        {
            label: 'Brechó Tech',
            data: months.map(m => monthlyData[m].brecho),
            borderColor: siteColors.brecho,
            backgroundColor: siteColors.brecho + '20',
            tension: 0.4
        },
        {
            label: 'CetusNet',
            data: months.map(m => monthlyData[m].cetus),
            borderColor: siteColors.cetus,
            backgroundColor: siteColors.cetus + '20',
            tension: 0.4
        }
    ];

    charts.traffic = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// ===========================
// WIDGET: REVENUE CHART
// ===========================

function renderRevenueChart(data) {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;

    if (charts.revenue) {
        charts.revenue.destroy();
    }

    // Sum revenue by site
    const revenueBysite = { blog: 0, brecho: 0, cetus: 0 };

    data.forEach(record => {
        revenueBysite[record.site] += record.revenue;
    });

    charts.revenue = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Blog do FP', 'Brechó Tech', 'CetusNet'],
            datasets: [{
                label: 'Receita (R$)',
                data: [revenueBysite.blog, revenueBysite.brecho, revenueBysite.cetus],
                backgroundColor: [
                    siteColors.blog,
                    siteColors.brecho,
                    siteColors.cetus
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });
}

// ===========================
// WIDGET: DISTRIBUTION CHART
// ===========================

function renderDistributionChart(data) {
    const ctx = document.getElementById('distributionChart');
    if (!ctx) return;

    if (charts.distribution) {
        charts.distribution.destroy();
    }

    // Sum traffic by site
    const trafficBySite = { blog: 0, brecho: 0, cetus: 0 };

    data.forEach(record => {
        trafficBySite[record.site] += record.traffic;
    });

    charts.distribution = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Blog do FP', 'Brechó Tech', 'CetusNet'],
            datasets: [{
                data: [trafficBySite.blog, trafficBySite.brecho, trafficBySite.cetus],
                backgroundColor: [
                    siteColors.blog,
                    siteColors.brecho,
                    siteColors.cetus
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// ===========================
// WIDGET: CONVERSION RATE
// ===========================

function renderConversionWidget(data) {
    const container = document.getElementById('conversionContent');
    container.innerHTML = '';

    const sites = currentSite === 'all' ? ['blog', 'brecho', 'cetus'] : [currentSite];

    sites.forEach(site => {
        const siteData = data.filter(r => r.site === site);
        const totalClicks = siteData.reduce((sum, r) => sum + r.clicks, 0);
        const totalConversions = siteData.reduce((sum, r) => sum + r.conversions, 0);

        const rate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

        const item = document.createElement('div');
        item.className = `conversion-item ${site}`;

        item.innerHTML = `
            <div class="conversion-site">${siteLabels[site]}</div>
            <div class="conversion-rate ${getConversionClass(rate)}">${rate.toFixed(1)}%</div>
        `;

        container.appendChild(item);
    });
}

function getConversionClass(rate) {
    if (rate >= 5) return 'good';
    if (rate >= 2) return 'medium';
    return 'bad';
}

// ===========================
// WIDGET: ROI CONTENT
// ===========================

function renderROIWidget(data) {
    const container = document.getElementById('roiContent');
    container.innerHTML = '';

    const sites = currentSite === 'all' ? ['blog', 'brecho', 'cetus'] : [currentSite];

    sites.forEach(site => {
        const siteData = data.filter(r => r.site === site);
        const totalPosts = siteData.reduce((sum, r) => sum + r.posts, 0);
        const totalRevenue = siteData.reduce((sum, r) => sum + r.revenue, 0);

        const revenuePerPost = totalPosts > 0 ? totalRevenue / totalPosts : 0;

        const item = document.createElement('div');
        item.className = 'roi-item';

        item.innerHTML = `
            <div class="roi-header">
                <span class="roi-site">${siteLabels[site]}</span>
                <span class="roi-value">R$ ${revenuePerPost.toFixed(2)}/post</span>
            </div>
            <div class="roi-stats">
                <span>${totalPosts} posts</span>
                <span>R$ ${formatNumber(totalRevenue)} total</span>
            </div>
        `;

        container.appendChild(item);
    });
}

// ===========================
// WIDGET: GOALS
// ===========================

function renderGoalsWidget(data) {
    const container = document.getElementById('goalsContent');
    container.innerHTML = '';

    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const currentData = records.filter(r => r.month === currentMonth);

    const currentTraffic = currentData.reduce((sum, r) => sum + r.traffic, 0);
    const currentRevenue = currentData.reduce((sum, r) => sum + r.revenue, 0);
    const currentConversions = currentData.reduce((sum, r) => sum + r.conversions, 0);

    // Traffic goal
    renderGoalItem(container, 'Tráfego', currentTraffic, goals.traffic, 'visitas');

    // Revenue goal
    renderGoalItem(container, 'Receita', currentRevenue, goals.revenue, 'R$');

    // Conversions goal
    renderGoalItem(container, 'Conversões', currentConversions, goals.conversions, 'conversões');
}

function renderGoalItem(container, label, current, goal, unit) {
    const progress = goal > 0 ? (current / goal) * 100 : 0;
    const remaining = Math.max(0, goal - current);

    const item = document.createElement('div');
    item.className = 'goal-item';

    item.innerHTML = `
        <div class="goal-header">
            <span>${label}</span>
            <span>${progress.toFixed(1)}%</span>
        </div>
        <div class="goal-progress">
            <div class="goal-progress-bar" style="width: ${Math.min(100, progress)}%">
                ${Math.min(100, progress).toFixed(0)}%
            </div>
        </div>
        <div class="goal-status">
            ${remaining > 0 ? `Faltam ${formatNumber(remaining)} ${unit} para a meta` : '🎉 Meta atingida!'}
        </div>
    `;

    container.appendChild(item);
}

function openGoalsModal() {
    document.getElementById('goalsModal').classList.add('active');
    document.getElementById('goalTraffic').value = goals.traffic;
    document.getElementById('goalRevenue').value = goals.revenue;
    document.getElementById('goalConversions').value = goals.conversions;
}

function saveGoals() {
    goals.traffic = parseFloat(document.getElementById('goalTraffic').value) || 0;
    goals.revenue = parseFloat(document.getElementById('goalRevenue').value) || 0;
    goals.conversions = parseFloat(document.getElementById('goalConversions').value) || 0;

    saveData();
    renderGoalsWidget(getFilteredData());
    document.getElementById('goalsModal').classList.remove('active');
}

// ===========================
// WIDGET: TRENDS
// ===========================

function renderTrendsWidget(data) {
    const container = document.getElementById('trendsContent');
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">Sem dados suficientes</p>';
        return;
    }

    // Best month (traffic)
    const bestTraffic = data.reduce((max, r) => r.traffic > max.traffic ? r : max, data[0]);

    // Worst month (traffic)
    const worstTraffic = data.reduce((min, r) => r.traffic < min.traffic ? r : min, data[0]);

    // Best month (revenue)
    const bestRevenue = data.reduce((max, r) => r.revenue > max.revenue ? r : max, data[0]);

    // Average growth
    const avgGrowth = calculateAvgGrowth(data);

    // Best site
    const bestSite = getBestSite(data);

    addTrendItem(container, '🏆', 'Melhor mês (tráfego)', `${formatMonthYear(bestTraffic.month)} - ${formatNumber(bestTraffic.traffic)} visitas`);
    addTrendItem(container, '💰', 'Melhor mês (receita)', `${formatMonthYear(bestRevenue.month)} - R$ ${formatNumber(bestRevenue.revenue)}`);
    addTrendItem(container, '📈', 'Crescimento médio mensal', `${avgGrowth > 0 ? '+' : ''}${avgGrowth.toFixed(1)}%`);
    addTrendItem(container, '🎯', 'Melhor desempenho', siteLabels[bestSite]);
}

function addTrendItem(container, icon, label, value) {
    const item = document.createElement('div');
    item.className = 'trend-item';

    item.innerHTML = `
        <div class="trend-icon">${icon}</div>
        <div class="trend-text">
            <div class="trend-label">${label}</div>
            <div class="trend-value">${value}</div>
        </div>
    `;

    container.appendChild(item);
}

function calculateAvgGrowth(data) {
    if (data.length < 2) return 0;

    const trafficByMonth = {};
    data.forEach(r => {
        if (!trafficByMonth[r.month]) trafficByMonth[r.month] = 0;
        trafficByMonth[r.month] += r.traffic;
    });

    const months = Object.keys(trafficByMonth).sort();
    let totalGrowth = 0;
    let count = 0;

    for (let i = 1; i < months.length; i++) {
        const prev = trafficByMonth[months[i - 1]];
        const curr = trafficByMonth[months[i]];

        if (prev > 0) {
            totalGrowth += ((curr - prev) / prev) * 100;
            count++;
        }
    }

    return count > 0 ? totalGrowth / count : 0;
}

function getBestSite(data) {
    const siteRevenue = { blog: 0, brecho: 0, cetus: 0 };

    data.forEach(r => {
        siteRevenue[r.site] += r.revenue;
    });

    return Object.keys(siteRevenue).reduce((best, site) =>
        siteRevenue[site] > siteRevenue[best] ? site : best
    );
}

// ===========================
// WIDGET: COMPARE TABLE
// ===========================

function renderCompareTable(data) {
    const table = document.getElementById('compareTable');
    table.innerHTML = '';

    if (data.length === 0) {
        table.innerHTML = '<p style="text-align: center; padding: 20px; color: #999;">Nenhum dado disponível</p>';
        return;
    }

    // Create header
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th onclick="sortTable('month')">Mês</th>
            <th onclick="sortTable('site')">Site</th>
            <th onclick="sortTable('traffic')">Tráfego</th>
            <th onclick="sortTable('conversions')">Conversões</th>
            <th onclick="sortTable('revenue')">Receita</th>
            <th onclick="sortTable('bounce')">Taxa Rejeição</th>
        </tr>
    `;
    table.appendChild(thead);

    // Create body
    const tbody = document.createElement('tbody');

    data.slice().reverse().forEach(record => {
        const row = document.createElement('tr');
        row.style.cursor = 'pointer';
        row.onclick = () => editRecord(record.id);

        row.innerHTML = `
            <td>${formatMonthYear(record.month)}</td>
            <td class="site-${record.site}">${siteLabels[record.site]}</td>
            <td>${formatNumber(record.traffic)}</td>
            <td>${formatNumber(record.conversions)}</td>
            <td>R$ ${formatNumber(record.revenue)}</td>
            <td>${record.bounce.toFixed(1)}%</td>
        `;

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
}

// ===========================
// WIDGET: HEATMAP
// ===========================

function renderHeatmap() {
    const container = document.getElementById('heatmapContent');
    const metric = document.getElementById('heatmapMetric').value;

    container.innerHTML = '';

    // Get last 6 months
    const now = new Date();
    const months = [];
    for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        months.push(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
    }

    // Get data for each site and month
    const heatmapData = {
        blog: months.map(m => getMetricValue(m, 'blog', metric)),
        brecho: months.map(m => getMetricValue(m, 'brecho', metric)),
        cetus: months.map(m => getMetricValue(m, 'cetus', metric))
    };

    // Find min and max for normalization
    const allValues = [...heatmapData.blog, ...heatmapData.brecho, ...heatmapData.cetus].filter(v => v > 0);
    const max = Math.max(...allValues, 1);

    // Create grid
    const grid = document.createElement('div');
    grid.className = 'heatmap-grid';

    // Header row
    const headerRow = document.createElement('div');
    headerRow.className = 'heatmap-row';
    headerRow.innerHTML = '<div class="heatmap-label"></div>' +
        months.map(m => `<div class="heatmap-label">${formatMonthYear(m)}</div>`).join('');
    grid.appendChild(headerRow);

    // Site rows
    ['blog', 'brecho', 'cetus'].forEach(site => {
        const row = document.createElement('div');
        row.className = 'heatmap-row';

        row.innerHTML = `<div class="heatmap-label">${siteLabels[site]}</div>` +
            heatmapData[site].map(value => {
                const level = getHeatmapLevel(value, max);
                return `<div class="heatmap-cell level-${level}" title="${formatNumber(value)}">${formatNumber(value)}</div>`;
            }).join('');

        grid.appendChild(row);
    });

    container.appendChild(grid);
}

function getMetricValue(month, site, metric) {
    const record = records.find(r => r.month === month && r.site === site);
    if (!record) return 0;

    switch(metric) {
        case 'revenue': return record.revenue;
        case 'traffic': return record.traffic;
        case 'conversions': return record.conversions;
        default: return 0;
    }
}

function getHeatmapLevel(value, max) {
    if (value === 0) return 0;

    const percentage = (value / max) * 100;

    if (percentage >= 80) return 5;
    if (percentage >= 60) return 4;
    if (percentage >= 40) return 3;
    if (percentage >= 20) return 2;
    return 1;
}

// ===========================
// WIDGET CONFIGURATION
// ===========================

function initializeWidgetConfig() {
    const container = document.getElementById('widgetConfigList');
    container.innerHTML = '';

    const widgetNames = {
        'summary': '📈 Resumo Geral',
        'traffic-chart': '📈 Gráfico de Tráfego',
        'revenue-chart': '💰 Gráfico de Receita',
        'distribution-chart': '📊 Distribuição de Tráfego',
        'conversion': '🎯 Taxa de Conversão',
        'roi': '📝 ROI de Conteúdo',
        'goals': '🎯 Metas',
        'trends': '📊 Tendências',
        'table': '📋 Tabela Comparativa',
        'heatmap': '🔥 Heatmap'
    };

    Object.keys(widgetNames).forEach(key => {
        const item = document.createElement('div');
        item.className = 'widget-config-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `config-${key}`;
        checkbox.checked = widgetConfig[key];
        checkbox.addEventListener('change', (e) => {
            widgetConfig[key] = e.target.checked;
            saveData();
            applyWidgetConfig();
        });

        const label = document.createElement('label');
        label.htmlFor = `config-${key}`;
        label.textContent = widgetNames[key];

        item.appendChild(checkbox);
        item.appendChild(label);
        container.appendChild(item);
    });
}

function applyWidgetConfig() {
    Object.keys(widgetConfig).forEach(key => {
        const widget = document.getElementById(`widget-${key}`);
        if (widget) {
            if (widgetConfig[key]) {
                widget.classList.remove('hidden');
            } else {
                widget.classList.add('hidden');
            }
        }
    });
}

function openWidgetsModal() {
    document.getElementById('widgetsModal').classList.add('active');
}

// ===========================
// COMPARISON
// ===========================

function openCompareModal() {
    document.getElementById('compareModal').classList.add('active');
}

function runComparison() {
    const period1 = document.getElementById('comparePeriod1').value;
    const period2 = document.getElementById('comparePeriod2').value;

    if (!period1 || !period2) {
        alert('Selecione ambos os períodos!');
        return;
    }

    const data1 = records.filter(r => r.month === period1);
    const data2 = records.filter(r => r.month === period2);

    const stats1 = calculatePeriodStats(data1);
    const stats2 = calculatePeriodStats(data2);

    displayComparison(period1, stats1, period2, stats2);
}

function calculatePeriodStats(data) {
    return {
        traffic: data.reduce((sum, r) => sum + r.traffic, 0),
        conversions: data.reduce((sum, r) => sum + r.conversions, 0),
        revenue: data.reduce((sum, r) => sum + r.revenue, 0),
        bounce: data.length > 0 ? data.reduce((sum, r) => sum + r.bounce, 0) / data.length : 0
    };
}

function displayComparison(period1, stats1, period2, stats2) {
    const container = document.getElementById('compareResults');

    container.innerHTML = `
        <div class="compare-grid">
            <div class="compare-card">
                <div class="compare-period">${formatMonthYear(period1)}</div>
                <div class="compare-stat">
                    <span class="compare-label">Tráfego:</span>
                    <span class="compare-value">${formatNumber(stats1.traffic)}</span>
                </div>
                <div class="compare-stat">
                    <span class="compare-label">Conversões:</span>
                    <span class="compare-value">${formatNumber(stats1.conversions)}</span>
                </div>
                <div class="compare-stat">
                    <span class="compare-label">Receita:</span>
                    <span class="compare-value">R$ ${formatNumber(stats1.revenue)}</span>
                </div>
                <div class="compare-stat">
                    <span class="compare-label">Taxa Rejeição:</span>
                    <span class="compare-value">${stats1.bounce.toFixed(1)}%</span>
                </div>
            </div>

            <div class="compare-card">
                <div class="compare-period">${formatMonthYear(period2)}</div>
                <div class="compare-stat">
                    <span class="compare-label">Tráfego:</span>
                    <span class="compare-value">${formatNumber(stats2.traffic)}</span>
                </div>
                <div class="compare-stat">
                    <span class="compare-label">Conversões:</span>
                    <span class="compare-value">${formatNumber(stats2.conversions)}</span>
                </div>
                <div class="compare-stat">
                    <span class="compare-label">Receita:</span>
                    <span class="compare-value">R$ ${formatNumber(stats2.revenue)}</span>
                </div>
                <div class="compare-stat">
                    <span class="compare-label">Taxa Rejeição:</span>
                    <span class="compare-value">${stats2.bounce.toFixed(1)}%</span>
                </div>
            </div>
        </div>

        <div class="compare-diff">
            <h4>Diferenças (${formatMonthYear(period2)} vs ${formatMonthYear(period1)})</h4>
            ${getDiffItem('Tráfego', stats1.traffic, stats2.traffic)}
            ${getDiffItem('Conversões', stats1.conversions, stats2.conversions)}
            ${getDiffItem('Receita', stats1.revenue, stats2.revenue, 'R$')}
            ${getDiffItem('Taxa Rejeição', stats1.bounce, stats2.bounce, '%', true)}
        </div>
    `;
}

function getDiffItem(label, val1, val2, prefix = '', reverse = false) {
    const diff = val2 - val1;
    const percentDiff = val1 > 0 ? ((diff / val1) * 100) : 0;

    const sign = diff > 0 ? '+' : '';
    const className = reverse
        ? (diff < 0 ? 'positive' : 'negative')
        : (diff > 0 ? 'positive' : 'negative');

    return `
        <div class="diff-item">
            <span>${label}:</span>
            <span class="diff-value ${className}">
                ${sign}${formatNumber(Math.abs(diff))} ${prefix} (${sign}${percentDiff.toFixed(1)}%)
            </span>
        </div>
    `;
}

// ===========================
// EXPORT / IMPORT
// ===========================

function openExportModal() {
    document.getElementById('exportModal').classList.add('active');
}

function exportJSON() {
    const dataStr = JSON.stringify(records, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `fp-analytics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    URL.revokeObjectURL(url);
}

function exportCSV() {
    const headers = ['Mês', 'Site', 'Tráfego', 'Pageviews', 'Usuários', 'Taxa Rejeição (%)',
                    'Tempo Médio (min)', 'Posição Google', 'Cliques Afiliados', 'Conversões',
                    'Receita (R$)', 'Newsletter', 'Posts', 'Backlinks', 'Notas'];

    const rows = records.map(r => [
        r.month,
        siteLabels[r.site],
        r.traffic,
        r.pageviews,
        r.users,
        r.bounce,
        r.avgTime,
        r.position,
        r.clicks,
        r.conversions,
        r.revenue,
        r.newsletter,
        r.posts,
        r.backlinks,
        `"${(r.notes || '').replace(/"/g, '""')}"`
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `fp-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    URL.revokeObjectURL(url);
}

function importJSON(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importedRecords = JSON.parse(e.target.result);

            if (confirm('Deseja mesclar com os dados existentes ou substituir tudo?\n\nOK = Mesclar | Cancelar = Substituir')) {
                // Merge
                importedRecords.forEach(newRecord => {
                    const exists = records.find(r => r.month === newRecord.month && r.site === newRecord.site);
                    if (!exists) {
                        records.push(newRecord);
                    }
                });
            } else {
                // Replace
                records = importedRecords;
            }

            saveData();
            renderDashboard();
            document.getElementById('exportModal').classList.remove('active');
            alert('Dados importados com sucesso!');
        } catch (error) {
            alert('Erro ao importar JSON. Verifique o formato do arquivo.');
        }
    };

    reader.readAsText(file);
    e.target.value = '';
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatNumber(num) {
    return new Intl.NumberFormat('pt-BR').format(Math.round(num));
}

function formatMonthYear(monthStr) {
    const [year, month] = monthStr.split('-');
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                   'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${months[parseInt(month) - 1]}/${year}`;
}

function sortTable(column) {
    // Simple implementation - would need state management for proper sorting
    console.log('Sort by:', column);
}
