# Yang Zhang — Personal Website

Static academic homepage for GitHub Pages, laid out like a single-column
CSE-style page: name and profile links on top, photo and bio, current
research interests, publications with figure thumbnails, and service.
All content is data-driven.

## Files

- `index.html` — page skeleton (sections only; no content)
- `data/profile.js` — **all content**: name, links, bio, interests, publications, service
- `script.js` — renders `data/profile.js` into the page (TL;DR / citation panels, figure viewer)
- `styles.css` — styling
- `assets/profile.jpg` — square portrait (hidden automatically if absent)
- `assets/pubs/` — one figure thumbnail per publication (about 1200 px wide)
- `Yang_Zhang_CV.pdf` — CV linked from the header (built from `cv/`)
- `cv/Yang_Zhang_CV.tex` — CV source; `cv/build.sh` compiles it and copies the PDF to the root

## Updating content

Edit `data/profile.js`:

- `basics` — email, Scholar / LinkedIn / GitHub / CV links (`null` hides a link)
- `bio` — array of paragraphs (HTML allowed)
- `interests` — array of HTML bullets; write `[[id]]` or `[[id1,id2]]` to cite
  publications by their `id` (rendered as numbered links)
- `publications` — `{ id, title, authors, venue, award, thumb, tldr, paper, website, code, talk, citation }`;
  wrap your own name in `<strong>`; `null` fields are skipped; entries are numbered in order
- `service` — `{ role, venue, when }` entries
- `footer.updated` — the "Last updated" line

To add a thumbnail, crop the paper's key figure to roughly 1200 px wide, save it
under `assets/pubs/`, and point `thumb.src` at it (set `width`/`height` to its pixel size).

## Building the CV

```bash
./cv/build.sh
```

Uses `pdflatex` if installed, otherwise `tectonic` (`brew install tectonic`).
The `.sty` files in `cv/` are vendored from CTAN so the CV compiles on a
minimal TeX install.

## Deploy to GitHub Pages

1. Push to GitHub.
2. `Settings > Pages` → `Deploy from a branch` → `main` / `/ (root)`.
3. The site appears at `https://<username>.github.io/<repo>/`.
