// Core page elements used by the navigation interactions.
const header = document.querySelector('.header');
const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav');

// Close the mobile menu and restore scrolling.
function closeMenu() {
  header.classList.remove('open');
  document.body.classList.remove('menu-open');
  menu.setAttribute('aria-expanded', 'false');
  menu.querySelector('span').textContent = 'Menu';
}

// Open or close the compact navigation.
menu.addEventListener('click', () => {
  const isOpening = !header.classList.contains('open');

  header.classList.toggle('open', isOpening);
  document.body.classList.toggle('menu-open', isOpening);
  menu.setAttribute('aria-expanded', String(isOpening));
  menu.querySelector('span').textContent = isOpening ? 'Close' : 'Menu';
});

// Close the menu after choosing a destination or pressing Escape.
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

// Add a solid header background once content scrolls beneath it.
window.addEventListener(
  'scroll',
  () => header.classList.toggle('scrolled', window.scrollY > 20),
  { passive: true }
);

// Highlight the navigation link for the section currently in view.
const navLinks = [...nav.querySelectorAll('a')];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle('active', link.hash === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: '-35% 0px -60%' }
);

document.querySelectorAll('main section[id]').forEach((section) => {
  sectionObserver.observe(section);
});

// Reveal content once as it enters the viewport.
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});

// Keep the footer copyright current without manual edits.
document.querySelector('[data-year]').textContent = new Date().getFullYear();
