import Card from './Card';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from '@tanstack/react-query';
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

    const load = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    if (isLoading) {
        return (
            <div className="flex flex-col text-left h-[70vh] w-[80vw] overflow-y-scroll bg-gray-900 text-gray-100 p-4 rounded-md shadow-md">
                <p className="font-semibold text-3xl mb-4">{headerText}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {load && load.map((d) => (
                        <div key={d} className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return <h2>Error: {error.message}</h2>
    }

    return (
        <div className="flex flex-col text-left h-[70vh] w-[80vw] overflow-y-scroll bg-gray-900 text-gray-100 p-4 rounded-md shadow-md">
            <p className="font-semibold text-3xl mb-4">{headerText}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data && data.map((d, index) => (
                    <Card key={index} data={d} />
                ))}
            </div>
        </div>
    );
}
