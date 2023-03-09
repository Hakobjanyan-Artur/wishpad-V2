import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebaseConfig/FrirebaseConfig'
import logo from '../../images/logo.jpg'
import emailjs from '@emailjs/browser';
import { ThreeCircles } from 'react-loader-spinner'

export default function ForgotPassword() {
    const navigate = useNavigate()
    const [users, setUsers] = useState(null)
    const [emailErr, setEmailErr] = useState(false)
    const [timeer, setTimeer] = useState(90)
    const [popupHidden, setPopupHidden] = useState(false)
    const [input1, setInput1] = useState(null)
    const [input2, setInput2] = useState(null)
    const [input3, setInput3] = useState(null)
    const [input4, setInput4] = useState(null)
    const [email, setEmail] = useState('')
    const [id, setId] = useState(null)
    const [random, setRandom] = useState(null)
    const formRef = useRef(null)
    const [spiner, setSpiner] = useState(true)
    const [popupCont, setPopupCont] = useState(false)

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
        setRandom(Math.floor(Math.random() * 9000 + 1000))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email) {
            users.forEach((user) => {
                if (user.email === email) {
                    setId(user.user_id)
                    emailSend()
                    setEmailErr(false)
                } else {
                    setEmailErr(true)
                }
            })

        }

        e.target.reset()
    }

    const emailSend = () => {
        setPopupHidden(true)
        let time = 90
        const interval = setInterval(() => {
            if (time > 0) {
                time--
                setTimeer(time)
            } else {
                clearInterval(interval)
                setPopupHidden(false)
            }
        }, 1000)

        emailjs.sendForm('service_qxp2s2i', 'template_9or6x7p', formRef.current, 'fHumqLRT8-gX308Xo')
            .then((result) => {
                setSpiner(false)
                setPopupCont(true)
            },
                (error) => {

                })
    }

    useEffect(() => {
        const input = input1 + input2 + input3 + input4
        if (+input === random) {
            navigate(`/recoverPassword/${id}`)
        }
    }, [input1, input2, input3, input4])

    function testJump(x) {
        var ml = ~~x.getAttribute('maxlength');
        if (ml && x.value.length >= ml) {
            do {
                x = x.nextSibling;
            }
            while (x && !(/text/.test(x.type)));
            if (x && /text/.test(x.type)) {
                x.focus();
            }
        }
    }


    return (
        <div className="forgot">
            <div
                style={{
                    display: popupHidden ? 'flex' : 'none'
                }}
                className='forgot-popup'>
                <div
                    style={{
                        display: spiner ? 'flex' : 'none'
                    }}
                    className='spiner'>
                    <ThreeCircles />
                </div>
                <div
                    style={{
                        display: popupCont ? 'flex' : 'none'
                    }}
                    className='popup-content'>
                    <p>We have sent an email to your email with a PIN code that is valid for {timeer} seconds</p>
                    <div className='pinCode'>
                        <input onInput={e => testJump(e.target)} onChange={(e) => setInput1(e.target.value)} type="text" maxLength={1} />
                        <input onInput={e => testJump(e.target)} onChange={(e) => setInput2(e.target.value)} type="text" maxLength={1} />
                        <input onInput={e => testJump(e.target)} onChange={(e) => setInput3(e.target.value)} type="text" maxLength={1} />
                        <input onInput={e => testJump(e.target)} onChange={(e) => setInput4(e.target.value)} type="text" maxLength={1} />
                    </div>
                </div>
            </div>
            <div className="forgot-content">
                <div className="top">
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                </div>
                <div className='section'>
                    <h1>WISH-PAD</h1>
                    <p>Forgot your password? we'll help you recover</p>
                    <h2
                        style={{
                            display: emailErr ? 'block' : 'none'
                        }}
                    >Email not found</h2>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <input
                            name='user_email'
                            onChange={(e) => { setEmailErr(false); setEmail(e.target.value) }}
                            placeholder='Enter your email'
                            type="email" />
                        <input type="text" defaultValue={random} hidden name='message' />
                        <button>Recover</button>
                    </form>
                </div>
                <div className='sign-in-up'>
                    <span onClick={() => navigate('/')} className='forgot-sign-in'>Sign-in</span>
                    <span onClick={() => navigate('/signup')} className='forgot-sign-up'>Sign-up</span>
                </div>
            </div>
        </div>
    )
}