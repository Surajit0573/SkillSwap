import Navbar from "./Navbar";
import * as React from 'react';
import Rating from '@mui/material/Rating';
import '../style/Profile.css';
import Content from "./Home/Content";
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
export default function teacherProfile({options}) {
    console.log(options);
    const [data, setData] = useState(options);
    // const id = '667a45159d9762c4c5398d82';
    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch(`http://localhost:3000/api/user/teacher/${id}`);
    //         const {data} = await response.json();
    //         if (data) {
    //             setData(data);
    //         }
    //     }
    //     fetchData();
    // }, []);

    return (
        <>
            <Navbar />
            <div className="profile">
                <div className="links">
                    <img src={data&&data.profile.dp} />
                    <a src={data&&data.profile.links.website}><button className="link"><i className="fa-solid fa-link"></i> Website</button></a>
                    <a src={data&&data.profile.links.twitter}><button className="link"><i className="fa-brands fa-x-twitter"></i> Twitter</button></a>
                    <a src={data&&data.profile.links.linkedin}><button className="link"><i className="fa-brands fa-linkedin"></i> Linkedin</button></a>

                </div>
                <div className="details">
                    <p>INSTRUCTOR</p>
                    <h1>{data&&data.profile.fullname}, {data&&data.teacher.domain}</h1>
                    <h3><Rating name="half-rating-read" defaultValue={data&&data.profile.rating} precision={0.5} readOnly /> (4500)</h3>
                    <h3>{data&&data.profile.follower} Followers</h3>
                    <h2>About me</h2>
                    <p>{data&&data.profile.about}</p>
                </div>
            </div>
            <div className="relatedCourse">
                <h2>My courses (7)</h2>
                <NavLink to={'/addCourse'}> <Button variant="contained" size="medium">Add Courses</Button></NavLink>
                <Content />
            </div>

        </>
    )
}