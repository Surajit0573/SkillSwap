import * as React from 'react';
import Rating from '@mui/material/Rating';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Review({ id,courseId }) {
    const [data, setData] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    useEffect(() => {
        async function fetchData() {
            const responce = await fetch(`http://localhost:3000/api/review/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                withCredentials: true,
            });
            const result = await responce.json();
            if (result.ok) {
                setData(result.data);
                setIsOwner(result.isOwner);
                return;
            } else {
                toast.error(result.message);
                if (result.redirect) {
                    navigate(result.redirect);
                    return;
                }
                return;
            }
        }
        try {
            fetchData();
        } catch (e) {
            console.error('Error:', e);
            toast.error('Error fetching data');
            return;
        }
    }, [id]);

    async function deleteReview(){
        try {
            const response = await fetch(`http://localhost:3000/api/review/${courseId}/${id}`, {
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
                return;
            } else {
                toast.error(result.message);
                if(result.redirect){
                    navigate(result.redirect);
                    return;
                }
                return;
            }
        } catch (e) {
            console.error('Error:', e);
            toast.error('Error deleting review');
            return;
        }
    }
    return (
        <>
           {data&& <div className="review">
                <div className="title">
                    <img src={data&&(data.author.profile?data.author.profile.dp:`https://api.multiavatar.com/${data.username}.png`)}></img>
                    <h3>{data&&(data.author.profile?data.author.profile.fullname:data.author.username)}</h3>
                </div>
                <h3 className="text-xl mb-2 flex items-center">{data && data.rating} {data && <Rating name="half-rating-read" defaultValue={data && data.rating} precision={0.1} readOnly />}</h3>
                <p>{data && data.comment}</p>
                {isOwner&&<button className='p-2 bg-red-600 rounded-md mt-4' onClick={deleteReview}>Delete</button>}
            </div>}
        </>
    )
}