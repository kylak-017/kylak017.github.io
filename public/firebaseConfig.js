import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: 'AIzaSyDbHQESl1DYg-xRv7XPiYwTGf6WgMxmU0g',
    authDomain: 'sdg18-8924b.firebaseapp.com',
    projectId: "sdg18-8924b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};