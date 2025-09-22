import * as React from 'react';
import Rating from '@mui/material/Rating';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../AppContext';
import About from './About';

export default function CourseDetails({ data }) {
    const [isCart, setIsCart] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState({ cart: false, like: false });
    const navigate = useNavigate();
    const { getCart, deleteCart } = useContext(AppContext);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getCart();
                if (result.ok) {
                    const carts = result.data;
                    if (carts.some((cart) => cart._id === data._id)) {
                        setIsCart(true);
                    }
                } else {
                    toast.error(result.message);
                    if (result.redirect) {
                        navigate(result.redirect);
                    }
                }
            } catch (error) {
                toast.error("Something went wrong");
                console.error('Error:', error);
            }
        }
        if (data) fetchData();
    }, [data]);

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
                setIsLiked(result.ok);
            } catch (error) {
                setIsLiked(false);
                console.error('Error:', error);
            }
        }
        if (data) {
            fetchData();
        }
    }, [data]);

    async function addToCart() {
        setIsLoading(prev => ({ ...prev, cart: true }));
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/api/user/cart`, {
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
                toast.success('Course added to cart successfully');
                setIsCart(true);
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
            setIsLoading(prev => ({ ...prev, cart: false }));
        }
    }

    async function deleteToCart() {
        setIsLoading(prev => ({ ...prev, cart: true }));
        try {
            const result = await deleteCart(data);
            if (result.ok) {
                toast.success(result.message);
                setIsCart(false);
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
            setIsLoading(prev => ({ ...prev, cart: false }));
        }
    }

    async function handleLike() {
        setIsLoading(prev => ({ ...prev, like: true }));
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/api/courses/like`, {
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
                toast.success(isLiked ? 'Course removed from wishlist' : 'Course added to wishlist');
                setIsLiked(!isLiked);
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
            setIsLoading(prev => ({ ...prev, like: false }));
        }
    }

    return (
        <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-6 lg:p-8 shadow-2xl border border-blue-500/20">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Course Information */}
                <div className="xl:col-span-2 space-y-6">
                    <div>
                        <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                            {data?.title}
                        </h1>

                        {/* Rating and Stats */}
                        <div className="flex flex-wrap items-center gap-6 mb-6">
                            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-500/20">
                                <span className="text-2xl font-bold text-cyan-400">
                                    {data?.rating}
                                </span>
                               <Rating
                                    name="course-rating"
                                    value={data?.rating || 0}
                                    precision={0.1}
                                    readOnly
                                    sx={{ 
                                        '& .MuiRating-iconFilled': {
                                            color: '#06b6d4',
                                        },
                                        '& .MuiRating-iconHover': {
                                            color: '#06b6d4',
                                        },
                                        '& .MuiRating-iconEmpty': {
                                            color: 'rgba(255, 255, 255, 0.2)',
                                        },
                                        '& .MuiRating-icon': {
                                            fontSize: '1.2rem',
                                        }
                                    }}
                                />
                                <span className="text-gray-400">
                                    ({data?.reviews?.length} reviews)
                                </span>
                            </div>

                            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-500/20">
                                <i className="fa-solid fa-users text-cyan-400"></i>
                                <span className="text-white font-semibold">
                                    {data?.enrolledUsers?.length} students
                                </span>
                            </div>
                        </div>

                        {/* Creator Info */}
                        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-blue-500/10 mb-6">
                            <p className="text-gray-400 mb-2">Created by</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                                    <i className="fa-solid fa-user text-black"></i>
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-lg">
                                        {data?.teacherName}
                                    </p>
                                    <p className="text-cyan-400 text-sm">
                                        {data?.teacher?.teacher?.qualifications}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {data?.tags?.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        <br></br>
                        <About data={data} />
                    </div>
                </div>

                {/* Purchase Card */}
                <div className="xl:col-span-1">
                    <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-blue-500/30 sticky top-8">
                        {/* Course Thumbnail */}
                        <div className="relative mb-6">
                            <img
                                className="w-full h-48 lg:h-64 rounded-xl object-cover shadow-lg"
                                src={data?.thumbnail}
                                alt="Course Thumbnail"
                            />
                            <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <button className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full w-16 h-16 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
                                    <i className="fa-solid fa-play text-xl"></i>
                                </button>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-3xl lg:text-4xl font-bold text-cyan-400">
                                    ₹{data?.price}
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm">One-time purchase • Lifetime access</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            {isCart ? (
                                <button
                                    className={`w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${isLoading.cart ? 'opacity-75 cursor-not-allowed' : ''}`}
                                    onClick={deleteToCart}
                                    disabled={isLoading.cart}
                                >
                                    {isLoading.cart ? (
                                        <>
                                            <i className="fa-solid fa-spinner animate-spin mr-2"></i>
                                            Removing...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-trash mr-2"></i>
                                            Remove from Cart
                                        </>
                                    )}
                                </button>
                            ) : (
                                <button
                                    className={`w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${isLoading.cart ? 'opacity-75 cursor-not-allowed' : ''}`}
                                    onClick={addToCart}
                                    disabled={isLoading.cart}
                                >
                                    {isLoading.cart ? (
                                        <>
                                            <i className="fa-solid fa-spinner animate-spin mr-2"></i>
                                            Adding...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-cart-plus mr-2"></i>
                                            Add to Cart
                                        </>
                                    )}
                                </button>
                            )}

                            <button
                                className={`w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 ${isLoading.like ? 'opacity-75 cursor-not-allowed' : ''}`}
                                onClick={handleLike}
                                disabled={isLoading.like}
                            >
                                {isLoading.like ? (
                                    <i className="fa-solid fa-spinner animate-spin"></i>
                                ) : (
                                    <i className={`fa-${isLiked ? 'solid' : 'regular'} fa-heart text-red-400 text-xl`}></i>
                                )}
                                <span>{isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
                            </button>
                        </div>

                        {/* Go to Cart Link */}
                        {isCart && (
                            <div className="mt-4 text-center">
                                <NavLink
                                    to="/cart"
                                    className="text-cyan-400 hover:text-cyan-300 font-medium underline transition-colors duration-300"
                                >
                                    Go to Cart →
                                </NavLink>
                            </div>
                        )}

                        {/* Features */}
                        <div className="mt-6 pt-6 border-t border-blue-500/20">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <i className="fa-solid fa-infinity text-cyan-400"></i>
                                    <span>Lifetime access</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <i className="fa-solid fa-mobile-alt text-cyan-400"></i>
                                    <span>Mobile and desktop access</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <i className="fa-solid fa-certificate text-cyan-400"></i>
                                    <span>Certificate of completion</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
