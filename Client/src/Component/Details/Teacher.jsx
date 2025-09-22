import * as React from 'react';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

export default function Teacher({ data }) {
  return (
    <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-6 lg:p-8 shadow-2xl border border-blue-500/20">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 flex items-center gap-3">
          <i className="fa-solid fa-chalkboard-user text-cyan-400"></i>
          Meet Your Instructor
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
      </div>

      {data ? (
        <div className="space-y-6">
          {/* Instructor Profile Card */}
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-blue-500/10 hover:border-cyan-500/30 transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Profile Image */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 p-1 shadow-xl">
                  <img
                    src={data.profile?.dp || `https://api.multiavatar.com/${data.username}.png`}
                    alt={data.profile?.fullname || data.username}
                    className="w-full h-full rounded-full object-cover bg-black"
                  />
                </div>
                {/* Online Badge */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-black flex items-center justify-center shadow-lg">
                  <i className="fa-solid fa-check text-black text-xs"></i>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                      {data.profile?.fullname || data.username}
                    </h3>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                      <i className="fa-solid fa-graduation-cap text-cyan-400"></i>
                      <span className="text-lg text-cyan-400 font-semibold">
                        {data.teacher?.domain || "Subject Matter Expert"}
                      </span>
                    </div>
                  </div>
                  
                  {/* Follow Button */}
                  <NavLink 
                    to={`/profile/${data.username}`}
                    className="inline-block"
                  >
                    <button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2">
                      <i className="fa-solid fa-user-plus"></i>
                      <span>Follow Instructor</span>
                    </button>
                  </NavLink>
                </div>

                {/* Instructor Stats */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 mb-4">
                  <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-500/20">
                    <span className="text-cyan-400 font-bold">4.9</span>
                    <span className="text-gray-400 text-sm ml-1">Rating</span>
                  </div>
                  <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-500/20">
                    <span className="text-cyan-400 font-bold">12K+</span>
                    <span className="text-gray-400 text-sm ml-1">Students</span>
                  </div>
                  <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-500/20">
                    <span className="text-cyan-400 font-bold">25</span>
                    <span className="text-gray-400 text-sm ml-1">Courses</span>
                  </div>
                </div>

                {/* Qualifications */}
                {data.teacher?.qualifications && (
                  <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-blue-500/10 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fa-solid fa-certificate text-cyan-400"></i>
                      <span className="text-white font-semibold">Qualifications</span>
                    </div>
                    <p className="text-gray-300 text-sm lg:text-base">
                      {data.teacher.qualifications}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* About Section */}
          {/* <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-blue-500/10">
            <div className="flex items-center gap-3 mb-4">
              <i className="fa-solid fa-info-circle text-cyan-400"></i>
              <h4 className="text-xl lg:text-2xl font-bold text-white">About the Instructor</h4>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                {data.profile?.about || 
                  `${data.profile?.fullname || data.username} is a passionate educator with extensive experience in ${data.teacher?.domain || 'their field'}. They are committed to helping students achieve their learning goals through engaging and comprehensive course content.`
                }
              </p>
            </div>
          </div> */}

          {/* Expertise Tags */}
          {/* <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-blue-500/10">
            <div className="flex items-center gap-3 mb-4">
              <i className="fa-solid fa-tags text-cyan-400"></i>
              <h4 className="text-xl lg:text-2xl font-bold text-white">Areas of Expertise</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {(data.teacher?.domain || "Web Development,Programming,Technology").split(',').map((skill, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 text-cyan-300 px-3 py-1.5 rounded-full text-sm font-medium hover:border-cyan-500/50 transition-colors duration-300"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div> */}

          {/* Contact Section */}
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-blue-500/10">
            <div className="flex items-center gap-3 mb-4">
              <i className="fa-solid fa-envelope text-cyan-400"></i>
              <h4 className="text-xl lg:text-2xl font-bold text-white">Get in Touch</h4>
            </div>
            <p className="text-gray-300 mb-4">
              Have questions about the course? Feel free to reach out to the instructor.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2">
                <i className="fa-solid fa-message"></i>
                <span>Send Message</span>
              </button>
              <NavLink 
                to={`/profile/${data.username}`}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <i className="fa-solid fa-user"></i>
                <span>View Profile</span>
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/10">
            <i className="fa-solid fa-user-slash text-6xl text-gray-600 mb-4"></i>
            <h3 className="text-2xl font-bold text-white mb-2">Instructor Information Unavailable</h3>
            <p className="text-gray-400">
              We're working to get the instructor details for this course.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}