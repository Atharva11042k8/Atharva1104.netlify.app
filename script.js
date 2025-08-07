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
