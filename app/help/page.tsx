import { Metadata } from "next";
import { HelpClient } from "./help-client";

export const metadata: Metadata = {
  title: "帮助中心 - CupCalendar",
  description: "CupCalendar 使用帮助和常见问题解答",
};

export default function HelpPage() {
  return <HelpClient />;
}
