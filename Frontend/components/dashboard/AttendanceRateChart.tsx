"use client";

import React, { useState } from "react";
import { ATTENDANCE_RATE_DATA } from "@/data/mockData";
import { AttendanceDataPoint } from "@/types/dashboard";

export function AttendanceRateChart() {
    const [hoveredData, setHoveredData] = useState<AttendanceDataPoint | null>(null);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#E5E5EA]/70 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-[#1C1C1E]">
                    Monthly Attendance Rate (%)
                </h2>
            </div>

            <div className="relative w-full h-64 pt-2 pb-2">
                {/* Y-Axis Grid Lines */}
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
                    {ATTENDANCE_RATE_DATA.map((d) => {
                        const barHeightPercent = (d.rate / 100) * 100;
                        return (
                            <div
                                key={d.month}
                                className="flex-1 flex flex-col items-center justify-end h-full px-2 group cursor-pointer"
                                onMouseEnter={() => setHoveredData(d)}
                                onMouseLeave={() => setHoveredData(null)}
                            >
                                {d.rate > 0 ? (
                                    <div
                                        className="w-full max-w-[44px] bg-[#9E1B28] rounded-t-md transition-all duration-300 group-hover:brightness-110 relative"
                                        style={{ height: `${barHeightPercent}%` }}
                                    >
                                        {hoveredData?.month === d.month && (
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
                    {ATTENDANCE_RATE_DATA.map((d) => (
                        <span key={d.month} className="flex-1 text-center">
                            {d.month}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
