"use client";

import { useState } from "react";
import { GradingRecord, StudentEligibility, GradingEvent, EligibilityStatus, GradingResult } from "@/types/grading";
import { INITIAL_GRADING_RECORDS, INITIAL_ELIGIBILITY_CHECKS, INITIAL_GRADING_EVENTS, BELT_PROGRESSION } from "@/data/mockGradingData";
import { INITIAL_STUDENTS } from "@/data/mockData";
import { Student } from "@/types/student";

export function useGrading() {
    const [gradingRecords, setGradingRecords] = useState<GradingRecord[]>(INITIAL_GRADING_RECORDS);
    const [eligibilities, setEligibilities] = useState<StudentEligibility[]>(INITIAL_ELIGIBILITY_CHECKS);
    const [events, setEvents] = useState<GradingEvent[]>(INITIAL_GRADING_EVENTS);
    const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);

    // Filters
    const [eligibilityFilter, setEligibilityFilter] = useState<string>("All");

    // Create a new grading event
    const createGradingEvent = (data: Omit<GradingEvent, "id" | "status" | "eligibleStudentIds"> & { eligibleStudentIds: string[] }) => {
        const newEvent: GradingEvent = {
            ...data,
            id: `GEV-${Math.floor(Math.random() * 900) + 100}`,
            status: "Scheduled",
        };
        setEvents((prev) => [newEvent, ...prev]);
        return newEvent;
    };

    // Toggle recommendation status & update eligibility
    const toggleRecommendation = (studentId: string) => {
        setEligibilities((prev) =>
            prev.map((el) => {
                if (el.studentId !== studentId) return el;

                const newRecommended = !el.recommendedByInstructor;
                let newStatus: EligibilityStatus = "Not Eligible";

                if (newRecommended) {
                    if (el.attendanceRate >= 85 && el.trainingPeriodMonths >= 6) {
                        newStatus = "Eligible";
                    } else {
                        newStatus = "Pending Review";
                    }
                } else {
                    newStatus = "Not Eligible";
                }

                return {
                    ...el,
                    recommendedByInstructor: newRecommended,
                    status: newStatus,
                };
            })
        );
    };

    // Record grading score / result
    const recordGradingResult = (
        eventId: string,
        studentId: string,
        result: GradingResult,
        score: string,
        comments: string,
        instructor: string
    ) => {
        // Find competitor student
        const studentObj = students.find((s) => s.id === studentId);
        if (!studentObj) return { success: false, message: "Student not found in dojo." };

        const currentBelt = studentObj.belt;
        const currentIdx = BELT_PROGRESSION.indexOf(currentBelt);
        let nextBelt: string = currentBelt;

        if (result === "Pass" && currentIdx !== -1 && currentIdx < BELT_PROGRESSION.length - 1) {
            nextBelt = BELT_PROGRESSION[currentIdx + 1];
        }

        // 1. Create a new GradingRecord logging history
        const newRecord: GradingRecord = {
            id: `GRD-${Math.floor(Math.random() * 900) + 100}`,
            studentId,
            studentName: studentObj.name,
            previousBelt: currentBelt,
            currentBelt: nextBelt,
            gradingDate: new Date().toISOString().split("T")[0],
            result,
            score,
            instructor,
            comments,
            nextBelt: currentIdx < BELT_PROGRESSION.length - 2 ? BELT_PROGRESSION[currentIdx + 2] : BELT_PROGRESSION[BELT_PROGRESSION.length - 1],
        };

        setGradingRecords((prev) => [newRecord, ...prev]);

        // 2. If student passed, update their current belt rank in the students list
        if (result === "Pass") {
            setStudents((prev) =>
                prev.map((s) => (s.id === studentId ? { ...s, belt: nextBelt as any } : s))
            );

            // 3. Update their eligibility record (since they promoted, their new next target shifts)
            setEligibilities((prev) =>
                prev.map((el) => {
                    if (el.studentId !== studentId) return el;
                    const nextIdx = BELT_PROGRESSION.indexOf(nextBelt);
                    const finalIdx = BELT_PROGRESSION.length - 1;
                    const targetBelt = nextIdx < finalIdx ? BELT_PROGRESSION[nextIdx + 1] : BELT_PROGRESSION[finalIdx];

                    return {
                        ...el,
                        currentBelt: nextBelt,
                        nextBelt: targetBelt,
                        trainingPeriodMonths: 0, // Reset training counters
                        recommendedByInstructor: false,
                        status: "Not Eligible",
                    };
                })
            );
        }

        return { success: true, message: `Grading logged successfully! Student status: ${result}` };
    };

    // Filtered Eligibilites list
    const filteredEligibilities = eligibilities.filter((el) => {
        if (eligibilityFilter === "All") return true;
        return el.status === eligibilityFilter;
    });

    return {
        gradingRecords,
        allRecordsRaw: gradingRecords,
        eligibilities: filteredEligibilities,
        allEligibilitiesRaw: eligibilities,
        events,
        students,
        eligibilityFilter,
        setEligibilityFilter,
        createGradingEvent,
        toggleRecommendation,
        recordGradingResult,
    };
}
