"use client";

import { Match, teamCountryCodes } from "@/lib/matches-data";
import { convertToBeijingTime, getTimeOfDay } from "@/lib/timezone";
import { MapPin } from "lucide-react";
import Link from "next/link";

interface MatchCardProps {
  match: Match;
}

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

function getStageStyle(stage: Match["stage"]): string {
  if (stage === "final") {
    return "bg-accent/20 text-accent border-accent/30";
  }
  if (stage === "semi-final" || stage === "third-place") {
    return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  }
  return "bg-foreground/5 text-muted-foreground border-border/50";
}

export function MatchCard({ match }: MatchCardProps) {
  const homeFlag = getFlagUrl(match.homeTeam);
  const awayFlag = getFlagUrl(match.awayTeam);
  const isTBD = match.homeTeam.includes("W ") || match.homeTeam.includes("L ") || match.homeTeam.match(/^\d/);
  
  const beijingTime = convertToBeijingTime(match.date, match.time);
  const timeOfDay = getTimeOfDay(beijingTime.time);
  const [, bjMonth, bjDay] = beijingTime.date.split("-").map(Number);

  return (
    <Link href={`/match/${match.id}`} className="block group">
      <div className="relative overflow-hidden rounded-2xl glass border border-border/50 p-5 transition-all duration-300 hover:border-accent/30 hover:glow-subtle">
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative">
          {/* Header: Stage & Match ID */}
          <div className="flex items-center justify-between mb-5">
            <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium border ${getStageStyle(match.stage)}`}>
              {getStageLabel(match.stage)}
              {match.group && ` · ${match.group}组`}
            </span>
            <span className="text-xs text-muted-foreground/50 font-mono">
              #{match.id}
            </span>
          </div>

          {/* Teams Section */}
          <div className="space-y-4">
            {/* Home Team */}
            <div className="flex items-center gap-3">
              {homeFlag && !isTBD ? (
                <img 
                  src={homeFlag} 
                  alt={match.homeTeam}
                  className="w-10 h-7 object-cover rounded-md shadow-lg"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-10 h-7 rounded-md bg-muted/50 flex items-center justify-center text-[10px] text-muted-foreground">
                  TBD
                </div>
              )}
              <span className="font-semibold text-foreground truncate">
                {match.homeTeam}
              </span>
            </div>

            {/* Away Team */}
            <div className="flex items-center gap-3">
              {awayFlag && !isTBD ? (
                <img 
                  src={awayFlag} 
                  alt={match.awayTeam}
                  className="w-10 h-7 object-cover rounded-md shadow-lg"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-10 h-7 rounded-md bg-muted/50 flex items-center justify-center text-[10px] text-muted-foreground">
                  TBD
                </div>
              )}
              <span className="font-semibold text-foreground truncate">
                {match.awayTeam}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-5 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

          {/* Time & Venue - Large kickoff time display */}
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold tracking-tight text-foreground">
                {beijingTime.time}
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <span>{bjMonth}月{bjDay}日</span>
                <span className="text-muted-foreground/50">·</span>
                <span className="text-muted-foreground/70">{timeOfDay}</span>
              </div>
            </div>
            
            {match.venue !== "TBD" && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                <span className="truncate max-w-[100px]">{match.city}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
