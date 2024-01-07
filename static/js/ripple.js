const rippleContainer = document.getElementById('rippleCanvas');
const ctx = rippleContainer.getContext('2d');

rippleContainer.width = window.innerWidth * .99;
rippleContainer.height = window.innerHeight * 1.95;

let scrollY = 0;

// Update canvas size on window resize
window.addEventListener('resize', function() {
    rippleContainer.width = window.innerWidth * 1.5;
    rippleContainer.height = window.innerHeight * 1.9;
});

// Scroll event listener for parallax effect
window.addEventListener('scroll', function() {
    scrollY = window.scrollY;
    updateCanvasPosition();
});

function updateCanvasPosition() {
    // Adjust the speed for parallax effect
    const parallaxSpeed = 0.5;
    const translateY = scrollY * parallaxSpeed;

    // Apply the transform to the canvas
    rippleContainer.style.transform = `translateY(${translateY}px)`;
}

const particles = [];
const numberOfParticles = 100;

// Initialize particles
for (let i = 0; i < numberOfParticles; i++) {
    particles.push({
        x: Math.random() * rippleContainer.width,
        y: Math.random() * rippleContainer.height,
        size: Math.random() / 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5, // Randomized direction
        speedY: (Math.random() - 0.5) * 0.5  // Randomized direction
    });
}

// Handle particle movement and drawing
function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].x += particles[i].speedX;
        particles[i].y += particles[i].speedY;

        // Draw the particle
        ctx.fillStyle = 'gray';
        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, particles[i].size, 0, Math.PI * 2);
        ctx.fill();

        // Reinitialize particle when it moves out of canvas
        if (particles[i].x < 0 || particles[i].x > rippleContainer.width || particles[i].y < 0 || particles[i].y > rippleContainer.height) {
            particles[i] = {
                x: Math.random() * rippleContainer.width,
                y: Math.random() * rippleContainer.height,
                size: Math.random()/2 + 1,
                speedX: (Math.random() - 0.5) * 0.5, // Randomized direction
                speedY: (Math.random() - 0.5) * 0.5  // Randomized direction
            };
        }
    }
}

const ripples = [];

// Click event listener for ripple effect
document.addEventListener('click', function(e) {
    const rect = rippleContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripples.push({ x, y, radius: 0, alpha: 1 });
});

// Draw ripples on canvas
function drawRipples() {
    for (let i = 0; i < ripples.length; i++) {
        const ripple = ripples[i];
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Adjusted expansion for larger size at end, maintaining initial speed
        // The expansion rate decreases more slowly
        ripple.radius += .75 / (1 + 0.003 * ripple.radius); // Adjust 0.5 for initial speed, 0.005 for deceleration rate

        // Linear fading
        ripple.alpha -= 0.005;

        // Remove the ripple when it becomes transparent
        if (ripple.alpha <= 0) {
            ripples.splice(i, 1);
            i--;
        }
    }
}





// Animation loop
function animate() {
    ctx.clearRect(0, 0, rippleContainer.width, rippleContainer.height);
    handleParticles();
    drawRipples();
    requestAnimationFrame(animate);
}

animate();
