document.addEventListener("DOMContentLoaded", function () {
  // Wait for 2.5 seconds before hiding the loader
  setTimeout(function () {
    document.querySelector(".initial-loader").style.display = "none";
    document.body.classList.remove("loading");
  }, 2500); // 2500 milliseconds = 2.5 seconds
});

// Ensure the body has the loading class by default
document.body.classList.add("loading");

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

  // setInterval(nextSlide, 4000); // Change slide every 4 seconds

  showSlide(currentSlide);
}

// Initialize sliders for each container
document.querySelectorAll(".slider-container").forEach((container) => {
  mainSlider(container);
});

function ytLoader() {
  let div = document.querySelectorAll(".course-card iframe");
  div.forEach(function (iframe) {
    iframe.onload = function () {
      const loader = this.previousElementSibling;
      loader.style.display = "none"; // Hide the skeleton loader
      this.style.display = "block"; // Show the iframe
    };
  });
}
ytLoader();

// FAQ's
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const faqItem = button.parentElement;
    const faqAnswer = faqItem.querySelector(".faq-answer");
    const faqIcon = button.querySelector(".faq-icon");

    if (faqAnswer.style.maxHeight) {
      faqAnswer.style.maxHeight = null;
      faqAnswer.style.height = null;
      faqIcon.style.transform = "rotate(0deg)";
      faqAnswer.style.padding = "0 20px";
    } else {
      document.querySelectorAll(".faq-answer").forEach((answer) => {
        answer.style.maxHeight = null;
        answer.style.height = null;
        answer.style.padding = "0 20px";
      });
      document.querySelectorAll(".faq-icon").forEach((icon) => {
        icon.style.transform = "rotate(0deg)";
      });
      faqAnswer.style.height = "100%";
      faqAnswer.style.maxHeight = "100%";
      faqIcon.style.transform = "rotate(45deg)";
      faqAnswer.style.padding = "15px 20px";
    }
  });
});

// Testimonial Slider
function testimonials() {
  let testiomnialData = [
    {
      avatar: "./assets/rahulShewale.png",
      name: "Rahul Shewale",
      review:
        "I am thrilled to be learning with Abhi Sir, who is an excellent mentor. His methods of instruction are always clear, concise, and rational.",
    },
    {
      avatar:
        "https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629mac.jpg",
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
    {
      avatar:
        "https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg",
      name: "Gaston Cunnow",
      review:
        "Amazing product! It changed my life. Can't live without it now. Highly recommended to everyone!",
    },
  ];

  let slideHolder = document.getElementById("slideHolder");

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
    autoplay: { delay: 20000000 },
  });
  window.onresize = queryResizer;
  queryResizer();
  function queryResizer() {
    if (window.innerWidth >= 1024) {
      swiper.params.slidesPerView = 5; // Total 5 slides visible
      swiper.params.centeredSlides = true; // Center the active slide
      swiper.params.spaceBetween = 20; // Adjust the space between slides (optional)
    } else if (window.innerWidth >= 724) {
      swiper.params.slidesPerView = 3.5;
      swiper.params.centeredSlides = false;
      swiper.params.spaceBetween = 10; // Adjust the space between slides (optional)
    } else if (window.innerWidth >= 501) {
      swiper.params.slidesPerView = 2;
      swiper.params.centeredSlides = false;
      swiper.params.spaceBetween = 10; // Adjust the space between slides (optional)
    } else {
      swiper.params.slidesPerView = 1;
      swiper.params.centeredSlides = false;
      swiper.params.spaceBetween = 10; // Adjust the space between slides (optional)
    }
    swiper.update();
  }
}

testimonials();
