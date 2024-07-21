import Navbar from "./Navbar";
import Sidebar from "./Dashboard/sidebar";
import UpdateProfile from './Dashboard/updateProfile.jsx';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
export default function DashBoard() {
    const navigate = useNavigate();
    const { isLoggedin } = useContext(AppContext);
    useEffect(() => {
        async function fetchData() {
            const curr = await isLoggedin();
            if (!curr) {
                alert("You are not logged in");
                navigate('/login');
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
                <div className="overflow-y-scroll flex-grow flex-wrap ">
                    <UpdateProfile />
                </div>

            </div>
        </div>
    );
}