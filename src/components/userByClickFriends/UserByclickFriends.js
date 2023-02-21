import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectUsers } from "../../store/slices/users/usersSlices"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebaseConfig/FrirebaseConfig"
import userImage from '../../images/user.png'
import { avatar } from "../imageUrl/imageUrl"

export default function UserByClickFriends() {
    const [friends, setFriends] = useState(null)
    const { currentUser, userByClick } = useSelector(selectUsers)
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
                userByClick?.friends.forEach((friend) => {
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
    }, [userByClick?.friends])

    return (
        <div className="user-by-click-friends">
            {friends?.map((friend) => (
                <div
                    onClick={() => navigate(`/userByClick/${friend?.user_id}`)}
                    key={friend?.id} className="friend-content">
                    <div className="friend-image">
                        <img src={friend.avatar ? avatar(friend?.id, friend?.avatar) : userImage} alt="" />
                    </div>
                    <div className="friend-info">
                        <h4>{friend?.name} {friend?.lastname}</h4>
                    </div>
                </div>
            ))}
        </div>
    )
}