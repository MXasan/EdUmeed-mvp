import React from 'react'
import './navbar.css'
const Navbar = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="navigation">
                    {/* <img src="" alt="" className="logo" /> */}
                    <h2>EdUmeed</h2>
                    <ul>
                        <li>Home</li>
                        <li>Courses</li>
                        <li>Mission</li>
                        <li>Comunnity</li>
                    </ul>
                </div>
                <div className="infoZone">
                    <input className='inputSearch' type="text" placeholder='Search'/>
                    <img className='notifactionIcon' src="../../../public/notifaction.svg" alt="" />
                    <img className='profileIcon' src="../../../public/profileIcon.svg" alt="" />
                    
                </div>
            </nav>
        </div>
    )
}

export default Navbar