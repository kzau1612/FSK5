let n = 5;
let num = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j <= i; j++) {
    num = num + 1;
    document.write(num + " ");
  }
  document.write("<br><br>");
}
