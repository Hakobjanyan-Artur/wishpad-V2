import { useNavigate } from "react-router-dom";
import userImage from '../../images/user.png'
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers, toggleUser } from "../../store/slices/users/usersSlices";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore"
import { db } from "../../firebaseConfig/FrirebaseConfig";
import { FaTelegramPlane } from "react-icons/fa";
import { TbFriends } from "react-icons/tb";
import { dateOfLastActivity, isOnline } from "../../store/slices/setting/settingSlices";
import { avatar } from "../imageUrl/imageUrl";


export default function Main() {
    const { theme } = useContext(ThemeContext)
    const { currentUser } = useSelector(selectUsers)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [newMessUsers, setNewMessUsers] = useState(null)
    const [newRequestFriend, setNewRequestFriend] = useState(null)
    const [posts, setPosts] = useState(null)


    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }

        dispatch(dateOfLastActivity(currentUser?.id))

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

    useEffect(() => {
        const m = query(collection(db, "posts"), orderBy('createdAd'), limit(50));
        const postFetch = async () => onSnapshot(m, (querySnapshot) => {
            let posts = [];
            querySnapshot.forEach((doc) => { posts.push({ ...doc.data(), id: doc.id }) })
            setPosts(posts)
        })
        postFetch()
    }, [])

    console.log(posts);

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
                        <img src={currentUser?.avatar ? avatar(currentUser?.id, currentUser?.avatar) : userImage} alt="" />
                    </div>
                    <div className="user-name">
                        <h3>{currentUser?.name} {currentUser?.lastname}</h3>
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
                                    <h5>{user?.userlastname}</h5>
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
                                    <h5>{user?.lastname}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}