import * as React from 'react';
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function Card({ data }) {
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

    function clickHandler() {
        navigate("/details", { state: { id: data._id } });
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3000/api/courses/isLike`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    withCredentials: true,
                    body: JSON.stringify({ course_id: data._id }),
                });
                const result = await response.json();
                if (result.ok) {
                    setIsLiked(true);
                } else {
                    setIsLiked(false);
                }
            } catch (error) {
                setIsLiked(false);
                console.error('Error:', error);
            }
        }
        if (data) {
            fetchData();
        }
    }, [data]);

    return (
        <div className="bg-gray-800 text-gray-100 rounded-lg shadow-lg overflow-hidden cursor-pointer" onClick={clickHandler}>
            <img src={data?.thumbnail} alt="" className="w-full h-48 object-cover"/>
            <div className="p-4">
                <div className="flex justify-between text-sm mb-2">
                    <p>{data?.enrolledUsers.length} Students</p>
                    <p>3h 50m</p>
                </div>
                <h4 className="text-lg font-semibold mb-2">{data?.title}</h4>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg flex items-center">
                        {data?.rating}
                        <Rating name="half-rating-read" defaultValue={data?.rating} precision={0.1} readOnly className="ml-1"/>
                        ({data?.reviews.length})
                    </h3>
                    <p className="text-lg font-semibold">
                        <i className="fa-solid fa-indian-rupee-sign"></i> {data?.price}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-md">{data?.teacherName}</p>
                    {isLiked ? (
                        <i className="fa-solid fa-heart text-red-600 text-xl"></i>
                    ) : (
                        <i className="fa-regular fa-heart text-xl"></i>
                    )}
                </div>
            </div>
        </div>
    );
}
