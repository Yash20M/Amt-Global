function loader() {
  window.addEventListener("load", function () {
    const loaderContainer = document.getElementById("loader-container");

    setTimeout(() => {
      loaderContainer.remove();
    }, 4000); // Adjust the timeout to match the total animation duration
  });
}
loader();

let lastScrollTop = 0;
let isScrolling;

function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("toggle");
}

window.addEventListener("scroll", function () {
  const currentScrollTop =
    window.pageYOffset || document.documentElement.scrollTop;
  const navbar = document.querySelector(".navbar");

  if (currentScrollTop > lastScrollTop) {
    // Scrolling down
    navbar.classList.add("hidden");
  } else {
    // Scrolling up
    navbar.classList.remove("hidden");
  }

  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;

  clearTimeout(isScrolling);

  // Set a timeout to add 'hidden' class if scrolling stops
  isScrolling = setTimeout(function () {
    navbar.classList.remove("hidden");
  }, 3000); // Adjust timeout as needed
});

// SliderMain
function mainSlider(sliderContainer) {
  let currentSlide = 0;
  const slides = sliderContainer.querySelectorAll(".slide");
  const dots = sliderContainer.querySelectorAll(".dot");

  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    const offset = -currentSlide * 100;
    sliderContainer.querySelector(
      ".slides"
    ).style.transform = `translateX(${offset}%)`;

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  sliderContainer.querySelectorAll(".dot").forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });

  setInterval(nextSlide, 4000); // Change slide every 4 seconds

  showSlide(currentSlide);
}

// Initialize sliders for each container
document.querySelectorAll(".slider-container").forEach((container) => {
  mainSlider(container);
});

// Testimonial Slider
let testiomnialData = [
  {
    avatar: "./assets/rahulShewale.png",
    name: "Rahul Shewale",
    review:
      "I am thrilled to be learning with Abhi Sir, who is an excellent mentor. His methods of instruction are always clear, concise, and rational.",
  },
  {
    avatar:
      "https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg",
    name: "Merilee Beal",
    review:
      "Unbelievable gem! Altered my life. A must-have now. Wholeheartedly advise it to everyone. An absolute game-changer",
  },
  {
    avatar:
      "https://img.freepik.com/free-photo/handsome-african-guy-with-stylish-haircut-taking-photo-digital-camera_171337-1345.jpg",
    name: "Suzi Lankester",
    review:
      "Phenomenal addition! Completely transformed my days. Can't go without it. Strongly endorse for all. A game-changer for sure!",
  },
  {
    avatar:
      "https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg",
    name: "Gaston Cunnow",
    review:
      "Amazing product! It changed my life. Can't live without it now. Highly recommended to everyone!",
  },
];

let slideHolder = document.querySelector("#slideHolder");
for (let i of testiomnialData)
  slideHolder.innerHTML += `<div class="swiper-slide"> <div class="ImgHolder"><img src="${i.avatar}" class="reviews-img"></div><div class="ContentHolder"><h3 class="reviews-head">${i.name}</h3><p class="reviews-para">${i.review}</p></div></div>`;

const swiper = new Swiper("#craouselContainer", {
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 2.3,
  loop: true,
  spaceBetween: 30,
  effect: "coverflow",
  coverflowEffect: {
    rotate: 0,
    depth: 800,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: { delay: 2000 },
});
window.onresize = queryResizer;
queryResizer();
function queryResizer() {
  if (window.innerWidth < 724) swiper.params.slidesPerView = 2;
  if (window.innerWidth > 501) swiper.params.slidesPerView = 2;
  if (window.innerWidth > 724) swiper.params.slidesPerView = 2.3;
  if (window.innerWidth < 501) swiper.params.slidesPerView = 1;
  swiper.update();
}
