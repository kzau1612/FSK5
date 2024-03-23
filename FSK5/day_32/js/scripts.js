var list = document.querySelector(".list");
var items = document.querySelectorAll(".item");
var dragElement;
var dragChild;

items.forEach(function (item) {
  item.addEventListener("dragover", function (e) {
    e.preventDefault();
  });
  item.addEventListener("drop", function (e) {
    e.preventDefault();
    var target = e.currentTarget;
  });
});

var addEvent = function (e) {
  e.addEventListener("dragstart", onStart);
  e.addEventListener("dragover", function (e) {
    e.preventDefault();
  });
  e.addEventListener("drop", onDrop);
};

var onStart = function (e) {
  dragElement = e.currentTarget;
  e.currentTarget.classList.add("ghost");
  dragChild = e.currentTarget.children[0];
};

var onDrop = function (e) {
  var targetElement = e.currentTarget;
  var targetChild = e.currentTarget.children[0];
  var dragElementClone = dragElement.cloneNode(true);
  var targetElementClone = targetElement.cloneNode(true);

  targetElement.replaceWith(dragElementClone);
  dragElement.replaceWith(targetElementClone);

  dragElementClone.classList.remove("ghost");

  if (
    targetChild.innerText.includes("Bài") &&
    dragChild.innerText.includes("Bài")
  ) {
    dragElementClone.children[0].replaceWith(targetChild);
    targetElementClone.children[0].replaceWith(dragChild);
    console.log(dragElementClone);
  }

  addEvent(targetElementClone);
  addEvent(dragElementClone);
};

items.forEach(function (item) {
  addEvent(item);
});
