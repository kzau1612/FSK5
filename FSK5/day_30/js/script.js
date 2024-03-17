var productTable = document.querySelector("#product-table");
var cartTable = document.querySelector("#cart-table");
var tbody = cartTable.querySelector("tbody");
var totalRow = cartTable.querySelector(".total");

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
      cartItem.parentElement.nextElementSibling.innerText = newQuantity * price;
      getTotalPriceAndValue(totalQuantity, totalPrice);
    } else {
      var cart_tr = document.createElement("tr");
      cart_tr.innerHTML = `
        <td>${stt}</td>
        <td>${name}</td>
        <td>${price}</td>
        <td><input type="number" class="quantity" data-id="${stt}" value="${quantity}" /></td>
        <td class="price">${quantity * price}</td>
        <td><button class="delete-item">Xóa</button></td>`;
      tbody.insertBefore(cart_tr, totalRow);
      getTotalPriceAndValue(totalQuantity, totalPrice);
    }
  }
});

function getTotalPriceAndValue(totalQuantity, totalPrice) {
  var allQuantity = tbody.querySelectorAll(".quantity");
  var allPrice = tbody.querySelectorAll(".price");
  allQuantity.forEach(function (item) {
    totalQuantity += +item.value;
  });
  allPrice.forEach(function (item) {
    totalPrice += +item.innerText;
  });
  totalRow.children[1].innerText = totalQuantity;
  totalRow.children[2].innerText = totalPrice;
}
