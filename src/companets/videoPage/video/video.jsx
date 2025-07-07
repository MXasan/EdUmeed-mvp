import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause } from 'react-icons/fa';
import './video.css';

const Video = ({ clickedItem }) => {
    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        if (isPlaying) {
            playerRef.current?.getInternalPlayer()?.pauseVideo?.(); // для YouTube
            setIsPlaying(false);
        } else {
            playerRef.current?.getInternalPlayer()?.playVideo?.(); // для YouTube
            setIsPlaying(true);
        }
    };

    return (
        <div className='videoPlayer'>
            <div className="videoPlayerItem">
                <ReactPlayer
                    ref={playerRef}
                    url={clickedItem.video}
                    width="100%"
                    height="100%"
                    playing={isPlaying}
                    controls={false}
                />
                <button className="customPlayButton" onClick={handlePlayPause}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
            </div>
            <p>{clickedItem.name}</p>
            <div className="line"></div>
        </div>
    );
};

export default Video;
