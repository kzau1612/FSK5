let lastSecond = null;
let counter = document.querySelector(".counter");
let btn = document.querySelector(".btn");

function updateSeconds() {
  const d = new Date();
  let seconds = d.getSeconds();

  if (seconds !== lastSecond) {
    lastSecond = seconds;
    counter.innerText = counter.innerText - 1;
    if (counter.innerText <= 0) {
      btn.disabled = false;
      return;
    }
  }

  requestAnimationFrame(updateSeconds);
}

updateSeconds();

btn.addEventListener("click", () => {
  window.location.href = "https://fullstack.edu.vn/";
});
