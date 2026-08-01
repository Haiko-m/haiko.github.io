/* ============================================================
   tabs.js — tab switching plus the meter bars inside each panel.

   Implements the ARIA tabs pattern: arrow keys move between tabs,
   Home/End jump to the ends, and only the active tab is in the tab
   order (roving tabindex) so Tab moves past the whole group.
   ============================================================ */

/* Replay the bar animation inside `scope`.

   Setting width to 0 and back in the same task would be coalesced into a
   single style change and nothing would animate, so the transition is
   suspended, a reflow is forced to flush the 0 state, then it's restored. */
export function runMeters(scope = document){
  scope.querySelectorAll('.fill').forEach(bar => {
    bar.style.transition = 'none';
    bar.style.width = '0%';
    void bar.offsetWidth;                 /* forced reflow — the flush */
    bar.style.transition = '';
    bar.style.width = `${bar.dataset.level}%`;
  });
}

export function initTabs(){
  const tablist = document.querySelector('.tablist');
  if(!tablist) return;

  const tabs = [...tablist.querySelectorAll('.tab')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  if(!tabs.length || panels.some(panel => !panel)) return;

  function activate(next, { focus = false } = {}){
    tabs.forEach((tab, i) => {
      const selected = i === next;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;   /* roving tabindex */
      panels[i].classList.toggle('on', selected);
      panels[i].hidden = !selected;
    });
    if(focus) tabs[next].focus();
    runMeters(panels[next]);
  }

  tabs.forEach((tab, i) => tab.addEventListener('click', () => activate(i)));

  tablist.addEventListener('keydown', event => {
    const current = tabs.indexOf(document.activeElement);
    if(current === -1) return;

    const moves = {
      ArrowRight: (current + 1) % tabs.length,
      ArrowLeft:  (current - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1
    };
    const next = moves[event.key];
    if(next === undefined) return;

    event.preventDefault();               /* stop Home/End scrolling the page */
    activate(next, { focus: true });
  });

  /* Animate meters the first time a panel scrolls into view. */
  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      runMeters(entry.target);
      self.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  panels.forEach(panel => observer.observe(panel));
}
