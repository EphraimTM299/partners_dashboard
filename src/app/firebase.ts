import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,  } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAFZHD46yE9Lh-DlRxHS5ma8Y3oHARZFq0",
    authDomain: "testproject-8941c.firebaseapp.com",
    databaseURL: "https://testproject-8941c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "testproject-8941c",
    storageBucket: "testproject-8941c.appspot.com",
    messagingSenderId: "795844478666",
    appId: "1:795844478666:web:02af197d6babfdf066d633"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { app, db, auth }