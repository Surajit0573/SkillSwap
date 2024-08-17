import * as React from 'react';
import Rating from '@mui/material/Rating';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Review({ id, courseId }) {
    const [data, setData] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL}/api/review/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    withCredentials: true,
                });
                const result = await response.json();
                if (result.ok) {
                    setData(result.data);
                    setIsOwner(result.isOwner);
                } else {
                    toast.error(result.message);
                    if (result.redirect) {
                        navigate(result.redirect);
                    }
                }
            } catch (e) {
                console.error('Error:', e);
                toast.error('Error fetching data');
            }
        }
        fetchData();
    }, [id]);

    async function deleteReview() {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/api/review/${courseId}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                withCredentials: true,
            });
            const result = await response.json();
            if (result.ok) {
                toast.success(result.message);
                setData(null);
            } else {
                toast.error(result.message);
                if (result.redirect) {
                    navigate(result.redirect);
                }
            }
        } catch (e) {
            console.error('Error:', e);
            toast.error('Error deleting review');
        }
    }

    return (
        <>
            {data && (
                <div className="review bg-gray-900 text-gray-100 p-4 rounded-lg shadow-md border border-gray-700">
                    <div className="title flex items-center mb-4">
                        <img
                            src={data && (data.author.profile ? data.author.profile.dp : `https://api.multiavatar.com/${data.username}.png`)}
                            alt={`${data.author.username}'s avatar`}
                            className="w-12 h-12 rounded-full mr-4 border border-gray-600"
                        />
                        <h3 className="text-lg font-semibold">
                            {data && (data.author.profile ? data.author.profile.fullname : data.author.username)}
                        </h3>
                    </div>
                    <div className="rating text-xl mb-2 flex items-center">
                        {data && data.rating} 
                        {data && <Rating name="half-rating-read" defaultValue={data && data.rating} precision={0.1} readOnly />}
                    </div>
                    <p className="text-sm">{data && data.comment}</p>
                    {isOwner && (
                        <button 
                            className='p-2 bg-red-600 rounded-md mt-4 hover:bg-red-500'
                            onClick={deleteReview}
                        >
                            Delete
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
