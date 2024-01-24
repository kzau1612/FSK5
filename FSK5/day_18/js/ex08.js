let total = 0;

function recursive(i, n) {
  if (i === n) {
    total += 1 / i;
    document.write(total);
  } else {
    total += 1 / i;
    i++;
    recursive(i, n);
  }
}

recursive(1, 3);
