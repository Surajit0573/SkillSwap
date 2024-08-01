import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../AppContext";
export default function Sidebar() {
  const { isTeacher } = useContext(AppContext);
  const [isTeach, setIsTeach] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const curr = await isTeacher();
      console.log(curr);
      setIsTeach(curr);
    }
    fetchData();
  }, []);

  async function deleteTeach() {
    const response = await fetch('http://localhost:3000/api/user/teacher/', {
      method: 'DELETE',
      credentials: "include",
      withCredentials: true,
    });
    const result = await response.json();
    console.log(result);
    if (result.ok) {
      setIsTeach(false);
      alert('You have been removed as a teacher');
      window.location.href = "/";
    } else {
      alert(result.message);
    }
  }

  async function deleteAccount() {
    const response = await fetch('http://localhost:3000/api/user/', {
      method: 'DELETE',
      credentials: "include",
      withCredentials: true,
    });
    const result = await response.json();
    console.log(result);
    if (result.ok) {
      setIsTeach(false);
      alert('Your account have been removed');
      window.location.href = "/";
    } else {
      alert(result.message);
    }
  }

  return (
    <div className="w-80 h-full bg-[#31363F] flex flex-col justify-between">
      <div className="flex flex-col">
        <NavLink to={'/dashboard/'}><div className="border-solid border-2 p-4 text-2xl hover:bg-blue-500">Update Basic Details</div></NavLink>
        {!isTeach && <NavLink to={'/dashboard/certificate'}><div className="border-solid border-2 p-4 text-2xl hover:bg-blue-500">Certificates</div></NavLink>}
        {!isTeach && <NavLink to={'/dashboard/boughtCourses'}><div className="border-solid border-2 p-4 text-2xl hover:bg-blue-500">My Courses</div></NavLink>}
        {isTeach && <NavLink to={'/dashboard/myCourses'}> <div className="border-solid border-2 p-4 text-2xl hover:bg-blue-500">My Courses</div></NavLink>}
        {isTeach && <NavLink> <div className="border-solid border-2 p-4 text-2xl hover:bg-blue-500">Performance</div></NavLink>}
      </div>
      <div>
        <NavLink to={'/dashboard/account'}><div className="border-solid border-2 p-4 text-2xl hover:bg-blue-500">Change Password</div></NavLink>
        {isTeach && <div className="border-solid border-2 border-red-600 text-red-600 p-4 text-2xl hover:bg-red-500 hover:text-black" onClick={deleteTeach}>Delete Instructor Account</div>}
        <div className="border-solid border-2 border-red-600 text-red-600 p-4 text-2xl hover:bg-red-500 hover:text-black" onClick={deleteAccount}>Delete Your Account</div>
      </div>
    </div>
  );
}