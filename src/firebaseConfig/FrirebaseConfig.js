import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyB40aXaFnEt3HVbKcihKREVdCV5KFjV7S8",
    authDomain: "wishpad2-c308a.firebaseapp.com",
    projectId: "wishpad2-c308a",
    storageBucket: "wishpad2-c308a.appspot.com",
    messagingSenderId: "1061419889528",
    appId: "1:1061419889528:web:3714140e73b88bb9d60e8d",
    measurementId: "G-TLWF8L47K9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const appFile = initializeApp(firebaseConfig)

export const storage = getStorage(appFile)