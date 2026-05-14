"use client";

import { useState } from "react";
import { groups, groupTeams, matches, teamCountryCodes } from "@/lib/matches-data";
import { convertToTimezone, timezoneOptions, TimezoneOption } from "@/lib/timezone";
import Link from "next/link";
import {
  Home,
  Trophy,
  Calendar,
  Users,
  Eye,
  CalendarPlus,
  Info,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Globe,
  ChevronRight,
} from "lucide-react";

function getFlagUrl(team: string, size: number = 80): string {
  const code = teamCountryCodes[team];
  if (!code) return "";
  if (code === "GB-SCT") return `https://flagcdn.com/w${size}/gb-sct.png`;
  if (code === "GB-ENG") return `https://flagcdn.com/w${size}/gb-eng.png`;
  if (code === "GB-WLS") return `https://flagcdn.com/w${size}/gb-wls.png`;
  if (code === "GB-NIR") return `https://flagcdn.com/w${size}/gb-nir.png`;
  if (code === "EU") return "https://flagcdn.com/w160/eu.png";
  if (code === "UN") return "https://flagcdn.com/w160/un.png";
  return `https://flagcdn.com/w${size}/${code.toLowerCase()}.png`;
}

export function GroupsClient() {
  const [activeNav, setActiveNav] = useState("groups");
  const [expandedGroup, setExpandedGroup] = useState<string | null>("A");
  const [selectedTimezone, setSelectedTimezone] = useState<TimezoneOption>(timezoneOptions[0]);
  const [showTimezoneDropdown, setShowTimezoneDropdown] = useState(false);

  const navItems = [
    { id: "home", icon: Home, label: "首页", href: "/" },
    { id: "matches", icon: Calendar, label: "赛程", href: "/matches" },
    { id: "teams", icon: Users, label: "球队", href: "/teams" },
    { id: "groups", icon: Trophy, label: "小组", href: "/groups" },
    { id: "help", icon: HelpCircle, label: "帮助", href: "/help" },
    { id: "about", icon: Info, label: "关于", href: "/about" },
  ];

  // Get matches for a group
  const getGroupMatches = (group: string) => {
    return matches.filter((m) => m.group === group && m.stage === "group");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 border-r border-border/40 bg-sidebar sticky top-0 h-screen overflow-y-auto">
        {/* Logo */}
        <div className="p-5 border-b border-border/40">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
              <Trophy className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground tracking-tight">CupCalendar</h1>
              <p className="text-[11px] text-muted-foreground">FIFA World Cup 2026</p>
            </div>
          </Link>
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
          <a
            href="/api/calendar"
            download="fifa-world-cup-2026.ics"
            className="block w-full text-center px-3 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
          >
            立即订阅
          </a>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border/40">
          <p className="text-[11px] text-muted-foreground">
            &copy; 2026 CupCalendar
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40">
          <div className="px-6 md:px-10 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-foreground tracking-tight">小组分布</h1>
                <p className="text-sm text-muted-foreground">
                  12个小组，每组4支球队
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    onClick={() => setShowTimezoneDropdown(!showTimezoneDropdown)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 border border-border/40 hover:bg-card/80 hover:border-border/60 transition-all cursor-pointer"
                  >
                    <Globe className="w-4 h-4 text-accent" />
                    <span className="text-sm text-foreground/90">
                      {selectedTimezone.label}
                    </span>
                    <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${showTimezoneDropdown ? 'rotate-90' : ''}`} />
                  </button>
                  {showTimezoneDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-60 bg-popover border border-border/60 rounded-xl shadow-xl z-50 py-2 backdrop-blur-xl">
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
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border/40">
                  <Trophy className="w-4 h-4 text-accent" />
                  <span className="text-sm text-muted-foreground">48队 · 72场</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Groups Grid */}
        <main className="px-6 md:px-10 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {groups.map((group) => {
              const teams = groupTeams[group];
              const groupMatches = getGroupMatches(group);
              const isExpanded = expandedGroup === group;

              return (
                <div
                  key={group}
                  className="rounded-xl bg-card border border-border/40 overflow-hidden"
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
                          const convertedTime = convertToTimezone(
                            match.date,
                            match.time,
                            selectedTimezone.offset
                          );
                          const [, month, day] = convertedTime.date
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
                                    {convertedTime.time}
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
          <div className="mt-8 p-5 rounded-xl bg-card border border-border/40">
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
    </div>
  );
}
