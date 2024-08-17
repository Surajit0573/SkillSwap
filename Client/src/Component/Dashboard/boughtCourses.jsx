import Navbar from "../Navbar";
import Sidebar from "./sidebar";
import {useState,useEffect} from 'react';
import Card from "../Home/Card";
import { NavLink,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function MyCourses() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/api/user/myCourses`, {
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
                    return;
                } else {
                    toast.error(result.message);
                    console.error(result.message);
                    if (result.redirect) {
                        navigate(result.redirect);
                        return;
                    }
                    return;
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Error fetching data');
                return;
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
                <div className="flex">
                {data&&data.map((d)=><Card data={d}/>)}  
                </div>      
                <NavLink to={'/'}><button className="bg-blue-600 p-4 rounded-md text-xl">Browse Other Courses</button></NavLink>
                </div>
              
            </div>
        </div>
    );
}