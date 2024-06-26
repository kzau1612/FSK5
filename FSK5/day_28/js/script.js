var carousel = document.querySelector(".carousel");
var carouselImages = document.querySelector(".carousel-images");
var carouselNextBtn = document.querySelector(".next");
var carouselPrevBtn = document.querySelector(".prev");
var carouselItems = carouselImages.children;
var carouselDots = document.querySelector(".carousel-dots");
var index = 0;
var activeIndex;

// console.log(carousel);
// console.log(carouselItems);
// console.log(carouselNextBtn);
// console.log(carouselPrevBtn);

//Tính kích thước chiều rộng của 1 item
var itemWidth = carouselImages.clientWidth;
console.log(itemWidth);

//Tính tổng kích thước các item
var totalWidth = itemWidth * carouselItems.length;
console.log(totalWidth);

//Cập nhật css cho carousel-image
carouselImages.style.width = `${totalWidth}px`;

//Lắng nghe sự kiện click vào nút next
var translateX = 0;
carouselNextBtn.addEventListener("click", function () {
  if (Math.abs(translateX) >= totalWidth - itemWidth) {
    return;
  }
  translateX -= itemWidth;
  index++;
  lastPos = translateX;
  setActiveDot();
  carouselImages.style.translate = `${translateX}px`;
});

//Lắng nghe sự kiện click vào nút prev
carouselPrevBtn.addEventListener("click", function () {
  if (Math.abs(translateX) < itemWidth) {
    return;
  }
  translateX += itemWidth;
  // console.log(translateX);
  index--;
  lastPos = translateX;
  setActiveDot();
  carouselImages.style.translate = `${translateX}px`;
});

//Tạo nút dots
for (let i = 0; i < carouselItems.length; i++) {
  var span = document.createElement("span");
  carouselDots.appendChild(span);
}

//Xử lí click dot

var dots = carouselDots.querySelectorAll("span");
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    translateX = -1 * itemWidth * i;
    index = i;
    lastPos = translateX;
    setActiveDot();
    carouselImages.style.translate = `${translateX}px`;
  });
});

//keo tha
var startPos = 0;
var lastPos = 0;
var x = 0;
var handleDrag = function (e) {
  x = startPos - e.clientX;
  if ((index == 0 && x < 0) || (index === carouselItems.length - 1 && x > 0)) {
    return;
  }
  carouselImages.style.translate = `${lastPos - x}px`;

  if (e.clientX <= startPos - 300) {
    carouselImages.style.transition = "translate 0.3s linear";
    document.removeEventListener("mousemove", handleDrag);
    translateX -= itemWidth;
    lastPos = translateX;
    index++;
    setActiveDot();
    carouselImages.style.translate = `${translateX}px`;
  }
  if (e.clientX >= startPos + 300) {
    carouselImages.style.transition = "translate 0.3s linear";
    document.removeEventListener("mousemove", handleDrag);

    translateX += itemWidth;
    lastPos = translateX;
    index--;
    setActiveDot();
    carouselImages.style.translate = `${translateX}px`;
  }
};

document.addEventListener("mousedown", (e) => {
  carouselImages.style.transition = "none";
  startPos = e.clientX;
  document.addEventListener("mousemove", handleDrag);
});

document.addEventListener("mouseup", (e) => {
  if (e.clientX > startPos - 300 || e.clientX < startPos + 300) {
    carouselImages.style.transition = "translate 0.3s linear";
    carouselImages.style.translate = `${translateX}px`;
  }
  document.removeEventListener("mousemove", handleDrag);
});

//Xử lí active
function setActiveDot() {
  var activeDots = carouselDots.querySelector(".active");
  if (activeDots) {
    activeDots.classList.remove("active");
  }
  dots[index].classList.add("active");
  activeIndex = index;
}

setActiveDot();

//     var currentActive = carouselDots.querySelector("active");
//   });
// }
