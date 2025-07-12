import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, getIdToken, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: 'AIzaSyBiz3hf2uZWqsOAHu7CVUOmru-wkHZ8NXY',
    authDomain: 'gems-350b8.firebaseapp.com',
    projectId: "gems-350b8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();



export {db, auth, provider, doc, setDoc, getDoc, signInWithRedirect, getRedirectResult, getIdToken, onAuthStateChanged };