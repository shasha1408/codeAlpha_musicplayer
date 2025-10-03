const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const volume = document.getElementById('volume');
const trackList = document.getElementById('track-list');

const songs = [
  {
    title: "Dreamscape",
    artist: "Luna Waves",
    src: "https://www.jiosaavn.com/song/apna-bana-le/ATIfejZ9bWw"
  },
  {
    title: "Sunset Drive",
    artist: "Neon Sky",
    src: "songs/sunset-drive.mp3"
  },
  {
    title: "Ocean Breeze",
    artist: "Blue Horizon",
    src: "songs/ocean-breeze.mp3"
  }
];

let currentSong = 0;

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  audio.load();
}

function playSong() {
  audio.play();
  playBtn.textContent = '⏸️';
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = '▶️';
}

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

prevBtn.addEventListener('click', () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
});

nextBtn.addEventListener('click', () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
});

audio.addEventListener('timeupdate', () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTime.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Playlist
songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = `${song.title} – ${song.artist}`;
  li.addEventListener('click', () => {
    currentSong = index;
    loadSong(currentSong);
    playSong();
  });
  trackList.appendChild(li);
});

// Autoplay next song
audio.addEventListener('ended', () => {
  nextBtn.click();
});

// Initial load
loadSong(currentSong);
