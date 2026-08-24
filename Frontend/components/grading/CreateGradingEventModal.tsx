import React, { useState } from "react";
import { X, Calendar } from "lucide-react";
import { INITIAL_STUDENTS } from "@/data/mockData";

interface CreateGradingEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: {
        name: string;
        date: string;
        time: string;
        location: string;
        examiner: string;
        eligibleStudentIds: string[];
        notes?: string;
    }) => void;
}

export function CreateGradingEventModal({ isOpen, onClose, onSubmit }: CreateGradingEventModalProps) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [examiner, setExaminer] = useState("");
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    const [notes, setNotes] = useState("");

    if (!isOpen) return null;

    const handleStudentToggle = (id: string) => {
        setSelectedStudents((prev) =>
            prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            name,
            date,
            time,
            location,
            examiner,
            eligibleStudentIds: selectedStudents,
            notes,
        });

        // Reset forms
        setName("");
        setDate("");
        setTime("");
        setLocation("");
        setExaminer("");
        setSelectedStudents([]);
        setNotes("");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div
                className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-[#E5E5EA] animate-in fade-in-50 zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#F2F2F7] px-6 py-4 bg-[#FAFAFC] rounded-t-3xl">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-[#9E1B28] shrink-0" />
                        <div>
                            <h2 className="text-sm font-bold text-[#1C1C1E]">Schedule Belt Grading Event</h2>
                            <p className="text-[10px] text-[#8E8E93] mt-0.5">Determine the examiner panel and eligible competitors list</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-[#E5E5EA] text-[#8E8E93] hover:text-[#1C1C1E] transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs font-semibold">

                    {/* Event Name */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Event Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Autumn Belt Promotion Assessments"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2.5 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                            required
                        />
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Exam Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none font-medium"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Start Time</label>
                            <input
                                type="text"
                                placeholder="e.g. 09:30 AM"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none font-medium"
                                required
                            />
                        </div>
                    </div>

                    {/* Venue & Chief Examiner */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Location / Venue</label>
                            <input
                                type="text"
                                placeholder="e.g. Dojo Court A"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none font-medium"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Examiner / Evaluators</label>
                            <input
                                type="text"
                                placeholder="e.g. Sensei Kumar (4th Dan)"
                                value={examiner}
                                onChange={(e) => setExaminer(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none font-medium"
                                required
                            />
                        </div>
                    </div>

                    {/* Eligible Student checkboxes list */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Invite Competitors / Students</label>
                        <div className="border border-[#E5E5EA] bg-[#FAFAFC] rounded-2xl max-h-[140px] overflow-y-auto divide-y divide-[#F2F2F7] p-2">
                            {INITIAL_STUDENTS.map((s) => {
                                const isChecked = selectedStudents.includes(s.id);
                                return (
                                    <div
                                        key={s.id}
                                        onClick={() => handleStudentToggle(s.id)}
                                        className="flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors cursor-pointer select-none text-[11px] font-medium"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            readOnly
                                            className="accent-[#9E1B28] cursor-pointer"
                                        />
                                        <span className="flex-1 text-[#1C1C1E] font-bold">{s.name}</span>
                                        <span className="text-[#8E8E93] text-[10px]">{s.belt} Belt</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Special Instructions Notes */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Examiner Instructions Notes</label>
                        <textarea
                            rows={2}
                            placeholder="Add brief items (e.g. brown belts bring sparring guards, white belts syllabus forms)..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-1.5 text-xs text-[#1C1C1E] focus:outline-none font-medium resize-none"
                        />
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#F2F2F7]">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-[#F2F2F7] hover:bg-[#E5E5EA] text-[#3A3A3C] px-3.5 py-2.5 rounded-xl text-center cursor-pointer select-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-[#9E1B28] hover:bg-[#851621] text-white px-4 py-2.5 rounded-xl text-center shadow-xs cursor-pointer select-none font-bold"
                        >
                            Confirm Schedule
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
