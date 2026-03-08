// ========================================
// FP Pomodoro Productivity Tracker
// Sprint Lab #25
// ========================================

let tasks = [];
let sessions = [];
let currentTask = null;
let timerInterval = null;
let timeRemaining = 25 * 60; // seconds
let timerState = 'focus'; // focus, shortBreak, longBreak
let cycleCount = 0;
let isRunning = false;

const FOCUS_TIME = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;
const CYCLES_FOR_LONG_BREAK = 4;

// ========================================
// LocalStorage
// ========================================
function saveData() {
    localStorage.setItem('pomodoroTasks', JSON.stringify(tasks));
    localStorage.setItem('pomodoroSessions', JSON.stringify(sessions));
}

function loadData() {
    const tasksData = localStorage.getItem('pomodoroTasks');
    const sessionsData = localStorage.getItem('pomodoroSessions');
    if (tasksData) tasks = JSON.parse(tasksData);
    if (sessionsData) sessions = JSON.parse(sessionsData);
}

// ========================================
// Timer Functions
// ========================================
function startTimer() {
    if (!currentTask) {
        alert('Selecione uma tarefa primeiro!');
        return;
    }
    isRunning = true;
    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
    document.getElementById('stopBtn').disabled = false;
    
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            handleTimerComplete();
        }
    }, 1000);
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
}

function stopTimer() {
    pauseTimer();
    resetTimer();
    document.getElementById('stopBtn').disabled = true;
}

function resetTimer() {
    timeRemaining = FOCUS_TIME;
    timerState = 'focus';
    updateTimerDisplay();
    updatePhaseDisplay();
}

function handleTimerComplete() {
    pauseTimer();
    playAlert();
    
    if (timerState === 'focus') {
        // Save session
        saveSession();
        
        // Increment task pomodoros
        if (currentTask) {
            const task = tasks.find(t => t.id === currentTask);
            if (task) {
                task.completed = (task.completed || 0) + 1;
                saveData();
                renderTasks();
            }
        }
        
        cycleCount++;
        
        if (cycleCount >= CYCLES_FOR_LONG_BREAK) {
            timerState = 'longBreak';
            timeRemaining = LONG_BREAK;
            cycleCount = 0;
        } else {
            timerState = 'shortBreak';
            timeRemaining = SHORT_BREAK;
        }
    } else {
        timerState = 'focus';
        timeRemaining = FOCUS_TIME;
    }
    
    updateTimerDisplay();
    updatePhaseDisplay();
    updateStats();
}

function saveSession() {
    sessions.push({
        id: Date.now(),
        taskId: currentTask,
        type: timerState,
        date: new Date().toISOString(),
        duration: timerState === 'focus' ? FOCUS_TIME : 
                  timerState === 'shortBreak' ? SHORT_BREAK : LONG_BREAK
    });
    saveData();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timerTime').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Update progress ring
    const totalTime = timerState === 'focus' ? FOCUS_TIME : 
                      timerState === 'shortBreak' ? SHORT_BREAK : LONG_BREAK;
    const progress = ((totalTime - timeRemaining) / totalTime) * 100;
    const circle = document.querySelector('.progress-ring-circle');
    const circumference = 2 * Math.PI * 90;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference - (progress / 100) * circumference;
}

function updatePhaseDisplay() {
    const phaseNames = {
        'focus': 'FOCO',
        'shortBreak': 'PAUSA CURTA',
        'longBreak': 'PAUSA LONGA'
    };
    const colors = {
        'focus': '#4caf50',
        'shortBreak': '#2196f3',
        'longBreak': '#9c27b0'
    };
    
    document.getElementById('timerPhase').textContent = phaseNames[timerState];
    document.querySelector('.progress-ring-circle').setAttribute('stroke', colors[timerState]);
    document.getElementById('cycleInfo').textContent = `Pomodoro ${cycleCount + 1}/${CYCLES_FOR_LONG_BREAK}`;
}

function playAlert() {
    document.getElementById('alertSound').play();
}

// ========================================
// Tasks Management
// ========================================
function createTask(data) {
    const task = {
        id: Date.now(),
        name: data.name,
        category: data.category,
        priority: data.priority,
        estimated: parseInt(data.estimated),
        completed: 0,
        status: 'A Fazer',
        createdAt: new Date().toISOString()
    };
    tasks.push(task);
    saveData();
    renderTasks();
}

function selectTask(taskId) {
    currentTask = taskId;
    renderTasks();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        document.getElementById('taskName').textContent = task.name;
    }
}

function renderTasks() {
    const container = document.getElementById('tasksList');
    container.innerHTML = '';
    
    const activeTasks = tasks.filter(t => t.status !== 'Concluída');
    
    activeTasks.forEach(task => {
        const div = document.createElement('div');
        div.className = `task-item ${task.id === currentTask ? 'selected' : ''}`;
        div.onclick = () => selectTask(task.id);
        div.innerHTML = `
            <strong>${task.name}</strong> 
            <span style="float: right">${task.completed || 0}/${task.estimated} 🍅</span>
            <div style="font-size: 0.9rem; color: #666; margin-top: 0.5rem">
                ${task.category} | ${task.priority}
            </div>
        `;
        container.appendChild(div);
    });
}

// ========================================
// Statistics
// ========================================
function updateStats() {
    const today = new Date().toDateString();
    const todaySessions = sessions.filter(s => 
        new Date(s.date).toDateString() === today && s.type === 'focus'
    );
    
    document.getElementById('todayPomodoros').textContent = todaySessions.length;
    
    // Week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekSessions = sessions.filter(s => 
        new Date(s.date) >= weekAgo && s.type === 'focus'
    );
    document.getElementById('weekPomodoros').textContent = weekSessions.length;
    
    // Hours
    const focusMinutes = todaySessions.length * 25;
    document.getElementById('focusHours').textContent = 
        `${Math.floor(focusMinutes / 60)}h ${focusMinutes % 60}m`;
    
    // Completion rate
    const completed = tasks.filter(t => t.status === 'Concluída').length;
    const total = tasks.length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    document.getElementById('completionRate').textContent = `${rate}%`;
}

// ========================================
// Modal
// ========================================
function openTaskModal() {
    document.getElementById('taskModal').classList.add('active');
}

function closeTaskModal() {
    document.getElementById('taskModal').classList.remove('active');
    document.getElementById('taskForm').reset();
}

// ========================================
// Event Listeners
// ========================================
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('stopBtn').addEventListener('click', stopTimer);
document.getElementById('newTaskBtn').addEventListener('click', openTaskModal);
document.querySelector('.close').addEventListener('click', closeTaskModal);

document.getElementById('taskForm').addEventListener('submit', (e) => {
    e.preventDefault();
    createTask({
        name: document.getElementById('taskNameInput').value,
        category: document.getElementById('taskCategory').value,
        priority: document.getElementById('taskPriority').value,
        estimated: document.getElementById('taskEstimated').value
    });
    closeTaskModal();
});

// ========================================
// Initialization
// ========================================
function init() {
    loadData();
    renderTasks();
    updateStats();
    updateTimerDisplay();
    updatePhaseDisplay();
}

init();
