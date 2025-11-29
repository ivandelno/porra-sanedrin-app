const APP_DATA = {
    currentUser: {
        id: 1,
        name: "Usuario Demo",
        teamName: "Los Invencibles"
    },
    participants: [
        {
            id: 1,
            name: "Usuario Demo",
            teamName: "Los Invencibles",
            points: 125,
            trend: "up",
            teams: [
                { name: "Real Madrid", league: "1a", type: "sum" },
                { name: "Barcelona", league: "1a", type: "subtract" },
                { name: "Man. City", league: "champions", type: "sum" }
            ],
            substitutes: [
                { name: "Real Sociedad", league: "1a", type: "sum" },
                { name: "Arsenal", league: "champions", type: "sum" }
            ],
            changes: [
                { date: "2025-11-15", description: "Cambio: Sale Girona, Entra Real Madrid" }
            ]
        },
        {
            id: 2,
            name: "Carlos",
            teamName: "Rayo McQueer",
            points: 118,
            trend: "down",
            teams: [
                { name: "Atlético", league: "1a", type: "sum" },
                { name: "Sevilla", league: "1a", type: "subtract" },
                { name: "Bayern", league: "champions", type: "sum" }
            ],
            substitutes: [
                { name: "Betis", league: "1a", type: "sum" }
            ],
            changes: [] // No changes yet
        },
        {
            id: 3,
            name: "Ana",
            teamName: "Las Leonas",
            points: 132,
            trend: "up",
            teams: [
                { name: "Girona", league: "1a", type: "sum" },
                { name: "Betis", league: "1a", type: "subtract" },
                { name: "PSG", league: "champions", type: "sum" }
            ],
            substitutes: [
                { name: "Villarreal", league: "1a", type: "sum" },
                { name: "Inter", league: "champions", type: "sum" }
            ],
            changes: [
                { date: "2025-11-20", description: "Cambio: Sale Liverpool, Entra PSG" },
                { date: "2025-11-10", description: "Cambio: Sale Valencia, Entra Girona" }
            ]
        },
        {
            id: 4,
            name: "David",
            teamName: "Team Rocket",
            points: 95,
            trend: "neutral",
            teams: [
                { name: "Valencia", league: "1a", type: "sum" },
                { name: "Villarreal", league: "1a", type: "subtract" },
                { name: "Inter", league: "champions", type: "sum" }
            ],
            substitutes: [],
            changes: []
        }
    ],
    news: [
        {
            id: 1,
            title: "¡Comienza la Jornada 15!",
            date: "2025-11-28",
            content: "Todo listo para una nueva jornada de infarto. ¿Mantendrá el liderato Ana?"
        },
        {
            id: 2,
            title: "Recordatorio de Cambios",
            date: "2025-11-25",
            content: "El mercado de fichajes se cierra el viernes a las 20:00."
        }
    ]
};
