import * as React from 'react';
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Users, Clock, Star, IndianRupee, Heart } from 'lucide-react';

export default function Card({ data }) {
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

    function clickHandler() {
        navigate("/details", { state: { id: data._id } });
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/api/courses/isLike`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    withCredentials: true,
                    body: JSON.stringify({ course_id: data._id }),
                });
                const result = await response.json();
                if (result.ok) {
                    setIsLiked(true);
                } else {
                    setIsLiked(false);
                }
            } catch (error) {
                setIsLiked(false);
                console.error('Error:', error);
            }
        }
        if (data) {
            fetchData();
        }
    }, [data]);

    return (
        <div className="group bg-gradient-to-br from-slate-800 to-slate-900 text-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105 border border-slate-700/50" 
             onClick={clickHandler}>
            {/* Image Container */}
            <div className="relative overflow-hidden">
                <img 
                    src={data?.thumbnail} 
                    alt={data?.title || "Course thumbnail"} 
                    className="w-full h-40 sm:h-36 md:h-32 lg:h-36 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                    {isLiked ? (
                        <Heart className="w-5 h-5 text-red-500 fill-current" />
                    ) : (
                        <Heart className="w-5 h-5 text-white/70 hover:text-red-500 transition-colors" />
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {/* Stats Row */}
                <div className="flex justify-between items-center text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{data?.enrolledUsers.length || 0} Students</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>3h 50m</span>
                    </div>
                </div>

                {/* Title */}
                <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-blue-300 transition-colors leading-tight">
                    {data?.title}
                </h4>

                {/* Rating and Price Row */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{data?.rating || 0}</span>
                        <span className="text-xs text-gray-400">({data?.reviews?.length || 0})</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <IndianRupee className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-semibold text-green-400">
                            {data?.price || 'Free'}
                        </span>
                    </div>
                </div>

                {/* Teacher Name */}
                <div className="pt-2 border-t border-slate-700/50">
                    <p className="text-xs text-gray-400 truncate">
                        By {data?.teacherName || 'Unknown Instructor'}
                    </p>
                </div>
            </div>
        </div>
    );
}