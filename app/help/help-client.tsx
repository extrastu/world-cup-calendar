"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Calendar,
  Trophy,
  Users,
  CalendarPlus,
  Info,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Apple,
  Smartphone,
  Monitor,
  Mail,
} from "lucide-react";

export function HelpClient() {
  const [activeNav, setActiveNav] = useState("help");
  const [openSections, setOpenSections] = useState<string[]>(["unsubscribe-mac"]);

  const navItems = [
    { id: "home", icon: Home, label: "首页", href: "/" },
    { id: "matches", icon: Calendar, label: "赛程", href: "/matches" },
    { id: "teams", icon: Users, label: "球队", href: "/teams" },
    { id: "groups", icon: Trophy, label: "小组", href: "/groups" },
    { id: "help", icon: HelpCircle, label: "帮助", href: "/help" },
    { id: "about", icon: Info, label: "关于", href: "/about" },
  ];

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 border-r border-border/40 bg-sidebar sticky top-0 h-screen overflow-y-auto">
        {/* Logo */}
        <div className="p-5 border-b border-border/40">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
              <Trophy className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground tracking-tight">CupCalendar</h1>
              <p className="text-[11px] text-muted-foreground">FIFA World Cup 2026</p>
            </div>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-3">
          <div className="space-y-0.5">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeNav === item.id
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                <item.icon className="w-[18px] h-[18px]" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Subscribe CTA */}
        <div className="p-3 mx-3 mb-3 rounded-xl bg-muted/30 border border-border/40">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 mb-3">
            <CalendarPlus className="w-5 h-5 text-accent" />
          </div>
          <h3 className="font-medium text-foreground text-sm mb-1">
            不错过任何比赛
          </h3>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            订阅日历，开赛前收到提醒
          </p>
          <a
            href="/api/calendar"
            download="fifa-world-cup-2026.ics"
            className="block w-full text-center px-3 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
          >
            立即订阅
          </a>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border/40">
          <p className="text-[11px] text-muted-foreground">
            &copy; 2026 CupCalendar
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="max-w-3xl mx-auto px-6 md:px-10 py-10 md:py-16">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                  帮助中心
                </h1>
                <p className="text-sm text-muted-foreground">常见问题和使用指南</p>
              </div>
            </div>
          </div>

          {/* Calendar Unsubscribe Section */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-5 rounded-full bg-accent" />
              <h2 className="text-lg font-semibold text-foreground tracking-tight">
                如何取消日历订阅
              </h2>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              订阅的日历与普通日历事件不同，无法通过删除单个事件来取消。您需要在日历应用中取消订阅整个日历源。以下是各平台的详细步骤：
            </p>

            {/* Mac Calendar */}
            <div className="bg-card rounded-xl border border-border/40 overflow-hidden mb-4">
              <button
                onClick={() => toggleSection("unsubscribe-mac")}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Apple className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">Mac 日历 (macOS)</span>
                </div>
                {openSections.includes("unsubscribe-mac") ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              {openSections.includes("unsubscribe-mac") && (
                <div className="px-5 pb-5 border-t border-border/40">
                  <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">1</span>
                      <span>打开 <strong className="text-foreground">日历</strong> 应用</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">2</span>
                      <span>在左侧边栏找到 <strong className="text-foreground">FIFA World Cup 2026</strong> 日历（如果看不到边栏，按 <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-xs">⌘ + Option + S</code>）</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">3</span>
                      <span>右键点击该日历，选择 <strong className="text-foreground">取消订阅</strong></span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">4</span>
                      <span>在弹出的确认对话框中点击 <strong className="text-foreground">取消订阅</strong></span>
                    </li>
                  </ol>
                  <div className="mt-4 p-3 rounded-lg bg-muted/30 text-xs text-muted-foreground">
                    <strong className="text-foreground">提示：</strong> 如果在 iCloud 中订阅，需要在 iCloud.com 或所有设备上取消才能完全移除。
                  </div>
                </div>
              )}
            </div>

            {/* iPhone/iPad Calendar */}
            <div className="bg-card rounded-xl border border-border/40 overflow-hidden mb-4">
              <button
                onClick={() => toggleSection("unsubscribe-ios")}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">iPhone / iPad 日历 (iOS)</span>
                </div>
                {openSections.includes("unsubscribe-ios") ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              {openSections.includes("unsubscribe-ios") && (
                <div className="px-5 pb-5 border-t border-border/40">
                  <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">1</span>
                      <span>打开 <strong className="text-foreground">设置</strong> 应用</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">2</span>
                      <span>向下滚动并点击 <strong className="text-foreground">日历</strong></span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">3</span>
                      <span>点击 <strong className="text-foreground">账户</strong></span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">4</span>
                      <span>点击 <strong className="text-foreground">已订阅的日历</strong></span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">5</span>
                      <span>找到并点击 <strong className="text-foreground">FIFA World Cup 2026</strong></span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">6</span>
                      <span>点击底部的 <strong className="text-foreground text-red-400">删除账户</strong></span>
                    </li>
                  </ol>
                  <div className="mt-4 p-3 rounded-lg bg-muted/30 text-xs text-muted-foreground">
                    <strong className="text-foreground">另一种方法：</strong> 打开日历 App → 点击底部「日历」→ 点击订阅日历旁的 (i) 按钮 → 点击「删除日历」
                  </div>
                </div>
              )}
            </div>

            {/* Google Calendar */}
            <div className="bg-card rounded-xl border border-border/40 overflow-hidden mb-4">
              <button
                onClick={() => toggleSection("unsubscribe-google")}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">Google 日历</span>
                </div>
                {openSections.includes("unsubscribe-google") ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              {openSections.includes("unsubscribe-google") && (
                <div className="px-5 pb-5 border-t border-border/40">
                  <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">1</span>
                      <span>在电脑上打开 <a href="https://calendar.google.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google 日历</a></span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">2</span>
                      <span>在左侧边栏的「其他日历」下找到 <strong className="text-foreground">FIFA World Cup 2026</strong></span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">3</span>
                      <span>点击日历名称旁的三个点图标</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">4</span>
                      <span>选择 <strong className="text-foreground">设置</strong></span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">5</span>
                      <span>滚动到底部，点击 <strong className="text-foreground text-red-400">取消订阅</strong></span>
                    </li>
                  </ol>
                </div>
              )}
            </div>

            {/* Outlook */}
            <div className="bg-card rounded-xl border border-border/40 overflow-hidden mb-4">
              <button
                onClick={() => toggleSection("unsubscribe-outlook")}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">Outlook 日历</span>
                </div>
                {openSections.includes("unsubscribe-outlook") ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              {openSections.includes("unsubscribe-outlook") && (
                <div className="px-5 pb-5 border-t border-border/40">
                  <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">1</span>
                      <span>打开 <strong className="text-foreground">Outlook</strong> 日历</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">2</span>
                      <span>在左侧日历列表中找到 <strong className="text-foreground">FIFA World Cup 2026</strong></span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">3</span>
                      <span>右键点击该日历</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">4</span>
                      <span>选择 <strong className="text-foreground">删除</strong> 或 <strong className="text-foreground">移除</strong></span>
                    </li>
                  </ol>
                  <div className="mt-4 p-3 rounded-lg bg-muted/30 text-xs text-muted-foreground">
                    <strong className="text-foreground">网页版：</strong> 在 outlook.com 中，点击日历名称旁的三个点 → 选择「移除」
                  </div>
                </div>
              )}
            </div>

            {/* Windows Calendar */}
            <div className="bg-card rounded-xl border border-border/40 overflow-hidden">
              <button
                onClick={() => toggleSection("unsubscribe-windows")}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">Windows 日历</span>
                </div>
                {openSections.includes("unsubscribe-windows") ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              {openSections.includes("unsubscribe-windows") && (
                <div className="px-5 pb-5 border-t border-border/40">
                  <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">1</span>
                      <span>打开 <strong className="text-foreground">日历</strong> 应用</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">2</span>
                      <span>点击左下角的 <strong className="text-foreground">设置</strong>（齿轮图标）</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">3</span>
                      <span>选择 <strong className="text-foreground">管理账户</strong></span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center">4</span>
                      <span>找到订阅的日历账户，点击 <strong className="text-foreground">删除账户</strong></span>
                    </li>
                  </ol>
                </div>
              )}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-5 rounded-full bg-accent" />
              <h2 className="text-lg font-semibold text-foreground tracking-tight">
                常见问题
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-card rounded-xl border border-border/40 p-5">
                <h3 className="font-medium text-foreground mb-2">为什么我删除了事件但它又出现了？</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  订阅的日历会定期与服务器同步，所以单独删除事件后会再次同步回来。要彻底删除，需要取消订阅整个日历（按照上面的步骤操作）。
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border/40 p-5">
                <h3 className="font-medium text-foreground mb-2">日历时间显示不正确怎么办？</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  请确保您的设备时区设置正确。我们的日历文件包含了准确的时区信息，您的日历应用会自动转换为当地时间。如果仍有问题，可以尝试取消订阅后重新订阅。
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border/40 p-5">
                <h3 className="font-medium text-foreground mb-2">如何调整比赛提醒时间？</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  默认提醒设置为比赛开始前 30 分钟。您可以在日历应用中编辑单个事件的提醒设置，或在日历设置中更改默认提醒时间。
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border/40 p-5">
                <h3 className="font-medium text-foreground mb-2">日历会自动更新吗？</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  是的，订阅的日历会定期自动同步更新。如果比赛时间有变动，您的日历会自动获取最新信息。同步频率取决于您的日历应用设置，通常为几小时到一天。
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-5 rounded-full bg-accent" />
              <h2 className="text-lg font-semibold text-foreground tracking-tight">
                需要更多帮助？
              </h2>
            </div>

            <div className="bg-card rounded-xl border border-border/40 p-5">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                如果您遇到其他问题或有任何建议，欢迎通过以下方式联系我们：
              </p>
              <a
                href="https://github.com/extrastu/world-cup-calendar/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors text-sm font-medium text-foreground"
              >
                在 GitHub 提交 Issue
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
