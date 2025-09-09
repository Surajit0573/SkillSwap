import * as React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from "../AppContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  GraduationCap, 
  Search, 
  Heart, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  ChevronDown,
  LogOut,
  UserCheck,
  Settings,
  BookOpen
} from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedin } = useContext(AppContext);
  const [isLog, setIsLog] = useState(false);
  const [isTeacher, setTeacher] = useState(false);
  const [dp, setDp] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const curr = await isLoggedin();
      setIsLog(curr);
      if (curr) {
        const response = await fetch(`${import.meta.env.VITE_URL}/api/user/getInfo`, {
          credentials: 'include',
          withCredentials: true,
        });
        if (!response.ok) {
          toast.error('Failed to fetch user data');
        } else {
          const data = await response.json();
          setTeacher(data.isTeacher);
          setDp(data.dp);
        }
      }
    }
    fetchData();
  }, [location, isLoggedin]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setClicked(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/api/user/logout`, {
        credentials: "include",
        withCredentials: true,
      });
      if (!response.ok) {
        toast.error('Failed to logout');
      } else {
        setIsLog(false);
        setClicked(false);
        toast.success('Logged out');
        navigate('/');
      }
    } catch (e) {
      toast.error('Failed to logout');
    }
  };

  async function handleClick() {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/api/user/signOutTeach`, {
        credentials: 'include',
        withCredentials: true,
      });
      const result = await response.json();
      if (!result.ok) {
        toast.error(result.message);
      } else {
        setTeacher(false);
        setClicked(false);
        toast.success('You have successfully unregistered as a teacher');
      }
    } catch (e) {
      toast.error('Something went wrong');
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
      // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />
      
      <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-gray-100 shadow-xl border-b border-slate-700/50 sticky top-0 z-50 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-18">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <NavLink to="/" className="flex items-center group">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold ml-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SkillSwap
                </h1>
              </NavLink>
              
              {/* Search Bar - Hidden on mobile */}
              <form onSubmit={handleSearch} className="hidden md:flex items-center bg-slate-800/50 rounded-lg border border-slate-600/50 focus-within:border-blue-500/50 transition-all duration-300">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-gray-100 placeholder-gray-400 px-4 py-2 w-64 lg:w-80 focus:outline-none text-sm"
                  placeholder="Search courses, topics..."
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors duration-300 flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden lg:inline text-sm">Search</span>
                </button>
              </form>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              
              {/* Navigation Links */}
              <div className="flex items-center space-x-4">
                <NavLink 
                  to="/wishlist" 
                  className="group relative p-2 hover:bg-slate-800/50 rounded-lg transition-all duration-300"
                  title="Wishlist"
                >
                  <Heart className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    0
                  </span>
                </NavLink>
                
                <NavLink 
                  to="/cart" 
                  className="group relative p-2 hover:bg-slate-800/50 rounded-lg transition-all duration-300"
                  title="Cart"
                >
                  <ShoppingCart className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    0
                  </span>
                </NavLink>
              </div>

              {/* Teacher Button */}
              {!isTeacher && (
                <NavLink to="/becomeTeach">
                  <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-sm">
                    <UserCheck className="w-4 h-4" />
                    Become Teacher
                  </button>
                </NavLink>
              )}

              {/* Sign In Button */}
              {!isLog && (
                <NavLink to="/login">
                  <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 text-sm">
                    <User className="w-4 h-4" />
                    Sign In
                  </button>
                </NavLink>
              )}

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setClicked(!clicked)}
                  className="flex items-center space-x-2 hover:bg-slate-800/50 rounded-lg p-1 transition-all duration-300"
                >
                  <img
                    src={dp || 'https://shorturl.at/3YD9s'}
                    className="w-8 h-8 rounded-full object-cover border-2 border-slate-600 hover:border-blue-400 transition-colors"
                    alt="Profile"
                  />
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${clicked ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {clicked && (
                  <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-5 duration-200">
                    <div className="px-4 py-3 border-b border-slate-600">
                      <p className="text-sm text-gray-400">Signed in as</p>
                      <p className="text-sm font-medium text-white truncate">user@example.com</p>
                    </div>
                    
                    <NavLink
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                      onClick={() => setClicked(false)}
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </NavLink>
                    
                    <NavLink
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                      onClick={() => setClicked(false)}
                    >
                      <BookOpen className="w-4 h-4" />
                      Dashboard
                    </NavLink>
                    
                    {isTeacher && (
                      <button
                        onClick={handleClick}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-slate-700 hover:text-white transition-colors text-left"
                      >
                        <UserCheck className="w-4 h-4" />
                        Sign Out as Teacher
                      </button>
                    )}
                    
                    <div className="border-t border-slate-600 mt-2 pt-2">
                      {isLog ? (
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      ) : (
                        <NavLink
                          to="/login"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                          onClick={() => setClicked(false)}
                        >
                          <User className="w-4 h-4" />
                          Sign In
                        </NavLink>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              <NavLink to="/wishlist" className="p-2">
                <Heart className="w-5 h-5 text-red-400" />
              </NavLink>
              <NavLink to="/cart" className="p-2">
                <ShoppingCart className="w-5 h-5 text-blue-400" />
              </NavLink>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="flex items-center bg-slate-800/50 rounded-lg border border-slate-600/50">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-gray-100 placeholder-gray-400 px-4 py-2 flex-1 focus:outline-none text-sm"
                placeholder="Search courses, topics..."
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-700 bg-slate-800/95 backdrop-blur-lg">
            <div className="px-4 py-4 space-y-4">
              
              {/* Profile Section */}
              <div className="flex items-center gap-3 pb-4 border-b border-slate-600">
                <img
                  src={dp || 'https://shorturl.at/3YD9s'}
                  className="w-10 h-10 rounded-full object-cover border-2 border-slate-600"
                  alt="Profile"
                />
                <div>
                  <p className="text-sm font-medium text-white">Welcome back!</p>
                  <p className="text-xs text-gray-400">user@example.com</p>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-2">
                <NavLink
                  to="/profile"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5 text-blue-400" />
                  <span>My Profile</span>
                </NavLink>
                
                <NavLink
                  to="/dashboard"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  <span>Dashboard</span>
                </NavLink>

                {!isTeacher && (
                  <NavLink
                    to="/becomeTeach"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserCheck className="w-5 h-5 text-purple-400" />
                    <span>Become Teacher</span>
                  </NavLink>
                )}

                {isTeacher && (
                  <button
                    onClick={() => {
                      handleClick();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition-colors text-left"
                  >
                    <UserCheck className="w-5 h-5 text-yellow-400" />
                    <span>Sign Out as Teacher</span>
                  </button>
                )}

                {isLog ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5 text-green-400" />
                    <span>Sign In</span>
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}