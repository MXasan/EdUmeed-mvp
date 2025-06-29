import React from 'react'
import { Link } from "react-router-dom";

import './navbar.css'
const Navbar = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="navigation">
                    {/* <img src="" alt="" className="logo" /> */}
                    <h2>EdUmeed</h2>
                    <ul>

                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/courses">Courses</Link></li>
                        <li><Link to="/smt">News</Link></li>
                        <li><Link to="/smt">Books</Link></li>
                    </ul>
                </div>
                <div className="infoZone">
                    <input className='inputSearch' type="text" placeholder='Search' />
                    <img className='notifactionIcon' src="../../../public/image/notifaction.svg" alt="" />
                    <img className='profileIcon' src="../../../public/image/profileIcon.svg" alt="" />

                </div>
            </nav>
        </div>
    )
}

export default Navbar