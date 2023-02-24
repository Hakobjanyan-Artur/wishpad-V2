import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc } from "firebase/firestore"
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
                createdAd: serverTimestamp()
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
        }
    }
})

export const selectPosts = state => state.posts

export const { addNewPosts, deletePost, addLike } = postsSlices.actions

export const postsReducer = postsSlices.reducer