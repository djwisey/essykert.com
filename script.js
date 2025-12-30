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
