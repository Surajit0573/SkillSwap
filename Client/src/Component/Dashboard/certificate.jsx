import Navbar from "../Navbar";
import Sidebar from "./sidebar";
import Button from '@mui/material/Button';
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../footer";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function Certificate() {
    const { getUrl, deleteFile } = useContext(AppContext);
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const [reUrl, SetReUrl] = useState('');
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        async function update() {
            const currUrl = await getUrl(file);
            setUrl(currUrl);
            SetReUrl(currUrl.replace('.pdf', '.png'));
        }
        if (file != null) {
            update();
        }
    }, [file]);

    async function handleFileChange(e) {
        const selectedFile = e.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (selectedFile && allowedTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
            await deleteFile(url);
            toast.success("File uploaded successfully");
        } else {
            toast.error('Only image and PDF files are allowed');
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/api/user/profile/certificate`, {
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
                toast.error('Error fetching certificates');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [url]);

    async function handleSubmit() {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/api/user/profile/certificate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                withCredentials: true,
                body: JSON.stringify({ url }),
            });
            const result = await response.json();
            if (result.ok) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
                if (result.redirect) {
                    navigate(result.redirect);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error saving certificate');
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
                        <div className="p-4 sm:p-6 lg:p-8">
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400 mb-2">
                                    My Certificates ({data ? data.length : 0})
                                </h1>
                                <p className="text-gray-400">Showcase your achievements and certifications</p>
                            </div>

                            {/* Certificates Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {loading ? (
                                    [...Array(4)].map((_, i) => (
                                        <div key={i} className="animate-pulse">
                                            <div className="bg-gray-800 rounded-lg h-64 mb-4"></div>
                                            <div className="bg-gray-700 h-4 rounded mb-2"></div>
                                            <div className="bg-gray-700 h-8 rounded"></div>
                                        </div>
                                    ))
                                ) : (
                                    <>
                                        {data && data.map((d, index) => (
                                            <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-all duration-200 group">
                                                <div className="relative overflow-hidden rounded-lg mb-4">
                                                    <img 
                                                        src={d.replace('.pdf', '.png')} 
                                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200" 
                                                        alt={`Certificate ${index + 1}`}
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200"></div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-400">Certificate #{index + 1}</span>
                                                    <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm transition-colors">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Upload new certificate */}
                                        <div className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg p-6 hover:border-blue-500 transition-colors">
                                            <div className="text-center">
                                                {reUrl ? (
                                                    <div className="mb-4">
                                                        <img 
                                                            src={reUrl} 
                                                            className="w-full h-32 object-cover rounded-lg mb-4" 
                                                            alt="Preview"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="mb-4">
                                                        <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        <p className="text-gray-400 mb-2">Add New Certificate</p>
                                                    </div>
                                                )}
                                                
                                                <div className="space-y-3">
                                                    <Button
                                                        component="label"
                                                        variant="contained"
                                                        startIcon={<CloudUploadIcon />}
                                                        onChange={handleFileChange}
                                                        sx={{
                                                            backgroundColor: '#3b82f6',
                                                            '&:hover': { backgroundColor: '#2563eb' },
                                                            borderRadius: '8px',
                                                            textTransform: 'none',
                                                            width: '100%'
                                                        }}
                                                    >
                                                        Upload Certificate
                                                        <VisuallyHiddenInput type="file" accept="image/*,.pdf" />
                                                    </Button>
                                                    
                                                    {url && (
                                                        <button 
                                                            className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm transition-colors"
                                                            onClick={handleSubmit}
                                                        >
                                                            Save Certificate
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Empty state */}
                            {!loading && (!data || data.length === 0) && (
                                <div className="text-center py-16">
                                    <svg className="w-24 h-24 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <h3 className="text-xl text-gray-400 mb-4">No certificates yet</h3>
                                    <p className="text-gray-500">Upload your first certificate to get started!</p>
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