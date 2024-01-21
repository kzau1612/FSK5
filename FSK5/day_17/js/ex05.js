var a = 3;
var b = -4;
var c = 0;

var arr = [a, b, c];
console.log(arr);
for (let i = 0; i < arr.length - 1; i++) {
  for (let j = 0; j < arr.length - 1; j++) {
    if (arr[j] > arr[j + 1]) {
      let mid = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = mid;
    }
  }
}

console.log(arr);
