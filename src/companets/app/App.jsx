import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar'
import HomePage from '../homePage/homePage';
import VideoPage from '../videoPage/videoPage';
import { Routes, Route } from "react-router-dom";

import './App.css'

function App() {
  const [item, setVideos] = useState([]);
  useEffect(() => {
    fetch('../../../public/json/video.json')
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
      </div>
    </>
  )
}

export default App
