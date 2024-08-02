import Navbar from "../Navbar";
import Sidebar from "./sidebar";
import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function DashBoard() {
    const navigate = useNavigate();
    const[pass,setPass]=useState({
        currPass:'',
        newPass:''
    })
    const [data,setData]=useState(null);

    useEffect(()=>{
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3000/api/user/changePass', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    withCredentials: true,
                });
                const result = await response.json();
                if (result.ok) {
                    setData(result.data);
                } else {
                    console.error(result.message);
                    if (result.redirect) {
                        navigate(result.redirect);
                    }
                }
                return;
            } catch (error) {
                console.error('Error:', error);
                return;
            }
        }

        fetchData();
    },[]);


    const styles =
    {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
            '& input': {
                color: 'white',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'white',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'white',
        },
        marginBottom: '20px',
        '& .MuiOutlinedInput-input': {
            color: 'white',
        },
        width: '70%',
    }

    function handleChange(e) {
        setPass({ ...pass, [e.target.name]: e.target.value });
    }
    
    async function handleSubmit() {
        try {
            const response = await fetch('http://localhost:3000/api/user/changePass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                withCredentials: true,
                body: JSON.stringify(pass),
            });
            const result = await response.json();
            console.log(result.message);
            if (result.ok) {
                toast.success('Password changed successfully');
                return;
            } else {
                toast.error(result.message);
                console.error(result.message);
                if(result.redirect){
                    navigate(result.redirect);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setPass({currPass:'',newPass:''});
    }
    return (
        <div>
            <Navbar />
            <div className="h-[90vh] flex justify-between">
                <div>
                    <Sidebar />
                </div>
                <div className="overflow-y-scroll flex-grow p-8 flex items-center flex-col">
                    <p className="text-3xl font-semibold m-4">Change Your Password</p>
                    <div className="bg-[#31363F] p-10 w-full rounded-md flex flex-col items-center">
                       {data&&<TextField
                            id="outlined-read-only-input"
                            label="User Name"
                            defaultValue={data}
                            sx={styles}
                            InputProps={{
                                readOnly: true,
                            }}
                        />}
                        <TextField id="outlined-basic" label='Current Password' name="currPass" value={pass.currPass} onChange={handleChange} variant="outlined" sx={styles} className='inputtext' required />
                        <TextField id="outlined-basic" label='New Password' name="newPass" value={pass.newPass} onChange={handleChange} variant="outlined" sx={styles} className='inputtext' required />
                    <button className="bg-blue-600 px-4 py-2 rounded-md text-xl" onClick={handleSubmit}>Change</button>
                    </div>
                </div>
            </div>
        </div>
    );
}