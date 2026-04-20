const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const muteBtn = document.getElementById("muteBtn");
const speedBtn = document.getElementById("speedBtn");
const loopBtn = document.getElementById("loopBtn");
const backBtn = document.getElementById("backBtn");
const forwardBtn = document.getElementById("forwardBtn");
const volume = document.getElementById("volume");
const currentTimeText = document.getElementById("currentTime");
const durationText = document.getElementById("duration");
const progress = document.getElementById("progress");
const statusText = document.getElementById("status");

let speeds = [1, 1.25, 1.5, 2];
let index = 0;

function formatTime(time) {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  if (sec < 10) sec = "0" + sec;
  return min + ":" + sec;
}

playBtn.onclick = () => {
  audio.play();
  statusText.textContent = "Now Playing";
};

pauseBtn.onclick = () => {
  audio.pause();
  statusText.textContent = "Paused";
};

muteBtn.onclick = () => {
  audio.muted = !audio.muted;
  muteBtn.textContent = audio.muted ? "Unmute" : "Mute";
  statusText.textContent = audio.muted ? "Muted" : audio.paused ? "Paused" : "Now Playing";
};

volume.oninput = () => {
  audio.volume = volume.value;
  if (audio.volume == 0) {
    statusText.textContent = "Volume at 0";
  } else if (!audio.paused) {
    statusText.textContent = "Now Playing";
  }
};

backBtn.onclick = () => {
  audio.currentTime = Math.max(0, audio.currentTime - 5);
};

forwardBtn.onclick = () => {
  audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 5);
};

speedBtn.onclick = () => {
  index = (index + 1) % speeds.length;
  audio.playbackRate = speeds[index];
  speedBtn.textContent = speeds[index] + "x";
  statusText.textContent = "Speed: " + speeds[index] + "x";
};

loopBtn.onclick = () => {
  audio.loop = !audio.loop;
  loopBtn.textContent = audio.loop ? "Loop On" : "Loop Off";
  statusText.textContent = audio.loop ? "Loop Enabled" : "Loop Disabled";
};

audio.onloadedmetadata = () => {
  durationText.textContent = formatTime(audio.duration);
};

audio.ontimeupdate = () => {
  currentTimeText.textContent = formatTime(audio.currentTime);
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
};

progress.oninput = () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
};

audio.onended = () => {
  statusText.textContent = "Playback Finished";
};

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    if (audio.paused) {
      audio.play();
      statusText.textContent = "Now Playing";
    } else {
      audio.pause();
      statusText.textContent = "Paused";
    }
  }

  if (event.key.toLowerCase() === "m") {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "Unmute" : "Mute";
    statusText.textContent = audio.muted ? "Muted" : audio.paused ? "Paused" : "Now Playing";
  }

  if (event.key.toLowerCase() === "l") {
    audio.loop = !audio.loop;
    loopBtn.textContent = audio.loop ? "Loop On" : "Loop Off";
    statusText.textContent = audio.loop ? "Loop Enabled" : "Loop Disabled";
  }

  if (event.key === "ArrowLeft") {
    audio.currentTime = Math.max(0, audio.currentTime - 5);
  }

  if (event.key === "ArrowRight") {
    audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 5);
  }
});