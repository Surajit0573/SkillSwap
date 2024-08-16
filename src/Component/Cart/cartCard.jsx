import * as React from 'react';
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';

function Card({ data }) {
    const { deleteCart } = useContext(AppContext);
    const navigate = useNavigate();

    function clickHandler() {
        navigate("/details", { state: { id: data._id } });
    }

    async function handleDelete() {
        if (window.confirm('Are you sure you want to remove this course from Cart?')) {
            try {
                const result = await deleteCart(data);
                if (result.ok) {
                    toast.success(result.message);
                    navigate('/cart');
                } else {
                    toast.error(result.message);
                    if (result.redirect) {
                        navigate(result.redirect);
                    }
                }
            } catch (error) {
                toast.error("Something went wrong");
                console.error('Error:', error);
            }
        }
    }

    return (
        <div className='group relative'>
            <div
                className='absolute right-10 top-4 text-2xl text-red-500 hover:text-red-600 group-hover:block hidden'
                onClick={handleDelete}
            >
                <i className="fa-solid fa-trash"></i>
            </div>
            <div
                className="flex h-64 m-4 mt-0 bg-gray-800 p-4 rounded-md hover:shadow-lg hover:shadow-slate-700 cursor-pointer"
                onClick={clickHandler}
            >
                <img
                    src={data?.thumbnail}
                    alt="Course Thumbnail"
                    className='w-56 rounded-md object-cover'
                />
                <div className="text-left p-4">
                    <h4 className="text-2xl text-white">{data?.title}</h4>
                    <h3 className="text-xl mb-2 flex items-center text-gray-400">
                        {data?.rating} 
                        <Rating
                            name="half-rating-read"
                            defaultValue={data?.rating}
                            precision={0.1}
                            readOnly
                            className='ml-2'
                        />
                        (4500)
                    </h3>
                    <p className='text-xl my-2 text-white'>
                        Price: Rs <span className='text-yellow-300 font-semibold'>{data?.price}</span>
                    </p>
                    <p className='text-gray-400'>Created by {data?.teacherName}</p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default React.memo(Card);
