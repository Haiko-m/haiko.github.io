/* ============================================================
   gallery.js — builds the card grid from content.js and filters it.

   Swatch colours are read from the modal entry each card opens, so a card
   and the panel it opens can never drift apart.
   ============================================================ */

import { gallery, modals } from './content.js';

/* Wording for the generated card subtitles and the counter chip. */
const GROUP_LABEL = '[Project type]';
const SHOWN_LABEL = 'shown';

/* Cards live inside a <button>, whose content model is phrasing-only —
   hence spans rather than divs. main.css gives them display:block. */
function buildCard({ name, group, modal }){
  const source = modals[modal];
  if(!source) return null;

  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'gcard';
  card.dataset.group = group;
  card.dataset.modal = String(modal);

  const swatch = document.createElement('span');
  swatch.className = 'swatch';
  swatch.style.background = source.shade;

  const meta = document.createElement('span');
  meta.className = 'gmeta';

  const title = document.createElement('span');
  title.className = 'gname';
  title.textContent = name;

  const sub = document.createElement('span');
  sub.className = 'gsub';
  sub.textContent = `${GROUP_LABEL} ${group.toUpperCase()}`;

  meta.append(title, sub);
  card.append(swatch, meta);
  return card;
}

export function initGallery(){
  const grid = document.getElementById('gal');
  const count = document.getElementById('galCount');
  if(!grid || !count) return;

  /* Build off-document, then attach once — one reflow instead of one per card. */
  const fragment = document.createDocumentFragment();
  gallery.forEach(entry => {
    const card = buildCard(entry);
    if(card) fragment.append(card);
  });
  grid.append(fragment);

  const cards = [...grid.querySelectorAll('.gcard')];
  const chips = [...document.querySelectorAll('.fchip')];

  let activeFilter = 'all';

  function applyFilter(filter){
    activeFilter = filter;
    let shown = 0;
    cards.forEach(card => {
      const visible = filter === 'all' || card.dataset.group === filter;
      card.classList.toggle('hide', !visible);
      card.hidden = !visible;              /* hides it from assistive tech too */
      if(visible) shown++;
    });
    count.textContent = `${shown} ${SHOWN_LABEL}`;
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(other => other.setAttribute('aria-pressed', String(other === chip)));
      applyFilter(chip.dataset.filter);
    });
  });

  applyFilter(activeFilter);               /* seeds the count from the data */
}
