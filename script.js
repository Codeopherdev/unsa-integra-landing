// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay based on element index within its parent
            const siblings = entry.target.parentElement.querySelectorAll('[data-animate]');
            const siblingIndex = Array.from(siblings).indexOf(entry.target);
            
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, siblingIndex * 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with data-animate attribute
document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});

// Counter animation for stats
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('.stat-number');
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                    if (target === 98) {
                        counter.textContent = target + '%';
                    } else if (target >= 1000) {
                        counter.textContent = target.toLocaleString();
                    }
                }
            };
            
            updateCounter();
            countObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(el => {
    countObserver.observe(el);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for hero shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Mobile menu toggle (basic implementation)
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Add floating animation to game cards
const gameCards = document.querySelectorAll('.game-floating');
gameCards.forEach((card, index) => {
    card.style.animation = `float ${15 + index * 2}s infinite ease-in-out ${index * -3}s`;
});
