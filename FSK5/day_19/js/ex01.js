function fibonacci(count, num1, num2, result = 0) {
  if (count > 0) {
    console.log(result);
    result = num1 + num2;
    num1 = num2;
    num2 = result;
    fibonacci(count - 1, num1, num2, result);
  }
}

console.log(fibonacci(10, 0, 1));
