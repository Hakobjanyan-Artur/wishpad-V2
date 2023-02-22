import { useContext, useEffect, useState } from "react"
import { Routes, Route, useParams, useNavigate } from "react-router-dom"
import { ThemeContext } from "../../App"
import userImage from '../../images/user.png'
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { db } from "../../firebaseConfig/FrirebaseConfig"
import { AiOutlineUserAdd, AiOutlineUsergroupDelete } from 'react-icons/ai';
import { TbBrandTelegram } from 'react-icons/tb';
import { GoRequestChanges } from 'react-icons/go';
import { GrAggregate } from 'react-icons/gr';
import { FaUserFriends } from 'react-icons/fa';
import UserWrapper from "../../pages/UserWrapper"
import UserByClickFriends from "../userByClickFriends/UserByclickFriends"
import UserByClickImages from "../userByClickImages/UserByClickImages"
import { useDispatch, useSelector } from "react-redux"
import { addNewFriend, addNewFrinedRequest, deleteFriend, deleteFriendRequest, selectUsers, toggleUserByClick } from "../../store/slices/users/usersSlices"
import time from "../timeFunc/timeFunc"
import { avatar, cover, images } from "../imageUrl/imageUrl"
import coverImage from '../../images/background.jpg'


export default function UserByClick() {
    const { theme } = useContext(ThemeContext)
    const { id } = useParams()
    const [userByClick, setUserByClick] = useState(null)
    const [friendBtn, setFriendBtn] = useState('add')
    const { currentUser } = useSelector(selectUsers)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        userByClick?.friendRequest?.forEach((user) => {
            if (user.user === currentUser?.id) {
                setFriendBtn('request')
            }
        })
        currentUser?.friendRequest.forEach((user) => {
            if (user.user === userByClick?.id) {
                setFriendBtn('join')
            }
        })
        currentUser?.friends?.forEach((friend) => {
            if (friend.user === userByClick?.id) {
                setFriendBtn('friend')
            }
        })
    }, [userByClick?.friendRequest, currentUser?.friendRequest, currentUser?.friends])


    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }

        const q = query(collection(db, "users"), where("user_id", "==", id))
        const unsubscribe = async () => onSnapshot(q, (querySnapshot) => {
            let user = {};
            querySnapshot.forEach((doc) => {
                user = { ...doc.data(), id: doc.id }
            })
            setUserByClick(user)
            dispatch(toggleUserByClick(user))
        });
        unsubscribe()


    }, [id])

    return (
        <div className="user-by-click">
            <header className="user-by-click-header" style={{ backgroundColor: theme === 'dark' ? '' : '#000' }} >
                <div
                    style={{
                        backgroundImage: `url(${userByClick?.coverImage ? cover(userByClick?.id, userByClick?.coverImage) : coverImage})`,
                    }}
                    className="left">
                    <div className="user-image">
                        <div
                            style={{
                                backgroundColor: userByClick?.time + 5 >= time() ? 'rgb(159, 219, 53)' : '',
                            }}
                            className="isOnline"></div>
                        <img src={userByClick?.avatar ? avatar(userByClick?.id, userByClick?.avatar) : userImage} alt="" />
                    </div>
                    <div className="message">
                        <button onClick={() => navigate(`/messenger/${id}`)}><TbBrandTelegram /> Messages</button>
                    </div>
                </div>
                <div className="right">
                    <div className="top">
                        <h2>{userByClick?.name} {userByClick?.lastname}</h2>
                        {friendBtn === 'add' ? <button onClick={() => dispatch(addNewFrinedRequest({ userByClick: userByClick, currentUser: currentUser?.id }))} ><div><AiOutlineUserAdd /> add </div> </button> :
                            friendBtn === 'request' ? <button><div className="request"><GoRequestChanges /><h6>Request sent</h6></div> </button> :
                                friendBtn === 'join' ? <div className="join-refuse">
                                    <button onClick={() => dispatch(addNewFriend({ userByClick: userByClick, currentUser: currentUser }))}><div className="join"><GrAggregate /> <h5>Join</h5></div></button>
                                    <button onClick={() => dispatch(deleteFriendRequest({ currentUser: currentUser, friend: userByClick }))} ><AiOutlineUsergroupDelete /> Refusal</button>
                                </div> :
                                    <button><div className="friend"><FaUserFriends /><h6>Friend</h6></div></button>
                        }
                    </div>
                    <div className="section">
                        <h3>friends({userByClick?.friends.length})</h3>
                        <h3>Images({userByClick?.images.length})</h3>
                    </div>
                    <div className="user-info">
                        <h4>Reg: {userByClick?.dateOfReg}</h4>
                        <h4>BirthDay: {userByClick?.dateOfbirth ? userByClick?.dateOfbirth : 'Not filled'}</h4>
                        <h4>City: {userByClick?.city ? userByClick?.city : 'Not filled'}</h4>
                        <h4>Country: {userByClick?.country ? userByClick?.country : 'Not filled'}</h4>
                        <h4>Date of last activity: {userByClick?.dateOfLastActivity}</h4>
                    </div>
                </div>
            </header>
            <section>
                <Routes>
                    <Route path="/" element={<UserWrapper />}>
                        <Route index element={<UserByClickImages />} />
                        <Route path="userByClickFriends" element={<UserByClickFriends />} />
                    </Route>
                </Routes>
            </section>
        </div>
    )
}