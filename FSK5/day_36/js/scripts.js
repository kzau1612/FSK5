const btn = document.querySelector("button");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

const recognition = new SpeechRecognition();
const recognitionList = new SpeechGrammarList();

// Đặt một số thuộc tính cho việc nhận diện
recognition.continuous = false;
recognition.lang = "vi-VN"; // Sử dụng tiếng Việt
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Bắt đầu nhận diện khi màn hình được nhấp vào

btn.addEventListener("click", () => {
  btn.style.backgroundColor = "green";
  recognition.start();
  console.log("Sẵn sàng nhận lệnh bằng giọng nói.");
});

btn.addEventListener("mouseup", () => {});

// Xử lý sự kiện kết quả
recognition.onresult = (event) => {
  // Lấy chuỗi văn bản đã nhận diện được
  const rawText = event.results[0][0].transcript;
  // Xử lý chuỗi văn bản để biết được người dùng vừa đọc gì
  text = rawText.toLowerCase();
  console.log(text);

  if (text.includes("google")) {
    window.open("https://www.google.com", "_blank");
  } else if (text.includes("facebook")) {
    window.open("https://www.facebook.com", "_blank");
  } else if (text.includes("youtube")) {
    window.open("https://www.youtube.com", "_blank");
  } else if (text.includes("google drive")) {
    window.open("https://drive.google.com", "_blank");
  } else if (text.includes("google maps")) {
    window.open("https://www.google.com/maps", "_blank");
  } else if (text.includes("chỉ đường" || "tới" || "đường tới")) {
    // console.log("ok");
    const keywords = ["chỉ đường", "tới", "đường tới"];
    keywords.forEach((keyword) => {
      if (text.includes(keyword)) {
        let location = text.slice(text.indexOf(keyword) + keyword.length + 1);
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
        window.open(url, "_blank");
      }
    });
  } else if (text.includes("bài hát")) {
    const keyword = "bài hát";
    let song = text.slice(text.indexOf(keyword) + keyword.length + 1);
    const url = `https://zingmp3.vn/tim-kiem/bai-hat?q=${encodeURIComponent(song)}`;
    window.open(url, "_blank");
  } else if (text.includes("video")) {
    const keyword = "video";
    let video = text.slice(text.indexOf(keyword) + keyword.length + 1);
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(video)}`;
    window.open(url, "_blank");
  }
};

// Dừng nhận diện khi giọng nói kết thúc
recognition.onspeechend = () => {
  btn.style.backgroundColor = "red";

  recognition.stop();
};
