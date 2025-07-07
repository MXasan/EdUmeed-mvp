import React, { useContext } from 'react';
import VideoItem from './videoItem/videoItem'
import { useNavigate } from 'react-router-dom'
import VideoPage from '../../videoPage/videoPage'
import { AuthContext } from '../../../context/AuthContext'
import './videos.block.css'

const VideosBlock = ({ item }) => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const handleClick = (clickedItem) => {
        if (!currentUser) {
            // пользователь не авторизован → отправляем на login и запоминаем, откуда пришёл
            navigate("/login", { state: { from: "/course" } });
        } else {
            // пользователь авторизован → показываем курс
            navigate("/courses", { state: { clickedItem: clickedItem, all: item } });
        }
    };
    return (
        <div className='videoBlock'>
            <h2 className='title'>Explore Courses</h2>
            <div className='videoBlockchild'>
                {item.map((clickedItem) => (
                    <div key={clickedItem.id} onClick={() => handleClick(clickedItem)}>
                        <VideoItem
                            image={clickedItem.image}
                            name={clickedItem.name}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideosBlock;
