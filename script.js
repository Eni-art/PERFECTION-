// ===================================
// Smooth Scrolling
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // navbar height
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Mobile Menu Toggle
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===================================
// Active Navigation Link Highlighting
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// Scroll Reveal Animation
// ===================================
const revealElements = document.querySelectorAll('.reveal');

function reveal() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100 && elementBottom > 0) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// ===================================
// Skills Progress Bar Animation
// ===================================
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

function animateSkills() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    
    const skillsSectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (skillsSectionTop < windowHeight - 100 && !skillsAnimated) {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
        skillsAnimated = true;
    }
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// ===================================
// Project Filtering
// ===================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.classList.remove('hidden');
                // Add animation
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===================================
// Testimonials Slider
// ===================================
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const indicators = document.querySelectorAll('.indicator');
let currentTestimonial = 0;
let testimonialInterval;

function showTestimonial(index) {
    // Remove active class from all cards
    testimonialCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Remove active class from all indicators
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Add active class to current card and indicator
    testimonialCards[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

// Auto-slide testimonials
function startTestimonialSlider() {
    testimonialInterval = setInterval(nextTestimonial, 5000);
}

function stopTestimonialSlider() {
    clearInterval(testimonialInterval);
}

// Event listeners for testimonial controls
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevTestimonial();
        stopTestimonialSlider();
        startTestimonialSlider();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextTestimonial();
        stopTestimonialSlider();
        startTestimonialSlider();
    });
}

// Indicator click events
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
        stopTestimonialSlider();
        startTestimonialSlider();
    });
});

// Start the testimonial slider on page load
startTestimonialSlider();

// Pause slider when hovering over testimonials
const testimonialsSlider = document.querySelector('.testimonials-slider');
if (testimonialsSlider) {
    testimonialsSlider.addEventListener('mouseenter', stopTestimonialSlider);
    testimonialsSlider.addEventListener('mouseleave', startTestimonialSlider);
}

// ===================================
// Contact Form Validation
// ===================================
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const formMessage = document.getElementById('formMessage');

// Validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateSubject(subject) {
    return subject.trim().length >= 3;
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

// Show error message
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.form-error');
    
    input.classList.add('error');
    errorElement.textContent = message;
}

// Clear error message
function clearError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.form-error');
    
    input.classList.remove('error');
    errorElement.textContent = '';
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    if (!validateName(nameInput.value)) {
        showError(nameInput, 'Name must be at least 2 characters long');
    } else {
        clearError(nameInput);
    }
});

emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
    } else {
        clearError(emailInput);
    }
});

subjectInput.addEventListener('blur', () => {
    if (!validateSubject(subjectInput.value)) {
        showError(subjectInput, 'Subject must be at least 3 characters long');
    } else {
        clearError(subjectInput);
    }
});

messageInput.addEventListener('blur', () => {
    if (!validateMessage(messageInput.value)) {
        showError(messageInput, 'Message must be at least 10 characters long');
    } else {
        clearError(messageInput);
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous messages
    formMessage.className = 'form-message';
    formMessage.textContent = '';
    
    // Validate all fields
    let isValid = true;
    
    if (!validateName(nameInput.value)) {
        showError(nameInput, 'Name must be at least 2 characters long');
        isValid = false;
    } else {
        clearError(nameInput);
    }
    
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(emailInput);
    }
    
    if (!validateSubject(subjectInput.value)) {
        showError(subjectInput, 'Subject must be at least 3 characters long');
        isValid = false;
    } else {
        clearError(subjectInput);
    }
    
    if (!validateMessage(messageInput.value)) {
        showError(messageInput, 'Message must be at least 10 characters long');
        isValid = false;
    } else {
        clearError(messageInput);
    }
    
    if (isValid) {
        // Simulate form submission (since this is a mock)
        formMessage.classList.add('success');
        formMessage.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.';
        
        // Reset form
        contactForm.reset();
        
        // Clear success message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    } else {
        formMessage.classList.add('error');
        formMessage.textContent = 'Please fix the errors above and try again.';
        
        // Clear error message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    }
});

// ===================================
// Back to Top Button
// ===================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Download CV Button (Mock)
// ===================================
const downloadCvBtn = document.querySelector('.download-cv');
if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('CV download functionality would be implemented here. This is a demo portfolio.');
    });
}

// ===================================
// Typing Effect for Hero Section (Optional Enhancement)
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===================================
// Parallax Effect for Hero Background (Subtle)
// ===================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    }
});

// ===================================
// Lazy Loading Images
// ===================================
const images = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// ===================================
// Keyboard Navigation Support
// ===================================
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
    
    // Arrow keys for testimonial navigation
    if (e.key === 'ArrowLeft' && document.activeElement.closest('.testimonials-slider')) {
        prevTestimonial();
        stopTestimonialSlider();
        startTestimonialSlider();
    }
    
    if (e.key === 'ArrowRight' && document.activeElement.closest('.testimonials-slider')) {
        nextTestimonial();
        stopTestimonialSlider();
        startTestimonialSlider();
    }
});

// ===================================
// Performance Optimization: Debounce Scroll Events
// ===================================
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedReveal = debounce(reveal, 20);
const debouncedHighlightNav = debounce(highlightNavigation, 20);
const debouncedAnimateSkills = debounce(animateSkills, 20);

window.addEventListener('scroll', debouncedReveal);
window.addEventListener('scroll', debouncedHighlightNav);
window.addEventListener('scroll', debouncedAnimateSkills);

// ===================================
// Page Load Animation
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initial reveal of elements in viewport
    reveal();
    animateSkills();
});

// ===================================
// Console Message (Easter Egg for Developers)
// ===================================
console.log('%c👋 Hey there, developer!', 'font-size: 20px; font-weight: bold; color: #d4af37;');
console.log('%cLooks like you\'re checking out the code. Nice!', 'font-size: 14px; color: #666;');
console.log('%cFeel free to reach out if you want to collaborate!', 'font-size: 14px; color: #666;');
console.log('%c✉️ eni.art@example.com', 'font-size: 14px; color: #d4af37; font-weight: bold;');
