import { NavLink } from "react-router-dom"
export default function Category(){
    return(
        <>
            <div className="category rounded-md">
            <NavLink to={'/'} state={null}><h2 className="my-2 hover:bg-gray-600 p-2 rounded-md text-xl font-semibold">All Categories</h2></NavLink>
                <hr/>
                <ul>
                    <NavLink to={'/'} state={{catId:"programming"}}><li><h3 className="my-2 hover:bg-gray-600 p-2 rounded-md text-xl">Programming</h3></li></NavLink>
                    <NavLink to={'/'} state={{catId:"animation"}}><li><h3 className="my-2 hover:bg-gray-600 p-2 rounded-md text-xl">Animation</h3></li></NavLink>
                    <NavLink to={'/'} state={{catId:"creative writing"}}><li><h3 className="my-2 hover:bg-gray-600 p-2 rounded-md text-xl" >Creative Writing</h3></li></NavLink>
                    <NavLink to={'/'} state={{catId:"film & video"}}><li><h3 className="my-2 hover:bg-gray-600 p-2 rounded-md text-xl">Film & Video</h3></li></NavLink>
                    <NavLink to={'/'} state={{catId:"fine art"}}><li><h3 className="my-2 hover:bg-gray-600 p-2 rounded-md text-xl">Fine Art</h3></li></NavLink>
                    <NavLink to={'/'} state={{catId:"graphic design"}}><li><h3 className="my-2 hover:bg-gray-600 p-2 rounded-md text-xl">Graphic Design</h3></li></NavLink>
                </ul>
            </div>
        </>
    )
}