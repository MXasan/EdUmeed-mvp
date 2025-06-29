import React from 'react'
import ReactPlayer from 'react-player';
import './video.css'
const Video = ({ clickedItem }) => {
    return (
        <div className='videoPlayer'>
            <ReactPlayer
                url={clickedItem.video}
                width="100%"
                height="100%"
            />
            <p>{clickedItem.name}</p>
        </div>
    )
}

export default Video