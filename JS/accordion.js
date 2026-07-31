/* ============================================================
   accordion.js — one row open at a time.
   Height is set in pixels so the open/close can be transitioned.
   ============================================================ */

export function initAccordion(){
  const items = document.querySelectorAll('.acc-item');

  items.forEach(item => {
    const btn = item.querySelector('.acc-btn');
    const body = item.querySelector('.acc-body');
    btn.setAttribute('aria-expanded','false');

    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');

      /* Close everything first. */
      items.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.acc-body').style.maxHeight = null;
        other.querySelector('.acc-btn').setAttribute('aria-expanded','false');
      });

      /* Then reopen this one, unless it was the one already open. */
      if(!wasOpen){
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
        btn.setAttribute('aria-expanded','true');
      }
    });
  });

  /* Keep the open row correctly sized if the window is resized. */
  window.addEventListener('resize', () => {
    const open = document.querySelector('.acc-item.open .acc-body');
    if(open) open.style.maxHeight = open.scrollHeight + 'px';
  });
}
