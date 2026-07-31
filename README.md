# Example site

Static page. No build step, no backend.

## Files

```
index.html          markup only
css/tokens.css      colours, type, spacing, radii — edit here first
css/main.css        layout and components
js/main.js          entry point, wires the modules together
js/content.js       copy for the modal panels and the gallery grid
js/ui.js            accent switcher, scroll reveal, nav highlight, toast
js/tabs.js          tab switching + meter bars
js/accordion.js     expandable rows
js/gallery.js       card grid + filters
js/modal.js         overlay panel
CNAME               your domain (replace example.com)
.nojekyll           stops GitHub Pages running Jekyll
```

## Local preview

ES modules need a server; opening index.html directly will not work.

```
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Deploy

Push to `main`, then Settings → Pages → Deploy from a branch → `main` / root.
Put your domain in `CNAME`, point DNS at GitHub, tick Enforce HTTPS.

## Common edits

- Colours and spacing: `css/tokens.css`
- Panel and gallery copy: `js/content.js`
- Section headings and body copy: `index.html`
- Make the form send: delete the submit handler at the bottom of `js/main.js`,
  add `action="https://formspree.io/f/YOUR_ID" method="post"` to the form.
