import { auth, provider } from "./firebaseConfig";
import { signInWithPopup, getIdToken } from "firebase/auth";



document.getElementById("login-Button").addEventListener("click", async () =>{
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
    
        // Get Firebase ID token
        const idToken = await getIdToken(user);
        console.log("User ID Token:", idToken);
    
        // Send token to your backend server
        console.log("Fetching /verify-token"); // Before Fetch
        const response = await fetch("http://localhost:3000/verify-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: idToken }),
        });
    
        const data = await response.json();
        if (response.ok){
            window.location.href = '/login.html'
        } else {
            console.error("Token verification failed:", data);
        }

       
      } catch (error) {
        console.error("Sign-in failed:", error);
      }
});

