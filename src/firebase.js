// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsSO9oQQtxSXxKAVmP8sE2LdzJc2zuGKA",
  authDomain: "chatapp-a738e.firebaseapp.com",
  projectId: "chatapp-a738e",
  storageBucket: "chatapp-a738e.appspot.com",
  messagingSenderId: "53144604735",
  appId: "1:53144604735:web:81ad4d86dfcf8d9f16e88a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);