document.addEventListener('DOMContentLoaded', function() {
    // Gallery slider functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Event listeners for navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) newIndex = slideCount - 1;
            showSlide(newIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            let newIndex = currentSlide + 1;
            if (newIndex >= slideCount) newIndex = 0;
            showSlide(newIndex);
        });
    }
    
    // Event listeners for dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-index'));
            showSlide(slideIndex);
        });
    });
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(function() {
        let newIndex = currentSlide + 1;
        if (newIndex >= slideCount) newIndex = 0;
        showSlide(newIndex);
    }, 5000);
    
    // Pause auto-advance when hovering over slider
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', function() {
            slideInterval = setInterval(function() {
                let newIndex = currentSlide + 1;
                if (newIndex >= slideCount) newIndex = 0;
                showSlide(newIndex);
            }, 5000);
        });
    }
    
    // Lightbox functionality for thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const lightboxContent = `
                <div class="lightbox-content">
                    <button class="close-lightbox">&times;</button>
                    <img src="${imgSrc}" alt="${imgAlt}">
                    <div class="lightbox-caption">
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </div>
                </div>
            `;
            
            lightbox.innerHTML = lightboxContent;
            document.body.appendChild(lightbox);
            
            // Prevent body scrolling
            document.body.style.overflow = 'hidden';
            
            // Add animation class after a small delay
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10);
            
            // Close lightbox when clicking close button or outside the image
            const closeBtn = lightbox.querySelector('.close-lightbox');
            closeBtn.addEventListener('click', closeLightbox);
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            function closeLightbox() {
                lightbox.classList.remove('active');
                
                // Remove lightbox after animation completes
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    });
    
    // Add lightbox styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lightbox.active {
            opacity: 1;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            display: block;
            border: 2px solid rgba(255, 255, 255, 0.1);
        }
        
        .close-lightbox {
            position: absolute;
            top: -40px;
            right: 0;
            width: 30px;
            height: 30px;
            background: none;
            border: none;
            color: white;
            font-size: 30px;
            cursor: pointer;
        }
        
        .lightbox-caption {
            margin-top: 15px;
            color: white;
        }
        
        .lightbox-caption h3 {
            margin-bottom: 5px;
        }
    `;
    document.head.appendChild(style);
});