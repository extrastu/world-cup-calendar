"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Calendar,
  Trophy,
  Users,
  Info,
  CalendarPlus,
  ArrowLeft,
  Github,
  Mail,
  Globe,
} from "lucide-react";

export function AboutClient() {
  const [activeNav, setActiveNav] = useState("about");

  const navItems = [
    { id: "home", icon: Home, label: "首页", href: "/" },
    { id: "matches", icon: Calendar, label: "赛程", href: "/matches" },
    { id: "teams", icon: Users, label: "球队", href: "/teams" },
    { id: "groups", icon: Trophy, label: "小组", href: "/groups" },
    { id: "about", icon: Info, label: "关于", href: "/about" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 border-r border-border/50 bg-card/20 sticky top-0 h-screen overflow-y-auto">
        {/* Logo */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/80 to-accent flex items-center justify-center">
              <Trophy className="w-4 h-4 text-accent-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">CupCalendar</h1>
              <p className="text-xs text-muted-foreground">FIFA 2026</p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  activeNav === item.id
                    ? "bg-muted/50 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Subscribe CTA */}
        <div className="p-4 m-4 rounded-xl bg-card/50 border border-border/50">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted/50 mb-3">
            <CalendarPlus className="w-5 h-5 text-muted-foreground" />
          </div>
          <h3 className="font-medium text-foreground text-sm mb-1">
            不错过任何比赛
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            订阅日历，开赛前收到提醒
          </p>
          <Link
            href="/subscribe"
            className="block w-full text-center px-3 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
          >
            立即订阅
          </Link>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
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
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold text-foreground">关于</span>
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 px-4 md:px-8 py-8 max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">关于 CupCalendar</h1>

          {/* Project Description */}
          <section className="mb-8">
            <div className="bg-card/30 rounded-xl border border-border/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">项目介绍</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                CupCalendar 是一个专为中国球迷打造的 2026 年 FIFA 世界杯赛程查询工具。
                我们提供完整的 104 场比赛赛程，支持自动转换为北京时间及多个时区，
                并提供日历订阅功能，让您不错过任何一场精彩比赛。
              </p>
              <p className="text-muted-foreground leading-relaxed">
                2026 年世界杯将于 6 月 11 日至 7 月 19 日在美国、加拿大和墨西哥三国举办，
                届时将有 48 支球队参赛，这是世界杯历史上首次由三个国家联合举办。
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mb-8">
            <div className="bg-card/30 rounded-xl border border-border/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <Info className="w-5 h-5 text-yellow-500" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">免责声明</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">非官方项目：</strong>
                  本网站为个人开发的非官方项目，与 FIFA（国际足球联合会）、
                  2026 世界杯组委会及任何官方机构无关。
                </p>
                <p>
                  <strong className="text-foreground">数据来源：</strong>
                  赛程数据来源于公开信息，仅供参考。实际比赛时间可能因各种原因调整，
                  请以 FIFA 官方公布的信息为准。
                </p>
                <p>
                  <strong className="text-foreground">商标声明：</strong>
                  FIFA、FIFA World Cup 及相关标识均为国际足球联合会的注册商标。
                  本网站使用这些名称仅用于描述目的，不代表任何官方认可或授权。
                </p>
                <p>
                  <strong className="text-foreground">时区转换：</strong>
                  时区转换功能基于标准时区偏移计算，可能不包含夏令时等特殊情况的调整，
                  请用户自行核实重要比赛的具体时间。
                </p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="mb-8">
            <div className="bg-card/30 rounded-xl border border-border/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">主要功能</h2>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>完整的 104 场比赛赛程，包括小组赛、淘汰赛直至决赛</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>支持多时区切换，包括北京、东京、新加坡、伦敦、巴黎、纽约、洛杉矶等</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>iCal 日历订阅，可同步到 Apple 日历、Google 日历、Outlook 等应用</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>48 支参赛球队信息，按大洲分类展示</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>12 个小组详情，包含分组抽签结果和小组赛程</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <div className="bg-card/30 rounded-xl border border-border/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">联系我们</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                如果您发现任何问题或有建议，欢迎通过以下方式联系我们：
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/extrastu/world-cup-calendar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors text-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </section>

          {/* Copyright */}
          <section>
            <div className="text-center text-sm text-muted-foreground py-8 border-t border-border/50">
              <p>&copy; 2026 CupCalendar. 保留所有权利。</p>
              <p className="mt-2">Made with passion for football fans.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
