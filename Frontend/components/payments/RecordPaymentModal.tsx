import React, { useState } from "react";
import { X, Receipt } from "lucide-react";
import { PaymentType, PaymentMethod, PaymentStatus } from "@/types/payment";
import { INITIAL_STUDENTS } from "@/data/mockData";

interface RecordPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: {
        studentId: string;
        amount: number;
        type: PaymentType;
        date: string;
        method: PaymentMethod;
        status: PaymentStatus;
        referenceNumber: string;
        notes?: string;
    }) => void;
}

const PAYMENT_TYPES = ["Membership Fee", "Grading Fee", "Tournament Fee", "Registration Fee", "Other"] as PaymentType[];
const PAYMENT_METHODS = ["Cash", "Bank Transfer", "Card"] as PaymentMethod[];
const PAYMENT_STATUSES = ["Paid", "Pending", "Overdue"] as PaymentStatus[];

export function RecordPaymentModal({ isOpen, onClose, onSubmit }: RecordPaymentModalProps) {
    const [studentId, setStudentId] = useState(INITIAL_STUDENTS[0]?.id || "");
    const [amount, setAmount] = useState<number>(4500);
    const [type, setType] = useState<PaymentType>("Membership Fee");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [method, setMethod] = useState<PaymentMethod>("Cash");
    const [status, setStatus] = useState<PaymentStatus>("Paid");
    const [referenceNumber, setReferenceNumber] = useState("");
    const [notes, setNotes] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            studentId,
            amount: Number(amount) || 0,
            type,
            date,
            method,
            status,
            referenceNumber,
            notes,
        });

        // Reset
        setAmount(4500);
        setReferenceNumber("");
        setNotes("");
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
                        <Receipt className="w-5 h-5 text-[#9E1B28] shrink-0" />
                        <div>
                            <h2 className="text-sm font-bold text-[#1C1C1E]">Record New Payment</h2>
                            <p className="text-[10px] text-[#8E8E93] mt-0.5">Collect grading fees, tournament fees or dues</p>
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

                    {/* Student */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Payer Student</label>
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

                    {/* Amount & Type */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Amount (Rs.)</label>
                            <input
                                type="number"
                                min="1"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28] font-medium"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Charge Type</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value as PaymentType)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-2.5 py-2 text-xs text-[#1C1C1E] focus:outline-none font-medium"
                            >
                                {PAYMENT_TYPES.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Date & Method */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Payment Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none font-medium"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Payment Method</label>
                            <select
                                value={method}
                                onChange={(e) => setMethod(e.target.value as PaymentMethod)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-2.5 py-2 text-xs text-[#1C1C1E] focus:outline-none font-medium"
                            >
                                {PAYMENT_METHODS.map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Status & Ref */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Payment Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as PaymentStatus)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-2.5 py-2 text-xs font-bold text-[#1C1C1E] focus:outline-none"
                            >
                                {PAYMENT_STATUSES.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Reference #</label>
                            <input
                                type="text"
                                placeholder="Bank txn ID or receipt #"
                                value={referenceNumber}
                                onChange={(e) => setReferenceNumber(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none font-medium"
                            />
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#6C6C70]">Private Notes</label>
                        <textarea
                            rows={2}
                            placeholder="Add brief details..."
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
                            className="bg-[#F2F2F7] hover:bg-[#E5E5EA] text-[#3A3A3C] px-3.5 py-2 rounded-xl text-center cursor-pointer select-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-[#9E1B28] hover:bg-[#851621] text-white px-4 py-2 rounded-xl text-center shadow-xs cursor-pointer select-none font-bold"
                        >
                            Save Payment
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
