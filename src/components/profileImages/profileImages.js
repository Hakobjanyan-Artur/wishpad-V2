import { useDispatch, useSelector } from "react-redux"
import { imagesAdd, selectUsers } from "../../store/slices/users/usersSlices"
import { MdAddAPhoto } from 'react-icons/md';
import { AiOutlineCloseCircle, AiOutlineSend } from 'react-icons/ai';
import { ref, uploadBytesResumable } from "@firebase/storage";
import { useState } from "react";
import { storage } from "../../firebaseConfig/FrirebaseConfig";
import { images } from "../imageUrl/imageUrl";
import { useNavigate } from "react-router-dom";

export default function ProfileImages() {
    const { currentUser } = useSelector(selectUsers)
    const [popupImages, setPopupImages] = useState(false)
    const [photo, setPhoto] = useState(null)
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
                        dispatch(imagesAdd({ currentUser: currentUser, name: photo?.name }))
                        setPopupImages(false)
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
                    display: popupImages ? 'flex' : 'none'
                }}
                className="popup-profile-images">
                <AiOutlineCloseCircle onClick={() => setPopupImages(false)} className="icon-close" />
                <h2>Upload images</h2>
                <input onChange={(e) => setPhoto(e.target.files[0])} type="file" />
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