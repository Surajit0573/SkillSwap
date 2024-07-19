import Navbar from "../Navbar";
import Sidebar from "./sidebar";
import {useState,useEffect} from 'react';
import Card from "../Home/Card";
import { NavLink } from "react-router-dom";
export default function MyCourses() {
    const [data, setData] = useState(null);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3000/api/user/teacher/myCourses', {
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
                    setData(result.data);
                } else {
                    alert(result.message);
                    console.error(result.message);
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
        <div>
            <Navbar />
            <div className="h-[90vh] flex justify-between">
            <div>
                <Sidebar />
                </div>
                <div className="overflow-y-scroll flex-grow p-8">

                <NavLink to={'/addCourse'}><button className="bg-blue-600 p-4 rounded-md text-xl">Add New Course</button></NavLink>
                <div className="flex">
                {data&&data.map((d)=><Card data={d}/>)}  
                </div>      
                </div>
              
            </div>
        </div>
    );
}