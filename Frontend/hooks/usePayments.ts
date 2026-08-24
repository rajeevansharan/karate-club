"use client";

import { useState, useMemo } from "react";
import { MembershipPlan, StudentMembership, Payment, PaymentStatus, PaymentType, PaymentMethod } from "@/types/payment";
import { INITIAL_MEMBERSHIP_PLANS, INITIAL_STUDENT_MEMBERSHIPS, INITIAL_PAYMENTS } from "@/data/mockPaymentData";
import { INITIAL_STUDENTS } from "@/data/mockData";

export function usePayments() {
    const [plans, setPlans] = useState<MembershipPlan[]>(INITIAL_MEMBERSHIP_PLANS);
    const [memberships, setMemberships] = useState<StudentMembership[]>(INITIAL_STUDENT_MEMBERSHIPS);
    const [payments, setPayments] = useState<Payment[]>(INITIAL_PAYMENTS);

    // Filters for Payments log table
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All statuses");
    const [typeFilter, setTypeFilter] = useState("All types");
    const [methodFilter, setMethodFilter] = useState("All methods");

    // Summary Metric Math
    const stats = useMemo(() => {
        // Total payments collected
        const totalPayments = payments
            .filter((p) => p.status === "Paid")
            .reduce((sum, p) => sum + p.amount, 0);

        // Monthly revenue: August 2026
        const monthlyRevenue = payments
            .filter((p) => p.status === "Paid" && p.date.startsWith("2026-08"))
            .reduce((sum, p) => sum + p.amount, 0);

        // Pending
        const pendingPayments = payments
            .filter((p) => p.status === "Pending")
            .reduce((sum, p) => sum + p.amount, 0);

        // Overdue
        const overduePayments = payments
            .filter((p) => p.status === "Overdue")
            .reduce((sum, p) => sum + p.amount, 0);

        return {
            totalPayments,
            monthlyRevenue,
            pendingPayments,
            overduePayments,
        };
    }, [payments]);

    // Add membership option
    const addMembershipPlan = (data: Omit<MembershipPlan, "id">) => {
        const newPlan: MembershipPlan = {
            ...data,
            id: `PLN-${Math.floor(Math.random() * 900) + 100}`,
        };
        setPlans((prev) => [...prev, newPlan]);
        return newPlan;
    };

    // Link membership to student
    const assignMembership = (data: Omit<StudentMembership, "id" | "planName" | "studentName">) => {
        const plan = plans.find((p) => p.id === data.planId);
        const student = INITIAL_STUDENTS.find((s) => s.id === data.studentId);

        if (!plan || !student) return { success: false, message: "Invalid plan or student ID" };

        const newAssign: StudentMembership = {
            id: `SMB-${Math.floor(Math.random() * 900) + 100}`,
            studentId: data.studentId,
            studentName: student.name,
            planId: data.planId,
            planName: plan.name,
            startDate: data.startDate,
            expiryDate: data.expiryDate,
            status: data.status,
        };

        setMemberships((prev) => [newAssign, ...prev]);
        return { success: true, message: "Membership plan assigned successfully!" };
    };

    // Log a new checkout transaction
    const recordPayment = (data: {
        studentId: string;
        amount: number;
        type: PaymentType;
        date: string;
        method: PaymentMethod;
        status: PaymentStatus;
        referenceNumber: string;
        notes?: string;
    }) => {
        const student = INITIAL_STUDENTS.find((s) => s.id === data.studentId);
        const name = student ? student.name : "Member Student";
        const initials = student ? student.initials : "MS";

        const newPayment: Payment = {
            id: `PMT-${Math.floor(Math.random() * 900) + 100}`,
            studentId: data.studentId,
            studentName: name,
            studentInitials: initials,
            amount: Number(data.amount) || 0,
            type: data.type,
            date: data.date,
            method: data.method,
            status: data.status,
            referenceNumber: data.referenceNumber,
            notes: data.notes,
        };

        setPayments((prev) => [newPayment, ...prev]);
        return newPayment;
    };

    // Update payment status (e.g. mark pending/overdue to Paid)
    const updatePaymentStatus = (id: string, newStatus: PaymentStatus) => {
        setPayments((prev) =>
            prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
        );
    };

    // Filtered Payments Table
    const filteredPayments = useMemo(() => {
        return payments.filter((p) => {
            const matchesSearch =
                p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus =
                statusFilter === "All statuses" || p.status === statusFilter;

            const matchesType =
                typeFilter === "All types" || p.type === typeFilter;

            const matchesMethod =
                methodFilter === "All methods" || p.method === methodFilter;

            return matchesSearch && matchesStatus && matchesType && matchesMethod;
        });
    }, [payments, searchQuery, statusFilter, typeFilter, methodFilter]);

    return {
        plans,
        memberships,
        payments: filteredPayments,
        allPaymentsRaw: payments,
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
    };
}
