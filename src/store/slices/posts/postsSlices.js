import { addDoc, collection, serverTimestamp, deleteDoc, doc } from "firebase/firestore"
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
        }
    }
})

export const selectPosts = state => state.posts

export const { addNewPosts, deletePost } = postsSlices.actions

export const postsReducer = postsSlices.reducer