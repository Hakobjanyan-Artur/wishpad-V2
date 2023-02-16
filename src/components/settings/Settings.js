import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ThemeContext } from "../../App"
import { selectUsers, toggleUser } from "../../store/slices/users/usersSlices"
import { MdManageAccounts, MdAttachEmail } from 'react-icons/md';
import { GrShieldSecurity } from 'react-icons/gr';
import { RiLockPasswordLine } from 'react-icons/ri';
import { TiFolderDelete } from 'react-icons/ti';
import { useNavigate } from "react-router-dom";
import countryData from "../../country/country";
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebaseConfig/FrirebaseConfig";
import { accountSettingChange, emailChange, passwordChange } from "../../store/slices/setting/settingSlices";
import bcrypt from 'bcryptjs'


export default function Settings() {
    const { currentUser } = useSelector(selectUsers)
    const { theme } = useContext(ThemeContext)
    const [emailPassword, setEmailPassword] = useState(false)
    const [changePass, setChangePass] = useState(false)
    //-----password change
    const [showLogicPass, setShowLogicPass] = useState(false)
    const [passLength, setPassLength] = useState(false)
    const [passSymbol, setPassSimbol] = useState(false)
    const [passNumbers, setPassNumbers] = useState(false)
    const [passUpperCase, setPassUpperCase] = useState(false)
    const [passLowerCase, setPassLowerCase] = useState(false)
    //--------------------
    const navigate = useNavigate()
    const [country, setCountry] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
        const country = []
        for (const data in countryData.data) {
            country.push(countryData.data[data])
        }
        setCountry(country)
    }, [])

    useEffect(() => {
        const fetchUsers = async () => {
            const usersRef = collection(db, "users")
            await onSnapshot(usersRef, (snapShot) => {
                const users = []
                snapShot.forEach((doc) => users.push({ ...doc.data(), id: doc.id }))
                users.forEach((user) => {
                    if (user.user_id === currentUser?.user_id) {
                        dispatch(toggleUser(user))
                    }
                })
            })
        }
        fetchUsers()
    }, [])

    // ------------account change 

    const accountSettingSubmit = (e) => {
        e.preventDefault()

        const name = e.target[0].value ? e.target[0].value : currentUser?.name
        const lastName = e.target[1].value ? e.target[1].value : currentUser?.lastname
        const dateOfbirth = e.target[2].value ? e.target[2].value : currentUser?.dateOfbirth
        const country = e.target[3].value === 'Country' ? currentUser?.country : e.target[3].value
        const city = e.target[4].value ? e.target[4].value : currentUser?.city


        dispatch(accountSettingChange({ id: currentUser?.id, name: name, lastName: lastName, dateOfbirth: dateOfbirth, country: country, city: city }))

        e.target.reset()
    }
    // ------------- email change

    const changeEmailSubmit = async (e) => {
        e.preventDefault()
        const password = e.target[0].value
        const newEmail = e.target[1].value

        await bcrypt.compare(password, currentUser?.password).then((res) => {
            if (res && newEmail) {
                dispatch(emailChange({ id: currentUser?.id, newEmail: newEmail }))
            } else {
                setEmailPassword(true)
            }
        })

        e.target.reset()

    }

    // -------------- change password

    const passChange = (e) => {
        // length
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

    const changePasswordSubmit = async (e) => {
        e.preventDefault()
        const currentPassword = e.target[0].value
        const newPassword = e.target[1].value
        const newPasswordConfirm = e.target[2].value

        await bcrypt.compare(currentPassword, currentUser?.password).then((res) => {
            if (res && passLength && passSymbol && passNumbers && passUpperCase && passLowerCase && newPassword === newPasswordConfirm) {
                dispatch(passwordChange({ id: currentUser?.id, newPassword: newPassword }))
            } else {
                setChangePass(true)
            }
        })

        e.target.reset()
    }

    return (
        <div className="settings">
            <header
                style={{
                    backgroundColor: theme === 'dark' ? '' : '#000'
                }}
            >
                <h1 className="header-title">settings profile user of {currentUser?.name}</h1>
            </header>
            <section>
                <div className="account-settings">
                    <h2 className="account-setting-header"><MdManageAccounts />Account settings</h2>
                    <form onSubmit={accountSettingSubmit}>
                        <div className="left">
                            <h3>Name</h3>
                            <h3>Last name</h3>
                            <h3>Date of birth</h3>
                            <h3>Country</h3>
                            <h3>City</h3>
                        </div>
                        <div className="middle">
                            <h3>{currentUser?.name}</h3>
                            <h3>{currentUser?.lastname ? currentUser?.lastname : 'not filled'}</h3>
                            <h3>{currentUser?.dateOfbirth ? currentUser?.dateOfbirth : 'not filled'}</h3>
                            <h3>{currentUser?.country ? currentUser?.country : 'not filled'}</h3>
                            <h3>{currentUser?.city ? currentUser?.city : 'not filled'}</h3>
                        </div>
                        <div className="right">
                            <input
                                placeholder="Change Name"
                                type="text" />
                            <input
                                placeholder="Change Last name"
                                type="text" />
                            <input
                                placeholder="Change date of bitrh"
                                type="date" />
                            <select className="select" >
                                <option value="Country">Country</option>
                                {country?.map((el) => (
                                    <option value={el.country} key={el.country}>{el.country}</option>
                                ))}
                            </select>
                            <input
                                placeholder="Change city"
                                type="text" />
                        </div>
                        <button>submit changes</button>
                    </form>
                </div>
                <div className="security">
                    <h2 className="security-header"><GrShieldSecurity /> security and entry</h2>
                    <div className="change-email">
                        <h3> <MdAttachEmail /> Change email</h3>
                        <h2
                            style={{
                                display: emailPassword ? 'block' : 'none',
                                color: 'red'
                            }}>incorrect password</h2>
                        <form onSubmit={changeEmailSubmit}>
                            <h4>{currentUser?.email}</h4>
                            <input
                                onChange={() => setEmailPassword(false)}
                                placeholder="Your password"
                                type="password" />
                            <input
                                placeholder="Enter new email"
                                type="email" />
                            <button>Send new email</button>
                        </form>
                    </div>
                    <div className="change-password">
                        <h3><RiLockPasswordLine /> Change password</h3>
                        <h2
                            style={{
                                display: changePass ? 'block' : 'none',
                                color: 'red'
                            }}>incorrect password</h2>
                        <form onSubmit={changePasswordSubmit}>
                            <input
                                onChange={() => setChangePass(false)}
                                placeholder="Your current password"
                                type="password" />
                            <div className="new-password">
                                <input
                                    onChange={(e) => passChange(e.target.value)}
                                    onFocus={() => setShowLogicPass(true)}
                                    onBlur={() => setShowLogicPass(false)}
                                    placeholder="Enter new password"
                                    type="password" />
                                <div
                                    style={{
                                        display: showLogicPass ? 'flex' : 'none'
                                    }}
                                    className="password-logic">
                                    <div className='logic-content'>
                                        <span
                                            style={{ backgroundColor: passLength ? 'rgb(159, 219, 53)' : '' }}
                                            className='range'></span>
                                        <h5>8 or more characters</h5>
                                    </div>
                                    <div className='logic-content'>
                                        <span
                                            style={{ backgroundColor: passUpperCase ? 'rgb(159, 219, 53)' : '' }}
                                            className='range'></span>
                                        <h5>Uppercase Latin letters</h5>
                                    </div>
                                    <div className='logic-content'>
                                        <span
                                            style={{ backgroundColor: passLowerCase ? 'rgb(159, 219, 53)' : '' }}
                                            className='range'></span>
                                        <h5>Lowercase latin letters</h5>
                                    </div>
                                    <div className='logic-content'>
                                        <span
                                            style={{ background: passNumbers ? 'rgb(159, 219, 53)' : '' }}
                                            className='range'></span>
                                        <h5>Numbers</h5>
                                    </div>
                                    <div className='logic-content'>
                                        <span
                                            style={{ backgroundColor: passSymbol ? 'rgb(159, 219, 53)' : '' }}
                                            className='range'></span>
                                        <h5>Symbols: (! ` ~ , @ # $ % ^ & * ) ( - _ . ? ...)</h5>
                                    </div>
                                </div>
                            </div>
                            <input
                                placeholder="Confirm new password"
                                type="password" />
                            <button>Send new password</button>
                        </form>
                    </div>
                    <div className="delete-account">
                        <h3><TiFolderDelete /> Delete account</h3>
                        <form>
                            <input
                                placeholder="Enter your email"
                                type="email" />
                            <input
                                placeholder="Enter your password"
                                type="password" />
                            <button>Delete account</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}