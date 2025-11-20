// ========================================
// FP A/B Testing Tracker
// Sprint Lab #24
// ========================================

// ========================================
// Application State
// ========================================
let tests = [];
let library = {
    titles: [],
    ctas: [],
    layouts: [],
    other: []
};
let currentTestId = null;
let currentView = 'all';
let filters = {
    search: '',
    item: '',
    status: '',
    winner: ''
};
let comparisonChart = null;

// ========================================
// LocalStorage Functions
// ========================================
function saveToLocalStorage() {
    localStorage.setItem('fpABTesting_tests', JSON.stringify(tests));
    localStorage.setItem('fpABTesting_library', JSON.stringify(library));
}

function loadFromLocalStorage() {
    const testsData = localStorage.getItem('fpABTesting_tests');
    const libraryData = localStorage.getItem('fpABTesting_library');

    if (testsData) {
        tests = JSON.parse(testsData);
    }

    if (libraryData) {
        library = JSON.parse(libraryData);
    }
}

// ========================================
// Utility Functions
// ========================================
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function calculateConversionRate(conversions, views) {
    if (views === 0) return 0;
    return ((conversions / views) * 100).toFixed(2);
}

function calculateDifference(valueB, valueA) {
    if (valueA === 0) return 0;
    return (((valueB - valueA) / valueA) * 100).toFixed(2);
}

function calculateDuration(startDate, endDate) {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// ========================================
// Test CRUD Functions
// ========================================
function createTest(testData) {
    const newTest = {
        id: generateId(),
        ...testData,
        createdAt: new Date().toISOString()
    };
    tests.push(newTest);
    saveToLocalStorage();
    return newTest;
}

function updateTest(id, testData) {
    const index = tests.findIndex(t => t.id === id);
    if (index !== -1) {
        tests[index] = {
            ...tests[index],
            ...testData,
            updatedAt: new Date().toISOString()
        };
        saveToLocalStorage();
        return tests[index];
    }
    return null;
}

function deleteTest(id) {
    const index = tests.findIndex(t => t.id === id);
    if (index !== -1) {
        tests.splice(index, 1);
        saveToLocalStorage();
        return true;
    }
    return false;
}

function duplicateTest(id) {
    const test = tests.find(t => t.id === id);
    if (test) {
        const duplicated = {
            ...JSON.parse(JSON.stringify(test)),
            id: generateId(),
            name: test.name + ' (Cópia)',
            status: 'Planejado',
            winner: '',
            conclusions: '',
            createdAt: new Date().toISOString()
        };
        tests.push(duplicated);
        saveToLocalStorage();
        return duplicated;
    }
    return null;
}

function getTestById(id) {
    return tests.find(t => t.id === id);
}

// ========================================
// Dashboard Statistics
// ========================================
function calculateStats() {
    const total = tests.length;
    const running = tests.filter(t => t.status === 'Em Execução').length;

    // Success rate: tests with a clear winner (A, B, or C) vs total completed
    const completed = tests.filter(t => t.status === 'Concluído');
    const successful = completed.filter(t => t.winner && t.winner !== 'Empate' && t.winner !== 'Inconclusivo');
    const successRate = completed.length > 0 ? ((successful.length / completed.length) * 100).toFixed(1) : 0;

    // Average lift: average improvement from winner vs control (variant A)
    let totalLift = 0;
    let liftCount = 0;

    completed.forEach(test => {
        if (test.winner === 'B' || test.winner === 'C') {
            const convRateA = parseFloat(calculateConversionRate(test.conversionsA || 0, test.viewsA || 0));
            let winnerConvRate = 0;

            if (test.winner === 'B') {
                winnerConvRate = parseFloat(calculateConversionRate(test.conversionsB || 0, test.viewsB || 0));
            } else if (test.winner === 'C') {
                winnerConvRate = parseFloat(calculateConversionRate(test.conversionsC || 0, test.viewsC || 0));
            }

            if (convRateA > 0) {
                const lift = ((winnerConvRate - convRateA) / convRateA) * 100;
                totalLift += lift;
                liftCount++;
            }
        }
    });

    const avgLift = liftCount > 0 ? (totalLift / liftCount).toFixed(1) : 0;

    return {
        total,
        running,
        successRate,
        avgLift
    };
}

function updateDashboard() {
    const stats = calculateStats();

    document.getElementById('totalTests').textContent = stats.total;
    document.getElementById('runningTests').textContent = stats.running;
    document.getElementById('successRate').textContent = stats.successRate + '%';
    document.getElementById('avgLift').textContent = '+' + stats.avgLift + '%';

    // Update running badge
    document.getElementById('runningBadge').textContent = stats.running;

    // Update insights
    generateInsights();
}

// ========================================
// Insights Generation
// ========================================
function generateInsights() {
    const insightsList = document.getElementById('insightsList');
    const completed = tests.filter(t => t.status === 'Concluído' && t.winner && t.winner !== 'Empate' && t.winner !== 'Inconclusivo');

    if (completed.length === 0) {
        insightsList.innerHTML = '<p style="color: #666;">Nenhum insight disponível ainda. Complete testes para gerar insights automáticos.</p>';
        return;
    }

    const insights = [];

    // Group by item tested
    const byItem = {};
    completed.forEach(test => {
        if (!byItem[test.item]) {
            byItem[test.item] = [];
        }
        byItem[test.item].push(test);
    });

    // Generate insights for each item type
    Object.keys(byItem).forEach(item => {
        const itemTests = byItem[item];
        if (itemTests.length >= 2) {
            // Calculate average improvement
            let totalImprovement = 0;
            let count = 0;

            itemTests.forEach(test => {
                const convRateA = parseFloat(calculateConversionRate(test.conversionsA || 0, test.viewsA || 0));
                let winnerConvRate = 0;

                if (test.winner === 'B') {
                    winnerConvRate = parseFloat(calculateConversionRate(test.conversionsB || 0, test.viewsB || 0));
                } else if (test.winner === 'C') {
                    winnerConvRate = parseFloat(calculateConversionRate(test.conversionsC || 0, test.viewsC || 0));
                }

                if (convRateA > 0 && winnerConvRate > convRateA) {
                    const improvement = ((winnerConvRate - convRateA) / convRateA) * 100;
                    totalImprovement += improvement;
                    count++;
                }
            });

            if (count > 0) {
                const avgImprovement = (totalImprovement / count).toFixed(1);
                insights.push({
                    item,
                    improvement: avgImprovement,
                    count
                });
            }
        }
    });

    // Sort by improvement
    insights.sort((a, b) => parseFloat(b.improvement) - parseFloat(a.improvement));

    // Render insights
    if (insights.length === 0) {
        insightsList.innerHTML = '<p style="color: #666;">Continue testando para gerar insights específicos.</p>';
    } else {
        insightsList.innerHTML = insights.slice(0, 5).map(insight => {
            return `<div class="insight-item">💡 ${insight.item}s otimizados convertem +${insight.improvement}% em média (baseado em ${insight.count} teste${insight.count > 1 ? 's' : ''})</div>`;
        }).join('');
    }
}

// ========================================
// Library Management
// ========================================
function addToLibrary(test) {
    if (!test.winner || test.winner === 'Empate' || test.winner === 'Inconclusivo') {
        return;
    }

    let winnerVariant = '';
    let improvement = 0;

    const convRateA = parseFloat(calculateConversionRate(test.conversionsA || 0, test.viewsA || 0));

    if (test.winner === 'A') {
        winnerVariant = test.variantA;
        improvement = 0;
    } else if (test.winner === 'B') {
        winnerVariant = test.variantB;
        const convRateB = parseFloat(calculateConversionRate(test.conversionsB || 0, test.viewsB || 0));
        if (convRateA > 0) {
            improvement = ((convRateB - convRateA) / convRateA) * 100;
        }
    } else if (test.winner === 'C') {
        winnerVariant = test.variantC;
        const convRateC = parseFloat(calculateConversionRate(test.conversionsC || 0, test.viewsC || 0));
        if (convRateA > 0) {
            improvement = ((convRateC - convRateA) / convRateA) * 100;
        }
    }

    const libraryItem = {
        id: generateId(),
        testName: test.name,
        item: test.item,
        variant: winnerVariant,
        improvement: improvement.toFixed(1),
        date: new Date().toISOString()
    };

    // Add to appropriate category
    if (test.item === 'Título') {
        library.titles.push(libraryItem);
    } else if (test.item === 'CTA') {
        library.ctas.push(libraryItem);
    } else if (test.item === 'Layout') {
        library.layouts.push(libraryItem);
    } else {
        library.other.push(libraryItem);
    }

    saveToLocalStorage();
}

function renderLibrary() {
    const container = document.getElementById('libraryContent');

    const categories = [
        { name: 'Títulos', items: library.titles },
        { name: 'CTAs', items: library.ctas },
        { name: 'Layouts', items: library.layouts },
        { name: 'Outros', items: library.other }
    ];

    let html = '';

    categories.forEach(category => {
        if (category.items.length > 0) {
            html += `
                <div class="library-category">
                    <h3>${category.name}</h3>
                    <div class="library-items">
                        ${category.items.map(item => `
                            <div class="library-item">
                                <strong>${item.testName}</strong>: ${item.variant}
                                <span class="improvement">+${item.improvement}%</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    });

    if (html === '') {
        container.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Nenhuma variação salva ainda. Complete testes com vencedores claros para popular a biblioteca.</p>';
    } else {
        container.innerHTML = html;
    }
}

// ========================================
// Rendering Functions
// ========================================
function renderTests(containerSelector, testsToRender) {
    const container = document.querySelector(containerSelector);
    container.innerHTML = '';

    if (testsToRender.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #666;">Nenhum teste encontrado.</p>';
        return;
    }

    testsToRender.forEach(test => {
        const card = createTestCard(test);
        container.appendChild(card);
    });
}

function createTestCard(test) {
    const card = document.createElement('div');
    card.className = `test-card ${test.status.toLowerCase().replace(' ', '-')}`;

    const duration = calculateDuration(test.startDate, test.endDate);

    let winnerInfo = '';
    if (test.winner && test.status === 'Concluído') {
        const convRateA = parseFloat(calculateConversionRate(test.conversionsA || 0, test.viewsA || 0));
        let winnerConvRate = 0;
        let improvement = 0;

        if (test.winner === 'A') {
            winnerConvRate = convRateA;
        } else if (test.winner === 'B') {
            winnerConvRate = parseFloat(calculateConversionRate(test.conversionsB || 0, test.viewsB || 0));
        } else if (test.winner === 'C') {
            winnerConvRate = parseFloat(calculateConversionRate(test.conversionsC || 0, test.viewsC || 0));
        }

        if (convRateA > 0 && (test.winner === 'B' || test.winner === 'C')) {
            improvement = ((winnerConvRate - convRateA) / convRateA) * 100;
        }

        winnerInfo = `
            <div class="winner-info">
                <div class="winner-badge">🏆 Vencedor: Variante ${test.winner}</div>
                ${improvement > 0 ? `<div class="improvement">Melhoria: +${improvement.toFixed(1)}% conversões</div>` : ''}
            </div>
        `;
    }

    card.innerHTML = `
        <h3>🧪 ${test.name}</h3>
        <div class="meta">
            <span>📦 ${test.item}</span>
            ${test.page ? `<span>📍 ${test.page}</span>` : ''}
            ${duration > 0 ? `<span>⏱️ ${duration} dias</span>` : ''}
        </div>
        <span class="status-badge ${test.status.replace(' ', '.')}">${test.status}</span>
        ${winnerInfo}
        <div class="actions">
            <button class="btn btn-primary btn-small" onclick="viewAnalysis('${test.id}')">📊 Ver Detalhes</button>
            <button class="btn btn-secondary btn-small" onclick="editTest('${test.id}')">✏️ Editar</button>
            <button class="btn btn-secondary btn-small" onclick="duplicateTestAction('${test.id}')">📋 Duplicar</button>
        </div>
    `;

    return card;
}

function refreshView() {
    const filteredTests = getFilteredTests();

    if (currentView === 'all') {
        renderTests('#testsGrid', filteredTests);
    } else if (currentView === 'running') {
        const running = filteredTests.filter(t => t.status === 'Em Execução');
        renderTests('#runningGrid', running);
    } else if (currentView === 'completed') {
        const completed = filteredTests.filter(t => t.status === 'Concluído');
        renderTests('#completedGrid', completed);
    } else if (currentView === 'library') {
        renderLibrary();
    }

    updateDashboard();
}

// ========================================
// Filters
// ========================================
function getFilteredTests() {
    return tests.filter(test => {
        // Search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            const matchesSearch =
                test.name.toLowerCase().includes(searchLower) ||
                (test.hypothesis && test.hypothesis.toLowerCase().includes(searchLower)) ||
                (test.conclusions && test.conclusions.toLowerCase().includes(searchLower));

            if (!matchesSearch) return false;
        }

        // Item filter
        if (filters.item && test.item !== filters.item) {
            return false;
        }

        // Status filter
        if (filters.status && test.status !== filters.status) {
            return false;
        }

        // Winner filter
        if (filters.winner && test.winner !== filters.winner) {
            return false;
        }

        return true;
    });
}

function applyFilters() {
    refreshView();
}

// ========================================
// Analysis Modal with Chart.js
// ========================================
function viewAnalysis(testId) {
    const test = getTestById(testId);
    if (!test) return;

    const modal = document.getElementById('analysisModal');
    document.getElementById('analysisTestName').textContent = `Análise: ${test.name}`;

    // Render comparison table
    renderComparisonTable(test);

    // Render chart
    renderComparisonChart(test);

    modal.classList.add('active');
}

function renderComparisonTable(test) {
    const table = document.getElementById('comparisonTable');

    const convRateA = parseFloat(calculateConversionRate(test.conversionsA || 0, test.viewsA || 0));
    const convRateB = parseFloat(calculateConversionRate(test.conversionsB || 0, test.viewsB || 0));
    const convRateC = test.variantC ? parseFloat(calculateConversionRate(test.conversionsC || 0, test.viewsC || 0)) : null;

    const diffB = calculateDifference(convRateB, convRateA);
    const diffC = convRateC !== null ? calculateDifference(convRateC, convRateA) : null;

    // Determine winner
    let winnerA = false, winnerB = false, winnerC = false;
    if (test.winner === 'A') winnerA = true;
    if (test.winner === 'B') winnerB = true;
    if (test.winner === 'C') winnerC = true;

    let html = `
        <thead>
            <tr>
                <th>Métrica</th>
                <th>Variante A ${winnerA ? '🏆' : ''}</th>
                <th>Variante B ${winnerB ? '🏆' : ''}</th>
                ${test.variantC ? `<th>Variante C ${winnerC ? '🏆' : ''}</th>` : ''}
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Visualizações</strong></td>
                <td class="${winnerA ? 'winner-cell' : ''}">${test.viewsA || 0}</td>
                <td class="${winnerB ? 'winner-cell' : ''}">${test.viewsB || 0}</td>
                ${test.variantC ? `<td class="${winnerC ? 'winner-cell' : ''}">${test.viewsC || 0}</td>` : ''}
            </tr>
            <tr>
                <td><strong>Conversões</strong></td>
                <td class="${winnerA ? 'winner-cell' : ''}">${test.conversionsA || 0}</td>
                <td class="${winnerB ? 'winner-cell' : ''}">${test.conversionsB || 0}</td>
                ${test.variantC ? `<td class="${winnerC ? 'winner-cell' : ''}">${test.conversionsC || 0}</td>` : ''}
            </tr>
            <tr>
                <td><strong>Taxa de Conversão</strong></td>
                <td class="${winnerA ? 'winner-cell' : ''}">${convRateA}%</td>
                <td class="${winnerB ? 'winner-cell' : ''}">${convRateB}%</td>
                ${test.variantC ? `<td class="${winnerC ? 'winner-cell' : ''}">${convRateC}%</td>` : ''}
            </tr>
            <tr>
                <td><strong>Receita</strong></td>
                <td class="${winnerA ? 'winner-cell' : ''}">R$ ${parseFloat(test.revenueA || 0).toFixed(2)}</td>
                <td class="${winnerB ? 'winner-cell' : ''}">R$ ${parseFloat(test.revenueB || 0).toFixed(2)}</td>
                ${test.variantC ? `<td class="${winnerC ? 'winner-cell' : ''}">R$ ${parseFloat(test.revenueC || 0).toFixed(2)}</td>` : ''}
            </tr>
            <tr>
                <td><strong>Diferença vs A</strong></td>
                <td>-</td>
                <td class="${diffB >= 0 ? 'diff-positive' : 'diff-negative'}">${diffB > 0 ? '+' : ''}${diffB}%</td>
                ${test.variantC ? `<td class="${diffC >= 0 ? 'diff-positive' : 'diff-negative'}">${diffC > 0 ? '+' : ''}${diffC}%</td>` : ''}
            </tr>
        </tbody>
    `;

    table.innerHTML = html;
}

function renderComparisonChart(test) {
    const ctx = document.getElementById('comparisonChart');

    // Destroy existing chart if any
    if (comparisonChart) {
        comparisonChart.destroy();
    }

    const convRateA = parseFloat(calculateConversionRate(test.conversionsA || 0, test.viewsA || 0));
    const convRateB = parseFloat(calculateConversionRate(test.conversionsB || 0, test.viewsB || 0));
    const convRateC = test.variantC ? parseFloat(calculateConversionRate(test.conversionsC || 0, test.viewsC || 0)) : null;

    const labels = ['Variante A', 'Variante B'];
    const data = [convRateA, convRateB];
    const colors = [
        test.winner === 'A' ? '#4caf50' : '#3949ab',
        test.winner === 'B' ? '#4caf50' : '#3949ab'
    ];

    if (test.variantC) {
        labels.push('Variante C');
        data.push(convRateC);
        colors.push(test.winner === 'C' ? '#4caf50' : '#3949ab');
    }

    comparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Taxa de Conversão (%)',
                data: data,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Comparação de Taxa de Conversão',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// ========================================
// Modal Management
// ========================================
function openTestModal(testId = null) {
    const modal = document.getElementById('testModal');
    const form = document.getElementById('testForm');
    const modalTitle = document.getElementById('testModalTitle');
    const deleteBtn = document.getElementById('deleteTestBtn');

    form.reset();

    // Reset conversion rate displays
    document.getElementById('convRateA').value = '0%';
    document.getElementById('convRateB').value = '0%';
    document.getElementById('convRateC').value = '0%';
    document.getElementById('testDuration').value = '';

    if (testId) {
        const test = getTestById(testId);
        if (test) {
            modalTitle.textContent = 'Editar Teste A/B';
            deleteBtn.style.display = 'inline-block';

            // Populate form
            document.getElementById('testId').value = test.id;
            document.getElementById('testName').value = test.name;
            document.getElementById('testItem').value = test.item;
            document.getElementById('testPage').value = test.page || '';
            document.getElementById('testMetric').value = test.metric;
            document.getElementById('testStatus').value = test.status;
            document.getElementById('testStartDate').value = test.startDate || '';
            document.getElementById('testEndDate').value = test.endDate || '';
            document.getElementById('testHypothesis').value = test.hypothesis || '';
            document.getElementById('variantA').value = test.variantA;
            document.getElementById('variantB').value = test.variantB;
            document.getElementById('variantC').value = test.variantC || '';

            // Results
            document.getElementById('viewsA').value = test.viewsA || 0;
            document.getElementById('conversionsA').value = test.conversionsA || 0;
            document.getElementById('revenueA').value = test.revenueA || 0;
            document.getElementById('timeA').value = test.timeA || 0;

            document.getElementById('viewsB').value = test.viewsB || 0;
            document.getElementById('conversionsB').value = test.conversionsB || 0;
            document.getElementById('revenueB').value = test.revenueB || 0;
            document.getElementById('timeB').value = test.timeB || 0;

            document.getElementById('viewsC').value = test.viewsC || 0;
            document.getElementById('conversionsC').value = test.conversionsC || 0;
            document.getElementById('revenueC').value = test.revenueC || 0;
            document.getElementById('timeC').value = test.timeC || 0;

            // Analysis
            document.getElementById('testWinner').value = test.winner || '';
            document.getElementById('testConfidence').value = test.confidence || 'Baixo';
            document.getElementById('testConclusions').value = test.conclusions || '';

            // Calculate and display conversion rates
            updateConversionRates();
            updateDurationDisplay();
        }
    } else {
        modalTitle.textContent = 'Novo Teste A/B';
        deleteBtn.style.display = 'none';
    }

    modal.classList.add('active');
}

function closeTestModal() {
    document.getElementById('testModal').classList.remove('active');
}

function updateConversionRates() {
    const viewsA = parseInt(document.getElementById('viewsA').value) || 0;
    const conversionsA = parseInt(document.getElementById('conversionsA').value) || 0;
    const convRateA = calculateConversionRate(conversionsA, viewsA);
    document.getElementById('convRateA').value = convRateA + '%';

    const viewsB = parseInt(document.getElementById('viewsB').value) || 0;
    const conversionsB = parseInt(document.getElementById('conversionsB').value) || 0;
    const convRateB = calculateConversionRate(conversionsB, viewsB);
    document.getElementById('convRateB').value = convRateB + '%';

    const viewsC = parseInt(document.getElementById('viewsC').value) || 0;
    const conversionsC = parseInt(document.getElementById('conversionsC').value) || 0;
    const convRateC = calculateConversionRate(conversionsC, viewsC);
    document.getElementById('convRateC').value = convRateC + '%';
}

function updateDurationDisplay() {
    const startDate = document.getElementById('testStartDate').value;
    const endDate = document.getElementById('testEndDate').value;

    if (startDate && endDate) {
        const duration = calculateDuration(startDate, endDate);
        document.getElementById('testDuration').value = duration + ' dias';
    } else {
        document.getElementById('testDuration').value = '';
    }
}

// ========================================
// Export/Import Functions
// ========================================
function exportJSON() {
    const data = {
        tests: tests,
        library: library,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fp-ab-testing-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function exportCSV() {
    const headers = ['Nome', 'Item', 'Status', 'Data Início', 'Data Fim', 'Vencedor', 'Melhoria %', 'Visualizações A', 'Conversões A', 'Taxa A %', 'Visualizações B', 'Conversões B', 'Taxa B %'];

    const rows = tests.map(test => {
        const convRateA = calculateConversionRate(test.conversionsA || 0, test.viewsA || 0);
        const convRateB = calculateConversionRate(test.conversionsB || 0, test.viewsB || 0);
        const improvement = calculateDifference(parseFloat(convRateB), parseFloat(convRateA));

        return [
            test.name,
            test.item,
            test.status,
            test.startDate || '',
            test.endDate || '',
            test.winner || '',
            improvement,
            test.viewsA || 0,
            test.conversionsA || 0,
            convRateA,
            test.viewsB || 0,
            test.conversionsB || 0,
            convRateB
        ];
    });

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
        csv += row.map(field => `"${field}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fp-ab-testing-export-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

function importJSON(file) {
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);

            if (data.tests && Array.isArray(data.tests)) {
                // Merge tests
                data.tests.forEach(importedTest => {
                    const existingIndex = tests.findIndex(t => t.id === importedTest.id);
                    if (existingIndex === -1) {
                        tests.push(importedTest);
                    }
                });

                saveToLocalStorage();
                refreshView();
                alert('Dados importados com sucesso!');
            } else {
                alert('Formato de arquivo inválido.');
            }
        } catch (error) {
            alert('Erro ao importar arquivo: ' + error.message);
        }
    };

    reader.readAsText(file);
}

// ========================================
// Event Handlers (Global functions for onclick)
// ========================================
window.editTest = function(testId) {
    openTestModal(testId);
};

window.duplicateTestAction = function(testId) {
    duplicateTest(testId);
    refreshView();
};

window.viewAnalysis = function(testId) {
    viewAnalysis(testId);
};

// ========================================
// Event Listeners
// ========================================
function setupEventListeners() {
    // New Test Button
    document.getElementById('newTestBtn').addEventListener('click', () => openTestModal());

    // Close Modals
    document.getElementById('closeTestModal').addEventListener('click', closeTestModal);
    document.getElementById('cancelTestBtn').addEventListener('click', closeTestModal);
    document.getElementById('closeAnalysisModal').addEventListener('click', () => {
        document.getElementById('analysisModal').classList.remove('active');
    });
    document.getElementById('closeExportModal').addEventListener('click', () => {
        document.getElementById('exportModal').classList.remove('active');
    });

    // Test Form Submit
    document.getElementById('testForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const testId = document.getElementById('testId').value;

        const testData = {
            name: document.getElementById('testName').value,
            item: document.getElementById('testItem').value,
            page: document.getElementById('testPage').value,
            metric: document.getElementById('testMetric').value,
            status: document.getElementById('testStatus').value,
            startDate: document.getElementById('testStartDate').value,
            endDate: document.getElementById('testEndDate').value,
            hypothesis: document.getElementById('testHypothesis').value,
            variantA: document.getElementById('variantA').value,
            variantB: document.getElementById('variantB').value,
            variantC: document.getElementById('variantC').value,
            viewsA: parseInt(document.getElementById('viewsA').value) || 0,
            conversionsA: parseInt(document.getElementById('conversionsA').value) || 0,
            revenueA: parseFloat(document.getElementById('revenueA').value) || 0,
            timeA: parseFloat(document.getElementById('timeA').value) || 0,
            viewsB: parseInt(document.getElementById('viewsB').value) || 0,
            conversionsB: parseInt(document.getElementById('conversionsB').value) || 0,
            revenueB: parseFloat(document.getElementById('revenueB').value) || 0,
            timeB: parseFloat(document.getElementById('timeB').value) || 0,
            viewsC: parseInt(document.getElementById('viewsC').value) || 0,
            conversionsC: parseInt(document.getElementById('conversionsC').value) || 0,
            revenueC: parseFloat(document.getElementById('revenueC').value) || 0,
            timeC: parseFloat(document.getElementById('timeC').value) || 0,
            winner: document.getElementById('testWinner').value,
            confidence: document.getElementById('testConfidence').value,
            conclusions: document.getElementById('testConclusions').value
        };

        // Validate dates
        if (testData.startDate && testData.endDate) {
            if (new Date(testData.endDate) < new Date(testData.startDate)) {
                alert('Data fim não pode ser anterior à data início.');
                return;
            }
        }

        if (testId) {
            const oldTest = getTestById(testId);
            updateTest(testId, testData);

            // If status changed to completed and has winner, add to library
            if (oldTest.status !== 'Concluído' && testData.status === 'Concluído' && testData.winner) {
                addToLibrary({ ...oldTest, ...testData });
            }
        } else {
            createTest(testData);
        }

        closeTestModal();
        refreshView();
    });

    // Delete Test Button
    document.getElementById('deleteTestBtn').addEventListener('click', function() {
        const testId = document.getElementById('testId').value;

        if (confirm('Tem certeza que deseja excluir este teste?')) {
            deleteTest(testId);
            closeTestModal();
            refreshView();
        }
    });

    // Update conversion rates on input change
    ['viewsA', 'conversionsA', 'viewsB', 'conversionsB', 'viewsC', 'conversionsC'].forEach(id => {
        document.getElementById(id).addEventListener('input', updateConversionRates);
    });

    // Update duration on date change
    ['testStartDate', 'testEndDate'].forEach(id => {
        document.getElementById(id).addEventListener('change', updateDurationDisplay);
    });

    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            currentView = this.dataset.tab;

            // Update tab buttons
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Update tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(currentView).classList.add('active');

            refreshView();
        });
    });

    // Filters
    document.getElementById('searchInput').addEventListener('input', function(e) {
        filters.search = e.target.value;
        applyFilters();
    });

    document.getElementById('filterItem').addEventListener('change', function(e) {
        filters.item = e.target.value;
        applyFilters();
    });

    document.getElementById('filterStatus').addEventListener('change', function(e) {
        filters.status = e.target.value;
        applyFilters();
    });

    document.getElementById('filterWinner').addEventListener('change', function(e) {
        filters.winner = e.target.value;
        applyFilters();
    });

    // Export/Import
    document.getElementById('exportBtn').addEventListener('click', function() {
        document.getElementById('exportModal').classList.add('active');
    });

    document.getElementById('exportJsonBtn').addEventListener('click', function() {
        exportJSON();
    });

    document.getElementById('exportCsvBtn').addEventListener('click', function() {
        exportCSV();
    });

    document.getElementById('importJsonBtn').addEventListener('click', function() {
        document.getElementById('importFile').click();
    });

    document.getElementById('importFile').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            importJSON(file);
            document.getElementById('exportModal').classList.remove('active');
        }
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
}

// ========================================
// Initialization
// ========================================
function init() {
    loadFromLocalStorage();
    setupEventListeners();
    refreshView();
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
