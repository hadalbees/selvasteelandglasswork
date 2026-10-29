/**
 * Selva Stainless Steel & Glass Works - Main JavaScript
 * High Performance Vanilla ES6+ Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Sticky Navigation & Scroll Management
     ========================================================================== */
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Active link highlighter on scroll
  const highlightActiveLink = () => {
    const scrollY = window.scrollY + 120;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightActiveLink, { passive: true });

  /* ==========================================================================
     2. Mobile Navigation Drawer
     ========================================================================== */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    const toggleMenu = (open) => {
      const isOpen = typeof open === 'boolean' ? open : !navMenu.classList.contains('active');
      mobileToggle.classList.toggle('active', isOpen);
      navMenu.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    mobileToggle.addEventListener('click', () => toggleMenu());

    // Close when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          toggleMenu(false);
        }
      });
    });

    // Close when clicking outside drawer
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && 
          !mobileToggle.contains(e.target)) {
        toggleMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMenu(false);
      }
    });
  }

  /* ==========================================================================
     3. Project Gallery Filtering
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          if (filterValue === 'all' || itemCategory === filterValue) {
            item.classList.remove('hide');
          } else {
            item.classList.add('hide');
          }
        });
      });
    });
  }

  /* ==========================================================================
     4. Lightbox Modal
     ========================================================================== */
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCat = document.getElementById('lightbox-cat');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentGalleryIndex = 0;
  let activeItems = [];

  const updateActiveItems = () => {
    activeItems = Array.from(document.querySelectorAll('.gallery-item:not(.hide)'));
  };

  const showLightboxImage = (index) => {
    if (activeItems.length === 0) return;
    if (index < 0) index = activeItems.length - 1;
    if (index >= activeItems.length) index = 0;
    
    currentGalleryIndex = index;
    const item = activeItems[currentGalleryIndex];
    const imgEl = item.querySelector('img');
    const titleEl = item.querySelector('.gallery-title');
    const catEl = item.querySelector('.gallery-badge');

    const fullSrc = item.getAttribute('data-full') || imgEl.src;
    lightboxImg.src = fullSrc;
    lightboxImg.alt = imgEl.alt || 'Selva Works';
    lightboxTitle.textContent = titleEl ? titleEl.textContent : '';
    lightboxCat.textContent = catEl ? catEl.textContent : '';
  };

  const openLightbox = (item) => {
    updateActiveItems();
    const index = activeItems.indexOf(item);
    if (index !== -1) {
      showLightboxImage(index);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (lightbox) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => openLightbox(item));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(item);
        }
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showLightboxImage(currentGalleryIndex - 1);
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showLightboxImage(currentGalleryIndex + 1);
      });
    }

    // Backdrop click closes
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });

    // Keyboard support for Lightbox
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showLightboxImage(currentGalleryIndex - 1);
      if (e.key === 'ArrowRight') showLightboxImage(currentGalleryIndex + 1);
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        showLightboxImage(currentGalleryIndex + 1); // Swipe left -> next
      }
      if (touchEndX - touchStartX > 50) {
        showLightboxImage(currentGalleryIndex - 1); // Swipe right -> prev
      }
    }, { passive: true });
  }

  /* ==========================================================================
     5. Quote Form Validation & WhatsApp Redirection
     ========================================================================== */
  const quoteForm = document.getElementById('quote-form');
  const quoteSuccess = document.getElementById('form-success');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('quote-name');
      const phoneInput = document.getElementById('quote-phone');
      const serviceInput = document.getElementById('quote-service');
      const messageInput = document.getElementById('quote-message');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameInput.classList.add('error');
        isValid = false;
      } else {
        nameInput.classList.remove('error');
      }

      // Validate Phone (allow digits, spaces, dashes, +)
      const cleanPhone = phoneInput.value.replace(/[\s\-\(\)]/g, '');
      const phoneRegex = /^[+]?[0-9]{10,13}$/;
      if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
        phoneInput.classList.add('error');
        isValid = false;
      } else {
        phoneInput.classList.remove('error');
      }

      // Validate Service
      if (!serviceInput.value) {
        serviceInput.classList.add('error');
        isValid = false;
      } else {
        serviceInput.classList.remove('error');
      }

      if (!isValid) {
        const firstError = quoteForm.querySelector('.form-control.error');
        if (firstError) firstError.focus();
        return;
      }

      // Construct WhatsApp Message
      const businessPhone = '919994809708';
      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const service = serviceInput.options[serviceInput.selectedIndex].text;
      const message = messageInput.value.trim() || 'Please share quotation and design options.';

      const formattedMessage = 
`Hello Selva Stainless Steel & Glass Works,
I would like to enquire about ${service}.

*Client Name:* ${name}
*Contact Number:* ${phone}
*Requirement Details:*
${message}

(Sent via website quotation form)`;

      const encodedMessage = encodeURIComponent(formattedMessage);
      const whatsappUrl = `https://wa.me/${businessPhone}?text=${encodedMessage}`;

      // Display confirmation
      if (quoteSuccess) {
        quoteSuccess.classList.add('active');
        quoteSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Open WhatsApp after brief moment
      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }, 500);
    });

    // Clear error on input change
    quoteForm.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          input.classList.remove('error');
        }
      });
    });
  }

  /* ==========================================================================
     6. Scroll Reveal Micro-Animations (IntersectionObserver)
     ========================================================================== */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // If reduced motion is preferred or observer not supported, show everything
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('is-revealed');
    });
  }
});
