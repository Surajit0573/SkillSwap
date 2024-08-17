import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import GridLoader from "react-spinners/GridLoader";
import StudentProfile from './studentProfile';
import TeacherProfile from './teacherProfile';
import BasicProfile from './basicProfile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const override = {
    display: "block",
    margin: "20% auto",
    borderColor: "red",
};

export default function Profile() {
    const { username } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const url = (username && username.length > 0) ? `${import.meta.env.VITE_URL}/api/user/profile/${username}` : `${import.meta.env.VITE_URL}/api/user/profile/dashboard`;
        
        async function fetchData() {
            setLoading(true); // Set loading to true before fetching data
            try {
                const response = await fetch(url, {
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
                    toast.error(result.message);
                    if (result.redirect) {
                        navigate(result.redirect);
                    } else {
                        navigate('/login');
                    }
                }
            } catch (e) {
                console.error(e);
                toast.error('An error occurred while fetching data');
                navigate('/');
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        }

        fetchData();
    }, [username, location.pathname]);

    if (loading) {
        return (
            <GridLoader
                color={'#0059ef'}
                loading={true}
                cssOverride={override}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        );
    }

    return (
        <>
            {!data ? (
                <GridLoader
                    color={'#0059ef'}
                    loading={true}
                    cssOverride={override}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ) : (
                data.type === "learner" ? (
                    data.isComplete ? <StudentProfile options={data} /> : <BasicProfile options={data} />
                ) : (
                    <TeacherProfile options={data} />
                )
            )}
        </>
    );
}
