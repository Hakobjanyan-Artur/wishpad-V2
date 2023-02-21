import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteFriend, selectUsers } from "../../store/slices/users/usersSlices"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebaseConfig/FrirebaseConfig"
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { RiChatDeleteLine } from 'react-icons/ri';
import { useNavigate } from "react-router-dom"
import { ThemeContext } from "../../App"
import { avatar } from "../imageUrl/imageUrl"
import userImage from '../../images/user.png'


export default function Friends() {
    const { theme } = useContext(ThemeContext)
    const [friends, setFriends] = useState(null)
    const [popupFriend, setPopupFriend] = useState(null)
    const { currentUser } = useSelector(selectUsers)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        if (!currentUser) {
            navigate('/')
        }

    }, [])

    useEffect(() => {
        const fetchUsers = async () => {
            const usersRef = collection(db, "users")
            await onSnapshot(usersRef, (snapShot) => {
                let users = []
                let friends = []
                snapShot.forEach((doc) => users.push({ ...doc.data(), id: doc.id }))
                currentUser?.friends.forEach((friend) => {
                    for (const user of users) {
                        if (user.id === friend.user) {
                            friends.push(user)
                            setFriends(friends)
                        }
                    }
                })
            })
        }
        fetchUsers()
    }, [currentUser?.friends])

    const removeFriend = () => {
        dispatch(deleteFriend({ friend: popupFriend, currentUser: currentUser }))
        setPopupFriend(null)
    }


    return (
        <div className="friend">
            <div
                style={{
                    display: popupFriend ? 'flex' : 'none'
                }}
                className="delete-popup">
                <RiChatDeleteLine
                    onClick={() => setPopupFriend(null)}
                    className="x-icon" />
                <p>Are you sure you want to remove {popupFriend?.name} from friends?</p>
                <button onClick={() => removeFriend()}>ok</button>
            </div>
            <header
                style={{
                    background: theme === 'dark' ? '' : '#000'
                }}
            >
                <div className="title">
                    <h1>My friends</h1>
                </div>
            </header>
            {friends ?
                <section className="friend-section">
                    {friends?.map((friend) => (
                        <div key={friend?.id} className="friend-content">
                            <div
                                onClick={() => navigate(`/userByClick/${friend?.user_id}`)}
                                className="friend-content-image">
                                <img src={friend?.avatar ? avatar(friend?.id, friend?.avatar) : userImage} alt="" />
                            </div>
                            <div className="friend-info">
                                <h4>{friend?.name}</h4>
                                <h5>{friend?.userName}</h5>
                            </div>
                            <div
                                onClick={() => setPopupFriend(friend)}
                                title="Delete from friends"
                                className="delete-friend">
                                <AiOutlineUsergroupDelete />
                            </div>
                        </div>
                    ))}
                </section>
                :
                <div className="friends-null"><h1>a list of your friends will be shown here, but for now it is empty</h1></div>
            }
        </div>
    )
}