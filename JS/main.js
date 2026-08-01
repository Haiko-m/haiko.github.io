/* ============================================================
   main.js — entry point. Loaded as a module, so it runs after the DOM
   has parsed; no DOMContentLoaded wrapper is needed.
   ============================================================ */

import { initReveal, initNavSpy, createToast } from './ui.js';
import { initTabs } from './tabs.js';
import { initAccordion } from './accordion.js';
import { initGallery } from './gallery.js';
import { initModal } from './modal.js';

/* The accent switcher is disabled — its markup is commented out in
   index.html. To restore it, uncomment there and add initAccent to the
   import above and the list below. */

[initReveal, initNavSpy, initTabs, initAccordion, initGallery, initModal]
  .forEach(init => init());

/* Contact form.
   To make it send for real: delete this listener, then add
   action="https://formspree.io/f/YOUR_ID" and method="post" to the form.
   The inputs already carry name attributes. */
const showToast = createToast();

document.getElementById('contactForm')?.addEventListener('submit', event => {
  event.preventDefault();
  showToast('Example toast — action received');
});
