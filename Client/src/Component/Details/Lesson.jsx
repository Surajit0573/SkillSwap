import { NavLink } from 'react-router-dom';
import LessonCard from './LessonCard';

export default function Lesson({ data, id, isOwner }) {
    const totalDuration = "3h 50m"; // This should be calculated from actual lesson data

    return (
        <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-6 lg:p-8 shadow-2xl border border-blue-500/20">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                    <i className="fa-solid fa-play-circle text-cyan-400"></i>
                    Course Curriculum
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mx-auto mb-6"></div>
                
                <p className="text-lg text-gray-400 mb-6 max-w-2xl mx-auto">
                    Master every concept with our structured learning path designed for maximum retention and practical application.
                </p>
                
                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-6 mb-8">
                    <div className="bg-black/30 backdrop-blur-sm rounded-full px-6 py-3 border border-blue-500/20">
                        <span className="text-cyan-400 font-bold text-lg">
                            {data?.length || 0}
                        </span>
                        <span className="text-gray-400 ml-2">Modules</span>
                    </div>
                    <div className="bg-black/30 backdrop-blur-sm rounded-full px-6 py-3 border border-blue-500/20">
                        <span className="text-cyan-400 font-bold text-lg">
                            {totalDuration}
                        </span>
                        <span className="text-gray-400 ml-2">Total Content</span>
                    </div>
                </div>

                {/* Course Player Button */}
                {id && isOwner && (
                    <NavLink to="/coursePlayer" state={{ id }}>
                        <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                            <i className="fa-solid fa-play mr-2"></i>
                            Start Learning
                        </button>
                    </NavLink>
                )}
            </div>

            {/* Lessons Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {data?.map((module, index) => (
                    <div key={index} className="transform transition-all duration-300 hover:scale-105">
                        <LessonCard 
                            name={module.title} 
                            num={index + 1} 
                            data={module.lessons} 
                        />
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {(!data || data.length === 0) && (
                <div className="text-center py-20">
                    <i className="fa-solid fa-video text-6xl text-gray-600 mb-4"></i>
                    <h3 className="text-2xl font-bold text-white mb-2">No lessons available yet</h3>
                    <p className="text-gray-400">Course content is being prepared</p>
                </div>
            )}
        </div>
    );
}
