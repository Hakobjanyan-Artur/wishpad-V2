import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AiOutlineCloseCircle, AiFillHeart } from 'react-icons/ai';
import { ImPrevious, ImNext } from 'react-icons/im';
import { BiToggleLeft, BiToggleRight } from 'react-icons/bi';
import { images } from "../imageUrl/imageUrl";
import { useDispatch, useSelector } from "react-redux";
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { db } from "../../firebaseConfig/FrirebaseConfig";
import { addComment, addLike, addPostLike, selectUsers, toggleLikes } from "../../store/slices/users/usersSlices";


export default function UserByClickImageItem() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { userByClick, currentUser, likes } = useSelector(selectUsers)
    const [image, setImage] = useState(null)
    const [commentTxt, setCommentTxt] = useState('')
    const [like, setLike] = useState(false)
    const dispatch = useDispatch()
    const [hidden, setHidden] = useState(false)
    const [post, setPost] = useState(null)

    useEffect(() => {

        if (!currentUser) {
            navigate('/')
        }


        userByClick?.images.forEach((image) => {
            if (image.id === id) {
                if (image.image_id) {
                    const q = query(collection(db, "posts"), where("image_id", "==", image?.image_id))
                    const unsubscribe = async () => onSnapshot(q, (querySnapshot) => {
                        let post = {};
                        querySnapshot.forEach((doc) => {
                            post = { ...doc.data(), id: doc.id }
                            setPost(post)
                        })
                    });
                    unsubscribe()
                }

                setImage(image)
                if (image.likes.length > 0) {
                    dispatch(toggleLikes(image.likes))
                    for (const like of image.likes) {
                        if (like.user_id === currentUser?.user_id) {
                            setLike(true)
                            break
                        } else {
                            setLike(false)
                        }
                    }
                }
            }
        })

    }, [like])

    const prevClick = () => {
        let idx = userByClick?.images.indexOf(image)
        if (userByClick?.images[idx - 1] !== undefined) {
            setImage(userByClick?.images[idx - 1])
            if (userByClick?.images[idx - 1].likes.length > 0) {
                dispatch(toggleLikes(userByClick?.images[idx - 1].likes))
                for (const like of userByClick?.images[idx - 1].likes) {
                    if (like.user_id === currentUser?.user_id) {
                        setLike(true)
                        break
                    } else {
                        setLike(false)
                    }
                }
            } else {
                dispatch(toggleLikes(null))
                setLike(false)
            }
        }
    }

    const nextClick = () => {
        let idx = userByClick?.images.indexOf(image)
        if (userByClick?.images[idx + 1] !== undefined) {
            setImage(userByClick?.images[idx + 1])
            if (userByClick?.images[idx + 1].likes.length > 0) {
                dispatch(toggleLikes(userByClick?.images[idx + 1].likes))
                for (const like of userByClick?.images[idx + 1].likes) {
                    if (like.user_id === currentUser?.user_id) {
                        setLike(true)
                        break
                    } else {
                        setLike(false)
                    }
                }
            } else {
                setLike(false)
                dispatch(toggleLikes(null))
            }
        }
    }

    const addNewComment = (e) => {
        e.preventDefault()
        if (commentTxt !== "") {
            dispatch(addComment({ user: userByClick, image: image, comment: commentTxt, name: currentUser?.name }))
        }
        setCommentTxt('')
    }

    const addNewLike = () => {

        if (!like) {
            dispatch(addLike({ userByClick: userByClick, image: image, currentUser: currentUser }))
            dispatch(addPostLike({ id: post.id, currentUser: currentUser, Likes: post.Likes }))
            setLike(true)
        }
    }



    return (
        <div className="user-byclcik-image-item">
            <div className="left">
                <div className="header">
                    <AiOutlineCloseCircle onClick={() => navigate(-1)} className="icon" />
                    <AiFillHeart
                        style={{
                            color: like ? 'red' : ''
                        }}
                        onClick={() => addNewLike()} className="icon like" />
                </div>
                <div className="content">
                    <div
                        onClick={() => prevClick()}
                        className="prev">
                        <ImPrevious className="icon" />
                    </div>
                    <div className="image">
                        <img src={images(userByClick?.id, image?.name)} alt="" />
                    </div>
                    <div
                        onClick={() => nextClick()}
                        className="next">
                        <ImNext className="icon" />
                    </div>
                </div>
                <div className="media-comment">
                    <div className="title"><span onClick={() => setHidden(!hidden)} className="toggle">{!hidden ? <div className="toggle-title"><h5>likes: {image?.likes.length}</h5> <BiToggleLeft /></div> : <div className="toggle-title"><h5>Comments: {image?.comments.length}</h5> <BiToggleRight /></div>}</span></div>
                    <div
                        style={{
                            display: !hidden ? 'block' : 'none'
                        }}
                        className="comments-content">
                        <h2>Comments: {image?.comments.length}</h2>
                        <form onSubmit={addNewComment}>
                            <input
                                value={commentTxt}
                                onChange={(e) => setCommentTxt(e.target.value)}
                                placeholder="write a comment..."
                                type="text" />
                            <button>Add</button>
                        </form>
                        <div className="comments">
                            {image?.comments.map((comment) => (
                                <div key={comment?.id} className="comment-component">
                                    <div className="comment-header">
                                        <h3>{comment?.userName}</h3>
                                    </div>
                                    <div className="comment">
                                        <p>{comment?.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        style={{
                            display: hidden ? 'flex' : 'none'
                        }}
                        className="likes-content">
                        <h2>Likes: {image?.likes.length}</h2>
                        {likes?.map((like) => (
                            <div key={like?.id} onClick={() => navigate(`/userByClick/${like?.user_id}`)} className="like-content"><h3>{like?.name} {like?.lastname}</h3></div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="title"> <span onClick={() => setHidden(!hidden)} className="toggle">{!hidden ? <div className="toggle-title"><h5>likes: {image?.likes.length}</h5> <BiToggleLeft /></div> : <div className="toggle-title"><h5>Comments: {image?.comments.length}</h5> <BiToggleRight /></div>}</span></div>
                <div
                    style={{
                        display: !hidden ? 'flex' : 'none'
                    }}
                    className="comments-content">
                    <h2 className="com">Comments: {image?.comments.length}</h2>
                    <form onSubmit={addNewComment}>
                        <input
                            value={commentTxt}
                            onChange={(e) => setCommentTxt(e.target.value)}
                            placeholder="write a comment..."
                            type="text" />
                    </form>
                    {image?.comments.map((comment) => (
                        <div key={comment?.id} className="comment-component">
                            <div className="comment-header">
                                <h3>{comment.userName}</h3>
                            </div>
                            <div className="comment">
                                <p>{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    style={{
                        display: hidden ? 'flex' : 'none'
                    }}
                    className="likes-content">
                    <h2>Like: {image?.likes.length}</h2>
                    {likes?.map((like) => (
                        <div key={like?.id} className="like-content"><h3 onClick={() => navigate(`/userByClick/${like?.user_id}`)}>{like?.name} {like?.lastname}</h3></div>
                    ))}
                </div>
            </div>
        </div>
    )
}