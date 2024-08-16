import * as React from 'react';
import Rating from '@mui/material/Rating';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../AppContext';

export default function CourseDetails({ data }) {
    const [isCart, setIsCart] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();
    const { getCart, deleteCart } = useContext(AppContext);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getCart();
                if (result.ok) {
                    const carts = result.data;
                    if (carts.some((cart) => cart._id === data._id)) {
                        setIsCart(true);
                    }
                    return;
                } else if (!result.ok) {
                    toast.error(result.message);
                    if (result.redirect) {
                        navigate(result.redirect);
                        return;
                    }
                    return;
                }
            } catch (error) {
                toast.error("Something went wrong");
                console.error('Error:', error);
                return;
            }
        }
        if (data) fetchData();
    }, [data]);

    useEffect(() => {
        async function fetchData() {
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
                if (result.ok) {
                    setIsLiked(true);
                    return;
                } else {
                    setIsLiked(false);
                }
            } catch (error) {
                setIsLiked(false);
                toast.error("Something went wrong");
                console.error('Error:', error);
                return;
            }
        }
        if (data) {
            fetchData();
        }
    }, [data]);

    async function addToCart() {
        try {
            const response = await fetch(`http://localhost:3000/api/user/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                withCredentials: true,
                body: JSON.stringify({ course_id: data._id }),
            });
            const result = await response.json();
            if (result.ok) {
                toast.success('Course added to cart successfully');
                setIsCart(true);
                return;
            } else if (!result.ok) {
                toast.error(result.message);
                if (result.redirect) {
                    navigate(result.redirect);
                    return;
                }
                return;
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error('Error:', error);
            return;
        }
    }

    async function deleteToCart() {
        try {
            const result = await deleteCart(data);
            if (result.ok) {
                toast.success(result.message);
                setIsCart(false);
                return;
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

    async function handleLike() {
        try {
            const response = await fetch(`http://localhost:3000/api/courses/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                withCredentials: true,
                body: JSON.stringify({ course_id: data._id }),
            });
            const result = await response.json();
            if (result.ok) {
                toast.success('Course liked successfully');
                setIsLiked((like) => !like);
                return;
            } else if (!result.ok) {
                toast.error(result.message);
                if (result.redirect) {
                    navigate(result.redirect);
                    return;
                }
                return;
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error('Error:', error);
            return;
        }
    }

    return (
        <>
            <div className="CourseDetails grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-gray-800 rounded-lg shadow-lg">
                <div className="title text-left">
                    <h1 className="text-5xl leading-[4rem] font-semibold text-white">{data && data.title}</h1>
                    <h3 className="text-2xl my-8 flex items-center text-gray-300">
                        {data && data.rating} 
                        {data && <Rating name="half-rating-read" defaultValue={data && data.rating} precision={0.1} readOnly className="ml-2" />} 
                        <span className='text-lg ml-2'>({data && data.reviews.length} ratings)</span>, {data && data.enrolledUsers.length} Students
                    </h3>
                    <p className='text-xl my-4 text-gray-400'>Created by {data && data.teacherName}, {data && data.teacher.teacher.qualifications}</p>
                    <p className='text-lg text-gray-400'>{data && data.tags.map((t, index) => <span key={index} className="mr-2">#{t}</span>)}</p>
                </div>
                <div className='bg-gray-700 p-6 rounded-md text-left flex flex-col w-fit'>
                    <img className='w-full md:w-96 rounded-md hover:shadow-lg transition-all duration-200' src={data && data.thumbnail} alt="Course Thumbnail" />
                    <p className='text-3xl my-4 text-white'><i className="fa-solid fa-indian-rupee-sign"></i> {data && data.price}</p>
                    <div className='flex items-center'>
                        {isCart ? 
                            <button className='bg-red-600 hover:bg-red-700 py-2 px-4 text-2xl rounded-md transition-all duration-200' onClick={deleteToCart}>
                                Remove from Cart
                            </button> 
                            : 
                            <button className='bg-blue-600 hover:bg-blue-700 py-2 px-4 text-2xl rounded-md transition-all duration-200' onClick={addToCart}>
                                Add to Cart
                            </button>
                        }
                        <button className='border-solid border-2 border-blue-600 py-1 px-4 ml-2 rounded-md transition-all duration-200' onClick={handleLike}>
                            {isLiked ? 
                                <i className="fa-solid fa-heart text-red-600 text-3xl"></i> 
                                : 
                                <i className="fa-regular fa-heart text-red-600 text-3xl"></i>
                            }
                        </button>
                    </div>
                    {isCart && <NavLink to={'/cart'} className={'text-xl mt-4 text-blue-400 underline'}>Go to Cart</NavLink>}
                </div>
            </div>
        </>
    );
}
