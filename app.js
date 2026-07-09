"use strict";

/* ============================================================
   MOVIE LIST — edit this array to add or rotate movies.
   See README.md for full instructions.

   Each movie needs:
     title  — the name shown on the card
     video  — direct URL to an .mp4 file (H.264/AAC works everywhere)
     poster — URL of a thumbnail image for the card
   ============================================================ */

const MOVIES = [
  {
    title: "My First Optimized Video",
    video: "https://github.com/mohanmarimuthu1/flix/releases/download/v1.0.0/Ae.Dil.Hai.Mushkil.2016.Hindi.HDRip.ESub.mkv",
    poster:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500",
  },
  // Add more movies here, e.g.:
  // {
  //   title: "Beach Trip 2026",
  //   video: "https://example.com/videos/beach-trip.mp4",
  //   poster: "https://example.com/posters/beach-trip.jpg",
  // },
];

/* ============================================================
   Player logic — no edits needed below this line
   ============================================================ */

const grid = document.getElementById("movie-grid");
const emptyMessage = document.getElementById("empty-message");
const overlay = document.getElementById("player-overlay");
const player = document.getElementById("video-player");
const playerTitle = document.getElementById("player-title");
const closeButton = document.getElementById("close-button");

function renderMovies() {
  if (MOVIES.length === 0) {
    emptyMessage.hidden = false;
    return;
  }

  for (const movie of MOVIES) {
    const item = document.createElement("li");

    const card = document.createElement("button");
    card.type = "button";
    card.className = "movie-card";
    card.setAttribute("aria-label", "Play " + movie.title);

    const poster = document.createElement("img");
    poster.className = "movie-poster";
    poster.src = movie.poster;
    poster.alt = "";
    poster.loading = "lazy"; // don't download posters below the fold

    const info = document.createElement("div");
    info.className = "movie-info";

    const icon = document.createElement("span");
    icon.className = "play-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "▶";

    const title = document.createElement("h2");
    title.className = "movie-title";
    title.textContent = movie.title;

    info.append(icon, title);
    card.append(poster, info);
    card.addEventListener("click", () => openMovie(movie));
    item.appendChild(card);
    grid.appendChild(item);
  }
}

function openMovie(movie) {
  playerTitle.textContent = movie.title;
  player.src = movie.video;
  overlay.hidden = false;
  document.body.style.overflow = "hidden"; // stop the page scrolling behind

  const playAttempt = player.play();
  if (playAttempt) {
    // Some browsers block autoplay; the user can just press play.
    playAttempt.catch(() => {});
  }

  closeButton.focus();
}

function closeMovie() {
  player.pause();

  // Fully release the video source so no data keeps buffering
  // in the background after the player is closed.
  player.removeAttribute("src");
  player.load();

  playerTitle.textContent = "";
  overlay.hidden = true;
  document.body.style.overflow = "";
}

closeButton.addEventListener("click", closeMovie);

// Escape key also closes the player (handy on TV/keyboard remotes)
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !overlay.hidden) {
    closeMovie();
  }
});

renderMovies();
