var p = document.querySelector("p");
var arr = p.innerText.split(" ");

var index = 0;

p.innerHTML = "";
for (var i of arr) {
  var span = document.createElement("span");
  span.innerHTML = i + " ";
  p.appendChild(span);
}

console.log(p.children.length);
function changeColor() {
  var spans = document.querySelectorAll("span");
  if (index > 0) {
    spans[index - 1].style.color = "";
  }
  spans[index].style.color = "red";
  index = (index + 1) % spans.length;
}

// changeColor();
setInterval(changeColor, 500);
