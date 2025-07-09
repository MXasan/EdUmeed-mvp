
// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB3kNew3K9iCh0Z-NZ5W-5i6H-3Qcbj7YI",
    authDomain: "edumeedapp.firebaseapp.com",
    projectId: "edumeedapp",
    storageBucket: "edumeedapp.firebasestorage.app",
    messagingSenderId: "715351646933",
    appId: "1:715351646933:web:1de20df0a0f31641bd385c",
    measurementId: "G-L8JQ615VPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 
export const storage = getStorage(app);
const analytics = getAnalytics(app);