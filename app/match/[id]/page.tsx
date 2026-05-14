import { matches } from "@/lib/matches-data";
import { MatchDetailClient } from "./match-detail-client";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return matches.map((match) => ({
    id: match.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const match = matches.find((m) => m.id === id);
  
  if (!match) {
    return { title: "比赛未找到" };
  }

  return {
    title: `${match.homeTeam} vs ${match.awayTeam} | 2026世界杯`,
    description: `2026年FIFA世界杯 ${match.homeTeam} 对阵 ${match.awayTeam}，${match.date} ${match.time}，${match.venue}`,
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
