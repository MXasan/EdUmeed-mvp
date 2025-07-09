import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useUserProfile } from '../../hooks/useUserProfile';

import './navbar.css';

const navLinks = [
    { to: "/", label: "Home", icon: "home.svg" },
    { to: "/notes", label: "Notes", icon: "notes.svg" },
    { to: "/news", label: "News", icon: "news.svg" },
    { to: "/books", label: "Books", icon: "book.svg" },
];

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const toggleMenu = () => setMenu(!menu);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext);
    const { photo, photoPreview, loading } = useUserProfile(currentUser);

    useEffect(() => {
        if (!menu) return;

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menu]);

    const handleProfileClick = () => {
        if (!currentUser) {
            navigate("/login", { state: { from: "/" } });
        } else {
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
                        alt="Open menu"
                    />

                    <div className="bgForBody">
                        <ol ref={menuRef} className={`burger ${menu ? 'show' : ''}`}>
                            <img
                                src={`${import.meta.env.BASE_URL}image/close.svg`}
                                alt="Close menu"
                                onClick={toggleMenu}
                            />
                            <div className="line"></div>

                            {navLinks.map(({ to, label, icon }) => (
                                <li key={to}>
                                    <Link to={to} onClick={() => setMenu(false)}>
                                        <div>
                                            <img src={`${import.meta.env.BASE_URL}image/${icon}`} alt={`${label} icon`} />
                                            <p>{label}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <h2>EdUmeed</h2>
                    <ul>
                        {navLinks.map(({ to, label }) => (
                            <li key={to}>
                                <Link to={to}>{label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="infoZone">
                    <input className='inputSearch' type="text" placeholder='Search' />
                    <img
                        className='notifactionIcon'
                        src={`${import.meta.env.BASE_URL}image/notifaction.svg`}
                        alt="Notification icon"
                    />
                    {loading ? (
                        <div className="spinner"></div> // Добавь CSS .spinner или замени на любую иконку загрузки
                    ) : (
                        <img
                            className="profileIcon"
                            src={photoPreview || photo || `${import.meta.env.BASE_URL}image/profileIcon.svg`}
                            alt="Profile"
                            onClick={handleProfileClick}
                        />
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
