import playListData from "./constants.js";

const setDetails = (cnt) => {
  audio.src = playListData[cnt].url
  img.src = playListData[cnt].artwork
  title.textContent = playListData[cnt].title
  artist.textContent = playListData[cnt].artist

}

function nextSong(){
  if (counter === (totalSongs - 1)){
    counter = 0;
  }
  else {
    counter += 1
  }

  setDetails(counter)
}

function prevSong(){
  if (counter === 0) {
    counter = totalSongs - 1
  }
  else {
    counter -= 1
  }
  
  setDetails(counter)
}

let counter = 0;
const totalSongs = playListData.length
let play = false
let interval;

const audio = document.querySelector("audio")
const img = document.querySelector("img")
const info = document.querySelector(".info")
const title = document.querySelector(".title")
const artist = document.querySelector(".artist")
const playBtn = document.querySelector("#play")
const prevBtn = document.querySelector("#prev")
const nextBtn = document.querySelector("#next")
const progressBar = document.querySelector(".progress")
const startedTime = document.querySelector(".started-time")
const totalTime = document.querySelector(".total-time")

function updateTime() {
  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60);
  startedTime.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

setDetails(counter)
audio.volume = 0.2;

audio.addEventListener("timeupdate", (e) => {
  let progress = `${(audio.currentTime / audio.duration) * 100}%`
  progressBar.style.width = progress;
})

audio.addEventListener("ended", (e) => {
  nextSong()
})

playBtn.addEventListener("click", () => {

  setTotalTime()

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
})

prevBtn.addEventListener("click", (e) => prevSong())
nextBtn.addEventListener("click", (e) => nextSong())

function setTotalTime(){
  const minutes = Math.floor(audio.duration / 60);
  const seconds = Math.floor(audio.duration % 60);
  totalTime.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`; 
}