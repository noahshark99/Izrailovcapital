/* ==========================================================================
   IZRAILOV CAPITAL — Interactions
   ========================================================================== */

(function () {
  'use strict';

  /* --- Navigation: scroll state + theme switching ---------------------- */
  const nav = document.getElementById('nav');
  const heroEl = document.querySelector('.hero');
  let lastScroll = 0;

  function updateNav() {
    const scrolled = window.scrollY > 60;
    nav.classList.toggle('scrolled', scrolled);

    // Determine if we're over a dark section -> nav stays light
    // Otherwise nav uses dark colors on scroll
    const sections = document.querySelectorAll('.hero, .product--dark, .property-types, .contact, .capabilities-bridge');
    let overDark = false;
    const navHeight = nav.offsetHeight;
    const navCenter = navHeight / 2;

    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= navCenter && rect.bottom >= navCenter) {
        overDark = true;
      }
    });

    nav.classList.toggle('is-light', overDark);
    lastScroll = window.scrollY;
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* --- Mobile menu toggle ----------------------------------------------- */
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is tapped
    menu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Reveal-on-scroll animations -------------------------------------- */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* --- Smooth scroll for in-page anchors -------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = nav.offsetHeight - 10;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* --- Form handling ---------------------------------------------------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submit = form.querySelector('button[type="submit"]');
      const originalText = submit.innerHTML;

      // Simple required validation
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      let valid = true;
      [name, email].forEach((f) => {
        if (!f.value.trim()) {
          f.style.borderBottomColor = '#ff6b6b';
          valid = false;
          setTimeout(() => { f.style.borderBottomColor = ''; }, 2500);
        }
      });
      if (!valid) return;

      submit.disabled = true;
      submit.innerHTML = 'Sending…';

      // Simulated submission — in production replace with fetch() to your endpoint
      setTimeout(() => {
        submit.innerHTML = 'Inquiry Received ✓';
        submit.style.background = '#3a5a3a';
        submit.style.color = '#F6F2EA';
        submit.style.borderColor = '#3a5a3a';
        form.reset();
        setTimeout(() => {
          submit.disabled = false;
          submit.innerHTML = originalText;
          submit.style.background = '';
          submit.style.color = '';
          submit.style.borderColor = '';
        }, 3500);
      }, 900);
    });
  }

  /* --- Year stamp in footer --------------------------------------------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* --- Image graceful fallback + fade-in -------------------------------- */
  /* When an Unsplash (or any) image fails to load, hide the broken-image
     icon so the section's gradient fallback shows through cleanly.
     When images do load, fade them in so they don't pop in jarringly. */
  document.querySelectorAll('.hero__media img, .product__hero img').forEach((img) => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.8s ease';

    const reveal = () => { img.style.opacity = '1'; };
    const hide = () => { img.style.display = 'none'; };

    if (img.complete && img.naturalWidth > 0) {
      reveal();
    } else if (img.complete && img.naturalWidth === 0) {
      hide();
    } else {
      img.addEventListener('load', reveal, { once: true });
      img.addEventListener('error', hide, { once: true });
    }
  });

  /* --- Subtle parallax on product hero images --------------------------- */
  const productHeroImages = document.querySelectorAll('.product__hero img');
  if (productHeroImages.length && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          productHeroImages.forEach((img) => {
            const rect = img.parentElement.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > window.innerHeight) return;
            const speed = 0.15;
            const offset = (rect.top - window.innerHeight / 2) * speed;
            img.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }

})();
