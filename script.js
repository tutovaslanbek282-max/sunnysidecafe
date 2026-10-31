/* ============================================
   Санисайд · Interactive behaviours
   ============================================ */

(function () {
  'use strict';

  // ---------- Preloader ----------
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hide');
      document.body.style.overflow = '';
    }, 1600);
  });
  // Prevent scroll while loading
  document.body.style.overflow = 'hidden';

  // ---------- Header scroll ----------
  const header = document.getElementById('header');
  const categoryBar = document.getElementById('categoryBar');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);

    // Show category bar after hero
    const hero = document.getElementById('hero');
    if (hero) {
      const heroBottom = hero.offsetTop + hero.offsetHeight - 100;
      categoryBar.classList.toggle('visible', y > heroBottom);
    }

    // Back to top
    backToTop.classList.toggle('visible', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile nav ----------
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
  });

  // Close on link click
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      nav.classList.remove('open');
    });
  });

  // ---------- Category bar active state ----------
  const sections = [
    'breakfast', 'toasts', 'bowls', 'hot', 'build', 'drinks'
  ].map(id => document.getElementById(id)).filter(Boolean);

  const catButtons = document.querySelectorAll('.cat-btn');

  function updateActiveCategory() {
    const scrollPos = window.scrollY + 180;
    let current = sections[0]?.id;

    for (const section of sections) {
      if (section.offsetTop <= scrollPos) {
        current = section.id;
      }
    }

    catButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.target === current);
    });
  }

  window.addEventListener('scroll', updateActiveCategory, { passive: true });

  // Smooth scroll for category buttons
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (target) {
        const offset = 140;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---------- Intersection Observer for reveal ----------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: unobserve after reveal for performance
          // revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- Back to top ----------
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------- Subtle magnetic hover on primary buttons ----------
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ---------- Card tilt effect (subtle) ----------
  document.querySelectorAll('.dish-card, .build-block, .drink-group').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 768) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 28;
      const rotateY = (centerX - x) / 28;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ---------- Keyboard accessibility for category bar ----------
  catButtons.forEach((btn, i) => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        catButtons[(i + 1) % catButtons.length].focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        catButtons[(i - 1 + catButtons.length) % catButtons.length].focus();
      }
    });
  });

  // ---------- Smooth hash links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = href === '#hero' ? 0 : 120;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---------- Console easter egg ----------
  console.log(
    '%c санисайд · spoon & story ',
    'background: #D9773A; color: white; padding: 8px 14px; border-radius: 6px; font-family: serif; font-size: 14px;'
  );
})();
