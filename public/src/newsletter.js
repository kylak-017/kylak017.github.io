import { auth } from './firebaseConfig.js';
import { getRedirectResult, getIdToken, onAuthStateChanged } from './firebaseConfig.js';

async function handleRedirectResult() {
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
        }
    } catch (error) {
        console.error("Error during redirect result handling:", error);
    }
}

// Run this automatically after page load
window.addEventListener("load", handleRedirectResult);

document.addEventListener('DOMContentLoaded', function () {
    const about = document.getElementById("about-button");
    const inita = document.getElementById("init-button");
    const newsletter = document.getElementById("news-button");
    const signupButton = document.getElementById("signup-button");

    if (signupButton) {
        signupButton.addEventListener("click", () => {
            // Here you’d normally call signInWithRedirect(...)
        });
    }

    if (about) {
        about.addEventListener("click", () => {
            window.location.href = '/about.html';
        });
    }

    if (inita) {
        inita.addEventListener("click", () => {
            window.location.href = '/inita.html';
        });
    }

    if (newsletter) {
        newsletter.addEventListener("click", () => {
            window.location.href = '/newsletter.html';
        });
    }

    // MacBook-style folder tab selection
    const tabs = document.querySelectorAll('.folder-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('selected'));
            tab.classList.add('selected');
        });
    });
});
