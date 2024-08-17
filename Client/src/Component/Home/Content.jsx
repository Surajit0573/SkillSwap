import Card from './Card';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Content() {
    const [header, setHeader] = useState("All Online Classes");
    const location = useLocation();
    const navigate = useNavigate();
    let catId = null;

    const [data, setData] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            try {
                catId = location.state?.catId;
                let url = `${import.meta.env.VITE_URL}/api/courses`;
                if (catId && catId.length > 0) {
                    url = `${import.meta.env.VITE_URL}/api/courses/category/${catId}`;
                    setHeader(`Courses in ${catId}`);
                } else {
                    setHeader("All Online Classes");
                }
                const response = await fetch(url);
                const result = await response.json();
                if (result.ok) {
                    setData(result.data);
                } else {
                    if (result.redirect) {
                        navigate(result.redirect);
                    }
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        }
        fetchData();
    }, [location, navigate]);

    return (
        <div className="flex flex-col text-left h-[70vh] w-[80vw] overflow-y-scroll bg-gray-900 text-gray-100 p-4 rounded-md shadow-md">
            <p className="font-semibold text-3xl mb-4">{header}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data && data.map((d, index) => (
                    <Card key={index} data={d} />
                ))}
            </div>
        </div>
    );
}
