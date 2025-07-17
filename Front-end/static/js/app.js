const country_from_select = document.querySelector('select[name="Country-from"]')
const league_from_select = document.querySelector('select[name="league-from"]')
const club_from_select = document.querySelector('select[name="Club-from"]')
const contry_to_select = document.querySelector('select[name="Country-to"]')
const league_to_select = document.querySelector('select[name="league-to"]')
const club_to_select = document.querySelector('select[name="Club-to"]')

const countryLeagueMap = {
    England: ['Premier League', "Championship", "League One"],
    Spain: ['LaLiga', "LaLiga2", "Primera Federación - Gr. II"],
    Germany: ['Bundesliga', "2. Bundesliga", "3. Liga"],
    Italy: ['Serie A', "Serie B", "Serie C - C"],
    France: ["Ligue 1"],
    Portugal: ["Liga Portugal"],
    Netherlands: ["Eredivisie"],
    Belgium: ["Jupiler Pro League"],
    Scotland: ["Premiership"],
    Greece: ["Super League 1"],
    Czech: ["Fortuna Liga"],
    Austria: ["Austria Bundesliga"],
    Switzerland: ["Super League"],
    Denmark: ["Superligaen"],
    Turkey: ["Süper Lig"],
    Russia: ["Russia Premier Liga"],
    Ukraine: ["Ukraine Premier Liga"],
    Argentina: ["Liga Profesional"],
    Brazil: ["Série A"],
    Japan: ["J1 League", "J2 League"],
    'Korea, South': ['K League 1'],
    'Saudi Arabia': ["Saudi Pro League"],
    Qatar: ["Stars League"],
    'United Arab Emirates': ["UAE Pro League"],
    Mexico: ["Liga MX"],
    'United States': ["MLS"]

}

const leagueClubMap = {
    'Premier League': [
        "Manchester City",
        "Manchester United",
        "Liverpool FC",
        "Arsenal FC",
        "Chelsea FC",
        "Tottenham Hotspur",
        "Newcastle United",
        "Aston Villa",
        "West Ham United",
        "Brighton & Hove Albion",
        "Brentford FC",
        "Fulham FC",
        "Crystal Palace",
        "Wolverhampton Wanderers",
        "AFC Bournemouth",
        "Nottingham Forest",
        "Everton FC",
        "Leicester City",
        "Leeds United",
        "Southampton FC"
    ],

    'Championship': [
        "Burnley FC",
        "Sheffield United",
        "Luton Town",
        "Middlesbrough FC",
        "Watford FC",
        "Norwich City"
        


    ],

    "League One": [
        "Derby County",
        "Ipswich Town",
        "Oxford United"
    ],

    'LaLiga': [
        "FC Barcelona",
        "Real Madrid",
        "Atlético de Madrid",
        "Real Sociedad",
        "Villarreal CF",
        "Real Betis Balompié",
        "CA Osasuna",
        "Athletic Bilbao",
        "Málaga CF",
        "Girona FC",
        "Rayo Vallecano",
        "Sevilla FC",
        "Celta de Vigo",
        "Cadiz",
        "Getafe CF",
        "Valencia CF",
        "UD Almería",
        "Real Valladolid CF",
        "RCD Espanyol Barcelona",
        "Elche CF"
    ],

    "LaLiga2": [
        "Granada CF",
        "Deportivo Alavés",
        "Levante UD",
        "SD Eibar"
    ],

    'Serie A': [
        "Juventus FC",
        "AC Milan",
        "Inter Milan",
        "AS Roma",
        "Napoli",
        "SS Lazio",
        "Atalanta BC",
        "ACF Fiorentina",
        "Bologna FC 1909",
        "Torino FC",
        "Monza",
        "Udinese Calcio",
        "Sassuolo",
        "Empoli FC",
        "Salernitana",
        "US Lecce",
        "Spezia Calcio",
        "Hellas Verona",
        "US Cremonese",
        "UC Sampdoria"
        
    ],

    "Serie B": [
        "Cagliari Calcio",
        "Genoa CFC",
        "Pisa Sporting Club",
        "Venezia FC",
        "Parma Calcio 1913"
    ],

    "Bundesliga": [
        "Bayern Munich",
        "Borussia Dortmund",
        "RB Leipzig",
        "1.FC Union Berlin",
        "SC Freiburg",
        "Bayer 04 Leverkusen",
        "Eintracht Frankfurt",
        "VfL Wolfsburg",
        "1. FSV Mainz 05",
        "Borussia Mönchengladbach",
        "1. FC Köln",
        "TSG 1899 Hoffenheim",
        "SV Werder Bremen",
        "VfL Bochum",
        "FC Augsburg",
        "VfB Stuttgart",
        "FC Schalke 04",
        "Hertha BSC"
    ],

    "2. Bundesliga": [
        "Arminia Bielefeld",
        "FC St. Pauli",
        "SpVgg Greuther Fürth",
        "Hamburger SV",
        "1.FC Nuremberg",

    ],

    "Ligue 1": [
        "Paris Saint-Germain",
        "RC Lens",
        "Olympique Marseille",
        "Stade Rennais FC",
        "LOSC Lille",
        "AS Monaco",
        "Olympique Lyon",
        "Clermont Foot 63",
        "OGC Nice",
        "FC Lorient",
        "Stade Reims",
        "Montpellier HSC",
        "FC Toulouse",
        "Stade Brestois 29",
        "RC Strasbourg Alsace",
        "FC Nantes",
        "AJ Auxerre",
        "AC Ajaccio",
        "ESTAC Troyes",
        "Angers SCO"
    ],

    "Liga Portugal": [
        "SL Benfica",
        "Sporting CP",
        "FC Porto",
        "SC Braga",
        "Portimonense SC",
        "Vitória Guimarães SC"
    ],

    "Eredivisie": [
        "Ajax Amsterdam",
        "Feyenoord Rotterdam",
        "AZ Alkmaar",
        "FC Groningen",
        "PSV Eindhoven",
        "FC Utrecht"
    ],

    "Jupiler Pro League": [
        "Club Brugge KV",
        "KV Oostende",
        "RSC Anderlecht",
        "KRC Genk",
        "RSC Charleroi"
    ],

    "Premiership": [
        "Rangers FC",
        "Celtic FC"
    ],

    "Super League 1": [
        "Olympiacos Piraeus",
        "Aris Thessaloniki",
        "AEK Athens",
        "PAOK Thessaloniki"
    ],

    "Fortuna Liga": [
        "AC Sparta Prague",
        "SK Slavia Prague",
        "FC Viktoria Plzen"
    ],

    "Austria Bundesliga": [
        "Red Bull Salzburg",
        "SK Sturm Graz",
        "Rapid Vienna",
        "LASK"
    ],

    "Super League": [
        "FC Zürich",
        "Servette FC",
        "BSC Young Boys"
    ],

    "Superligaen": [
        "FC Midtjylland",
        "FC Nordsjaelland",
        "FC Copenhagen"
    ],

    "Süper Lig": [
        "Fenerbahce SK",
        "Galatasaray A.S.",
        "Besiktas JK",
        "Trabzonspor"
    ],

    "Russia Premier Liga": [
        "Dynamo Moscow",
        "Lokomotiv Moscow",
        "Spartak Moscow",
        "Zenit St. Petersburg",
        "CSKA Moscow"
    ],

    "Ukraine Premier Liga": [
        "Shakhtar Donetsk",
        "Dynamo Kyiv"
    ],

    "Liga Profesional": [
        "CA River Plate",
        "Club Atlético Lanús",
        "CA Banfield",
        "CA Newell's Old Boys",
        "AA Argentinos Juniors",
        "CA Boca Juniors"
    ],

    "Série A": [
        "Sociedade Esportiva Palmeiras",
        "Fluminense Football Club",
        "São Paulo Futebol Clube",
        "Sport Club Corinthians Paulista",
        "Santos FC",
        "Clube de Regatas do Flamengo",
        "Clube Atlético Mineiro",
        "Coritiba Foot Ball Club",
        "Botafogo de Futebol e Regatas"
    ],

    "J1 League": [
        "Vissel Kobe",
        "Yokohama F. Marinos",
        "Sanfrecce Hiroshima",
        "Urawa Red Diamonds",
        "Kashima Antlers",
        "Nagoya Grampus Eight",
        "Avispa Fukuoka",
        "Kawasaki Frontale",
        "Cerezo Osaka",
        "Albirex Niigata",
        "FC Tokyo",
        "Consadole Sapporo",
        "Kyoto Sanga FC",
        "Sagan Tosu",
        "Shonan Bellmare",
        "Gamba Osaka",
        "Kashiwa Reysol",
        "Yokohama FC"
    ],

    "J2 League": [
        "Machida Zelvia",
        "Júbilo Iwata",
        "Tokyo Verdy",
        "Shimizu S-Pulse",

    ],

    'K League 1': [
        "Jeonbuk Hyundai Motors",
        "Incheon United"
    ],

    "Saudi Pro League": [
        "Al-Ittihad Club (Jeddah)",
        "Al-Shabab Club (Riyadh)",
        "Al-Ahli Saudi FC",
        "Al-Nassr Riad",
        "Al-Fayha FC",

    ],

    "Stars League": [
        "Al-Arabi SC",
        "Al-Duhail SC",
        "Al-Rayyan SC",
        "Al-Gharafa SC"
  
    ],

    "UAE Pro League": [
        "Al-Nasr SC (UAE)",
        "Al-Wahda FC Abu Dhabi",
        "Sharjah Cultural Sports Club",
        "Al-Wasl Sports Club",
        "Al-Ittihad Kalba SC"
    ],

    "Liga MX": [
        "Tigres UANL",
        "Club León FC",
        "CF Monterrey",
        "CF Pachuca"
    ],

    "MLS": [
        "Los Angeles FC",
        "New York City FC",
        "Chicago Fire FC",
        "New England Revolution",
        "Colorado Rapids",
        "Inter Miami CF",
        "Austin FC",
        "Minnesota United FC",
        "FC Cincinnati",
        "Philadelphia Union",
        "San Jose Earthquakes"
    ]


}

country_from_select.addEventListener('change', (event) =>{
    const selectedCountry = event.target.value;
    const leagues = countryLeagueMap[selectedCountry] || [];

    league_from_select.innerHTML = '<option selected>league that player was playing</option>';

    leagues.forEach(league => {
        const option = document.createElement('option');
        option.value = league;
        option.textContent = league;
        league_from_select.appendChild(option);
    });
});

league_from_select.addEventListener("change", (event) =>{
    const selectedLeague = event.target.value;
    const clubs = leagueClubMap[selectedLeague] || [];

    club_from_select.innerHTML = "<option selected>club player will play</option>";

    clubs.forEach(club => {
        const option = document.createElement("option");
        option.value = club;
        option.textContent = club;
        club_from_select.appendChild(option)
    })
});

contry_to_select.addEventListener('change', (event) =>{
    const selectedCountry = event.target.value;
    const leagues = countryLeagueMap[selectedCountry] || [];

    league_to_select.innerHTML = '<option selected>league that player was playing</option>';

    leagues.forEach(league => {
        const option = document.createElement('option');
        option.value = league;
        option.textContent = league;
        league_to_select.appendChild(option);
    });
});

league_to_select.addEventListener("change", (event) =>{
    const selectedLeague = event.target.value;
    const clubs = leagueClubMap[selectedLeague] || [];

    club_to_select.innerHTML = "<option selected>club player will play</option>";

    clubs.forEach(club => {
        const option = document.createElement("option");
        option.value = club;
        option.textContent = club;
        club_to_select.appendChild(option)
    })
});