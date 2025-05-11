// Initialize AOS Animation
AOS.init({
  duration: 1000,
  once: true,
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Typing Animation
const typingText = document.getElementById("typing-text");
const texts = ["Laravel Developer", "UI/UX Enthusiast", "Problem Solver"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 150;

function type() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 50;
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 150;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingDelay = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typingDelay = 500; // Pause before typing next
  }

  setTimeout(type, typingDelay);
}

// Start typing animation
setTimeout(type, 1000);

// Background Canvas Animation
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
function setCanvasDimensions() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

setCanvasDimensions();
window.addEventListener("resize", setCanvasDimensions);

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.color = `rgba(255, 215, 0, ${Math.random() * 0.5})`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) {
      this.speedX = -this.speedX;
    }

    if (this.y < 0 || this.y > canvas.height) {
      this.speedY = -this.speedY;
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Create particles
const particles = [];
for (let i = 0; i < 100; i++) {
  particles.push(new Particle());
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const particle of particles) {
    particle.update();
    particle.draw();
  }

  // Draw connections
  ctx.strokeStyle = "rgba(255, 215, 0, 0.05)";
  ctx.lineWidth = 0.5;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Connect particles within a certain distance
      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();

// Skill tabs
const btnStack = document.getElementById("btn-stack");
const btnTools = document.getElementById("btn-tools");
const btnSoft = document.getElementById("btn-soft");
const techStack = document.getElementById("tech-stack");
const tools = document.getElementById("tools");
const soft = document.getElementById("soft");

function showTab(tab) {
  [techStack, tools, soft].forEach((t) => t.classList.add("hidden"));
  tab.classList.remove("hidden");

  // Show skill progress animations when tab is visible
  const progressBars = tab.querySelectorAll(".skill-progress");
  progressBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0%";
    setTimeout(() => {
      bar.style.width = width;
    }, 50);
  });
}

btnStack.addEventListener("click", () => {
  [btnStack, btnTools, btnSoft].forEach((btn) =>
    btn.classList.remove("active", "bg-yellow-500", "text-black")
  );
  btnStack.classList.add("active", "bg-yellow-500", "text-black");
  showTab(techStack);
});

btnTools.addEventListener("click", () => {
  [btnStack, btnTools, btnSoft].forEach((btn) =>
    btn.classList.remove("active", "bg-yellow-500", "text-black")
  );
  btnTools.classList.add("active", "bg-yellow-500", "text-black");
  showTab(tools);
});

btnSoft.addEventListener("click", () => {
  [btnStack, btnTools, btnSoft].forEach((btn) =>
    btn.classList.remove("active", "bg-yellow-500", "text-black")
  );
  btnSoft.classList.add("active", "bg-yellow-500", "text-black");
  showTab(soft);
});

// Show the first tab by default
showTab(techStack);
