import '../style/Navbar.css';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { ConstructionOutlined } from '@mui/icons-material';
import { AppContext } from "../AppContext";
export default function Navbar() {
  const { isLoggedin } = useContext(AppContext);
  const [isLog, setIsLog] = useState(false);

  useEffect(() => {
    async function fetchData(){
    const curr = await isLoggedin();
    console.log(curr);
    setIsLog(curr);
    }
    fetchData();
  }, []);

  const handleLogout = async () => {
    // Handle user logout
    try {
      const response = await fetch('http://localhost:3000/api/user/logout', {
        credentials: "include",
        withCredentials: true,
      });
      if (!response.ok) {
        console.error('Failed to logout');
      } else {
        setIsLog(false);
        window.location.href = '/';
      }
      // localStorage.removeItem('token');

      // Clear user data in application state

    } catch (e) {
      console.error('Failed to logout:', e);
    }
  };





  return (
    <div className='Navbar flex justify-between'>
      <div className='flex justify-evenly w-fit items-center'>
        <NavLink to={"/"}> <div className='flex items-center mx-4'>
          <i className="fa-solid fa-graduation-cap text-5xl "></i>
          <h1 className='text-3xl'>SkillSwap</h1>
        </div></NavLink>
        <input className='search p-4' type='text' placeholder='Search Hear' />
      </div>
      <div className='flex justify-evenly w-fit items-center'>
        <i className="fa-solid fa-heart text-red-600 text-4xl mx-2" id='wishlist'></i>
        <i className="fa-solid fa-cart-shopping  text-3xl mx-2"></i>
        {(isLog == true) ? <><button className='bg-black text-white p-2 text-lg rounded-xl mx-2' onClick={handleLogout}>Log Out</button><NavLink to={"/becomeTeach"}><button className='bg-black text-white p-2 text-lg rounded-xl mx-2'>Become a Teacher</button></NavLink></> : <><NavLink to={"/login"}><button className='bg-black text-white p-2 text-lg rounded-xl mx-2'>Login</button></NavLink>
          <NavLink to={"/signup"}><button className='bg-black text-white p-2 text-lg rounded-xl'>Sign UP</button></NavLink></>}


        <NavLink to={"/profile"}><img src='https://shorturl.at/3YD9s' className='h-12 w-12 rounded-full mx-2' ></img></NavLink>
      </div>


    </div>
  );
}
