const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistUI = document.getElementById("playlist");

let songIndex = 0;

const songs = [
{
title:"Dooron Dooron",
artist:"Paresh Pahuja",
src:"songs/Dooron Dooron Unplugged Paresh Pahuja 128 Kbps.mp3"
},
{
title:"Gehra Hua",
artist:"Arijit Singh",
src:"songs/Gehra Hua Dhurandhar 128 Kbps.mp3"
},
{
title:"Ehsaan Tera Hoga",
artist:"Sanam Puri",
src:"songs/Ehsan Tera Hoga Mujh Par [128] Kbps-(SongsPk.com.se).mp3"
}
];

function loadSong(index){

const song = songs[index];

title.textContent = song.title;
artist.textContent = song.artist;

audio.src = song.src;
}

function playPause(){

if(audio.paused){
audio.play();
}
else{
audio.pause();
}

}

function nextSong(){

songIndex++;

if(songIndex >= songs.length){
songIndex = 0;
}

loadSong(songIndex);
audio.play();
}

function prevSong(){

songIndex--;

if(songIndex < 0){
songIndex = songs.length - 1;
}

loadSong(songIndex);
audio.play();
}

audio.addEventListener("timeupdate", () => {

const percent = (audio.currentTime / audio.duration) * 100;
progress.value = percent;

let minutes = Math.floor(audio.currentTime / 60);
let seconds = Math.floor(audio.currentTime % 60);

if(seconds < 10){
seconds = "0" + seconds;
}

duration.textContent = minutes + ":" + seconds;

});

progress.addEventListener("input", () => {

audio.currentTime = (progress.value / 100) * audio.duration;

});

volume.addEventListener("input", () => {

audio.volume = volume.value;

});

audio.addEventListener("ended", nextSong);

function createPlaylist(){

songs.forEach((song,index)=>{

const li = document.createElement("li");

li.textContent = song.title + " - " + song.artist;

li.addEventListener("click",()=>{

songIndex = index;

loadSong(songIndex);

audio.play();

});

playlistUI.appendChild(li);

});

}

loadSong(songIndex);
createPlaylist();