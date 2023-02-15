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

export default function Settings() {
    const { currentUser } = useSelector(selectUsers)
    const { theme } = useContext(ThemeContext)
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
                    <form>
                        <div className="left">
                            <h3>Name</h3>
                            <h3>UserNmae</h3>
                            <h3>Last name</h3>
                            <h3>Date of birth</h3>
                            <h3>Country</h3>
                            <h3>City</h3>
                        </div>
                        <div className="middle">
                            <h3>{currentUser?.name}</h3>
                            <h3>{currentUser?.userName}</h3>
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
                                placeholder="Change UserName"
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
                        <form>
                            <h4>{currentUser?.email}</h4>
                            <input
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
                        <form>
                            <input
                                placeholder="Your current password"
                                type="password" />
                            <input
                                placeholder="Enter new password"
                                type="password" />
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