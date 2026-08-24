import React from "react";
import { STUDENT_GROWTH_DATA } from "@/data/mockData";

export function StudentGrowthChart() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#E5E5EA]/70 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-[#1C1C1E]">
                    Student Growth
                </h2>
            </div>

            <div className="relative w-full h-64 pt-2 pb-2">
                {/* Y-Axis Grid Lines */}
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
                    {STUDENT_GROWTH_DATA.map((d) => (
                        <span key={d.month} className="text-center w-8">
                            {d.month}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
