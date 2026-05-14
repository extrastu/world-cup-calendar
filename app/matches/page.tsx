import { Metadata } from "next";
import { MatchesClient } from "./matches-client";

export const metadata: Metadata = {
  title: "赛程 | 2026 FIFA 世界杯",
  description: "2026年FIFA世界杯完整赛程表，包含104场比赛的时间、场馆和对阵信息，自动转换为北京时间。",
  keywords: ["世界杯赛程", "FIFA 2026", "比赛时间表", "北京时间"],
};

export default function MatchesPage() {
  return <MatchesClient />;
}
