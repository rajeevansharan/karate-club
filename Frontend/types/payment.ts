export type PaymentType = "Membership Fee" | "Grading Fee" | "Tournament Fee" | "Registration Fee" | "Other";
export type PaymentMethod = "Cash" | "Bank Transfer" | "Card";
export type PaymentStatus = "Paid" | "Pending" | "Overdue";

export interface MembershipPlan {
    id: string;
    name: string;
    price: number;
    duration: string; // e.g. "1 Month", "3 Months", "12 Months"
    description: string;
    status: "Active" | "Inactive";
}

export interface StudentMembership {
    id: string;
    studentId: string;
    studentName: string;
    planId: string;
    planName: string;
    startDate: string;
    expiryDate: string;
    status: "Active" | "Expired" | "Pending";
}

export interface Payment {
    id: string;
    studentId: string;
    studentName: string;
    studentInitials: string;
    amount: number;
    type: PaymentType;
    date: string;
    method: PaymentMethod;
    status: PaymentStatus;
    referenceNumber: string;
    notes?: string;
}
