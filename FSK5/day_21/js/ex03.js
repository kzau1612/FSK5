function removeDup(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr[j] = arr[arr.length - 1];
        arr.length--;
        console.log(arr);
        j--;
      }
    }
  }
  return arr;
}

var arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
console.log(removeDup(arr));
