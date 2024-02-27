Array.prototype.reduce2 = function (callback, initialValue) {
  let arrLength = this.length;
  let acc = initialValue;
  let i = 0;
  if (acc === undefined) {
    i = 1;
    acc = this[0];
  }
  for (i; i < arrLength; i++) {
    acc = callback(acc, this[i], i, this);
  }
  return acc;
};

const arr = [1, 2, 3, 4, 5];
let sum = arr.reduce2(function (acc, value) {
  return acc + value;
});
console.log(sum);
