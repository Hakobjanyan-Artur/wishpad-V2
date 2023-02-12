import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid'
import { db } from "../../../firebaseConfig/FrirebaseConfig";
import { addDoc, collection } from "firebase/firestore"
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
        }, currentUserDelNewMessUser(state, { payload }) {
            state.currentUser.newMessageUsers = payload
        }
    }
})

export const selectUsers = state => state.users

export const { addNewUser, toggleUser, currentUserDelNewMessUser } = usersSlice.actions

export const usersReducer = usersSlice.reducer