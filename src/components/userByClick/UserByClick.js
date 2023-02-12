import { useContext, useEffect, useState } from "react"
import { Routes, Route, useParams, useNavigate } from "react-router-dom"
import { ThemeContext } from "../../App"
import userImage from '../../images/user.png'
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { db } from "../../firebaseConfig/FrirebaseConfig"
import { AiOutlineUserAdd } from 'react-icons/ai';
import { TbBrandTelegram } from 'react-icons/tb';
import UserWrapper from "../../pages/UserWrapper"
import UserByClickFriends from "../userByClickFriends/UserByclickFriends"
import UserByClickImages from "../userByClickImages/UserByClickImages"


export default function UserByClick() {
    const { theme } = useContext(ThemeContext)
    const { id } = useParams()
    const [userByClick, setUserByClick] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const q = query(collection(db, "users"), where("user_id", "==", id))
        const unsubscribe = async () => onSnapshot(q, (querySnapshot) => {
            let user = {};
            querySnapshot.forEach((doc) => {
                user = doc.data()
            })
            setUserByClick(user)
        });
        unsubscribe()
    }, [])

    return (
        <div className="user-by-click">
            <header style={{ backgroundColor: theme === 'dark' ? '' : '#000' }}>
                <div className="left">
                    <div className="user-image">
                        <img src={userImage} alt="" />
                    </div>
                    <div className="message">
                        <button onClick={() => navigate(`/messenger/${id}`)}><TbBrandTelegram /> Messages</button>
                    </div>
                </div>
                <div className="right">
                    <div className="top">
                        <h2>{userByClick?.name} {userByClick?.lastname}</h2>
                        <button><AiOutlineUserAdd /> Add</button>
                    </div>
                    <div className="section">
                        <h3>friends({userByClick?.friends.length})</h3>
                        <h3>Images({userByClick?.images.length})</h3>
                    </div>
                    <div className="user-info">
                        <h3>user name: {userByClick?.userName}</h3>
                        <h4>Reg: {userByClick?.dateOfReg}</h4>
                        <h4>BirthDay: {userByClick?.dateOfbirth ? userByClick?.dateOfbirth : 'Not filled'}</h4>
                        <h4>city: {userByClick?.city ? userByClick?.city : 'Not filled'}</h4>
                        <h4>country:{userByClick?.country ? userByClick?.country : 'Not filled'}</h4>
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