import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { db } from "../../firebaseConfig/FrirebaseConfig"
import { addNewFriend, selectUsers } from "../../store/slices/users/usersSlices"
import { collection, onSnapshot } from "firebase/firestore"
import userImage from '../../images/user.png'
import { GrAggregate } from 'react-icons/gr';
import { TbBrandTelegram } from 'react-icons/tb';
import { useNavigate } from "react-router-dom"
import { ThemeContext } from "../../App"

export default function Notification() {
    const { theme } = useContext(ThemeContext)
    const { currentUser } = useSelector(selectUsers)
    const [newMessUsers, setNewMessUsers] = useState(null)
    const [newRequestFriend, setNewRequestFriend] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            const usersRef = collection(db, "users")
            await onSnapshot(usersRef, (snapShot) => {
                let users = []
                let newMessUsers = []
                let newRequestFriend = []
                snapShot.forEach((doc) => users.push({ ...doc.data(), id: doc.id }))
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
    }, [currentUser?.newMessUsers, currentUser?.friendRequest])

    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
    }, [])


    return (
        <div className="notification">
            <header
                style={{
                    background: theme === 'dark' ? '' : '#000'
                }}
            >
                <h1>Notifications</h1>
                <p>All new messages and friend invites will be shown in this section</p>
            </header>
            <section>
                <div className="left">
                    <h2 className="title">friend requests</h2>
                    <div className="content">
                        {newRequestFriend?.map((friend) => (
                            <div key={friend?.id} className="friend-content">
                                <div
                                    onClick={() => navigate(`/userByClick/${friend?.user_id}`)}
                                    className="friend-image">
                                    <img src={userImage} alt="" />
                                </div>
                                <div className="friend-info">
                                    <h4>{friend?.name}</h4>
                                    <h5>{friend?.userName}</h5>
                                </div>
                                <button onClick={() => dispatch(addNewFriend({ userByClick: friend, currentUser: currentUser }))}><GrAggregate className="icon" /><h6>join</h6></button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="right">
                    <h2 className="title">New messages</h2>
                    <div className="content">
                        {newMessUsers?.map((user) => (
                            <div key={user?.id} className="friend-content">
                                <div
                                    onClick={() => navigate(`/userByClick/${user?.user_id}`)}
                                    className="friend-image">
                                    <img src={userImage} alt="" />
                                </div>
                                <div className="friend-info">
                                    <h4>{user?.name}</h4>
                                    <h5>{user?.userName}</h5>
                                </div>
                                <button onClick={() => navigate(`/messenger/${user?.user_id}`)}><TbBrandTelegram /><h6>Messages</h6></button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}