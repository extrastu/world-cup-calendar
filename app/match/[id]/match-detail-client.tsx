"use client";

import { Match, teamCountryCodes } from "@/lib/matches-data";
import { teamSquads, positionLabels, positionColors, Player } from "@/lib/teams-data";
import { convertToBeijingTime, getTimeOfDay, formatBeijingDate } from "@/lib/timezone";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, Calendar, Users, Trophy, Download, Star } from "lucide-react";
import Link from "next/link";

interface MatchDetailClientProps {
  match: Match;
}

function getFlagUrl(team: string, size: number = 80): string {
  const code = teamCountryCodes[team];
  if (!code) return "";
  if (code === "GB-SCT") return `https://flagcdn.com/w${size}/gb-sct.png`;
  if (code === "GB-ENG") return `https://flagcdn.com/w${size}/gb-eng.png`;
  return `https://flagcdn.com/w${size}/${code.toLowerCase()}.png`;
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

function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
        {player.number}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground truncate">{player.name}</span>
          {player.isCaptain && (
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
          )}
        </div>
        <div className="text-xs text-muted-foreground truncate">{player.club}</div>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${positionColors[player.position]}`}>
        {positionLabels[player.position]}
      </span>
    </div>
  );
}

function TeamSquadSection({ team }: { team: string }) {
  const squad = teamSquads[team];
  
  if (!squad) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p>阵容信息待更新</p>
      </div>
    );
  }

  const groupedPlayers = squad.players.reduce((acc, player) => {
    if (!acc[player.position]) acc[player.position] = [];
    acc[player.position].push(player);
    return acc;
  }, {} as Record<string, Player[]>);

  const positionOrder: Player["position"][] = ["GK", "DF", "MF", "FW"];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">主教练</span>
        <span className="font-medium text-foreground">{squad.coach}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">阵型</span>
        <span className="font-medium text-foreground">{squad.formation}</span>
      </div>
      <div className="border-t border-border pt-4 space-y-4">
        {positionOrder.map((position) => {
          const players = groupedPlayers[position];
          if (!players?.length) return null;
          return (
            <div key={position}>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                {positionLabels[position]} ({players.length})
              </h4>
              <div className="space-y-2">
                {players
                  .sort((a, b) => a.number - b.number)
                  .map((player) => (
                    <PlayerCard key={player.number} player={player} />
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MatchDetailClient({ match }: MatchDetailClientProps) {
  const homeFlag = getFlagUrl(match.homeTeam, 160);
  const awayFlag = getFlagUrl(match.awayTeam, 160);
  const isTBD = match.homeTeam.includes("W ") || match.homeTeam.includes("L ") || match.homeTeam.match(/^\d/);

  // 转换为北京时间
  const beijingTime = convertToBeijingTime(match.date, match.time);
  const timeOfDay = getTimeOfDay(beijingTime.time);
  const bjDateDisplay = formatBeijingDate(beijingTime);

  const handleAddToCalendar = () => {
    // 生成单场比赛的 ICS 文件
    const dateStr = match.date.replace(/-/g, "");
    const [hours, minutes] = match.time.split(":");
    const startTime = `${dateStr}T${hours}${minutes}00`;
    
    // 假设比赛时长2小时
    const endHour = (parseInt(hours) + 2).toString().padStart(2, "0");
    const endTime = `${dateStr}T${endHour}${minutes}00`;

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//2026 FIFA World Cup//Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${match.id}@worldcup2026
DTSTART;TZID=America/New_York:${startTime}
DTEND;TZID=America/New_York:${endTime}
SUMMARY:${match.homeTeam} vs ${match.awayTeam} - ${getStageLabel(match.stage)}
DESCRIPTION:2026 FIFA World Cup ${getStageLabel(match.stage)}${match.group ? ` - ${match.group}组` : ""}
LOCATION:${match.venue}, ${match.city}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `match-${match.id}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                返回赛程
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent" />
              <span className="font-semibold text-foreground">2026 世界杯</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Match Header */}
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8">
          {/* Stage Badge */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary">
              {getStageLabel(match.stage)}
              {match.group && ` · ${match.group}组`}
            </span>
          </div>

          {/* Teams */}
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-8">
            {/* Home Team */}
            <div className="flex-1 text-center">
              {homeFlag && !isTBD ? (
                <img
                  src={homeFlag}
                  alt={match.homeTeam}
                  className="w-20 h-14 md:w-28 md:h-20 object-cover rounded-lg shadow-md mx-auto mb-3"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-20 h-14 md:w-28 md:h-20 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3 text-muted-foreground">
                  TBD
                </div>
              )}
              <h2 className="text-lg md:text-2xl font-bold text-foreground">{match.homeTeam}</h2>
            </div>

            {/* VS */}
            <div className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-lg md:text-xl font-bold">
              VS
            </div>

            {/* Away Team */}
            <div className="flex-1 text-center">
              {awayFlag && !isTBD ? (
                <img
                  src={awayFlag}
                  alt={match.awayTeam}
                  className="w-20 h-14 md:w-28 md:h-20 object-cover rounded-lg shadow-md mx-auto mb-3"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-20 h-14 md:w-28 md:h-20 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3 text-muted-foreground">
                  TBD
                </div>
              )}
              <h2 className="text-lg md:text-2xl font-bold text-foreground">{match.awayTeam}</h2>
            </div>
          </div>

          {/* Match Info */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>{bjDateDisplay}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">{beijingTime.time}</span>
              <span className="text-muted-foreground">{timeOfDay} 北京时间</span>
            </div>
            {match.venue !== "TBD" && (
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{match.venue}, {match.city}</span>
              </div>
            )}
          </div>

          {/* Add to Calendar Button */}
          <div className="mt-6 text-center">
            <Button onClick={handleAddToCalendar} className="gap-2">
              <Download className="w-4 h-4" />
              添加到日历
            </Button>
          </div>
        </div>

        {/* Team Squads */}
        {!isTBD && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Home Team Squad */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                {homeFlag && (
                  <img
                    src={getFlagUrl(match.homeTeam, 40)}
                    alt={match.homeTeam}
                    className="w-8 h-6 object-cover rounded shadow-sm"
                    crossOrigin="anonymous"
                  />
                )}
                <h3 className="text-xl font-bold text-foreground">{match.homeTeam} 阵容</h3>
              </div>
              <TeamSquadSection team={match.homeTeam} />
            </div>

            {/* Away Team Squad */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                {awayFlag && (
                  <img
                    src={getFlagUrl(match.awayTeam, 40)}
                    alt={match.awayTeam}
                    className="w-8 h-6 object-cover rounded shadow-sm"
                    crossOrigin="anonymous"
                  />
                )}
                <h3 className="text-xl font-bold text-foreground">{match.awayTeam} 阵容</h3>
              </div>
              <TeamSquadSection team={match.awayTeam} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
