import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../App"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebaseConfig/FrirebaseConfig"
import userImage from '../../images/user.png'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { newMessageId } from "../../store/slices/messages/messageSlices"
import time from "../timeFunc/timeFunc"
import { selectUsers } from "../../store/slices/users/usersSlices"
import { avatar } from "../imageUrl/imageUrl"

export default function Search() {
    const { theme } = useContext(ThemeContext)
    const navigate = useNavigate()
    const [inputTxt, setInputTxt] = useState('')
    const [users, setUsers] = useState(null)
    const dispatch = useDispatch()
    const { currentUser } = useSelector(selectUsers)
    let searchUser

    if (inputTxt) {
        searchUser = users?.filter(filterUser => {
            let n = filterUser.lastname.toLowerCase() + filterUser.name.toLowerCase()
            let m = filterUser.name.toLowerCase() + filterUser.lastname.toLowerCase()

            if (n.includes(inputTxt.replaceAll(' ', ''))) {

                return n.includes(inputTxt.replaceAll(' ', ''))

            } else if (m.includes(inputTxt.replaceAll(' ', ''))) {

                return m.includes(inputTxt.replaceAll(' ', ''))
            }

        })
    }

    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
        const fetchUsers = async () => {
            const usersRef = collection(db, "users")
            await onSnapshot(usersRef, (snapShot) => {
                let users = []
                snapShot.forEach((doc) => users.push({ ...doc.data(), id: doc.id }))
                setUsers(users)
            })
        }
        fetchUsers()
    }, [])

    return (
        <div className="search">
            <div style={{ backgroundColor: theme === 'dark' ? '' : '#000' }} className="header">
                <h1 className="title">Search</h1>
                <div className="search-input">
                    <input onChange={(e) => setInputTxt(e.target.value.toLowerCase())} type="text" placeholder="Search by username or userlastname" />
                </div>
            </div>
            <div className="search-display">
                {searchUser?.map((user) => (
                    <div onClick={() => { navigate(`/userByClick/${user?.user_id}`); dispatch(newMessageId(user?.id)) }} key={user?.id} className="user-content">
                        <div className="left">
                            <div className="user-image">
                                <div
                                    style={{
                                        backgroundColor: user?.time + 5 >= time() ? 'rgb(159, 219, 53)' : ''
                                    }}
                                    className="isOnline"></div>
                                <img src={user?.avatar ? avatar(user?.id, user?.avatar) : userImage} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <h4>{user?.name} {user?.lastname}</h4>
                            <h5>{user?.userName}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}