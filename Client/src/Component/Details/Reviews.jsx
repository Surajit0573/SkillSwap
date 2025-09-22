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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (data) {
      setReviews(data.reviews);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value || !review.trim()) {
      toast.error('Please provide both rating and review comment');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/api/review/${data?._id}`, {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setReview(e.target.value);
  };

  const averageRating = reviews?.length > 0 
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-6 lg:p-8 shadow-2xl border border-blue-500/20">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 flex items-center gap-3">
          <i className="fa-solid fa-star text-cyan-400"></i>
          Course Reviews
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mb-6"></div>
        
        {/* Rating Summary */}
        <div className="flex flex-wrap items-center gap-6 mb-6">
          <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm rounded-full px-6 py-3 border border-blue-500/20">
            <span className="text-3xl font-bold text-cyan-400">
              {averageRating}
            </span>
            <div className="flex flex-col items-center">
              <Rating
                name="average-rating"
                value={parseFloat(averageRating)}
                precision={0.1}
                readOnly
                sx={{ 
                  color: '#06b6d4',
                  '& .MuiRating-iconEmpty': {
                    color: 'rgba(255, 255, 255, 0.2)'
                  }
                }}
              />
              <span className="text-gray-400 text-sm mt-1">
                ({reviews?.length || 0} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Review Form */}
      <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-blue-500/10 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <i className="fa-solid fa-pen-to-square text-cyan-400 text-xl"></i>
          <h3 className="text-2xl lg:text-3xl font-bold text-white">Share Your Experience</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Section */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-blue-500/10">
            <label className="block text-lg font-semibold text-white mb-3">
              How would you rate this course?
            </label>
            <div className="flex items-center gap-4">
              <Rating
                name="user-rating"
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                size="large"
                sx={{ 
                  color: '#06b6d4',
                  '& .MuiRating-iconEmpty': {
                    color: 'rgba(255, 255, 255, 0.2)'
                  },
                  '& .MuiRating-iconHover': {
                    color: '#22d3ee'
                  }
                }}
              />
              {value > 0 && (
                <span className="text-cyan-400 font-semibold text-lg">
                  {value} star{value !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>

          {/* Comment Section */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-blue-500/10">
            <label className="block text-lg font-semibold text-white mb-3">
              Tell others about your experience
            </label>
            <textarea
              placeholder="Share your thoughts about the course content, instructor, and overall learning experience..."
              rows={5}
              className="w-full p-4 rounded-lg bg-black/40 text-white placeholder-gray-400 border border-blue-500/20 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
              value={review}
              onChange={handleChange}
            />
            <div className="flex justify-between items-center mt-2 text-sm">
              <span className="text-gray-400">
                Minimum 10 characters required
              </span>
              <span className={`${review.length < 10 ? 'text-red-400' : 'text-cyan-400'}`}>
                {review.length} characters
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={isSubmitting || !value || review.length < 10}
          >
            {isSubmitting ? (
              <>
                <i className="fa-solid fa-spinner animate-spin"></i>
                Submitting Review...
              </>
            ) : (
              <>
                <i className="fa-solid fa-paper-plane"></i>
                Submit Review
              </>
            )}
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <i className="fa-solid fa-comments text-cyan-400 text-xl"></i>
          <h3 className="text-2xl lg:text-3xl font-bold text-white">
            Student Reviews ({reviews?.length || 0})
          </h3>
        </div>
        
        {reviews && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((r) => (
              <Review key={r._id} id={r} courseId={data._id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/10">
              <i className="fa-solid fa-star-half-stroke text-6xl text-gray-600 mb-4"></i>
              <h3 className="text-2xl font-bold text-white mb-2">No Reviews Yet</h3>
              <p className="text-gray-400 text-lg">
                Be the first to share your experience with this course!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}