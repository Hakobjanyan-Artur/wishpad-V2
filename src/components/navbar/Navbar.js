import { NavLink, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
//--------------
import logo from '../../images/logo.jpg'
import { ThemeContext } from "../../App";
//-------------icons----------
import { BiHomeHeart } from "react-icons/bi";
import { FaUserFriends, FaTelegramPlane, FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { SiWish } from "react-icons/si";
import { FiSettings } from "react-icons/fi";


export default function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(false)


    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null
        if (currentUser) {
            setCurrentUser(true)
        }
    }, [])

    return (
        <div
            style={{ backgroundColor: theme === 'dark' ? '' : '#000', }}
            className="navbar">
            <div className="logo">
                <img src={logo} alt="" />
                <span className="siwish"><SiWish /></span>
            </div>
            <nav>
                <ul>
                    <li><NavLink className={({ isActive }) => isActive ? 'active' : 'standart'} to="/main"><BiHomeHeart /> <span className="nav-txt">Home</span></NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? 'active' : 'standart'} to="/friend"><FaUserFriends /> <span className="nav-txt">Friends</span></NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? 'active' : 'standart'} to="/messages"><FaTelegramPlane /> <span className="nav-txt">Messages</span></NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? 'active' : 'standart'} to="/search"><FaSearch /> <span className="nav-txt">Search</span></NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? 'active' : 'standart'} to="/profile"><CgProfile /> <span className="nav-txt">Profile</span></NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? 'active' : 'standart'} to="/settings"><FiSettings /> <span className="nav-txt">Settings</span></NavLink></li>
                    <li onClick={toggleTheme} className="switch" >{theme === 'dark' ? <BsFillMoonStarsFill /> : <BsFillSunFill />} <span className="nav-txt">Switch appearance</span></li>
                    <li style={{ display: currentUser ? 'block' : 'none' }} className="logout" onClick={() => { localStorage.removeItem('currentUser'); navigate('/') }}  ><CiLogout /> <span className="nav-txt">Log Out</span></li>
                </ul>
            </nav>
        </div>
    )
}
