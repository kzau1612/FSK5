const btn = document.querySelector("button");

btn.addEventListener("mousedown", () => {
  btn.style.backgroundColor = "green";
});

btn.addEventListener("mouseup", () => {
  btn.style.backgroundColor = "red";
});
