import Navbar from "./Navbar";
import * as React from 'react';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import Button from '@mui/material/Button';

export default function StudentProfile({ options }) {
    const [data, setData] = useState(options);

    return (
        <>
            <Navbar />
            <div className="bg-gray-900 min-h-screen text-gray-100 p-8">
                <div className="profile flex flex-col md:flex-row items-center md:items-start">
                <div className="flex-none">
                        <img src={data && data.profile.dp} alt="Profile" className="w-64 h-64 rounded-md border-4 border-blue-600" />
                        <div className="mt-4 flex flex-col space-y-2">
                            <a href={data && data.profile.links.website} target="_blank" rel="noopener noreferrer">
                                <Button variant="contained" className="bg-blue-600 text-gray-100 hover:bg-blue-700 w-full">
                                    <i className="fa-solid fa-link mr-2"></i> Website
                                </Button>
                            </a>
                            <a href={data && data.profile.links.twitter} target="_blank" rel="noopener noreferrer">
                                <Button variant="contained" className="bg-blue-600 text-gray-100 hover:bg-blue-700 w-full">
                                    <i className="fa-brands fa-x-twitter mr-2"></i> Twitter
                                </Button>
                            </a>
                            <a href={data && data.profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                                <Button variant="contained" className="bg-blue-600 text-gray-100 hover:bg-blue-700 w-full">
                                    <i className="fa-brands fa-linkedin mr-2"></i> LinkedIn
                                </Button>
                            </a>
                        </div>
                    </div>
                    <div className="details md:w-2/3 mt-8 md:mt-0 md:ml-8">
                        <p className="font-semibold text-blue-400">LEARNER</p>
                        <h1 className="text-5xl font-semibold my-4">{data && data.profile.fullname}</h1>
                        {/* 
                        <h3 className="text-2xl mb-2">
                            <Rating 
                                name="half-rating-read" 
                                defaultValue={data && data.profile.rating} 
                                precision={0.5} 
                                readOnly 
                            /> (4500)
                        </h3>
                        <h3 className="text-xl mb-2">{data && data.profile.follower} Followers</h3> 
                        */}
                        <h2 className="text-3xl font-semibold my-2">About Me</h2>
                        <p className="text-xl text-gray-300">{data && data.profile.about}</p>
                    </div>
                </div>

                <div className="certificate mt-12">
                    <h2 className="text-3xl font-semibold mb-4">
                        Certificates ({data.profile.certifications.length})
                    </h2>
                    {/* Add certificate display logic here */}
                </div>
            </div>
        </>
    );
}
