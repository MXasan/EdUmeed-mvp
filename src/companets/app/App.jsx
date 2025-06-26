import React, { useEffect, useState } from 'react';
import Header from '../header/header'
import Navbar from '../navbar/navbar'
import VideosBlock from '../videosBlock/videosBlock'
import './App.css'

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('../../../public/json/video.json')
      .then(response => response.json())
      .then(data => setVideos(data));
  }, []);


  return (

    <>

      <div className="content">
        <Navbar />
        <Header />
        <VideosBlock videos={videos} />
      </div>
    </>
  )
}

export default App
