"use client";

import { useState, useMemo } from "react";
import { matches, groups, Match, teamCountryCodes } from "@/lib/matches-data";
import { convertToBeijingTime } from "@/lib/timezone";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Search,
  Filter,
  Eye,
  MapPin,
  Trophy,
} from "lucide-react";

function getFlagUrl(team: string): string {
  const code = teamCountryCodes[team];
  if (!code) return "";
  if (code === "GB-SCT") return "https://flagcdn.com/w80/gb-sct.png";
  if (code === "GB-ENG") return "https://flagcdn.com/w80/gb-eng.png";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [stageFilter, setStageFilter] = useState<StageFilter>("all");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Get unique dates
  const uniqueDates = useMemo(() => {
    return [...new Set(matches.map((m) => m.date))].sort();
  }, []);

  // Filter matches
  const filteredMatches = useMemo(() => {
    let result = matches;

    // Search filter
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

    // Stage filter
    if (stageFilter === "group") {
      result = result.filter((m) => m.stage === "group");
    } else if (stageFilter === "knockout") {
      result = result.filter((m) => m.stage !== "group");
    }

    // Group filter
    if (selectedGroup) {
      result = result.filter((m) => m.group === selectedGroup);
    }

    // Date filter
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
                <h1 className="text-xl font-semibold text-foreground">完整赛程</h1>
                <p className="text-sm text-muted-foreground">
                  共 {filteredMatches.length} 场比赛
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/50 border border-border/50">
              <Calendar className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">北京时间</span>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="border-b border-border/50 bg-card/20">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜索球队、场馆..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-card/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 transition-all"
              />
            </div>

            {/* Stage Filter */}
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value as StageFilter)}
              className="px-3 py-2 text-sm rounded-lg bg-card/50 border border-border/50 text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
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
              className="px-3 py-2 text-sm rounded-lg bg-card/50 border border-border/50 text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
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
              className="px-3 py-2 text-sm rounded-lg bg-card/50 border border-border/50 text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="all">全部日期</option>
              {uniqueDates.map((date) => {
                const [year, month, day] = date.split("-");
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
      <main className="container mx-auto px-4 md:px-6 py-6">
        {sortedDates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">没有找到匹配的比赛</p>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedDates.map((date) => {
              const [year, month, day] = date.split("-");
              const dateObj = new Date(date);
              const weekday = dateObj.toLocaleDateString("zh-CN", {
                weekday: "long",
              });

              return (
                <div key={date}>
                  {/* Date Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 rounded-full bg-accent" />
                    <h2 className="text-lg font-semibold text-foreground">
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
                      const beijingTime = convertToBeijingTime(
                        match.date,
                        match.time
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
                          <div className="rounded-xl bg-card/30 border border-border/50 p-4 hover:border-accent/30 transition-all group">
                            <div className="flex items-center gap-4">
                              {/* Time */}
                              <div className="w-20 text-center">
                                <div className="text-2xl font-bold text-foreground">
                                  {beijingTime.time}
                                </div>
                                <div className="text-xs text-accent">北京</div>
                              </div>

                              {/* Teams */}
                              <div className="flex-1 flex items-center justify-center gap-4">
                                <div className="flex items-center gap-3 flex-1 justify-end">
                                  <span className="text-sm font-medium text-foreground text-right">
                                    {match.homeTeam}
                                  </span>
                                  {homeFlag && !isTBD ? (
                                    <img
                                      src={homeFlag}
                                      alt={match.homeTeam}
                                      className="w-10 h-7 object-cover rounded shadow"
                                      crossOrigin="anonymous"
                                    />
                                  ) : (
                                    <div className="w-10 h-7 rounded bg-muted/50 flex items-center justify-center text-xs text-muted-foreground">
                                      TBD
                                    </div>
                                  )}
                                </div>

                                <span className="text-muted-foreground font-medium">
                                  vs
                                </span>

                                <div className="flex items-center gap-3 flex-1">
                                  {awayFlag && !isTBD ? (
                                    <img
                                      src={awayFlag}
                                      alt={match.awayTeam}
                                      className="w-10 h-7 object-cover rounded shadow"
                                      crossOrigin="anonymous"
                                    />
                                  ) : (
                                    <div className="w-10 h-7 rounded bg-muted/50 flex items-center justify-center text-xs text-muted-foreground">
                                      TBD
                                    </div>
                                  )}
                                  <span className="text-sm font-medium text-foreground">
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
  );
}
