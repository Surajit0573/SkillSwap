import Navbar from "./Navbar";
import * as React from 'react';
import Rating from '@mui/material/Rating';
import '../style/Profile.css';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import Card from "./Home/Card"
export default function TeacherProfile({ options }) {
    console.log(options);
    const [data, setData] = useState(options);

    return (
        <>
            <Navbar />
            <div className="profile">
                <div className="links">
                    <img src={data && data.profile.dp} className="w-64"/>
                    <a src={data && data.profile.links.website}><button className="link"><i className="fa-solid fa-link mb-4"></i> Website</button></a>
                    <a src={data && data.profile.links.twitter}><button className="link"><i className="fa-brands fa-x-twitter"></i> Twitter</button></a>
                    <a src={data && data.profile.links.linkedin}><button className="link"><i className="fa-brands fa-linkedin"></i> Linkedin</button></a>

                </div>
                <div className="details">
                    <p className="font-semibold">INSTRUCTOR</p>
                    <h1 className="text-5xl font-semibold my-4">{data && data.profile.fullname}, {data && data.teacher.domain}</h1>
                    <h3 className="text-2xl mb-2"><Rating name="half-rating-read" defaultValue={data && data.profile.rating} precision={0.5} readOnly /> (4500)</h3>
                    <h3 className="text-xl mb-2">{data && data.profile.follower} Followers</h3>
                    <h2 className="text-3xl font-semibold my-2">About me</h2>
                    <p className="text-xl">{data && data.profile.about}</p>
                </div>
            </div>
            <div className="relatedCourse">
                <h2 className="text-4xl my-4 font-semibold">My courses ({data && data.teacher.courses.length})</h2>
                <NavLink to={'/addCourse'}> <Button variant="contained" size="medium">Add Courses</Button></NavLink>
                <div className="flex flex-wrap">
                    {data && data.teacher.courses.map((d) => (<Card data={d}/>))}
                </div>
            </div>

        </>
    )
}