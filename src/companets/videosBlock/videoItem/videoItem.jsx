import React from 'react'

const VideoItem = ({video}) => {
  return (
    <div className='videoItem-parent'>
        <img className='videoItem-image' src={video.image} alt={video.name} />
        <p className='videoItem-name'>{video.name}</p>
    </div>
  )
}

export default VideoItem