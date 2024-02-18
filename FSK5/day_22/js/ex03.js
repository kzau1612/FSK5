var arr = [
  ["a", 1, true],
  ["b", 2, false],
];

var stringArr = [];
var numberArr = [];
var booleanArr = [];
var nullArr = [];
var undefinedArr = [];
var objectArr = [];

arr.forEach(function (element) {
  element.forEach(function (innerElement) {
    if (typeof innerElement === "string") {
      stringArr.push(innerElement);
    }
    if (typeof innerElement === "number") {
      numberArr.push(innerElement);
    }
    if (typeof innerElement === "boolean") {
      booleanArr.push(innerElement);
    }
    if (innerElement === null) {
      nullArr.push(innerElement);
    }
    if (typeof innerElement === "undefined") {
      undefinedArr.push(innerElement);
    }
    if (typeof innerElement === "object") {
      objectArr.push(innerElement);
    }
  });
});

var newArr = [];
var result = [];
newArr.push(stringArr, numberArr, booleanArr, nullArr, undefinedArr, objectArr);
newArr.forEach(function (arr) {
  if (arr.length !== 0) {
    result.push(arr);
  }
});

console.log(result);
