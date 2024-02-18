var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];

var newArr = arr
  .toString()
  .split(",")
  .map(function (number) {
    return +number;
  });

console.log(newArr);
