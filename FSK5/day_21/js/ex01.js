var a = [2, 1, 0, 3, 7, 5];
var min = a[0];
var max = a[0];
var maxIndex = 0;
var minIndex = 0;
for (var i = 0; i < a.length; i++) {
  if (max < a[i]) {
    max = a[i];
    maxIndex = i;
  }
  if (min > a[i]) {
    min = a[i];
    minIndex = i;
  }
}
console.log(a);
console.log(`max la: ${max} tai vi tri ${maxIndex}`);
console.log(`min la ${min} tai vi tri ${minIndex}`);
