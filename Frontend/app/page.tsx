import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { KpiStatsGrid } from "@/components/dashboard/KpiStatsGrid";
import { StudentGrowthChart } from "@/components/dashboard/StudentGrowthChart";
import { AttendanceRateChart } from "@/components/dashboard/AttendanceRateChart";

export default function DashboardPage() {
  return (
    <div className="flex h-screen w-screen bg-[#F5F5F7] font-sans antialiased text-[#1C1C1E] lg:overflow-hidden select-none">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-[#F5F5F7] p-4 sm:p-6 lg:p-8 pt-[72px] lg:pt-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight">
            Welcome back, Club
          </h1>
          <p className="text-sm text-[#6C6C70] mt-1 font-normal">
            Club overview for 17 Aug 2026 · Monday
          </p>
        </div>

        {/* Top KPI Stats Grid */}
        <KpiStatsGrid />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StudentGrowthChart />
          <AttendanceRateChart />
        </div>
      </main>
    </div>
  );
}
