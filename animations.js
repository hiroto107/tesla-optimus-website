document.addEventListener('DOMContentLoaded', function() {
    // Fade in elements when scrolled into view
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // 10% of the item is visible
        rootMargin: '-50px 0px' // Trigger slightly before the element comes into view
    });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // Add hover animations for cards and thumbnails
    const animatedElements = document.querySelectorAll('.highlight-card, .thumbnail');
    
    animatedElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('hover-animate');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('hover-animate');
        });
    });
    
    // Check if video exists and handle loading
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        heroVideo.addEventListener('loadeddata', function() {
            // Video is loaded and can be played
            console.log('Video loaded successfully');
            // Add a fade-in effect for the video
            heroVideo.classList.add('video-loaded');
        });
        
        heroVideo.addEventListener('error', function(e) {
            console.error('Error loading video:', e);
            // Show fallback image if video fails to load
            const videoContainer = document.querySelector('.video-container');
            if (videoContainer) {
                videoContainer.innerHTML = '<img src="images/optimus_hero_fallback.jpg" alt="Tesla Optimus Robot" class="fallback-image">';
            }
        });
    }
    
    // Add parallax scrolling effect for banner images
    const banners = document.querySelectorAll('.page-banner');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        banners.forEach(banner => {
            // Move the background image slightly as user scrolls
            banner.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
        });
    });
});
