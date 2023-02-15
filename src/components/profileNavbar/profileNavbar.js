import { NavLink } from "react-router-dom"
import { BsInfoCircle, BsImages } from 'react-icons/bs';

export default function ProfileNavbar() {
    return (
        <div className="profile-navbar">
            <ul>
                <li><NavLink className={({ isActive }) => isActive ? 'active' : 'standart'} to={`/profile/`}><BsInfoCircle /><span className="nav-txt">Info</span></NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'active' : 'standart'} to={`/profile/profileImages`}><BsImages /><span className="nav-txt">Images</span></NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'active' : 'standart'} to={`/profile/profilePosts`}><BsImages /><span className="nav-txt">For all</span></NavLink></li>
            </ul>
        </div>
    )
}