// ===== CATEGORIAS E UNIDADES =====
const CATEGORIES = {
    currency: {
        name: 'Moeda',
        units: {
            BRL: { name: 'Real Brasileiro (BRL)', symbol: 'R$' },
            USD: { name: 'Dólar Americano (USD)', symbol: '$' },
            EUR: { name: 'Euro (EUR)', symbol: '€' },
            GBP: { name: 'Libra Esterlina (GBP)', symbol: '£' },
            JPY: { name: 'Iene Japonês (JPY)', symbol: '¥' },
            CAD: { name: 'Dólar Canadense (CAD)', symbol: 'C$' },
            AUD: { name: 'Dólar Australiano (AUD)', symbol: 'A$' },
            CHF: { name: 'Franco Suíço (CHF)', symbol: 'CHF' },
            CNY: { name: 'Yuan Chinês (CNY)', symbol: '¥' },
            ARS: { name: 'Peso Argentino (ARS)', symbol: '$' },
            MXN: { name: 'Peso Mexicano (MXN)', symbol: '$' }
        }
    },
    length: {
        name: 'Comprimento',
        units: {
            mm: { name: 'Milímetro (mm)', toBase: 0.001 },
            cm: { name: 'Centímetro (cm)', toBase: 0.01 },
            m: { name: 'Metro (m)', toBase: 1 },
            km: { name: 'Quilômetro (km)', toBase: 1000 },
            in: { name: 'Polegada (in)', toBase: 0.0254 },
            ft: { name: 'Pé (ft)', toBase: 0.3048 },
            yd: { name: 'Jarda (yd)', toBase: 0.9144 },
            mi: { name: 'Milha (mi)', toBase: 1609.34 }
        }
    },
    mass: {
        name: 'Massa/Peso',
        units: {
            mg: { name: 'Miligrama (mg)', toBase: 0.000001 },
            g: { name: 'Grama (g)', toBase: 0.001 },
            kg: { name: 'Quilograma (kg)', toBase: 1 },
            t: { name: 'Tonelada (t)', toBase: 1000 },
            oz: { name: 'Onça (oz)', toBase: 0.0283495 },
            lb: { name: 'Libra (lb)', toBase: 0.453592 }
        }
    },
    temperature: {
        name: 'Temperatura',
        units: {
            C: { name: 'Celsius (°C)' },
            F: { name: 'Fahrenheit (°F)' },
            K: { name: 'Kelvin (K)' }
        }
    },
    area: {
        name: 'Área',
        units: {
            m2: { name: 'Metro² (m²)', toBase: 1 },
            km2: { name: 'Quilômetro² (km²)', toBase: 1000000 },
            ha: { name: 'Hectare (ha)', toBase: 10000 },
            acre: { name: 'Acre', toBase: 4046.86 },
            ft2: { name: 'Pé² (ft²)', toBase: 0.092903 },
            mi2: { name: 'Milha² (mi²)', toBase: 2589988 }
        }
    },
    volume: {
        name: 'Volume',
        units: {
            ml: { name: 'Mililitro (ml)', toBase: 0.001 },
            l: { name: 'Litro (L)', toBase: 1 },
            m3: { name: 'Metro³ (m³)', toBase: 1000 },
            galUS: { name: 'Galão US (gal)', toBase: 3.78541 },
            galUK: { name: 'Galão UK (gal)', toBase: 4.54609 },
            floz: { name: 'Onça Fluida (fl oz)', toBase: 0.0295735 },
            cup: { name: 'Xícara (cup)', toBase: 0.236588 },
            tbsp: { name: 'Colher de Sopa (tbsp)', toBase: 0.0147868 }
        }
    },
    time: {
        name: 'Tempo',
        units: {
            ms: { name: 'Milissegundo (ms)', toBase: 0.001 },
            s: { name: 'Segundo (s)', toBase: 1 },
            min: { name: 'Minuto (min)', toBase: 60 },
            h: { name: 'Hora (h)', toBase: 3600 },
            day: { name: 'Dia', toBase: 86400 },
            week: { name: 'Semana', toBase: 604800 },
            month: { name: 'Mês (30 dias)', toBase: 2592000 },
            year: { name: 'Ano (365 dias)', toBase: 31536000 }
        }
    },
    speed: {
        name: 'Velocidade',
        units: {
            kmh: { name: 'km/h', toBase: 0.277778 },
            ms: { name: 'm/s', toBase: 1 },
            mph: { name: 'Milhas/hora (mph)', toBase: 0.44704 },
            knot: { name: 'Nós (knot)', toBase: 0.514444 }
        }
    },
    data: {
        name: 'Armazenamento de Dados',
        units: {
            bit: { name: 'Bit', toBase: 0.125 },
            byte: { name: 'Byte (B)', toBase: 1 },
            kb: { name: 'Kilobyte (KB)', toBase: 1024 },
            mb: { name: 'Megabyte (MB)', toBase: 1048576 },
            gb: { name: 'Gigabyte (GB)', toBase: 1073741824 },
            tb: { name: 'Terabyte (TB)', toBase: 1099511627776 },
            pb: { name: 'Petabyte (PB)', toBase: 1125899906842624 }
        }
    },
    energy: {
        name: 'Energia',
        units: {
            j: { name: 'Joule (J)', toBase: 1 },
            cal: { name: 'Caloria (cal)', toBase: 4.184 },
            kcal: { name: 'Kilocaloria (kcal)', toBase: 4184 },
            kwh: { name: 'Kilowatt-hora (kWh)', toBase: 3600000 },
            btu: { name: 'BTU', toBase: 1055.06 }
        }
    },
    pressure: {
        name: 'Pressão',
        units: {
            pa: { name: 'Pascal (Pa)', toBase: 1 },
            bar: { name: 'Bar', toBase: 100000 },
            psi: { name: 'PSI', toBase: 6894.76 },
            atm: { name: 'Atmosfera (atm)', toBase: 101325 },
            mmHg: { name: 'mmHg', toBase: 133.322 }
        }
    },
    power: {
        name: 'Potência',
        units: {
            w: { name: 'Watt (W)', toBase: 1 },
            kw: { name: 'Kilowatt (kW)', toBase: 1000 },
            hp: { name: 'Cavalo-vapor (HP)', toBase: 745.7 }
        }
    },
    angle: {
        name: 'Ângulo',
        units: {
            deg: { name: 'Grau (°)', toBase: 1 },
            rad: { name: 'Radiano (rad)', toBase: 57.2958 },
            grad: { name: 'Grado (grad)', toBase: 0.9 }
        }
    },
    fuel: {
        name: 'Consumo de Combustível',
        units: {
            l100km: { name: 'Litro/100km', toBase: 1 },
            kml: { name: 'km/Litro', toBase: -1 }, // special case
            mpgUS: { name: 'MPG (US)', toBase: -2 }, // special case
            mpgUK: { name: 'MPG (UK)', toBase: -3 } // special case
        }
    },
    frequency: {
        name: 'Frequência',
        units: {
            hz: { name: 'Hertz (Hz)', toBase: 1 },
            khz: { name: 'Kilohertz (kHz)', toBase: 1000 },
            mhz: { name: 'Megahertz (MHz)', toBase: 1000000 },
            ghz: { name: 'Gigahertz (GHz)', toBase: 1000000000 }
        }
    },
    density: {
        name: 'Densidade',
        units: {
            kgm3: { name: 'kg/m³', toBase: 1 },
            gcm3: { name: 'g/cm³', toBase: 1000 },
            lbft3: { name: 'lb/ft³', toBase: 16.0185 }
        }
    },
    torque: {
        name: 'Torque',
        units: {
            nm: { name: 'Newton-metro (Nm)', toBase: 1 },
            lbft: { name: 'Libra-pé (lb-ft)', toBase: 1.35582 }
        }
    },
    illumination: {
        name: 'Iluminação',
        units: {
            lux: { name: 'Lux (lx)', toBase: 1 },
            lumen: { name: 'Lúmen (lm)', toBase: 1 }, // simplified
            candela: { name: 'Candela (cd)', toBase: 1 } // simplified
        }
    },
    radiation: {
        name: 'Radiação',
        units: {
            gray: { name: 'Gray (Gy)', toBase: 1 },
            sievert: { name: 'Sievert (Sv)', toBase: 1 },
            roentgen: { name: 'Roentgen (R)', toBase: 0.01 }
        }
    },
    viscosity: {
        name: 'Viscosidade',
        units: {
            pas: { name: 'Pascal-segundo (Pa·s)', toBase: 1 },
            poise: { name: 'Poise (P)', toBase: 0.1 },
            centipoise: { name: 'Centipoise (cP)', toBase: 0.001 }
        }
    }
};

// ===== TAXAS DE CÂMBIO PADRÃO =====
const DEFAULT_RATES = {
    BRL: 1.00,
    USD: 5.00,
    EUR: 5.40,
    GBP: 6.30,
    JPY: 0.035,
    CAD: 3.70,
    AUD: 3.30,
    CHF: 5.70,
    CNY: 0.70,
    ARS: 0.006,
    MXN: 0.30
};

// ===== ESTADO GLOBAL =====
let state = {
    currentCategory: '',
    currentFromUnit: '',
    currentToUnit: '',
    currentValue: 0,
    theme: 'light',
    rates: {},
    history: [],
    favorites: []
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initializeUI();
    initializeEventListeners();
    applyTheme();
});

// ===== CARREGAR ESTADO DO LOCALSTORAGE =====
function loadState() {
    state.theme = localStorage.getItem('fp_converter_theme') || 'light';
    state.rates = JSON.parse(localStorage.getItem('fp_converter_rates') || JSON.stringify(DEFAULT_RATES));
    state.history = JSON.parse(localStorage.getItem('fp_converter_history') || '[]');
    state.favorites = JSON.parse(localStorage.getItem('fp_converter_favorites') || '[]');

    // Adicionar favoritos padrão se não existirem
    if (state.favorites.length === 0) {
        state.favorites = [
            { id: '1', name: 'BRL → USD', category: 'currency', from: 'BRL', to: 'USD' },
            { id: '2', name: 'Celsius → Fahrenheit', category: 'temperature', from: 'C', to: 'F' },
            { id: '3', name: 'km/h → mph', category: 'speed', from: 'kmh', to: 'mph' },
            { id: '4', name: 'GB → MB', category: 'data', from: 'gb', to: 'mb' },
            { id: '5', name: 'Metros → Pés', category: 'length', from: 'm', to: 'ft' }
        ];
        saveState('favorites');
    }
}

function saveState(type) {
    if (type === 'theme') {
        localStorage.setItem('fp_converter_theme', state.theme);
    } else if (type === 'rates') {
        localStorage.setItem('fp_converter_rates', JSON.stringify(state.rates));
        updateRatesLastUpdate();
    } else if (type === 'history') {
        localStorage.setItem('fp_converter_history', JSON.stringify(state.history));
    } else if (type === 'favorites') {
        localStorage.setItem('fp_converter_favorites', JSON.stringify(state.favorites));
    }
}

// ===== INICIALIZAR UI =====
function initializeUI() {
    populateCategorySelectors();
    renderQuickFavorites();
    renderHistory();
    renderFavorites();
    renderRatesTable();
    updateTotalCategories();
    updateRatesLastUpdate();

    // Set theme selector
    document.getElementById('themeSelector').value = state.theme;

    // Set first category as default
    const firstCategory = Object.keys(CATEGORIES)[0];
    document.getElementById('categorySelect').value = firstCategory;
    handleCategoryChange();
}

function populateCategorySelectors() {
    const selectors = [
        'categorySelect',
        'viewAllCategory',
        'favoriteCategory',
        'filterHistoryCategory'
    ];

    selectors.forEach(id => {
        const select = document.getElementById(id);
        select.innerHTML = id === 'filterHistoryCategory' ? '<option value="">Todas as categorias</option>' : '';

        Object.keys(CATEGORIES).forEach(catKey => {
            const option = document.createElement('option');
            option.value = catKey;
            option.textContent = CATEGORIES[catKey].name;
            select.appendChild(option);
        });
    });
}

function populateUnitSelectors(category, fromId, toId) {
    const units = CATEGORIES[category].units;
    const fromSelect = document.getElementById(fromId);
    const toSelect = document.getElementById(toId);

    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';

    Object.keys(units).forEach(unitKey => {
        const option1 = document.createElement('option');
        option1.value = unitKey;
        option1.textContent = units[unitKey].name;
        fromSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = unitKey;
        option2.textContent = units[unitKey].name;
        toSelect.appendChild(option2);
    });

    // Set different defaults
    const unitKeys = Object.keys(units);
    if (unitKeys.length > 1) {
        toSelect.value = unitKeys[1];
    }
}

// ===== EVENT LISTENERS =====
function initializeEventListeners() {
    // Theme
    document.getElementById('themeSelector').addEventListener('change', handleThemeChange);

    // Category change
    document.getElementById('categorySelect').addEventListener('change', handleCategoryChange);
    document.getElementById('viewAllCategory').addEventListener('change', () => {
        const category = document.getElementById('viewAllCategory').value;
        if (category) {
            populateUnitSelectors(category, 'viewAllFromUnit', 'temp-dummy');
            document.getElementById('temp-dummy').remove();
        }
    });
    document.getElementById('favoriteCategory').addEventListener('change', () => {
        const category = document.getElementById('favoriteCategory').value;
        if (category) {
            populateUnitSelectors(category, 'favoriteFrom', 'favoriteTo');
        }
    });

    // Conversion
    document.getElementById('fromValue').addEventListener('input', performConversion);
    document.getElementById('fromUnit').addEventListener('change', performConversion);
    document.getElementById('toUnit').addEventListener('change', performConversion);

    // Actions
    document.getElementById('btnSwap').addEventListener('click', swapUnits);
    document.getElementById('btnClear').addEventListener('click', clearConversion);
    document.getElementById('btnFavorite').addEventListener('click', favoriteCurrentConversion);
    document.getElementById('btnCopy').addEventListener('click', copyResult);

    // View All
    document.getElementById('btnConvertAll').addEventListener('click', convertAll);

    // History
    document.getElementById('filterHistoryCategory').addEventListener('change', renderHistory);
    document.getElementById('btnClearHistory').addEventListener('click', clearHistory);
    document.getElementById('btnExportHistoryCSV').addEventListener('click', exportHistoryCSV);

    // Rates
    document.getElementById('btnSaveRates').addEventListener('click', saveRates);
    document.getElementById('btnResetRates').addEventListener('click', resetRates);

    // Favorites
    document.getElementById('btnAddFavorite').addEventListener('click', () => openFavoriteModal());
    document.getElementById('favoriteForm').addEventListener('submit', handleFavoriteSubmit);

    // Export/Import
    document.getElementById('btnExportJSON').addEventListener('click', exportJSON);
    document.getElementById('btnImportJSON').addEventListener('click', () => document.getElementById('importFileInput').click());
    document.getElementById('importFileInput').addEventListener('change', importJSON);

    // Modals
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModals();
        }
    });

    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            switchTab(tab);
        });
    });
}

// ===== TABS =====
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

// ===== TEMA =====
function handleThemeChange() {
    state.theme = document.getElementById('themeSelector').value;
    saveState('theme');
    applyTheme();
}

function applyTheme() {
    document.body.setAttribute('data-theme', state.theme);
}

// ===== CONVERSÃO =====
function handleCategoryChange() {
    const category = document.getElementById('categorySelect').value;
    state.currentCategory = category;

    populateUnitSelectors(category, 'fromUnit', 'toUnit');
    document.getElementById('fromValue').value = '';
    document.getElementById('toValue').value = '';
    document.getElementById('conversionFormula').textContent = '';
}

function performConversion() {
    const category = document.getElementById('categorySelect').value;
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const fromValueInput = document.getElementById('fromValue').value.trim();

    if (!category || !fromUnit || !toUnit || !fromValueInput) {
        document.getElementById('toValue').value = '';
        return;
    }

    // Calcular expressão matemática
    const value = evaluateExpression(fromValueInput);
    if (value === null) {
        document.getElementById('toValue').value = 'Erro na expressão';
        return;
    }

    // Converter
    const result = convert(category, fromUnit, toUnit, value);

    // Mostrar resultado
    document.getElementById('toValue').value = formatNumber(result);

    // Atualizar fórmula
    updateFormulaDisplay(category, fromUnit, toUnit, value, result);

    // Salvar no histórico
    addToHistory(category, fromUnit, toUnit, value, result);

    // Atualizar estado
    state.currentFromUnit = fromUnit;
    state.currentToUnit = toUnit;
    state.currentValue = value;
}

function convert(category, from, to, value) {
    if (category === 'currency') {
        return convertCurrency(from, to, value);
    } else if (category === 'temperature') {
        return convertTemperature(from, to, value);
    } else if (category === 'fuel') {
        return convertFuel(from, to, value);
    } else {
        // Standard conversion using base unit
        const units = CATEGORIES[category].units;
        const fromBase = units[from].toBase;
        const toBase = units[to].toBase;
        return (value * fromBase) / toBase;
    }
}

function convertCurrency(from, to, value) {
    const fromRate = state.rates[from] || DEFAULT_RATES[from] || 1;
    const toRate = state.rates[to] || DEFAULT_RATES[to] || 1;

    // Convert to BRL first, then to target currency
    const inBRL = value / fromRate;
    return inBRL * toRate;
}

function convertTemperature(from, to, value) {
    let celsius;

    // Convert to Celsius first
    if (from === 'C') celsius = value;
    else if (from === 'F') celsius = (value - 32) * 5/9;
    else if (from === 'K') celsius = value - 273.15;

    // Convert from Celsius to target
    if (to === 'C') return celsius;
    if (to === 'F') return (celsius * 9/5) + 32;
    if (to === 'K') return celsius + 273.15;
}

function convertFuel(from, to, value) {
    // Complexo: diferentes sistemas de medida
    let l100km;

    // Convert to L/100km first
    if (from === 'l100km') l100km = value;
    else if (from === 'kml') l100km = 100 / value;
    else if (from === 'mpgUS') l100km = 235.214 / value;
    else if (from === 'mpgUK') l100km = 282.481 / value;

    // Convert from L/100km to target
    if (to === 'l100km') return l100km;
    if (to === 'kml') return 100 / l100km;
    if (to === 'mpgUS') return 235.214 / l100km;
    if (to === 'mpgUK') return 282.481 / l100km;
}

// ===== CALCULADORA =====
function evaluateExpression(expr) {
    try {
        // Remove espaços
        expr = expr.replace(/\s/g, '');

        // Validar caracteres permitidos
        if (!/^[0-9+\-*/().]+$/.test(expr)) {
            return parseFloat(expr); // Se não for expressão, tenta converter direto
        }

        // Avaliar expressão
        const result = Function('"use strict"; return (' + expr + ')')();
        return isNaN(result) ? null : result;
    } catch (e) {
        return null;
    }
}

// ===== UTILITÁRIOS =====
function formatNumber(num) {
    if (Math.abs(num) > 1e9 || (Math.abs(num) < 1e-4 && num !== 0)) {
        return num.toExponential(6);
    }
    return parseFloat(num.toFixed(6));
}

function updateFormulaDisplay(category, from, to, value, result) {
    const fromName = CATEGORIES[category].units[from].name.split('(')[0].trim();
    const toName = CATEGORIES[category].units[to].name.split('(')[0].trim();

    document.getElementById('conversionFormula').textContent =
        `${formatNumber(value)} ${fromName} = ${formatNumber(result)} ${toName}`;
}

// ===== AÇÕES =====
function swapUnits() {
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;

    document.getElementById('fromUnit').value = toUnit;
    document.getElementById('toUnit').value = fromUnit;

    performConversion();
}

function clearConversion() {
    document.getElementById('fromValue').value = '';
    document.getElementById('toValue').value = '';
    document.getElementById('conversionFormula').textContent = '';
}

function copyResult() {
    const result = document.getElementById('toValue').value;
    if (!result) return;

    navigator.clipboard.writeText(result).then(() => {
        alert('Resultado copiado!');
    }).catch(() => {
        // Fallback
        const input = document.getElementById('toValue');
        input.select();
        document.execCommand('copy');
        alert('Resultado copiado!');
    });
}

// ===== HISTÓRICO =====
function addToHistory(category, from, to, value, result) {
    const entry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        category: category,
        categoryName: CATEGORIES[category].name,
        from: from,
        fromName: CATEGORIES[category].units[from].name,
        to: to,
        toName: CATEGORIES[category].units[to].name,
        value: value,
        result: result
    };

    state.history.unshift(entry);

    // Limitar histórico a 100 itens
    if (state.history.length > 100) {
        state.history = state.history.slice(0, 100);
    }

    saveState('history');
    renderHistory();
}

function renderHistory() {
    const list = document.getElementById('historyList');
    const filter = document.getElementById('filterHistoryCategory').value;

    let items = state.history;

    if (filter) {
        items = items.filter(item => item.category === filter);
    }

    if (items.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">Nenhuma conversão no histórico.</p>';
        return;
    }

    list.innerHTML = items.map(item => `
        <div class="history-item">
            <div class="history-info">
                <span class="history-category">${item.categoryName}</span>
                <div class="history-conversion">
                    <strong>${formatNumber(item.value)}</strong> ${item.fromName.split('(')[0]}
                    →
                    <strong>${formatNumber(item.result)}</strong> ${item.toName.split('(')[0]}
                </div>
                <div class="history-date">${formatDate(item.timestamp)}</div>
            </div>
            <div class="history-actions-btns">
                <button class="btn btn-secondary" onclick="repeatConversion('${item.id}')">🔄 Repetir</button>
            </div>
        </div>
    `).join('');
}

function repeatConversion(id) {
    const item = state.history.find(h => h.id === id);
    if (!item) return;

    switchTab('converter');
    document.getElementById('categorySelect').value = item.category;
    handleCategoryChange();

    setTimeout(() => {
        document.getElementById('fromUnit').value = item.from;
        document.getElementById('toUnit').value = item.to;
        document.getElementById('fromValue').value = item.value;
        performConversion();
    }, 100);
}

function clearHistory() {
    if (!confirm('Deseja realmente limpar todo o histórico?')) return;

    state.history = [];
    saveState('history');
    renderHistory();
}

function exportHistoryCSV() {
    const headers = ['Data/Hora', 'Categoria', 'De', 'Valor', 'Para', 'Resultado'];
    const rows = state.history.map(item => [
        formatDate(item.timestamp),
        item.categoryName,
        item.fromName,
        item.value,
        item.toName,
        item.result
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historico-conversoes-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

// ===== FAVORITOS =====
function renderQuickFavorites() {
    const container = document.getElementById('quickFavorites');

    if (state.favorites.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">Nenhum favorito.</p>';
        return;
    }

    container.innerHTML = state.favorites.slice(0, 5).map(fav => `
        <div class="quick-favorite-item" onclick="loadFavorite('${fav.id}')">
            <strong>${fav.name}</strong>
            <small>${CATEGORIES[fav.category].name}</small>
        </div>
    `).join('');
}

function renderFavorites() {
    const list = document.getElementById('favoritesList');

    if (state.favorites.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">Nenhum favorito salvo.</p>';
        return;
    }

    list.innerHTML = state.favorites.map(fav => `
        <div class="favorite-card">
            <h3>${fav.name}</h3>
            <p>${CATEGORIES[fav.category].name}: ${CATEGORIES[fav.category].units[fav.from].name.split('(')[0]} → ${CATEGORIES[fav.category].units[fav.to].name.split('(')[0]}</p>
            <div class="favorite-card-actions">
                <button class="btn btn-primary" onclick="loadFavorite('${fav.id}')">🔄 Usar</button>
                <button class="btn btn-secondary" onclick="deleteFavorite('${fav.id}')">🗑️ Excluir</button>
            </div>
        </div>
    `).join('');
}

function loadFavorite(id) {
    const fav = state.favorites.find(f => f.id === id);
    if (!fav) return;

    switchTab('converter');
    document.getElementById('categorySelect').value = fav.category;
    handleCategoryChange();

    setTimeout(() => {
        document.getElementById('fromUnit').value = fav.from;
        document.getElementById('toUnit').value = fav.to;
        document.getElementById('fromValue').focus();
    }, 100);
}

function favoriteCurrentConversion() {
    const category = document.getElementById('categorySelect').value;
    const from = document.getElementById('fromUnit').value;
    const to = document.getElementById('toUnit').value;

    if (!category || !from || !to) {
        alert('Selecione uma conversão primeiro!');
        return;
    }

    const name = prompt('Nome do favorito:', `${CATEGORIES[category].units[from].name.split('(')[0]} → ${CATEGORIES[category].units[to].name.split('(')[0]}`);
    if (!name) return;

    const fav = {
        id: Date.now().toString(),
        name: name,
        category: category,
        from: from,
        to: to
    };

    state.favorites.push(fav);
    saveState('favorites');
    renderQuickFavorites();
    renderFavorites();

    alert('Favorito adicionado!');
}

function deleteFavorite(id) {
    if (!confirm('Deseja realmente excluir este favorito?')) return;

    state.favorites = state.favorites.filter(f => f.id !== id);
    saveState('favorites');
    renderQuickFavorites();
    renderFavorites();
}

function openFavoriteModal() {
    document.getElementById('favoriteModal').classList.add('active');
    document.getElementById('favoriteCategory').value = Object.keys(CATEGORIES)[0];
    const cat = document.getElementById('favoriteCategory').value;
    populateUnitSelectors(cat, 'favoriteFrom', 'favoriteTo');
}

function handleFavoriteSubmit(e) {
    e.preventDefault();

    const fav = {
        id: Date.now().toString(),
        name: document.getElementById('favoriteName').value,
        category: document.getElementById('favoriteCategory').value,
        from: document.getElementById('favoriteFrom').value,
        to: document.getElementById('favoriteTo').value
    };

    state.favorites.push(fav);
    saveState('favorites');
    renderQuickFavorites();
    renderFavorites();
    closeModals();

    alert('Favorito adicionado!');
}

// ===== VER TODAS =====
function convertAll() {
    const category = document.getElementById('viewAllCategory').value;
    const fromUnit = document.getElementById('viewAllFromUnit').value;
    const valueInput = document.getElementById('viewAllValue').value.trim();

    if (!category || !fromUnit || !valueInput) {
        alert('Preencha todos os campos!');
        return;
    }

    const value = evaluateExpression(valueInput);
    if (value === null) {
        alert('Valor inválido!');
        return;
    }

    const units = CATEGORIES[category].units;
    const results = [];

    Object.keys(units).forEach(unitKey => {
        if (unitKey !== fromUnit) {
            const result = convert(category, fromUnit, unitKey, value);
            results.push({
                unit: unitKey,
                name: units[unitKey].name,
                value: result
            });
        }
    });

    renderViewAllResults(results, value, fromUnit, category);
}

function renderViewAllResults(results, originalValue, fromUnit, category) {
    const container = document.getElementById('viewAllResults');
    const fromName = CATEGORIES[category].units[fromUnit].name;

    container.innerHTML = `
        <h3 style="margin-bottom: 1rem; color: var(--primary);">
            ${formatNumber(originalValue)} ${fromName} =
        </h3>
        <table class="view-all-table">
            <thead>
                <tr>
                    <th>Unidade</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                ${results.map(r => `
                    <tr>
                        <td>${r.name}</td>
                        <td>${formatNumber(r.value)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// ===== TAXAS DE CÂMBIO =====
function renderRatesTable() {
    const container = document.getElementById('ratesTable');
    const currencies = CATEGORIES.currency.units;

    container.innerHTML = `
        <div class="rates-grid">
            ${Object.keys(currencies).map(key => `
                <div class="rate-item">
                    <label>${currencies[key].name}</label>
                    <input type="number" step="0.000001" value="${state.rates[key] || DEFAULT_RATES[key]}" data-currency="${key}">
                </div>
            `).join('')}
        </div>
    `;
}

function saveRates() {
    const inputs = document.querySelectorAll('.rate-item input');
    inputs.forEach(input => {
        const currency = input.dataset.currency;
        const value = parseFloat(input.value);
        if (!isNaN(value) && value > 0) {
            state.rates[currency] = value;
        }
    });

    saveState('rates');
    alert('Taxas salvas com sucesso!');
}

function resetRates() {
    if (!confirm('Deseja restaurar as taxas padrão?')) return;

    state.rates = { ...DEFAULT_RATES };
    saveState('rates');
    renderRatesTable();
    alert('Taxas restauradas!');
}

function updateRatesLastUpdate() {
    const lastUpdate = localStorage.getItem('fp_converter_rates_date');
    const span = document.getElementById('ratesLastUpdate');

    if (lastUpdate) {
        span.textContent = formatDate(lastUpdate);

        // Verificar se está desatualizado (> 7 dias)
        const days = (Date.now() - new Date(lastUpdate).getTime()) / (1000 * 60 * 60 * 24);
        if (days > 7) {
            span.style.color = 'red';
            span.textContent += ' ⚠️ (desatualizado)';
        }
    } else {
        span.textContent = 'Nunca';
    }

    localStorage.setItem('fp_converter_rates_date', new Date().toISOString());
}

// ===== EXPORT/IMPORT =====
function exportJSON() {
    const data = {
        rates: state.rates,
        history: state.history,
        favorites: state.favorites,
        exportDate: new Date().toISOString()
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fp-converter-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importJSON(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);

            if (confirm('Deseja importar os dados? (Mesclará com os dados atuais)')) {
                if (data.rates) state.rates = { ...state.rates, ...data.rates };
                if (data.history) state.history = [...data.history, ...state.history];
                if (data.favorites) state.favorites = [...data.favorites, ...state.favorites];

                saveState('rates');
                saveState('history');
                saveState('favorites');

                renderRatesTable();
                renderHistory();
                renderFavorites();
                renderQuickFavorites();

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

// ===== UTILITÁRIOS GERAIS =====
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function updateTotalCategories() {
    document.getElementById('totalCategories').textContent = Object.keys(CATEGORIES).length;
}
