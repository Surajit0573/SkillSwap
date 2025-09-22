import Content from '../Home/Content';

export default function Related() {
    return (
        <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-6 lg:p-8 shadow-2xl border border-blue-500/20">
            <div className="mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 flex items-center gap-3">
                    <i className="fa-solid fa-lightbulb text-cyan-400"></i>
                    Related Courses
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                <p className="text-gray-400 mt-4">
                    Expand your learning journey with these recommended courses
                </p>
            </div>
            <Content />
        </div>
    );
}
