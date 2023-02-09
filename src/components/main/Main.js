import { useNavigate } from "react-router-dom";
import TopUser from "../topUser/TopUser";
import userImage from '../../images/user.png'
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App";
import { useSelector } from "react-redux";
import { selectUsers } from "../../store/slices/users/usersSlices";


export default function Main() {
    const { theme } = useContext(ThemeContext)
    const { currentUser } = useSelector(selectUsers)
    const navigate = useNavigate()

    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
    }, [])

    return (
        <div className="main">
            <div className="left">
                <div className="top">
                    <h3>Online Friends</h3>
                    <div
                        style={{
                            backgroundColor: theme === 'dark' ? '' : '#000'
                        }}
                        className="top-content">
                        <div className="topuser">
                            <TopUser />
                        </div>
                        <div className="topuser">
                            <TopUser />
                        </div>
                        <div className="topuser">
                            <TopUser />
                        </div>
                    </div>
                </div>
                <div className="section">
                    posts
                </div>
            </div>
            <div
                style={{
                    backgroundColor: theme === 'dark' ? '' : '#000'
                }}
                className="right">
                <div className="user">
                    <div
                        className="user-image">
                        <img src={currentUser?.avatar ? currentUser?.avatar : userImage} alt="" />
                    </div>
                    <div className="user-name">
                        <h3>{currentUser?.name}</h3>
                        <h4>{currentUser?.userName}</h4>
                    </div>
                </div>
                <div className="notification">
                    <h3>Notifications</h3>
                    <div className="notification-content">

                    </div>
                </div>
            </div>
        </div>
    )
}