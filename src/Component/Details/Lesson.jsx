import LessonCard from './LessonCard';
export default function Lesson({data}) {
    return (
        <>
            <div className="lessons">
                <div className="title">
                    <h2 className='text-2xl'>Lessons in This Class</h2>
                    <h3 className='text-xl'>{data&&data.length} Lessons(3h 50m)</h3>
                </div>
                <div className="content">
                   {data&&data.map((d,index)=><LessonCard key={index}  name={d.title} num={index+1} data={d.lessons}/>)}
                </div>
            </div>
        </>
    )
}