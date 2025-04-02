document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission (in a real application, this would send data to a server)
            setTimeout(function() {
                // Hide the form and show success message
                contactForm.style.opacity = '0';
                setTimeout(function() {
                    contactForm.style.display = 'none';
                    formSuccess.classList.add('active');
                }, 300);
                
                // Reset form
                contactForm.reset();
            }, 1000);
        });
    }
});