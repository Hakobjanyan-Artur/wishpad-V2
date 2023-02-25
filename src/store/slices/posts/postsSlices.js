import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc, query, where, onSnapshot } from "firebase/firestore"
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid'
import { db } from "../../../firebaseConfig/FrirebaseConfig";
import data from "../../../components/dateFunc/DateFunc";
const postsRef = collection(db, "posts")

const postsSlices = createSlice({
    name: 'posts',
    initialState: {
        posts: null
    },
    reducers: {
        addNewPosts(state, { payload }) {
            const addPost = {
                image_id: payload.image_id,
                image: payload.image,
                userName: payload.currentUser.name,
                user_id: payload.currentUser.user_id,
                userId: payload.currentUser.id,
                avatar: payload.currentUser.avatar,
                date: data(),
                Likes: [],
                createdAd: serverTimestamp(),
                description: payload.description
            }
            addDoc(postsRef, addPost)
        },
        deletePost(state, { payload }) {
            const deletePost = async (id) => {
                const userDoc = doc(db, "posts", id)
                await deleteDoc(userDoc)
            }
            deletePost(payload)
        },
        addLike(state, { payload }) {
            const updateUser = async (id) => {

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
            updateUser(payload.id)
        },
        addLikeUser(state, { payload }) {
            const like = {
                id: uuidv4(),
                user_id: payload.currentUser.user_id,
                name: payload.currentUser.name,
                lastname: payload.currentUser.lastname
            }
            const UpdateUserLike = async (id) => {
                const userDoc = doc(db, "users", id)
                const newFileds = {
                    images: payload.photoUser.images.map((image) => {
                        if (image.id === payload.photo.id) {
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
            UpdateUserLike(payload.userId)
        }
    }
})

export const selectPosts = state => state.posts

export const { addNewPosts, deletePost, addLike, addLikeUser } = postsSlices.actions

export const postsReducer = postsSlices.reducer

// const like = {
//     id: uuidv4(),
//     user_id: payload.currentUser.user_id,
//     name: payload.currentUser.name,
//     lastname: payload.currentUser.lastname
// }
// const updateUser = async (id) => {

//     const userDoc = (db, "users", id)
//     const newFileds = {
//         images: user.images.map((img) => {
//             if (img.id === image.id) {
//                 return {
//                     ...image,
//                     likes: [
//                         ...image.likes,
//                         like
//                     ]
//                 }
//             } else {
//                 return {
//                     ...image
//                 }
//             }
//         })
//     }
//     await updateDoc(userDoc, newFileds)
// }
// updateUser(user.id)