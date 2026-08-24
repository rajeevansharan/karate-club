"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAchievements } from "@/hooks/useAchievements";
import { Achievement, AchievementType } from "@/types/achievement";
import {
    Plus, Award, Medal, Star, Search, Trophy, FileText,
    Users, GraduationCap, Calendar, Activity, Ribbon, ClipboardCheck
} from "lucide-react";
import { AddAchievementModal } from "@/components/achievements/AddAchievementModal";

// ─── Helpers ────────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<AchievementType, { icon: React.ReactNode; color: string; bg: string; dot: string }> = {
    "Tournament Medal": {
        icon: <Trophy className="w-4 h-4" />,
        color: "text-amber-700",
        bg: "bg-amber-50 border-amber-200",
        dot: "bg-amber-400",
    },
    "Belt Promotion": {
        icon: <GraduationCap className="w-4 h-4" />,
        color: "text-[#9E1B28]",
        bg: "bg-[#FDE8EA] border-rose-200",
        dot: "bg-[#9E1B28]",
    },
    "Best Student": {
        icon: <Star className="w-4 h-4" />,
        color: "text-yellow-700",
        bg: "bg-yellow-50 border-yellow-200",
        dot: "bg-yellow-400",
    },
    "Attendance Award": {
        icon: <ClipboardCheck className="w-4 h-4" />,
        color: "text-emerald-700",
        bg: "bg-emerald-50 border-emerald-200",
        dot: "bg-emerald-500",
    },
    "Special Recognition": {
        icon: <Ribbon className="w-4 h-4" />,
        color: "text-violet-700",
        bg: "bg-violet-50 border-violet-200",
        dot: "bg-violet-500",
    },
    "Competition Participation": {
        icon: <Activity className="w-4 h-4" />,
        color: "text-blue-700",
        bg: "bg-blue-50 border-blue-200",
        dot: "bg-blue-500",
    },
    "Certificate": {
        icon: <FileText className="w-4 h-4" />,
        color: "text-stone-700",
        bg: "bg-stone-50 border-stone-200",
        dot: "bg-stone-400",
    },
};

const ACHIEVEMENT_TYPES: AchievementType[] = [
    "Tournament Medal",
    "Belt Promotion",
    "Best Student",
    "Attendance Award",
    "Special Recognition",
    "Competition Participation",
    "Certificate",
];

function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

// ─── Achievement Card ────────────────────────────────────────────────────────

function AchievementCard({ ach }: { ach: Achievement }) {
    const cfg = TYPE_CONFIG[ach.type];
    return (
        <div className="bg-white border border-[#E5E5EA] rounded-2xl p-4 shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.05)] transition-all flex flex-col gap-3">
            {/* Type badge + date */}
            <div className="flex items-start justify-between gap-2">
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-lg border ${cfg.bg} ${cfg.color}`}>
                    {cfg.icon}
                    {ach.type}
                </span>
                <span className="text-[10px] text-[#8E8E93] font-medium whitespace-nowrap shrink-0">
                    {formatDate(ach.date)}
                </span>
            </div>

            {/* Title */}
            <div>
                <h4 className="text-[13px] font-extrabold text-[#1C1C1E] leading-snug">{ach.title}</h4>
                {ach.awardPosition && (
                    <span className="text-[10.5px] font-bold text-amber-700 mt-1 block">{ach.awardPosition}</span>
                )}
            </div>

            {/* Description */}
            {ach.description && (
                <p className="text-[11px] text-[#6C6C70] leading-relaxed line-clamp-2">{ach.description}</p>
            )}

            {/* Footer meta */}
            <div className="border-t border-[#F2F2F7] pt-2.5 mt-auto space-y-1.5">
                {/* Student */}
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#FDE8EA] text-[#9E1B28] flex items-center justify-center text-[8px] font-extrabold shrink-0">
                        {ach.studentInitials}
                    </div>
                    <span className="text-[11px] font-bold text-[#3A3A3C]">{ach.studentName}</span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-[#8E8E93] font-medium">
                    {ach.issuedBy && (
                        <span>By: <span className="text-[#6C6C70]">{ach.issuedBy}</span></span>
                    )}
                    {ach.certificateNumber && (
                        <span className="font-mono text-[9.5px] bg-[#F2F2F7] px-1.5 py-0.5 rounded">
                            {ach.certificateNumber}
                        </span>
                    )}
                    {ach.relatedTournament && (
                        <span className="text-[10px] text-blue-600 font-semibold truncate max-w-[140px]">
                            🏆 {ach.relatedTournament}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Timeline Entry ──────────────────────────────────────────────────────────

function TimelineEntry({ ach, isLast }: { ach: Achievement; isLast: boolean }) {
    const cfg = TYPE_CONFIG[ach.type];
    return (
        <div className="flex gap-4">
            {/* Dot + line */}
            <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full border-2 border-white shadow flex items-center justify-center ${cfg.bg} ${cfg.color} shrink-0`}>
                    {cfg.icon}
                </div>
                {!isLast && <div className="flex-1 w-px bg-[#E5E5EA] my-1" />}
            </div>

            {/* Content */}
            <div className={`pb-5 flex-1 ${isLast ? "" : ""}`}>
                <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                        <span className={`text-[10px] font-bold ${cfg.color}`}>{ach.type}</span>
                        <h4 className="text-[13px] font-extrabold text-[#1C1C1E] leading-snug mt-0.5">
                            {ach.title}
                        </h4>
                        {ach.awardPosition && (
                            <span className="text-[10.5px] font-bold text-amber-700">{ach.awardPosition}</span>
                        )}
                    </div>
                    <span className="text-[10px] text-[#8E8E93] font-medium whitespace-nowrap">
                        {formatDate(ach.date)}
                    </span>
                </div>

                {ach.description && (
                    <p className="text-[11px] text-[#6C6C70] mt-1.5 leading-relaxed">{ach.description}</p>
                )}

                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[10px] text-[#8E8E93]">
                    <span className="font-bold text-[#3A3A3C]">{ach.studentName}</span>
                    {ach.issuedBy && <span>· Issued by {ach.issuedBy}</span>}
                    {ach.certificateNumber && (
                        <span className="font-mono bg-[#F2F2F7] px-1.5 py-0.5 rounded text-[9.5px]">
                            {ach.certificateNumber}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default function AchievementsPage() {
    const {
        achievements,
        stats,
        searchQuery,
        setSearchQuery,
        typeFilter,
        setTypeFilter,
        studentFilter,
        setStudentFilter,
        addAchievement,
        students,
    } = useAchievements();

    const [viewMode, setViewMode] = useState<"cards" | "timeline">("cards");
    const [isAddOpen, setIsAddOpen] = useState(false);

    // Group by student for timeline mode
    const sortedAchievements = [...achievements].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="flex h-screen w-screen bg-[#F5F5F7] font-sans antialiased text-[#1C1C1E] lg:overflow-hidden select-none">
            <Sidebar />

            <main className="flex-1 flex flex-col overflow-y-auto bg-[#F5F5F7] p-4 sm:p-6 lg:p-8 pt-[72px] lg:pt-8">
                <div className="flex flex-col h-full">

                    {/* ── Page Header ── */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight flex items-center gap-2">
                                <Award className="w-7 h-7 text-[#9E1B28] shrink-0" />
                                <span>Achievements & Awards</span>
                            </h1>
                            <p className="text-sm text-[#6C6C70] mt-0.5 font-normal">
                                Medals, certificates, promotions, and recognitions for all dojo members.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsAddOpen(true)}
                            className="bg-[#9E1B28] hover:bg-[#851621] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer self-start sm:self-auto shrink-0"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Issue Achievement</span>
                        </button>
                    </div>

                    {/* ── KPI Stats ── */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {[
                            { label: "Total Achievements", value: stats.totalAchievements, icon: <Award className="w-5 h-5" />, iconBg: "bg-[#FDE8EA] text-[#9E1B28]" },
                            { label: "Tournament Medals", value: stats.tournamentMedals, icon: <Trophy className="w-5 h-5" />, iconBg: "bg-amber-50 text-amber-600" },
                            { label: "Belt Promotions", value: stats.beltPromotions, icon: <GraduationCap className="w-5 h-5" />, iconBg: "bg-[#FDE8EA] text-[#9E1B28]" },
                            { label: "Certificates Issued", value: stats.certificatesIssued, icon: <FileText className="w-5 h-5" />, iconBg: "bg-stone-100 text-stone-600" },
                        ].map((s) => (
                            <div key={s.label} className="bg-white border border-[#E5E5EA] p-4 rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.01)] flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">{s.label}</span>
                                    <span className="text-2xl font-extrabold text-[#1C1C1E] mt-1 block">{s.value}</span>
                                </div>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${s.iconBg}`}>
                                    {s.icon}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── Toolbar: Search + Filters + View Toggle ── */}
                    <div className="bg-white border border-[#E5E5EA] rounded-2xl p-4 mb-6 shadow-xs flex flex-col sm:flex-row sm:items-center gap-3">
                        {/* Search */}
                        <div className="relative flex-1 min-w-0">
                            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#C7C7CC]" />
                            <input
                                type="text"
                                placeholder="Search by title, student, or certificate..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl text-xs font-medium text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28]"
                            />
                        </div>

                        {/* Type filter */}
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-2.5 py-2 text-xs font-semibold text-[#3A3A3C] focus:outline-none min-w-0"
                        >
                            <option value="All types">All types</option>
                            {ACHIEVEMENT_TYPES.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>

                        {/* Student filter */}
                        <select
                            value={studentFilter}
                            onChange={(e) => setStudentFilter(e.target.value)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-2.5 py-2 text-xs font-semibold text-[#3A3A3C] focus:outline-none min-w-0"
                        >
                            <option value="All students">All students</option>
                            {students.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>

                        {/* View Mode Toggle */}
                        <div className="bg-[#E5E5EA] p-1 rounded-xl flex items-center gap-1 shrink-0">
                            <button
                                onClick={() => setViewMode("cards")}
                                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${viewMode === "cards" ? "bg-white text-[#1C1C1E] shadow-sm" : "text-[#8E8E93] hover:text-[#3A3A3C]"}`}
                            >
                                Cards
                            </button>
                            <button
                                onClick={() => setViewMode("timeline")}
                                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${viewMode === "timeline" ? "bg-white text-[#1C1C1E] shadow-sm" : "text-[#8E8E93] hover:text-[#3A3A3C]"}`}
                            >
                                Timeline
                            </button>
                        </div>
                    </div>

                    {/* ── Results count ── */}
                    <div className="mb-4 flex items-center gap-2">
                        <span className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
                            {sortedAchievements.length} Achievement{sortedAchievements.length !== 1 ? "s" : ""}
                        </span>
                        {(typeFilter !== "All types" || studentFilter !== "All students" || searchQuery) && (
                            <button
                                onClick={() => { setTypeFilter("All types"); setStudentFilter("All students"); setSearchQuery(""); }}
                                className="text-[10px] font-bold text-[#9E1B28] hover:underline cursor-pointer"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>

                    {/* ── Main Content ── */}
                    {sortedAchievements.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center text-[#8E8E93] gap-3 py-16">
                            <Award className="w-10 h-10 opacity-30" />
                            <span className="text-sm font-semibold">No achievements match the selected filters.</span>
                        </div>
                    ) : viewMode === "cards" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-6">
                            {sortedAchievements.map((ach) => (
                                <AchievementCard key={ach.id} ach={ach} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white border border-[#E5E5EA] rounded-3xl p-6 flex-1 shadow-[0_2px_8px_rgba(0,0,0,0.01)] overflow-y-auto pb-8">
                            {sortedAchievements.map((ach, idx) => (
                                <TimelineEntry
                                    key={ach.id}
                                    ach={ach}
                                    isLast={idx === sortedAchievements.length - 1}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </main>

            <AddAchievementModal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                students={students}
                onSubmit={(data) => {
                    addAchievement(data);
                    setIsAddOpen(false);
                }}
            />
        </div>
    );
}
