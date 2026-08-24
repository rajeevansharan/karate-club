import React from "react";
import { KpiStatItem } from "@/types/dashboard";

export function StatCard({ title, value, subtext, valueColor, icon: Icon }: KpiStatItem) {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#E5E5EA]/70 flex flex-col justify-between transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between">
                <span className="text-[11px] font-bold tracking-wider text-[#6C6C70] uppercase">
                    {title}
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#FDE8EA] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#9E1B28] stroke-[2]" />
                </div>
            </div>
            <div className="mt-3">
                <div
                    className={`text-2xl font-bold tracking-tight ${valueColor || "text-[#1C1C1E]"
                        }`}
                >
                    {value}
                </div>
                {subtext && (
                    <div className="text-[11px] text-[#8E8E93] font-medium mt-0.5">
                        {subtext}
                    </div>
                )}
            </div>
        </div>
    );
}
