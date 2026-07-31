/* ============================================================
   tabs.js — tab switching plus the meter bars inside each panel.
   Meters replay every time their panel becomes visible.
   ============================================================ */

/* Reset each bar to 0 then animate to its data-level on the next frame. */
export function runMeters(scope = document){
  scope.querySelectorAll('.fill').forEach(bar => {
    bar.style.width = '0%';
    requestAnimationFrame(() => { bar.style.width = bar.dataset.level + '%'; });
  });
}

export function initTabs(){
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tabpanel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.setAttribute('aria-selected','false'));
      tab.setAttribute('aria-selected','true');

      panels.forEach(p => p.classList.remove('on'));
      const panel = document.querySelector(`.tabpanel[data-panel="${tab.dataset.tab}"]`);
      panel.classList.add('on');
      runMeters(panel);
    });
  });

  /* Left/right arrow keys move between tabs when one has focus. */
  document.querySelector('.tablist')?.addEventListener('keydown', (e) => {
    if(e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const list = [...tabs];
    const i = list.indexOf(document.activeElement);
    if(i === -1) return;
    const next = e.key === 'ArrowRight'
      ? (i + 1) % list.length
      : (i - 1 + list.length) % list.length;
    list[next].focus();
    list[next].click();
  });

  /* Animate meters the first time a panel scrolls into view. */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){ runMeters(e.target); io.unobserve(e.target); }
    });
  }, { threshold:.3 });
  panels.forEach(p => io.observe(p));
}
