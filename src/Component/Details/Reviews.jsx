import Review from './Review';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
export default function Reviews({ data }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (data) {
      setReviews(data.reviews);
    }
  }, [data]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/review/${data && data._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        withCredentials: true,
        body: JSON.stringify({ comment: review, rating: value }),
      });
      const result = await response.json();
      console.log(result);
      if (result.ok) {
        setReviews(result.data);
        setReview('');
        setValue(0);
        toast.success('Review submitted successfully');
        window.location.href = '/details';
      } else if (!result.ok) {
        toast.error(result.message);
        if(result.redirect){
          navigate(result.redirect);
        }
        return;
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
    console.log('Review submitted with rating:', value);
  }
  const handleChange = (e) => {
    setReview(e.target.value);
  }

  return (
    <>
      <div className="reviews">
        <h2 className='text-2xl font-semibold my-4'>Class Reviews</h2>
        <div className='bg-[#31363F] p-4 rounded-md'>
          <p className='text-xl font-semibold'>Add Your Review</p>
          <div className='flex items-center'><p className='text-xl mt-4'>Rate : </p><h3 className="text-4xl mt-4"><Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }} /></h3></div>
          <textarea placeholder='Write your review here...' rows={5} className='w-full h-24 mt-2 p-2 rounded-md bg-[#222831]' value={review} onChange={handleChange}></textarea>
          <button className='bg-blue-600 px-4 py-2 rounded-md' onClick={handleSubmit}>Submit</button>
        </div>
        {reviews&&reviews.map((r)=><Review data={r}/>)}
      </div>
    </>
  )
}