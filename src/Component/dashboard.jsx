import Navbar from "./Navbar";
import Sidebar from "./Dashboard/sidebar";
import UpdateProfile from './Dashboard/updateProfile.jsx';
import Certificate from "./Dashboard/certificate.jsx";
export default function DashBoard() {
    return (
        <div>
            <Navbar />
            <div className="h-[90vh] flex justify-between">
            <div>
                <Sidebar />
                </div>
                <div className="overflow-y-scroll flex-grow flex-wrap ">
                <UpdateProfile />              
                </div>
              
            </div>
        </div>
    );
}