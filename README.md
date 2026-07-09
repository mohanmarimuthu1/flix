# Home Movie Player

A tiny, framework-free static website for watching your own videos on any
device — phone, tablet, computer, or smart TV browser. No login, no build
step, no dependencies. Just three files.

## Files

| File         | What it does                                            |
| ------------ | ------------------------------------------------------- |
| `index.html` | Page structure (grid of movie cards + full-screen player) |
| `styles.css` | Dark theme, large text, responsive layout               |
| `app.js`     | The movie list and the player open/close logic          |

## How to add or rotate movies

Open **`app.js`** and find the `MOVIES` array at the very top of the file:

```js
const MOVIES = [
  {
    title: "My First Optimized Video",
    video: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500",
  },
];
```

To **add a movie**, copy one of the `{ ... },` blocks and paste it below,
then change the three values:

- `title` — the name shown on the card.
- `video` — a direct link to the video file itself (the URL should end in
  `.mp4`). Hosting options: GitHub Releases, any object storage bucket
  (S3, R2, Backblaze B2), or the same folder as the site itself
  (e.g. `video: "movies/beach-trip.mp4"`).
- `poster` — a link to a thumbnail image (JPG/PNG/WebP). A small image
  around 500px wide is plenty and keeps data usage low.

To **remove a movie**, delete its entire `{ ... },` block.

The **order of the array is the order on the page**, so put the newest
movie at the top.

Save the file and redeploy (see below) — that's the whole process.

> **Only host videos you own or have the rights to distribute** — home
> videos, your own recordings, or openly licensed films. Publicly hosting
> copyrighted movies is illegal even on an obscure, unlisted page.

## Video format: use MP4 (important!)

Browsers only reliably play **MP4 files with H.264 video and AAC audio**.
MKV, AVI, and HEVC files will fail on Safari, iPhones, and most smart TVs.

If you have a video in another format, convert it once with
[ffmpeg](https://ffmpeg.org/) (free):

```
ffmpeg -i input.mkv -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart output.mp4
```

- `-crf 23` — good quality/size balance. Use `-crf 26` for smaller files
  if data usage matters more than sharpness.
- `-movflags +faststart` — lets the video start playing before it has
  fully downloaded. Don't skip this one.

## Deploying

The site is 100% static, so any static host works:

- **Netlify**: drag the project folder onto https://app.netlify.com/drop
- **GitHub Pages**: push the files to a repo, enable Pages in Settings.

After changing `app.js`, just redeploy the same way. Your parents don't
need to do anything — the next time they open the page, the new list is
there.

## Data-saving notes (already built in)

- The video player uses `preload="metadata"`, so nothing downloads until
  a movie is actually opened.
- Closing a movie **fully clears the video source**, so no data keeps
  buffering in the background.
- Posters lazy-load; no fonts, frameworks, or libraries are downloaded.
