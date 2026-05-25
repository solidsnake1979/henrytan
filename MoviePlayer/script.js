const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const timestamp = document.getElementById("timestamp");
const progress = document.getElementById("progress");

function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
function updateIcon() {
  if (video.paused) {
    play.innerHTML = `<i class="fa fa-play fa-2x>`;
  } else {
    play.innerHTML = `<i class="fa fa-pause fa-2x>`;
  }
}
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

function updateProgress() {
  progress.value=(video.currentTime/video.duration)*100;
  video.currentTime = +progress.value * video.duration / 100;
}
