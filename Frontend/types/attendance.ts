export type AttendanceStatus = "Present" | "Absent" | "Late" | "Excused";

export interface AttendanceRecord {
    id: string;
    studentId: string;
    studentName: string;
    studentInitials: string;
    classId: string;
    className: string;
    date: string; // YYYY-MM-DD
    checkInTime?: string; // HH:MM
    status: AttendanceStatus;
    markedBy: string;
}
