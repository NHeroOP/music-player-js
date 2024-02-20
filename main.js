import playlists from "./constants.js";

let playListData = playlists["english"];


const audio = document.querySelector("audio")
const img = document.querySelector("img")
const title = document.querySelector(".title")
const artist = document.querySelector(".artist")
const playBtn = document.querySelector("#play")
const prevBtn = document.querySelector("#prev")
const nextBtn = document.querySelector("#next")
const progressBar = document.querySelector(".progress-bar")
const progress = document.querySelector(".progress")
const startedTime = document.querySelector(".started-time")
const totalTime = document.querySelector(".total-time")
const eng = document.querySelector(".english")
const hindi = document.querySelector(".hindi")

eng.addEventListener("click", (e) => {
  playListData = playlists["english"]

  counter = 0
  setDetails(counter)
  totalSongs = playListData.length

  eng.style.backgroundColor = "#6f7683"
  hindi.style.backgroundColor = "initial"
})
hindi.addEventListener("click", (e) => {
  playListData = playlists["hindi"]

  counter = 0
  setDetails(counter)
  totalSongs = playListData.length

  hindi.style.backgroundColor = "#6f7683"
  eng.style.backgroundColor = "initial"
})


let counter = 0;
let totalSongs = playListData.length
let play = false
let interval;
eng.style.backgroundColor = "#6f7683"


progressBar.addEventListener("click", function(e) {
  if(!play) {
    return;
  }

  const width = this.clientWidth;
  const clickX = e.offsetX
  const duration = audio.duration 

  audio.currentTime = (clickX / width) * duration;
})

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

  progress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
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
