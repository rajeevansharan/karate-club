"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentFilters } from "@/components/students/StudentFilters";
import { StudentsTable } from "@/components/students/StudentsTable";
import { AddStudentModal } from "@/components/students/AddStudentModal";
import { StudentDetailsModal } from "@/components/students/StudentDetailsModal";
import { useStudents } from "@/hooks/useStudents";
import { Student } from "@/types/student";

export default function StudentsPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const {
        students,
        totalCount,
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
        handleSort,
        addStudent,
    } = useStudents();

    return (
        <div className="flex h-screen w-screen bg-[#F5F5F7] font-sans antialiased text-[#1C1C1E] lg:overflow-hidden select-none">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-y-auto bg-[#F5F5F7] p-4 sm:p-6 lg:p-8 pt-[72px] lg:pt-8">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <StudentsHeader
                        count={totalCount}
                        onAddClick={() => setIsAddModalOpen(true)}
                    />

                    {/* Controls Bar (Search + Dropdowns) */}
                    <StudentFilters
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        beltFilter={beltFilter}
                        onBeltChange={setBeltFilter}
                        classFilter={classFilter}
                        onClassChange={setClassFilter}
                        instructorFilter={instructorFilter}
                        onInstructorChange={setInstructorFilter}
                        statusFilter={statusFilter}
                        onStatusChange={setStatusFilter}
                    />

                    {/* Data Table */}
                    <StudentsTable
                        students={students}
                        onSort={handleSort}
                        onViewDetails={(student) => {
                            setSelectedStudent(student);
                            setIsDetailsOpen(true);
                        }}
                    />
                </div>
            </main>

            {/* Add Student Modal */}
            <AddStudentModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddStudent={addStudent}
            />

            {/* Student Details Modal showing Attendance Rate */}
            <StudentDetailsModal
                student={selectedStudent}
                isOpen={isDetailsOpen}
                onClose={() => {
                    setSelectedStudent(null);
                    setIsDetailsOpen(false);
                }}
            />
        </div>
    );
}
