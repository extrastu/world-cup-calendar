"use client";

import { useState, useMemo, useEffect } from "react";
import { matches, groups, Match, teamCountryCodes } from "@/lib/matches-data";
import { convertToBeijingTime, getTimeOfDay } from "@/lib/timezone";
import { Button } from "@/components/ui/button";
import {
  Home,
  Calendar,
  Trophy,
  Users,
  ChevronRight,
  Globe,
  Share2,
  CalendarPlus,
  Eye,
  Database,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

function getFlagUrl(team: string): string {
  const code = teamCountryCodes[team];
  if (!code) return "";
  if (code === "GB-SCT") return "https://flagcdn.com/w80/gb-sct.png";
  if (code === "GB-ENG") return "https://flagcdn.com/w80/gb-eng.png";
  if (code === "GB-WLS") return "https://flagcdn.com/w80/gb-wls.png";
  if (code === "GB-NIR") return "https://flagcdn.com/w80/gb-nir.png";
  // EU and UN flags use w160 as they don't exist at w80
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

// Countdown component
function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-baseline gap-1 text-accent">
      <span className="text-4xl md:text-5xl lg:text-6xl font-bold tabular-nums">
        {timeLeft.days}
      </span>
      <span className="text-lg text-accent/70 mr-2">:</span>
      <span className="text-4xl md:text-5xl lg:text-6xl font-bold tabular-nums">
        {String(timeLeft.hours).padStart(2, "0")}
      </span>
      <span className="text-lg text-accent/70 mr-2">:</span>
      <span className="text-4xl md:text-5xl lg:text-6xl font-bold tabular-nums">
        {String(timeLeft.mins).padStart(2, "0")}
      </span>
      <span className="text-lg text-accent/70 mr-2">:</span>
      <span className="text-4xl md:text-5xl lg:text-6xl font-bold tabular-nums">
        {String(timeLeft.secs).padStart(2, "0")}
      </span>
    </div>
  );
}

// Tonight's Match Card
function TonightMatchCard({ match }: { match: Match }) {
  const homeFlag = getFlagUrl(match.homeTeam);
  const awayFlag = getFlagUrl(match.awayTeam);
  const isTBD =
    match.homeTeam.includes("W ") ||
    match.homeTeam.includes("L ") ||
    match.homeTeam.match(/^\d/);
  const beijingTime = convertToBeijingTime(match.date, match.time);
  const [, bjMonth, bjDay] = beijingTime.date.split("-").map(Number);

  return (
    <Link href={`/match/${match.id}`} className="block">
      <div className="relative min-w-[280px] rounded-xl bg-card/50 border border-border/50 p-4 hover:border-accent/30 transition-all group">
        {/* Group Label */}
        <div className="text-center text-sm text-muted-foreground mb-3">
          {match.group ? `${match.group}组` : getStageLabel(match.stage)}
        </div>

        {/* Time Display */}
        <div className="flex items-center justify-center gap-4 mb-4">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-2">
            {homeFlag && !isTBD ? (
              <img
                src={homeFlag}
                alt={match.homeTeam}
                className="w-12 h-8 object-cover rounded shadow-lg"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="w-12 h-8 rounded bg-muted/50 flex items-center justify-center text-xs text-muted-foreground">
                TBD
              </div>
            )}
            <span className="text-sm font-medium text-muted-foreground">
              {match.homeTeam}
            </span>
          </div>

          {/* Time */}
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">
              {beijingTime.time}
            </div>
            <div className="text-xs text-accent mt-1">北京</div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-2">
            {awayFlag && !isTBD ? (
              <img
                src={awayFlag}
                alt={match.awayTeam}
                className="w-12 h-8 object-cover rounded shadow-lg"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="w-12 h-8 rounded bg-muted/50 flex items-center justify-center text-xs text-muted-foreground">
                TBD
              </div>
            )}
            <span className="text-sm font-medium text-muted-foreground">
              {match.awayTeam}
            </span>
          </div>
        </div>

        {/* Date & Venue */}
        <div className="text-center text-xs text-muted-foreground">
          <span>
            {bjMonth}月{bjDay}日
          </span>
          <span className="mx-2">·</span>
          <span>{match.venue}</span>
        </div>

        {/* Watch Details */}
        <div className="mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground group-hover:text-accent transition-colors">
            <Eye className="w-4 h-4" />
            <span>查看详情</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function WorldCupCalendar() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState("home");

  // World Cup start date: June 11, 2026
  const worldCupStart = new Date(2026, 5, 11, 0, 0, 0);

  // Get first 5 matches as "tonight's matches"
  const tonightMatches = useMemo(() => {
    return matches.slice(0, 5);
  }, []);

  // Filter matches
  const filteredMatches = useMemo(() => {
    let result = matches;

    // Filter by group if selected
    if (selectedGroup) {
      result = result.filter((m) => m.group === selectedGroup);
    }

    if (selectedDate) {
      result = result.filter((m) => m.date === selectedDate);
    }

    return result;
  }, [selectedGroup, selectedDate]);

  const navItems = [
    { id: "home", icon: Home, label: "首页", href: "/" },
    { id: "matches", icon: Calendar, label: "赛程", href: "/matches" },
    { id: "teams", icon: Users, label: "球队", href: "/teams" },
    { id: "groups", icon: Trophy, label: "小组", href: "/groups" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 border-r border-border/50 bg-card/20 sticky top-0 h-screen overflow-y-auto">
        {/* Logo */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/80 to-accent flex items-center justify-center">
              <Trophy className="w-4 h-4 text-accent-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">CupCalendar</h1>
              <p className="text-xs text-muted-foreground">FIFA 2026</p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  activeNav === item.id
                    ? "bg-muted/50 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Subscribe CTA */}
        <div className="p-4 m-4 rounded-xl bg-card/50 border border-border/50">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted/50 mb-3">
            <CalendarPlus className="w-5 h-5 text-muted-foreground" />
          </div>
          <h3 className="font-medium text-foreground text-sm mb-1">
            不错过任何比赛
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
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
        <div className="p-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 CupCalendar
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/80 to-accent flex items-center justify-center">
                <Trophy className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="font-semibold text-foreground">CupCalendar</span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/data"
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Database className="w-5 h-5 text-muted-foreground" />
              </Link>
              <a
                href="/api/calendar"
                download="fifa-world-cup-2026.ics"
                className="p-2 rounded-lg bg-accent text-accent-foreground"
              >
                <CalendarPlus className="w-5 h-5" />
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Stadium Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/stadium-bg.png')" }}
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

          <div className="relative px-4 md:px-8 py-8 md:py-12">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/50 border border-border/50">
                <Globe className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">
                  北京时间 (GMT+8)
                </span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">分享</span>
                </button>
                <a
                  href="/api/calendar"
                  download="fifa-world-cup-2026.ics"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
                >
                  <CalendarPlus className="w-4 h-4" />
                  <span className="text-sm">订阅日历</span>
                </a>
              </div>
            </div>

            {/* Main Hero Content */}
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-4">
                Every Match.
                <br />
                <span className="text-accent">Your Time.</span>
              </h1>

              <p className="text-muted-foreground mb-2">
                全部 {matches.length} 场比赛，自动转换北京时间
              </p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Calendar className="w-4 h-4" />
                <span>2026年6月11日 - 7月19日</span>
              </p>

              {/* Countdown */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  距离世界杯开幕还有
                </p>
                <Countdown targetDate={worldCupStart} />
                <div className="flex gap-8 mt-2 text-xs text-accent/70">
                  <span className="w-12 md:w-16">天</span>
                  <span className="w-12 md:w-16">时</span>
                  <span className="w-12 md:w-16">分</span>
                  <span className="w-12 md:w-16">秒</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tonight's Matches */}
        <section className="px-4 md:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full bg-accent" />
              <h2 className="text-xl font-semibold text-foreground">
                即将开始
              </h2>
            </div>
            <Link
              href="/matches"
              className="flex items-center gap-1 text-sm text-accent hover:underline"
            >
              查看完整赛程 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            北京时间 (GMT+8)
          </p>

          {/* Horizontal scroll matches */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {tonightMatches.map((match) => (
              <TonightMatchCard key={match.id} match={match} />
            ))}
            <button
              onClick={() => {}}
              className="flex-shrink-0 w-12 flex items-center justify-center rounded-xl bg-card/30 border border-border/50 hover:border-accent/30 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </section>

        {/* All Matches Section */}
        <section className="px-4 md:px-8 py-6 flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full bg-accent" />
              <h2 className="text-xl font-semibold text-foreground">
                全部比赛
              </h2>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <select
                value={selectedGroup || "all"}
                onChange={(e) =>
                  setSelectedGroup(e.target.value === "all" ? null : e.target.value)
                }
                className="px-3 py-1.5 text-sm rounded-lg bg-card/50 border border-border/50 text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="all">全部小组</option>
                {groups.map((group) => (
                  <option key={group} value={group}>
                    {group}组
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table View */}
          <div className="bg-card/30 rounded-xl border border-border/50 overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-muted/30 text-xs text-muted-foreground uppercase tracking-wider border-b border-border/50">
              <div className="col-span-2">日期</div>
              <div className="col-span-5">比赛</div>
              <div className="col-span-1">小组</div>
              <div className="col-span-2">球场</div>
              <div className="col-span-2 text-right">时间 (北京)</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-border/50">
              {filteredMatches.slice(0, 10).map((match) => {
                const beijingTime = convertToBeijingTime(match.date, match.time);
                const homeFlag = getFlagUrl(match.homeTeam);
                const awayFlag = getFlagUrl(match.awayTeam);
                const isTBD =
                  match.homeTeam.includes("W ") ||
                  match.homeTeam.includes("L ") ||
                  match.homeTeam.match(/^\d/);
                const d = new Date(match.date);

                return (
                  <Link
                    key={match.id}
                    href={`/match/${match.id}`}
                    className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-muted/20 transition-colors items-center"
                  >
                    {/* Date */}
                    <div className="col-span-2 text-sm text-muted-foreground">
                      {d.toLocaleDateString("zh-CN", {
                        month: "short",
                        day: "numeric",
                        weekday: "short",
                      })}
                    </div>

                    {/* Match */}
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {homeFlag && !isTBD ? (
                          <img
                            src={homeFlag}
                            alt={match.homeTeam}
                            className="w-6 h-4 object-cover rounded"
                            crossOrigin="anonymous"
                          />
                        ) : (
                          <div className="w-6 h-4 rounded bg-muted/50" />
                        )}
                        <span className="font-medium text-foreground">
                          {match.homeTeam}
                        </span>
                      </div>
                      <span className="text-muted-foreground">vs</span>
                      <div className="flex items-center gap-2">
                        {awayFlag && !isTBD ? (
                          <img
                            src={awayFlag}
                            alt={match.awayTeam}
                            className="w-6 h-4 object-cover rounded"
                            crossOrigin="anonymous"
                          />
                        ) : (
                          <div className="w-6 h-4 rounded bg-muted/50" />
                        )}
                        <span className="font-medium text-foreground">
                          {match.awayTeam}
                        </span>
                      </div>
                    </div>

                    {/* Group */}
                    <div className="col-span-1 text-sm text-muted-foreground">
                      {match.group || "-"}
                    </div>

                    {/* Venue */}
                    <div className="col-span-2 text-sm text-muted-foreground truncate">
                      {match.venue}
                    </div>

                    {/* Time */}
                    <div className="col-span-2 text-right">
                      <span className="text-lg font-semibold text-accent">
                        {beijingTime.time}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Load More */}
            {filteredMatches.length > 10 && (
              <div className="px-4 py-3 border-t border-border/50">
                <Link
                  href="/matches"
                  className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  加载更多比赛 <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
