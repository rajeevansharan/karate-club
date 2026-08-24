import React, { useState, useEffect } from "react";
import { X, CalendarDays, Users, Award, MapPin } from "lucide-react";
import { ClassSession, ClassStatus } from "@/types/class";
import { BeltRank } from "@/types/student";
import { INITIAL_INSTRUCTORS } from "@/data/mockData";

interface AddEditClassModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (classData: any) => void;
    cls?: ClassSession | null; // If provided, edit mode
}

const CLASS_OPTIONS = [
    "Kids Beginner",
    "Beginner Karate",
    "Intermediate Karate",
    "Advanced Karate",
    "Black Belt Training",
    "Competition Training",
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const LOCATIONS = ["Dojo A", "Dojo B", "Main Hall"];
const AGE_GROUPS = ["Kids", "Teens", "Adults", "All Ages"];
const BELTS = ["White", "Yellow", "Green", "Blue", "Brown", "Black"] as BeltRank[];

export function AddEditClassModal({ isOpen, onClose, onSubmit, cls }: AddEditClassModalProps) {
    const isEditMode = !!cls;

    const [name, setName] = useState("");
    const [instructorId, setInstructorId] = useState("");
    const [day, setDay] = useState<any>("Monday");
    const [startTime, setStartTime] = useState("17:00");
    const [endTime, setEndTime] = useState("18:30");
    const [location, setLocation] = useState("Dojo A");
    const [ageGroup, setAgeGroup] = useState<any>("All Ages");
    const [minBelt, setMinBelt] = useState<BeltRank>("White");
    const [maxStudents, setMaxStudents] = useState<number>(15);
    const [status, setStatus] = useState<ClassStatus>("Active");

    useEffect(() => {
        if (isOpen) {
            if (cls) {
                setName(cls.name);
                setInstructorId(cls.instructorId);
                setDay(cls.day);
                setStartTime(cls.startTime);
                setEndTime(cls.endTime);
                setLocation(cls.location);
                setAgeGroup(cls.ageGroup);
                setMinBelt(cls.minBelt);
                setMaxStudents(cls.maxStudents);
                setStatus(cls.status);
            } else {
                // Reset form to default (Add mode)
                setName(CLASS_OPTIONS[0]);
                setInstructorId(INITIAL_INSTRUCTORS[0]?.id || "");
                setDay("Monday");
                setStartTime("17:00");
                setEndTime("18:30");
                setLocation("Dojo A");
                setAgeGroup("All Ages");
                setMinBelt("White");
                setMaxStudents(15);
                setStatus("Active");
            }
        }
    }, [isOpen, cls]);

    if (!isOpen) return null;

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Find instructor name
        const instObj = INITIAL_INSTRUCTORS.find((i) => i.id === instructorId);
        const instructorName = instObj ? instObj.name : "Sensei Hiroshi Tanaka";

        const formData: any = {
            name,
            instructorId,
            instructorName,
            day,
            startTime,
            endTime,
            location,
            ageGroup,
            minBelt,
            maxStudents: Number(maxStudents) || 12,
            status,
        };

        if (isEditMode && cls) {
            formData.currentStudents = cls.currentStudents;
        }

        onSubmit(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div
                className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[95vh] overflow-hidden border border-[#E5E5EA] animate-in fade-in-50 zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#F2F2F7] px-6 py-4 bg-[#FAFAFC]">
                    <div>
                        <h2 className="text-lg font-bold text-[#1C1C1E]">
                            {isEditMode ? "Edit Class Info" : "Create New Class"}
                        </h2>
                        <p className="text-xs text-[#8E8E93] mt-0.5 font-medium">
                            {isEditMode ? "Modify details for " + cls?.name : "Fill up forms to start a new weekly class schedule"}
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
                <form onSubmit={handleFormSubmit} className="flex-1 flex flex-col overflow-y-auto p-6 space-y-4">

                    {/* Class Name Dropdown or Custom Name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">
                            Class Type / Name
                        </label>
                        <select
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2.5 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                            required
                        >
                            {CLASS_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Instructor Dropdown */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">
                            Assigned Sensei
                        </label>
                        <select
                            value={instructorId}
                            onChange={(e) => setInstructorId(e.target.value)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2.5 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                            required
                        >
                            {INITIAL_INSTRUCTORS.map((inst) => (
                                <option key={inst.id} value={inst.id}>
                                    {inst.name} ({inst.grade})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Day & Location Section */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">
                                Day of Week
                            </label>
                            <select
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2.5 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                                required
                            >
                                {DAYS.map((d) => (
                                    <option key={d} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">
                                Location
                            </label>
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2.5 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                                required
                            >
                                {LOCATIONS.map((loc) => (
                                    <option key={loc} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Start Time & End Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">
                                Start Time
                            </label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">
                                End Time
                            </label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                                required
                            />
                        </div>
                    </div>

                    {/* Age Group, Minimum Belt */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">
                                Age Group
                            </label>
                            <select
                                value={ageGroup}
                                onChange={(e) => setAgeGroup(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2.5 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                                required
                            >
                                {AGE_GROUPS.map((ag) => (
                                    <option key={ag} value={ag}>
                                        {ag}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">
                                Minimum Belt Req
                            </label>
                            <select
                                value={minBelt}
                                onChange={(e) => setMinBelt(e.target.value as BeltRank)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2.5 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                                required
                            >
                                {BELTS.map((belt) => (
                                    <option key={belt} value={belt}>
                                        {belt}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Max Students, Status */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">
                                Max Capacity (Students)
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="40"
                                value={maxStudents}
                                onChange={(e) => setMaxStudents(Number(e.target.value))}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">
                                Status
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as ClassStatus)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2.5 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                                required
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-[#F2F2F7] mt-2 justify-end">
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
                            {isEditMode ? "Save Changes" : "Create Class"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
