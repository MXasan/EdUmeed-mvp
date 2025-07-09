import { useRef, useState, Suspense, lazy } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import './video.css';

const ReactPlayer = lazy(() => import('react-player'));

const Video = ({ clickedItem }) => {
    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        const player = playerRef.current?.getInternalPlayer();
        if (!player) return;

        if (isPlaying) {
            player.pauseVideo?.(); // YouTube only
            setIsPlaying(false);
        } else {
            player.playVideo?.();
            setIsPlaying(true);
        }
    };

    return (
        <div className='videoPlayer'>
            <div className="videoPlayerItem">
                <Suspense fallback={<div className="loading">Загрузка видео...</div>}>
                    <ReactPlayer
                        ref={playerRef}
                        url={clickedItem.video}
                        width="100%"
                        height="100%"
                        playing={isPlaying}
                        controls={false}
                    />
                </Suspense>
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
