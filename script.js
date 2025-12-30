// Cache navigation links and section references for scroll-based highlighting.
const navLinks = document.querySelectorAll('.main-nav a');
const sections = Array.from(document.querySelectorAll('section'));

// Toggle the active nav link based on the scroll position.
const highlightNav = () => {
  const scrollPos = window.scrollY + window.innerHeight / 2;
  let active = null;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const top = section.offsetTop;
    const bottom = top + rect.height;
    if (scrollPos >= top && scrollPos < bottom) {
      active = section.getAttribute('id');
    }
  });
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === `#${active}`);
  });
};

// Keep the navigation state in sync with scroll position.
window.addEventListener('scroll', highlightNav);
highlightNav();

// Update the glow position on connect cards as the pointer moves.
const connectCards = document.querySelectorAll('.connect-card');
connectCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  });
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--mx', '50%');
    card.style.setProperty('--my', '50%');
  });
});

// Reveal panels as they enter the viewport.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

// Observe sections and cards for the reveal animation.
document.querySelectorAll('.panel, .music-card, .gallery-item, .connect-card').forEach((el) => {
  observer.observe(el);
});

// Procedural grunge background drawing (no image assets).
const grungeCanvas = document.querySelector('.grunge-canvas');
if (grungeCanvas) {
  const ctx = grungeCanvas.getContext('2d');
  const drawGrunge = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    grungeCanvas.width = width * dpr;
    grungeCanvas.height = height * dpr;
    grungeCanvas.style.width = `${width}px`;
    grungeCanvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const haze = ctx.createRadialGradient(width * 0.2, height * 0.35, 0, width * 0.2, height * 0.35, width * 0.55);
    haze.addColorStop(0, 'rgba(255, 90, 60, 0.25)');
    haze.addColorStop(0.5, 'rgba(120, 20, 30, 0.18)');
    haze.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = haze;
    ctx.fillRect(0, 0, width, height);

    const ember = ctx.createRadialGradient(width * 0.78, height * 0.55, 0, width * 0.78, height * 0.55, width * 0.4);
    ember.addColorStop(0, 'rgba(210, 30, 30, 0.3)');
    ember.addColorStop(0.6, 'rgba(80, 10, 15, 0.2)');
    ember.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = ember;
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = 'overlay';
    for (let i = 0; i < 1400; i += 1) {
      const size = Math.random() * 2 + 0.3;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.08})`;
      ctx.fillRect(Math.random() * width, Math.random() * height, size, size);
    }

    ctx.globalCompositeOperation = 'soft-light';
    ctx.lineWidth = 1;
    for (let i = 0; i < 14; i += 1) {
      ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.2})`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }

    ctx.globalCompositeOperation = 'source-over';
  };

  drawGrunge();
  window.addEventListener('resize', drawGrunge);
}
