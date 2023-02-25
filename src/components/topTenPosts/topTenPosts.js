import { useContext, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ThemeContext } from "../../App"
import { selectUsers } from "../../store/slices/users/usersSlices"
import userImage from '../../images/user.png'
import { avatarURL, images } from "../imageUrl/imageUrl"


export default function TopTenPosts({ topTen }) {
    const { currentUser } = useSelector(selectUsers)
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
    }, [])

    if (topTen) {
        return (
            <div className="top-ten-posts">
                <header style={{ backgroundColor: theme === 'dark' ? '' : '#000' }}><h1>Top 10 popular posts by your votes</h1></header>
                <section>
                    <div className="one">
                        <div className="post-content">
                            <div className="top">
                                <div
                                    onClick={() => navigate(`/userByClick/${topTen[0]?.user_id}`)}
                                    className="user-avatar">
                                    <img src={topTen[0]?.avatar ? avatarURL(topTen[0]?.userId, topTen[0]?.avatar) : userImage} alt="" />
                                </div>
                                <h4>{topTen[0]?.userName}</h4>
                                <h4>{topTen[0]?.date}</h4>
                            </div>
                            <div className="content">
                                <img src={images(topTen[0]?.userId, topTen[0]?.image)} alt="" />
                            </div>
                            <div className="bottom">
                                <h3>Likes: {topTen[0]?.Likes.length}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="two">
                        <div className="post-content">
                            <div className="top">
                                <div
                                    onClick={() => navigate(`/userByClick/${topTen[1]?.user_id}`)}
                                    className="user-avatar">
                                    <img src={topTen[1]?.avatar ? avatarURL(topTen[1]?.userId, topTen[1]?.avatar) : userImage} alt="" />
                                </div>
                                <h4>{topTen[1]?.userName}</h4>
                                <h4>{topTen[1]?.date}</h4>
                            </div>
                            <div className="content">
                                <img src={images(topTen[1]?.userId, topTen[1]?.image)} alt="" />
                            </div>
                            <div className="bottom">
                                <h3>Likes: {topTen[1]?.Likes.length}</h3>
                            </div>
                        </div>
                        <div className="post-content">
                            <div className="top">
                                <div
                                    onClick={() => navigate(`/userByClick/${topTen[2]?.user_id}`)}
                                    className="user-avatar">
                                    <img src={topTen[2]?.avatar ? avatarURL(topTen[2]?.userId, topTen[2]?.avatar) : userImage} alt="" />
                                </div>
                                <h4>{topTen[2]?.userName}</h4>
                                <h4>{topTen[2]?.date}</h4>
                            </div>
                            <div className="content">
                                <img src={images(topTen[2]?.userId, topTen[2]?.image)} alt="" />
                            </div>
                            <div className="bottom">
                                <h3>Likes: {topTen[2]?.Likes.length}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="tree">
                        <div className="post-content">
                            <div className="top">
                                <div
                                    onClick={() => navigate(`/userByClick/${topTen[3]?.user_id}`)}
                                    className="user-avatar">
                                    <img src={topTen[3]?.avatar ? avatarURL(topTen[3]?.userId, topTen[3]?.avatar) : userImage} alt="" />
                                </div>
                                <h4>{topTen[3]?.userName}</h4>
                                <h4>{topTen[3]?.date}</h4>
                            </div>
                            <div className="content">
                                <img src={images(topTen[3]?.userId, topTen[3]?.image)} alt="" />
                            </div>
                            <div className="bottom">
                                <h3>Likes: {topTen[3]?.Likes.length}</h3>
                            </div>
                        </div>
                        <div className="post-content">
                            <div className="top">
                                <div
                                    onClick={() => navigate(`/userByClick/${topTen[4]?.user_id}`)}
                                    className="user-avatar">
                                    <img src={topTen[4]?.avatar ? avatarURL(topTen[4]?.userId, topTen[4]?.avatar) : userImage} alt="" />
                                </div>
                                <h4>{topTen[4]?.userName}</h4>
                                <h4>{topTen[4]?.date}</h4>
                            </div>
                            <div className="content">
                                <img src={images(topTen[4]?.userId, topTen[4]?.image)} alt="" />
                            </div>
                            <div className="bottom">
                                <h3>Likes: {topTen[4]?.Likes.length}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="four">
                        <div className="post-content">
                            <div className="top">
                                <div
                                    onClick={() => navigate(`/userByClick/${topTen[5]?.user_id}`)}
                                    className="user-avatar">
                                    <img src={topTen[5]?.avatar ? avatarURL(topTen[5]?.userId, topTen[5]?.avatar) : userImage} alt="" />
                                </div>
                                <h4>{topTen[5]?.userName}</h4>
                                <h4>{topTen[5]?.date}</h4>
                            </div>
                            <div className="content">
                                <img src={images(topTen[5]?.userId, topTen[5]?.image)} alt="" />
                            </div>
                            <div className="bottom">
                                <h3>Likes: {topTen[5]?.Likes.length}</h3>
                            </div>
                        </div>
                        <div className="post-content">
                            <div className="top">
                                <div
                                    onClick={() => navigate(`/userByClick/${topTen[6]?.user_id}`)}
                                    className="user-avatar">
                                    <img src={topTen[6]?.avatar ? avatarURL(topTen[6]?.userId, topTen[6]?.avatar) : userImage} alt="" />
                                </div>
                                <h4>{topTen[6]?.userName}</h4>
                                <h4>{topTen[6]?.date}</h4>
                            </div>
                            <div className="content">
                                <img src={images(topTen[6]?.userId, topTen[6]?.image)} alt="" />
                            </div>
                            <div className="bottom">
                                <h3>Likes: {topTen[6]?.Likes.length}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="five">
                        <div className="post-content">
                            <div className="top">
                                <div
                                    onClick={() => navigate(`/userByClick/${topTen[7]?.user_id}`)}
                                    className="user-avatar">
                                    <img src={topTen[7]?.avatar ? avatarURL(topTen[7]?.userId, topTen[7]?.avatar) : userImage} alt="" />
                                </div>
                                <h4>{topTen[7]?.userName}</h4>
                                <h4>{topTen[7]?.date}</h4>
                            </div>
                            <div className="content">
                                <img src={images(topTen[7]?.userId, topTen[7]?.image)} alt="" />
                            </div>
                            <div className="bottom">
                                <h3>Likes: {topTen[7]?.Likes.length}</h3>
                            </div>
                        </div>
                        <div className="post-content">
                            <div className="top">
                                <div
                                    onClick={() => navigate(`/userByClick/${topTen[8]?.user_id}`)}
                                    className="user-avatar">
                                    <img src={topTen[8]?.avatar ? avatarURL(topTen[8]?.userId, topTen[8]?.avatar) : userImage} alt="" />
                                </div>
                                <h4>{topTen[8]?.userName}</h4>
                                <h4>{topTen[8]?.date}</h4>
                            </div>
                            <div className="content">
                                <img src={images(topTen[8]?.userId, topTen[8]?.image)} alt="" />
                            </div>
                            <div className="bottom">
                                <h3>Likes: {topTen[8]?.Likes.length}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="six">
                        <div className="post-content">
                            <div className="top">
                                <div
                                    onClick={() => navigate(`/userByClick/${topTen[9]?.user_id}`)}
                                    className="user-avatar">
                                    <img src={topTen[9]?.avatar ? avatarURL(topTen[9]?.userId, topTen[9]?.avatar) : userImage} alt="" />
                                </div>
                                <h4>{topTen[9]?.userName}</h4>
                                <h4>{topTen[9]?.date}</h4>
                            </div>
                            <div className="content">
                                <img src={images(topTen[9]?.userId, topTen[9]?.image)} alt="" />
                            </div>
                            <div className="bottom">
                                <h3>Likes: {topTen[9]?.Likes.length}</h3>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}