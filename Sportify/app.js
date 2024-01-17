const music = new Audio("song1.mp3"); //Audio() is web api which will retrun html audio element.

const songs = [
  {
    id: "1",
    songName: ` On My Way <br>
        <div class="subtitle">Alan Walker</div>`,
    poster: "img/1.jpeg",
    song: "songs/1.mp3",
  },
  {
    id: "2",
    songName: ` Alan Walker-Fade <br>
        <div class="subtitle">Alan Walker</div>`,
    poster: "img/2.jpeg",
    song: "songs/2.mp3",
  },
  {
    id: "3",
    songName: `Cartoon - On & On <br><div class="subtitle"> Daniel Levi</div>`,
    poster: "img/3.jpeg",
  },
  {
    id: "4",
    songName: `Warriyo - Mortals <br><div class="subtitle">Mortals</div>`,
    poster: "img/4.jpeg",
  },
  {
    id: "5",
    songName: `Ertugrul Gazi <br><div class="subtitle">Ertugrul</div>`,
    poster: "img/5.jpeg",
  },
  {
    id: "6",
    songName: `Electronic Music <br><div class="subtitle">Electro</div>`,
    poster: "img/6.jpeg",
  },
  {
    id: "7",
    songName: `Agar Tum Sath Ho <br><div class="subtitle">Tamashaa</div>`,
    poster: "img/7.jpeg",
  },
  {
    id: "8",
    songName: `Suna Hai <br><div class="subtitle">Neha Kakker</div>`,
    poster: "img/8.jpeg",
  },
  {
    id: "9",
    songName: `Dilber <br><div class="subtitle">Satyameva Jayate</div>`,
    poster: "img/9.jpeg",
  },
  {
    id: "10",
    songName: `Duniya <br><div class="subtitle">Luka Chuppi</div>`,
    poster: "img/10.jpeg",
  },
  {
    id: "11",
    songName: `Lagdi Lahore Di <br><div class="subtitle">Street Dancer 3D</div>`,
    poster: "img/11.jpeg",
  },
  {
    id: "12",
    songName: `Putt Jatt Da <br><div class="subtitle">Putt Jatt Da</div>`,
    poster: "img/12.jpeg",
  },
  {
    id: "13",
    songName: `Baarishein <br><div class="subtitle">Atif Aslam</div>`,
    poster: "img/13.jpeg",
  },
  {
    id: "14",
    songName: `Vaaste <br><div class="subtitle">Dhvani Bhanushali</div>`,
    poster: "img/14.jpeg",
  },
  {
    id: "15",
    songName: `Lut Gaye <br><div class="subtitle">Jubin Nautiyal</div>`,
    poster: "img/15.jpeg",
  },
]; // array object for poster and song names & arties

Array.from(document.getElementsByClassName("songItem")).forEach(
  (element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].poster;
    element.getElementsByTagName("h5")[0].innerHTML = songs[i].songName;
    element.getElementsByTagName("i")[0].src = songs[i].song;
  }
); // using this forEach we will target image, song , songName.

let masterPlay = document.getElementById("masterPlay");
let wave = document.getElementsByClassName("wave")[0];

masterPlay.addEventListener("click", () => {
  if (music.paused || music.currentTime <= 0) {
    music.play();
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");
    wave.classList.add("active2");
  } else {
    music.pause();
    masterPlay.classList.add("bi-play-fill");
    masterPlay.classList.remove("bi-pause-fill");
    wave.classList.remove("active2");
  }
}); // using this eventListener we will target music player button play pause and next prev.

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("playListPlay")).forEach(
    (element) => {
      element.classList.add("bi-play-circle-fill");
      element.classList.remove("bi-pause-circle-fill");
    }
  );
}; // From this arrow function we will change play and pause icons

let index = 0;
let poster_master_play = document.getElementById("poster_master_play");
let title = document.getElementById("title");
Array.from(document.getElementsByClassName("playListPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      index = e.target.id;
      makeAllPlays();
      e.target.classList.remove("bi-play-circle-fill");
      e.target.classList.add("bi-pause-circle-fill");
      music.src = `songs/${index}.mp3`;
      poster_master_play.src = `img/${index}.jpeg`;
      music.play();
      let song_title = songs.filter((ele) => {
        return ele.id == index;
      });

      song_title.forEach((ele) => {
        let { songName } = ele;
        title.innerHTML = songName;
      });
      masterPlay.classList.remove("bi-play-fill");
      masterPlay.classList.add("bi-pause-fill");
      wave.classList.add("active2");
      music.addEventListener("ended", () => {
        masterPlay.classList.add("bi-play-fill");
        masterPlay.classList.remove("bi-pause-fill");
        wave.classList.remove("active2");
      });
      makeAllBackgrounds();
      Array.from(document.getElementsByClassName("songItem"))[
        `${index - 1}`
      ].style.background = "rgb(105, 105, 170, .1)";
    });
  }
);

let currentStart = document.getElementById("currentStart");
let currentEnd = document.getElementById("currentEnd");
let seek = document.getElementById("seek");
let bar2 = document.getElementById("bar2");
let dot = document.getElementsByClassName("dot")[0];

music.addEventListener("timeupdate", () => {
  let music_curr = music.currentTime;
  let music_dur = music.duration;

  let min = Math.floor(music_dur / 60);
  let sec = Math.floor(music_dur % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  currentEnd.innerText = `${min}:${sec}`;

  let min1 = Math.floor(music_curr / 60); // Math.floor method rounds a number DOWN to the nearest integer
  let sec1 = Math.floor(music_curr % 60);
  if (sec1 < 10) {
    sec1 = `0${sec1}`;
  }
  currentStart.innerText = `${min1}:${sec1}`;

  let progressbar = parseInt((music.currentTime / music.duration) * 100);
  seek.value = progressbar;
  let seekbar = seek.value;
  bar2.style.width = `${seekbar}%`;
  dot.style.left = `${seekbar}%`;
});

seek.addEventListener("change", () => {
  music.currentTime = (seek.value * music.duration) / 100;
});

music.addEventListener("ended", () => {
  masterPlay.classList.add("bi-play-fill");
  masterPlay.classList.remove("bi-pause-fill");
  wave.classList.remove("active2");
});

let vol_icon = document.getElementById("vol_icon");
let vol = document.getElementById("vol");
let vol_dot = document.getElementById("vol_dot");
let vol_bar = document.getElementsByClassName("vol_bar")[0];

vol.addEventListener("change", () => {
  if (vol.value == 0) {
    vol_icon.classList.remove("bi-volume-down-fill");
    vol_icon.classList.add("bi-volume-mute-fill");
    vol_icon.classList.remove("bi-volume-up-fill");
  }
  if (vol.value > 0) {
    vol_icon.classList.add("bi-volume-down-fill");
    vol_icon.classList.remove("bi-volume-mute-fill");
    vol_icon.classList.remove("bi-volume-up-fill");
  }
  if (vol.value > 50) {
    vol_icon.classList.remove("bi-volume-down-fill");
    vol_icon.classList.remove("bi-volume-mute-fill");
    vol_icon.classList.add("bi-volume-up-fill");
  }

  let vol_a = vol.value;
  vol_bar.style.width = `${vol_a}%`;
  vol_dot.style.left = `${vol_a}%`;
  music.volume = vol_a / 100;
});

let back = document.getElementById("back");
let next = document.getElementById("next");

back.addEventListener("click", () => {
  index -= 1;
  if (index < 1) {
    index = Array.from(document.getElementsByClassName("songItem")).length;
  }
  music.src = `songs/${index}.mp3`;
  poster_master_play.src = `img/${index}.jpeg`;
  music.play();
  let song_title = songs.filter((ele) => {
    return ele.id == index;
  });

  song_title.forEach((ele) => {
    let { songName } = ele;
    title.innerHTML = songName;
  });
  makeAllPlays();

  document.getElementById(`${index}`).classList.remove("bi-play-fill");
  document.getElementById(`${index}`).classList.add("bi-pause-fill");
  makeAllBackgrounds();
  Array.from(document.getElementsByClassName("songItem"))[
    `${index - 1}`
  ].style.background = "rgb(105, 105, 170, .1)";
});
next.addEventListener("click", () => {
  index -= 0;
  index += 1;
  if (index > Array.from(document.getElementsByClassName("songItem")).length) {
    index = 1;
  }
  music.src = `songs/${index}.mp3`;
  poster_master_play.src = `img/${index}.jpeg`;
  music.play();
  let song_title = songs.filter((ele) => {
    return ele.id == index;
  });

  song_title.forEach((ele) => {
    let { songName } = ele;
    title.innerHTML = songName;
  });
  makeAllPlays();

  document.getElementById(`${index}`).classList.remove("bi-play-fill");
  document.getElementById(`${index}`).classList.add("bi-pause-fill");
  makeAllBackgrounds();
  Array.from(document.getElementsByClassName("songItem"))[
    `${index - 1}`
  ].style.background = "rgb(105, 105, 170, .1)";
});

let playList = document.getElementById("play-list");
let playListBtns = playList.getElementsByTagName("h4");
for (let i = 0; i < playListBtns.length; i++) {
  playListBtns[i].addEventListener("click", function () {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
const button = document.getElementById("followBtn");

function disable() {
  var element = document.getElementById("followBtn");
  element.classList.add("disabled");
  element.classList.remove("btn");
}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
