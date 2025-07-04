import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar'
import HomePage from '../homePage/homePage';
import VideoPage from '../videoPage/videoPage';
import { Routes, Route } from "react-router-dom";
import Login from '../loginPage/login';
import './App.css'

function App() {
  const [item, setVideos] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}json/video.json`)
    .then(response => response.json())
    .then(data => setVideos(data));
  }, []);

  return (

    <>
      <div className="content">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage item={item} />} />
          <Route path="/courses" element={<VideoPage />} />
        </Routes>
        <Login />
      </div>
    </>
  )
}

export default App
