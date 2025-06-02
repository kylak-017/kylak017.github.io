import firebase from 'firebase/app';
import 'firebase/database';
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

    const db = firebase.database();

    if (actionButton) {  // Check if the element exists
        actionButton.addEventListener("click", () => {
            firstContainer.style.display = "none";
            avatarContainer.style.display = "block";
            avatarSelectionContainer.style.display = "block";
            spriteButton.style.display = "block";
            informationContainer.style.display = "none";
            tutorialContainer.style.display = "none";
            db.ref("users/avatar_id").set({
                avatar_id: "" //나중에 지후한테서 받으면 하기 
            }).then(() => {
            console.log("Data uploaded!");
            }).catch((error) => {
            console.error("Upload failed:", error);
            });
        });
    } else {
        console.error("Action button not found!");
    }

    if (spriteButton) {  // Check if the element exists
        spriteButton.addEventListener("click", () => {
            firstContainer.style.display = "none";
            avatarContainer.style.display = "none";
            avatarSelectionContainer.style.display = "none";
            spriteButton.style.display = "none";
            informationContainer.style.display = "block";
            tutorialContainer.style.display = "none";
            db.ref("users/location").set({
                loc: selectedCountry.value // Assuming selectedCountry is a select element with value,
                }).then(() => {
                console.log("Data uploaded!");
                }).catch((error) => {
                console.error("Upload failed:", error);
                });
        });


    if( confirmNext) {  // Check if the element exists
        confirmNext.addEventListener("click", () => {
            firstContainer.style.display = "none";
            avatarContainer.style.display = "none";
            avatarSelectionContainer.style.display = "none";
            spriteButton.style.display = "none";
            informationContainer.style.display = "none";
            tutorialContainer.style.display = "block";

            window.location.href = '/about.html';
        });
    }


    } else {
        console.error("Action button not found!");
    }
});

