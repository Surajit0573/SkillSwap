import { NavLink } from 'react-router-dom';
import LessonCard from './LessonCard';
export default function Lesson({ data, id }) {
    return (
        <>
            <div className="lessons">
                <div className="title">
                    <h2 className='text-2xl'>Lessons in This Class</h2>
                    <h3 className='text-xl'>{data && data.length} Lessons(3h 50m)</h3>
                    {id && (
                        <NavLink to="/coursePlayer" state={{ id }}>
                            <button className="bg-blue-600 p-4 m-4 rounded-md">GO TO COURSE PLAYER</button>
                        </NavLink>
                    )}

                </div>
                <div className="content">
                    {data && data.map((d, index) => <LessonCard key={index} name={d.title} num={index + 1} data={d.lessons} />)}
                </div>
            </div>
        </>
    )
}