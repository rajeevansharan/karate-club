import React from "react";
import { ClassSession } from "@/types/class";
import { BeltBadge } from "@/components/students/BeltBadge";
import { Users2, MapPin, Clock } from "lucide-react";

interface WeeklyScheduleProps {
    classes: ClassSession[];
    onViewDetails: (c: ClassSession) => void;
}

const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
] as const;

export function WeeklySchedule({ classes, onViewDetails }: WeeklyScheduleProps) {
    // Sort classes chronologically by start time helper
    const sortClassesByTime = (classList: ClassSession[]) => {
        return [...classList].sort((a, b) => a.startTime.localeCompare(b.startTime));
    };

    return (
        <div className="flex-1 flex flex-col mt-4 overflow-x-auto select-none">
            <div className="grid grid-cols-7 gap-4 min-w-[1000px] flex-1 pb-4">
                {DAYS.map((day) => {
                    const dayClasses = sortClassesByTime(classes.filter((c) => c.day === day));

                    return (
                        <div
                            key={day}
                            className="bg-[#FAFAFC] rounded-2xl p-3 border border-[#E5E5EA] flex flex-col min-h-[400px]"
                        >
                            {/* Day Header */}
                            <div className="border-b border-[#E5E5EA] pb-2 mb-3 text-center">
                                <h3 className="font-semibold text-xs text-[#1C1C1E] tracking-wide uppercase">
                                    {day.slice(0, 3)}
                                </h3>
                                <span className="text-[10px] text-[#8E8E93]">
                                    {dayClasses.length} {dayClasses.length === 1 ? "class" : "classes"}
                                </span>
                            </div>

                            {/* Class Cards */}
                            <div className="flex-1 flex flex-col gap-3 overflow-y-auto max-h-[500px] scrollbar-thin">
                                {dayClasses.length > 0 ? (
                                    dayClasses.map((cls) => {
                                        const isInactive = cls.status === "Inactive";
                                        return (
                                            <div
                                                key={cls.id}
                                                onClick={() => onViewDetails(cls)}
                                                className={`p-3 bg-white border border-[#E5E5EA] rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.01)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all cursor-pointer flex flex-col gap-2.5 relative group ${isInactive ? "opacity-60 bg-gray-50 filter grayscale-[20%]" : ""
                                                    }`}
                                            >
                                                {/* Edit visual trigger indicator */}
                                                <div className="absolute top-2.5 right-2 px-1 py-0.5 rounded text-[9px] font-bold text-[#8E8E93] border border-[#E5E5EA] group-hover:border-[#9E1B28] group-hover:text-[#9E1B28] transition-colors bg-white">
                                                    Info
                                                </div>

                                                {/* Class Name */}
                                                <div className="pr-6">
                                                    <h4 className="font-semibold text-xs text-[#1C1C1E] leading-tight select-none">
                                                        {cls.name}
                                                    </h4>
                                                    <span className="text-[10px] text-[#8E8E93] leading-none block mt-0.5">
                                                        {cls.instructorName}
                                                    </span>
                                                </div>

                                                {/* Belt Rank Requirement */}
                                                <div>
                                                    <BeltBadge belt={cls.minBelt} />
                                                </div>

                                                {/* Footer metadata */}
                                                <div className="flex flex-col gap-1 text-[10px] text-[#6C6C70] border-t border-[#F2F2F7] pt-2 mt-0.5">
                                                    {/* Time */}
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="w-3.5 h-3.5 text-[#9E1B28]" />
                                                        <span className="font-medium text-[#1C1C1E]">
                                                            {cls.startTime} - {cls.endTime}
                                                        </span>
                                                    </div>

                                                    {/* Location */}
                                                    <div className="flex items-center gap-1.5">
                                                        <MapPin className="w-3.5 h-3.5 text-[#8E8E93]" />
                                                        <span>{cls.location}</span>
                                                    </div>

                                                    {/* Student Capacity info */}
                                                    <div className="flex items-center gap-1.5 mt-0.5">
                                                        <Users2 className="w-3.5 h-3.5 text-[#8E8E93]" />
                                                        <div className="flex-1 flex items-center justify-between">
                                                            <span className="font-medium">
                                                                {cls.currentStudents}/{cls.maxStudents}
                                                            </span>
                                                            {cls.currentStudents >= cls.maxStudents && (
                                                                <span className="text-[9px] font-bold text-[#9E1B28]">
                                                                    FULL
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="flex-1 flex items-center justify-center border border-dashed border-[#E5E5EA] rounded-xl p-4 min-h-[80px]">
                                        <span className="text-[10px] text-[#8E8E93] text-center font-medium">
                                            No classes scheduled
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
