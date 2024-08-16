import { NavLink } from 'react-router-dom';
import LessonCard from './LessonCard';

export default function Lesson({ data, id, isOwner }) {
    return (
        <div className="lessons bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="title mb-6 text-center">
                <h2 className='text-3xl font-bold mb-2 text-white'>Comprehensive Course Modules</h2>
                <p className='text-lg text-gray-400 mb-4'>Immerse yourself in a wealth of knowledge with our comprehensive course content.</p>
                <h3 className='text-xl font-semibold text-gray-300 mb-4'>{data && data.length} Lessons (3h 50m)</h3>
                {id && isOwner && (
                    <NavLink to="/coursePlayer" state={{ id }}>
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all duration-200">
                            GO TO COURSE PLAYER
                        </button>
                    </NavLink>
                )}
            </div>
            <div className="content grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data && data.map((d, index) => (
                    <LessonCard key={index} name={d.title} num={index + 1} data={d.lessons} />
                ))}
            </div>
        </div>
    );
}
