export type BeltRank =
    | "Green"
    | "Brown"
    | "White"
    | "Black"
    | "Yellow"
    | "Orange"
    | "Blue";

export type MembershipStatus = "Active" | "Expired" | "Pending";

export type StudentStatus = "Active" | "Inactive";

export interface Student {
    id: string;
    initials: string;
    name: string;
    phone: string;
    age: number;
    belt: BeltRank;
    class: string;
    instructor: string;
    membership: MembershipStatus;
    attendance: string;
    status: StudentStatus;
}

export interface StudentFilterOptions {
    searchQuery: string;
    beltFilter: string;
    classFilter: string;
    instructorFilter: string;
    statusFilter: string;
}

export type StudentSortField = keyof Student;
