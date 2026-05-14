import { Metadata } from "next";
import { AboutClient } from "./about-client";

export const metadata: Metadata = {
  title: "关于 - CupCalendar",
  description: "关于 CupCalendar 世界杯日历工具",
};

export default function AboutPage() {
  return <AboutClient />;
}
