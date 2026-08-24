import React from "react";
import { Plus } from "lucide-react";

interface InstructorsHeaderProps {
    count: number;
}

export function InstructorsHeader({ count }: InstructorsHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight">
                    Instructors
                </h1>
                <p className="text-sm text-[#6C6C70] mt-0.5 font-normal">
                    {count} instructors on the roster
                </p>
            </div>

            <button
                className="bg-[#9E1B28] hover:bg-[#851621] text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add Instructor</span>
            </button>
        </div>
    );
}
