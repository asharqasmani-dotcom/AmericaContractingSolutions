/* ==========================================================
   ACS — Global JavaScript
   ========================================================== */

(function () {
  'use strict';

  // ── Page Loader ──────────────────────────────────────────
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 1300);
  }

  // ── Active Nav Link ───────────────────────────────────────
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a, #mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // ── Hamburger / Mobile Nav ────────────────────────────────
  const burger   = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileNav.classList.remove('open');
      })
    );
  }

  // ── Scroll-to-Top ─────────────────────────────────────────
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 320);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  // ── Scroll Animations (IntersectionObserver) ──────────────
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => io.observe(el));
  }

  // ── Stat Counter Animation ────────────────────────────────
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          runCounter(e.target);
          cio.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cio.observe(el));
  }

  function runCounter(el) {
    const target   = parseInt(el.dataset.count, 10);
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const duration = 1600;
    const start    = Date.now();

    const tick = () => {
      const t = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + Math.round(eased * target) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // ── Booking Modal ─────────────────────────────────────────
  const modalEl = document.getElementById('booking-modal');

  function openModal()  { if (modalEl) { modalEl.classList.add('open');  document.body.style.overflow = 'hidden'; } }
  function closeModal() { if (modalEl) { modalEl.classList.remove('open'); document.body.style.overflow = ''; } }

  document.querySelectorAll('[data-open-modal]').forEach(btn =>
    btn.addEventListener('click', openModal)
  );

  const mClose = document.querySelector('.modal-close');
  if (mClose) mClose.addEventListener('click', closeModal);

  if (modalEl) {
    modalEl.addEventListener('click', e => { if (e.target === modalEl) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

  // ── Booking Form ──────────────────────────────────────────
  const bookForm = document.getElementById('booking-form');
  if (bookForm) {
    bookForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(bookForm));
      const subject = `Appointment Request — ${d['project-type']} | ${d['name']}`;
      const body = `Name: ${d['name']}\nPhone: ${d['phone']}\nEmail: ${d['email']}\nProject Type: ${d['project-type']}\nPreferred Date: ${d['date']}\nMessage: ${d['message']}`;
      window.location.href = `mailto:Americascontractingsolutions@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      bookForm.style.display = 'none';
      const s = document.getElementById('booking-success');
      if (s) s.classList.add('show');
      setTimeout(closeModal, 3500);
    });
  }

})();
