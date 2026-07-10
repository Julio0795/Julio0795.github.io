// File: script.js

// --- Lenis Smooth Scroll Initialization ---
const lenis = new Lenis({
  lerp: 0.1,
  smoothTouch: false
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

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
        "I build AI-powered automations that eliminate manual work.",
        { delay: 2000 }
      )
      .delete(null, { delay: 1500 })
      .type("I build automations with automation platforms like Power Automate or with Python.", { delay: 2000 })
      .delete(null, { delay: 1500 })
      .type("I integrate AI into real business workflows that actually ship.", { delay: 2500 })
      .go();
  } catch (e) {
    console.error("TypeIt initialization failed:", e);
  }

  // --- 3. Smooth Scrolling for Navigation Links ---
  document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // ONLY handle internal links starting with #
      if (href && href.startsWith('#') && href !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          // If using Lenis (Smooth Scroll)
          if (typeof lenis !== 'undefined') {
            lenis.scrollTo(targetElement, { offset: -80 });
          } else {
            // Fallback to native smooth scroll
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      }
      // If it's a mailto or WhatsApp link, DO NOT preventDefault. 
      // Let the browser handle it naturally.
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

  // --- 5. Testimonials Carousel Functionality (multi-slide only) ---
  const testimonialsWrapper = document.querySelector(".testimonials-wrapper");
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".testimonial-dots .dot");
  const prevBtn = document.querySelector(".testimonial-nav.prev-btn");
  const nextBtn = document.querySelector(".testimonial-nav.next-btn");

  // Only initialize carousel when multiple slides exist
  if (testimonialsWrapper && testimonialCards.length > 1) {
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

    // Keyboard navigation support (multi-slide carousel only)
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
  const body = document.body;

  if (mobileMenu && navLinks) {
    // Function to open menu
    function openMenu() {
      navLinks.classList.add("active");
      mobileMenu.classList.add("active");
      body.classList.add("menu-open");
      body.style.overflow = "hidden"; // Lock scroll
    }

    // Function to close menu
    function closeMenu() {
      navLinks.classList.remove("active");
      mobileMenu.classList.remove("active");
      body.classList.remove("menu-open");
      body.style.overflow = ""; // Restore scroll
    }

    // Toggle menu on click
    mobileMenu.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when nav links are clicked
    const navLinkItems = navLinks.querySelectorAll("a");
    navLinkItems.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    // Close menu when clicking outside (on the blur overlay)
    navLinks.addEventListener("click", (e) => {
      if (e.target === navLinks) {
        closeMenu();
      }
    });
  }

  // --- 7. Email Menu + Contact Form ---
  const CONTACT_EMAIL = "julio.1995.hidalgo@gmail.com";
  const emailMenuBtn = document.getElementById("email-menu-btn");
  const emailMenu = document.getElementById("email-menu");

  function setEmailMenuOpen(isOpen) {
    if (!emailMenuBtn || !emailMenu) return;
    emailMenu.hidden = !isOpen;
    emailMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  if (emailMenuBtn && emailMenu) {
    emailMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      setEmailMenuOpen(emailMenu.hidden);
    });

    emailMenu.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    document.addEventListener("click", () => {
      setEmailMenuOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setEmailMenuOpen(false);
      }
    });

    const copyBtn = emailMenu.querySelector('[data-email-action="copy"]');
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const originalText = copyBtn.textContent;
        try {
          await navigator.clipboard.writeText(CONTACT_EMAIL);
          copyBtn.textContent = "Copied!";
          copyBtn.classList.add("is-copied");
        } catch (err) {
          // Fallback for older browsers
          const temp = document.createElement("textarea");
          temp.value = CONTACT_EMAIL;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand("copy");
          document.body.removeChild(temp);
          copyBtn.textContent = "Copied!";
          copyBtn.classList.add("is-copied");
        }
        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.classList.remove("is-copied");
          setEmailMenuOpen(false);
        }, 1200);
      });
    }

    emailMenu.querySelectorAll("a.email-menu-item").forEach((link) => {
      link.addEventListener("click", () => {
        setEmailMenuOpen(false);
      });
    });
  }

  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");

  function showFormSuccess() {
    if (!formSuccess) return;
    formSuccess.hidden = false;
    setTimeout(() => {
      formSuccess.hidden = true;
    }, 5000);
  }

  // Handle Formspree redirect-back confirmation
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("submitted") === "1") {
    if (contactForm) contactForm.reset();
    showFormSuccess();
    const cleanUrl = window.location.pathname + window.location.hash;
    window.history.replaceState({}, document.title, cleanUrl);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          contactForm.reset();
          showFormSuccess();
        } else {
          alert("Something went wrong. Please try again or email me directly.");
        }
      } catch (err) {
        alert("Something went wrong. Please try again or email me directly.");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";
        }
      }
    });
  }

  // --- 8. Magnetic Button Effect ---
  const magneticButtons = document.querySelectorAll(
    ".hero-btns .btn, .social-links a"
  );

  magneticButtons.forEach((button) => {
    let isActive = false;

    // Get button center coordinates
    function getButtonCenter() {
      const rect = button.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }

    // Calculate distance between two points
    function getDistance(x1, y1, x2, y2) {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    // Handle mouse move
    function handleMouseMove(e) {
      const buttonCenter = getButtonCenter();
      const distance = getDistance(
        e.clientX,
        e.clientY,
        buttonCenter.x,
        buttonCenter.y
      );

      if (distance < 50) {
        isActive = true;
        // Calculate direction vector
        const dx = e.clientX - buttonCenter.x;
        const dy = e.clientY - buttonCenter.y;

        // Normalize and scale (max 15px)
        const magnitude = Math.min(distance / 50, 1);
        const maxOffset = 15;
        const offsetX = (dx / distance) * maxOffset * magnitude;
        const offsetY = (dy / distance) * maxOffset * magnitude;

        // Apply transform
        button.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        button.style.transition = "none";
      } else if (isActive) {
        // Reset when mouse leaves the magnetic zone
        isActive = false;
        button.style.transform = "translate(0, 0)";
        button.style.transition = "transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
      }
    }

    // Handle mouse leave
    function handleMouseLeave() {
      if (isActive) {
        isActive = false;
        button.style.transform = "translate(0, 0)";
        button.style.transition = "transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
      }
    }

    // Add event listeners
    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);
  });

  // --- 9. GSAP Text Reveal Animation ---
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Function to split text into characters
    function splitTextIntoChars(element) {
      const text = element.textContent;
      const textArray = text.split('');
      element.textContent = '';
      
      textArray.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
        span.style.display = 'inline-block';
        element.appendChild(span);
      });
    }

    // Find all reveal-text elements
    const revealTextElements = document.querySelectorAll('.reveal-text');

    revealTextElements.forEach((element) => {
      // Split text into characters
      splitTextIntoChars(element);

      // Get all character spans
      const chars = element.querySelectorAll('span');

      // Set initial state
      gsap.set(chars, {
        opacity: 0,
        y: 50,
      });

      // Create animation with ScrollTrigger
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
        },
      });
    });
  }

  // --- 10. Card Glow Effect ---
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach((card) => {
    const cardGlow = card.querySelector('.card-glow');

    if (!cardGlow) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      // Optionally reset to center when mouse leaves
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', `${rect.width / 2}px`);
      card.style.setProperty('--y', `${rect.height / 2}px`);
    });
  });
}); // End of 'DOMContentLoaded'
