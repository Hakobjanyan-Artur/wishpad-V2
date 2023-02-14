import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid'
import { db } from "../../../firebaseConfig/FrirebaseConfig";
import { addDoc, collection, doc, updateDoc, onSnapshot } from "firebase/firestore"
const usersRef = collection(db, "users")

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: null
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
                images: '',
                name: payload.realName,
                lastname: '',
                userName: payload.userName,
                city: '',
                country: '',
                dateOfbirth: '',
                dateOfReg: dateReg(),
                email: payload.email,
                friendRequest: [],
                newMessageUsers: [],
                friends: [],
                gender: '',
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
        }
    }
})

export const selectUsers = state => state.users

export const { addNewUser, toggleUser, currentUserDelNewMessUser, addNewFrinedRequest, addNewFriend, deleteFriend } = usersSlice.actions

export const usersReducer = usersSlice.reducer