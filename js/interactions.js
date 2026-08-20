/**
 * ADCAM DIGITAL — INTERACTIVE FEATURES & ZERO-JITTER TYPEWRITER MODULE
 * js/interactions.js
 *
 * Features:
 * - Zero-layout-shift typewriter using sizer + absolute overlay pattern
 * - Respects prefers-reduced-motion
 * - Mobile-optimized shorter phrases
 * - No continuous loops when not needed
 */

(function () {
  'use strict';

  // ============================================================
  // 1. HERO TYPEWRITER ANIMATION (ZERO LAYOUT SHIFT)
  // ============================================================
  function initTypewriter() {
    const typewriterElement = document.querySelector('[data-typewriter]');
    if (!typewriterElement) return;

    const cursor = document.querySelector('.typewriter-cursor');

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      typewriterElement.textContent = "Digital Marketing and Innovation";
      if (cursor) cursor.style.display = 'none';
      return;
    }

    // Determine mobile vs desktop (width check)
    const isMobile = window.matchMedia('(max-width: 640px)').matches;

    // Full desktop phrases
    const desktopPhrases = [
      "Digital Marketing and Innovation",
      "Performance Marketing",
      "Digital Advertising",
      "Audience Growth",
      "Targeted Campaigns"
    ];

    // Shorter mobile phrases — avoid horizontal overflow
    const mobilePhrases = [
      "Digital Marketing",
      "Performance Marketing",
      "Digital Advertising",
      "Audience Growth",
      "Targeted Campaigns"
    ];

    const phrases = isMobile ? mobilePhrases : desktopPhrases;

    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let isDeleting = true;
    let timerId = null;

    const typingSpeed   = 80;
    const deletingSpeed = 40;
    const holdDelay     = 2200;
    const pauseBeforeType = 420;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
        typewriterElement.textContent = currentPhrase.substring(0, charIndex);
      } else {
        charIndex++;
        typewriterElement.textContent = currentPhrase.substring(0, charIndex);
      }

      let delta = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentPhrase.length) {
        delta = holdDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delta = pauseBeforeType;
      }

      timerId = setTimeout(type, delta);
    }

    // Hold initial text for holdDelay before starting first deletion
    timerId = setTimeout(type, holdDelay);
  }

  // ============================================================
  // 2. HEADER SCROLL ELEVATION
  // (Primary handler is in navigation.js — this is a fallback)
  // ============================================================
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    // navigation.js handles this — skip if already handled
    if (header._scrollHandlerAttached) return;

    function updateHeader() {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    header._scrollHandlerAttached = true;
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // ============================================================
  // INIT
  // ============================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initTypewriter();
      initHeaderScroll();
    });
  } else {
    initTypewriter();
    initHeaderScroll();
  }
})();
