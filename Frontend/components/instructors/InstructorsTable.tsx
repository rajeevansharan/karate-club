import React from "react";
import { ArrowUpDown, Eye, Pencil, Trash2 } from "lucide-react";
import { Instructor } from "@/types/instructor";
import { BeltBadge } from "@/components/students/BeltBadge";
import { StatusBadge } from "@/components/students/StatusBadge";
import { InstructorSortField } from "@/hooks/useInstructors";

interface InstructorsTableProps {
    instructors: Instructor[];
    onSort: (field: InstructorSortField) => void;
}

export function InstructorsTable({ instructors, onSort }: InstructorsTableProps) {
    return (
        <div className="bg-white rounded-2xl border border-[#E5E5EA] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex-1 flex flex-col mt-4">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                        <tr className="border-b border-[#E5E5EA] bg-[#FAFAFC] text-[12px] font-medium text-[#6C6C70]">
                            <th className="py-3 px-4 font-normal">ID</th>
                            <th
                                className="py-3 px-4 font-normal cursor-pointer select-none hover:text-[#1C1C1E]"
                                onClick={() => onSort("name")}
                            >
                                <div className="flex items-center gap-1">
                                    <span>Instructor</span>
                                    <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                                </div>
                            </th>
                            <th className="py-3 px-4 font-normal">Belt Rank</th>
                            <th className="py-3 px-4 font-normal">Grade</th>
                            <th className="py-3 px-4 font-normal">Phone</th>
                            <th
                                className="py-3 px-4 font-normal cursor-pointer select-none hover:text-[#1C1C1E]"
                                onClick={() => onSort("classes")}
                            >
                                <div className="flex items-center gap-1">
                                    <span>Classes</span>
                                    <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                                </div>
                            </th>
                            <th className="py-3 px-4 font-normal">Students</th>
                            <th
                                className="py-3 px-4 font-normal cursor-pointer select-none hover:text-[#1C1C1E]"
                                onClick={() => onSort("experience")}
                            >
                                <div className="flex items-center gap-1">
                                    <span>Experience</span>
                                    <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                                </div>
                            </th>
                            <th className="py-3 px-4 font-normal">Status</th>
                            <th className="py-3 px-4 font-normal text-right pr-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F2F7] text-xs">
                        {instructors.map((instructor) => (
                            <tr
                                key={instructor.id}
                                className="hover:bg-[#FAFAFC] transition-colors group"
                            >
                                {/* ID */}
                                <td className="py-3.5 px-4 font-mono font-medium text-[#3A3A3C]">
                                    {instructor.id}
                                </td>

                                {/* Instructor Avatar + Name + Email */}
                                <td className="py-3.5 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#FDE8EA] text-[#9E1B28] font-semibold flex items-center justify-center text-xs shrink-0">
                                            {instructor.initials}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-[13px] text-[#1C1C1E] leading-tight">
                                                {instructor.name}
                                            </span>
                                            <span className="text-[11px] text-[#8E8E93] mt-0.5">
                                                {instructor.email}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Belt Rank */}
                                <td className="py-3.5 px-4">
                                    <BeltBadge belt={instructor.belt} />
                                </td>

                                {/* Grade */}
                                <td className="py-3.5 px-4 font-medium text-[#3A3A3C]">
                                    {instructor.grade}
                                </td>

                                {/* Phone */}
                                <td className="py-3.5 px-4 text-[#3A3A3C]">
                                    {instructor.phone}
                                </td>

                                {/* Classes */}
                                <td className="py-3.5 px-4 text-[#3A3A3C]">
                                    {instructor.classes}
                                </td>

                                {/* Students */}
                                <td className="py-3.5 px-4 text-[#3A3A3C]">
                                    {instructor.students}
                                </td>

                                {/* Experience */}
                                <td className="py-3.5 px-4 text-[#3A3A3C]">
                                    {instructor.experience}
                                </td>

                                {/* Status */}
                                <td className="py-3.5 px-4">
                                    <StatusBadge status={instructor.status} type="status" />
                                </td>

                                {/* Actions */}
                                <td className="py-3.5 px-4 text-right pr-6">
                                    <div className="flex items-center justify-end gap-2 text-[#8E8E93]">
                                        <button
                                            title="View Instructor"
                                            className="p-1 hover:text-[#1C1C1E] transition-colors"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            title="Edit Instructor"
                                            className="p-1 hover:text-[#1C1C1E] transition-colors"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            title="Delete Instructor"
                                            className="p-1 hover:text-[#9E1B28] transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-4 py-3 border-t border-[#E5E5EA] bg-white flex items-center justify-between text-xs text-[#6C6C70]">
                <span>{instructors.length} records</span>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 hover:text-[#1C1C1E] disabled:opacity-50" disabled>
                        <span>&lt; Prev</span>
                    </button>
                    <span>Page 1 of 1</span>
                    <button className="flex items-center gap-1 hover:text-[#1C1C1E] disabled:opacity-50" disabled>
                        <span>Next &gt;</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
