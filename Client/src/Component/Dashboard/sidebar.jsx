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

function SidebarItem({ to, icon, label, onClick, isDanger, onClose }) {
  const handleClick = () => {
    if (onClick) onClick();
    if (onClose) onClose(); // Close sidebar on mobile after click
  };

  return (
    <div
      className={`
        group px-4 py-3 mx-2 rounded-lg transition-all duration-200
        ${isDanger 
          ? 'text-red-400 hover:bg-red-600 hover:text-white border border-red-600/30' 
          : 'text-gray-300 hover:bg-blue-600 hover:text-white'
        }
        cursor-pointer
      `}
      onClick={handleClick}
    >
      {to ? (
        <NavLink 
          to={to} 
          className={({ isActive }) => `
            flex items-center w-full text-sm sm:text-base
            ${isActive ? 'text-blue-400' : ''}
          `}
        >
          <img src={icon} className="w-6 h-6 sm:w-8 sm:h-8 mr-3 opacity-80 group-hover:opacity-100" alt={label} />
          <span className="font-medium">{label}</span>
        </NavLink>
      ) : (
        <div className="flex items-center w-full text-sm sm:text-base">
          <img src={icon} className="w-6 h-6 sm:w-8 sm:h-8 mr-3 opacity-80 group-hover:opacity-100" alt={label} />
          <span className="font-medium">{label}</span>
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ onClose }) {
  const navigate = useNavigate();
  const { isTeacher } = useContext(AppContext);
  const [isTeach, setIsTeach] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const curr = await isTeacher();
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
    <div className="h-full bg-gray-800 border-r border-gray-700 flex flex-col shadow-xl">
      {/* Close button for mobile */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-blue-400">Dashboard</h2>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-4 space-y-2">
        <SidebarItem to="/dashboard/" icon={profileIcon} label="Update Profile" onClose={onClose} />
        {!isTeach && <SidebarItem to="/dashboard/certificate" icon={certificateIcon} label="Certificates" onClose={onClose} />}
        {!isTeach && <SidebarItem to="/dashboard/boughtCourses" icon={coursesIcon} label="My Courses" onClose={onClose} />}
        {isTeach && <SidebarItem to="/dashboard/myCourses" icon={coursesIcon} label="My Courses" onClose={onClose} />}
        {isTeach && <SidebarItem to="/dashboard/performence" icon={performenceIcon} label="Performance" onClose={onClose} />}
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-gray-700 py-4 space-y-2">
        <SidebarItem to="/dashboard/account" icon={resetpasswordIcon} label="Change Password" onClose={onClose} />
        {isTeach && (
          <SidebarItem
            icon={deleteTeacherIcon}
            label="Delete Instructor Account"
            onClick={deleteTeach}
            onClose={onClose}
            isDanger
          />
        )}
        <SidebarItem
          icon={deleteAccountIcon}
          label="Delete Your Account"
          onClick={deleteAccount}
          onClose={onClose}
          isDanger
        />
      </div>
      
      <ToastContainer />
    </div>
  );
}