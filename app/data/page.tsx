import { Metadata } from "next";
import { DataOverviewClient } from "./data-overview-client";

export const metadata: Metadata = {
  title: "Data Overview | 数据总览",
  description: "Complete 2026 FIFA World Cup data: 48 teams, 12 groups, 16 venues, 104 matches. 世界杯完整数据披露，球队名单、场馆信息、比赛统计。",
  keywords: [
    "2026 FIFA World Cup Schedule",
    "世界杯赛程",
    "World Cup 2026 Calendar",
    "World Cup Data",
    "World Cup Teams",
    "World Cup Venues",
    "World Cup Groups",
    "世界杯数据",
    "世界杯球队",
  ],
};

export default function DataPage() {
  return <DataOverviewClient />;
}
