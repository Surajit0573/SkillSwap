import Navbar from "../Navbar";
import Sidebar from "./sidebar";
import { useState, useEffect } from 'react';
import Card from "../Home/Card";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../footer";

export default function MyCourses() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/api/user/teacher/myCourses`, {
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
                } else {
                    toast.error(result.message);
                    if (result.redirect) {
                        navigate(result.redirect);
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Error fetching courses');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            
            {/* Mobile menu button */}
            <div className="lg:hidden fixed top-16 left-4 z-50">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="bg-blue-600 hover:bg-blue-700 p-2 rounded-md shadow-lg"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            <div className="flex min-h-[calc(100vh-64px)] relative">
                {/* Sidebar */}
                <div className={`
                    fixed lg:relative inset-y-0 left-0 z-40
                    transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 transition-transform duration-300 ease-in-out
                    w-80 lg:w-80 xl:w-96
                `}>
                    <Sidebar onClose={() => setSidebarOpen(false)} />
                </div>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main content */}
                <div className="flex-1 overflow-hidden">
                    <div className="h-full overflow-y-auto">
                        <div className="p-4 sm:p-6 lg:p-8">
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400 mb-4">My Courses</h1>
                                <p className="text-gray-400 mb-6">Manage your course offerings</p>
                                
                                <NavLink to={'/addCourse'}>
                                    <button className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-lg text-sm sm:text-base font-medium shadow-lg hover:shadow-xl flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add New Course
                                    </button>
                                </NavLink>
                            </div>

                            {/* Courses Grid */}
                            {loading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="animate-pulse">
                                            <div className="bg-gray-800 rounded-lg h-48 mb-4"></div>
                                            <div className="bg-gray-700 h-4 rounded mb-2"></div>
                                            <div className="bg-gray-700 h-3 rounded w-2/3"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : data && data.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {data.map((d) => (
                                        <div key={d._id} className="transform hover:scale-105 transition-transform duration-200">
                                            <Card data={d} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="mb-8">
                                        <svg className="w-24 h-24 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl text-gray-400 mb-4">No courses created yet</h3>
                                    <p className="text-gray-500 mb-8">Start creating your first course to share your knowledge!</p>
                                    <NavLink to={'/addCourse'}>
                                        <button className="bg-blue-600 hover:bg-blue-700 transition-colors px-8 py-3 rounded-lg font-medium">
                                            Create Your First Course
                                        </button>
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}