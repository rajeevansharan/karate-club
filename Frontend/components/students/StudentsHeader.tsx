import React from "react";
import { Plus } from "lucide-react";

interface StudentsHeaderProps {
    count: number;
    onAddClick: () => void;
}

export function StudentsHeader({ count, onAddClick }: StudentsHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight">
                    Students
                </h1>
                <p className="text-sm text-[#6C6C70] mt-0.5 font-normal">
                    {count} student records
                </p>
            </div>

            <button
                onClick={onAddClick}
                className="bg-[#9E1B28] hover:bg-[#851621] text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add Student</span>
            </button>
        </div>
    );
}
