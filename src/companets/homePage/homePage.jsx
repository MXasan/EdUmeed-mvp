import React from 'react'
import VideosBlock from './videosBlock/videosBlock'

import CardSwap, { Card } from './CardSwap/CardSwap'
import FeedbackForm from './feedbackForm/FeedbackForm'
import AllFeedbacks from './allFeedbacks/allFeedBacks'
const HomePage = ({ item }) => {
    return (
        <div className='HomePage'>
            {/* <Header /> */}
            <div className='parentCardSwap'>
                <div className="infoCardSwap">
                    <h1>EdUmeed - Education <br /> is hope</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />
                        Consequatur dolorem fuga repudiandae. Distinctio recusandae
                    </p>
                </div>


                <div style={{ height: '500px', position: 'relative' }}>
                    <CardSwap
                        cardDistance={60}
                        verticalDistance={70}
                        delay={5000}
                        pauseOnHover={false}
                    >
                        <Card>
                            <h3>Card 1</h3>
                            <div className="line"></div>
                            <img className='imgCard' src={`${import.meta.env.BASE_URL}image/cardS1.jpg`} alt="Card 1" />

                            <p>vev</p>
                        </Card>
                        <Card>
                            <h3>Card 2</h3>
                            <div className="line"></div>
                            <img className='imgCard' src={`${import.meta.env.BASE_URL}image/cardS2.jpg`} alt="Card 1" />


                        </Card>
                        <Card>
                            <h3>Card 3</h3>
                            <div className="line"></div>
                            <img className='imgCard' src={`${import.meta.env.BASE_URL}image/cardS3.jpg`} alt="Card 1" />


                        </Card>
                    </CardSwap>

                </div>
            </div>

            <VideosBlock item={item} />
            <FeedbackForm />
            <AllFeedbacks />
        </div>
    )
}

export default HomePage