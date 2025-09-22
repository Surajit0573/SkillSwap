import Navbar from "./Navbar";
import Sidebar from "./Dashboard/sidebar";
import UpdateProfile from './Dashboard/updateProfile.jsx';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./footer.jsx";

export default function DashBoard() {
    const navigate = useNavigate();
    const { isLoggedin } = useContext(AppContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const curr = await isLoggedin();
            if (!curr) {
                toast.error(`You must be logged in`);
                navigate('/login');
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
                            <UpdateProfile />
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}