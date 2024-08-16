import Navbar from "./Navbar";
import CourseDetails from "./Details/CourseDetails";
import Lessons from "./Details/Lesson";
import About from "./Details/About";
import Teacher from "./Details/Teacher";
import Reviews from "./Details/Reviews";
import Related from "./Details/Related";
import { useLocation,useNavigate } from "react-router-dom";
import '../style/Details.css'
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Details() {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState(null);
    const [isOwner,setIsOwner]=useState(false);
    useEffect(() => {
        const { state } = location;
        if (!(state && state.id)) {
            navigate('/');
            return;
        }
        const { id } = state;
        console.log(id);
        async function fetchData() {
            const responce = await fetch(`http://localhost:3000/api/courses/${id}`,{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: "include",
                withCredentials: true,
            });
            const result = await responce.json();
            if (result.ok) {
                console.log(result.data);
                toast.success(result.message);
                setData(result.data);
                setIsOwner(result.isOwner);
                return;
            } else {
               toast.error(result.message);
               if(result.redirect){
                navigate(result.redirect);
                return;
               }
                navigate('/');
                return;
            }
        }
        try{
        fetchData();
        }catch(e){
            console.error('Error:', e);
            toast.error('Error fetching data');
            return;
        }
    }, [location]);

    return (
        <div className="bg-gray-900">
            <Navbar />
           
            <CourseDetails data={data} />
            <Lessons data={data&&data.sections} id={data&&data._id} isOwner={isOwner}/>
            <About data={data}/>
            <Teacher data={data&&data.teacher}/>
            <Reviews data={data}/>
            <Related />
            </div>
    )
}