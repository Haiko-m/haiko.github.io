/* ============================================================
   main.js — entry point. Loaded as a module, so it runs after the
   DOM has parsed; no DOMContentLoaded wrapper needed.
   ============================================================ */

import { initAccent, initReveal, initNavSpy, createToast } from './ui.js';
import { initTabs } from './tabs.js';
import { initAccordion } from './accordion.js';
import { initGallery } from './gallery.js';
import { initModal } from './modal.js';

// initAccent();   // accent switcher disabled — buttons commented out in index.html
initReveal();
initNavSpy();
initTabs();
initAccordion();
initGallery();
initModal();

/* Contact form.
   To make it send for real, delete this handler, then set
   action="https://formspree.io/f/YOUR_ID" and method="post" on the
   <form>, and give each input a name attribute. */
const showToast = createToast();
document.getElementById('form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  showToast('Example toast — action received');
});

/* Smooth-scroll button in the hero. */
document.getElementById('toFive')?.addEventListener('click', () => {
  document.getElementById('five').scrollIntoView({ behavior:'smooth' });
});

