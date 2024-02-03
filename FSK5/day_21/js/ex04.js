function sortArray(arr) {
  var mid = 0;
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        mid = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = mid;
      }
    }
  }
  return arr;
}

function insertNum(arr, num) {
  var index = 0;
  for (var i = 0; i < arr.length; i++) {
    if (num > arr[i]) {
      index = i + 1;
    }
  }
  for (i = arr.length; i > index; i--) {
    arr[i] = arr[i - 1];
  }
  arr[index] = num;
  return arr;
}

var arr = [1, 3, 5, 4, 2];
var number = 3;
console.log(insertNum(sortArray(arr), number));
