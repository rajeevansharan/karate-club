"use client";

import { useState, useMemo } from "react";
import { Student, StudentSortField, BeltRank } from "@/types/student";
import { INITIAL_STUDENTS } from "@/data/mockData";

export function useStudents() {
    const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);

    // Filters State
    const [searchQuery, setSearchQuery] = useState("");
    const [beltFilter, setBeltFilter] = useState("All belts");
    const [classFilter, setClassFilter] = useState("All classes");
    const [instructorFilter, setInstructorFilter] = useState("All instructors");
    const [statusFilter, setStatusFilter] = useState("All statuses");

    // Sorting State
    const [sortField, setSortField] = useState<StudentSortField | null>(null);
    const [sortAsc, setSortAsc] = useState(true);

    // Filter & Sort Logic
    const filteredStudents = useMemo(() => {
        return students
            .filter((student) => {
                const q = searchQuery.toLowerCase().trim();
                const matchesSearch =
                    !q ||
                    student.name.toLowerCase().includes(q) ||
                    student.id.toLowerCase().includes(q) ||
                    student.phone.toLowerCase().includes(q);

                const matchesBelt =
                    beltFilter === "All belts" ||
                    student.belt.toLowerCase() === beltFilter.toLowerCase();

                const matchesClass =
                    classFilter === "All classes" ||
                    student.class.toLowerCase().includes(classFilter.toLowerCase());

                const matchesInstructor =
                    instructorFilter === "All instructors" ||
                    student.instructor
                        .toLowerCase()
                        .includes(instructorFilter.toLowerCase());

                const matchesStatus =
                    statusFilter === "All statuses" ||
                    student.status.toLowerCase() === statusFilter.toLowerCase();

                return (
                    matchesSearch &&
                    matchesBelt &&
                    matchesClass &&
                    matchesInstructor &&
                    matchesStatus
                );
            })
            .sort((a, b) => {
                if (!sortField) return 0;
                const aVal = a[sortField];
                const bVal = b[sortField];
                if (aVal < bVal) return sortAsc ? -1 : 1;
                if (aVal > bVal) return sortAsc ? 1 : -1;
                return 0;
            });
    }, [
        students,
        searchQuery,
        beltFilter,
        classFilter,
        instructorFilter,
        statusFilter,
        sortField,
        sortAsc,
    ]);

    const handleSort = (field: StudentSortField) => {
        if (sortField === field) {
            setSortAsc(!sortAsc);
        } else {
            setSortField(field);
            setSortAsc(true);
        }
    };

    const addStudent = (newStudentData: {
        name: string;
        phone: string;
        age: number;
        belt: BeltRank;
        class: string;
        instructor: string;
    }) => {
        const names = newStudentData.name.trim().split(" ");
        const initials =
            names.length > 1
                ? (names[0][0] + names[names.length - 1][0]).toUpperCase()
                : names[0].slice(0, 2).toUpperCase();

        const newId = `STU-00${students.length + 1}`;
        const newStudent: Student = {
            id: newId,
            initials,
            name: newStudentData.name,
            phone: newStudentData.phone || "+94 77 123 4567",
            age: Number(newStudentData.age) || 18,
            belt: newStudentData.belt,
            class: newStudentData.class,
            instructor: newStudentData.instructor,
            membership: "Active",
            attendance: "100%",
            status: "Active",
        };

        setStudents((prev) => [newStudent, ...prev]);
    };

    return {
        students: filteredStudents,
        totalCount: students.length,
        searchQuery,
        setSearchQuery,
        beltFilter,
        setBeltFilter,
        classFilter,
        setClassFilter,
        instructorFilter,
        setInstructorFilter,
        statusFilter,
        setStatusFilter,
        sortField,
        sortAsc,
        handleSort,
        addStudent,
    };
}
