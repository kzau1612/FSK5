let money = 0;
let total = 0;
let km = -1;
if (km <= 1 && km > 0) {
  money = 15000;
  total += money;
} else if (km > 1 && km <= 5) {
  money = 13500;
  total += money;
} else if (km > 5) {
  money = 11000;
  total += money;
  if (km > 120) {
    total -= total * 0.1;
  }
} else {
  console.log("error");
}

console.log(money);
