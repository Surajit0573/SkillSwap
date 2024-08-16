import Navbar from "./Navbar";
import Body from './Home/Body';

export default function Home() {
    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen">
            <Navbar />
            <Body />
        </div>
    );
}
