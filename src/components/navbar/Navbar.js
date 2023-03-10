import { NavLink, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
//--------------
import logo from '../../images/logo.jpg'
import { ThemeContext } from "../../App";
import userImage from '../../images/user.png'
//-------------icons----------
import { BiHomeHeart } from "react-icons/bi";
import { FaUserFriends, FaSearch } from "react-icons/fa";
import { MdCircleNotifications, MdNotificationsActive } from "react-icons/md";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { SiWish } from "react-icons/si";
import { FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
import { selectUsers } from "../../store/slices/users/usersSlices";
import { avatarURL } from "../imageUrl/imageUrl";
import useSound from 'use-sound';
import notification from '../../Sound/notification.mp3'


export default function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const navigate = useNavigate()
    const [localCurrentUser, setCurrentUser] = useState(false)
    const { currentUser } = useSelector(selectUsers)
    const [notificationLength, setNotificationLength] = useState(0)
    const [newNot] = useSound(notification)


    useEffect(() => {
        const localCurrentUser = JSON.parse(localStorage.getItem('currentUser')) || null
        if (localCurrentUser) {
            setCurrentUser(true)
        }
        setNotificationLength(currentUser?.friendRequest?.length + currentUser?.newMessageUsers?.length)
    }, [currentUser?.friendRequest, currentUser?.newMessageUsers])

    useEffect(() => {
        if (notificationLength) {
            newNot()
        }
    }, [notificationLength])

    return (
        <div
            style={{ backgroundColor: theme === 'dark' ? '' : '#000', }}
            className="navbar">
            <div
                style={{ backgroundColor: theme === 'dark' ? '' : '#000', }}
                className="navbar-content">
                <div className="logo">
                    <img src={logo} alt="" />
                    <span className="siwish"><SiWish /></span>
                </div>
                <nav>
                    <ul>
                        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'standart'} to="/main"><BiHomeHeart /> <span className="nav-txt">Home</span></NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'standart'} to="/friend"><FaUserFriends /> <span className="nav-txt">Friends</span></NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'standart'} to="/notification">{notificationLength === 0 ? <MdCircleNotifications /> : <span className="notification-icon"><MdNotificationsActive /> <div className="quantity"><h5>{notificationLength}</h5></div></span>} <span className="nav-txt">Notification</span></NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'standart'} to="/search"><FaSearch /> <span className="nav-txt">Search</span></NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'standart'} to="/profile"><div className="nav-image"> <img src={currentUser?.avatar ? avatarURL(currentUser?.id, currentUser?.avatar) : userImage} alt="" /></div><span className="nav-txt">Profile</span></NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'standart'} to="/settings"><FiSettings /> <span className="nav-txt">Settings</span></NavLink></li>
                        <li onClick={toggleTheme} className="switch" >{theme === 'dark' ? <BsFillMoonStarsFill /> : <BsFillSunFill />} <span className="nav-txt">Switch appearance</span></li>
                        <li style={{ display: localCurrentUser ? 'block' : 'none' }} className="logout" onClick={() => { localStorage.removeItem('currentUser'); navigate('/') }}  ><CiLogout /> <span className="nav-txt">Log Out</span></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
