// Canvas Stars Generation with Asteroids
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
const asteroidsContainer = document.querySelector('.asteroids-container');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Star generation
const stars = [];
const starCount = 400; // Increased from 200

function generateStars() {
    stars.length = 0;
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2.5,
            opacity: Math.random() * 0.7 + 0.3,
            twinkleSpeed: Math.random() * 0.03 + 0.01,
            twinkleValue: Math.random() * Math.PI * 2
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        // Update twinkle
        star.twinkleValue += star.twinkleSpeed;
        const twinkleOpacity = Math.sin(star.twinkleValue) * 0.5 + 0.5;
        
        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkleOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect for larger stars
        if (star.size > 1.5) {
            ctx.strokeStyle = `rgba(251, 191, 36, ${star.opacity * twinkleOpacity * 0.6})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size + 2, 0, Math.PI * 2);
            ctx.stroke();
        }
    });
    
    requestAnimationFrame(drawStars);
}

// Generate Asteroids
function generateAsteroids() {
    const asteroidCount = 15; // Number of floating asteroids
    
    for (let i = 0; i < asteroidCount; i++) {
        const asteroid = document.createElement('div');
        const size = Math.random() * 40 + 10; // 10-50px
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 20; // 20-35s
        const delay = Math.random() * 5;
        
        asteroid.className = 'asteroid';
        asteroid.style.cssText = `
            left: ${left}%;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.8), rgba(167, 139, 250, 0.3));
            border: 1px solid rgba(251, 191, 36, 0.4);
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            box-shadow: inset -2px -2px 4px rgba(0,0,0,0.5), 0 0 ${size/2}px rgba(251, 191, 36, 0.3);
        `;
        
        asteroidsContainer.appendChild(asteroid);
    }
}

// Initialize
generatestars();
drawStars();
generateAsteroids();

// Mouse interaction for interactive stars
document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    stars.forEach(star => {
        const dx = mouseX - star.x;
        const dy = mouseY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
            star.opacity = Math.min(star.opacity + 0.015, 1);
        } else {
            star.opacity = Math.max(star.opacity - 0.015, 0.3);
        }
    });
});

// Resize asteroids on window resize
window.addEventListener('resize', function() {
    // Asteroids will automatically adjust due to percentage positioning
});