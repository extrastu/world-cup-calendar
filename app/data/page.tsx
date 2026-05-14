import { Metadata } from "next";
import { DataOverviewClient } from "./data-overview-client";

export const metadata: Metadata = {
  title: "完整数据披露 | 2026世界杯日历",
  description: "2026年FIFA世界杯完整数据披露：48支参赛球队、12个小组、16座比赛场馆、104场比赛详细信息。方便球迷查漏补缺，不错过任何精彩。",
  keywords: [
    "2026世界杯数据",
    "世界杯球队名单",
    "世界杯场馆",
    "世界杯分组",
    "48支球队",
    "世界杯统计",
  ],
};

export default function DataPage() {
  return <DataOverviewClient />;
}
