const slides = document.querySelector(".carousel-item");
const nextButton = document.querySelector("#carousel-button-next");
const prevButton = document.querySelector("#carousel-button-prev");
let position = 0;
const numofSlides = slides.length;

function hideSlides() {
    for (const slide of slides) {
        slide.classList.remove("carousel-item-visible");
        slide.classList.add("carousel-item-hidden");
    }
}

const nextSlide = function(e) {
    hideSlides();
    console.log("next")
    if (position === numofSlides-1) {
        position = 0;
    }
    else {
        position++;
    }
    slides[position].classList.add("carousel-item-visible");
}

const prevSlide = function(e) {
    hideSlides();
    console.log("prev");
    if (position === 0) {
        position = numofSlides - 1;
    }
    else {
        position--; 
    }
    slides[position].classList.add("carousel-item-visible"); 
}

nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide); 