import Card from './Card';
import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
export default function Content() {
    const [header,setHeader]=useState("All Online Classes");
    const location = useLocation();
    const navigate = useNavigate();
    let catId=null;
   
    let [data,setdata]=useState();
    useEffect(() => {
        async function fetchdata() {
            try{
                catId= location.state?.catId; console.log(catId);
                let Url = "http://localhost:3000/api/courses";
                if(catId&&catId.length>0){
                    Url = `http://localhost:3000/api/courses/category/${catId}`;
                    setHeader(`Courses in ${catId}`);
                }else{
                    setHeader("All Online Classes");
                }
                console.log(Url);
            const response = await fetch(Url);
            const result = await response.json();
            console.log(result);
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
    }, [location]);
    return (
        <div className='flex flex-col text-left  h-[70vh] w-[80vw] overflow-y-scroll '>
        <p className='p-4 font-semibold text-3xl '>{header}</p>
            <div className="content">
            {data&&data.map((d,index)=>(<Card key={index} data={d}  />))} 
            </div>
            </div>
    )
}