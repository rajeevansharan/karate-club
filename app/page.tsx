"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  ClipboardCheck,
  GraduationCap,
  Trophy,
  Award,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  TrendingUp,
  Search,
  Bell,
  Filter,
} from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Navigation menu items matching the image
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Students", icon: Users },
    { name: "Instructors", icon: UserCheck },
    { name: "Classes & Schedule", icon: Calendar },
    { name: "Attendance", icon: ClipboardCheck },
    { name: "Belt & Grading", icon: GraduationCap },
    { name: "Tournaments", icon: Trophy },
    { name: "Achievements", icon: Award },
    { name: "Memberships & Payments", icon: CreditCard },
    { name: "Settings", icon: Settings },
  ];

  // Stat cards data matching exact screenshot
  const statCards = [
    {
      title: "TOTAL STUDENTS",
      value: "28",
      icon: Users,
    },
    {
      title: "ACTIVE STUDENTS",
      value: "23",
      icon: UserCheck,
    },
    {
      title: "INSTRUCTORS",
      value: "4",
      icon: Users,
    },
    {
      title: "CLASSES TODAY",
      value: "1",
      icon: Calendar,
    },
    {
      title: "ATTENDANCE TODAY",
      value: "5/5",
      icon: ClipboardCheck,
    },
    {
      title: "UPCOMING GRADINGS",
      value: "2",
      icon: GraduationCap,
    },
    {
      title: "UPCOMING TOURNAMENTS",
      value: "2",
      icon: Trophy,
    },
    {
      title: "PENDING PAYMENTS",
      value: "10",
      subtext: "LKR 187,000",
      valueColor: "text-[#9E1B28]",
      icon: CreditCard,
    },
  ];

  // Data for Student Growth Chart
  const growthData = [
    { month: "Jan", val: 23 },
    { month: "Feb", val: 24 },
    { month: "Mar", val: 25 },
    { month: "Apr", val: 26 },
    { month: "May", val: 27 },
    { month: "Jun", val: 27 },
    { month: "Jul", val: 28 },
    { month: "Aug", val: 28 },
  ];

  // Data for Attendance Rate Chart
  const attendanceData = [
    { month: "Mar", rate: 0 },
    { month: "Apr", rate: 0 },
    { month: "May", rate: 0 },
    { month: "Jun", rate: 85 },
    { month: "Jul", rate: 85 },
    { month: "Aug", rate: 80 },
  ];

  // Hover state for interactive tooltips
  const [hoveredGrowth, setHoveredGrowth] = useState<{ month: string; val: number } | null>(null);
  const [hoveredAttendance, setHoveredAttendance] = useState<{ month: string; rate: number } | null>(null);

  return (
    <div className="flex h-screen w-screen bg-[#F5F5F7] font-sans antialiased text-[#1C1C1E] overflow-hidden select-none">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white border-r border-[#E5E5EA] flex flex-col justify-between p-4 shrink-0 z-10">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 py-2 mb-6">
            <div className="w-9 h-9 bg-[#9E1B28] rounded-xl flex items-center justify-center shadow-sm shrink-0">
              <span className="text-white text-lg font-bold leading-none">空</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[15px] text-[#1C1C1E] leading-tight tracking-tight">
                Shotokan Club
              </span>
              <span className="text-xs text-[#8E8E93] leading-tight mt-0.5">
                Management System
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-150 ${isActive
                      ? "bg-[#9E1B28] text-white shadow-sm"
                      : "text-[#3A3A3C] hover:bg-[#F2F2F7] hover:text-[#1C1C1E]"
                    }`}
                >
                  <Icon
                    className={`w-[18px] h-[18px] stroke-[2] ${isActive ? "text-white" : "text-[#6C6C70]"
                      }`}
                  />
                  <span className="truncate">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / User Profile */}
        <div className="pt-4 border-t border-[#F2F2F7] px-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FDE8EA] text-[#9E1B28] flex items-center justify-center text-xs font-semibold shrink-0">
              CA
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold text-[#1C1C1E] leading-tight">
                Club Administrator
              </span>
              <span className="text-xs text-[#8E8E93] leading-tight mt-0.5">
                Admin
              </span>
            </div>
          </div>
          <button
            title="Logout"
            className="p-1.5 rounded-lg text-[#8E8E93] hover:text-[#9E1B28] hover:bg-[#FDE8EA] transition-colors"
          >
            <LogOut className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-[#F5F5F7] p-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight">
            Welcome back, Club
          </h1>
          <p className="text-sm text-[#6C6C70] mt-1 font-normal">
            Club overview for 17 Aug 2026 · Monday
          </p>
        </div>

        {/* TOP KPI STATS GRID (4x2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#E5E5EA]/70 flex flex-col justify-between transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-bold tracking-wider text-[#6C6C70] uppercase">
                    {card.title}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#FDE8EA] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#9E1B28] stroke-[2]" />
                  </div>
                </div>
                <div className="mt-3">
                  <div
                    className={`text-2xl font-bold tracking-tight ${card.valueColor || "text-[#1C1C1E]"
                      }`}
                  >
                    {card.value}
                  </div>
                  {card.subtext && (
                    <div className="text-[11px] text-[#8E8E93] font-medium mt-0.5">
                      {card.subtext}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CHARTS SECTION (2 COLUMNS) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Chart: Student Growth */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#E5E5EA]/70 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-[#1C1C1E]">
                Student Growth
              </h2>
            </div>

            <div className="relative w-full h-64 pt-2 pb-2">
              {/* Y-Axis Grid Lines & Labels */}
              <div className="absolute inset-0 flex flex-col justify-between text-xs text-[#8E8E93] pointer-events-none pb-6">
                {[28, 21, 14, 7, 0].map((val) => (
                  <div key={val} className="flex items-center w-full">
                    <span className="w-6 text-right pr-2 text-[11px] shrink-0 font-medium text-[#8E8E93]">
                      {val}
                    </span>
                    <div className="flex-1 border-b border-dashed border-[#E5E5EA]" />
                  </div>
                ))}
              </div>

              {/* SVG Area & Line Chart */}
              <div className="absolute inset-0 pl-8 pb-6 pt-1 pr-2">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 500 200"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9E1B28" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#9E1B28" stopOpacity="0.01" />
                    </linearGradient>
                  </defs>

                  {/* Filled Area */}
                  <path
                    d="M 0,71 L 71,64 L 142,57 L 214,50 L 285,43 L 357,43 L 428,36 L 500,36 L 500,200 L 0,200 Z"
                    fill="url(#growthGradient)"
                  />

                  {/* Stroke Line */}
                  <path
                    d="M 0,71 L 71,64 L 142,57 L 214,50 L 285,43 L 357,43 L 428,36 L 500,36"
                    fill="none"
                    stroke="#9E1B28"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* X-Axis Labels */}
              <div className="absolute bottom-0 left-0 right-0 pl-8 pr-2 flex justify-between text-[11px] font-medium text-[#8E8E93]">
                {growthData.map((d) => (
                  <span key={d.month} className="text-center w-8">
                    {d.month}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Chart: Monthly Attendance Rate (%) */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#E5E5EA]/70 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-[#1C1C1E]">
                Monthly Attendance Rate (%)
              </h2>
            </div>

            <div className="relative w-full h-64 pt-2 pb-2">
              {/* Y-Axis Grid Lines & Labels */}
              <div className="absolute inset-0 flex flex-col justify-between text-xs text-[#8E8E93] pointer-events-none pb-6">
                {[100, 75, 50, 25, 0].map((val) => (
                  <div key={val} className="flex items-center w-full">
                    <span className="w-8 text-right pr-2 text-[11px] shrink-0 font-medium text-[#8E8E93]">
                      {val}
                    </span>
                    <div className="flex-1 border-b border-dashed border-[#E5E5EA]" />
                  </div>
                ))}
              </div>

              {/* Bar Chart Container */}
              <div className="absolute inset-0 pl-10 pb-6 pt-1 pr-4 flex justify-between items-end">
                {attendanceData.map((d) => {
                  const barHeightPercent = (d.rate / 100) * 100;
                  return (
                    <div
                      key={d.month}
                      className="flex-1 flex flex-col items-center justify-end h-full px-2 group cursor-pointer"
                      onMouseEnter={() => setHoveredAttendance(d)}
                      onMouseLeave={() => setHoveredAttendance(null)}
                    >
                      {d.rate > 0 ? (
                        <div
                          className="w-full max-w-[44px] bg-[#9E1B28] rounded-t-md transition-all duration-300 group-hover:brightness-110 relative"
                          style={{ height: `${barHeightPercent}%` }}
                        >
                          {hoveredAttendance?.month === d.month && (
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1C1C1E] text-white text-[10px] font-semibold py-1 px-2 rounded shadow-md whitespace-nowrap z-20">
                              {d.rate}%
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-full max-w-[44px] h-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* X-Axis Labels */}
              <div className="absolute bottom-0 left-0 right-0 pl-10 pr-4 flex justify-between text-[11px] font-medium text-[#8E8E93]">
                {attendanceData.map((d) => (
                  <span key={d.month} className="flex-1 text-center">
                    {d.month}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
