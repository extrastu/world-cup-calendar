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

// 附加赛说明 (2026年3月确定)
// UEFA Playoff A: Italy / Northern Ireland / Wales / Bosnia and Herzegovina
// UEFA Playoff B: Ukraine / Sweden / Poland / Albania  
// UEFA Playoff C: Türkiye / Romania / Slovakia / Kosovo
// UEFA Playoff D: Denmark / North Macedonia / Czechia / Ireland
// IC Playoff 1: Congo / Jamaica / New Caledonia
// IC Playoff 2: Iraq / Bolivia / Suriname

export const matches: Match[] = [
  // ==================== GROUP STAGE ====================
  
  // Group A - Mexico
  { id: "M1", date: "2026-06-11", time: "15:00", homeTeam: "Mexico", awayTeam: "South Africa", venue: "Estadio Azteca", city: "Mexico City", group: "A", stage: "group" },
  { id: "M2", date: "2026-06-11", time: "22:00", homeTeam: "South Korea", awayTeam: "UEFA Playoff D", venue: "Estadio Akron", city: "Zapopan", group: "A", stage: "group" },
  { id: "M25", date: "2026-06-18", time: "12:00", homeTeam: "UEFA Playoff D", awayTeam: "South Africa", venue: "Mercedes-Benz Stadium", city: "Atlanta", group: "A", stage: "group" },
  { id: "M28", date: "2026-06-18", time: "21:00", homeTeam: "Mexico", awayTeam: "South Korea", venue: "Estadio Akron", city: "Zapopan", group: "A", stage: "group" },
  { id: "M53", date: "2026-06-24", time: "21:00", homeTeam: "UEFA Playoff D", awayTeam: "Mexico", venue: "Estadio Azteca", city: "Mexico City", group: "A", stage: "group" },
  { id: "M54", date: "2026-06-24", time: "21:00", homeTeam: "South Africa", awayTeam: "South Korea", venue: "Estadio BBVA", city: "Monterrey", group: "A", stage: "group" },

  // Group B - Canada
  { id: "M3", date: "2026-06-12", time: "15:00", homeTeam: "Canada", awayTeam: "UEFA Playoff A", venue: "BMO Field", city: "Toronto", group: "B", stage: "group" },
  { id: "M6", date: "2026-06-13", time: "15:00", homeTeam: "Qatar", awayTeam: "Switzerland", venue: "Levi's Stadium", city: "Santa Clara", group: "B", stage: "group" },
  { id: "M26", date: "2026-06-18", time: "15:00", homeTeam: "Switzerland", awayTeam: "UEFA Playoff A", venue: "SoFi Stadium", city: "Inglewood", group: "B", stage: "group" },
  { id: "M27", date: "2026-06-18", time: "18:00", homeTeam: "Canada", awayTeam: "Qatar", venue: "BC Place", city: "Vancouver", group: "B", stage: "group" },
  { id: "M49", date: "2026-06-24", time: "15:00", homeTeam: "Switzerland", awayTeam: "Canada", venue: "BC Place", city: "Vancouver", group: "B", stage: "group" },
  { id: "M50", date: "2026-06-24", time: "15:00", homeTeam: "UEFA Playoff A", awayTeam: "Qatar", venue: "Lumen Field", city: "Seattle", group: "B", stage: "group" },

  // Group C - Brazil
  { id: "M7", date: "2026-06-13", time: "18:00", homeTeam: "Brazil", awayTeam: "Morocco", venue: "MetLife Stadium", city: "East Rutherford", group: "C", stage: "group" },
  { id: "M8", date: "2026-06-13", time: "21:00", homeTeam: "Haiti", awayTeam: "Scotland", venue: "Gillette Stadium", city: "Foxborough", group: "C", stage: "group" },
  { id: "M31", date: "2026-06-19", time: "18:00", homeTeam: "Scotland", awayTeam: "Morocco", venue: "Gillette Stadium", city: "Foxborough", group: "C", stage: "group" },
  { id: "M32", date: "2026-06-19", time: "21:00", homeTeam: "Brazil", awayTeam: "Haiti", venue: "Lincoln Financial Field", city: "Philadelphia", group: "C", stage: "group" },
  { id: "M51", date: "2026-06-24", time: "18:00", homeTeam: "Scotland", awayTeam: "Brazil", venue: "Hard Rock Stadium", city: "Miami Gardens", group: "C", stage: "group" },
  { id: "M52", date: "2026-06-24", time: "18:00", homeTeam: "Morocco", awayTeam: "Haiti", venue: "Mercedes-Benz Stadium", city: "Atlanta", group: "C", stage: "group" },

  // Group D - USA
  { id: "M4", date: "2026-06-12", time: "21:00", homeTeam: "USA", awayTeam: "Paraguay", venue: "SoFi Stadium", city: "Inglewood", group: "D", stage: "group" },
  { id: "M5", date: "2026-06-13", time: "00:00", homeTeam: "Australia", awayTeam: "UEFA Playoff C", venue: "BC Place", city: "Vancouver", group: "D", stage: "group" },
  { id: "M29", date: "2026-06-19", time: "00:00", homeTeam: "UEFA Playoff C", awayTeam: "Paraguay", venue: "Levi's Stadium", city: "Santa Clara", group: "D", stage: "group" },
  { id: "M30", date: "2026-06-19", time: "15:00", homeTeam: "USA", awayTeam: "Australia", venue: "Lumen Field", city: "Seattle", group: "D", stage: "group" },
  { id: "M59", date: "2026-06-25", time: "22:00", homeTeam: "UEFA Playoff C", awayTeam: "USA", venue: "SoFi Stadium", city: "Inglewood", group: "D", stage: "group" },
  { id: "M60", date: "2026-06-25", time: "22:00", homeTeam: "Paraguay", awayTeam: "Australia", venue: "Levi's Stadium", city: "Santa Clara", group: "D", stage: "group" },

  // Group E - Germany
  { id: "M9", date: "2026-06-14", time: "13:00", homeTeam: "Germany", awayTeam: "Curaçao", venue: "NRG Stadium", city: "Houston", group: "E", stage: "group" },
  { id: "M11", date: "2026-06-14", time: "19:00", homeTeam: "Ivory Coast", awayTeam: "Ecuador", venue: "Lincoln Financial Field", city: "Philadelphia", group: "E", stage: "group" },
  { id: "M35", date: "2026-06-20", time: "16:00", homeTeam: "Germany", awayTeam: "Ivory Coast", venue: "BMO Field", city: "Toronto", group: "E", stage: "group" },
  { id: "M36", date: "2026-06-20", time: "20:00", homeTeam: "Ecuador", awayTeam: "Curaçao", venue: "Arrowhead Stadium", city: "Kansas City", group: "E", stage: "group" },
  { id: "M55", date: "2026-06-25", time: "16:00", homeTeam: "Curaçao", awayTeam: "Ivory Coast", venue: "Lincoln Financial Field", city: "Philadelphia", group: "E", stage: "group" },
  { id: "M56", date: "2026-06-25", time: "16:00", homeTeam: "Ecuador", awayTeam: "Germany", venue: "MetLife Stadium", city: "East Rutherford", group: "E", stage: "group" },

  // Group F - Netherlands
  { id: "M10", date: "2026-06-14", time: "16:00", homeTeam: "Netherlands", awayTeam: "Japan", venue: "AT&T Stadium", city: "Arlington", group: "F", stage: "group" },
  { id: "M12", date: "2026-06-14", time: "22:00", homeTeam: "UEFA Playoff B", awayTeam: "Tunisia", venue: "Estadio BBVA", city: "Monterrey", group: "F", stage: "group" },
  { id: "M33", date: "2026-06-20", time: "00:00", homeTeam: "Tunisia", awayTeam: "Japan", venue: "Estadio BBVA", city: "Monterrey", group: "F", stage: "group" },
  { id: "M34", date: "2026-06-20", time: "13:00", homeTeam: "Netherlands", awayTeam: "UEFA Playoff B", venue: "NRG Stadium", city: "Houston", group: "F", stage: "group" },
  { id: "M57", date: "2026-06-25", time: "19:00", homeTeam: "Japan", awayTeam: "UEFA Playoff B", venue: "AT&T Stadium", city: "Arlington", group: "F", stage: "group" },
  { id: "M58", date: "2026-06-25", time: "19:00", homeTeam: "Tunisia", awayTeam: "Netherlands", venue: "Arrowhead Stadium", city: "Kansas City", group: "F", stage: "group" },

  // Group G - Belgium
  { id: "M14", date: "2026-06-15", time: "15:00", homeTeam: "Belgium", awayTeam: "Egypt", venue: "Lumen Field", city: "Seattle", group: "G", stage: "group" },
  { id: "M16", date: "2026-06-15", time: "21:00", homeTeam: "Iran", awayTeam: "New Zealand", venue: "SoFi Stadium", city: "Inglewood", group: "G", stage: "group" },
  { id: "M38", date: "2026-06-21", time: "15:00", homeTeam: "Belgium", awayTeam: "Iran", venue: "SoFi Stadium", city: "Inglewood", group: "G", stage: "group" },
  { id: "M40", date: "2026-06-21", time: "21:00", homeTeam: "New Zealand", awayTeam: "Egypt", venue: "BC Place", city: "Vancouver", group: "G", stage: "group" },
  { id: "M65", date: "2026-06-26", time: "23:00", homeTeam: "Egypt", awayTeam: "Iran", venue: "Lumen Field", city: "Seattle", group: "G", stage: "group" },
  { id: "M66", date: "2026-06-26", time: "23:00", homeTeam: "New Zealand", awayTeam: "Belgium", venue: "BC Place", city: "Vancouver", group: "G", stage: "group" },

  // Group H - Spain
  { id: "M13", date: "2026-06-15", time: "12:00", homeTeam: "Spain", awayTeam: "Cape Verde", venue: "Mercedes-Benz Stadium", city: "Atlanta", group: "H", stage: "group" },
  { id: "M15", date: "2026-06-15", time: "18:00", homeTeam: "Saudi Arabia", awayTeam: "Uruguay", venue: "Hard Rock Stadium", city: "Miami Gardens", group: "H", stage: "group" },
  { id: "M37", date: "2026-06-21", time: "12:00", homeTeam: "Spain", awayTeam: "Saudi Arabia", venue: "Mercedes-Benz Stadium", city: "Atlanta", group: "H", stage: "group" },
  { id: "M39", date: "2026-06-21", time: "18:00", homeTeam: "Uruguay", awayTeam: "Cape Verde", venue: "Hard Rock Stadium", city: "Miami Gardens", group: "H", stage: "group" },
  { id: "M63", date: "2026-06-26", time: "20:00", homeTeam: "Cape Verde", awayTeam: "Saudi Arabia", venue: "NRG Stadium", city: "Houston", group: "H", stage: "group" },
  { id: "M64", date: "2026-06-26", time: "20:00", homeTeam: "Uruguay", awayTeam: "Spain", venue: "Estadio Akron", city: "Zapopan", group: "H", stage: "group" },

  // Group I - France
  { id: "M17", date: "2026-06-16", time: "15:00", homeTeam: "France", awayTeam: "Senegal", venue: "MetLife Stadium", city: "East Rutherford", group: "I", stage: "group" },
  { id: "M18", date: "2026-06-16", time: "18:00", homeTeam: "IC Playoff 2", awayTeam: "Norway", venue: "Gillette Stadium", city: "Foxborough", group: "I", stage: "group" },
  { id: "M42", date: "2026-06-22", time: "17:00", homeTeam: "France", awayTeam: "IC Playoff 2", venue: "Lincoln Financial Field", city: "Philadelphia", group: "I", stage: "group" },
  { id: "M43", date: "2026-06-22", time: "20:00", homeTeam: "Norway", awayTeam: "Senegal", venue: "MetLife Stadium", city: "East Rutherford", group: "I", stage: "group" },
  { id: "M61", date: "2026-06-26", time: "15:00", homeTeam: "Norway", awayTeam: "France", venue: "Gillette Stadium", city: "Foxborough", group: "I", stage: "group" },
  { id: "M62", date: "2026-06-26", time: "15:00", homeTeam: "Senegal", awayTeam: "IC Playoff 2", venue: "BMO Field", city: "Toronto", group: "I", stage: "group" },

  // Group J - Argentina
  { id: "M19", date: "2026-06-16", time: "21:00", homeTeam: "Argentina", awayTeam: "Algeria", venue: "Arrowhead Stadium", city: "Kansas City", group: "J", stage: "group" },
  { id: "M20", date: "2026-06-17", time: "00:00", homeTeam: "Austria", awayTeam: "Jordan", venue: "Levi's Stadium", city: "Santa Clara", group: "J", stage: "group" },
  { id: "M41", date: "2026-06-22", time: "13:00", homeTeam: "Argentina", awayTeam: "Austria", venue: "AT&T Stadium", city: "Arlington", group: "J", stage: "group" },
  { id: "M44", date: "2026-06-22", time: "23:00", homeTeam: "Jordan", awayTeam: "Algeria", venue: "Levi's Stadium", city: "Santa Clara", group: "J", stage: "group" },
  { id: "M71", date: "2026-06-27", time: "22:00", homeTeam: "Algeria", awayTeam: "Austria", venue: "Arrowhead Stadium", city: "Kansas City", group: "J", stage: "group" },
  { id: "M72", date: "2026-06-27", time: "22:00", homeTeam: "Jordan", awayTeam: "Argentina", venue: "AT&T Stadium", city: "Arlington", group: "J", stage: "group" },

  // Group K - Portugal
  { id: "M21", date: "2026-06-17", time: "13:00", homeTeam: "Portugal", awayTeam: "IC Playoff 1", venue: "NRG Stadium", city: "Houston", group: "K", stage: "group" },
  { id: "M24", date: "2026-06-17", time: "22:00", homeTeam: "Uzbekistan", awayTeam: "Colombia", venue: "Estadio Azteca", city: "Mexico City", group: "K", stage: "group" },
  { id: "M45", date: "2026-06-23", time: "13:00", homeTeam: "Portugal", awayTeam: "Uzbekistan", venue: "NRG Stadium", city: "Houston", group: "K", stage: "group" },
  { id: "M48", date: "2026-06-23", time: "22:00", homeTeam: "Colombia", awayTeam: "IC Playoff 1", venue: "Estadio Akron", city: "Zapopan", group: "K", stage: "group" },
  { id: "M69", date: "2026-06-27", time: "19:30", homeTeam: "Colombia", awayTeam: "Portugal", venue: "Hard Rock Stadium", city: "Miami Gardens", group: "K", stage: "group" },
  { id: "M70", date: "2026-06-27", time: "19:30", homeTeam: "IC Playoff 1", awayTeam: "Uzbekistan", venue: "Mercedes-Benz Stadium", city: "Atlanta", group: "K", stage: "group" },

  // Group L - England
  { id: "M22", date: "2026-06-17", time: "16:00", homeTeam: "England", awayTeam: "Croatia", venue: "AT&T Stadium", city: "Arlington", group: "L", stage: "group" },
  { id: "M23", date: "2026-06-17", time: "19:00", homeTeam: "Ghana", awayTeam: "Panama", venue: "BMO Field", city: "Toronto", group: "L", stage: "group" },
  { id: "M46", date: "2026-06-23", time: "16:00", homeTeam: "England", awayTeam: "Ghana", venue: "Gillette Stadium", city: "Foxborough", group: "L", stage: "group" },
  { id: "M47", date: "2026-06-23", time: "19:00", homeTeam: "Panama", awayTeam: "Croatia", venue: "BMO Field", city: "Toronto", group: "L", stage: "group" },
  { id: "M67", date: "2026-06-27", time: "17:00", homeTeam: "Panama", awayTeam: "England", venue: "MetLife Stadium", city: "East Rutherford", group: "L", stage: "group" },
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
  { id: "3RD", date: "2026-07-18", time: "16:00", homeTeam: "L SF-1", awayTeam: "L SF-2", venue: "Hard Rock Stadium", city: "Miami Gardens", group: "", stage: "third-place" },

  // Final (July 19)
  { id: "FINAL", date: "2026-07-19", time: "16:00", homeTeam: "W SF-1", awayTeam: "W SF-2", venue: "MetLife Stadium", city: "East Rutherford", group: "", stage: "final" },
];

export const groups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

// 附加赛球队占位符说明
export const playoffTeams: Record<string, { candidates: string[]; region: string }> = {
  "UEFA Playoff A": { candidates: ["Italy", "Northern Ireland", "Wales", "Bosnia and Herzegovina"], region: "Europe" },
  "UEFA Playoff B": { candidates: ["Ukraine", "Sweden", "Poland", "Albania"], region: "Europe" },
  "UEFA Playoff C": { candidates: ["Türkiye", "Romania", "Slovakia", "Kosovo"], region: "Europe" },
  "UEFA Playoff D": { candidates: ["Denmark", "North Macedonia", "Czechia", "Ireland"], region: "Europe" },
  "IC Playoff 1": { candidates: ["DR Congo", "Jamaica", "New Caledonia"], region: "Intercontinental" },
  "IC Playoff 2": { candidates: ["Iraq", "Bolivia", "Suriname"], region: "Intercontinental" },
};

export const groupTeams: Record<string, string[]> = {
  A: ["Mexico", "South Africa", "South Korea", "UEFA Playoff D"],
  B: ["Canada", "UEFA Playoff A", "Qatar", "Switzerland"],
  C: ["Brazil", "Morocco", "Haiti", "Scotland"],
  D: ["USA", "Paraguay", "Australia", "UEFA Playoff C"],
  E: ["Germany", "Curaçao", "Ivory Coast", "Ecuador"],
  F: ["Netherlands", "Japan", "UEFA Playoff B", "Tunisia"],
  G: ["Belgium", "Egypt", "Iran", "New Zealand"],
  H: ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"],
  I: ["France", "Senegal", "IC Playoff 2", "Norway"],
  J: ["Argentina", "Algeria", "Austria", "Jordan"],
  K: ["Portugal", "IC Playoff 1", "Uzbekistan", "Colombia"],
  L: ["England", "Croatia", "Ghana", "Panama"],
};

export const teamCountryCodes: Record<string, string> = {
  // Group A
  "Mexico": "MX",
  "South Africa": "ZA",
  "South Korea": "KR",
  "UEFA Playoff D": "EU",
  "Denmark": "DK",
  "North Macedonia": "MK",
  "Czechia": "CZ",
  "Ireland": "IE",
  
  // Group B
  "Canada": "CA",
  "UEFA Playoff A": "EU",
  "Italy": "IT",
  "Northern Ireland": "GB-NIR",
  "Wales": "GB-WLS",
  "Bosnia and Herzegovina": "BA",
  "Qatar": "QA",
  "Switzerland": "CH",
  
  // Group C
  "Brazil": "BR",
  "Morocco": "MA",
  "Haiti": "HT",
  "Scotland": "GB-SCT",
  
  // Group D
  "USA": "US",
  "Paraguay": "PY",
  "Australia": "AU",
  "UEFA Playoff C": "EU",
  "Türkiye": "TR",
  "Turkey": "TR",
  "Romania": "RO",
  "Slovakia": "SK",
  "Kosovo": "XK",
  
  // Group E
  "Germany": "DE",
  "Curaçao": "CW",
  "Ivory Coast": "CI",
  "Ecuador": "EC",
  
  // Group F
  "Netherlands": "NL",
  "Japan": "JP",
  "UEFA Playoff B": "EU",
  "Ukraine": "UA",
  "Sweden": "SE",
  "Poland": "PL",
  "Albania": "AL",
  "Tunisia": "TN",
  
  // Group G
  "Belgium": "BE",
  "Egypt": "EG",
  "Iran": "IR",
  "New Zealand": "NZ",
  
  // Group H
  "Spain": "ES",
  "Cape Verde": "CV",
  "Saudi Arabia": "SA",
  "Uruguay": "UY",
  
  // Group I
  "France": "FR",
  "Senegal": "SN",
  "IC Playoff 2": "UN",
  "Iraq": "IQ",
  "Bolivia": "BO",
  "Suriname": "SR",
  "Norway": "NO",
  
  // Group J
  "Argentina": "AR",
  "Algeria": "DZ",
  "Austria": "AT",
  "Jordan": "JO",
  
  // Group K
  "Portugal": "PT",
  "IC Playoff 1": "UN",
  "DR Congo": "CD",
  "Jamaica": "JM",
  "New Caledonia": "NC",
  "Uzbekistan": "UZ",
  "Colombia": "CO",
  
  // Group L
  "England": "GB-ENG",
  "Croatia": "HR",
  "Ghana": "GH",
  "Panama": "PA",
};

// 场馆信息
export const venues: Record<string, { city: string; country: string; capacity: number }> = {
  "Estadio Azteca": { city: "Mexico City", country: "Mexico", capacity: 83000 },
  "Estadio Akron": { city: "Zapopan", country: "Mexico", capacity: 48000 },
  "Estadio BBVA": { city: "Monterrey", country: "Mexico", capacity: 53500 },
  "BMO Field": { city: "Toronto", country: "Canada", capacity: 45736 },
  "BC Place": { city: "Vancouver", country: "Canada", capacity: 54000 },
  "MetLife Stadium": { city: "East Rutherford", country: "USA", capacity: 82500 },
  "SoFi Stadium": { city: "Inglewood", country: "USA", capacity: 70000 },
  "AT&T Stadium": { city: "Arlington", country: "USA", capacity: 94000 },
  "Hard Rock Stadium": { city: "Miami Gardens", country: "USA", capacity: 65000 },
  "Mercedes-Benz Stadium": { city: "Atlanta", country: "USA", capacity: 75000 },
  "NRG Stadium": { city: "Houston", country: "USA", capacity: 72000 },
  "Gillette Stadium": { city: "Foxborough", country: "USA", capacity: 65878 },
  "Lincoln Financial Field": { city: "Philadelphia", country: "USA", capacity: 69000 },
  "Lumen Field": { city: "Seattle", country: "USA", capacity: 69000 },
  "Levi's Stadium": { city: "Santa Clara", country: "USA", capacity: 71000 },
  "Arrowhead Stadium": { city: "Kansas City", country: "USA", capacity: 73000 },
};
