"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAttendance } from "@/hooks/useAttendance";
import { INITIAL_CLASSES, INITIAL_STUDENTS } from "@/data/mockData";
import { AttendanceStatus } from "@/types/attendance";
import { Clock, Search, Calendar, UserCheck, ShieldCheck, QrCode, ClipboardCheck, History } from "lucide-react";
import { StatusBadge } from "@/components/students/StatusBadge";
import { BeltBadge } from "@/components/students/BeltBadge";

export default function AttendancePage() {
    const {
        filteredAttendance,
        studentFilter,
        setStudentFilter,
        classFilter,
        setClassFilter,
        instructorFilter,
        setInstructorFilter,
        statusFilter,
        setStatusFilter,
        dateFilter,
        setDateFilter,
        markAttendanceSession,
        recordQrCodeCheckIn,
    } = useAttendance();

    // Tab view selection
    const [activeTab, setActiveTab] = useState<"mark" | "history">("mark");

    // "Mark Attendance" Form States
    const [selectedClassId, setSelectedClassId] = useState(INITIAL_CLASSES[0]?.id || "");
    const [sessionDate, setSessionDate] = useState(new Date().toISOString().split("T")[0]);
    const [markedBy, setMarkedBy] = useState("");

    // Roster checklist state
    const [rosterStates, setRosterStates] = useState<Record<string, { status: AttendanceStatus; checkInTime: string }>>({});

    // QR Simulated check-in states
    const [qrSimulationOpen, setQrSimulationOpen] = useState(false);
    const [simQrStudentId, setSimQrStudentId] = useState(INITIAL_STUDENTS[0]?.id || "");
    const [qrFeedback, setQrFeedback] = useState<{ success: boolean; message: string } | null>(null);

    // Get selected class name
    const selectedClassObj = INITIAL_CLASSES.find((c) => c.id === selectedClassId);

    // Auto populate designated instructor and roster when class changes
    useEffect(() => {
        if (selectedClassObj) {
            setMarkedBy(selectedClassObj.instructorName);

            // Find students in this class
            const studentsInClass = INITIAL_STUDENTS.filter((student) => {
                const sClass = student.class.toLowerCase().replace("class", "training").trim();
                const cName = selectedClassObj.name.toLowerCase().replace("class", "training").trim();
                return sClass.includes(cName) || cName.includes(sClass) || student.class.toLowerCase() === selectedClassObj.name.toLowerCase();
            });

            // Initialize checklist statuses
            const initialRoster: typeof rosterStates = {};
            const currentTime = new Date().toTimeString().slice(0, 5); // e.g. "17:15"
            studentsInClass.forEach((student) => {
                initialRoster[student.id] = {
                    status: "Present",
                    checkInTime: currentTime,
                };
            });
            setRosterStates(initialRoster);
        }
    }, [selectedClassId]);

    // Roster list for active class
    const activeClassRoster = INITIAL_STUDENTS.filter((student) => {
        if (!selectedClassObj) return false;
        const sClass = student.class.toLowerCase().replace("class", "training").trim();
        const cName = selectedClassObj.name.toLowerCase().replace("class", "training").trim();
        return sClass.includes(cName) || cName.includes(sClass) || student.class.toLowerCase() === selectedClassObj.name.toLowerCase();
    });

    const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
        const currentTime = new Date().toTimeString().slice(0, 5);
        setRosterStates((prev) => ({
            ...prev,
            [studentId]: {
                status,
                checkInTime: (status === "Present" || status === "Late") ? (prev[studentId]?.checkInTime || currentTime) : "",
            },
        }));
    };

    const handleTimeChange = (studentId: string, time: string) => {
        setRosterStates((prev) => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                checkInTime: time,
            },
        }));
    };

    const handleSaveSession = (e: React.FormEvent) => {
        e.preventDefault();

        const recordsList = Object.entries(rosterStates).map(([studentId, data]) => ({
            studentId,
            status: data.status,
            checkInTime: data.checkInTime,
        }));

        markAttendanceSession(selectedClassId, sessionDate, recordsList, markedBy || "Admin");

        // Show success alert
        alert(`Attendance session for "${selectedClassObj?.name}" saved successfully! Check the Attendance Log tab.`);
        setActiveTab("history");
    };

    // Simulated QR scan action
    const handleSimulateQrScan = () => {
        if (!simQrStudentId) return;

        const student = INITIAL_STUDENTS.find((s) => s.id === simQrStudentId);

        // Find which class matches this student's schedule
        const studentClassObj = INITIAL_CLASSES.find((c) => {
            const clName = c.name.toLowerCase().replace("training", "class");
            const sName = student?.class.toLowerCase().replace("training", "class");
            return clName.includes(sName || "") || sName?.includes(clName || "");
        }) || INITIAL_CLASSES[0];

        const todayStr = new Date().toISOString().split("T")[0];
        const timeNow = new Date().toTimeString().slice(0, 5);

        const res = recordQrCodeCheckIn(simQrStudentId, studentClassObj.id, todayStr, timeNow);

        setQrFeedback(res);
        setTimeout(() => setQrFeedback(null), 4000);
    };

    return (
        <div className="flex h-screen w-screen bg-[#F5F5F7] font-sans antialiased text-[#1C1C1E] overflow-hidden select-none">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-y-auto bg-[#F5F5F7] p-8">
                <div className="flex flex-col h-full">

                    {/* Header bar */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight">
                                Attendance & Check-in System
                            </h1>
                            <p className="text-sm text-[#6C6C70] mt-0.5 font-normal">
                                Track student logs and calculate attendance scores
                            </p>
                        </div>

                        {/* Top View Toggle controls */}
                        <div className="bg-[#E5E5EA] p-1 rounded-xl flex items-center gap-1">
                            <button
                                onClick={() => setActiveTab("mark")}
                                className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${activeTab === "mark"
                                        ? "bg-white text-[#1C1C1E] shadow-sm"
                                        : "text-[#6C6C70] hover:text-[#1C1C1E]"
                                    }`}
                            >
                                <UserCheck className="w-3.5 h-3.5" />
                                <span>Mark Attendance</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("history")}
                                className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${activeTab === "history"
                                        ? "bg-white text-[#1C1C1E] shadow-sm"
                                        : "text-[#6C6C70] hover:text-[#1C1C1E]"
                                    }`}
                            >
                                <History className="w-3.5 h-3.5" />
                                <span>Attendance Log</span>
                            </button>
                        </div>
                    </div>

                    {/* QR Code Scanner API Extension Block */}
                    <div className="mb-4 bg-[#FAFAFC] border border-[#E5E5EA] rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-white text-[#9E1B28] rounded-xl border border-[#E5E5EA] flex items-center justify-center shadow-xs">
                                <QrCode className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-xs text-[#1C1C1E]">
                                    Structured for QR Code Scan Check-in
                                </h4>
                                <p className="text-[10.5px] text-[#8E8E93] max-w-lg mt-0.5">
                                    The check-in API handles scanning payloads in `hooks/useAttendance.ts`. Record checkins dynamically via contactless QR cards.
                                </p>
                            </div>
                        </div>

                        {/* Scanner simulator toggle */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setQrSimulationOpen(!qrSimulationOpen)}
                                className="bg-[#9E1B28] hover:bg-[#851621] text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer select-none"
                            >
                                <QrCode className="w-3.5 h-3.5" />
                                <span>{qrSimulationOpen ? "Hide Simulator" : "Simulate QR Scan"}</span>
                            </button>
                        </div>
                    </div>

                    {/* QR Simulation Card Drawer */}
                    {qrSimulationOpen && (
                        <div className="mb-4 bg-white border border-[#9E1B28]/30 rounded-2xl p-4 shadow-sm animate-in fade-in slide-in-from-top-4 duration-200">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#9E1B28] mb-2 flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4" />
                                <span>QR Scan Emulator</span>
                            </h4>
                            <div className="flex flex-wrap items-center gap-3">
                                <label className="text-xs text-[#6C6C70] font-medium">Select Student QR card:</label>
                                <select
                                    value={simQrStudentId}
                                    onChange={(e) => setSimQrStudentId(e.target.value)}
                                    className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-lg px-2.5 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-semibold"
                                >
                                    {INITIAL_STUDENTS.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name} ({s.id}) &bull; {s.class}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    onClick={handleSimulateQrScan}
                                    className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
                                >
                                    Trigger scan check-in
                                </button>
                            </div>

                            {qrFeedback && (
                                <div className={`text-xs mt-3 p-2 rounded-lg font-medium animate-pulse ${qrFeedback.success ? "bg-[#E8F8F0] text-[#25734A]" : "bg-[#FDE8EA] text-[#9E1B28]"
                                    }`}>
                                    {qrFeedback.message} (Logged in History tab)
                                </div>
                            )}
                        </div>
                    )}

                    {/* TAB PANEL CONTENT */}
                    {activeTab === "mark" ? (
                        /* MARK ATTENDANCE VIEW */
                        <form onSubmit={handleSaveSession} className="flex-1 flex flex-col bg-white border border-[#E5E5EA] rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                            {/* Form Header Filter Settings */}
                            <div className="p-4 bg-[#FAFAFC] border-b border-[#E5E5EA] grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
                                        1. TARGET CLASS SESSION
                                    </label>
                                    <select
                                        value={selectedClassId}
                                        onChange={(e) => setSelectedClassId(e.target.value)}
                                        className="bg-white border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs font-medium text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28]"
                                    >
                                        {INITIAL_CLASSES.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name} ({c.day} &bull; {c.startTime})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
                                        2. DATE OF TRAINING
                                    </label>
                                    <input
                                        type="date"
                                        value={sessionDate}
                                        onChange={(e) => setSessionDate(e.target.value)}
                                        className="bg-white border border-[#E5E5EA] rounded-xl px-3 py-1.5 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]">
                                        3. MARKED BY (INSTRUCTOR)
                                    </label>
                                    <input
                                        type="text"
                                        value={markedBy}
                                        onChange={(e) => setMarkedBy(e.target.value)}
                                        className="bg-white border border-[#E5E5EA] rounded-xl px-3 py-1.5 text-xs text-[#1C1C1E] focus:outline-none"
                                        placeholder="Designated Sensei"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Student checklist roster */}
                            <div className="flex-1 overflow-y-auto">
                                {activeClassRoster.length > 0 ? (
                                    <table className="w-full text-left border-collapse min-w-[700px] text-xs">
                                        <thead>
                                            <tr className="border-b border-[#E5E5EA] bg-[#FAFAFC]/60 text-[11px] font-medium text-[#6C6C70]">
                                                <th className="py-2.5 px-4">Student</th>
                                                <th className="py-2.5 px-4">Current Belt</th>
                                                <th className="py-2.5 px-4 text-center">Attendance Register Status</th>
                                                <th className="py-2.5 px-4 text-center">Check-in Time</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#F2F2F7]">
                                            {activeClassRoster.map((student) => {
                                                const record = rosterStates[student.id] || { status: "Present", checkInTime: "" };
                                                const showTimeInput = record.status === "Present" || record.status === "Late";

                                                return (
                                                    <tr key={student.id} className="hover:bg-gray-50/50">
                                                        {/* Student Name */}
                                                        <td className="py-3 px-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-full bg-[#FDE8EA] text-[#9E1B28] font-bold flex items-center justify-center text-xs">
                                                                    {student.initials}
                                                                </div>
                                                                <div>
                                                                    <span className="font-semibold text-xs text-[#1C1C1E] block">
                                                                        {student.name}
                                                                    </span>
                                                                    <span className="text-[10px] text-[#8E8E93]">
                                                                        {student.id}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* Belt */}
                                                        <td className="py-3 px-4">
                                                            <BeltBadge belt={student.belt} />
                                                        </td>

                                                        {/* Toggle Actions */}
                                                        <td className="py-3 px-4">
                                                            <div className="flex items-center justify-center gap-1 md:gap-2">
                                                                {(["Present", "Absent", "Late", "Excused"] as AttendanceStatus[]).map((status) => {
                                                                    const isActive = record.status === status;

                                                                    // Style map
                                                                    let activeClass = "bg-gray-200 text-gray-700";
                                                                    if (isActive) {
                                                                        if (status === "Present") activeClass = "bg-[#25734A] text-white";
                                                                        if (status === "Absent") activeClass = "bg-[#9E1B28] text-white";
                                                                        if (status === "Late") activeClass = "bg-orange-500 text-white";
                                                                        if (status === "Excused") activeClass = "bg-blue-500 text-white";
                                                                    }

                                                                    return (
                                                                        <button
                                                                            key={status}
                                                                            type="button"
                                                                            onClick={() => handleStatusChange(student.id, status)}
                                                                            className={`px-3 py-1.5 rounded-lg text-[10.5px] font-semibold border border-transparent shadow-2xs hover:scale-105 active:scale-95 transition-all text-center select-none cursor-pointer ${isActive ? activeClass : "bg-white border-[#E5E5EA] text-[#3A3A3C] hover:bg-[#F2F2F7]"
                                                                                }`}
                                                                        >
                                                                            {status}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </td>

                                                        {/* Check-in time input */}
                                                        <td className="py-3 px-4">
                                                            <div className="flex items-center justify-center">
                                                                {showTimeInput ? (
                                                                    <div className="flex items-center gap-1 bg-[#FAFAFC] border border-[#E5E5EA] rounded-lg px-2 py-1">
                                                                        <Clock className="w-3.5 h-3.5 text-[#8E8E93]" />
                                                                        <input
                                                                            type="time"
                                                                            value={record.checkInTime}
                                                                            onChange={(e) => handleTimeChange(student.id, e.target.value)}
                                                                            className="bg-transparent border-none text-[11px] focus:outline-none w-14 font-medium"
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-[#8E8E93] text-[11px] font-medium italic">N/A</span>
                                                                )}
                                                            </div>
                                                        </td>

                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-12 text-center text-[#8E8E93]">
                                        No students registered inside the "{selectedClassObj?.name}" roster.
                                    </div>
                                )}
                            </div>

                            {/* Save row footer bar */}
                            <div className="p-4 bg-[#FAFAFC] border-t border-[#E5E5EA] flex items-center justify-between">
                                <span className="text-[11px] text-[#6C6C70] font-medium">
                                    Ready to sign {activeClassRoster.length} student registers for date {sessionDate}.
                                </span>
                                <button
                                    type="submit"
                                    disabled={activeClassRoster.length === 0}
                                    className="bg-[#9E1B28] hover:bg-[#851621] disabled:opacity-50 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-colors cursor-pointer"
                                >
                                    Sign & Save Attendance Session
                                </button>
                            </div>
                        </form>
                    ) : (
                        /* ATTENDANCE HISTORY/LOG VIEW */
                        <div className="flex-1 flex flex-col gap-4">
                            {/* Filtering row */}
                            <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 gap-3 bg-white p-4 rounded-2xl border border-[#E5E5EA] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">

                                {/* Search student */}
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider">Student Name</span>
                                    <input
                                        type="text"
                                        placeholder="Search student..."
                                        value={studentFilter === "All students" ? "" : studentFilter}
                                        onChange={(e) => setStudentFilter(e.target.value || "All students")}
                                        className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#1C1C1E]"
                                    />
                                </div>

                                {/* Class filter */}
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider">Class</span>
                                    <select
                                        value={classFilter}
                                        onChange={(e) => setClassFilter(e.target.value)}
                                        className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#3A3A3C]"
                                    >
                                        <option value="All classes">All classes</option>
                                        {INITIAL_CLASSES.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Instructor filter */}
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider">Instructor / Marked By</span>
                                    <select
                                        value={instructorFilter}
                                        onChange={(e) => setInstructorFilter(e.target.value)}
                                        className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#3A3A3C]"
                                    >
                                        <option value="All instructors">All instructors</option>
                                        <option value="Sensei Hiroshi Tanaka">Sensei Hiroshi Tanaka</option>
                                        <option value="Sensei Nadia Perera">Sensei Nadia Perera</option>
                                        <option value="Sensei Marcus Silva">Sensei Marcus Silva</option>
                                        <option value="Sensei Ayesha Fernando">Sensei Ayesha Fernando</option>
                                        <option value="Scanner">Self Check-in (QR Scanner)</option>
                                    </select>
                                </div>

                                {/* Status filter */}
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider">Presence Status</span>
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#3A3A3C]"
                                    >
                                        <option value="All statuses">All statuses</option>
                                        <option value="Present">Present</option>
                                        <option value="Absent">Absent</option>
                                        <option value="Late">Late</option>
                                        <option value="Excused">Excused</option>
                                    </select>
                                </div>

                                {/* Date filter */}
                                <div className="flex flex-col gap-1 sm:col-span-4 md:col-span-1">
                                    <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider">Check-in Date</span>
                                    <input
                                        type="date"
                                        value={dateFilter}
                                        onChange={(e) => setDateFilter(e.target.value)}
                                        className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-1 text-xs text-[#1C1C1E] font-semibold"
                                    />
                                    {dateFilter && (
                                        <button onClick={() => setDateFilter("")} className="text-[9px] text-[#9E1B28] font-bold mt-0.5 text-left hover:underline">
                                            Clear date filter
                                        </button>
                                    )}
                                </div>

                            </div>

                            {/* Logs History Table */}
                            <div className="bg-white rounded-2xl border border-[#E5E5EA] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex-1 flex flex-col">
                                <div className="overflow-x-auto flex-1">
                                    <table className="w-full text-left border-collapse min-w-[800px] text-xs">
                                        <thead>
                                            <tr className="border-b border-[#E5E5EA] bg-[#FAFAFC] text-[12px] font-medium text-[#6C6C70]">
                                                <th className="py-3 px-4">Date</th>
                                                <th className="py-3 px-4">Class</th>
                                                <th className="py-3 px-4">Student</th>
                                                <th className="py-3 px-4">Check-in Time</th>
                                                <th className="py-3 px-4">Status</th>
                                                <th className="py-3 px-4">Marked By</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#F2F2F7]">
                                            {filteredAttendance.length > 0 ? (
                                                filteredAttendance.map((rec) => (
                                                    <tr key={rec.id} className="hover:bg-gray-50/50">
                                                        <td className="py-3 px-4 font-semibold text-[#1C1C1E]">
                                                            {rec.date}
                                                        </td>
                                                        <td className="py-3 px-4 text-[#3A3A3C] font-semibold">
                                                            {rec.className}
                                                        </td>
                                                        <td className="py-3 px-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-7 h-7 rounded-full bg-[#FDE8EA] text-[#9E1B28] font-semibold flex items-center justify-center text-[10px]">
                                                                    {rec.studentInitials}
                                                                </div>
                                                                <div>
                                                                    <span className="font-bold text-[12px] text-[#1C1C1E]">
                                                                        {rec.studentName}
                                                                    </span>
                                                                    <span className="block text-[10px] text-[#8E8E93] font-mono leading-none">
                                                                        {rec.studentId}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-4 text-[#3A3A3C] font-semibold">
                                                            {rec.checkInTime || "--:--"}
                                                        </td>
                                                        <td className="py-3 px-4">
                                                            <span
                                                                className={`px-3 py-1 rounded-full text-[10px] font-bold border ${rec.status === "Present" ? 'bg-[#E8F8F0] text-[#25734A] border-[#4AD991]/30' :
                                                                        rec.status === "Absent" ? 'bg-[#FDE8EA] text-[#9E1B28] border-[#9E1B28]/20' :
                                                                            rec.status === "Late" ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                                                                'bg-blue-50 text-blue-700 border-blue-200'
                                                                    }`}
                                                            >
                                                                {rec.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4 text-[#8E8E93] font-medium">
                                                            {rec.markedBy}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={6} className="py-12 text-center text-[#8E8E93] font-semibold">
                                                        No check-in logs match your active search filters.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="px-4 py-3 border-t border-[#E5E5EA] bg-white flex items-center justify-between text-xs text-[#6C6C70]">
                                    <span>Showing {filteredAttendance.length} check-in entries</span>
                                    <span>Page 1 of 1</span>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}
