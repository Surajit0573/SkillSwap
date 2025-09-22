import { useState, useEffect, useContext } from 'react';
import Navbar from './Navbar';
import CartCard from './Cart/cartCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import StripeCheckout from 'react-stripe-checkout';
import Footer from './footer';

// Cart Skeleton Component
const CartSkeleton = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
            <div className="animate-pulse container mx-auto px-4 py-8">
                <div className="flex flex-col xl:flex-row gap-8">
                    {/* Cart Items Skeleton */}
                    <div className="flex-1 space-y-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-blue-700/20 rounded-2xl p-6 h-48"></div>
                        ))}
                    </div>
                    
                    {/* Summary Skeleton */}
                    <div className="w-full xl:w-96">
                        <div className="bg-blue-700/20 rounded-2xl p-8 h-80"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Cart() {
    const navigate = useNavigate();
    const { getCart } = useContext(AppContext);
    const location = useLocation();
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const result = await getCart();
                console.log("Cart Data: ", result);
                if (result.ok) {
                    setData(result.data);
                    setTotal(result.data.reduce((acc, item) => acc + item.price, 0));
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                toast.error("Something went wrong");
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [location, getCart]);

    const makePayment = async (token) => {
        setIsProcessing(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/api/user/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({ token, products: data }),
            });

            const result = await response.json();
            console.log("RESULT : ", result);

            if (result.ok) {
                toast.success(result.message);
                navigate('/profile');
            } else {
                toast.error(result.message);
                if (result.redirect) {
                    navigate(result.redirect);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error("Something went wrong");
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) {
        return <CartSkeleton />;
    }

    const discountAmount = (total * 10) / 100;
    const finalTotal = total - discountAmount;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-4">
                            <i className="fa-solid fa-shopping-cart text-4xl text-cyan-400"></i>
                            <h1 className="text-3xl lg:text-5xl font-bold text-white">
                                Shopping Cart
                            </h1>
                            {data.length > 0 && (
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-black px-4 py-2 rounded-full text-lg font-bold">
                                    {data.length}
                                </span>
                            )}
                        </div>
                        <p className="text-gray-400 text-lg">
                            Review your selected courses before checkout
                        </p>
                    </div>

                    {data.length > 0 ? (
                        <div className="flex flex-col xl:flex-row gap-8">
                            {/* Cart Items */}
                            <div className="flex-1">
                                <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-6 lg:p-8 shadow-2xl border border-blue-500/20">
                                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                        <i className="fa-solid fa-list text-cyan-400"></i>
                                        Course List ({data.length})
                                    </h2>
                                    
                                    <div className="space-y-4">
                                        {data.map((course, index) => (
                                            <CartCard key={index} data={course} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="w-full xl:w-96">
                                <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-blue-500/20 sticky top-8">
                                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                        <i className="fa-solid fa-receipt text-cyan-400"></i>
                                        Order Summary
                                    </h2>

                                    {/* Price Breakdown */}
                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between items-center text-lg">
                                            <span className="text-gray-400">Subtotal:</span>
                                            <span className="text-white font-semibold">₹{total}</span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center text-lg">
                                            <span className="text-gray-400">Discount (10%):</span>
                                            <span className="text-green-400 font-semibold">-₹{discountAmount}</span>
                                        </div>
                                        
                                        <div className="border-t border-blue-500/20 pt-4">
                                            <div className="flex justify-between items-center text-xl font-bold">
                                                <span className="text-white">Total:</span>
                                                <span className="text-cyan-400">₹{finalTotal}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Button */}
                                    <StripeCheckout
                                        stripeKey={import.meta.env.VITE_STRIPE_KEY}
                                        token={makePayment}
                                        name="Complete Your Payment"
                                        description="Payment for selected courses"
                                        amount={finalTotal * 100}
                                        billingAddress
                                        allowRememberMe
                                        currency="INR"
                                    >
                                        <button 
                                            className={`w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
                                            disabled={isProcessing}
                                        >
                                            {isProcessing ? (
                                                <>
                                                    <i className="fa-solid fa-spinner animate-spin mr-2"></i>
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fa-solid fa-credit-card mr-2"></i>
                                                    Proceed to Checkout
                                                </>
                                            )}
                                        </button>
                                    </StripeCheckout>

                                    {/* Security Note */}
                                    <div className="mt-4 text-center">
                                        <p className="text-gray-500 text-xs flex items-center justify-center gap-2">
                                            <i className="fa-solid fa-lock"></i>
                                            Secure payment powered by Stripe
                                        </p>
                                    </div>

                                    {/* Continue Shopping */}
                                    <button 
                                        className="w-full mt-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                                        onClick={() => navigate('/courses')}
                                    >
                                        <i className="fa-solid fa-arrow-left mr-2"></i>
                                        Continue Shopping
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Empty Cart */
                        <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-blue-500/20">
                            <div className="text-center py-20">
                                <i className="fa-solid fa-shopping-cart text-8xl text-gray-600 mb-6"></i>
                                <h2 className="text-3xl font-bold text-white mb-4">
                                    Your cart is empty
                                </h2>
                                <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
                                    Looks like you haven't added any courses to your cart yet. Start exploring!
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button 
                                        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                                        onClick={() => navigate('/')}
                                    >
                                        <i className="fa-solid fa-search mr-2"></i>
                                        Browse Courses
                                    </button>
                                    <button 
                                        className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                                        onClick={() => navigate('/wishlist')}
                                    >
                                        <i className="fa-solid fa-heart mr-2"></i>
                                        View Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
}