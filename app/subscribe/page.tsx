import { SubscribeClient } from "./subscribe-client";

export const metadata = {
  title: "订阅日历 - CupCalendar",
  description: "订阅2026世界杯日历到您的设备",
};

export default function SubscribePage() {
  return <SubscribeClient />;
}
