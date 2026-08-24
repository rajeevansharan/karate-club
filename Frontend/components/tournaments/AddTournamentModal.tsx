import React, { useState } from "react";
import { X } from "lucide-react";
import { Tournament, TournamentStatus } from "@/types/tournament";

interface AddTournamentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<Tournament, "id">) => void;
}

export function AddTournamentModal({ isOpen, onClose, onSubmit }: AddTournamentModalProps) {
    const [name, setName] = useState("");
    const [type, setType] = useState("Local Friendly Match");
    const [date, setDate] = useState("");
    const [deadline, setDeadline] = useState("");
    const [location, setLocation] = useState("");
    const [organizer, setOrganizer] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<TournamentStatus>("Upcoming");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            name,
            type,
            date,
            deadline,
            location,
            organizer,
            description,
            status,
        });

        // Reset
        setName("");
        setType("Local Friendly Match");
        setDate("");
        setDeadline("");
        setLocation("");
        setOrganizer("");
        setDescription("");
        setStatus("Upcoming");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div
                className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-[#E5E5EA] animate-in fade-in-50 zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#F2F2F7] px-6 py-4 bg-[#FAFAFC]">
                    <div>
                        <h2 className="text-lg font-bold text-[#1C1C1E]">Create Tournament Schedule</h2>
                        <p className="text-xs text-[#8E8E93] mt-0.5">Announce a new championship cup or friendly internal match</p>
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
                    {/* Name */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">Tournament Name</label>
                        <input
                            type="text"
                            placeholder="e.g. SLKF Western Province Open"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                            required
                        />
                    </div>

                    {/* Type & Organizer */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">Tournament Level / Type</label>
                            <input
                                type="text"
                                placeholder="e.g. Provincial Event"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">Host / Organizer</label>
                            <input
                                type="text"
                                placeholder="e.g. Ministry of Sports"
                                value={organizer}
                                onChange={(e) => setOrganizer(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                                required
                            />
                        </div>
                    </div>

                    {/* Date & Deadline */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">Competition Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">Registration Deadline</label>
                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">Venue Location</label>
                        <input
                            type="text"
                            placeholder="e.g. Sugathadasa Arena"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">Description Details</label>
                        <textarea
                            rows={3}
                            placeholder="Add brief details about the matches, safety guidelines..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none font-medium resize-none"
                            required
                        />
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#6C6C70]">Initial Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as TournamentStatus)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2.5 text-xs font-semibold text-[#1C1C1E] focus:outline-none"
                        >
                            <option value="Upcoming">Upcoming (Announced)</option>
                            <option value="Registration Open">Registration Open</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
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
                            Create Tournament
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
