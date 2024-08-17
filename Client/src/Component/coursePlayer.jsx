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

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function CoursePlayer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [width, setWidth] = useState(314);
  const resizableRef = useRef(null);
  const [publicId, setPublicId] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
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
    console.log(e);
    const startX = e.clientX;
    const startWidth = width;

    const handleMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
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

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex h-[90%]">
        <div
          className="h-full bg-[#31363F] flex flex-col overflow-y-scroll custom-scrollbar overflow-x-hidden relative"
          style={{ width: `${width}px` }}
          ref={resizableRef}
        >
          <div className="relative h-fit">
            <div className="min-w-[500px]">
              {data && data.sections.map((d, index) => (
                <LessonCard key={index} name={d.title} num={index + 1} data={d.lessons} id={data._id} />
              ))}
            </div>
            <div
              className="absolute top-0 right-0 bottom-0 w-[3px] min-h-screen flex grow bg-blue-600 cursor-ew-resize"
              onMouseDown={handleMouseDown}
            ></div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center grow p-4">
          {publicId && publicId.split('/')[0] != "video" && <div className="flex justify-between w-3/4 mb-4 items-center">

            <div className="flex items-center">
              <button onClick={() => setScale(scale - 0.1)} className="mx-2 bg-blue-600 p-2 rounded-md  ">
                <i class="fa-solid fa-minus"></i>
              </button>
              <button onClick={() => setScale(scale + 0.1)} className="mx-2 bg-blue-600 p-2 rounded-md">
                <i class="fa-solid fa-plus"></i>
              </button></div>

            <div className="flex items-center">
              <button disabled={pageNumber <= 1} onClick={() => setPageNumber(pageNumber - 1)} className="mx-2 bg-blue-600 p-2 rounded-md disabled:bg-blue-950 disabled:text-gray-500 ">
                Previous
              </button>
              <p className="">
                Page {pageNumber} of {numPages}
              </p>
              <button disabled={pageNumber >= numPages} onClick={() => setPageNumber(pageNumber + 1)} className="mx-2 bg-blue-600 p-2 rounded-md  disabled:bg-blue-950 disabled:text-gray-500">
                Next
              </button></div>
          </div>}

          {publicId && publicId.split('/')[0] == "video" ? <VideoPlayer
            id="player2"
            publicId={publicId}
            className='h-[85vh] w-full'
          /> : <div className="h-[85vh] overflow-y-scroll">
            <Document file={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/v1721072970/${publicId}.pdf`}
              onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} scale={scale} height={2000} />
            </Document>
          </div>}
        </div>
      </div>
    </div>
  );

}