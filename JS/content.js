/* ============================================================
   content.js — edit copy here, not in the markup.

   This is a JS module rather than a .json file on purpose: modules
   load fine from file:// during local preview, whereas fetch('content.json')
   is blocked by CORS unless you run a local server. The shape is plain
   JSON, so it converts trivially if you later add a build step.
   ============================================================ */

export const modals = [
  { kicker:'Example 1.1', title:'Example title one',
    text:'Example text. This panel opens on top of the page and can hold longer placeholder content.',
    tags:['Example','Example','Example'] },
  { kicker:'Example 1.2', title:'Example title two',
    text:'Example text for the second panel.', tags:['Example','Example'] },
  { kicker:'Example 1.3', title:'Example title three',
    text:'Example text for the third panel.', tags:['Example'] },
  { kicker:'Example 1.4', title:'Example title four',
    text:'Example text for the fourth panel.', tags:['Example','Example'] },
  { kicker:'Example 1.5', title:'Example title five',
    text:'Example text for the fifth panel.', tags:['Example'] },
  { kicker:'Example 1.6', title:'Example title six',
    text:'Example text for the sixth panel.', tags:['Example','Example','Example'] }
];

export const gallery = [
  { name:'Example 1', group:'a', shade:'var(--antacid)' },
  { name:'Example 2', group:'b', shade:'var(--pink)' },
  { name:'Example 3', group:'c', shade:'var(--petrol-soft)' },
  { name:'Example 4', group:'a', shade:'var(--blue-soft)' },
  { name:'Example 5', group:'b', shade:'var(--antacid-deep)' },
  { name:'Example 6', group:'c', shade:'var(--pink-deep)' },
  { name:'Example 7', group:'a', shade:'var(--petrol)' },
  { name:'Example 8', group:'b', shade:'var(--blue)' }
];
