var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var a2 = [1, 4, 6, 8, 10, 14];
var total = 0;
var count = 0;
var result = 0;
function isPrime(number) {
  if (
    number % 1 !== 0 ||
    number < 2 ||
    (number % 2 === 0 && number !== 2) ||
    (number % 3 === 0 && number !== 3)
  )
    return false;
  for (let i = 5; i <= Math.sqrt(number); i += 2)
    if (number % i === 0) return false;
  return true;
}

for (var i = 0; i < a.length; i++) {
  if (isPrime(a[i])) {
    total += a[i];
    count++;
  }
}

if (count === 0) {
  console.log("Không có số nguyên tố");
} else {
  result = total / count;
  console.log(total);
  console.log(count);
  console.log(`Trung binh cac so nguyen to la: ${result}`);
}
