"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { useTournaments } from "@/hooks/useTournaments";
import { Tournament, TournamentRegistration, TournamentStatus } from "@/types/tournament";
import { Plus, Trophy, Calendar, MapPin, Award, UserPlus, ClipboardList, CheckCircle, HelpCircle } from "lucide-react";
import { AddTournamentModal } from "@/components/tournaments/AddTournamentModal";
import { RegisterStudentModal } from "@/components/tournaments/RegisterStudentModal";
import { RecordResultsModal } from "@/components/tournaments/RecordResultsModal";

export default function TournamentsPage() {
    const {
        tournaments,
        registrations,
        statusFilter,
        setStatusFilter,
        addTournament,
        updateTournamentStatus,
        registerStudent,
        recordResults,
    } = useTournaments();

    // Selection states
    const [selectedTournamentId, setSelectedTournamentId] = useState<string>(
        tournaments[0]?.id || ""
    );

    // Modal view states
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isResultsOpen, setIsResultsOpen] = useState(false);

    const [editingRegistration, setEditingRegistration] = useState<TournamentRegistration | null>(null);

    // Active tournament
    const activeTournament = tournaments.find((t) => t.id === selectedTournamentId) || tournaments[0];

    // Registrations for the selected tournament
    const activeRegistrations = registrations.filter(
        (reg) => reg.tournamentId === (activeTournament?.id || "")
    );

    const handleCreateTournament = (data: any) => {
        addTournament(data);
    };

    const handleRegistercompetitor = (studentId: string, category: any) => {
        if (!activeTournament) return { success: false, message: "No tournament selected" };
        return registerStudent(activeTournament.id, studentId, category);
    };

    const handleSaveResults = (regId: string, results: any) => {
        recordResults(regId, results);
    };

    const handleRecordClick = (reg: TournamentRegistration) => {
        setEditingRegistration(reg);
        setIsResultsOpen(true);
    };

    return (
        <div className="flex h-screen w-screen bg-[#F5F5F7] font-sans antialiased text-[#1C1C1E] lg:overflow-hidden select-none">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-y-auto bg-[#F5F5F7] p-4 sm:p-6 lg:p-8 pt-[72px] lg:pt-8">
                <div className="flex flex-col h-full">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight">
                                Tournament & Competitions
                            </h1>
                            <p className="text-sm text-[#6C6C70] mt-0.5 font-normal">
                                Manage karate championships, category rosters and record placements/medals.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsAddOpen(true)}
                            className="bg-[#9E1B28] hover:bg-[#851621] text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer select-none"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add Tournament</span>
                        </button>
                    </div>

                    {/* Filter row */}
                    <div className="flex items-center justify-between bg-white border border-[#E5E5EA] p-3 rounded-2xl mb-6 shadow-xs overflow-x-auto">
                        <div className="flex items-center gap-2 min-w-max">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#8E8E93] mr-2">
                                Status Filter:
                            </span>
                            {["All", "Upcoming", "Registration Open", "Completed", "Cancelled"].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold select-none cursor-pointer transition-all ${(statusFilter === status)
                                        ? "bg-[#9E1B28] text-white"
                                        : "text-[#6C6C70] hover:bg-[#F2F2F7]"
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Split Panel Dashboard */}
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">

                        {/* LEFT COLUMN: Tournaments List (5 cols) */}
                        <div className="lg:col-span-5 flex flex-col gap-4 overflow-y-auto pr-1">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
                                Training matches & Championships ({tournaments.length})
                            </h3>

                            {tournaments.length > 0 ? (
                                tournaments.map((trn) => {
                                    const isSelected = trn.id === selectedTournamentId;
                                    const regCount = registrations.filter(r => r.tournamentId === trn.id).length;

                                    return (
                                        <div
                                            key={trn.id}
                                            onClick={() => setSelectedTournamentId(trn.id)}
                                            className={`p-4 rounded-2xl border transition-all cursor-pointer text-left select-none relative overflow-hidden ${isSelected
                                                ? "bg-white border-[#9E1B28] shadow-[0_4px_12px_rgba(158,27,40,0.06)]"
                                                : "bg-white border-[#E5E5EA] hover:border-[#C7C7CC]"
                                                }`}
                                        >
                                            {/* Status Badge */}
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] font-mono text-[#8E8E93] font-semibold bg-[#FAFAFC] border border-gray-100 px-1.5 py-0.5 rounded">
                                                    {trn.id}
                                                </span>
                                                <span
                                                    className={`px-2 py-0.5 rounded text-[9.5px] font-bold ${trn.status === "Registration Open" ? "bg-[#E8F8F0] text-[#25734A]" :
                                                        trn.status === "Completed" ? "bg-stone-100 text-stone-700" :
                                                            trn.status === "Cancelled" ? "bg-[#FDE8EA] text-[#9E1B28]" :
                                                                "bg-yellow-50 text-yellow-700 border-yellow-200"
                                                        }`}
                                                >
                                                    {trn.status}
                                                </span>
                                            </div>

                                            <h4 className="font-bold text-[14px] leading-tight text-[#1C1C1E] mb-1">
                                                {trn.name}
                                            </h4>

                                            <p className="text-[11.5px] text-[#6C6C70] mb-3 line-clamp-2">
                                                {trn.description}
                                            </p>

                                            <div className="grid grid-cols-2 gap-2 text-[10.5px] text-[#8E8E93] font-medium border-t border-[#F2F2F7] pt-2.5">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span>{trn.date}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 justify-end">
                                                    <Trophy className="w-3.5 h-3.5" />
                                                    <span>{regCount} registered</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="bg-white border border-[#E5E5EA] rounded-2xl p-6 text-center text-xs text-[#8E8E93]">
                                    No tournaments match the selected status.
                                </div>
                            )}
                        </div>

                        {/* RIGHT COLUMN: Competitors & Detail Dashboard (7 cols) */}
                        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E5E5EA] p-6 flex flex-col min-h-0 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                            {activeTournament ? (
                                <div className="flex flex-col h-full min-h-0">
                                    {/* Action Bar Header */}
                                    <div className="flex items-start justify-between border-b border-[#F2F2F7] pb-4 mb-4">
                                        <div>
                                            <h2 className="text-[17px] font-bold text-[#1C1C1E] leading-snug">
                                                {activeTournament.name}
                                            </h2>
                                            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-[11px] text-[#8E8E93] font-medium items-center">
                                                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                                                    {activeTournament.type}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    <span>{activeTournament.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Register student trigger */}
                                        {(activeTournament.status === "Registration Open" || activeTournament.status === "Upcoming") && (
                                            <button
                                                onClick={() => setIsRegisterOpen(true)}
                                                className="bg-stone-900 hover:bg-stone-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer select-none shrink-0"
                                            >
                                                <UserPlus className="w-3.5 h-3.5" />
                                                <span>Register Competitor</span>
                                            </button>
                                        )}
                                    </div>

                                    {/* Tournament Quick Stats */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#FAFAFC] border border-[#E5E5EA] p-3 rounded-2xl mb-4 text-xs">
                                        <div>
                                            <span className="text-[10px] font-semibold text-[#8E8E93] block">Organizer Host</span>
                                            <span className="font-semibold text-gray-800">{activeTournament.organizer}</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-semibold text-[#8E8E93] block">Registration Deadline</span>
                                            <span className="font-semibold text-gray-800">{activeTournament.deadline}</span>
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <span className="text-[10px] font-semibold text-[#8E8E93] block">Change Tournament Status</span>
                                            <select
                                                value={activeTournament.status}
                                                onChange={(e) => updateTournamentStatus(activeTournament.id, e.target.value as TournamentStatus)}
                                                className="bg-white border border-[#E5E5EA] rounded-lg px-2 py-0.5 text-[11px] font-bold text-[#1C1C1E] mt-0.5 focus:outline-none"
                                            >
                                                <option value="Upcoming">Upcoming</option>
                                                <option value="Registration Open">Registration Open</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Competitor rosters table */}
                                    <div className="flex-1 flex flex-col min-h-0">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93] mb-3 flex items-center gap-1.5">
                                            <ClipboardList className="w-4 h-4 text-stone-500" />
                                            <span>Roster Registrations ({activeRegistrations.length})</span>
                                        </h3>

                                        <div className="flex-1 overflow-y-auto border border-[#E5E5EA] rounded-2xl divide-y divide-[#F2F2F7]">
                                            {activeRegistrations.length > 0 ? (
                                                activeRegistrations.map((reg) => (
                                                    <div key={reg.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-white hover:bg-[#FAFAFC] transition-colors">
                                                        <div className="flex flex-col gap-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-[#1C1C1E] text-xs">
                                                                    {reg.studentName}
                                                                </span>
                                                                <span className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 text-[9px] font-bold">
                                                                    {reg.competitionType}
                                                                </span>
                                                            </div>
                                                            <div className="text-[10px] text-[#8E8E93] font-medium flex flex-wrap gap-x-2">
                                                                <span>Age: {reg.ageCategory}</span>
                                                                <span>&bull;</span>
                                                                <span>Belt: {reg.beltCategory}</span>
                                                                <span>&bull;</span>
                                                                <span>Weight: {reg.weightCategory}</span>
                                                            </div>
                                                        </div>

                                                        {/* Results Column or Actions */}
                                                        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                                                            {/* Medal / Position Indicators */}
                                                            {activeTournament.status === "Completed" && (
                                                                <div className="flex items-center gap-1.5">
                                                                    {reg.participated ? (
                                                                        <>
                                                                            {reg.medal !== "None" && (
                                                                                <span className="px-2 py-0.5 rounded-lg text-[9.5px] font-extrabold flex items-center gap-1 bg-[#FDE8EA] text-[#9E1B28]">
                                                                                    <Award className="w-3 h-3" />
                                                                                    <span>{reg.medal} Medal</span>
                                                                                </span>
                                                                            )}
                                                                            <span className="px-2 py-0.5 rounded-lg text-[9.5px] font-bold bg-[#E8F8F0] text-[#25734A]">
                                                                                Place: {reg.position || "N/A"}
                                                                            </span>
                                                                        </>
                                                                    ) : (
                                                                        <span className="text-[10.5px] text-[#C7C7CC] font-bold italic">
                                                                            Absent/No-show
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {/* Admins Record Results trigger */}
                                                            {activeTournament.status === "Completed" && (
                                                                <button
                                                                    onClick={() => handleRecordClick(reg)}
                                                                    className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-[10.5px] px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer"
                                                                >
                                                                    Record Results
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-12 text-center text-[#8E8E93]">
                                                    No competitors recorded in this category. Click 'Register Competitor' to enroll a student.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center text-[#8E8E93] gap-2">
                                    <Trophy className="w-8 h-8 opacity-40 text-stone-500" />
                                    <span className="text-xs font-semibold">Select a tournament to view categorization lists</span>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </main>

            {/* Modal Dialog components */}
            <AddTournamentModal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                onSubmit={handleCreateTournament}
            />

            {activeTournament && (
                <RegisterStudentModal
                    isOpen={isRegisterOpen}
                    onClose={() => setIsRegisterOpen(false)}
                    onSubmit={handleRegistercompetitor}
                    tournamentName={activeTournament.name}
                />
            )}

            <RecordResultsModal
                isOpen={isResultsOpen}
                onClose={() => {
                    setEditingRegistration(null);
                    setIsResultsOpen(false);
                }}
                onSubmit={handleSaveResults}
                registration={editingRegistration}
            />
        </div>
    );
}
