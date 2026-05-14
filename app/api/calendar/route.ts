import { matches } from "@/lib/matches-data";
import { NextResponse } from "next/server";

function getStageLabel(stage: string): string {
  const labels: Record<string, string> = {
    group: "Group Stage",
    "round-of-32": "Round of 32",
    "round-of-16": "Round of 16",
    "quarter-final": "Quarter Final",
    "semi-final": "Semi Final",
    "third-place": "Third Place",
    final: "Final",
  };
  return labels[stage] || stage;
}

export async function GET() {
  // 生成完整的 ICS 日历文件
  const events = matches.map((match) => {
    const dateStr = match.date.replace(/-/g, "");
    const [hours, minutes] = match.time.split(":");
    const startTime = `${dateStr}T${hours}${minutes}00`;
    
    // 比赛时长约2小时
    const endHour = (parseInt(hours) + 2).toString().padStart(2, "0");
    const endTime = `${dateStr}T${endHour}${minutes}00`;

    const summary = `${match.homeTeam} vs ${match.awayTeam}`;
    const description = `2026 FIFA World Cup - ${getStageLabel(match.stage)}${match.group ? ` Group ${match.group}` : ""}\\n\\nVenue: ${match.venue}\\nCity: ${match.city}\\nTime: ${match.time} ET`;
    const location = match.venue !== "TBD" ? `${match.venue}, ${match.city}` : "TBD";

    return `BEGIN:VEVENT
UID:${match.id}@worldcup2026.calendar
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART;TZID=America/New_York:${startTime}
DTEND;TZID=America/New_York:${endTime}
SUMMARY:${summary}
DESCRIPTION:${description}
LOCATION:${location}
CATEGORIES:FIFA World Cup 2026
STATUS:CONFIRMED
TRANSP:OPAQUE
END:VEVENT`;
  });

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//2026 FIFA World Cup//Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:2026 FIFA World Cup
X-WR-CALDESC:Complete schedule for the 2026 FIFA World Cup in USA, Canada, and Mexico
X-WR-TIMEZONE:America/New_York
BEGIN:VTIMEZONE
TZID:America/New_York
BEGIN:DAYLIGHT
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
TZNAME:EDT
DTSTART:19700308T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
TZNAME:EST
DTSTART:19701101T020000
RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
END:STANDARD
END:VTIMEZONE
${events.join("\n")}
END:VCALENDAR`;

  return new NextResponse(icsContent, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "attachment; filename=fifa-world-cup-2026.ics",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
