# Portfolio — Stiya Theresa Justin

Creative portfolio website (2026). Static HTML/CSS/JS, no build step.

## Run

Open `index.html` in a browser, or serve locally:

```bash
python3 -m http.server 8080
```

## Add images

Drop files with these names into `assets/`. Placeholders show until the file exists.

| File | Used for |
|------|----------|
| `assets/hero-photo.png` | Cover photo (hero blob) |
| `assets/project-01.jpg` | Project 01 preview |
| `assets/project-02.jpg` | Project 02 (RideMagic) preview |
| `assets/project-03.jpg` | Project 03 (Mithra Digital) preview |
| `assets/podcast-01.jpg`, `assets/podcast-02.jpg` | Podcast tiles |
| `assets/work-01.jpg` … `assets/work-04.jpg` | Works I Did tiles |

## Structure

- `index.html` — all sections (hero, contents, about, experience, projects, works, contact)
- `css/style.css` — design tokens, layout, animations
- `js/main.js` — cursor, tooltips, tilt, reveal, counters, nav, copy-to-clipboard
