/* ==========================================================
   ACS — Contact Page
   ========================================================== */

(function () {
  'use strict';

  const form    = document.getElementById('contact-form');
  const wrapper = document.getElementById('contact-form-wrapper');
  const success = document.getElementById('contact-success');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const subject = `Project Inquiry — ${d['project-type']} | ${d['name']}`;
    const body = [
      `Name: ${d['name']}`,
      `Phone: ${d['phone']}`,
      `Email: ${d['email']}`,
      `Project Type: ${d['project-type']}`,
      `Project Location: ${d['location']}`,
      `Estimated Budget: ${d['budget']}`,
      '',
      `Message:`,
      d['message']
    ].join('\n');

    window.location.href =
      `mailto:Americascontractingsolutions@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (wrapper) wrapper.style.display = 'none';
    if (success)  success.classList.add('show');
  });

  // Appointment form (contact page inline)
  const apptForm = document.getElementById('appt-form');
  const apptWrap = document.getElementById('appt-form-wrapper');
  const apptSucc = document.getElementById('appt-success');

  if (apptForm) {
    apptForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(apptForm));
      const subject = `Appointment — ${d['project-type']} | ${d['name']}`;
      const body = Object.entries(d).map(([k, v]) => `${k}: ${v}`).join('\n');
      window.location.href =
        `mailto:Americascontractingsolutions@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if (apptWrap) apptWrap.style.display = 'none';
      if (apptSucc) apptSucc.classList.add('show');
    });
  }

})();
