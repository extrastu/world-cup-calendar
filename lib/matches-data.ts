export interface Match {
  id: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  city: string;
  group: string;
  stage: "group" | "round-of-32" | "round-of-16" | "quarter-final" | "semi-final" | "third-place" | "final";
}

export const matches: Match[] = [
  // Group A
  { id: "A1", date: "2026-06-11", time: "15:00", homeTeam: "Mexico", awayTeam: "South Africa", venue: "Estadio Azteca", city: "Mexico City", group: "A", stage: "group" },
  { id: "A2", date: "2026-06-11", time: "22:00", homeTeam: "South Korea", awayTeam: "Czechia", venue: "Estadio Akron", city: "Zapopan", group: "A", stage: "group" },
  { id: "A3", date: "2026-06-18", time: "12:00", homeTeam: "Czechia", awayTeam: "South Africa", venue: "Mercedes-Benz Stadium", city: "Atlanta", group: "A", stage: "group" },
  { id: "A4", date: "2026-06-18", time: "21:00", homeTeam: "Mexico", awayTeam: "South Korea", venue: "Estadio Akron", city: "Zapopan", group: "A", stage: "group" },
  { id: "A5", date: "2026-06-24", time: "21:00", homeTeam: "Czechia", awayTeam: "Mexico", venue: "Estadio Azteca", city: "Mexico City", group: "A", stage: "group" },
  { id: "A6", date: "2026-06-24", time: "21:00", homeTeam: "South Africa", awayTeam: "South Korea", venue: "Estadio BBVA", city: "Guadalupe", group: "A", stage: "group" },

  // Group B
  { id: "B1", date: "2026-06-12", time: "15:00", homeTeam: "Canada", awayTeam: "Bosnia and Herzegovina", venue: "BMO Field", city: "Toronto", group: "B", stage: "group" },
  { id: "B2", date: "2026-06-13", time: "15:00", homeTeam: "Qatar", awayTeam: "Switzerland", venue: "Levi's Stadium", city: "Santa Clara", group: "B", stage: "group" },
  { id: "B3", date: "2026-06-18", time: "15:00", homeTeam: "Switzerland", awayTeam: "Bosnia and Herzegovina", venue: "SoFi Stadium", city: "Inglewood", group: "B", stage: "group" },
  { id: "B4", date: "2026-06-18", time: "18:00", homeTeam: "Canada", awayTeam: "Qatar", venue: "BC Place", city: "Vancouver", group: "B", stage: "group" },
  { id: "B5", date: "2026-06-24", time: "15:00", homeTeam: "Switzerland", awayTeam: "Canada", venue: "BC Place", city: "Vancouver", group: "B", stage: "group" },
  { id: "B6", date: "2026-06-24", time: "15:00", homeTeam: "Bosnia and Herzegovina", awayTeam: "Qatar", venue: "Lumen Field", city: "Seattle", group: "B", stage: "group" },

  // Group C
  { id: "C1", date: "2026-06-13", time: "18:00", homeTeam: "Brazil", awayTeam: "Morocco", venue: "MetLife Stadium", city: "East Rutherford", group: "C", stage: "group" },
  { id: "C2", date: "2026-06-13", time: "21:00", homeTeam: "Haiti", awayTeam: "Scotland", venue: "Gillette Stadium", city: "Foxborough", group: "C", stage: "group" },
  { id: "C3", date: "2026-06-19", time: "18:00", homeTeam: "Scotland", awayTeam: "Morocco", venue: "Gillette Stadium", city: "Foxborough", group: "C", stage: "group" },
  { id: "C4", date: "2026-06-19", time: "21:00", homeTeam: "Brazil", awayTeam: "Haiti", venue: "Lincoln Financial Field", city: "Philadelphia", group: "C", stage: "group" },
  { id: "C5", date: "2026-06-24", time: "18:00", homeTeam: "Scotland", awayTeam: "Brazil", venue: "Hard Rock Stadium", city: "Miami Gardens", group: "C", stage: "group" },
  { id: "C6", date: "2026-06-24", time: "18:00", homeTeam: "Morocco", awayTeam: "Haiti", venue: "Mercedes-Benz Stadium", city: "Atlanta", group: "C", stage: "group" },

  // Group D
  { id: "D1", date: "2026-06-12", time: "21:00", homeTeam: "USA", awayTeam: "Paraguay", venue: "SoFi Stadium", city: "Inglewood", group: "D", stage: "group" },
  { id: "D2", date: "2026-06-13", time: "00:00", homeTeam: "Australia", awayTeam: "Turkey", venue: "BC Place", city: "Vancouver", group: "D", stage: "group" },
  { id: "D3", date: "2026-06-19", time: "00:00", homeTeam: "Turkey", awayTeam: "Paraguay", venue: "Levi's Stadium", city: "Santa Clara", group: "D", stage: "group" },
  { id: "D4", date: "2026-06-19", time: "15:00", homeTeam: "USA", awayTeam: "Australia", venue: "Lumen Field", city: "Seattle", group: "D", stage: "group" },
  { id: "D5", date: "2026-06-25", time: "22:00", homeTeam: "Turkey", awayTeam: "USA", venue: "SoFi Stadium", city: "Inglewood", group: "D", stage: "group" },
  { id: "D6", date: "2026-06-25", time: "22:00", homeTeam: "Paraguay", awayTeam: "Australia", venue: "Levi's Stadium", city: "Santa Clara", group: "D", stage: "group" },

  // Group E
  { id: "E1", date: "2026-06-14", time: "13:00", homeTeam: "Germany", awayTeam: "Curaçao", venue: "NRG Stadium", city: "Houston", group: "E", stage: "group" },
  { id: "E2", date: "2026-06-14", time: "19:00", homeTeam: "Ivory Coast", awayTeam: "Ecuador", venue: "Lincoln Financial Field", city: "Philadelphia", group: "E", stage: "group" },
  { id: "E3", date: "2026-06-20", time: "16:00", homeTeam: "Germany", awayTeam: "Ivory Coast", venue: "BMO Field", city: "Toronto", group: "E", stage: "group" },
  { id: "E4", date: "2026-06-20", time: "20:00", homeTeam: "Ecuador", awayTeam: "Curaçao", venue: "Arrowhead Stadium", city: "Kansas City", group: "E", stage: "group" },
  { id: "E5", date: "2026-06-25", time: "16:00", homeTeam: "Ecuador", awayTeam: "Germany", venue: "MetLife Stadium", city: "East Rutherford", group: "E", stage: "group" },
  { id: "E6", date: "2026-06-25", time: "16:00", homeTeam: "Curaçao", awayTeam: "Ivory Coast", venue: "Lincoln Financial Field", city: "Philadelphia", group: "E", stage: "group" },

  // Group F
  { id: "F1", date: "2026-06-14", time: "16:00", homeTeam: "Netherlands", awayTeam: "Japan", venue: "AT&T Stadium", city: "Arlington", group: "F", stage: "group" },
  { id: "F2", date: "2026-06-14", time: "22:00", homeTeam: "Sweden", awayTeam: "Tunisia", venue: "Estadio BBVA", city: "Guadalupe", group: "F", stage: "group" },
  { id: "F3", date: "2026-06-20", time: "13:00", homeTeam: "Netherlands", awayTeam: "Sweden", venue: "NRG Stadium", city: "Houston", group: "F", stage: "group" },
  { id: "F4", date: "2026-06-20", time: "00:00", homeTeam: "Tunisia", awayTeam: "Japan", venue: "Estadio BBVA", city: "Guadalupe", group: "F", stage: "group" },
  { id: "F5", date: "2026-06-25", time: "19:00", homeTeam: "Tunisia", awayTeam: "Netherlands", venue: "AT&T Stadium", city: "Arlington", group: "F", stage: "group" },
  { id: "F6", date: "2026-06-25", time: "19:00", homeTeam: "Japan", awayTeam: "Sweden", venue: "Arrowhead Stadium", city: "Kansas City", group: "F", stage: "group" },

  // Group G
  { id: "G1", date: "2026-06-15", time: "15:00", homeTeam: "Belgium", awayTeam: "Egypt", venue: "Lumen Field", city: "Seattle", group: "G", stage: "group" },
  { id: "G2", date: "2026-06-15", time: "21:00", homeTeam: "Iran", awayTeam: "New Zealand", venue: "SoFi Stadium", city: "Inglewood", group: "G", stage: "group" },
  { id: "G3", date: "2026-06-21", time: "15:00", homeTeam: "Belgium", awayTeam: "Iran", venue: "SoFi Stadium", city: "Inglewood", group: "G", stage: "group" },
  { id: "G4", date: "2026-06-21", time: "21:00", homeTeam: "New Zealand", awayTeam: "Egypt", venue: "BC Place", city: "Vancouver", group: "G", stage: "group" },
  { id: "G5", date: "2026-06-26", time: "23:00", homeTeam: "New Zealand", awayTeam: "Belgium", venue: "BC Place", city: "Vancouver", group: "G", stage: "group" },
  { id: "G6", date: "2026-06-26", time: "23:00", homeTeam: "Egypt", awayTeam: "Iran", venue: "Lumen Field", city: "Seattle", group: "G", stage: "group" },

  // Group H
  { id: "H1", date: "2026-06-15", time: "12:00", homeTeam: "Spain", awayTeam: "Cape Verde", venue: "Mercedes-Benz Stadium", city: "Atlanta", group: "H", stage: "group" },
  { id: "H2", date: "2026-06-15", time: "18:00", homeTeam: "Saudi Arabia", awayTeam: "Uruguay", venue: "Hard Rock Stadium", city: "Miami Gardens", group: "H", stage: "group" },
  { id: "H3", date: "2026-06-21", time: "12:00", homeTeam: "Spain", awayTeam: "Saudi Arabia", venue: "Mercedes-Benz Stadium", city: "Atlanta", group: "H", stage: "group" },
  { id: "H4", date: "2026-06-21", time: "18:00", homeTeam: "Uruguay", awayTeam: "Cape Verde", venue: "Hard Rock Stadium", city: "Miami Gardens", group: "H", stage: "group" },
  { id: "H5", date: "2026-06-26", time: "20:00", homeTeam: "Uruguay", awayTeam: "Spain", venue: "NRG Stadium", city: "Houston", group: "H", stage: "group" },
  { id: "H6", date: "2026-06-26", time: "20:00", homeTeam: "Cape Verde", awayTeam: "Saudi Arabia", venue: "Estadio Akron", city: "Zapopan", group: "H", stage: "group" },

  // Group I
  { id: "I1", date: "2026-06-16", time: "15:00", homeTeam: "France", awayTeam: "Senegal", venue: "MetLife Stadium", city: "East Rutherford", group: "I", stage: "group" },
  { id: "I2", date: "2026-06-16", time: "18:00", homeTeam: "Iraq", awayTeam: "Norway", venue: "Gillette Stadium", city: "Foxborough", group: "I", stage: "group" },
  { id: "I3", date: "2026-06-22", time: "17:00", homeTeam: "France", awayTeam: "Iraq", venue: "Lincoln Financial Field", city: "Philadelphia", group: "I", stage: "group" },
  { id: "I4", date: "2026-06-22", time: "20:00", homeTeam: "Norway", awayTeam: "Senegal", venue: "MetLife Stadium", city: "East Rutherford", group: "I", stage: "group" },
  { id: "I5", date: "2026-06-26", time: "15:00", homeTeam: "Norway", awayTeam: "France", venue: "Gillette Stadium", city: "Foxborough", group: "I", stage: "group" },
  { id: "I6", date: "2026-06-26", time: "15:00", homeTeam: "Senegal", awayTeam: "Iraq", venue: "BMO Field", city: "Toronto", group: "I", stage: "group" },

  // Group J
  { id: "J1", date: "2026-06-16", time: "21:00", homeTeam: "Argentina", awayTeam: "Algeria", venue: "Arrowhead Stadium", city: "Kansas City", group: "J", stage: "group" },
  { id: "J2", date: "2026-06-17", time: "00:00", homeTeam: "Austria", awayTeam: "Jordan", venue: "Levi's Stadium", city: "Santa Clara", group: "J", stage: "group" },
  { id: "J3", date: "2026-06-22", time: "13:00", homeTeam: "Argentina", awayTeam: "Austria", venue: "AT&T Stadium", city: "Arlington", group: "J", stage: "group" },
  { id: "J4", date: "2026-06-22", time: "23:00", homeTeam: "Jordan", awayTeam: "Algeria", venue: "Levi's Stadium", city: "Santa Clara", group: "J", stage: "group" },
  { id: "J5", date: "2026-06-27", time: "22:00", homeTeam: "Jordan", awayTeam: "Argentina", venue: "AT&T Stadium", city: "Arlington", group: "J", stage: "group" },
  { id: "J6", date: "2026-06-27", time: "22:00", homeTeam: "Algeria", awayTeam: "Austria", venue: "Arrowhead Stadium", city: "Kansas City", group: "J", stage: "group" },

  // Group K
  { id: "K1", date: "2026-06-17", time: "13:00", homeTeam: "Portugal", awayTeam: "DR Congo", venue: "NRG Stadium", city: "Houston", group: "K", stage: "group" },
  { id: "K2", date: "2026-06-17", time: "22:00", homeTeam: "Uzbekistan", awayTeam: "Colombia", venue: "Estadio Azteca", city: "Mexico City", group: "K", stage: "group" },
  { id: "K3", date: "2026-06-23", time: "13:00", homeTeam: "Portugal", awayTeam: "Uzbekistan", venue: "NRG Stadium", city: "Houston", group: "K", stage: "group" },
  { id: "K4", date: "2026-06-23", time: "22:00", homeTeam: "Colombia", awayTeam: "DR Congo", venue: "Estadio Akron", city: "Zapopan", group: "K", stage: "group" },
  { id: "K5", date: "2026-06-27", time: "19:30", homeTeam: "Colombia", awayTeam: "Portugal", venue: "Hard Rock Stadium", city: "Miami Gardens", group: "K", stage: "group" },
  { id: "K6", date: "2026-06-27", time: "19:30", homeTeam: "DR Congo", awayTeam: "Uzbekistan", venue: "Mercedes-Benz Stadium", city: "Atlanta", group: "K", stage: "group" },

  // Group L
  { id: "L1", date: "2026-06-17", time: "16:00", homeTeam: "England", awayTeam: "Croatia", venue: "AT&T Stadium", city: "Arlington", group: "L", stage: "group" },
  { id: "L2", date: "2026-06-17", time: "19:00", homeTeam: "Ghana", awayTeam: "Panama", venue: "BMO Field", city: "Toronto", group: "L", stage: "group" },
  { id: "L3", date: "2026-06-23", time: "16:00", homeTeam: "England", awayTeam: "Ghana", venue: "Gillette Stadium", city: "Foxborough", group: "L", stage: "group" },
  { id: "L4", date: "2026-06-23", time: "19:00", homeTeam: "Panama", awayTeam: "Croatia", venue: "BMO Field", city: "Toronto", group: "L", stage: "group" },
  { id: "L5", date: "2026-06-27", time: "17:00", homeTeam: "Panama", awayTeam: "England", venue: "MetLife Stadium", city: "East Rutherford", group: "L", stage: "group" },
  { id: "L6", date: "2026-06-27", time: "17:00", homeTeam: "Croatia", awayTeam: "Ghana", venue: "Lincoln Financial Field", city: "Philadelphia", group: "L", stage: "group" },

  // Knockout Stage - Round of 32
  { id: "R32-1", date: "2026-06-28", time: "12:00", homeTeam: "1A", awayTeam: "3C/D/E", venue: "TBD", city: "TBD", group: "", stage: "round-of-32" },
  { id: "R32-2", date: "2026-06-28", time: "15:00", homeTeam: "2C", awayTeam: "2D", venue: "TBD", city: "TBD", group: "", stage: "round-of-32" },
  { id: "R32-3", date: "2026-06-28", time: "18:00", homeTeam: "1B", awayTeam: "3A/B/F", venue: "TBD", city: "TBD", group: "", stage: "round-of-32" },
  { id: "R32-4", date: "2026-06-28", time: "21:00", homeTeam: "2A", awayTeam: "2B", venue: "TBD", city: "TBD", group: "", stage: "round-of-32" },
  { id: "R32-5", date: "2026-06-29", time: "12:00", homeTeam: "1D", awayTeam: "3B/E/F", venue: "TBD", city: "TBD", group: "", stage: "round-of-32" },
  { id: "R32-6", date: "2026-06-29", time: "15:00", homeTeam: "1C", awayTeam: "3A/D/E", venue: "TBD", city: "TBD", group: "", stage: "round-of-32" },
  { id: "R32-7", date: "2026-06-29", time: "18:00", homeTeam: "2E", awayTeam: "2F", venue: "TBD", city: "TBD", group: "", stage: "round-of-32" },
  { id: "R32-8", date: "2026-06-29", time: "21:00", homeTeam: "1E", awayTeam: "3A/B/C", venue: "TBD", city: "TBD", group: "", stage: "round-of-32" },
  { id: "R32-9", date: "2026-06-30", time: "12:00", homeTeam: "1F", awayTeam: "3C/D/F", venue: "TBD", city: "TBD", group: "", stage: "round-of-32" },
  { id: "R32-10", date: "2026-06-30", time: "15:00", homeTeam: "1G", awayTeam: "3G/H/I", venue: "TBD", city: "TBD", group: "", stage: "round-of-32" },
  { id: "R32-11", date: "2026-06-30", time: "18:00", homeTeam: "2G", awayTeam: "2H", venue: "TBD", city: "TBD", group: "", stage: "round-of-32" },
  { id: "R32-12", date: "2026-06-30", time: "21:00", homeTeam: "1H", awayTeam: "3I/J/K", venue: "TBD", city: "TBD", group: "", stage: "round-of-32" },
  { id: "R32-13", date: "2026-07-01", time: "12:00", homeTeam: "1I", awayTeam: "3G/H/L", venue: "TBD", city: "TBD", group: "", stage: "round-of-32" },
  { id: "R32-14", date: "2026-07-01", time: "15:00", homeTeam: "2I", awayTeam: "2J", venue: "TBD", city: "TBD", group: "", stage: "round-of-32" },
  { id: "R32-15", date: "2026-07-01", time: "18:00", homeTeam: "1J", awayTeam: "3J/K/L", venue: "TBD", city: "TBD", group: "", stage: "round-of-32" },
  { id: "R32-16", date: "2026-07-01", time: "21:00", homeTeam: "1K", awayTeam: "3H/I/L", venue: "TBD", city: "TBD", group: "", stage: "round-of-32" },

  // Knockout Stage - Round of 16
  { id: "R16-1", date: "2026-07-04", time: "12:00", homeTeam: "W R32-1", awayTeam: "W R32-2", venue: "TBD", city: "TBD", group: "", stage: "round-of-16" },
  { id: "R16-2", date: "2026-07-04", time: "18:00", homeTeam: "W R32-3", awayTeam: "W R32-4", venue: "TBD", city: "TBD", group: "", stage: "round-of-16" },
  { id: "R16-3", date: "2026-07-05", time: "12:00", homeTeam: "W R32-5", awayTeam: "W R32-6", venue: "TBD", city: "TBD", group: "", stage: "round-of-16" },
  { id: "R16-4", date: "2026-07-05", time: "18:00", homeTeam: "W R32-7", awayTeam: "W R32-8", venue: "TBD", city: "TBD", group: "", stage: "round-of-16" },
  { id: "R16-5", date: "2026-07-06", time: "12:00", homeTeam: "W R32-9", awayTeam: "W R32-10", venue: "TBD", city: "TBD", group: "", stage: "round-of-16" },
  { id: "R16-6", date: "2026-07-06", time: "18:00", homeTeam: "W R32-11", awayTeam: "W R32-12", venue: "TBD", city: "TBD", group: "", stage: "round-of-16" },
  { id: "R16-7", date: "2026-07-07", time: "12:00", homeTeam: "W R32-13", awayTeam: "W R32-14", venue: "TBD", city: "TBD", group: "", stage: "round-of-16" },
  { id: "R16-8", date: "2026-07-07", time: "18:00", homeTeam: "W R32-15", awayTeam: "W R32-16", venue: "TBD", city: "TBD", group: "", stage: "round-of-16" },

  // Quarter Finals
  { id: "QF-1", date: "2026-07-11", time: "15:00", homeTeam: "W R16-1", awayTeam: "W R16-2", venue: "TBD", city: "TBD", group: "", stage: "quarter-final" },
  { id: "QF-2", date: "2026-07-11", time: "21:00", homeTeam: "W R16-3", awayTeam: "W R16-4", venue: "TBD", city: "TBD", group: "", stage: "quarter-final" },
  { id: "QF-3", date: "2026-07-12", time: "15:00", homeTeam: "W R16-5", awayTeam: "W R16-6", venue: "TBD", city: "TBD", group: "", stage: "quarter-final" },
  { id: "QF-4", date: "2026-07-12", time: "21:00", homeTeam: "W R16-7", awayTeam: "W R16-8", venue: "TBD", city: "TBD", group: "", stage: "quarter-final" },

  // Semi Finals
  { id: "SF-1", date: "2026-07-15", time: "21:00", homeTeam: "W QF-1", awayTeam: "W QF-2", venue: "TBD", city: "TBD", group: "", stage: "semi-final" },
  { id: "SF-2", date: "2026-07-16", time: "21:00", homeTeam: "W QF-3", awayTeam: "W QF-4", venue: "TBD", city: "TBD", group: "", stage: "semi-final" },

  // Third Place
  { id: "3RD", date: "2026-07-18", time: "16:00", homeTeam: "L SF-1", awayTeam: "L SF-2", venue: "TBD", city: "TBD", group: "", stage: "third-place" },

  // Final
  { id: "FINAL", date: "2026-07-19", time: "16:00", homeTeam: "W SF-1", awayTeam: "W SF-2", venue: "MetLife Stadium", city: "East Rutherford", group: "", stage: "final" },
];

export const groups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

export const groupTeams: Record<string, string[]> = {
  A: ["Mexico", "South Africa", "South Korea", "Czechia"],
  B: ["Canada", "Bosnia and Herzegovina", "Qatar", "Switzerland"],
  C: ["Brazil", "Morocco", "Haiti", "Scotland"],
  D: ["USA", "Paraguay", "Australia", "Turkey"],
  E: ["Germany", "Curaçao", "Ivory Coast", "Ecuador"],
  F: ["Netherlands", "Japan", "Sweden", "Tunisia"],
  G: ["Belgium", "Egypt", "Iran", "New Zealand"],
  H: ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"],
  I: ["France", "Senegal", "Iraq", "Norway"],
  J: ["Argentina", "Algeria", "Austria", "Jordan"],
  K: ["Portugal", "DR Congo", "Uzbekistan", "Colombia"],
  L: ["England", "Croatia", "Ghana", "Panama"],
};

export const teamCountryCodes: Record<string, string> = {
  "Mexico": "MX",
  "South Africa": "ZA",
  "South Korea": "KR",
  "Czechia": "CZ",
  "Canada": "CA",
  "Bosnia and Herzegovina": "BA",
  "Qatar": "QA",
  "Switzerland": "CH",
  "Brazil": "BR",
  "Morocco": "MA",
  "Haiti": "HT",
  "Scotland": "GB-SCT",
  "USA": "US",
  "Paraguay": "PY",
  "Australia": "AU",
  "Turkey": "TR",
  "Germany": "DE",
  "Curaçao": "CW",
  "Ivory Coast": "CI",
  "Ecuador": "EC",
  "Netherlands": "NL",
  "Japan": "JP",
  "Sweden": "SE",
  "Tunisia": "TN",
  "Belgium": "BE",
  "Egypt": "EG",
  "Iran": "IR",
  "New Zealand": "NZ",
  "Spain": "ES",
  "Cape Verde": "CV",
  "Saudi Arabia": "SA",
  "Uruguay": "UY",
  "France": "FR",
  "Senegal": "SN",
  "Iraq": "IQ",
  "Norway": "NO",
  "Argentina": "AR",
  "Algeria": "DZ",
  "Austria": "AT",
  "Jordan": "JO",
  "Portugal": "PT",
  "DR Congo": "CD",
  "Uzbekistan": "UZ",
  "Colombia": "CO",
  "England": "GB-ENG",
  "Croatia": "HR",
  "Ghana": "GH",
  "Panama": "PA",
};
