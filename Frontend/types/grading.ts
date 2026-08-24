export type GradingResult = "Pass" | "Fail" | "Pending";
export type EligibilityStatus = "Eligible" | "Not Eligible" | "Pending Review";

export interface GradingRecord {
    id: string;
    studentId: string;
    studentName: string;
    currentBelt: string; // The belt they earned / upgraded to (if Pass)
    previousBelt: string; // The belt they held prior to grading
    gradingDate: string;
    result: GradingResult;
    score?: string;
    instructor: string;
    comments?: string;
    nextBelt: string; // The next target belt in sequence
}

export interface StudentEligibility {
    studentId: string;
    studentName: string;
    currentBelt: string;
    nextBelt: string;
    trainingPeriodMonths: number;
    attendanceRate: number; // e.g. 88
    recommendedByInstructor: boolean;
    status: EligibilityStatus;
}

export interface GradingEvent {
    id: string;
    name: string;
    date: string;
    time: string;
    location: string;
    examiner: string;
    eligibleStudentIds: string[]; // List of students taking this grading
    notes?: string;
    status: "Scheduled" | "Completed" | "Cancelled";
}
