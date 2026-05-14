export interface Match {
  id: string;
  date: string;
  time: string; // EST (美东时间)
  homeTeam: string;
  awayTeam: string;
  venue: string;
  city: string;
  group: string;
  stage: "group" | "round-of-32" | "round-of-16" | "quarter-final" | "semi-final" | "third-place" | "final";
}

// 数据来源: https://github.com/openfootball/worldcup.json/tree/master/2026

export const matches: Match[] = [
  // ==================== GROUP STAGE ====================
  
  // Group A - Mexico, South Korea, Czech Republic, South Africa
  { id: "M1", date: "2026-06-11", time: "14:00", homeTeam: "Mexico", awayTeam: "South Africa", venue: "Estadio Azteca", city: "Mexico City", group: "A", stage: "group" },
  { id: "M2", date: "2026-06-11", time: "21:00", homeTeam: "South Korea", awayTeam: "Czech Republic", venue: "Estadio Akron", city: "Guadalajara", group: "A", stage: "group" },
  { id: "M25", date: "2026-06-18", time: "12:00", homeTeam: "Czech Republic", awayTeam: "South Africa", venue: "Mercedes-Benz Stadium", city: "Atlanta", group: "A", stage: "group" },
  { id: "M28", date: "2026-06-18", time: "20:00", homeTeam: "Mexico", awayTeam: "South Korea", venue: "Estadio Akron", city: "Guadalajara", group: "A", stage: "group" },
  { id: "M53", date: "2026-06-24", time: "20:00", homeTeam: "Czech Republic", awayTeam: "Mexico", venue: "Estadio Azteca", city: "Mexico City", group: "A", stage: "group" },
  { id: "M54", date: "2026-06-24", time: "20:00", homeTeam: "South Africa", awayTeam: "South Korea", venue: "Estadio BBVA", city: "Monterrey", group: "A", stage: "group" },

  // Group B - Canada, Qatar, Switzerland, Bosnia & Herzegovina
  { id: "M3", date: "2026-06-12", time: "15:00", homeTeam: "Canada", awayTeam: "Bosnia & Herzegovina", venue: "BMO Field", city: "Toronto", group: "B", stage: "group" },
  { id: "M6", date: "2026-06-13", time: "15:00", homeTeam: "Qatar", awayTeam: "Switzerland", venue: "Levi's Stadium", city: "San Francisco Bay Area", group: "B", stage: "group" },
  { id: "M26", date: "2026-06-18", time: "15:00", homeTeam: "Switzerland", awayTeam: "Bosnia & Herzegovina", venue: "SoFi Stadium", city: "Los Angeles", group: "B", stage: "group" },
  { id: "M27", date: "2026-06-18", time: "18:00", homeTeam: "Canada", awayTeam: "Qatar", venue: "BC Place", city: "Vancouver", group: "B", stage: "group" },
  { id: "M49", date: "2026-06-24", time: "15:00", homeTeam: "Switzerland", awayTeam: "Canada", venue: "BC Place", city: "Vancouver", group: "B", stage: "group" },
  { id: "M50", date: "2026-06-24", time: "15:00", homeTeam: "Bosnia & Herzegovina", awayTeam: "Qatar", venue: "Lumen Field", city: "Seattle", group: "B", stage: "group" },

  // Group C - Brazil, Morocco, Haiti, Scotland
  { id: "M7", date: "2026-06-13", time: "18:00", homeTeam: "Brazil", awayTeam: "Morocco", venue: "MetLife Stadium", city: "New York/New Jersey", group: "C", stage: "group" },
  { id: "M8", date: "2026-06-13", time: "21:00", homeTeam: "Haiti", awayTeam: "Scotland", venue: "Gillette Stadium", city: "Boston", group: "C", stage: "group" },
  { id: "M31", date: "2026-06-19", time: "18:00", homeTeam: "Scotland", awayTeam: "Morocco", venue: "Gillette Stadium", city: "Boston", group: "C", stage: "group" },
  { id: "M32", date: "2026-06-19", time: "20:30", homeTeam: "Brazil", awayTeam: "Haiti", venue: "Lincoln Financial Field", city: "Philadelphia", group: "C", stage: "group" },
  { id: "M51", date: "2026-06-24", time: "18:00", homeTeam: "Scotland", awayTeam: "Brazil", venue: "Hard Rock Stadium", city: "Miami", group: "C", stage: "group" },
  { id: "M52", date: "2026-06-24", time: "18:00", homeTeam: "Morocco", awayTeam: "Haiti", venue: "Mercedes-Benz Stadium", city: "Atlanta", group: "C", stage: "group" },

  // Group D - USA, Turkey, Australia, Paraguay
  { id: "M4", date: "2026-06-12", time: "21:00", homeTeam: "USA", awayTeam: "Paraguay", venue: "SoFi Stadium", city: "Los Angeles", group: "D", stage: "group" },
  { id: "M5", date: "2026-06-14", time: "00:00", homeTeam: "Australia", awayTeam: "Turkey", venue: "BC Place", city: "Vancouver", group: "D", stage: "group" },
  { id: "M29", date: "2026-06-19", time: "15:00", homeTeam: "USA", awayTeam: "Australia", venue: "Lumen Field", city: "Seattle", group: "D", stage: "group" },
  { id: "M30", date: "2026-06-19", time: "23:00", homeTeam: "Turkey", awayTeam: "Paraguay", venue: "Levi's Stadium", city: "San Francisco Bay Area", group: "D", stage: "group" },
  { id: "M59", date: "2026-06-25", time: "22:00", homeTeam: "Turkey", awayTeam: "USA", venue: "SoFi Stadium", city: "Los Angeles", group: "D", stage: "group" },
  { id: "M60", date: "2026-06-25", time: "22:00", homeTeam: "Paraguay", awayTeam: "Australia", venue: "Levi's Stadium", city: "San Francisco Bay Area", group: "D", stage: "group" },

  // Group E - Germany, Ivory Coast, Ecuador, Curaçao
  { id: "M9", date: "2026-06-14", time: "13:00", homeTeam: "Germany", awayTeam: "Curaçao", venue: "NRG Stadium", city: "Houston", group: "E", stage: "group" },
  { id: "M11", date: "2026-06-14", time: "19:00", homeTeam: "Ivory Coast", awayTeam: "Ecuador", venue: "Lincoln Financial Field", city: "Philadelphia", group: "E", stage: "group" },
  { id: "M35", date: "2026-06-20", time: "16:00", homeTeam: "Germany", awayTeam: "Ivory Coast", venue: "BMO Field", city: "Toronto", group: "E", stage: "group" },
  { id: "M36", date: "2026-06-20", time: "20:00", homeTeam: "Ecuador", awayTeam: "Curaçao", venue: "Arrowhead Stadium", city: "Kansas City", group: "E", stage: "group" },
  { id: "M55", date: "2026-06-25", time: "16:00", homeTeam: "Curaçao", awayTeam: "Ivory Coast", venue: "Lincoln Financial Field", city: "Philadelphia", group: "E", stage: "group" },
  { id: "M56", date: "2026-06-25", time: "16:00", homeTeam: "Ecuador", awayTeam: "Germany", venue: "MetLife Stadium", city: "New York/New Jersey", group: "E", stage: "group" },

  // Group F - Netherlands, Japan, Sweden, Tunisia
  { id: "M10", date: "2026-06-14", time: "16:00", homeTeam: "Netherlands", awayTeam: "Japan", venue: "AT&T Stadium", city: "Dallas", group: "F", stage: "group" },
  { id: "M12", date: "2026-06-14", time: "21:00", homeTeam: "Sweden", awayTeam: "Tunisia", venue: "Estadio BBVA", city: "Monterrey", group: "F", stage: "group" },
  { id: "M33", date: "2026-06-20", time: "13:00", homeTeam: "Netherlands", awayTeam: "Sweden", venue: "NRG Stadium", city: "Houston", group: "F", stage: "group" },
  { id: "M34", date: "2026-06-20", time: "23:00", homeTeam: "Tunisia", awayTeam: "Japan", venue: "Estadio BBVA", city: "Monterrey", group: "F", stage: "group" },
  { id: "M57", date: "2026-06-25", time: "19:00", homeTeam: "Japan", awayTeam: "Sweden", venue: "AT&T Stadium", city: "Dallas", group: "F", stage: "group" },
  { id: "M58", date: "2026-06-25", time: "19:00", homeTeam: "Tunisia", awayTeam: "Netherlands", venue: "Arrowhead Stadium", city: "Kansas City", group: "F", stage: "group" },

  // Group G - Belgium, Egypt, Iran, New Zealand
  { id: "M14", date: "2026-06-15", time: "15:00", homeTeam: "Belgium", awayTeam: "Egypt", venue: "Lumen Field", city: "Seattle", group: "G", stage: "group" },
  { id: "M16", date: "2026-06-15", time: "21:00", homeTeam: "Iran", awayTeam: "New Zealand", venue: "SoFi Stadium", city: "Los Angeles", group: "G", stage: "group" },
  { id: "M38", date: "2026-06-21", time: "15:00", homeTeam: "Belgium", awayTeam: "Iran", venue: "SoFi Stadium", city: "Los Angeles", group: "G", stage: "group" },
  { id: "M40", date: "2026-06-21", time: "21:00", homeTeam: "New Zealand", awayTeam: "Egypt", venue: "BC Place", city: "Vancouver", group: "G", stage: "group" },
  { id: "M65", date: "2026-06-26", time: "23:00", homeTeam: "Egypt", awayTeam: "Iran", venue: "Lumen Field", city: "Seattle", group: "G", stage: "group" },
  { id: "M66", date: "2026-06-26", time: "23:00", homeTeam: "New Zealand", awayTeam: "Belgium", venue: "BC Place", city: "Vancouver", group: "G", stage: "group" },

  // Group H - Spain, Saudi Arabia, Uruguay, Cape Verde
  { id: "M13", date: "2026-06-15", time: "12:00", homeTeam: "Spain", awayTeam: "Cape Verde", venue: "Mercedes-Benz Stadium", city: "Atlanta", group: "H", stage: "group" },
  { id: "M15", date: "2026-06-15", time: "18:00", homeTeam: "Saudi Arabia", awayTeam: "Uruguay", venue: "Hard Rock Stadium", city: "Miami", group: "H", stage: "group" },
  { id: "M37", date: "2026-06-21", time: "12:00", homeTeam: "Spain", awayTeam: "Saudi Arabia", venue: "Mercedes-Benz Stadium", city: "Atlanta", group: "H", stage: "group" },
  { id: "M39", date: "2026-06-21", time: "18:00", homeTeam: "Uruguay", awayTeam: "Cape Verde", venue: "Hard Rock Stadium", city: "Miami", group: "H", stage: "group" },
  { id: "M63", date: "2026-06-26", time: "20:00", homeTeam: "Cape Verde", awayTeam: "Saudi Arabia", venue: "NRG Stadium", city: "Houston", group: "H", stage: "group" },
  { id: "M64", date: "2026-06-26", time: "19:00", homeTeam: "Uruguay", awayTeam: "Spain", venue: "Estadio Akron", city: "Guadalajara", group: "H", stage: "group" },

  // Group I - France, Senegal, Iraq, Norway
  { id: "M17", date: "2026-06-16", time: "15:00", homeTeam: "France", awayTeam: "Senegal", venue: "MetLife Stadium", city: "New York/New Jersey", group: "I", stage: "group" },
  { id: "M18", date: "2026-06-16", time: "18:00", homeTeam: "Iraq", awayTeam: "Norway", venue: "Gillette Stadium", city: "Boston", group: "I", stage: "group" },
  { id: "M42", date: "2026-06-22", time: "17:00", homeTeam: "France", awayTeam: "Iraq", venue: "Lincoln Financial Field", city: "Philadelphia", group: "I", stage: "group" },
  { id: "M43", date: "2026-06-22", time: "20:00", homeTeam: "Norway", awayTeam: "Senegal", venue: "MetLife Stadium", city: "New York/New Jersey", group: "I", stage: "group" },
  { id: "M61", date: "2026-06-26", time: "15:00", homeTeam: "Norway", awayTeam: "France", venue: "Gillette Stadium", city: "Boston", group: "I", stage: "group" },
  { id: "M62", date: "2026-06-26", time: "15:00", homeTeam: "Senegal", awayTeam: "Iraq", venue: "BMO Field", city: "Toronto", group: "I", stage: "group" },

  // Group J - Argentina, Austria, Algeria, Jordan
  { id: "M19", date: "2026-06-16", time: "21:00", homeTeam: "Argentina", awayTeam: "Algeria", venue: "Arrowhead Stadium", city: "Kansas City", group: "J", stage: "group" },
  { id: "M20", date: "2026-06-17", time: "00:00", homeTeam: "Austria", awayTeam: "Jordan", venue: "Levi's Stadium", city: "San Francisco Bay Area", group: "J", stage: "group" },
  { id: "M41", date: "2026-06-22", time: "13:00", homeTeam: "Argentina", awayTeam: "Austria", venue: "AT&T Stadium", city: "Dallas", group: "J", stage: "group" },
  { id: "M44", date: "2026-06-22", time: "23:00", homeTeam: "Jordan", awayTeam: "Algeria", venue: "Levi's Stadium", city: "San Francisco Bay Area", group: "J", stage: "group" },
  { id: "M71", date: "2026-06-27", time: "22:00", homeTeam: "Algeria", awayTeam: "Austria", venue: "Arrowhead Stadium", city: "Kansas City", group: "J", stage: "group" },
  { id: "M72", date: "2026-06-27", time: "22:00", homeTeam: "Jordan", awayTeam: "Argentina", venue: "AT&T Stadium", city: "Dallas", group: "J", stage: "group" },

  // Group K - Portugal, Colombia, DR Congo, Uzbekistan
  { id: "M21", date: "2026-06-17", time: "13:00", homeTeam: "Portugal", awayTeam: "DR Congo", venue: "NRG Stadium", city: "Houston", group: "K", stage: "group" },
  { id: "M24", date: "2026-06-17", time: "21:00", homeTeam: "Uzbekistan", awayTeam: "Colombia", venue: "Estadio Azteca", city: "Mexico City", group: "K", stage: "group" },
  { id: "M45", date: "2026-06-23", time: "13:00", homeTeam: "Portugal", awayTeam: "Uzbekistan", venue: "NRG Stadium", city: "Houston", group: "K", stage: "group" },
  { id: "M48", date: "2026-06-23", time: "21:00", homeTeam: "Colombia", awayTeam: "DR Congo", venue: "Estadio Akron", city: "Guadalajara", group: "K", stage: "group" },
  { id: "M69", date: "2026-06-27", time: "19:30", homeTeam: "Colombia", awayTeam: "Portugal", venue: "Hard Rock Stadium", city: "Miami", group: "K", stage: "group" },
  { id: "M70", date: "2026-06-27", time: "19:30", homeTeam: "DR Congo", awayTeam: "Uzbekistan", venue: "Mercedes-Benz Stadium", city: "Atlanta", group: "K", stage: "group" },

  // Group L - England, Croatia, Ghana, Panama
  { id: "M22", date: "2026-06-17", time: "16:00", homeTeam: "England", awayTeam: "Croatia", venue: "AT&T Stadium", city: "Dallas", group: "L", stage: "group" },
  { id: "M23", date: "2026-06-17", time: "19:00", homeTeam: "Ghana", awayTeam: "Panama", venue: "BMO Field", city: "Toronto", group: "L", stage: "group" },
  { id: "M46", date: "2026-06-23", time: "16:00", homeTeam: "England", awayTeam: "Ghana", venue: "Gillette Stadium", city: "Boston", group: "L", stage: "group" },
  { id: "M47", date: "2026-06-23", time: "19:00", homeTeam: "Panama", awayTeam: "Croatia", venue: "BMO Field", city: "Toronto", group: "L", stage: "group" },
  { id: "M67", date: "2026-06-27", time: "17:00", homeTeam: "Panama", awayTeam: "England", venue: "MetLife Stadium", city: "New York/New Jersey", group: "L", stage: "group" },
  { id: "M68", date: "2026-06-27", time: "17:00", homeTeam: "Croatia", awayTeam: "Ghana", venue: "Lincoln Financial Field", city: "Philadelphia", group: "L", stage: "group" },

  // ==================== KNOCKOUT STAGE ====================

  // Round of 32 (June 28 - July 1)
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

  // Round of 16 (July 4-7)
  { id: "R16-1", date: "2026-07-04", time: "12:00", homeTeam: "W R32-1", awayTeam: "W R32-2", venue: "TBD", city: "TBD", group: "", stage: "round-of-16" },
  { id: "R16-2", date: "2026-07-04", time: "18:00", homeTeam: "W R32-3", awayTeam: "W R32-4", venue: "TBD", city: "TBD", group: "", stage: "round-of-16" },
  { id: "R16-3", date: "2026-07-05", time: "12:00", homeTeam: "W R32-5", awayTeam: "W R32-6", venue: "TBD", city: "TBD", group: "", stage: "round-of-16" },
  { id: "R16-4", date: "2026-07-05", time: "18:00", homeTeam: "W R32-7", awayTeam: "W R32-8", venue: "TBD", city: "TBD", group: "", stage: "round-of-16" },
  { id: "R16-5", date: "2026-07-06", time: "12:00", homeTeam: "W R32-9", awayTeam: "W R32-10", venue: "TBD", city: "TBD", group: "", stage: "round-of-16" },
  { id: "R16-6", date: "2026-07-06", time: "18:00", homeTeam: "W R32-11", awayTeam: "W R32-12", venue: "TBD", city: "TBD", group: "", stage: "round-of-16" },
  { id: "R16-7", date: "2026-07-07", time: "12:00", homeTeam: "W R32-13", awayTeam: "W R32-14", venue: "TBD", city: "TBD", group: "", stage: "round-of-16" },
  { id: "R16-8", date: "2026-07-07", time: "18:00", homeTeam: "W R32-15", awayTeam: "W R32-16", venue: "TBD", city: "TBD", group: "", stage: "round-of-16" },

  // Quarter Finals (July 11-12)
  { id: "QF-1", date: "2026-07-11", time: "15:00", homeTeam: "W R16-1", awayTeam: "W R16-2", venue: "TBD", city: "TBD", group: "", stage: "quarter-final" },
  { id: "QF-2", date: "2026-07-11", time: "21:00", homeTeam: "W R16-3", awayTeam: "W R16-4", venue: "TBD", city: "TBD", group: "", stage: "quarter-final" },
  { id: "QF-3", date: "2026-07-12", time: "15:00", homeTeam: "W R16-5", awayTeam: "W R16-6", venue: "TBD", city: "TBD", group: "", stage: "quarter-final" },
  { id: "QF-4", date: "2026-07-12", time: "21:00", homeTeam: "W R16-7", awayTeam: "W R16-8", venue: "TBD", city: "TBD", group: "", stage: "quarter-final" },

  // Semi Finals (July 15-16)
  { id: "SF-1", date: "2026-07-15", time: "21:00", homeTeam: "W QF-1", awayTeam: "W QF-2", venue: "TBD", city: "TBD", group: "", stage: "semi-final" },
  { id: "SF-2", date: "2026-07-16", time: "21:00", homeTeam: "W QF-3", awayTeam: "W QF-4", venue: "TBD", city: "TBD", group: "", stage: "semi-final" },

  // Third Place (July 18)
  { id: "3RD", date: "2026-07-18", time: "16:00", homeTeam: "L SF-1", awayTeam: "L SF-2", venue: "Hard Rock Stadium", city: "Miami", group: "", stage: "third-place" },

  // Final (July 19)
  { id: "FINAL", date: "2026-07-19", time: "16:00", homeTeam: "W SF-1", awayTeam: "W SF-2", venue: "MetLife Stadium", city: "New York/New Jersey", group: "", stage: "final" },
];

export const groups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

export const groupTeams: Record<string, string[]> = {
  A: ["Mexico", "South Korea", "Czech Republic", "South Africa"],
  B: ["Canada", "Qatar", "Switzerland", "Bosnia & Herzegovina"],
  C: ["Brazil", "Morocco", "Haiti", "Scotland"],
  D: ["USA", "Turkey", "Australia", "Paraguay"],
  E: ["Germany", "Ivory Coast", "Ecuador", "Curaçao"],
  F: ["Netherlands", "Japan", "Sweden", "Tunisia"],
  G: ["Belgium", "Egypt", "Iran", "New Zealand"],
  H: ["Spain", "Saudi Arabia", "Uruguay", "Cape Verde"],
  I: ["France", "Senegal", "Iraq", "Norway"],
  J: ["Argentina", "Austria", "Algeria", "Jordan"],
  K: ["Portugal", "Colombia", "DR Congo", "Uzbekistan"],
  L: ["England", "Croatia", "Ghana", "Panama"],
};

/** UEFA + intercontinental playoff paths (March 2026); assignedGroup matches the winner’s group in this schedule. */
export const playoffTeams: Record<string, { candidates: string[]; assignedGroup: string }> = {
  "UEFA Path A": { candidates: ["Bosnia & Herzegovina", "Italy"], assignedGroup: "B" },
  "UEFA Path B": { candidates: ["Sweden", "Poland"], assignedGroup: "F" },
  "UEFA Path C": { candidates: ["Kosovo", "Turkey"], assignedGroup: "D" },
  "UEFA Path D": { candidates: ["Czech Republic", "Denmark"], assignedGroup: "A" },
  "IC Path 1": { candidates: ["DR Congo", "Jamaica"], assignedGroup: "K" },
  "IC Path 2": { candidates: ["Iraq", "Bolivia"], assignedGroup: "I" },
};

export const teamCountryCodes: Record<string, string> = {
  // Group A
  "Mexico": "MX",
  "South Korea": "KR",
  "Czech Republic": "CZ",
  "South Africa": "ZA",
  
  // Group B
  "Canada": "CA",
  "Qatar": "QA",
  "Switzerland": "CH",
  "Bosnia & Herzegovina": "BA",
  
  // Group C
  "Brazil": "BR",
  "Morocco": "MA",
  "Haiti": "HT",
  "Scotland": "GB-SCT",
  
  // Group D
  "USA": "US",
  "Turkey": "TR",
  "Australia": "AU",
  "Paraguay": "PY",
  
  // Group E
  "Germany": "DE",
  "Ivory Coast": "CI",
  "Ecuador": "EC",
  "Curaçao": "CW",
  
  // Group F
  "Netherlands": "NL",
  "Japan": "JP",
  "Sweden": "SE",
  "Tunisia": "TN",
  
  // Group G
  "Belgium": "BE",
  "Egypt": "EG",
  "Iran": "IR",
  "New Zealand": "NZ",
  
  // Group H
  "Spain": "ES",
  "Saudi Arabia": "SA",
  "Uruguay": "UY",
  "Cape Verde": "CV",
  
  // Group I
  "France": "FR",
  "Senegal": "SN",
  "Iraq": "IQ",
  "Norway": "NO",
  
  // Group J
  "Argentina": "AR",
  "Austria": "AT",
  "Algeria": "DZ",
  "Jordan": "JO",
  
  // Group K
  "Portugal": "PT",
  "Colombia": "CO",
  "DR Congo": "CD",
  "Uzbekistan": "UZ",
  
  // Group L
  "England": "GB-ENG",
  "Croatia": "HR",
  "Ghana": "GH",
  "Panama": "PA",

  // Playoff-only candidates (flags)
  "Italy": "IT",
  "Poland": "PL",
  "Denmark": "DK",
  "Kosovo": "XK",
  "Jamaica": "JM",
  "Bolivia": "BO",
};

// 场馆信息
export const venues: Record<string, { city: string; country: string; capacity: number }> = {
  "Estadio Azteca": { city: "Mexico City", country: "Mexico", capacity: 83000 },
  "Estadio Akron": { city: "Guadalajara", country: "Mexico", capacity: 48000 },
  "Estadio BBVA": { city: "Monterrey", country: "Mexico", capacity: 53500 },
  "BMO Field": { city: "Toronto", country: "Canada", capacity: 45736 },
  "BC Place": { city: "Vancouver", country: "Canada", capacity: 54000 },
  "MetLife Stadium": { city: "New York/New Jersey", country: "USA", capacity: 82500 },
  "SoFi Stadium": { city: "Los Angeles", country: "USA", capacity: 70000 },
  "AT&T Stadium": { city: "Dallas", country: "USA", capacity: 94000 },
  "Hard Rock Stadium": { city: "Miami", country: "USA", capacity: 65000 },
  "Mercedes-Benz Stadium": { city: "Atlanta", country: "USA", capacity: 75000 },
  "NRG Stadium": { city: "Houston", country: "USA", capacity: 72000 },
  "Gillette Stadium": { city: "Boston", country: "USA", capacity: 65878 },
  "Lincoln Financial Field": { city: "Philadelphia", country: "USA", capacity: 69000 },
  "Lumen Field": { city: "Seattle", country: "USA", capacity: 69000 },
  "Levi's Stadium": { city: "San Francisco Bay Area", country: "USA", capacity: 71000 },
  "Arrowhead Stadium": { city: "Kansas City", country: "USA", capacity: 73000 },
};
