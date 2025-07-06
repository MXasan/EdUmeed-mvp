import React from 'react'
import VideoItem from './videoItem/videoItem'
import { useNavigate } from 'react-router-dom'
import VideoPage from '../../videoPage/videoPage'
import './videos.block.css'

const VideosBlock = ({ item }) => {
    const navigate = useNavigate();

    const handleClick = (clickedItem) => {
        navigate('/courses', { state: { clickedItem: clickedItem, all: item } });
    };
    return (
        <div className='videoBlock'>
            <h2 className='title'>Explore Courses</h2>
            <div className='videoBlockchild'>
                {item.map((clickedItem) => (
                    <div key={clickedItem.id} onClick={() => handleClick(clickedItem)}>
                        <VideoItem
                            image={clickedItem.image}
                            name={clickedItem.name}
                            id={clickedItem.id}

                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideosBlock;
