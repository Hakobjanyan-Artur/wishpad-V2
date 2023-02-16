import { useNavigate } from "react-router-dom";
import TopUser from "../topUser/TopUser";
import userImage from '../../images/user.png'
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers, toggleUser } from "../../store/slices/users/usersSlices";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebaseConfig/FrirebaseConfig";
import { FaTelegramPlane } from "react-icons/fa";
import { TbFriends } from "react-icons/tb";
import { isOnline } from "../../store/slices/setting/settingSlices";

export default function Main() {
    const { theme } = useContext(ThemeContext)
    const { currentUser } = useSelector(selectUsers)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [newMessUsers, setNewMessUsers] = useState(null)
    const [newRequestFriend, setNewRequestFriend] = useState(null)


    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }

        const fetchUsers = async () => {
            const usersRef = collection(db, "users")
            await onSnapshot(usersRef, (snapShot) => {
                let users = []
                let newMessUsers = []
                let newRequestFriend = []
                snapShot.forEach((doc) => users.push({ ...doc.data(), id: doc.id }))
                users.forEach((user) => {
                    if (user.user_id === currentUser?.user_id) {
                        dispatch(toggleUser(user))
                    }
                })
                users.forEach((user) => {
                    if (currentUser?.newMessageUsers?.length > 0) {
                        currentUser?.newMessageUsers?.forEach((el) => {
                            if (el.user === user.user_id) {
                                newMessUsers.unshift(user)
                                setNewMessUsers(newMessUsers)
                            }
                        })
                    }
                    if (currentUser?.friendRequest?.length > 0) {
                        currentUser?.friendRequest?.forEach(el => {
                            if (el.user === user.id) {
                                newRequestFriend.unshift(user)
                                setNewRequestFriend(newRequestFriend)
                            }
                        });
                    }
                })
            })
        }
        fetchUsers()

        dispatch(isOnline(currentUser?.id))

        setInterval(() => {
            dispatch(isOnline(currentUser?.id))
        }, 60000 * 3)

    }, [])

    return (
        <div className="main">
            <div className="left">
                <div className="top">
                    <h3>Online Friends</h3>
                    <div
                        style={{
                            backgroundColor: theme === 'dark' ? '' : '#000'
                        }}
                        className="top-content">
                        <div className="topuser">
                            <TopUser />
                        </div>
                        <div className="topuser">
                            <TopUser />
                        </div>
                        <div className="topuser">
                            <TopUser />
                        </div>
                    </div>
                </div>
                <div className="section">
                    posts
                </div>
            </div>
            <div
                style={{
                    backgroundColor: theme === 'dark' ? '' : '#000'
                }}
                className="right">
                <div className="user">
                    <div
                        className="user-image">
                        <img src={currentUser?.avatar ? `https://firebasestorage.googleapis.com/v0/b/artchat-86d4b.appspot.com/o/${currentUser?.id}%2Favatar%2F${currentUser?.avatar}?alt=media&token=c0c3f294-1e41-48c8-8ebb-590bfe9b5904` : userImage} alt="" />
                    </div>
                    <div className="user-name">
                        <h3>{currentUser?.name}</h3>
                        <h4>{currentUser?.userName}</h4>
                    </div>
                </div>
                <div className="notification">
                    <h3>Notifications</h3>
                    <div className="notification-content">
                        {newMessUsers?.map((user) => (
                            <div
                                onClick={() => navigate(`/userByClick/${user.user_id}`)}
                                key={user?.id}
                                className="content">
                                <div className="user-image">
                                    <img src={userImage} alt="" />
                                </div>
                                < FaTelegramPlane />
                                <div className="user-info">
                                    <h4>{user?.name}</h4>
                                    <h5>{user?.userName}</h5>
                                </div>
                            </div>
                        ))}
                        {newRequestFriend?.map((user) => (
                            <div
                                onClick={() => navigate(`/userByClick/${user.user_id}`)}
                                key={user?.id}
                                className="content">
                                <div className="user-image">
                                    <img src={userImage} alt="" />
                                </div>
                                <TbFriends />
                                <div className="user-info">
                                    <h4>{user?.name}</h4>
                                    <h5>{user?.userName}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}