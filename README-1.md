# Example site

Static page. No build step, no backend, no dependencies beyond Google Fonts.

## Files

```
index.html          markup and all visible copy
css/tokens.css      colours, type, spacing, radii — edit here first
css/main.css        layout and components
js/main.js          entry point, wires the modules together
js/content.js       copy + colours for the modal panels and gallery grid
js/ui.js            accent switcher, scroll reveal, nav highlight, toast
js/tabs.js          tab switching + meter bars
js/accordion.js     expandable rows
js/gallery.js       card grid + filters
js/modal.js         overlay panel
CNAME               your domain (replace example.com)
.nojekyll           stops GitHub Pages running Jekyll
```

Folder names are lowercase. GitHub Pages is case-sensitive, so if your
repo has `JS/` or `CSS/`, either rename them or match the case in the
three `<link>` / `<script>` lines in index.html.

## Where to edit text

- Headings, hero, bento cards, tabs, accordion, form, footer -> `index.html`
- Modal panels and gallery card names -> `js/content.js`

`shade` on a modal entry sets its colour once; the gallery swatch and the
modal header band both read it, so a card always matches the panel it opens.

## Currently disabled (commented, not deleted)

- Accent switcher: markup in `index.html`, `initAccent()` call in `js/main.js`
- Brand mark and wordmark: markup in `index.html`

All related CSS and the `initAccent` function are untouched. Re-enable by
removing the comment markers.

## Local preview

ES modules need a server; opening index.html directly will not work.

```
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Deploy

Push to `main`, then Settings -> Pages -> Deploy from a branch -> `main` / root.
Put your domain in `CNAME`, point DNS at GitHub, tick Enforce HTTPS.
Hard-reload with Ctrl+Shift+R after a deploy.

## Making the form send

Delete the submit handler at the bottom of `js/main.js`, then add
`action="https://formspree.io/f/YOUR_ID" method="post"` to the `<form>`.
Inputs already have `name` attributes.
