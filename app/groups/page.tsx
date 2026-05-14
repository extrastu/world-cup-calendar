import { Metadata } from "next";
import { GroupsClient } from "./groups-client";

export const metadata: Metadata = {
  title: "小组 | 2026 FIFA 世界杯",
  description: "2026年FIFA世界杯12个小组完整分组情况，包含各小组球队和比赛信息。",
  keywords: ["世界杯小组", "FIFA 2026", "小组赛", "分组抽签"],
};

export default function GroupsPage() {
  return <GroupsClient />;
}
