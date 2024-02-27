Object.prototype.getCurrency = function (unit) {
  if (Array.isArray(this) || this.constructor.name === "Boolean") {
    return "Số không hợp lệ";
  }
  let value = this.toString();
  console.log(value);
  let count = 0;
  let arr = [];
  value = value.split("");

  for (let i = value.length - 1; i >= 0; i--) {
    if (+value[i] === Infinity || +value[i] === Infinity || isNaN(+value[i])) {
      return "Số không hợp lệ";
    }
    arr.unshift(value[i]);
    count++;
    if (count === 3) {
      arr.unshift(",");
      console.log(arr);
      count = 0;
    }
  }
  arr = arr.join("");
  if (arr[0] === ",") {
    arr = arr.slice(1);
  }
  console.log(arr);

  return arr + unit;
};

var price = "12000";
console.log(price.getCurrency("đ"));

var price = 12000;
console.log(price.getCurrency("d"));
