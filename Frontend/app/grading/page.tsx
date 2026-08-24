"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { useGrading } from "@/hooks/useGrading";
import { GradingEvent, StudentEligibility, EligibilityStatus, GradingResult } from "@/types/grading";
import { Plus, GraduationCap, Award, Calendar, Clock, MapPin, UserCheck, Star, ShieldAlert, Award as MedalIcon } from "lucide-react";
import { CreateGradingEventModal } from "@/components/grading/CreateGradingEventModal";
import { RecordGradingResultModal } from "@/components/grading/RecordGradingResultModal";
import { Student } from "@/types/student";

export default function GradingPage() {
    const {
        gradingRecords,
        eligibilities,
        events,
        students,
        eligibilityFilter,
        setEligibilityFilter,
        createGradingEvent,
        toggleRecommendation,
        recordGradingResult,
    } = useGrading();

    // Tab controller
    const [activeTab, setActiveTab] = useState<"eligibility" | "events">("eligibility");

    // Selected event item
    const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || "");

    // Modal view triggers
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isResultOpen, setIsResultOpen] = useState(false);

    // Active candidate student for grading entry
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    // Fetch active event
    const activeEvent = events.find((e) => e.id === selectedEventId) || events[0];

    const handleCreateEvent = (data: any) => {
        createGradingEvent(data);
    };

    const handleRecordResultClick = (studentId: string) => {
        const studentObj = students.find((s) => s.id === studentId);
        if (studentObj) {
            setSelectedStudent(studentObj);
            setIsResultOpen(true);
        }
    };

    const handleSaveResult = (
        studentId: string,
        result: GradingResult,
        score: string,
        comments: string,
        instructor: string
    ) => {
        if (activeEvent) {
            recordGradingResult(activeEvent.id, studentId, result, score, comments, instructor);
        }
    };

    return (
        <div className="flex h-screen w-screen bg-[#F5F5F7] font-sans antialiased text-[#1C1C1E] lg:overflow-hidden select-none">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-y-auto bg-[#F5F5F7] p-4 sm:p-6 lg:p-8 pt-[72px] lg:pt-8">
                <div className="flex flex-col h-full">

                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight flex items-center gap-2">
                                <GraduationCap className="w-7 h-7 text-[#9E1B28] shrink-0" />
                                <span>Belt & Grading Promotion</span>
                            </h1>
                            <p className="text-sm text-[#6C6C70] mt-0.5 font-normal">
                                Assess candidate students belt progression path, verify class qualifications eligibility, and record promotion results.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsCreateOpen(true)}
                            className="bg-[#9E1B28] hover:bg-[#851621] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer select-none"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Schedule Grading Event</span>
                        </button>
                    </div>

                    {/* Tabs / Filter Navigation */}
                    <div className="bg-white border border-[#E5E5EA] rounded-2xl p-4 mb-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex border-b border-[#F2F2F7] sm:border-0 pb-2 sm:pb-0">
                            <button
                                onClick={() => setActiveTab("eligibility")}
                                className={`px-4 py-2 border-b-2 font-bold text-xs select-none cursor-pointer transition-all mr-4 flex items-center gap-1.5 ${activeTab === "eligibility"
                                    ? "border-[#9E1B28] text-[#9E1B28]"
                                    : "border-transparent text-[#8E8E93] hover:text-[#333]"
                                    }`}
                            >
                                <UserCheck className="w-4 h-4" />
                                <span>Grading Eligibility Checker</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("events")}
                                className={`px-4 py-2 border-b-2 font-bold text-xs select-none cursor-pointer transition-all flex items-center gap-1.5 ${activeTab === "events"
                                    ? "border-[#9E1B28] text-[#9E1B28]"
                                    : "border-transparent text-[#8E8E93] hover:text-[#333]"
                                    }`}
                            >
                                <Calendar className="w-4 h-4" />
                                <span>Promotion Events & Roster</span>
                            </button>
                        </div>

                        {/* Dropdown eligibility filter */}
                        {activeTab === "eligibility" && (
                            <div className="flex items-center gap-2 text-xs">
                                <span className="font-bold text-[#8E8E93] uppercase tracking-wider">Status:</span>
                                <select
                                    value={eligibilityFilter}
                                    onChange={(e) => setEligibilityFilter(e.target.value)}
                                    className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-2.5 py-1.5 font-bold text-[#3A3A3C] focus:outline-none"
                                >
                                    <option value="All">All candidates</option>
                                    <option value="Eligible">Eligible</option>
                                    <option value="Not Eligible">Not Eligible</option>
                                    <option value="Pending Review">Pending Review</option>
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Tab panels workspace */}
                    {activeTab === "eligibility" ? (
                        <div className="flex-1 bg-white border border-[#E5E5EA] rounded-3xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col min-h-0">
                            <div className="flex-1 overflow-x-auto overflow-y-auto">
                                <table className="w-full text-left border-collapse text-xs">
                                    <thead>
                                        <tr className="bg-[#FAFAFC] border-b border-[#F2F2F7] uppercase tracking-wider text-[10px] font-bold text-[#8E8E93] select-none h-11">
                                            <th className="px-6">Candidate student</th>
                                            <th className="px-6">Current belt</th>
                                            <th className="px-6">Target Belt</th>
                                            <th className="px-6 text-center">Class Attendance</th>
                                            <th className="px-6 text-center">Training Duration</th>
                                            <th className="px-6 text-center">Sensei Recommended</th>
                                            <th className="px-6">Eligibility State</th>
                                            <th className="px-6 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#F2F2F7]">
                                        {eligibilities.map((el) => (
                                            <tr key={el.studentId} className="hover:bg-slate-50/40 h-[56px] transition-colors">
                                                <td className="px-6">
                                                    <span className="font-bold text-gray-800">{el.studentName}</span>
                                                </td>
                                                <td className="px-6 font-semibold text-gray-700">
                                                    {el.currentBelt} Belt
                                                </td>
                                                <td className="px-6 font-bold text-[#9E1B28]">
                                                    {el.nextBelt === el.currentBelt ? `${el.currentBelt} (Max)` : `${el.nextBelt}`}
                                                </td>
                                                <td className="px-6 text-center font-bold text-[#1C1C1E]">
                                                    <span className={el.attendanceRate >= 85 ? "text-emerald-700" : "text-amber-600"}>
                                                        {el.attendanceRate}%
                                                    </span>
                                                </td>
                                                <td className="px-6 text-center font-semibold text-[#6c6c70]">
                                                    {el.trainingPeriodMonths} Months
                                                </td>
                                                <td className="px-6 text-center">
                                                    <button
                                                        onClick={() => toggleRecommendation(el.studentId)}
                                                        className={`px-3 py-1 rounded-xl text-[10.5px] font-bold border transition-all cursor-pointer ${el.recommendedByInstructor
                                                            ? "bg-[#E8F8F0] border-transparent text-[#25734A] shadow-6xs"
                                                            : "bg-stone-50 border-gray-250 text-[#8E8E93]"
                                                            }`}
                                                    >
                                                        {el.recommendedByInstructor ? "★ Recommended" : "☆ Recommend"}
                                                    </button>
                                                </td>
                                                <td className="px-6">
                                                    <span className={`px-2 py-0.5 rounded font-extrabold text-[9.5px] ${el.status === "Eligible" ? "bg-[#E8F8F0] text-[#25734A]" :
                                                        el.status === "Pending Review" ? "bg-orange-50 text-orange-700 border border-orange-200" :
                                                            "bg-[#FDE8EA] text-[#9E1B28]"
                                                        }`}>
                                                        {el.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 text-center">
                                                    {el.status === "Eligible" ? (
                                                        <span className="text-[10px] text-emerald-800 font-bold">Passed Requirements</span>
                                                    ) : (
                                                        <span className="text-[10px] text-[#8E8E93] italic font-medium">Borderline stats</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">

                            {/* Left panel events list (5 cols) */}
                            <div className="lg:col-span-5 flex flex-col gap-4 overflow-y-auto pr-1">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
                                    Promotion Exam Events ({events.length})
                                </h3>

                                {events.map((ev) => {
                                    const isSelected = ev.id === selectedEventId;
                                    return (
                                        <div
                                            key={ev.id}
                                            onClick={() => setSelectedEventId(ev.id)}
                                            className={`p-4 rounded-2xl border transition-all cursor-pointer text-left select-none ${isSelected
                                                ? "bg-white border-[#9E1B28] shadow-[0_4px_12px_rgba(158,27,40,0.06)]"
                                                : "bg-white border-[#E5E5EA] hover:border-[#C7C7CC]"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[9.5px] font-mono text-[#8E8E93] font-semibold bg-[#FAFAFC] border border-gray-100 px-1.5 py-0.5 rounded">
                                                    {ev.id}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold ${ev.status === "Completed" ? "bg-stone-100 text-stone-700" : "bg-[#E8F8F0] text-[#25734A]"
                                                    }`}>
                                                    {ev.status}
                                                </span>
                                            </div>

                                            <h4 className="font-extrabold text-[13.5px] leading-tight text-[#1C1C1E] mb-1">
                                                {ev.name}
                                            </h4>

                                            <p className="text-[11px] text-[#6C6C70] mb-3 line-clamp-1">
                                                By: {ev.examiner}
                                            </p>

                                            <div className="grid grid-cols-2 gap-2 text-[10px] text-[#8E8E8E] font-medium border-t border-[#F2F2F7] pt-2">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span>{ev.date}</span>
                                                </div>
                                                <div className="flex items-center gap-1 justify-end">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    <span className="truncate">{ev.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Right panel details / results log (7 cols) */}
                            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E5E5EA] p-6 flex flex-col min-h-0 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                                {activeEvent ? (
                                    <div className="flex flex-col h-full min-h-0">
                                        {/* Action Bar Header */}
                                        <div className="border-b border-[#F2F2F7] pb-4 mb-4">
                                            <h2 className="text-[16px] font-bold text-[#1C1C1E] leading-snug">
                                                {activeEvent.name}
                                            </h2>
                                            <div className="grid grid-cols-2 gap-y-1 gap-x-4 mt-2 text-[11px] font-medium text-[#8E8E93]">
                                                <div className="flex items-center gap-1">
                                                    <UserCheck className="w-3.5 h-3.5 text-stone-500" />
                                                    <span>Chief Examiner: <strong className="text-gray-700">{activeEvent.examiner}</strong></span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                                                    <span>Start Time: <strong className="text-gray-700">{activeEvent.time}</strong></span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Exam Candidates lists */}
                                        <div className="flex-1 flex flex-col min-h-0">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93] mb-3 flex items-center gap-1.5">
                                                <Award className="w-4 h-4 text-stone-500" />
                                                <span>Assessment Candidates ({activeEvent.eligibleStudentIds.length})</span>
                                            </h3>

                                            <div className="flex-1 overflow-y-auto border border-[#E5E5EA] rounded-2xl divide-y divide-[#F2F2F7]">
                                                {activeEvent.eligibleStudentIds.length > 0 ? (
                                                    activeEvent.eligibleStudentIds.map((studentId) => {
                                                        const studentObj = students.find((s) => s.id === studentId);
                                                        // Look up matching grading result logged
                                                        const recordObj = gradingRecords.find(
                                                            (r) => r.studentId === studentId && r.gradingDate === activeEvent.date
                                                        );

                                                        if (!studentObj) return null;

                                                        return (
                                                            <div key={studentId} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-white hover:bg-[#FAFAFC] transition-colors">
                                                                <div>
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="font-bold text-[#1C1C1E] text-xs">
                                                                            {studentObj.name}
                                                                        </span>
                                                                        <span className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 text-[9.5px] font-bold">
                                                                            {studentObj.belt} Belt
                                                                        </span>
                                                                    </div>
                                                                    {recordObj && recordObj.comments && (
                                                                        <div className="text-[10px] text-[#6C6C70] italic mt-1 font-medium max-w-[340px] leading-snug">
                                                                            &ldquo;{recordObj.comments}&rdquo;
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div className="flex items-center gap-3 shrink-0 align-self-end sm:self-center">
                                                                    {recordObj ? (
                                                                        <div className="flex items-center gap-1.5">
                                                                            <span className={`px-2 py-0.5 rounded font-extrabold text-[9.5px] ${recordObj.result === "Pass" ? "bg-[#E8F8F0] text-[#25734A]" :
                                                                                recordObj.result === "Fail" ? "bg-[#FDE8EA] text-[#9E1B28]" :
                                                                                    "bg-orange-50 text-orange-700 border border-orange-200"
                                                                                }`}>
                                                                                {recordObj.result} ({recordObj.score})
                                                                            </span>
                                                                        </div>
                                                                    ) : (
                                                                        <button
                                                                            onClick={() => handleRecordResultClick(studentId)}
                                                                            className="bg-stone-900 hover:bg-stone-850 text-white text-[10px] px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer select-none"
                                                                        >
                                                                            Record Results
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <div className="p-12 text-center text-[#8E8E93]">
                                                        No candidate students recorded on this event.
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center text-center text-[#8E8E93] gap-2">
                                        <GraduationCap className="w-8 h-8 opacity-40 text-stone-500" />
                                        <span className="text-xs font-semibold">Select an event schedule to record grading rosters</span>
                                    </div>
                                )}
                            </div>

                        </div>
                    )}
                </div>
            </main>

            {/* Modals Dialog Components */}
            <CreateGradingEventModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onSubmit={handleCreateEvent}
            />

            <RecordGradingResultModal
                isOpen={isResultOpen}
                onClose={() => {
                    setSelectedStudent(null);
                    setIsResultOpen(false);
                }}
                onSubmit={handleSaveResult}
                student={selectedStudent}
            />
        </div>
    );
}
