"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { usePayments } from "@/hooks/usePayments";
import { PaymentStatus, PaymentType, PaymentMethod } from "@/types/payment";
import { Plus, CreditCard, DollarSign, Clock, AlertTriangle, Search, Filter, CheckCircle, ShieldAlert, Award } from "lucide-react";
import { CreatePlanModal } from "@/components/payments/CreatePlanModal";
import { AssignMembershipModal } from "@/components/payments/AssignMembershipModal";
import { RecordPaymentModal } from "@/components/payments/RecordPaymentModal";

export default function PaymentsPage() {
    const {
        plans,
        memberships,
        payments,
        stats,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        typeFilter,
        setTypeFilter,
        methodFilter,
        setMethodFilter,
        addMembershipPlan,
        assignMembership,
        recordPayment,
        updatePaymentStatus,
    } = usePayments();

    // Tab controller: "payments" or "memberships"
    const [activeTab, setActiveTab] = useState<"payments" | "memberships">("payments");

    // Modal triggers
    const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false);
    const [isAssignOpen, setIsAssignOpen] = useState(false);
    const [isRecordOpen, setIsRecordOpen] = useState(false);

    return (
        <div className="flex h-screen w-screen bg-[#F5F5F7] font-sans antialiased text-[#1C1C1E] overflow-hidden select-none">
            {/* Sidebar */}
            <Sidebar />

            {/* Main scroll workspace */}
            <main className="flex-1 flex flex-col overflow-y-auto bg-[#F5F5F7] p-8">
                <div className="flex flex-col h-full">

                    {/* Title Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight">
                                Memberships & Billing
                            </h1>
                            <p className="text-sm text-[#6C6C70] mt-0.5 font-normal">
                                Manage membership subscription schemes, track invoice collections, and log dojo revenues.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsCreatePlanOpen(true)}
                                className="bg-stone-900 hover:bg-stone-850 text-white px-4 py-2.5 rounded-xl font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Create Plan</span>
                            </button>
                            <button
                                onClick={() => setIsAssignOpen(true)}
                                className="bg-white border border-[#E5E5EA] text-[#333] hover:bg-[#F2F2F7] px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Assign Membership</span>
                            </button>
                            <button
                                onClick={() => setIsRecordOpen(true)}
                                className="bg-[#9E1B28] hover:bg-[#851621] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Record Payment</span>
                            </button>
                        </div>
                    </div>

                    {/* Dashboard Statistics Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {/* Total Revenue */}
                        <div className="bg-white border border-[#E5E5EA] p-4 rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.01)] flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Total Payments</span>
                                <span className="text-xl font-extrabold text-[#1C1C1E] mt-1 block">
                                    Rs. {stats.totalPayments.toLocaleString()}
                                </span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#E8F8F0] flex items-center justify-center text-[#25734A] shrink-0">
                                <DollarSign className="w-5 h-5" />
                            </div>
                        </div>

                        {/* Monthly revenue */}
                        <div className="bg-white border border-[#E5E5EA] p-4 rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.01)] flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Monthly Revenue</span>
                                <span className="text-xl font-extrabold text-[#9E1B28] mt-1 block">
                                    Rs. {stats.monthlyRevenue.toLocaleString()}
                                </span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#FDE8EA] flex items-center justify-center text-[#9E1B28] shrink-0">
                                <Award className="w-5 h-5" />
                            </div>
                        </div>

                        {/* Pending total */}
                        <div className="bg-white border border-[#E5E5EA] p-4 rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.01)] flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Pending Payments</span>
                                <span className="text-xl font-extrabold text-orange-700 mt-1 block">
                                    Rs. {stats.pendingPayments.toLocaleString()}
                                </span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-700 shrink-0">
                                <Clock className="w-5 h-5" />
                            </div>
                        </div>

                        {/* Overdue total */}
                        <div className="bg-white border border-[#E5E5EA] p-4 rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.01)] flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">Overdue Payments</span>
                                <span className="text-xl font-extrabold text-red-600 mt-1 block">
                                    Rs. {stats.overduePayments.toLocaleString()}
                                </span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Mode toggler tab & filter tools */}
                    <div className="bg-white border border-[#E5E5EA] rounded-2xl p-4 mb-6 shadow-xs flex flex-col gap-4">
                        <div className="flex border-b border-[#F2F2F7] pb-3">
                            <button
                                onClick={() => setActiveTab("payments")}
                                className={`px-4 py-2 border-b-2 font-bold text-xs select-none cursor-pointer transition-all mr-4 flex items-center gap-1.5 ${activeTab === "payments"
                                        ? "border-[#9E1B28] text-[#9E1B28]"
                                        : "border-transparent text-[#8E8E93] hover:text-[#333]"
                                    }`}
                            >
                                <DollarSign className="w-4 h-4" />
                                <span>Recent Payments Log</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("memberships")}
                                className={`px-4 py-2 border-b-2 font-bold text-xs select-none cursor-pointer transition-all flex items-center gap-1.5 ${activeTab === "memberships"
                                        ? "border-[#9E1B28] text-[#9E1B28]"
                                        : "border-transparent text-[#8E8E93] hover:text-[#333]"
                                    }`}
                            >
                                <CreditCard className="w-4 h-4" />
                                <span>Student Subscription Links</span>
                            </button>
                        </div>

                        {/* Search & Filters */}
                        {activeTab === "payments" && (
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                                {/* Search box */}
                                <div className="relative">
                                    <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#C7C7CC]" />
                                    <input
                                        type="text"
                                        placeholder="Search student or Ref ID..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl focus:outline-none focus:border-[#9E1B28] font-medium"
                                    />
                                </div>
                                {/* Status dropdown */}
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-2.5 py-2 font-semibold text-[#3A3A3C] focus:outline-none"
                                >
                                    <option value="All statuses">All statuses</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Overdue">Overdue</option>
                                </select>
                                {/* Type dropdown */}
                                <select
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-2.5 py-2 font-semibold text-[#3A3A3C] focus:outline-none"
                                >
                                    <option value="All types">All types</option>
                                    <option value="Membership Fee">Membership Fee</option>
                                    <option value="Grading Fee">Grading Fee</option>
                                    <option value="Tournament Fee">Tournament Fee</option>
                                    <option value="Registration Fee">Registration Fee</option>
                                    <option value="Other">Other</option>
                                </select>
                                {/* Method dropdown */}
                                <select
                                    value={methodFilter}
                                    onChange={(e) => setMethodFilter(e.target.value)}
                                    className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-2.5 py-2 font-semibold text-[#3A3A3C] focus:outline-none"
                                >
                                    <option value="All methods">All methods</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="Card">Card</option>
                                </select>
                            </div>
                        )}

                        {activeTab === "memberships" && (
                            <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#6D6D72]">
                                <span className="bg-stone-50 border border-[#E5E5EA] px-3 py-1.5 rounded-xl">
                                    Total plans configured: <strong className="text-black">{plans.length}</strong>
                                </span>
                                <span className="bg-stone-50 border border-[#E5E5EA] px-3 py-1.5 rounded-xl">
                                    Active assignments: <strong className="text-black">{memberships.filter(m => m.status === "Active").length}</strong>
                                </span>
                            </div>
                        )}
                    </div>

                    {/* TABLE WORKSPACE */}
                    <div className="flex-1 min-h-0 bg-white border border-[#E5E5EA] rounded-3xl overflow-hidden flex flex-col shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                        {activeTab === "payments" ? (
                            <div className="flex-1 overflow-x-auto overflow-y-auto">
                                <table className="w-full text-left border-collapse text-xs">
                                    <thead>
                                        <tr className="bg-[#FAFAFC] border-b border-[#F2F2F7] uppercase tracking-wider text-[10px] font-bold text-[#8E8E93] select-none h-11">
                                            <th className="px-6">Payment ID / Ref ID</th>
                                            <th className="px-6">Student</th>
                                            <th className="px-6">Charge Type</th>
                                            <th className="px-6">Paid Date</th>
                                            <th className="px-6">Method</th>
                                            <th className="px-6 text-right">Amount</th>
                                            <th className="px-6">Status</th>
                                            <th className="px-6 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#F2F2F7]">
                                        {payments.length > 0 ? (
                                            payments.map((p) => (
                                                <tr key={p.id} className="hover:bg-slate-50/40 h-[56px] transition-colors">
                                                    <td className="px-6 font-semibold text-[#1C1C1E]">
                                                        <div>{p.id}</div>
                                                        {p.referenceNumber && (
                                                            <div className="text-[10px] text-[#8E8E93] font-medium mt-0.5">Ref: {p.referenceNumber}</div>
                                                        )}
                                                    </td>
                                                    <td className="px-6">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-7 h-7 rounded-full bg-[#E5E5EA] text-[#333] flex items-center justify-center text-[10px] font-extrabold select-none">
                                                                {p.studentInitials}
                                                            </div>
                                                            <span className="font-bold text-gray-800">{p.studentName}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6">
                                                        <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px] font-bold">
                                                            {p.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 text-[#6C6C70] font-medium">{p.date}</td>
                                                    <td className="px-6 text-[#6C6C70] font-semibold">{p.method}</td>
                                                    <td className="px-6 text-right font-extrabold text-[#1c1c1e] text-[13px]">
                                                        Rs. {p.amount.toLocaleString()}
                                                    </td>
                                                    <td className="px-6">
                                                        <span className={`px-2 py-0.5 rounded font-extrabold text-[9.5px] ${p.status === "Paid" ? "bg-[#E8F8F0] text-[#25734A]" :
                                                                p.status === "Pending" ? "bg-orange-50 text-orange-700 border border-orange-200" :
                                                                    "bg-[#FDE8EA] text-[#9E1B28]"
                                                            }`}>
                                                            {p.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 text-center">
                                                        {p.status !== "Paid" ? (
                                                            <button
                                                                onClick={() => updatePaymentStatus(p.id, "Paid")}
                                                                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-[10px] px-2.5 py-1 rounded-lg cursor-pointer transition-all select-none"
                                                            >
                                                                Mark Paid
                                                            </button>
                                                        ) : (
                                                            <span className="text-[10px] text-[#8E8E93] italic font-medium">Cleared</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={8} className="p-12 text-center text-[#8E8E93] text-xs font-semibold">
                                                    No invoices match the requested criteria filters.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex-1 overflow-x-auto overflow-y-auto">
                                <table className="w-full text-left border-collapse text-xs">
                                    <thead>
                                        <tr className="bg-[#FAFAFC] border-b border-[#F2F2F7] uppercase tracking-wider text-[10px] font-bold text-[#8E8E93] select-none h-11">
                                            <th className="px-6">Student</th>
                                            <th className="px-6">Assigned Plan Option</th>
                                            <th className="px-6">Start Date</th>
                                            <th className="px-6">Expiry Date</th>
                                            <th className="px-6">Status State</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#F2F2F7]">
                                        {memberships.map((m) => (
                                            <tr key={m.id} className="hover:bg-slate-50/40 h-[56px] transition-colors">
                                                <td className="px-6 font-bold text-[#1C1C1E]">{m.studentName}</td>
                                                <td className="px-6 font-semibold text-gray-700">{m.planName}</td>
                                                <td className="px-6 text-[#6C6C70] font-medium">{m.startDate}</td>
                                                <td className="px-6 text-[#6C6C70] font-medium">{m.expiryDate}</td>
                                                <td className="px-6">
                                                    <span className={`px-2 py-0.5 rounded font-extrabold text-[9.5px] ${m.status === "Active" ? "bg-[#E8F8F0] text-[#25734A]" :
                                                            m.status === "Pending" ? "bg-orange-50 text-orange-700" :
                                                                "bg-[#FDE8EA] text-[#9E1B28]"
                                                        }`}>
                                                        {m.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                </div>
            </main>

            {/* Modal Components */}
            <CreatePlanModal
                isOpen={isCreatePlanOpen}
                onClose={() => setIsCreatePlanOpen(false)}
                onSubmit={(data) => {
                    addMembershipPlan(data);
                }}
            />

            <AssignMembershipModal
                isOpen={isAssignOpen}
                onClose={() => setIsAssignOpen(false)}
                plans={plans}
                onSubmit={assignMembership}
            />

            <RecordPaymentModal
                isOpen={isRecordOpen}
                onClose={() => setIsRecordOpen(false)}
                onSubmit={(data) => {
                    recordPayment(data);
                }}
            />
        </div>
    );
}
