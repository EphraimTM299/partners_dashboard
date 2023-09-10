import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,  } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAFZHD46yE9Lh-DlRxHS5ma8Y3oHARZFq0",
    authDomain: "testproject-8941c.firebaseapp.com",
    databaseURL: "https://testproject-8941c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "testproject-8941c",
    storageBucket: "testproject-8941c.appspot.com",
    messagingSenderId: "795844478666",
    appId: "1:795844478666:web:5069d20087bd4bab66d633",
    // apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    // authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    // databaseURL:process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    // projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    // storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    // appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { app, db, auth }