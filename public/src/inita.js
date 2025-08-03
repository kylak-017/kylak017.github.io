//add in the newsletter css and the button configurations as the macbook tabs

import { auth } from './firebaseConfig.js';
import { getRedirectResult, getIdToken, onAuthStateChanged } from './firebaseConfig.js';
window.addEventListener("DOMContentLoaded", async () => {

    
  const about = document.getElementById("about-button");
    const inita = document.getElementById("init-button");
    const newsletter = document.getElementById("news-button");
    const close = document.getElementById("close");


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

    if(close){
        close.addEventListener("click", () => {
        document.getElementById("initp1").style.display = "none";
        document.getElementById("initp2").style.display = "none";
        document.getElementById("initp3").style.display = "none";
        document.getElementById("close").style.display = "none";
         document.getElementById("click-zone").style.display = "block";
        });

    }

    document.getElementById('click-zone').addEventListener('click', function(e) {
        document.getElementById("initp1").style.display = "none";
        document.getElementById("initp2").style.display = "none";
        document.getElementById("initp3").style.display = "none";
        document.getElementById("close").style.display = "none";
        document.getElementById("click-zone").style.display = "block";

        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (510 <= y && y <= 900 && 80 <= x && x < 450) {
            document.getElementById("initp1").style.display = "block";
            document.getElementById("close").style.display = "block";
            document.getElementById("click-zone").style.display = "none";
            
        }

        if (510 <= y && y <= 900 && 547 <= x && x < 870) {
            document.getElementById("initp2").style.display = "block";
            document.getElementById("close").style.display = "block";
            document.getElementById("click-zone").style.display = "none";
            
        }

        if (510 <= y && y <= 900 && 890 <= x && x < 1750) {
            document.getElementById("initp3").style.display = "block";
            document.getElementById("close").style.display = "block";
            document.getElementById("click-zone").style.display = "none";
            
        }

        // Optionally normalize to % for responsiveness
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;

        console.log(`Clicked at: ${x}px, ${y}px`);
        console.log(`Or: ${percentX.toFixed(2)}%, ${percentY.toFixed(2)}%`);

        });

});