import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { addComment, deleteImageUsers, selectUsers } from "../../store/slices/users/usersSlices"
import { images } from "../imageUrl/imageUrl"
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import { ImPrevious, ImNext } from 'react-icons/im';
import { ref, deleteObject, getStorage } from 'firebase/storage'
import { collection, query, onSnapshot } from "firebase/firestore"
import { BiToggleLeft, BiToggleRight } from 'react-icons/bi';
import { db } from "../../firebaseConfig/FrirebaseConfig"
import { deletePost } from "../../store/slices/posts/postsSlices"


export default function ProfileClickImage() {
    const { id } = useParams()
    const { currentUser } = useSelector(selectUsers)
    const [image, setImage] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [hidden, setHidden] = useState(false)
    const [commentTxt, setCommentTxt] = useState("")
    const [posts, setPosts] = useState(null)
    const [postItem, setPostItem] = useState(null)

    useEffect(() => {

        if (!currentUser) {
            navigate('/')
        }

        currentUser?.images.forEach((image) => {
            if (image.id === id) {
                setImage(image)
            }
        })

    }, [])

    useEffect(() => {
        const m = query(collection(db, "posts"));
        const postFetch = async () => onSnapshot(m, (querySnapshot) => {
            let posts = [];
            querySnapshot.forEach((doc) => { posts.push({ ...doc.data(), id: doc.id }) })
            setPosts(posts)
            posts.forEach((post) => {
                if (post.image_id === image?.image_id) {
                    setPostItem(post)
                }
            })
        })
        postFetch()
    }, [image])

    const prevClick = () => {
        let idx = currentUser.images.indexOf(image)
        if (currentUser.images[idx - 1] !== undefined) {
            setImage(currentUser.images[idx - 1])
        }
        posts?.forEach((post) => {
            if (post.image_id === currentUser.images[idx - 1].image_id) {
                setPostItem(post)
            } else {
                setPostItem(null)
            }
        })
    }

    const nextClick = () => {
        let idx = currentUser.images.indexOf(image)
        if (currentUser.images[idx + 1] !== undefined) {
            setImage(currentUser.images[idx + 1])
        }
        posts?.forEach((post) => {
            if (post.image_id === currentUser.images[idx + 1].image_id) {
                setPostItem(post)
            } else {
                setPostItem(null)
            }
        })
    }

    const deleteImage = async () => {
        dispatch(deletePost(postItem.id))
        setTimeout(async () => {
            const storage = getStorage();

            // Create a reference to the file to delete
            const desertRef = ref(storage, images(currentUser?.id, image?.name))
            // Delete the file
            await deleteObject(desertRef).then(() => {
                dispatch(deleteImageUsers({ currentUser: currentUser, image: image }))
                navigate(-1)
            }).catch((error) => {
                alert('Error deleted')
            });
        }, 500)

    }

    const addNewComment = (e) => {
        e.preventDefault()
        if (commentTxt !== "") {
            dispatch(addComment({ user: currentUser, image: image, comment: commentTxt, name: currentUser?.name }))
        }
        setCommentTxt('')
    }
    return (
        <div className="profile-click-image">
            <div className="left">
                <div className="header">
                    <MdDeleteForever onClick={() => deleteImage()} className="icon delete" />
                    <div className="desc">
                        <h3>{image?.description}</h3>
                    </div>
                    <AiOutlineCloseCircle onClick={() => navigate(-1)} className="icon" />
                </div>
                <div className="content">
                    <div
                        onClick={() => prevClick()}
                        className="prev">
                        <ImPrevious className="icon" />
                    </div>
                    <div className="image">
                        <img src={images(currentUser?.id, image?.name)} alt="" />
                    </div>
                    <div
                        onClick={() => nextClick()}
                        className="next">
                        <ImNext className="icon" />
                    </div>
                </div>
                <div className="media-comment">
                    <div className="title">{!hidden ? <div onClick={() => setHidden(!hidden)} className="toggle"><h5>Likes: {image?.likes.length}</h5><BiToggleLeft /></div> : <div onClick={() => setHidden(!hidden)} className="toggle"><h5>Commentts: {image?.comments.length}</h5><BiToggleRight /> </div>}</div>
                    <div
                        style={{
                            display: !hidden ? 'flex' : 'none'
                        }}
                        className="comments-content">
                        <h2>Comments: {image?.comments.length}</h2>
                        <form>
                            <input
                                placeholder="write a comment..."
                                type="text" />
                            <button>Add</button>
                        </form>
                        <div className="comments">
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
                    </div>
                    <div
                        style={{
                            display: hidden ? 'flex' : 'none'
                        }}
                        className="likes-content">
                        <h2>Likes: {image?.likes.length}</h2>
                        {image?.likes.map((like) => (
                            <div key={like.id} className="like-content"><h3>{like?.name} {like?.lastname}</h3></div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="title">{!hidden ? <div onClick={() => setHidden(!hidden)} className="toggle"><h5>Likes: {image?.likes.length}</h5><BiToggleLeft /></div> : <div onClick={() => setHidden(!hidden)} className="toggle"><h5>Commentts: {image?.comments.length}</h5><BiToggleRight /> </div>}</div>
                <div
                    style={{
                        display: !hidden ? 'flex' : 'none'
                    }}
                    className="comments-content">
                    <h2>Comments: {image?.comments.length}</h2>
                    <form onSubmit={addNewComment}>
                        <input
                            value={commentTxt}
                            onChange={(e) => setCommentTxt(e.target.value)}
                            placeholder="write a comment..."
                            type="text" />
                    </form>
                    <div className="comments">
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
                </div>
                <div
                    style={{
                        display: hidden ? 'flex' : 'none'
                    }}
                    className="likes-content">
                    <h2>Likes: {image?.likes.length}</h2>
                    {image?.likes.map((like) => (
                        <div key={like?.id} onClick={() => navigate(`/userByClick/${like?.user_id}`)} className="like-content"><h3>{like?.name} {like?.lastname}</h3></div>
                    ))}
                </div>
            </div>
        </div>
    )
}