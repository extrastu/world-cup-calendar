"use client";

import { useState, useMemo } from "react";
import { matches, groups, Match } from "@/lib/matches-data";
import { MatchCard } from "@/components/match-card";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Users, Filter, ChevronLeft, ChevronRight, CalendarPlus, Database } from "lucide-react";
import Link from "next/link";

type ViewMode = "calendar" | "group" | "knockout";
type StageFilter = "all" | Match["stage"];

const stageFilters: { value: StageFilter; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "group", label: "小组赛" },
  { value: "round-of-32", label: "32强" },
  { value: "round-of-16", label: "16强" },
  { value: "quarter-final", label: "1/4决赛" },
  { value: "semi-final", label: "半决赛" },
  { value: "third-place", label: "三四名" },
  { value: "final", label: "决赛" },
];

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
                <Trophy className="w-7 h-7 text-accent" />
                <span className="text-balance">CupCalendar</span>
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                2026 FIFA World Cup Schedule | 世界杯赛程 · Beijing Time 北京时间
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Data Overview Link */}
              <Link
                href="/data"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                <Database className="w-4 h-4" />
                <span className="hidden sm:inline">数据总览</span>
              </Link>

              {/* Subscribe to Calendar */}
              <a
                href="/api/calendar"
                download="fifa-world-cup-2026.ics"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
              >
                <CalendarPlus className="w-4 h-4" />
                <span className="hidden sm:inline">订阅日历</span>
              </a>

              {/* View Mode Tabs */}
              <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
              <Button
                variant={viewMode === "calendar" ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  setViewMode("calendar");
                  setSelectedGroup(null);
                  setStageFilter("all");
                }}
                className="gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                日历
              </Button>
              <Button
                variant={viewMode === "group" ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  setViewMode("group");
                  setStageFilter("all");
                }}
                className="gap-1.5"
              >
                <Users className="w-4 h-4" />
                小组
              </Button>
              <Button
                variant={viewMode === "knockout" ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  setViewMode("knockout");
                  setSelectedGroup(null);
                  setStageFilter("all");
                }}
                className="gap-1.5"
              >
                <Trophy className="w-4 h-4" />
                淘汰赛
              </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Filters */}
        <div className="mb-6 space-y-4">
          {/* Group Filter (only in group view) */}
          {viewMode === "group" && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedGroup === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGroup(null)}
              >
                全部小组
              </Button>
              {groups.map((group) => (
                <Button
                  key={group}
                  variant={selectedGroup === group ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGroup(group)}
                >
                  {group}组
                </Button>
              ))}
            </div>
          )}

          {/* Stage Filter (in knockout view) */}
          {viewMode === "knockout" && (
            <div className="flex flex-wrap gap-2">
              {stageFilters
                .filter((s) => s.value !== "group" && s.value !== "all")
                .map((stage) => (
                  <Button
                    key={stage.value}
                    variant={stageFilter === stage.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStageFilter(stage.value)}
                  >
                    {stage.label}
                  </Button>
                ))}
              <Button
                variant={stageFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStageFilter("all")}
              >
                全部
              </Button>
            </div>
          )}

          {/* Date Navigation (in calendar view) */}
          {viewMode === "calendar" && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedDate(null)}
                className={selectedDate === null ? "bg-primary text-primary-foreground" : ""}
              >
                <Filter className="w-4 h-4 mr-1" />
                全部日期
              </Button>
              <div className="h-6 w-px bg-border" />
              {selectedDate && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={goToPrevDate}
                    disabled={currentDateIndex <= 0}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium min-w-[100px] text-center">
                    {new Date(selectedDate).toLocaleDateString("zh-CN", {
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={goToNextDate}
                    disabled={currentDateIndex >= uniqueDates.length - 1}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
              {!selectedDate && (
                <div className="flex gap-1.5 overflow-x-auto">
                  {uniqueDates.slice(0, 10).map((date) => (
                    <Button
                      key={date}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDate(date)}
                      className="whitespace-nowrap text-xs"
                    >
                      {new Date(date).toLocaleDateString("zh-CN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </Button>
                  ))}
                  {uniqueDates.length > 10 && (
                    <span className="text-muted-foreground text-sm self-center px-2">
                      +{uniqueDates.length - 10} 天
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Match Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          共 {filteredMatches.length} 场比赛
        </div>

        {/* Matches Grid */}
        {sortedDates.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            暂无符合条件的比赛
          </div>
        ) : (
          <div className="space-y-8">
            {sortedDates.map((date) => (
              <section key={date}>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
                  <Calendar className="w-5 h-5 text-primary" />
                  {new Date(date).toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                  })}
                  <span className="text-sm font-normal text-muted-foreground">
                    ({matchesByDate[date].length}场)
                  </span>
                </h2>
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

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground space-y-4">
          <div>
            <p className="font-medium text-foreground text-lg">CupCalendar</p>
            <p className="mt-1">2026 FIFA World Cup Schedule | 世界杯赛程 · Beijing Time 北京时间</p>
            <p className="mt-1">48 Teams · 104 Matches · 16 Cities | USA · Canada · Mexico</p>
          </div>
          
          <div className="border-t border-border pt-4">
            <p className="text-xs">
              Built with{" "}
              <a 
                href="https://v0.app/ref/938XEW" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                v0 by Vercel
              </a>
              {" "}· Deployed on{" "}
              <a 
                href="https://vercel.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Vercel
              </a>
            </p>
            <p className="text-xs mt-2 text-muted-foreground/70">
              Data from FIFA Official | For reference only | 数据来源 FIFA 官方，仅供参考
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
