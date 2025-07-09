import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Video from './video/video'
import VideoList from './videoList/videoList';
import './videoPage.css'

const VideoPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const clickedItem = location.state?.clickedItem;
    const all = location.state?.all || [];

    useEffect(() => {
        if (!clickedItem) {
            navigate('/');
        }
    }, [clickedItem, navigate]);

    if (!clickedItem) return null;

    const otherVideos = all.filter(video => video.id !== clickedItem.id);
    return (
        <div className='videoPage'>
            <Video clickedItem={clickedItem} />
            <div className='videoListInPage'>
                {otherVideos.map((list) => (
                    <VideoList list={list} all={all} />
                ))}
            </div>

        </div>
    );
};

export default VideoPage;
