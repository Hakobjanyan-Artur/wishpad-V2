import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import coverImage from '../../images/background.jpg'
import userImage from '../../images/user.png'
import { coverImageAdd, selectUsers, setCoverUrl } from '../../store/slices/users/usersSlices'
import { MdAddAPhoto } from 'react-icons/md';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ProfileWrapper from '../../pages/profileWrapper'
import ProfileInfo from '../profileInfo/profileInfo'
import ProfileFriends from '../profileFriends/profileFriends'
import ProfileImages from '../profileImages/profileImages'
import { ThemeContext } from '../../App'
import ProfilePosts from '../profilePosts/profilePosts'
import { storage } from '../../firebaseConfig/FrirebaseConfig'
import { getDownloadURL, ref, uploadBytesResumable, getStorage, deleteObject } from "@firebase/storage";

export default function Profile() {
    const { currentUser, coverUrl } = useSelector(selectUsers)
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)
    //------cover
    const [popupCover, setPopupCover] = useState(false)
    const [coverimg, setCoverimg] = useState(null)
    const [progressCover, setProgressCover] = useState(0)
    //------cover-end
    const dispatch = useDispatch()

    const coverImageSend = () => {
        if (coverimg?.type === 'image/jpg' || coverimg?.type === 'image/jpeg' || coverimg?.type === 'image/png') {

            const uploadCover = () => {
                const storageRef = ref(storage, `/${currentUser?.id}/cover/${coverimg?.name}`)
                const uploadTask = uploadBytesResumable(storageRef, coverimg)

                uploadTask.on("state_changed", (snapshot) => {
                    const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    setProgressCover(prog)
                },
                    (err) => {
                        console.log('error')
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(url => dispatch(setCoverUrl(url)))
                        dispatch(coverImageAdd({ id: currentUser?.id, name: coverimg?.name }))
                        setPopupCover(false)
                    }
                )
            }

            if (currentUser?.coverImage !== "") {
                const deleteImage = async () => {
                    const storage = getStorage();

                    // Create a reference to the file to delete
                    const desertRef = ref(storage, `https://firebasestorage.googleapis.com/v0/b/artchat-86d4b.appspot.com/o/${currentUser?.id}%2Fcover%2F${currentUser?.coverImage}?alt=media&token=c0c3f294-1e41-48c8-8ebb-590bfe9b5904`);

                    // Delete the file
                    await deleteObject(desertRef).then(() => {
                        uploadCover()
                    }).catch((error) => {
                        // alert('Error deleted')
                    });

                }
                deleteImage()
            } else {
                uploadCover()
            }
        }
    }

    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
    }, [])

    return (
        <div className="profile">
            <div
                style={{
                    display: popupCover ? 'flex' : 'none'
                }}
                className='popup-cover'>
                <AiOutlineCloseCircle className='icon' onClick={() => setPopupCover(false)} />
                <input
                    onChange={(e) => setCoverimg(e.target.files[0])}
                    type="file" />
                <button onClick={() => coverImageSend()}>Send photo</button>
                <h2>loaded {progressCover} %</h2>
            </div>
            <header
                style={{
                    background: theme === 'dark' ? 'linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 40%, rgba(33, 92, 243, 0.9682247899159664) 100%)' : 'linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 40%, rgba(0, 0, 0, 0.9682247899159664) 100%)'
                }}
            >
                <div
                    style={{
                        backgroundImage: `url(${currentUser?.coverImage ? `https://firebasestorage.googleapis.com/v0/b/artchat-86d4b.appspot.com/o/${currentUser?.id}%2Fcover%2F${currentUser?.coverImage}?alt=media&token=c0c3f294-1e41-48c8-8ebb-590bfe9b5904` : coverImage})`
                    }}
                    className="header-top">
                    <button onClick={() => setPopupCover(true)} ><MdAddAPhoto /> Edit cover photo</button>
                </div>
                <div className="header-section">
                    <div className='header-section-image'>
                        <img src={userImage} alt="" />
                    </div>
                    <div className='currentUser-info'>
                        <h1>{currentUser?.name} {currentUser?.lastname}</h1>
                        <h2>{currentUser?.userName}</h2>
                    </div>
                    <button><MdAddAPhoto /> Edit profile photo</button>
                </div>
            </header>
            <section>
                <Routes>
                    <Route path='/' element={<ProfileWrapper />}>
                        <Route index element={<ProfileInfo />} />
                        <Route path='profileFriends' element={<ProfileFriends />} />
                        <Route path='profileImages' element={<ProfileImages />} />
                        <Route path='profilePosts' element={<ProfilePosts />} />
                    </Route>
                </Routes>
            </section>
        </div>
    )
}