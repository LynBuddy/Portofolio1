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

// ==================== Modal for larger content ==================== 
function createModal(title, content) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, rgba(30, 41, 82, 0.95), rgba(45, 27, 105, 0.95));
        border-radius: 15px;
        padding: 2rem;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        border: 2px solid rgba(251, 191, 36, 0.3);
        color: #e2e8f0;
    `;
    
    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 style="margin: 0; color: #fbbf24;">${title}</h3>
            <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #fbbf24;">&times;</button>
        </div>
        <p>${content}</p>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

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
            if (!this.contentEditable === 'true') {
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
        });
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.blur();
            }
        });
    }
});

// ==================== Print Functionality ==================== 
window.printPortfolio = function() {
    window.print();
};

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
    alert('Portfolio data saved!');
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

// ==================== Download Portfolio ==================== 
window.downloadPortfolio = function() {
    const element = document.documentElement;
    const opt = {
        margin: 10,
        filename: 'my-eportfolio.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    
    // Note: You'll need to include html2pdf library for this to work
    console.log('Download functionality requires html2pdf library');
};