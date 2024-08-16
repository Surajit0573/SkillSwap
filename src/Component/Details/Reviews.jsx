import Review from './Review';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import { useState, useEffect } from 'react';
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
      const response = await fetch(`http://localhost:3000/api/review/${data?._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        withCredentials: true,
        body: JSON.stringify({ comment: review, rating: value }),
      });
      const result = await response.json();
      if (result.ok) {
        setReviews(result.data);
        setReview('');
        setValue(0);
        toast.success('Review submitted successfully');
        window.location.href = '/details';
      } else if (!result.ok) {
        toast.error(result.message);
        if (result.redirect) {
          navigate(result.redirect);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  };

  const handleChange = (e) => {
    setReview(e.target.value);
  };

  return (
    <>
      <div className="reviews p-6 bg-gray-900 dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-100 mb-4">Class Reviews</h2>
        <div className="bg-gray-800 dark:bg-gray-700 p-4 rounded-md m-4">
          <p className="text-xl font-semibold text-gray-100">Add Your Review</p>
          <div className="flex items-center mt-4">
            <p className="text-xl mr-4">Rate:</p>
            <h3 className="text-4xl">
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                sx={{ color: 'white' }} // Adjust rating color for dark mode
              />
            </h3>
          </div>
          <textarea
            placeholder="Write your review here..."
            rows={5}
            className="w-full mt-2 p-2 rounded-md bg-gray-700 text-gray-100 placeholder-gray-400"
            value={review}
            onChange={handleChange}
          />
          <button
            className="bg-blue-600 text-gray-100 px-4 py-2 rounded-md mt-4 hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        {reviews && reviews.map((r) => <Review key={r._id} id={r} courseId={data._id} />)}
      </div>
    </>
  );
}
