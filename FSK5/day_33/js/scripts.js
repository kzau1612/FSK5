var fileSelect = document.querySelector(".file-select");
var fileList = document.querySelector(".file-list");
var filename = document.querySelector(".file-name");
var selectedText;

filename.value = "Untitle";

fileSelect.addEventListener("click", function () {
  fileList.classList.toggle("hidden");
  if (!fileList.classList.contains("hidden")) {
    fileSelect.style.backgroundColor = "#0b5ed7";
  } else {
    fileSelect.style.backgroundColor = "#0d6efd";
  }
});

var content = document.querySelector("#content");

window.addEventListener("mouseup", () => {
  var selectedText = window.getSelection().toString().trim();
  console.log(selectedText);
});

var boldBtn = document.querySelector("#bold-btn");
boldBtn.addEventListener("click", function () {
  document.execCommand("bold");
});

var italicBtn = document.querySelector("#italic-btn");
italicBtn.addEventListener("click", function () {
  document.execCommand("italic");
});

var underlineBtn = document.querySelector("#underline-btn");
underlineBtn.addEventListener("click", function () {
  document.execCommand("underline");
});

var colorBtn = document.querySelector("#color-btn");
colorBtn.addEventListener("click", function () {
  var color = document.querySelector("#color").value;
  document.execCommand("foreColor", false, color);
});

var row = document.querySelector(".row");
var letterNum = row.children[0];
var wordNum = row.children[1];
content.addEventListener("input", function () {
  var text = content.innerText.trim();
  letterNum.innerText = "Số kí tự: " + text.length;
  wordNum.innerText = "Số từ: " + text.split(" ").length;
});
