/* ==========================================================
   ACS — Portfolio (Filter + Chart)
   ========================================================== */

(function () {
  'use strict';

  // ── Filter Tabs ───────────────────────────────────────────
  const tabs  = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.project-card-wrap');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const f = tab.dataset.filter;

      cards.forEach(card => {
        const show = f === 'all' || card.dataset.category === f;
        if (show) {
          card.style.display  = 'block';
          card.style.opacity  = '0';
          card.style.transform = 'scale(0.96)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity .35s ease, transform .35s ease';
            card.style.opacity    = '1';
            card.style.transform  = 'scale(1)';
          });
        } else {
          card.style.transition = 'opacity .25s ease, transform .25s ease';
          card.style.opacity    = '0';
          card.style.transform  = 'scale(0.94)';
          setTimeout(() => { card.style.display = 'none'; }, 260);
        }
      });
    });
  });

  // ── Portfolio Bar Chart ───────────────────────────────────
  const canvas = document.getElementById('portfolio-chart');
  if (!canvas || typeof Chart === 'undefined') return;

  const props = [
    { label: ['11250', 'S Dove'],   price: 565000 },
    { label: ['580',   'W 130'],    price: 490000 },
    { label: ['3740',  'S Main'],   price: 385000 },
    { label: ['4219',  'S Main'],   price: 410000 },
    { label: ['5248',  'Shawnee'],  price: 355000 },
    { label: ['1076',  'E 3300'],   price: 465000 },
    { label: ['3291',  'W York'],   price: 320000 },
    { label: ['1136',  'Navarre'],  price: 295000 },
    { label: ['5360',  'S 900'],    price: 440000 },
    { label: ['5357',  'W Main'],   price: 390000 },
    { label: ['2372',  'E Hoyt'],   price: 510000 },
    { label: ['4121',  'W 3500'],   price: 345000 },
    { label: ['6219',  'S Vine'],   price: 425000 },
    { label: ['1840',  'E Draper'], price: 580000 },
  ];

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: props.map(p => p.label),
      datasets: [{
        label: 'Sale Price',
        data: props.map(p => p.price),
        backgroundColor: props.map((_, i) =>
          i % 2 === 0 ? 'rgba(210,10,17,0.82)' : 'rgba(0,138,209,0.82)'
        ),
        borderColor: props.map((_, i) =>
          i % 2 === 0 ? '#D20A11' : '#008AD1'
        ),
        borderWidth: 1,
        borderRadius: 3,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: { duration: 1200, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a1a1a',
          borderColor: '#D20A11',
          borderWidth: 1,
          callbacks: {
            label: ctx => ' $' + ctx.parsed.y.toLocaleString()
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 200000,
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: {
            color: '#C1C1C1',
            font: { family: "'Helvetica Neue', sans-serif", size: 11 },
            callback: v => '$' + (v / 1000).toFixed(0) + 'K'
          }
        },
        x: {
          grid: { display: false },
          ticks: {
            color: '#C1C1C1',
            maxRotation: 0,
            autoSkip: false,
            font: { family: "'Helvetica Neue', sans-serif", size: 10 }
          }
        }
      }
    }
  });

})();
