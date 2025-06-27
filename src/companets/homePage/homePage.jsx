import React from 'react'
import Header from './header/header'
import VideosBlock from './videosBlock/videosBlock'

const HomePage = ({ videos }) => {
    return (
        <>
            <Header />
            <VideosBlock videos={videos} />
        </>
    )
}

export default HomePage