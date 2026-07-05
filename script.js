// ============================================
// Navigation & Menu
// ============================================
const mainNav = document.getElementById('mainNav');
const menuTrigger = document.querySelector('.menu-trigger');
const menuOverlay = document.getElementById('menuOverlay');
const closeBtn = document.querySelector('.close-btn');
const menuLinks = document.querySelectorAll('.menu-link');

// Toggle menu
menuTrigger.addEventListener('click', () => {
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : 'auto';
});

// Close menu
const closeMenu = () => {
    menuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
};

closeBtn.addEventListener('click', closeMenu);

menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close on escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
        closeMenu();
    }
});

// Nav background on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const heroSection = document.getElementById('hero');
    const whatWeOfferSection = document.getElementById('services');
    const scrollTop = window.scrollY;

    // Check if scrolled past hero
    if (scrollTop > heroSection.offsetHeight * 0.8) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }

    // Check if on dark section
    const whatWeOfferTop = whatWeOfferSection.offsetTop;
    const whatWeOfferHeight = whatWeOfferSection.offsetHeight;
    if (scrollTop >= whatWeOfferTop && scrollTop < whatWeOfferTop + whatWeOfferHeight) {
        mainNav.classList.add('on-dark');
    } else {
        mainNav.classList.remove('on-dark');
    }

    lastScroll = scrollTop;
});

// ============================================
// Dark Mode Section on Scroll
// ============================================
const whatWeOfferSection = document.getElementById('services');

const darkSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            whatWeOfferSection.classList.add('is-dark');
            mainNav.classList.add('on-dark');
        } else {
            whatWeOfferSection.classList.remove('is-dark');
        }
    });
}, {
    threshold: 0.3
});

darkSectionObserver.observe(whatWeOfferSection);

// ============================================
// Scroll-triggered animations
// ============================================
const scrollElements = document.querySelectorAll('.scroll-in');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElements = () => {
    scrollElements.forEach((element) => {
        if (elementInView(element, 1.25)) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', displayScrollElements);
window.addEventListener('load', displayScrollElements);

// ============================================
// Form handling
// ============================================
const contactForm = document.getElementById('contactForm');
const heroCta = document.querySelector('[data-action="contact"]');

heroCta.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // In a real scenario, this would send data to a server
    alert('Thank you for reaching out! We\'ll be in touch soon.');
    contactForm.reset();
});

// ============================================
// Respect prefers-reduced-motion
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        .scroll-in {
            transform: none !important;
        }
        @keyframes heroFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes menuReveal {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// Carousel pause on hover (CSS handles, but JS for focus)
// ============================================
const carouselTrack = document.querySelector('.carousel-track');
const carouselContainer = document.querySelector('.carousel-container');

carouselContainer.addEventListener('mouseenter', () => {
    carouselTrack.style.animationPlayState = 'paused';
});

carouselContainer.addEventListener('mouseleave', () => {
    carouselTrack.style.animationPlayState = 'running';
});

carouselContainer.addEventListener('focusin', () => {
    carouselTrack.style.animationPlayState = 'paused';
});

carouselContainer.addEventListener('focusout', () => {
    carouselTrack.style.animationPlayState = 'running';
});
