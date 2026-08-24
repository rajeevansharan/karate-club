"use client";

import React, { useState } from "react";
import { X, Award, Medal, FileText, Calendar, User, Trophy } from "lucide-react";
import { AchievementType } from "@/types/achievement";
import { Student } from "@/types/student";

interface AddAchievementModalProps {
    isOpen: boolean;
    onClose: () => void;
    students: Student[];
    onSubmit: (data: {
        title: string;
        studentId: string;
        type: AchievementType;
        date: string;
        description: string;
        awardPosition?: string;
        certificateNumber?: string;
        relatedTournament?: string;
        issuedBy?: string;
    }) => void;
}

const ACHIEVEMENT_TYPES: AchievementType[] = [
    "Tournament Medal",
    "Belt Promotion",
    "Best Student",
    "Attendance Award",
    "Special Recognition",
    "Competition Participation",
    "Certificate",
];

export function AddAchievementModal({
    isOpen,
    onClose,
    students,
    onSubmit,
}: AddAchievementModalProps) {
    const [title, setTitle] = useState("");
    const [studentId, setStudentId] = useState(students[0]?.id || "");
    const [type, setType] = useState<AchievementType>("Tournament Medal");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [awardPosition, setAwardPosition] = useState("");
    const [description, setDescription] = useState("");
    const [certificateNumber, setCertificateNumber] = useState("");
    const [relatedTournament, setRelatedTournament] = useState("");
    const [issuedBy, setIssuedBy] = useState("Sensei Hiroshi Tanaka");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !studentId) return;

        onSubmit({
            title,
            studentId,
            type,
            date,
            description,
            awardPosition,
            certificateNumber,
            relatedTournament,
            issuedBy,
        });

        // Reset form
        setTitle("");
        setAwardPosition("");
        setDescription("");
        setCertificateNumber("");
        setRelatedTournament("");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 select-none">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-[#E5E5EA] animate-in fade-in-50 zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#F2F2F7] px-6 py-4 bg-[#FAFAFC]">
                    <div>
                        <h2 className="text-lg font-bold text-[#1C1C1E] flex items-center gap-2">
                            <Award className="w-5 h-5 text-[#9E1B28]" />
                            <span>Issue New Achievement</span>
                        </h2>
                        <p className="text-xs text-[#8E8E93] mt-0.5 font-medium">
                            Award medals, certificates, or special recognition to students.
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
                    {/* Achievement Title */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">
                            Achievement Title *
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Western Province Kata Gold Medal"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                        />
                    </div>

                    {/* Student & Type Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">
                                Student Recipient *
                            </label>
                            <select
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2.5 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                                required
                            >
                                {students.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name} ({s.belt} Belt)
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">
                                Achievement Category *
                            </label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value as AchievementType)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2.5 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                                required
                            >
                                {ACHIEVEMENT_TYPES.map((t) => (
                                    <option key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Award/Position & Date Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">
                                Award / Position / Distinction
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Gold Medal, 1st Place, High Distinction"
                                value={awardPosition}
                                onChange={(e) => setAwardPosition(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">
                                Award Date *
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                                required
                            />
                        </div>
                    </div>

                    {/* Certificate Number & Tournament Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">
                                Certificate Number (Optional)
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. CERT-2026-104"
                                value={certificateNumber}
                                onChange={(e) => setCertificateNumber(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">
                                Related Tournament (Optional)
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. National Championship 2026"
                                value={relatedTournament}
                                onChange={(e) => setRelatedTournament(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                            />
                        </div>
                    </div>

                    {/* Issued By Sensei */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">
                            Issued / Signed By
                        </label>
                        <input
                            type="text"
                            value={issuedBy}
                            onChange={(e) => setIssuedBy(e.target.value)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3.5 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                        />
                    </div>

                    {/* Description Notes */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">
                            Description / Citation Notes
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Write brief citation notes about performance, category, or merit..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium resize-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-3 border-t border-[#F2F2F7] mt-2 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-[#F2F2F7] hover:bg-[#E5E5EA] text-[#3A3A3C] px-4 py-2.5 rounded-xl font-medium text-xs transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-[#9E1B28] hover:bg-[#851621] text-white px-5 py-2.5 rounded-xl font-medium text-xs shadow-sm transition-colors cursor-pointer"
                        >
                            Issue Achievement
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
