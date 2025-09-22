import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../AppContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";
import LessonCard from './coursePlayerCard.jsx';
import VideoPlayer from "./videoPlayer.jsx";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import Footer from "./footer.jsx";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function CoursePlayer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [width, setWidth] = useState(380);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const resizableRef = useRef(null);
  const [publicId, setPublicId] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check for mobile screen
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setWidth(320);
        setIsCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function extractCloudinaryPath(url) {
    if (url && url.length > 0) {
      console.log("URL : ", url);
      const dotParts = url.split('.');
      const secondLastPart = dotParts[dotParts.length - 2];
      const parts = secondLastPart.split('/');
      const extractedPath = parts.slice(-2).join('/');
      return extractedPath;
    }
  }

  const handleMouseDown = (e) => {
    if (isMobile) return;
    
    const startX = e.clientX;
    const startWidth = width;

    const handleMouseMove = (e) => {
      const newWidth = Math.max(280, Math.min(600, startWidth + (e.clientX - startX)));
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const { state } = location;
    console.log(state);
    if (!(state && state.id)) {
      navigate('/');
      return;
    }
    const { id } = state;
    console.log(id);
    
    async function fetchData() {
      const responce = await fetch(`${import.meta.env.VITE_URL}/api/courses/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        withCredentials: true,
      });
      const result = await responce.json();
      if (result.ok) {
        console.log(result.data);
        setData(result.data);
        const currpublicId = state.publicId || extractCloudinaryPath(result.data.sections[0].lessons[0].url);
        console.log("PublicID :", currpublicId.split('/')[0]);
        setPublicId(currpublicId);
        return;
      } else {
        toast.error(result.message);
        if (result.redirect) {
          navigate(result.redirect);
          return;
        }
        navigate('/');
        return;
      }
    }
    
    try {
      fetchData();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  }, [location]);

  const isVideo = publicId && publicId.split('/')[0] === "video";

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      
      <div className="flex h-[calc(100vh-64px)] relative">
        {/* Sidebar */}
        <div
          className={`
            transition-all duration-300 ease-in-out bg-slate-800/95 backdrop-blur-lg
            ${isCollapsed && isMobile ? 'fixed z-50 left-0 top-16 h-[calc(100vh-64px)] shadow-2xl' : ''}
            ${isCollapsed && !isMobile ? 'w-0 overflow-hidden' : ''}
            ${!isCollapsed ? 'relative border-r border-slate-700/50' : ''}
          `}
          style={{ 
            width: isCollapsed && !isMobile ? '0px' : isMobile ? '320px' : `${width}px`,
            transform: isCollapsed && isMobile ? 'translateX(-100%)' : 'translateX(0)'
          }}
        >
          <div className="h-full flex flex-col relative">
            
            {/* Sidebar Header */}
            <div className="p-6 border-b border-slate-700/50 bg-gradient-to-r from-purple-600/10 to-blue-600/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                    </svg>
                  </div>
                  <h2 className="text-white font-bold text-lg">Course Content</h2>
                </div>
                <button
                  onClick={toggleSidebar}
                  className="p-2.5 rounded-xl bg-slate-700/50 hover:bg-slate-600/60 transition-all duration-200 text-slate-300 hover:text-white group"
                >
                  <svg 
                    className={`w-5 h-5 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''} group-hover:scale-110`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
              
              {data && (
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-slate-700/30 px-3 py-1.5 rounded-lg">
                    <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span className="text-slate-300 font-medium">
                      {data.sections.reduce((acc, section) => acc + section.lessons.length, 0)} lessons
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-700/30 px-3 py-1.5 rounded-lg">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                    </svg>
                    <span className="text-slate-300 font-medium">
                      {data.sections.length} sections
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Lessons Container */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
              {data && data.sections.map((section, index) => (
                <LessonCard 
                  key={index} 
                  name={section.title} 
                  num={index + 1} 
                  data={section.lessons} 
                  id={data._id} 
                />
              ))}
            </div>

            {/* Resize Handle - Desktop Only */}
            {!isMobile && !isCollapsed && (
              <div
                className="absolute top-0 right-0 bottom-0 w-1 bg-purple-500/20 hover:bg-purple-500/40 cursor-ew-resize transition-all duration-200 hover:w-2 group"
                onMouseDown={handleMouseDown}
              >
                <div className="absolute inset-y-0 right-0 w-1 bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-slate-900/50 relative">
          
          {/* Top Controls */}
          <div className="p-6 bg-slate-800/80 backdrop-blur-lg border-b border-slate-700/50">
            <div className="flex items-center justify-between flex-wrap gap-4">
              
              {/* Left Controls */}
              <div className="flex items-center gap-4">
                {(isCollapsed || isMobile) && (
                  <button
                    onClick={toggleSidebar}
                    className="p-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 border border-purple-500/30 text-purple-300 hover:text-purple-200 transition-all duration-200 group"
                  >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                )}
                
                <div className="flex items-center gap-3 bg-slate-700/40 px-4 py-2.5 rounded-xl border border-slate-600/50">
                  <div className={`w-3 h-3 rounded-full ${isVideo ? 'bg-red-400' : 'bg-blue-400'} animate-pulse`}></div>
                  <svg className={`w-5 h-5 ${isVideo ? 'text-red-400' : 'text-blue-400'}`} fill="currentColor" viewBox="0 0 20 20">
                    {isVideo ? (
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                    ) : (
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"/>
                    )}
                  </svg>
                  <span className="text-white font-semibold">
                    {isVideo ? 'Video Lesson' : 'PDF Document'}
                  </span>
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-3">
                {!isVideo && (
                  <>
                    {/* PDF Controls */}
                    <div className="flex items-center bg-slate-700/40 rounded-xl p-1 border border-slate-600/50">
                      <button 
                        onClick={() => setScale(Math.max(0.5, scale - 0.1))} 
                        className="p-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 transition-all duration-200 hover:scale-105"
                        title="Zoom Out"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      
                      <div className="px-4 py-2 text-slate-300 text-sm font-medium min-w-[70px] text-center bg-slate-600/30 mx-1 rounded">
                        {Math.round(scale * 100)}%
                      </div>
                      
                      <button 
                        onClick={() => setScale(Math.min(3, scale + 0.1))} 
                        className="p-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 transition-all duration-200 hover:scale-105"
                        title="Zoom In"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    {/* Page Navigation */}
                    <div className="flex items-center bg-slate-700/40 rounded-xl p-1 border border-slate-600/50">
                      <button 
                        disabled={pageNumber <= 1} 
                        onClick={() => setPageNumber(pageNumber - 1)} 
                        className="p-2.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 disabled:bg-slate-600/20 disabled:text-slate-500 text-purple-300 transition-all duration-200 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      <div className="px-4 py-2 text-slate-300 text-sm font-medium min-w-[90px] text-center bg-slate-600/30 mx-1 rounded">
                        {pageNumber} / {numPages || 0}
                      </div>
                      
                      <button 
                        disabled={pageNumber >= numPages} 
                        onClick={() => setPageNumber(pageNumber + 1)} 
                        className="p-2.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 disabled:bg-slate-600/20 disabled:text-slate-500 text-purple-300 transition-all duration-200 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
                
                {/* Fullscreen Toggle */}
                <button
                  onClick={toggleFullscreen}
                  className="p-3 rounded-xl bg-slate-700/40 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-all duration-200 border border-slate-600/50 hover:border-slate-500/50 hover:scale-105"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isFullscreen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3 3m6 6v4.5M9 15H4.5M9 15L3 21m6-6h4.5M15 9v4.5m0-4.5H19.5M15 9L21 3m-6 6h4.5M15 15v4.5M15 15H19.5M15 15L21 21" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Content Display */}
          <div className={`flex-1 flex items-center justify-center p-6 relative ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-900' : ''}`}>
            {publicId ? (
              isVideo ? (
                <div className="w-full h-full max-w-7xl rounded-2xl overflow-hidden shadow-2xl border border-slate-700/30">
                  <VideoPlayer
                    id="player2"
                    publicId={publicId}
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="max-h-full overflow-auto bg-white rounded-2xl shadow-2xl border border-slate-600/30">
                    <Document 
                      file={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/v1721072970/${publicId}.pdf`}
                      onLoadSuccess={onDocumentLoadSuccess}
                      className="max-w-full"
                      loading={
                        <div className="flex items-center justify-center p-8">
                          <div className="animate-spin w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full"></div>
                        </div>
                      }
                    >
                      <Page 
                        pageNumber={pageNumber} 
                        scale={scale}
                        className="shadow-lg"
                      />
                    </Document>
                  </div>
                </div>
              )
            ) : (
              <div className="text-center">
                <div className="animate-spin w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full mx-auto mb-6"></div>
                <p className="text-slate-300 text-lg">Loading content...</p>
              </div>
            )}

            {/* Fullscreen Exit Button */}
            {isFullscreen && (
              <button
                onClick={toggleFullscreen}
                className="absolute top-6 right-6 p-4 rounded-2xl bg-black/60 hover:bg-black/80 text-white transition-all duration-200 z-10 backdrop-blur-sm border border-white/10 hover:scale-105"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobile && !isCollapsed && (
          <div 
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={toggleSidebar}
          />
        )}
      </div>
      
      <Footer />
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: 'rgba(15, 23, 42, 0.95)',
          color: '#f1f5f9',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '12px',
          backdropFilter: 'blur(16px)',
        }}
      />

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.5) rgba(15, 23, 42, 0.3);
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(139, 92, 246, 0.6), rgba(59, 130, 246, 0.6));
          border-radius: 4px;
          border: 1px solid rgba(15, 23, 42, 0.2);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(139, 92, 246, 0.8), rgba(59, 130, 246, 0.8));
        }
      `}</style>
    </div>
  );
}