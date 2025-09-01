// DOM Elements
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const faqItems = document.querySelectorAll('.faq-item');
const whatsappLinks = document.querySelectorAll('a[href="#whatsapp"]');

// WhatsApp Configuration
const WHATSAPP_NUMBER = '5511999999999'; // Substitua pelo número real
const WHATSAPP_MESSAGE = 'Olá! Gostaria de solicitar uma bateria Moura com entrega e instalação.';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initWhatsAppLinks();
    initFAQ();
    initSmoothScroll();
    initScrollAnimations();
});

// WhatsApp Links
function initWhatsAppLinks() {
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp();
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
    const animateElements = document.querySelectorAll('.step, .feature, .testimonial');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

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

// Performance Optimization
const debouncedScroll = debounce(function() {
    // Handle scroll events here if needed
}, 100);

window.addEventListener('scroll', debouncedScroll);

// Analytics (placeholder for future implementation)
function trackEvent(eventName, eventData = {}) {
    // Implement analytics tracking here
    console.log('Event tracked:', eventName, eventData);
}

// Track WhatsApp clicks
whatsappLinks.forEach(link => {
    link.addEventListener('click', function() {
        trackEvent('whatsapp_click', {
            source: this.closest('section')?.className || 'unknown'
        });
    });
});

// Mobile Menu (if implemented in the future)
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        // Implement mobile menu toggle
        console.log('Mobile menu toggle clicked');
    });
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Implement error reporting here if needed
});

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Register service worker here if needed
    });
}

