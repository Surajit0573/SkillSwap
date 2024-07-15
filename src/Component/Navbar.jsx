import '../style/Navbar.css';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ConstructionOutlined } from '@mui/icons-material';
export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem('isLoggedIn')));

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    if (loggedIn) {
      setIsLoggedIn(loggedIn);
    } else {
      localStorage.setItem('isLoggedIn', JSON.stringify(false));
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = async () => {
    // Handle user logout
    try {
      const response = await fetch('http://localhost:3000/api/user/logout',{
        credentials: "include",
        withCredentials : true,
      });
      if (!response.ok) {
        throw new Error('Failed to logout');
      } else {
       localStorage.setItem('isLoggedIn', JSON.stringify(false));
        setIsLoggedIn(false);
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
        {(isLoggedIn==true) ?<><button className='bg-black text-white p-2 text-lg rounded-xl mx-2' onClick={handleLogout}>Log Out</button><NavLink to={"/becomeTeach"}><button className='bg-black text-white p-2 text-lg rounded-xl mx-2'>Become a Teacher</button></NavLink></>:<><NavLink to={"/login"}><button className='bg-black text-white p-2 text-lg rounded-xl mx-2'>Login</button></NavLink>
        <NavLink to={"/signup"}><button className='bg-black text-white p-2 text-lg rounded-xl'>Sign UP</button></NavLink></> }


        <NavLink to={"/profile"}><img src='https://shorturl.at/3YD9s' className='h-12 w-12 rounded-full mx-2' ></img></NavLink>
      </div>


    </div>
  );
}
