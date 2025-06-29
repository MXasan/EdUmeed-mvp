import React from 'react'

const VideoItem = ({image, name, id }) => {
  return (
    <div className='videoItem-parent'>
        <img className='videoItem-image' src={image} alt={name} />
        <p className='videoItem-name'>{name}</p>
        <p className='videoItem-name'>{id}</p>
    </div>
  )
}

export default VideoItem