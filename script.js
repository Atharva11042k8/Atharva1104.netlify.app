document.addEventListener('DOMContentLoaded', () => {

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 700, // values from 0 to 3000, with step 50ms
        easing: 'ease-in-out', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });

    // Smooth Scrolling for internal links
    // Uses CSS scroll-behavior: smooth and scroll-padding-top - Simplest method
    // If more complex offset calculation is needed (e.g., header changes height dynamically drastically)
    // you might revert to the previous JS-based smooth scroll.





    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.getElementById('main-header').offsetHeight || 70; // Estimate or get height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    


    // Sticky Header background change on Scroll
    const header = document.getElementById('main-header');
    if (header) { // Check if header exists
      const scrollThreshold = 50; // Pixels scrolled down before changing header background

      window.addEventListener('scroll', () => {
          if (window.scrollY > scrollThreshold) {
              header.classList.add('scrolled');
          } else {
              header.classList.remove('scrolled');
          }
      });
    }


    // Optional: Mobile Menu Toggle (Basic Example)
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('#main-header nav ul');

    if (menuToggle && navUl) { // Check if elements exist
      menuToggle.addEventListener('click', () => {
          navUl.classList.toggle('mobile-active'); // You'll need to add CSS for .mobile-active
          // Example CSS for .mobile-active (add to style.css):
          
/*
          @media (max-width: 991.98px) {
              #main-header nav ul.mobile-active {
                  display: flex;
                  flex-direction: column;
                  position: absolute;
                  top: 100%; // Position below header
                  left: 0;
                  width: 100%;
                  background-color: var(--surface-color); // Match scrolled header bg
                  padding: 15px 0;
                  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
              }
              #main-header nav ul.mobile-active li {
                  margin: 10px 0;
                  text-align: center;
              }
          }
     */     

      });

      // Close mobile menu when a link is clicked
      navUl.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
              if (navUl.classList.contains('mobile-active')) {
                  navUl.classList.remove('mobile-active');
              }
          });
      });
    }


    // Update Footer Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) { // Check if element exists
        yearSpan.textContent = new Date().getFullYear();
    }

}); 








// Secret Feature: Long-press on GitHub button (>= 3 seconds)
(function attachGithubLongPress() {
  const githubBtn = document.querySelector('a[aria-label="GitHub Profile"]');
  if (!githubBtn) return; // no-op if element isn't present

  const LONG_PRESS_DURATION = 3000; // ms
  const MOVE_THRESHOLD_PX = 10; // cancel if finger moves this much
  const secretUrl = 'https://jeerevision11.netlify.app';

  let pressTimer = null;
  let longPressed = false;
  let touchStartX = 0;
  let touchStartY = 0;

  const startPress = (e) => {
    longPressed = false;
    clearTimeout(pressTimer);

    // capture initial touch position (for mobile)
    if (e.type === 'touchstart' && e.touches && e.touches[0]) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }

    // start timer
    pressTimer = setTimeout(() => {
      longPressed = true;
      // open secret url in a new tab/window (noopener for security)
      try {
        window.open(secretUrl, '_blank', 'noopener');
      } catch (err) {
        // fallback: set location (rare)
        window.location.href = secretUrl;
      }
    }, LONG_PRESS_DURATION);
  };

  const cancelPress = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      pressTimer = null;
    }
  };

  // Mouse events
  githubBtn.addEventListener('mousedown', startPress);
  githubBtn.addEventListener('mouseup', cancelPress);
  githubBtn.addEventListener('mouseleave', cancelPress);

  // Touch events (mobile)
  githubBtn.addEventListener('touchstart', startPress, { passive: true });
  githubBtn.addEventListener('touchend', cancelPress);
  githubBtn.addEventListener('touchcancel', cancelPress);
  githubBtn.addEventListener('touchmove', function (e) {
    // cancel if finger moved significantly
    if (e.touches && e.touches[0]) {
      const dx = Math.abs(e.touches[0].clientX - touchStartX);
      const dy = Math.abs(e.touches[0].clientY - touchStartY);
      if (dx > MOVE_THRESHOLD_PX || dy > MOVE_THRESHOLD_PX) {
        cancelPress();
      }
    }
  }, { passive: true });

  // If the long-press already opened the secret, block the normal click navigation
  githubBtn.addEventListener('click', function (e) {
    if (longPressed) {
      e.preventDefault();
      e.stopImmediatePropagation();
      longPressed = false; // reset for future interactions
      // small delay reset guard (optional)
      setTimeout(() => { longPressed = false; }, 50);
    }
    // otherwise, normal click behavior happens (honors href)
  });
})();
