import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { db } from "../../firebaseConfig/FrirebaseConfig"
import logo from '../../images/logo.jpg'
import { passwordChange } from "../../store/slices/setting/settingSlices"

export default function RecoverPassword() {
    const { id } = useParams()
    const [showPass, setShowPass] = useState(false)
    const [showLogicPass, setShowLogicPass] = useState(false)
    const [passLength, setPassLength] = useState(false)
    const [passSymbol, setPassSimbol] = useState(false)
    const [passNumbers, setPassNumbers] = useState(false)
    const [passUpperCase, setPassUpperCase] = useState(false)
    const [passLowerCase, setPassLowerCase] = useState(false)
    const [passError, setPassError] = useState(false)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const q = query(collection(db, "users"), where("user_id", "==", id))
        const unsubscribe = async () => onSnapshot(q, (querySnapshot) => {
            let user = {};
            querySnapshot.forEach((doc) => {
                user = { ...doc.data(), id: doc.id }
            })
            setUser(user)
        });
        unsubscribe()
    }, [])

    const checkchange = (e) => {
        setPassError(false)
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
        const password = e.target[0].value
        const confirmPassword = e.target[1].value

        if (
            passLength &&
            passSymbol &&
            passNumbers &&
            passUpperCase &&
            passLowerCase &&
            password === confirmPassword
        ) {
            dispatch(passwordChange({ id: user.id, newPassword: password }))
            setTimeout(() => {
                navigate('/')
            }, 2000)
        } else {
            setPassError(true)
        }
        e.target.reset()
    }

    return (
        <div className="recover-password">
            <div className="recover-content">
                <div className="top">
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                </div>
                <div className="section">
                    <h1>WISH-PAD</h1>
                    {!passError ? <p>Enter a new login password</p> : <p style={{ color: 'red' }}>Error While Filling</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="password">
                            <input
                                onChange={(e) => checkchange(e.target.value)}
                                onFocus={() => setShowLogicPass(true)}
                                onBlur={() => setShowLogicPass(false)}
                                placeholder="Enter New Password"
                                type={showPass ? 'text' : 'password'} />
                            <div
                                style={{ display: showLogicPass ? "flex" : 'none' }}
                                className="password-logic">
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
                            placeholder="Confirm New Password"
                            type={showPass ? 'text' : 'password'} />
                        <div className='show-password'>
                            <input
                                onChange={() => setShowPass(!showPass)}
                                className='checkbox'
                                type="checkbox" />
                            <h4>Show password</h4>
                        </div>
                        <button>Accept</button>
                    </form>
                </div>
            </div>
        </div>
    )
}