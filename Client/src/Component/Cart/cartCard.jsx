import * as React from 'react';
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useState } from 'react';
import { AppContext } from '../../AppContext';

function CartCard({ data }) {
    const { deleteCart } = useContext(AppContext);
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);

    function clickHandler() {
        navigate("/details", { state: { id: data._id } });
    }

    async function handleDelete() {
        if (window.confirm('Are you sure you want to remove this course from Cart?')) {
            setIsDeleting(true);
            try {
                const result = await deleteCart(data);
                if (result.ok) {
                    toast.success(result.message);
                    navigate('/cart');
                } else {
                    toast.error(result.message);
                    if (result.redirect) {
                        navigate(result.redirect);
                    }
                }
            } catch (error) {
                toast.error("Something went wrong");
                console.error('Error:', error);
            } finally {
                setIsDeleting(false);
            }
        }
    }

    return (
        <div className="group relative mb-6">
            {/* Delete Button */}
            <button
                className={`absolute right-4 top-4 z-10 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full w-10 h-10 flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-500/30 transition-all duration-300 transform hover:scale-110 ${isDeleting ? 'animate-spin' : ''} opacity-0 group-hover:opacity-100`}
                onClick={handleDelete}
                disabled={isDeleting}
            >
                {isDeleting ? (
                    <i className="fa-solid fa-spinner"></i>
                ) : (
                    <i className="fa-solid fa-trash"></i>
                )}
            </button>

            {/* Card Content */}
            <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-blue-500/20 hover:border-cyan-500/40 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer">
                <div className="flex flex-col lg:flex-row gap-6" onClick={clickHandler}>
                    {/* Course Image */}
                    <div className="flex-shrink-0">
                        <img
                            src={data?.thumbnail}
                            alt="Course Thumbnail"
                            className="w-full lg:w-64 h-48 lg:h-40 rounded-xl object-cover shadow-lg"
                        />
                    </div>

                    {/* Course Details */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 leading-tight">
                                {data?.title}
                            </h3>
                            <p className="text-gray-400 text-sm lg:text-base">
                                Created by <span className="text-cyan-400 font-semibold">{data?.teacherName}</span>
                            </p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <span className="text-cyan-400 font-semibold text-lg">
                                {data?.rating}
                            </span>
                            <Rating
                                name="course-rating"
                                value={data?.rating}
                                precision={0.1}
                                readOnly
                                size="small"
                                sx={{ color: '#06b6d4' }}
                            />
                            <span className="text-gray-500 text-sm">(4,500)</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4">
                            <div>
                                <span className="text-gray-400 text-sm">Price:</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl lg:text-3xl font-bold text-cyan-400">
                                        ₹{data?.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex lg:flex-col gap-3 lg:gap-2 justify-between lg:justify-start">
                        <button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm">
                            <i className="fa-solid fa-play mr-2"></i>
                            Preview
                        </button>
                        <button className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm">
                            <i className="fa-solid fa-heart mr-2"></i>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(CartCard);