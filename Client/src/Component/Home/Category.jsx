import { NavLink } from "react-router-dom";

export default function Category() {
    return (
        <div className="bg-gray-800 text-gray-100 p-2 rounded-md shadow-md w-3/12">
            <NavLink to={'/'} state={null}>
                <h2 className="text-2xl font-semibold mb-4 p-2 rounded-md hover:bg-gray-700 transition-colors duration-300">
                    All Categories
                </h2>
            </NavLink>
            <hr className="border-gray-700 mb-4"/>
            <ul className="space-y-2">
                <NavLink to={'/'} state={{ catId: "programming" }}>
                    <li>
                        <h3 className="text-xl p-2 rounded-md hover:bg-gray-700 transition-colors duration-300">
                            Programming
                        </h3>
                    </li>
                </NavLink>
                <NavLink to={'/'} state={{ catId: "animation" }}>
                    <li>
                        <h3 className="text-xl p-2 rounded-md hover:bg-gray-700 transition-colors duration-300">
                            Animation
                        </h3>
                    </li>
                </NavLink>
                <NavLink to={'/'} state={{ catId: "creative writing" }}>
                    <li>
                        <h3 className="text-xl p-2 rounded-md hover:bg-gray-700 transition-colors duration-300">
                            Creative Writing
                        </h3>
                    </li>
                </NavLink>
                <NavLink to={'/'} state={{ catId: "film & video" }}>
                    <li>
                        <h3 className="text-xl p-2 rounded-md hover:bg-gray-700 transition-colors duration-300">
                            Film & Video
                        </h3>
                    </li>
                </NavLink>
                <NavLink to={'/'} state={{ catId: "fine art" }}>
                    <li>
                        <h3 className="text-xl p-2 rounded-md hover:bg-gray-700 transition-colors duration-300">
                            Fine Art
                        </h3>
                    </li>
                </NavLink>
                <NavLink to={'/'} state={{ catId: "graphic design" }}>
                    <li>
                        <h3 className="text-xl p-2 rounded-md hover:bg-gray-700 transition-colors duration-300">
                            Graphic Design
                        </h3>
                    </li>
                </NavLink>
            </ul>
        </div>
    );
}
