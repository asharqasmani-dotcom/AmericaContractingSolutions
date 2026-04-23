/* ==========================================================
   ACS — Home Page (Hero Slider + Review Carousel)
   ========================================================== */

(function () {
  'use strict';

  const slides  = document.querySelectorAll('.slide');
  const dots    = document.querySelectorAll('.slide-dot');
  const prevBtn = document.getElementById('slide-prev');
  const nextBtn = document.getElementById('slide-next');

  if (!slides.length) return;

  let current = 0;
  let timer;

  function go(idx) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = ((idx % slides.length) + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function next()  { go(current + 1); }
  function prev()  { go(current - 1); }
  function start() { timer = setInterval(next, 5000); }
  function reset() { clearInterval(timer); start(); }

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); reset(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); reset(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { go(i); reset(); }));

  // Touch / swipe support
  let tx = 0;
  const hero = document.querySelector('.hero-slider');
  if (hero) {
    hero.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend',   e => {
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); reset(); }
    }, { passive: true });
  }

  go(0);
  start();

})();

/* ── Review Carousel – infinite CSS belt ────────────────── */
(function () {
  'use strict';

  const track = document.getElementById('rc-track');
  if (!track) return;

  const origCards = Array.from(track.querySelectorAll('.rc-card'));
  if (!origCards.length) return;

  /*
   * Clone every card and append it to the track.
   * The CSS animation moves the track by -50% of its full width,
   * which equals exactly one set of originals → perfect seamless loop.
   */
  origCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  /* Pause the belt while the user hovers */
  track.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  track.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });

  /* Pause while finger is down, resume on lift */
  track.addEventListener('touchstart', () => {
    track.style.animationPlayState = 'paused';
  }, { passive: true });
  track.addEventListener('touchend', () => {
    track.style.animationPlayState = 'running';
  }, { passive: true });

})();
