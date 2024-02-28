Array.prototype.filter2 = function (callback) {
  const output = [];
  if (typeof callback !== "function") {
    return "Không phải là 1 function";
  }
  let arrLength = this.length;
  for (let i = 0; i < arrLength; i++) {
    let result = callback(this[i], i, this);
    if (result) {
      output.push(this[i]);
    }
  }
  return output;
};

var arr = [1, 2, 3, 4, 5];
var odds = arr.filter2((num) => num % 2 !== 0);
console.log(odds);
