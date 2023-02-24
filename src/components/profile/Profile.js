import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import coverImage from '../../images/background.jpg'
import userImage from '../../images/user.png'
import { avatarImageAdd, coverImageAdd, selectUsers } from '../../store/slices/users/usersSlices'
import { MdAddAPhoto } from 'react-icons/md';
import { AiOutlineCloseCircle, AiOutlineSend } from 'react-icons/ai';
import ProfileWrapper from '../../pages/profileWrapper'
import ProfileInfo from '../profileInfo/profileInfo'
import ProfileImages from '../profileImages/profileImages'
import { ThemeContext } from '../../App'
import { storage } from '../../firebaseConfig/FrirebaseConfig'
import { ref, uploadBytesResumable, getStorage, deleteObject } from "@firebase/storage";
import { avatarURL, cover } from '../imageUrl/imageUrl'

export default function Profile() {
    const { currentUser } = useSelector(selectUsers)
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)
    //------cover
    const [popupCover, setPopupCover] = useState(false)
    const [coverimg, setCoverimg] = useState(null)
    const [progressCover, setProgressCover] = useState(0)
    //------cover-end
    //------ avatar
    const [popupAvatar, setPopupAvatar] = useState(false)
    const [progressAvatar, setProgressAvatar] = useState(0)
    const [avatarImg, setAvatarImg] = useState(null)
    //------ avatar end
    const dispatch = useDispatch()

    const coverImageSend = async () => {
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
                        dispatch(coverImageAdd({ id: currentUser?.id, name: coverimg?.name }))
                        setPopupCover(false)
                    }
                )
            }

            if (currentUser?.coverImage !== "") {
                const deleteImage = async () => {
                    const storage = getStorage();

                    // Create a reference to the file to delete
                    const desertRef = ref(storage, cover(currentUser?.id, currentUser?.coverImage));

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
    const avatarImgSend = async () => {
        if (avatarImg?.type === 'image/jpg' || avatarImg?.type === 'image/jpeg' || avatarImg?.type === 'image/png') {
            const uploadAvatar = () => {
                const storageRef = ref(storage, `/${currentUser?.id}/avatar/${avatarImg?.name}`)
                const uploadTask = uploadBytesResumable(storageRef, avatarImg)

                uploadTask.on("state_changed", (snapshot) => {
                    const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    setProgressAvatar(prog)
                },
                    (err) => {
                        console.log('error')
                    },
                    () => {
                        dispatch(avatarImageAdd({ id: currentUser?.id, name: avatarImg?.name }))
                        setPopupAvatar(false)
                    }
                )
            }
            uploadAvatar()
            if (currentUser?.coverImage !== "") {
                const deleteImage = async () => {
                    const storage = getStorage();

                    // Create a reference to the file to delete
                    const desertRef = ref(storage, avatarURL(currentUser?.id, currentUser?.avatar));

                    // Delete the file
                    await deleteObject(desertRef).then(() => {
                        uploadAvatar()
                    }).catch((error) => {
                        // alert('Error deleted')
                    });

                }
                deleteImage()
            } else {
                uploadAvatar()
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
                <h2>Upload cover</h2>
                <input
                    onChange={(e) => setCoverimg(e.target.files[0])}
                    type="file" />
                <button onClick={() => coverImageSend()}>Send photo <AiOutlineSend /> </button>
                <h2>Loading {progressCover} %</h2>
            </div>
            <div
                style={{
                    display: popupAvatar ? 'flex' : 'none'
                }}
                className='popup-avatar'>
                <AiOutlineCloseCircle className='icon' onClick={() => setPopupAvatar(false)} />
                <h2>Upload Avatar</h2>
                <input
                    onChange={(e) => setAvatarImg(e.target.files[0])}
                    type="file" />
                <button onClick={() => avatarImgSend()}>Send photo <AiOutlineSend /></button>
                <h2>Loading {progressAvatar} %</h2>
            </div>
            <header
                style={{
                    background: theme === 'dark' ? 'linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 40%, rgba(33, 92, 243, 0.9682247899159664) 100%)' : 'linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 40%, rgba(0, 0, 0, 0.9682247899159664) 100%)'
                }}
            >
                <div
                    style={{
                        backgroundImage: `url(${currentUser?.coverImage ? cover(currentUser?.id, currentUser?.coverImage) : coverImage})`
                    }}
                    className="header-top">
                    <button onClick={() => setPopupCover(true)} ><MdAddAPhoto /> Edit cover photo</button>
                </div>
                <div className="header-section">
                    <div className='header-section-image'>
                        <img src={currentUser?.avatar ? avatarURL(currentUser?.id, currentUser?.avatar) : userImage} alt="" />
                    </div>
                    <div className='currentUser-info'>
                        <h1>{currentUser?.name} {currentUser?.lastname}</h1>
                    </div>
                    <button onClick={() => setPopupAvatar(true)}><MdAddAPhoto /> Edit profile photo</button>
                </div>
            </header>
            <section>
                <Routes>
                    <Route path='/' element={<ProfileWrapper />}>
                        <Route index element={<ProfileInfo />} />
                        <Route path='profileImages' element={<ProfileImages />} />
                    </Route>
                </Routes>
            </section>
        </div>
    )
}