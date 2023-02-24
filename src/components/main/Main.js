import { useNavigate } from "react-router-dom";
import userImage from '../../images/user.png'
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers, toggleUser } from "../../store/slices/users/usersSlices";
import { collection, limitToLast, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "../../firebaseConfig/FrirebaseConfig";
import { dateOfLastActivity, isOnline } from "../../store/slices/setting/settingSlices";
import { avatarURL } from "../imageUrl/imageUrl";
import { ThreeCircles } from 'react-loader-spinner'
import { MdNextPlan } from 'react-icons/md'
const LeazyPostItem = React.lazy(() => import('../mainPostItem/mainPostItem'))

export default function Main({ setTopTen }) {
    const { theme } = useContext(ThemeContext)
    const { currentUser } = useSelector(selectUsers)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [posts, setPosts] = useState(null)
    const [topPosts, setTopPosts] = useState(null)
    const [users, setusers] = useState(null)


    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }

        dispatch(dateOfLastActivity(currentUser?.id))

        const fetchUsers = async () => {
            const usersRef = collection(db, "users")
            await onSnapshot(usersRef, (snapShot) => {
                let users = []
                snapShot.forEach((doc) => users.push({ ...doc.data(), id: doc.id }))
                setusers(users)
                users.forEach((user) => {
                    if (user.user_id === currentUser?.user_id) {
                        dispatch(toggleUser(user))
                    }
                })
            })
        }
        fetchUsers()

        dispatch(isOnline(currentUser?.id))

        setInterval(() => {
            dispatch(isOnline(currentUser?.id))
        }, 60000 * 3)

    }, [])


    useEffect(() => {
        const m = query(collection(db, "posts"), orderBy('createdAd'), limitToLast(100))
        const postFetch = async () => onSnapshot(m, (querySnapshot) => {
            let posts = [];
            querySnapshot.forEach((doc) => { posts.unshift({ ...doc.data(), id: doc.id }) })
            setPosts(posts)
        })
        postFetch()

        const p = query(collection(db, "posts"))
        const topPosts = async () => onSnapshot(p, (querySnapshot) => {
            let posts = [];
            let topPosts = []
            querySnapshot.forEach((doc) => { posts.push({ ...doc.data(), id: doc.id }) })
            posts.forEach(post => post.Likes.length > 0 ? topPosts.unshift(post) : topPosts.push(post))
            if (topPosts.length > 10) {
                topPosts.length = 10
                setTopPosts(topPosts)
                setTopTen(topPosts)
            } else {
                setTopPosts(topPosts)
                setTopTen(topPosts)

            }
        })
        topPosts()
    }, [])

    return (
        <div className="main">
            <div className="left">
                <div
                    style={{
                        backgroundColor: theme === 'dark' ? '' : '#000'
                    }}
                    className="top">
                    <h3>Top Posts Users</h3>
                    <div className="top-content">
                        {topPosts?.map((post) => (
                            <div onClick={() => navigate(`/userByClick/${post?.user_id}`)} key={post?.id} className="top-post-content">
                                <div className="top-post-avatar">
                                    <img src={post?.avatar ? avatarURL(post?.userId, post?.avatar) : userImage} alt="" />
                                </div>
                                <div className="top-post-info">
                                    <h5>{post?.userName}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h3 onClick={() => navigate('/topTenPosts')} className="top-ten">Top 10 posts <MdNextPlan /></h3>
                </div>
                <div className="section">
                    {posts?.map((post) => (
                        <React.Suspense key={post?.id} fallback={
                            <ThreeCircles
                                height="100"
                                width="100"
                                color="rgb(33, 92, 243)"
                                wrapperClass="Circle"
                                visible={true}
                                ariaLabel="three-circles-rotating"
                            />}>
                            <LeazyPostItem users={users} {...post} />
                        </React.Suspense>))}
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
                        <img src={currentUser?.avatar ? avatarURL(currentUser?.id, currentUser?.avatar) : userImage} alt="" />
                    </div>
                    <div className="user-name">
                        <h3>{currentUser?.name} {currentUser?.lastname}</h3>
                    </div>
                </div>
                <div className="user-info">
                    <h4>Date of birth: {currentUser?.dateOfbirth ? currentUser?.dateOfbirth : 'Not filed'}</h4>
                    <h4>Country: {currentUser?.country ? currentUser?.country : 'Not filed'}</h4>
                    <h4>City: {currentUser?.city ? currentUser?.city : 'Not filed'}</h4>
                    <h4>Last activ: {currentUser?.dateOfLastActivity}</h4>
                </div>
            </div>
        </div>
    )
}