import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid'
import { db } from "../../../firebaseConfig/FrirebaseConfig";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import data from "../../../components/dateFunc/DateFunc";
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
            const addUser = {
                avatar: '',
                coverImage: '',
                images: [],
                name: payload.realName,
                lastname: '',
                city: '',
                country: '',
                dateOfbirth: '',
                dateOfReg: data(),
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
        deleteFriendRequest(state, { payload }) {
            const deleteFriend = async (id) => {
                const userDoc = doc(db, "users", id)
                const newFileds = {
                    friendRequest: payload.currentUser.friendRequest.filter((friend) => friend.user !== payload.friend.id)
                }
                await updateDoc(userDoc, newFileds)
            }
            deleteFriend(payload.currentUser.id)
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
                            likes: [],
                            image_id: payload.image_id,
                            description: payload.description
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
        },
        addPostLike(state, { payload }) {
            const updatePostLike = async (id) => {

                const userDoc = doc(db, "posts", id)
                const newFileds = {
                    Likes: [
                        ...payload.Likes,
                        {
                            id: uuidv4(),
                            name: payload.currentUser.name,
                            user_id: payload.currentUser.user_id
                        }
                    ]
                }
                await updateDoc(userDoc, newFileds)
            }
            updatePostLike(payload.id)
        }
    }
})

export const selectUsers = state => state.users

export const { addNewUser, toggleUser, currentUserDelNewMessUser, addNewFrinedRequest, addNewFriend, deleteFriend, coverImageAdd, avatarImageAdd, imagesAdd, deleteImageUsers, toggleUserByClick, addComment, addLike, toggleLikes, deleteFriendRequest, addPostLike } = usersSlice.actions

export const usersReducer = usersSlice.reducer