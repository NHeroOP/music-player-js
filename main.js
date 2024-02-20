import playListData from "./constants.js";


const audio = document.querySelector("audio")
const img = document.querySelector("img")
const title = document.querySelector(".title")
const artist = document.querySelector(".artist")
const playBtn = document.querySelector("#play")
const prevBtn = document.querySelector("#prev")
const nextBtn = document.querySelector("#next")
const progressBar = document.querySelector(".progress")
const startedTime = document.querySelector(".started-time")
const totalTime = document.querySelector(".total-time")

let counter = 0;
const totalSongs = playListData.length
let play = false
let interval;

setDetails(counter)
function setDetails (cnt) {
  audio.src = playListData[cnt].url
  img.src = playListData[cnt].artwork
  title.textContent = playListData[cnt].title
  artist.textContent = playListData[cnt].artist

  updateTotalTime()
}

function updateTotalTime() {
  if (!audio.duration) {
    totalTime.textContent = "N/A";
    return;
  }

  const minutes = Math.floor(audio.duration / 60);
  const seconds = Math.floor(audio.duration % 60);
  totalTime.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function updateTime() {
  if (!play) {
    return;
  }

  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60);
  startedTime.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const progress = `${(audio.currentTime / audio.duration) * 100}%`;
  progressBar.style.width = progress;

  requestAnimationFrame(updateTime);
}

function playPause(){
  if (play) {
    audio.pause()

    clearInterval(interval)
    play = false
    
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
  }
  else {
    audio.play()

    interval = setInterval(updateTime, 1000)
    play = true

    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
  }
}

function nextSong(){
  if (counter === (totalSongs - 1)){
    counter = 0;
  }
  else {
    counter += 1
  }

  setDetails(counter)
  play = false
  playPause()
}

function prevSong(){
  if (counter === 0) {
    counter = totalSongs - 1
  }
  else {
    counter -= 1
  }
  
  setDetails(counter)
  play = false
  playPause()
}


audio.addEventListener("loadedmetadata", updateTotalTime);
audio.addEventListener("ended", nextSong);
audio.volume = 0.2;

playBtn.addEventListener("click", (e) => {
  playPause()
})

prevBtn.addEventListener("click", (e) => prevSong())
nextBtn.addEventListener("click", (e) => nextSong())
