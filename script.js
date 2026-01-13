      // Mobile menu toggle
      document
        .querySelector(".mobile-menu-btn")
        .addEventListener("click", function () {
          document.querySelector("nav ul").classList.toggle("show");
        });

      // Job listings accordion
      const jobCards = document.querySelectorAll(".job-card");
      jobCards.forEach((card) => {
        card.querySelector(".job-header").addEventListener("click", () => {
          card.classList.toggle("active");
        });
      });

      // Tab functionality
      const tabBtns = document.querySelectorAll(".tab-btn");
      tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          // Remove active class from all buttons
          tabBtns.forEach((b) => b.classList.remove("active"));
          // Add active class to clicked button
          btn.classList.add("active");
        });
      });

      // Form submission
      document
        .getElementById("contactForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();
          alert("Thank you for your message! We will get back to you soon.");
          this.reset();
        });

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = this.getAttribute("href");
          if (targetId === "#") return;

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: "smooth",
            });

            // Close mobile menu if open
            document.querySelector("nav ul").classList.remove("show");
          }
        });
      });

      //New gallery section 
      document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".slider-next");
  const prevBtn = document.querySelector(".slider-prev");
  const indicators = document.querySelectorAll(".indicator");

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateSlider(index) {
    const offset = -index * 100;
    track.style.transform = `translateX(${offset}%)`;
    updateIndicators(index);
  }

  function updateIndicators(index) {
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("bg-amber-600", i === index);
      indicator.classList.toggle("bg-amber-300", i !== index);
    });
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider(currentIndex);
  });

  indicators.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      currentIndex = i;
      updateSlider(currentIndex);
    });
  });

  // Mobile swipe support
  let startX = 0;
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextBtn.click();
      } else {
        prevBtn.click();
      }
    }
  });

  updateSlider(currentIndex); // initialize on load
});

    //send the message from send button to whatsapp
     document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent actual form submission

    // Get values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Format WhatsApp message
    const fullMessage = `Hello! 👋%0AMessage from Taji Hotel Website. I'd like to place an order.`;

    // WhatsApp link
    const phoneNumber = "254713195195";
    const waLink = `https://wa.me/${phoneNumber}?text=${fullMessage}`;

    // Open WhatsApp in new tab
    window.open(waLink, "_blank");

    // Clear form
    document.getElementById("contactForm").reset();
  });

//Order button in all menu items

// Image lazy loading enhancement
document.addEventListener('DOMContentLoaded', function() {
  // Handle lazy-loaded images
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Add loaded class when image is loaded
          img.addEventListener('load', function() {
            img.classList.add('loaded');
          }, { once: true });
          
          // Fallback: add loaded class after a short delay if load event doesn't fire
          setTimeout(() => {
            img.classList.add('loaded');
          }, 100);
          
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px' // Start loading images 50px before they enter viewport
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(img => {
      img.addEventListener('load', function() {
        img.classList.add('loaded');
      }, { once: true });
      img.classList.add('loaded');
    });
  }
  
  // Preload critical images
  const criticalImages = [
    './Resources/logo.png',
    './Resources/Banner/taji.jpg'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
});