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

  // --- 4. Project Media Reveal System (Logo-to-Fullscreen) ---
  document.querySelectorAll(".project-media-wrapper").forEach((wrapper) => {
    // Add click handler to the wrapper
    wrapper.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Get the dashboard image source from this specific card
      const dashboardImage = wrapper.querySelector(".project-dashboard");
      if (!dashboardImage) return;

      const imageSrc = dashboardImage.getAttribute("src");
      if (!imageSrc) return;

      // Create fullscreen lightbox with fade-in effect
      const instance = basicLightbox.create(
        `<div class="lightbox-container" style="position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.95);">
          <img src="${imageSrc}" style="max-width: 95%; max-height: 95%; object-fit: contain; border-radius: 8px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);" alt="Project Dashboard" />
        </div>`,
        {
          onShow: (instance) => {
            // Add fade-in animation
            const element = instance.element();
            element.style.opacity = "0";
            element.style.transition = "opacity 0.3s ease-in";
            
            // Trigger fade-in
            setTimeout(() => {
              element.style.opacity = "1";
            }, 10);

            // Create and add close button
            const container = element.querySelector(".lightbox-container");
            if (container) {
              const closeButton = document.createElement("button");
              closeButton.className = "lightbox-close-button";
              closeButton.innerHTML = "×";
              closeButton.style.cssText = `
                position: fixed;
                top: 2rem;
                right: 2rem;
                background: rgba(0, 0, 0, 0.7);
                border: 2px solid rgba(255, 255, 255, 0.3);
                color: white;
                font-size: 2rem;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                z-index: 10000;
                line-height: 1;
                padding: 0;
                margin: 0;
              `;

              // Add click handler
              closeButton.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                instance.close();
              });
              
              // Hover effect for close button
              closeButton.addEventListener("mouseenter", () => {
                closeButton.style.background = "rgba(255, 255, 255, 0.2)";
                closeButton.style.borderColor = "rgba(255, 255, 255, 0.6)";
                closeButton.style.transform = "scale(1.1)";
              });
              
              closeButton.addEventListener("mouseleave", () => {
                closeButton.style.background = "rgba(0, 0, 0, 0.7)";
                closeButton.style.borderColor = "rgba(255, 255, 255, 0.3)";
                closeButton.style.transform = "scale(1)";
              });

              // Append to body instead of container to ensure it's always on top
              document.body.appendChild(closeButton);

              // Store reference to remove on close
              instance._closeButton = closeButton;
            }

            // Close on Escape key
            const escapeHandler = function(e) {
              if (e.key === "Escape") {
                instance.close();
              }
            };
            document.addEventListener("keydown", escapeHandler);
            instance._escapeHandler = escapeHandler;
          },
          onClose: (instance) => {
            // Remove close button if it exists
            if (instance._closeButton && instance._closeButton.parentNode) {
              instance._closeButton.parentNode.removeChild(instance._closeButton);
            }
            // Remove escape handler
            if (instance._escapeHandler) {
              document.removeEventListener("keydown", instance._escapeHandler);
            }
          },
        }
      );

      // Show the lightbox
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

  // --- 7. Request Access Modal Functionality ---
  const requestModal = document.getElementById("request-modal");
  const modalProjectName = document.getElementById("modal-project-name");
  const closeModalBtn = document.querySelector(".close-modal");
  const requestAccessButtons = document.querySelectorAll(".btn-request-access");
  const whatsappBtn = document.getElementById("ws-request");
  const emailBtn = document.getElementById("email-request");

  // Function to generate WhatsApp URL with encoded message
  function generateWhatsAppURL(projectName) {
    const message = `Hi Julio! I'm interested in a live demonstration of your project: ${projectName}. Please let me know when you're available for a brief walkthrough.`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/50239404618?text=${encodedMessage}`;
  }

  // Function to generate Email URL with encoded subject and body
  function generateEmailURL(projectName) {
    const subject = `Demo Request: ${projectName}`;
    const body = `Hi Julio,\r\n\r\nI was exploring your portfolio and I am very interested in seeing a live demonstration of "${projectName}".\r\n\r\nLet's connect!`;
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    return `mailto:julio.1995.hidalgo@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
  }

  // Function to open modal and set up links
  function openModal(projectName) {
    // Update project name display
    if (modalProjectName) {
      modalProjectName.textContent = projectName;
    }

    // Update WhatsApp link with project-specific message
    if (whatsappBtn) {
      whatsappBtn.href = generateWhatsAppURL(projectName);
    }

    // Update Email link with project-specific subject and body
    if (emailBtn) {
      emailBtn.href = generateEmailURL(projectName);
    }

    // Show modal
    if (requestModal) {
      requestModal.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
  }

  // Function to close modal
  function closeModal() {
    if (requestModal) {
      requestModal.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    }
  }

  // Add click handlers to all request access buttons
  requestAccessButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const projectName = button.getAttribute("data-project") || "Project";
      openModal(projectName);
    });
  });

  // Close modal when close button is clicked
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });
  }

  // Close modal when clicking outside the modal content
  if (requestModal) {
    requestModal.addEventListener("click", (e) => {
      // Only close if clicking directly on the modal background, not on modal content
      if (e.target === requestModal) {
        closeModal();
      }
    });
  }

  // Prevent modal from closing when clicking inside modal content
  const modalContent = document.querySelector(".modal-content");
  if (modalContent) {
    modalContent.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // Close modal when Escape key is pressed
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && requestModal && requestModal.classList.contains("active")) {
      closeModal();
    }
  });
}); // End of 'DOMContentLoaded'
