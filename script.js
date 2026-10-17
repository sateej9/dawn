const canvas = document.getElementById('sparkCanvas');

if (!canvas) {
  console.log('Canvas not present; skipping animated background.');
} else {
  const ctx = canvas.getContext('2d');

  const particles = [];
  const orbiters = [];

  function resizeCanvas() {
    const ratio = window.devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function createParticles() {
    const count = 44;
    particles.length = 0;

    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3.4 + 1.2,
        speedX: (Math.random() - 0.5) * 0.9,
        speedY: (Math.random() - 0.5) * 0.9,
        alpha: Math.random() * 0.8 + 0.2,
      });
    }
  }

  function createOrbiters() {
    orbiters.length = 0;
    const centerX = canvas.width * 0.5;
    const centerY = canvas.height * 0.53;

    for (let i = 0; i < 7; i += 1) {
      orbiters.push({
        angle: (Math.PI * 2 * i) / 7,
        radius: 110 + i * 22,
        speed: 0.005 + i * 0.0007,
        centerX,
        centerY,
        size: 8 + i,
        alpha: 0.18 + i * 0.09,
      });
    }
  }

  function drawScene() {
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createRadialGradient(
      width * 0.5,
      height * 0.45,
      10,
      width * 0.5,
      height * 0.5,
      width * 0.7
    );
    gradient.addColorStop(0, 'rgba(246, 216, 141, 0.30)');
    gradient.addColorStop(0.5, 'rgba(15, 93, 114, 0.10)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    orbiters.forEach((orbiter, index) => {
      orbiter.angle += orbiter.speed;
      const x = orbiter.centerX + Math.cos(orbiter.angle) * orbiter.radius;
      const y = orbiter.centerY + Math.sin(orbiter.angle * 1.3) * (orbiter.radius * 0.45);

      ctx.beginPath();
      ctx.fillStyle = `rgba(242, 185, 75, ${orbiter.alpha})`;
      ctx.arc(x, y, orbiter.size, 0, Math.PI * 2);
      ctx.fill();

      if (index === orbiters.length - 1) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(15, 93, 114, 0.18)';
        ctx.lineWidth = 1.5;
        ctx.arc(orbiter.centerX, orbiter.centerY, orbiter.radius + 26, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > height) particle.speedY *= -1;

      ctx.beginPath();
      ctx.fillStyle = `rgba(15, 93, 114, ${particle.alpha})`;
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.beginPath();
    ctx.fillStyle = 'rgba(200, 88, 61, 0.75)';
    ctx.arc(width * 0.72, height * 0.34, 54, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = 'rgba(242, 185, 75, 0.78)';
    ctx.arc(width * 0.29, height * 0.27, 40, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = 'rgba(15, 93, 114, 0.62)';
    ctx.moveTo(width * 0.4, height * 0.82);
    ctx.lineTo(width * 0.56, height * 0.62);
    ctx.lineTo(width * 0.7, height * 0.82);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(9, 55, 68, 0.9)';
    ctx.font = '800 34px Inter';
    ctx.fillText('2nd', width * 0.45, height * 0.82);
    ctx.font = '600 18px Inter';
    ctx.fillText('Pakistan', width * 0.47, height * 0.86);
  }

  function animate() {
    drawScene();
    requestAnimationFrame(animate);
  }

  resizeCanvas();
  createParticles();
  createOrbiters();
  animate();

  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
    createOrbiters();
  });
}
