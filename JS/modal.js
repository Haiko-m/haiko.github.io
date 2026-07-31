/* ============================================================
   modal.js — overlay panel.

   Any element with data-modal="<index>" opens it; the index points
   at an entry in the modals array in content.js. Listening on
   document means cards added later still work.
   ============================================================ */

import { modals } from './content.js';

export function initModal(){
  const scrim   = document.getElementById('scrim');
  const kicker  = document.getElementById('mKicker');
  const title   = document.getElementById('mTitle');
  const text    = document.getElementById('mText');
  const tagRow  = document.getElementById('mTags');
  const closeEl = document.getElementById('mClose');
  const band    = document.getElementById('mBand');
  if(!scrim) return;

  let index = 0;
  let lastFocused = null;

  function render(){
    const item = modals[index];

    /* Tint the header band to match the card that opened it. Falling back
       to '' restores the accent gradient defined in main.css. */
    band.style.background = item.shade
      ? `linear-gradient(140deg, ${item.shade}, var(--card))`
      : '';

    kicker.textContent = item.kicker;
    title.textContent = item.title;
    text.textContent = item.text;
    tagRow.replaceChildren(...(item.tags || []).map(t => {
      const span = document.createElement('span');
      span.className = 'pill';
      span.textContent = t;
      return span;
    }));
  }

  function open(i){
    index = Math.max(0, Math.min(i, modals.length - 1));
    render();
    lastFocused = document.activeElement;
    scrim.classList.add('on');
    document.body.style.overflow = 'hidden';   /* stop the page scrolling behind */
    closeEl.focus();
  }

  function close(){
    scrim.classList.remove('on');
    document.body.style.overflow = '';
    lastFocused?.focus();                       /* return focus where it came from */
  }

  function step(delta){
    index = (index + delta + modals.length) % modals.length;
    render();
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal]');
    if(trigger) open(Number(trigger.dataset.modal));
  });

  closeEl.addEventListener('click', close);
  scrim.addEventListener('click', (e) => { if(e.target === scrim) close(); });
  document.getElementById('mPrev').addEventListener('click', () => step(-1));
  document.getElementById('mNext').addEventListener('click', () => step(1));

  document.addEventListener('keydown', (e) => {
    if(!scrim.classList.contains('on')) return;
    if(e.key === 'Escape')     close();
    if(e.key === 'ArrowLeft')  step(-1);
    if(e.key === 'ArrowRight') step(1);
    if(e.key === 'Tab')        trapFocus(e);
  });

  /* Keep Tab cycling inside the dialog while it's open. */
  function trapFocus(e){
    const focusable = scrim.querySelectorAll('button, [href], input, select, textarea');
    if(!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  }
}
