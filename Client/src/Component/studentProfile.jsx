import Navbar from "./Navbar";
import * as React from 'react';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import Button from '@mui/material/Button';
import Footer from "./footer";

export default function StudentProfile({ options }) {
    const [data, setData] = useState(options);

    const SocialButton = ({ href, icon, label, color }) => (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block">
            <button className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${color} flex items-center justify-center gap-3`}>
                <i className={icon}></i>
                {label}
            </button>
        </a>
    );

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20"></div>
                    <div className="relative container mx-auto px-4 py-12 lg:py-20">
                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
                            {/* Profile Image & Social Links */}
                            <div className="flex-shrink-0 text-center lg:text-left">
                                <div className="relative inline-block">
                                    <img 
                                        src={data?.profile?.dp} 
                                        alt="Profile" 
                                        className="w-64 h-64 lg:w-80 lg:h-80 rounded-3xl shadow-2xl border-4 border-white/20 object-cover"
                                    />
                                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
                                        LEARNER
                                    </div>
                                </div>
                                
                                {/* Social Links */}
                                <div className="mt-8 space-y-4 w-64 lg:w-80 mx-auto lg:mx-0">
                                    <SocialButton 
                                        href={data?.profile?.links?.website}
                                        icon="fa-solid fa-globe"
                                        label="Website"
                                        color="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                                    />
                                    <SocialButton 
                                        href={data?.profile?.links?.twitter}
                                        icon="fa-brands fa-x-twitter"
                                        label="Twitter"
                                        color="bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900"
                                    />
                                    <SocialButton 
                                        href={data?.profile?.links?.linkedin}
                                        icon="fa-brands fa-linkedin"
                                        label="LinkedIn"
                                        color="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800"
                                    />
                                </div>
                            </div>

                            {/* Profile Details */}
                            <div className="flex-1 text-center lg:text-left">
                                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
                                    {data?.profile?.fullname}
                                </h1>
                                
                                <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-blue-500/20">
                                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                                        <i className="fa-solid fa-user text-cyan-400"></i>
                                        About Me
                                    </h2>
                                    <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                                        {data?.profile?.about}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Certificates Section */}
                <div className="container mx-auto px-4 py-16">
                    <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-8 lg:p-12 shadow-2xl border border-blue-500/20">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 flex items-center gap-4">
                            <i className="fa-solid fa-certificate text-cyan-400"></i>
                            Certificates 
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-black px-4 py-2 rounded-full text-lg font-bold">
                                {data?.profile?.certifications?.length || 0}
                            </span>
                        </h2>
                        
                        {data?.profile?.certifications?.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data.profile.certifications.map((cert, index) => (
                                    <div key={index} className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-cyan-500/40 transition-all duration-300 transform hover:scale-105">
                                        <div className="w-full h-32 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-lg mb-4 flex items-center justify-center">
                                            <i className="fa-solid fa-medal text-4xl text-cyan-400"></i>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2">Certificate {index + 1}</h3>
                                        <p className="text-gray-400 text-sm">Achievement unlocked</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <i className="fa-solid fa-certificate text-6xl text-gray-600 mb-4"></i>
                                <p className="text-xl text-gray-400">No certificates yet. Keep learning!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
