import NavBar from './Navbar';
import Card from './Home/Card';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './footer';
export default function Body() {
    const navigate = useNavigate();
    let [data,setdata]=useState();
    useEffect(() => {
        async function fetchdata() {
            try{
            const response = await fetch(`${import.meta.env.VITE_URL}/api/courses/like`, {
                credentials: 'include',
                withCredentials: true,
              });
            const result = await response.json();
            console.log(result);
            if(result.ok){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                console.log(result);
                setdata(result.data);
                return;
            }else{
                console.log(result.message);
                toast.error(result.message);
                if(result.redirect){
                    navigate(result.redirect);
                }
                return;
            }
            }catch(err){
                console.log(err);
                toast.error('Something went wrong');
            }
        }
        fetchdata();
    }, []);

    return (
        <>
            <NavBar />
            <p className='text-3xl m-4 text-left font-semibold'>Your WishList</p>
            <div className="content ">
                {data && data.map((d, index) => (<Card key={index} data={d} />))}
            </div>
            <Footer/>
        </>
    )
}