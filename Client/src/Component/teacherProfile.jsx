import Navbar from "./Navbar";
import * as React from 'react';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from "./Home/Card";

export default function TeacherProfile({ options }) {
    const [data, setData] = useState(options);

    return (
        <>
            <Navbar />
            <div className="bg-gray-900 text-gray-100 p-6">
                <div className="flex flex-col md:flex-row gap-8 items-start">
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
                    <div className="flex-1">
                        <p className="text-lg font-semibold text-blue-500">INSTRUCTOR</p>
                        <h1 className="text-4xl font-semibold my-4">{data && data.profile.fullname}, {data && data.teacher.domain}</h1>
                        <h3 className="text-xl mb-2 flex items-center justify-center">
                            {data && data.teacher.rating}
                            {data && <Rating name="half-rating-read" defaultValue={data && data.teacher.rating} precision={0.1} readOnly />}
                            (4500)
                        </h3>
                        <h2 className="text-3xl font-semibold my-2">About Me</h2>
                        <p className="text-lg">{data && data.profile.about}</p>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 text-gray-100 p-6">
                <h2 className="text-3xl my-4 font-semibold">My Courses ({data && data.teacher.courses.length})</h2>
                <div className="flex flex-wrap gap-4">
                    {data && data.teacher.courses.map((d) => (<Card key={d._id} data={d} />))}
                </div>
            </div>
        </>
    );
}
