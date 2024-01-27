function reverseNumber(number) {
  let result = 0;
  let length = number.toString().length;
  for (let i = 0; i < length; i++) {
    result = result * 10 + (number % 10);
    number = Math.floor(number / 10);
  }
  return result;
}

console.log(reverseNumber(12345));
