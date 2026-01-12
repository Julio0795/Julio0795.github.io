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
        "I build real-time AI Co-Pilots for high-stakes conversations.",
        { delay: 2000 }
      )
      .delete(null, { delay: 1500 })
      .type("I automate complex business processes with Power Automate.", { delay: 2000 })
      .delete(null, { delay: 1500 })
      .type("I bridge the gap between human speech and Generative AI.", { delay: 2500 })
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

  // --- 4. Project Media Reveal System & Lightbox ---
  document.querySelectorAll(".project-media-wrapper").forEach((wrapper) => {
    const imageLink = wrapper.querySelector(".project-image-link");
    const imageUrl = imageLink.getAttribute("href");
    let isRevealed = false;

    // Add click handler to the wrapper
    wrapper.addEventListener("click", function (e) {
      e.preventDefault();

      if (!isRevealed) {
        // First click: Reveal the dashboard
        wrapper.classList.add("is-revealed");
        isRevealed = true;

        // Camera Flash effect: white overlay flash for 0.1s
        const cameraFlash = document.createElement("div");
        cameraFlash.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #ffffff;
          pointer-events: none;
          z-index: 15;
          opacity: 1;
          transition: opacity 0.1s ease-out;
        `;

        wrapper.appendChild(cameraFlash);

        // Fade out the flash after 0.1s
        setTimeout(() => {
          cameraFlash.style.opacity = "0";
          // Remove element after transition completes
          setTimeout(() => {
            if (cameraFlash.parentNode) {
              cameraFlash.parentNode.removeChild(cameraFlash);
            }
          }, 100);
        }, 10);
      } else {
        // Second click: Open lightbox
        const instance = basicLightbox.create(`<img src="${imageUrl}">`, {
          onShow: (instance) => {
            // Create a button element
            const closeButton = document.createElement("button");
            closeButton.innerHTML = "×";
            closeButton.className = "lightbox-close-button";
            closeButton.onclick = instance.close;
            instance.element().appendChild(closeButton);
          },
        });

        instance.show();
      }
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
      // Remove active class from all cards
      testimonialCards.forEach((card) => card.classList.remove("active"));

      // Remove active class from all dots, if dots exist
      if (dots.length > 0) {
        dots.forEach((dot) => dot.classList.remove("active"));
      }

      // Add active class to current slide
      testimonialCards[currentSlide].classList.add("active");

      // Add active class to current dot, if dots exist
      if (dots.length > 0) {
        dots[currentSlide].classList.add("active");
      }

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
    if (totalSlides > 1) {
      if (nextBtn) nextBtn.style.display = "flex"; // Show if more than one slide
      if (prevBtn) prevBtn.style.display = "flex"; // Show if more than one slide
      if (nextBtn) nextBtn.addEventListener("click", nextSlide);
      if (prevBtn) prevBtn.addEventListener("click", prevSlide);
    }

    // Event listeners for dots, if dots exist and there's more than one slide
    if (dots.length > 0 && totalSlides > 1) {
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => goToSlide(index));
      });
    }

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
      console.log("Burger menu clicked!");
      navLinks.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });
  }
}); // End of 'DOMContentLoaded'
