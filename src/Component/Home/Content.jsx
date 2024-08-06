import Card from './Card';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Content() {
    const navigate = useNavigate();
    const Url = "http://localhost:3000/api/courses";
    let [data,setdata]=useState();
    useEffect(() => {
        async function fetchdata() {
            try{
            const response = await fetch(Url);
            const result = await response.json();
            if(result.ok){
                console.log(result);
                setdata(result.data);
                return;
            }else{
                console.log(result.message);
                if(result.redirect){
                    navigate(result.redirect);
                }
                return;
            }
            }catch(err){
                console.log(err);
            }
        }
        fetchdata();
    }, []);
    return (
        <>
            <div className="content ">
            {data&&data.map((d,index)=>(<Card key={index} data={d} />))} 
            </div>
        </>
    )
}