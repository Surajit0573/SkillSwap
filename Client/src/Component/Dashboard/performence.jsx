import Navbar from "../Navbar";
import Sidebar from "./sidebar";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Footer from "../footer";

export default function Performance() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState();
    const [studentGain, setStudentGain] = useState(0);
    const [income, setIncome] = useState(0);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    color: "#9ca3af",
                    font: {
                        size: 12,
                    }
                },
                grid: {
                    color: "#374151",
                }
            },
            x: {
                ticks: {
                    color: "#9ca3af",
                    font: {
                        size: 12,
                    }
                },
                grid: {
                    color: "#374151",
                }
            },
        },
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "#e5e7eb",
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: 20,
                },
            },
            title: {
                display: true,
                text: "Student Growth Over Time",
                color: "#60a5fa",
                font: {
                    size: 18,
                    weight: 'bold'
                },
                padding: 20,
            },
        },
        elements: {
            point: {
                radius: 6,
                hoverRadius: 8,
                backgroundColor: "#3b82f6",
                borderColor: "#ffffff",
                borderWidth: 2,
            },
            line: {
                tension: 0.4,
            }
        },
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/api/user/teacher/performence`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    withCredentials: true,
                });
                const result = await response.json();
                if (result.ok) {
                    setStudentGain(result.totalStudent);
                    setIncome(result.totalIncome);
                    setData(result.data);
                    setUserData({
                        labels: result.data.map((data) => data.month),
                        datasets: [
                            {
                                label: "Students Gained",
                                data: result.data.map((data) => data.studentGain),
                                backgroundColor: "rgba(59, 130, 246, 0.1)",
                                borderColor: "#3b82f6",
                                borderWidth: 3,
                                fill: true,
                                pointBackgroundColor: "#3b82f6",
                                pointBorderColor: "#ffffff",
                                pointBorderWidth: 2,
                                pointRadius: 6,
                                pointHoverRadius: 8,
                            },
                        ],
                    });
                } else {
                    toast.error(result.message);
                    if (result.redirect) {
                        navigate(result.redirect);
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Error fetching performance data');
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
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400 mb-2">Performance Dashboard</h1>
                                <p className="text-gray-400">Track your teaching progress and earnings</p>
                            </div>

                            {loading ? (
                                <div className="space-y-8">
                                    {/* Stats skeleton */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="animate-pulse bg-gray-800 rounded-2xl h-32"></div>
                                        <div className="animate-pulse bg-gray-800 rounded-2xl h-32"></div>
                                    </div>
                                    {/* Chart skeleton */}
                                    <div className="animate-pulse bg-gray-800 rounded-2xl h-96"></div>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {/* Stats Cards */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Income Card */}
                                        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-green-100 text-sm font-medium">Total Income</p>
                                                    <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
                                                        ₹{income.toLocaleString()}
                                                    </p>
                                                    <p className="text-green-100 text-sm mt-1">Lifetime earnings</p>
                                                </div>
                                                <div className="bg-white bg-opacity-20 rounded-full p-4">
                                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Students Card */}
                                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-blue-100 text-sm font-medium">Total Students</p>
                                                    <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
                                                        {studentGain.toLocaleString()}
                                                    </p>
                                                    <p className="text-blue-100 text-sm mt-1">Students taught</p>
                                                </div>
                                                <div className="bg-white bg-opacity-20 rounded-full p-4">
                                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Chart Section */}
                                    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
                                        <div className="h-80 sm:h-96">
                                            {userData ? (
                                                <Line data={userData} options={chartOptions} />
                                            ) : (
                                                <div className="flex items-center justify-center h-full">
                                                    <p className="text-gray-400">No data available for chart</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Monthly Breakdown Table */}
                                    {data && data.length > 0 && (
                                        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
                                            <h3 className="text-xl font-semibold text-blue-400 mb-6">Monthly Breakdown</h3>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left">
                                                    <thead>
                                                        <tr className="border-b border-gray-700">
                                                            <th className="pb-3 text-gray-300 font-medium">Month</th>
                                                            <th className="pb-3 text-gray-300 font-medium">Students Gained</th>
                                                            <th className="pb-3 text-gray-300 font-medium">Growth</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data.map((item, index) => (
                                                            <tr key={index} className="border-b border-gray-700 last:border-0">
                                                                <td className="py-4 text-white font-medium">{item.month}</td>
                                                                <td className="py-4 text-blue-400 font-semibold">{item.studentGain}</td>
                                                                <td className="py-4">
                                                                    {index > 0 && (
                                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                            item.studentGain > data[index - 1].studentGain
                                                                                ? 'bg-green-100 text-green-800'
                                                                                : item.studentGain < data[index - 1].studentGain
                                                                                ? 'bg-red-100 text-red-800'
                                                                                : 'bg-gray-100 text-gray-800'
                                                                        }`}>
                                                                            {item.studentGain > data[index - 1].studentGain ? '↗' : item.studentGain < data[index - 1].studentGain ? '↘' : '→'}
                                                                            {item.studentGain > data[index - 1].studentGain ? ' Growth' : item.studentGain < data[index - 1].studentGain ? ' Decline' : ' Stable'}
                                                                        </span>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
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