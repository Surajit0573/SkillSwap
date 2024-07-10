import LessonCard from './LessonCard';
export default function Lesson() {
    return (
        <>
            <div className="lessons">
                <div className="title">
                    <h2>Lessons in This Class</h2>
                    <h3>22 Lessons(3h 50m)</h3>
                </div>
                <div className="content">
                    <LessonCard/>
                    <LessonCard/>
                    <LessonCard/>
                    <LessonCard/>
                    <LessonCard/>
                    <LessonCard/>
                    <LessonCard/>
                </div>
            </div>
        </>
    )
}