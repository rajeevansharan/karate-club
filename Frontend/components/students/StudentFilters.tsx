import React from "react";
import { Search, ChevronDown } from "lucide-react";

interface StudentFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    beltFilter: string;
    onBeltChange: (value: string) => void;
    classFilter: string;
    onClassChange: (value: string) => void;
    instructorFilter: string;
    onInstructorChange: (value: string) => void;
    statusFilter: string;
    onStatusChange: (value: string) => void;
}

export function StudentFilters({
    searchQuery,
    onSearchChange,
    beltFilter,
    onBeltChange,
    classFilter,
    onClassChange,
    instructorFilter,
    onInstructorChange,
    statusFilter,
    onStatusChange,
}: StudentFiltersProps) {
    return (
        <div className="space-y-3 mb-6">
            {/* Search Bar */}
            <div className="relative w-full max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E8E93]" />
                <input
                    type="text"
                    placeholder="Search by name, ID or phone..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E5EA] rounded-xl text-sm text-[#1C1C1E] placeholder-[#8E8E93] focus:outline-none focus:border-[#9E1B28] transition-colors shadow-2xs"
                />
            </div>

            {/* Filter Dropdowns Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Belts Filter */}
                <div className="relative">
                    <select
                        value={beltFilter}
                        onChange={(e) => onBeltChange(e.target.value)}
                        className="w-full appearance-none bg-white border border-[#E5E5EA] px-3.5 py-2 rounded-xl text-sm text-[#3A3A3C] font-medium pr-8 focus:outline-none focus:border-[#9E1B28] shadow-2xs cursor-pointer"
                    >
                        <option value="All belts">All belts</option>
                        <option value="White">White</option>
                        <option value="Green">Green</option>
                        <option value="Brown">Brown</option>
                        <option value="Black">Black</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#8E8E93] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Classes Filter */}
                <div className="relative">
                    <select
                        value={classFilter}
                        onChange={(e) => onClassChange(e.target.value)}
                        className="w-full appearance-none bg-white border border-[#E5E5EA] px-3.5 py-2 rounded-xl text-sm text-[#3A3A3C] font-medium pr-8 focus:outline-none focus:border-[#9E1B28] shadow-2xs cursor-pointer"
                    >
                        <option value="All classes">All classes</option>
                        <option value="Kids Beginner">Kids Beginner</option>
                        <option value="Beginner Karate">Beginner Karate</option>
                        <option value="Intermediate Karate">Intermediate Karate</option>
                        <option value="Advanced Karate">Advanced Karate</option>
                        <option value="Black Belt Training">Black Belt Training</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#8E8E93] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Instructors Filter */}
                <div className="relative">
                    <select
                        value={instructorFilter}
                        onChange={(e) => onInstructorChange(e.target.value)}
                        className="w-full appearance-none bg-white border border-[#E5E5EA] px-3.5 py-2 rounded-xl text-sm text-[#3A3A3C] font-medium pr-8 focus:outline-none focus:border-[#9E1B28] shadow-2xs cursor-pointer"
                    >
                        <option value="All instructors">All instructors</option>
                        <option value="Sensei Ayesha Fernando">Sensei Ayesha Fernando</option>
                        <option value="Sensei Nadia Perera">Sensei Nadia Perera</option>
                        <option value="Sensei Hiroshi Tanaka">Sensei Hiroshi Tanaka</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#8E8E93] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Statuses Filter */}
                <div className="relative">
                    <select
                        value={statusFilter}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="w-full appearance-none bg-white border border-[#E5E5EA] px-3.5 py-2 rounded-xl text-sm text-[#3A3A3C] font-medium pr-8 focus:outline-none focus:border-[#9E1B28] shadow-2xs cursor-pointer"
                    >
                        <option value="All statuses">All statuses</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#8E8E93] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
            </div>
        </div>
    );
}
