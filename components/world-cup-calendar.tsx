"use client";

import { useState, useMemo, useEffect } from "react";
import { matches, groups, Match, teamCountryCodes } from "@/lib/matches-data";
import { convertToTimezone, timezoneOptions, TimezoneOption } from "@/lib/timezone";
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
  Database,
  ArrowRight,
  Info,
  HelpCircle,
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
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center">
        <span className="text-3xl md:text-4xl lg:text-5xl font-semibold tabular-nums text-foreground">
          {timeLeft.days}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">天</span>
      </div>
      <span className="text-2xl md:text-3xl text-muted-foreground/40 font-light">:</span>
      <div className="flex flex-col items-center">
        <span className="text-3xl md:text-4xl lg:text-5xl font-semibold tabular-nums text-foreground">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">时</span>
      </div>
      <span className="text-2xl md:text-3xl text-muted-foreground/40 font-light">:</span>
      <div className="flex flex-col items-center">
        <span className="text-3xl md:text-4xl lg:text-5xl font-semibold tabular-nums text-foreground">
          {String(timeLeft.mins).padStart(2, "0")}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">分</span>
      </div>
      <span className="text-2xl md:text-3xl text-muted-foreground/40 font-light">:</span>
      <div className="flex flex-col items-center">
        <span className="text-3xl md:text-4xl lg:text-5xl font-semibold tabular-nums text-accent">
          {String(timeLeft.secs).padStart(2, "0")}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">秒</span>
      </div>
    </div>
  );
}

// Tonight's Match Card
function TonightMatchCard({ match, timezone }: { match: Match; timezone: TimezoneOption }) {
  const homeFlag = getFlagUrl(match.homeTeam);
  const awayFlag = getFlagUrl(match.awayTeam);
  const isTBD =
    match.homeTeam.includes("W ") ||
    match.homeTeam.includes("L ") ||
    match.homeTeam.match(/^\d/);
  const convertedTime = convertToTimezone(match.date, match.time, timezone.offset);
  const [, bjMonth, bjDay] = convertedTime.date.split("-").map(Number);

  return (
    <Link href={`/match/${match.id}`} className="block group">
      <div className="relative min-w-[300px] rounded-xl bg-card border border-border/60 p-5 hover:border-accent/40 hover:bg-card/80 transition-all duration-200">
        {/* Group Label */}
        <div className="text-center">
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-muted/60 text-muted-foreground">
            {match.group ? `${match.group}组` : getStageLabel(match.stage)}
          </span>
        </div>

        {/* Teams and Time */}
        <div className="flex items-center justify-between mt-5 mb-4">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-2 w-24">
            {homeFlag && !isTBD ? (
              <img
                src={homeFlag}
                alt={match.homeTeam}
                className="w-14 h-9 object-cover rounded-md shadow-sm"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="w-14 h-9 rounded-md bg-muted/40 flex items-center justify-center text-xs text-muted-foreground">
                TBD
              </div>
            )}
            <span className="text-sm font-medium text-foreground/90 text-center leading-tight">
              {match.homeTeam}
            </span>
          </div>

          {/* Time */}
          <div className="text-center px-4">
            <div className="text-3xl font-semibold text-foreground tracking-tight">
              {convertedTime.time}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-accent mt-1">
              {timezone.id === "beijing" ? "北京时间" : timezone.label.split(" ")[0]}
            </div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-2 w-24">
            {awayFlag && !isTBD ? (
              <img
                src={awayFlag}
                alt={match.awayTeam}
                className="w-14 h-9 object-cover rounded-md shadow-sm"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="w-14 h-9 rounded-md bg-muted/40 flex items-center justify-center text-xs text-muted-foreground">
                TBD
              </div>
            )}
            <span className="text-sm font-medium text-foreground/90 text-center leading-tight">
              {match.awayTeam}
            </span>
          </div>
        </div>

        {/* Date & Venue */}
        <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border/40">
          <span>{bjMonth}月{bjDay}日</span>
          <span className="mx-2 text-border">|</span>
          <span>{match.venue}</span>
        </div>

        {/* Hover indicator */}
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-xl" />
      </div>
    </Link>
  );
}

export function WorldCupCalendar() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState("home");
  const [selectedTimezone, setSelectedTimezone] = useState<TimezoneOption>(timezoneOptions[0]);
  const [showTimezoneDropdown, setShowTimezoneDropdown] = useState(false);

  // Share function
  const handleShare = async () => {
    const shareData = {
      title: "2026 FIFA World Cup Calendar",
      text: "查看2026年FIFA世界杯完整赛程，自动转换本地时间",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("链接已复制到剪贴板");
      }
    } catch (err) {
      console.log("Share failed:", err);
    }
  };

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
    { id: "help", icon: HelpCircle, label: "帮助", href: "/help" },
    { id: "about", icon: Info, label: "关于", href: "/about" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 border-r border-border/40 bg-sidebar sticky top-0 h-screen overflow-y-auto">
        {/* Logo */}
        <div className="p-5 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
              <Trophy className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground tracking-tight">CupCalendar</h1>
              <p className="text-[11px] text-muted-foreground">FIFA World Cup 2026</p>
            </div>
          </div>
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
              <Link
                href="/subscribe"
                className="p-2 rounded-lg bg-accent text-accent-foreground"
              >
                <CalendarPlus className="w-5 h-5" />
              </Link>
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
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />

          <div className="relative px-6 md:px-10 py-10 md:py-16">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-10">
              <div className="relative">
                <button
                  onClick={() => setShowTimezoneDropdown(!showTimezoneDropdown)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 border border-border/40 hover:bg-card/80 hover:border-border/60 transition-all cursor-pointer backdrop-blur-sm"
                >
                  <Globe className="w-4 h-4 text-accent" />
                  <span className="text-sm text-foreground/90">
                    {selectedTimezone.label}
                  </span>
                  <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${showTimezoneDropdown ? 'rotate-90' : ''}`} />
                </button>
                {showTimezoneDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-60 bg-popover border border-border/60 rounded-xl shadow-xl z-50 py-2 backdrop-blur-xl">
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
              <div className="hidden md:flex items-center gap-3">
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/40 hover:bg-muted/40 hover:border-border/60 transition-all text-foreground/80 hover:text-foreground"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium">分享</span>
                </button>
                <Link
                  href="/subscribe"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-medium"
                >
                  <CalendarPlus className="w-4 h-4" />
                  <span className="text-sm">订阅日历</span>
                </Link>
              </div>
            </div>

            {/* Main Hero Content */}
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-[1.1] mb-5">
                Every Match.
                <br />
                <span className="text-accent">Your Time.</span>
              </h1>

              <p className="text-muted-foreground mb-1.5 text-[15px]">
                全部 {matches.length} 场比赛，自动转换{selectedTimezone.label.split(" ")[0]}
              </p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground/80 mb-8">
                <Calendar className="w-4 h-4" />
                <span>2026年6月11日 - 7月19日</span>
              </p>

              {/* Countdown */}
              <div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-widest mb-4">
                  距离世界杯开幕
                </p>
                <Countdown targetDate={worldCupStart} />
              </div>
            </div>
          </div>
        </section>

        {/* Tonight's Matches */}
        <section className="px-6 md:px-10 py-8">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 rounded-full bg-accent" />
              <h2 className="text-lg font-semibold text-foreground tracking-tight">
                即将开始
              </h2>
            </div>
            <Link
              href="/matches"
              className="flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition-colors font-medium"
            >
              查看完整赛程 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            {selectedTimezone.label}
          </p>

          {/* Horizontal scroll matches */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 md:-mx-10 md:px-10">
            {tonightMatches.map((match) => (
              <TonightMatchCard key={match.id} match={match} timezone={selectedTimezone} />
            ))}
          </div>
        </section>

        {/* All Matches Section */}
        <section className="px-6 md:px-10 py-8 flex-1">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 rounded-full bg-accent" />
              <h2 className="text-lg font-semibold text-foreground tracking-tight">
                全部比赛
              </h2>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
              <select
                value={selectedGroup || "all"}
                onChange={(e) =>
                  setSelectedGroup(e.target.value === "all" ? null : e.target.value)
                }
                className="px-4 py-2 text-sm rounded-lg bg-card border border-border/40 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all cursor-pointer"
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
          <div className="bg-card rounded-xl border border-border/40 overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3.5 bg-muted/30 text-[11px] text-muted-foreground uppercase tracking-wider font-medium border-b border-border/40">
              <div className="col-span-2">日期</div>
              <div className="col-span-5">比赛</div>
              <div className="col-span-1">小组</div>
              <div className="col-span-2">球场</div>
              <div className="col-span-2 text-right">时间 ({selectedTimezone.label.split(" ")[0]})</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-border/30">
              {filteredMatches.slice(0, 10).map((match) => {
                const convertedTime = convertToTimezone(match.date, match.time, selectedTimezone.offset);
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
                    className="grid grid-cols-12 gap-4 px-5 py-4 hover:bg-muted/20 transition-colors items-center group"
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
                      <div className="flex items-center gap-2.5">
                        {homeFlag && !isTBD ? (
                          <img
                            src={homeFlag}
                            alt={match.homeTeam}
                            className="w-7 h-[18px] object-cover rounded"
                            crossOrigin="anonymous"
                          />
                        ) : (
                          <div className="w-7 h-[18px] rounded bg-muted/50" />
                        )}
                        <span className="font-medium text-foreground/90">
                          {match.homeTeam}
                        </span>
                      </div>
                      <span className="text-muted-foreground/60 text-sm">vs</span>
                      <div className="flex items-center gap-2.5">
                        {awayFlag && !isTBD ? (
                          <img
                            src={awayFlag}
                            alt={match.awayTeam}
                            className="w-7 h-[18px] object-cover rounded"
                            crossOrigin="anonymous"
                          />
                        ) : (
                          <div className="w-7 h-[18px] rounded bg-muted/50" />
                        )}
                        <span className="font-medium text-foreground/90">
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
                      <span className="text-base font-semibold text-accent group-hover:text-accent/80 transition-colors">
                        {convertedTime.time}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Load More */}
            {filteredMatches.length > 10 && (
              <div className="px-5 py-4 border-t border-border/40 bg-muted/10">
                <Link
                  href="/matches"
                  className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  查看全部 {filteredMatches.length} 场比赛 <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
