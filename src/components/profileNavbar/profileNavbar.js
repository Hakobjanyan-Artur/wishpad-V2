import { NavLink } from "react-router-dom"
import { BsInfoCircle, BsImages } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';

export default function ProfileNavbar() {
    return (
        <div className="profile-navbar">
            <ul>
                <li><NavLink className={({ isActive }) => isActive ? 'active' : 'standart'} to={`/profile/`}><BsInfoCircle /><span className="nav-txt">Info</span></NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'active' : 'standart'} to={`/profile/profileFriends`}><FaUserFriends /><span className="nav-txt">Friends</span></NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'active' : 'standart'} to={`/profile/profileImages`}><BsImages /><span className="nav-txt">Images</span></NavLink></li>
            </ul>
        </div>
    )
}