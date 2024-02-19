var arr = [
  {
    img: "https://picsum.photos/200",
    title: "title 1",
    desc: "desc 1",
  },
  {
    img: "https://picsum.photos/200",
    title: "title 2",
    desc: "desc 2",
  },
  {
    img: "https://picsum.photos/200",
    title: "title 3",
    desc: "desc 3",
  },
];

var container = document.querySelector(".container");
console.log(container);
arr.map(function (item) {
  var div = document.createElement("div");
  div.className = "item";
  div.innerHTML = ` <img src=${item.img} alt="img" />
  <div class="content">
    <span class="title">${item.title}</span>
    <p class="desc">${item.desc}</p>
  </div>`;
  container.appendChild(div);
});
