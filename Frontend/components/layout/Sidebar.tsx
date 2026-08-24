"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    UserCheck,
    Calendar,
    ClipboardCheck,
    GraduationCap,
    Trophy,
    Award,
    CreditCard,
    Settings,
    LogOut,
    Menu,
    X,
} from "lucide-react";

export const NAV_ITEMS = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Students", href: "/students", icon: Users },
    { name: "Instructors", href: "/instructors", icon: UserCheck },
    { name: "Classes & Schedule", href: "/classes", icon: Calendar },
    { name: "Attendance", href: "/attendance", icon: ClipboardCheck },
    { name: "Belt & Grading", href: "/grading", icon: GraduationCap },
    { name: "Tournaments", href: "/tournaments", icon: Trophy },
    { name: "Achievements", href: "/achievements", icon: Award },
    { name: "Memberships & Payments", href: "/payments", icon: CreditCard },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Close sidebar on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const navContent = (
        <div className="flex flex-col h-full">
            <div>
                {/* Brand Header */}
                <div className="flex items-center justify-between px-2 py-2 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#9E1B28] rounded-xl flex items-center justify-center shadow-sm shrink-0">
                            <span className="text-white text-lg font-bold leading-none">空</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-[15px] text-[#1C1C1E] leading-tight tracking-tight">
                                Shotokan Club
                            </span>
                            <span className="text-xs text-[#8E8E93] leading-tight mt-0.5">
                                Management System
                            </span>
                        </div>
                    </div>
                    {/* Close button for mobile overlay */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="lg:hidden p-1.5 rounded-lg text-[#8E8E93] hover:text-[#1C1C1E] hover:bg-[#F2F2F7] transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive =
                            pathname === item.href ||
                            (item.href !== "/" && pathname?.startsWith(item.href));

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-150 ${isActive
                                    ? "bg-[#9E1B28] text-white shadow-sm"
                                    : "text-[#3A3A3C] hover:bg-[#F2F2F7] hover:text-[#1C1C1E]"
                                    }`}
                            >
                                <Icon
                                    className={`w-[18px] h-[18px] stroke-[2] shrink-0 ${isActive ? "text-white" : "text-[#6C6C70]"
                                        }`}
                                />
                                <span className="truncate">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Sidebar Footer / User Profile */}
            <div className="pt-4 border-t border-[#F2F2F7] px-2 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#FDE8EA] text-[#9E1B28] flex items-center justify-center text-xs font-semibold shrink-0">
                        CA
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-[#1C1C1E] leading-tight">
                            Club Administrator
                        </span>
                        <span className="text-xs text-[#8E8E93] leading-tight mt-0.5">
                            Admin
                        </span>
                    </div>
                </div>
                <button
                    title="Logout"
                    className="p-1.5 rounded-lg text-[#8E8E93] hover:text-[#9E1B28] hover:bg-[#FDE8EA] transition-colors"
                >
                    <LogOut className="w-4 h-4 stroke-[2]" />
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* ── Desktop sidebar (always visible on lg+) ── */}
            <aside className="hidden lg:flex w-64 bg-white border-r border-[#E5E5EA] flex-col justify-between p-4 shrink-0 z-10 select-none">
                {navContent}
            </aside>

            {/* ── Mobile: Hamburger trigger bar ── */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#E5E5EA] flex items-center justify-between px-4 py-3 select-none">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-[#9E1B28] rounded-lg flex items-center justify-center shadow-sm">
                        <span className="text-white text-base font-bold leading-none">空</span>
                    </div>
                    <span className="font-semibold text-[14px] text-[#1C1C1E] tracking-tight">Shotokan Club</span>
                </div>
                <button
                    onClick={() => setMobileOpen(true)}
                    className="p-2 rounded-xl text-[#3A3A3C] hover:bg-[#F2F2F7] transition-colors"
                    aria-label="Open navigation menu"
                >
                    <Menu className="w-5 h-5" />
                </button>
            </div>

            {/* ── Mobile: Semi-transparent backdrop overlay ── */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* ── Mobile: Slide-out sidebar drawer ── */}
            <aside
                className={`lg:hidden fixed top-0 left-0 h-full w-72 max-w-[85vw] bg-white z-50 flex flex-col p-4 shadow-2xl transition-transform duration-300 ease-in-out select-none ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {navContent}
            </aside>
        </>
    );
}
