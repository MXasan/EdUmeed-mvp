import React from 'react'
import { useNavigate } from 'react-router-dom'

import './videoList.css'
const VideoList = ({ list, all }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/courses', { state: { clickedItem: list, all } });
    };
    return (
        <div className='videoListParent' onClick={handleClick}>
            <img className='videoListItem'
                src={list.image}
                alt={list.name}
            />
            <p>{list.name}</p>
        </div>
    )
}

export default VideoList