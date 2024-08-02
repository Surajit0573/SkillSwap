import * as React from 'react';
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';
export default function Card({ data }) {
    const { deleteCart } = useContext(AppContext);
    const navigate = useNavigate()
    function clickHandeler() {
        navigate("/details", { state: { id: data._id } });
        return;
    }

    async function handleDelete() {
        if (window.confirm('Are you sure you want to remove this course from Cart?')) {
            try {
                const result = await deleteCart(data);
                if (result.ok) {
                    toast.success(result.message);
                    return navigate('/cart');
                } else if (!result.ok) {
                    toast.error(result.message);
                    if (result.redirect) {
                        navigate(result.redirect);
                    }
                    return;
                }
            } catch (error) {
                toast.error("Something went wrong");
                console.error('Error:', error);
                return;
            }
        }
    }
    return (
        <div className='group relative '>
            <div className='absolute right-10 top-4 text-2xl text-red-500 hover:text-red-600 group-hover:block hidden' onClick={handleDelete}><i className="fa-solid fa-trash"></i></div>
            <div className="flex h-64 m-4 mt-0 bg-[#31363F] p-4 rounded-md hover:shadow-lg hover:shadow-slate-700 " onClick={clickHandeler}>

                <img src={data && data.thumbnail} alt="" className='w-56 rounded-md' />
                <div>
                    <div className="text-left p-4">
                        <h4 className="text-2xl">{data && data.title}</h4>
                        <h3 className="text-xl mb-2 flex items-center">{data && data.rating} {data && <Rating name="half-rating-read" defaultValue={data && data.rating} precision={0.1} readOnly />}(4500)</h3>
                        <p className='text-xl my-2'>Price: Rs <span className='text-yellow-300 font-semibold' >{data && data.price}</span></p>
                        <p>Created by {data && data.teacherName}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}