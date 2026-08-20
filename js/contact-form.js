/**
 * ADCAM DIGITAL — FORMSPREE CONTACT FORM & STRICT VALIDATION
 * js/contact-form.js
 *
 * Formspree endpoint: https://formspree.io/f/xkjwyrzg
 * Form ID: xkjwyrzg
 *
 * Validation Rules:
 * - Full Name: Required, 2-100 chars, must contain letters, reject numbers/symbols only.
 * - Business Email: Required, strict RFC 5322 compatible regex, no spaces, valid domain.
 * - Phone Number: Optional. If provided, allows international formats, requires min 7 digits, rejects dummy strings.
 * - Inquiry Type: Required. Must match one of the 9 approved category keys.
 * - Company: Optional. Max 150 chars.
 * - Message: Required, 20-3000 chars, whitespace-only rejected.
 * - Full accessibility with aria-invalid, aria-describedby, focus on first invalid field.
 * - Duplicate submission prevention, loading state, custom AdCam success/error modals.
 */

(function () {
  'use strict';

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkjwyrzg';

  // 9 Approved inquiry category keys
  const APPROVED_INQUIRY_CATEGORIES = new Set([
    'advertiser_brand_campaign',
    'publisher_media_network',
    'performance_marketing',
    'traffic_acquisition',
    'strategic_advisory_consulting',
    'software_development_project',
    'devops_maintenance',
    'freelancing',
    'general_business_inquiry'
  ]);

  function initContactForm() {
    const form = document.getElementById('adcam-contact-form');
    if (!form) return;

    const submitBtn = document.getElementById('contact-submit-btn');
    const btnText = submitBtn ? submitBtn.querySelector('.btn__text') : null;
    const btnIcon = submitBtn ? submitBtn.querySelector('.btn__icon') : null;
    const btnSpinner = submitBtn ? submitBtn.querySelector('.btn__spinner') : null;

    const successModal = document.getElementById('adcam-success-modal');
    const errorModal = document.getElementById('adcam-error-modal');

    let isSubmitting = false;
    let lastActiveElement = null;

    // Field definitions and strict validators
    const fields = {
      name: {
        input: document.getElementById('form-name'),
        error: document.getElementById('name-error'),
        validate: (val) => {
          const trimmed = (val || '').trim();
          if (!trimmed) {
            return 'Please enter your full name.';
          }
          if (trimmed.length < 2 || trimmed.length > 100) {
            return 'Please enter your full name.';
          }
          // Must contain at least one letter (supports Unicode letters)
          const hasLetter = /[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]/.test(trimmed);
          if (!hasLetter) {
            return 'Please enter your full name.';
          }
          // Reject strings that are only numbers or special symbols
          const isNumericOrSymbolsOnly = /^[\d\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(trimmed);
          if (isNumericOrSymbolsOnly && !hasLetter) {
            return 'Please enter your full name.';
          }
          // Check for allowed characters in names: letters, spaces, hyphens, periods, apostrophes
          const validNamePattern = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s.'\-,]+$/;
          if (!validNamePattern.test(trimmed)) {
            return 'Please enter your full name.';
          }
          return '';
        }
      },
      email: {
        input: document.getElementById('form-email'),
        error: document.getElementById('email-error'),
        validate: (val) => {
          const trimmed = (val || '').trim();
          if (!trimmed) {
            return 'Please enter a valid business email address.';
          }
          if (trimmed.length > 120) {
            return 'Please enter a valid business email address.';
          }
          // Must not contain spaces
          if (/\s/.test(trimmed)) {
            return 'Please enter a valid business email address.';
          }
          // Standard email regex: exactly one @, valid user and domain part with at least one dot in domain
          const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
          if (!emailPattern.test(trimmed)) {
            return 'Please enter a valid business email address.';
          }
          return '';
        }
      },
      phone: {
        input: document.getElementById('form-phone'),
        error: document.getElementById('phone-error'),
        validate: (val) => {
          const trimmed = (val || '').trim();
          // Optional field
          if (!trimmed) return '';

          // Minimum 7 digits, maximum 25 chars, allow +, (), -, spaces
          const phonePattern = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{5,20}$/;
          const digitsOnly = trimmed.replace(/\D/g, '');

          if (!phonePattern.test(trimmed) || digitsOnly.length < 7 || digitsOnly.length > 16) {
            return 'Please enter a valid phone number.';
          }
          // Reject dummy identical repeating digits like 0000000 or 1111111
          if (/^(.)\1+$/.test(digitsOnly)) {
            return 'Please enter a valid phone number.';
          }
          return '';
        }
      },
      inquiry_type: {
        input: document.getElementById('form-inquiry-type'),
        error: document.getElementById('inquiry-type-error'),
        validate: (val) => {
          const trimmed = (val || '').trim();
          if (!trimmed || trimmed === '' || !APPROVED_INQUIRY_CATEGORIES.has(trimmed)) {
            return 'Please select an inquiry category.';
          }
          return '';
        }
      },
      company: {
        input: document.getElementById('form-company'),
        error: null,
        validate: (val) => {
          const trimmed = (val || '').trim();
          if (trimmed.length > 150) {
            return 'Company name must be under 150 characters.';
          }
          return '';
        }
      },
      message: {
        input: document.getElementById('form-message'),
        error: document.getElementById('message-error'),
        validate: (val) => {
          const trimmed = (val || '').trim();
          if (!trimmed || trimmed.length < 20) {
            return 'Please provide more details about your inquiry.';
          }
          if (trimmed.length > 3000) {
            return 'Your message is too long. Please keep it under 3000 characters.';
          }
          return '';
        }
      }
    };

    // Clear field errors dynamically on user input / change
    Object.keys(fields).forEach((key) => {
      const field = fields[key];
      if (!field.input) return;

      const handleInput = () => {
        field.input.classList.remove('is-invalid');
        field.input.setAttribute('aria-invalid', 'false');
        if (field.error) {
          field.error.textContent = '';
          field.error.classList.remove('is-visible');
        }
      };

      field.input.addEventListener('input', handleInput);
      field.input.addEventListener('change', handleInput);
    });

    // Validate entire form in predictable order
    function validateForm() {
      let isValid = true;
      let firstInvalidInput = null;

      const validationOrder = ['name', 'email', 'phone', 'inquiry_type', 'company', 'message'];

      validationOrder.forEach((key) => {
        const field = fields[key];
        if (!field || !field.input) return;

        const errorMsg = field.validate(field.input.value);

        if (errorMsg) {
          isValid = false;
          field.input.classList.add('is-invalid');
          field.input.setAttribute('aria-invalid', 'true');
          if (field.error) {
            field.error.textContent = errorMsg;
            field.error.classList.add('is-visible');
          }
          if (!firstInvalidInput) {
            firstInvalidInput = field.input;
          }
        } else {
          field.input.classList.remove('is-invalid');
          field.input.setAttribute('aria-invalid', 'false');
          if (field.error) {
            field.error.textContent = '';
            field.error.classList.remove('is-visible');
          }
        }
      });

      // Auto-focus first invalid input
      if (firstInvalidInput) {
        firstInvalidInput.focus();
      }

      return isValid;
    }

    // Submit button state toggle
    function setLoadingState(loading) {
      isSubmitting = loading;
      if (submitBtn) {
        submitBtn.disabled = loading;
        if (loading) {
          submitBtn.classList.add('is-loading');
          if (btnText) btnText.textContent = 'Sending Message...';
          if (btnIcon) btnIcon.style.display = 'none';
          if (btnSpinner) btnSpinner.style.display = 'inline-block';
        } else {
          submitBtn.classList.remove('is-loading');
          if (btnText) btnText.textContent = 'Send Message';
          if (btnIcon) btnIcon.style.display = 'inline-block';
          if (btnSpinner) btnSpinner.style.display = 'none';
        }
      }
    }

    // Modal Helpers
    function openModal(modalEl) {
      if (!modalEl) return;
      lastActiveElement = document.activeElement;
      modalEl.classList.add('is-active');
      modalEl.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      const focusable = modalEl.querySelector('button, [tabindex="0"]');
      if (focusable) setTimeout(() => focusable.focus(), 80);
    }

    function closeModal(modalEl) {
      if (!modalEl) return;
      modalEl.classList.remove('is-active');
      modalEl.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastActiveElement) {
        lastActiveElement.focus();
      }
    }

    // Modal Close Button handlers
    document.querySelectorAll('[data-modal-close]').forEach((btn) => {
      btn.addEventListener('click', function () {
        const modal = this.closest('.adcam-modal-overlay');
        if (modal) closeModal(modal);
      });
    });

    // Close on overlay backdrop click
    [successModal, errorModal].forEach((modal) => {
      if (!modal) return;
      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    });

    // Close modal on ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (successModal && successModal.classList.contains('is-active')) {
          closeModal(successModal);
        }
        if (errorModal && errorModal.classList.contains('is-active')) {
          closeModal(errorModal);
        }
      }
    });

    // Form Submit Event Handler
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Double-submission lock
      if (isSubmitting) return;

      // Strict client-side validation
      if (!validateForm()) return;

      setLoadingState(true);

      // Normalize inputs
      const formData = new FormData();
      formData.append('_source', 'AdCam Digital Website');
      formData.append('_page', 'Contact Us');
      formData.append('name', (fields.name.input.value || '').trim());
      formData.append('email', (fields.email.input.value || '').trim());
      
      const phoneVal = (fields.phone.input.value || '').trim();
      if (phoneVal) formData.append('phone', phoneVal);

      formData.append('inquiry_type', fields.inquiry_type.input.value);

      const companyVal = fields.company.input ? (fields.company.input.value || '').trim() : '';
      if (companyVal) formData.append('company', companyVal);

      const websiteInput = document.getElementById('form-website');
      const websiteVal = websiteInput ? (websiteInput.value || '').trim() : '';
      if (websiteVal) formData.append('website', websiteVal);

      formData.append('message', (fields.message.input.value || '').trim());

      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Success: Reset form and open custom AdCam Success Modal
          form.reset();
          // Reset aria-invalid attributes
          Object.keys(fields).forEach((key) => {
            if (fields[key].input) {
              fields[key].input.classList.remove('is-invalid');
              fields[key].input.removeAttribute('aria-invalid');
            }
          });
          openModal(successModal);
        } else {
          // Server returned an error - show error modal and preserve inputs
          const data = await response.json().catch(() => ({}));
          console.warn('Formspree response error:', data);
          openModal(errorModal);
        }
      } catch (err) {
        // Network or fetch failure - show error modal and preserve inputs
        console.error('Form submission network error:', err);
        openModal(errorModal);
      } finally {
        setLoadingState(false);
      }
    });
  }

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }
})();
