//Intialize items
document.addEventListener('DOMContentLoaded', function() {
    const firstContainer = document.getElementById("first-container");
    const actionButton = document.getElementById("action-button");
    const avatarContainer = document.getElementById("avatar-container");
    const avatarSelectionContainer = document.getElementById("avatar-selection");
    const spriteButton = document.getElementById("choose-sprite-button");
    const informationContainer = document.getElementById("information-container");
    const tutorialContainer = document.getElementById("tutorial-container");

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

    if (spriteButton) {  // Check if the element exists
        spriteButton.addEventListener("click", () => {
            firstContainer.style.display = "none";
            avatarContainer.style.display = "none";
            avatarSelectionContainer.style.display = "none";
            spriteButton.style.display = "none";
            informationContainer.style.display = "block";
            tutorialContainer.style.display = "none";
        });
    } else {
        console.error("Action button not found!");
    }
});

