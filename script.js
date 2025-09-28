// script.js - Add interactivity here as needed

// 2. Featured Menu Carousel
const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
let carouselIndex = 0;
let mobileCarouselInterval = null;

function isMobile() {
  return window.innerWidth <= 600;
}

function updateCarousel(options = { scroll: true }) {
  if (isMobile()) {
    // Remove active from all, add to current
    carouselItems.forEach((item, idx) => {
      item.classList.toggle('active', idx === carouselIndex);
    });
    // On mobile, use scroll instead of transform
    const item = carouselItems[carouselIndex];
    if (item && options.scroll) {
      // Only scroll the carousel, not the whole page
      carouselTrack.scrollTo({
        left: item.offsetLeft - carouselTrack.offsetLeft,
        behavior: 'smooth'
      });
    }
  } else {
    // Remove active from all on desktop
    carouselItems.forEach(item => item.classList.remove('active'));
    const visibleItems = 2;
    const gap = 32; // px, matches .carousel-track gap
    const itemWidth = carouselItems[0].offsetWidth;
    const offset = -carouselIndex * (itemWidth + gap);
    carouselTrack.style.transform = `translateX(${offset}px)`;
  }
}

function startMobileCarouselAutoSlide() {
  if (mobileCarouselInterval) clearInterval(mobileCarouselInterval);
  if (!isMobile()) return;
  mobileCarouselInterval = setInterval(() => {
    carouselIndex = (carouselIndex + 1) % carouselItems.length;
    updateCarousel({ scroll: true });
  }, 2500);
}

if (prevBtn && nextBtn && carouselTrack && carouselItems.length > 0) {
  prevBtn.addEventListener('click', () => {
    carouselIndex = Math.max(0, carouselIndex - 1);
    updateCarousel({ scroll: true });
  });
  nextBtn.addEventListener('click', () => {
    const visibleItems = 2;
    const maxIndex = isMobile() ? carouselItems.length - 1 : Math.max(0, carouselItems.length - visibleItems);
    carouselIndex = Math.min(maxIndex, carouselIndex + 1);
    updateCarousel({ scroll: true });
  });
}

window.addEventListener('resize', () => {
  if (mobileCarouselInterval) clearInterval(mobileCarouselInterval);
  if (isMobile()) startMobileCarouselAutoSlide();
});

document.addEventListener('DOMContentLoaded', () => {
  if (isMobile()) startMobileCarouselAutoSlide();
});

// 3. Newsletter Signup
const newsletterForm = document.getElementById('newsletterForm');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterMsg = document.getElementById('newsletterMsg');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = newsletterEmail.value.trim();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      newsletterMsg.textContent = 'Please enter a valid email address.';
      return;
    }
    newsletterMsg.textContent = 'Thank you for subscribing!';
    newsletterEmail.value = '';
    setTimeout(() => newsletterMsg.textContent = '', 4000);
  });
}

// 4. Global navigation behaviour
function initNavigation() {
  const hamburgerBtn = document.getElementById('hamburger');
  const navLinksContainer = document.querySelector('.nav-links');

  if (!hamburgerBtn || !navLinksContainer) {
    return;
  }

  const navAnchors = navLinksContainer.querySelectorAll('.nav-link');
  const hamburgerIcon = hamburgerBtn.querySelector('i');

  const setHamburgerState = (isOpen) => {
    hamburgerBtn.classList.toggle('active', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (hamburgerIcon) {
      hamburgerIcon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    }
  };

  const closeMenu = () => {
    navLinksContainer.classList.remove('open');
    setHamburgerState(false);
  };

  const toggleMenu = () => {
    const isOpen = navLinksContainer.classList.toggle('open');
    setHamburgerState(isOpen);
  };

  hamburgerBtn.setAttribute('aria-expanded', 'false');

  hamburgerBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  navLinksContainer.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  navAnchors.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('click', (event) => {
    if (!navLinksContainer.contains(event.target) && !hamburgerBtn.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900) {
      closeMenu();
    }
  });

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navAnchors.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) {
      return;
    }
    if (href === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetSelector = anchor.getAttribute('href');
      if (!targetSelector || targetSelector === '#') {
        return;
      }
      const target = document.querySelector(targetSelector);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMenu();
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initNavigation);

// 5. Dynamic Reviews Carousel
const reviews = [
  {
    text: "Hands down the best burgers in Sri Lanka – juicy and packed with flavour!",
    name: "Kasun",
    stars: 5
  },
  {
    text: "Like Five Guys, but with a Sri Lankan twist. Absolutely worth it!",
    name: "Dilshan",
    stars: 5
  },
  {
    text: "Didn’t expect such top-quality burgers here. Totally impressed!",
    name: "Ruwan",
    stars: 4
  },
  {
    text: "Fresh ingredients, amazing taste, and a proper local vibe.",
    name: "Shalini",
    stars: 5
  },
  {
    text: "Crispy fries, juicy patties, and the sauces are next level. Coming back for sure!",
    name: "Nadeesha",
    stars: 5
  },
  {
    text: "Great value for money and the friendliest staff in Burleys.",
    name: "Tharindu",
    stars: 4
  }
];

let reviewIndex = 0;
const reviewSlide = document.getElementById('reviewSlide');
const reviewPrev = document.getElementById('reviewPrev');
const reviewNext = document.getElementById('reviewNext');
let reviewInterval = null;

function renderReview(idx) {
  if (!reviewSlide) return;
  const review = reviews[idx];
  const stars = '★'.repeat(review.stars) + '☆'.repeat(5 - review.stars);
  reviewSlide.innerHTML = `
    <div class="review-stars">${stars}</div>
    <div class="review-text">“${review.text}”</div>
    <span class="review-name">- ${review.name}</span>
  `;
  reviewSlide.style.opacity = 0;
  setTimeout(() => { reviewSlide.style.opacity = 1; }, 50);
}

function startReviewAutoSlide() {
  if (reviewInterval) clearInterval(reviewInterval);
  reviewInterval = setInterval(() => {
    reviewIndex = (reviewIndex + 1) % reviews.length;
    renderReview(reviewIndex);
  }, 3000);
}

function stopReviewAutoSlide() {
  if (reviewInterval) clearInterval(reviewInterval);
}

if (reviewSlide) {
  renderReview(reviewIndex);
  startReviewAutoSlide();
}

if (reviewPrev) reviewPrev.addEventListener('click', () => {
  reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length;
  renderReview(reviewIndex);
  stopReviewAutoSlide();
  startReviewAutoSlide();
});
if (reviewNext) reviewNext.addEventListener('click', () => {
  reviewIndex = (reviewIndex + 1) % reviews.length;
  renderReview(reviewIndex);
  stopReviewAutoSlide();
  startReviewAutoSlide();
});

 // Loading Screen and Modal Logic
    document.addEventListener('DOMContentLoaded', function() {
      const loadingScreen = document.getElementById('loadingScreen');
      const modalOverlay = document.getElementById('modalOverlay');
      const modalClose = document.getElementById('modalClose');
      const browseMenu = document.getElementById('browseMenu');
      const mainContent = document.getElementById('mainContent');
      
      // Modal Image Carousel Variables
      const modalImages = document.querySelectorAll('.modal-image');
      const indicators = document.querySelectorAll('.indicator');
      let currentImageIndex = 0;
      let imageInterval;

      // Image Carousel Function
      function showImage(index) {
        // Remove active class from all images and indicators
        modalImages.forEach(img => img.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        // Add active class to current image and indicator
        modalImages[index].classList.add('active');
        indicators[index].classList.add('active');
      }

      // Auto-advance images every 3 seconds
      function startImageCarousel() {
        imageInterval = setInterval(() => {
          currentImageIndex = (currentImageIndex + 1) % modalImages.length;
          showImage(currentImageIndex);
        }, 3000);
      }

      // Stop image carousel
      function stopImageCarousel() {
        if (imageInterval) {
          clearInterval(imageInterval);
        }
      }

      // Indicator click handlers
      indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
          currentImageIndex = index;
          showImage(currentImageIndex);
          
          // Restart the interval
          stopImageCarousel();
          startImageCarousel();
        });
      });

      // Simulate loading time
      setTimeout(() => {
        // Hide loading screen
        loadingScreen.classList.add('hidden');
        
        // Show main content
        setTimeout(() => {
          mainContent.classList.add('visible');
          
          // Show modal after a brief delay
          setTimeout(() => {
            modalOverlay.classList.add('active');
            // Start image carousel when modal opens
            startImageCarousel();
          }, 500);
        }, 300);
      }, 2500); // 2.5 seconds loading time

      // Close modal functionality
      function closeModal() {
        modalOverlay.classList.remove('active');
        // Stop image carousel when modal closes
        stopImageCarousel();
      }

      modalClose.addEventListener('click', closeModal);
      
      // Close modal when clicking outside
      modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
          closeModal();
        }
      });

    
      // Close modal and scroll to menu
      document.addEventListener('DOMContentLoaded', function() {
        e.preventDefault();
        closeModal();
        setTimeout(() => {
          document.getElementById('featured-menu').scrollIntoView({
            behavior: 'smooth'
          });
        }, 300);
      });

      // Close modal with Escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
          closeModal();
        }
      });
    });
document.addEventListener('copy', event => event.preventDefault()); 

// Back to Top Button
const backToTopBtn = document.getElementById("backToTop");

// Show button on scroll
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

// Smooth scroll to top
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});



            