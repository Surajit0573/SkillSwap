import NavBar from './Navbar';
import Card from './Home/Card';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './footer';

// Wishlist Skeleton Component
const WishlistSkeleton = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
            <div className="animate-pulse">
                {/* Header Skeleton */}
                <div className="container mx-auto px-4 py-8">
                    <div className="h-10 bg-blue-700/30 rounded w-64 mb-8"></div>
                    
                    {/* Cards Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-blue-700/20 rounded-xl p-4 h-80"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Wishlist() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchdata() {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/api/courses/like`, {
                    credentials: 'include',
                    withCredentials: true,
                });
                const result = await response.json();
                console.log(result);
                if (result.ok) {
                    setData(result.data);
                } else {
                    toast.error(result.message);
                    if (result.redirect) {
                        navigate(result.redirect);
                    }
                }
            } catch (err) {
                console.log(err);
                toast.error('Something went wrong');
            } finally {
                setLoading(false);
            }
        }
        fetchdata();
    }, [navigate]);

    if (loading) {
        return <WishlistSkeleton />;
    }

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
                <div className="container mx-auto px-4 py-8">
                    {/* Header Section */}
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-4">
                            <i className="fa-solid fa-heart text-4xl text-cyan-400"></i>
                            <h1 className="text-3xl lg:text-5xl font-bold text-white">
                                Your Wishlist
                            </h1>
                            {data && data.length > 0 && (
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-black px-4 py-2 rounded-full text-lg font-bold">
                                    {data.length}
                                </span>
                            )}
                        </div>
                        <p className="text-gray-400 text-lg">
                            Courses you've saved for later
                        </p>
                    </div>

                    {/* Content Section */}
                    <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-6 lg:p-12 shadow-2xl border border-blue-500/20">
                        {data && data.length > 0 ? (
                            <>
                                {/* Course Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {data.map((course, index) => (
                                        <div key={index} className="transform transition-all duration-300 hover:scale-105">
                                            <Card data={course} />
                                        </div>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                                    <button 
                                        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                                        onClick={() => navigate('/')}
                                    >
                                        <i className="fa-solid fa-plus mr-2"></i>
                                        Add More Courses
                                    </button>
                                    <button 
                                        className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                                        onClick={() => navigate('/cart')}
                                    >
                                        <i className="fa-solid fa-shopping-cart mr-2"></i>
                                        View Cart
                                    </button>
                                </div>
                            </>
                        ) : (
                            /* Empty State */
                            <div className="text-center py-20">
                                <div className="mb-8">
                                    <i className="fa-solid fa-heart text-8xl text-gray-600 mb-6"></i>
                                    <h2 className="text-3xl font-bold text-white mb-4">
                                        Your wishlist is empty
                                    </h2>
                                    <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
                                        Start exploring courses and add your favorites to build your learning journey
                                    </p>
                                    <button 
                                        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                                        onClick={() => navigate('/')}
                                    >
                                        <i className="fa-solid fa-search mr-2"></i>
                                        Browse Courses
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
}