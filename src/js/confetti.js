// 獲勝全螢幕五彩繽紛粒子特效 (Confetti)

export class ConfettiEffect {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.particles = [];
    this.animating = false;
    this.resizeCanvas();

    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  trigger(durationMs = 3500) {
    this.resizeCanvas();
    this.particles = [];
    const colors = ['#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#00C7BE', '#30B0C7', '#32ADE6', '#007AFF', '#AF52DE', '#FF2D55'];

    for (let i = 0; i < 160; i++) {
      this.particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 50,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.8) * 16 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        shape: Math.random() > 0.4 ? 'rect' : 'circle',
        opacity: 1
      });
    }

    this.animating = true;
    const startTime = performance.now();

    const loop = (now) => {
      const elapsed = now - startTime;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // Gravity
        p.vx *= 0.98; // Friction
        p.rotation += p.vRot;

        if (elapsed > durationMs - 1000) {
          p.opacity = Math.max(0, 1 - (elapsed - (durationMs - 1000)) / 1000);
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.globalAlpha = p.opacity;
        this.ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
        } else {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        }
        this.ctx.restore();
      });

      if (elapsed < durationMs) {
        requestAnimationFrame(loop);
      } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.animating = false;
      }
    };

    requestAnimationFrame(loop);
  }
}
