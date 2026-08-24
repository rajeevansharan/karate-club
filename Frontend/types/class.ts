import { BeltRank } from "./student";

export type ClassStatus = "Active" | "Inactive";

export interface ClassSession {
    id: string;
    name: string;
    instructorId: string; // references Instructor id
    instructorName: string;
    day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    startTime: string; // e.g. "16:00"
    endTime: string; // e.g. "17:00"
    location: string; // e.g. "Dojo A", "Main Hall"
    ageGroup: "Kids" | "Teens" | "Adults" | "All Ages";
    minBelt: BeltRank;
    maxStudents: number;
    currentStudents: number;
    status: ClassStatus;
}
