import React, { useContext } from 'react';
import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useUserProfile } from "../../hooks/useUserProfile";


import './navbar.css'

const Navbar = () => {
    const [menu, setMenu] = useState(false)
    const toggleMenu = () => setMenu(!menu);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();


    const { photo, photoPreview, loading } = useUserProfile(currentUser);


    const menuRef = useRef(null); // Ссылка на меню

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenu(false); // Закрыть меню при клике вне него
            }
        };

        if (menu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menu]);

    const handleClick = () => {
        if (!currentUser) {
            // пользователь не авторизован → отправляем на login и запоминаем, откуда пришёл
            navigate("/login", { state: { from: "/" } });
        } else {
            // пользователь авторизован → показываем курс
            navigate("/profile");
        }
    };
    return (
        <div>
            <nav className="navbar">
                <div className="navigation">
                    <img
                        className={`burger ${menu ? 'open' : ''}`}
                        onClick={toggleMenu}
                        src={`${import.meta.env.BASE_URL}image/hamburgermenu.svg`}
                        alt="menu"
                    />

                    <div className='bgForBody'>
                        <ol
                            ref={menuRef}
                            className={`burger ${menu ? 'show' : ''}`}
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}image/close.svg`}
                                alt="close"
                                onClick={toggleMenu}
                            />
                            <div className="line"></div>

                            <li><Link to="/" onClick={() => setMenu(false)}><div><img src={`${import.meta.env.BASE_URL}image/home.svg`} alt="home page" /><p>Home</p></div></Link></li>
                            <li><Link to="/courses" onClick={() => setMenu(false)}><div><img src={`${import.meta.env.BASE_URL}image/notes.svg`} alt="notes page" /><p>Notes</p></div></Link></li>
                            <li><Link to="/smt" onClick={() => setMenu(false)}><div><img src={`${import.meta.env.BASE_URL}image/news.svg`} alt="" /><p>News</p></div></Link></li>
                            <li><Link to="/smt" onClick={() => setMenu(false)}><div><img src={`${import.meta.env.BASE_URL}image/book.svg`} alt="" /><p>Books</p></div></Link></li>
                        </ol>
                    </div>

                    <h2>EdUmeed</h2>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/notes">Notes</Link></li>
                        <li><Link to="/news">News</Link></li>
                        <li><Link to="/books">Books</Link></li>
                    </ul>
                </div>

                <div className="infoZone">
                    <input className='inputSearch' type="text" placeholder='Search' />
                    <img className='notifactionIcon' src={`${import.meta.env.BASE_URL}image/notifaction.svg`} alt="notifaction" />
                    {!loading && (
                        <img
                            className="profileIcon"
                            src={photoPreview || photo || `${import.meta.env.BASE_URL}image/profileIcon.svg`}
                            alt="profile"
                        />
                    )}

                </div>
            </nav>
        </div>
    )
}

export default Navbar;
