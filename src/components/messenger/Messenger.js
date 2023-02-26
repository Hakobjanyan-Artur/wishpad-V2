import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import userImage from '../../images/user.png'
import { collection, query, where, onSnapshot, orderBy, updateDoc, doc } from "firebase/firestore"
import { db } from "../../firebaseConfig/FrirebaseConfig"
import { useDispatch, useSelector } from "react-redux"
import { currentUserDelNewMessUser, selectUsers, toggleUser } from "../../store/slices/users/usersSlices"
import { ThemeContext } from "../../App"
import { selectMessenger, toggleMessageUsers, toggleNewMessage } from "../../store/slices/messages/messageSlices"
import { avatarURL } from "../imageUrl/imageUrl"
import { BsEmojiHeartEyes } from 'react-icons/bs';
import { FaTelegramPlane } from 'react-icons/fa';
import useSound from 'use-sound';
import sendSound from '../../Sound/send.mp3'
import receive from '../../Sound/receive.mp3'
const emoji = require('emoji.json')
emoji.length = 200

export default function Messenger() {
    const { id } = useParams()
    const { theme } = useContext(ThemeContext)
    const { messId } = useSelector(selectMessenger)
    const [userByClick, setUserByClick] = useState(null)
    const { currentUser } = useSelector(selectUsers)
    const [txt, setTxt] = useState('')
    const [message, setMessage] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userMess, setUserMess] = useState(null)
    const desctopRef = useRef(null)
    const [emojiHidden, setEmojiHidden] = useState(false)
    const [sendMessage] = useSound(sendSound)
    const [receiveMessage] = useSound(receive)

    useEffect(() => {
        const delUser = async (arr, id) => {

            const userDoc = doc(db, "users", id)
            const newFileds = {
                newMessageUsers: [
                    ...arr
                ]
            }
            await updateDoc(userDoc, newFileds)
        }

        const delNewMessUser = async () => {
            const newMessageUser = []
            for (const newMessUser of currentUser?.newMessageUsers) {
                if (newMessUser?.user !== id) {
                    newMessageUser.push(newMessUser)
                }
            }
            delUser(newMessageUser, currentUser?.id)
            dispatch(currentUserDelNewMessUser(newMessageUser))
        }

        delNewMessUser()
    }, [currentUser?.newMessageUser])

    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
        const fetchUsers = async () => {
            const m = query(collection(db, "messenger"))
            const usersRef = collection(db, "users")
            await onSnapshot(usersRef, (snapShot) => {
                let users = []
                snapShot.forEach((doc) => users.push({ ...doc.data(), id: doc.id }))
                onSnapshot(m, (querySnapshot) => {
                    let currentUserMess = [];
                    let result
                    querySnapshot.forEach((document) => {
                        users.forEach((el) => {
                            if (document.data().user === currentUser?.user_id && document.data().companion === el.user_id) {
                                currentUserMess.push(el)
                                const uniq = (arr) => {
                                    const uniqSet = new Set(arr)
                                    return [...uniqSet]
                                }
                                result = uniq(currentUserMess)
                            }
                        })
                    })
                    setUserMess(result)
                })
            })
        }
        fetchUsers()
        //--------del uder newMessUser

        const localUser = JSON.parse(localStorage.getItem('currentUser')) || null
        if (localUser) {
            dispatch(toggleUser(localUser))
        }
        if (!currentUser) {
            navigate('/')
        }
        if (currentUser) {
            const q = query(collection(db, "users"), where("user_id", "==", id));
            const unsubscribe = async () => onSnapshot(q, (querySnapshot) => {
                let user = {};
                querySnapshot.forEach((doc) => {
                    user = { ...doc.data(), id: doc.id }
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
                const idx = filterMess.length - 1
                if (filterMess[idx].user !== currentUser?.user_id) {
                    receiveMessage()
                }
            })
            messenger()

            return () => messenger()
        }
    }, [])

    useEffect(() => {
        desctopRef.current.scrollTop = desctopRef.current.scrollHeight - desctopRef.current.clientHeight
    })



    const handleSubmit = () => {
        //----send Message
        dispatch(toggleNewMessage({ txt: txt, currentUser: currentUser, userByClick: userByClick }))
        //---------------
        //----upload user and add newMessageUser

        if (userByClick.newMessageUsers.length > 0) {
            userByClick?.newMessageUsers.forEach((el) => {
                if (el.user !== currentUser.user_id) {
                    dispatch(toggleMessageUsers({ userByClick: userByClick, user_id: currentUser?.user_id, id: messId }))
                }
            })
        } else {
            dispatch(toggleMessageUsers({ userByClick: userByClick, user_id: currentUser?.user_id, id: messId }))
        }
        sendMessage()
    }

    const handleEmoji = (emoji) => {
        setTxt(txt + emoji)
    }

    return (
        <div className="messenger">
            <div className="left">
                <header style={{ background: theme === 'dark' ? '' : '#000' }}>
                    <div className="user-image">
                        <img src={userByClick?.avatar ? avatarURL(userByClick?.id, userByClick?.avatar) : userImage} alt="" />
                    </div>
                    <div className="user-info">
                        <h2>{userByClick?.name} {userByClick?.lastname}</h2>
                    </div>
                </header>
                <section ref={desctopRef}>
                    {message?.map((mess) => (
                        <div key={mess?.id} className="message-content">
                            <div
                                style={{
                                    right: mess.user === id ? '0' : '',
                                    borderBottomLeftRadius: mess?.user === id ? '20px' : '',
                                    borderBottomRightRadius: mess?.user === id ? '' : '20px',
                                    borderTopLeftRadius: mess?.user === id ? '20px' : '',
                                    borderTopRightRadius: mess?.user === id ? '' : '20px',
                                    flexDirection: mess?.user === id ? 'row-reverse' : '',
                                    backgroundColor: mess?.user === id ? '#B0C4DE' : 'rgb(159, 219, 53)'
                                }}
                                className="content">
                                <div className="user-info">
                                    <h3>{mess?.user === id ? userByClick?.name : currentUser?.name}</h3>
                                    <h6>{mess?.dataMess}</h6>
                                </div>
                                <div className="mess-txt">
                                    <p>{mess?.txt}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
                <footer>
                    <form onSubmit={handleSubmit}>
                        <div
                            style={{
                                display: emojiHidden ? 'grid' : 'none'
                            }}
                            className="emoji-div">
                            {emoji?.map((em) => (
                                <span onClick={() => handleEmoji(em.char)} className="em" key={em?.codes}>{em?.char}</span>
                            ))}
                        </div>
                        <input
                            value={txt}
                            onChange={(e) => setTxt(e.target.value)}
                            type="text" />
                        <BsEmojiHeartEyes onClick={() => setEmojiHidden(!emojiHidden)} className="emoji-icon" />
                        <button><FaTelegramPlane /></button>
                    </form>
                </footer>
            </div>
            <div className="right">
                <div className="header">
                    <div className="user-image">
                        <img src={currentUser?.avatar ? avatarURL(currentUser?.id, currentUser?.avatar) : userImage} alt="" />
                    </div>
                    <div className="user-info">
                        <h2>{currentUser?.name} {currentUser?.lastname}</h2>
                    </div>
                </div>
                <div className="section">
                    {userMess?.map((user) => (
                        <div key={user?.user_id}
                            onClick={() => navigate(`/userByClick/${user.user_id}`)}
                            className="user-content">
                            <div className="left">
                                <img src={userImage} alt="" />
                            </div>
                            <div className="right">
                                <h3>{user?.name}</h3>
                                <h4>{user?.userName}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}