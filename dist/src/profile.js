import { db, auth } from './firebaseConfig.js';
import {doc, setDoc } from './firebaseConfig.js'

//cuhange profile.css to contain the select with toudned radius


//Intialize items
document.addEventListener('DOMContentLoaded', function() {
    
    const firstContainer = document.getElementById("first-container");
    const actionButton = document.getElementById("action-button");
    const avatarContainer = document.getElementById("avatar-container");
    const avatarSelectionContainer = document.getElementById("avatar-selection");
    const spriteButton = document.getElementById("choose-sprite-button");
    const informationContainer = document.getElementById("information-container");
    const tutorialContainer = document.getElementById("tutorial-container");
    const confirmNext = document.getElementById("confirm-country");
    const selectedCountry = document.getElementById("country");
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

    if (actionButton) {  // Check if the element exists
        actionButton.addEventListener("click", () => {
            firstContainer.style.display = "none";
            avatarContainer.style.display = "block";
            avatarSelectionContainer.style.display = "block";
            spriteButton.style.display = "block";
            informationContainer.style.display = "none";
            tutorialContainer.style.display = "none";

            
        });
    } else {
        console.error("Action button not found!");
    }


    //Avatar selection button
    avatarSelectionContainer.addEventListener("click", (event) => {
        if(event.target.tagName === "IMG") {
            console.log("Avatar is selected");
            console.log(event.target.id);
            localStorage.setItem("avatar_id", event.target.id); // Store the selected avatar ID in local storage
        }
    });



    if (spriteButton) {  // Check if the element exists
        spriteButton.addEventListener("click", async () => {
            firstContainer.style.display = "none";
            avatarContainer.style.display = "none";
            avatarSelectionContainer.style.display = "none";
            spriteButton.style.display = "none";
            informationContainer.style.display = "block";
            tutorialContainer.style.display = "none";

            let storedId = localStorage.getItem("avatar_id");


            const user = auth.currentUser;

            if (user){
                const userDocRef = doc(db, "users", user.uid);
                await setDoc(userDocRef, {
                    avatar_id: storedId
                }, { merge: true }) 

                .then(() => {
                    console.log("Avatar ID saved successfully.");
                })

                .catch((error) => {
                    console.error("Error saving avatar ID:", error);
                });

            }
    
            
            
           
        });


    } else {
        console.error("Action button not found!");
    }


    if(confirmNext) {  // Check if the element exists
            confirmNext.addEventListener("click", async () => {
                firstContainer.style.display = "none";
                avatarContainer.style.display = "none";
                avatarSelectionContainer.style.display = "none";
                spriteButton.style.display = "none";
                informationContainer.style.display = "none";
                tutorialContainer.style.display = "block";

                window.location.href = '/welcome.html';
            

            const user = auth.currentUser;

            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                await setDoc(userDocRef, {
                    country: selectedCountry.value
                }, { merge: true })
                .then(() => {
                    console.log("Country saved successfully.");
                
                })

                .catch((error) => {
                    console.error("Error saving country:", error);
                });
            }

            });

        } else {
            console.error("Action button not found!");
        }
 });