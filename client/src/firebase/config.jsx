// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDvm-CNbpbWzdIa4dhv7EUY5n5weTUWE18",
    authDomain: "note-app-b458c.firebaseapp.com",
    projectId: "note-app-b458c",
    storageBucket: "note-app-b458c.appspot.com",
    messagingSenderId: "96415869195",
    appId: "1:96415869195:web:097d9822f7ccb5db1f9a0e",
    measurementId: "G-ZGXH36L08M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);