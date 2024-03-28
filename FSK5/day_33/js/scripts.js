var fileSelect = document.querySelector(".file-select");
var fileList = document.querySelector(".file-list");
var filename = document.querySelector(".file-name");

filename.value = "Untitle";

fileSelect.addEventListener("click", function () {
  fileList.classList.toggle("hidden");
  if (!fileList.classList.contains("hidden")) {
    fileSelect.style.backgroundColor = "#0b5ed7";
  } else {
    fileSelect.style.backgroundColor = "#0d6efd";
  }
});
