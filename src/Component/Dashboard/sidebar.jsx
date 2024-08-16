import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
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
export default function Sidebar() {
  const navigate = useNavigate();
  const { isTeacher } = useContext(AppContext);
  const [isTeach, setIsTeach] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const curr = await isTeacher();
      console.log(curr);
      setIsTeach(curr);
      return;
    }
    fetchData();
  }, []);

  async function deleteTeach() {
    if (window.confirm('Are you sure you want to delete your teacher account ?')) {
      const response = await fetch('http://localhost:3000/api/user/teacher/', {
        method: 'DELETE',
        credentials: "include",
        withCredentials: true,
      });
      const result = await response.json();
      console.log(result);
      if (result.ok) {
        setIsTeach(false);
        toast.success("You are removed as a teacher");
        navigate('/');
        return;
      } else {
        toast.error(result.message);
        if(result.redirect){
          navigate(result.redirect);
        }
        return;
      }
    }
  }

  async function deleteAccount() {
    if (window.confirm('Are you sure you want to delete your account ?')) {
      const response = await fetch('http://localhost:3000/api/user/', {
        method: 'DELETE',
        credentials: "include",
        withCredentials: true,
      });
      const result = await response.json();
      console.log(result);
      if (result.ok) {
        setIsTeach(false);
        toast.success("Your account has been deleted");
        navigate('/');
        return;
      } else {
        toast.error(result.message);
        if(result.redirect){
          navigate(result.redirect);
        }
        return;
      }
    }
  }

  return (
    <div className="w-80 h-full bg-[#31363F] flex flex-col justify-between text-left py-4">
      <div className="flex flex-col">
        <NavLink to={'/dashboard/'}><div className="p-4 text-2xl hover:bg-blue-500"><div className="flex items-center"><img src={profileIcon} className=" w-10 mr-4"></img>Update Profile</div></div></NavLink>
        {!isTeach && <NavLink to={'/dashboard/certificate'}><div className="p-4 text-2xl hover:bg-blue-500"><div className="flex items-center"><img src={certificateIcon} className=" w-10 mr-4"></img>Certificates</div></div></NavLink>}
        {!isTeach && <NavLink to={'/dashboard/boughtCourses'}><div className=" p-4 text-2xl hover:bg-blue-500"><div className="flex items-center"><img src={coursesIcon} className=" w-10 mr-4"></img>My Courses</div></div></NavLink>}
        {isTeach && <NavLink to={'/dashboard/myCourses'}> <div className="p-4 text-2xl hover:bg-blue-500"><div className="flex items-center"><img src={coursesIcon} className=" w-10 mr-4"></img>My Courses</div></div></NavLink>}
        {isTeach && <NavLink to={'/dashboard/performence'}> <div className="p-4 text-2xl hover:bg-blue-500"><div className="flex items-center"><img src={performenceIcon} className=" w-10 mr-4"></img>Performance</div></div></NavLink>}
      </div>
      <div>
        <NavLink to={'/dashboard/account'}><div className="p-4 text-2xl hover:bg-blue-500"><div className="flex items-center"><img src={resetpasswordIcon} className=" w-10 mr-4"></img>Change Password</div></div></NavLink>
        {isTeach && <div className=" border-red-600 text-red-600 p-4 text-2xl hover:bg-red-500 hover:text-black" onClick={deleteTeach}><div className="flex items-center"><img src={deleteTeacherIcon} className=" w-10 mr-4"></img>Delete Instructor Account</div></div>}
        <div className=" border-red-600 text-red-600 p-4 text-2xl hover:bg-red-500 hover:text-black" onClick={deleteAccount}><div className="flex items-center"><img src={deleteAccountIcon} className=" w-10 mr-4"></img>Delete Your Account</div></div>
      </div>
    </div>
  );
}