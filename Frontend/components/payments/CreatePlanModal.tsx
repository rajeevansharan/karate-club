import React, { useState } from "react";
import { X, CreditCard } from "lucide-react";

interface CreatePlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: {
        name: string;
        price: number;
        duration: string;
        description: string;
        status: "Active" | "Inactive";
    }) => void;
}

const DURATION_PRESETS = ["1 Month", "3 Months", "6 Months", "12 Months"];

export function CreatePlanModal({ isOpen, onClose, onSubmit }: CreatePlanModalProps) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number>(4500);
    const [duration, setDuration] = useState("1 Month");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<"Active" | "Inactive">("Active");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            name,
            price: Number(price) || 0,
            duration,
            description,
            status,
        });

        // Reset forms
        setName("");
        setPrice(4500);
        setDuration("1 Month");
        setDescription("");
        setStatus("Active");
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
                        <CreditCard className="w-5 h-5 text-[#9E1B28] shrink-0" />
                        <div>
                            <h2 className="text-sm font-bold text-[#1C1C1E]">Create Membership Plan</h2>
                            <p className="text-[10px] text-[#8E8E93] mt-0.5">Define billing rate options for students</p>
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

                    {/* Plan Name */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Plan Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Annual Elite Samurai Pass"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                            required
                        />
                    </div>

                    {/* Price & Duration */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Price (Rs.)Label</label>
                            <input
                                type="number"
                                min="0"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Duration Period</label>
                            <select
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-2.5 py-2 text-xs text-[#1C1C1E] focus:outline-none font-medium"
                            >
                                {DURATION_PRESETS.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Description</label>
                        <textarea
                            rows={3}
                            placeholder="Short detail profile about what training benefits are unlocked..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none font-medium resize-none"
                            required
                        />
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-2.5 py-2 text-xs font-bold text-[#1C1C1E] focus:outline-none"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#F2F2F7]">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-[#F2F2F7] hover:bg-[#E5E5EA] text-[#3A3A3C] px-3.5 py-2 rounded-xl text-center cursor-pointer select-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-[#9E1B28] hover:bg-[#851621] text-white px-4 py-2 rounded-xl text-center shadow-xs cursor-pointer select-none font-bold"
                        >
                            Add Plan
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
