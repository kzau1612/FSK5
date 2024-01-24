let num = 0;
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    if ((i + j) % 2 == 0) {
      document.write("| white |");
    } else {
      document.write("| black |");
    }
  }
  document.write("<br> <br>");
}
