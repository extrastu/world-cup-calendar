import { Metadata } from "next";
import { TeamsClient } from "./teams-client";

export const metadata: Metadata = {
  title: "球队 | 2026 FIFA 世界杯",
  description: "2026年FIFA世界杯48支参赛球队完整名单，包含各大洲球队分布和小组分配信息。",
  keywords: ["世界杯球队", "FIFA 2026", "参赛国家", "48支球队"],
};

export default function TeamsPage() {
  return <TeamsClient />;
}
