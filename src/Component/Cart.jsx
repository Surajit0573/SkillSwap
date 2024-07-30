import { useState,useEffect,useContext} from 'react';
import Navbar from './Navbar';
import CartCard from './Cart/cartCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../AppContext';
export default function Cart(){
    const { getCart } = useContext(AppContext);
    const location = useLocation();
    const [data,setData]=useState(null);
    const [total,setTotal]=useState(0);
    useEffect(()=>{
        async function fetchData(){
            try {
                const result = await getCart();
                console.log(result);
                if (result.ok) {
                    setData(result.data);
                    setTotal(result.data.reduce((acc,item)=>acc+item.price,0));
                    return;
                } else if (!result.ok) {
                    toast.error(result.message);
                    return;
                }
            } catch (error) {
                toast.error("Something went wrong");
                console.error('Error:', error);
                return;
            }
        }
        fetchData();
    },[location]);
    return(<>
    <Navbar />
    <div className='flex m-16'>
    <div className='flex flex-col flex-grow'>
    {data&&data.map((c,index)=><CartCard data={c} key={index}/>)}
    </div> 
    <div className='bg-[#31363F] w-96 h-fit ml-8 rounded-md p-8 flex flex-col'>
        <div className='flex justify-between text-2xl my-2'><p> Price:</p><p className='font-semibold'>{total}</p> </div>
        <div className='flex justify-between text-2xl my-2'><p>Discount (10%):</p><p className='text-green-400 font-semibold'>-{(total*10)/100}</p> </div>
        <hr></hr>
        <div className='flex justify-between text-2xl my-4'><p>Total:</p><p className='text-yellow-300 font-semibold'>{total-(total*10)/100}</p> </div>
        <button className='bg-blue-500 text-white p-2 rounded-md'>Checkout</button>
    </div>
    </div>
    </>);
}