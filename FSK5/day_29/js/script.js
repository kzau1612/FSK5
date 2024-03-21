var progressBar = document.querySelector(".progress-bar");
var progress = document.querySelector(".progress");
var span = document.querySelector(".progress span");
var timeDisplay = document.querySelector(".time-display");

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
    // timeDisplay.style.display = "none";
    isDragging = true;
    document.addEventListener("mousemove", handleDrag);
    audio.removeEventListener("timeupdate", updateTime);
    mousePos = e.clientX;
  }
});

span.addEventListener("mousemove", function (e) {
  e.stopPropagation();
  timeDisplay.style.display = "none";
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

progressBar.addEventListener("mousemove", function (e) {
  if (!isDragging) {
    var offsetX = e.offsetX;
    var progressBarWidth = this.clientWidth;
    var rate = (offsetX * 100) / progressBarWidth;
    var time = (audio.duration * rate) / 100;
    var mins = Math.floor(time / 60);
    var seconds = Math.floor(time - mins * 60);
    var formattedTime = `${mins < 10 ? "0" + mins : mins}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
    if (timeDisplay) {
      timeDisplay.style.display = "inline-block";
      timeDisplay.style.left = `${rate}%`;
      timeDisplay.innerText = formattedTime;
    }
  }
});

progressBar.addEventListener("mouseleave", function (e) {
  timeDisplay.style.display = "none";
});

audio.addEventListener("ended", function () {
  audio.currentTime = 0;
  playBtn.classList.remove("fa-pause");
  playBtn.classList.add("fa-play");
  progress.style.width = "0%";
  currentTime.innerText = getTime(audio.currentTime);
});

var lyrics = `{
    "url": "https://a128-z3.zmdcdn.me/2ba157e37f9f7c24fd642050a5c80ff8?authen=exp=1711164712~acl=/2ba157e37f9f7c24fd642050a5c80ff8/*~hmac=0f723994e02285cb0d12d6f115bb565d",
    "title": "Kỳ Vọng Sai Lầm",
    "author": "Tăng Phúc, Nguyễn Đình Vũ, Yuno Bigboi",
    "image": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/3/4/0/7/3407c71c13a5d4a646a887f5900871de.jpg",
    "lyrics": [
      {
        "words": [
          {
            "startTime": 10770,
            "endTime": 11030,
            "data": "Mình"
          },
          {
            "startTime": 11030,
            "endTime": 11300,
            "data": "lỡ"
          },
          {
            "startTime": 11300,
            "endTime": 11560,
            "data": "yêu"
          },
          {
            "startTime": 11560,
            "endTime": 12100,
            "data": "thương"
          },
          {
            "startTime": 12100,
            "endTime": 12100,
            "data": "một"
          },
          {
            "startTime": 12100,
            "endTime": 12620,
            "data": "người"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 12620,
            "endTime": 13160,
            "data": "Say"
          },
          {
            "startTime": 13160,
            "endTime": 13420,
            "data": "đắm"
          },
          {
            "startTime": 13420,
            "endTime": 13690,
            "data": "nụ"
          },
          {
            "startTime": 13690,
            "endTime": 14490,
            "data": "cười"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 14490,
            "endTime": 14490,
            "data": "Dù"
          },
          {
            "startTime": 14490,
            "endTime": 14770,
            "data": "biết"
          },
          {
            "startTime": 14770,
            "endTime": 15300,
            "data": "trước"
          },
          {
            "startTime": 15300,
            "endTime": 15560,
            "data": "sẽ"
          },
          {
            "startTime": 15560,
            "endTime": 15560,
            "data": "không"
          },
          {
            "startTime": 15560,
            "endTime": 15820,
            "data": "thể"
          },
          {
            "startTime": 15820,
            "endTime": 16620,
            "data": "nào"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 16620,
            "endTime": 17160,
            "data": "Ở"
          },
          {
            "startTime": 17160,
            "endTime": 17420,
            "data": "đằng"
          },
          {
            "startTime": 17420,
            "endTime": 17690,
            "data": "sau"
          },
          {
            "startTime": 17690,
            "endTime": 17960,
            "data": "bầu"
          },
          {
            "startTime": 17960,
            "endTime": 18490,
            "data": "trời"
          },
          {
            "startTime": 18490,
            "endTime": 18750,
            "data": "gió"
          },
          {
            "startTime": 18750,
            "endTime": 19540,
            "data": "mưa"
          },
          {
            "startTime": 19540,
            "endTime": 20340,
            "data": "gào"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 20340,
            "endTime": 20620,
            "data": "Kỳ"
          },
          {
            "startTime": 20620,
            "endTime": 20880,
            "data": "vọng"
          },
          {
            "startTime": 20880,
            "endTime": 21140,
            "data": "như"
          },
          {
            "startTime": 21140,
            "endTime": 21670,
            "data": "thế"
          },
          {
            "startTime": 21670,
            "endTime": 22210,
            "data": "nào"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 22210,
            "endTime": 22470,
            "data": "Chẳng"
          },
          {
            "startTime": 22470,
            "endTime": 23000,
            "data": "thể"
          },
          {
            "startTime": 23000,
            "endTime": 23280,
            "data": "ở"
          },
          {
            "startTime": 23280,
            "endTime": 23540,
            "data": "bên"
          },
          {
            "startTime": 23540,
            "endTime": 23810,
            "data": "cạnh"
          },
          {
            "startTime": 23810,
            "endTime": 24060,
            "data": "em"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 24060,
            "endTime": 24600,
            "data": "Những"
          },
          {
            "startTime": 24600,
            "endTime": 24860,
            "data": "tháng"
          },
          {
            "startTime": 24860,
            "endTime": 25400,
            "data": "ngày"
          },
          {
            "startTime": 25400,
            "endTime": 26190,
            "data": "dài"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 26190,
            "endTime": 26450,
            "data": "Cố"
          },
          {
            "startTime": 26450,
            "endTime": 26720,
            "data": "chấp"
          },
          {
            "startTime": 26720,
            "endTime": 26990,
            "data": "biết"
          },
          {
            "startTime": 26990,
            "endTime": 27520,
            "data": "mình"
          },
          {
            "startTime": 27520,
            "endTime": 28320,
            "data": "sai"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 28320,
            "endTime": 28580,
            "data": "Vì"
          },
          {
            "startTime": 28580,
            "endTime": 29110,
            "data": "anh"
          },
          {
            "startTime": 29110,
            "endTime": 29380,
            "data": "có"
          },
          {
            "startTime": 29380,
            "endTime": 29640,
            "data": "một"
          },
          {
            "startTime": 29640,
            "endTime": 29910,
            "data": "nơi"
          },
          {
            "startTime": 29910,
            "endTime": 30440,
            "data": "phải"
          },
          {
            "startTime": 30440,
            "endTime": 31240,
            "data": "quay"
          },
          {
            "startTime": 31240,
            "endTime": 32030,
            "data": "về"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 32030,
            "endTime": 32310,
            "data": "Nơi"
          },
          {
            "startTime": 32310,
            "endTime": 32570,
            "data": "đây"
          },
          {
            "startTime": 32570,
            "endTime": 32830,
            "data": "chẳng"
          },
          {
            "startTime": 32830,
            "endTime": 33360,
            "data": "có"
          },
          {
            "startTime": 33360,
            "endTime": 33620,
            "data": "em"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 33620,
            "endTime": 34160,
            "data": "Chỉ"
          },
          {
            "startTime": 34160,
            "endTime": 34420,
            "data": "có"
          },
          {
            "startTime": 34420,
            "endTime": 34690,
            "data": "những"
          },
          {
            "startTime": 34690,
            "endTime": 35500,
            "data": "mong"
          },
          {
            "startTime": 35500,
            "endTime": 37610,
            "data": "chờ"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 37610,
            "endTime": 37880,
            "data": "Tôi"
          },
          {
            "startTime": 37880,
            "endTime": 38150,
            "data": "đã"
          },
          {
            "startTime": 38150,
            "endTime": 38410,
            "data": "đem"
          },
          {
            "startTime": 38410,
            "endTime": 38940,
            "data": "nhớ"
          },
          {
            "startTime": 38940,
            "endTime": 39740,
            "data": "thương"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 39740,
            "endTime": 40280,
            "data": "Đặt"
          },
          {
            "startTime": 40280,
            "endTime": 40540,
            "data": "vào"
          },
          {
            "startTime": 40540,
            "endTime": 40800,
            "data": "trong"
          },
          {
            "startTime": 40800,
            "endTime": 41070,
            "data": "mình"
          },
          {
            "startTime": 41070,
            "endTime": 41330,
            "data": "một"
          },
          {
            "startTime": 41330,
            "endTime": 41860,
            "data": "chiếc"
          },
          {
            "startTime": 41860,
            "endTime": 43190,
            "data": "gương"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 43190,
            "endTime": 43190,
            "data": "Nhìn"
          },
          {
            "startTime": 43190,
            "endTime": 43460,
            "data": "ra"
          },
          {
            "startTime": 43460,
            "endTime": 43720,
            "data": "có"
          },
          {
            "startTime": 43720,
            "endTime": 43980,
            "data": "quá"
          },
          {
            "startTime": 43980,
            "endTime": 44510,
            "data": "nhiều"
          },
          {
            "startTime": 44510,
            "endTime": 45060,
            "data": "thứ"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 45060,
            "endTime": 45320,
            "data": "Khiến"
          },
          {
            "startTime": 45320,
            "endTime": 45590,
            "data": "em"
          },
          {
            "startTime": 45590,
            "endTime": 45840,
            "data": "lùi"
          },
          {
            "startTime": 45840,
            "endTime": 46380,
            "data": "bước"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 46380,
            "endTime": 46640,
            "data": "Giờ"
          },
          {
            "startTime": 46640,
            "endTime": 46910,
            "data": "còn"
          },
          {
            "startTime": 46910,
            "endTime": 47440,
            "data": "đây"
          },
          {
            "startTime": 47440,
            "endTime": 47700,
            "data": "những"
          },
          {
            "startTime": 47700,
            "endTime": 48500,
            "data": "vỡ"
          },
          {
            "startTime": 48500,
            "endTime": 49310,
            "data": "tan"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 49310,
            "endTime": 49580,
            "data": "Mình"
          },
          {
            "startTime": 49580,
            "endTime": 49840,
            "data": "sẽ"
          },
          {
            "startTime": 49840,
            "endTime": 50100,
            "data": "là"
          },
          {
            "startTime": 50100,
            "endTime": 50630,
            "data": "của"
          },
          {
            "startTime": 50630,
            "endTime": 51420,
            "data": "nhau"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 51420,
            "endTime": 51690,
            "data": "Hoặc"
          },
          {
            "startTime": 51690,
            "endTime": 51960,
            "data": "là"
          },
          {
            "startTime": 51960,
            "endTime": 52490,
            "data": "sẽ"
          },
          {
            "startTime": 52490,
            "endTime": 52760,
            "data": "trở"
          },
          {
            "startTime": 52760,
            "endTime": 53020,
            "data": "thành"
          },
          {
            "startTime": 53020,
            "endTime": 53560,
            "data": "nỗi"
          },
          {
            "startTime": 53560,
            "endTime": 55140,
            "data": "đau"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 55140,
            "endTime": 55670,
            "data": "Biết,"
          },
          {
            "startTime": 55670,
            "endTime": 55940,
            "data": "cứ"
          },
          {
            "startTime": 55940,
            "endTime": 55940,
            "data": "yêu"
          },
          {
            "startTime": 55940,
            "endTime": 56470,
            "data": "là"
          },
          {
            "startTime": 56470,
            "endTime": 57000,
            "data": "chết"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 57000,
            "endTime": 57270,
            "data": "Chết"
          },
          {
            "startTime": 57270,
            "endTime": 57540,
            "data": "đi"
          },
          {
            "startTime": 57540,
            "endTime": 57800,
            "data": "ở"
          },
          {
            "startTime": 57800,
            "endTime": 58330,
            "data": "trong"
          },
          {
            "startTime": 58330,
            "endTime": 58610,
            "data": "thâm"
          },
          {
            "startTime": 58610,
            "endTime": 58860,
            "data": "tâm"
          },
          {
            "startTime": 58860,
            "endTime": 59390,
            "data": "một"
          },
          {
            "startTime": 59390,
            "endTime": 61260,
            "data": "chút"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 61260,
            "endTime": 61520,
            "data": "Mình"
          },
          {
            "startTime": 61520,
            "endTime": 61790,
            "data": "lỡ"
          },
          {
            "startTime": 61790,
            "endTime": 62320,
            "data": "yêu"
          },
          {
            "startTime": 62320,
            "endTime": 62590,
            "data": "thương"
          },
          {
            "startTime": 62590,
            "endTime": 62860,
            "data": "một"
          },
          {
            "startTime": 62860,
            "endTime": 63380,
            "data": "người"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 63380,
            "endTime": 63650,
            "data": "Say"
          },
          {
            "startTime": 63650,
            "endTime": 63910,
            "data": "đắm"
          },
          {
            "startTime": 63910,
            "endTime": 64440,
            "data": "nụ"
          },
          {
            "startTime": 64440,
            "endTime": 64970,
            "data": "cười"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 64970,
            "endTime": 65240,
            "data": "Dù"
          },
          {
            "startTime": 65240,
            "endTime": 65500,
            "data": "biết"
          },
          {
            "startTime": 65500,
            "endTime": 65770,
            "data": "trước"
          },
          {
            "startTime": 65770,
            "endTime": 66040,
            "data": "sẽ"
          },
          {
            "startTime": 66040,
            "endTime": 66300,
            "data": "không"
          },
          {
            "startTime": 66300,
            "endTime": 66560,
            "data": "thể"
          },
          {
            "startTime": 66560,
            "endTime": 67370,
            "data": "nào"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 67370,
            "endTime": 67640,
            "data": "Ở"
          },
          {
            "startTime": 67640,
            "endTime": 67900,
            "data": "đằng"
          },
          {
            "startTime": 67900,
            "endTime": 68420,
            "data": "sau"
          },
          {
            "startTime": 68420,
            "endTime": 68690,
            "data": "bầu"
          },
          {
            "startTime": 68690,
            "endTime": 68950,
            "data": "trời"
          },
          {
            "startTime": 68950,
            "endTime": 69490,
            "data": "gió"
          },
          {
            "startTime": 69490,
            "endTime": 70020,
            "data": "mưa"
          },
          {
            "startTime": 70020,
            "endTime": 70820,
            "data": "gào"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 70820,
            "endTime": 71340,
            "data": "Kỳ"
          },
          {
            "startTime": 71340,
            "endTime": 71610,
            "data": "vọng"
          },
          {
            "startTime": 71610,
            "endTime": 71870,
            "data": "như"
          },
          {
            "startTime": 71870,
            "endTime": 72150,
            "data": "thế"
          },
          {
            "startTime": 72150,
            "endTime": 72670,
            "data": "nào"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 72670,
            "endTime": 73200,
            "data": "Chẳng"
          },
          {
            "startTime": 73200,
            "endTime": 73470,
            "data": "thể"
          },
          {
            "startTime": 73470,
            "endTime": 73740,
            "data": "ở"
          },
          {
            "startTime": 73740,
            "endTime": 74270,
            "data": "bên"
          },
          {
            "startTime": 74270,
            "endTime": 74540,
            "data": "cạnh"
          },
          {
            "startTime": 74540,
            "endTime": 74800,
            "data": "em"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 74800,
            "endTime": 75060,
            "data": "Những"
          },
          {
            "startTime": 75060,
            "endTime": 75600,
            "data": "tháng"
          },
          {
            "startTime": 75600,
            "endTime": 75860,
            "data": "ngày"
          },
          {
            "startTime": 75860,
            "endTime": 76670,
            "data": "dài"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 76670,
            "endTime": 76940,
            "data": "Cố"
          },
          {
            "startTime": 76940,
            "endTime": 77200,
            "data": "chấp"
          },
          {
            "startTime": 77200,
            "endTime": 77740,
            "data": "biết"
          },
          {
            "startTime": 77740,
            "endTime": 78000,
            "data": "mình"
          },
          {
            "startTime": 78000,
            "endTime": 78800,
            "data": "sai"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 78800,
            "endTime": 79340,
            "data": "Vì"
          },
          {
            "startTime": 79340,
            "endTime": 79600,
            "data": "anh"
          },
          {
            "startTime": 79600,
            "endTime": 79870,
            "data": "có"
          },
          {
            "startTime": 79870,
            "endTime": 80130,
            "data": "một"
          },
          {
            "startTime": 80130,
            "endTime": 80660,
            "data": "nơi"
          },
          {
            "startTime": 80660,
            "endTime": 80930,
            "data": "phải"
          },
          {
            "startTime": 80930,
            "endTime": 81720,
            "data": "quay"
          },
          {
            "startTime": 81720,
            "endTime": 82520,
            "data": "về"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 82520,
            "endTime": 82790,
            "data": "Nơi"
          },
          {
            "startTime": 82790,
            "endTime": 83040,
            "data": "đây"
          },
          {
            "startTime": 83040,
            "endTime": 83320,
            "data": "chẳng"
          },
          {
            "startTime": 83320,
            "endTime": 83850,
            "data": "có"
          },
          {
            "startTime": 83850,
            "endTime": 84120,
            "data": "em"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 84120,
            "endTime": 84660,
            "data": "Chỉ"
          },
          {
            "startTime": 84660,
            "endTime": 84930,
            "data": "có"
          },
          {
            "startTime": 84930,
            "endTime": 85190,
            "data": "những"
          },
          {
            "startTime": 85190,
            "endTime": 85990,
            "data": "mong"
          },
          {
            "startTime": 85990,
            "endTime": 88640,
            "data": "chờ"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 88640,
            "endTime": 88920,
            "data": "Tất"
          },
          {
            "startTime": 88920,
            "endTime": 89180,
            "data": "cả"
          },
          {
            "startTime": 89180,
            "endTime": 89180,
            "data": "chỉ"
          },
          {
            "startTime": 89180,
            "endTime": 89440,
            "data": "là"
          },
          {
            "startTime": 89440,
            "endTime": 89720,
            "data": "anh"
          },
          {
            "startTime": 89720,
            "endTime": 89720,
            "data": "ảo"
          },
          {
            "startTime": 89720,
            "endTime": 89970,
            "data": "tưởng"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 89970,
            "endTime": 90230,
            "data": "Sau"
          },
          {
            "startTime": 90230,
            "endTime": 90230,
            "data": "những"
          },
          {
            "startTime": 90230,
            "endTime": 90510,
            "data": "lần"
          },
          {
            "startTime": 90510,
            "endTime": 90770,
            "data": "muộn"
          },
          {
            "startTime": 90770,
            "endTime": 90770,
            "data": "đôi"
          },
          {
            "startTime": 90770,
            "endTime": 91030,
            "data": "ta"
          },
          {
            "startTime": 91030,
            "endTime": 91310,
            "data": "gặp"
          },
          {
            "startTime": 91310,
            "endTime": 91830,
            "data": "nhau"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 91830,
            "endTime": 92100,
            "data": "Anh"
          },
          {
            "startTime": 92100,
            "endTime": 92100,
            "data": "ngỡ"
          },
          {
            "startTime": 92100,
            "endTime": 92360,
            "data": "chung"
          },
          {
            "startTime": 92360,
            "endTime": 92360,
            "data": "đôi"
          },
          {
            "startTime": 92360,
            "endTime": 92620,
            "data": "kề"
          },
          {
            "startTime": 92620,
            "endTime": 92900,
            "data": "bước"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 92900,
            "endTime": 93160,
            "data": "Sẽ"
          },
          {
            "startTime": 93160,
            "endTime": 93160,
            "data": "sớm"
          },
          {
            "startTime": 93160,
            "endTime": 93420,
            "data": "khiến"
          },
          {
            "startTime": 93420,
            "endTime": 93690,
            "data": "mình"
          },
          {
            "startTime": 93690,
            "endTime": 93690,
            "data": "chung"
          },
          {
            "startTime": 93690,
            "endTime": 93950,
            "data": "nhà"
          },
          {
            "startTime": 93950,
            "endTime": 94220,
            "data": "thật"
          },
          {
            "startTime": 94220,
            "endTime": 95250,
            "data": "mau"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 95250,
            "endTime": 95500,
            "data": "Nên"
          },
          {
            "startTime": 95500,
            "endTime": 95500,
            "data": "mỗi"
          },
          {
            "startTime": 95500,
            "endTime": 95770,
            "data": "ngày"
          },
          {
            "startTime": 95770,
            "endTime": 95770,
            "data": "gửi"
          },
          {
            "startTime": 95770,
            "endTime": 96040,
            "data": "tâm"
          },
          {
            "startTime": 96040,
            "endTime": 96300,
            "data": "tư"
          },
          {
            "startTime": 96300,
            "endTime": 96300,
            "data": "vào"
          },
          {
            "startTime": 96300,
            "endTime": 96560,
            "data": "một"
          },
          {
            "startTime": 96560,
            "endTime": 96830,
            "data": "chút"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 96830,
            "endTime": 97100,
            "data": "Nhưng"
          },
          {
            "startTime": 97100,
            "endTime": 97360,
            "data": "tất"
          },
          {
            "startTime": 97360,
            "endTime": 97360,
            "data": "cả"
          },
          {
            "startTime": 97360,
            "endTime": 97630,
            "data": "do"
          },
          {
            "startTime": 97630,
            "endTime": 97630,
            "data": "tự"
          },
          {
            "startTime": 97630,
            "endTime": 97890,
            "data": "anh"
          },
          {
            "startTime": 97890,
            "endTime": 98150,
            "data": "tạo"
          },
          {
            "startTime": 98150,
            "endTime": 98430,
            "data": "ra"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 98430,
            "endTime": 98430,
            "data": "Nên"
          },
          {
            "startTime": 98430,
            "endTime": 98690,
            "data": "nhận"
          },
          {
            "startTime": 98690,
            "endTime": 98690,
            "data": "lại"
          },
          {
            "startTime": 98690,
            "endTime": 98960,
            "data": "niềm"
          },
          {
            "startTime": 98960,
            "endTime": 99490,
            "data": "đau"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 99490,
            "endTime": 99490,
            "data": "Chỉ"
          },
          {
            "startTime": 99490,
            "endTime": 99750,
            "data": "vì"
          },
          {
            "startTime": 99750,
            "endTime": 99750,
            "data": "cố"
          },
          {
            "startTime": 99750,
            "endTime": 100030,
            "data": "chấp"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 100030,
            "endTime": 100290,
            "data": "Nên"
          },
          {
            "startTime": 100290,
            "endTime": 100290,
            "data": "anh"
          },
          {
            "startTime": 100290,
            "endTime": 100560,
            "data": "vẫn"
          },
          {
            "startTime": 100560,
            "endTime": 100560,
            "data": "cứ"
          },
          {
            "startTime": 100560,
            "endTime": 100830,
            "data": "nghĩ"
          },
          {
            "startTime": 100830,
            "endTime": 101100,
            "data": "đây"
          },
          {
            "startTime": 101100,
            "endTime": 101360,
            "data": "là"
          },
          {
            "startTime": 101360,
            "endTime": 101900,
            "data": "yêu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 101900,
            "endTime": 102150,
            "data": "Em"
          },
          {
            "startTime": 102150,
            "endTime": 102150,
            "data": "vui"
          },
          {
            "startTime": 102150,
            "endTime": 102430,
            "data": "với"
          },
          {
            "startTime": 102430,
            "endTime": 102690,
            "data": "anh"
          },
          {
            "startTime": 102690,
            "endTime": 102690,
            "data": "nhiều"
          },
          {
            "startTime": 102690,
            "endTime": 102950,
            "data": "lúc"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 102950,
            "endTime": 103230,
            "data": "Nhưng"
          },
          {
            "startTime": 103230,
            "endTime": 103230,
            "data": "không"
          },
          {
            "startTime": 103230,
            "endTime": 103480,
            "data": "bao"
          },
          {
            "startTime": 103480,
            "endTime": 103480,
            "data": "giờ"
          },
          {
            "startTime": 103480,
            "endTime": 103750,
            "data": "hỏi"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 103750,
            "endTime": 104020,
            "data": "How"
          },
          {
            "startTime": 104020,
            "endTime": 104290,
            "data": "I"
          },
          {
            "startTime": 104290,
            "endTime": 104820,
            "data": "feel"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 104820,
            "endTime": 105080,
            "data": "Anh"
          },
          {
            "startTime": 105080,
            "endTime": 105080,
            "data": "nói"
          },
          {
            "startTime": 105080,
            "endTime": 105350,
            "data": "anh"
          },
          {
            "startTime": 105350,
            "endTime": 105610,
            "data": "ổn"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 105610,
            "endTime": 105610,
            "data": "Nhưng"
          },
          {
            "startTime": 105610,
            "endTime": 105880,
            "data": "khi"
          },
          {
            "startTime": 105880,
            "endTime": 105880,
            "data": "một"
          },
          {
            "startTime": 105880,
            "endTime": 106150,
            "data": "mình"
          },
          {
            "startTime": 106150,
            "endTime": 106410,
            "data": "đêm"
          },
          {
            "startTime": 106410,
            "endTime": 106940,
            "data": "đen"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 106940,
            "endTime": 107210,
            "data": "Căn"
          },
          {
            "startTime": 107210,
            "endTime": 107470,
            "data": "phòng"
          },
          {
            "startTime": 107470,
            "endTime": 107470,
            "data": "tràn"
          },
          {
            "startTime": 107470,
            "endTime": 107740,
            "data": "ngập"
          },
          {
            "startTime": 107740,
            "endTime": 108010,
            "data": "hơi"
          },
          {
            "startTime": 108010,
            "endTime": 108270,
            "data": "men"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 108270,
            "endTime": 108550,
            "data": "Tâm"
          },
          {
            "startTime": 108550,
            "endTime": 108810,
            "data": "trí"
          },
          {
            "startTime": 108810,
            "endTime": 109070,
            "data": "tự"
          },
          {
            "startTime": 109070,
            "endTime": 109070,
            "data": "nhủ"
          },
          {
            "startTime": 109070,
            "endTime": 109600,
            "data": "quên"
          },
          {
            "startTime": 109600,
            "endTime": 109600,
            "data": "em"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 109600,
            "endTime": 109860,
            "data": "Nhưng"
          },
          {
            "startTime": 109860,
            "endTime": 110130,
            "data": "lòng"
          },
          {
            "startTime": 110130,
            "endTime": 110130,
            "data": "vẫn"
          },
          {
            "startTime": 110130,
            "endTime": 110390,
            "data": "không"
          },
          {
            "startTime": 110390,
            "endTime": 110650,
            "data": "thể"
          },
          {
            "startTime": 110650,
            "endTime": 110930,
            "data": "quên"
          },
          {
            "startTime": 110930,
            "endTime": 111190,
            "data": "em"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 111190,
            "endTime": 111730,
            "data": "Tôi"
          },
          {
            "startTime": 111730,
            "endTime": 111990,
            "data": "đã"
          },
          {
            "startTime": 111990,
            "endTime": 112250,
            "data": "đem"
          },
          {
            "startTime": 112250,
            "endTime": 112790,
            "data": "nhớ"
          },
          {
            "startTime": 112790,
            "endTime": 113590,
            "data": "thương"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 113590,
            "endTime": 113850,
            "data": "Đặt"
          },
          {
            "startTime": 113850,
            "endTime": 114380,
            "data": "vào"
          },
          {
            "startTime": 114380,
            "endTime": 114650,
            "data": "trong"
          },
          {
            "startTime": 114650,
            "endTime": 114910,
            "data": "mình"
          },
          {
            "startTime": 114910,
            "endTime": 115170,
            "data": "một"
          },
          {
            "startTime": 115170,
            "endTime": 115710,
            "data": "chiếc"
          },
          {
            "startTime": 115710,
            "endTime": 116770,
            "data": "gương"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 116770,
            "endTime": 117030,
            "data": "Nhìn"
          },
          {
            "startTime": 117030,
            "endTime": 117300,
            "data": "ra"
          },
          {
            "startTime": 117300,
            "endTime": 117570,
            "data": "có"
          },
          {
            "startTime": 117570,
            "endTime": 117830,
            "data": "quá"
          },
          {
            "startTime": 117830,
            "endTime": 118110,
            "data": "nhiều"
          },
          {
            "startTime": 118110,
            "endTime": 118630,
            "data": "thứ"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 118630,
            "endTime": 118910,
            "data": "Khiến"
          },
          {
            "startTime": 118910,
            "endTime": 119160,
            "data": "em"
          },
          {
            "startTime": 119160,
            "endTime": 119690,
            "data": "lùi"
          },
          {
            "startTime": 119690,
            "endTime": 119950,
            "data": "bước"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 119950,
            "endTime": 120490,
            "data": "Giờ"
          },
          {
            "startTime": 120490,
            "endTime": 120750,
            "data": "còn"
          },
          {
            "startTime": 120750,
            "endTime": 121020,
            "data": "đây"
          },
          {
            "startTime": 121020,
            "endTime": 121550,
            "data": "những"
          },
          {
            "startTime": 121550,
            "endTime": 122090,
            "data": "vỡ"
          },
          {
            "startTime": 122090,
            "endTime": 122890,
            "data": "tan"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 122890,
            "endTime": 123150,
            "data": "Mình"
          },
          {
            "startTime": 123150,
            "endTime": 123410,
            "data": "sẽ"
          },
          {
            "startTime": 123410,
            "endTime": 123690,
            "data": "là"
          },
          {
            "startTime": 123690,
            "endTime": 124210,
            "data": "của"
          },
          {
            "startTime": 124210,
            "endTime": 125270,
            "data": "nhau"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 125270,
            "endTime": 125530,
            "data": "Hoặc"
          },
          {
            "startTime": 125530,
            "endTime": 125800,
            "data": "là"
          },
          {
            "startTime": 125800,
            "endTime": 126070,
            "data": "sẽ"
          },
          {
            "startTime": 126070,
            "endTime": 126330,
            "data": "trở"
          },
          {
            "startTime": 126330,
            "endTime": 126600,
            "data": "thành"
          },
          {
            "startTime": 126600,
            "endTime": 127130,
            "data": "nỗi"
          },
          {
            "startTime": 127130,
            "endTime": 128720,
            "data": "đau"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 128720,
            "endTime": 129250,
            "data": "Biết,"
          },
          {
            "startTime": 129250,
            "endTime": 129510,
            "data": "cứ"
          },
          {
            "startTime": 129510,
            "endTime": 129790,
            "data": "yêu"
          },
          {
            "startTime": 129790,
            "endTime": 130050,
            "data": "là"
          },
          {
            "startTime": 130050,
            "endTime": 130850,
            "data": "chết"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 130850,
            "endTime": 131110,
            "data": "Chết"
          },
          {
            "startTime": 131110,
            "endTime": 131110,
            "data": "đi"
          },
          {
            "startTime": 131110,
            "endTime": 131640,
            "data": "ở"
          },
          {
            "startTime": 131640,
            "endTime": 131920,
            "data": "trong"
          },
          {
            "startTime": 131920,
            "endTime": 132440,
            "data": "thâm"
          },
          {
            "startTime": 132440,
            "endTime": 132710,
            "data": "tâm"
          },
          {
            "startTime": 132710,
            "endTime": 133230,
            "data": "một"
          },
          {
            "startTime": 133230,
            "endTime": 135110,
            "data": "chút"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 135110,
            "endTime": 135370,
            "data": "Mình"
          },
          {
            "startTime": 135370,
            "endTime": 135630,
            "data": "lỡ"
          },
          {
            "startTime": 135630,
            "endTime": 135910,
            "data": "yêu"
          },
          {
            "startTime": 135910,
            "endTime": 136430,
            "data": "thương"
          },
          {
            "startTime": 136430,
            "endTime": 136700,
            "data": "một"
          },
          {
            "startTime": 136700,
            "endTime": 136950,
            "data": "người"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 136950,
            "endTime": 137220,
            "data": "Say"
          },
          {
            "startTime": 137220,
            "endTime": 137750,
            "data": "đắm"
          },
          {
            "startTime": 137750,
            "endTime": 138020,
            "data": "nụ"
          },
          {
            "startTime": 138020,
            "endTime": 138810,
            "data": "cười"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 138810,
            "endTime": 138810,
            "data": "Dù"
          },
          {
            "startTime": 138810,
            "endTime": 139350,
            "data": "biết"
          },
          {
            "startTime": 139350,
            "endTime": 139610,
            "data": "trước"
          },
          {
            "startTime": 139610,
            "endTime": 139890,
            "data": "sẽ"
          },
          {
            "startTime": 139890,
            "endTime": 139890,
            "data": "không"
          },
          {
            "startTime": 139890,
            "endTime": 140410,
            "data": "thể"
          },
          {
            "startTime": 140410,
            "endTime": 140940,
            "data": "nào"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 140940,
            "endTime": 141470,
            "data": "Ở"
          },
          {
            "startTime": 141470,
            "endTime": 141730,
            "data": "đằng"
          },
          {
            "startTime": 141730,
            "endTime": 142000,
            "data": "sau"
          },
          {
            "startTime": 142000,
            "endTime": 142270,
            "data": "bầu"
          },
          {
            "startTime": 142270,
            "endTime": 142800,
            "data": "trời"
          },
          {
            "startTime": 142800,
            "endTime": 143330,
            "data": "gió"
          },
          {
            "startTime": 143330,
            "endTime": 143860,
            "data": "mưa"
          },
          {
            "startTime": 143860,
            "endTime": 144660,
            "data": "gào"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 144660,
            "endTime": 144920,
            "data": "Kỳ"
          },
          {
            "startTime": 144920,
            "endTime": 145200,
            "data": "vọng"
          },
          {
            "startTime": 145200,
            "endTime": 145460,
            "data": "như"
          },
          {
            "startTime": 145460,
            "endTime": 145990,
            "data": "thế"
          },
          {
            "startTime": 145990,
            "endTime": 146520,
            "data": "nào"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 146520,
            "endTime": 146790,
            "data": "Chẳng"
          },
          {
            "startTime": 146790,
            "endTime": 147050,
            "data": "thể"
          },
          {
            "startTime": 147050,
            "endTime": 147590,
            "data": "ở"
          },
          {
            "startTime": 147590,
            "endTime": 147850,
            "data": "bên"
          },
          {
            "startTime": 147850,
            "endTime": 148120,
            "data": "cạnh"
          },
          {
            "startTime": 148120,
            "endTime": 148390,
            "data": "em"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 148390,
            "endTime": 148930,
            "data": "Những"
          },
          {
            "startTime": 148930,
            "endTime": 149190,
            "data": "tháng"
          },
          {
            "startTime": 149190,
            "endTime": 149720,
            "data": "ngày"
          },
          {
            "startTime": 149720,
            "endTime": 150510,
            "data": "dài"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 150510,
            "endTime": 150790,
            "data": "Cố"
          },
          {
            "startTime": 150790,
            "endTime": 151050,
            "data": "chấp"
          },
          {
            "startTime": 151050,
            "endTime": 151310,
            "data": "biết"
          },
          {
            "startTime": 151310,
            "endTime": 151850,
            "data": "mình"
          },
          {
            "startTime": 151850,
            "endTime": 152650,
            "data": "sai"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 152650,
            "endTime": 152910,
            "data": "Vì"
          },
          {
            "startTime": 152910,
            "endTime": 153180,
            "data": "anh"
          },
          {
            "startTime": 153180,
            "endTime": 153710,
            "data": "có"
          },
          {
            "startTime": 153710,
            "endTime": 153990,
            "data": "một"
          },
          {
            "startTime": 153990,
            "endTime": 154250,
            "data": "nơi"
          },
          {
            "startTime": 154250,
            "endTime": 154770,
            "data": "phải"
          },
          {
            "startTime": 154770,
            "endTime": 155300,
            "data": "quay"
          },
          {
            "startTime": 155300,
            "endTime": 156100,
            "data": "về"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 156100,
            "endTime": 156370,
            "data": "Nơi"
          },
          {
            "startTime": 156370,
            "endTime": 156890,
            "data": "đây"
          },
          {
            "startTime": 156890,
            "endTime": 157170,
            "data": "chẳng"
          },
          {
            "startTime": 157170,
            "endTime": 157690,
            "data": "có"
          },
          {
            "startTime": 157690,
            "endTime": 157960,
            "data": "em"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 157960,
            "endTime": 158480,
            "data": "Chỉ"
          },
          {
            "startTime": 158480,
            "endTime": 158760,
            "data": "có"
          },
          {
            "startTime": 158760,
            "endTime": 159020,
            "data": "những"
          },
          {
            "startTime": 159020,
            "endTime": 159820,
            "data": "mong"
          },
          {
            "startTime": 159820,
            "endTime": 161150,
            "data": "chờ"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 161150,
            "endTime": 161420,
            "data": "Mình"
          },
          {
            "startTime": 161420,
            "endTime": 161680,
            "data": "lỡ"
          },
          {
            "startTime": 161680,
            "endTime": 161950,
            "data": "yêu"
          },
          {
            "startTime": 161950,
            "endTime": 162480,
            "data": "thương"
          },
          {
            "startTime": 162480,
            "endTime": 162750,
            "data": "một"
          },
          {
            "startTime": 162750,
            "endTime": 163010,
            "data": "người"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 163010,
            "endTime": 163270,
            "data": "Say"
          },
          {
            "startTime": 163270,
            "endTime": 163800,
            "data": "đắm"
          },
          {
            "startTime": 163800,
            "endTime": 164070,
            "data": "nụ"
          },
          {
            "startTime": 164070,
            "endTime": 164870,
            "data": "cười"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 164870,
            "endTime": 165130,
            "data": "Dù"
          },
          {
            "startTime": 165130,
            "endTime": 165390,
            "data": "biết"
          },
          {
            "startTime": 165390,
            "endTime": 165670,
            "data": "trước"
          },
          {
            "startTime": 165670,
            "endTime": 165930,
            "data": "sẽ"
          },
          {
            "startTime": 165930,
            "endTime": 165930,
            "data": "không"
          },
          {
            "startTime": 165930,
            "endTime": 166200,
            "data": "thể"
          },
          {
            "startTime": 166200,
            "endTime": 166990,
            "data": "nào"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 166990,
            "endTime": 167520,
            "data": "Ở"
          },
          {
            "startTime": 167520,
            "endTime": 167790,
            "data": "đằng"
          },
          {
            "startTime": 167790,
            "endTime": 168050,
            "data": "sau"
          },
          {
            "startTime": 168050,
            "endTime": 168310,
            "data": "bầu"
          },
          {
            "startTime": 168310,
            "endTime": 168850,
            "data": "trời"
          },
          {
            "startTime": 168850,
            "endTime": 169110,
            "data": "gió"
          },
          {
            "startTime": 169110,
            "endTime": 169650,
            "data": "mưa"
          },
          {
            "startTime": 169650,
            "endTime": 170710,
            "data": "gào"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 170710,
            "endTime": 170970,
            "data": "Kỳ"
          },
          {
            "startTime": 170970,
            "endTime": 171240,
            "data": "vọng"
          },
          {
            "startTime": 171240,
            "endTime": 171510,
            "data": "như"
          },
          {
            "startTime": 171510,
            "endTime": 172050,
            "data": "thế"
          },
          {
            "startTime": 172050,
            "endTime": 172560,
            "data": "nào"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 172560,
            "endTime": 172830,
            "data": "Chẳng"
          },
          {
            "startTime": 172830,
            "endTime": 173100,
            "data": "thể"
          },
          {
            "startTime": 173100,
            "endTime": 173630,
            "data": "ở"
          },
          {
            "startTime": 173630,
            "endTime": 173900,
            "data": "bên"
          },
          {
            "startTime": 173900,
            "endTime": 174160,
            "data": "cạnh"
          },
          {
            "startTime": 174160,
            "endTime": 174430,
            "data": "em"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 174430,
            "endTime": 174950,
            "data": "Những"
          },
          {
            "startTime": 174950,
            "endTime": 175220,
            "data": "tháng"
          },
          {
            "startTime": 175220,
            "endTime": 175490,
            "data": "ngày"
          },
          {
            "startTime": 175490,
            "endTime": 176280,
            "data": "dài"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 176280,
            "endTime": 176820,
            "data": "Cố"
          },
          {
            "startTime": 176820,
            "endTime": 177080,
            "data": "chấp"
          },
          {
            "startTime": 177080,
            "endTime": 177350,
            "data": "biết"
          },
          {
            "startTime": 177350,
            "endTime": 177880,
            "data": "mình"
          },
          {
            "startTime": 177880,
            "endTime": 178680,
            "data": "sai"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 178680,
            "endTime": 178950,
            "data": "Vì"
          },
          {
            "startTime": 178950,
            "endTime": 179210,
            "data": "anh"
          },
          {
            "startTime": 179210,
            "endTime": 179750,
            "data": "có"
          },
          {
            "startTime": 179750,
            "endTime": 180010,
            "data": "một"
          },
          {
            "startTime": 180010,
            "endTime": 180270,
            "data": "nơi"
          },
          {
            "startTime": 180270,
            "endTime": 180800,
            "data": "phải"
          },
          {
            "startTime": 180800,
            "endTime": 181330,
            "data": "quay"
          },
          {
            "startTime": 181330,
            "endTime": 182130,
            "data": "về"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 182130,
            "endTime": 182660,
            "data": "Nơi"
          },
          {
            "startTime": 182660,
            "endTime": 182930,
            "data": "đây"
          },
          {
            "startTime": 182930,
            "endTime": 183200,
            "data": "chẳng"
          },
          {
            "startTime": 183200,
            "endTime": 183460,
            "data": "có"
          },
          {
            "startTime": 183460,
            "endTime": 183930,
            "data": "em"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 183930,
            "endTime": 184190,
            "data": "Chỉ"
          },
          {
            "startTime": 184190,
            "endTime": 184720,
            "data": "có"
          },
          {
            "startTime": 184720,
            "endTime": 184990,
            "data": "những"
          },
          {
            "startTime": 184990,
            "endTime": 185260,
            "data": "mong"
          },
          {
            "startTime": 185260,
            "endTime": 185790,
            "data": "chờ"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 185790,
            "endTime": 185790,
            "data": "Tất"
          },
          {
            "startTime": 185790,
            "endTime": 186060,
            "data": "cả"
          },
          {
            "startTime": 186060,
            "endTime": 186330,
            "data": "chỉ"
          },
          {
            "startTime": 186330,
            "endTime": 186590,
            "data": "là"
          },
          {
            "startTime": 186590,
            "endTime": 186590,
            "data": "anh"
          },
          {
            "startTime": 186590,
            "endTime": 186860,
            "data": "ảo"
          },
          {
            "startTime": 186860,
            "endTime": 187120,
            "data": "tưởng"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 187120,
            "endTime": 187120,
            "data": "Sau"
          },
          {
            "startTime": 187120,
            "endTime": 187390,
            "data": "những"
          },
          {
            "startTime": 187390,
            "endTime": 187390,
            "data": "lần"
          },
          {
            "startTime": 187390,
            "endTime": 187660,
            "data": "muộn"
          },
          {
            "startTime": 187660,
            "endTime": 187920,
            "data": "đôi"
          },
          {
            "startTime": 187920,
            "endTime": 187920,
            "data": "ta"
          },
          {
            "startTime": 187920,
            "endTime": 188180,
            "data": "gặp"
          },
          {
            "startTime": 188180,
            "endTime": 188710,
            "data": "nhau"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 188710,
            "endTime": 188710,
            "data": "Anh"
          },
          {
            "startTime": 188710,
            "endTime": 188980,
            "data": "ngỡ"
          },
          {
            "startTime": 188980,
            "endTime": 189240,
            "data": "chung"
          },
          {
            "startTime": 189240,
            "endTime": 189240,
            "data": "đôi"
          },
          {
            "startTime": 189240,
            "endTime": 189510,
            "data": "kề"
          },
          {
            "startTime": 189510,
            "endTime": 189780,
            "data": "bước"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 189780,
            "endTime": 189780,
            "data": "Sẽ"
          },
          {
            "startTime": 189780,
            "endTime": 190040,
            "data": "sớm"
          },
          {
            "startTime": 190040,
            "endTime": 190040,
            "data": "khiến"
          },
          {
            "startTime": 190040,
            "endTime": 190310,
            "data": "mình"
          },
          {
            "startTime": 190310,
            "endTime": 190570,
            "data": "chung"
          },
          {
            "startTime": 190570,
            "endTime": 190570,
            "data": "nhà"
          },
          {
            "startTime": 190570,
            "endTime": 190840,
            "data": "thật"
          },
          {
            "startTime": 190840,
            "endTime": 191910,
            "data": "mau"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 191910,
            "endTime": 192180,
            "data": "Nên"
          },
          {
            "startTime": 192180,
            "endTime": 192180,
            "data": "mỗi"
          },
          {
            "startTime": 192180,
            "endTime": 192440,
            "data": "ngày"
          },
          {
            "startTime": 192440,
            "endTime": 192710,
            "data": "gửi"
          },
          {
            "startTime": 192710,
            "endTime": 192710,
            "data": "tâm"
          },
          {
            "startTime": 192710,
            "endTime": 192960,
            "data": "tư"
          },
          {
            "startTime": 192960,
            "endTime": 192960,
            "data": "vào"
          },
          {
            "startTime": 192960,
            "endTime": 193230,
            "data": "một"
          },
          {
            "startTime": 193230,
            "endTime": 193760,
            "data": "chút"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 193760,
            "endTime": 193760,
            "data": "Nhưng"
          },
          {
            "startTime": 193760,
            "endTime": 194020,
            "data": "tất"
          },
          {
            "startTime": 194020,
            "endTime": 194290,
            "data": "cả"
          },
          {
            "startTime": 194290,
            "endTime": 194290,
            "data": "do"
          },
          {
            "startTime": 194290,
            "endTime": 194560,
            "data": "tự"
          },
          {
            "startTime": 194560,
            "endTime": 194830,
            "data": "anh"
          },
          {
            "startTime": 194830,
            "endTime": 194830,
            "data": "tạo"
          },
          {
            "startTime": 194830,
            "endTime": 195090,
            "data": "ra"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 195090,
            "endTime": 195360,
            "data": "Nên"
          },
          {
            "startTime": 195360,
            "endTime": 195360,
            "data": "nhận"
          },
          {
            "startTime": 195360,
            "endTime": 195620,
            "data": "lại"
          },
          {
            "startTime": 195620,
            "endTime": 195880,
            "data": "niềm"
          },
          {
            "startTime": 195880,
            "endTime": 196160,
            "data": "đau"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 196160,
            "endTime": 196420,
            "data": "Chỉ"
          },
          {
            "startTime": 196420,
            "endTime": 196420,
            "data": "vì"
          },
          {
            "startTime": 196420,
            "endTime": 196680,
            "data": "cố"
          },
          {
            "startTime": 196680,
            "endTime": 196950,
            "data": "chấp"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 196950,
            "endTime": 197210,
            "data": "Nên"
          },
          {
            "startTime": 197210,
            "endTime": 197210,
            "data": "anh"
          },
          {
            "startTime": 197210,
            "endTime": 197470,
            "data": "vẫn"
          },
          {
            "startTime": 197470,
            "endTime": 197470,
            "data": "cứ"
          },
          {
            "startTime": 197470,
            "endTime": 197760,
            "data": "nghĩ"
          },
          {
            "startTime": 197760,
            "endTime": 198010,
            "data": "đây"
          },
          {
            "startTime": 198010,
            "endTime": 198270,
            "data": "là"
          },
          {
            "startTime": 198270,
            "endTime": 198810,
            "data": "yêu"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 198810,
            "endTime": 198810,
            "data": "Em"
          },
          {
            "startTime": 198810,
            "endTime": 199070,
            "data": "vui"
          },
          {
            "startTime": 199070,
            "endTime": 199340,
            "data": "với"
          },
          {
            "startTime": 199340,
            "endTime": 199600,
            "data": "anh"
          },
          {
            "startTime": 199600,
            "endTime": 199600,
            "data": "nhiều"
          },
          {
            "startTime": 199600,
            "endTime": 199800,
            "data": "lúc"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 199800,
            "endTime": 200060,
            "data": "Nhưng"
          },
          {
            "startTime": 200060,
            "endTime": 200060,
            "data": "không"
          },
          {
            "startTime": 200060,
            "endTime": 200340,
            "data": "bao"
          },
          {
            "startTime": 200340,
            "endTime": 200610,
            "data": "giờ"
          },
          {
            "startTime": 200610,
            "endTime": 200870,
            "data": "hỏi"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 200870,
            "endTime": 200870,
            "data": "How"
          },
          {
            "startTime": 200870,
            "endTime": 201140,
            "data": "I"
          },
          {
            "startTime": 201140,
            "endTime": 201670,
            "data": "feel"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 201670,
            "endTime": 201940,
            "data": "Anh"
          },
          {
            "startTime": 201940,
            "endTime": 201940,
            "data": "nói"
          },
          {
            "startTime": 201940,
            "endTime": 202200,
            "data": "anh"
          },
          {
            "startTime": 202200,
            "endTime": 202460,
            "data": "ổn"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 202460,
            "endTime": 202460,
            "data": "Nhưng"
          },
          {
            "startTime": 202460,
            "endTime": 202730,
            "data": "khi"
          },
          {
            "startTime": 202730,
            "endTime": 202730,
            "data": "một"
          },
          {
            "startTime": 202730,
            "endTime": 202990,
            "data": "mình"
          },
          {
            "startTime": 202990,
            "endTime": 203260,
            "data": "đêm"
          },
          {
            "startTime": 203260,
            "endTime": 203790,
            "data": "đen"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 203790,
            "endTime": 204060,
            "data": "Căn"
          },
          {
            "startTime": 204060,
            "endTime": 204060,
            "data": "phòng"
          },
          {
            "startTime": 204060,
            "endTime": 204330,
            "data": "tràn"
          },
          {
            "startTime": 204330,
            "endTime": 204330,
            "data": "ngập"
          },
          {
            "startTime": 204330,
            "endTime": 204860,
            "data": "hơi"
          },
          {
            "startTime": 204860,
            "endTime": 205120,
            "data": "men"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 205120,
            "endTime": 205380,
            "data": "Tâm"
          },
          {
            "startTime": 205380,
            "endTime": 205650,
            "data": "trí"
          },
          {
            "startTime": 205650,
            "endTime": 205650,
            "data": "tự"
          },
          {
            "startTime": 205650,
            "endTime": 205910,
            "data": "nhủ"
          },
          {
            "startTime": 205910,
            "endTime": 206180,
            "data": "quên"
          },
          {
            "startTime": 206180,
            "endTime": 206450,
            "data": "em"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 206450,
            "endTime": 206710,
            "data": "Nhưng"
          },
          {
            "startTime": 206710,
            "endTime": 206990,
            "data": "lòng"
          },
          {
            "startTime": 206990,
            "endTime": 206990,
            "data": "vẫn"
          },
          {
            "startTime": 206990,
            "endTime": 207240,
            "data": "không"
          },
          {
            "startTime": 207240,
            "endTime": 207510,
            "data": "thể"
          },
          {
            "startTime": 207510,
            "endTime": 207510,
            "data": "quên"
          },
          {
            "startTime": 207510,
            "endTime": 208510,
            "data": "em"
          }
        ]
      }
    ]
  }`;

lyrics = JSON.parse(lyrics);
console.log(lyrics);

var karaoke = document.querySelector(".karaoke");

var openKaraokeBtn = document.querySelector(".open-karaoke");
openKaraokeBtn.addEventListener("click", function () {
  karaoke.style.translate = "0 0";
});

var closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", function () {
  karaoke.style.translate = "0 100%";
});

var topLyric = document.querySelector(".top");
var bottomLyric = document.querySelector(".bottom");
topLyric.innerText = lyrics.title;
bottomLyric.innerText = lyrics.author;

var displayLyrics = function () {
  var currentTime = audio.currentTime;

  for (var i = 0; i < lyrics.lyrics.length; i += 2) {
    var currentLyric = lyrics.lyrics[i];
    var nextLyric = lyrics.lyrics[i + 1];
    if (
      currentTime >= currentLyric.words[0].startTime / 1000 - 0.2 &&
      currentTime <= nextLyric.words[nextLyric.words.length - 1].endTime / 1000
    ) {
      var lyricText = "";
      var lyricText2 = "";
      for (var j = 0; j < currentLyric.words.length; j++) {
        lyricText += currentLyric.words[j].data + " ";
      }
      for (var k = 0; k < nextLyric.words.length; k++) {
        lyricText2 += nextLyric.words[k].data + " ";
      }
      topLyric.innerText = lyricText;
      bottomLyric.innerText = lyricText2;
    }
  }
};

audio.addEventListener("timeupdate", displayLyrics);
