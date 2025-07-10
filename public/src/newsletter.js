//add in the newsletter css and the button configurations as the macbook tabs
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


let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1} //init back to first slide
  if (n < 1) {slideIndex = slides.length} //back to last slide
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; //그 전꺼 하나씩 줄이면서 이동
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  } //change to inactive
  //display the current slide
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

});