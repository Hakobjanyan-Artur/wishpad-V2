import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import userImage from '../../images/user.png'
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, orderBy } from "firebase/firestore"
import { db } from "../../firebaseConfig/FrirebaseConfig"
import { FaTelegramPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import { selectUsers, toggleUser } from "../../store/slices/users/usersSlices"
import { ThemeContext } from "../../App"
import { v4 } from "uuid";


export default function Messenger() {
    const { id } = useParams()
    const { theme } = useContext(ThemeContext)
    const [userByClick, setUserByClick] = useState(null)
    const { currentUser } = useSelector(selectUsers)
    const [txt, setTxt] = useState('')
    const [message, setMessage] = useState([])
    const messagesRef = collection(db, "messenger")
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null
        if (currentUser) {
            dispatch(toggleUser(currentUser))
        }
        if (!currentUser) {
            navigate('/')
        }
        const q = query(collection(db, "users"), where("user_id", "==", id));
        const unsubscribe = async () => onSnapshot(q, (querySnapshot) => {
            let user = {};
            querySnapshot.forEach((doc) => {
                user = doc.data()
            })
            setUserByClick(user)
        });
        unsubscribe()

        const m = query(collection(db, "messenger"), where("user", "in", [currentUser?.user_id, id]), orderBy('createdAd'));
        const messenger = async () => onSnapshot(m, (querySnapshot) => {
            let user = [];
            querySnapshot.forEach((doc) => { user.push({ ...doc.data(), id: doc.id }) })
            const filterMess = user.filter((mess) => mess.user === currentUser?.user_id && mess.companion === id || mess.user === id && mess.companion === currentUser?.user_id)
            setMessage(filterMess)
        });
        messenger()

        return () => messenger()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const v4Id = v4()
        function dataMess() {
            let time = new Date()
            let d = time.getDate().toString()
            let m = time.getUTCMonth() + 1
            m = m.toString()
            let y = time.getFullYear().toString()
            let h = time.getHours().toString()
            let min = time.getMinutes().toString()

            if (h.length < 2) { h = '0' + h }
            if (min.length < 2) { min = '0' + min }
            if (m.length < 2) { m = '0' + m }
            return d + '.' + m + '.' + y + ' ' + h + ':' + min

        }

        if (txt !== "") {
            await addDoc(messagesRef, {
                txt: txt,
                id: v4Id,
                createdAd: serverTimestamp(),
                dataMess: dataMess(),
                user: currentUser?.user_id,
                companion: userByClick?.user_id,
            })
        }

        setTxt("")

    }

    return (
        <div className="messenger">
            <div className="left">
                <header style={{ background: theme === 'dark' ? '' : '#000' }}>
                    <div className="user-image">
                        <img src={userImage} alt="" />
                    </div>
                    <div className="user-info">
                        <h2>{userByClick?.name} {userByClick?.lastname}</h2>
                    </div>
                </header>
                <section>
                    {message.map((mess) => (
                        <div key={mess?.id} className="message-content">{mess?.txt}</div>
                    ))}
                </section>
                <footer>
                    <form onSubmit={handleSubmit}>
                        <input
                            value={txt}
                            placeholder="Type your message here..."
                            onChange={(e) => setTxt(e.target.value)}
                            type="text" />
                        <button><FaTelegramPlane /></button>
                    </form>
                </footer>
            </div>
            <div className="right">
                <div className="header">
                    <div className="user-image">
                        <img src={currentUser?.avatar ? currentUser?.avatar : userImage} alt="" />
                    </div>
                    <div className="user-info">
                        <h2>{currentUser?.userName}</h2>
                    </div>
                </div>
                <div className="section">

                </div>
            </div>
        </div>
    )
}