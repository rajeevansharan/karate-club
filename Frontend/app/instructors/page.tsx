"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { InstructorsHeader } from "@/components/instructors/InstructorsHeader";
import { InstructorsTable } from "@/components/instructors/InstructorsTable";
import { useInstructors } from "@/hooks/useInstructors";
import { Search } from "lucide-react";

export default function InstructorsPage() {
    const {
        instructors,
        totalCount,
        searchQuery,
        setSearchQuery,
        handleSort,
    } = useInstructors();

    return (
        <div className="flex h-screen w-screen bg-[#F5F5F7] font-sans antialiased text-[#1C1C1E] overflow-hidden select-none">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-y-auto bg-[#F5F5F7] p-8">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <InstructorsHeader count={totalCount} />

                    {/* Controls Bar (Search) */}
                    <div className="flex items-center justify-between bg-white px-2 py-2 rounded-xl border border-[#E5E5EA] shadow-[0_2px_8px_rgba(0,0,0,0.02)] mb-2 max-w-sm">
                        <div className="flex items-center flex-1 pr-2">
                            <div className="pl-3 pr-2 text-[#8E8E93]">
                                <Search className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search instructors..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full text-sm py-1.5 focus:outline-none placeholder:text-[#8E8E93] text-[#1C1C1E]"
                            />
                        </div>
                    </div>

                    {/* Data Table */}
                    <InstructorsTable instructors={instructors} onSort={handleSort} />
                </div>
            </main>
        </div>
    );
}
