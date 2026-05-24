// ==================== Navigation ====================
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Get target section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Close mobile menu
        navMenu.style.display = 'none';
    });
});

hamburger.addEventListener('click', function() {
    if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
    } else {
        navMenu.style.display = 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '60px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.flexDirection = 'column';
        navMenu.style.gap = '1rem';
        navMenu.style.padding = '1rem';
        navMenu.style.backgroundColor = 'rgba(99, 102, 241, 0.9)';
        navMenu.style.backdropFilter = 'blur(10px)';
        navMenu.style.zIndex = '999';
    }
});

// ==================== Scroll Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// ==================== CTA Button ====================
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        document.querySelector('#profile').scrollIntoView({ behavior: 'smooth' });
    });
}

// ==================== Star Ratings ====================
document.querySelectorAll('.stars').forEach(starContainer => {
    const stars = starContainer.querySelectorAll('.star');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            
            // Remove active from all stars in this container
            stars.forEach(s => s.classList.remove('active'));
            
            // Add active to clicked star and previous ones
            stars.forEach(s => {
                if (s.getAttribute('data-value') <= value) {
                    s.classList.add('active');
                }
            });
        });
        
        star.addEventListener('mouseover', function() {
            const value = this.getAttribute('data-value');
            stars.forEach(s => {
                if (s.getAttribute('data-value') <= value) {
                    s.style.opacity = '1';
                } else {
                    s.style.opacity = '0.3';
                }
            });
        });
    });
    
    starContainer.addEventListener('mouseleave', function() {
        stars.forEach(s => {
            s.style.opacity = s.classList.contains('active') ? '1' : '0.3';
        });
    });
});

// ==================== Smooth Scroll ====================
document.addEventListener('DOMContentLoaded', function() {
    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// ==================== Editable Content ====================
const editableElements = [
    'studentName',
    'hometown',
    'inspiration',
    'quote',
    'obstacles',
    'theories',
    'successFactors',
    'adaptations',
    'mission'
];

editableElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener('dblclick', function() {
            if (this.contentEditable !== 'true') {
                this.contentEditable = 'true';
                this.focus();
                this.style.backgroundColor = 'rgba(251, 191, 36, 0.1)';
                this.style.padding = '0.5rem';
                this.style.borderRadius = '5px';
                this.style.border = '2px solid rgba(251, 191, 36, 0.5)';
            }
        });
        
        element.addEventListener('blur', function() {
            this.contentEditable = 'false';
            this.style.backgroundColor = 'transparent';
            this.style.padding = '0';
            this.style.border = 'none';
            savePortfolioData();
        });
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.blur();
            }
        });
    }
});

// ==================== Save to LocalStorage ====================
function savePortfolioData() {
    const data = {};
    editableElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            data[id] = element.textContent;
        }
    });
    localStorage.setItem('portfolioData', JSON.stringify(data));
}

function loadPortfolioData() {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = data[id];
            }
        });
    }
}

// Auto-load on page load
window.addEventListener('load', loadPortfolioData);

// Add keyboard shortcut for save (Ctrl+S)
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        savePortfolioData();
    }
});