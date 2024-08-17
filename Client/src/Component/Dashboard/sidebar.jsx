import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, useCallback } from "react";
import { AppContext } from "../../AppContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import performenceIcon from "../../assets/performence.png";
import certificateIcon from "../../assets/certificate.png";
import coursesIcon from "../../assets/courses.png";
import deleteAccountIcon from "../../assets/deleteAccount.png";
import deleteTeacherIcon from "../../assets/deleteTeacher.png";
import profileIcon from "../../assets/profile.png";
import resetpasswordIcon from "../../assets/reset-password.png";

function SidebarItem({ to, icon, label, onClick, isDanger }) {
  return (
    <div
      className={`p-4 text-2xl flex items-center ${isDanger ? 'text-red-600 border-red-600 hover:bg-red-500 hover:text-black' : 'hover:bg-blue-500'}`}
      onClick={onClick}
    >
      <NavLink to={to} className="flex items-center w-full">
        <img src={icon} className="w-10 mr-4" alt={label} />
        {label}
      </NavLink>
    </div>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  const { isTeacher } = useContext(AppContext);
  const [isTeach, setIsTeach] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const curr = await isTeacher();
      console.log(curr);
      setIsTeach(curr);
    }
    fetchData();
  }, [isTeacher]);

  const deleteTeach = useCallback(async () => {
    if (window.confirm('Are you sure you want to delete your teacher account?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL}/api/user/teacher/`, {
          method: 'DELETE',
          credentials: "include",
        });
        const result = await response.json();
        console.log(result);
        if (result.ok) {
          setIsTeach(false);
          toast.success("You are removed as a teacher");
          navigate('/');
        } else {
          toast.error(result.message);
          if (result.redirect) {
            navigate(result.redirect);
          }
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.error('Error:', error);
      }
    }
  }, [navigate]);

  const deleteAccount = useCallback(async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL}/api/user/`, {
          method: 'DELETE',
          credentials: "include",
        });
        const result = await response.json();
        console.log(result);
        if (result.ok) {
          setIsTeach(false);
          toast.success("Your account has been deleted");
          navigate('/');
        } else {
          toast.error(result.message);
          if (result.redirect) {
            navigate(result.redirect);
          }
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.error('Error:', error);
      }
    }
  }, [navigate]);

  return (
    <div className="w-80 h-full bg-gray-800 flex flex-col justify-between text-left py-4">
      <div className="flex flex-col">
        <SidebarItem to="/dashboard/" icon={profileIcon} label="Update Profile" />
        {!isTeach && <SidebarItem to="/dashboard/certificate" icon={certificateIcon} label="Certificates" />}
        {!isTeach && <SidebarItem to="/dashboard/boughtCourses" icon={coursesIcon} label="My Courses" />}
        {isTeach && <SidebarItem to="/dashboard/myCourses" icon={coursesIcon} label="My Courses" />}
        {isTeach && <SidebarItem to="/dashboard/performence" icon={performenceIcon} label="Performance" />}
      </div>
      <div>
        <SidebarItem to="/dashboard/account" icon={resetpasswordIcon} label="Change Password" />
        {isTeach && (
          <SidebarItem
            icon={deleteTeacherIcon}
            label="Delete Instructor Account"
            onClick={deleteTeach}
            isDanger
          />
        )}
        <SidebarItem
          icon={deleteAccountIcon}
          label="Delete Your Account"
          onClick={deleteAccount}
          isDanger
        />
      </div>
      <ToastContainer />
    </div>
  );
}
