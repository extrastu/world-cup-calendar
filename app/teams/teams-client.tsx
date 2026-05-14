"use client";

import { useState, useMemo } from "react";
import { groupTeams, teamCountryCodes, playoffTeams } from "@/lib/matches-data";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Users,
  Globe,
  HelpCircle,
} from "lucide-react";

function getFlagUrl(team: string, size: number = 80): string {
  const code = teamCountryCodes[team];
  if (!code) return "";
  if (code === "GB-SCT") return `https://flagcdn.com/w${size}/gb-sct.png`;
  if (code === "GB-ENG") return `https://flagcdn.com/w${size}/gb-eng.png`;
  if (code === "GB-WLS") return `https://flagcdn.com/w${size}/gb-wls.png`;
  if (code === "GB-NIR") return `https://flagcdn.com/w${size}/gb-nir.png`;
  if (code === "EU") return "https://flagcdn.com/w160/eu.png";
  if (code === "UN") return "https://flagcdn.com/w160/un.png";
  return `https://flagcdn.com/w${size}/${code.toLowerCase()}.png`;
}

// Continent mapping for teams
const continentMapping: Record<string, string> = {
  // Europe
  "Belgium": "欧洲", "Croatia": "欧洲", "England": "欧洲", "France": "欧洲",
  "Germany": "欧洲", "Netherlands": "欧洲", "Portugal": "欧洲", "Scotland": "欧洲",
  "Spain": "欧洲", "Switzerland": "欧洲", "Austria": "欧洲", "Norway": "欧洲",
  // South America
  "Argentina": "南美", "Brazil": "南美", "Colombia": "南美", "Ecuador": "南美",
  "Paraguay": "南美", "Uruguay": "南美",
  // North/Central America & Caribbean
  "Canada": "北美", "Mexico": "北美", "USA": "北美", "Panama": "北美",
  "Haiti": "北美", "Curaçao": "北美",
  // Africa
  "Algeria": "非洲", "Cape Verde": "非洲", "Egypt": "非洲", "Ghana": "非洲",
  "Ivory Coast": "非洲", "Morocco": "非洲", "Senegal": "非洲", "South Africa": "非洲",
  "Tunisia": "非洲",
  // Asia
  "Australia": "亚洲/大洋洲", "Iran": "亚洲/大洋洲", "Japan": "亚洲/大洋洲", "Jordan": "亚洲/大洋洲",
  "Qatar": "亚洲/大洋洲", "Saudi Arabia": "亚洲/大洋洲", "South Korea": "亚洲/大洋洲",
  "Uzbekistan": "亚洲/大洋洲", "New Zealand": "亚洲/大洋洲",
};

const continents = ["全部", "欧洲", "南美", "北美", "非洲", "亚洲/大洋洲", "待定"];

export function TeamsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("全部");
  const [showPlayoffs, setShowPlayoffs] = useState(false);

  // Get all confirmed teams
  const allTeams = useMemo(() => {
    const teams: { name: string; group: string; continent: string }[] = [];
    Object.entries(groupTeams).forEach(([group, teamList]) => {
      teamList.forEach((team) => {
        if (!team.includes("Playoff")) {
          teams.push({
            name: team,
            group,
            continent: continentMapping[team] || "待定",
          });
        }
      });
    });
    return teams.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Filter teams
  const filteredTeams = useMemo(() => {
    let result = allTeams;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((t) => t.name.toLowerCase().includes(query));
    }

    if (selectedContinent !== "全部") {
      result = result.filter((t) => t.continent === selectedContinent);
    }

    return result;
  }, [allTeams, searchQuery, selectedContinent]);

  // Count by continent
  const continentCounts = useMemo(() => {
    const counts: Record<string, number> = { "全部": allTeams.length };
    allTeams.forEach((t) => {
      counts[t.continent] = (counts[t.continent] || 0) + 1;
    });
    return counts;
  }, [allTeams]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="w-10 h-10 rounded-xl bg-card/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-foreground">参赛球队</h1>
                <p className="text-sm text-muted-foreground">
                  共 48 支球队参赛
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/50 border border-border/50">
              <Users className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">
                已确定 {allTeams.length} 支
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="border-b border-border/50 bg-card/20">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜索球队..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-card/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 transition-all"
              />
            </div>

            {/* Continent Tabs */}
            <div className="flex gap-1 overflow-x-auto">
              {continents.map((continent) => (
                <button
                  key={continent}
                  onClick={() => setSelectedContinent(continent)}
                  className={`px-3 py-1.5 text-sm rounded-lg whitespace-nowrap transition-colors ${
                    selectedContinent === continent
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  {continent}
                  {continentCounts[continent] && (
                    <span className="ml-1 text-xs opacity-70">
                      ({continentCounts[continent]})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <main className="container mx-auto px-4 md:px-6 py-6">
        {/* Confirmed Teams */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-accent" />
            <h2 className="text-lg font-semibold text-foreground">
              已确定球队
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredTeams.length} 支
            </span>
          </div>

          {filteredTeams.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">没有找到匹配的球队</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredTeams.map((team) => (
                <Link key={team.name} href={`/?group=${team.group}`}>
                  <div className="rounded-xl bg-card/30 border border-border/50 p-4 hover:border-accent/30 transition-all cursor-pointer group">
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src={getFlagUrl(team.name)}
                        alt={team.name}
                        className="w-14 h-10 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform"
                        crossOrigin="anonymous"
                      />
                      <span className="text-sm font-medium text-foreground text-center leading-tight">
                        {team.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-accent">{team.group}组</span>
                        <span className="text-xs text-muted-foreground">
                          {team.continent}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Playoff Teams */}
        <section>
          <button
            onClick={() => setShowPlayoffs(!showPlayoffs)}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-1 h-6 rounded-full bg-amber-500" />
            <h2 className="text-lg font-semibold text-foreground">
              附加赛球队
            </h2>
            <span className="text-sm text-amber-500">6 席待定</span>
            <span className="text-xs text-muted-foreground">
              {showPlayoffs ? "收起" : "展开"}
            </span>
          </button>

          {showPlayoffs && (
            <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 mb-4">
              <p className="text-sm text-amber-400 mb-4">
                以下6支参赛球队将于2026年3月通过附加赛确定
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(playoffTeams).map(([key, { candidates, region }]) => (
                  <div
                    key={key}
                    className="rounded-lg bg-card/30 border border-border/50 p-4"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <HelpCircle className="w-4 h-4 text-amber-500" />
                      <span className="font-medium text-foreground text-sm">
                        {key}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({region})
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {candidates.map((team) => (
                        <div
                          key={team}
                          className="flex items-center gap-2 px-2 py-1 rounded bg-muted/30"
                        >
                          <img
                            src={getFlagUrl(team, 40)}
                            alt={team}
                            className="w-5 h-3.5 object-cover rounded"
                            crossOrigin="anonymous"
                          />
                          <span className="text-xs text-muted-foreground">
                            {team}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
