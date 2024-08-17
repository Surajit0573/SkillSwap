import Navbar from "../Navbar";
import Sidebar from "./sidebar";
import { useState, useEffect } from 'react';
import Card from "../Home/Card";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Footer from "../footer";


export default function Performence() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState();
    const [studentGain, setStudentGain] = useState(0);
    const [income, setIncome] = useState(0);

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    color: "white", // Make Y-axis labels white
                },
            },
            x: {
                ticks: {
                    color: "white", // Make X-axis labels white
                },
            },
        },
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "white", // Make the legend text white
                },
            },
            title: {
                display: true,
                text: "Student Gained by Month",
                color: "white", // Make the title white
            },
        },
        elements: {
            point: {
                radius: 5, // Adjust the size of the points
            },
        },
        responsive: true,
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
                console.log(result.data);
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
                                backgroundColor: [
                                    "rgba(75,192,192,1)",
                                    "#ecf0f1",
                                    "#50AF95",
                                    "#f3ba2f",
                                    "#2a71d0",
                                ],
                                borderColor: "white",
                                borderWidth: 2,
                            },
                        ],
                    });
                    return;
                } else {
                    toast.error(result.message);
                    console.error(result.message);
                    if (result.redirect) {
                        navigate(result.redirect);
                        return;
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                return;
            }
        }

        fetchData();
    }, []);
    return (
        <div className="bg-gray-900">
            <Navbar />
            <div className="h-[90vh] flex justify-between">
                <div>
                    <Sidebar />
                </div>
                <div className="overflow-y-scroll flex-grow p-8">
                    <div className="flex flex-col">
                        <div className="flex justify-around mb-16">
                            <div class="flex flex-col bg-white rounded-3xl">
                                <div class="px-6 py-8 sm:p-10 sm:pb-6">
                                    <div class="grid items-center justify-center w-full grid-cols-1 text-left">
                                        <div>
                                            <h2
                                                class="text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl"
                                            >
                                                Total Income
                                            </h2>
                                            <p class="mt-2 text-sm text-gray-500">Suitable to grow steadily.</p>
                                        </div>
                                        <div class="mt-6">
                                            <p>
                                                <span class="text-5xl font-light tracking-tight text-black">
                                                    <i className="fa-solid fa-indian-rupee-sign"></i> {income}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-col bg-white rounded-3xl">
                                <div class="px-6 py-8 sm:p-10 sm:pb-6">
                                    <div class="grid items-center justify-center w-full grid-cols-1 text-left">
                                        <div>
                                            <h2
                                                class="text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl"
                                            >
                                               Total Students Gained
                                            </h2>
                                        </div>
                                        <div class="mt-6">
                                            <p>
                                                <span class="text-5xl font-light tracking-tight text-black">
                                                     {studentGain}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        {userData && <Line data={userData} options={chartOptions} />}

                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    );
}