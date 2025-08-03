//add in the newsletter css and the button configurations as the macbook tabs

import { auth } from './firebaseConfig.js';
import { getRedirectResult, getIdToken, onAuthStateChanged } from './firebaseConfig.js';
window.addEventListener("DOMContentLoaded", async () => {

    
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

    document.getElementById('click-zone').addEventListener('click', function(e) {
  const rect = this.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Optionally normalize to % for responsiveness
  const percentX = (x / rect.width) * 100;
  const percentY = (y / rect.height) * 100;

  console.log(`Clicked at: ${x}px, ${y}px`);
  console.log(`Or: ${percentX.toFixed(2)}%, ${percentY.toFixed(2)}%`);

  // Trigger actions based on position
  if (percentX > 25 && percentX < 35 && percentY > 30 && percentY < 40) {
    alert("You clicked on 'Cooperate'");
  } else if (percentX > 45 && percentX < 55 && percentY > 50 && percentY < 60) {
    alert("You clicked on 'Spread'");
  } else if (percentX > 65 && percentX < 75 && percentY > 70 && percentY < 80) {
    alert("You clicked on 'Share'");
  }
});

});