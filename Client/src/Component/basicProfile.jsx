import Navbar from "./Navbar";
import * as React from 'react';
import { useState } from 'react';

export default function BasicProfile({ options }) {
    const [data, setData] = useState(options);

    return (
        <>
            <Navbar />
            <div className="bg-gray-900 min-h-screen text-gray-100 p-8">
                <div className="profile flex flex-col md:flex-row items-center md:items-start">
                    <div className="links flex flex-col items-center md:w-1/3">
                        <img 
                            src={`https://api.multiavatar.com/${data && data.username}.png`} 
                            alt="Profile Avatar"
                            className="w-60 h-60 rounded-full border-4 border-blue-600 mb-6"
                        />
                    </div>
                    <div className="details md:w-2/3 mt-8 md:mt-0 md:ml-8 text-center md:text-left">
                        <p className="font-semibold text-blue-400">LEARNER</p>
                        <h1 className="text-5xl font-semibold my-4">{data && data.username}</h1>
                        <h2 className="text-3xl font-semibold my-2">About Me</h2>
                        <p className="text-xl text-gray-300">--</p>
                    </div>
                </div>

                <div className="certificate mt-12 text-center md:text-left">
                    <h2 className="text-3xl font-semibold mb-4">
                        Certificates (0)
                    </h2>
                </div>
            </div>
        </>
    );
}
