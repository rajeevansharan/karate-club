"use client";

import { useState, useMemo } from "react";
import { Achievement, AchievementType, AchievementStats } from "@/types/achievement";
import { INITIAL_ACHIEVEMENTS } from "@/data/mockAchievementData";
import { INITIAL_STUDENTS } from "@/data/mockData";

export function useAchievements() {
    const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState<string>("All types");
    const [studentFilter, setStudentFilter] = useState<string>("All students");

    // Filter achievements based on search query, type, and student
    const filteredAchievements = useMemo(() => {
        return achievements.filter((ach) => {
            const matchesSearch =
                searchQuery === "" ||
                ach.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ach.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ach.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (ach.certificateNumber && ach.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesType = typeFilter === "All types" || ach.type === typeFilter;
            const matchesStudent = studentFilter === "All students" || ach.studentId === studentFilter;

            return matchesSearch && matchesType && matchesStudent;
        });
    }, [achievements, searchQuery, typeFilter, studentFilter]);

    // Calculate Dashboard Statistics
    const stats: AchievementStats = useMemo(() => {
        return {
            totalAchievements: achievements.length,
            tournamentMedals: achievements.filter((a) => a.type === "Tournament Medal").length,
            beltPromotions: achievements.filter((a) => a.type === "Belt Promotion").length,
            certificatesIssued: achievements.filter((a) => Boolean(a.certificateNumber)).length,
        };
    }, [achievements]);

    // Add new achievement function
    const addAchievement = (newAch: {
        title: string;
        studentId: string;
        type: AchievementType;
        date: string;
        description: string;
        awardPosition?: string;
        certificateNumber?: string;
        relatedTournament?: string;
        issuedBy?: string;
    }) => {
        const studentObj = INITIAL_STUDENTS.find((s) => s.id === newAch.studentId);
        const studentName = studentObj ? studentObj.name : "Unassigned Student";
        const studentInitials = studentObj ? studentObj.initials : "US";

        const created: Achievement = {
            id: `ACH-${Math.floor(100 + Math.random() * 900)}`,
            title: newAch.title,
            studentId: newAch.studentId,
            studentName,
            studentInitials,
            type: newAch.type,
            date: newAch.date,
            description: newAch.description,
            awardPosition: newAch.awardPosition || "Awarded",
            certificateNumber: newAch.certificateNumber || `CERT-2026-${Math.floor(100 + Math.random() * 900)}`,
            relatedTournament: newAch.relatedTournament || undefined,
            issuedBy: newAch.issuedBy || "Dojo Management",
        };

        setAchievements((prev) => [created, ...prev]);
    };

    return {
        achievements: filteredAchievements,
        allAchievements: achievements,
        stats,
        searchQuery,
        setSearchQuery,
        typeFilter,
        setTypeFilter,
        studentFilter,
        setStudentFilter,
        addAchievement,
        students: INITIAL_STUDENTS,
    };
}
