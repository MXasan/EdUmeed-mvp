import React from 'react'
import './videoList.css'
const VideoList = ({list}) => {
  return (
    <div className='videoListParent'>
        <img className='videoListItem' src={list.image} alt={list.name} />
        <p>{list.name}</p>
    </div>
  )
}

export default VideoList