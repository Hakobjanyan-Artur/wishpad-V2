import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from '../../images/logo.jpg'
import { addNewUser } from '../../store/slices/users/usersSlices'
import { collection, onSnapshot } from "firebase/firestore"
import { db } from '../../firebaseConfig/FrirebaseConfig'
import bcrypt from 'bcryptjs'

export default function SignUp() {
    const [showPass, setShowPass] = useState(false)
    const [genderInput, setGenderInput] = useState(true)
    const [showLogicPass, setShowLogicPass] = useState(false)
    const [passLength, setPassLength] = useState(false)
    const [passSymbol, setPassSimbol] = useState(false)
    const [passNumbers, setPassNumbers] = useState(false)
    const [passUpperCase, setPassUpperCase] = useState(false)
    const [passLowerCase, setPassLowerCase] = useState(false)
    const [realNameErr, setRealNameErr] = useState(false)
    const [regError, setRegError] = useState(false)
    const [successfulreg, setSuccessfulReg] = useState(false)
    const [users, setUsers] = useState(null)
    const [emailError, setEmailError] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null
        if (currentUser) {
            navigate('/main')
        }
    }, [])

    const checkchange = (e) => {
        // ----- length
        e.length >= 8 ? setPassLength(true) : setPassLength(false)
        // ----- symbols
        const symbols = ["!", "#", "$", "%", "&", "(", ")", "*", "+", "-", ",", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]", "|", "^", "_", "{", "}", "~", "`"]
        let symbol = []
        symbols.forEach(el => symbol.push(e.includes(el)))
        symbol.includes(true) ? setPassSimbol(true) : setPassSimbol(false)
        // ----- numbers
        const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        let num = []
        numbers.forEach(el => num.push(e.includes(el)))
        num.includes(true) ? setPassNumbers(true) : setPassNumbers(false)
        // ----- UpperCase
        const upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        let upper = []
        upperCase.forEach(el => upper.push(e.includes(el)))
        upper.includes(true) ? setPassUpperCase(true) : setPassUpperCase(false)
        // ----- LoverCase
        const lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "x"]
        let lower = []
        lowerCase.forEach(el => lower.push(e.includes(el)))
        lower.includes(true) ? setPassLowerCase(true) : setPassLowerCase(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const realName = e.target[1].value
        const password = e.target[2].value
        const confirmPassword = e.target[3].value
        const gender = genderInput ? 'Male' : 'Female'

        for (const user of users) {
            if (user.email === email) {
                setEmailError(true)
            }
        }

        if (
            passLength &&
            passSymbol &&
            passLowerCase &&
            passUpperCase &&
            passNumbers &&
            email &&
            realName &&
            !realNameErr &&
            password === confirmPassword &&
            !emailError
        ) {
            setSuccessfulReg(true)

            dispatch(addNewUser({ email: email, realName: realName, gender: gender, password: bcrypt.hashSync(password, 10) }))

            setTimeout(() => {
                navigate('/')
            }, 5000)

        } else {
            setRegError(true)
        }
        e.target.reset()
    }

    return (
        <div className="sign-up">
            <div
                style={{ display: successfulreg ? 'flex' : 'none' }}
                className='popup'>
                <div className='title'>
                    <h1>Welcome</h1>
                </div>
                <p>Welcome to Wish-Pad, we hope you find what you are looking for</p>
                <div className='loadingAnim'></div>
            </div>
            <div className="sign-up-content">
                <div className="top">
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                </div>
                <div className="section">
                    <h1>WISH-PAD</h1>
                    {regError ? <h3 style={{ color: 'red', textAlign: 'center' }}>Registration error</h3> : <h3 className='reg-title'>Register to chat with friends</h3>}
                    <form onSubmit={handleSubmit}>
                        <h3 style={{ color: 'red', display: emailError ? 'block' : 'none' }} >Email exists</h3>
                        <input
                            onChange={() => { setRegError(false); setEmailError(false) }}
                            placeholder='Enter your email (must be unique) '
                            type="email" />
                        <h3 style={{ color: 'red', display: realNameErr ? 'block' : 'none' }}>At least 3 characters</h3>
                        <input
                            onBlur={(e) => e.target.value.length < 3 ? setRealNameErr(true) : setRealNameErr(false)}
                            placeholder='Real name'
                            type="text" />
                        <div className='password'>
                            <input
                                onChange={(e) => checkchange(e.target.value)}
                                onFocus={() => setShowLogicPass(true)}
                                onBlur={() => setShowLogicPass(false)}
                                placeholder='Create a password'
                                type={showPass ? 'text' : 'password'} />
                            <div
                                style={{ display: showLogicPass ? "flex" : 'none' }}
                                className='password-logic'>
                                <div className='logic-content'>
                                    <span
                                        style={{ backgroundColor: passLength ? 'rgb(159, 219, 53)' : '' }}
                                        className='range'></span>
                                    <h5>8 or more characters</h5>
                                </div>
                                <div className='logic-content'>
                                    <span style={{ backgroundColor: passUpperCase ? 'rgb(159, 219, 53)' : '' }} className='range'></span>
                                    <h5>Uppercase Latin letters</h5>
                                </div>
                                <div className='logic-content'>
                                    <span style={{ backgroundColor: passLowerCase ? 'rgb(159, 219, 53)' : '' }} className='range'></span>
                                    <h5>Lowercase latin letters</h5>
                                </div>
                                <div className='logic-content'>
                                    <span style={{ background: passNumbers ? 'rgb(159, 219, 53)' : '' }} className='range'></span>
                                    <h5>Numbers</h5>
                                </div>
                                <div className='logic-content'>
                                    <span style={{ backgroundColor: passSymbol ? 'rgb(159, 219, 53)' : '' }} className='range'></span>
                                    <h5>Symbols: (! ` ~ , @ # $ % ^ & * ) ( - _ . ? ...)</h5>
                                </div>
                            </div>
                        </div>
                        <input
                            placeholder='Confirm password'
                            type={showPass ? 'text' : 'password'} />
                        <div className='show-password'>
                            <input
                                onChange={() => setShowPass(!showPass)}
                                className='checkbox'
                                type="checkbox" />
                            <h4>Show password</h4>
                        </div>
                        <div className='gender'>
                            Male: <input onChange={() => setGenderInput(!genderInput)} type="radio" name='gender' value="man" defaultChecked />
                            Female: <input onChange={() => setGenderInput(!genderInput)} type="radio" name='gender' value="woman" />
                        </div>
                        <div className='check'>
                            <h4>Do you agree with us</h4>
                        </div>
                        <h5 className='terms'>Terms</h5>
                        <button>Sign-up</button>
                    </form>
                    <div className='sign-up-div'>
                        <h4>Don't have an account?</h4>
                        <h4
                            onClick={() => navigate('/')}
                            className='sign-up-btn'>Sign-In</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}