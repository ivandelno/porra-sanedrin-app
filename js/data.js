const APP_DATA = {
    currentUser: {
        id: 1,
        name: "Iván",
        teamName: "Equipo Iván"
    },
    participants: [
        {
            id: 1,
            name: "Iván",
            teamName: "Equipo Iván",
            points: 0, // Se calculará automáticamente
            trend: "neutral",
            teams: [
                { name: "Real Madrid", league: "1a", type: "sum" },
                { name: "Atlético de Madrid", league: "1a", type: "subtract" },
                { name: "Sporting", league: "2a", type: "sum" },
                { name: "Levante", league: "2a", type: "subtract" },
                { name: "Liverpool", league: "champions", type: "sum" },
                { name: "Arsenal", league: "champions", type: "subtract" }
            ],
            substitutes: [],
            changes: []
        },
        {
            id: 2,
            name: "Dani",
            teamName: "Equipo Dani",
            points: 0,
            trend: "neutral",
            teams: [
                { name: "Barcelona", league: "1a", type: "sum" },
                { name: "Betis", league: "1a", type: "subtract" },
                { name: "Zaragoza", league: "2a", type: "sum" },
                { name: "Racing", league: "2a", type: "subtract" },
                { name: "Inter", league: "champions", type: "sum" },
                { name: "Atlético Madrid", league: "champions", type: "subtract" }
            ],
            substitutes: [],
            changes: []
        },
        {
            id: 3,
            name: "Guille",
            teamName: "Equipo Guille",
            points: 0,
            trend: "neutral",
            teams: [
                { name: "Athletic", league: "1a", type: "sum" },
                { name: "Girona", league: "1a", type: "subtract" },
                { name: "Oviedo", league: "2a", type: "sum" },
                { name: "Eibar", league: "2a", type: "subtract" },
                { name: "Bayern", league: "champions", type: "sum" },
                { name: "PSG", league: "champions", type: "subtract" }
            ],
            substitutes: [],
            changes: []
        },
        {
            id: 4,
            name: "Jaime",
            teamName: "Equipo Jaime",
            points: 0,
            trend: "neutral",
            teams: [
                { name: "Villarreal", league: "1a", type: "sum" },
                { name: "Celta", league: "1a", type: "subtract" },
                { name: "Burgos", league: "2a", type: "sum" },
                { name: "Tenerife", league: "2a", type: "subtract" },
                { name: "Dortmund", league: "champions", type: "sum" },
                { name: "Juventus", league: "champions", type: "subtract" }
            ],
            substitutes: [],
            changes: []
        },
        {
            id: 5,
            name: "Javi",
            teamName: "Equipo Javi",
            points: 0,
            trend: "neutral",
            teams: [
                { name: "Real Sociedad", league: "1a", type: "sum" },
                { name: "Alavés", league: "1a", type: "subtract" },
                { name: "Cádiz", league: "2a", type: "sum" },
                { name: "Granada", league: "2a", type: "subtract" },
                { name: "Man. City", league: "champions", type: "sum" },
                { name: "Barcelona", league: "champions", type: "subtract" }
            ],
            substitutes: [],
            changes: []
        },
        {
            id: 6,
            name: "Manu",
            teamName: "Equipo Manu",
            points: 0,
            trend: "neutral",
            teams: [
                { name: "Sevilla", league: "1a", type: "sum" },
                { name: "Las Palmas", league: "1a", type: "subtract" },
                { name: "Almería", league: "2a", type: "sum" },
                { name: "Albacete", league: "2a", type: "subtract" },
                { name: "Leverkusen", league: "champions", type: "sum" },
                { name: "Benfica", league: "champions", type: "subtract" }
            ],
            substitutes: [],
            changes: []
        },
        {
            id: 7,
            name: "Marcos",
            teamName: "Equipo Marcos",
            points: 0,
            trend: "neutral",
            teams: [
                { name: "Osasuna", league: "1a", type: "sum" },
                { name: "Leganés", league: "1a", type: "subtract" },
                { name: "Cartagena", league: "2a", type: "sum" },
                { name: "Mirandés", league: "2a", type: "subtract" },
                { name: "Atalanta", league: "champions", type: "sum" },
                { name: "Brest", league: "champions", type: "subtract" }
            ],
            substitutes: [],
            changes: []
        },
        {
            id: 8,
            name: "Nacho",
            teamName: "Equipo Nacho",
            points: 0,
            trend: "neutral",
            teams: [
                { name: "Valencia", league: "1a", type: "sum" },
                { name: "Rayo Vallecano", league: "1a", type: "subtract" },
                { name: "Huesca", league: "2a", type: "sum" },
                { name: "Elche", league: "2a", type: "subtract" },
                { name: "Aston Villa", league: "champions", type: "sum" },
                { name: "Celtic", league: "champions", type: "subtract" }
            ],
            substitutes: [],
            changes: []
        },
        {
            id: 9,
            name: "Pablo",
            teamName: "Equipo Pablo",
            points: 0,
            trend: "neutral",
            teams: [
                { name: "Mallorca", league: "1a", type: "sum" },
                { name: "Valladolid", league: "1a", type: "subtract" },
                { name: "Eldense", league: "2a", type: "sum" },
                { name: "Racing Ferrol", league: "2a", type: "subtract" },
                { name: "Monaco", league: "champions", type: "sum" },
                { name: "Feyenoord", league: "champions", type: "subtract" }
            ],
            substitutes: [],
            changes: []
        },
        {
            id: 10,
            name: "Rafa",
            teamName: "Equipo Rafa",
            points: 0,
            trend: "neutral",
            teams: [
                { name: "Espanyol", league: "1a", type: "sum" },
                { name: "Getafe", league: "1a", type: "subtract" },
                { name: "Córdoba", league: "2a", type: "sum" },
                { name: "Málaga", league: "2a", type: "subtract" },
                { name: "Sporting CP", league: "champions", type: "sum" },
                { name: "Lille", league: "champions", type: "subtract" }
            ],
            substitutes: [],
            changes: []
        },
        {
            id: 11,
            name: "Sergio",
            teamName: "Equipo Sergio",
            points: 0,
            trend: "neutral",
            teams: [
                { name: "Getafe", league: "1a", type: "sum" },
                { name: "Sevilla", league: "1a", type: "subtract" },
                { name: "Castellón", league: "2a", type: "sum" },
                { name: "Deportivo", league: "2a", type: "subtract" },
                { name: "AC Milan", league: "champions", type: "sum" },
                { name: "Real Madrid", league: "champions", type: "subtract" }
            ],
            substitutes: [],
            changes: []
        }
    ],
    news: [
        {
            id: 1,
            title: "¡Bienvenidos a la Porra del Sanedrín!",
            date: "2025-11-29",
            content: "Temporada 2025/26 en marcha. Usa el panel Admin para actualizar resultados automáticamente."
        },
        {
            id: 2,
            title: "Actualización Automática Disponible",
            date: "2025-11-29",
            content: "Ahora puedes actualizar 1ª y 2ª División automáticamente desde el panel Admin. Champions League se actualiza manualmente."
        }
    ]
};
