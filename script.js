/**
 * Tamtyt Landing Page - JavaScript
 */

(function() {
  'use strict';

  // DOM Elements
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  /**
   * Toggle mobile menu
   */
  function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  }

  /**
   * Close mobile menu when clicking on a link
   */
  function closeMobileMenuOnLinkClick() {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
  }

  /**
   * Handle scroll effects
   */
  function handleScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(25, 94, 75, 0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
          e.preventDefault();
          return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          const navHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          closeMobileMenuOnLinkClick();
        }
      });
    });
  }

  /**
   * Intersection Observer for fade-in animations
   */
  function initScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe feature cards, steps, and benefit items
    const animatedElements = document.querySelectorAll('.feature-card, .step, .benefit-item');
    
    animatedElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(el);
    });
  }

  /**
   * Initialize all functionality
   */
  function init() {
    // Mobile menu toggle
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Add click handlers to nav links for mobile
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', closeMobileMenuOnLinkClick);
    });

    // Scroll effects
    window.addEventListener('scroll', handleScroll);

    // Smooth scroll
    initSmoothScroll();

    // Scroll animations
    initScrollAnimations();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
