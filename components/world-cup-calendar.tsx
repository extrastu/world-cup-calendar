"use client";

import { useState, useMemo } from "react";
import { matches, groups, Match } from "@/lib/matches-data";
import { MatchCard } from "@/components/match-card";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Users, ChevronLeft, ChevronRight, CalendarPlus, Database } from "lucide-react";
import Link from "next/link";

type ViewMode = "calendar" | "group" | "knockout";
type StageFilter = "all" | Match["stage"];

export function WorldCupCalendar() {
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [stageFilter, setStageFilter] = useState<StageFilter>("all");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Get unique dates for the calendar view
  const uniqueDates = useMemo(() => {
    const dates = [...new Set(matches.map((m) => m.date))].sort();
    return dates;
  }, []);

  // Filter matches based on current view and filters
  const filteredMatches = useMemo(() => {
    let result = matches;

    if (viewMode === "group") {
      result = result.filter((m) => m.stage === "group");
      if (selectedGroup) {
        result = result.filter((m) => m.group === selectedGroup);
      }
    } else if (viewMode === "knockout") {
      result = result.filter((m) => m.stage !== "group");
    }

    if (stageFilter !== "all") {
      result = result.filter((m) => m.stage === stageFilter);
    }

    if (selectedDate) {
      result = result.filter((m) => m.date === selectedDate);
    }

    return result;
  }, [viewMode, selectedGroup, stageFilter, selectedDate]);

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

  // Calculate current index for date navigation
  const currentDateIndex = selectedDate ? uniqueDates.indexOf(selectedDate) : -1;

  const goToPrevDate = () => {
    if (currentDateIndex > 0) {
      setSelectedDate(uniqueDates[currentDateIndex - 1]);
    }
  };

  const goToNextDate = () => {
    if (currentDateIndex < uniqueDates.length - 1) {
      setSelectedDate(uniqueDates[currentDateIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      {/* Header - Glassmorphism navigation */}
      <header className="sticky top-0 z-50 glass-strong border-b border-border/50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full" />
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/80 to-accent flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                  CupCalendar
                </h1>
                <p className="text-sm text-muted-foreground tracking-wide">
                  2026 FIFA World Cup · Beijing Time
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Data Overview */}
              <Link
                href="/data"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl glass border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all"
              >
                <Database className="w-4 h-4" />
                <span className="hidden sm:inline">数据总览</span>
              </Link>

              {/* Subscribe */}
              <a
                href="/api/calendar"
                download="fifa-world-cup-2026.ics"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 transition-all glow-accent"
              >
                <CalendarPlus className="w-4 h-4" />
                <span className="hidden sm:inline">订阅日历</span>
              </a>

              {/* View Mode Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-xl glass border border-border/50">
                <button
                  onClick={() => {
                    setViewMode("calendar");
                    setSelectedGroup(null);
                    setStageFilter("all");
                  }}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    viewMode === "calendar"
                      ? "bg-foreground/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span className="hidden sm:inline">日历</span>
                </button>
                <button
                  onClick={() => {
                    setViewMode("group");
                    setStageFilter("all");
                  }}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    viewMode === "group"
                      ? "bg-foreground/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">小组</span>
                </button>
                <button
                  onClick={() => {
                    setViewMode("knockout");
                    setSelectedGroup(null);
                    setStageFilter("all");
                  }}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    viewMode === "knockout"
                      ? "bg-foreground/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Trophy className="w-4 h-4" />
                  <span className="hidden sm:inline">淘汰赛</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 relative">
        {/* Filters Section */}
        <div className="mb-8 space-y-4">
          {/* Group Filter */}
          {viewMode === "group" && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedGroup(null)}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                  selectedGroup === null
                    ? "bg-foreground text-background"
                    : "glass border border-border/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                全部小组
              </button>
              {groups.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                    selectedGroup === group
                      ? "bg-foreground text-background"
                      : "glass border border-border/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {group}组
                </button>
              ))}
            </div>
          )}

          {/* Stage Filter */}
          {viewMode === "knockout" && (
            <div className="flex flex-wrap gap-2">
              {[
                { value: "all", label: "全部" },
                { value: "round-of-32", label: "32强" },
                { value: "round-of-16", label: "16强" },
                { value: "quarter-final", label: "1/4决赛" },
                { value: "semi-final", label: "半决赛" },
                { value: "third-place", label: "三四名" },
                { value: "final", label: "决赛" },
              ].map((stage) => (
                <button
                  key={stage.value}
                  onClick={() => setStageFilter(stage.value as StageFilter)}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                    stageFilter === stage.value
                      ? "bg-foreground text-background"
                      : "glass border border-border/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {stage.label}
                </button>
              ))}
            </div>
          )}

          {/* Date Navigation - Horizontal scroll timeline */}
          {viewMode === "calendar" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedDate(null)}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                    selectedDate === null
                      ? "bg-foreground text-background"
                      : "glass border border-border/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  全部日期
                </button>
                
                {selectedDate && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goToPrevDate}
                      disabled={currentDateIndex <= 0}
                      className="w-9 h-9 rounded-lg glass border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-semibold min-w-[140px] text-center">
                      {new Date(selectedDate).toLocaleDateString("zh-CN", {
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <button
                      onClick={goToNextDate}
                      disabled={currentDateIndex >= uniqueDates.length - 1}
                      className="w-9 h-9 rounded-lg glass border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Horizontal scrollable date timeline */}
              {!selectedDate && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {uniqueDates.map((date) => {
                    const d = new Date(date);
                    return (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className="flex-shrink-0 px-4 py-3 rounded-xl glass border border-border/50 hover:border-accent/50 transition-all group"
                      >
                        <div className="text-xs text-muted-foreground group-hover:text-accent transition-colors">
                          {d.toLocaleDateString("zh-CN", { month: "short" })}
                        </div>
                        <div className="text-xl font-semibold text-foreground">
                          {d.getDate()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {d.toLocaleDateString("zh-CN", { weekday: "short" })}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Match Count */}
        <div className="mb-6 flex items-baseline gap-2">
          <span className="text-4xl font-bold tracking-tight">{filteredMatches.length}</span>
          <span className="text-lg text-muted-foreground">场比赛</span>
        </div>

        {/* Matches Grid */}
        {sortedDates.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4 opacity-20">⚽</div>
            <p className="text-xl text-muted-foreground">暂无符合条件的比赛</p>
          </div>
        ) : (
          <div className="space-y-12">
            {sortedDates.map((date) => (
              <section key={date}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <h2 className="text-xl font-semibold tracking-tight">
                      {new Date(date).toLocaleDateString("zh-CN", {
                        month: "long",
                        day: "numeric",
                        weekday: "long",
                      })}
                    </h2>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  <span className="text-sm text-muted-foreground font-medium">
                    {matchesByDate[date].length} 场
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {matchesByDate[date]
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Footer - Minimal */}
      <footer className="border-t border-border/50 mt-20 py-12 glass">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-lg font-semibold text-foreground">CupCalendar</p>
              <p className="text-sm text-muted-foreground mt-1">
                2026 FIFA World Cup · 48 Teams · 104 Matches
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a 
                href="https://v0.app/ref/938XEW" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                v0
              </a>
              <a 
                href="https://vercel.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Vercel
              </a>
              <a 
                href="https://github.com/extrastu/world-cup-calendar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
