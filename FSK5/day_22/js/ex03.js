var arr = [
  ["a", 1, true],
  ["b", 2, false],
];

var stringArr = [];
var numberArr = [];
var booleanArr = [];

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
  });
});

var newArr = [];
newArr.push(stringArr, numberArr, booleanArr);
console.log(newArr);
