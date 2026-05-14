"use client";

import { useState, useMemo } from "react";
import { groupTeams, teamCountryCodes, playoffTeams } from "@/lib/matches-data";
import Link from "next/link";
import {
  Home,
  Calendar,
  Search,
  Users,
  Trophy,
  CalendarPlus,
  Info,
  HelpCircle,
  ChevronDown,
  ChevronUp,
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
  const [activeNav, setActiveNav] = useState("teams");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("全部");
  const [showPlayoffs, setShowPlayoffs] = useState(false);

  const navItems = [
    { id: "home", icon: Home, label: "首页", href: "/" },
    { id: "matches", icon: Calendar, label: "赛程", href: "/matches" },
    { id: "teams", icon: Users, label: "球队", href: "/teams" },
    { id: "groups", icon: Trophy, label: "小组", href: "/groups" },
    { id: "help", icon: HelpCircle, label: "帮助", href: "/help" },
    { id: "about", icon: Info, label: "关于", href: "/about" },
  ];

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
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 border-r border-border/40 bg-sidebar sticky top-0 h-screen overflow-y-auto">
        {/* Logo */}
        <div className="p-5 border-b border-border/40">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
              <Trophy className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground tracking-tight">CupCalendar</h1>
              <p className="text-[11px] text-muted-foreground">FIFA World Cup 2026</p>
            </div>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-3">
          <div className="space-y-0.5">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeNav === item.id
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                <item.icon className="w-[18px] h-[18px]" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Subscribe CTA */}
        <div className="p-3 mx-3 mb-3 rounded-xl bg-muted/30 border border-border/40">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 mb-3">
            <CalendarPlus className="w-5 h-5 text-accent" />
          </div>
          <h3 className="font-medium text-foreground text-sm mb-1">
            不错过任何比赛
          </h3>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            订阅日历，开赛前收到提醒
          </p>
          <Link
            href="/subscribe"
            className="block w-full text-center px-3 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
          >
            立即订阅
          </Link>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border/40">
          <p className="text-[11px] text-muted-foreground">
            &copy; 2026 CupCalendar
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40">
          <div className="px-6 md:px-10 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-foreground tracking-tight">参��球队</h1>
                <p className="text-sm text-muted-foreground">
                  共 48 支球队参赛
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border/40">
                <Users className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">
                  已确定 {allTeams.length} 支
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="border-b border-border/40 bg-card/20">
          <div className="px-6 md:px-10 py-4">
            <div className="flex flex-wrap gap-3 items-center">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="搜索球队..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 transition-all"
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
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
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
        <main className="px-6 md:px-10 py-6">
          {/* Confirmed Teams */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-5 rounded-full bg-accent" />
              <h2 className="text-lg font-semibold text-foreground tracking-tight">
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {filteredTeams.map((team) => (
                  <Link key={team.name} href={`/groups?group=${team.group}`}>
                    <div className="rounded-xl bg-card border border-border/40 p-4 hover:border-accent/40 transition-all cursor-pointer group">
                      <div className="flex flex-col items-center gap-3">
                        <img
                          src={getFlagUrl(team.name)}
                          alt={team.name}
                          className="w-14 h-10 object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform"
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
              <div className="w-1 h-5 rounded-full bg-amber-500" />
              <h2 className="text-lg font-semibold text-foreground tracking-tight">
                附加赛球队
              </h2>
              <span className="text-sm text-amber-500">6 席待定</span>
              {showPlayoffs ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
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
                      className="rounded-lg bg-card border border-border/40 p-4"
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
    </div>
  );
}
