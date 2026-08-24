"use client";

import { useState } from "react";
import { Tournament, TournamentRegistration, TournamentStatus, MedalType, CompetitionType } from "@/types/tournament";
import { INITIAL_TOURNAMENTS, INITIAL_REGISTRATIONS } from "@/data/mockTournamentData";
import { INITIAL_STUDENTS } from "@/data/mockData";

export function useTournaments() {
    const [tournaments, setTournaments] = useState<Tournament[]>(INITIAL_TOURNAMENTS);
    const [registrations, setRegistrations] = useState<TournamentRegistration[]>(INITIAL_REGISTRATIONS);

    // Filter states for tournaments
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [typeFilter, setTypeFilter] = useState<string>("All");

    // Add Tournament
    const addTournament = (data: Omit<Tournament, "id">) => {
        const newTournament: Tournament = {
            ...data,
            id: `TRN-${Math.floor(Math.random() * 900) + 100}`,
        };
        setTournaments((prev) => [newTournament, ...prev]);
    };

    // Update Tournament Status
    const updateTournamentStatus = (id: string, status: TournamentStatus) => {
        setTournaments((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status } : t))
        );
    };

    // Register Student for Categories
    const registerStudent = (
        tournamentId: string,
        studentId: string,
        category: {
            ageCategory: string;
            beltCategory: string;
            weightCategory: string;
            competitionType: CompetitionType;
        }
    ) => {
        const studentObj = INITIAL_STUDENTS.find((s) => s.id === studentId);
        const tourneyObj = tournaments.find((t) => t.id === tournamentId);

        if (!studentObj || !tourneyObj) return { success: false, message: "Invalid student or tournament" };

        // Check if student already registered for this tournament & type
        const matches = registrations.find(
            (r) =>
                r.tournamentId === tournamentId &&
                r.studentId === studentId &&
                r.competitionType === category.competitionType
        );

        if (matches) {
            return {
                success: false,
                message: `Student already registered in ${category.competitionType} for this tournament.`,
            };
        }

        const newReg: TournamentRegistration = {
            id: `REG-${Math.floor(Math.random() * 900) + 100}`,
            tournamentId,
            tournamentName: tourneyObj.name,
            studentId,
            studentName: studentObj.name,
            ...category,
            participated: false,
            medal: "None",
        };

        setRegistrations((prev) => [...prev, newReg]);
        return { success: true, message: "Student registered successfully!" };
    };

    // Record Results
    const recordResults = (
        registrationId: string,
        results: {
            participated: boolean;
            position?: number;
            medal: MedalType;
            score?: string;
            notes?: string;
        }
    ) => {
        setRegistrations((prev) =>
            prev.map((r) =>
                r.id === registrationId
                    ? {
                        ...r,
                        ...results,
                    }
                    : r
            )
        );
    };

    // Filtered lists
    const filteredTournaments = tournaments.filter((t) => {
        const matchesStatus = statusFilter === "All" || t.status === statusFilter;
        return matchesStatus;
    });

    return {
        tournaments: filteredTournaments,
        allTournaments: tournaments,
        registrations,
        statusFilter,
        setStatusFilter,
        typeFilter,
        setTypeFilter,
        addTournament,
        updateTournamentStatus,
        registerStudent,
        recordResults,
    };
}
