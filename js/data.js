const APP_DATA = {
    currentUser: {
        id: 1,
        name: "Tonito",
        teamName: "Equipo Tonito"
    },
    participants: [
        {
            id: 1,
            name: "Tonito",
            teamName: "Equipo Tonito",
            points: 18,
            initialPoints: 18,
            trend: "up",
            teams: [
                // 1ª División
                { name: "Girona", league: "1a", type: "sum" },
                { name: "Celta", league: "1a", type: "subtract" },
                // 2ª División
                { name: "Sporting", league: "2a", type: "sum" },
                { name: "Oviedo", league: "2a", type: "subtract" },
                // Champions
                { name: "Sporting CP", league: "champions", type: "sum" },
                { name: "Castellón", league: "champions", type: "subtract" }
            ],
            substitutes: [
                { name: "Primera División", league: "1a", type: "sum" },
                { name: "Sevilla", league: "1a", type: "subtract" },
                { name: "Segunda División", league: "2a", type: "sum" },
                { name: "Las Palmas", league: "2a", type: "subtract" },
                { name: "Champions", league: "champions", type: "sum" },
                { name: "Valladolid", league: "champions", type: "subtract" }
            ],
            changes: []
        },
        {
            id: 2,
            name: "Iván",
            teamName: "Equipo Iván",
            points: 16,
            initialPoints: 16,
            trend: "neutral",
            teams: [
                // 1ª División
                { name: "Atlético de Madrid", league: "1a", type: "sum" },
                { name: "Girona", league: "1a", type: "subtract" },
                // 2ª División
                { name: "Levante", league: "2a", type: "sum" },
                { name: "Oviedo", league: "2a", type: "subtract" },
                // Champions
                { name: "Real Madrid", league: "champions", type: "sum" },
                { name: "Castellón", league: "champions", type: "subtract" }
            ],
            substitutes: [
                { name: "Primera División", league: "1a", type: "sum" },
                { name: "Oviedo", league: "1a", type: "subtract" },
                { name: "Segunda División", league: "2a", type: "sum" },
                { name: "Levante", league: "2a", type: "subtract" },
                { name: "Champions", league: "champions", type: "sum" },
                { name: "Leganés", league: "champions", type: "subtract" }
            ],
            changes: []
        },
        {
            id: 3,
            name: "Angelito",
            teamName: "Equipo Angelito",
            points: 15,
            initialPoints: 15,
            trend: "down",
            teams: [
                // 1ª División
                { name: "Atlético de Madrid", league: "1a", type: "sum" },
                { name: "Celta", league: "1a", type: "subtract" },
                // 2ª División
                { name: "Deportivo", league: "2a", type: "sum" },
                { name: "Levante", league: "2a", type: "subtract" },
                // Champions
                { name: "Atalanta", league: "champions", type: "sum" },
                { name: "Ceuta", league: "champions", type: "subtract" }
            ],
            substitutes: [
                { name: "Primera División", league: "1a", type: "sum" },
                { name: "Oviedo", league: "1a", type: "subtract" },
                { name: "Segunda División", league: "2a", type: "sum" },
                { name: "Almería", league: "2a", type: "subtract" },
                { name: "Champions", league: "champions", type: "sum" },
                { name: "Ceuta", league: "champions", type: "subtract" }
            ],
            changes: []
        },
        {
            id: 4,
            name: "Ricardo",
            teamName: "Equipo Ricardo",
            points: 13,
            initialPoints: 13,
            trend: "neutral",
            teams: [
                // 1ª División
                { name: "Osasuna", league: "1a", type: "sum" },
                { name: "Osasuna", league: "1a", type: "subtract" },
                // 2ª División
                { name: "Racing", league: "2a", type: "sum" },
                { name: "Oviedo", league: "2a", type: "subtract" },
                // Champions
                { name: "PSG", league: "champions", type: "sum" },
                { name: "Ceuta", league: "champions", type: "subtract" }
            ],
            substitutes: [
                { name: "Primera División", league: "1a", type: "sum" },
                { name: "Levante", league: "1a", type: "subtract" },
                { name: "Segunda División", league: "2a", type: "sum" },
                { name: "Almería", league: "2a", type: "subtract" },
                { name: "Champions", league: "champions", type: "sum" },
                { name: "Leganés", league: "champions", type: "subtract" }
            ],
            changes: []
        },
        {
            id: 5,
            name: "Johan",
            teamName: "Equipo Johan",
            points: 6,
            initialPoints: 6,
            trend: "down",
            teams: [
                // 1ª División
                { name: "Osasuna", league: "1a", type: "sum" },
                { name: "Osasuna", league: "1a", type: "subtract" },
                // 2ª División
                { name: "Cádiz", league: "2a", type: "sum" },
                { name: "Levante", league: "2a", type: "subtract" },
                // Champions
                { name: "Aston Villa", league: "champions", type: "sum" },
                { name: "Granada", league: "champions", type: "subtract" }
            ],
            substitutes: [
                { name: "Primera División", league: "1a", type: "sum" },
                { name: "Girona", league: "1a", type: "subtract" },
                { name: "Segunda División", league: "2a", type: "sum" },
                { name: "Almería", league: "2a", type: "subtract" },
                { name: "Champions", league: "champions", type: "sum" },
                { name: "Leganés", league: "champions", type: "subtract" }
            ],
            changes: []
        },
        {
            id: 6,
            name: "Pablo",
            teamName: "Equipo Pablo",
            points: 1,
            initialPoints: 1,
            trend: "down",
            teams: [
                // 1ª División
                { name: "Espanyol", league: "1a", type: "sum" },
                { name: "Celta", league: "1a", type: "subtract" },
                // 2ª División
                { name: "Levante", league: "2a", type: "sum" },
                { name: "Levante", league: "2a", type: "subtract" },
                // Champions
                { name: "Sporting CP", league: "champions", type: "sum" },
                { name: "Granada", league: "champions", type: "subtract" }
            ],
            substitutes: [
                { name: "Primera División", league: "1a", type: "sum" },
                { name: "Levante", league: "1a", type: "subtract" },
                { name: "Segunda División", league: "2a", type: "sum" },
                { name: "Almería", league: "2a", type: "subtract" },
                { name: "Champions", league: "champions", type: "sum" },
                { name: "Leganés", league: "champions", type: "subtract" }
            ],
            changes: []
        }
    ],
    news: [
        {
            id: 1,
            title: "¡Bienvenidos a la Porra del Sanedrín!",
            date: "2025-11-29",
            content: "Temporada 2025/26 en marcha. Tonito lidera con 18 puntos."
        },
        {
            id: 2,
            title: "Actualización Automática Disponible",
            date: "2025-11-29",
            content: "Usa el panel Admin para actualizar 1ª y 2ª División automáticamente. Champions League se actualiza manualmente."
        }
    ]
};
