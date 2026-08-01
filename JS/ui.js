/* ============================================================
   ui.js — page-level behaviour: accent switching, scroll reveal,
   nav highlighting, toast messages.
   ============================================================ */

/* Accent colour switcher. Sets <html data-accent="..."> which
   tokens.css uses to redefine --accent and --accent-soft. */
export function initAccent(){
  const swatches = document.querySelectorAll('.sw');
  if(!swatches.length) return;

  swatches.forEach(btn => {
    btn.addEventListener('click', () => {
      swatches.forEach(s => s.setAttribute('aria-pressed', String(s === btn)));
      document.documentElement.dataset.accent = btn.dataset.accent;
    });
  });
}

/* Fade-and-rise elements as they enter the viewport.
   The hidden starting state lives behind `html.js` in main.css, so if this
   module never runs the content is simply visible rather than blank. */
export function initReveal(){
  const targets = document.querySelectorAll('.reveal');
  if(!targets.length) return;

  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      entry.target.classList.add('in');
      self.unobserve(entry.target);       /* one-shot: never re-hides */
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
}

/* Highlight the nav link for whichever section is most in view.
   Ratios are kept in a Map because several sections can intersect at once —
   picking the largest is what makes the highlight stable rather than
   depending on the order the observer happens to report entries in. */
export function initNavSpy(){
  const links = document.querySelectorAll('.navlinks a');
  const sections = document.querySelectorAll('main section[id]');
  if(!links.length || !sections.length) return;

  const ratios = new Map();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => ratios.set(entry.target.id, entry.intersectionRatio));

    let bestId = null;
    let bestRatio = 0;
    ratios.forEach((ratio, id) => {
      if(ratio > bestRatio){ bestRatio = ratio; bestId = id; }
    });
    if(!bestId) return;

    links.forEach(link => link.classList.toggle('on', link.hash === '#' + bestId));
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

  sections.forEach(section => observer.observe(section));
}

/* Slide-up confirmation message. Returns a show() function rather than
   exporting the element, so callers can't leave it stuck open. */
export function createToast(){
  const el = document.getElementById('toast');
  if(!el) return () => {};

  let timer;
  return function show(message, duration = 3000){
    if(message) el.textContent = message;
    el.classList.add('on');
    clearTimeout(timer);
    timer = setTimeout(() => el.classList.remove('on'), duration);
  };
}
