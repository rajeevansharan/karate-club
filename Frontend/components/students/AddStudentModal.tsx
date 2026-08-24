"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { BeltRank } from "@/types/student";

interface AddStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddStudent: (student: {
        name: string;
        phone: string;
        age: number;
        belt: BeltRank;
        class: string;
        instructor: string;
    }) => void;
}

export function AddStudentModal({
    isOpen,
    onClose,
    onAddStudent,
}: AddStudentModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        age: 18,
        belt: "White" as BeltRank,
        class: "Beginner Karate",
        instructor: "Sensei Ayesha Fernando",
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name) return;

        onAddStudent(formData);
        setFormData({
            name: "",
            phone: "",
            age: 18,
            belt: "White",
            class: "Beginner Karate",
            instructor: "Sensei Ayesha Fernando",
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-[#E5E5EA] relative animate-in fade-in zoom-in-95 duration-150">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 text-[#8E8E93] hover:text-[#1C1C1E] rounded-lg"
                >
                    <X className="w-5 h-5" />
                </button>

                <h3 className="text-lg font-bold text-[#1C1C1E] mb-1">
                    Add New Student
                </h3>
                <p className="text-xs text-[#8E8E93] mb-5">
                    Enter student details to enroll them into the Karate club system.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Kasun Fernando"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3.5 py-2 border border-[#E5E5EA] rounded-xl text-sm text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                placeholder="+94 77 123 4567"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                className="w-full px-3.5 py-2 border border-[#E5E5EA] rounded-xl text-sm text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                                Age
                            </label>
                            <input
                                type="number"
                                min="4"
                                max="80"
                                value={formData.age}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        age: parseInt(e.target.value) || 18,
                                    })
                                }
                                className="w-full px-3.5 py-2 border border-[#E5E5EA] rounded-xl text-sm text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                                Belt Rank
                            </label>
                            <select
                                value={formData.belt}
                                onChange={(e) =>
                                    setFormData({ ...formData, belt: e.target.value as BeltRank })
                                }
                                className="w-full px-3.5 py-2 border border-[#E5E5EA] rounded-xl text-sm text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28]"
                            >
                                <option value="White">White Belt</option>
                                <option value="Green">Green Belt</option>
                                <option value="Brown">Brown Belt</option>
                                <option value="Black">Black Belt</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                                Class Category
                            </label>
                            <select
                                value={formData.class}
                                onChange={(e) =>
                                    setFormData({ ...formData, class: e.target.value })
                                }
                                className="w-full px-3.5 py-2 border border-[#E5E5EA] rounded-xl text-sm text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28]"
                            >
                                <option value="Kids Beginner">Kids Beginner</option>
                                <option value="Beginner Karate">Beginner Karate</option>
                                <option value="Intermediate Karate">Intermediate Karate</option>
                                <option value="Advanced Karate">Advanced Karate</option>
                                <option value="Black Belt Training">Black Belt Training</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-[#3A3A3C] mb-1">
                            Assigned Instructor
                        </label>
                        <select
                            value={formData.instructor}
                            onChange={(e) =>
                                setFormData({ ...formData, instructor: e.target.value })
                            }
                            className="w-full px-3.5 py-2 border border-[#E5E5EA] rounded-xl text-sm text-[#1C1C1E] focus:outline-none focus:border-[#9E1B28]"
                        >
                            <option value="Sensei Ayesha Fernando">
                                Sensei Ayesha Fernando
                            </option>
                            <option value="Sensei Nadia Perera">Sensei Nadia Perera</option>
                            <option value="Sensei Hiroshi Tanaka">
                                Sensei Hiroshi Tanaka
                            </option>
                            <option value="Sensei Marcus Silva">Sensei Marcus Silva</option>
                        </select>
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl text-sm text-[#3A3A3C] font-medium border border-[#E5E5EA] hover:bg-[#F2F2F7]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-xl text-sm text-white font-medium bg-[#9E1B28] hover:bg-[#851621]"
                        >
                            Save Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
