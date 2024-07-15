import Navbar from "./Navbar";
import * as React from 'react';
import Rating from '@mui/material/Rating';
import '../style/Profile.css';
import Content from "./Home/Content";
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
export default function BasicProfile({ options }) {
    console.log(options);
    const [data, setData] = useState(options);
    return (
        <>
            <Navbar />
            <div className="profile">
                <div className="links">
                    <img src={`https://api.multiavatar.com/${data&&data.username}.png`} className="w-60"/>
                   <NavLink to={'/completeProfile'}><button className="bg-blue-600 p-4 text-xl rounded-md">Complete Your Profile</button></NavLink>

                </div>
                <div className="details ">
                    <p className="font-semibold">LEARNER</p>
                    <h1 className="text-5xl font-semibold my-4">{data && data.username}</h1>
                    {/* <h3 className="text-2xl mb-2"><Rating name="half-rating-read" defaultValue={data && data.profile.rating} precision={0.5} readOnly /> (4500)</h3> */}
                    {/* <h3 className="text-xl mb-2">{data && data.profile.follower} Followers</h3> */}
                    <h2 className="text-3xl font-semibold my-2">About me</h2>
                    <p className="text-xl">--</p>
                </div>
            </div>

            <div className="certificate">
                    <h2 className="text-3xl font-semibold my-4">Certificates (0)</h2>
                </div>

        </>
    )
}