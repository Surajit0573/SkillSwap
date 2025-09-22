import * as React from 'react';
import Rating from '@mui/material/Rating';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Review({ id, courseId }) {
    const [data, setData] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/api/review/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    withCredentials: true,
                });
                const result = await response.json();
                if (result.ok) {
                    setData(result.data);
                    setIsOwner(result.isOwner);
                } else {
                    toast.error(result.message);
                    if (result.redirect) {
                        navigate(result.redirect);
                    }
                }
            } catch (e) {
                console.error('Error:', e);
                toast.error('Error fetching data');
            }
        }
        fetchData();
    }, [id]);

    async function deleteReview() {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/api/review/${courseId}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                withCredentials: true,
            });
            const result = await response.json();
            if (result.ok) {
                toast.success(result.message);
                setData(null);
            } else {
                toast.error(result.message);
                if (result.redirect) {
                    navigate(result.redirect);
                }
            }
        } catch (e) {
            console.error('Error:', e);
            toast.error('Error deleting review');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {data && (
                <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-blue-500/20 hover:border-cyan-500/30 transition-all duration-300 transform hover:scale-[1.02]">
                    {/* User Info */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <img
                                    src={data && (data.author.profile ? data.author.profile.dp : `https://api.multiavatar.com/${data.username}.png`)}
                                    alt={`${data.author.username}'s avatar`}
                                    className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover border-2 border-cyan-500/30 shadow-lg"
                                />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full border-2 border-black/50"></div>
                            </div>
                            <div>
                                <h3 className="text-lg lg:text-xl font-bold text-white">
                                    {data && (data.author.profile ? data.author.profile.fullname : data.author.username)}
                                </h3>
                                <p className="text-sm text-gray-400">Verified Student</p>
                            </div>
                        </div>
                        
                        {/* Delete Button */}
                        {isOwner && (
                            <button 
                                className={`bg-red-600/80 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                                onClick={deleteReview}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <i className="fa-solid fa-spinner animate-spin"></i>
                                ) : (
                                    <i className="fa-solid fa-trash text-sm"></i>
                                )}
                                <span className="hidden sm:inline">Delete</span>
                            </button>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="mb-4 bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-blue-500/10">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-cyan-400">
                                {data && data.rating}
                            </span>
                            <Rating 
                                name="review-rating" 
                                value={data && data.rating} 
                                precision={0.1} 
                                readOnly 
                                sx={{ 
                                    color: '#06b6d4',
                                    '& .MuiRating-iconEmpty': {
                                        color: 'rgba(255, 255, 255, 0.2)'
                                    }
                                }} 
                            />
                            <span className="text-gray-400 text-sm">out of 5</span>
                        </div>
                    </div>

                    {/* Review Comment */}
                    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/10">
                        <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                            "{data && data.comment}"
                        </p>
                    </div>

                    {/* Review Footer */}
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-2">
                            <i className="fa-solid fa-calendar text-cyan-400"></i>
                            Recently posted
                        </span>
                        <span className="flex items-center gap-2">
                            <i className="fa-solid fa-thumbs-up text-green-400"></i>
                            Helpful review
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}