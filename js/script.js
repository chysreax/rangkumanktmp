document.addEventListener('DOMContentLoaded', () => {

    // --- Update Footer Time/Year ---
    function updateFooterInfo() {
        const footerElement = document.getElementById('footer-info');
        if (!footerElement) return;

        const now = new Date();
        const year = now.getFullYear();
        let timeString = 'N/A';

        try {
            // Format time for Jakarta (WIB = GMT+7)
            timeString = now.toLocaleTimeString('id-ID', {
                timeZone: 'Asia/Jakarta',
                hour: '2-digit',
                minute: '2-digit',
                // second: '2-digit', // Optional: include seconds
                hour12: false // Use 24-hour format
            });
        } catch (e) {
            console.error("Error formatting time:", e);
            // Fallback or keep 'N/A'
        }

        footerElement.textContent = `WIB: ${timeString} | © ${year} I Dewa Gede Vrischika Sedanayoga - Kuliah Tamu Digital Marketing.`;
    }

    updateFooterInfo(); // Call once on load
    // Optional: Update time every minute (if seconds aren't shown, minute is enough)
    // setInterval(updateFooterInfo, 60000);


    // --- Smooth Scroll for Nav Links ---
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.getElementById('mainNav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 15; // Extra space

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Intersection Observer for Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Optional: uncomment to fire only once
            }
            // Optional: hide again when scrolling up
            // else {
            //     entry.target.classList.remove('is-visible');
            // }
        });
    }, {
        root: null,
        threshold: 0.1,
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

     // --- Intersection Observer for Active Nav Link Highlighting ---
     const sections = document.querySelectorAll('section[id]');
     // Adjust rootMargin: top margin accounts for nav height, bottom pushes trigger point higher
     const navObserverOptions = {
         root: null,
         rootMargin: "-70px 0px -45% 0px", // Top: nav height, Bottom: 55% from bottom of viewport
         threshold: 0 // Trigger as soon as section edge crosses margin
     };

     const navObserver = new IntersectionObserver((entries) => {
        let sectionsInView = [];
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sectionsInView.push(entry.target.getAttribute('id'));
            }
        });

        // If sections are in view, highlight the first one (topmost)
        if (sectionsInView.length > 0) {
             // Get the ID of the topmost visible section based on current scroll position
             // (A simpler approximation is just taking the first one from the observer)
             const currentActiveId = sectionsInView[0]; // Usually the topmost intersecting
             document.querySelectorAll('nav a.active').forEach(link => link.classList.remove('active'));
             const navLink = document.querySelector(`nav a[href="#${currentActiveId}"]`);
             if(navLink) {
                navLink.classList.add('active');
             }
        } else {
            // Optional: If no sections are 'active' maybe remove all active classes
            // document.querySelectorAll('nav a.active').forEach(link => link.classList.remove('active'));
        }

     }, navObserverOptions);

     sections.forEach(section => {
         navObserver.observe(section);
     });


    // --- Back to Top Button Logic ---
    const backToTopButton = document.getElementById('backToTop');
    const scrollThreshold = 300; // Pixels scrolled before showing button

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > scrollThreshold) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Chart Bar Animation (Handled by CSS) ---
    // No JS needed for the basic grow animation now.

});
