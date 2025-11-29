document.addEventListener('DOMContentLoaded', () => {
    initApp();
});
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

let MATCH_DATA = [];
let selectedActive = null;
let selectedSub = null;

async function initApp() {
    await loadData();
    calculateScores();
    setupNavigation();
    renderDashboard();
    renderStandings();
    renderTeams();
    renderManagement();
    setupAdmin();
}

async function loadData() {
    // 1. Load Matches
    const storedMatches = localStorage.getItem('porra_matches');
    if (storedMatches) {
        MATCH_DATA = JSON.parse(storedMatches);
        console.log('Loaded matches from LocalStorage');
    } else {
        try {
            const response = await fetch('./data/matches.json');
            const data = await response.json();
            MATCH_DATA = data.matches;
            // Save initial data to LS
            localStorage.setItem('porra_matches', JSON.stringify(MATCH_DATA));
            console.log('Loaded matches from JSON and saved to LS');
        } catch (error) {
            console.error('Error loading match data:', error);
            MATCH_DATA = [];
        }
    }

    // 2. Load Participants/App Data
    const storedAppData = localStorage.getItem('porra_app_data');
    if (storedAppData) {
        // Merge stored data with current structure in case of code updates
        // For now, we just replace it, assuming structure hasn't broken
        const parsedData = JSON.parse(storedAppData);
        // Ensure we keep the structure valid
        APP_DATA.participants = parsedData.participants;
        APP_DATA.news = parsedData.news || APP_DATA.news;
        console.log('Loaded APP_DATA from LocalStorage');
    } else {
        // Save initial mock data to LS so we can edit it later
        saveAppData();
        console.log('Initialized APP_DATA to LocalStorage');
    }
}

function saveAppData() {
    localStorage.setItem('porra_app_data', JSON.stringify(APP_DATA));
}

function saveMatches() {
    localStorage.setItem('porra_matches', JSON.stringify(MATCH_DATA));
}

function calculateScores() {
    APP_DATA.participants.forEach(participant => {
        // Reset points to initial before recalculating to avoid drift if logic changes
        // But since we persist points, we might want to recalculate from 0 or base
        // For this logic, we'll assume 'initialPoints' is the base from the start of the season
        if (typeof participant.initialPoints === 'undefined') {
            participant.initialPoints = participant.points; // One-time init for legacy data
        }

        let currentTotal = participant.initialPoints;

        participant.teams.forEach(team => {
            const teamMatches = MATCH_DATA.filter(m =>
                (m.homeTeam === team.name || m.awayTeam === team.name) && m.status === 'FINISHED'
            );

            teamMatches.forEach(match => {
                const isHome = match.homeTeam === team.name;
                const goalsFor = isHome ? match.homeScore : match.awayScore;
                const goalsAgainst = isHome ? match.awayScore : match.homeScore;

                let pointsChange = 0;

                if (goalsFor > goalsAgainst) {
                    pointsChange = 3;
                } else if (goalsFor === goalsAgainst) {
                    pointsChange = 1;
                } else {
                    pointsChange = 0;
                }

                if (team.type === 'sum') {
                    currentTotal += pointsChange;
                } else if (team.type === 'subtract') {
                    currentTotal -= pointsChange;
                }
            });
        });

        participant.points = currentTotal;
    });
    // We don't saveAppData() here to avoid loop, but we could if we want to persist calculated points
    // Better to recalculate on load.
}

function setupNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));
            views.forEach(v => v.classList.add('hidden'));

            btn.classList.add('active');

            const targetId = btn.getAttribute('data-target');
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.remove('hidden');
                targetView.classList.add('active');
            }
        });
    });
}

function renderDashboard() {
    const userStatsContainer = document.getElementById('user-summary');
    if (!userStatsContainer) return;

    const user = APP_DATA.currentUser;
    const fullUserData = APP_DATA.participants.find(p => p.id === user.id);

    if (fullUserData) {
        userStatsContainer.innerHTML = `
            <div class="stat-card">
                <h3>Tu Equipo</h3>
                <p class="highlight">${user.teamName}</p>
            </div>
            <div class="stat-card">
                <h3>Puntos</h3>
                <p class="highlight">${fullUserData.points}</p>
            </div>
            <div class="stat-card">
                <h3>Posición</h3>
                <p class="highlight">#${getRank(user.id)}</p>
            </div>
        `;
    }

    const dashboard = document.getElementById('dashboard');
    if (!dashboard) return;

    const existingNews = dashboard.querySelector('.news-section');
    if (existingNews) existingNews.remove();

    const newsSection = document.createElement('div');
    newsSection.className = 'news-section';
    newsSection.innerHTML = '<h3>Últimas Noticias</h3>';

    APP_DATA.news.forEach(item => {
        const newsCard = document.createElement('div');
        newsCard.className = 'stat-card news-card';
        newsCard.style.marginTop = '16px';
        newsCard.style.textAlign = 'left';
        newsCard.innerHTML = `
            <h4>${item.title}</h4>
            <small>${item.date}</small>
            <p>${item.content}</p>
        `;
        newsSection.appendChild(newsCard);
    });

    dashboard.appendChild(newsSection);
}

function renderStandings() {
    const tbody = document.getElementById('standings-body');
    if (!tbody) return;

    const sortedParticipants = [...APP_DATA.participants].sort((a, b) => b.points - a.points);

    tbody.innerHTML = sortedParticipants.map((p, index) => `
        <tr>
            <td>
                ${index + 1} 
                ${getTrendIcon(p.trend)}
            </td>
            <td>
                <div class="participant-name">${p.name}</div>
                <div class="team-name-small">${p.teamName}</div>
            </td>
            <td class="points-cell">${p.points}</td>
        </tr>
    `).join('');
}

function renderTeams() {
    const container = document.getElementById('teams-container');
    if (!container) return;

    container.innerHTML = APP_DATA.participants.map(p => `
        <div class="team-detail-card">
            <div class="team-header">
                <div>
                    <h3>${p.teamName}</h3>
                    <small>${p.name}</small>
                </div>
                <div class="points">${p.points} pts</div>
            </div>
            
            <div class="team-section">
                <h4>Titulares</h4>
                <div class="team-list">
                    ${p.teams.map(t => `
                        <span class="team-badge ${t.type}">
                            ${t.name} (${t.league})
                        </span>
                    `).join('')}
                </div>
            </div>

            <div class="team-section">
                <h4>Suplentes</h4>
                <div class="team-list">
                    ${(p.substitutes && p.substitutes.length > 0) ? p.substitutes.map(s => `
                        <span class="team-badge ${s.type}" style="opacity: 0.7;">
                            ${s.name} (${s.league})
                        </span>
                    `).join('') : '<small style="color: #666;">Sin suplentes</small>'}
                </div>
            </div>

            <div class="team-section">
                <h4>Historial de Cambios</h4>
                <div class="changes-log">
                    ${(p.changes && p.changes.length > 0) ? p.changes.map(c => `
                        <div class="change-item">
                            <strong>${c.date}:</strong> ${c.description}
                        </div>
                    `).join('') : 'Sin cambios registrados'}
                </div>
            </div>
        </div>
    `).join('');
}

function renderManagement() {
    const user = APP_DATA.currentUser;
    const participant = APP_DATA.participants.find(p => p.id === user.id);

    if (!participant) return;

    const activeList = document.getElementById('active-teams-list');
    const subList = document.getElementById('sub-teams-list');
    const validateBtn = document.getElementById('validate-changes-btn');

    if (!activeList || !subList || !validateBtn) return;

    // Render Active Teams
    activeList.innerHTML = participant.teams.map((t, index) => `
        <div class='selectable-item' onclick='selectActive(${index}, this)'>
            <strong>${t.name}</strong>
            <small>${t.league} | ${t.type === 'sum' ? 'Suma' : 'Resta'}</small>
        </div>
    `).join('');

    // Render Substitutes
    if (participant.substitutes && participant.substitutes.length > 0) {
        subList.innerHTML = participant.substitutes.map((s, index) => `
            <div class='selectable-item' onclick='selectSub(${index}, this)'>
                <strong>${s.name}</strong>
                <small>${s.league} | ${s.type === 'sum' ? 'Suma' : 'Resta'}</small>
            </div>
        `).join('');
    } else {
        subList.innerHTML = '<small>No tienes suplentes disponibles</small>';
    }

    validateBtn.onclick = () => validateChanges(participant);
}

window.selectActive = function (index, element) {
    selectedActive = index;
    // UI Feedback
    document.querySelectorAll('#active-teams-list .selectable-item').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    checkSelection();
};

window.selectSub = function (index, element) {
    selectedSub = index;
    // UI Feedback
    document.querySelectorAll('#sub-teams-list .selectable-item').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    checkSelection();
};

function checkSelection() {
    const btn = document.getElementById('validate-changes-btn');
    if (selectedActive !== null && selectedSub !== null) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

function validateChanges(participant) {
    if (selectedActive === null || selectedSub === null) return;

    const activeTeam = participant.teams[selectedActive];
    const subTeam = participant.substitutes[selectedSub];

    // Confirm action
    if (!confirm(`¿Seguro que quieres cambiar a ${activeTeam.name} por ${subTeam.name}? Esta acción es irreversible.`)) return;

    // Perform Swap
    participant.teams[selectedActive] = subTeam;
    participant.substitutes[selectedSub] = activeTeam;

    // Log Change
    const date = new Date().toISOString().split('T')[0];
    participant.changes.push({
        date: date,
        description: `Cambio: Sale ${activeTeam.name}, Entra ${subTeam.name}`
    });

    // Save Data
    saveAppData();

    // Reset Selection
    selectedActive = null;
    selectedSub = null;
    document.getElementById('validate-changes-btn').disabled = true;

    // Re-render views
    alert('Cambio realizado con éxito.');
    renderManagement();
    renderTeams();
    renderDashboard();
}

function getRank(userId) {
    const sorted = [...APP_DATA.participants].sort((a, b) => b.points - a.points);
    return sorted.findIndex(p => p.id === userId) + 1;
}

function getTrendIcon(trend) {
    if (trend === 'up') return '<span style="color: #03dac6">▲</span>';
    if (trend === 'down') return '<span style="color: #cf6679">▼</span>';
    return '<span style="color: gray">−</span>';
}

function setupAdmin() {
    const adminSection = document.getElementById('admin');
    if (!adminSection) return;

    if (!document.getElementById('add-match-form')) {
        const formContainer = document.createElement('div');
        formContainer.className = 'admin-card';
        formContainer.innerHTML = `
            <h3>Añadir Partido Manualmente</h3>
            <form id="add-match-form" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
                <select id="league-select" style="padding: 8px; border-radius: 4px; border: none; background: #333; color: white;">
                    <option value="1a">1ª División</option>
                    <option value="2a">2ª División</option>
                    <option value="champions">Champions League</option>
                </select>
                <input type="text" placeholder="Equipo Local" id="home-team" required style="padding: 8px; border-radius: 4px; border: none;">
                <input type="text" placeholder="Equipo Visitante" id="away-team" required style="padding: 8px; border-radius: 4px; border: none;">
                <div style="display: flex; gap: 10px;">
                    <input type="number" placeholder="Goles Local" id="home-score" required style="padding: 8px; border-radius: 4px; border: none; width: 50%;">
                    <input type="number" placeholder="Goles Visitante" id="away-score" required style="padding: 8px; border-radius: 4px; border: none; width: 50%;">
                </div>
                <button type="submit" class="btn-primary">Guardar Resultado</button>
            </form>
        `;

        const autoUpdateContainer = document.createElement('div');
            <td>
                ${index + 1} 
                ${getTrendIcon(p.trend)}
            </td>
            <td>
                <div class="participant-name">${p.name}</div>
                <div class="team-name-small">${p.teamName}</div>
            </td>
            <td class="points-cell">${p.points}</td>
        </tr >
            `).join('');
}

function renderTeams() {
    const container = document.getElementById('teams-container');
    if (!container) return;

    container.innerHTML = APP_DATA.participants.map(p => `
            < div class="team-detail-card" >
            <div class="team-header">
                <div>
                    <h3>${p.teamName}</h3>
                    <small>${p.name}</small>
                </div>
                <div class="points">${p.points} pts</div>
            </div>
            
            <div class="team-section">
                <h4>Titulares</h4>
                <div class="team-list">
                    ${p.teams.map(t => `
                        <span class="team-badge ${t.type}">
                            ${t.name} (${t.league})
                        </span>
                    `).join('')}
                </div>
            </div>

            <div class="team-section">
                <h4>Suplentes</h4>
                <div class="team-list">
                    ${(p.substitutes && p.substitutes.length > 0) ? p.substitutes.map(s => `
                        <span class="team-badge ${s.type}" style="opacity: 0.7;">
                            ${s.name} (${s.league})
                        </span>
                    `).join('') : '<small style="color: #666;">Sin suplentes</small>'}
                </div>
            </div>

            <div class="team-section">
                <h4>Historial de Cambios</h4>
                <div class="changes-log">
                    ${(p.changes && p.changes.length > 0) ? p.changes.map(c => `
                        <div class="change-item">
                            <strong>${c.date}:</strong> ${c.description}
                        </div>
                    `).join('') : 'Sin cambios registrados'}
                </div>
            </div>
        </div >
            `).join('');
}

function renderManagement() {
    const user = APP_DATA.currentUser;
    const participant = APP_DATA.participants.find(p => p.id === user.id);

    if (!participant) return;

    const activeList = document.getElementById('active-teams-list');
    const subList = document.getElementById('sub-teams-list');
    const validateBtn = document.getElementById('validate-changes-btn');

    if (!activeList || !subList || !validateBtn) return;

    // Render Active Teams
    activeList.innerHTML = participant.teams.map((t, index) => `
            < div class='selectable-item' onclick = 'selectActive(${index}, this)' >
            <strong>${t.name}</strong>
            <small>${t.league} | ${t.type === 'sum' ? 'Suma' : 'Resta'}</small>
        </div >
            `).join('');

    // Render Substitutes
    if (participant.substitutes && participant.substitutes.length > 0) {
        subList.innerHTML = participant.substitutes.map((s, index) => `
            < div class='selectable-item' onclick = 'selectSub(${index}, this)' >
                <strong>${s.name}</strong>
                <small>${s.league} | ${s.type === 'sum' ? 'Suma' : 'Resta'}</small>
            </div >
            `).join('');
    } else {
        subList.innerHTML = '<small>No tienes suplentes disponibles</small>';
    }

    validateBtn.onclick = () => validateChanges(participant);
}

window.selectActive = function (index, element) {
    selectedActive = index;
    // UI Feedback
    document.querySelectorAll('#active-teams-list .selectable-item').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    checkSelection();
};

window.selectSub = function (index, element) {
    selectedSub = index;
    // UI Feedback
    document.querySelectorAll('#sub-teams-list .selectable-item').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    checkSelection();
};

function checkSelection() {
    const btn = document.getElementById('validate-changes-btn');
    if (selectedActive !== null && selectedSub !== null) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

function validateChanges(participant) {
    if (selectedActive === null || selectedSub === null) return;

    const activeTeam = participant.teams[selectedActive];
    const subTeam = participant.substitutes[selectedSub];

    // Confirm action
    if (!confirm(`¿Seguro que quieres cambiar a ${ activeTeam.name } por ${ subTeam.name }? Esta acción es irreversible.`)) return;

    // Perform Swap
    participant.teams[selectedActive] = subTeam;
    participant.substitutes[selectedSub] = activeTeam;

    // Log Change
    const date = new Date().toISOString().split('T')[0];
    participant.changes.push({
        date: date,
        description: `Cambio: Sale ${ activeTeam.name }, Entra ${ subTeam.name } `
    });

    // Save Data
    saveAppData();

    // Reset Selection
    selectedActive = null;
    selectedSub = null;
    document.getElementById('validate-changes-btn').disabled = true;

    // Re-render views
    alert('Cambio realizado con éxito.');
    renderManagement();
    renderTeams();
    renderDashboard();
}

function getRank(userId) {
    const sorted = [...APP_DATA.participants].sort((a, b) => b.points - a.points);
    return sorted.findIndex(p => p.id === userId) + 1;
}

function getTrendIcon(trend) {
    if (trend === 'up') return '<span style="color: #03dac6">▲</span>';
    if (trend === 'down') return '<span style="color: #cf6679">▼</span>';
    return '<span style="color: gray">−</span>';
}

function setupAdmin() {
    const adminSection = document.getElementById('admin');
    if (!adminSection) return;

    if (!document.getElementById('add-match-form')) {
        const formContainer = document.createElement('div');
        formContainer.className = 'admin-card';
        formContainer.innerHTML = `
            < h3 > Añadir Partido Manualmente</h3 >
                <form id="add-match-form" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
                    <select id="league-select" style="padding: 8px; border-radius: 4px; border: none; background: #333; color: white;">
                        <option value="1a">1ª División</option>
                        <option value="2a">2ª División</option>
                        <option value="champions">Champions League</option>
                    </select>
                    <input type="text" placeholder="Equipo Local" id="home-team" required style="padding: 8px; border-radius: 4px; border: none;">
                        <input type="text" placeholder="Equipo Visitante" id="away-team" required style="padding: 8px; border-radius: 4px; border: none;">
                            <div style="display: flex; gap: 10px;">
                                <input type="number" placeholder="Goles Local" id="home-score" required style="padding: 8px; border-radius: 4px; border: none; width: 50%;">
                                    <input type="number" placeholder="Goles Visitante" id="away-score" required style="padding: 8px; border-radius: 4px; border: none; width: 50%;">
                                    </div>
                                    <button type="submit" class="btn-primary">Guardar Resultado</button>
                                </form>
                                `;

                                const autoUpdateContainer = document.createElement('div');
                                autoUpdateContainer.className = 'admin-card';
                                autoUpdateContainer.style.marginTop = '20px';
                                autoUpdateContainer.innerHTML = `
                                <h3>Actualización Automática (2025/26)</h3>
                                <p style="font-size: 0.9rem; color: #aaa; margin-bottom: 10px;">
                                    Descarga los últimos resultados desde OpenFootball (GitHub).
                                </p>
                                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                                    <button id="update-1a-btn" class="btn-primary" style="background-color: #03dac6; color: black; flex: 1;">
                                        🔄 1ª División
                                    </button>
                                    <button id="update-2a-btn" class="btn-primary" style="background-color: #bb86fc; color: black; flex: 1;">
                                        🔄 2ª División
                                    </button>
                                </div>
                                <p style="font-size: 0.8rem; color: #666; margin-top: 5px;">
                                    * Champions League no disponible automáticamente aún.
                                </p>
                                `;

                                adminSection.appendChild(formContainer);
                                adminSection.appendChild(autoUpdateContainer);

        document.getElementById('add-match-form').addEventListener('submit', (e) => {
                                    e.preventDefault();
                                const league = document.getElementById('league-select').value;
                                const home = document.getElementById('home-team').value;
                                const away = document.getElementById('away-team').value;
                                const homeScore = parseInt(document.getElementById('home-score').value);
                                const awayScore = parseInt(document.getElementById('away-score').value);

                                const newMatch = {
                                    id: Date.now(),
                                league: league,
                                homeTeam: home,
                                awayTeam: away,
                                homeScore: homeScore,
                                awayScore: awayScore,
                                status: 'FINISHED',
                                date: new Date().toISOString().split('T')[0]
            };

                                MATCH_DATA.push(newMatch);
                                saveMatches();

                                alert(`Partido de ${league} añadido localmente. Recalculando puntos...`);
                                calculateScores();
                                renderDashboard();
                                renderStandings();
                                renderTeams();
                                e.target.reset();
        });

        document.getElementById('update-1a-btn').addEventListener('click', () =>
                                updateLeague('https://raw.githubusercontent.com/openfootball/football.json/master/2025-26/es.1.json', '1a', 'update-1a-btn')
                                );

        document.getElementById('update-2a-btn').addEventListener('click', () =>
                                updateLeague('https://raw.githubusercontent.com/openfootball/football.json/master/2025-26/es.2.json', '2a', 'update-2a-btn')
                                );
    }
}

                                const TEAM_MAPPING = {
                                    // 1a Division
                                    "Athletic Club": "Athletic",
                                "Getafe CF": "Getafe",
                                "Real Betis Balompié": "Betis",
                                "Girona FC": "Girona",
                                "RC Celta de Vigo": "Celta",
                                "Deportivo Alavés": "Alavés",
                                "UD Las Palmas": "Las Palmas",
                                "Sevilla FC": "Sevilla",
                                "CA Osasuna": "Osasuna",
                                "CD Leganés": "Leganés",
                                "Valencia CF": "Valencia",
                                "FC Barcelona": "Barcelona",
                                "Real Sociedad de Fútbol": "Real Sociedad",
                                "Rayo Vallecano de Madrid": "Rayo Vallecano",
                                "RCD Mallorca": "Mallorca",
                                "Real Madrid CF": "Real Madrid",
                                "Real Valladolid CF": "Valladolid",
                                "RCD Espanyol de Barcelona": "Espanyol",
                                "Villarreal CF": "Villarreal",
                                "Club Atlético de Madrid": "Atlético de Madrid",

                                // 2a Division (Common variations)
                                "Real Zaragoza": "Zaragoza",
                                "Real Sporting de Gijón": "Sporting",
                                "Real Oviedo": "Oviedo",
                                "Racing de Santander": "Racing",
                                "Levante UD": "Levante",
                                "SD Eibar": "Eibar",
                                "Burgos CF": "Burgos",
                                "CD Tenerife": "Tenerife",
                                "Cádiz CF": "Cádiz",
                                "Granada CF": "Granada",
                                "UD Almería": "Almería",
                                "Albacete Balompié": "Albacete",
                                "FC Cartagena": "Cartagena",
                                "CD Mirandés": "Mirandés",
                                "SD Huesca": "Huesca",
                                "Elche CF": "Elche",
                                "CD Eldense": "Eldense",
                                "Racing Club de Ferrol": "Racing Ferrol",
                                "Córdoba CF": "Córdoba",
                                "Málaga CF": "Málaga",
                                "CD Castellón": "Castellón",
                                "RC Deportivo de La Coruña": "Deportivo"
};

                                async function updateLeague(url, leagueId, btnId) {
    const btn = document.getElementById(btnId);
                                const originalText = btn.textContent;
                                btn.disabled = true;
                                btn.textContent = '⏳ ...';

                                try {
        const response = await fetch(url);
                                if (!response.ok) throw new Error('Error de red al conectar con OpenFootball');

                                const data = await response.json();
                                let addedCount = 0;

        data.matches.forEach(match => {
            if (match.score && match.score.ft) {
                const homeName = TEAM_MAPPING[match.team1] || match.team1;
                                const awayName = TEAM_MAPPING[match.team2] || match.team2;

                // Check if match already exists to avoid duplicates
                const exists = MATCH_DATA.some(m =>
                                m.league === leagueId &&
                                m.homeTeam === homeName &&
                                m.awayTeam === awayName
                                );

                                if (!exists) {
                                    MATCH_DATA.push({
                                        id: Date.now() + Math.random(), // Unique ID
                                        league: leagueId,
                                        homeTeam: homeName,
                                        awayTeam: awayName,
                                        homeScore: match.score.ft[0],
                                        awayScore: match.score.ft[1],
                                        status: 'FINISHED',
                                        date: match.date
                                    });
                                addedCount++;
                }
            }
        });

                                saveMatches();
                                calculateScores();
                                renderDashboard();
                                renderStandings();
                                renderTeams();

                                alert(`Actualización completada. Se han añadido ${addedCount} partidos de ${leagueId === '1a' ? '1ª División' : '2ª División'}.`);

    } catch (error) {
                                    console.error(error);
                                alert('Error al actualizar: ' + error.message);
    } finally {
                                    btn.disabled = false;
                                btn.textContent = originalText;
    }
}
