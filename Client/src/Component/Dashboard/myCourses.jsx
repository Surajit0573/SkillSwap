import Navbar from "../Navbar";
import Sidebar from "./sidebar";
import { useState, useEffect } from 'react';
import Card from "../Home/Card";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MyCourses() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);

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
            }
        }

        fetchData();
    }, []);

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Navbar />
            <div className="h-[90vh] flex">
                <Sidebar />
                <div className="overflow-y-scroll flex-grow p-8">
                    <NavLink to={'/addCourse'}>
                        <button className="bg-blue-600 hover:bg-blue-700 transition-colors p-4 rounded-md text-xl mb-6">
                            Add New Course
                        </button>
                    </NavLink>
                    <div className="flex flex-wrap gap-6">
                        {data && data.map((d) => (
                            <Card key={d._id} data={d} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
