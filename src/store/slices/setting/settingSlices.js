import { db } from "../../../firebaseConfig/FrirebaseConfig";
import { createSlice } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore"
import bcrypt from 'bcryptjs'
import time from "../../../components/timeFunc/timeFunc";
import data from "../../../components/dateFunc/DateFunc";

const settingSlices = createSlice({
    name: 'setting',
    initialState: {
        setting: null,
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
        },
        deleteAccount(state, { payload }) {
            const updateUser = async (id) => {

                const userDoc = doc(db, "users", id)
                const newFileds = {
                    password: "",
                    email: ""
                }
                await updateDoc(userDoc, newFileds)
            }
            updateUser(payload)
        },
        isOnline(state, { payload }) {
            const updateUser = async (id) => {

                const userDoc = doc(db, "users", id)
                const newFileds = {
                    time: time()
                }
                await updateDoc(userDoc, newFileds)
            }
            updateUser(payload)
        },
        dateOfLastActivity(state, { payload }) {
            const updateUser = async (id) => {

                const userDoc = doc(db, "users", id)
                const newFileds = {
                    dateOfLastActivity: data()
                }
                await updateDoc(userDoc, newFileds)
            }
            updateUser(payload)
        }
    }
})

export const selectSettings = state => state.setting

export const { accountSettingChange, emailChange, passwordChange, deleteAccount, isOnline, dateOfLastActivity } = settingSlices.actions

export const settingsReducer = settingSlices.reducer