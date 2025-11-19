// FP Social Media Scheduler - App Logic
// Sprint Lab #18 - Fernando Pimenta

// ===========================
// DATA & STATE
// ===========================

let posts = [];
let templates = [];
let currentView = 'calendar';
let currentDate = new Date();
let currentWeekStart = new Date();
let currentPlatformView = 'instagram';
let filters = {
    platforms: [],
    status: '',
    priority: '',
    category: '',
    search: ''
};

const platforms = ['instagram', 'linkedin', 'twitter', 'tiktok', 'youtube', 'facebook', 'threads'];
const platformLabels = {
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    twitter: 'Twitter/X',
    tiktok: 'TikTok',
    youtube: 'YouTube',
    facebook: 'Facebook',
    threads: 'Threads'
};

const characterLimits = {
    twitter: 280,
    instagram: 2200,
    linkedin: 3000,
    tiktok: 2200,
    youtube: 5000,
    facebook: 63206,
    threads: 500
};

const recommendedTimes = {
    instagram: ['10:00', '14:00', '19:00'],
    linkedin: ['08:00', '12:00', '17:00'],
    twitter: ['09:00', '12:00', '18:00'],
    tiktok: ['11:00', '15:00', '20:00'],
    youtube: ['14:00', '18:00', '20:00'],
    facebook: ['13:00', '15:00', '19:00'],
    threads: ['10:00', '14:00', '19:00']
};

const hashtagDatabase = {
    marketing: ['#marketingdigital', '#marketing', '#socialmedia', '#contentmarketing', '#digitalmarketing'],
    educacional: ['#educacao', '#aprendizado', '#conhecimento', '#educacaoonline', '#dicas'],
    motivacional: ['#motivacao', '#inspiracao', '#sucesso', '#foco', '#determinacao'],
    tecnologia: ['#tecnologia', '#tech', '#inovacao', '#digital', '#tecnologiadigital'],
    empreendedorismo: ['#empreendedorismo', '#negocios', '#startup', '#empreender', '#sucesso'],
    design: ['#design', '#designer', '#graphicdesign', '#designgrafico', '#criatividade'],
    fotografia: ['#fotografia', '#photo', '#photography', '#foto', '#photographer']
};

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initializeEventListeners();
    initializePlatformFilters();
    renderCalendar();
    updateDashboard();
    setDefaultTemplates();
});

function loadData() {
    const savedPosts = localStorage.getItem('socialMediaPosts');
    const savedTemplates = localStorage.getItem('socialMediaTemplates');

    if (savedPosts) {
        posts = JSON.parse(savedPosts);
    }

    if (savedTemplates) {
        templates = JSON.parse(savedTemplates);
    }
}

function saveData() {
    localStorage.setItem('socialMediaPosts', JSON.stringify(posts));
    localStorage.setItem('socialMediaTemplates', JSON.stringify(templates));
}

// ===========================
// EVENT LISTENERS
// ===========================

function initializeEventListeners() {
    // Modal controls
    document.getElementById('btnNewPost').addEventListener('click', openNewPostModal);
    document.getElementById('btnCloseModal').addEventListener('click', closeModal);
    document.getElementById('btnCancelForm').addEventListener('click', closeModal);

    // Form submission
    document.getElementById('postForm').addEventListener('submit', handleFormSubmit);

    // Calendar navigation
    document.getElementById('btnPrevMonth').addEventListener('click', () => changeMonth(-1));
    document.getElementById('btnNextMonth').addEventListener('click', () => changeMonth(1));
    document.getElementById('btnToday').addEventListener('click', goToToday);

    // Week navigation
    document.getElementById('btnPrevWeek').addEventListener('click', () => changeWeek(-1));
    document.getElementById('btnNextWeek').addEventListener('click', () => changeWeek(1));
    document.getElementById('btnThisWeek').addEventListener('click', goToThisWeek);

    // View tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentView = e.target.dataset.view;
            switchView();
        });
    });

    // Filter controls
    document.getElementById('btnToggleFilters').addEventListener('click', toggleFilters);
    document.getElementById('btnClearFilters').addEventListener('click', clearFilters);
    document.getElementById('filterStatus').addEventListener('change', applyFilters);
    document.getElementById('filterPriority').addEventListener('change', applyFilters);
    document.getElementById('filterCategory').addEventListener('change', applyFilters);
    document.getElementById('filterSearch').addEventListener('input', applyFilters);

    // Templates
    document.getElementById('btnTemplates').addEventListener('click', openTemplatesModal);
    document.getElementById('btnCloseTemplates').addEventListener('click', () => {
        document.getElementById('templatesModal').classList.remove('active');
    });
    document.getElementById('btnSaveTemplate').addEventListener('click', saveAsTemplate);

    // Export/Import
    document.getElementById('btnExport').addEventListener('click', openExportModal);
    document.getElementById('btnImport').addEventListener('click', openImportModal);
    document.getElementById('btnCloseExport').addEventListener('click', () => {
        document.getElementById('exportModal').classList.remove('active');
    });
    document.getElementById('btnCloseImport').addEventListener('click', () => {
        document.getElementById('importModal').classList.remove('active');
    });

    document.getElementById('btnExportJSON').addEventListener('click', exportJSON);
    document.getElementById('btnExportCSV').addEventListener('click', exportCSV);
    document.getElementById('btnExportICS').addEventListener('click', exportICS);

    document.getElementById('btnSelectFile').addEventListener('click', () => {
        document.getElementById('importFile').click();
    });
    document.getElementById('importFile').addEventListener('change', handleFileSelect);
    document.getElementById('btnImportMerge').addEventListener('click', () => importJSON(false));
    document.getElementById('btnImportReplace').addEventListener('click', () => importJSON(true));

    // Form helpers
    document.getElementById('btnRecommendedTime').addEventListener('click', suggestRecommendedTime);
    document.getElementById('btnHashtagGenerator').addEventListener('click', openHashtagGenerator);
    document.getElementById('btnCloseHashtag').addEventListener('click', () => {
        document.getElementById('hashtagModal').classList.remove('active');
    });
    document.getElementById('btnGenerateHashtags').addEventListener('click', generateHashtags);

    // Character counter
    document.getElementById('postText').addEventListener('input', updateCharacterCount);
    document.querySelectorAll('input[name="platform"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateCharacterCount);
    });

    // Delete and duplicate
    document.getElementById('btnDelete').addEventListener('click', deletePost);
    document.getElementById('btnDuplicate').addEventListener('click', duplicatePost);

    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
}

function initializePlatformFilters() {
    const container = document.getElementById('platformFilters');
    platforms.forEach(platform => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = platform;
        checkbox.addEventListener('change', applyFilters);

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(` ${platformLabels[platform]}`));
        container.appendChild(label);
    });
}

// ===========================
// CALENDAR VIEW
// ===========================

function renderCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';

    // Update month title
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                       'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    document.getElementById('currentMonth').textContent =
        `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    // Day headers
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    dayNames.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day-header';
        header.textContent = day;
        calendar.appendChild(header);
    });

    // Get first day of month and total days
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const dayDiv = createCalendarDay(day, month - 1, year, true);
        calendar.appendChild(dayDiv);
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = createCalendarDay(day, month, year, false);

        // Check if today
        const dayDate = new Date(year, month, day);
        dayDate.setHours(0, 0, 0, 0);
        if (dayDate.getTime() === today.getTime()) {
            dayDiv.classList.add('today');
        }

        calendar.appendChild(dayDiv);
    }

    // Next month days
    const totalCells = calendar.children.length - 7; // Subtract headers
    const remainingCells = 42 - totalCells; // 6 weeks * 7 days
    for (let day = 1; day <= remainingCells; day++) {
        const dayDiv = createCalendarDay(day, month + 1, year, true);
        calendar.appendChild(dayDiv);
    }
}

function createCalendarDay(day, month, year, isOtherMonth) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    if (isOtherMonth) dayDiv.classList.add('other-month');

    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = day;
    dayDiv.appendChild(dayNumber);

    // Get posts for this day
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayPosts = getFilteredPosts().filter(post => post.date === dateStr);

    // Sort posts by time
    dayPosts.sort((a, b) => a.time.localeCompare(b.time));

    // Add post cards
    dayPosts.forEach(post => {
        const card = createPostCardMini(post);
        dayDiv.appendChild(card);
    });

    // Click to create new post for this day
    dayDiv.addEventListener('click', (e) => {
        if (e.target === dayDiv || e.target === dayNumber) {
            openNewPostModal(dateStr);
        }
    });

    return dayDiv;
}

function createPostCardMini(post) {
    const card = document.createElement('div');
    card.className = `post-card-mini ${post.platforms[0]}`;

    const time = document.createElement('div');
    time.className = 'post-time';
    time.textContent = post.time;
    card.appendChild(time);

    const title = document.createElement('div');
    title.className = 'post-title-mini';
    title.textContent = post.title;
    card.appendChild(title);

    if (post.priority === 'alta' || post.priority === 'urgente') {
        const badge = document.createElement('span');
        badge.className = `priority-badge ${post.priority}`;
        badge.textContent = post.priority.toUpperCase();
        card.appendChild(badge);
    }

    card.addEventListener('click', (e) => {
        e.stopPropagation();
        editPost(post.id);
    });

    return card;
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
    updateDashboard();
}

function goToToday() {
    currentDate = new Date();
    renderCalendar();
    updateDashboard();
}

// ===========================
// WEEK VIEW
// ===========================

function renderWeekView() {
    const weekContent = document.getElementById('weekContent');
    weekContent.innerHTML = '';

    // Calculate week start (Sunday)
    const weekStart = new Date(currentWeekStart);
    weekStart.setHours(0, 0, 0, 0);

    // Update week title
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    document.getElementById('currentWeek').textContent =
        `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;

    // Create 7 days
    const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(weekStart);
        dayDate.setDate(dayDate.getDate() + i);

        const dayDiv = document.createElement('div');
        dayDiv.className = 'week-day';

        const header = document.createElement('div');
        header.className = 'week-day-header';
        header.textContent = `${dayNames[i]} - ${formatDate(dayDate)}`;
        dayDiv.appendChild(header);

        const postsContainer = document.createElement('div');
        postsContainer.className = 'week-posts';

        // Get posts for this day
        const dateStr = formatDateISO(dayDate);
        const dayPosts = getFilteredPosts().filter(post => post.date === dateStr);
        dayPosts.sort((a, b) => a.time.localeCompare(b.time));

        if (dayPosts.length === 0) {
            const empty = document.createElement('p');
            empty.textContent = 'Nenhum post agendado';
            empty.style.color = '#999';
            postsContainer.appendChild(empty);
        } else {
            dayPosts.forEach(post => {
                const postCard = createTimelinePost(post);
                postsContainer.appendChild(postCard);
            });
        }

        dayDiv.appendChild(postsContainer);
        weekContent.appendChild(dayDiv);
    }
}

function changeWeek(direction) {
    currentWeekStart.setDate(currentWeekStart.getDate() + (direction * 7));
    renderWeekView();
}

function goToThisWeek() {
    const today = new Date();
    currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay()); // Go to Sunday
    renderWeekView();
}

// ===========================
// TIMELINE VIEW
// ===========================

function renderTimelineView() {
    const timelineContent = document.getElementById('timelineContent');
    timelineContent.innerHTML = '';

    const filteredPosts = getFilteredPosts();

    if (filteredPosts.length === 0) {
        timelineContent.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">Nenhum post encontrado</p>';
        return;
    }

    // Sort by date and time
    filteredPosts.sort((a, b) => {
        const dateCompare = a.date.localeCompare(b.date);
        if (dateCompare !== 0) return dateCompare;
        return a.time.localeCompare(b.time);
    });

    filteredPosts.forEach(post => {
        const postDiv = createTimelinePost(post);
        timelineContent.appendChild(postDiv);
    });
}

function createTimelinePost(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'timeline-post';

    const dateDiv = document.createElement('div');
    dateDiv.className = 'timeline-date';
    dateDiv.innerHTML = `${formatDate(new Date(post.date))}<br>${post.time}`;
    postDiv.appendChild(dateDiv);

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'timeline-details';

    const title = document.createElement('div');
    title.className = 'timeline-title';
    title.textContent = post.title;
    detailsDiv.appendChild(title);

    const meta = document.createElement('div');
    meta.className = 'timeline-meta';

    // Platforms
    const platformsSpan = document.createElement('span');
    platformsSpan.innerHTML = `<strong>Plataformas:</strong> ${post.platforms.map(p => platformLabels[p]).join(', ')}`;
    meta.appendChild(platformsSpan);

    // Status
    const statusSpan = document.createElement('span');
    statusSpan.innerHTML = `<strong>Status:</strong> ${post.status}`;
    meta.appendChild(statusSpan);

    // Priority
    const prioritySpan = document.createElement('span');
    prioritySpan.innerHTML = `<strong>Prioridade:</strong> ${post.priority}`;
    meta.appendChild(prioritySpan);

    detailsDiv.appendChild(meta);
    postDiv.appendChild(detailsDiv);

    postDiv.addEventListener('click', () => editPost(post.id));

    return postDiv;
}

// ===========================
// PLATFORM VIEW
// ===========================

function renderPlatformView() {
    const tabsContainer = document.getElementById('platformTabs');
    const contentContainer = document.getElementById('platformContent');

    // Render tabs
    tabsContainer.innerHTML = '';
    platforms.forEach(platform => {
        const tab = document.createElement('button');
        tab.className = `platform-tab ${platform}`;
        if (platform === currentPlatformView) tab.classList.add('active');
        tab.textContent = platformLabels[platform];
        tab.addEventListener('click', () => {
            currentPlatformView = platform;
            renderPlatformView();
        });
        tabsContainer.appendChild(tab);
    });

    // Render content
    contentContainer.innerHTML = '';
    const platformPosts = getFilteredPosts().filter(post =>
        post.platforms.includes(currentPlatformView)
    );

    if (platformPosts.length === 0) {
        contentContainer.innerHTML = `<p style="text-align: center; color: #999; padding: 40px;">Nenhum post para ${platformLabels[currentPlatformView]}</p>`;
        return;
    }

    platformPosts.sort((a, b) => {
        const dateCompare = a.date.localeCompare(b.date);
        if (dateCompare !== 0) return dateCompare;
        return a.time.localeCompare(b.time);
    });

    platformPosts.forEach(post => {
        const postDiv = createTimelinePost(post);
        contentContainer.appendChild(postDiv);
    });
}

// ===========================
// DASHBOARD
// ===========================

function updateDashboard() {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const monthPosts = posts.filter(post => {
        const postDate = new Date(post.date);
        return postDate >= monthStart && postDate <= monthEnd;
    });

    // Total posts
    document.getElementById('totalPosts').textContent = monthPosts.length;

    // High priority
    const highPriority = monthPosts.filter(p => p.priority === 'alta' || p.priority === 'urgente').length;
    document.getElementById('highPriorityPosts').textContent = highPriority;

    // Published
    const published = monthPosts.filter(p => p.status === 'publicado').length;
    document.getElementById('publishedPosts').textContent = published;

    // Scheduled
    const scheduled = monthPosts.filter(p => p.status === 'agendado').length;
    document.getElementById('scheduledPosts').textContent = scheduled;

    // Platform stats
    const platformStats = {};
    platforms.forEach(platform => {
        platformStats[platform] = monthPosts.filter(p => p.platforms.includes(platform)).length;
    });

    const statsContainer = document.getElementById('platformStats');
    statsContainer.innerHTML = '';

    Object.keys(platformStats).forEach(platform => {
        if (platformStats[platform] > 0) {
            const badge = document.createElement('div');
            badge.className = `platform-badge ${platform}`;
            badge.innerHTML = `${platformLabels[platform]}: <strong>${platformStats[platform]}</strong>`;
            statsContainer.appendChild(badge);
        }
    });
}

// ===========================
// FILTERS
// ===========================

function toggleFilters() {
    const panel = document.getElementById('filtersPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function applyFilters() {
    // Get selected platforms
    filters.platforms = Array.from(document.querySelectorAll('#platformFilters input:checked'))
        .map(cb => cb.value);

    filters.status = document.getElementById('filterStatus').value;
    filters.priority = document.getElementById('filterPriority').value;
    filters.category = document.getElementById('filterCategory').value;
    filters.search = document.getElementById('filterSearch').value.toLowerCase();

    // Re-render current view
    switchView();
}

function clearFilters() {
    document.querySelectorAll('#platformFilters input').forEach(cb => cb.checked = false);
    document.getElementById('filterStatus').value = '';
    document.getElementById('filterPriority').value = '';
    document.getElementById('filterCategory').value = '';
    document.getElementById('filterSearch').value = '';

    filters = {
        platforms: [],
        status: '',
        priority: '',
        category: '',
        search: ''
    };

    switchView();
}

function getFilteredPosts() {
    return posts.filter(post => {
        // Platform filter
        if (filters.platforms.length > 0) {
            const hasMatchingPlatform = post.platforms.some(p => filters.platforms.includes(p));
            if (!hasMatchingPlatform) return false;
        }

        // Status filter
        if (filters.status && post.status !== filters.status) return false;

        // Priority filter
        if (filters.priority && post.priority !== filters.priority) return false;

        // Category filter
        if (filters.category && post.category !== filters.category) return false;

        // Search filter
        if (filters.search) {
            const searchStr = `${post.title} ${post.text} ${post.hashtags}`.toLowerCase();
            if (!searchStr.includes(filters.search)) return false;
        }

        return true;
    });
}

// ===========================
// VIEW SWITCHING
// ===========================

function switchView() {
    // Update tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === currentView);
    });

    // Update views
    document.querySelectorAll('.view-content').forEach(view => {
        view.classList.remove('active');
    });

    const viewMap = {
        calendar: 'calendarView',
        week: 'weekView',
        timeline: 'timelineView',
        platform: 'platformView'
    };

    document.getElementById(viewMap[currentView]).classList.add('active');

    // Render appropriate view
    switch(currentView) {
        case 'calendar':
            renderCalendar();
            break;
        case 'week':
            renderWeekView();
            break;
        case 'timeline':
            renderTimelineView();
            break;
        case 'platform':
            renderPlatformView();
            break;
    }

    updateDashboard();
}

// ===========================
// POST MODAL
// ===========================

function openNewPostModal(dateStr = null) {
    const modal = document.getElementById('postModal');
    const form = document.getElementById('postForm');
    form.reset();

    document.getElementById('postId').value = '';
    document.getElementById('modalTitle').textContent = 'Novo Post';
    document.getElementById('btnDelete').style.display = 'none';
    document.getElementById('btnDuplicate').style.display = 'none';

    if (dateStr) {
        document.getElementById('postDate').value = dateStr;
    } else {
        document.getElementById('postDate').value = formatDateISO(new Date());
    }

    modal.classList.add('active');
}

function editPost(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const modal = document.getElementById('postModal');
    const form = document.getElementById('postForm');

    document.getElementById('postId').value = post.id;
    document.getElementById('modalTitle').textContent = 'Editar Post';
    document.getElementById('postTitle').value = post.title;
    document.getElementById('postDate').value = post.date;
    document.getElementById('postTime').value = post.time;
    document.getElementById('postType').value = post.type;
    document.getElementById('postStatus').value = post.status;
    document.getElementById('postPriority').value = post.priority;
    document.getElementById('postCategory').value = post.category;
    document.getElementById('postText').value = post.text || '';
    document.getElementById('postHashtags').value = post.hashtags || '';
    document.getElementById('postMedia').value = post.media || '';
    document.getElementById('postLink').value = post.link || '';
    document.getElementById('postNotes').value = post.notes || '';

    // Set platforms
    document.querySelectorAll('input[name="platform"]').forEach(cb => {
        cb.checked = post.platforms.includes(cb.value);
    });

    document.getElementById('btnDelete').style.display = 'inline-block';
    document.getElementById('btnDuplicate').style.display = 'inline-block';

    updateCharacterCount();

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('postModal').classList.remove('active');
}

function handleFormSubmit(e) {
    e.preventDefault();

    const selectedPlatforms = Array.from(document.querySelectorAll('input[name="platform"]:checked'))
        .map(cb => cb.value);

    if (selectedPlatforms.length === 0) {
        alert('Selecione pelo menos uma plataforma!');
        return;
    }

    const postId = document.getElementById('postId').value;
    const postData = {
        id: postId || generateId(),
        title: document.getElementById('postTitle').value,
        platforms: selectedPlatforms,
        date: document.getElementById('postDate').value,
        time: document.getElementById('postTime').value,
        type: document.getElementById('postType').value,
        status: document.getElementById('postStatus').value,
        priority: document.getElementById('postPriority').value,
        category: document.getElementById('postCategory').value,
        text: document.getElementById('postText').value,
        hashtags: document.getElementById('postHashtags').value,
        media: document.getElementById('postMedia').value,
        link: document.getElementById('postLink').value,
        notes: document.getElementById('postNotes').value
    };

    if (postId) {
        // Update existing post
        const index = posts.findIndex(p => p.id === postId);
        posts[index] = postData;
    } else {
        // Create new post
        posts.push(postData);
    }

    saveData();
    closeModal();
    switchView();
}

function deletePost() {
    const postId = document.getElementById('postId').value;
    if (!postId) return;

    if (confirm('Tem certeza que deseja excluir este post?')) {
        posts = posts.filter(p => p.id !== postId);
        saveData();
        closeModal();
        switchView();
    }
}

function duplicatePost() {
    const postId = document.getElementById('postId').value;
    if (!postId) return;

    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const newPost = {
        ...post,
        id: generateId(),
        title: `${post.title} (Cópia)`
    };

    posts.push(newPost);
    saveData();
    closeModal();
    switchView();
}

// ===========================
// TEMPLATES
// ===========================

function setDefaultTemplates() {
    if (templates.length > 0) return;

    templates = [
        {
            id: generateId(),
            name: 'Post de Segunda Motivacional',
            platforms: ['instagram', 'linkedin'],
            type: 'imagem',
            category: 'educacional',
            text: 'Bom dia! Que tal começar a semana com foco e determinação? 💪',
            hashtags: '#segundafeira #motivacao #foco #sucesso #produtividade'
        },
        {
            id: generateId(),
            name: 'Dica Rápida',
            platforms: ['instagram', 'twitter'],
            type: 'carrossel',
            category: 'educacional',
            text: 'Dica rápida do dia! 💡',
            hashtags: '#dicas #educacao #conhecimento #aprendizado'
        },
        {
            id: generateId(),
            name: 'Promoção Padrão',
            platforms: ['instagram', 'facebook'],
            type: 'imagem',
            category: 'promocional',
            text: '🔥 Promoção especial! Confira os detalhes no link da bio.',
            hashtags: '#promocao #oferta #desconto #compre'
        },
        {
            id: generateId(),
            name: 'Bastidores',
            platforms: ['instagram', 'tiktok'],
            type: 'reels',
            category: 'storytelling',
            text: 'Nos bastidores... 🎬',
            hashtags: '#bastidores #behind #processo #making'
        },
        {
            id: generateId(),
            name: 'Artigo LinkedIn',
            platforms: ['linkedin'],
            type: 'artigo',
            category: 'institucional',
            text: 'Novo artigo publicado! Compartilho insights sobre...',
            hashtags: '#artigo #conteudo #conhecimento #negocios'
        }
    ];

    saveData();
}

function openTemplatesModal() {
    const modal = document.getElementById('templatesModal');
    const list = document.getElementById('templatesList');

    list.innerHTML = '';

    if (templates.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #999;">Nenhum template salvo</p>';
    } else {
        templates.forEach(template => {
            const card = document.createElement('div');
            card.className = 'template-card';

            const title = document.createElement('div');
            title.className = 'template-title';
            title.textContent = template.name;
            card.appendChild(title);

            const meta = document.createElement('div');
            meta.className = 'template-meta';
            meta.innerHTML = `
                ${template.platforms.map(p => platformLabels[p]).join(', ')}<br>
                ${template.category} - ${template.type}
            `;
            card.appendChild(meta);

            card.addEventListener('click', () => {
                useTemplate(template);
                modal.classList.remove('active');
            });

            list.appendChild(card);
        });
    }

    modal.classList.add('active');
}

function useTemplate(template) {
    openNewPostModal();

    document.getElementById('postTitle').value = template.name;
    document.getElementById('postType').value = template.type;
    document.getElementById('postCategory').value = template.category;
    document.getElementById('postText').value = template.text || '';
    document.getElementById('postHashtags').value = template.hashtags || '';

    document.querySelectorAll('input[name="platform"]').forEach(cb => {
        cb.checked = template.platforms.includes(cb.value);
    });

    updateCharacterCount();
}

function saveAsTemplate() {
    const name = prompt('Nome do template:');
    if (!name) return;

    const selectedPlatforms = Array.from(document.querySelectorAll('input[name="platform"]:checked'))
        .map(cb => cb.value);

    if (selectedPlatforms.length === 0) {
        alert('Selecione pelo menos uma plataforma!');
        return;
    }

    const template = {
        id: generateId(),
        name: name,
        platforms: selectedPlatforms,
        type: document.getElementById('postType').value,
        category: document.getElementById('postCategory').value,
        text: document.getElementById('postText').value,
        hashtags: document.getElementById('postHashtags').value
    };

    templates.push(template);
    saveData();
    alert('Template salvo com sucesso!');
}

// ===========================
// RECOMMENDED TIMES
// ===========================

function suggestRecommendedTime() {
    const selectedPlatforms = Array.from(document.querySelectorAll('input[name="platform"]:checked'))
        .map(cb => cb.value);

    if (selectedPlatforms.length === 0) {
        alert('Selecione uma plataforma primeiro!');
        return;
    }

    const platform = selectedPlatforms[0];
    const times = recommendedTimes[platform];

    if (times) {
        const randomTime = times[Math.floor(Math.random() * times.length)];
        document.getElementById('postTime').value = randomTime;
    }
}

// ===========================
// CHARACTER COUNTER
// ===========================

function updateCharacterCount() {
    const text = document.getElementById('postText').value;
    const charCount = document.getElementById('charCount');
    const charLimit = document.getElementById('charLimit');
    const counter = document.querySelector('.char-counter');

    charCount.textContent = text.length;

    const selectedPlatforms = Array.from(document.querySelectorAll('input[name="platform"]:checked'))
        .map(cb => cb.value);

    if (selectedPlatforms.length > 0) {
        const limits = selectedPlatforms.map(p => characterLimits[p] || 999999);
        const minLimit = Math.min(...limits);

        charLimit.textContent = ` / ${minLimit}`;

        counter.classList.remove('warning', 'error');
        if (text.length > minLimit) {
            counter.classList.add('error');
        } else if (text.length > minLimit * 0.9) {
            counter.classList.add('warning');
        }
    } else {
        charLimit.textContent = '';
        counter.classList.remove('warning', 'error');
    }
}

// ===========================
// HASHTAG GENERATOR
// ===========================

function openHashtagGenerator() {
    document.getElementById('hashtagModal').classList.add('active');
}

function generateHashtags() {
    const theme = document.getElementById('hashtagTheme').value.toLowerCase();
    const suggestions = document.getElementById('hashtagSuggestions');

    let hashtags = [];

    // Find matching hashtags
    Object.keys(hashtagDatabase).forEach(key => {
        if (theme.includes(key) || key.includes(theme)) {
            hashtags = hashtags.concat(hashtagDatabase[key]);
        }
    });

    // If no match, use marketing as default
    if (hashtags.length === 0) {
        hashtags = hashtagDatabase.marketing;
    }

    // Remove duplicates
    hashtags = [...new Set(hashtags)];

    suggestions.innerHTML = '';
    hashtags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'hashtag-tag';
        tagSpan.textContent = tag;
        tagSpan.addEventListener('click', () => {
            const currentHashtags = document.getElementById('postHashtags').value;
            const newHashtags = currentHashtags ? `${currentHashtags} ${tag}` : tag;
            document.getElementById('postHashtags').value = newHashtags;
        });
        suggestions.appendChild(tagSpan);
    });
}

// ===========================
// EXPORT/IMPORT
// ===========================

function openExportModal() {
    document.getElementById('exportModal').classList.add('active');
}

function openImportModal() {
    document.getElementById('importModal').classList.add('active');
}

function exportJSON() {
    const dataStr = JSON.stringify(posts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `social-media-posts-${formatDateISO(new Date())}.json`;
    link.click();

    URL.revokeObjectURL(url);
}

function exportCSV() {
    const headers = ['Título', 'Data', 'Horário', 'Plataformas', 'Status', 'Prioridade', 'Categoria', 'Tipo', 'Texto'];
    const rows = posts.map(post => [
        post.title,
        post.date,
        post.time,
        post.platforms.join('; '),
        post.status,
        post.priority,
        post.category,
        post.type,
        `"${(post.text || '').replace(/"/g, '""')}"`
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `social-media-posts-${formatDateISO(new Date())}.csv`;
    link.click();

    URL.revokeObjectURL(url);
}

function exportICS() {
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FP Social Media Scheduler//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Social Media Schedule
X-WR-TIMEZONE:America/Sao_Paulo
`;

    posts.forEach(post => {
        const dateTime = `${post.date}T${post.time.replace(':', '')}00`;
        const dateTimeEnd = `${post.date}T${addMinutes(post.time, 30).replace(':', '')}00`;
        const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

        icsContent += `BEGIN:VEVENT
DTSTART:${dateTime.replace(/-/g, '')}
DTEND:${dateTimeEnd.replace(/-/g, '')}
DTSTAMP:${now}
UID:${post.id}@fpsocialmedia
SUMMARY:${post.title}
DESCRIPTION:${escapeICS(post.text || '')}\\n\\nPlataformas: ${post.platforms.join(', ')}\\nStatus: ${post.status}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
`;
    });

    icsContent += 'END:VCALENDAR';

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `social-media-schedule-${formatDateISO(new Date())}.ics`;
    link.click();

    URL.revokeObjectURL(url);
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importedPosts = JSON.parse(e.target.result);

            document.getElementById('fileName').textContent = file.name;
            document.getElementById('postsCount').textContent = importedPosts.length;
            document.getElementById('importPreview').style.display = 'block';

            // Store in temporary variable
            window.importedPostsData = importedPosts;
        } catch (error) {
            alert('Erro ao ler arquivo JSON. Verifique o formato.');
        }
    };
    reader.readAsText(file);
}

function importJSON(replace) {
    if (!window.importedPostsData) {
        alert('Selecione um arquivo primeiro!');
        return;
    }

    if (replace) {
        if (confirm('Isso irá substituir TODOS os posts existentes. Confirma?')) {
            posts = window.importedPostsData;
        }
    } else {
        posts = posts.concat(window.importedPostsData);
    }

    saveData();
    switchView();
    document.getElementById('importModal').classList.remove('active');
    document.getElementById('importPreview').style.display = 'none';
    document.getElementById('importFile').value = '';
    window.importedPostsData = null;
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function formatDateISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function addMinutes(time, minutes) {
    const [hours, mins] = time.split(':').map(Number);
    const totalMins = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMins / 60) % 24;
    const newMins = totalMins % 60;
    return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`;
}

function escapeICS(text) {
    return text.replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}
