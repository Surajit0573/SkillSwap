import '../style/Navbar.css';
import * as React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { ConstructionOutlined } from '@mui/icons-material';
import { AppContext } from "../AppContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedin } = useContext(AppContext);
  const [isLog, setIsLog] = useState(false);
  const [isTeacher, setTeacher] = useState(false);
  const [isComplete, setComplete] = useState(false);
  const [dp, setDp] = useState(null);
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const curr = await isLoggedin();
      console.log(curr);
      setIsLog(curr);
      if (curr) {
        const response = await fetch('http://localhost:3000/api/user/getInfo', {
          credentials: 'include',
          withCredentials: true,
        });
        if (!response.ok) {
          console.error('Failed to fetch user data');
          toast.error('Failed to fetch user data');
        } else {
          const data = await response.json();
          setTeacher(data.isTeacher);
          setComplete(data.isComplete);
          setDp(data.dp);
        }
      }
    }
    fetchData();
  }, [location]);

  const handleLogout = async () => {
    // Handle user logout
    try {
      const response = await fetch('http://localhost:3000/api/user/logout', {
        credentials: "include",
        withCredentials: true,
      });
      if (!response.ok) {
        console.error('Failed to logout');
        toast.error('Failed to logout');
      } else {
        setIsLog(false);
        toast.success('Logged out');
        navigate('/')
      }
      // localStorage.removeItem('token');

      // Clear user data in application state

    } catch (e) {
      console.error('Failed to logout:', e);
      toast.error('Failed to logout');
    }
  };

  async function handleClick() {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/api/user/signOutTeach', {
          credentials: 'include',
          withCredentials: true,
        });
        const result = await response.json();
        if (!result.ok) {
          console.error(result.message);
          toast.error(result.message);
        } else {
          setTeacher(false);
          toast.success('You have successfully unregistered as a teacher');
        }
      } catch (e) {
        console.error('Something went wrong:', e);
        toast.error('Something went wrong:');
      }
    }

    fetchData();
  }

  const style = 'border-solid border p-2 px-4 border-black hover:border-blue-600 hover:border-2 font-semibold'

  return (<>
    <ToastContainer />
    <div className='Navbar flex justify-between relative'>
      <div className='flex justify-evenly w-fit items-center'>
        <NavLink to={"/"}> <div className='flex items-center mx-4'>
          <i className="fa-solid fa-graduation-cap text-5xl "></i>
          <h1 className='text-3xl'>SkillSwap</h1>
        </div></NavLink>
        <input className='search p-4' type='text' placeholder='Search Hear' />
      </div>
      <div className='flex justify-evenly w-fit items-center'>
        <NavLink to={'/wishlist'}><i className="fa-solid fa-heart text-red-600 text-4xl mx-2" id='wishlist'></i></NavLink>
        <NavLink to={'/cart'}><i className="fa-solid fa-cart-shopping  text-3xl mx-2"></i></NavLink>
        {!isTeacher && <NavLink to={"/becomeTeach"}><button className='bg-black text-white p-2 text-lg rounded-xl mx-2'>Become a Teacher</button></NavLink>}
        {!isLog && <NavLink to={"/login"}><button className='bg-black text-white p-2 text-lg rounded-xl mx-2'>Sign In</button></NavLink>}


        <img src={dp ? dp : 'https://shorturl.at/3YD9s'} className='h-12 w-12 rounded-full mx-2' onClick={() => { setClicked(click => (!click)) }} ></img>
      </div>

      {clicked && <div className='absolute top-16 right-5 flex flex-col bg-white text-black rounded-md'>
        <NavLink to={'/profile'}><p className={style}>My Profile</p></NavLink>
        <NavLink to={'/dashboard'}><p className={style}>DashBoard</p></NavLink>
        {isTeacher && <p className={style} onClick={handleClick}>Sign Out as Teacher</p>}
        {isLog ? <p className={style} onClick={handleLogout}>Sign Out</p> : <NavLink to={'/login'}><p className={style}>Sign In</p></NavLink>}
      </div>}


    </div>
  </>
  );
}
