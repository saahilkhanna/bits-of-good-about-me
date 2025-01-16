const toggleButton = document.getElementById('toggleTheme'); // the button
const body = document.body;     // Entire screen 


// When the toggle button is clicked
toggleButton.addEventListener('click', () => {

    body.classList.toggle('light-mode');    // Switch it
    
    // Change the button text-content
    if (body.classList.contains('light-mode')) {
        toggleButton.textContent = 'Switch to Dark Mode';

    } else {
        toggleButton.textContent = 'Switch to Light Mode';

    }

});


const canvas = document.getElementById('sandCanvas');
const ctx = canvas.getContext('2d');    // Allows for the shapes to be drawn


// Set the canvs to the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



const particles = [];
const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#33FF57', '#3357FF', '#8E44AD']; // Colors I want the balls to be

// Constants
const gravity = 0.5;
const friction = 0.99;

// Create a Particle class
class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = Math.random() * 2 + 1;
    }

    // Draw the particles as a circle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    
    // Change the particles
    update() {
        // Add gravity
        this.vy += gravity;

        // Apply friction
        this.vx *= friction;
        this.vy *= friction;

        // Move the particle
        this.x += this.vx;
        this.y += this.vy;

        // Check for collision with bottom of the screen
        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.vy = -this.vy * 0.7; // Bounce with damping
        }

        // Check for collision with sides
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.vx = -this.vx;
        }

        this.draw();
    }
}

// Add particles to the simulation
function createParticles() {
    setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = 0;
        const radius = Math.random() * 3 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, radius, color));
    }, 50);
}

// Animate the particles
function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Slightly transparent to create a trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        particle.update();

        // Remove particles that have settled for performance
        if (particle.y > canvas.height - particle.radius && Math.abs(particle.vy) < 0.1) {
            particles.splice(index, 1);
        }
    });
}

// Initialize the simulation
createParticles();
animate();