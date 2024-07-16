export default function Sidebar() {
    return (
        <div className="w-80 h-[89%] bg-[#31363F] flex flex-col justify-between">
            <div className="flex flex-col">
                <div className="border-solid border-2 p-4 text-2xl hover:bg-blue-500">Update Basic Details</div>
                <div className="border-solid border-2 p-4 text-2xl hover:bg-blue-500">Certificates</div>
                <div className="border-solid border-2 p-4 text-2xl hover:bg-blue-500">My Courses</div>
            </div>
            <div className="border-solid border-2 border-red-600 text-red-600 p-4 text-2xl hover:bg-red-500 hover:text-black">Delete Your Account</div>
        </div>
    );
}