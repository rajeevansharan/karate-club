import React, { useState, useEffect } from "react";
import { X, Award } from "lucide-react";
import { TournamentRegistration, MedalType } from "@/types/tournament";

interface RecordResultsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (registrationId: string, data: {
        participated: boolean;
        position?: number;
        medal: MedalType;
        score?: string;
        notes?: string;
    }) => void;
    registration: TournamentRegistration | null;
}

export function RecordResultsModal({ isOpen, onClose, onSubmit, registration }: RecordResultsModalProps) {
    const [participated, setParticipated] = useState(true);
    const [position, setPosition] = useState<string>("");
    const [medal, setMedal] = useState<MedalType>("None");
    const [score, setScore] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        if (isOpen && registration) {
            setParticipated(registration.participated);
            setPosition(registration.position ? String(registration.position) : "");
            setMedal(registration.medal || "None");
            setScore(registration.score || "");
            setNotes(registration.notes || "");
        }
    }, [isOpen, registration]);

    if (!isOpen || !registration) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(registration.id, {
            participated,
            position: position ? Number(position) : undefined,
            medal,
            score,
            notes,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div
                className="bg-white rounded-3xl w-full max-w-md shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-[#E5E5EA] animate-in fade-in-50 zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#F2F2F7] px-6 py-4 bg-[#FAFAFC]">
                    <div>
                        <h2 className="text-md font-bold text-[#1C1C1E] flex items-center gap-1.5">
                            <Award className="w-5 h-5 text-[#9E1B28] shrink-0" />
                            <span>Record Participant Result</span>
                        </h2>
                        <p className="text-xs text-[#8E8E93] mt-0.5">
                            Competitor: <span className="font-semibold text-gray-700">{registration.studentName}</span>
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
                    {/* Participation toggle */}
                    <div className="bg-[#FAFAFC] p-3 rounded-xl border border-[#E5E5EA] flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#3A3A3C]">Did the competitor show up?</span>
                        <div className="flex bg-[#E5E5EA] p-0.5 rounded-lg">
                            <button
                                type="button"
                                onClick={() => setParticipated(true)}
                                className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${participated ? "bg-white text-emerald-800 shadow-xs" : "text-[#6C6C70]"
                                    }`}
                            >
                                Attended
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setParticipated(false);
                                    setMedal("None");
                                    setPosition("");
                                }}
                                className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${!participated ? "bg-white text-[#9E1B28] shadow-xs" : "text-[#6C6C70]"
                                    }`}
                            >
                                No Show
                            </button>
                        </div>
                    </div>

                    {participated && (
                        <>
                            {/* Position & Score */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">Finish Placement / Position</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="64"
                                        placeholder="e.g. 1, 2, 3"
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)}
                                        className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">Judges Rating / Score</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 24.8 pts or 4-1"
                                        value={score}
                                        onChange={(e) => setScore(e.target.value)}
                                        className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                                    />
                                </div>
                            </div>

                            {/* Medal */}
                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">Medal Placement</label>
                                <div className="grid grid-cols-4 gap-2 mt-0.5">
                                    {([
                                        { key: "Gold", label: "🥇 Gold" },
                                        { key: "Silver", label: "🥈 Silver" },
                                        { key: "Bronze", label: "🥉 Bronze" },
                                        { key: "None", label: "❌ None" }
                                    ] as { key: MedalType; label: string }[]).map((opt) => (
                                        <button
                                            key={opt.key}
                                            type="button"
                                            onClick={() => setMedal(opt.key)}
                                            className={`py-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${medal === opt.key
                                                    ? "bg-[#9E1B28] border-transparent text-white shadow-xs"
                                                    : "bg-[#FAFAFC] border-[#E5E5EA] text-[#3A3A3C] hover:bg-[#F2F2F7]"
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Notes */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">Match Performance Notes</label>
                        <textarea
                            rows={3}
                            placeholder="Add brief details about their sparring strategy or form grading highlights..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none font-medium resize-none"
                        />
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
                            Save Results
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
