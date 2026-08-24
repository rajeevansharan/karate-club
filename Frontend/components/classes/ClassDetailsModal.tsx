import React from "react";
import { X, Clock, MapPin, Award, User, Phone, Mail, Users, CalendarDays, ArrowRight } from "lucide-react";
import { ClassSession } from "@/types/class";
import { INITIAL_STUDENTS } from "@/data/mockData";
import { INITIAL_INSTRUCTORS } from "@/data/mockData"; // reference details
import { BeltBadge } from "@/components/students/BeltBadge";
import { StatusBadge } from "@/components/students/StatusBadge";

interface ClassDetailsModalProps {
    cls: ClassSession | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ClassDetailsModal({ cls, isOpen, onClose }: ClassDetailsModalProps) {
    if (!isOpen || !cls) return null;

    // Find the instructor details
    const instructor = INITIAL_INSTRUCTORS.find((i) => i.id === cls.instructorId) || {
        name: cls.instructorName,
        phone: "+94 77 123 4567",
        email: "contact@shotokanclub.com",
        experience: "10 yrs",
        grade: "Black Belt",
    };

    // Filter enrolled students dynamically from mockData
    // Matching "Competition Class" to "Competition Training" or direct class name matches
    const enrolledStudents = INITIAL_STUDENTS.filter((student) => {
        const sClass = student.class.toLowerCase().replace("class", "training").trim();
        const cName = cls.name.toLowerCase().replace("class", "training").trim();
        return sClass.includes(cName) || cName.includes(sClass) || student.class.toLowerCase() === cls.name.toLowerCase();
    });

    // Mock Attendance history for this class
    const attendanceHistory = [
        { date: "Aug 21 (Fri)", attendedClass: Math.round(enrolledStudents.length * 0.9), total: enrolledStudents.length },
        { date: "Aug 18 (Tue)", attendedClass: Math.round(enrolledStudents.length * 0.8), total: enrolledStudents.length },
        { date: "Aug 14 (Fri)", attendedClass: enrolledStudents.length, total: enrolledStudents.length },
        { date: "Aug 11 (Tue)", attendedClass: Math.round(enrolledStudents.length * 0.75), total: enrolledStudents.length },
    ];

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div
                className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-[#E5E5EA] animate-in fade-in-50 zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#F2F2F7] px-6 py-4 bg-[#FAFAFC]">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs font-semibold text-[#8E8E93] bg-[#E5E5EA] px-2 py-0.5 rounded-md">
                                {cls.id}
                            </span>
                            <StatusBadge status={cls.status} type="status" />
                        </div>
                        <h2 className="text-xl font-bold text-[#1C1C1E]">{cls.name}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-[#E5E5EA] text-[#8E8E93] hover:text-[#1C1C1E] transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#F2F2F7]">

                    {/* Left Pane: Class Details & Instructor (5 cols) */}
                    <div className="md:col-span-5 p-6 flex flex-col gap-6">

                        {/* Class Info Box */}
                        <div>
                            <h3 className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider mb-3">
                                Class Schedule & Info
                            </h3>
                            <div className="space-y-3.5 bg-[#FAFAFC] p-4 rounded-2xl border border-[#E5E5EA]">
                                <div className="flex items-center gap-3">
                                    <CalendarDays className="w-4 h-4 text-[#9E1B28] shrink-0" />
                                    <div>
                                        <span className="text-[10px] text-[#8E8E93] block">DAY & TIME</span>
                                        <span className="text-[13px] font-semibold text-[#1C1C1E]">
                                            {cls.day}, {cls.startTime} - {cls.endTime}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin className="w-4 h-4 text-[#8E8E93] shrink-0" />
                                    <div>
                                        <span className="text-[10px] text-[#8E8E93] block">LOCATION</span>
                                        <span className="text-[13px] font-semibold text-[#1C1C1E]">
                                            {cls.location}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Award className="w-4 h-4 text-[#8E8E93] shrink-0" />
                                    <div>
                                        <span className="text-[10px] text-[#8E8E93] block">AGE GROUP & BELT</span>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="bg-[#E5E5EA]/70 text-[#3A3A3C] px-2 py-0.5 rounded text-[11px] font-medium">
                                                {cls.ageGroup}
                                            </span>
                                            <BeltBadge belt={cls.minBelt} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Instructor Details Box */}
                        <div>
                            <h3 className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider mb-3">
                                Assigned Instructor
                            </h3>
                            <div className="bg-white border border-[#E5E5EA] p-4 rounded-2xl shadow-[0_2px_6px_rgba(0,0,0,0.01)]">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-[#FDE8EA] text-[#9E1B28] font-bold flex items-center justify-center text-sm shrink-0">
                                        {cls.instructorName.replace("Sensei ", "").slice(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-[#1C1C1E]">
                                            {cls.instructorName}
                                        </h4>
                                        <span className="text-[11px] text-[#8E8E93] font-medium">
                                            {instructor.grade} | {instructor.experience} Exp
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-2 text-[12px] text-[#3A3A3C]">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-3.5 h-3.5 text-[#8E8E93]" />
                                        <span>{instructor.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-3.5 h-3.5 text-[#8E8E93]" />
                                        <span>{instructor.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Attendance Trend Summary */}
                        <div>
                            <h3 className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider mb-2.5">
                                Recent Attendance Log
                            </h3>
                            <div className="space-y-2">
                                {attendanceHistory.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-[#F2F2F7]">
                                        <span className="text-[#6C6C70] font-medium">{item.date}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-[#1C1C1E]">
                                                {item.attendedClass} / {item.total || enrolledStudents.length || cls.currentStudents || 10}
                                            </span>
                                            <span className="text-[10px] bg-[#E8F8F0] text-[#25734A] px-1.5 py-0.2 rounded font-bold">
                                                {Math.round((item.attendedClass / (item.total || enrolledStudents.length || cls.currentStudents || 10)) * 100)}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Pane: Enrolled Students (7 cols) */}
                    <div className="md:col-span-7 p-6 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider">
                                    Enrolled Students
                                </h3>
                                <p className="text-xs text-[#6C6C70] mt-0.5 font-medium">
                                    {enrolledStudents.length} student records found
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 bg-[#FAFAFC] px-2.5 py-1 rounded-lg border border-[#E5E5EA] text-[11px] text-[#3A3A3C] font-semibold">
                                <Users className="w-3.5 h-3.5 text-[#9E1B28]" />
                                <span>Max capacity: {cls.maxStudents}</span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto border border-[#E5E5EA] rounded-2xl divide-y divide-[#F2F2F7] max-h-[380px] scrollbar-thin">
                            {enrolledStudents.length > 0 ? (
                                enrolledStudents.map((student) => (
                                    <div key={student.id} className="flex items-center justify-between p-3 hover:bg-[#FAFAFC] transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#FDE8EA] text-[#9E1B28] font-bold flex items-center justify-center text-xs">
                                                {student.initials}
                                            </div>
                                            <div>
                                                <span className="font-semibold text-xs text-[#1C1C1E] block">
                                                    {student.name}
                                                </span>
                                                <span className="text-[10px] text-[#8E8E93] font-mono">
                                                    {student.id} &bull; {student.phone}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <BeltBadge belt={student.belt} />
                                            <StatusBadge status={student.status} type="status" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center flex flex-col items-center justify-center text-[#8E8E93]">
                                    <Users className="w-8 h-8 text-[#D1D1D6] mb-2" />
                                    <span className="text-xs font-semibold">No students currently enrolled</span>
                                    <span className="text-[10px] text-gray-400 mt-1 max-w-[200px]">
                                        Newly created classes won't show enrolled members until they are assigned from the Student page.
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
