// animations.js

function initTypedText(text, elementId) {
  const element = document.getElementById(elementId);
  if (!element || !text) return;

  element.innerHTML = '';
  let i = 0;
  let isDeleting = false;
  let textToType = text;

  function typeWriter() {
    if (isDeleting) {
      element.textContent = textToType.substring(0, i);
      i--;
      if (i < 0) {
        isDeleting = false;
        i = 0;
        setTimeout(typeWriter, 500); // pause before starting again
      } else {
        setTimeout(typeWriter, 50); // deleting speed
      }
    } else {
      element.textContent = textToType.substring(0, i);
      i++;
      if (i > textToType.length) {
        isDeleting = true;
        setTimeout(typeWriter, 2000); // pause at the end
      } else {
        setTimeout(typeWriter, 100); // typing speed
      }
    }
  }
  
  // Add blinking cursor style dynamically if missing
  if (!document.getElementById('cursor-style')) {
    const style = document.createElement('style');
    style.id = 'cursor-style';
    style.innerHTML = `
      #${elementId}::after {
        content: '|';
        animation: typingBlink 1s step-end infinite;
      }
      @keyframes typingBlink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  typeWriter();
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(sec => observer.observe(sec));
}

// Filter buttons use event delegation on the grid so they work
// even when called before project cards are injected by renderProjects()
function initFilterButtons() {
  const filterContainer = document.getElementById('filter-buttons');
  const grid = document.getElementById('projects-grid');
  if (!filterContainer || !grid) return;

  filterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-category]');
    if (!btn) return;

    // Update active pill
    filterContainer.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-category');

    // Filter cards
    grid.querySelectorAll('.project-card').forEach(card => {
      const match = filter === 'all' || card.getAttribute('data-category') === filter;
      card.style.display = match ? '' : 'none';
    });
  });
}

function initNavToggle() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      });
    });
  }
}

function initEmailCopy(email) {
  const btn = document.getElementById('contact-email-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (email) {
      navigator.clipboard.writeText(email).then(() => {
        const span = btn.querySelector('.btn-text');
        if (span) {
          const originalText = span.textContent;
          span.textContent = 'Copied!';
          setTimeout(() => {
            span.textContent = originalText;
          }, 2000);
        }
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    }
  });
}

function initVideoFallback() {
  const video = document.getElementById('hero-video');
  if (video) {
    video.addEventListener('error', () => {
      video.poster = 'assets/images/portfolio_background_fallback.jpg';
    }, true);
  }
}

// ── Hide / Show nav on scroll ─────────────────────────────────────────────────
// The navbar hides when the user scrolls DOWN and reappears when they scroll UP.
// To disable this behaviour, remove the initNavScroll() call in main.js.
function initNavScroll() {
  const nav = document.getElementById('nav-menu');
  if (!nav) return;

  let lastScrollY = window.scrollY;
  const THRESHOLD = 80; // px — ignore tiny scroll jitter

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;

    if (currentY < THRESHOLD) {
      // Always show near the top of the page
      nav.classList.remove('nav--hidden');
      return;
    }

    if (currentY > lastScrollY + 8) {
      // Scrolling DOWN — hide
      nav.classList.add('nav--hidden');
    } else if (currentY < lastScrollY - 8) {
      // Scrolling UP — show
      nav.classList.remove('nav--hidden');
    }

    lastScrollY = currentY;
  }, { passive: true });
}

// ── Particle Background ───────────────────────────────────────────────────────
// Canvas-based floating particle system for the hero section.
// Inspired by Joy Magdy's portfolio — small drifting dots.
// To tweak: adjust PARTICLE_COUNT, colors, speed, or size below.
function initParticles() {
  const canvas = document.getElementById('bg-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let mouse = { x: null, y: null };

  // ── Configuration ─────────────────────────────────────────────
  const PARTICLE_COUNT = 250;       // number of particles
  const COLORS = [
    'rgba(0, 204, 255, 0.6)',        // cyan accent
    'rgba(0, 204, 255, 0.3)',
    'rgba(155, 100, 220, 0.5)',      // violet accent
    'rgba(255, 255, 255, 0.25)',     // white specks
  ];
  const MIN_RADIUS = 1;
  const MAX_RADIUS = 3;
  const MOUSE_RADIUS = 120;         // px — how far mouse repels particles
  // ─────────────────────────────────────────────────────────────

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  // Build particles
  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    vx: (Math.random() - 0.5) * 0.4,
    vy: -(0.2 + Math.random() * 0.5), // drift upward
    opacity: 0.3 + Math.random() * 0.7,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      // Mouse repulsion — gentle drift away from cursor
      if (mouse.x !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (dx / dist) * force * 0.15;
          p.vy += (dy / dist) * force * 0.15;
        }
      }

      // Dampen velocity so particles don't fly off
      p.vx *= 0.98;
      p.vy *= 0.98;
      // Ensure upward drift persists
      if (p.vy > -0.1) p.vy -= 0.02;

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.y < -10)              p.y = canvas.height + 10;
      if (p.x < -10)              p.x = canvas.width  + 10;
      if (p.x > canvas.width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  // Respect reduced-motion preference
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    draw();
  }
}


