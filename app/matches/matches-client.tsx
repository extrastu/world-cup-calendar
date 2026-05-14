"use client";

import { useState, useMemo } from "react";
import { matches, groups, Match, teamCountryCodes } from "@/lib/matches-data";
import { convertToTimezone, timezoneOptions, TimezoneOption } from "@/lib/timezone";
import Link from "next/link";
import {
  Home,
  Calendar,
  Search,
  Eye,
  MapPin,
  Trophy,
  Users,
  CalendarPlus,
  Info,
  HelpCircle,
  Globe,
  ChevronRight,
} from "lucide-react";

function getFlagUrl(team: string): string {
  const code = teamCountryCodes[team];
  if (!code) return "";
  if (code === "GB-SCT") return "https://flagcdn.com/w80/gb-sct.png";
  if (code === "GB-ENG") return "https://flagcdn.com/w80/gb-eng.png";
  if (code === "GB-WLS") return "https://flagcdn.com/w80/gb-wls.png";
  if (code === "GB-NIR") return "https://flagcdn.com/w80/gb-nir.png";
  if (code === "EU") return "https://flagcdn.com/w160/eu.png";
  if (code === "UN") return "https://flagcdn.com/w160/un.png";
  return `https://flagcdn.com/w80/${code.toLowerCase()}.png`;
}

function getStageLabel(stage: Match["stage"]): string {
  const labels: Record<Match["stage"], string> = {
    group: "小组赛",
    "round-of-32": "32强",
    "round-of-16": "16强",
    "quarter-final": "1/4决赛",
    "semi-final": "半决赛",
    "third-place": "三四名",
    final: "决赛",
  };
  return labels[stage];
}

type StageFilter = "all" | "group" | "knockout";

export function MatchesClient() {
  const [activeNav, setActiveNav] = useState("matches");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [stageFilter, setStageFilter] = useState<StageFilter>("all");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimezone, setSelectedTimezone] = useState<TimezoneOption>(timezoneOptions[0]);
  const [showTimezoneDropdown, setShowTimezoneDropdown] = useState(false);

  const navItems = [
    { id: "home", icon: Home, label: "首页", href: "/" },
    { id: "matches", icon: Calendar, label: "赛程", href: "/matches" },
    { id: "teams", icon: Users, label: "球队", href: "/teams" },
    { id: "groups", icon: Trophy, label: "小组", href: "/groups" },
    { id: "help", icon: HelpCircle, label: "帮助", href: "/help" },
    { id: "about", icon: Info, label: "关于", href: "/about" },
  ];

  // Get unique dates
  const uniqueDates = useMemo(() => {
    return [...new Set(matches.map((m) => m.date))].sort();
  }, []);

  // Filter matches
  const filteredMatches = useMemo(() => {
    let result = matches;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.homeTeam.toLowerCase().includes(query) ||
          m.awayTeam.toLowerCase().includes(query) ||
          m.venue.toLowerCase().includes(query) ||
          m.city.toLowerCase().includes(query)
      );
    }

    if (stageFilter === "group") {
      result = result.filter((m) => m.stage === "group");
    } else if (stageFilter === "knockout") {
      result = result.filter((m) => m.stage !== "group");
    }

    if (selectedGroup) {
      result = result.filter((m) => m.group === selectedGroup);
    }

    if (selectedDate) {
      result = result.filter((m) => m.date === selectedDate);
    }

    return result;
  }, [searchQuery, stageFilter, selectedGroup, selectedDate]);

  // Group matches by date
  const matchesByDate = useMemo(() => {
    const grouped: Record<string, Match[]> = {};
    filteredMatches.forEach((match) => {
      if (!grouped[match.date]) {
        grouped[match.date] = [];
      }
      grouped[match.date].push(match);
    });
    return grouped;
  }, [filteredMatches]);

  const sortedDates = Object.keys(matchesByDate).sort();

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
          <a
            href="/api/calendar"
            download="fifa-world-cup-2026.ics"
            className="block w-full text-center px-3 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
          >
            立即订阅
          </a>
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
                <h1 className="text-xl font-semibold text-foreground tracking-tight">完整赛程</h1>
                <p className="text-sm text-muted-foreground">
                  共 {filteredMatches.length} 场比赛
                </p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowTimezoneDropdown(!showTimezoneDropdown)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 border border-border/40 hover:bg-card/80 hover:border-border/60 transition-all cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-accent" />
                  <span className="text-sm text-foreground/90">
                    {selectedTimezone.label}
                  </span>
                  <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${showTimezoneDropdown ? 'rotate-90' : ''}`} />
                </button>
                {showTimezoneDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-60 bg-popover border border-border/60 rounded-xl shadow-xl z-50 py-2 backdrop-blur-xl">
                    {timezoneOptions.map((tz) => (
                      <button
                        key={tz.id}
                        onClick={() => {
                          setSelectedTimezone(tz);
                          setShowTimezoneDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors ${
                          selectedTimezone.id === tz.id ? 'text-accent bg-accent/5' : 'text-foreground/90'
                        }`}
                      >
                        {tz.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="border-b border-border/40 bg-card/20">
          <div className="px-6 md:px-10 py-4">
            <div className="flex flex-wrap gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="搜索球队、场馆..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 transition-all"
                />
              </div>

              {/* Stage Filter */}
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value as StageFilter)}
                className="px-4 py-2 text-sm rounded-lg bg-card border border-border/40 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all cursor-pointer"
              >
                <option value="all">全部阶段</option>
                <option value="group">小组赛</option>
                <option value="knockout">淘汰赛</option>
              </select>

              {/* Group Filter */}
              <select
                value={selectedGroup || "all"}
                onChange={(e) =>
                  setSelectedGroup(e.target.value === "all" ? null : e.target.value)
                }
                className="px-4 py-2 text-sm rounded-lg bg-card border border-border/40 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all cursor-pointer"
                disabled={stageFilter === "knockout"}
              >
                <option value="all">全部小组</option>
                {groups.map((g) => (
                  <option key={g} value={g}>
                    {g}组
                  </option>
                ))}
              </select>

              {/* Date Filter */}
              <select
                value={selectedDate || "all"}
                onChange={(e) =>
                  setSelectedDate(e.target.value === "all" ? null : e.target.value)
                }
                className="px-4 py-2 text-sm rounded-lg bg-card border border-border/40 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all cursor-pointer"
              >
                <option value="all">全部日期</option>
                {uniqueDates.map((date) => {
                  const [, month, day] = date.split("-");
                  return (
                    <option key={date} value={date}>
                      {month}月{day}日
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {/* Match List */}
        <main className="px-6 md:px-10 py-6">
          {sortedDates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">没有找到匹配的比赛</p>
            </div>
          ) : (
            <div className="space-y-8">
              {sortedDates.map((date) => {
                const [, month, day] = date.split("-");
                const dateObj = new Date(date);
                const weekday = dateObj.toLocaleDateString("zh-CN", {
                  weekday: "long",
                });

                return (
                  <div key={date}>
                    {/* Date Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-5 rounded-full bg-accent" />
                      <h2 className="text-lg font-semibold text-foreground tracking-tight">
                        {month}月{day}日 {weekday}
                      </h2>
                      <span className="text-sm text-muted-foreground">
                        {matchesByDate[date].length} 场比赛
                      </span>
                    </div>

                    {/* Matches */}
                    <div className="space-y-3">
                      {matchesByDate[date].map((match) => {
                        const homeFlag = getFlagUrl(match.homeTeam);
                        const awayFlag = getFlagUrl(match.awayTeam);
                        const convertedTime = convertToTimezone(
                          match.date,
                          match.time,
                          selectedTimezone.offset
                        );
                        const isTBD =
                          match.homeTeam.includes("W ") ||
                          match.homeTeam.includes("L ") ||
                          match.homeTeam.match(/^\d/);

                        return (
                          <Link
                            key={match.id}
                            href={`/match/${match.id}`}
                            className="block"
                          >
                            <div className="rounded-xl bg-card border border-border/40 p-4 hover:border-accent/40 transition-all group">
                              <div className="flex items-center gap-4">
                                {/* Time */}
                                <div className="w-20 text-center">
                                  <div className="text-2xl font-semibold text-foreground">
                                    {convertedTime.time}
                                  </div>
                                  <div className="text-[10px] uppercase tracking-wider text-accent">
                                    {selectedTimezone.id === "beijing" ? "北京" : selectedTimezone.label.split(" ")[0]}
                                  </div>
                                </div>

                                {/* Teams */}
                                <div className="flex-1 flex items-center justify-center gap-4">
                                  <div className="flex items-center gap-3 flex-1 justify-end">
                                    <span className="text-sm font-medium text-foreground/90 text-right">
                                      {match.homeTeam}
                                    </span>
                                    {homeFlag && !isTBD ? (
                                      <img
                                        src={homeFlag}
                                        alt={match.homeTeam}
                                        className="w-10 h-7 object-cover rounded shadow-sm"
                                        crossOrigin="anonymous"
                                      />
                                    ) : (
                                      <div className="w-10 h-7 rounded bg-muted/50 flex items-center justify-center text-xs text-muted-foreground">
                                        TBD
                                      </div>
                                    )}
                                  </div>

                                  <span className="text-muted-foreground/60 text-sm">
                                    vs
                                  </span>

                                  <div className="flex items-center gap-3 flex-1">
                                    {awayFlag && !isTBD ? (
                                      <img
                                        src={awayFlag}
                                        alt={match.awayTeam}
                                        className="w-10 h-7 object-cover rounded shadow-sm"
                                        crossOrigin="anonymous"
                                      />
                                    ) : (
                                      <div className="w-10 h-7 rounded bg-muted/50 flex items-center justify-center text-xs text-muted-foreground">
                                        TBD
                                      </div>
                                    )}
                                    <span className="text-sm font-medium text-foreground/90">
                                      {match.awayTeam}
                                    </span>
                                  </div>
                                </div>

                                {/* Info */}
                                <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Trophy className="w-4 h-4" />
                                    <span>
                                      {match.group
                                        ? `${match.group}组`
                                        : getStageLabel(match.stage)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span className="max-w-[150px] truncate">
                                      {match.venue}
                                    </span>
                                  </div>
                                </div>

                                {/* Action */}
                                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-accent transition-colors">
                                  <Eye className="w-4 h-4" />
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
