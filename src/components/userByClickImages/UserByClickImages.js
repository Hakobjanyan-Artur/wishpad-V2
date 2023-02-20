import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { selectUsers } from "../../store/slices/users/usersSlices"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { db } from "../../firebaseConfig/FrirebaseConfig"
import { images } from "../imageUrl/imageUrl"


export default function UserByClickImages() {
    const { id } = useParams()
    const { currentUser } = useSelector(selectUsers)
    const navigate = useNavigate()
    const [userByClick, setUserByClick] = useState(null)

    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }

        const q = query(collection(db, "users"), where("user_id", "==", id))
        const unsubscribe = async () => onSnapshot(q, (querySnapshot) => {
            let user = {};
            querySnapshot.forEach((doc) => {
                user = { ...doc.data(), id: doc.id }
            })
            setUserByClick(user)
        });
        unsubscribe()
    }, [])

    return (
        <div className="user-by-click-images">
            {userByClick?.images.map((image) => (
                <div
                    onClick={() => navigate(`/userByClickImageItem/${image.id}`)}
                    key={image?.id} className="content">
                    <div className="image">
                        <img src={images(userByClick?.id, image?.name)} alt="" />
                    </div>
                </div>
            ))}
        </div>
    )
}