import { db } from "../../../firebaseConfig/FrirebaseConfig";
import { createSlice } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore"
import bcrypt from 'bcryptjs'

const settingSlices = createSlice({
    name: 'setting',
    initialState: {
        setting: null
    },
    reducers: {
        accountSettingChange(state, { payload }) {
            const updateUser = async (id) => {

                const userDoc = doc(db, "users", id)
                const newFileds = {
                    name: payload.name,
                    lastname: payload.lastName,
                    dateOfbirth: payload.dateOfbirth,
                    country: payload.country,
                    city: payload.city
                }
                await updateDoc(userDoc, newFileds)
            }
            updateUser(payload.id)
        },
        emailChange(state, { payload }) {
            const updateUser = async (id) => {

                const userDoc = doc(db, "users", id)
                const newFileds = {
                    email: payload.newEmail
                }
                await updateDoc(userDoc, newFileds)
            }
            updateUser(payload.id)
        },
        passwordChange(state, { payload }) {
            const updateUser = async (id) => {

                const userDoc = doc(db, "users", id)
                const newFileds = {
                    password: bcrypt.hashSync(payload.newPassword, 10)
                }
                await updateDoc(userDoc, newFileds)
            }
            updateUser(payload.id)
        }
    }
})

export const selectSettings = state => state.setting

export const { accountSettingChange, emailChange, passwordChange } = settingSlices.actions

export const settingsReducer = settingSlices.reducer