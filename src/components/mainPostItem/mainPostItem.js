import userImage from '../../images/user.png'
import { avatarURL, images } from '../imageUrl/imageUrl'
import { AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, addLikeUser } from '../../store/slices/posts/postsSlices';
import { selectUsers } from '../../store/slices/users/usersSlices';
import { useEffect, useState } from 'react';



export default function MainPostItem({ avatar, userId, user_id, userName, date, image, id, Likes, image_id, users, description, setImagePost, setImagePopup }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentUser } = useSelector(selectUsers)
    const [like, setLike] = useState(false)

    useEffect(() => {
        Likes.forEach(like => {
            if (like.user_id.includes(currentUser?.user_id)) {
                setLike(true)
            }
        })
    }, [Likes])

    const addNewLike = () => {
        let photoUser
        let photo
        users.forEach(user => {
            if (user.id === userId) {
                photoUser = user
            }
        })
        photoUser.images.forEach((img) => {
            if (img.image_id === image_id) {
                photo = img
            }
        })
        if (!like) {
            if (user_id !== currentUser?.user_id && Likes.length > 0) {
                Likes?.forEach(like => {
                    if (like.user_id !== currentUser?.user_id) {
                        dispatch(addLike({ id: id, Likes: Likes, currentUser: currentUser }))
                        dispatch(addLikeUser({ userId: userId, image_id: image_id, currentUser: currentUser, photoUser: photoUser, photo: photo }))
                    }
                });
            } else if (user_id !== currentUser?.user_id) {
                dispatch(addLike({ id: id, Likes: Likes, currentUser: currentUser }))
                dispatch(addLikeUser({ userId: userId, image_id: image_id, currentUser: currentUser, photoUser: photoUser, photo: photo }))
            }
        }
    }

    return (
        <div className="post-content">
            <div className="post-content-header">
                <div
                    onClick={() => navigate(`/userByClick/${user_id}`)}
                    className="post-user-image">
                    <img src={avatar ? avatarURL(userId, avatar) : userImage} alt="" />
                </div>
                <h3>{userName}</h3>
                <h3>{date}</h3>
            </div>
            <div className='desc'>
                <h3>{description}</h3>
            </div>
            <div
                onClick={() => { setImagePost({ userId: userId, image: image }); setImagePopup(true) }}
                className="post-content-image">
                <img src={images(userId, image)} alt="" />
            </div>
            <div className="post-content-bottom">
                <AiFillHeart style={{
                    color: like ? 'red' : 'grey'
                }} className="icon" onClick={() => addNewLike()} />
                {Likes.length}
            </div>
        </div>
    )
}