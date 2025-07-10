document.addEventListener('DOMContentLoaded', function() {
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




