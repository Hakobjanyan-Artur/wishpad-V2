import { useDispatch, useSelector } from "react-redux"
import { imagesAdd, selectUsers } from "../../store/slices/users/usersSlices"
import { MdAddAPhoto } from 'react-icons/md';
import { AiOutlineCloseCircle, AiOutlineSend } from 'react-icons/ai';
import { ref, uploadBytesResumable } from "@firebase/storage";
import { useState } from "react";
import { storage } from "../../firebaseConfig/FrirebaseConfig";
import { images } from "../imageUrl/imageUrl";
import { useNavigate } from "react-router-dom";
import { addNewPosts } from "../../store/slices/posts/postsSlices";
import { v4 as uuidv4 } from 'uuid'

export default function ProfileImages() {
    const { currentUser } = useSelector(selectUsers)
    const [popupImages, setPopupImages] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [checkbox, setCheckbox] = useState(false)
    const [progress, setProgress] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const sendPhoto = async () => {
        if (photo?.type === 'image/jpg' || photo?.type === 'image/jpeg' || photo?.type === 'image/png') {
            const uploadImages = () => {
                const storageRef = ref(storage, `/${currentUser?.id}/images/${photo?.name}`)
                const uploadTask = uploadBytesResumable(storageRef, photo)

                uploadTask.on("state_changed", (snapshot) => {
                    const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    setProgress(prog)
                },
                    (err) => {
                        console.log('error')
                    },
                    () => {
                        const id = uuidv4()
                        if (checkbox) {
                            dispatch(imagesAdd({ currentUser: currentUser, name: photo?.name, image_id: id }))
                            dispatch(addNewPosts({ image: photo?.name, currentUser: currentUser, image_id: id }))
                            setPopupImages(false)
                        } else {
                            dispatch(imagesAdd({ currentUser: currentUser, name: photo?.name, image_id: id }))
                            setPopupImages(false)
                        }
                    }
                )
            }
            uploadImages()
        }
    }


    return (
        <div className="profile-images">
            <div
                style={{
                    display: popupImages ? '' : 'none'
                }}
                className="popup-profile-images">
                <AiOutlineCloseCircle onClick={() => setPopupImages(false)} className="icon-close" />
                <h2>Upload images</h2>
                <input onChange={(e) => setPhoto(e.target.files[0])} type="file" />
                <div className="check-for-posts">
                    <h4>For posts</h4>
                    <input value={checkbox} onChange={() => setCheckbox(!checkbox)} type="checkbox" />
                </div>
                <button onClick={() => sendPhoto()}>Send new photo <AiOutlineSend /></button>
                <h2>Loading {progress} %</h2>
            </div>
            <div className="profile-images-header">
                <h2>Photo of {currentUser?.name} {currentUser?.lastname}</h2>
                <button onClick={() => setPopupImages(true)}><MdAddAPhoto /> Add new photo</button>
            </div>
            <div className="profile-images-section">
                {currentUser?.images.map((image) => (
                    <div
                        onClick={() => navigate(`/profileClickImage/${image?.id}`)}
                        key={image?.id}
                        className="content">
                        <div className="image">
                            <img src={images(currentUser?.id, image?.name)} alt="" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}