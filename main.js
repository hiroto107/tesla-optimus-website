document.addEventListener('DOMContentLoaded', function() {
  // Navigation toggle for mobile
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
      hamburger.addEventListener('click', function() {
          this.classList.toggle('active');
          navLinks.classList.toggle('active');
      });
  }
  
  // Close mobile menu when clicking on a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
      item.addEventListener('click', function() {
          if (hamburger.classList.contains('active')) {
              hamburger.classList.remove('active');
              navLinks.classList.remove('active');
          }
      });
  });
  
  // Header background change on scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              const headerHeight = document.querySelector('header').offsetHeight;
              const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
              
              window.scrollTo({
                  top: targetPosition - headerHeight,
                  behavior: 'smooth'
              });
          }
      });
  });
});