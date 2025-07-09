
const VideoItem = ({ image, name }) => {
  return (
    <div className='videoItem-parent'>
      <img className='videoItem-image' src={image} alt={name} />
      <p className='videoItem-name'>{name}</p>
    </div>
  )
}

export default VideoItem