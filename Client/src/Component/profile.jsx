import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import StudentProfile from './studentProfile';
import TeacherProfile from './teacherProfile';
import BasicProfile from './basicProfile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Skeleton Loading Component
const ProfileSkeleton = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
            <div className="animate-pulse">
                {/* Navbar Skeleton */}
                <div className="h-16 bg-gray-800/50 backdrop-blur-sm border-b border-blue-700/50"></div>
                
                {/* Main Content Skeleton */}
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Profile Image Skeleton */}
                        <div className="flex-shrink-0">
                            <div className="w-64 h-64 bg-blue-700/30 rounded-2xl mx-auto lg:mx-0"></div>
                            <div className="mt-6 space-y-3">
                                <div className="h-12 bg-blue-700/30 rounded-lg"></div>
                                <div className="h-12 bg-blue-700/30 rounded-lg"></div>
                                <div className="h-12 bg-blue-700/30 rounded-lg"></div>
                            </div>
                        </div>
                        
                        {/* Profile Details Skeleton */}
                        <div className="flex-1 space-y-6">
                            <div className="h-6 bg-blue-700/30 rounded w-24"></div>
                            <div className="h-12 bg-blue-700/30 rounded w-3/4"></div>
                            <div className="h-6 bg-blue-700/30 rounded w-48"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-blue-700/30 rounded"></div>
                                <div className="h-4 bg-blue-700/30 rounded w-5/6"></div>
                                <div className="h-4 bg-blue-700/30 rounded w-4/6"></div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Additional Content Skeleton */}
                    <div className="mt-16">
                        <div className="h-8 bg-blue-700/30 rounded w-64 mb-6"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-48 bg-blue-700/30 rounded-xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Profile() {
    const { username } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = (username && username.length > 0) 
            ? `${import.meta.env.VITE_URL}/api/user/profile/${username}` 
            : `${import.meta.env.VITE_URL}/api/user/profile/dashboard`;
        
        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch(url, {
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
                    } else {
                        navigate('/login');
                    }
                }
            } catch (e) {
                console.error(e);
                toast.error('An error occurred while fetching data');
                navigate('/');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [username, location.pathname]);

    if (loading) {
        return <ProfileSkeleton />;
    }

    return (
        <>
            {!data ? (
                <ProfileSkeleton />
            ) : (
                data.type === "learner" ? (
                    data.isComplete ? <StudentProfile options={data} /> : <BasicProfile options={data} />
                ) : (
                    <TeacherProfile options={data} />
                )
            )}
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