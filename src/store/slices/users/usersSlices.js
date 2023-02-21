import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid'
import { db } from "../../../firebaseConfig/FrirebaseConfig";
import { addDoc, collection, doc, updateDoc, onSnapshot } from "firebase/firestore"
const usersRef = collection(db, "users")

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: null,
        userByClick: null,
        likes: null //
    },
    reducers: {
        addNewUser(state, { payload }) {
            function dateReg() {
                let time = new Date()
                let d = time.getDate().toString()
                let m = time.getUTCMonth() + 1
                m = m.toString()
                let y = time.getFullYear().toString()
                let h = time.getHours().toString()
                let min = time.getMinutes().toString()

                if (h.length < 2) { h = '0' + h }
                if (min.length < 2) { min = '0' + min }
                if (m.length < 2) { m = '0' + m }
                return d + '.' + m + '.' + y + ' ' + h + ':' + min

            }
            const addUser = {
                avatar: '',
                coverImage: '',
                images: [],
                name: payload.realName,
                lastname: '',
                city: '',
                country: '',
                dateOfbirth: '',
                dateOfReg: dateReg(),
                email: payload.email,
                friendRequest: [],
                newMessageUsers: [],
                friends: [],
                gender: payload.gender,
                password: payload.password,
                user_id: uuidv4(),
            }
            addDoc(usersRef, addUser)
        },
        toggleUser(state, { payload }) {
            return {
                ...state,
                currentUser: { ...payload }
            }
        },
        toggleUserByClick(state, { payload }) {
            return {
                ...state,
                userByClick: { ...payload }
            }
        },
        toggleLikes(state, { payload }) {
            state.likes = payload
        },
        currentUserDelNewMessUser(state, { payload }) {
            state.currentUser.newMessageUsers = payload
        },
        addNewFrinedRequest(state, { payload }) {

            const updateUser = async (id) => {

                const userDoc = doc(db, "users", id)
                const newFileds = {
                    friendRequest: [
                        ...payload.userByClick.friendRequest,
                        {
                            id: uuidv4(),
                            user: payload.currentUser
                        }
                    ]
                }
                await updateDoc(userDoc, newFileds)
            }
            updateUser(payload.userByClick.id)
        },
        addNewFriend(state, { payload }) {
            const remooveFriendrequest = async (id) => {

                const userDoc = doc(db, "users", id)
                const newFileds = {
                    friendRequest: payload.currentUser.friendRequest.filter((friend) => friend.user !== payload.userByClick.id)
                }
                await updateDoc(userDoc, newFileds)
            }
            remooveFriendrequest(payload.currentUser.id)

            const addNewFriendCurrentUser = async (id) => {

                const userDoc = doc(db, "users", id)
                const newFileds = {
                    friends: [
                        ...payload.currentUser.friends,
                        {
                            id: uuidv4(),
                            user: payload.userByClick.id
                        }
                    ]
                }
                await updateDoc(userDoc, newFileds)
            }
            addNewFriendCurrentUser(payload.currentUser.id)

            const addNewFriendUserByClick = async (id) => {

                const userDoc = doc(db, "users", id)
                const newFileds = {
                    friends: [
                        ...payload.userByClick.friends,
                        {
                            id: uuidv4(),
                            user: payload.currentUser.id
                        }
                    ]
                }
                await updateDoc(userDoc, newFileds)
            }
            addNewFriendUserByClick(payload.userByClick.id)
        },
        deleteFriend(stste, { payload }) {
            const deleteFriendCurrentUser = async (id) => {

                const userDoc = doc(db, "users", id)
                const newFileds = {
                    friends: payload.currentUser.friends.filter((friend) => friend.user !== payload.friend.id)
                }
                await updateDoc(userDoc, newFileds)
            }
            deleteFriendCurrentUser(payload.currentUser.id)
            const deleteFriendUserByClick = async (id) => {

                const userDoc = doc(db, "users", id)
                const newFileds = {
                    friends: payload.friend.friends.filter((friend) => friend.user !== payload.currentUser.id)
                }
                await updateDoc(userDoc, newFileds)
            }
            deleteFriendUserByClick(payload.friend.id)
        },
        coverImageAdd(state, { payload }) {
            const updateUser = async (id) => {

                const userDoc = doc(db, "users", id)
                const newFileds = {
                    coverImage: payload.name
                }
                await updateDoc(userDoc, newFileds)
            }
            updateUser(payload.id)
        },
        avatarImageAdd(state, { payload }) {
            const updateUser = async (id) => {

                const userDoc = doc(db, "users", id)
                const newFileds = {
                    avatar: payload.name
                }
                await updateDoc(userDoc, newFileds)
            }
            updateUser(payload.id)
        },
        imagesAdd(state, { payload }) {
            const updateUser = async (id) => {

                const userDoc = doc(db, "users", id)
                const newFileds = {
                    images: [
                        ...payload.currentUser.images,
                        {
                            id: uuidv4(),
                            name: payload.name,
                            comments: [],
                            likes: []
                        }
                    ]
                }
                await updateDoc(userDoc, newFileds)
            }
            updateUser(payload.currentUser.id)
        },
        deleteImageUsers(state, { payload }) {
            const updateUser = async (id) => {

                const userDoc = doc(db, "users", id)
                const newFileds = {
                    images: payload.currentUser.images.filter((image) => image.id !== payload.image.id)
                }
                await updateDoc(userDoc, newFileds)
            }
            updateUser(payload.currentUser.id)

        },
        addComment(state, { payload }) {
            const comment = {
                id: uuidv4(),
                comment: payload.comment,
                userName: payload.name,
                user_id: payload.user.user_id
            }
            const updateUser = async (id) => {

                const userDoc = doc(db, "users", id)
                const newFileds = {
                    images: payload.user.images.map((image) => {
                        if (image.id === payload.image.id) {
                            return {
                                ...image,
                                comments: [
                                    ...image.comments,
                                    comment
                                ]
                            }
                        } else {
                            return {
                                ...image
                            }
                        }
                    })
                }
                await updateDoc(userDoc, newFileds)
            }
            updateUser(payload.user.id)
        },
        addLike(state, { payload }) {
            const like = {
                id: uuidv4(),
                user_id: payload.currentUser.user_id,
                name: payload.currentUser.name,
                lastname: payload.currentUser.lastname
            }
            const updateUser = async (id) => {

                const userDoc = doc(db, "users", id)
                const newFileds = {
                    images: payload.userByClick.images.map((image) => {
                        if (image.id === payload.image.id) {
                            return {
                                ...image,
                                likes: [
                                    ...image.likes,
                                    like
                                ]
                            }
                        } else {
                            return {
                                ...image
                            }
                        }
                    })
                }
                await updateDoc(userDoc, newFileds)
            }
            updateUser(payload.userByClick.id)
        }
    }
})

export const selectUsers = state => state.users

export const { addNewUser, toggleUser, currentUserDelNewMessUser, addNewFrinedRequest, addNewFriend, deleteFriend, coverImageAdd, avatarImageAdd, imagesAdd, deleteImageUsers, toggleUserByClick, addComment, addLike, toggleLikes } = usersSlice.actions

export const usersReducer = usersSlice.reducer