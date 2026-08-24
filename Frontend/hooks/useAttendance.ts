"use client";

import { useState, useMemo } from "react";
import { AttendanceRecord, AttendanceStatus } from "@/types/attendance";
import { INITIAL_ATTENDANCE } from "@/data/mockAttendanceData";
import { INITIAL_STUDENTS } from "@/data/mockData";
import { INITIAL_CLASSES } from "@/data/mockData";

export function useAttendance() {
    const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);

    // Filters for Attendance History Page
    const [studentFilter, setStudentFilter] = useState("All students");
    const [classFilter, setClassFilter] = useState("All classes");
    const [instructorFilter, setInstructorFilter] = useState("All instructors");
    const [statusFilter, setStatusFilter] = useState("All statuses");
    const [dateFilter, setDateFilter] = useState("");

    // Calculate dynamic attendance stats for a student
    const getStudentStats = (studentId: string) => {
        const studentRecords = attendanceList.filter((r) => r.studentId === studentId);
        const total = studentRecords.length;

        if (total === 0) {
            return {
                percentage: 100, // default to 100% if no class recorded yet
                present: 0,
                absent: 0,
                late: 0,
                excused: 0,
                total: 0,
            };
        }

        const present = studentRecords.filter((r) => r.status === "Present").length;
        const absent = studentRecords.filter((r) => r.status === "Absent").length;
        const late = studentRecords.filter((r) => r.status === "Late").length;
        const excused = studentRecords.filter((r) => r.status === "Excused").length;

        // Formula: (Present + Late) / (Total - Excused)
        const activeSessions = total - excused;
        const percentage = activeSessions > 0
            ? Math.round(((present + late) / activeSessions) * 100)
            : 100;

        return {
            percentage,
            present,
            absent,
            late,
            excused,
            total,
        };
    };

    // Filtered history list
    const filteredAttendance = useMemo(() => {
        return attendanceList.filter((rec) => {
            const matchesStudent =
                studentFilter === "All students" ||
                rec.studentId === studentFilter ||
                rec.studentName.toLowerCase().includes(studentFilter.toLowerCase());

            const matchesClass =
                classFilter === "All classes" ||
                rec.classId === classFilter ||
                rec.className.toLowerCase().includes(classFilter.toLowerCase());

            const matchesStatus =
                statusFilter === "All statuses" ||
                rec.status.toLowerCase() === statusFilter.toLowerCase();

            const matchesDate = !dateFilter || rec.date === dateFilter;

            const matchesInstructor =
                instructorFilter === "All instructors" ||
                rec.markedBy.toLowerCase().includes(instructorFilter.toLowerCase());

            return matchesStudent && matchesClass && matchesStatus && matchesDate && matchesInstructor;
        });
    }, [attendanceList, studentFilter, classFilter, statusFilter, dateFilter, instructorFilter]);

    // Mark Session: standard flow
    const markAttendanceSession = (
        classId: string,
        date: string,
        records: { studentId: string; status: AttendanceStatus; checkInTime?: string }[],
        markedBy: string
    ) => {
        const clsObj = INITIAL_CLASSES.find((c) => c.id === classId);
        const className = clsObj ? clsObj.name : "Dojo Session";

        const newRecords: AttendanceRecord[] = records.map((rec, index) => {
            const studentObj = INITIAL_STUDENTS.find((s) => s.id === rec.studentId);
            const studentName = studentObj ? studentObj.name : "Student";
            const studentInitials = studentObj ? studentObj.initials : "ST";

            const nextIdNum = Math.floor(Math.random() * 9000) + 1000;

            return {
                id: `ATT-${nextIdNum}-${index}`,
                studentId: rec.studentId,
                studentName,
                studentInitials,
                classId,
                className,
                date,
                status: rec.status,
                checkInTime: rec.checkInTime || "",
                markedBy,
            };
        });

        // Remove previous records for this class & date to prevent duplicates
        setAttendanceList((prev) => {
            const filtered = prev.filter((r) => !(r.classId === classId && r.date === date));
            return [...newRecords, ...filtered];
        });
    };

    /**
     * QR CODE API CHECK-IN abstraction
     * Allows scanner modules to record check-ins dynamically.
     * 1. Detects student from scan payload.
     * 2. Finds current active class based on schedule or class target.
     * 3. Logs class attendance directly.
     */
    const recordQrCodeCheckIn = (
        studentId: string,
        classId: string,
        date: string,
        checkInTime: string
    ) => {
        const studentObj = INITIAL_STUDENTS.find((s) => s.id === studentId);
        if (!studentObj) return { success: false, message: "Student not found" };

        const clsObj = INITIAL_CLASSES.find((c) => c.id === classId);
        const className = clsObj ? clsObj.name : "Dojo Session";
        const instructor = clsObj ? clsObj.instructorName : "System Scanner";

        // Logic check: check if already exists for today
        const existingIdx = attendanceList.findIndex(
            (r) => r.studentId === studentId && r.classId === classId && r.date === date
        );

        const newRecord: AttendanceRecord = {
            id: `ATT-QR-${Math.floor(Math.random() * 9000) + 1000}`,
            studentId,
            studentName: studentObj.name,
            studentInitials: studentObj.initials,
            classId,
            className,
            date,
            checkInTime,
            status: "Present", // default check-in is Present via QR scan
            markedBy: `Self Check-in (QR Scanner) via ${instructor}`,
        };

        setAttendanceList((prev) => {
            if (existingIdx >= 0) {
                // Mutate/update existing slot
                return prev.map((r, idx) => (idx === existingIdx ? newRecord : r));
            } else {
                return [newRecord, ...prev];
            }
        });

        return { success: true, message: `Successfully check-in Amaya via QR for class ${className}` };
    };

    return {
        attendanceList,
        filteredAttendance,
        getStudentStats,
        studentFilter,
        setStudentFilter,
        classFilter,
        setClassFilter,
        instructorFilter,
        setInstructorFilter,
        statusFilter,
        setStatusFilter,
        dateFilter,
        setDateFilter,
        markAttendanceSession,
        recordQrCodeCheckIn,
    };
}
