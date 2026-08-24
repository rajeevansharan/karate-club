import React, { useState, useEffect } from "react";
import { X, UserCheck } from "lucide-react";
import { MembershipPlan } from "@/types/payment";
import { INITIAL_STUDENTS } from "@/data/mockData";

interface AssignMembershipModalProps {
    isOpen: boolean;
    onClose: () => void;
    plans: MembershipPlan[];
    onSubmit: (data: {
        studentId: string;
        planId: string;
        startDate: string;
        expiryDate: string;
        status: "Active" | "Expired" | "Pending";
    }) => { success: boolean; message: string };
}

export function AssignMembershipModal({ isOpen, onClose, plans, onSubmit }: AssignMembershipModalProps) {
    const [studentId, setStudentId] = useState(INITIAL_STUDENTS[0]?.id || "");
    const [planId, setPlanId] = useState("");
    const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
    const [expiryDate, setExpiryDate] = useState("");
    const [status, setStatus] = useState<"Active" | "Expired" | "Pending">("Active");

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Set default plan when plans load
    useEffect(() => {
        if (plans.length > 0 && !planId) {
            setPlanId(plans[0].id);
        }
    }, [plans]);

    // Automatically calculate expiry date based on standard duration of the chosen plan
    useEffect(() => {
        if (planId && startDate) {
            const plan = plans.find((p) => p.id === planId);
            if (!plan) return;

            const start = new Date(startDate);
            let monthsToAdd = 1;

            if (plan.duration === "3 Months") monthsToAdd = 3;
            else if (plan.duration === "6 Months") monthsToAdd = 6;
            else if (plan.duration === "12 Months") monthsToAdd = 12;

            start.setMonth(start.getMonth() + monthsToAdd);
            setExpiryDate(start.toISOString().split("T")[0]);
        }
    }, [planId, startDate, plans]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        const result = onSubmit({
            studentId,
            planId,
            startDate,
            expiryDate,
            status,
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
                className="bg-white rounded-3xl w-full max-w-sm shadow-2xl flex flex-col border border-[#E5E5EA] animate-in fade-in-50 zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#F2F2F7] px-6 py-4 bg-[#FAFAFC] rounded-t-3xl">
                    <div className="flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-[#9E1B28] shrink-0" />
                        <div>
                            <h2 className="text-sm font-bold text-[#1C1C1E]">Assign Membership</h2>
                            <p className="text-[10px] text-[#8E8E93] mt-0.5">Link a student to a physical subscription plan</p>
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
                    {/* Alerts */}
                    {errorMsg && (
                        <div className="bg-[#FDE8EA] text-[#9E1B28] text-xs font-bold p-2.5 rounded-xl border border-[#9E1B28]/10">
                            {errorMsg}
                        </div>
                    )}
                    {successMsg && (
                        <div className="bg-[#E8F8F0] text-[#25734A] text-xs font-bold p-2.5 rounded-xl border border-[#4AD991]/20">
                            {successMsg}
                        </div>
                    )}

                    {/* Student Select */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Select Student Member</label>
                        <select
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2.5 text-xs text-[#1C1C1E] focus:outline-none font-bold"
                            required
                        >
                            {INITIAL_STUDENTS.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name} ({s.id})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Plan Select */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Select Subscription Plan</label>
                        <select
                            value={planId}
                            onChange={(e) => setPlanId(e.target.value)}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2.5 text-xs text-[#1C1C1E] focus:outline-none font-bold"
                            required
                        >
                            {plans.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name} (Rs. {p.price.toLocaleString()})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none font-medium"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Expiry Date</label>
                            <input
                                type="date"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none font-medium"
                                required
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as "Active" | "Expired" | "Pending")}
                            className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-2.5 py-2 text-xs font-bold text-[#1C1C1E] focus:outline-none"
                        >
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Expired">Expired</option>
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
                            Link Account
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
