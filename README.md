# Yang Zhang — Personal Website

Static academic homepage for GitHub Pages with a two-column layout: a sticky
left sidebar (photo, name, contact links) and a content column with about,
education, current research interests, publications with figure thumbnails,
honors, and service. All content is data-driven.

## Files

- `index.html` — page skeleton (sections only; no content)
- `data/profile.js` — **all content**: name, links, bio, education, interests, publications, honors, service
- `script.js` — renders `data/profile.js` into the page (TL;DR / citation panels, figure viewer)
- `styles.css` — styling
- `assets/profile.jpg` — square portrait (hidden automatically if absent)
- `assets/pubs/` — one figure thumbnail per publication (about 1200 px wide)
- `Yang_Zhang_CV.pdf` — CV linked from the header, built from `cv/Yang_Zhang_CV.tex`
- `cv/Yang_Zhang_CV.tex` — CV source; the built PDF stays in `cv/` until published

## Updating content

Edit `data/profile.js`:

- `basics` — tagline, location, email, Scholar / LinkedIn / GitHub / CV links (`null` hides a link)
- `bio` — array of paragraphs (HTML allowed)
- `education` — `{ degree, school, note, when }` entries
- `interests` — array of HTML bullets; write `[[id]]` or `[[id1,id2]]` to cite
  publications by their `id` (rendered as numbered links)
- `publications` — `{ id, title, authors, venue, award, thumb, tldr, paper, website, code, talk, citation }`;
  wrap your own name in `<strong>`; `null` fields are skipped; entries are numbered in order
- `honors` — `{ text, note, when }` entries
- `service` — `{ role, venue, when }` entries
- `footer.updated` — the "Last updated" line

After changing `data/profile.js` or `script.js`, bump the `?v=` date on the two
`<script src>` tags in `index.html`; otherwise browsers keep the cached copy for a while.

To add a thumbnail, crop the paper's key figure to roughly 1200 px wide, save it
under `assets/pubs/`, and point `thumb.src` at it (set `width`/`height` to its pixel size).

## Building the CV

```bash
./cv/build.sh --publish   # builds cv/Yang_Zhang_CV.pdf and copies it to Yang_Zhang_CV.pdf
```

Built PDFs are written next to the source (gitignored); only the published copy at the root is tracked.
Uses `pdflatex` if installed, otherwise `tectonic` (`brew install tectonic`).
The `.sty` files in `cv/` are vendored from CTAN so the CV compiles on a
minimal TeX install.

## Deploy to GitHub Pages

1. Push to GitHub.
2. `Settings > Pages` → `Deploy from a branch` → `main` / `/ (root)`.
3. The site appears at `https://<username>.github.io/<repo>/`.
