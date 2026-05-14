"use client";

import { useState, useMemo } from "react";
import { groups, groupTeams, matches, teamCountryCodes, playoffTeams } from "@/lib/matches-data";
import { convertToBeijingTime } from "@/lib/timezone";
import Link from "next/link";
import {
  ArrowLeft,
  Trophy,
  Calendar,
  MapPin,
  Eye,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

function getFlagUrl(team: string, size: number = 80): string {
  const code = teamCountryCodes[team];
  if (!code) return "";
  const flagCode = code.toLowerCase().replace("gb-", "");
  return `https://flagcdn.com/w${size}/${flagCode}.png`;
}

export function GroupsClient() {
  const [expandedGroup, setExpandedGroup] = useState<string | null>("A");

  // Get matches for a group
  const getGroupMatches = (group: string) => {
    return matches.filter((m) => m.group === group && m.stage === "group");
  };

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
                <h1 className="text-xl font-semibold text-foreground">小组分布</h1>
                <p className="text-sm text-muted-foreground">
                  12个小组，每组4支球队
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/50 border border-border/50">
              <Trophy className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">48队 · 72场</span>
            </div>
          </div>
        </div>
      </header>

      {/* Groups Grid */}
      <main className="container mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => {
            const teams = groupTeams[group];
            const groupMatches = getGroupMatches(group);
            const isExpanded = expandedGroup === group;

            return (
              <div
                key={group}
                className="rounded-xl bg-card/30 border border-border/50 overflow-hidden"
              >
                {/* Group Header */}
                <button
                  onClick={() => setExpandedGroup(isExpanded ? null : group)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <span className="text-lg font-bold text-accent">{group}</span>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground">小组 {group}</h3>
                      <p className="text-xs text-muted-foreground">
                        {groupMatches.length} 场比赛
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                {/* Teams */}
                <div className="px-5 py-3 border-t border-border/30">
                  <div className="space-y-2">
                    {teams.map((team, idx) => {
                      const isPlayoff = team.includes("Playoff");
                      return (
                        <div
                          key={team}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/20 transition-colors"
                        >
                          <span className="w-6 h-6 flex items-center justify-center rounded bg-muted/30 text-xs font-medium text-muted-foreground">
                            {idx + 1}
                          </span>
                          {isPlayoff ? (
                            <div className="w-8 h-5 rounded bg-amber-500/20 flex items-center justify-center">
                              <HelpCircle className="w-4 h-4 text-amber-500" />
                            </div>
                          ) : (
                            <img
                              src={getFlagUrl(team, 40)}
                              alt={team}
                              className="w-8 h-5 object-cover rounded shadow-sm"
                              crossOrigin="anonymous"
                            />
                          )}
                          <span
                            className={`text-sm font-medium flex-1 ${
                              isPlayoff ? "text-amber-500" : "text-foreground"
                            }`}
                          >
                            {team}
                          </span>
                          {isPlayoff && (
                            <span className="text-xs text-amber-500/70">待定</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Expanded Matches */}
                {isExpanded && (
                  <div className="px-5 py-4 border-t border-border/30 bg-muted/5">
                    <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      小组赛程
                    </h4>
                    <div className="space-y-2">
                      {groupMatches.map((match) => {
                        const beijingTime = convertToBeijingTime(
                          match.date,
                          match.time
                        );
                        const [, month, day] = beijingTime.date
                          .split("-")
                          .map(Number);
                        const isTBD =
                          match.homeTeam.includes("Playoff") ||
                          match.awayTeam.includes("Playoff");

                        return (
                          <Link
                            key={match.id}
                            href={`/match/${match.id}`}
                            className="block"
                          >
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors group">
                              <div className="w-16 text-center">
                                <div className="text-sm font-medium text-foreground">
                                  {beijingTime.time}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {month}/{day}
                                </div>
                              </div>
                              <div className="flex-1 flex items-center gap-2">
                                {!isTBD ? (
                                  <img
                                    src={getFlagUrl(match.homeTeam, 40)}
                                    alt={match.homeTeam}
                                    className="w-6 h-4 object-cover rounded"
                                    crossOrigin="anonymous"
                                  />
                                ) : (
                                  <div className="w-6 h-4 rounded bg-amber-500/20" />
                                )}
                                <span className="text-xs text-muted-foreground">
                                  vs
                                </span>
                                {!match.awayTeam.includes("Playoff") ? (
                                  <img
                                    src={getFlagUrl(match.awayTeam, 40)}
                                    alt={match.awayTeam}
                                    className="w-6 h-4 object-cover rounded"
                                    crossOrigin="anonymous"
                                  />
                                ) : (
                                  <div className="w-6 h-4 rounded bg-amber-500/20" />
                                )}
                              </div>
                              <Eye className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 p-4 rounded-xl bg-card/30 border border-border/50">
          <h3 className="font-medium text-foreground mb-3">小组赛规则</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-accent">•</span>
              <span>每组4支球队进行单循环赛，共6场比赛</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">•</span>
              <span>小组前两名晋级32强淘汰赛</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">•</span>
              <span>12个小组中成绩最好的8支第三名球队也将晋级</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              <span className="text-amber-500">
                标记为待定的球队将于2026年3月通过附加赛确定
              </span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
