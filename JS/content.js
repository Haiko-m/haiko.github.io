/* ============================================================
   content.js — copy for the modal panels and the gallery grid.

   Everything in square brackets is a prompt telling you what belongs
   there; replace the whole bracket, brackets included.

   `shade` is the single source of truth for an entry's colour: the gallery
   swatch and the modal header band both read it, so a card and the panel it
   opens can never drift apart.

   ============================================================ */

export const modals = [
  {
    kicker:'[Highlight 1]',
    title:'[Full headline — room for more than the card face shows]',
    text:'[The detail behind the highlight: what the situation was, what you did, what changed. Three or four sentences.]',
    tags:['[Tool]','[Tool]','[Tool]'],
    shade:'var(--antacid)'
  },
  {
    kicker:'[Highlight 2]',
    title:'[Full headline]',
    text:'[The detail behind the highlight.]',
    tags:['[Tool]','[Tool]'],
    shade:'var(--petrol-soft)'
  },
  {
    kicker:'[Highlight 3]',
    title:'[Full headline]',
    text:'[The detail behind the highlight.]',
    tags:['[Tool]'],
    shade:'var(--blue-soft)'
  },
  {
    kicker:'[Highlight 4]',
    title:'[Full headline]',
    text:'[The detail behind the highlight.]',
    tags:['[Tool]','[Tool]'],
    shade:'var(--pink)'
  },
  {
    kicker:'[Highlight 5]',
    title:'[Full headline]',
    text:'[The detail behind the highlight.]',
    tags:['[Tool]'],
    shade:'var(--antacid-deep)'
  },
  {
    kicker:'[Highlight 6]',
    title:'[Full headline]',
    text:'[The detail behind the highlight.]',
    tags:['[Tool]','[Tool]','[Tool]'],
    shade:'var(--pink-deep)'
  }
];

/* Gallery cards — projects, certifications, or whatever section 4 holds.

   `group` must match a data-filter value on the chips in index.html.
   `modal` is which entry above the card opens; the swatch colour comes from
   there, so a colour is never written twice. Indices may repeat, and there
   can be more cards than modal entries. */
export const gallery = [
  { name:'[Project name]', group:'a', modal:0 },
  { name:'[Project name]', group:'b', modal:1 },
  { name:'[Project name]', group:'c', modal:2 },
  { name:'[Project name]', group:'a', modal:3 },
  { name:'[Project name]', group:'b', modal:4 },
  { name:'[Project name]', group:'c', modal:5 },
  { name:'[Project name]', group:'a', modal:0 },
  { name:'[Project name]', group:'b', modal:1 }
];

