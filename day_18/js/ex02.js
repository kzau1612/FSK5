// Bài 2
let input = 450;
let output = 0;
if (input > 0 && input <= 50) {
  output = 1678;
} else if (input >= 51 && input <= 100) {
  output = 1734;
} else if (input >= 101 && input <= 200) {
  output = 2014;
} else if (input >= 201 && input <= 300) {
  output = 2536;
} else if (input >= 301 && input <= 400) {
  output = 2834;
} else if (input <= 0) {
  output = 0;
} else {
  output = 2927;
}

console.log(output);
