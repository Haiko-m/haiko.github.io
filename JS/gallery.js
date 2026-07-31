/* ============================================================
   gallery.js — builds the card grid from content.js and filters it.
   Swatch colours come from the modal entry each card opens, so the
   card and its panel always match.
   ============================================================ */

import { gallery, modals } from './content.js';

export function initGallery(){
  const grid = document.getElementById('gal');
  const count = document.getElementById('galCount');
  if(!grid) return;

  gallery.forEach(item => {
    const source = modals[item.modal];

    const card = document.createElement('button');
    card.className = 'gcard';
    card.dataset.group = item.group;
    card.dataset.modal = String(item.modal);

    const swatch = document.createElement('div');
    swatch.className = 'swatch';
    swatch.style.background = source.shade;   /* same value the modal band uses */

    const meta = document.createElement('div');
    meta.className = 'gmeta';

    const name = document.createElement('div');
    name.className = 'gname';
    name.textContent = item.name;

    const sub = document.createElement('div');
    sub.className = 'gsub';
    sub.textContent = 'Example group ' + item.group.toUpperCase();

    meta.append(name, sub);
    card.append(swatch, meta);
    grid.appendChild(card);
  });

  /* Filter chips. */
  const chips = document.querySelectorAll('.fchip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.setAttribute('aria-pressed','false'));
      chip.setAttribute('aria-pressed','true');

      const filter = chip.dataset.filter;
      let shown = 0;
      grid.querySelectorAll('.gcard').forEach(card => {
        const visible = filter === 'all' || card.dataset.group === filter;
        card.classList.toggle('hide', !visible);
        if(visible) shown++;
      });
      count.textContent = shown + ' shown';
    });
  });

  count.textContent = gallery.length + ' shown';
}
