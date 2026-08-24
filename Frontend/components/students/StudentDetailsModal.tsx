import React from "react";
import { X, Activity, Trophy, Award } from "lucide-react";
import { Student } from "@/types/student";
import { BeltBadge } from "./BeltBadge";
import { StatusBadge } from "./StatusBadge";
import { INITIAL_ATTENDANCE } from "@/data/mockAttendanceData";
import { INITIAL_REGISTRATIONS } from "@/data/mockTournamentData";

interface StudentDetailsModalProps {
    student: Student | null;
    isOpen: boolean;
    onClose: () => void;
}

export function StudentDetailsModal({ student, isOpen, onClose }: StudentDetailsModalProps) {
    if (!isOpen || !student) return null;

    // Calculate student attendance statistics from historical mock data
    const studentRecords = INITIAL_ATTENDANCE.filter((rec) => rec.studentId === student.id);
    const totalRecords = studentRecords.length;

    const presentCount = studentRecords.filter((r) => r.status === "Present").length;
    const absentCount = studentRecords.filter((r) => r.status === "Absent").length;
    const lateCount = studentRecords.filter((r) => r.status === "Late").length;
    const excusedCount = studentRecords.filter((r) => r.status === "Excused").length;

    // Calculate attendance percentage: (Present + Late) / (Total - Excused)
    const activeSessions = totalRecords - excusedCount;
    const attendancePercentage = activeSessions > 0
        ? Math.round(((presentCount + lateCount) / activeSessions) * 100)
        : 100; // default to 100% or fallback

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div
                className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-[#E5E5EA] animate-in fade-in-50 zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#F2F2F7] px-6 py-4 bg-[#FAFAFC]">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs font-semibold text-[#8E8E93] bg-[#E5E5EA] px-2 py-0.5 rounded-md">
                                {student.id}
                            </span>
                            <StatusBadge status={student.status} type="status" />
                        </div>
                        <h2 className="text-xl font-bold text-[#1C1C1E]">{student.name}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-[#E5E5EA] text-[#8E8E93] hover:text-[#1C1C1E] transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Profile Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* General Information Card */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-[#FAFAFC] p-5 rounded-2xl border border-[#E5E5EA]">
                        <div>
                            <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Age</span>
                            <span className="text-sm font-semibold text-[#1C1C1E]">{student.age} years old</span>
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Belt Rank</span>
                            <div className="mt-1">
                                <BeltBadge belt={student.belt} />
                            </div>
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Phone Number</span>
                            <span className="text-sm font-semibold text-[#1C1C1E]">{student.phone}</span>
                        </div>
                        <div className="col-span-2 md:col-span-2">
                            <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block mt-2">Active Class Slot</span>
                            <span className="text-sm font-semibold text-[#1C1C1E] select-none block mt-0.5">{student.class}</span>
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block mt-2">Sensei Coach</span>
                            <span className="text-sm font-semibold text-[#3A3A3C] block mt-0.5">{student.instructor}</span>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Membership</span>
                            <div className="mt-1">
                                <StatusBadge status={student.membership} type="membership" />
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Attendance Statistics Section */}
                    <div>
                        <h3 className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider mb-3">
                            Class Attendance Statistics
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                            {/* Percentage Meter */}
                            <div className="col-span-2 sm:col-span-2 flex items-center gap-4 bg-white border border-[#E5E5EA] p-4 rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.01)] justify-between">
                                <div>
                                    <span className="text-[10px] font-bold text-[#6D6D72] uppercase block">Attendance Rate</span>
                                    <span className="text-2xl font-extrabold text-[#9E1B28] mt-1 block">
                                        {attendancePercentage}%
                                    </span>
                                </div>
                                <div className="w-14 h-14 rounded-full border-[5px] border-[#FDE8EA] flex items-center justify-center relative shrink-0">
                                    <div className="absolute inset-0 rounded-full border-[5px] border-[#9E1B28] clip-half" style={{ transform: `rotate(${attendancePercentage * 3.6}deg)` }}></div>
                                    <Activity className="w-5 h-5 text-[#9E1B28]" />
                                </div>
                            </div>

                            {/* Status counts */}
                            <div className="bg-[#E8F8F0] border border-[#4AD991]/30 p-3 rounded-2xl flex flex-col justify-between">
                                <span className="text-[10px] font-semibold text-[#25734A] uppercase">Present</span>
                                <span className="text-xl font-bold text-[#25734A] mt-1">{presentCount}</span>
                                <span className="text-[9px] text-[#25734A]/80 mt-0.5">sessions check-in</span>
                            </div>

                            <div className="bg-[#FDE8EA] border border-[#F8B4B8]/40 p-3 rounded-2xl flex flex-col justify-between">
                                <span className="text-[10px] font-semibold text-[#9E1B28] uppercase">Absent</span>
                                <span className="text-xl font-bold text-[#9E1B28] mt-1">{absentCount}</span>
                                <span className="text-[9px] text-[#9E1B28]/80 mt-0.5">sessions missing</span>
                            </div>
                        </div>

                        {/* Extra Status Counts */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-orange-50 border border-orange-200 p-3 rounded-2xl flex items-center justify-between text-xs">
                                <span className="font-semibold text-orange-700">Late Arrivals</span>
                                <span className="font-extrabold text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-lg">{lateCount} times</span>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 p-3 rounded-2xl flex items-center justify-between text-xs">
                                <span className="font-semibold text-blue-700">Excused Absences</span>
                                <span className="font-extrabold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-lg">{excusedCount} days</span>
                            </div>
                        </div>
                    </div>

                    {/* Attendance Logs List Table */}
                    <div>
                        <h3 className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider mb-2.5">
                            Recent Logs History ({totalRecords})
                        </h3>
                        <div className="border border-[#E5E5EA] rounded-2xl overflow-hidden divide-y divide-[#F2F2F7] max-h-[200px] overflow-y-auto scrollbar-thin">
                            {studentRecords.length > 0 ? (
                                [...studentRecords].reverse().map((rec) => (
                                    <div key={rec.id} className="flex items-center justify-between p-3 text-xs bg-white hover:bg-gray-50/50">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-[#1C1C1E]">{rec.className}</span>
                                            <span className="text-[10px] text-[#8E8E93] mt-0.5">{rec.date} &bull; Sign by: {rec.markedBy}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {rec.checkInTime && (
                                                <span className="text-[10px] font-medium text-[#8E8E93]">
                                                    Check-in: {rec.checkInTime}
                                                </span>
                                            )}
                                            <span
                                                className={`px-2 py-0.5 rounded font-bold text-[9px] ${rec.status === "Present" ? 'bg-[#E8F8F0] text-[#25734A]' :
                                                    rec.status === "Absent" ? 'bg-[#FDE8EA] text-[#9E1B28]' :
                                                        rec.status === "Late" ? 'bg-orange-100 text-orange-700' :
                                                            'bg-blue-100 text-blue-700'
                                                    }`}
                                            >
                                                {rec.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-6 text-center text-xs text-[#8E8E93]">
                                    No attendance registers completed yet.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ---- Tournament Results Section ---- */}
                    {(() => {
                        const tournamentRegs = INITIAL_REGISTRATIONS.filter(
                            (r) => r.studentId === student.id && r.participated
                        );
                        if (tournamentRegs.length === 0) return null;
                        return (
                            <div>
                                <h3 className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                                    <Trophy className="w-3.5 h-3.5" />
                                    <span>Tournament Achievements ({tournamentRegs.length})</span>
                                </h3>
                                <div className="grid grid-cols-1 gap-2">
                                    {tournamentRegs.map((reg) => (
                                        <div key={reg.id} className="flex items-start justify-between bg-[#FAFAFC] border border-[#E5E5EA] rounded-2xl p-3 text-xs">
                                            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                                <span className="font-bold text-[#1C1C1E] text-[13px] truncate">{reg.tournamentName}</span>
                                                <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] text-[#8E8E93] font-medium mt-0.5">
                                                    <span className="bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded font-bold">{reg.competitionType}</span>
                                                    <span>{reg.ageCategory}</span>
                                                    <span>&bull;</span>
                                                    <span>{reg.weightCategory}</span>
                                                </div>
                                                {reg.notes && (
                                                    <p className="text-[10.5px] text-[#6C6C70] mt-1.5 italic leading-snug">&ldquo;{reg.notes}&rdquo;</p>
                                                )}
                                            </div>
                                            <div className="flex flex-col items-end gap-1.5 shrink-0 ml-3">
                                                {reg.medal !== "None" && (
                                                    <span className={`px-2.5 py-1 rounded-lg font-extrabold text-[11px] flex items-center gap-1 ${reg.medal === "Gold" ? "bg-yellow-50 text-yellow-700 border border-yellow-200" :
                                                        reg.medal === "Silver" ? "bg-gray-100 text-gray-600 border border-gray-200" :
                                                            "bg-orange-50 text-orange-700 border border-orange-200"
                                                        }`}>
                                                        <Award className="w-3 h-3" />
                                                        {reg.medal === "Gold" ? "🥇" : reg.medal === "Silver" ? "🥈" : "🥉"} {reg.medal}
                                                    </span>
                                                )}
                                                {reg.position && (
                                                    <span className="text-[10px] font-bold text-[#9E1B28] bg-[#FDE8EA] px-2 py-0.5 rounded-md">
                                                        #{reg.position} Place
                                                    </span>
                                                )}
                                                {reg.score && (
                                                    <span className="text-[10px] text-[#8E8E93] font-medium">Score: {reg.score}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
}
