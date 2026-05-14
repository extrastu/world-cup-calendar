"use client";

import { useState } from "react";
import { matches, groups, groupTeams, teamCountryCodes, playoffTeams } from "@/lib/matches-data";
import { teamSquads, positionLabels, positionColors } from "@/lib/teams-data";
import { convertToBeijingTime } from "@/lib/timezone";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  MapPin,
  Trophy,
  Calendar,
  BarChart3,
  Globe,
  Building2,
  Flag,
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
} from "lucide-react";

// 获取所有场馆信息
const venues = Array.from(
  new Map(
    matches
      .filter((m) => m.venue !== "TBD")
      .map((m) => [m.venue, { venue: m.venue, city: m.city }])
  ).values()
);

// 获取各国家的比赛场数
const getCountryMatchCount = () => {
  const usaCities = ["East Rutherford", "Miami Gardens", "Atlanta", "Houston", "Arlington", "Inglewood", "Santa Clara", "Seattle", "Foxborough", "Philadelphia", "Kansas City"];
  const canadaCities = ["Toronto", "Vancouver"];
  const mexicoCities = ["Mexico City", "Zapopan", "Guadalupe"];
  
  let usa = 0, canada = 0, mexico = 0;
  matches.forEach((m) => {
    if (usaCities.includes(m.city)) usa++;
    else if (canadaCities.includes(m.city)) canada++;
    else if (mexicoCities.includes(m.city)) mexico++;
  });
  return { usa, canada, mexico };
};

// 统计信息
const stats = {
  totalTeams: 48,
  totalGroups: 12,
  totalMatches: matches.length,
  groupMatches: matches.filter((m) => m.stage === "group").length,
  knockoutMatches: matches.filter((m) => m.stage !== "group").length,
  venues: venues.length,
  hostCountries: 3,
  ...getCountryMatchCount(),
};

// 获取国旗URL
function getFlagUrl(team: string, size: number = 80): string {
  const code = teamCountryCodes[team];
  if (!code) return "";
  const flagCode = code.toLowerCase().replace("gb-", "");
  return `https://flagcdn.com/w${size}/${flagCode}.png`;
}

type TabType = "overview" | "teams" | "venues" | "groups" | "squads" | "playoffs";

export function DataOverviewClient() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "数据概览", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "teams", label: "48支球队", icon: <Flag className="w-4 h-4" /> },
    { id: "groups", label: "小组分布", icon: <Users className="w-4 h-4" /> },
    { id: "playoffs", label: "附加赛", icon: <HelpCircle className="w-4 h-4" /> },
    { id: "venues", label: "比赛场馆", icon: <Building2 className="w-4 h-4" /> },
    { id: "squads", label: "球队阵容", icon: <Trophy className="w-4 h-4" /> },
  ];

  // 获取所有球队列表
  const allTeams = Object.values(groupTeams).flat().sort();
  
  // 过滤搜索结果
  const filteredTeams = allTeams.filter((team) =>
    team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-foreground">完整数据披露</h1>
                <p className="text-sm text-muted-foreground">2026 FIFA 世界杯</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">美国 · 加拿大 · 墨西哥</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                {tab.icon}
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Key Stats */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">核心数据</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={<Flag className="w-6 h-6" />} value={stats.totalTeams} label="参赛球队" color="primary" />
                <StatCard icon={<Users className="w-6 h-6" />} value={stats.totalGroups} label="小组数量" color="accent" />
                <StatCard icon={<Calendar className="w-6 h-6" />} value={stats.totalMatches} label="总比赛场次" color="primary" />
                <StatCard icon={<Building2 className="w-6 h-6" />} value={stats.venues} label="比赛场馆" color="accent" />
              </div>
            </section>

            {/* Match Breakdown */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">比赛分布</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-medium text-foreground mb-4">按阶段分布</h3>
                  <div className="space-y-3">
                    <ProgressBar label="小组赛" value={stats.groupMatches} total={stats.totalMatches} />
                    <ProgressBar label="32强赛" value={16} total={stats.totalMatches} />
                    <ProgressBar label="16强赛" value={8} total={stats.totalMatches} />
                    <ProgressBar label="四分之一决赛" value={4} total={stats.totalMatches} />
                    <ProgressBar label="半决赛" value={2} total={stats.totalMatches} />
                    <ProgressBar label="三四名决赛" value={1} total={stats.totalMatches} />
                    <ProgressBar label="决赛" value={1} total={stats.totalMatches} />
                  </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-medium text-foreground mb-4">按主办国分布</h3>
                  <div className="space-y-3">
                    <ProgressBar label="美国" value={stats.usa} total={stats.totalMatches} flag="us" />
                    <ProgressBar label="墨西哥" value={stats.mexico} total={stats.totalMatches} flag="mx" />
                    <ProgressBar label="加拿大" value={stats.canada} total={stats.totalMatches} flag="ca" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">* 部分淘汰赛场馆待定</p>
                </div>
              </div>
            </section>

            {/* Timeline */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">赛事时间线</h2>
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                  <div className="space-y-6">
                    <TimelineItem date="2026年6月11日" title="开幕式 & 揭幕战" desc="墨西哥 vs 南非 - 阿兹特克球场" />
                    <TimelineItem date="2026年6月11日 - 6月27日" title="小组赛阶段" desc="72场比赛，12个小组" />
                    <TimelineItem date="2026年6月28日 - 7月1日" title="32强淘汰赛" desc="16场比赛" />
                    <TimelineItem date="2026年7月4日 - 7月7日" title="16强淘汰赛" desc="8场比赛" />
                    <TimelineItem date="2026年7月11日 - 7月12日" title="四分之一决赛" desc="4场比赛" />
                    <TimelineItem date="2026年7月15日 - 7月16日" title="半决赛" desc="2场比赛" />
                    <TimelineItem date="2026年7月18日" title="三四名决赛" desc="争夺季军" />
                    <TimelineItem date="2026年7月19日" title="决赛" desc="大都会人寿球场，东卢瑟福" highlight />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Teams Tab */}
        {activeTab === "teams" && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="搜索球队..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <span className="text-sm text-muted-foreground">
                共 {filteredTeams.length} 支球队
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredTeams.map((team) => {
                const group = Object.entries(groupTeams).find(([, teams]) =>
                  teams.includes(team)
                )?.[0];
                return (
                  <Link key={team} href={`/?group=${group}`}>
                    <div className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={getFlagUrl(team)}
                          alt={team}
                          className="w-12 h-8 object-cover rounded shadow-sm"
                        />
                        <span className="text-sm font-medium text-foreground text-center leading-tight">
                          {team}
                        </span>
                        <span className="text-xs text-muted-foreground">小组 {group}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Groups Tab */}
        {activeTab === "groups" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <div key={group} className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="bg-primary/10 px-4 py-3 border-b border-border">
                  <h3 className="font-semibold text-foreground">小组 {group}</h3>
                </div>
                <div className="p-4 space-y-3">
                  {groupTeams[group].map((team, idx) => {
                    const isPlayoff = team.includes("Playoff");
                    return (
                      <div key={team} className="flex items-center gap-3">
                        <span className="w-6 h-6 flex items-center justify-center bg-secondary rounded-full text-xs font-medium text-muted-foreground">
                          {idx + 1}
                        </span>
                        {isPlayoff ? (
                          <div className="w-8 h-5 bg-muted rounded shadow-sm flex items-center justify-center">
                            <HelpCircle className="w-4 h-4 text-muted-foreground" />
                          </div>
                        ) : (
                          <img
                            src={getFlagUrl(team, 40)}
                            alt={team}
                            className="w-8 h-5 object-cover rounded shadow-sm"
                          />
                        )}
                        <span className={`text-sm font-medium ${isPlayoff ? "text-muted-foreground" : "text-foreground"}`}>
                          {team}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="px-4 py-3 bg-secondary/50 border-t border-border">
                  <Link href={`/?group=${group}`}>
                    <Button variant="ghost" size="sm" className="w-full">
                      查看小组赛程
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Playoffs Tab */}
        {activeTab === "playoffs" && (
          <div className="space-y-6">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
              <p className="text-sm text-amber-700 dark:text-amber-400">
                以下6支参赛球队将于2026年3月通过附加赛确定。当前显示为候选球队。
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* UEFA Playoffs */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  欧洲区附加赛 (UEFA)
                </h3>
                {Object.entries(playoffTeams)
                  .filter(([key]) => key.startsWith("UEFA"))
                  .map(([key, { candidates }]) => (
                    <div key={key} className="bg-card border border-border rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-5 bg-blue-500/20 rounded flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">EU</span>
                        </div>
                        <span className="font-medium text-foreground">{key}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {candidates.map((team) => (
                          <div key={team} className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                            <img
                              src={getFlagUrl(team, 40)}
                              alt={team}
                              className="w-6 h-4 object-cover rounded"
                            />
                            <span className="text-sm text-foreground">{team}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        分配小组: {Object.entries(groupTeams).find(([, teams]) => teams.includes(key))?.[0] || "TBD"}
                      </p>
                    </div>
                  ))}
              </div>

              {/* Intercontinental Playoffs */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Globe className="w-5 h-5 text-accent" />
                  洲际附加赛 (Intercontinental)
                </h3>
                {Object.entries(playoffTeams)
                  .filter(([key]) => key.startsWith("IC"))
                  .map(([key, { candidates }]) => (
                    <div key={key} className="bg-card border border-border rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-5 bg-emerald-500/20 rounded flex items-center justify-center">
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">IC</span>
                        </div>
                        <span className="font-medium text-foreground">{key}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {candidates.map((team) => (
                          <div key={team} className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                            <img
                              src={getFlagUrl(team, 40)}
                              alt={team}
                              className="w-6 h-4 object-cover rounded"
                            />
                            <span className="text-sm text-foreground">{team}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        分配小组: {Object.entries(groupTeams).find(([, teams]) => teams.includes(key))?.[0] || "TBD"}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Venues Tab */}
        {activeTab === "venues" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {venues.map(({ venue, city }) => {
                const matchCount = matches.filter((m) => m.venue === venue).length;
                const country =
                  ["Mexico City", "Zapopan", "Guadalupe"].includes(city)
                    ? "墨西哥"
                    : ["Toronto", "Vancouver"].includes(city)
                    ? "加拿大"
                    : "美国";
                const countryFlag =
                  country === "墨西哥" ? "mx" : country === "加拿大" ? "ca" : "us";

                return (
                  <div
                    key={venue}
                    className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground leading-tight">{venue}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{city}</span>
                        </div>
                      </div>
                      <img
                        src={`https://flagcdn.com/w40/${countryFlag}.png`}
                        alt={country}
                        className="w-6 h-4 object-cover rounded shadow-sm"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground">{country}</span>
                      <span className="text-sm font-medium text-primary">{matchCount} 场比赛</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Squads Tab */}
        {activeTab === "squads" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              点击展开查看各队阵容（目前已收录 {Object.keys(teamSquads).length} 支球队的阵容信息）
            </p>
            <div className="space-y-3">
              {Object.entries(teamSquads).map(([team, squad]) => (
                <div key={team} className="bg-card border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedTeam(expandedTeam === team ? null : team)}
                    className="w-full px-4 py-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={getFlagUrl(team, 60)}
                        alt={team}
                        className="w-10 h-6 object-cover rounded shadow-sm"
                      />
                      <div className="text-left">
                        <h3 className="font-medium text-foreground">{team}</h3>
                        <p className="text-xs text-muted-foreground">
                          主教练: {squad.coach} | 阵型: {squad.formation}
                        </p>
                      </div>
                    </div>
                    {expandedTeam === team ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>

                  {expandedTeam === team && (
                    <div className="border-t border-border p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {(["GK", "DF", "MF", "FW"] as const).map((pos) => {
                          const players = squad.players.filter((p) => p.position === pos);
                          return (
                            <div key={pos}>
                              <h4
                                className={`text-xs font-medium px-2 py-1 rounded mb-2 ${positionColors[pos]}`}
                              >
                                {positionLabels[pos]} ({players.length})
                              </h4>
                              <div className="space-y-2">
                                {players.map((player) => (
                                  <div
                                    key={player.number}
                                    className="text-sm flex items-center gap-2"
                                  >
                                    <span className="w-6 h-6 flex items-center justify-center bg-secondary rounded text-xs font-medium text-muted-foreground">
                                      {player.number}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                      <span className="text-foreground truncate block">
                                        {player.name}
                                        {player.isCaptain && (
                                          <span className="ml-1 text-primary">(C)</span>
                                        )}
                                      </span>
                                      <span className="text-xs text-muted-foreground truncate block">
                                        {player.club}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>数据来源: FIFA 官方 | 所有时间均为北京时间 (UTC+8)</p>
          <p className="mt-1">共 48 支球队 · 104 场比赛 · 16 座城市</p>
        </div>
      </footer>
    </div>
  );
}

// Stat Card Component
function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: "primary" | "accent";
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
        color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
      }`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

// Progress Bar Component
function ProgressBar({
  label,
  value,
  total,
  flag,
}: {
  label: string;
  value: number;
  total: number;
  flag?: string;
}) {
  const percentage = (value / total) * 100;
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1">
        <div className="flex items-center gap-2">
          {flag && (
            <img
              src={`https://flagcdn.com/w20/${flag}.png`}
              alt={label}
              className="w-5 h-3 object-cover rounded"
            />
          )}
          <span className="text-foreground">{label}</span>
        </div>
        <span className="text-muted-foreground">{value} 场</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Timeline Item Component
function TimelineItem({
  date,
  title,
  desc,
  highlight,
}: {
  date: string;
  title: string;
  desc: string;
  highlight?: boolean;
}) {
  return (
    <div className="relative pl-10">
      <div
        className={`absolute left-2 top-1 w-4 h-4 rounded-full border-2 ${
          highlight
            ? "bg-primary border-primary"
            : "bg-background border-border"
        }`}
      />
      <div className="text-xs text-muted-foreground mb-1">{date}</div>
      <div className={`font-medium ${highlight ? "text-primary" : "text-foreground"}`}>
        {title}
      </div>
      <div className="text-sm text-muted-foreground">{desc}</div>
    </div>
  );
}
