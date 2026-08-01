/* ============================================================
   modal.js — overlay panel.

   Any element carrying data-modal="<index>" opens it; the index points at
   an entry in `modals` in content.js. The click listener sits on document
   so cards rendered later (the gallery) work without re-binding.
   ============================================================ */

import { modals } from './content.js';

/* Elements that can hold focus, minus any that are currently unavailable. */
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function initModal(){
  const scrim = document.getElementById('scrim');
  if(!scrim || !modals.length) return;

  const el = {
    band:   document.getElementById('mBand'),
    kicker: document.getElementById('mKicker'),
    title:  document.getElementById('mTitle'),
    text:   document.getElementById('mText'),
    tags:   document.getElementById('mTags'),
    close:  document.getElementById('mClose'),
    prev:   document.getElementById('mPrev'),
    next:   document.getElementById('mNext')
  };
  if(Object.values(el).some(node => !node)) return;

  let index = 0;
  let lastFocused = null;

  const isOpen = () => scrim.classList.contains('on');

  function render(){
    const item = modals[index];

    /* Tint the header band to match the card that opened it.
       Clearing the property restores the gradient defined in main.css. */
    el.band.style.background = item.shade
      ? `linear-gradient(140deg, ${item.shade}, var(--card))`
      : '';

    el.kicker.textContent = item.kicker;
    el.title.textContent = item.title;
    el.text.textContent = item.text;

    el.tags.replaceChildren(...(item.tags ?? []).map(label => {
      const pill = document.createElement('span');
      pill.className = 'pill';
      pill.textContent = label;
      return pill;
    }));
  }

  function open(next){
    if(!Number.isInteger(next) || next < 0 || next >= modals.length) return;

    index = next;
    render();
    lastFocused = document.activeElement;
    scrim.classList.add('on');
    document.documentElement.classList.add('is-locked');   /* see main.css */
    el.close.focus();
  }

  function close(){
    if(!isOpen()) return;
    scrim.classList.remove('on');
    document.documentElement.classList.remove('is-locked');
    lastFocused?.focus();                                  /* hand focus back */
  }

  function step(delta){
    index = (index + delta + modals.length) % modals.length;
    render();
  }

  /* Keep Tab cycling inside the dialog while it is open. */
  function trapFocus(event){
    const focusable = [...scrim.querySelectorAll(FOCUSABLE)];
    if(!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const target = event.shiftKey
      ? (document.activeElement === first ? last : null)
      : (document.activeElement === last ? first : null);

    if(target){
      event.preventDefault();
      target.focus();
    }
  }

  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-modal]');
    if(trigger) open(Number(trigger.dataset.modal));
  });

  el.close.addEventListener('click', close);
  el.prev.addEventListener('click', () => step(-1));
  el.next.addEventListener('click', () => step(1));
  scrim.addEventListener('click', event => {
    if(event.target === scrim) close();                    /* backdrop only */
  });

  document.addEventListener('keydown', event => {
    if(!isOpen()) return;

    switch(event.key){
      case 'Escape':     close();     break;
      case 'ArrowLeft':  step(-1);    break;
      case 'ArrowRight': step(1);     break;
      case 'Tab':        trapFocus(event); break;
    }
  });
}
