document.addEventListener('DOMContentLoaded', function() {
  // Get all timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  // Function to check if an element is in viewport
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  };
  
  // Function to add visible class to timeline items in viewport
  const handleScroll = () => {
    timelineItems.forEach(item => {
      if (isInViewport(item)) {
        item.classList.add('visible');
      }
    });
  };
  
  // Initial check on page load
  handleScroll();
  
  // Listen for scroll events
  window.addEventListener('scroll', handleScroll);
  
  // Add hover effect to timeline years
  timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      // Create a glow pulse animation
      const year = item.querySelector('.timeline-year');
      year.style.animation = 'pulse 1.5s infinite';
    });
    
    item.addEventListener('mouseleave', () => {
      const year = item.querySelector('.timeline-year');
      year.style.animation = '';
    });
  });
  
  // Add custom animation to the timeline line
  const timelineSection = document.querySelector('.timeline-section');
  const timelineLine = document.createElement('div');
  timelineLine.classList.add('timeline-progress');
  timelineSection.appendChild(timelineLine);
  
  const updateTimelineProgress = () => {
    const sectionRect = timelineSection.getBoundingClientRect();
    const scrollPercentage = Math.min(
      1,
      Math.max(
        0,
        (window.innerHeight - sectionRect.top) / 
        (window.innerHeight + sectionRect.height)
      )
    );
    
    timelineLine.style.height = `${scrollPercentage * 100}%`;
  };
  
  window.addEventListener('scroll', updateTimelineProgress);
  updateTimelineProgress();
});

// Add keyframe animation for pulse effect
if (!document.querySelector('#timeline-keyframes')) {
  const style = document.createElement('style');
  style.id = 'timeline-keyframes';
  style.innerHTML = `
    @keyframes pulse {
      0% {
        box-shadow: 0 0 20px rgba(227, 25, 55, 0.4);
      }
      50% {
        box-shadow: 0 0 30px rgba(227, 25, 55, 0.8);
      }
      100% {
        box-shadow: 0 0 20px rgba(227, 25, 55, 0.4);
      }
    }
    
    .timeline-progress {
      position: absolute;
      width: 2px;
      background-color: var(--tesla-white);
      top: 0;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 0;
      max-height: 0;
      transition: max-height 0.1s linear;
    }
    
    @media (max-width: 768px) {
      .timeline-progress {
        left: 40px;
      }
    }
  `;
  document.head.appendChild(style);
}
