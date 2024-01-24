function isPrime(num) {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

let num = 10;
if (isPrime(num)) {
  document.write(`${num} là số nguyên tố`);
} else {
  document.write(`${num} không phải là số nguyên tố`);
}
