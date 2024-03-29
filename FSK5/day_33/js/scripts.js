var fileSelect = document.querySelector(".file-select");
var fileList = document.querySelector(".file-list");
var input = document.querySelector(".file-name__input");
var fileName;
var selectedText;
var newBtn = fileList.children[0];
var txtBtn = fileList.children[1];
var pdfBtn = fileList.children[2];

input.value = "Untitle";
fileName = input.value;

fileSelect.addEventListener("click", function () {
  fileList.classList.toggle("hidden");
  if (!fileList.classList.contains("hidden")) {
    fileSelect.style.backgroundColor = "#0b5ed7";
  } else {
    fileSelect.style.backgroundColor = "#0d6efd";
  }
});

var content = document.querySelector("#content");
var contentText;
var contentHtml;

// window.addEventListener("mouseup", () => {
//   var selectedText = window.getSelection().toString().trim();
// });

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
colorBtn.addEventListener("change", function () {
  var color = colorBtn.value;
  console.log(color);
  document.execCommand("foreColor", false, color);
});

var row = document.querySelector(".row");
var letterNum = row.children[0];
var wordNum = row.children[1];

content.addEventListener("input", function () {
  var text = content.innerText.trim();
  var textConvertedSpace = text.replace(/\s+/g, " ");
  letterNum.innerText = "Số kí tự: " + text.length;
  wordNum.innerText = "Số từ: " + textConvertedSpace.split(" ").length;
  contentText = content.innerText;
  contentHtml = content.innerHTML;
});

input.addEventListener("input", function () {
  fileName = input.value;
});

newBtn.addEventListener("click", function () {
  content.innerText = "";
  input.value = "Untitle";
  fileList.classList.toggle("hidden");
});

txtBtn.addEventListener("click", function () {
  fileList.classList.toggle("hidden");
  var blob = new Blob([contentText]);
  var blobUrl = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = blobUrl;
  a.download = `${fileName}.txt`;
  a.click();
});

pdfBtn.addEventListener("click", function () {
  fileList.classList.toggle("hidden");
  var option = {
    filename: `${fileName}.pdf`,
  };
  html2pdf(contentHtml, option);
});
