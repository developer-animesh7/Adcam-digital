/**
 * ADCAM DIGITAL — APPLICATION CONFIGURATION
 * js/config.js
 *
 * Public client-side configuration for AdCam Digital website.
 */

(function () {
  'use strict';

  const ADCAM_CONFIG = {
    brand: {
      name: "AdCam Digital",
      legalName: "AdCam Digital Private Limited",
      domain: "https://www.adcamdigital.com",
      email: "adcamdigital@gmail.com",
      phone: "+91 9430100937"
    },

    features: {
      nextlabIntegration: true,
      scrollAnimations: true,
      smoothScroll: true
    },

    nextlab: {
      name: "NextLab Innovations",
      role: "Technology & Innovation Partner",
      url: "https://nextlabinnovations.tech"
    },

    paths: {
      logo: "assets/images/brand/adcam-logo.jpg",
      logoSub: "../assets/images/brand/adcam-logo.jpg",
      nextlabLogo: "assets/images/partners/nextlab-logo.jpg",
      nextlabLogoSub: "../assets/images/partners/nextlab-logo.jpg"
    }
  };

  window.ADCAM_CONFIG = Object.freeze(ADCAM_CONFIG);
})();
