import React from "react";
import { KPI_STATS } from "@/data/mockData";
import { StatCard } from "./StatCard";

export function KpiStatsGrid() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {KPI_STATS.map((stat, idx) => (
                <StatCard key={idx} {...stat} />
            ))}
        </div>
    );
}
