import React, { useState, useEffect } from "react";
import { X, Award } from "lucide-react";
import { GradingResult } from "@/types/grading";
import { Student } from "@/types/student";

interface RecordGradingResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (
        studentId: string,
        result: GradingResult,
        score: string,
        comments: string,
        instructor: string
    ) => void;
    student: Student | null;
}

export function RecordGradingResultModal({ isOpen, onClose, onSubmit, student }: RecordGradingResultModalProps) {
    const [result, setResult] = useState<GradingResult>("Pass");
    const [score, setScore] = useState("");
    const [comments, setComments] = useState("");
    const [instructor, setInstructor] = useState("Sensei Rajeev Ekanayake");

    useEffect(() => {
        if (isOpen && student) {
            setResult("Pass");
            setScore("");
            setComments("");
            setInstructor("Sensei Rajeev Ekanayake");
        }
    }, [isOpen, student]);

    if (!isOpen || !student) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(student.id, result, score, comments, instructor);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div
                className="bg-white rounded-3xl w-full max-w-sm shadow-2xl flex flex-col border border-[#E5E5EA] animate-in fade-in-50 zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#F2F2F7] px-6 py-4 bg-[#FAFAFC] rounded-t-3xl">
                    <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#9E1B28] shrink-0" />
                        <div>
                            <h2 className="text-sm font-bold text-[#1C1C1E]">Record Grading Evaluation</h2>
                            <p className="text-[10px] text-[#8E8E93] mt-0.5">Define rank upgrades or revision guidelines</p>
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
                <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-semibold">

                    {/* Student Identity */}
                    <div className="bg-[#FAFAFC] border border-[#E5E5EA] p-3 rounded-xl">
                        <span className="text-[10px] font-bold text-[#8E8E93] block uppercase">Student Candidate</span>
                        <div className="flex items-center justify-between mt-1">
                            <span className="font-extrabold text-gray-800 text-xs">{student.name}</span>
                            <span className="bg-stone-100 text-stone-700 font-bold px-2 py-0.5 rounded text-[9.5px]">
                                {student.belt} Belt
                            </span>
                        </div>
                    </div>

                    {/* Result */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Assessment Result</label>
                        <div className="grid grid-cols-3 gap-2 mt-0.5">
                            {([
                                { key: "Pass", label: "✅ Pass" },
                                { key: "Fail", label: "❌ Fail" },
                                { key: "Pending", label: "⏳ Pending" }
                            ] as { key: GradingResult; label: string }[]).map((opt) => (
                                <button
                                    key={opt.key}
                                    type="button"
                                    onClick={() => setResult(opt.key)}
                                    className={`py-2 rounded-xl text-[10.5px] font-bold border transition-all cursor-pointer ${result === opt.key
                                            ? "bg-[#9E1B28] border-transparent text-white shadow-xs"
                                            : "bg-[#FAFAFC] border-[#E5E5EA] text-[#333] hover:bg-[#F2F2F7]"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Score & Examiner */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Scoring Mark</label>
                            <input
                                type="text"
                                placeholder="e.g. 88/100 or Pass"
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Examiner Sign</label>
                            <input
                                type="text"
                                value={instructor}
                                onChange={(e) => setInstructor(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-semibold"
                                required
                            />
                        </div>
                    </div>

                    {/* Examiner Comments */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Instructor Examiner Comments</label>
                        <textarea
                            rows={3}
                            placeholder="Detail performance highlights, stance accuracy, kata synchronization notes..."
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-1.5 text-xs text-[#1C1C1E] focus:outline-none font-medium resize-none"
                            required
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
                            Submit Assessment
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
