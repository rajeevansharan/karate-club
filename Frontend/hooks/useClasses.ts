"use client";

import { useState, useMemo } from "react";
import { ClassSession } from "@/types/class";
import { INITIAL_CLASSES } from "@/data/mockData";

export type ClassSortField = keyof ClassSession;

export function useClasses() {
    const [classes, setClasses] = useState<ClassSession[]>(INITIAL_CLASSES as ClassSession[]);
    const [searchQuery, setSearchQuery] = useState("");
    const [dayFilter, setDayFilter] = useState("All days");
    const [statusFilter, setStatusFilter] = useState("All statuses");
    const [sortField, setSortField] = useState<ClassSortField | null>(null);
    const [sortAsc, setSortAsc] = useState(true);

    const filteredClasses = useMemo(() => {
        return classes
            .filter((c) => {
                const q = searchQuery.toLowerCase().trim();
                const matchesSearch =
                    !q ||
                    c.name.toLowerCase().includes(q) ||
                    c.instructorName.toLowerCase().includes(q) ||
                    c.location.toLowerCase().includes(q);

                const matchesDay =
                    dayFilter === "All days" ||
                    c.day.toLowerCase() === dayFilter.toLowerCase();

                const matchesStatus =
                    statusFilter === "All statuses" ||
                    c.status.toLowerCase() === statusFilter.toLowerCase();

                return matchesSearch && matchesDay && matchesStatus;
            })
            .sort((a, b) => {
                if (!sortField) return 0;
                const aVal = a[sortField];
                const bVal = b[sortField];

                if (aVal < bVal) return sortAsc ? -1 : 1;
                if (aVal > bVal) return sortAsc ? 1 : -1;
                return 0;
            });
    }, [classes, searchQuery, dayFilter, statusFilter, sortField, sortAsc]);

    const handleSort = (field: ClassSortField) => {
        if (sortField === field) {
            setSortAsc(!sortAsc);
        } else {
            setSortField(field);
            setSortAsc(true);
        }
    };

    const addClass = (newClass: Omit<ClassSession, "id" | "currentStudents">) => {
        const nextIdNum = Math.max(...classes.map((c) => parseInt(c.id.split("-")[1], 10))) + 1;
        const formattedId = `CLS-${String(nextIdNum).padStart(3, "0")}`;

        const fullNewClass: ClassSession = {
            ...newClass,
            id: formattedId,
            currentStudents: 0,
        };

        setClasses((prev) => [...prev, fullNewClass]);
    };

    const editClass = (id: string, updatedFields: Partial<ClassSession>) => {
        setClasses((prev) =>
            prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
        );
    };

    const deleteClass = (id: string) => {
        setClasses((prev) => prev.filter((c) => c.id !== id));
    };

    return {
        classes: filteredClasses,
        originalClasses: classes,
        totalCount: classes.length,
        searchQuery,
        setSearchQuery,
        dayFilter,
        setDayFilter,
        statusFilter,
        setStatusFilter,
        sortField,
        sortAsc,
        handleSort,
        addClass,
        editClass,
        deleteClass,
    };
}
