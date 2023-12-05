"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const nav = document.querySelector(".nav");
const sectionOne = document.getElementById("section--1");
const header = document.querySelector(".header");

const openModal = function (event) {
    event.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};
btnsOpenModal.forEach((cur) => cur.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});
// My work
const btnScrollTo = document.querySelector(".btn--scroll-to");
btnScrollTo.addEventListener("click", function (e) {
    // Old school
    window.scrollTo({
        left: sectionOne.getBoundingClientRect().left + window.pageXOffset,
        top: sectionOne.getBoundingClientRect().top + window.pageYOffset,
        behavior: "smooth",
    });
    // new Way
    // sectionOne.scrollIntoView({ behavior: 'smooth' });
});
document.querySelector(".nav__links").addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
});

//operaion Action
const tabContainer = document.querySelector(".operations__tab-container");
tabContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".operations__tab");
    if (!clicked) return;
    //Remove Activation
    document.querySelector(".operations__tab--active").classList.remove("operations__tab--active");
    document.querySelector(".operations__content--active").classList.remove("operations__content--active");
    //Add Activation
    clicked.classList.add("operations__tab--active");
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
});
// hover
const hadleHover = function (e) {
    if (e.target.classList.contains("nav__link")) {
        const shibling = e.target.closest(".nav").querySelectorAll(".nav__link , img");
        shibling.forEach((el) => {
            if (el != e.target) {
                el.style.opacity = this;
            }
        });
    }
};
nav.addEventListener("mouseover", hadleHover.bind(0.5));
nav.addEventListener("mouseout", hadleHover.bind(1));
// Sticky nav
////////////////////////////////////////Old School//////////////////////////////////////
/* const sectionOneCooredinaltes = sectionOne.getBoundingClientRect();
console.log(sectionOneCooredinaltes);
window.addEventListener("scroll", function () {
    if (window.scrollY > sectionOneCooredinaltes.top) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
});
*/
////////////////////////////////////////NEW School//////////////////////////////////////
const observeFucntion = function (entry) {
    const [ent] = entry;
    if (!ent.isIntersecting) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
};
const navHeight = nav.getBoundingClientRect().height;
const observation = new IntersectionObserver(observeFucntion, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});
observation.observe(header);

//Revealing Elments on scroll
const setions = document.querySelectorAll(".section");
const revealingFun = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    revealingObserve.unobserve(entry.target);
};
const revealingObserve = new IntersectionObserver(revealingFun, { root: null, threshold: 0.15 });
setions.forEach((section) => {
    revealingObserve.observe(section);
    section.classList.add("section--hidden");
});
// lazing load image
const images = document.querySelectorAll("img[data-src]");
const lazyFun = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", function () {
        entry.target.classList.remove("lazy-img");
    });
    lazyObserve.unobserve(entry.target);
};
const lazyObserve = new IntersectionObserver(lazyFun, { root: null, threshold: 0.5 });
images.forEach((img) => {
    lazyObserve.observe(img);
});

// Slider
const slides = document.querySelectorAll(".slide");
const leftBtn = document.querySelector(".slider__btn--left");
const rightBtn = document.querySelector(".slider__btn--right");
const dots = document.querySelector(".dots");
let curentslide = 0;
// Functions
const setDotes = () => {
    slides.forEach((_, i) => {
        dots.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${i}"></button>`);
    });
};
const goToslide = function (slide) {
    [...dots.children].forEach((e) => e.classList.remove("dots__dot--active"));
    dots.children[slide].classList.add("dots__dot--active");
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${(i - slide) * 100}%)`;
    });
};
const nextSlide = function () {
    curentslide = (curentslide + 1) % slides.length;
    goToslide(curentslide);
};
const perviousSlide = function () {
    curentslide === 0 ? (curentslide = slides.length - 1) : curentslide--;
    goToslide(curentslide);
};
setDotes();
goToslide(0);
//Eventlistener
rightBtn.addEventListener("click", nextSlide);
leftBtn.addEventListener("click", perviousSlide);
document.addEventListener("keydown", function (e) {
    e.key === "ArrowRight" && nextSlide();
    e.key === "ArrowLeft" && perviousSlide();
});
dots.addEventListener("click", function (e) {
    if (!e.target.classList.contains("dots__dot")) return;
    goToslide(e.target.dataset.slide);
});
