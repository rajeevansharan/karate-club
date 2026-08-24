export type TournamentStatus = "Upcoming" | "Registration Open" | "Completed" | "Cancelled";
export type CompetitionType = "Kata" | "Kumite";
export type MedalType = "Gold" | "Silver" | "Bronze" | "None";

export interface Tournament {
    id: string;
    name: string;
    type: string; // Local, National, International
    date: string; // YYYY-MM-DD
    deadline: string; // YYYY-MM-DD
    location: string;
    organizer: string;
    description: string;
    status: TournamentStatus;
}

export interface TournamentRegistration {
    id: string;
    tournamentId: string;
    tournamentName: string;
    studentId: string;
    studentName: string;
    ageCategory: string;
    beltCategory: string;
    weightCategory: string;
    competitionType: CompetitionType;
    // Results Recorded
    participated: boolean;
    position?: number;
    medal: MedalType;
    score?: string;
    notes?: string;
}
