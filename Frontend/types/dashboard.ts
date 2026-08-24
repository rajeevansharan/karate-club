import { LucideIcon } from "lucide-react";

export interface KpiStatItem {
    title: string;
    value: string;
    subtext?: string;
    valueColor?: string;
    icon: LucideIcon;
}

export interface GrowthDataPoint {
    month: string;
    val: number;
}

export interface AttendanceDataPoint {
    month: string;
    rate: number;
}
