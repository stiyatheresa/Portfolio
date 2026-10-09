# Portfolio — Stiya Theresa Justin

Creative portfolio website (2026). Static HTML/CSS/JS, no build step.

## Run

Open `index.html` in a browser, or serve locally:

```bash
python3 -m http.server 8080
```

## Images

All images in `assets/` are low-res crops (596px source) pulled from the Canva deck's public page previews. Replace any of them with the original file under the same name for a sharper site.

| File(s) | Used for |
|---------|----------|
| `hero-photo.png` | Cover photo blob |
| `about-1..3.jpg` | About me collage |
| `strip-1..4.jpg` | Experience image strip |
| `exp-1..4.jpg` | My experience collages |
| `project-01..03.jpg` | Project screenshot clusters |
| `reel-01-1..3.jpg`, `reel-02-1..4.jpg`, `reel-03-1..4.jpg` | Reels under each project |
| `podcast-01..02.jpg` | Podcast thumbnails |
| `work-01..06.jpg` | Works I Did collage |

## Structure

- `index.html` — deck order: cover · content · introduce · about · work experience · stats · my experience · projects · project 01–03 · podcast · works · contact · thank you
- `css/style.css` — design tokens, layout, animations
- `js/main.js` — cursor, tooltips, tilt, reveal, counters, nav, copy-to-clipboard
