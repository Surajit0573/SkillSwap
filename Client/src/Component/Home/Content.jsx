import Card from './Card';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from '@tanstack/react-query';
import { BookOpen, GraduationCap, Grid3X3 } from 'lucide-react';
import axios from 'axios';

const override = {
    display: "block",
    margin: "20% auto",
    borderColor: "red",
};

const fetchCourses = async ({ queryKey }) => {
    // console.log(queryKey);
    if (queryKey[0] == 'courses') {
        let url = `${import.meta.env.VITE_URL}/api/courses`;
        if (queryKey[1] && queryKey[1].length > 0) {
            url = `${import.meta.env.VITE_URL}/api/courses/category/${queryKey[1]}`;
            // setHeader(`Courses in ${catId}`);
        } else {
            // setHeader("All Online Classes");
        }
        const { data } = await axios.get(url);
        return data.data;
    }
    return null;
}

export default function Content() {
    const location = useLocation();

    let catId = location.state?.catId;
    const headerText = catId
        ? `Courses in ${catId || 'Selected Category'}`
        : "All Online Courses";

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['courses', catId],
        queryFn: fetchCourses,
    });

    const load = Array.from({ length: 12 }, (_, i) => i + 1);

    if (isLoading) {
        return (
            <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3 sm:p-4 lg:p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-6 sm:mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            {catId ? <BookOpen className="w-6 h-6 text-blue-400" /> : <GraduationCap className="w-6 h-6 text-blue-400" />}
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-100">
                                {headerText}
                            </h1>
                        </div>
                        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>

                    {/* Loading Skeletons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
                        {load.map((d) => (
                            <div key={d} className="bg-slate-800 rounded-xl p-4 space-y-4 animate-pulse">
                                <Skeleton className="h-32 w-full rounded-lg bg-slate-700" />
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <Skeleton className="h-3 w-16 bg-slate-700" />
                                        <Skeleton className="h-3 w-12 bg-slate-700" />
                                    </div>
                                    <Skeleton className="h-4 w-full bg-slate-700" />
                                    <Skeleton className="h-4 w-3/4 bg-slate-700" />
                                    <div className="flex justify-between">
                                        <Skeleton className="h-3 w-20 bg-slate-700" />
                                        <Skeleton className="h-3 w-16 bg-slate-700" />
                                    </div>
                                    <Skeleton className="h-3 w-24 bg-slate-700" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.084 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-100 mb-2">Oops! Something went wrong</h2>
                    <p className="text-gray-400">{error?.message || 'Failed to load courses'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3 sm:p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        {catId ? <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" /> : <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />}
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                            {headerText}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Grid3X3 className="w-4 h-4" />
                            <span>{data?.length || 0} courses available</span>
                        </div>
                    </div>
                </div>

                {/* Courses Grid */}
                {data && data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
                        {data.map((course, index) => (
                            <Card key={course._id || index} data={course} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                            <BookOpen className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-300 mb-2">No courses found</h3>
                        <p className="text-gray-400 max-w-md">
                            {catId 
                                ? `No courses available in "${catId}" category at the moment.`
                                : "No courses are available right now. Please check back later."
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}