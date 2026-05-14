"use client";

import { Match, teamCountryCodes } from "@/lib/matches-data";
import { teamSquads, positionLabels, positionColors, Player } from "@/lib/teams-data";
import { convertToBeijingTime, getTimeOfDay, formatBeijingDate } from "@/lib/timezone";
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
    <div className="flex items-center gap-3 p-3 rounded-xl glass border border-border/30 hover:border-accent/30 transition-all">
      <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center font-bold text-foreground">
        {player.number}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground truncate">{player.name}</span>
          {player.isCaptain && (
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />
          )}
        </div>
        <div className="text-xs text-muted-foreground truncate">{player.club}</div>
      </div>
      <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${positionColors[player.position]}`}>
        {positionLabels[player.position]}
      </span>
    </div>
  );
}

function TeamSquadSection({ team }: { team: string }) {
  const squad = teamSquads[team];
  
  if (!squad) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Users className="w-16 h-16 mx-auto mb-4 opacity-20" />
        <p className="text-lg">阵容信息待更新</p>
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
    <div className="space-y-5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">主教练</span>
        <span className="font-medium text-foreground">{squad.coach}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">阵型</span>
        <span className="font-medium text-foreground">{squad.formation}</span>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      <div className="space-y-6">
        {positionOrder.map((position) => {
          const players = groupedPlayers[position];
          if (!players?.length) return null;
          return (
            <div key={position}>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">
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

  const beijingTime = convertToBeijingTime(match.date, match.time);
  const timeOfDay = getTimeOfDay(beijingTime.time);
  const bjDateDisplay = formatBeijingDate(beijingTime);

  const handleAddToCalendar = () => {
    const dateStr = match.date.replace(/-/g, "");
    const [hours, minutes] = match.time.split(":");
    const startTime = `${dateStr}T${hours}${minutes}00`;
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
    <div className="min-h-screen bg-background relative">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[80px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass-strong border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl glass border border-border/50 text-muted-foreground hover:text-foreground transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              返回赛程
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-accent" />
              </div>
              <span className="font-medium text-foreground">2026 世界杯</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 relative">
        {/* Match Hero Card */}
        <div className="rounded-3xl glass border border-border/50 p-8 md:p-12 mb-8 glow-subtle">
          {/* Stage Badge */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium bg-accent/20 text-accent border border-accent/30">
              {getStageLabel(match.stage)}
              {match.group && ` · ${match.group}组`}
            </span>
          </div>

          {/* Teams */}
          <div className="flex items-center justify-center gap-6 md:gap-12 mb-10">
            {/* Home Team */}
            <div className="flex-1 text-center">
              {homeFlag && !isTBD ? (
                <img
                  src={homeFlag}
                  alt={match.homeTeam}
                  className="w-24 h-16 md:w-32 md:h-24 object-cover rounded-2xl shadow-2xl mx-auto mb-4"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-24 h-16 md:w-32 md:h-24 bg-muted/50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                  TBD
                </div>
              )}
              <h2 className="text-xl md:text-3xl font-bold text-foreground">{match.homeTeam}</h2>
            </div>

            {/* VS */}
            <div className="px-5 py-3 rounded-2xl glass border border-border/50 text-xl md:text-2xl font-bold text-muted-foreground">
              VS
            </div>

            {/* Away Team */}
            <div className="flex-1 text-center">
              {awayFlag && !isTBD ? (
                <img
                  src={awayFlag}
                  alt={match.awayTeam}
                  className="w-24 h-16 md:w-32 md:h-24 object-cover rounded-2xl shadow-2xl mx-auto mb-4"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-24 h-16 md:w-32 md:h-24 bg-muted/50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                  TBD
                </div>
              )}
              <h2 className="text-xl md:text-3xl font-bold text-foreground">{match.awayTeam}</h2>
            </div>
          </div>

          {/* Large Time Display */}
          <div className="text-center mb-8">
            <div className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-2">
              {beijingTime.time}
            </div>
            <p className="text-lg text-muted-foreground">
              {timeOfDay} · 北京时间
            </p>
          </div>

          {/* Match Info */}
          <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base text-muted-foreground">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/30">
              <Calendar className="w-5 h-5 text-accent" />
              <span>{bjDateDisplay}</span>
            </div>
            {match.venue !== "TBD" && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/30">
                <MapPin className="w-5 h-5 text-accent" />
                <span>{match.venue}, {match.city}</span>
              </div>
            )}
          </div>

          {/* Add to Calendar Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleAddToCalendar}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all"
            >
              <Download className="w-4 h-4" />
              添加到日历
            </button>
          </div>
        </div>

        {/* Team Squads */}
        {!isTBD && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Home Team Squad */}
            <div className="rounded-2xl glass border border-border/50 p-6">
              <div className="flex items-center gap-4 mb-6">
                {homeFlag && (
                  <img
                    src={getFlagUrl(match.homeTeam, 60)}
                    alt={match.homeTeam}
                    className="w-10 h-7 object-cover rounded-lg shadow-lg"
                    crossOrigin="anonymous"
                  />
                )}
                <h3 className="text-xl font-bold text-foreground">{match.homeTeam} 阵容</h3>
              </div>
              <TeamSquadSection team={match.homeTeam} />
            </div>

            {/* Away Team Squad */}
            <div className="rounded-2xl glass border border-border/50 p-6">
              <div className="flex items-center gap-4 mb-6">
                {awayFlag && (
                  <img
                    src={getFlagUrl(match.awayTeam, 60)}
                    alt={match.awayTeam}
                    className="w-10 h-7 object-cover rounded-lg shadow-lg"
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
