import '../style/Navbar.css';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useState,useContext } from 'react';
import { AppContext } from "../AppContext";
export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

  const handleLogout = async() => {
    // Handle user logout
    setIsLoggedIn(false);
    try{
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        // headers: {
        //   'Authorization': `Bearer ${localStorage.getItem('token')}`,
        // },
      });
      if(!response.ok){
        throw new Error('Failed to logout');
      }
      // localStorage.removeItem('token');

      // Clear user data in application state
      window.location.href = '/'; // Redirect to login page
    }catch(e){
      console.error('Failed to logout:', e);
    }
  };

  

  

  return (
    <div className='Navbar'>
    <i className="fa-solid fa-graduation-cap"></i>
    <h1>SkillSwap</h1>
    </div>
  );
}
