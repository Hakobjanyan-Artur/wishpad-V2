import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { ImPrevious, ImNext } from 'react-icons/im';
import { images } from "../imageUrl/imageUrl";
import { useDispatch, useSelector } from "react-redux";
import { addComment, selectUsers } from "../../store/slices/users/usersSlices";


export default function UserByClickImageItem() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { userByClick, currentUser } = useSelector(selectUsers)
    const [image, setImage] = useState(null)
    const [commentTxt, setCommentTxt] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {

        if (!currentUser) {
            navigate('/')
        }

        userByClick?.images.forEach((image) => {
            if (image.id === id) {
                setImage(image)
            }
        })
    }, [])

    const prevClick = () => {
        let idx = userByClick?.images.indexOf(image)
        if (userByClick?.images[idx - 1] !== undefined) {
            setImage(userByClick?.images[idx - 1])
        }
    }

    const nextClick = () => {
        let idx = userByClick?.images.indexOf(image)
        if (userByClick?.images[idx + 1] !== undefined) {
            setImage(userByClick?.images[idx + 1])
        }
    }

    const newCommentSubmit = (e) => {
        e.preventDefault()
        if (commentTxt !== "") {
            dispatch(addComment({ user: userByClick, image: image, comment: commentTxt, name: currentUser?.name }))
        }
        setCommentTxt('')
    }


    return (
        <div className="user-byclcik-image-item">
            <div className="left">
                <div className="header">
                    <AiOutlineCloseCircle onClick={() => navigate(-1)} className="icon" />
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
                    <div className="title"><h2>Comments</h2></div>
                    <form onSubmit={newCommentSubmit}>
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
                                    <h3>{comment.userName}</h3>
                                </div>
                                <div className="comment">
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="title"><h2>Comments {image?.comments.length}</h2></div>
                <form onSubmit={newCommentSubmit}>
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
        </div>
    )
}