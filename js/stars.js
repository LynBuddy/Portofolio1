// Canvas Stars Generation
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Star generation
const stars = [];
const starCount = 200;

function generateStars() {
    stars.length = 0;
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            opacity: Math.random() * 0.7 + 0.3,
            twinkleSpeed: Math.random() * 0.02 + 0.01,
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
        if (star.size > 1) {
            ctx.strokeStyle = `rgba(251, 191, 36, ${star.opacity * twinkleOpacity * 0.5})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size + 2, 0, Math.PI * 2);
            ctx.stroke();
        }
    });
    
    requestAnimationFrame(drawStars);
}

// Initialize
generatestars();
drawStars();

// Add some nebula-like clouds
function drawNebula() {
    const gradients = [
        { x: 200, y: 200, color: 'rgba(167, 139, 250, 0.05)' },
        { x: canvas.width - 300, y: 300, color: 'rgba(99, 102, 241, 0.05)' },
        { x: canvas.width / 2, y: canvas.height - 400, color: 'rgba(236, 72, 153, 0.05)' }
    ];
    
    gradients.forEach(gradient => {
        const radialGradient = ctx.createRadialGradient(
            gradient.x, gradient.y, 0,
            gradient.x, gradient.y, 400
        );
        radialGradient.addColorStop(0, gradient.color);
        radialGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = radialGradient;
        ctx.fillRect(gradient.x - 400, gradient.y - 400, 800, 800);
    });
}

// Initial nebula draw
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawNebula();

// Mouse interaction for interactive stars
document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    stars.forEach(star => {
        const dx = mouseX - star.x;
        const dy = mouseY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
            star.opacity = Math.min(star.opacity + 0.01, 1);
        } else {
            star.opacity = Math.max(star.opacity - 0.01, 0.3);
        }
    });
});