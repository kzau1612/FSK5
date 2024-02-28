Object.prototype.getCurrency = function (unit) {
  if (Array.isArray(this) || this.constructor.name === "Boolean") {
    return "Số không hợp lệ";
  }

  var value = +this;
  console.log(value);
  if (
    Math.abs(value) === Infinity ||
    isNaN(value) ||
    typeof value !== "number"
  ) {
    return "Số không hợp lệ";
  }

  return value.toLocaleString("en-US") + " " + unit;
};

var price = "120000";
console.log(price.getCurrency("đ"));
