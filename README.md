# Yang Zhang — Personal Website

Static academic homepage for GitHub Pages. The layout is a single column
(header, bio, news, publications); all content is data-driven.

## Files

- `index.html` — page skeleton (sections only; no content)
- `data/profile.js` — **all content**: name, links, bio, news, publications
- `script.js` — renders `data/profile.js` into the page
- `styles.css` — styling
- `Yang_Zhang_CV.pdf` — CV linked from the header (built from `cv/`)
- `cv/Yang_Zhang_CV.tex` — CV source; `cv/build.sh` compiles it and copies the PDF to the root
- `assets/` — put a square `profile.jpg` here to show a portrait (hidden automatically if absent)

## Updating content

Edit `data/profile.js`:

- `basics` — email, Scholar / LinkedIn / GitHub / CV links (`null` hides a link)
- `bio` — array of paragraphs (HTML allowed)
- `news` — `{ date, text }` entries, newest first
- `publications` — `{ title, authors, venue, status, tldr, paper, website, code, citation }`;
  wrap your own name in `<strong>`; `status` is shown as "(under review)" etc.; `null` fields are skipped

## Building the CV

```bash
./cv/build.sh
```

Requires `pdflatex`. The `.sty` files in `cv/` are vendored from CTAN so the
CV compiles on a minimal TeX install.

## Deploy to GitHub Pages

1. Push to GitHub.
2. `Settings > Pages` → `Deploy from a branch` → `main` / `/ (root)`.
3. The site appears at `https://<username>.github.io/<repo>/`.
