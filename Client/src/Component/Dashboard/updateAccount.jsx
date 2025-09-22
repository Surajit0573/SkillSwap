import Navbar from "../Navbar";
import Sidebar from "./sidebar";
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../footer";

export default function UpdateAccount() {
    const navigate = useNavigate();
    const [pass, setPass] = useState({
        currPass: '',
        newPass: ''
    });
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/api/user/changePass`, {
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
                    console.error(result.message);
                    if (result.redirect) {
                        navigate(result.redirect);
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const muiStyles = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#4b5563',
            },
            '&:hover fieldset': {
                borderColor: '#60a5fa',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#3b82f6',
            },
            '& input': {
                color: 'white',
            },
            backgroundColor: '#1f2937',
            borderRadius: '8px',
        },
        '& .MuiInputLabel-root': {
            color: '#9ca3af',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#60a5fa',
        },
    };

    function handleChange(e) {
        setPass({ ...pass, [e.target.name]: e.target.value });
    }

    async function handleSubmit() {
        if (!pass.currPass || !pass.newPass) {
            toast.error('Please fill in all fields');
            return;
        }

        if (pass.newPass.length < 6) {
            toast.error('New password must be at least 6 characters long');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/api/user/changePass`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                withCredentials: true,
                body: JSON.stringify(pass),
            });
            const result = await response.json();
            if (result.ok) {
                toast.success('Password changed successfully');
                setPass({ currPass: '', newPass: '' });
            } else {
                toast.error(result.message);
                if (result.redirect) {
                    navigate(result.redirect);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error changing password');
        }
    }

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
                        <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-full">
                            <div className="w-full max-w-md">
                                {loading ? (
                                    <div className="animate-pulse space-y-6">
                                        <div className="h-8 bg-gray-700 rounded w-3/4 mx-auto"></div>
                                        <div className="space-y-4">
                                            <div className="h-12 bg-gray-700 rounded"></div>
                                            <div className="h-12 bg-gray-700 rounded"></div>
                                            <div className="h-12 bg-gray-700 rounded"></div>
                                            <div className="h-12 bg-gray-700 rounded"></div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
                                        {/* Header */}
                                        <div className="text-center mb-8">
                                            <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                                </svg>
                                            </div>
                                            <h2 className="text-2xl font-bold text-blue-400 mb-2">Change Password</h2>
                                            <p className="text-gray-400">Update your account security</p>
                                        </div>

                                        {/* Form */}
                                        <div className="space-y-6">
                                            {data && (
                                                <TextField
                                                    label="Username"
                                                    value={data}
                                                    sx={muiStyles}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
                                                />
                                            )}
                                            
                                            <TextField
                                                label="Current Password"
                                                name="currPass"
                                                type="password"
                                                value={pass.currPass}
                                                onChange={handleChange}
                                                variant="outlined"
                                                sx={muiStyles}
                                                fullWidth
                                                required
                                            />
                                            
                                            <TextField
                                                label="New Password"
                                                name="newPass"
                                                type="password"
                                                value={pass.newPass}
                                                onChange={handleChange}
                                                variant="outlined"
                                                sx={muiStyles}
                                                fullWidth
                                                required
                                                helperText="Password must be at least 6 characters long"
                                                FormHelperTextProps={{ style: { color: '#9ca3af' } }}
                                            />
                                            
                                            <button
                                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors py-3 rounded-lg text-lg font-medium shadow-lg hover:shadow-xl"
                                                onClick={handleSubmit}
                                                disabled={!pass.currPass || !pass.newPass}
                                            >
                                                Change Password
                                            </button>
                                        </div>

                                        {/* Security Tips */}
                                        <div className="mt-8 p-4 bg-gray-700 rounded-lg">
                                            <h3 className="text-sm font-semibold text-blue-400 mb-2">Security Tips:</h3>
                                            <ul className="text-xs text-gray-300 space-y-1">
                                                <li>• Use a strong, unique password</li>
                                                <li>• Include uppercase, lowercase, numbers, and symbols</li>
                                                <li>• Don't reuse passwords from other accounts</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}