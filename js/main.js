/**
 * ADCAM DIGITAL — CORE APPLICATION BOOTSTRAP
 * js/main.js
 */

(function () {
  'use strict';

  function init() {
    // Dynamic copyright year update
    const yearElements = document.querySelectorAll('[data-year]');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
      el.textContent = currentYear;
    });

    // Replace no-js with js class on html
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');

    // Smooth scroll for anchor links — respects prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length <= 1) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
