// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6Bt5d4_pfclpJ-1pHbR5eZbPbrdPxeio",
    authDomain: "auth-5f6f6.firebaseapp.com",
    databaseURL: "https://auth-5f6f6-default-rtdb.firebaseio.com",
    projectId: "auth-5f6f6",
    storageBucket: "auth-5f6f6.appspot.com",
    messagingSenderId: "900288831394",
    appId: "1:900288831394:web:7bcf03f084f8fe2fef1cfb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

