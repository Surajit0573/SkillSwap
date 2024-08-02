import Navbar from "../Navbar";
import Sidebar from "./sidebar";
import Button from '@mui/material/Button';
import { useState, useEffect, useContext } from 'react'
import { json, useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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

export default function Certificate() {
    const { getUrl, deleteFile } = useContext(AppContext);
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const [reUrl,SetReUrl]=useState('');
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        async function update() {
            const currUrl = await getUrl(file);
            console.log(currUrl);
            setUrl(currUrl);
            SetReUrl(currUrl.replace('.pdf','.png'));
            return;
        }
        if (file != null) {
            update();
        }
    }, [file]);

    async function handleFileChange(e) {
        const selectedFile = e.target.files[0];
        // Allow only image and PDF file types
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (selectedFile && allowedTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
            console.log(url);
            await deleteFile(url);
            toast.success("file uploaded successfully");
            return;
        } else {
            toast.error('Only image and PDF files are allowed');
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3000/api/user/profile/certificate', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    withCredentials: true,
                });
                const result = await response.json();
                console.log(result.data);
                if (result.ok) {
                    setData(result.data);
                    return;
                } else {
                    console.error(result.message);
                    toast.error(result.message);
                    if (result.redirect) {
                        navigate(result.redirect);
                        return;
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                return;
            }
        }

        fetchData();
    }, [url]);

    async function handleSubmit() {
        try {
            const response = await fetch('http://localhost:3000/api/user/profile/certificate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                withCredentials: true,
                body: JSON.stringify({ url }),
            });
            const result = await response.json();
            console.log(result.data);
            if (result.ok) {
                console.log(result.message);
                toast.success(result.message);
                return;
            } else {
                console.error(result.message);
                toast.error(result.message);
                if (result.redirect) {
                    navigate(result.redirect);
                    return;
                }
            }
        } catch (error) {
            console.error('Error:', error);
            return;
        }
    }
    return (
        <div>
            <Navbar />
            <div className="h-[90vh] flex justify-between">
                <div>
                    <Sidebar />
                </div>
                <div className="overflow-y-scroll flex-grow flex-wrap text-left p-4">
                    <p className="text-3xl font-semibold">My Certificates ({data && data.length})</p>
                    <div className="flex flex-wrap items-center">
                    {data&&data.map((d)=><div className="m-4 bg-[#31363F] p-2 rounded-md flex flex-col items-center">
                        <img src={d.replace('.pdf','.png')} className="h-56 rounded-md m-2"></img>
                        <button className="bg-red-600 px-4 py-1.5 ml-2 rounded-md">Delete</button>
                    </div>)}
                        <div className='border-solid border-2 rounded-lg p-2 h-fit'>
                            <img src={reUrl} className="h-48 bg-[#31363F] rounded-md m-2" />
                            <div>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    name="dp"
                                    onChange={handleFileChange}
                                >
                                    Upload Certificate

                                    <VisuallyHiddenInput type="file" />
                                </Button>
                                <button className="bg-blue-600 px-4 py-1.5 ml-2 rounded-md" onClick={handleSubmit}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}