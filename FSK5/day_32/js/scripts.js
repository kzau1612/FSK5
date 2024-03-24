var list = document.querySelector(".list");
var items = document.querySelectorAll(".item");
var dragElement;
var dragChild;

list.addEventListener("mousedown", function (e) {
  if (e.target.className === "list") {
    e.preventDefault();
  }
});

list.addEventListener("dragend", function (e) {
  dragElement.classList.remove("ghost");
});

var addEvent = function (e) {
  e.addEventListener("dragstart", onStart);
  e.addEventListener("dragover", onDrag);
  e.addEventListener("drop", onDrop);
};

var onStart = function (e) {
  dragElement = e.currentTarget;
  e.currentTarget.classList.add("ghost");
  dragChild = e.currentTarget.children[0];
};

var onDrag = function (e) {
  e.preventDefault();
  targetElement = e.currentTarget;
  var targetRect = targetElement.getBoundingClientRect();

  var clientY = e.clientY;
  var targetTop = targetRect.top;
  var relativeY = clientY - targetTop;

  if (relativeY < targetRect.height / 2) {
    list.insertBefore(dragElement, targetElement);
  } else {
    list.insertBefore(dragElement, targetElement.nextSibling);
  }
};

var onDrop = function (e) {
  dragElement.classList.remove("ghost");
  items = document.querySelectorAll(".item");

  var count = 1;
  var count2 = 1;
  items.forEach(function (item) {
    if (item.children[0].innerText.includes("Bài")) {
      item.children[0].innerText = "Bài " + count + ":";
      count++;
    } else {
      item.children[0].innerText = "Module " + count2 + ":";
      count2++;
    }
  });
};

items.forEach(function (item) {
  addEvent(item);
});
