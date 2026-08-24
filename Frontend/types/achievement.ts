export type AchievementType =
    | "Tournament Medal"
    | "Belt Promotion"
    | "Best Student"
    | "Attendance Award"
    | "Special Recognition"
    | "Competition Participation"
    | "Certificate";

export interface Achievement {
    id: string;
    title: string;
    studentId: string;
    studentName: string;
    studentInitials: string;
    type: AchievementType;
    date: string;
    description: string;
    awardPosition?: string;
    certificateNumber?: string;
    relatedTournament?: string;
    issuedBy?: string;
}

export interface AchievementStats {
    totalAchievements: number;
    tournamentMedals: number;
    beltPromotions: number;
    certificatesIssued: number;
}
