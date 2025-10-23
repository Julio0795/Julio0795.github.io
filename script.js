// File: script.js

document.addEventListener("DOMContentLoaded", function () {
  // --- 1. AOS (Animate On Scroll) Initialization ---
  try {
    AOS.init({ duration: 800, once: true, offset: 100 });
  } catch (e) {
    console.error("AOS.init() failed:", e);
  }

  // --- 2. TypeIt (Typing Effect) Initialization ---
  try {
    new TypeIt("#hero-tagline", {
      speed: 50,
      loop: true,
      breakLines: false,
    })
      .type(
        "I build custom software solutions that solve real-world problems.",
        { delay: 2000 }
      )
      .delete(null, { delay: 1500 })
      .type("I automate complex business processes.", { delay: 2000 })
      .delete(null, { delay: 1500 })
      .type("I bring ideas to life with generative AI.", { delay: 2500 })
      .go();
  } catch (e) {
    console.error("TypeIt initialization failed:", e);
  }

  // --- 3. Smooth Scrolling for Navigation Links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute("href"));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // --- 4. Image Lightbox Initialization (with Close Button) ---
  document.querySelectorAll(".project-image-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const imageUrl = this.getAttribute("href");

      // Create the lightbox instance with an onShow callback
      const instance = basicLightbox.create(`<img src="${imageUrl}">`, {
        onShow: (instance) => {
          // Create a button element
          const closeButton = document.createElement("button");
          closeButton.innerHTML = "×"; // The 'times' character
          closeButton.className = "lightbox-close-button";

          // Tell the button to close the lightbox when clicked
          closeButton.onclick = instance.close;

          // Add the button to the lightbox element
          instance.element().appendChild(closeButton);
        },
      });

      instance.show();
    });
  });

  // --- 5. Testimonials Carousel Functionality ---
  const testimonialsWrapper = document.querySelector(".testimonials-wrapper");
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  // Only initialize if testimonials section exists
  if (testimonialsWrapper && testimonialCards.length > 0) {
    let currentSlide = 0;
    const totalSlides = testimonialCards.length;

    // Function to update the carousel display
    function updateCarousel() {
      // Remove active class from all cards and dots
      testimonialCards.forEach((card) => card.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));

      // Add active class to current slide
      testimonialCards[currentSlide].classList.add("active");
      dots[currentSlide].classList.add("active");

      // Update wrapper transform for smooth transition
      testimonialsWrapper.style.transform = `translateX(-${
        currentSlide * 100
      }%)`;
    }

    // Function to go to next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    }

    // Function to go to previous slide
    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    }

    // Function to go to specific slide
    function goToSlide(slideIndex) {
      currentSlide = slideIndex;
      updateCarousel();
    }

    // Event listeners for navigation buttons
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => goToSlide(index));
    });

    // Keyboard navigation support
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    });

    // Auto-play functionality (optional - uncomment to enable)
    /*
        setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds
        */

    // Initialize the carousel
    updateCarousel();
  }

  // --- 6. Mobile Menu Toggle ---
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });
  }
}); // End of 'DOMContentLoaded'
