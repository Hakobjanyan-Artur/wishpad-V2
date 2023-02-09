import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyBcavQtVolDbJV3X_5e3nXVGJ1lVTPYB7Q",
    authDomain: "artchat-86d4b.firebaseapp.com",
    projectId: "artchat-86d4b",
    storageBucket: "artchat-86d4b.appspot.com",
    messagingSenderId: "917142935201",
    appId: "1:917142935201:web:487c62ab4e5e2562b042e0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const appFile = initializeApp(firebaseConfig)

export const storage = getStorage(appFile)