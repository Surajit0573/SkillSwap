import Navbar from "./Navbar";
import * as React from 'react';
import Rating from '@mui/material/Rating';
import '../style/Profile.css';
import Content from "./Home/Content";
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
export default function StudentProfile({ options }) {
    console.log(options);
    const [data, setData] = useState(options);

    return (
        <>
            <Navbar />
            <div className="profile h-fit">
                <div className="links h-fit">
                    <img src={data && data.profile.dp} className="w-64"/>
                    <NavLink to={data && data.profile.links.website}><button className="link"><i className="fa-solid fa-link mb-4"></i> Website</button></NavLink>
                    <NavLink to={data && data.profile.links.twitter}><button className="link"><i className="fa-brands fa-x-twitter"></i> Twitter</button></NavLink>
                    <NavLink to={data && data.profile.links.linkedin}><button className="link"><i className="fa-brands fa-linkedin"></i> Linkedin</button></NavLink>

                </div>
                <div className="details h-fit">
                    <p className="font-semibold">LEARNER</p>
                    <h1 className="text-5xl font-semibold my-4">{data && data.profile.fullname}</h1>
                    {/* <h3 className="text-2xl mb-2"><Rating name="half-rating-read" defaultValue={data && data.profile.rating} precision={0.5} readOnly /> (4500)</h3> */}
                    {/* <h3 className="text-xl mb-2">{data && data.profile.follower} Followers</h3> */}
                    <h2 className="text-3xl font-semibold my-2">About me</h2>
                    <p className="text-xl">{data && data.profile.about}</p>
                </div>
            </div>

            <div className="certificate my-4">
                    <h2 className="text-3xl font-semibold my-4">Certificates ({data.profile.certifications.length})</h2>
                </div>

        </>
    )
}