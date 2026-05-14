"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Home,
  Calendar,
  Users,
  HelpCircle,
  Info,
  CalendarPlus,
  Copy,
  Check,
  Smartphone,
  Monitor,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";

const navItems = [
  { id: "home", icon: Home, label: "首页", href: "/" },
  { id: "matches", icon: Calendar, label: "赛程", href: "/matches" },
  { id: "teams", icon: Users, label: "球队", href: "/teams" },
  { id: "groups", icon: Trophy, label: "小组", href: "/groups" },
  { id: "help", icon: HelpCircle, label: "帮助", href: "/help" },
  { id: "about", icon: Info, label: "关于", href: "/about" },
];

const CALENDAR_URL = "https://worldcuptimes.vercel.app/api/calendar";

export function SubscribeClient() {
  const [copied, setCopied] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("iphone");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CALENDAR_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log("Copy failed:", err);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
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
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/40"
              >
                <item.icon className="w-[18px] h-[18px]" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border/40">
          <p className="text-[11px] text-muted-foreground">
            &copy; 2026 CupCalendar
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Trophy className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="font-semibold text-foreground">CupCalendar</span>
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 px-6 md:px-10 py-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <CalendarPlus className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                  订阅日历
                </h1>
                <p className="text-sm text-muted-foreground">
                  将世界杯赛程添加到您的日历应用
                </p>
              </div>
            </div>
          </div>

          {/* Step 1: Copy URL */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground text-sm font-semibold">
                1
              </span>
              <h2 className="text-lg font-semibold text-foreground">复制订阅地址</h2>
            </div>
            
            <div className="bg-card rounded-xl border border-border/40 p-4">
              <p className="text-sm text-muted-foreground mb-4">
                点击下方按钮复制日历订阅地址，然后按照下方说明添加到您的日历应用中。
              </p>
              
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/40 mb-4">
                <code className="flex-1 text-sm text-foreground/90 break-all font-mono">
                  {CALENDAR_URL}
                </code>
              </div>
              
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-medium"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>复制订阅地址</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Step 2: Add to Calendar */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground text-sm font-semibold">
                2
              </span>
              <h2 className="text-lg font-semibold text-foreground">添加到日历应用</h2>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              选择您使用的设备或应用，按照说明添加订阅日历。
            </p>

            <div className="space-y-3">
              {/* iPhone/iPad */}
              <div className="bg-card rounded-xl border border-border/40 overflow-hidden">
                <button
                  onClick={() => toggleSection("iphone")}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">iPhone / iPad</span>
                  </div>
                  {expandedSection === "iphone" ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                {expandedSection === "iphone" && (
                  <div className="px-4 pb-4 border-t border-border/40">
                    <div className="pt-4">
                      <h4 className="text-sm font-medium text-foreground mb-3">iOS 18 或更高版本</h4>
                      <ol className="space-y-2.5 text-sm text-muted-foreground">
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium text-foreground">1</span>
                          <span>打开「日历」应用，轻点底部的「日历」按钮</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium text-foreground">2</span>
                          <span>轻点「添加日历」，然后选择「添加订阅日历」</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium text-foreground">3</span>
                          <span>粘贴刚才复制的订阅地址，轻点「订阅」</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium text-foreground">4</span>
                          <span>输入日历名称（如「世界杯」），选择颜色</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium text-foreground">5</span>
                          <span>在「账户」旁选择「iCloud」，轻点「添加」</span>
                        </li>
                      </ol>
                      
                      <div className="mt-4 p-3 bg-accent/5 rounded-lg border border-accent/20">
                        <p className="text-xs text-muted-foreground">
                          <span className="text-accent font-medium">提示：</span> 选择 iCloud 账户可以在所有 Apple 设备上同步日历。
                        </p>
                      </div>

                      <a
                        href="https://support.apple.com/zh-cn/102301"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-4 text-sm text-accent hover:underline"
                      >
                        查看 Apple 官方说明 <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Mac */}
              <div className="bg-card rounded-xl border border-border/40 overflow-hidden">
                <button
                  onClick={() => toggleSection("mac")}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Monitor className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">Mac</span>
                  </div>
                  {expandedSection === "mac" ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                {expandedSection === "mac" && (
                  <div className="px-4 pb-4 border-t border-border/40">
                    <div className="pt-4">
                      <ol className="space-y-2.5 text-sm text-muted-foreground">
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium text-foreground">1</span>
                          <span>打开「日历」应用</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium text-foreground">2</span>
                          <span>选择菜单栏「文件」&gt;「新建日历订阅」</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium text-foreground">3</span>
                          <span>粘贴订阅地址，点按「订阅」</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium text-foreground">4</span>
                          <span>输入日历名称，选择颜色</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium text-foreground">5</span>
                          <span>在「位置」旁选择「iCloud」，点按「确定」</span>
                        </li>
                      </ol>

                      <a
                        href="https://support.apple.com/zh-cn/102301"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-4 text-sm text-accent hover:underline"
                      >
                        查看 Apple 官方说明 <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Google Calendar */}
              <div className="bg-card rounded-xl border border-border/40 overflow-hidden">
                <button
                  onClick={() => toggleSection("google")}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">Google 日历</span>
                  </div>
                  {expandedSection === "google" ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                {expandedSection === "google" && (
                  <div className="px-4 pb-4 border-t border-border/40">
                    <div className="pt-4">
                      <ol className="space-y-2.5 text-sm text-muted-foreground">
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium text-foreground">1</span>
                          <span>在电脑上打开 <a href="https://calendar.google.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google 日历</a></span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium text-foreground">2</span>
                          <span>点击左侧「其他日历」旁的「+」按钮</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium text-foreground">3</span>
                          <span>选择「通过网址添加」</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium text-foreground">4</span>
                          <span>粘贴订阅地址，点击「添加日历」</span>
                        </li>
                      </ol>

                      <div className="mt-4 p-3 bg-accent/5 rounded-lg border border-accent/20">
                        <p className="text-xs text-muted-foreground">
                          <span className="text-accent font-medium">注意：</span> Google 日历只能在网页版添加订阅，添加后会自动同步到手机 App。
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Outlook */}
              <div className="bg-card rounded-xl border border-border/40 overflow-hidden">
                <button
                  onClick={() => toggleSection("outlook")}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">Outlook</span>
                  </div>
                  {expandedSection === "outlook" ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                {expandedSection === "outlook" && (
                  <div className="px-4 pb-4 border-t border-border/40">
                    <div className="pt-4">
                      <ol className="space-y-2.5 text-sm text-muted-foreground">
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium text-foreground">1</span>
                          <span>打开 <a href="https://outlook.live.com/calendar" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Outlook 网页版</a></span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium text-foreground">2</span>
                          <span>点击「添加日历」</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium text-foreground">3</span>
                          <span>选择「从 Web 订阅」</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium text-foreground">4</span>
                          <span>粘贴订阅地址，输入名称，点击「导入」</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">常见问题</h2>
            
            <div className="space-y-3">
              <div className="bg-card rounded-xl border border-border/40 p-4">
                <h3 className="font-medium text-foreground mb-2">订阅和下载有什么区别？</h3>
                <p className="text-sm text-muted-foreground">
                  订阅日历会自动同步更新，当赛程有变化时会自动更新到您的日历。下载则是一次性导入，不会自动更新。
                </p>
              </div>
              
              <div className="bg-card rounded-xl border border-border/40 p-4">
                <h3 className="font-medium text-foreground mb-2">如何取消订阅？</h3>
                <p className="text-sm text-muted-foreground">
                  请参考 <Link href="/help" className="text-accent hover:underline">帮助页面</Link> 中的「取消日历订阅」部分，有各平台的详细取消步骤。
                </p>
              </div>
              
              <div className="bg-card rounded-xl border border-border/40 p-4">
                <h3 className="font-medium text-foreground mb-2">日历多久同步一次？</h3>
                <p className="text-sm text-muted-foreground">
                  不同日历应用的同步频率不同。Apple 日历通常每周同步一次，Google 日历约每 12-24 小时同步一次。您也可以手动刷新日历。
                </p>
              </div>
            </div>
          </div>

          {/* Alternative Download */}
          <div className="bg-muted/20 rounded-xl border border-border/40 p-4">
            <h3 className="font-medium text-foreground mb-2">不想订阅？也可以直接下载</h3>
            <p className="text-sm text-muted-foreground mb-4">
              如果您只想一次性导入赛程，可以下载 ICS 文件直接导入日历。注意：下载方式不会自动更新。
            </p>
            <a
              href="/api/calendar"
              download="fifa-world-cup-2026.ics"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/40 text-sm font-medium text-foreground hover:bg-muted/40 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              下载 ICS 文件
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
