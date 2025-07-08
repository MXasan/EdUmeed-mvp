import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar'
import HomePage from '../homePage/homePage';
import VideoPage from '../videoPage/videoPage';
import { Routes, Route } from "react-router-dom";
import Login from '../loginPage/login';
import ScrollToTop from './scrollToTop';
import Profile from '../profilePage/Profile';
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
        <ScrollToTop />
        <Navbar />
        <div className="line"></div>
        <Routes>
          <Route path="/" element={<HomePage item={item} />} />
          <Route path="/courses" element={<VideoPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </div>
    </>
  )
}

export default App
