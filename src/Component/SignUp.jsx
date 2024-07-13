import * as React from 'react';
import {useState,useContext} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../style/SignUp.css';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';
import { AppContext } from "../AppContext";
export default function SignUp() {
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
          }

          const [formData, setFormData] = useState({
            username:'',
            password: '',
            email: ''
          });
        
          const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
              ...prevData, 
              [name]: value
            }));
          };
        

          const handleSubmit = async (e) => {
            e.preventDefault();
            try {
              const response = await fetch('http://localhost:3000/api/user/signup', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: "include",
                withCredentials : true,
                body: JSON.stringify(formData),
              });
              const result = await response.json();
              console.log(result);
              if(!result.ok){
                alert(result.message);
                return;
              }else if(result.ok){
                localStorage.setItem('isLoggedIn', true);
               
              }
            } catch (error) {
              console.error('Error:', error);

            }
          };


    return (
      
        <>
        <Navbar/>
            <div className="signup">
                <img src="https://st.depositphotos.com/18722762/51522/v/450/depositphotos_515228796-stock-illustration-online-registration-sign-login-account.jpg"></img>
                    <form onSubmit={handleSubmit}>
                    <div className="signup-form">
                    <h1>Sign up and start learning</h1>
                    <TextField id="outlined-basic" label="Full Name" name='username' value={formData.username} onChange={handleChange} variant="outlined"  sx={styles} className='inputtext'/>
                    <TextField id="outlined-basic" label="Email" name='email'  value={formData.email} onChange={handleChange} variant="outlined" sx={styles} className='inputtext'/>
                    <TextField id="outlined-basic" label="Password" name='password'  value={formData.password} onChange={handleChange} variant="outlined" sx={styles} className='inputtext'/>
                    <Button type='submit' variant="contained" size="medium">Sign Up</Button>
                    <p>Already have an account? <NavLink to='/login'>Log in</NavLink></p>
                    </div>
                    </form>
                    
               
            </div>
        </>
    )
}