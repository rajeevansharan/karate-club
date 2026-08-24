"use client";

import { useState, useMemo } from "react";
import { Instructor } from "@/types/instructor";
import { INITIAL_INSTRUCTORS } from "@/data/mockData";

export type InstructorSortField = keyof Instructor;

export function useInstructors() {
    const [instructors, setInstructors] = useState<Instructor[]>(INITIAL_INSTRUCTORS as Instructor[]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortField, setSortField] = useState<InstructorSortField | null>(null);
    const [sortAsc, setSortAsc] = useState(true);

    const filteredInstructors = useMemo(() => {
        return instructors
            .filter((inst) => {
                const q = searchQuery.toLowerCase().trim();
                if (!q) return true;
                return (
                    inst.name.toLowerCase().includes(q) ||
                    inst.id.toLowerCase().includes(q) ||
                    inst.email.toLowerCase().includes(q) ||
                    inst.phone.toLowerCase().includes(q)
                );
            })
            .sort((a, b) => {
                if (!sortField) return 0;
                let aVal = a[sortField];
                let bVal = b[sortField];

                // Parsing experience to integer for better sorting if necessary
                if (sortField === "experience") {
                    aVal = parseInt(aVal as string, 10);
                    bVal = parseInt(bVal as string, 10);
                }

                if (aVal < bVal) return sortAsc ? -1 : 1;
                if (aVal > bVal) return sortAsc ? 1 : -1;
                return 0;
            });
    }, [instructors, searchQuery, sortField, sortAsc]);

    const handleSort = (field: InstructorSortField) => {
        if (sortField === field) {
            setSortAsc(!sortAsc);
        } else {
            setSortField(field);
            setSortAsc(true);
        }
    };

    return {
        instructors: filteredInstructors,
        totalCount: instructors.length,
        searchQuery,
        setSearchQuery,
        sortField,
        sortAsc,
        handleSort,
    };
}
