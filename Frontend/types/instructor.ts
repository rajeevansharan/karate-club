export type InstructorStatus = "Active" | "Inactive";
export type InstructorBeltRank = "Black" | "Brown"; // Add others if needed later

export interface Instructor {
    id: string;
    initials: string;
    name: string;
    email: string;
    belt: InstructorBeltRank;
    grade: string;
    phone: string;
    classes: number;
    students: number;
    experience: string;
    status: InstructorStatus;
}
