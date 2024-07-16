import Navbar from "./Navbar";
import Sidebar from "./Dashboard/sidebar";
export default  function DashBoard(){
    return(
        <div className="h-screen">
        <Navbar/>
        <Sidebar/>
        </div>
    );
}