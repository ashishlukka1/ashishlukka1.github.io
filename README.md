# Ashish Lukka — Portfolio

A plain, text-first portfolio. No build step — just static HTML, CSS, and a little JavaScript.

**Live:** https://ashishlukka1.github.io/

## Structure

```
index.html    page markup (sidebar, about, experience, projects, contact, galleries, modal)
styles.css    white theme + modal + responsive styles
script.js     gallery modal, scroll-spy nav, show more/less, copy-email toast
assets/       project screenshots and resume
```

Projects with screenshots open a modal showing the project name, its GitHub repo, and the full
captioned screenshot set. Projects without screenshots link straight to GitHub.

## Run locally

Any static server works, for example:

```bash
npx serve .
# or
python -m http.server
```

Then open http://localhost:3000 (or the port shown).

## Deploy

The site is plain static files, so the repo root can be served directly. A GitHub Actions workflow
(`.github/workflows/deploy.yml`) also publishes the repo root to the `gh-pages` branch on every push
to `main`.

In **Settings → Pages → Build and deployment**, set **Source** to **Deploy from a branch** with
branch **`gh-pages`** / **`/ (root)`**. (If it is instead set to **`main`** / **`/ (root)`**, that
works too — no build needed.)
