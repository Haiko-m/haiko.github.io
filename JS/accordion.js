/* ============================================================
   accordion.js — one row open at a time.

   The open/close animation is pure CSS (grid-template-rows 0fr -> 1fr),
   so there is no height measurement here and nothing to recalculate on
   resize or when a late-loading font reflows the text.
   ============================================================ */

export function initAccordion(){
  const items = [...document.querySelectorAll('.acc-item')];
  if(!items.length) return;

  const rows = items.map(item => ({
    item,
    button: item.querySelector('.acc-btn')
  })).filter(row => row.button);

  rows.forEach(({ item, button }) => {
    button.setAttribute('aria-expanded', 'false');

    button.addEventListener('click', () => {
      const willOpen = !item.classList.contains('open');

      /* Only the row that is actually open needs closing. */
      const openRow = rows.find(row => row.item.classList.contains('open'));
      if(openRow){
        openRow.item.classList.remove('open');
        openRow.button.setAttribute('aria-expanded', 'false');
      }

      if(willOpen){
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
