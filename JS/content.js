/* ============================================================
   content.js — edit copy here, not in the markup.

   `shade` on each modal entry is the single source of truth for that
   entry's colour: the gallery swatch and the modal's header band both
   read it, so a card and the panel it opens always match.

   This is a JS module rather than a .json file on purpose: modules
   load fine from file:// during local preview, whereas fetch('content.json')
   is blocked by CORS unless you run a local server.
   ============================================================ */

export const modals = [
  { kicker:'Example 1.1', title:'Example title one',
    text:'Example text. This panel opens on top of the page and can hold longer placeholder content.',
    tags:['Example','Example','Example'], shade:'var(--antacid)' },

  { kicker:'Example 1.2', title:'Example title two',
    text:'Example text for the second panel.',
    tags:['Example','Example'], shade:'var(--petrol-soft)' },

  { kicker:'Example 1.3', title:'Example title three',
    text:'Example text for the third panel.',
    tags:['Example'], shade:'var(--blue-soft)' },

  { kicker:'Example 1.4', title:'Example title four',
    text:'Example text for the fourth panel.',
    tags:['Example','Example'], shade:'var(--pink)' },

  { kicker:'Example 1.5', title:'Example title five',
    text:'Example text for the fifth panel.',
    tags:['Example'], shade:'var(--antacid-deep)' },

  { kicker:'Example 1.6', title:'Example title six',
    text:'Example text for the sixth panel.',
    tags:['Example','Example','Example'], shade:'var(--pink-deep)' }
];

/* Gallery cards. `modal` is which entry above the card opens — the
   swatch colour is taken from there, so you never set a colour twice.
   More cards than modal entries is fine; indices may repeat. */
export const gallery = [
  { name:'Example 1', group:'a', modal:0 },
  { name:'Example 2', group:'b', modal:1 },
  { name:'Example 3', group:'c', modal:2 },
  { name:'Example 4', group:'a', modal:3 },
  { name:'Example 5', group:'b', modal:4 },
  { name:'Example 6', group:'c', modal:5 },
  { name:'Example 7', group:'a', modal:0 },
  { name:'Example 8', group:'b', modal:1 }
];