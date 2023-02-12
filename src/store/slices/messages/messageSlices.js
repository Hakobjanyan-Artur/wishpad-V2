import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { collection, addDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../../../firebaseConfig/FrirebaseConfig";
import data from "../../../components/dateFunc/DateFunc";

const messageSlices = createSlice({
    name: 'messenger',
    initialState: {
        messId: null
    },
    reducers: {
        toggleMessageUsers(state, { payload }) {
            //----upload user and add newMessageUser
            const addNewUserMessage = async (userByClick, user_id, id) => {

                const userDoc = doc(db, "users", id)
                const newFileds = {
                    newMessageUsers: [
                        ...userByClick.newMessageUsers, {
                            id: v4(),
                            user: user_id
                        }
                    ]
                }
                await updateDoc(userDoc, newFileds)
            }
            addNewUserMessage(payload.userByClick, payload.user_id, payload.id)
        },
        toggleNewMessage(state, { payload }) {
            //----send Message
            const messagesRef = collection(db, "messenger")
            addDoc(messagesRef, {
                txt: payload.txt,
                id: v4(),
                createdAd: serverTimestamp(),
                dataMess: data(),
                user: payload.currentUser?.user_id,
                companion: payload.userByClick?.user_id,
            })
        },
        newMessageId(state, { payload }) {
            state.messId = payload
        }
    }
})

export const selectMessenger = state => state.messenger

export const { toggleNewMessage, toggleMessageUsers, newMessageId, delNewMessUser } = messageSlices.actions

export const messengerReducer = messageSlices.reducer