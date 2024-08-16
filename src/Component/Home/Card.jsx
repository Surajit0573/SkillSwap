import * as React from 'react';
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom"
import { useState,useEffect } from 'react';
export default function Card({data}) {
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate()
    function clickHandeler(){
        navigate("/details",{ state: { id:data._id }});
    }
    useEffect(()=>{
        async function fetchData(){
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
                console.log(result);
                if (result.ok) {
                    setIsLiked(true);
                    return;
                } else{
                    setIsLiked(false);
            }
            } catch (error) {
                setIsLiked(false);
                toast.error("Something went wrong");
                console.error('Error:', error);
                return;
            }
        }
        if(data){
        fetchData();
        }
    },[data]);

    return (
        <>
            <div className="card" onClick={clickHandeler}>

                <img src={data&&data.thumbnail} alt=""/>
                <div className="info text-lg">
                    <p className='text-sm'>{data&&data.enrolledUsers.length} Students</p>
                    <p  className='text-sm'>3h 50m</p>
                </div>
              <h4 className="text-lg my-2">{data&&data.title}</h4>
              <div className="detail">
              <h3 className="text-lg mb-[3px] flex items-center">{data&&data.rating} {data&&<Rating name="half-rating-read" defaultValue={data && data.rating} precision={0.1} readOnly />}({data&&data.reviews.length})</h3>
              <p className='text-lg'><i className="fa-solid fa-indian-rupee-sign"></i> {data&&data.price}</p>
              </div>
              <div className="info">
                <p className='text-md'>{data&&data.teacherName}</p>
                {isLiked?<i className="fa-solid fa-heart text-red-600 text-lg"></i>:<i className="fa-regular fa-heart text-xl"></i>}
              </div>
            </div>

        </>
    )
}