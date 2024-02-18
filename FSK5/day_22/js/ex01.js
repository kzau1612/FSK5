var arrA = [1, 4, 3, 2];
var arrB = [5, 2, 6, 7, 1];

var result = [];
for (var i = 0; i < arrA.length; i++) {
  arrB.forEach((number) => {
    if (number === arrA[i]) {
      result.push(number);
    }
  });
}
console.log(result);
