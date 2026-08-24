import React from "react";
import { ArrowUpDown, Eye, Pencil, Trash2 } from "lucide-react";
import { ClassSession } from "@/types/class";
import { BeltBadge } from "@/components/students/BeltBadge";
import { StatusBadge } from "@/components/students/StatusBadge";
import { ClassSortField } from "@/hooks/useClasses";

interface ClassListTableProps {
    classes: ClassSession[];
    onSort: (field: ClassSortField) => void;
    onViewDetails: (c: ClassSession) => void;
    onEdit: (c: ClassSession) => void;
    onDelete: (id: string) => void;
}

export function ClassListTable({
    classes,
    onSort,
    onViewDetails,
    onEdit,
    onDelete,
}: ClassListTableProps) {
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
                                    <span>Class Name</span>
                                    <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                                </div>
                            </th>
                            <th className="py-3 px-4 font-normal">Instructor</th>
                            <th className="py-3 px-4 font-normal">Day & Time</th>
                            <th className="py-3 px-4 font-normal">Location</th>
                            <th className="py-3 px-4 font-normal">Age Group</th>
                            <th className="py-3 px-4 font-normal">Min Belt</th>
                            <th
                                className="py-3 px-4 font-normal cursor-pointer select-none hover:text-[#1C1C1E]"
                                onClick={() => onSort("currentStudents")}
                            >
                                <div className="flex items-center gap-1">
                                    <span>Students</span>
                                    <ArrowUpDown className="w-3 h-3 text-[#8E8E93]" />
                                </div>
                            </th>
                            <th className="py-3 px-4 font-normal">Status</th>
                            <th className="py-3 px-4 font-normal text-right pr-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F2F7] text-xs">
                        {classes.map((cls) => (
                            <tr
                                key={cls.id}
                                className="hover:bg-[#FAFAFC] transition-colors group"
                            >
                                {/* ID */}
                                <td className="py-3.5 px-4 font-mono font-medium text-[#3A3A3C]">
                                    {cls.id}
                                </td>

                                {/* Class Name */}
                                <td className="py-3.5 px-4 font-semibold text-[13px] text-[#1C1C1E]">
                                    {cls.name}
                                </td>

                                {/* Instructor */}
                                <td className="py-3.5 px-4 text-[#3A3A3C]">
                                    {cls.instructorName}
                                </td>

                                {/* Day & Time */}
                                <td className="py-3.5 px-4 text-[#3A3A3C]">
                                    <span className="font-semibold text-xs text-[#9E1B28]">{cls.day}</span>
                                    <span className="block text-[11px] text-[#8E8E93] mt-0.5">{cls.startTime} - {cls.endTime}</span>
                                </td>

                                {/* Location */}
                                <td className="py-3.5 px-4 text-[#3A3A3C]">
                                    {cls.location}
                                </td>

                                {/* Age Group */}
                                <td className="py-3.5 px-4">
                                    <span className="bg-[#F2F2F7] text-[#3A3A3C] px-2.5 py-0.5 rounded-md font-medium text-[11px]">
                                        {cls.ageGroup}
                                    </span>
                                </td>

                                {/* Min Belt */}
                                <td className="py-3.5 px-4">
                                    <BeltBadge belt={cls.minBelt} />
                                </td>

                                {/* Students (Current / Max) */}
                                <td className="py-3.5 px-4 text-[#3A3A3C]">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">{cls.currentStudents}</span>
                                        <span className="text-[#8E8E93]">/</span>
                                        <span className="text-[#8E8E93]">{cls.maxStudents}</span>
                                        {cls.currentStudents >= cls.maxStudents ? (
                                            <span className="bg-[#FDE8EA] text-[#9E1B28] px-1.5 py-0.2 rounded text-[9px] font-bold">FULL</span>
                                        ) : null}
                                    </div>
                                    {/* Small ProgressBar */}
                                    <div className="w-16 bg-[#E5E5EA] h-1 rounded-full overflow-hidden mt-1.5">
                                        <div
                                            className={`h-full ${cls.currentStudents >= cls.maxStudents ? 'bg-[#9E1B28]' : 'bg-[#25734A]'}`}
                                            style={{ width: `${Math.min(100, (cls.currentStudents / cls.maxStudents) * 100)}%` }}
                                        />
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="py-3.5 px-4">
                                    <StatusBadge status={cls.status} type="status" />
                                </td>

                                {/* Actions */}
                                <td className="py-3.5 px-4 text-right pr-6">
                                    <div className="flex items-center justify-end gap-2 text-[#8E8E93]">
                                        <button
                                            title="View Details"
                                            onClick={() => onViewDetails(cls)}
                                            className="p-1 hover:text-[#1C1C1E] transition-colors cursor-pointer"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            title="Edit Class"
                                            onClick={() => onEdit(cls)}
                                            className="p-1 hover:text-[#1C1C1E] transition-colors cursor-pointer"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            title="Delete Class"
                                            onClick={() => onDelete(cls.id)}
                                            className="p-1 hover:text-[#9E1B28] transition-colors cursor-pointer"
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

            <div className="px-4 py-3 border-t border-[#E5E5EA] bg-white flex items-center justify-between text-xs text-[#6C6C70]">
                <span>{classes.length} classes available</span>
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
