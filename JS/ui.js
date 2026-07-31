/* ============================================================
   ui.js — page-level behaviour: accent switching, scroll reveal,
   nav highlighting, toast messages.
   ============================================================ */

/* Accent colour switcher. Sets <html data-accent="..."> which
   tokens.css uses to redefine --accent and --accent-soft. */
export function initAccent(){
  const swatches = document.querySelectorAll('.sw');
  swatches.forEach(btn => {
    btn.addEventListener('click', () => {
      swatches.forEach(s => s.setAttribute('aria-pressed','false'));
      btn.setAttribute('aria-pressed','true');
      document.documentElement.dataset.accent = btn.dataset.accent;
    });
  });
}

/* Fade-and-rise elements as they enter the viewport. */
export function initReveal(){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold:.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* Highlight the nav link for whichever section is in view. */
export function initNavSpy(){
  const links = document.querySelectorAll('.navlinks a');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin:'-40% 0px -55% 0px' });
  document.querySelectorAll('section').forEach(s => io.observe(s));
}

/* Slide-up confirmation message. */
export function createToast(){
  const el = document.getElementById('toast');
  let timer;
  return function show(message, ms = 3000){
    if(message) el.textContent = message;
    el.classList.add('on');
    clearTimeout(timer);
    timer = setTimeout(() => el.classList.remove('on'), ms);
  };
}
