# Portfolio — Stiya Theresa Justin

Creative portfolio website (2026). Static HTML/CSS/JS, no build step.

## Run

Open `index.html` in a browser, or serve locally:

```bash
python3 -m http.server 8080
```

## Images

`about-1`, `about-2`, all `ig-*` screenshots and all reel videos/posters come from the originals folder (kept local, git-ignored). `strip-*`, `exp-*`, `work-*`, `podcast-*` and `hero-photo` are still low-res crops (596px source) from the Canva deck's public page previews. Replace any of them with the original file under the same name for a sharper site.

To re-encode reels from new originals (needs ffmpeg):

```bash
ffmpeg -i IN.MP4 -c:v libx264 -preset slow -crf 20 -profile:v high -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart assets/reel-XX-N.mp4
```

| File(s) | Used for |
|---------|----------|
| `hero-photo.png` | Cover photo blob |
| `about-1..3.jpg` | About me collage |
| `strip-1..4.jpg` | Experience image strip |
| `exp-1..4.jpg` | My experience collages |
| `project-01..03.jpg` | Project screenshot clusters |
| `ig-victory-*.jpg`, `ig-ridemagic-*.jpg`, `ig-mithra-*.jpg` | Instagram phone screenshots stacked on each project page |
| `ig-stiya-profile.jpg` | @stiya.t_j profile phone in the contact section |
| `reel-01-1..3.mp4`, `reel-02-1..6.mp4`, `reel-03-1..4.mp4` | Reel videos (hover to play, click for sound). 720×1280 H.264 CRF 20, re-encoded from the originals |
| `reel-*.jpg` | Poster frames for the reel videos |
| `podcast-01..02.jpg` | Podcast thumbnails |
| `work-01..06.jpg` | Works I Did collage |

## Structure

- `index.html` — deck order: cover · content · introduce · about · work experience · stats · my experience · projects · project 01–03 · podcast · works · contact · thank you
- `css/style.css` — design tokens, layout, animations
- `js/main.js` — cursor, tooltips, tilt, reveal, counters, nav, copy-to-clipboard
