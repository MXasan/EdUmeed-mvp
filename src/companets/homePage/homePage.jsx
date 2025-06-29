import React from 'react'
import Header from './header/header'
import VideosBlock from './videosBlock/videosBlock'

const HomePage = ({ item }) => {
    return (
        <>
            <Header />
            <VideosBlock item={item} />
        </>
    )
}

export default HomePage