import * as React from 'react';
import Rating from '@mui/material/Rating';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect,useContext } from 'react';
import { AppContext } from '../../AppContext';
export default function CourseDetails({ data }) {
    const [isCart, setIsCart] = useState(false);
    const navigate = useNavigate();
    const {getCart,deleteCart}=useContext(AppContext);
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getCart();
                console.log(result);
                if (result.ok) {
                    const carts = result.data;
                    if (carts.some((cart) => cart._id === data._id)) {
                        setIsCart(true);
                    }
                    return;
                } else if (!result.ok) {
                    toast.error(result.message);
                    if(result.redirect) {
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
        if(data)
        fetchData();
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
            console.log(result);
            if (result.ok) {
                toast.success('Course added to cart successfully');
                setIsCart(true);
                return;
            } else if (!result.ok) {
                toast.error(result.message);
                if(result.redirect){
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
                    if(result.redirect){
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

    return (
        <>
            <div className="CourseDetails">
                <div className="title text-left mr-16">
                    <h1 className="text-5xl leading-[4rem] font-semibold">{data && data.title}</h1>
                    <h3 className="text-2xl my-8 items-center">{data && data.rating} {data && <Rating name="half-rating-read" defaultValue={data && data.rating} precision={0.1} readOnly />} <span className='text-lg'>(4500 ratings)</span>, {data && data.enrolledUsers} Students</h3>
                    <p className='text-xl my-4'>Created by {data && data.teacherName}, {data && data.teacher.teacher.qualifications}</p>
                    <p className='text-lg'>{data && data.tags.map((t, index) => <span key={index}>#{t} </span>)}</p>
                    {/* <p>Last updated{}</p> */}
                </div>
                <div className='bg-[#31363F] p-4 rounded-md text-left flex flex-col'>
                    <img className='w-96 rounded-md' src={data && data.thumbnail}></img>
                    <p className='text-3xl my-4'><i className="fa-solid fa-indian-rupee-sign"></i> {data && data.price}</p>
                    <div className='flex'>{isCart ? <button className='bg-red-600 py-2 px-4 text-2xl rounded-md'onClick={deleteToCart}>Remove from Cart</button> : <button className='bg-blue-600 py-2 px-4 text-2xl rounded-md' onClick={addToCart}>Add to Cart</button>}
                    <button className='border-solid border-2 border-blue-600 py-1 px-4 ml-2 rounded-md'><i className="fa-regular fa-heart text-red-600 text-3xl"></i></button>
                    </div>
                     {isCart&&<NavLink to={'/cart'} className={'text-xl mt-4 text-blue-600 underline'}> Go to Cart</NavLink>}
                </div>

            </div>
        </>
    )
}