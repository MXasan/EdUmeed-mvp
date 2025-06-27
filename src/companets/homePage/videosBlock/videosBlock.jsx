import React from 'react'
import VideoItem from './videoItem/videoItem'
import './videos.block.css'
const VideosBlock = ({ videos }) => {
    return (
        <div className='videoBlock'>
            <h2 className='title'>Explore Courses</h2>
            <div className='videoBlockchild'>
                {videos.map((video) => (
                    <VideoItem video={video} />
                ))}
            </div>
        </div>
    )
}

export default VideosBlock