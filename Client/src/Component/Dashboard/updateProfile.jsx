import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            const response = await fetch(`${import.meta.env.VITE_URL}/api/user/profile`, {
                method: 'GET',
                credentials: "include",
                withCredentials: true,
            });
            const result = await response.json();
            if (result.ok) {
                setProfile({
                    fullname: result.data.fullname,
                    about: result.data.about
                });
                setLinks({
                    website: result.data.links.website,
                    linkedin: result.data.links.linkedin,
                    twitter: result.data.links.twitter,
                });
                setSkills(result.data.skills);
                setUrl(result.data.dp);
                setHeading("Update Your Profile");
            } else {
                toast.error(result.message);
                if (result.redirect) {
                    navigate(result.redirect);
                }
            }
        }
        fetchData();
    }, []);

    const muiStyles = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#4b5563',
            },
            '&:hover fieldset': {
                borderColor: '#60a5fa',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#3b82f6',
            },
            '& input': {
                color: 'white',
            },
            '& textarea': {
                color: 'white',
            },
            backgroundColor: '#1f2937',
            borderRadius: '8px',
        },
        '& .MuiInputLabel-root': {
            color: '#9ca3af',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#60a5fa',
        },
    };

    useEffect(() => {
        async function update() {
            const currUrl = await getUrl(file);
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
        setSkills(skills.filter((t) => t !== e.target.getAttribute('name')));
    }

    function handleChange(e) {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    }

    function handleLinkChange(e) {
        setLinks({ ...links, [e.target.name]: e.target.value });
    }

    async function handleFileChange(e) {
        setFile(e.target.files[0]);
        deleteFile(url);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/api/user/profile/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                withCredentials: true,
                body: JSON.stringify({ fullname: profile.fullname, about: profile.about, links, skills, dp: url })
            });
            const result = await response.json();
            if (result.ok) {
                navigate('/profile');
            } else {
                toast.error(result.message);
                if (result.redirect) {
                    navigate(result.redirect);
                }
            }
        } catch (error) {
            toast.error('Failed to update profile, try again later.');
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400 mb-2">{heading}</h1>
                <p className="text-gray-400">Fill out your profile information to get started</p>
            </div>

            {/* Profile Picture Section */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-blue-400">Profile Picture</h2>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative">
                        <img 
                            src={url} 
                            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-600 shadow-lg" 
                            alt="Profile" 
                        />
                        <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        onChange={handleFileChange}
                        sx={{ 
                            backgroundColor: '#3b82f6',
                            '&:hover': { backgroundColor: '#2563eb' },
                            py: 1.5,
                            px: 3,
                            borderRadius: '8px'
                        }}
                    >
                        Upload New Picture
                        <VisuallyHiddenInput type="file" accept="image/*" />
                    </Button>
                </div>
            </div>

            {/* Basic Information */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
                <h2 className="text-xl font-semibold mb-6 text-blue-400">Basic Information</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TextField 
                        name="fullname" 
                        value={profile.fullname} 
                        onChange={handleChange} 
                        label='Full Name' 
                        variant="outlined" 
                        sx={muiStyles}
                        fullWidth
                        required 
                    />
                    <div className="lg:col-span-2">
                        <TextField 
                            name="about" 
                            value={profile.about} 
                            onChange={handleChange} 
                            label="About You" 
                            multiline 
                            rows={4} 
                            sx={muiStyles}
                            fullWidth
                            required 
                        />
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-blue-400">Skills</h2>
                <TextField 
                    name="skills" 
                    value={skill} 
                    onChange={(e) => setSkill(e.target.value)} 
                    onKeyDown={addSkill} 
                    label='Add Skills (Press Enter to add)' 
                    variant="outlined" 
                    sx={muiStyles}
                    fullWidth
                    helperText="Press Enter after typing each skill"
                    FormHelperTextProps={{ style: { color: '#9ca3af' } }}
                />
                {skills.length > 0 && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-400 mb-3">Your Skills:</p>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((t, index) => (
                                <div key={index} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors">
                                    <span className="text-sm font-medium">{t}</span>
                                    <button 
                                        name={t} 
                                        onClick={deleteSkill} 
                                        className="hover:bg-blue-800 rounded-full p-1 transition-colors"
                                    >
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Social Links */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
                <h2 className="text-xl font-semibold mb-6 text-blue-400">Social Links</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <TextField 
                        name="website" 
                        value={links.website} 
                        onChange={handleLinkChange} 
                        label='Website' 
                        variant="outlined" 
                        sx={muiStyles}
                        fullWidth
                    />
                    <TextField 
                        name="linkedin" 
                        value={links.linkedin} 
                        onChange={handleLinkChange} 
                        label='LinkedIn' 
                        variant="outlined" 
                        sx={muiStyles}
                        fullWidth
                    />
                    <TextField 
                        name="twitter" 
                        value={links.twitter} 
                        onChange={handleLinkChange} 
                        label='Twitter' 
                        variant="outlined" 
                        sx={muiStyles}
                        fullWidth
                    />
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <Button 
                    type='submit' 
                    onClick={handleSubmit} 
                    disabled={!((url !== '') && (skills.length > 0))} 
                    variant="contained" 
                    size="large"
                    sx={{ 
                        backgroundColor: '#3b82f6',
                        '&:hover': { backgroundColor: '#2563eb' },
                        '&:disabled': { backgroundColor: '#374151' },
                        py: 1.5,
                        px: 6,
                        borderRadius: '8px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                    }}
                >
                    SAVE PROFILE
                </Button>
            </div>
        </div>
    );
}