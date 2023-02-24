import { useNavigate } from 'react-router-dom'
import logo from '../../images/logo.jpg'
import { collection, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from 'react'
import { db } from '../../firebaseConfig/FrirebaseConfig'
import bcrypt from 'bcryptjs'
import { useDispatch, useSelector } from 'react-redux'
import { selectUsers, toggleUser } from '../../store/slices/users/usersSlices'

export default function SingIn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [users, setUsers] = useState(null)
    const [check, setCheck] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [successfully, setSuccessfully] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const { currentUser } = useSelector(selectUsers)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const emailChange = (user) => {
            if (user.email === email) {
                setSuccessfully(true)
                if (check) {
                    localStorage.setItem('currentUser', JSON.stringify(user))
                }
                dispatch(toggleUser(user))
                setShowPopup(true)
                setTimeout(() => {
                    navigate('main')
                }, 3000)
            } else {
                setShowPopup(true)
                setTimeout(() => {
                    setShowPopup(false)
                }, 3000)
            }
        }
        for (const user of users) {
            await bcrypt.compare(password, user.password).then((res) => {
                if (res) {
                    emailChange(user)
                }
            })
        }
        e.target.reset()
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const usersRef = collection(db, "users")
            await onSnapshot(usersRef, (snapShot) => {
                let users = []
                snapShot.forEach((doc) => users.push({ ...doc.data(), id: doc.id }))
                setUsers(users)
            })
        }
        fetchUsers()
        const localUser = JSON.parse(localStorage.getItem('currentUser')) || null
        if (localUser) {
            dispatch(toggleUser(localUser))
            navigate('main')
        }


    }, [])

    return (
        <div className="sign-in">
            <div style={{ display: showPopup ? 'flex' : 'none' }} className='popup'>
                {successfully ? <h1 style={{ color: 'rgb(33, 92, 243' }} >Welcom {currentUser?.name}</h1> : <h1 style={{ color: 'red' }}>User not found</h1>}
                <div className='loadAnim'></div>
            </div>
            <div className="sign-in-content">
                <div className="top">
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                </div>
                <div className="section">
                    <h1>WISH-PAD</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your email'
                            type="email" />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter your password'
                            type="password" />
                        <div className='check'>
                            <h4>Remember Me</h4>
                            <input onChange={() => setCheck(!check)} className='checkbox' type="checkbox" />
                        </div>
                        <button>Sign-in</button>
                        <h5>Forgot password ?</h5>
                    </form>
                    <div className='sign-up-div'>
                        <h4>Don't have an account?</h4>
                        <h4 onClick={() => navigate('signup')} className='sign-up-btn'>Sign-Up</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

