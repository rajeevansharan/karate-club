import React from "react";
import { BeltRank } from "@/types/student";

interface BeltBadgeProps {
    belt: BeltRank;
}

export function BeltBadge({ belt }: BeltBadgeProps) {
    const getStyle = (rank: BeltRank) => {
        switch (rank) {
            case "Green":
                return "border border-[#4AD991]/70 text-[#25734A] bg-[#E8F8F0]";
            case "Brown":
                return "border border-[#A87243]/70 text-[#633B18] bg-[#F9F1EA]";
            case "White":
                return "border border-[#D1D1D6] text-[#48484A] bg-white shadow-2xs";
            case "Black":
                return "border border-[#1C1C1E] text-white bg-[#1C1C1E]";
            default:
                return "border border-gray-300 text-gray-700 bg-gray-50";
        }
    };

    return (
        <span
            className={`px-3 py-0.5 rounded-full text-xs font-semibold ${getStyle(
                belt
            )}`}
        >
            {belt}
        </span>
    );
}
