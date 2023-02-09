import { NavLink, useParams } from "react-router-dom"
import { FaUserFriends } from 'react-icons/fa';
import { RiGalleryFill } from 'react-icons/ri';

export default function UserNavbar() {

    const { id } = useParams()

    return (
        <div className="user-navbar">
            <ul>
                <li><NavLink className={({ isActive }) => isActive ? 'active' : 'standart'} to={`/userByClick/${id}/`}><RiGalleryFill /><span className="nav-txt">Images</span></NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? 'active' : 'standart'} to={`/userByClick/${id}/userByClickFriends`}><FaUserFriends /><span className="nav-txt">Friends</span></NavLink></li>
            </ul>
        </div>
    )
}