import React from 'react'
// import Header from './header/header'
import VideosBlock from './videosBlock/videosBlock'
import CardSwap, { Card } from './CardSwap/CardSwap'

const HomePage = ({ item }) => {
    return (
        <div className='HomePage'>
            {/* <Header /> */}
            <div className='parentCardSwap'>

                <div style={{ height: '600px', position: 'relative' }}>
                    <CardSwap
                        cardDistance={60}
                        verticalDistance={70}
                        delay={5000}
                        pauseOnHover={false}
                    >
                        <Card>
                            <h3>Card 1</h3>
                            <p>Your content here</p>
                        </Card>
                        <Card>
                            <h3>Card 2</h3>
                            <p>Your content here</p>
                        </Card>
                        <Card>
                            <h3>Card 3</h3>
                            <p>Your content here</p>
                        </Card>
                    </CardSwap>

                </div>
            </div>

            <VideosBlock item={item} />
        </div>
    )
}

export default HomePage