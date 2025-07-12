import { auth, provider } from "./firebaseConfig";
import { signInWithPopup, getIdToken } from "firebase/auth";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";


document.getElementById("signup-button").addEventListener("click", async () => {
    try {

        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        // Get Firebase ID token
        const idToken = await getIdToken(user); // Correctly retrieves the token
        console.log("User ID Token:", idToken);

        // Send token to your backend server
        console.log("Fetching /verify-token"); // Before Fetch
        const response = await fetch("/verify-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + idToken // Use the idToken here!
            },
            //  No need to send the token in the body, it's in the Authorization header.
            // body: JSON.stringify({ token: idToken }),  // Remove this line
        });

        const data = await response.json();
        if (response.ok) {
            window.location.href = '/profile.html';
        } else {
            console.error("Token verification failed:", data);
        }


    } catch (error) {
        console.error("Sign-in failed:", error);
    }
});