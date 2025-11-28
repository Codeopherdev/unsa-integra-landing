// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll('.card, .stat-item, .feature-box').forEach(el => {
    observer.observe(el);
});

// Counter animation for stats
const counters = document.querySelectorAll('.stat-item h2');
const speed = 200;

const countUp = (element) => {
    const target = element.innerText.replace(/\D/g, '');
    const increment = target / speed;
    let count = 0;
    
    const updateCount = () => {
        count += increment;
        if (count < target) {
            element.innerText = Math.ceil(count).toLocaleString();
            setTimeout(updateCount, 10);
        } else {
            const originalText = element.getAttribute('data-original') || target;
            element.innerText = originalText;
        }
    };
    
    updateCount();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('h2');
            if (counter && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                counter.setAttribute('data-original', counter.innerText);
                counter.innerText = '0';
                setTimeout(() => countUp(counter), 200);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbar = document.querySelector('.navbar-collapse');
        if (navbar.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbar);
            bsCollapse.hide();
        }
    });
});

// Add hover effect to cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Parallax effect for floating cards
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        const speed = 0.05 + (index * 0.02);
        const yPos = -(scrolled * speed);
        card.style.transform = `translateY(${yPos}px)`;
    });
});

// Initialize Bootstrap tooltips if any
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

// Add animation to hero text
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-section h1');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease-out';
    }
});

console.log('UNSA Integra - Bootstrap Version Loaded Successfully');
