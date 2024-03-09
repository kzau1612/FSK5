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
  setActiveDot();
  carouselImages.style.translate = `${translateX}px`;
});

//Tạo nút dots
for (let i = 0; i < carouselItems.length; i++) {
  var span = document.createElement("span");
  carouselDots.appendChild(span);
}

//Xử lí active

function setActiveDot() {
  var dots = carouselDots.querySelectorAll("span");
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
