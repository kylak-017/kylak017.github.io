//add in the newsletter css and the button configurations as the macbook tabs

import { auth } from './firebaseConfig.js';
import { getRedirectResult, getIdToken, onAuthStateChanged } from './firebaseConfig.js';
window.addEventListener("DOMContentLoaded", async () => {
    try {
            const result = await getRedirectResult(auth);
            if (result) {
                const user = result.user;
                const idToken = await getIdToken(user);
    
                console.log("User ID Token:", idToken);
    
                const response = await fetch("/verify-token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${idToken}`
                    }
                });
    
    
                const data = await response.json();
                if (response.ok) {
                   setTimeout(() => window.location.href = '/profile.html', 0);
                } else {
                    console.error("Token verification failed:", data);
                }
    
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        // Handle token verification and redirection here
                        verifyTokenAndRedirect(user);
                    }
                });
            }
        } catch (error) {
            console.error("Error during redirect result handling:", error);
        }
  const about = document.getElementById("about-button");
    const inita = document.getElementById("init-button");
    const newsletter = document.getElementById("news-button");


    if(about){
        about.addEventListener("click", () => {
        window.location.href = '/about.html';
        });
    }

    if(inita){
        inita.addEventListener("click", () => {
        window.location.href = '/inita.html';
        });
    }

    if(newsletter){
        newsletter.addEventListener("click", () => {
        window.location.href = '/newsletter.html';
        });
    }
});