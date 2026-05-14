import { matches } from "@/lib/matches-data";
import { convertToBeijingTime, formatBeijingDate } from "@/lib/timezone";
import { MatchDetailClient } from "./match-detail-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return matches.map((match) => ({
    id: match.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const match = matches.find((m) => m.id === id);
  
  if (!match) {
    return { title: "比赛未找到" };
  }

  const beijingTime = convertToBeijingTime(match.date, match.time);
  const bjDateDisplay = formatBeijingDate(beijingTime);
  const title = `${match.homeTeam} vs ${match.awayTeam} | ${match.stage}`;
  const description = `2026 FIFA World Cup ${match.stage}: ${match.homeTeam} vs ${match.awayTeam}. Beijing Time ${bjDateDisplay} ${beijingTime.time}. Venue: ${match.venue}, ${match.city}. 世界杯${match.stage === 'group' ? '小组赛' : match.stage}，北京时间。`;

  return {
    title,
    description,
    keywords: [
      match.homeTeam,
      match.awayTeam,
      '2026 FIFA World Cup Schedule',
      '世界杯赛程',
      'World Cup 2026 Calendar',
      match.stage,
      match.city,
      'World Cup Match',
    ],
    openGraph: {
      title: `${match.homeTeam} vs ${match.awayTeam} | CupCalendar`,
      description,
      type: 'article',
      images: ['/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${match.homeTeam} vs ${match.awayTeam} | CupCalendar`,
      description,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function MatchDetailPage({ params }: Props) {
  const { id } = await params;
  const match = matches.find((m) => m.id === id);

  if (!match) {
    notFound();
  }

  return <MatchDetailClient match={match} />;
}
