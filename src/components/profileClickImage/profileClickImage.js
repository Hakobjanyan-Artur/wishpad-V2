import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { deleteImageUsers, selectUsers } from "../../store/slices/users/usersSlices"
import { images } from "../imageUrl/imageUrl"
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import { ImPrevious, ImNext } from 'react-icons/im';
import { ref, deleteObject, getStorage } from 'firebase/storage'

export default function ProfileClickImage() {
    const { id } = useParams()
    const { currentUser } = useSelector(selectUsers)
    const [image, setImage] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

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

    const prevClick = () => {
        let idx = currentUser.images.indexOf(image)
        if (currentUser.images[idx - 1] !== undefined) {
            setImage(currentUser.images[idx - 1])
        }
    }

    const nextClick = () => {
        let idx = currentUser.images.indexOf(image)
        if (currentUser.images[idx + 1] !== undefined) {
            setImage(currentUser.images[idx + 1])
        }
    }

    const deleteImage = async () => {

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
    }
    return (
        <div className="profile-click-image">
            <div className="left">
                <div className="header">
                    <MdDeleteForever onClick={() => deleteImage()} className="icon delete" />
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
                <div className="media-comment"></div>
            </div>
            <div className="right"></div>
        </div>
    )
}