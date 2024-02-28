Array.prototype.push2 = function (...values) {
  if (!Array.isArray(this)) {
    console.log("Không phải array");
  } else {
    for (var i = 0; i < values.length; i++) {
      this[this.length] = values[i];
    }
  }
  return this;
};

var arr = [1, 2, 3, 4];
arr.push2(5, 6, 7);
console.log(arr);
