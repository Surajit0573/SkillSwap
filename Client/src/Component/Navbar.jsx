import '../style/Navbar.css';
import * as React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from "../AppContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedin } = useContext(AppContext);
  const [isLog, setIsLog] = useState(false);
  const [isTeacher, setTeacher] = useState(false);
  const [dp, setDp] = useState(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const curr = await isLoggedin();
      setIsLog(curr);
      if (curr) {
        const response = await fetch('http://localhost:3000/api/user/getInfo', {
          credentials: 'include',
          withCredentials: true,
        });
        if (!response.ok) {
          toast.error('Failed to fetch user data');
        } else {
          const data = await response.json();
          setTeacher(data.isTeacher);
          setDp(data.dp);
        }
      }
    }
    fetchData();
  }, [location, isLoggedin]);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user/logout', {
        credentials: "include",
        withCredentials: true,
      });
      if (!response.ok) {
        toast.error('Failed to logout');
      } else {
        setIsLog(false);
        toast.success('Logged out');
        navigate('/');
      }
    } catch (e) {
      toast.error('Failed to logout');
    }
  };

  async function handleClick() {
    try {
      const response = await fetch('http://localhost:3000/api/user/signOutTeach', {
        credentials: 'include',
        withCredentials: true,
      });
      const result = await response.json();
      if (!result.ok) {
        toast.error(result.message);
      } else {
        setTeacher(false);
        toast.success('You have successfully unregistered as a teacher');
      }
    } catch (e) {
      toast.error('Something went wrong');
    }
  }

  const buttonStyle = 'border p-2 px-4 rounded-md font-semibold transition-colors duration-300';
  const activeStyle = 'bg-blue-700 text-blue-100 border-blue-700';
  const defaultStyle = 'border-blue-600 hover:bg-blue-600 hover:text-blue-100';

  return (
    <>
      <ToastContainer />
      <div className='bg-blue-900 text-gray-100 flex justify-between items-center p-4 shadow-md'>
        <div className='flex items-center'>
          <NavLink to={"/"} className='flex items-center mx-4'>
            <i className="fa-solid fa-graduation-cap text-4xl"></i>
            <h1 className='text-2xl ml-2'>SkillSwap</h1>
          </NavLink>
          <input className='p-2 bg-blue-800 text-gray-100 rounded-md placeholder-gray-400' type='text' placeholder='Search Here' />
          <button className='bg-blue-800 text-gray-100 font-semibold p-2 rounded-md ml-2'>Search</button>
        </div>
        <div className='flex items-center'>
          <NavLink to={'/wishlist'}>
            <i className="fa-solid fa-heart text-red-600 text-4xl mx-2"></i>
          </NavLink>
          <NavLink to={'/cart'}>
            <i className="fa-solid fa-cart-shopping text-3xl mx-2"></i>
          </NavLink>
          {!isTeacher && 
            <NavLink to={"/becomeTeach"}>
              <button className='bg-blue-800 text-gray-100 p-2 rounded-xl mx-2'>Become a Teacher</button>
            </NavLink>
          }
          {!isLog && 
            <NavLink to={"/login"}>
              <button className='bg-blue-800 text-gray-100 p-2 rounded-xl mx-2'>Sign In</button>
            </NavLink>
          }
          <img 
            src={dp ? dp : 'https://shorturl.at/3YD9s'} 
            className='h-12 w-12 rounded-full mx-2 cursor-pointer' 
            alt="Profile" 
            onClick={() => setClicked(prev => !prev)} 
          />
        </div>

        {clicked && 
          <div className='absolute top-16 right-5 bg-blue-800 text-gray-100 rounded-md shadow-lg'>
            <NavLink to={'/profile'}>
              <p className={`${buttonStyle} ${defaultStyle} ${clicked ? activeStyle : ''}`}>My Profile</p>
            </NavLink>
            <NavLink to={'/dashboard'}>
              <p className={`${buttonStyle} ${defaultStyle} ${clicked ? activeStyle : ''}`}>Dashboard</p>
            </NavLink>
            {isTeacher && 
              <p className={`${buttonStyle} ${defaultStyle} ${clicked ? activeStyle : ''}`} onClick={handleClick}>
                Sign Out as Teacher
              </p>
            }
            {isLog ? 
              <p className={`${buttonStyle} ${defaultStyle} ${clicked ? activeStyle : ''}`} onClick={handleLogout}>
                Sign Out
              </p> : 
              <NavLink to={'/login'}>
                <p className={`${buttonStyle} ${defaultStyle} ${clicked ? activeStyle : ''}`}>Sign In</p>
              </NavLink>
            }
          </div>
        }
      </div>
    </>
  );
}
