const canvas = document.getElementById('sparkleHeart');
const ctx = canvas.getContext('2d');

// Kích thước canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Hàm vẽ trái tim
function drawHeart(x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
  ctx.fill();
}

// Hạt lấp lánh
const particles = [];
function createParticles() {
  for (let i = 0; i < 200; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 300,
      y: canvas.height / 2 + (Math.random() - 0.5) * 300,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      opacity: Math.random(),
    });
  }
}

// Vẽ các hạt
function drawParticles() {
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 0, 0, ${p.opacity})`;
    ctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
      p.x = canvas.width / 2 + (Math.random() - 0.5) * 300;
      p.y = canvas.height / 2 + (Math.random() - 0.5) * 300;
    }
  });
}

// Animation
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Vẽ trái tim
  drawHeart(canvas.width / 2, canvas.height / 2 - 50, 100);

  // Vẽ các hạt lấp lánh
  drawParticles();

  requestAnimationFrame(animate);
}

// Khởi tạo
createParticles();
animate();
