import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="w-80 h-full bg-[#31363F] flex flex-col justify-between">
            <div className="flex flex-col">
            <NavLink to={'/dashboard/'}><div className="border-solid border-2 p-4 text-2xl hover:bg-blue-500">Update Basic Details</div></NavLink>
                <NavLink to={'/dashboard/certificate'}><div className="border-solid border-2 p-4 text-2xl hover:bg-blue-500">Certificates</div></NavLink>
                <NavLink to={'/dashboard/myCourses'}> <div className="border-solid border-2 p-4 text-2xl hover:bg-blue-500">My Courses</div></NavLink>
            </div>
            <div>
            <NavLink to={'/dashboard/account'}><div className="border-solid border-2 p-4 text-2xl hover:bg-blue-500">Change Password</div></NavLink>
            <div className="border-solid border-2 border-red-600 text-red-600 p-4 text-2xl hover:bg-red-500 hover:text-black">Delete Instructor Account</div>
            <div className="border-solid border-2 border-red-600 text-red-600 p-4 text-2xl hover:bg-red-500 hover:text-black">Delete Your Account</div>
            </div>
        </div>
    );
}