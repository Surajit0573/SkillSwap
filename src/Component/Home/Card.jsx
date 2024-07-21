import * as React from 'react';
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom"
export default function Card({data}) {
    const navigate = useNavigate()
    function clickHandeler(){
        navigate("/details",{ state: { id:data._id }});
    }
    return (
        <>
            <div className="card" onClick={clickHandeler}>

                <img src={data&&data.thumbnail} alt="" />
                <div className="info text-lg">
                    <p>{data&&data.enrolledUsers} Students</p>
                    <p>3h 50m</p>
                </div>
              <h4 className="text-xl">{data&&data.title}</h4>
              <div className="detail">
              <h3 className="text-xl mb-2 flex items-center">{data&&data.rating} {data&&<Rating name="half-rating-read" defaultValue={data && data.rating} precision={0.1} readOnly />}(4500)</h3>
              <p className='text-xl'>Price: Rs {data&&data.price}</p>
              </div>
              <div className="info">
                <p>{data&&data.teacherName}</p>
                <i className="fa-regular fa-heart"></i>
              </div>
            </div>

        </>
    )
}