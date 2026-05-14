"use client";

import { Match, teamCountryCodes } from "@/lib/matches-data";
import { MapPin, Clock, Calendar } from "lucide-react";

interface MatchCardProps {
  match: Match;
}

function getFlagUrl(team: string): string {
  const code = teamCountryCodes[team];
  if (!code) return "";
  // Handle special codes for Scotland and England
  if (code === "GB-SCT") return "https://flagcdn.com/w40/gb-sct.png";
  if (code === "GB-ENG") return "https://flagcdn.com/w40/gb-eng.png";
  return `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
}

function getStageLabel(stage: Match["stage"]): string {
  const labels: Record<Match["stage"], string> = {
    group: "小组赛",
    "round-of-32": "32强赛",
    "round-of-16": "16强赛",
    "quarter-final": "四分之一决赛",
    "semi-final": "半决赛",
    "third-place": "三四名决赛",
    final: "决赛",
  };
  return labels[stage];
}

function getStageColor(stage: Match["stage"]): string {
  const colors: Record<Match["stage"], string> = {
    group: "bg-primary/10 text-primary",
    "round-of-32": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    "round-of-16": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    "quarter-final": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    "semi-final": "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    "third-place": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    final: "bg-accent text-accent-foreground",
  };
  return colors[stage];
}

export function MatchCard({ match }: MatchCardProps) {
  const homeFlag = getFlagUrl(match.homeTeam);
  const awayFlag = getFlagUrl(match.awayTeam);
  const isTBD = match.homeTeam.includes("W ") || match.homeTeam.includes("L ") || match.homeTeam.match(/^\d/);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all hover:shadow-lg hover:border-primary/30">
      {/* Stage Badge */}
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStageColor(match.stage)}`}>
          {getStageLabel(match.stage)}
          {match.group && ` · ${match.group}组`}
        </span>
        <span className="text-xs text-muted-foreground font-mono">
          #{match.id}
        </span>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between gap-2 mb-4">
        {/* Home Team */}
        <div className="flex-1 flex items-center gap-2">
          {homeFlag && !isTBD ? (
            <img 
              src={homeFlag} 
              alt={match.homeTeam}
              className="w-8 h-6 object-cover rounded shadow-sm"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-8 h-6 bg-muted rounded flex items-center justify-center text-[10px] text-muted-foreground">
              TBD
            </div>
          )}
          <span className="font-semibold text-sm truncate text-foreground">
            {match.homeTeam}
          </span>
        </div>

        {/* VS */}
        <div className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold">
          VS
        </div>

        {/* Away Team */}
        <div className="flex-1 flex items-center justify-end gap-2">
          <span className="font-semibold text-sm truncate text-right text-foreground">
            {match.awayTeam}
          </span>
          {awayFlag && !isTBD ? (
            <img 
              src={awayFlag} 
              alt={match.awayTeam}
              className="w-8 h-6 object-cover rounded shadow-sm"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-8 h-6 bg-muted rounded flex items-center justify-center text-[10px] text-muted-foreground">
              TBD
            </div>
          )}
        </div>
      </div>

      {/* Match Details */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{new Date(match.date).toLocaleDateString("zh-CN", { month: "short", day: "numeric" })}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{match.time} ET</span>
        </div>
        {match.venue !== "TBD" && (
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate max-w-[120px]">{match.city}</span>
          </div>
        )}
      </div>
    </div>
  );
}
