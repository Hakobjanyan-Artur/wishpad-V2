import { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import coverImage from '../../images/background.jpg'
import userImage from '../../images/user.png'
import { selectUsers } from '../../store/slices/users/usersSlices'
import { MdAddAPhoto } from 'react-icons/md';
import ProfileWrapper from '../../pages/profileWrapper'
import ProfileInfo from '../profileInfo/profileInfo'
import ProfileFriends from '../profileFriends/profileFriends'
import ProfileImages from '../profileImages/profileImages'
import { ThemeContext } from '../../App'

export default function Profile() {
    const { currentUser } = useSelector(selectUsers)
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
    },)

    return (
        <div className="profile">
            <header
                style={{
                    background: theme === 'dark' ? 'linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 40%, rgba(33, 92, 243, 0.9682247899159664) 100%)' : 'linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 40%, rgba(0, 0, 0, 0.9682247899159664) 100%)'
                }}
            >
                <div
                    style={{
                        backgroundImage: `url(${coverImage})`
                    }}
                    className="header-top">
                    <button><MdAddAPhoto /> Edit cover photo</button>
                </div>
                <div className="header-section">
                    <div className='header-section-image'>
                        <img src={userImage} alt="" />
                    </div>
                    <div className='currentUser-info'>
                        <h1>{currentUser?.name} {currentUser?.lastname}</h1>
                        <h2>{currentUser?.userName}</h2>
                    </div>
                    <button><MdAddAPhoto /> Edit profile photo</button>
                </div>
            </header>
            <section>
                <Routes>
                    <Route path='/' element={<ProfileWrapper />}>
                        <Route index element={<ProfileInfo />} />
                        <Route path='profileFriends' element={<ProfileFriends />} />
                        <Route path='profileImages' element={<ProfileImages />} />
                    </Route>
                </Routes>
            </section>
        </div>
    )
}