import React, { useState } from "react";
import { X } from "lucide-react";
import { CompetitionType } from "@/types/tournament";
import { INITIAL_STUDENTS } from "@/data/mockData";

interface RegisterStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (studentId: string, category: {
        ageCategory: string;
        beltCategory: string;
        weightCategory: string;
        competitionType: CompetitionType;
    }) => { success: boolean; message: string };
    tournamentName: string;
}

const AGE_CATEGORIES = ["Children Under 10", "Children Under 12", "Cadet (14-15)", "Junior (16-17)", "Under 21", "Adults (18+)"];
const BELT_CATEGORIES = ["White-Yellow Belt", "Yellow-Green Belt", "Green-Brown Belt", "Brown-Black Belt", "Black Belt", "All Belts"];
const WEIGHT_CATEGORIES = ["Under 30kg", "Under 35kg", "Under 45kg", "Under 52kg", "Under 55kg", "Under 67kg", "Open weight"];

export function RegisterStudentModal({ isOpen, onClose, onSubmit, tournamentName }: RegisterStudentModalProps) {
    const [studentId, setStudentId] = useState(INITIAL_STUDENTS[0]?.id || "");
    const [ageCategory, setAgeCategory] = useState(AGE_CATEGORIES[0]);
    const [beltCategory, setBeltCategory] = useState(BELT_CATEGORIES[0]);
    const [weightCategory, setWeightCategory] = useState(WEIGHT_CATEGORIES[0]);
    const [competitionType, setCompetitionType] = useState<CompetitionType>("Kata");

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        const result = onSubmit(studentId, {
            ageCategory,
            beltCategory,
            weightCategory,
            competitionType,
        });

        if (result.success) {
            setSuccessMsg(result.message);
            setTimeout(() => {
                setSuccessMsg("");
                onClose();
            }, 2000);
        } else {
            setErrorMsg(result.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div
                className="bg-white rounded-3xl w-full max-w-md shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-[#E5E5EA] animate-in fade-in-50 zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#F2F2F7] px-6 py-4 bg-[#FAFAFC]">
                    <div>
                        <h2 className="text-md font-bold text-[#1C1C1E]">Register Competitor</h2>
                        <p className="text-[11.5px] text-[#8E8E93] mt-0.5 max-w-[280px] truncate">
                            For tournament: {tournamentName}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-[#E5E5EA] text-[#8E8E93] hover:text-[#1C1C1E] transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-y-auto p-6 space-y-4">
                    {/* Feedback Messages */}
                    {errorMsg && (
                        <div className="bg-[#FDE8EA] text-[#9E1B28] text-xs font-semibold p-2.5 rounded-xl border border-[#9E1B28]/10">
                            {errorMsg}
                        </div>
                    )}
                    {successMsg && (
                        <div className="bg-[#E8F8F0] text-[#25734A] text-xs font-semibold p-2.5 rounded-xl border border-[#4AD991]/20">
                            {successMsg}
                        </div>
                    )}

                    {/* Competitor Select */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">Select Student Member</label>
                        <select
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2.5 text-xs text-[#1C1C1E] focus:outline-none font-semibold"
                            required
                        >
                            {INITIAL_STUDENTS.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name} ({s.belt}) &bull; {s.id}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Type select */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">Competition Category Type</label>
                        <div className="grid grid-cols-2 gap-2 mt-0.5">
                            {(["Kata", "Kumite"] as CompetitionType[]).map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setCompetitionType(type)}
                                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${competitionType === type
                                            ? "bg-[#9E1B28] border-transparent text-white shadow-xs"
                                            : "bg-[#FAFAFC] border-[#E5E5EA] text-[#333] hover:bg-[#F2F2F7]"
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Age Category */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">Weight Group</label>
                        <select
                            value={weightCategory}
                            onChange={(e) => setWeightCategory(e.target.value)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2.5 text-xs text-[#1C1C1E] focus:outline-none font-medium"
                        >
                            {WEIGHT_CATEGORIES.map((w) => (
                                <option key={w} value={w}>{w}</option>
                            ))}
                        </select>
                    </div>

                    {/* Age Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">Age Category</label>
                            <select
                                value={ageCategory}
                                onChange={(e) => setAgeCategory(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2.5 text-xs text-[#1C1C1E] focus:outline-none font-medium"
                            >
                                {AGE_CATEGORIES.map((a) => (
                                    <option key={a} value={a}>{a}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">Belt Requirement</label>
                            <select
                                value={beltCategory}
                                onChange={(e) => setBeltCategory(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2.5 text-xs text-[#1C1C1E] focus:outline-none font-medium"
                            >
                                {BELT_CATEGORIES.map((b) => (
                                    <option key={b} value={b}>{b}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-[#F2F2F7] mt-2 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-[#F2F2F7] hover:bg-[#E5E5EA] text-[#3A3A3C] px-4 py-2.5 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-[#9E1B28] hover:bg-[#851621] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-colors cursor-pointer"
                        >
                            Confirm Registration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
