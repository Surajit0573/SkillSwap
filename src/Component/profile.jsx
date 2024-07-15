import { useState, useEffect } from 'react';
import GridLoader from "react-spinners/GridLoader";
import StudentProfile from './studentProfile';
import TeacherProfile from './teacherProfile';
const override = {
    display: "block",
    margin: "20% auto",
    borderColor: "red",
};

export default function Profile() {
    const [data,setData]=useState(null);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:3000/api/user/profile/dashboard', {
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
            }
        }
        fetchData();
    }, []);

    return (
        <>
        {!data?( <GridLoader
        color={'#0059ef'}
        loading={true}
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />):(data.type=="larner"?<StudentProfile options={data}/>:<TeacherProfile options={data}/>)}

        </>
    )
}