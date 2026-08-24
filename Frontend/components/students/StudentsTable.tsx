import React from "react";
import { ArrowUpDown, Eye, Pencil, UserPlus } from "lucide-react";
import { Student, StudentSortField } from "@/types/student";
import { BeltBadge } from "./BeltBadge";
import { StatusBadge } from "./StatusBadge";

interface StudentsTableProps {
    students: Student[];
    onSort: (field: StudentSortField) => void;
    onViewDetails?: (student: Student) => void;
}

export function StudentsTable({ students, onSort, onViewDetails }: StudentsTableProps) {
    return (
        <div className="bg-white rounded-2xl border border-[#E5E5EA] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex-1 flex flex-col">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                        <tr className="border-b border-[#E5E5EA] bg-[#FAFAFC] text-[12px] font-medium text-[#6C6C70]">
                            <th
                                className="py-3 px-4 font-normal cursor-pointer select-none hover:text-[#1C1C1E]"
                                onClick={() => onSort("id")}
                            >
                                <div className="flex items-center gap-1">
                                    <span>Student ID</span>
                                    <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                                </div>
                            </th>
                            <th
                                className="py-3 px-4 font-normal cursor-pointer select-none hover:text-[#1C1C1E]"
                                onClick={() => onSort("name")}
                            >
                                <div className="flex items-center gap-1">
                                    <span>Student</span>
                                    <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                                </div>
                            </th>
                            <th
                                className="py-3 px-4 font-normal cursor-pointer select-none hover:text-[#1C1C1E]"
                                onClick={() => onSort("age")}
                            >
                                <div className="flex items-center gap-1">
                                    <span>Age</span>
                                    <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                                </div>
                            </th>
                            <th
                                className="py-3 px-4 font-normal cursor-pointer select-none hover:text-[#1C1C1E]"
                                onClick={() => onSort("belt")}
                            >
                                <div className="flex items-center gap-1">
                                    <span>Belt</span>
                                    <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                                </div>
                            </th>
                            <th className="py-3 px-4 font-normal">Class</th>
                            <th className="py-3 px-4 font-normal">Instructor</th>
                            <th className="py-3 px-4 font-normal">Membership</th>
                            <th
                                className="py-3 px-4 font-normal cursor-pointer select-none hover:text-[#1C1C1E]"
                                onClick={() => onSort("attendance")}
                            >
                                <div className="flex items-center gap-1">
                                    <span>Attendance</span>
                                    <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                                </div>
                            </th>
                            <th className="py-3 px-4 font-normal">Status</th>
                            <th className="py-3 px-4 font-normal text-right pr-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F2F7] text-xs">
                        {students.map((student) => (
                            <tr
                                key={student.id}
                                className="hover:bg-[#FAFAFC] transition-colors group"
                            >
                                {/* ID */}
                                <td className="py-3.5 px-4 font-mono font-medium text-[#3A3A3C]">
                                    {student.id}
                                </td>

                                {/* Student Avatar + Name + Phone */}
                                <td className="py-3.5 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#FDE8EA] text-[#9E1B28] font-semibold flex items-center justify-center text-xs shrink-0">
                                            {student.initials}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-[13px] text-[#1C1C1E] leading-tight">
                                                {student.name}
                                            </span>
                                            <span className="text-[11px] text-[#8E8E93] mt-0.5">
                                                {student.phone}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Age */}
                                <td className="py-3.5 px-4 font-medium text-[#3A3A3C]">
                                    {student.age}
                                </td>

                                {/* Belt */}
                                <td className="py-3.5 px-4">
                                    <BeltBadge belt={student.belt} />
                                </td>

                                {/* Class */}
                                <td className="py-3.5 px-4 font-medium text-[#3A3A3C]">
                                    {student.class}
                                </td>

                                {/* Instructor */}
                                <td className="py-3.5 px-4 text-[#3A3A3C]">
                                    {student.instructor}
                                </td>

                                {/* Membership */}
                                <td className="py-3.5 px-4">
                                    <StatusBadge status={student.membership} type="membership" />
                                </td>

                                {/* Attendance */}
                                <td className="py-3.5 px-4 font-medium text-[#3A3A3C]">
                                    {student.attendance}
                                </td>

                                {/* Status */}
                                <td className="py-3.5 px-4">
                                    <StatusBadge status={student.status} type="status" />
                                </td>

                                {/* Actions */}
                                <td className="py-3.5 px-4 text-right pr-6">
                                    <div className="flex items-center justify-end gap-2 text-[#8E8E93]">
                                        <button
                                            title="View Student"
                                            onClick={() => onViewDetails?.(student)}
                                            className="p-1 hover:text-[#1C1C1E] transition-colors cursor-pointer"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            title="Edit Student"
                                            className="p-1 hover:text-[#1C1C1E] transition-colors"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            title="Assign / Options"
                                            className="p-1 hover:text-[#9E1B28] transition-colors"
                                        >
                                            <UserPlus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
