document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[name="contact"]');
    if (!form) return;

    const inputs = form.querySelectorAll('input[required], textarea[required]');
    const messageTextarea = document.getElementById('message');
    const charCount = document.querySelector('.character-count');
    
    // Character count
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const remaining = this.value.length;
            charCount.textContent = `${remaining} / 180`;
        });
    }

    // Validate individual field
    function validateField(field) {
        const parent = field.closest('.form-group');
        const errorSpan = parent.querySelector('.error-message');
        
        if (!field.validity.valid) {
            parent.classList.add('error');
            parent.classList.remove('success');
            errorSpan.textContent = field.dataset.error;
            return false;
        } else {
            parent.classList.remove('error');
            parent.classList.add('success');
            errorSpan.textContent = '';
            return true;
        }
    }

    // Add validation to each required field
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => validateField(input));
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('.submit-button');
        submitButton.classList.add('loading');

        try {
            const formData = new FormData(form);
            await fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            });
            
            // Redirect to thank you page
            window.location.href = '/thank-you/';
        } catch (error) {
            console.error('Error:', error);
            alert('Sorry, there was an error submitting your form. Please try again.');
            submitButton.classList.remove('loading');
        }
    });
});
   
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