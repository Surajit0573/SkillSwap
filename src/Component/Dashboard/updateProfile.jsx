import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import '../../style/AddCourse.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { AppContext } from "../../AppContext";
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
export default function UpdateProfile() {
    const navigate = useNavigate();
    const [heading, setHeading] = useState("Complete Your Profile");
    const [profile, setProfile] = useState({
        fullname: '',
        about: '',
    });
    const [links, setLinks] = useState({
        website: '',
        linkedin: '',
        twitter: '',
    });
    const { getUrl, deleteFile } = useContext(AppContext);
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const [skills, setSkills] = useState([]);
    const [skill, setSkill] = useState('');

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:3000/api/user/profile', {
                method: 'GET',
                credentials: "include",
                withCredentials: true,
            });
            const result = await response.json();
            if (result.ok) {
                console.log(result);
                setProfile({
                    fullname: result.data.fullname,
                    about: result.data.about
                })
                setLinks({
                    website: result.data.links.website,
                    linkedin: result.data.links.linkedin,
                    twitter: result.data.links.twitter,
                });
                setSkills(result.data.skills);
                setUrl(result.data.dp);
                setHeading("Update Your Profile");
            } else {
                console.log(result.message);
            }
        }
        fetchData();
    }, [])

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

    useEffect(() => {
        async function update() {
            const currUrl = await getUrl(file);
            console.log(currUrl);
            setUrl(currUrl);
        }
        if (file != null) {
            update();
        }
    }, [file]);

    function addSkill(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (skill.trim().length !== 0) {
                setSkills([...skills, skill.trim()]);
                setSkill('');
            }
        }
    }

    function deleteSkill(e) {
        console.log(e.target.getAttribute('name'));
        setSkills(skills.filter((t) => t != e.target.getAttribute('name')));
    }

    function handleChange(e) {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    }

    function handleLinkChange(e) {
        setLinks({ ...links, [e.target.name]: e.target.value });
    }

    async function handleFileChange(e) {
        setFile(e.target.files[0]);
        console.log(url);
        deleteFile(url);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        // console.log( profile, links, skills,url);
        try {
            // Send the POST request with the file
            const response = await fetch('http://localhost:3000/api/user/profile/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                withCredentials: true,
                body: JSON.stringify({ fullname: profile.fullname, about: profile.about, links, skills, dp: url })
            });
            const result = await response.json();
            console.log(result);
            if (result.ok) {
                navigate('/profile');
            } else {
                alert("Something went wrong. Please try again !!");
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }
    return (
        <>
            <div className="addCourse">
                <h1 className="text-3xl m-4">{heading}</h1>
                <div className="addCourseForm">
                    <TextField id="outlined-basic" name="fullname" value={profile.fullname} onChange={handleChange} label='Full Name' variant="outlined" sx={styles} className='inputtext' required />
                    <TextField id="outlined-multiline-static" name="about" value={profile.about} onChange={handleChange} label="Write something about you" multiline rows={3} sx={styles} className='inputtext' required />
                    <TextField id="outlined-basic" name="skills" value={skill} onChange={(e) => setSkill(e.target.value)} onKeyDown={addSkill} label='Add Skills' variant="outlined" sx={styles} className='inputtext' />
                    <div className="showTags">
                        {skills.map((t, index) => (<div key={index} className="oneTag">{t}<button name={t} onClick={deleteSkill}><i name={t} className="fa-solid fa-xmark flex self-center"></i></button></div>))}
                    </div>
                    <div className='upload w-[535px]'>
                        <img src={url}></img>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            name="dp"
                            onChange={handleFileChange}
                        >
                            Upload Profile Picture

                            <VisuallyHiddenInput type="file" />
                        </Button>
                    </div>
                    <TextField id="outlined-basic" name="website" value={links.website} onChange={handleLinkChange} label='Website Link' variant="outlined" sx={styles} className='inputtext' required />
                    <TextField id="outlined-basic" name="twitter" value={links.twitter} onChange={handleLinkChange} label='Twitter Link' variant="outlined" sx={styles} className='inputtext' required />
                    <TextField id="outlined-basic" name="linkedin" value={links.linkedin} onChange={handleLinkChange} label='Linkedin Link' variant="outlined" sx={styles} className='inputtext' required />
                    <Button type='submit' onClick={handleSubmit} disabled={!((url != '') && (skills.length > 0))} variant="contained" size="medium">SAVE</Button>
                </div>
            </div>
        </>
    )
}