import Card from './Card';
import React, { useState, useEffect } from 'react';
export default function Content() {
    const Url = "http://localhost:3000/api/courses";
    let [data,setdata]=useState();
    useEffect(() => {
        async function fetchdata() {
            try{
            const response = await fetch(Url);
            const {data} = await response.json();
            if(data){
                console.log(data);
            setdata(data);
            }
            }catch(err){
                console.log(err);
            }
        }
        fetchdata();
    }, []);
    return (
        <>
            <div className="content">
            {data&&data.map((d)=>(<Card data={d}/>))} 
            </div>
        </>
    )
}