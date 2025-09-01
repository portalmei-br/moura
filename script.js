// DOM Elements
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const faqItems = document.querySelectorAll('.faq-item');
const whatsappLinks = document.querySelectorAll('a[href="#whatsapp"]');

// WhatsApp Configuration - IMPORTANTE: Substitua pelo número real
const WHATSAPP_NUMBER = '5511999999999'; // Substitua pelo número real do WhatsApp
const WHATSAPP_MESSAGE = 'Olá! Gostaria de solicitar uma bateria Moura com entrega e instalação. Pode me ajudar?';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initWhatsAppLinks();
    initFAQ();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
});

// WhatsApp Links
function initWhatsAppLinks() {
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp();
            trackEvent('whatsapp_click', {
                source: this.closest('section')?.className || 'unknown'
            });
        });
    });
}

function openWhatsApp() {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(whatsappUrl, '_blank');
}

// FAQ Functionality
function initFAQ() {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip WhatsApp links
            if (href === '#whatsapp') {
                return;
            }
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.step, .feature-card, .testimonial-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    const handleScroll = debounce(function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
        }
    }, 10);
    
    window.addEventListener('scroll', handleScroll);
}

// Form Validation (if needed for future forms)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Analytics (placeholder for future implementation)
function trackEvent(eventName, eventData = {}) {
    // Implement analytics tracking here (Google Analytics, Facebook Pixel, etc.)
    console.log('Event tracked:', eventName, eventData);
    
    // Example: Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Example: Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
}

// Mobile Menu (if implemented in the future)
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        // Implement mobile menu toggle
        console.log('Mobile menu toggle clicked');
        // Future implementation for mobile menu
    });
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Implement error reporting here if needed
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno
    });
});

// Performance Optimization
const debouncedResize = debounce(function() {
    // Handle resize events here if needed
    console.log('Window resized');
}, 250);

window.addEventListener('resize', debouncedResize);

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Register service worker here if needed for PWA features
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Lazy Loading for Images (if needed)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
// initLazyLoading();

// Accessibility improvements
function initAccessibility() {
    // Add keyboard navigation support
    const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                if (this.tagName === 'BUTTON' || this.tagName === 'A') {
                    this.click();
                }
            }
        });
    });
}

// Initialize accessibility features
initAccessibility();

// Preload critical resources
function preloadResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Initialize resource preloading
preloadResources();

