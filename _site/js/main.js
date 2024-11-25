   // Add this to your main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.navbar-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            navMenu.classList.toggle('is-active');
            
            // Update aria-expanded
            const isExpanded = hamburger.classList.contains('is-active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('.navbar-item');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('is-active');
                navMenu.classList.remove('is-active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }
});