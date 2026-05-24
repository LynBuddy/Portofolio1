// ==================== Language Switching System ====================

const langBtns = document.querySelectorAll('.lang-btn');
let currentLang = 'en';

// Initialize language from localStorage or browser preference
function initLanguage() {
    const saved = localStorage.getItem('portfolio-language');
    if (saved) {
        currentLang = saved;
    } else {
        currentLang = navigator.language.startsWith('id') ? 'id' : 'en';
    }
    setLanguage(currentLang);
}

// Language button event listeners
langBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        setLanguage(lang);
        
        // Update active button
        langBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Save preference
        localStorage.setItem('portfolio-language', lang);
    });
});

// Set language function
function setLanguage(lang) {
    currentLang = lang;
    const elements = document.querySelectorAll('[data-en][data-id]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.tagName === 'A' || element.tagName === 'BUTTON') {
                element.textContent = text;
            } else if (element.tagName === 'H2' || element.tagName === 'H3' || element.tagName === 'H4') {
                element.textContent = text;
            } else if (element.tagName === 'P' || element.tagName === 'SPAN' || element.tagName === 'STRONG') {
                element.textContent = text;
            } else {
                element.textContent = text;
            }
        }
    });
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', initLanguage);

// Also set active button on init
window.addEventListener('load', function() {
    langBtns.forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
});