import { matches } from "@/lib/matches-data";
import { convertToBeijingTime } from "@/lib/timezone";
import { NextResponse } from "next/server";

function getStageLabel(stage: string): string {
  const labels: Record<string, string> = {
    group: "小组赛",
    "round-of-32": "32强赛",
    "round-of-16": "16强赛",
    "quarter-final": "四分之一决赛",
    "semi-final": "半决赛",
    "third-place": "三四名决赛",
    final: "决赛",
  };
  return labels[stage] || stage;
}

export async function GET() {
  // 生成完整的 ICS 日历文件（北京时间）
  const events = matches.map((match) => {
    // 转换为北京时间
    const beijingTime = convertToBeijingTime(match.date, match.time);
    const dateStr = beijingTime.date.replace(/-/g, "");
    const [hours, minutes] = beijingTime.time.split(":");
    const startTime = `${dateStr}T${hours}${minutes}00`;
    
    // 比赛时长约2小时
    let endHour = parseInt(hours) + 2;
    let endDate = beijingTime.date;
    
    if (endHour >= 24) {
      endHour -= 24;
      // 处理跨天
      const [year, month, day] = beijingTime.date.split("-").map(Number);
      const nextDay = new Date(year, month - 1, day + 1);
      endDate = `${nextDay.getFullYear()}-${(nextDay.getMonth() + 1).toString().padStart(2, "0")}-${nextDay.getDate().toString().padStart(2, "0")}`;
    }
    
    const endDateStr = endDate.replace(/-/g, "");
    const endTime = `${endDateStr}T${endHour.toString().padStart(2, "0")}${minutes}00`;

    const summary = `⚽ ${match.homeTeam} vs ${match.awayTeam}`;
    const description = `2026 FIFA 世界杯 - ${getStageLabel(match.stage)}${match.group ? ` ${match.group}组` : ""}\\n\\n场馆: ${match.venue}\\n城市: ${match.city}\\n北京时间: ${beijingTime.time}`;
    const location = match.venue !== "TBD" ? `${match.venue}, ${match.city}` : "待定";

    return `BEGIN:VEVENT
UID:${match.id}@worldcup2026.calendar
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART;TZID=Asia/Shanghai:${startTime}
DTEND;TZID=Asia/Shanghai:${endTime}
SUMMARY:${summary}
DESCRIPTION:${description}
LOCATION:${location}
CATEGORIES:FIFA World Cup 2026,足球,世界杯
STATUS:CONFIRMED
TRANSP:OPAQUE
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:比赛即将开始
TRIGGER:-PT30M
END:VALARM
END:VEVENT`;
  });

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//2026 FIFA World Cup//Calendar//CN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:2026 FIFA 世界杯
X-WR-CALDESC:2026年FIFA世界杯完整赛程（北京时间）- 美国、加拿大、墨西哥联合举办
X-WR-TIMEZONE:Asia/Shanghai
BEGIN:VTIMEZONE
TZID:Asia/Shanghai
BEGIN:STANDARD
TZOFFSETFROM:+0800
TZOFFSETTO:+0800
TZNAME:CST
DTSTART:19700101T000000
END:STANDARD
END:VTIMEZONE
${events.join("\n")}
END:VCALENDAR`;

  return new NextResponse(icsContent, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "attachment; filename=fifa-world-cup-2026-beijing-time.ics",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
