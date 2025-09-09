import { NavLink } from "react-router-dom";
import { 
  Code, 
  Film, 
  Pen, 
  Palette, 
  Layers, 
  Image,
  Grid3X3,
  ChevronRight
} from "lucide-react";

export default function Category() {
    const categories = [
        { 
            id: "programming", 
            name: "Programming", 
            icon: Code, 
            count: 142 
        },
        { 
            id: "animation", 
            name: "Animation", 
            icon: Film, 
            count: 89 
        },
        { 
            id: "creative writing", 
            name: "Creative Writing", 
            icon: Pen, 
            count: 67 
        },
        { 
            id: "film & video", 
            name: "Film & Video", 
            icon: Film, 
            count: 234 
        },
        { 
            id: "fine art", 
            name: "Fine Art", 
            icon: Palette, 
            count: 156 
        },
        { 
            id: "graphic design", 
            name: "Graphic Design", 
            icon: Layers, 
            count: 198 
        }
    ];

    return (
        <div className="bg-slate-900 text-slate-100 h-screen transition-all duration-300 ease-in-out w-64 lg:w-64 md:w-16 sm:w-16 shadow-2xl border-r border-slate-700 relative">
            {/* Header */}
            <div className="p-4 border-b border-slate-700">
                <NavLink to={'/'} state={null} className="block group">
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-all duration-200">
                        <Grid3X3 className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
                        <h2 className="text-lg font-bold hidden md:hidden lg:block group-hover:text-blue-300 transition-colors duration-200">
                            All Categories
                        </h2>
                    </div>
                </NavLink>
            </div>

            {/* Categories List */}
            <nav className="p-4 space-y-2">
                {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                        <NavLink 
                            key={category.id}
                            to={'/'} 
                            state={{ catId: category.id }}
                            className="block group"
                        >
                            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800 hover:shadow-md transition-all duration-200 border border-transparent hover:border-slate-600">
                                <div className="flex items-center space-x-3 min-w-0 flex-1">
                                    <IconComponent className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors duration-200 flex-shrink-0" />
                                    <span className="text-sm font-medium text-slate-300 group-hover:text-slate-100 transition-colors duration-200 truncate hidden md:hidden lg:block">
                                        {category.name}
                                    </span>
                                </div>
                                
                                {/* Course count - hidden on small screens */}
                                <div className="hidden md:hidden lg:flex items-center space-x-2">
                                    <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full group-hover:bg-slate-600 transition-colors duration-200">
                                        {category.count}
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-all duration-200 group-hover:translate-x-1" />
                                </div>

                                {/* Small screen indicator dot */}
                                <div className="w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 md:block lg:hidden"></div>
                            </div>
                        </NavLink>
                    );
                })}
            </nav>

            {/* Footer info - only visible on larger screens */}
            <div className="absolute bottom-4 left-4 right-4 hidden md:hidden lg:block">
                <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                    <div className="flex items-center space-x-2 text-xs text-slate-400">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>Total: {categories.reduce((sum, cat) => sum + cat.count, 0)} courses</span>
                    </div>
                </div>
            </div>
        </div>
    );
}