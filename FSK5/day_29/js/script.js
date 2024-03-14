var progressBar = document.querySelector(".progress-bar");
var progress = document.querySelector(".progress");
var span = document.querySelector(".progress span");
//vị trí của nút so với bar
var mousePos = 0;
var rate = 0;
var isDragging = false;

progressBar.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    var offsetX = e.offsetX;
    clientX = e.clientX;
    var progressBarWidth = this.clientWidth;
    rate = (offsetX * 100) / progressBarWidth;
    audio.currentTime = (audio.duration * rate) / 100;
    space = offsetX;
    lastPos = offsetX;
  }
});

var startPos = 0;
var lastPos = 0;
span.addEventListener("mousedown", function (e) {
  e.stopPropagation();
  if (e.which === 1) {
    isDragging = true;
    document.addEventListener("mousemove", handleDrag);
    audio.removeEventListener("timeupdate", updateTime);
    mousePos = e.clientX;
  }
});

document.addEventListener("mouseup", function (e) {
  if (isDragging) {
    audio.currentTime = (audio.duration * rate) / 100;
    lastPos = space;
    isDragging = false;
  }
  audio.addEventListener("timeupdate", updateTime);
  if (lastPos < 0) {
    lastPos = 0;
  } else if (lastPos > progressBar.clientWidth) {
    lastPos = progress.clientWidth;
  }
  document.removeEventListener("mousemove", handleDrag);
});

//khoảng cách của progessbar đến screen
var clientX = 0;
//Khoảng cách kéo thêm từ vị trí ban đầu đến vị trí mới
var space = 0;
var handleDrag = function (e) {
  //vị trí của chuột so với màn hình
  var screenMousePos = e.clientX;
  space = screenMousePos - mousePos + lastPos;
  rate = (space * 100) / progressBar.clientWidth;
  //   console.log(space);
  if (rate < 0) {
    rate = 0;
  }
  if (rate > 100) {
    rate = 100;
  }
  progress.style.width = `${rate}%`;
};

//xay dung trinh phat nhac
var audio = document.querySelector("audio");
var duration = progressBar.nextElementSibling;
var currentTime = progressBar.previousElementSibling;
var playBtn = document.querySelector(".player-action i");

var getTime = function (seconds) {
  var mins = Math.floor(seconds / 60);
  seconds = Math.floor(seconds - mins * 60);
  return `${mins < 10 ? "0" + mins : mins}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};

//Lắng nghe sự kiện khi file mp3 được tải xong và trình duyệt lấy được thông tin
duration.innerText = getTime(audio.duration);
audio.addEventListener("loadeddata", function () {
  duration.innerText = getTime(audio.duration);
});

//Khi người dùng click vào nút play
playBtn.addEventListener("click", function () {
  //Nếu nhạc đang dừng thì phát nhạc
  //Nếu nhạc đang chạy thì dừng nhạc
  if (audio.paused) {
    audio.play();
    this.classList.remove("fa-play");
    this.classList.add("fa-pause");
  } else {
    audio.pause();
    this.classList.remove("fa-pause");
    this.classList.add("fa-play");
  }
});

var updateTime = function () {
  currentTime.innerText = getTime(audio.currentTime);
  var rate = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${rate}%`;
};
//Khi nhạc đang phát
// audio.addEventListener("timeupdate", updateTime);
