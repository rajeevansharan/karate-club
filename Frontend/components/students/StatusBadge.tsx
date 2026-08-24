import React from "react";
import { MembershipStatus, StudentStatus } from "@/types/student";

interface StatusBadgeProps {
    status: MembershipStatus | StudentStatus;
    type?: "membership" | "status";
}

export function StatusBadge({ status, type = "membership" }: StatusBadgeProps) {
    if (status === "Active") {
        return (
            <span className="bg-[#E8F8F0] text-[#25734A] px-3 py-1 rounded-full text-xs font-semibold border border-[#4AD991]/50">
                Active
            </span>
        );
    }

    if (status === "Expired") {
        return (
            <span className="bg-[#FDE8EA] text-[#9E1B28] px-3 py-1 rounded-full text-xs font-semibold border border-[#F8B4B8]/60">
                Expired
            </span>
        );
    }

    return (
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold border border-gray-200">
            {status}
        </span>
    );
}
