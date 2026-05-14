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
  const description = `2026年FIFA世界杯 ${match.stage}：${match.homeTeam} 对阵 ${match.awayTeam}。北京时间 ${bjDateDisplay} ${beijingTime.time}，场馆：${match.venue}，${match.city}。查看双方球队阵容和比赛详情。`;

  return {
    title,
    description,
    keywords: [
      match.homeTeam,
      match.awayTeam,
      '2026世界杯',
      match.stage,
      '世界杯比赛',
      '北京时间',
      match.city,
      '球队阵容',
    ],
    openGraph: {
      title: `${match.homeTeam} vs ${match.awayTeam} | 2026世界杯`,
      description,
      type: 'article',
      images: ['/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${match.homeTeam} vs ${match.awayTeam}`,
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
