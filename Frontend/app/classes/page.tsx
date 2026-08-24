"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { ClassListTable } from "@/components/classes/ClassListTable";
import { WeeklySchedule } from "@/components/classes/WeeklySchedule";
import { ClassDetailsModal } from "@/components/classes/ClassDetailsModal";
import { AddEditClassModal } from "@/components/classes/AddEditClassModal";
import { useClasses } from "@/hooks/useClasses";
import { ClassSession } from "@/types/class";
import { Search, Plus, Calendar, List } from "lucide-react";

export default function ClassesPage() {
    const {
        classes,
        totalCount,
        searchQuery,
        setSearchQuery,
        dayFilter,
        setDayFilter,
        statusFilter,
        setStatusFilter,
        handleSort,
        addClass,
        editClass,
        deleteClass,
    } = useClasses();

    // UI View toggles
    const [viewMode, setViewMode] = useState<"schedule" | "list">("schedule");

    // Modal Control States
    const [selectedDetailClass, setSelectedDetailClass] = useState<ClassSession | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const [selectedFormClass, setSelectedFormClass] = useState<ClassSession | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleViewDetails = (cls: ClassSession) => {
        setSelectedDetailClass(cls);
        setIsDetailOpen(true);
    };

    const handleCreateClick = () => {
        setSelectedFormClass(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (cls: ClassSession) => {
        setSelectedFormClass(cls);
        setIsFormOpen(true);
    };

    const handleFormSubmit = (data: any) => {
        if (selectedFormClass) {
            // Edit mode
            editClass(selectedFormClass.id, data);
        } else {
            // Add mode
            addClass(data);
        }
    };

    return (
        <div className="flex h-screen w-screen bg-[#F5F5F7] font-sans antialiased text-[#1C1C1E] lg:overflow-hidden select-none">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-y-auto bg-[#F5F5F7] p-4 sm:p-6 lg:p-8 pt-[72px] lg:pt-8">
                <div className="flex flex-col h-full">

                    {/* Header bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight">
                                Class & Schedule Management
                            </h1>
                            <p className="text-sm text-[#6C6C70] mt-0.5 font-normal">
                                {totalCount} total classes on roster
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
                            {/* View Switcher Tabs */}
                            <div className="bg-[#E5E5EA] p-1 rounded-xl flex items-center gap-1 mr-2">
                                <button
                                    onClick={() => setViewMode("schedule")}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${viewMode === "schedule"
                                        ? "bg-white text-[#1C1C1E] shadow-sm"
                                        : "text-[#6C6C70] hover:text-[#1C1C1E]"
                                        }`}
                                >
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>Weekly Schedule</span>
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${viewMode === "list"
                                        ? "bg-white text-[#1C1C1E] shadow-sm"
                                        : "text-[#6C6C70] hover:text-[#1C1C1E]"
                                        }`}
                                >
                                    <List className="w-3.5 h-3.5" />
                                    <span>Class List</span>
                                </button>
                            </div>

                            <button
                                onClick={handleCreateClick}
                                className="bg-[#9E1B28] hover:bg-[#851621] text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                            >
                                <Plus className="w-4 h-4 stroke-[2.5]" />
                                <span>Add Class</span>
                            </button>
                        </div>
                    </div>

                    {/* Filter controls */}
                    <div className="flex flex-wrap items-center gap-4 bg-white p-3 rounded-2xl border border-[#E5E5EA] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                        {/* Search bar */}
                        <div className="flex items-center flex-1 min-w-[240px] bg-[#F2F2F7] px-3 py-2 rounded-xl">
                            <Search className="w-4 h-4 text-[#8E8E93] mr-2 shrink-0" />
                            <input
                                type="text"
                                placeholder="Search classes, instructors, location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent text-sm focus:outline-none placeholder:text-[#8E8E93] text-[#1C1C1E] font-medium"
                            />
                        </div>

                        {/* Day Filter */}
                        <div className="flex items-center gap-2.5">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
                                Day
                            </span>
                            <select
                                value={dayFilter}
                                onChange={(e) => setDayFilter(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs font-medium text-[#3A3A3C] focus:outline-none focus:border-[#9E1B28]"
                            >
                                <option value="All days">All days</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2.5">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
                                Status
                            </span>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="bg-[#FAFAFC] border border-[#E5E5EA] rounded-xl px-3 py-2 text-xs font-medium text-[#3A3A3C] focus:outline-none focus:border-[#9E1B28]"
                            >
                                <option value="All statuses">All statuses</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Toggleable Data Content Views */}
                    {viewMode === "schedule" ? (
                        <WeeklySchedule
                            classes={classes}
                            onViewDetails={handleViewDetails}
                        />
                    ) : (
                        <ClassListTable
                            classes={classes}
                            onSort={handleSort}
                            onViewDetails={handleViewDetails}
                            onEdit={handleEditClick}
                            onDelete={deleteClass}
                        />
                    )}

                </div>
            </main>

            {/* Class Details Modal */}
            <ClassDetailsModal
                cls={selectedDetailClass}
                isOpen={isDetailOpen}
                onClose={() => {
                    setSelectedDetailClass(null);
                    setIsDetailOpen(false);
                }}
            />

            {/* Add / Edit Class Modal */}
            <AddEditClassModal
                isOpen={isFormOpen}
                cls={selectedFormClass}
                onSubmit={handleFormSubmit}
                onClose={() => {
                    setSelectedFormClass(null);
                    setIsFormOpen(false);
                }}
            />
        </div>
    );
}
