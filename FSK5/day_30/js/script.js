var productTable = document.querySelector("#product-table");
var cartTable = document.querySelector("#cart-table");
var tbody = cartTable.querySelector("tbody");
var totalRow = cartTable.querySelector(".total");
var cart = document.querySelector(".cart");
var deleteBtn = document.querySelector(".delete-cart");
var updateBtn = document.querySelector(".update-cart");
var text = document.querySelector(".text");
var totalPrice = 0;

productTable.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn")) {
    var totalQuantity = 0;
    var totalPrice = 0;
    var tr = e.target.closest("tr");
    var stt = tr.children[0].innerText;
    var name = tr.children[1].innerText;
    var quantity = e.target.previousElementSibling.value;
    var price = tr.children[2].innerText;
    var cartItem = tbody.querySelector(`.quantity[data-id="${stt}"]`);
    if (cartItem) {
      var oldQuantity = +cartItem.value;
      var newQuantity = oldQuantity + +quantity;
      cartItem.value = newQuantity;
      cartItem.setAttribute("value", newQuantity);
      cartItem.parentElement.nextElementSibling.innerText = newQuantity * price;
      updateStatus();
    } else {
      cart.style.display = "block";
      text.style.display = "none";
      var cart_tr = document.createElement("tr");
      cart_tr.innerHTML = `
        <td>${stt}</td>
        <td>${name}</td>
        <td class="price">${price}</td>
        <td><input type="number" class="quantity" data-id="${stt}" value="${quantity}" /></td>
        <td >${quantity * price}</td>
        <td><button class="delete-item">Xóa</button></td>`;
      tbody.insertBefore(cart_tr, totalRow);
      updateStatus();
    }
  }
});

cartTable.addEventListener("click", function (e) {
  confirm("Are you sure?");
  if (e.target.classList.contains("delete-item")) {
    var tr = e.target.closest("tr");
    tr.remove();
    updateStatus();
  }
});

function updateStatus() {
  totalPrice = 0;
  var totalQuantity = 0;
  var rows = tbody.querySelectorAll("tr");
  rows.forEach(function (row, index) {
    if (index !== rows.length - 1) {
      var quantity = row.querySelector(".quantity");
      var price = row.querySelector(".price");
      quantity = +quantity.value;
      price = +price.innerText;

      if (quantity <= 0) {
        row.remove();
      } else {
        row.children[0].innerText = index + 1;
        row.children[4].innerText = price * quantity;
        totalQuantity += quantity;
        totalPrice += price * quantity;
      }
    } else {
      row.children[1].innerText = totalQuantity;
      row.children[2].innerText = totalPrice;
    }
  });
}

updateBtn.addEventListener("click", function () {
  updateStatus();
  alert("Cập nhật giỏ hàng thành công");
});
deleteBtn.addEventListener("click", function () {
  confirm("Are you sure?");
  var rows = tbody.querySelectorAll("tr");
  rows.forEach(function (row, index) {
    if (index !== rows.length - 1) {
      row.remove();
    }
  });
  cart.style.display = "none";
  text.style.display = "block";
});
