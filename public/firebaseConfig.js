import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: 'AIzaSyBiz3hf2uZWqsOAHu7CVUOmru-wkHZ8NXY',
    authDomain: 'gems-350b8.firebaseapp.com',
    projectId: "gems-350b8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};