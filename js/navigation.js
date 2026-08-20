/**
 * ADCAM DIGITAL — NAVIGATION MODULE
 * js/navigation.js
 *
 * Phase 2 — Refined navigation interactions.
 *
 * Features:
 * - Mobile menu open/close with aria-expanded
 * - Focus trap inside mobile panel
 * - Escape key closes menu
 * - Scroll state on header (is-scrolled class)
 * - Active link detection
 * - Body scroll lock when menu is open
 */

(function () {
  'use strict';

  /* ============================================================
   * ELEMENTS
   * ============================================================ */

  const header        = document.querySelector('.site-header');
  const navToggle     = document.getElementById('nav-toggle-btn');
  const navMobile     = document.getElementById('nav-mobile-panel');

  if (!header || !navToggle || !navMobile) return;

  /* ============================================================
   * MENU STATE
   * ============================================================ */

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    navToggle.setAttribute('aria-expanded', 'true');
    navMobile.setAttribute('aria-hidden', 'false');
    navMobile.classList.add('is-open');
    document.body.classList.add('nav-open');
    // Move focus into panel
    const firstLink = navMobile.querySelector('.nav-mobile__link, .btn');
    if (firstLink) setTimeout(() => firstLink.focus(), 50);
  }

  function closeMenu() {
    isOpen = false;
    navToggle.setAttribute('aria-expanded', 'false');
    navMobile.setAttribute('aria-hidden', 'true');
    navMobile.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  }

  function toggleMenu() {
    isOpen ? closeMenu() : openMenu();
  }

  /* ============================================================
   * TOGGLE CLICK
   * ============================================================ */

  navToggle.addEventListener('click', toggleMenu);

  /* ============================================================
   * ESCAPE KEY
   * ============================================================ */

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
      navToggle.focus();
    }
  });

  /* ============================================================
   * FOCUS TRAP — keep focus inside mobile panel when open
   * ============================================================ */

  navMobile.addEventListener('keydown', function (e) {
    if (!isOpen || e.key !== 'Tab') return;

    const focusable = navMobile.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  /* ============================================================
   * CLOSE ON LINK CLICK (mobile nav links)
   * ============================================================ */

  const mobileLinks = navMobile.querySelectorAll('.nav-mobile__link, .nav-mobile__cta a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ============================================================
   * SCROLL STATE — header deepens on scroll
   * ============================================================ */

  let lastScrollY = 0;
  const SCROLL_THRESHOLD = 10;

  function onScroll() {
    const scrollY = window.scrollY;

    if (scrollY > SCROLL_THRESHOLD) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load

  /* ============================================================
   * CLOSE MENU ON RESIZE > 768px
   * ============================================================ */

  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 768 && isOpen) {
        closeMenu();
      }
    }, 100);
  });

  /* ============================================================
   * ACTIVE LINK — mark current page nav link
   * ============================================================ */

  function setActiveLinks() {
    const currentPath = window.location.pathname;
    const allLinks = document.querySelectorAll('.nav-link, .nav-mobile__link');

    allLinks.forEach(link => {
      const linkPath = new URL(link.href, window.location.origin).pathname;

      const isActive =
        (currentPath === '/' && (linkPath === '/' || linkPath.endsWith('/index.html'))) ||
        (linkPath !== '/' && currentPath.endsWith(linkPath.split('/').pop()));

      if (isActive) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('is-active');
        link.removeAttribute('aria-current');
      }
    });
  }

  setActiveLinks();

})();
