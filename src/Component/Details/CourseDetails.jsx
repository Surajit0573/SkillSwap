import * as React from 'react';
import Rating from '@mui/material/Rating';
export default function CourseDetails({ data }) {
    return (
        <>
            <div className="CourseDetails">
                <div className="title text-left mr-16">
                    <h1 className="text-5xl leading-[4rem] font-semibold">{data && data.title}</h1>
                    <h3 className="text-2xl my-8 items-center">{data&&data.rating} {data&&<Rating name="half-rating-read" defaultValue={data && data.rating} precision={0.1} readOnly />} <span className='text-lg'>(4500 ratings)</span>, {data&&data.enrolledUsers} Students</h3>
                    <p className='text-xl my-4'>Created by {data && data.teacherName}, {data && data.teacher.teacher.qualifications}</p>
                    <p className='text-lg'>{data&&data.tags.map((t,index)=><span key={index}>#{t} </span>)}</p>
                    {/* <p>Last updated{}</p> */}
                </div>
                <div className='bg-[#31363F] p-4 rounded-md text-left'>
                <img className='w-96 rounded-md' src={data && data.thumbnail}></img>
                <p className='text-3xl my-4'><i className="fa-solid fa-indian-rupee-sign"></i> {data&&data.price}</p>
                <button className='bg-blue-600 py-2 px-4 text-2xl rounded-md'>Add to Cart</button> <button className='border-solid border-2 border-blue-600 py-1 px-4 ml-2 rounded-md'><i className="fa-regular fa-heart text-red-600 text-3xl"></i></button>
                </div>
               
            </div>
        </>
    )
}